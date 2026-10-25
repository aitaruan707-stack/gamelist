/* Shared catalogue, accessible search and game-page actions. No runtime dependencies. */
(function () {
  'use strict';
  var FAV = 'tapzens:favorites', RECENT = 'tapzens:recent'; // Keep existing players' collections.
  var read = function (key) {
    try { var value = JSON.parse(localStorage.getItem(key)); return Array.isArray(value) ? value : []; }
    catch (e) { return []; }
  };
  var write = function (key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {} };
  var escapeHtml = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var getData = function () {
    try { var value = JSON.parse(document.getElementById('games-data').textContent); return Array.isArray(value) ? { games: value } : value; }
    catch (e) { return { games: [] }; }
  };
  var coverUrl = function (g) { return '/assets/covers/' + (g.cover || g.slug + '.svg'); };
  var detailUrl = function (g) { return '/hyper-feed/' + g.slug + '/game.html'; };
  var isFav = function (slug) { return read(FAV).indexOf(slug) !== -1; };
  var toggleFav = function (slug) {
    var list = read(FAV), index = list.indexOf(slug);
    if (index < 0) list.push(slug); else list.splice(index, 1);
    write(FAV, list); document.dispatchEvent(new Event('zupilo:favorites'));
    return index < 0;
  };
  var addRecent = function (slug) {
    var list = read(RECENT).filter(function (r) { return r && r.id !== slug; });
    list.unshift({ id: slug, ts: Date.now() }); write(RECENT, list.slice(0, 12));
  };
  var heart = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/></svg>';
  var cardHtml = function (g) {
    var title = escapeHtml(g.title), on = isFav(g.slug);
    return '<article class="card" data-slug="' + g.slug + '"><a class="card-link" href="' + detailUrl(g) + '" aria-label="Play ' + title + '"><div class="thumb"><img src="' + coverUrl(g) + '" alt="' + title + '" width="240" height="240" loading="lazy" decoding="async"><span class="play-ov"><span class="pcircle" aria-hidden="true">→</span></span></div><div class="info"><h3 class="title">' + title + '</h3><div class="meta"><span class="cat">' + escapeHtml(g.category) + '</span><span class="plays">Free to play</span></div></div></a><button class="card-favorite" type="button" data-card-fav="' + g.slug + '" aria-label="' + (on ? 'Remove ' + title + ' from favorites' : 'Save ' + title + ' to favorites') + '" aria-pressed="' + on + '">' + heart + '</button></article>';
  };
  var track = function (event, parameters) { if (typeof window.gtag === 'function') window.gtag('event', event, parameters || {}); };
  window.Zupilo = window.Tapzens = { getData: getData, coverUrl: coverUrl, detailUrl: detailUrl, playUrl: function (g) { return '/play.html?id=' + g.slug; }, isFav: isFav, toggleFav: toggleFav, addRecent: addRecent, read: read, write: write, escapeHtml: escapeHtml, cardHtml: cardHtml, track: track };

  var initSearch = function () {
    var box = document.querySelector('.search'); if (!box) return;
    var input = box.querySelector('input'), results = box.querySelector('.results'), clear = box.querySelector('.clear');
    var toggle = document.querySelector('[data-search-toggle]'), games = getData().games || [], timer, selected = -1;
    var close = function () { clearTimeout(timer); results.classList.remove('open'); input.setAttribute('aria-expanded', 'false'); input.removeAttribute('aria-activedescendant'); selected = -1; };
    var query = function () {
      var term = input.value.trim().toLowerCase(); close(); if (!term) return;
      var matches = games.filter(function (g) { return [g.title, g.category, g.description || ''].concat(g.tags || []).join(' ').toLowerCase().indexOf(term) !== -1; }).slice(0, 8);
      results.innerHTML = matches.length ? matches.map(function (g, i) { return '<a id="search-game-' + i + '" role="option" aria-selected="false" href="' + detailUrl(g) + '"><img src="' + coverUrl(g) + '" alt="" width="40" height="40"><span><span class="r-t">' + escapeHtml(g.title) + '</span><span class="r-c">' + escapeHtml(g.category) + ' · Free to play</span></span></a>'; }).join('') : '<div class="empty" role="status">No games found. Try “puzzle” or “sort”.</div>';
      results.classList.add('open'); input.setAttribute('aria-expanded', 'true');
    };
    input.addEventListener('input', function () { box.classList.toggle('has-val', !!input.value); clearTimeout(timer); timer = setTimeout(query, 120); });
    input.addEventListener('focus', query);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { close(); box.classList.remove('open'); if (toggle) { toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); } return; }
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'Enter') return;
      if (!results.classList.contains('open')) query();
      if (!results.classList.contains('open')) return;
      var links = results.querySelectorAll('a'); if (!links.length) return;
      e.preventDefault();
      if (e.key === 'Enter') { links[Math.max(0, selected)].click(); return; }
      selected = (selected + (e.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length;
      links.forEach(function (link, i) { link.classList.toggle('kbd', i === selected); link.setAttribute('aria-selected', String(i === selected)); });
      input.setAttribute('aria-activedescendant', links[selected].id); links[selected].scrollIntoView({ block: 'nearest' });
    });
    clear.addEventListener('click', function () { clearTimeout(timer); input.value = ''; box.classList.remove('has-val'); close(); input.focus(); });
    if (toggle) toggle.addEventListener('click', function () { var open = box.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); if (open) input.focus(); else close(); });
    document.addEventListener('click', function (e) { if (!box.contains(e.target) && !(toggle && toggle.contains(e.target))) close(); });
    document.addEventListener('keydown', function (e) {
      if (!((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) return;
      e.preventDefault(); box.classList.add('open'); if (toggle) toggle.setAttribute('aria-expanded', 'true'); input.focus();
    });
    box.addEventListener('focusout', function () { setTimeout(function () { if (!box.contains(document.activeElement)) close(); }, 0); });
  };
  var initGame = function () {
    var slug = document.body.dataset.game; if (!slug) return;
    addRecent(slug); track('game_open', { game_id: slug });
    var button = document.querySelector('[data-fav]'); if (!button) return;
    var paint = function () { var on = isFav(slug); button.classList.toggle('active', on); button.setAttribute('aria-pressed', String(on)); button.querySelector('.lbl').textContent = on ? 'Saved to favorites' : 'Save favorite'; };
    paint(); button.addEventListener('click', function () { var on = toggleFav(slug); paint(); track('favorite_game', { game_id: slug, saved: on }); });
    var recent = document.getElementById('gh-recent'), panel = document.getElementById('gh-recent-card');
    var games = getData().games || [];
    var items = read(RECENT).map(function (r) { return games.find(function (g) { return r && g.slug === r.id && g.slug !== slug; }); }).filter(Boolean).slice(0, 4);
    if (!recent || !panel || !items.length) return;
    panel.hidden = false;
    recent.innerHTML = items.map(function (g) { return '<a class="mini" href="' + detailUrl(g) + '"><img src="' + coverUrl(g) + '" alt="" width="62" height="46"><span><span class="mt">' + escapeHtml(g.title) + '</span><span class="ms">' + escapeHtml(g.category) + '</span></span></a>'; }).join('');
  };
  var initNavigation = function () {
    var update = function () {
      if (location.pathname !== '/') return;
      document.querySelectorAll('.nav-main a, .bottomnav a').forEach(function (a) {
        var on = a.getAttribute('href') === '/' + location.hash;
        a.classList.toggle('active', on); if (on) a.setAttribute('aria-current', location.hash ? 'location' : 'page'); else a.removeAttribute('aria-current');
      });
    };
    window.addEventListener('hashchange', update); update();
    var button = document.querySelector('[data-surprise]');
    if (button) button.addEventListener('click', function () {
      var games = (getData().games || []).filter(function (g) { return g.slug !== document.body.dataset.game; }); if (!games.length) return;
      var game = games[Math.floor(Math.random() * games.length)]; track('select_content', { content_type: 'game', item_id: game.slug, method: 'surprise' }); location.assign(detailUrl(game));
    });
  };
  var boot = function () { initSearch(); initNavigation(); initGame(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
