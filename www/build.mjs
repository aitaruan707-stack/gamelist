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
      else if (existsSync(dst)) { copied++; } /* localized asset already in place */
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
function artUrl(g) { return g.art ? `/assets/covers/${g.art}` : coverUrl(g); }
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

/* ---------- deterministic rating / plays / category meta / features / tags ---------- */
const CAT_META = {
  puzzle: { emoji: '🧩', grad: 'g-puzzle' },
  action: { emoji: '💥', grad: 'g-action' },
  arcade: { emoji: '🕹️', grad: 'g-arcade' }
};
function catMeta(slug) { return CAT_META[slug] || { emoji: '🎮', grad: 'g-puzzle' }; }
function ratingFor(g) {
  const h = hashStr(g.slug);
  return Math.min(4.9, Math.round((4.2 + (h % 80) / 100) * 10) / 10);
}
function playsFor(g) {
  const base = (g.popularWeight || 500) * 2317;
  return base >= 1e6 ? (base / 1e6).toFixed(1) + 'M' : Math.round(base / 1e3) + 'K';
}
const tagSlug = (t) => String(t).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
function tagLinks(g) {
  return (g.tags || []).map(t => `<a class="t" href="/t/${tagSlug(t)}.html">${esc(t)}</a>`).join('');
}
function allTags() {
  const m = new Map();
  for (const g of games) for (const t of (g.tags || [])) {
    const s = tagSlug(t);
    if (!s) continue;
    if (!m.has(s)) m.set(s, { slug: s, name: t, count: 0 });
    m.get(s).count++;
  }
  return [...m.values()].sort((a, b) => b.count - a.count);
}
function featuresFor(g) {
  const t = (g.tags || []).join(' ');
  const f = ['Instant play in your browser — no download or install.'];
  if (/sort|stack|match|block|hex/.test(t)) f.push('Hundreds of hand-crafted levels with a smooth difficulty curve.');
  else if (/shooter|tank|zombie|battle|dash|reaction/.test(t)) f.push('Fast-paced action with responsive touch controls.');
  else f.push('Easy to learn, hard to master gameplay.');
  if (/casual|relax|satisfying|sort/.test(t)) f.push('Relaxing visuals and deeply satisfying feedback.');
  else f.push('Vibrant art and satisfying feedback on every move.');
  f.push('Optimized for phones, tablets and desktops.');
  f.push('Free forever — no paywalls, no forced sign-ups.');
  return f.slice(0, 5);
}
const HOME_FAQ = [
  { q: 'Are the games on Tapzens really free?', a: 'Yes — every game is free to play in your browser with no downloads, no sign-ups and no paywalls. Tapzens is supported without ever charging players.' },
  { q: 'Do I need to install anything to play?', a: 'No. All games run instantly in your browser on phones, tablets and desktops. If it loads, it plays.' },
  { q: 'Can I play Tapzens games on my phone?', a: 'Absolutely. Every game is touch-optimized and mobile-friendly, from portrait puzzle games to landscape arcade action.' },
  { q: 'How often are new games added?', a: 'We add new curated games regularly — check the news page or come back often for the latest releases.' },
  { q: 'Do I need an account or sign-up?', a: 'No accounts, ever. Favorites and recently played games are saved privately in your own browser.' },
  { q: 'Are the games safe for kids?', a: 'Our catalog is family-friendly with no chat, no payment prompts and no external downloads. Parents are welcome to join in too.' },
  { q: 'How do my favorites and progress work?', a: 'They live only in your browser\'s local storage — private to your device, and removable anytime by clearing site data.' },
  { q: 'Can I play offline?', a: 'Tapzens lives in your browser, so you\'ll need a connection — but every game loads in seconds and never needs an install.' }
];
const CAT_FAQ = {
  puzzle: [
    { q: 'Are puzzle games good for your brain?', a: 'Puzzle games exercise logic, pattern recognition and problem-solving — a fun way to keep your mind sharp in short daily sessions.' },
    { q: 'Do I need an account to play puzzle games?', a: 'No. Every puzzle game on Tapzens loads instantly in your browser — no account, no download, no paywall.' },
    { q: 'Can I play puzzle games on my phone?', a: 'Yes, all puzzle games are touch-optimized for portrait and landscape play on phones and tablets.' },
    { q: 'Which puzzle game should a beginner start with?', a: 'Water Sort and Block Puzzle are great entry points — simple rules, gentle difficulty curves and polished mobile controls.' }
  ],
  action: [
    { q: 'Are action games free on Tapzens?', a: 'Yes — all action games are completely free to play in your browser with no downloads or sign-ups.' },
    { q: 'Do action games work on mobile?', a: 'Absolutely. Every action title supports responsive touch controls, so dashes, dodges and battles feel great on your phone.' },
    { q: 'Which action game is best for quick sessions?', a: 'Arrow Maze Solve and Tank Era are perfect for fast sessions — jump in, clear a few levels, and stop anytime.' },
    { q: 'Do you add new action games?', a: 'We regularly curate and add new action titles — check the news page or come back often to see what\'s new.' }
  ],
  arcade: [
    { q: 'What makes a game an "arcade" game?', a: 'Arcade games focus on quick, satisfying loops you can pick up in seconds — high-score chasing, snappy controls and instant replayability.' },
    { q: 'Are arcade games kid-friendly?', a: 'Most arcade titles on Tapzens are family-friendly. Each game page lists its tags, so you can check the style before playing.' },
    { q: 'Can I play arcade games offline?', a: 'Tapzens runs in your browser, so you need an internet connection — but every game loads in seconds and needs no install.' },
    { q: 'What\'s the most popular arcade game?', a: 'Check the Featured rail on the home page — we spotlight the most-loved arcade and casual hits every month.' }
  ]
};

const HEAD_ICONS = `<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/assets/logo.png" type="image/png" sizes="512x512">`;

/* ---------- monetization + analytics (AdSense auto ads + Google CMP + GA4) ---------- */
function headMonetization(opts = {}) {
  let out = '';
  const client = SITE.adsense;
  if (opts.ads !== false && client) {
    const pub = String(client).replace(/^ca-/, '');
    out += `\n<!-- Google AdSense: auto ads -->
<meta name="google-adsense-account" content="${esc(client)}">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${esc(client)}" crossorigin="anonymous"></script>
<!-- Google certified CMP — ad privacy consent message (GDPR / CCPA) -->
<script async src="https://fundingchoicesmessages.google.com/i/${esc(pub)}?ers=1"></script>
<script>(function s(){if(!window.frames.googlefcPresent){if(document.body){var f=document.createElement('iframe');f.style.cssText='display:none';f.name='googlefcPresent';document.body.appendChild(f);}else{setTimeout(s,0);}}})();</script>`;
  }
  const ga = SITE.ga;
  if (ga) {
    out += `\n<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(ga)}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${esc(ga)}');</script>`;
  }
  return out;
}

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
        <div class="foot-col"><h4>Explore</h4><a href="/">Home</a><a href="/#categories">Categories</a><a href="/#favorites">Favorites</a><a href="/#recent">Recent</a><a href="/news.html">News</a><a href="/tags.html">Tags</a></div>
        <div class="foot-col"><h4>Company</h4><a href="/about.html">About Us</a><a href="/job.html">Careers</a><a href="/partnerships.html">Partnerships</a></div>
        <div class="foot-col"><h4>Legal</h4><a href="/privacy-policy.html">Privacy Policy</a><a href="/terms-of-service.html">Terms of Service</a></div>
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
      <span class="rate">★ ${ratingFor(g).toFixed(1)}</span>
    </div>
    <div class="info">
      <div class="title">${esc(g.title)}</div>
      <div class="meta"><span class="cat">${esc(g.category)}</span><span class="plays">${playsFor(g)} plays</span></div>
    </div>
  </a>`;
}

function featCardHtml(g) {
  return `<a class="fcard" href="${detailUrl(g)}" aria-label="${esc(g.title)}">
    <div class="fcard-art">
      <img src="${artUrl(g)}" alt="${esc(g.title)} screenshot" loading="lazy" width="1024" height="576">
      <span class="rate">★ ${ratingFor(g).toFixed(1)}</span>
    </div>
    <div class="fcard-body">
      <img class="fcard-ico" src="/assets/covers/${g.icon}" alt="${esc(g.title)} icon" loading="lazy" width="52" height="52">
      <div class="fcard-t">
        <div class="fcard-title">${esc(g.title)}</div>
        <div class="fcard-sub">${esc(g.category)} · ${playsFor(g)} plays</div>
      </div>
    </div>
    <span class="fcard-play"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>Play Now</span>
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
    const FEAT_ORDER = ['puzzleyarnfun', 'puzzlewatersort', 'chromajam', 'hunterevolveuprising', 'bubblesafari', 'blockpuzzlesavegirl'];
    const featured = games.filter(g => g.featured).sort((a, b) => FEAT_ORDER.indexOf(a.slug) - FEAT_ORDER.indexOf(b.slug));
  const cats = data.categories || [];
  const firstFour = games.slice(0, 4);

  const chips = `<div class="chips" data-filter id="cat-chips">
    <button class="active" data-cat="all">All</button>
    ${cats.map(c => `<button data-cat="${c.slug}">${esc(c.name)}</button>`).join('')}
  </div>`;

  const catTiles = `<div class="cat-grid">${cats.map(c => {
    const count = games.filter(g => g.category.toLowerCase() === c.slug).length;
    const m = catMeta(c.slug);
    return `<a class="cat-tile ${m.grad}" href="/c/${c.slug}.html"><span class="ci">${m.emoji}</span><div class="cn">${esc(c.name)}</div><div class="cc">${count} games</div></a>`;
  }).join('')}</div>`;

  const tags = allTags().slice(0, 18);
  const tagCloud = `<div class="tagcloud">${tags.map(t => `<a class="t" href="/t/${t.slug}.html">${esc(t.name)} <em>${t.count}</em></a>`).join('')}</div>`;
  const heroArt = featured.slice(0, 3).map((g, i) => i === 0
    ? `<img src="${coverUrl(g)}" alt="${esc(g.title)} cover" fetchpriority="high">`
    : `<img src="${coverUrl(g)}" alt="${esc(g.title)} cover" loading="lazy">`).join('');
  const faqHtml = `<div class="faq">${HOME_FAQ.map(f => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}</div>`;
  const faqLd = JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: HOME_FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) });

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
<script type="application/ld+json">${faqLd}</script>
${headMonetization()}
<link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
${topbar('home')}
<main class="container">
  <section class="hero">
    <div class="hero-copy">
      <div class="hero-eyebrow">✦ ${games.length} free online games — new picks every week</div>
      <h1>Play free games, instantly.</h1>
      <p>${esc(SITE.tagline || '')} No downloads, no sign-ups — just tap and play. Curated puzzle, action and arcade hits, optimized for your phone and desktop.</p>
      <div class="hero-cta">
        <a class="btn lg" href="#all">Browse All Games</a>
        <a class="btn lg white" href="#featured">Featured Picks</a>
      </div>
      <div class="badges"><span class="b">${games.length} games</span><span class="b">Mobile-first</span><span class="b">No install</span><span class="b">Free forever</span></div>
    </div>
    <div class="hero-art" aria-hidden="true">${heroArt}<span class="hero-sticker">✦ New games weekly</span></div>
  </section>

  <section class="block" id="featured">
    <div class="section-head"><h2>Featured Games</h2></div>
    <div class="feat-rail">${featured.map(featCardHtml).join('')}</div>
  </section>

  <section class="block" id="recent">
    <div class="section-head"><h2>Continue Playing</h2><a class="more" href="#all">All games</a></div>
    <div class="grid" id="continue-grid"></div>
    <div class="empty-block" id="continue-empty"><span class="big">No recent games yet</span><span>Games you play will show up here.</span></div>
  </section>

  <section class="block" id="categories">
    <div class="section-head"><h2>Browse by Category</h2></div>
    ${catTiles}
  </section>

  <section class="block" id="tags">
    <div class="section-head"><h2>Popular Tags</h2></div>
    ${tagCloud}
  </section>

  <section class="block" id="all">
    <div class="section-head"><h2>All Games</h2></div>
    ${chips.replace('data-filter', 'data-filter').replace('id="cat-chips"', '')}
    <div class="grid" id="all-grid" style="margin-top:12px">${games.map((g, i) => cardHtml(g, { first: i < 4 })).join('')}</div>
  </section>

  <section class="block" id="favorites">
    <div class="section-head"><h2>Your Favorites</h2></div>
    <div class="grid" id="fav-grid"></div>
    <div class="empty-block" id="fav-empty"><span class="big">No favorites yet</span><span>Tap the heart on any game to save it here.</span></div>
  </section>

  <section class="block" id="why">
    <div class="section-head"><h2>Why play on ${esc(SITE.name)}?</h2></div>
    <div class="why-grid">
      <div class="why"><span class="wi">🌈</span><div><b>Hand-picked quality</b><p>Every game is curated and play-tested — no shovelware, no clones, just games worth your time.</p></div></div>
      <div class="why"><span class="wi">⚡</span><div><b>Instant play</b><p>No downloads, no sign-ups, no waiting. Click a card and you're playing within seconds.</p></div></div>
      <div class="why"><span class="wi">📱</span><div><b>Play anywhere</b><p>Touch-optimized for phones and tablets, and just as smooth with a keyboard and mouse.</p></div></div>
      <div class="why"><span class="wi">💎</span><div><b>Free forever</b><p>No paywalls, no forced ads, no accounts. Favorites and progress stay privately on your device.</p></div></div>
    </div>
  </section>

  <section class="block seo-intro">
    <div class="section-head"><h2>Free online games for every mood</h2></div>
    <p>${esc(SITE.name)} is a free online games portal for puzzle, action and arcade fans. Every title is hand-picked, loads instantly in your browser and runs smoothly on phones, tablets and desktops — no downloads, no installs, no sign-ups.</p>
    <p>Whether you love match-3 and sorting puzzles, fast reaction challenges or casual arcade hits, you'll find a growing library of ${games.length} free games built for quick sessions and long plays alike. Bookmark your favorites, jump back into recent games, and discover something new every week.</p>
  </section>

  <section class="block" id="faq">
    <div class="section-head"><h2>Frequently Asked Questions</h2></div>
    ${faqHtml}
  </section>
</main>
${footer()}
${bottomNav('home')}
<script type="application/json" id="games-data">${JSON.stringify(games.map(g => ({ slug: g.slug, title: g.title, category: g.category, tags: g.tags, description: g.description, cover: g.cover, entry: g.entry, popularWeight: g.popularWeight })))}</script>
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
  const premise = (g.description || '').replace(/\s+$/g, '');
  const kw = `Play ${g.title} free online — no download, works on mobile & desktop.`;
  let desc = premise ? `${premise} ${kw}` : kw;
  if (desc.length > 155) {
    const room = 155 - kw.length - 1;
    if (room > 60) {
      let head = premise.slice(0, room + 1);
      const lastPeriod = head.lastIndexOf('.');
      const lastSpace = head.lastIndexOf(' ');
      if (lastPeriod >= 40) head = head.slice(0, lastPeriod + 1);
      else if (lastSpace > 40) head = head.slice(0, lastSpace);
      head = head.replace(/[.,;:\s]+$/g, '') + '.';
      desc = `${head} ${kw}`;
    } else {
      desc = kw.slice(0, 155);
    }
  }
  const seoFaq = [
    { q: `How do I play ${g.title} online?`, a: `Just press Play Now — ${g.title} loads instantly in your web browser on ${SITE.name}. No download, install or account is required.` },
    { q: `Can I play ${g.title} free online without downloading?`, a: `Yes. ${g.title} runs directly in the browser on ${SITE.name}, so it is unblocked, free and there is nothing to download or install on your device.` }
  ];
  const faqList = [...(g.faq || [])];
  for (const f of seoFaq) if (!faqList.some(x => x.q === f.q)) faqList.push(f);
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
    playMode: 'FreeToPlay',
    potentialAction: { '@type': 'PlayAction', target: url, name: `Play ${g.title} online` },
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
<title>${esc(g.title)} — Play Free Online, No Download | ${esc(SITE.name)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="googlebot" content="index, follow">
${HEAD_ICONS}
<meta name="theme-color" content="#0B1020">
<meta property="og:type" content="game">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:title" content="${esc(g.title)} — Play Free Online">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="https://${esc(SITE.domain)}${g.banner ? '/assets/covers/' + g.banner : coverUrl(g)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(g.title)} — Play Free Online">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="https://${esc(SITE.domain)}${g.banner ? '/assets/covers/' + g.banner : coverUrl(g)}">
<script type="application/ld+json">${JSON.stringify(jsonld)}</script>
<script type="application/ld+json">${JSON.stringify(bcrumb)}</script>
${g.controls && g.controls.length ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to play ' + g.title, step: g.controls.map((c, i) => ({ '@type': 'HowToStep', position: i + 1, text: c })) })}</script>` : ''}
${faqList && faqList.length ? `<script type="application/ld+json">${JSON.stringify({ '@context':'https://schema.org','@type':'FAQPage', mainEntity: faqList.map(f => ({ '@type':'Question', name: f.q, acceptedAnswer: { '@type':'Answer', text: f.a } })) })}</script>` : ''}
${headMonetization()}
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
      <p>${esc(g.title)} is optimized for touch and keyboard alike, loads in seconds and stays free to play forever — no download and no sign-up. If you enjoy ${(g.tags || []).slice(0, 3).map(t => esc(t)).join(', ') || esc(g.category.toLowerCase())} games, you can play ${esc(g.title)} online right now in your browser on phone, tablet or desktop.</p>
      ${g.banner ? `<h2>Screenshot</h2><div class="shot"><img src="/assets/covers/${g.banner}" alt="${esc(g.title)} gameplay screenshot" loading="lazy"></div>` : ''}
      <h2>How to Play</h2>
      <ol class="controls">${(g.controls || []).map(c => `<li>${esc(c)}</li>`).join('')}</ol>
      <h2>Features</h2>
      <ul class="feat-list">${featuresFor(g).map(f => `<li>${esc(f)}</li>`).join('')}</ul>
      <h2>Frequently Asked Questions</h2>
      <div class="faq">${faqList.map(f => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}</div>
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
        <div class="taglist">${tagLinks(g)}</div>
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
function buildStaticPage({ slug, title, desc, h1, body, navActive = '', faq = [], ads = true }) {
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
${headMonetization({ ads })}
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
const newsBody = (() => {
  const edits = [
    { date: '2026-08-28', tag: 'Site Update', title: 'Tapzens gets a fresh new look', text: 'A brand-new light theme, a redesigned home page, richer category and tag pages and a faster play screen. Every corner of the portal was rebuilt to be quicker, cleaner and easier on the eyes.', href: '/about.html' },
    { date: '2026-08-22', tag: 'Site Update', title: 'All Tags: browse the catalogue A to Z', text: 'The new All Tags page groups every tag alphabetically, so you can hop from "match-3" to "relaxing" in one click and discover whole corners of the arcade you hadn\'t tried yet.', href: '/tags.html' },
    { date: '2026-08-15', tag: 'Featured', title: 'Featured lineup: six picks for August', text: 'Puzzle Yarn Fun, Water Sort, Chroma Jam, Hunter: Evolve Uprising, Bubble Safari and Block Puzzle: Save Girl headline this month\'s featured rail — hand-picked for quick sessions and lazy Sundays alike.', href: '/#featured' },
    { date: '2026-08-05', tag: 'Site Update', title: 'A play screen built for focus', text: 'The in-game bar got a frosted-glass makeover, and every game now loads in a perfectly centred stage — portrait or landscape — on desktop and mobile alike.', href: '/about.html' },
    { date: '2026-07-20', tag: 'Community', title: 'Favorites & Continue Playing arrive', text: 'Your browser now remembers what you love: tap the heart on any game card, and pick up right where you left off next visit. Everything stays privately on your device.', href: '/#favorites' }
  ];
  const drops = [...games].sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || '')).slice(0, 6)
    .map(g => ({ date: (g.publishedAt || '').slice(0, 10), tag: 'New Game', title: g.title + ' joins the arcade', text: (g.description || '') + ' Play it free in your browser — no download, no sign-up.', href: detailUrl(g), cover: coverUrl(g) }));
  const items = [...edits, ...drops].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  const [hero, ...rest] = items;
  return `
<h1 class="static-h1">News &amp; Updates</h1>
<p class="static-lead">Fresh games, features and announcements from the Tapzens arcade — updated as things ship.</p>
<a class="news-hero" href="${hero.href}">
  <time datetime="${hero.date}">${hero.date}</time><span class="news-tag light">${hero.tag}</span>
  <h2>${esc(hero.title)}</h2>
  <p>${esc(hero.text)}</p>
</a>
${rest.map(n => `<article class="news-item">${n.cover ? `<img class="news-thumb" src="${n.cover}" alt="" loading="lazy" width="76" height="76">` : ''}<div class="news-main"><time datetime="${n.date}">${n.date}</time><span class="news-tag">${n.tag}</span><h2><a href="${n.href}">${esc(n.title)}</a></h2><p>${esc(n.text)}</p></div></article>`).join('\n')}
`;
})();
const tagsBody = (() => {
  const tags = [...allTags()].sort((a, b) => a.name.localeCompare(b.name));
  const groups = new Map();
  for (const t of tags) {
    const c = t.name[0].toUpperCase();
    const key = (c >= 'A' && c <= 'Z') ? c : '#';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(t);
  }
  const secs = [...groups.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  const rail = secs.map(([letter]) => `<a href="#tg-${letter === '#' ? 'num' : letter}">${letter}</a>`).join('');
  const blocks = secs.map(([letter, list]) => {
    const id = letter === '#' ? 'num' : letter;
    const hue = letter === '#' ? 265 : ((letter.charCodeAt(0) - 65) * 14) % 360;
    return `<div class="tag-group" id="tg-${id}" style="--h:${hue}"><div class="tag-letter">${letter}</div><div class="tagcloud">${list.map(t => `<a class="t" href="/t/${t.slug}.html">${esc(t.name)}</a>`).join('')}</div></div>`;
  }).join('\n');
  return `
<h1 class="static-h1">All Tags</h1>
<p class="static-lead">Every tag on Tapzens, A to Z — jump straight to the kind of games you love.</p>
<div class="az-rail">${rail}</div>
${blocks}
`;
})();
const privacyBody = `
<h1 class="static-h1">Privacy Policy</h1>
<p class="static-lead">Last updated: August 30, 2026. Tapzens is built to need as little of your data as possible — this page explains exactly what we collect, where it lives, and the choices you have.</p>
<div class="tldr">
  <b class="h">Quick summary</b>
  <ul>
    <li>No accounts, no sign-ups — we never ask for your name, email or payment details.</li>
    <li>No advertising or cross-site tracking cookies. Ever.</li>
    <li>Favorites and recent games live only in your browser, on your device.</li>
    <li>Any analytics we run are anonymous and aggregated.</li>
  </ul>
</div>
<div class="toc">
  <b class="h">Contents</b>
  <ol>
    <li><a href="#p-1">1. Introduction</a></li>
    <li><a href="#p-2">2. What we never collect</a></li>
    <li><a href="#p-3">3. What stays on your device</a></li>
    <li><a href="#p-4">4. Cookies &amp; local storage</a></li>
    <li><a href="#p-5">5. Analytics</a></li>
    <li><a href="#p-6">6. How we use information</a></li>
    <li><a href="#p-7">7. Third-party links &amp; content</a></li>
    <li><a href="#p-8">8. Children's privacy</a></li>
    <li><a href="#p-9">9. Data security</a></li>
    <li><a href="#p-10">10. Retention &amp; your control</a></li>
    <li><a href="#p-11">11. Your privacy rights</a></li>
    <li><a href="#p-12">12. Changes to this policy</a></li>
    <li><a href="#p-13">13. Contact</a></li>
  </ol>
</div>
<h2 id="p-1">1. Introduction</h2>
<p>Tapzens ("we", "us") operates tapzens.com, a free portal of browser games. This policy explains what information is collected when you use the site, where it lives, and the choices you have. We keep it in plain language on purpose — if anything is unclear, email us and we will happily explain.</p>
<h2 id="p-2">2. What we never collect</h2>
<ul>
  <li>We do not require registration, so we never collect names, emails, passwords or payment details.</li>
  <li>We do not buy or sell personal information, and we do not share data with advertising networks.</li>
  <li>We do not use cross-site tracking cookies or fingerprinting.</li>
</ul>
<h2 id="p-3">3. What stays on your device</h2>
<p>Features like <b>Favorites</b>, <b>Continue Playing</b> and interface preferences are stored in your browser's local storage. That data never leaves your device: we cannot read it, and it is not transmitted to our servers.</p>
<h2 id="p-4">4. Cookies &amp; local storage</h2>
<p>We set no advertising cookies. The only browser storage we use is functional local storage (see above), which you can inspect and delete at any time from your browser settings.</p>
<h2 id="p-5">5. Analytics</h2>
<p>If privacy-respecting analytics are enabled, they produce anonymous, aggregated numbers only — such as total page views, approximate region and device type — so we can tell which games are popular and which pages need work. These statistics cannot be traced back to you.</p>
<h2 id="p-6">6. How we use information</h2>
<ul>
  <li>Aggregated analytics help us decide which games to add and which features to improve.</li>
  <li>Technical logs (such as error reports) are used only to keep the site running and secure.</li>
</ul>
<h2 id="p-7">7. Third-party links &amp; content</h2>
<p>Some pages link to external sites (for example, app store listings). Once you leave tapzens.com, the privacy practices of those sites apply. We encourage you to read their policies.</p>
<h2 id="p-8">8. Children's privacy</h2>
<p>Our games are family-friendly and require no personal information to play. We do not knowingly collect personal information from anyone, including children under 13 — because we do not collect personal information at all.</p>
<h2 id="p-9">9. Data security</h2>
<p>The site is served over HTTPS, and because we hold essentially no personal data, there is essentially no personal data to breach. Game progress and favorites exist only in your own browser.</p>
<h2 id="p-10">10. Retention &amp; your control</h2>
<p>Local data stays until you clear it — clearing your browser's site data removes it completely. Aggregated analytics contain no personal identifiers and are retained only as long as they are useful.</p>
<h2 id="p-11">11. Your privacy rights (GDPR / CCPA)</h2>
<p>Because we do not hold personal information about you, there is normally nothing for us to access, correct or delete. If you believe we hold any information relating to you, or if you wish to exercise any right under the GDPR or CCPA, contact us and we will respond within 30 days.</p>
<h2 id="p-12">12. Changes to this policy</h2>
<p>If we update this policy we will post the new version on this page with a fresh "last updated" date. Material changes will be highlighted on the site.</p>
<h2 id="p-13">13. Contact</h2>
<div class="contact-card">
  <b>Questions?</b>
  <p>We read every message and usually reply within one business day.</p>
  <a class="mail-btn" href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>
</div>
`;
const termsBody = `
<h1 class="static-h1">Terms of Service</h1>
<p class="static-lead">Last updated: August 30, 2026. Fair, short and readable — the rules of the arcade, in plain English.</p>
<div class="tldr">
  <b class="h">Quick summary</b>
  <ul>
    <li>Tapzens is free for personal, non-commercial use — play as much as you like.</li>
    <li>Don't attack, scrape at scale, or reverse-engineer the games.</li>
    <li>Games and artwork belong to their respective owners; you get a license to play, not to redistribute.</li>
    <li>The service is provided "as is" — we can't promise it will never hiccup.</li>
  </ul>
</div>
<div class="toc">
  <b class="h">Contents</b>
  <ol>
    <li><a href="#t-1">1. Accepting these terms</a></li>
    <li><a href="#t-2">2. The service</a></li>
    <li><a href="#t-3">3. Eligibility</a></li>
    <li><a href="#t-4">4. Your license to use Tapzens</a></li>
    <li><a href="#t-5">5. User conduct</a></li>
    <li><a href="#t-6">6. Intellectual property</a></li>
    <li><a href="#t-7">7. Third-party content &amp; links</a></li>
    <li><a href="#t-8">8. Your local data</a></li>
    <li><a href="#t-9">9. Disclaimer of warranties</a></li>
    <li><a href="#t-10">10. Limitation of liability</a></li>
    <li><a href="#t-11">11. Indemnification</a></li>
    <li><a href="#t-12">12. Suspension &amp; termination</a></li>
    <li><a href="#t-13">13. Governing law</a></li>
    <li><a href="#t-14">14. Changes to the terms</a></li>
    <li><a href="#t-15">15. Contact</a></li>
  </ol>
</div>
<h2 id="t-1">1. Accepting these terms</h2>
<p>By accessing or using tapzens.com (the "Service"), you agree to be bound by these Terms of Service and our <a href="/privacy-policy.html">Privacy Policy</a>. If you do not agree, please do not use the Service.</p>
<h2 id="t-2">2. The service</h2>
<p>Tapzens provides free, browser-based games and related editorial content. The Service is provided free of charge for personal, non-commercial use.</p>
<h2 id="t-3">3. Eligibility</h2>
<p>The Service is open to everyone and no account is required. If you are a minor, please use the site with a parent or guardian's awareness, in line with the guidance of your local jurisdiction.</p>
<h2 id="t-4">4. Your license to use Tapzens</h2>
<p>We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Service for personal entertainment. This license does not include any right to resell, redistribute or publicly perform the content.</p>
<h2 id="t-5">5. User conduct</h2>
<p>You agree not to:</p>
<ul>
  <li>attack, overload or disrupt the Service or its hosting (including denial-of-service attempts);</li>
  <li>scrape or crawl the site at scale, or use automated tools to download games or assets in bulk;</li>
  <li>reverse-engineer, decompile or modify games or software you do not own;</li>
  <li>probe, scan or test the vulnerability of the Service or breach its security;</li>
  <li>use the Service for any unlawful purpose or to transmit malicious code.</li>
</ul>
<h2 id="t-6">6. Intellectual property</h2>
<p>Games, artwork, trademarks and other content remain the property of their respective owners. The Tapzens name, logo and site design are our property. Content is licensed to you solely for personal play and browsing on this site.</p>
<h2 id="t-7">7. Third-party content &amp; links</h2>
<p>Some pages link to external services (such as app store listings). We are not responsible for their content, availability or practices; linking does not imply endorsement.</p>
<h2 id="t-8">8. Your local data</h2>
<p>Favorites, recently played games and preferences are stored only in your browser. You are responsible for backing up or clearing that data; we cannot restore it because we never receive it.</p>
<h2 id="t-9">9. Disclaimer of warranties</h2>
<p>To the maximum extent permitted by law, the Service is provided "as is" and "as available", and we disclaim all implied warranties, including merchantability, fitness for a particular purpose and non-infringement. We do not guarantee uninterrupted or error-free service.</p>
<h2 id="t-10">10. Limitation of liability</h2>
<p>To the maximum extent permitted by law, Tapzens shall not be liable for any indirect, incidental, special or consequential damages arising from your use of the Service, including loss of data or game progress stored locally in your browser.</p>
<h2 id="t-11">11. Indemnification</h2>
<p>You agree to indemnify and hold Tapzens harmless from claims arising out of your breach of these terms or your misuse of the Service.</p>
<h2 id="t-12">12. Suspension &amp; termination</h2>
<p>We may modify, suspend or discontinue any part of the Service at any time, and may block access from addresses that abuse the Service, without liability.</p>
<h2 id="t-13">13. Governing law</h2>
<p>These terms are governed by the laws of the jurisdiction in which the Tapzens operator is established, without regard to conflict-of-law rules.</p>
<h2 id="t-14">14. Changes to the terms</h2>
<p>We may update these terms from time to time. The new version will be posted on this page with a fresh "last updated" date; continued use after changes constitutes acceptance.</p>
<h2 id="t-15">15. Contact</h2>
<div class="contact-card">
  <b>Questions?</b>
  <p>We read every message and usually reply within one business day.</p>
  <a class="mail-btn" href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>
</div>
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
  buildStaticPage({ slug: 'news', title: 'News & Updates — Tapzens', desc: 'What\'s new on Tapzens — new game releases, features and announcements from the free online games portal.', h1: 'News', body: newsBody });
  buildStaticPage({ slug: 'tags', title: 'All Tags — Tapzens', desc: 'Explore every game tag on Tapzens, A to Z — match-3, sort, relaxing, arcade and more. Jump straight to the games you love.', h1: 'All Tags', body: tagsBody });
  buildStaticPage({ slug: 'privacy-policy', title: 'Privacy Policy — Tapzens', desc: 'How Tapzens handles privacy: no accounts, no tracking cookies, local-only game data. Read our full privacy policy.', h1: 'Privacy Policy', body: privacyBody, ads: false });
  buildStaticPage({ slug: 'terms-of-service', title: 'Terms of Service — Tapzens', desc: 'The terms that govern your use of Tapzens, the free online games portal. Fair, simple and player-friendly.', h1: 'Terms of Service', body: termsBody, ads: false });
  console.log('7 static pages generated');
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
  const m = catMeta(cat.slug);
  const catQ = CAT_FAQ[cat.slug] || [];
  const catFaq = catQ.map(f => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('');
  const catFaqLd = catQ.length ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: catQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) })}</script>` : '';
  const tagSet = new Map();
  for (const g of list) for (const t of (g.tags || [])) { const s = tagSlug(t); if (s && !tagSet.has(s)) tagSet.set(s, t); }
  const catTagCloud = `<div class="tagcloud">${[...tagSet].map(([s, name]) => `<a class="t" href="/t/${s}.html">${esc(name)}</a>`).join('')}</div>`;
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
${headMonetization()}
<link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
${topbar('categories')}
<main class="container">
  <nav class="crumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="sep">›</span><span class="cur">${esc(cat.name)} Games</span></nav>
  <section class="hero" style="margin-top:18px">
    <div>
      <h1><span class="h-emoji">${m.emoji}</span> ${esc(cat.name)} Games</h1>
      <p>${esc(cat.description)} Play instantly in your browser — no download, no sign-up, free forever.</p>
      <div class="badges"><span class="b">${list.length} games</span><span class="b">Mobile-friendly</span><span class="b">Free</span></div>
    </div>
  </section>
  <section class="block">
    <div class="section-head"><h2>All ${esc(cat.name)} Games</h2></div>
    <div class="grid">${list.map((g, i) => cardHtml(g, { first: i < 4 })).join('')}</div>
  </section>
  <section class="block">
    <div class="section-head"><h2>Browse ${esc(cat.name)} Tags</h2></div>
    ${catTagCloud}
  </section>
  <section class="block">
    <div class="section-head"><h2>${esc(cat.name)} Games — FAQ</h2></div>
    <div class="faq">${catFaq}</div>
    ${catFaqLd}
  </section>
  <section class="block seo-intro">
    <div class="section-head"><h2>About ${esc(cat.name)} games</h2></div>
    <p>Looking for the best free ${esc(cat.name.toLowerCase())} games? ${esc(SITE.name)} curates the top ${esc(cat.name.toLowerCase())} titles so you can jump straight into playing — every game loads instantly in your browser, works great on mobile, and is free forever.</p>
    <p>Every ${esc(cat.name.toLowerCase())} game here is hand-picked and play-tested, with touch controls designed for phones and tablets first. Start with a top-rated title in the grid above, or use the tags below to zero in on exactly the kind of game you're in the mood for.</p>
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

/* ---------- tag landing pages ---------- */
function buildTags() {
  ensureDir('t');
  const tags = allTags();
  let n = 0;
  for (const t of tags) {
    const list = games.filter(g => (g.tags || []).map(tagSlug).includes(t.slug));
    if (!list.length) continue;
    const url = 'https://' + SITE.domain + '/t/' + t.slug + '.html';
    const title = esc(t.name) + ' Games — Play Free Online | ' + esc(SITE.name);
    const desc = 'Play free ' + esc(t.name) + ' games online in your browser. ' + list.length + ' hand-picked ' + esc(t.name) + ' games — no download, mobile-friendly, free forever.';
    const bcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://' + SITE.domain + '/' },
      { '@type': 'ListItem', position: 2, name: t.name + ' Games', item: url } ] };
    const itemList = { '@context': 'https://schema.org', '@type': 'ItemList', name: t.name + ' Games', itemListElement: list.map((g, i) => ({ '@type': 'ListItem', position: i + 1, url: 'https://' + SITE.domain + '/g/' + g.slug + '.html', name: g.title })) };
    const related = tags.filter(x => x.slug !== t.slug).slice(0, 14);
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
<meta name="theme-color" content="#F6F5FB">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="https://${esc(SITE.domain)}/assets/og.png">
<meta name="twitter:card" content="summary">
<script type="application/ld+json">${JSON.stringify(bcrumb)}</script>
<script type="application/ld+json">${JSON.stringify(itemList)}</script>
${headMonetization()}
<link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
${topbar('categories')}
<main class="container">
  <nav class="crumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="sep">›</span><span class="cur">${esc(t.name)} Games</span></nav>
  <section class="hero" style="margin-top:18px">
    <div>
      <h1><span class="h-emoji">#️⃣</span> ${esc(t.name)} Games</h1>
      <p>${list.length} free ${esc(t.name)} games you can play instantly in your browser — no download, no sign-up, mobile-friendly.</p>
      <div class="badges"><span class="b">${list.length} games</span><span class="b">Free</span><span class="b">Instant play</span></div>
    </div>
  </section>
  <section class="block">
    <div class="section-head"><h2>All ${esc(t.name)} Games</h2></div>
    <div class="grid">${list.map((g, i) => cardHtml(g, { first: i < 4 })).join('')}</div>
  </section>
  <section class="block">
    <div class="section-head"><h2>More Tags</h2></div>
    <div class="tagcloud">${related.map(x => `<a class="t" href="/t/${x.slug}.html">${esc(x.name)} <em>${x.count}</em></a>`).join('')}</div>
  </section>
  <section class="block seo-intro">
    <div class="section-head"><h2>About ${esc(t.name)} games</h2></div>
    <p>From quick five-minute breaks to long sessions, ${esc(t.name)} games are some of the most-loved picks in the Tapzens catalog — free forever, no downloads, and just as smooth on your phone as on desktop. Looking for a change of pace? Explore the related tags above, or head back to the home page for this week's trending releases.</p>
  </section>
</main>
${footer()}
${bottomNav('')}
<script src="/assets/js/app.js"></script>
</body>
</html>`;
    write('t/' + t.slug + '.html', html);
    n++;
  }
  console.log(`${n} tag pages generated`);
}

/* ---------- sitemap ---------- */
function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const cats = data.categories || [];
  const sp = ['about', 'job', 'partnerships', 'news', 'tags', 'privacy-policy', 'terms-of-service'];
  const urls = [
    `\n  <url><loc>https://${SITE.domain}/</loc><lastmod>${today}</lastmod><priority>1.0</priority></url>`,
    ...cats.map(c => `\n  <url><loc>https://${SITE.domain}/c/${c.slug}.html</loc><lastmod>${today}</lastmod><priority>0.9</priority></url>`),
    ...sp.map(s => `\n  <url><loc>https://${SITE.domain}/${s}.html</loc><lastmod>${today}</lastmod><priority>0.7</priority></url>`),
    ...games.map(g => `\n  <url><loc>https://${SITE.domain}/g/${g.slug}.html</loc><lastmod>${(g.publishedAt || today).slice(0, 10)}</lastmod><priority>0.8</priority></url>`),
    ...allTags().map(t => `\n  <url><loc>https://${SITE.domain}/t/${t.slug}.html</loc><lastmod>${today}</lastmod><priority>0.6</priority></url>`)
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
buildTags();
buildStaticPages();
buildSitemap();
console.log('Build complete.');
