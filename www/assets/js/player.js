/* Tapzens — game player page logic.
   Loads games.json, builds the iframe, handles loading overlay,
   orientation hints, fullscreen, pause-on-hide, and recent-play tracking. */
(function () {
  'use strict';

  var LS_REC = 'tapzens:recent';

  function getParam(name) {
    var m = new RegExp('[?&]' + name + '=([^&]*)').exec(location.search);
    return m ? decodeURIComponent(m[1]) : null;
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function read(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; }
    catch (e) { return []; }
  }
  function addRecent(slug) {
    var list = read(LS_REC).filter(function (r) { return r.id !== slug; });
    list.unshift({ id: slug, ts: Date.now() });
    try { localStorage.setItem(LS_REC, JSON.stringify(list.slice(0, 12))); } catch (e) {}
  }

  function coverUrl(g) { return g.cover ? '/assets/covers/' + g.cover : '/assets/covers/' + g.slug + '.svg'; }
  function tagSlug(t) { return String(t).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''); }
  function miniHtml(x) {
    return '<a class="mini" href="/hyper-feed/' + x.slug + '/game.html" aria-label="' + escapeHtml(x.title) + '">' +
      '<img src="' + coverUrl(x) + '" alt="" loading="lazy" width="62" height="46">' +
      '<span><span class="mt">' + escapeHtml(x.title) + '</span><span class="ms">' + escapeHtml(x.category) + '</span></span></a>';
  }

  var slug = getParam('id');
  var elTitle = document.getElementById('p-title');
  var elCrumb = document.getElementById('p-crumb');
  var elStage = document.getElementById('p-stage');
  var elLoader = document.getElementById('p-loader');
  var elHint = document.getElementById('rotate-hint');
  var elBack = document.getElementById('p-back');

  function fail(msg) {
    elLoader.innerHTML =
      '<div style="text-align:center;padding:24px;max-width:420px">' +
      '<div style="font-size:18px;font-weight:700;margin-bottom:8px">Game unavailable</div>' +
      '<div style="color:#8A93A6;font-size:14px">' + escapeHtml(msg) + '</div>' +
      '<a class="btn ghost sm" style="margin-top:16px" href="/">Back to all games</a></div>';
    elLoader.classList.remove('hide');
  }

  if (!slug) { fail('No game selected.'); return; }

  /* no-cache: always revalidate against the server so updated game lists
     never serve a stale catalog (avoids ghost "Game not found") */
  fetch('/games.json', { cache: 'no-cache' })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var games = data.games || [];
      var g = games.filter(function (x) { return x.slug === slug; })[0];
      if (!g) { fail('Game not found: ' + slug); return; }
      start(g, games, data);
    })
    .catch(function () { fail('Could not load game data. Please check your connection.'); });

  function start(g, games, data) {
    document.title = 'Play ' + g.title + ' — Tapzens';
    if (elTitle) elTitle.textContent = g.title;
    if (elCrumb) elCrumb.textContent = g.title;
    if (elBack) { elBack.setAttribute('href', '/hyper-feed/' + g.slug + '/game.html'); elBack.setAttribute('title', 'Back to ' + g.title); elBack.setAttribute('aria-label', 'Back to ' + g.title); }

    /* three-column framing (image-1 layout): LEFT info, RIGHT related, plus real Recently-Played */
    elStage.className = 'phone-frame ' + (g.orientation === 'landscape' ? 'landscape' : 'portrait');

    var cats = (data && data.categories) || [];
    var cc = cats.filter(function (x) { return x.name.toLowerCase() === String(g.category).toLowerCase(); })[0];
    var catHref = cc ? '/c/' + cc.slug + '.html' : '/#all';

    var elInfo = document.getElementById('p-info');
    if (elInfo) {
      var tags = (g.tags || []).slice(0, 6).map(function (t) {
        return '<a class="t" href="/t/' + tagSlug(t) + '.html">' + escapeHtml(t) + '</a>';
      }).join('');
      elInfo.innerHTML =
        '<img class="gh-cover" src="' + coverUrl(g) + '" alt="' + escapeHtml(g.title) + ' cover" width="240" height="180">' +
        '<h2 class="eyebrow">Game Info</h2>' +
        '<h1 class="gh-title">' + escapeHtml(g.title) + '</h1>' +
        (g.description ? '<p class="gh-desc">' + escapeHtml(g.description) + '</p>' : '') +
        '<dl class="spec">' +
          '<dt>Category</dt><dd><a href="' + catHref + '">' + escapeHtml(g.category) + '</a></dd>' +
          '<dt>Orientation</dt><dd>' + escapeHtml(g.orientation || 'portrait') + '</dd>' +
          '<dt>Platform</dt><dd>Web / Mobile</dd>' +
          '<dt>Price</dt><dd>Free</dd>' +
        '</dl>' +
        (tags ? '<div class="taglist" style="margin-top:12px">' + tags + '</div>' : '');
    }

    var elRelCard = document.getElementById('p-related-card');
    var elRel = document.getElementById('p-related');
    if (elRel) {
      var related = (games || []).filter(function (x) { return x.slug !== g.slug && x.category === g.category; }).slice(0, 6);
      elRel.innerHTML = related.map(miniHtml).join('');
      if (elRelCard) elRelCard.hidden = related.length === 0;
    }

    var elMoreCard = document.getElementById('p-more-card');
    if (elMoreCard) {
      var elMoreCat = document.getElementById('p-more-cat');
      var elMoreLink = document.getElementById('p-more-link');
      if (elMoreCat) elMoreCat.textContent = g.category || '';
      if (elMoreLink) { if (cc) elMoreLink.setAttribute('href', '/c/' + cc.slug + '.html'); elMoreLink.textContent = 'Browse ' + (g.category || '') + ' games \u2192'; }
      elMoreCard.hidden = false;
    }

    var elRecCard = document.getElementById('gh-recent-card');
    var elRec = document.getElementById('gh-recent');
    if (elRec) {
      var byId = {};
      (games || []).forEach(function (x) { byId[x.slug] = x; });
      var recents = read(LS_REC).map(function (r) { return byId[r.id]; })
        .filter(function (x) { return x && x.slug !== g.slug; }).slice(0, 4);
      elRec.innerHTML = recents.map(miniHtml).join('');
      if (elRecCard) elRecCard.hidden = recents.length === 0;
    }

    /* orientation hint — warn when the device matches neither the game's
       native aspect nor a comfortable window size; user can dismiss it */
    var portrait = g.orientation === 'portrait';
    var landscape = g.orientation === 'landscape';
    var elHintMode = document.getElementById('rotate-hint-mode');
    var hintBlocked = false;
    var hintTimer = 0;
    if (elHintMode) elHintMode.textContent = 'This game plays best in ' + (portrait ? 'portrait' : 'landscape') + ' mode.';
    var elHintDismiss = document.getElementById('rotate-dismiss');
    if (elHintDismiss) elHintDismiss.addEventListener('click', function () {
      hintBlocked = true;
      elHint.classList.remove('show');
    });
    /* phone whose orientation mismatches the game's native aspect */
    function orientationMismatch() {
      if (window.innerWidth >= 900) return false;
      var isLandscape = window.matchMedia('(orientation: landscape)').matches;
      return (portrait && isLandscape) || (landscape && !isLandscape);
    }
    function checkOrientation() {
      if (!elHint) return;
      clearTimeout(hintTimer);
      if (!hintBlocked && orientationMismatch()) {
        elHint.classList.add('show');
        hintTimer = setTimeout(function () { elHint.classList.remove('show'); }, 6000);  /* informational only, auto-hide */
      } else {
        elHint.classList.remove('show');
      }
    }
    if (portrait || landscape) {
      window.addEventListener('resize', checkOrientation);
      checkOrientation();
    }

    /* playable entry is always hyper-feed/<slug>/index.html; the iframe fills the
       phone-frame via CSS (.phone-frame iframe), so no JS sizing is needed here. */
    var src = '/hyper-feed/' + g.slug + '/index.html';
    var frame = document.createElement('iframe');
    frame.setAttribute('src', src);
    frame.setAttribute('allow', 'autoplay; fullscreen; gamepad; clipboard-write; accelerometer; gyroscope');
    frame.setAttribute('loading', 'eager');
    frame.setAttribute('title', g.title);
    elStage.appendChild(frame);

    document.addEventListener('fullscreenchange', function () {
      if (document.fullscreenElement) { lockOrientation(); }
      else { unlockOrientation(); }
    });

    var ready = false;
    var maxWait = setTimeout(function () {
      if (!ready) {
        /* fallback: hide loader and let user tap into the iframe */
        elLoader.classList.add('hide');
      }
    }, 8000);

    frame.addEventListener('load', function () {
      ready = true;
      clearTimeout(maxWait);
      setTimeout(function () { elLoader.classList.add('hide'); }, 350);
    });

    /* same-origin postMessage pause/resume on tab hide */
    document.addEventListener('visibilitychange', function () {
      if (!frame.contentWindow) return;
      try {
        frame.contentWindow.postMessage({ source: 'tapzens', type: document.hidden ? 'PAUSE' : 'RESUME' }, '*');
      } catch (e) {}
    });

    addRecent(g.slug);

    /* fullscreen button + native orientation lock (Android Chrome honors it
       inside fullscreen; iOS Safari rejects silently — the rotate hint covers it) */
    function lockOrientation() {
      try {
        if (screen.orientation && screen.orientation.lock) {
          var p = screen.orientation.lock(portrait ? 'portrait' : 'landscape');
          if (p && p.catch) p.catch(function () {});
        }
      } catch (e) {}
    }
    function unlockOrientation() {
      try { if (screen.orientation && screen.orientation.unlock) screen.orientation.unlock(); } catch (e) {}
    }
    var fsBtn = document.getElementById('p-fullscreen');
    if (fsBtn) fsBtn.addEventListener('click', function () {
      var el = elStage;
      var req = el.requestFullscreen || el.webkitRequestFullscreen;
      if (req) req.call(el);
      else if (frame.webkitEnterFullscreen) frame.webkitEnterFullscreen();
    });
  }
})();
