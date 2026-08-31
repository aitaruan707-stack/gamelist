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

  fetch('/games.json', { cache: 'force-cache' })
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

    /* orientation hint for portrait games on landscape device */
    var portrait = g.orientation === 'portrait';
    var landscape = g.orientation === 'landscape';
    function checkOrientation() {
      if (!elHint) return;
      var isLandscape = window.matchMedia('(orientation: landscape)').matches;
      var show = (portrait && isLandscape && window.innerWidth < 900) ||
                 (landscape && !isLandscape && window.innerWidth < 900);
      elHint.classList.toggle('show', show);
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

    /* desktop (fine pointer): fit the game into a phone-sized, centered stage */
    var mqDesk = window.matchMedia('(min-width: 900px) and (pointer: fine)');
    function fitFrame() {
      if (!mqDesk.matches || document.fullscreenElement) return;
      var availW = elStage.clientWidth - 36, availH = elStage.clientHeight - 36;  /* 36 = desk-fit padding 18×2 */
      var w, h;
      if (portrait) {
        h = Math.min(availH, 800);        /* phone-height cap */
        w = h * 9 / 16;
        if (w > availW) { w = availW; h = w * 16 / 9; }
      } else {
        w = Math.min(availW, 900);        /* phone-width cap */
        h = w * 9 / 16;
        if (h > availH) { h = availH; w = h * 16 / 9; }
      }
      frame.style.width = Math.round(w) + 'px';
      frame.style.height = Math.round(h) + 'px';
    }
    function applyDesk() {
      if (mqDesk.matches) { elStage.classList.add('desk-fit'); }
      else { elStage.classList.remove('desk-fit'); frame.style.width = frame.style.height = ''; }
      fitFrame();
    }
    applyDesk();
    window.addEventListener('resize', applyDesk);
    if (mqDesk.addEventListener) mqDesk.addEventListener('change', applyDesk);
    document.addEventListener('fullscreenchange', function () {
      if (document.fullscreenElement) { frame.style.width = frame.style.height = ''; }
      else applyDesk();
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

    /* fullscreen button */
    var fsBtn = document.getElementById('p-fullscreen');
    if (fsBtn) fsBtn.addEventListener('click', function () {
      var el = elStage;
      var req = el.requestFullscreen || el.webkitRequestFullscreen;
      if (req) req.call(el);
      else if (frame.webkitEnterFullscreen) frame.webkitEnterFullscreen();
    });
  }
})();
