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
      start(g);
    })
    .catch(function () { fail('Could not load game data. Please check your connection.'); });

  function start(g) {
    document.title = 'Play ' + g.title + ' — Tapzens';
    if (elTitle) elTitle.textContent = g.title;
    if (elCrumb) elCrumb.textContent = g.title;
    if (elBack) { elBack.setAttribute('href', '/g/' + g.slug + '.html'); elBack.setAttribute('title', 'Back to ' + g.title); elBack.setAttribute('aria-label', 'Back to ' + g.title); }

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

    /* build iframe */
    var src = '/game/' + g.slug + '/' + (g.entry || 'index.html');
    var frame = document.createElement('iframe');
    frame.setAttribute('src', src);
    frame.setAttribute('allow', 'autoplay; fullscreen; gamepad; clipboard-write; accelerometer; gyroscope');
    frame.setAttribute('allowfullscreen', '');
    frame.setAttribute('loading', 'eager');
    frame.setAttribute('title', g.title);
    elStage.appendChild(frame);

    /* stage sizing, per spec:
       - phone mode: iframe fills the stage edge-to-edge (100% x 100%);
       - non-phone (desktop): upright portrait frame, MIN 400 wide x 800 tall,
         growing with the 1:2 portrait ratio when the stage allows. */
    var mqDesk = window.matchMedia('(min-width: 900px) and (pointer: fine)');
    var STAGE_MIN_W = 400, STAGE_MIN_H = 800;
    function fitFrame() {
      if (document.fullscreenElement) return;
      if (!mqDesk.matches) {
        /* phone mode: full-bleed */
        frame.style.width = '100%';
        frame.style.height = '100%';
        frame.style.transform = '';
        return;
      }
      var availW = Math.max(elStage.clientWidth - 36, 120);  /* 36 = desk-fit padding 18×2 */
      var availH = Math.max(elStage.clientHeight - 36, 120);
      var w = Math.min(availW, availH / 2);   /* portrait 1:2 ratio fit */
      var h = w * 2;
      w = Math.max(w, STAGE_MIN_W);           /* min width 400 */
      h = Math.max(h, STAGE_MIN_H);           /* min height 800 */
      frame.style.width = Math.round(w) + 'px';
      frame.style.height = Math.round(h) + 'px';
      frame.style.transform = '';
    }
    function applyDesk() {
      if (mqDesk.matches) { elStage.classList.add('desk-fit'); }
      else { elStage.classList.remove('desk-fit'); }
      fitFrame();
    }
    applyDesk();
    window.addEventListener('resize', applyDesk);
    if (mqDesk.addEventListener) mqDesk.addEventListener('change', applyDesk);
    document.addEventListener('fullscreenchange', function () {
      if (document.fullscreenElement) { frame.style.width = frame.style.height = frame.style.transform = ''; lockOrientation(); }
      else { unlockOrientation(); applyDesk(); }
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
