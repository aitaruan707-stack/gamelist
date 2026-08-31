#!/usr/bin/env node
/* Tapzens — zero-dependency static site generator.
   Reads games.json and emits index.html + g/<slug>.html + sitemap.xml,
   copies game cover icons and splash images, and generates SVG placeholder
   covers for games without an icon. Run: node build.mjs */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const read = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'));
const write = (p, c) => writeFileSync(join(ROOT, p), c, 'utf8');
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad2 = (n) => (n < 10 ? '0' : '') + n;
const dist = (p) => join(ROOT, p);

const data = read('games.json');
const games = data.games;
const SITE = data.site;

/* ---------- paths ---------- */
const ICON_SRC = dist('../puzzle-yarnfun/images/game');     // source webp icons
const GAME_SRC = dist('game');                              // game build folders
const COVERS = dist('assets/covers');
const G_DIR = dist('g');

/* cross-name icon mappings (slug -> icon file) handled via games[].cover */

/* ---------- cover assets ---------- */
function ensureDir(p) { mkdirSync(p, { recursive: true }); }
ensureDir('assets');
ensureDir('assets/covers');
ensureDir('g');

function copyCovers() {
  let copied = 0, generated = 0;
  for (const g of games) {
    if (g.cover) {
      const src = join(ICON_SRC, g.cover);
      const dst = join(COVERS, g.cover);
      if (existsSync(src)) { copyFileSync(src, dst); copied++; }
      else { genPlaceholder(g); generated++; }
    } else {
      genPlaceholder(g); generated++;
    }
  }
  console.log(`covers: ${copied} copied, ${generated} generated`);
}

function emojiFor(g) {
  const t = (g.tags || []).join(' ');
  if (/maze/.test(t)) return '🧭';
  if (/magic|wizard/.test(t)) return '🧙';
  if (/sort/.test(t)) return '🧪';
  if (/match-3/.test(t)) return '💎';
  if (/bubble/.test(t)) return '🫧';
  if (/block/.test(t)) return '🧱';
  if (/hex/.test(t)) return '⬡';
  if (/shooter/.test(t)) return '✈️';
  if (/rpg/.test(t)) return '⚔️';
  return '🎮';
}
function genPlaceholder(g) {
  const palette = [
    ['#637BFF', '#35D0BA'], ['#FF6B6B', '#FFB24A'], ['#35D0BA', '#637BFF'],
    ['#FFB24A', '#FF6B6B'], ['#7C5CFF', '#35D0BA'], ['#FF8A5C', '#FFB24A']
  ];
  const [a, b] = palette[(g.slug.charCodeAt(0) + g.slug.length) % palette.length];
  const emoji = emojiFor(g);
  const title = g.title.length > 16 ? g.title.slice(0, 14) + '…' : g.title;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="240" height="240">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient><radialGradient id="glow" cx="0.3" cy="0.25" r="0.8"><stop offset="0" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></radialGradient></defs>
<rect width="240" height="240" fill="url(#g)"/>
<rect width="240" height="240" fill="url(#glow)"/>
<circle cx="120" cy="106" r="56" fill="#ffffff" opacity="0.12"/>
<text x="120" y="126" font-size="58" text-anchor="middle">${emoji}</text>
<text x="120" y="200" font-family="-apple-system,Segoe UI,Roboto,sans-serif" font-size="17" font-weight="700" text-anchor="middle" fill="#ffffff" opacity="0.94">${esc(title)}</text>
</svg>`;
  write(`assets/covers/${g.slug}.svg`, svg);
}

function copyAvatars() {
  const DST = dist('assets/avatars'); ensureDir('assets/avatars');
  const SRC = dist('../puzzle-yarnfun/images/icon');
  let n = 0;
  for (let i = 1; i <= 32; i++) {
    const name = `avatar_${pad2(i)}.webp`;
    const src = join(SRC, name);
    if (existsSync(src)) { copyFileSync(src, join(DST, name)); n++; }
  }
  console.log(`avatars: ${n} copied`);
}

/* ---------- shared markup ---------- */
function coverUrl(g) { return g.cover ? `/assets/covers/${g.cover}` : `/assets/covers/${g.slug}.svg`; }
function detailUrl(g) { return `/g/${g.slug}.html`; }
function playUrl(g) { return `/play.html?id=${g.slug}`; }

const ICON_SEARCH = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>`;
const ICON_CLOSE = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>`;
const ICON_PLAY = `<svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>`;
const ICON_HEART = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>`;
const ICON_HOME = `<svg class="bi" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>`;
const ICON_GRID = `<svg class="bi" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`;
const ICON_STAR = `<svg class="bi" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 18.9 6.2 21l1.1-6.5L2.6 9.8l6.5-.9z"/></svg>`;
const ICON_CLOCK = `<svg class="bi" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`;

const HEAD_ICONS = `<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/logo.png" type="image/png" sizes="512x512">`;

function logoInline() {
  return `<a class="logo" href="/" aria-label="Tapzens home"><img src="/assets/logo.svg" alt="Tapzens" width="30" height="30"><span class="word">Tapzens</span></a>`;
}

function topbar(active) {
  return `<header class="topbar"><div class="wrap">
    ${logoInline()}
    <nav class="nav-main">
      <a href="/" class="${active === 'home' ? 'active' : ''}">Home</a>
      <a href="/#categories" class="${active === 'categories' ? 'active' : ''}">Categories</a>
      <a href="/#favorites" class="${active === 'favorites' ? 'active' : ''}">Favorites</a>
      <a href="/about.html" class="${active === 'about' ? 'active' : ''}">About</a>
    </nav>
    <div class="spacer"></div>
    <div class="search">
      <input type="search" placeholder="Search games…" aria-label="Search games" autocomplete="off">
      <span class="ico">${ICON_SEARCH}</span>
      <button class="clear" aria-label="Clear search">${ICON_CLOSE}</button>
      <div class="results" role="listbox" aria-label="Search results"></div>
    </div>
    <button class="icon-btn" data-search-toggle aria-label="Search">${ICON_SEARCH}</button>
  </div></header>`;
}

function bottomNav(active) {
  const a = (href, label, icon, on) => `<a href="${href}" class="${on ? 'active' : ''}">${icon}<span>${label}</span></a>`;
  return `<nav class="bottomnav">
    ${a('/', 'Home', ICON_HOME, active === 'home')}
    ${a('/#categories', 'Categories', ICON_GRID, false)}
    ${a('/#favorites', 'Favorites', ICON_STAR, false)}
    ${a('/#recent', 'Recent', ICON_CLOCK, false)}
  </nav>`;
}

function footer() {
  const year = new Date().getFullYear();
  return `<footer class="footer"><div class="wrap">
    <div class="frow">
      <div class="foot-brand">
        <div class="flogo">${logoInline()}</div>
        <p>${esc(SITE.tagline || '')} Free online games — no download, mobile-friendly.</p>
      </div>
      <div class="foot-cols">
        <div class="foot-col"><h4>Explore</h4><a href="/">Home</a><a href="/#categories">Categories</a><a href="/#favorites">Favorites</a><a href="/#recent">Recent</a></div>
        <div class="foot-col"><h4>Company</h4><a href="/about.html">About Us</a><a href="/job.html">Careers</a><a href="/partnerships.html">Partnerships</a></div>
      </div>
    </div>
    <div class="foot-bottom">&copy; ${year} ${esc(SITE.name)}. All rights reserved.</div>
  </div></footer>`;
}

function cardHtml(g, opts = {}) {
  const lazy = opts.first ? '' : 'loading="lazy"';
  const fp = opts.first ? 'fetchpriority="high"' : '';
  return `<a class="card" href="${detailUrl(g)}" aria-label="${esc(g.title)}">
    <div class="thumb">
      <img src="${coverUrl(g)}" alt="${esc(g.title)} cover" ${lazy} ${fp} width="240" height="240">
      <div class="play-ov"><div class="pcircle">${ICON_PLAY}</div></div>
    </div>
    <div class="info">
      <div class="title">${esc(g.title)}</div>
      <div class="meta"><span class="cat">${esc(g.category)}</span></div>
    </div>
  </a>`;
}

function featCardHtml(g) {
  const desc = (g.description || '').slice(0, 110);
  return `<a class="card feat" href="${detailUrl(g)}" aria-label="${esc(g.title)}">
    <div class="thumb"><img src="${coverUrl(g)}" alt="${esc(g.title)} cover" loading="lazy" width="240" height="240"></div>
    <div class="info">
      <div class="meta"><span class="cat">${esc(g.category)}</span> · ${esc((g.tags || []).slice(0, 2).join(', '))}</div>
      <div class="title">${esc(g.title)}</div>
      <div class="desc">${esc(desc)}…</div>
      <span class="btn sm">Play now</span>
    </div>
  </a>`;
}

/* ---------- reviews (deterministic per game) ---------- */
function hashStr(s) { let h = 1779033703 ^ s.length; for (let i = 0; i < s.length; i++) { h = Math.imul(h ^ s.charCodeAt(i), 3432918353); h = h << 13 | h >>> 19; } return h >>> 0; }
function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const FIRSTN = ['Alice','Bob','Charlie','Diana','Eva','Frank','Grace','Henry','Ivy','Jack','Kate','Leo','Mia','Noah','Olivia','Paul','Quinn','Rose','Sam','Tina','Uma','Vince','Wendy','Xavier','Yara','Zack','Liam','Ava','Ethan','Zoe'];
const LASTN = ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Martinez','Lopez','Wilson','Anderson','Taylor','Moore','Lee','Clark','Lewis','Walker','Hall'];
const REVIEWS_TPL = [
  "I'm hooked! Easy to pick up but genuinely hard to put down.",
  "{g} is my go-to game during breaks. Smooth and satisfying.",
  "The levels are so rewarding to clear. Highly recommended.",
  "Runs flawlessly on my phone. Perfect for a quick session.",
  "What a relaxing way to unwind before bed. Love it.",
  "Challenging but always fair — the level design is top-notch.",
  "Colorful, polished, and genuinely fun. A must-try.",
  "Can't stop playing! Each level feels fresh.",
  "Exactly what a casual game should be. Smooth and enjoyable.",
  "The controls are so intuitive, I picked it up instantly.",
  "Hits the perfect difficulty curve. Keeps me coming back.",
  "Honestly one of the best browser games I've played this year.",
  "Short sessions, endless fun. It really hits the sweet spot.",
  "The art style is adorable. Really well made.",
  "Loads instantly and never lags. Great optimization.",
  "Been playing for hours and still finding new challenges.",
  "Simple to learn, tricky to master. Brilliant design.",
  "The audio and visuals are so satisfying together.",
  "The perfect 5-minute game. Quick, fair, and rewarding.",
  "I love that it respects my time — no forced waits.",
  "Polished, fair, and genuinely fun. Five stars from me.",
  "Started skeptical, now I play it every day. Addictive!",
  "Great balance of relaxing and challenging. Exactly my vibe.",
  "Clean UI, smooth animations, no bugs. Impressive for a free game."
];
function genReviews(g) {
  const rnd = mulberry32(hashStr(g.slug));
  const n = 8 + Math.floor(rnd() * 3);
  const fi = FIRSTN.map(v => [v, rnd()]).sort((a, b) => a[1] - b[1]).map(x => x[0]);
  const li = LASTN.map(v => [v, rnd()]).sort((a, b) => a[1] - b[1]).map(x => x[0]);
  const avs = Array.from({ length: 32 }, (_, i) => i + 1).map(v => [v, rnd()]).sort((a, b) => a[1] - b[1]).map(x => x[0]);
  let twoU = false, threeU = false; const arr = [];
  for (let i = 0; i < n; i++) {
    const r = rnd(); let rt;
    if (!twoU && r < 0.04) { rt = 2; twoU = true; }
    else if (!threeU && r < 0.10) { rt = 3; threeU = true; }
    else rt = rnd() < 0.55 ? 5 : 4;
    arr.push({ name: fi[i % fi.length] + ' ' + li[i % li.length], av: avs[i % avs.length], rt, body: REVIEWS_TPL[Math.floor(rnd() * REVIEWS_TPL.length)].replace(/\{g\}/g, g.title), days: 1 + Math.floor(rnd() * 29) });
  }
  const avg = arr.reduce((s, x) => s + x.rt, 0) / arr.length;
  const stars = v => '★'.repeat(v) + '☆'.repeat(5 - v);
  const html = arr.map(r => `<div class="review" itemscope itemtype="https://schema.org/Review">
  <div class="rh">
    <div class="ava"><img src="/assets/avatars/avatar_${pad2(r.av)}.webp" alt="${esc(r.name)} avatar" loading="lazy"></div>
    <div class="ud" itemprop="author" itemscope itemtype="https://schema.org/Person"><h4 itemprop="name">${esc(r.name)}</h4><p>${r.days === 1 ? '1 day ago' : r.days + ' days ago'}</p></div>
    <div class="stars" itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating"><meta itemprop="worstRating" content="1"><meta itemprop="bestRating" content="5"><meta itemprop="ratingValue" content="${r.rt}">${stars(r.rt)}</div>
  </div>
  <div class="body" itemprop="reviewBody">${esc(r.body)}</div>
</div>`).join('');
  return { html, avg, count: n };
}

/* ---------- home page ---------- */
function buildHome() {
  const featured = games.filter(g => g.featured).sort((a, b) => b.popularWeight - a.popularWeight);
  const popular = [...games].sort((a, b) => b.popularWeight - a.popularWeight);
  const fresh = [...games].sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || '')).slice(0, 8);
  const cats = data.categories || [];
  const firstFour = games.slice(0, 4);

  const chips = `<div class="chips" data-filter id="cat-chips">
    <button class="active" data-cat="all">All</button>
    ${cats.map(c => `<button data-cat="${c.slug}">${esc(c.name)}</button>`).join('')}
  </div>`;

  const catTiles = `<div class="cat-grid">${cats.map(c => {
    const count = games.filter(g => g.category.toLowerCase() === c.slug).length;
    return `<a class="cat-tile" href="/c/${c.slug}.html"><div class="cn">${esc(c.name)}</div><div class="cc">${count} games</div></a>`;
  }).join('')}</div>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>Free Online Games — Play Puzzle, Action & Arcade | ${esc(SITE.name)}</title>
<meta name="description" content="Play free online games on ${esc(SITE.name)}. Enjoy puzzle, match-3, sorting, action and arcade games instantly in your browser — no download, mobile-friendly, free forever.">
<link rel="canonical" href="https://${esc(SITE.domain)}/">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="googlebot" content="index, follow">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/logo.png" type="image/png" sizes="512x512">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#0B1020">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:title" content="Free Online Games — Play Puzzle, Action & Arcade | ${esc(SITE.name)}">
<meta property="og:description" content="${esc(SITE.tagline || '')}">
<meta property="og:url" content="https://${esc(SITE.domain)}/">
<meta property="og:image" content="https://${esc(SITE.domain)}/assets/og.png">
<meta name="twitter:card" content="summary">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebSite","name":"${esc(SITE.name)}","url":"https://${esc(SITE.domain)}/","potentialAction":{"@type":"SearchAction","target":"https://${esc(SITE.domain)}/?q={query}","query-input":"required name=query"}}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","name":"${esc(SITE.name)}","url":"https://${esc(SITE.domain)}/","logo":"https://${esc(SITE.domain)}/assets/logo.png"}</script>
<script type="application/ld+json">${JSON.stringify({ '@context':'https://schema.org','@type':'ItemList', name: SITE.name + ' Free Online Games', itemListElement: games.map((g,i)=>({ '@type':'ListItem', position:i+1, url:`https://${SITE.domain}/g/${g.slug}.html`, name:g.title })) })}</script>
<link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
${topbar('home')}
<main class="container">
  <section class="hero">
    <div>
      <h1>Play free games, instantly.</h1>
      <p>${esc(SITE.tagline || '')} No downloads, no sign-ups — just tap and play. Curated puzzle, action and arcade hits optimized for your phone and desktop.</p>
      <div class="badges"><span class="b">${games.length} games</span><span class="b">Mobile-first</span><span class="b">No install</span><span class="b">Free forever</span></div>
    </div>
  </section>

  ${chips}

  <section class="block" id="featured">
    <div class="section-head"><h2>Featured Games</h2></div>
    <div class="grid featured">${featured.map(featCardHtml).join('')}</div>
  </section>

  <section class="block" id="recent">
    <div class="section-head"><h2>Continue Playing</h2><a class="more" href="#all">All games</a></div>
    <div class="grid" id="continue-grid"></div>
    <div class="empty-block" id="continue-empty"><span class="big">No recent games yet</span><span>Games you play will show up here.</span></div>
  </section>

  <section class="block">
    <div class="section-head"><h2>Popular Games</h2></div>
    <div class="grid">${popular.map((g, i) => cardHtml(g, { first: i < 4 })).join('')}</div>
  </section>

  <section class="block">
    <div class="section-head"><h2>New Games</h2></div>
    <div class="grid">${fresh.map(cardHtml).join('')}</div>
  </section>

  <section class="block" id="categories">
    <div class="section-head"><h2>Browse by Category</h2></div>
    ${catTiles}
  </section>

  <section class="block" id="all">
    <div class="section-head"><h2>All Games</h2></div>
    ${chips.replace('data-filter', 'data-filter').replace('id="cat-chips"', '')}
    <div class="grid" id="all-grid" style="margin-top:12px">${games.map(cardHtml).join('')}</div>
  </section>

  <section class="block" id="favorites">
    <div class="section-head"><h2>Your Favorites</h2></div>
    <div class="grid" id="fav-grid"></div>
    <div class="empty-block" id="fav-empty"><span class="big">No favorites yet</span><span>Tap the heart on any game to save it here.</span></div>
  </section>
</main>
${footer()}
${bottomNav('home')}
<script type="application/json" id="games-data">${JSON.stringify(games.map(g => ({ slug: g.slug, title: g.title, category: g.category, tags: g.tags, description: g.description, cover: g.cover, entry: g.entry })))}</script>
<script src="/assets/js/app.js"></script>
</body>
</html>`;
  write('index.html', html);
  console.log('index.html generated');
}

/* ---------- detail page ---------- */
function buildDetail(g) {
  const cat = (data.categories || []).find(c => c.slug === g.category.toLowerCase());
  const related = games.filter(x => x.slug !== g.slug && x.category === g.category).slice(0, 6);
  const splash = g.splash ? `/assets/covers/${g.slug}-splash.png` : null;
  const rev = genReviews(g);
  const dlBase = 80000 + (g.popularWeight || 500) * 130;
  const dlShort = dlBase >= 1000 ? Math.floor(dlBase / 1000) + 'K+' : String(dlBase);
  const catHref = cat ? '/c/' + cat.slug + '.html' : '/#all';
  const url = `https://${SITE.domain}/g/${g.slug}.html`;
  const desc = (g.description || '').slice(0, 155);
  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: g.title,
    description: g.description,
    image: `https://${SITE.domain}${coverUrl(g)}`,
    url,
    genre: [g.category, ...(g.tags || [])],
    gamePlatform: ['Web Browser', 'Mobile Browser'],
    operatingSystem: 'Any',
    applicationCategory: 'Game',
    author: { '@type': 'Organization', name: g.developer || SITE.name },
    publisher: { '@type': 'Organization', name: g.developer || SITE.name },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: rev.avg.toFixed(1), reviewCount: rev.count, bestRating: '5', worstRating: '1' }
  };
  const bcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${SITE.domain}/` },
      { '@type': 'ListItem', position: 2, name: g.category, item: `https://${SITE.domain}/#all` },
      { '@type': 'ListItem', position: 3, name: g.title, item: url }
    ]
  };

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>${esc(g.title)} — Play Free on ${esc(SITE.name)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="googlebot" content="index, follow">
${HEAD_ICONS}
<meta name="theme-color" content="#0B1020">
<meta property="og:type" content="game">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:title" content="${esc(g.title)} — Play Free">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="https://${esc(SITE.domain)}${g.banner ? '/assets/covers/' + g.banner : coverUrl(g)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(g.title)} — Play Free">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="https://${esc(SITE.domain)}${g.banner ? '/assets/covers/' + g.banner : coverUrl(g)}">
<script type="application/ld+json">${JSON.stringify(jsonld)}</script>
<script type="application/ld+json">${JSON.stringify(bcrumb)}</script>
${g.faq && g.faq.length ? `<script type="application/ld+json">${JSON.stringify({ '@context':'https://schema.org','@type':'FAQPage', mainEntity: g.faq.map(f => ({ '@type':'Question', name: f.q, acceptedAnswer: { '@type':'Answer', text: f.a } })) })}</script>` : ''}
<link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
${topbar('')}
<main class="container">
  <nav class="crumb" aria-label="Breadcrumb">
    <a href="/">Home</a><span class="sep">›</span>
    <a href="${catHref}">${esc(g.category)}</a><span class="sep">›</span>
    <span class="cur">${esc(g.title)}</span>
  </nav>

  <div class="detail-head">
    <div class="detail-cover"><img src="${coverUrl(g)}" alt="${esc(g.title)} cover" width="240" height="240"></div>
    <div class="detail-meta">
      <h1>${esc(g.title)}</h1>
      <div class="row">
        <span class="cat">${esc(g.category)}</span><span class="dot"></span>
        <span>${esc((g.tags || []).join(' · '))}</span>
      </div>
      <div class="actions">
        <a class="btn lg" href="${playUrl(g)}">▶ Play Now</a>
        <button class="btn ghost" data-fav="${g.slug}">${ICON_HEART}<span class="lbl">Favorite</span></button>
        <a class="btn ghost" href="${catHref}">More Games</a>
      </div>
    </div>
  </div>

  <div class="live-band">
    <div class="bg grad"></div>
    <img class="band-cover" src="${coverUrl(g)}" alt="" aria-hidden="true" loading="lazy">
    <div class="live-badge"><span class="dot"></span> Live</div>
    <div class="danmaku" id="danmaku"></div>
  </div>

  <div class="detail-body">
    <div class="detail-main">
      <h2>About ${esc(g.title)}</h2>
      <p class="desc">${esc(g.description)}</p>
      <h2>How to Play</h2>
      <ol class="controls">${(g.controls || []).map(c => `<li>${esc(c)}</li>`).join('')}</ol>
      <h2>Frequently Asked Questions</h2>
      <div class="faq">${(g.faq || []).map(f => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}</div>
      ${related.length ? `<h2>More ${esc(g.category)} Games <a class="more" href="${catHref}" style="float:right">View all</a></h2><div class="grid">${related.map(cardHtml).join('')}</div>` : ''}
    </div>
    <aside class="detail-side">
      <div>
        <h3>Quick Info</h3>
        <div class="row" style="flex-direction:column;align-items:flex-start;gap:6px">
          <span>Category: <strong style="color:var(--accent)">${esc(g.category)}</strong></span>
          <span>Orientation: <strong>${esc(g.orientation)}</strong></span>
          <span>Platform: <strong>Web / Mobile</strong></span>
          <span>Price: <strong>Free</strong></span>
          <span>Downloads: <strong>${dlShort}</strong></span>
          <span>Rating: <strong>${rev.avg.toFixed(1)} ★</strong></span>
        </div>
      </div>
      <div>
        <h3>Tags</h3>
        <div class="taglist">${(g.tags || []).map(t => `<span class="t">${esc(t)}</span>`).join('')}</div>
      </div>
      <div>
        <h3>Ready to play?</h3>
        <a class="btn accent" href="${playUrl(g)}" style="width:100%">▶ Play ${esc(g.title)}</a>
      </div>
    </aside>
  </div>

  <section class="block">
    <div class="section-head"><h2>Recent Downloads</h2><span class="dl-counter"><span class="num" id="dl-count" data-base="${dlBase}">${dlBase.toLocaleString('en-US')}</span><span class="lbl">downloads</span></span></div>
    <div class="dl-grid" id="dl-feed"></div>
  </section>

  <section class="block">
    <div class="reviews-head">
      <div class="avg">${rev.avg.toFixed(1)}<span class="sm">/5</span></div>
      <div class="stars">${'★'.repeat(Math.round(rev.avg))}${'☆'.repeat(5 - Math.round(rev.avg))}</div>
      <div class="rc">${rev.count} player reviews</div>
    </div>
    <div class="reviews">${rev.html}</div>
  </section>
</main>
${footer()}
${bottomNav('')}
<script src="/assets/js/app.js"></script>
</body>
</html>`;
  write(`g/${g.slug}.html`, html);
}

function buildDetails() {
  for (const g of games) buildDetail(g);
  console.log(`${games.length} detail pages generated`);
}

/* ---------- static pages ---------- */
function buildStaticPage({ slug, title, desc, h1, body, navActive = '', faq = [] }) {
  const url = 'https://' + SITE.domain + '/' + slug + '.html';
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="googlebot" content="index, follow">
${HEAD_ICONS}
<meta name="theme-color" content="#0B1020">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="https://${esc(SITE.domain)}/assets/og.png">
<meta name="twitter:card" content="summary">
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', name: title, url, description: desc, isPartOf: { '@type': 'WebSite', name: SITE.name, url: 'https://' + SITE.domain + '/' } })}</script>
${faq.length ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) })}</script>` : ''}
<link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
${topbar(navActive)}
<main class="container">
  <nav class="crumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="sep">›</span><span class="cur">${esc(h1)}</span></nav>
  <section class="static">
    <div class="prose">
${body}
    </div>
  </section>
</main>
${footer()}
${bottomNav('')}
<script src="/assets/js/app.js"></script>
</body>
</html>`;
  write(slug + '.html', html);
}
const CONTACT_EMAIL = 'aitaruan707@gmail.com';
const aboutBody = `
<h1 class="static-h1">About Tapzens</h1>
<p class="static-lead">Tapzens is a free online games portal where you can instantly play curated puzzle, action and arcade games right in your browser — no downloads, no sign-ups, no friction.</p>
<h2>Our Mission</h2>
<p>We believe great casual games should be one tap away. Our mission is to build the fastest, friendliest place to play HTML5 games on any device — phones, tablets, or desktops — without installs, pop-ups, or paywalls.</p>
<h2>What We Do</h2>
<ul>
  <li>Hand-pick and curate high-quality casual games across puzzle, sorting, match-3, action and arcade.</li>
  <li>Optimize every page for instant load and smooth mobile performance.</li>
  <li>Keep the experience free, lightweight, and respectful of your time and data.</li>
</ul>
<h2>Why Tapzens</h2>
<div class="info-cards">
  <div class="c"><b>${games.length}+ games</b><span>A growing catalog of curated titles.</span></div>
  <div class="c"><b>Mobile-first</b><span>Touch-optimized and fast on any phone.</span></div>
  <div class="c"><b>No install</b><span>Play instantly in the browser.</span></div>
  <div class="c"><b>Free forever</b><span>No paywalls or forced sign-ups.</span></div>
</div>
<h2>More from Tapzens</h2>
<ul>
  <li>Looking to join us? See <a href="/job.html">Careers</a> for open roles.</li>
  <li>Want to work together? Visit <a href="/partnerships.html">Partnerships</a>.</li>
</ul>
<h2>Get in touch</h2>
<p>Have a question, feedback, or a game to share? We'd love to hear from you.</p>
<p class="cta-mail">Email: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>
`;
const jobBody = `
<h1 class="static-h1">Careers at Tapzens</h1>
<p class="static-lead">We're a small, remote-first team on a mission to make casual games effortless to play. Join us and help millions of players tap into fun — everywhere, on any device.</p>
<h2>Why Join Tapzens</h2>
<div class="info-cards">
  <div class="c"><b>Global reach</b><span>Your work ships to players in US, JP and beyond the moment it lands.</span></div>
  <div class="c"><b>Ship fast</b><span>No red tape. Ideas go from proposal to production in days, not quarters.</span></div>
  <div class="c"><b>Own it end-to-end</b><span>Every role owns real outcomes, from first commit to player feedback.</span></div>
  <div class="c"><b>Remote by design</b><span>Built async from day one — work from wherever you do your best work.</span></div>
</div>
<h2>How We Work</h2>
<ul>
  <li>Remote-first and async-friendly — we measure outcomes, not hours.</li>
  <li>A small senior team where your work ships to real players fast.</li>
  <li>Owner mindset: you take features and products from idea to launch.</li>
  <li>Players first: every decision starts from what makes the game and portal better.</li>
  <li>Keep it light: our pages, our games and our processes stay fast and simple.</li>
</ul>
<h2>Benefits</h2>
<ul>
  <li>Fully remote with flexible working hours.</li>
  <li>Competitive pay with performance-based bonuses.</li>
  <li>Paid time off and public holidays.</li>
  <li>Home-office and equipment allowance.</li>
  <li>Learning budget for courses, books and conferences.</li>
  <li>Direct impact in a lean team — no politics, no busywork.</li>
</ul>
<h2>Open Roles</h2>
<div class="role-list">
  <div class="role"><h3>HTML5 Game Developer (Cocos / Phaser)</h3><p class="rmeta">Remote · Full-time</p><p>Build lightweight, performant HTML5 casual games that load instantly and feel great to play.</p><ul><li>Strong Cocos Creator or Phaser experience — we ship polished games fast.</li><li>A sharp sense of satisfying game feel, pacing and difficulty curves.</li><li>Comfort optimizing for mobile web: memory, texture and load time.</li></ul></div>
  <div class="role"><h3>Frontend Engineer</h3><p class="rmeta">Remote · Full-time</p><p>Own the portal experience — fast static pages, responsive UI and a smooth game-loading pipeline.</p><ul><li>Modern vanilla JS and CSS with an eye for micro-interactions.</li><li>Performance mindset: Core Web Vitals and near-instant page loads.</li><li>Bonus: experience with SEO-driven content sites or static-site generation.</li></ul></div>
  <div class="role"><h3>Game Designer (Casual / Puzzle)</h3><p class="rmeta">Remote · Full-time</p><p>Design levels, mechanics and progression for our original casual and puzzle games.</p><ul><li>Proven track record in casual, puzzle or match-3 level design.</li><li>Comfort with data-driven iteration: funnel, retention and level-balance tuning.</li><li>Strong prototyping skills to test ideas quickly.</li></ul></div>
  <div class="role"><h3>Growth &amp; SEO Marketer</h3><p class="rmeta">Remote · Contract · US / JP</p><p>Drive organic growth for English and Japanese audiences through technical SEO, content and partnerships.</p><ul><li>Hands-on with technical SEO, structured data and content strategy.</li><li>Experience growing game or entertainment sites from zero to meaningful traffic.</li><li>Native-level English or Japanese with strong writing skills.</li></ul></div>
  <div class="role"><h3>Community &amp; Content Manager</h3><p class="rmeta">Remote · Part-time · US / JP</p><p>Grow and engage our player community across social channels, and craft content players actually enjoy.</p><ul><li>Experience running communities on X, TikTok, Reddit or Discord.</li><li>A feel for short-form game content that travels.</li><li>Self-driven and comfortable wearing several hats.</li></ul></div>
</div>
<h2>Hiring Process</h2>
<ol>
  <li>Apply — send your CV, portfolio and a short note on why you'd like to join.</li>
  <li>Intro chat — a relaxed 30-minute call to align on the role and your goals.</li>
  <li>Work sample — a short take-home task (or a walkthrough of past work).</li>
  <li>Final interview and offer — usually within two weeks of your first chat.</li>
</ol>
<h2>FAQ</h2>
<div class="faq">
  <details><summary>Where can I work from?</summary><p>Anywhere with reliable internet. We just ask for a few hours of overlap with our core working window (UTC+8) for team syncs.</p></details>
  <details><summary>Do you hire freelancers or part-time?</summary><p>Yes — marketing and content roles often start as contract or part-time arrangements, with room to grow into full-time.</p></details>
  <details><summary>What language do we work in?</summary><p>English is our working language across the team. Japanese fluency is a big plus for JP-market roles.</p></details>
  <details><summary>How long does the process take?</summary><p>From application to offer is typically two weeks. We keep it lean — no take-home marathons, no endless interview rounds.</p></details>
</div>
<h2>Don't see your role?</h2>
<p>We're always open to exceptional people. Send your CV and a short note on how you'd help — we read everything.</p>
<p class="cta-mail">Email: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>
`;
const partnershipsBody = `
<h1 class="static-h1">Business Partnerships</h1>
<p class="static-lead">We partner with game developers, publishers, and brands to bring great games to players worldwide.</p>
<h2>For Game Developers &amp; Publishers</h2>
<p>Have a polished HTML5 game? We help you reach players through a fast, mobile-first portal with fair, transparent terms. We handle hosting, performance, and discovery — you focus on building great games.</p>
<h2>For Advertisers &amp; Brands</h2>
<p>Connect with an engaged casual-gaming audience through non-intrusive, high-quality ad placements. We prioritize experiences that respect players.</p>
<h2>What We Offer</h2>
<ul>
  <li>A fast, mobile-optimized portal with global reach.</li>
  <li>Lightweight, non-intrusive monetization that keeps players happy.</li>
  <li>Transparent reporting and fair revenue share for partners.</li>
</ul>
<h2>Let's Talk</h2>
<p>Tell us about your game or campaign and we'll get back to you.</p>
<p class="cta-mail">Email: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>
`;
function buildStaticPages() {
  buildStaticPage({ slug: 'about', title: 'About Us — Tapzens', desc: 'About Tapzens, a free online games portal on a mission to make casual games effortless to play on any device.', h1: 'About Us', body: aboutBody, navActive: 'about' });
  buildStaticPage({ slug: 'job', title: 'Careers — Tapzens', desc: 'Join Tapzens and help build the fastest, friendliest place to play casual HTML5 games. See open roles, benefits and how we hire.', h1: 'Careers', body: jobBody, faq: [
    { q: 'Where can I work from?', a: 'Anywhere with reliable internet. We just ask for a few hours of overlap with our core working window (UTC+8) for team syncs.' },
    { q: 'Do you hire freelancers or part-time?', a: 'Yes — marketing and content roles often start as contract or part-time arrangements, with room to grow into full-time.' },
    { q: 'What language do we work in?', a: 'English is our working language across the team. Japanese fluency is a big plus for JP-market roles.' },
    { q: 'How long does the process take?', a: 'From application to offer is typically two weeks. We keep it lean — no take-home marathons, no endless interview rounds.' }
  ] });
  buildStaticPage({ slug: 'partnerships', title: 'Partnerships — Tapzens', desc: 'Partner with Tapzens — for game developers, publishers, and brands looking to reach casual gamers worldwide.', h1: 'Partnerships', body: partnershipsBody });
  console.log('3 static pages generated');
}

/* ---------- category page ---------- */
function buildCategory(cat) {
  const list = games.filter(g => g.category.toLowerCase() === cat.slug);
  const url = 'https://' + SITE.domain + '/c/' + cat.slug + '.html';
  const title = esc(cat.name) + ' Games — Play Free Online | ' + esc(SITE.name);
  const desc = 'Play free ' + esc(cat.name.toLowerCase()) + ' games online. ' + esc(cat.description) + ' Instant play in your browser — no download, mobile-friendly.';
  const bcrumb = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://' + SITE.domain + '/' },
      { '@type': 'ListItem', position: 2, name: cat.name + ' Games', item: url }
    ]
  };
  const itemList = {
    '@context': 'https://schema.org', '@type': 'ItemList',
    name: cat.name + ' Games', description: cat.description,
    itemListElement: list.map((g, i) => ({ '@type': 'ListItem', position: i + 1, url: 'https://' + SITE.domain + '/g/' + g.slug + '.html', name: g.title }))
  };
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="googlebot" content="index, follow">
${HEAD_ICONS}
<meta name="theme-color" content="#0B1020">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="https://${esc(SITE.domain)}/assets/og.png">
<meta name="twitter:card" content="summary">
<script type="application/ld+json">${JSON.stringify(bcrumb)}</script>
<script type="application/ld+json">${JSON.stringify(itemList)}</script>
<link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
${topbar('categories')}
<main class="container">
  <nav class="crumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="sep">›</span><span class="cur">${esc(cat.name)} Games</span></nav>
  <section class="hero" style="margin-top:18px">
    <div>
      <h1>${esc(cat.name)} Games</h1>
      <p>${esc(cat.description)} Play instantly in your browser — no download, no sign-up, free forever.</p>
      <div class="badges"><span class="b">${list.length} games</span><span class="b">Mobile-friendly</span><span class="b">Free</span></div>
    </div>
  </section>
  <section class="block">
    <div class="section-head"><h2>All ${esc(cat.name)} Games</h2></div>
    <div class="grid">${list.map((g, i) => cardHtml(g, { first: i < 4 })).join('')}</div>
  </section>
</main>
${footer()}
${bottomNav('')}
<script src="/assets/js/app.js"></script>
</body>
</html>`;
  write('c/' + cat.slug + '.html', html);
}
function buildCategories() { ensureDir('c'); for (const c of (data.categories || [])) buildCategory(c); console.log(`${(data.categories || []).length} category pages generated`); }

/* ---------- sitemap ---------- */
function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const cats = data.categories || [];
  const sp = ['about', 'job', 'partnerships'];
  const urls = [
    `\n  <url><loc>https://${SITE.domain}/</loc><lastmod>${today}</lastmod><priority>1.0</priority></url>`,
    ...cats.map(c => `\n  <url><loc>https://${SITE.domain}/c/${c.slug}.html</loc><lastmod>${today}</lastmod><priority>0.9</priority></url>`),
    ...sp.map(s => `\n  <url><loc>https://${SITE.domain}/${s}.html</loc><lastmod>${today}</lastmod><priority>0.7</priority></url>`),
    ...games.map(g => `\n  <url><loc>https://${SITE.domain}/g/${g.slug}.html</loc><lastmod>${(g.publishedAt || today).slice(0, 10)}</lastmod><priority>0.8</priority></url>`)
  ].join('');
  write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}\n</urlset>\n`);
  console.log('sitemap.xml generated');
}

/* ---------- run ---------- */
copyCovers();
copyAvatars();
buildHome();
buildDetails();
buildCategories();
buildStaticPages();
buildSitemap();
console.log('Build complete.');
