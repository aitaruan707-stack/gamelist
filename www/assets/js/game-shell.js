/* Phone-sized standalone view for an exported game page.

   /hyper-feed/<slug>/index.html lives two lives. Inside the site it is the iframe src of a
   .phone-frame — there this script quits immediately and the page behaves exactly as shipped.
   Opened on its own (the Fullscreen button, a shared link, a typed URL) the engine measures the
   real window, so a portrait game stretches across a desktop and the page offers no way back.

   So, before the engine boots, we hand it a phone box instead of the raw window — same
   750:1625 ratio and rounded frame as the site player, never wider than 430px — and once the
   document exists we add the one control the export is missing: a bar with Back. The box is
   <body> itself, so every node an engine appends lands inside it on its own; no game file,
   script or asset is touched. */

(function () {
  'use strict';

  if (window.top !== window.self) return;   /* embedded in the site: already sized and navigated */

  var BAR = 52;                /* room for the navigation bar */
  var MAXW = 430;              /* phone-class width */
  var RATIO = 750 / 1625;      /* the site phone frame */

  var de = document.documentElement;
  var info = window.__tz || {};

  /* the untouched window numbers: a game page may clamp innerWidth itself (mahjongvalley does),
     and the prototype getter is the one below that clamp */
  function native(name) {
    var d = Object.getOwnPropertyDescriptor(Window.prototype, name) || Object.getOwnPropertyDescriptor(window, name);
    return d && d.get ? d.get.bind(window) : null;
  }
  var realW = native('innerWidth') || function () { return window.screen.width; };
  var realH = native('innerHeight') || function () { return window.screen.height; };

  var w = 0, h = 0;
  function measure() {
    var rw = realW(), rh = Math.max(200, realH() - BAR);
    /* a phone-class window already is a phone: fill it, only pay for the bar */
    if (rw <= MAXW) { w = Math.round(rw); h = Math.round(rh); return; }
    var bw = Math.min(MAXW, rw);
    var bh = Math.min(rh, bw / RATIO);
    bw = Math.min(bw, bh * RATIO);
    w = Math.round(bw);
    h = Math.round(bh);
  }
  measure();

  /* the engine reads these to size its canvas, so this is what actually makes it a phone */
  try {
    Object.defineProperty(window, 'innerWidth', { configurable: true, get: function () { return w; } });
    Object.defineProperty(window, 'innerHeight', { configurable: true, get: function () { return h; } });
    Object.defineProperty(de, 'clientWidth', { configurable: true, get: function () { return w; } });
    Object.defineProperty(de, 'clientHeight', { configurable: true, get: function () { return h; } });
  } catch (e) { measure(); }

  function apply() {
    de.style.setProperty('--tz-bar', BAR + 'px');
    de.style.setProperty('--tz-w', w + 'px');
    de.style.setProperty('--tz-h', h + 'px');
    de.style.setProperty('--tz-top', Math.round(BAR + Math.max(0, (realH() - BAR - h) / 2)) + 'px');
  }
  de.className += (de.className ? ' ' : '') + 'tz-standalone';
  apply();

  var slug = (/^\/hyper-feed\/([^/]+)/.exec(location.pathname) || [])[1] || '';
  var backHref = info.back || (slug ? '/hyper-feed/' + slug + '/game.html' : '/');
  var title = info.title || (/layabox|test|index|untitled/i.test(document.title) ? slug : document.title);
  var fromSite = false;
  try { fromSite = !!document.referrer && document.referrer.indexOf(location.origin + '/') === 0; } catch (e) {}

  function bar() {
    if (!document.body || document.getElementById('tz-bar')) return;
    var el = document.createElement('div');
    el.id = 'tz-bar';

    var back = document.createElement('a');
    back.id = 'tz-back';
    back.href = backHref;
    back.textContent = '← Back';
    back.addEventListener('click', function (ev) {
      if (fromSite && history.length > 1) { ev.preventDefault(); history.back(); }   /* plain link otherwise */
    });

    var name = document.createElement('span');
    name.id = 'tz-title';
    name.textContent = title || 'Tapzens';

    var home = document.createElement('a');
    home.id = 'tz-home';
    home.href = '/';
    home.textContent = 'tapzens.com';

    el.appendChild(back);
    el.appendChild(name);
    el.appendChild(home);
    document.body.insertBefore(el, document.body.firstChild);
  }

  var pending = 0;
  function onResize() {
    if (pending) return;
    pending = setTimeout(function () {
      pending = 0;
      var pw = w, ph = h;
      measure();
      apply();
      if (pw !== w || ph !== h) window.dispatchEvent(new Event('resize'));   /* let the engine re-fit */
    }, 120);
  }
  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', onResize);

  if (document.body) bar();
  else document.addEventListener('DOMContentLoaded', bar);
})();
