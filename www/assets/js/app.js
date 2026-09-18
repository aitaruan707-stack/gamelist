/* Tapzens — shared site interactions (home + detail).
   Vanilla JS, no dependencies. Data is embedded in the page by build.mjs
   via a JSON <script type="application/json" id="games-data">. */

(function () {
  'use strict';

  var LS_FAV = 'tapzens:favorites';
  var LS_REC = 'tapzens:recent';

  function read(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; }
    catch (e) { return []; }
  }
  function write(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function getData() {
    var el = document.getElementById('games-data');
    if (!el) return { games: [] };
    try { return JSON.parse(el.textContent); } catch (e) { return { games: [] }; }
  }
  function coverUrl(g) {
    if (g.cover) return '/assets/covers/' + g.cover;
    return '/assets/covers/' + g.slug + '.svg';
  }
  function detailUrl(g) { return '/g/' + g.slug + '.html'; }
  function playUrl(g) { return '/play.html?id=' + g.slug; }

  /* ---------- favorites ---------- */
  function isFav(slug) { return read(LS_FAV).indexOf(slug) !== -1; }
  function toggleFav(slug) {
    var list = read(LS_FAV);
    var i = list.indexOf(slug);
    if (i === -1) list.push(slug); else list.splice(i, 1);
    write(LS_FAV, list);
    return i === -1;
  }

  /* ---------- recent ---------- */
  function addRecent(slug) {
    var list = read(LS_REC).filter(function (r) { return r.id !== slug; });
    list.unshift({ id: slug, ts: Date.now() });
    write(LS_REC, list.slice(0, 12));
  }

  /* expose for player.js / inline */
  window.Tapzens = {
    getData: getData, coverUrl: coverUrl, detailUrl: detailUrl, playUrl: playUrl,
    isFav: isFav, toggleFav: toggleFav, addRecent: addRecent,
    read: read, write: write, escapeHtml: escapeHtml
  };

  /* ---------- home: search box ---------- */
  function initSearch() {
    var box = document.querySelector('.search');
    if (!box) return;
    var input = box.querySelector('input');
    var results = box.querySelector('.results');
    var clearBtn = box.querySelector('.clear');
    var data = getData();
    var games = data.games || [];
    var timer = null;

    function render(list) {
      if (!list.length) {
        results.innerHTML = '<div class="empty">No games found</div>';
      } else {
        results.innerHTML = list.map(function (g) {
          return '<a href="' + detailUrl(g) + '">' +
            '<img src="' + coverUrl(g) + '" alt="" loading="lazy">' +
            '<div><div class="r-t">' + escapeHtml(g.title) + '</div>' +
            '<div class="r-c">' + escapeHtml(g.category) + '</div></div>' +
            '</a>';
        }).join('');
      }
      results.classList.add('open');
    }
    function query(q) {
      q = q.trim().toLowerCase();
      if (!q) { results.classList.remove('open'); return; }
      var out = games.filter(function (g) {
        return g.title.toLowerCase().indexOf(q) !== -1 ||
          g.category.toLowerCase().indexOf(q) !== -1 ||
          (g.tags || []).some(function (t) { return t.toLowerCase().indexOf(q) !== -1; }) ||
          (g.description || '').toLowerCase().indexOf(q) !== -1;
      });
      render(out.slice(0, 8));
    }
    input.addEventListener('input', function () {
      box.classList.toggle('has-val', input.value.length > 0);
      clearTimeout(timer);
      timer = setTimeout(function () { query(input.value); }, 120);
    });
    input.addEventListener('focus', function () { if (input.value) query(input.value); });
    if (clearBtn) clearBtn.addEventListener('click', function (e) {
      e.preventDefault(); input.value = ''; box.classList.remove('has-val');
      results.classList.remove('open'); input.focus();
    });
    document.addEventListener('click', function (e) {
      if (!box.contains(e.target)) results.classList.remove('open');
    });

    /* mobile search toggle */
    var toggle = document.querySelector('[data-search-toggle]');
    if (toggle) toggle.addEventListener('click', function () {
      box.classList.toggle('open');
      if (box.classList.contains('open')) input.focus();
    });
  }

  /* ---------- home: continue playing ---------- */
  function initContinue() {
    var wrap = document.getElementById('continue-grid');
    var empty = document.getElementById('continue-empty');
    if (!wrap) return;
    var sec = wrap.closest('section');
    var rec = read(LS_REC);
    if (!rec.length) { if (sec) sec.style.display = 'none'; return; }
    var data = getData();
    var byId = {};
    (data.games || []).forEach(function (g) { byId[g.slug] = g; });
    var items = rec.map(function (r) { return byId[r.id]; }).filter(Boolean);
    if (!items.length) { if (sec) sec.style.display = 'none'; return; }
    wrap.innerHTML = items.slice(0, 6).map(cardHtml).join('');
  }

  /* ---------- home: favorites shelf + filter ---------- */
  function initFavoritesShelf() {
    var wrap = document.getElementById('fav-grid');
    var empty = document.getElementById('fav-empty');
    if (!wrap) return;
    var sec = wrap.closest('section');
    var favs = read(LS_FAV);
    var data = getData();
    var byId = {};
    (data.games || []).forEach(function (g) { byId[g.slug] = g; });
    var items = favs.map(function (s) { return byId[s]; }).filter(Boolean);
    if (!items.length) { if (sec) sec.style.display = 'none'; return; }
    wrap.innerHTML = items.slice(0, 6).map(cardHtml).join('');
  }

  /* ---------- home: category filter ---------- */
  function initCategoryFilter() {
    var chips = document.querySelectorAll('.chips[data-filter] button');
    if (!chips.length) return;
    var grid = document.getElementById('all-grid');
    if (!grid) return;
    var original = grid.innerHTML;
    var data = getData();
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        var cat = chip.dataset.cat;
        var list = cat === 'all' ? data.games : data.games.filter(function (g) {
          return g.category.toLowerCase() === cat;
        });
        grid.innerHTML = list.length ? list.map(cardHtml).join('') :
          '<div class="empty-block show" style="grid-column:1/-1"><span class="big">No games in this category yet</span></div>';
      });
    });
  }

  /* ---------- detail: favorite button ---------- */
  function initDetailFav() {
    var btn = document.querySelector('[data-fav]');
    if (!btn) return;
    var slug = btn.dataset.fav;
    function paint() {
      var on = isFav(slug);
      btn.classList.toggle('active', on);
      btn.querySelector('.lbl').textContent = on ? 'Favorited' : 'Favorite';
    }
    paint();
    btn.addEventListener('click', function () { toggleFav(slug); paint(); });
  }

  /* ---------- shared card markup ---------- */
  function cardHtml(g) {
    var fav = isFav(g.slug);
    return '<a class="card' + (fav ? ' fav' : '') + '" href="' + detailUrl(g) + '" aria-label="' + escapeHtml(g.title) + '">' +
      '<div class="thumb">' +
        '<img src="' + coverUrl(g) + '" alt="' + escapeHtml(g.title) + ' cover" loading="lazy">' +
        '<div class="play-ov"><div class="pcircle"><svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg></div></div>' +
      '</div>' +
      '<div class="info">' +
        '<div class="title">' + escapeHtml(g.title) + '</div>' +
        '<div class="meta"><span class="cat">' + escapeHtml(g.category) + '</span><span class="plays">Free · No install</span></div>' +
      '</div>' +
    '</a>';
  }
  window.Tapzens.cardHtml = cardHtml;

  /* ---------- anchors: reliable scrolling even in throttled/hidden webviews ---------- */
  function jumpTo(el, smooth) {
    var de = document.documentElement;
    var prev = de.style.scrollBehavior;
    de.style.scrollBehavior = smooth ? 'smooth' : 'auto';
    el.scrollIntoView({ block: 'start' });
    de.style.scrollBehavior = prev;
  }
  function initAnchors() {
    /* retarget nav links whose section is hidden (empty shelf) */
    ['favorites', 'recent'].forEach(function (id) {
      var s = document.getElementById(id);
      if (s && s.style.display === 'none') {
        var links = document.querySelectorAll('a[href="/#' + id + '"], a[href="#' + id + '"]');
        for (var i = 0; i < links.length; i++) links[i].setAttribute('href', '/#all');
      }
    });
    document.addEventListener('click', function (e) {
      var t = e.target;
      var a = t && t.closest ? t.closest('a[href*="#"]') : null;
      if (!a || e.defaultPrevented) return;
      var href = a.getAttribute('href') || '';
      var hi = href.indexOf('#');
      if (hi === -1) return;
      var path = href.slice(0, hi), hash = href.slice(hi + 1);
      if (path && path !== location.pathname) return; /* cross-page: let the browser navigate */
      if (!hash) return;
      var el = document.getElementById(hash);
      if (!el || el.offsetParent === null) return;
      e.preventDefault();
      if (history.pushState) history.pushState(null, '', '#' + hash);
      jumpTo(el, !document.hidden);
    });
    /* arriving with a hash in the URL */
    if (location.hash) {
      var el = document.getElementById(location.hash.slice(1));
      if (el && el.offsetParent !== null) setTimeout(function () { jumpTo(el, !document.hidden); }, 0);
    }
  }

  /* ---------- top nav: highlight selected menu ---------- */
  function initNavHighlight() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav-main a'));
    if (!links.length) return;
    function setActive(a) {
      links.forEach(function (l) { l.classList.toggle('active', l === a); });
    }
    links.forEach(function (a) {
      a.addEventListener('click', function () {
        if ((a.getAttribute('href') || '').indexOf('#') === -1 && a.getAttribute('href') !== '/') return;
        setActive(a);
      });
    });
    /* scrollspy: light up the menu of the section in view */
    var spy = links.filter(function (a) {
      var h = a.getAttribute('href') || '';
      return h.indexOf('#') !== -1 && document.getElementById(h.split('#')[1]);
    });
    var home = links.filter(function (l) { return l.getAttribute('href') === '/'; })[0];
    if (!spy.length && !home) return;
    var ticking = false;
    function update() {
      ticking = false;
      var y = window.scrollY + 140;
      var current = null;
      spy.forEach(function (a) {
        var el = document.getElementById(a.getAttribute('href').split('#')[1]);
        if (el && el.offsetTop <= y) current = a;
      });
      if (home && window.scrollY < 240) current = home;
      if (current && !current.classList.contains('active')) setActive(current);
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; setTimeout(update, 120); }
    }, { passive: true });
  }

  /* ---------- boot ---------- */
  function boot() {
    initSearch();
    initContinue();
    initFavoritesShelf();
    initAnchors();
    initNavHighlight();
    initCategoryFilter();
    initDetailFav();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
