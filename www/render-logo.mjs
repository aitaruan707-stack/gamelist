#!/usr/bin/env node
/* Zero-dependency brand asset rasterizer.
   Renders the Tapzens app icon (same geometry as assets/logo.svg) to:
     - assets/logo.png   512x512, transparent rounded corners (favicon / manifest)
     - assets/og.png     1200x630 social share card (dark bg + centered icon)
   Run: node render-logo.mjs
*/
import { writeFileSync } from 'node:fs';
import zlib from 'node:zlib';

/* ---------- SDF helpers ---------- */
// signed distance to a rounded rect; <= 0 inside
function sdRoundRect(px, py, x, y, w, h, r) {
  const cx = x + w / 2, cy = y + h / 2;
  const qx = Math.abs(px - cx) - (w / 2 - r);
  const qy = Math.abs(py - cy) - (h / 2 - r);
  const ox = Math.max(qx, 0), oy = Math.max(qy, 0);
  return Math.hypot(ox, oy) + Math.min(Math.max(qx, qy), 0) - r;
}
const cov = (d) => Math.max(0, Math.min(1, 0.5 - d)); // 1px anti-aliased coverage

const lerp = (a, b, t) => a + (b - a) * t;
const hex = (h) => [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
// sample a multi-stop gradient along t in [0,1]
function gradStops(t, stops) {
  for (let i = 0; i < stops.length - 1; i++) {
    if (t <= stops[i + 1][0] || i === stops.length - 2) {
      const [t0, c0] = stops[i], [t1, c1] = stops[i + 1];
      const k = Math.max(0, Math.min(1, (t - t0) / (t1 - t0 || 1)));
      return [
        Math.round(lerp(c0[0], c1[0], k)),
        Math.round(lerp(c0[1], c1[1], k)),
        Math.round(lerp(c0[2], c1[2], k))
      ];
    }
  }
}

/* geometry must match assets/logo.svg (128 design grid) */
const TILES = [
  [19, 26, 26, 26, 8],
  [51, 26, 26, 26, 8],
  [83, 26, 26, 26, 8],
  [51, 58, 26, 26, 8]
];
const BG_STOPS = [[0.0, hex('8B5CF6')], [0.55, hex('637BFF')], [1.0, hex('35D0BA')]];
const TILE_STOPS = [[0.0, hex('FFFFFF')], [1.0, hex('DCE6FF')]];
const GLOW = { cx: 0.3 * 128, cy: 0.2 * 128, r: 0.95 * 128, a: 0.28 };

// composite the app icon into an RGBA buffer at (ox,oy) with edge length `size`
function drawIcon(buf, W, H, ox, oy, size) {
  const s = size / 128;
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const px = x / s, py = y / s;

    const baseD = sdRoundRect(px, py, 2, 2, 124, 124, 30);
    const baseA = cov(baseD);
    if (baseA <= 0) continue;

    // background gradient (diagonal)
    let [r, g, b] = gradStops((px + py) / 256, BG_STOPS);

    // soft top-left glow
    const gd = Math.hypot(px - GLOW.cx, py - GLOW.cy) / GLOW.r;
    const ga = Math.max(0, 1 - gd) * GLOW.a;
    r = Math.round(r + (255 - r) * ga);
    g = Math.round(g + (255 - g) * ga);
    b = Math.round(b + (255 - b) * ga);

    // T-piece tiles on top
    for (const [tx, ty, tw, th, tr] of TILES) {
      const tD = sdRoundRect(px, py, tx, ty, tw, th, tr);
      const tA = cov(tD);
      if (tA > 0) {
        const [tr_, tg_, tb_] = gradStops((py - ty) / th, TILE_STOPS);
        r = Math.round(lerp(r, tr_, tA));
        g = Math.round(lerp(g, tg_, tA));
        b = Math.round(lerp(b, tb_, tA));
      }
    }

    const i = ((oy + y) * W + (ox + x)) * 4;
    buf[i] = r; buf[i + 1] = g; buf[i + 2] = b; buf[i + 3] = Math.round(baseA * 255);
  }
}

/* ---------- PNG encoding ---------- */
const crcTable = [...Array(256)].map((_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
const crc32 = (b) => { let c = 0xffffffff; for (const x of b) c = crcTable[(c ^ x) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
const chunk = (type, data) => {
  const t = Buffer.from(type);
  const l = Buffer.alloc(4); l.writeUInt32BE(data.length);
  const c = Buffer.alloc(4); c.writeUInt32BE(crc32(Buffer.concat([t, data])));
  return Buffer.concat([l, t, data, c]);
};
function encodePng(buf, w, h) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 6;
  const rowOut = w * 4 + 1;
  const rows = Buffer.alloc(h * rowOut);
  for (let y = 0; y < h; y++) { rows[y * rowOut] = 0; buf.copy(rows, y * rowOut + 1, y * w * 4, (y + 1) * w * 4); }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(rows, { level: 9 })),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

/* ---------- render ---------- */
// 1) 512x512 app icon, transparent outside the rounded rect
{
  const S = 512;
  const buf = Buffer.alloc(S * S * 4);
  drawIcon(buf, S, S, 0, 0, S);
  writeFileSync('assets/logo.png', encodePng(buf, S, S));
  console.log('assets/logo.png 512x512');
}

// 2) 1200x630 share card: dark site gradient + glow + centered icon
{
  const W = 1200, H = 630;
  const buf = Buffer.alloc(W * H * 4);
  const DARK_STOPS = [[0.0, hex('1C2450')], [0.55, hex('121A3A')], [1.0, hex('0B1020')]];
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    let [r, g, b] = gradStops((x + y) / (W + H), DARK_STOPS);
    const gd = Math.hypot(x - W / 2, y - 230) / 430;
    const ga = Math.max(0, 1 - gd) * 0.22;
    r = Math.round(r + 75 * ga); g = Math.round(g + 105 * ga); b = Math.round(b + 230 * ga);
    const i = (y * W + x) * 4;
    buf[i] = r; buf[i + 1] = g; buf[i + 2] = b; buf[i + 3] = 255;
  }
  const size = 400;
  drawIcon(buf, W, H, (W - size) / 2, (H - size) / 2, size);
  writeFileSync('assets/og.png', encodePng(buf, W, H));
  console.log('assets/og.png 1200x630');
}