/* Dependency-free regression checks for the generated search and navigation surfaces.
   Run after node build.mjs: node tests/site-integrity.mjs */
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
const root = fileURLToPath(new URL('..', import.meta.url));
const read = path => readFileSync(resolve(root, path), 'utf8');
const { site, games } = JSON.parse(read('games.json'));
const origin = `https://${site.domain}`;
const sitemap = read('sitemap.xml');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
assert.equal(new Set(urls).size, urls.length, 'Sitemap must not duplicate URLs');
assert.equal(site.ga, 'G-XJVV1PM7D5');
assert.equal(origin, 'https://www.zupilo.net');
assert.ok(read('robots.txt').includes(`Sitemap: ${origin}/sitemap.xml`));
assert.ok(!read('robots.txt').includes('Disallow:'), 'Do not hide the raw entry noindex directive from Google');
for (const url of urls) {
  assert.ok(url.startsWith(origin + '/'), `Wrong sitemap host: ${url}`);
  const path = new URL(url).pathname.slice(1) || 'index.html';
  const html = read(path);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${path}: one main heading`);
  assert.ok(html.includes(`<link rel="canonical" href="${url}">`), `${path}: self canonical`);
  assert.ok(!/<meta name="robots" content="[^"]*noindex/.test(html), `${path}: sitemap pages must be indexable`);
  assert.ok(!/Tapzens|tapzens\.com|G-06KHTP8DZZ/.test(html), `${path}: stale public identity`);
  assert.equal((html.match(/id="games-data"/g) || []).length, 1, `${path}: one catalogue`);
  const data = JSON.parse(html.match(/<script type="application\/json" id="games-data">(.*?)<\/script>/s)[1]);
  assert.equal(data.games.length, games.length, `${path}: search the whole catalogue`);
  assert.equal((html.match(/googletagmanager.com\/gtag\/js\?id=G-XJVV1PM7D5/g) || []).length, 1, `${path}: one analytics tag`);
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) JSON.parse(json);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length, `${path}: IDs must be unique`);
  assert.ok(ids.includes('main-content'), `${path}: keyboard skip target`);
  for (const [, ref] of html.matchAll(/(?:href|src)="(\/[^"?#]*)/g)) {
    assert.ok(existsSync(resolve(root, '.' + (ref === '/' ? '/index.html' : ref))), `${path}: broken local reference ${ref}`);
  }
}
for (const game of games) {
  const raw = read(`hyper-feed/${game.slug}/index.html`);
  assert.equal((raw.match(/<!-- Zupilo standalone shell:/g) || []).length, 1, `${game.slug}: one shell`);
  assert.ok(raw.includes('<meta name="robots" content="noindex, follow">'));
  assert.ok(raw.includes(`<link rel="canonical" href="${origin}/hyper-feed/${game.slug}/game.html">`));
  assert.ok(read(`g/${game.slug}.html`).includes('noindex, follow'));
}
assert.ok(read('404.html').includes('<meta name="googlebot" content="noindex, follow">'));
const config = JSON.parse(read('vercel.json'));
assert.ok(config.redirects.some(r => r.source === '/g/:slug.html' && r.permanent));
assert.ok(config.redirects.some(r => r.source === '/index.html' && r.destination === '/'));
assert.equal(config.redirects.filter(r => r.has?.some(h => h.type === 'host' && h.value === 'zupilo.net')).length, 1);
assert.ok(config.headers.some(r => r.source === '/hyper-feed/:slug/index.html' && r.headers.some(h => h.key === 'X-Robots-Tag' && h.value.includes('noindex'))));
console.log(`Passed: ${urls.length} indexable pages, ${games.length} game entries, catalogue data, local references, analytics and SEO routing.`);
