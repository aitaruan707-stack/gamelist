// Zero-dependency PNG background key-out (light bg -> transparent).
// Usage: node logo-keyout.mjs <src.png> <dst.png>
import { readFileSync, writeFileSync } from 'node:fs';
import zlib from 'node:zlib';

const src = process.argv[2], dst = process.argv[3];
const buf = readFileSync(src);
if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error('not a png');

let pos = 8, w = 0, h = 0, depth = 0, color = 0;
const idat = [];
while (pos < buf.length) {
  const len = buf.readUInt32BE(pos);
  const type = buf.toString('ascii', pos + 4, pos + 8);
  const data = buf.subarray(pos + 8, pos + 8 + len);
  if (type === 'IHDR') { w = data.readUInt32BE(0); h = data.readUInt32BE(4); depth = data[8]; color = data[9]; }
  else if (type === 'IDAT') idat.push(data);
  pos += 12 + len;
}
if (depth !== 8) throw new Error('unsupported bit depth ' + depth);
if (color !== 2 && color !== 6 && color !== 0) throw new Error('unsupported colorType ' + color);
const ch = color === 6 ? 4 : color === 2 ? 3 : 1;

const raw = zlib.inflateSync(Buffer.concat(idat));
const rowbytes = w * ch, stride = rowbytes + 1;
const out = Buffer.alloc(h * rowbytes);
const paeth = (a, b, c) => { const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c); return pa <= pb && pa <= pc ? a : pb <= pc ? b : c; };
for (let y = 0; y < h; y++) {
  const f = raw[y * stride];
  const row = raw.subarray(y * stride + 1, (y + 1) * stride);
  const o = y * rowbytes;
  const up = y ? out.subarray((y - 1) * rowbytes, y * rowbytes) : null;
  for (let i = 0; i < rowbytes; i++) {
    const x = row[i];
    const l = i >= ch ? out[o + i - ch] : 0;
    const u = up ? up[i] : 0;
    const ul = up && i >= ch ? up[i - ch] : 0;
    let v = x;
    if (f === 1) v = x + l;
    else if (f === 2) v = x + u;
    else if (f === 3) v = x + ((l + u) >> 1);
    else if (f === 4) v = x + paeth(l, u, ul);
    out[o + i] = v & 255;
  }
}

// Key out: sample background from top-left pixel, feather edges.
const br = out[0], bg = out[1], bb = out[2];
const rgba = Buffer.alloc(w * h * 4);
for (let p = 0; p < w * h; p++) {
  const r = out[p * ch], g = out[p * ch + 1], b = out[p * ch + 2];
  const d = Math.max(Math.abs(r - br), Math.abs(g - bg), Math.abs(b - bb));
  const a = d <= 24 ? 0 : d >= 72 ? 255 : Math.round(((d - 24) / 48) * 255);
  rgba[p * 4] = r; rgba[p * 4 + 1] = g; rgba[p * 4 + 2] = b; rgba[p * 4 + 3] = a;
}

// Encode RGBA PNG.
const crcTable = [...Array(256)].map((_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
const crc32 = (b) => { let c = 0xffffffff; for (const x of b) c = crcTable[(c ^ x) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
const chunk = (type, data) => {
  const t = Buffer.from(type);
  const l = Buffer.alloc(4); l.writeUInt32BE(data.length);
  const c = Buffer.alloc(4); c.writeUInt32BE(crc32(Buffer.concat([t, data])));
  return Buffer.concat([l, t, data, c]);
};
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 6;
const rowOut = w * 4 + 1;
const rows = Buffer.alloc(h * rowOut);
for (let y = 0; y < h; y++) { rows[y * rowOut] = 0; rgba.copy(rows, y * rowOut + 1, y * w * 4, (y + 1) * w * 4); }
const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk('IHDR', ihdr),
  chunk('IDAT', zlib.deflateSync(rows, { level: 9 })),
  chunk('IEND', Buffer.alloc(0)),
]);
writeFileSync(dst, png);
console.log('ok', w + 'x' + h, 'bg=' + [br, bg, bb].join(','));
