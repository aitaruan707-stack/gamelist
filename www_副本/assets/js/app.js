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
    var rec = read(LS_REC);
    if (!rec.length) { if (empty) empty.classList.add('show'); return; }
    var data = getData();
    var byId = {};
    (data.games || []).forEach(function (g) { byId[g.slug] = g; });
    var items = rec.map(function (r) { return byId[r.id]; }).filter(Boolean);
    if (!items.length) { if (empty) empty.classList.add('show'); return; }
    wrap.innerHTML = items.slice(0, 6).map(cardHtml).join('');
  }

  /* ---------- home: favorites shelf + filter ---------- */
  function initFavoritesShelf() {
    var wrap = document.getElementById('fav-grid');
    var empty = document.getElementById('fav-empty');
    if (!wrap) return;
    var favs = read(LS_FAV);
    var data = getData();
    var byId = {};
    (data.games || []).forEach(function (g) { byId[g.slug] = g; });
    var items = favs.map(function (s) { return byId[s]; }).filter(Boolean);
    if (!items.length) { if (empty) empty.classList.add('show'); return; }
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
        '<div class="meta"><span class="cat">' + escapeHtml(g.category) + '</span></div>' +
      '</div>' +
    '</a>';
  }
  window.Tapzens.cardHtml = cardHtml;

  /* ---------- live activity: players pool ---------- */
  var PLAYERS = [
    { f: '🇺🇸', n: 'Alice', c: 'United States', a: 1 }, { f: '🇬🇧', n: 'Bob', c: 'United Kingdom', a: 2 },
    { f: '🇨🇦', n: 'Charlie', c: 'Canada', a: 3 }, { f: '🇦🇺', n: 'Diana', c: 'Australia', a: 4 },
    { f: '🇩🇪', n: 'Eva', c: 'Germany', a: 5 }, { f: '🇫🇷', n: 'Frank', c: 'France', a: 6 },
    { f: '🇯🇵', n: 'Grace', c: 'Japan', a: 7 }, { f: '🇰🇷', n: 'Henry', c: 'South Korea', a: 8 },
    { f: '🇧🇷', n: 'Jack', c: 'Brazil', a: 9 }, { f: '🇷🇺', n: 'Kevin', c: 'Russia', a: 10 },
    { f: '🇮🇳', n: 'Lily', c: 'India', a: 11 }, { f: '🇮🇹', n: 'Mark', c: 'Italy', a: 12 },
    { f: '🇪🇸', n: 'Nancy', c: 'Spain', a: 13 }, { f: '🇲🇽', n: 'Oscar', c: 'Mexico', a: 14 },
    { f: '🇦🇷', n: 'Paula', c: 'Argentina', a: 15 }, { f: '🇿🇦', n: 'Quentin', c: 'South Africa', a: 16 },
    { f: '🇸🇪', n: 'Rachel', c: 'Sweden', a: 17 }, { f: '🇳🇴', n: 'Steven', c: 'Norway', a: 18 },
    { f: '🇩🇰', n: 'Tina', c: 'Denmark', a: 19 }, { f: '🇳🇱', n: 'Ulysses', c: 'Netherlands', a: 20 },
    { f: '🇧🇪', n: 'Vera', c: 'Belgium', a: 21 }, { f: '🇨🇭', n: 'Walter', c: 'Switzerland', a: 22 },
    { f: '🇵🇹', n: 'Xena', c: 'Portugal', a: 23 }, { f: '🇵🇱', n: 'Yvonne', c: 'Poland', a: 24 },
    { f: '🇳🇿', n: 'Amy', c: 'New Zealand', a: 25 }, { f: '🇸🇬', n: 'Ben', c: 'Singapore', a: 26 },
    { f: '🇲🇾', n: 'Cindy', c: 'Malaysia', a: 27 }, { f: '🇹🇭', n: 'David', c: 'Thailand', a: 28 },
    { f: '🇻🇳', n: 'Fred', c: 'Vietnam', a: 29 }, { f: '🇵🇭', n: 'Gina', c: 'Philippines', a: 30 },
    { f: '🇪🇬', n: 'Isabel', c: 'Egypt', a: 31 }, { f: '🇸🇦', n: 'James', c: 'Saudi Arabia', a: 32 }
  ];
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function avatarImg(a, alt) {
    return '<img src="/assets/avatars/avatar_' + pad2(a) + '.webp" alt="' + (alt || 'avatar') + '" loading="lazy">';
  }
  function shuffle(arr) { var a = arr.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* ---------- danmaku: players entering ---------- */
  function initDanmaku() {
    var box = document.getElementById('danmaku');
    if (!box) return;
    var lanes = ['16%', '38%', '60%', '80%'];
    var visible = !document.hidden;
    document.addEventListener('visibilitychange', function () { visible = !document.hidden; });
    function spawn() {
      if (!visible) return;
      var p = PLAYERS[Math.floor(Math.random() * PLAYERS.length)];
      var b = document.createElement('div');
      b.className = 'bullet';
      b.textContent = p.f + ' Player ' + p.n + ' entered the game';
      b.style.top = lanes[Math.floor(Math.random() * lanes.length)];
      var dur = 9 + Math.random() * 7;
      b.style.animationDuration = dur + 's';
      b.style.fontSize = (12 + Math.random() * 3).toFixed(1) + 'px';
      box.appendChild(b);
      setTimeout(function () { if (b.parentNode) b.parentNode.removeChild(b); }, dur * 1000 + 300);
    }
    for (var i = 0; i < 5; i++) setTimeout(spawn, i * 550);
    setInterval(spawn, 1100);
  }

  /* ---------- recent downloads feed ---------- */
  function initDownloadFeed() {
    var feed = document.getElementById('dl-feed');
    if (!feed) return;
    var items = [];
    function build() {
      items = shuffle(PLAYERS).slice(0, 8).map(function (p, i) {
        return { p: p, t: 1 + i * 3 + Math.floor(Math.random() * 3) };
      });
      render();
    }
    function render() {
      feed.innerHTML = items.map(function (it) {
        return '<div class="dl-item"><div class="ava">' + avatarImg(it.p.a) + '</div>' +
          '<div class="di"><h4>' + escapeHtml(it.p.n) + '</h4><p>' + escapeHtml(it.p.c) + ' &bull; ' + it.t + ' min ago</p></div></div>';
      }).join('');
    }
    build();
    setInterval(function () { for (var i = 0; i < items.length; i++) items[i].t += 1; render(); }, 60000);
  }

  /* ---------- download counter ---------- */
  function initDownloadCounter() {
    var el = document.getElementById('dl-count');
    if (!el) return;
    var base = parseInt(el.dataset.base || '100000', 10);
    function fmt(v) { return v.toLocaleString('en-US'); }
    el.textContent = fmt(base);
    setInterval(function () { base += Math.floor(Math.random() * 3) + 1; el.textContent = fmt(base); }, 30000);
  }

  /* ---------- boot ---------- */
  function boot() {
    initSearch();
    initContinue();
    initFavoritesShelf();
    initCategoryFilter();
    initDetailFav();
    initDanmaku();
    initDownloadFeed();
    initDownloadCounter();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
