#!/usr/bin/env node
/* In-place WebP payload swap for re-exported games.

   A vendor re-export overwrites the boot tree with raw Cocos assets, which silently undoes the
   site's standing WebP pass (see commits 20c960cd / 8e5b92ce: png+jpg payloads replaced by WebP
   bytes, 75%~87% smaller). The engine asks for `…\/xxx.png` by uuid from its own config, so we
   keep every filename and swap only the bytes: the browser sniffs WebP out of the payload and
   decodes it regardless of the .png name and the image/png response header — the same trick the
   earlier pass used, and why no game file has to be edited.

   Only real PNG/JPEG payloads are touched: a file whose header already says RIFF/WEBP is skipped,
   so the pass is idempotent and can be re-run after every handover. Small images are left alone —
   under the threshold the lossy WebP win is not worth touching a sprite atlas the artist tuned.

   Run from www/:   node _webp.mjs mahjongvalley puzzlewatersort [royalmatcher] [--min=100] [--q=82]
   Dry run:         node _webp.mjs <slugs> --dry                     */
import { readFileSync, writeFileSync, readdirSync, statSync, rmSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, extname } from 'node:path';
import { tmpdir } from 'node:os';

const argv = process.argv.slice(2);
const slugs = argv.filter((a) => !a.startsWith('--'));
const DRY = argv.includes('--dry');
const MIN = (Number((argv.find((a) => a.startsWith('--min=')) || '--min=100').split('=')[1]) || 100) * 1024;
const Q = Number((argv.find((a) => a.startsWith('--q=')) || '--q=82').split('=')[1]) || 82;
const EXT = new Set(['.png', '.jpg']);

if (!slugs.length) { console.error('usage: node _webp.mjs <slug> [slug...] [--min=KB] [--q=82] [--dry]'); process.exit(1); }

const isWebp = (b) => b.length > 12 && b.slice(0, 4).toString('latin1') === 'RIFF' && b.slice(8, 12).toString('latin1') === 'WEBP';
const isPng = (b) => b.length > 8 && b[0] === 0x89 && b.slice(1, 4).toString('latin1') === 'PNG';
const isJpg = (b) => b.length > 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff;

const work = mkdtempSync(join(tmpdir(), 'webp-'));
function convert(file) {
  const out = join(work, `${file.replace(/[^\w.-]/g, '_')}.webp`);
  execFileSync('cwebp', ['-quiet', '-mt', '-q', String(Q), '-m', '5', file, '-o', out], { stdio: ['ignore', 'ignore', 'pipe'] });
  const bytes = readFileSync(out);
  rmSync(out, { force: true });
  return bytes;
}

function* walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (EXT.has(extname(e.name).toLowerCase())) yield p;
  }
}

const rows = [];
for (const slug of slugs) {
  let before = 0, after = 0, done = 0, skipped = 0, tiny = 0, kept = 0;
  for (const file of walk(join('hyper-feed', slug))) {
    const raw = readFileSync(file);
    if (isWebp(raw)) { skipped++; continue; }
    if (!isPng(raw) && !isJpg(raw)) { skipped++; continue; }
    if (raw.length < MIN) { tiny++; continue; }
    let webp;
    try { webp = convert(file); } catch (e) { console.error(`  cwebp failed on ${file}: ${String(e.message).slice(0, 80)}`); kept++; continue; }
    if (webp.length >= raw.length * 0.95) { kept++; continue; }   /* no real win: keep the artist's bytes */
    before += raw.length; after += webp.length; done++;
    if (!DRY) writeFileSync(file, webp);
  }
  rows.push({ slug, done, saved: before - after, pct: before ? Math.round((1 - after / before) * 100) : 0, skipped, tiny, kept });
}

const kb = (n) => `${(n / 1024).toFixed(0)}KB`;
console.log(`\n${DRY ? 'DRY RUN' : 'SWAPPED'} — threshold ${kb(MIN)}, q=${Q}${DRY ? ' (no bytes written)' : ''}`);
for (const r of rows) {
  console.log(`  ${r.slug.padEnd(22)} 换 ${String(r.done).padStart(4)} 张  省 ${(r.saved / 1024 / 1024).toFixed(1)}MB (-${r.pct}%)` +
    `  已是webp:${r.skipped} 小于阈值:${r.tiny} 收益不足:${r.kept}`);
}
console.log(`  合计省下 ${(rows.reduce((s, r) => s + r.saved, 0) / 1024 / 1024).toFixed(1)}MB`);
rmSync(work, { recursive: true, force: true });
