/* Phone-sized standalone view for an exported game page.

   /hyper-feed/<slug>/index.html lives two lives. Inside the site it is the iframe src of a
   .phone-frame — there this script quits immediately and the page behaves exactly as shipped.
   Opened on its own (the Fullscreen button, a shared link, a typed URL) the engine measures the
   real window, so a portrait game stretches across a desktop and the page offers no way back.

   So, before the engine boots, we hand it a phone box instead of the raw window — same
   750:1625 ratio and rounded frame as the site player, never wider than 430px — and once the
   document exists we add what the export is missing: a bar with Back, and beside the phone an ad
   column plus a "more games" rail, which is also what makes the empty desktop space worth having.
   The box is <body> itself, so every node an engine appends lands inside it on its own; no game
   file, script or asset is touched. */

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

 /* the ad + CMP tags ship inside an inert <template>, so an embedded view never touches them;
     only a standalone visit moves them into <head>, in order (consent bridge before the Google tags) */
  function monetize() {
    var t = document.getElementById('tz-monetize');
    if (!t || !t.content) return;
    var frag = t.content.cloneNode(true);
    t.parentNode.removeChild(t);
    document.head.appendChild(frag);
  }

  /* the two empty columns beside the phone: an ad slot on the left, more games on the right */
  function rails() {
    if (!document.body || document.getElementById('tz-aside')) return;

    var wrap = document.createElement('div');
    wrap.id = 'tz-aside';

    var ad = document.createElement('div');
    ad.id = 'tz-ad';

    var hole = document.createElement('div');
    hole.className = 'tz-hole';

    var rec = document.createElement('aside');
    rec.id = 'tz-rec';
    var head = document.createElement('h2');
    head.className = 'tz-eyebrow';
    head.textContent = 'More ' + (info.cat || 'Games');
    rec.appendChild(head);
    (info.rec || []).forEach(function (r) {
      var a = document.createElement('a');
      a.className = 'tz-item';
      a.href = r[3];
      var img = document.createElement('img');
      img.src = r[2];
      img.alt = '';
      img.width = 62;
      img.height = 46;
      img.loading = 'lazy';
      var txt = document.createElement('span');
      var t = document.createElement('span');
      t.className = 'tz-t';
      t.textContent = r[0];
      var c = document.createElement('span');
      c.className = 'tz-c';
      c.textContent = r[1];
      txt.appendChild(t);
      txt.appendChild(c);
      a.appendChild(img);
      a.appendChild(txt);
      rec.appendChild(a);
    });
    if (info.more) {
      var m = document.createElement('a');
      m.className = 'tz-more';
      m.href = info.more;
      m.textContent = 'Browse all games →';
      rec.appendChild(m);
    }

    wrap.appendChild(ad);
    wrap.appendChild(hole);
    wrap.appendChild(rec);
    document.body.appendChild(wrap);   /* fixed: it sits beside the stage, not inside it */
    askAd();
  }

  /* One placement, asked for only while the rails are actually on screen — a hidden ad slot is a bad
     ad slot. The column keeps its space either way, but the "Advertisement" label waits for a real
     fill, so an empty or no-fill column never puts that word above nothing. */
  var RAILS = '(min-width: 1100px)';      /* keep in step with the @media in game-shell.css */
  var adAsked = false;
  function askAd() {
    var ad = document.getElementById('tz-ad');
    if (!ad || adAsked || !info.ad) return;
    if (window.matchMedia && !window.matchMedia(RAILS).matches) return;
    adAsked = true;

    var ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.cssText = 'display:block;width:100%';
    ins.setAttribute('data-ad-client', info.ad);
    /* a fixed 300x250, not "auto": an auto unit measures the viewport, and the viewport here is the
       phone box we handed the engine, so it would come back 391px wide and lean on the stage */
    ins.setAttribute('data-ad-format', 'rectangle');
    ad.appendChild(ins);
    ins.setAttribute('data-ad-width', String(ad.clientWidth || 300));
    /* the push is safe before the tag loads — it waits in the array */
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}

    function mark() {
      if (ad.querySelector('.tz-eyebrow')) return;
      if (ins.getAttribute('data-ad-status') !== 'filled') return;
      var l = document.createElement('span');
      l.className = 'tz-eyebrow';
      l.textContent = 'Advertisement';
      ad.insertBefore(l, ad.firstChild);
    }
    if (window.MutationObserver) new MutationObserver(mark).observe(ad, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-ad-status'] });
    if (window.ResizeObserver) new ResizeObserver(mark).observe(ad);
    mark();
    /* a fill can arrive after both observers went quiet (late consent, slow response) */
    var tries = 0;
    var poll = setInterval(function () { if (++tries > 24 || ad.querySelector('.tz-eyebrow')) clearInterval(poll); else mark(); }, 500);
  }

  function ready() { bar(); rails(); monetize(); }

  var pending = 0;
  function onResize() {
    if (pending) return;
    pending = setTimeout(function () {
      pending = 0;
      var pw = w, ph = h;
      measure();
      apply();
      askAd();   /* a window dragged out to desktop width earns its ad slot */
      if (pw !== w || ph !== h) window.dispatchEvent(new Event('resize'));   /* let the engine re-fit */
    }, 120);
  }
  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', onResize);

  if (document.body) ready();
  else document.addEventListener('DOMContentLoaded', ready);
})();
