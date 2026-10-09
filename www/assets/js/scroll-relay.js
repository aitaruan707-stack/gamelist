/* Two-finger page scrolling over an embedded game.

   The engine inside .phone-frame preventDefaults every touchmove, so Chrome refuses to scroll
   the page when a gesture starts on the game — on a phone the frame swallows the whole page.
   Two fingers over a game are never a gameplay gesture, so they are relayed to the page
   instead: the touch never reaches the engine and the document follows the fingers.
   One-finger input is passed through untouched, so every drag / swipe / tap control of the
   19 titles keeps working exactly as shipped — nothing inside a game is modified.

   Used by the detail pages (game.html) and the player (play.html); both host the game in a
   .phone-frame iframe, the player one is created by player.js after load. */
(function () {
  'use strict';

  var de = document.documentElement;

  function room() { return de.scrollHeight - de.clientHeight; }

  function bind(frame) {
    var relay = false, lastY = 0, savedBehavior = '';

    /* the stylesheet asks for smooth anchor jumps; while relaying, the page has to follow the
       fingers exactly, otherwise every scrollBy restarts an animation and eats part of the travel */
    function begin() {
      if (relay) return;
      relay = true;
      savedBehavior = de.style.scrollBehavior;
      de.style.scrollBehavior = 'auto';
    }
    function finish() {
      relay = false;
      de.style.scrollBehavior = savedBehavior;
      doc.__tzLive = null;
    }

    function avgY(t) {
      var s = 0, i;
      if (!t || !t.length) return lastY;
      for (i = 0; i < t.length; i++) s += t[i].clientY;
      return s / t.length;
    }
    function stop(e) { e.preventDefault(); e.stopPropagation(); }
    /* let go of whatever the engine started before the second finger landed, so it does not
       keep a phantom touch while the page is being scrolled */
    function cancelToGame(e, touches) {
      if (!win.TouchEvent || !touches || !touches.length) return;
      try {
        (e.target || doc).dispatchEvent(new win.TouchEvent('touchcancel', {
          bubbles: true, cancelable: false,
          touches: [], targetTouches: [], changedTouches: touches
        }));
      } catch (err) {}
    }

    function takeOver(e) {
      cancelToGame(e, doc.__tzLive);
      begin();
      lastY = avgY(e.touches);
      stop(e);
    }
    function onStart(e) {
      if (!relay && e.touches.length < 2) return;
      if (!relay && room() < 8) return;
      takeOver(e);
    }
    function onMove(e) {
      if (!relay) {
        /* a second finger landing mid-drag turns the gesture into a page scroll */
        if (e.touches.length < 2 || room() < 8) return;
        takeOver(e);
        return;
      }
      stop(e);
      var y = avgY(e.touches);
      if (y !== lastY) { window.scrollBy(0, lastY - y); lastY = y; }
    }
    function onEnd(e) {
      if (!relay) return;
      stop(e);
      if (!e.touches.length) finish();
    }
    /* remember the live touches so a takeover can cancel them on the engine's side */
    function track(e) { if (e.touches) doc.__tzLive = e.touches; }

    var win = null, doc = null;
    try { win = frame.contentWindow; doc = frame.contentDocument; } catch (e) { return; }
    /* cross-origin, or still the placeholder document before the game navigated in */
    if (!win || !doc || doc.__tzRelay) return;
    try { if (win.location.href === 'about:blank') return; } catch (err) { return; }
    doc.__tzRelay = true;

    /* window capture runs before any engine listener on the document or the canvas */
    [['touchstart', onStart], ['touchmove', onMove], ['touchend', onEnd], ['touchcancel', onEnd]]
      .forEach(function (pair) {
        win.addEventListener(pair[0], pair[1], { capture: true, passive: false });
        doc.addEventListener(pair[0], pair[1], { capture: true, passive: false });
      });
    doc.addEventListener('touchstart', track, { capture: true, passive: true });
    doc.addEventListener('touchmove', track, { capture: true, passive: true });
  }

  function watch(frame) {
    /* iframe load events bubble, so this also catches the game the player inserts later */
    frame.addEventListener('load', function () { bind(frame); });
    bind(frame);
  }

  function scan() {
    var frames = document.querySelectorAll('.phone-frame iframe');
    for (var i = 0; i < frames.length; i++) {
      if (!frames[i].__tzWatched) {
        frames[i].__tzWatched = true;
        watch(frames[i]);
      } else {
        bind(frames[i]);   /* bind is a no-op once the inner document is wired */
      }
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan);
  else scan();
  document.addEventListener('load', scan, true);
})();
