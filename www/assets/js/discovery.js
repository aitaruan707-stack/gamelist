/* Catalogue filters, sorting and persistent personal shelves. */
(function () {
  'use strict';
  var site = window.Zupilo; if (!site) return;
  var games = site.getData().games || [], category = 'all', sort = 'picks';
  var paintFavorites = function () {
    document.querySelectorAll('[data-card-fav]').forEach(function (button) {
      var slug = button.dataset.cardFav, game = games.find(function (g) { return g.slug === slug; });
      var on = site.isFav(slug); button.setAttribute('aria-pressed', String(on));
      button.setAttribute('aria-label', (on ? 'Remove ' : 'Save ') + (game ? game.title : slug) + (on ? ' from favorites' : ' to favorites'));
    });
    var count = site.read('tapzens:favorites').filter(function (slug) { return games.some(function (g) { return g.slug === slug; }); }).length;
    document.querySelectorAll('[data-favorite-count]').forEach(function (el) { el.textContent = count; el.hidden = !count; });
  };
  var renderShelf = function (id, emptyId, slugs) {
    var grid = document.getElementById(id), empty = document.getElementById(emptyId); if (!grid || !empty) return;
    var items = slugs.map(function (slug) { return games.find(function (g) { return g.slug === slug; }); }).filter(Boolean);
    grid.innerHTML = items.map(site.cardHtml).join(''); grid.hidden = !items.length;
    empty.classList.toggle('show', !items.length);
    grid.closest('section').classList.toggle('is-empty', !items.length);
  };
  var renderShelves = function () {
    renderShelf('fav-grid', 'fav-empty', site.read('tapzens:favorites'));
    renderShelf('continue-grid', 'continue-empty', site.read('tapzens:recent').filter(Boolean).map(function (r) { return r.id; }).slice(0, 6));
    paintFavorites();
  };
  var renderCatalogue = function () {
    var grid = document.getElementById('all-grid'); if (!grid) return;
    var list = games.filter(function (g) { return category === 'all' || g.category.toLowerCase() === category; });
    if (sort === 'az') list.sort(function (a, b) { return a.title.localeCompare(b.title, 'en'); });
    if (sort === 'newest') list.sort(function (a, b) { return (b.publishedAt || '').localeCompare(a.publishedAt || ''); });
    grid.innerHTML = list.map(site.cardHtml).join('');
    var count = document.getElementById('catalog-count'); if (count) count.textContent = list.length + (category === 'all' ? ' games to explore' : ' ' + category + ' games');
    paintFavorites();
  };
  document.querySelectorAll('[data-filter] button').forEach(function (button) {
    button.addEventListener('click', function () {
      category = button.dataset.cat;
      document.querySelectorAll('[data-filter] button').forEach(function (b) { var on = b === button; b.classList.toggle('active', on); b.setAttribute('aria-pressed', String(on)); });
      renderCatalogue();
    });
  });
  var select = document.getElementById('game-sort');
  if (select) select.addEventListener('change', function () { sort = select.value; renderCatalogue(); });
  document.addEventListener('click', function (e) {
    var button = e.target.closest('[data-card-fav]');
    if (button) {
      var slug = button.dataset.cardFav, saved = site.toggleFav(slug);
      site.track('favorite_game', { game_id: slug, saved: saved });
      // A removal re-renders the shelf: move keyboard focus to its next available control.
      if (!button.isConnected) { var target = document.querySelector('#fav-grid [data-card-fav], #fav-empty a'); if (target) target.focus({ preventScroll: true }); }
      return;
    }
    var link = e.target.closest('a[href*="/game.html"]'); if (!link) return;
    var match = link.pathname.match(/^\/hyper-feed\/([^/]+)\/game\.html$/);
    if (match) site.track('select_content', { content_type: 'game', item_id: match[1] });
  });
  document.addEventListener('zupilo:favorites', renderShelves);
  window.addEventListener('storage', renderShelves);
  window.addEventListener('pageshow', renderShelves);
  renderShelves();
})();
