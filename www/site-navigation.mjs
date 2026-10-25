/* Shared, server-rendered navigation. Every destination remains usable without JavaScript. */
export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const gameUrl = (game) => `/hyper-feed/${game.slug}/game.html`;
export const coverUrl = (game) => `/assets/covers/${game.cover || `${game.slug}.svg`}`;

const paths = {
  home: '<path d="m3 10 9-7 9 7v10H3z"/><path d="M9 20v-7h6v7"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  puzzle: '<path d="M9 3H4v6a3 3 0 1 1 0 6v6h6a3 3 0 1 1 6 0h5v-6a3 3 0 1 1 0-6V3h-6a3 3 0 1 1-6 0z"/>',
  bolt: '<path d="m13 2-9 12h7l-1 8 10-12h-7z"/>',
  game: '<path d="M7 7h10c3 0 5 10 3 12-2 2-5-3-6-3h-4c-1 0-4 5-6 3C2 17 4 7 7 7z"/><path d="M7 10v4m-2-2h4m7-1h.01m2 3h.01"/>',
  book: '<path d="M12 5C9 3 5 3 2 4v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1v15"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  shuffle: '<path d="m3 5 18 14m-4 0h4v-4M3 19 9 14m6-4 6-5m-4 0h4v4"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  star: '<path d="m12 3 2.8 5.8 6.4.9-4.6 4.5 1.1 6.3L12 17.5l-5.7 3 1.1-6.3-4.6-4.5 6.4-.9z"/>',
};
export const icon = (name) => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.game}</svg>`;
export const logo = (site) => `<a class="logo" href="/" aria-label="${escapeHtml(site.name)} home"><img src="/assets/logo.svg" alt="" width="36" height="36"><span class="word">${escapeHtml(site.name.toLowerCase())}<span class="brand-period">.</span></span></a>`;

export const navigation = (site, games, active = '') => {
  const link = (href, label, symbol, selected, end = '') => `<a href="${href}"${selected ? ' class="active" aria-current="page"' : ''}>${icon(symbol)}<span>${label}</span>${end}</a>`;
  const category = (slug, label, symbol) => link(`/c/${slug}.html`, label, symbol, active === slug, `<small>${games.filter(g => g.category.toLowerCase() === slug).length}</small>`);
  return `<a class="skip-link" href="#main-content">Skip to content</a>
<aside class="sidebar" aria-label="Site navigation">
  ${logo(site)}<p class="brand-caption">Good games. Great breaks.</p>
  <nav class="nav-main" aria-label="Discover games">
    ${link('/', 'Discover', 'home', active === 'home')}
    ${link('/#all', 'All games', 'grid', false)}
    ${link('/#favorites', 'Favorites', 'heart', false, '<small data-favorite-count hidden>0</small>')}
    ${link('/#recent', 'Recently played', 'clock', false)}
  </nav>
  <p class="nav-label">Find your kind of fun</p>
  <nav class="category-nav" aria-label="Game categories">
    ${category('puzzle', 'Puzzle', 'puzzle')}${category('action', 'Action', 'bolt')}${category('arcade', 'Arcade', 'game')}
    ${link('/t/relaxing.html', 'Relaxing', 'star', false)}
  </nav>
  <p class="nav-label">A little extra</p>
  <nav class="category-nav" aria-label="More from Zupilo">${link('/guides.html', 'Guides & tips', 'book', active === 'guides')}${link('/about.html', 'About Zupilo', 'game', active === 'about')}</nav>
  <div class="sidebar-bottom"><div class="break-card">${icon('game')}<b>Make time for play.</b><p>Your next little escape is right here.</p><a href="/#all">Find a game ${icon('arrow')}</a></div><a class="sidebar-privacy" href="/privacy-policy.html">Privacy</a><span aria-hidden="true"> · </span><a class="sidebar-privacy" href="/contact.html">Get in touch</a></div>
</aside>
<header class="topbar"><div class="wrap">
  <div class="mobile-brand">${logo(site)}</div>
  <div class="header-context">Your daily dose of <span>play.</span></div>
  <div class="search" role="search">
    <input id="game-search" type="search" role="combobox" aria-expanded="false" aria-controls="search-results" aria-autocomplete="list" placeholder="Find your next favorite game…" aria-label="Search games" autocomplete="off">
    <span class="ico">${icon('search')}</span><button class="clear" type="button" aria-label="Clear search">${icon('close')}</button>
    <div class="results" id="search-results" role="listbox" aria-label="Search results"></div>
  </div>
  <button class="surprise-btn" type="button" data-surprise>${icon('shuffle')}<span>Surprise me</span></button>
  <button class="icon-btn" type="button" data-search-toggle aria-label="Open search" aria-expanded="false" aria-controls="game-search">${icon('search')}</button>
</div></header>`;
};

export const mobileNavigation = (active) => `<nav class="bottomnav" aria-label="Mobile navigation">${[
  ['/', 'Discover', 'home', active === 'home'], ['/#all', 'Games', 'grid', false],
  ['/#favorites', 'Favorites', 'heart', false], ['/#recent', 'Recent', 'clock', false],
].map(([href, label, name, on]) => `<a href="${href}"${on ? ' class="active" aria-current="page"' : ''}>${icon(name)}<span>${label}</span></a>`).join('')}</nav>`;

export const gameCard = (game, { first = false } = {}) => `<article class="card" data-slug="${game.slug}">
  <a class="card-link" href="${gameUrl(game)}" aria-label="Play ${escapeHtml(game.title)}">
    <div class="thumb"><img src="${coverUrl(game)}" alt="${escapeHtml(game.title)}" width="240" height="240" ${first ? '' : 'loading="lazy"'} decoding="async"><span class="play-ov"><span class="pcircle">${icon('arrow')}</span></span></div>
    <div class="info"><h3 class="title">${escapeHtml(game.title)}</h3><div class="meta"><span class="cat">${escapeHtml(game.category)}</span><span class="plays">Free to play</span></div></div>
  </a>
  <button class="card-favorite" type="button" data-card-fav="${game.slug}" aria-label="Save ${escapeHtml(game.title)} to favorites" aria-pressed="false">${icon('heart')}</button>
</article>`;
