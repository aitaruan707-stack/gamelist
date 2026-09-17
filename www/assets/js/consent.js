/* Tapzens — consent bridge for the Google certified CMP (Privacy & messaging).
   The CMP tag itself is emitted by build.mjs `headMonetization()`. This file makes the
   consent decision usable instead of merely displayed:
     1. reads the consent-mode values as soon as the CMP has them and caches them, so the
        next page load can seed correct defaults before any Google tag initializes;
     2. mirrors every change onto `gtag('consent', 'update', ...)` for our own tags;
     3. powers the "Manage consent" / "Ad privacy settings" entrypoints, so a visitor can
        review or withdraw a decision later (required by the EU user consent policy);
     4. records the IAB TCF v2 listener state for debugging.
   Loaded with `defer`, after the synchronous bootstrap. Must never throw into the page.
   This is site code only — it never touches the games under /game/. */
(function () {
  'use strict';

  var KEY = window.__tzConsentKey || 'tapzens:consent:v1';
  var TYPES = [
    'ad_storage', 'ad_user_data', 'ad_personalization', 'analytics_storage',
    'functionality_storage', 'personalization_storage', 'security_storage'
  ];

  /* googlefc runs its queue when the matching data becomes available; anything pushed
     after that point executes synchronously, so `defer` here is safe. */
  function q(spec) {
    try {
      window.googlefc = window.googlefc || {};
      window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
      window.googlefc.callbackQueue.push(spec);
    } catch (e) {}
  }

  function toStatus(v) {
    if (v === true || v === 1 || v === 'granted') return 'granted';
    if (v === false || v === 0 || v === 'denied') return 'denied';
    return null;
  }

  /* the CMP hands back either 'granted'/'denied' strings or booleans depending on version */
  function normalize(raw) {
    if (!raw || typeof raw !== 'object') return null;
    var out = {}, n = 0;
    for (var i = 0; i < TYPES.length; i++) {
      var s = toStatus(raw[TYPES[i]]);
      if (s) { out[TYPES[i]] = s; n++; }
    }
    return n ? out : null;
  }

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; }
  }
  function write(consent, src) {
    try {
      localStorage.setItem(KEY, JSON.stringify({ v: 1, ts: Date.now(), src: src, consent: consent }));
      return true;
    } catch (e) { return false; }
  }
  function publish(consent) {
    /* only meaningful once the site actually loads a Google tag (GA4 is off for now) */
    if (typeof window.gtag !== 'function') return;
    try { window.gtag('consent', 'update', consent); } catch (e) {}
  }

  function capture(src) {
    var g = window.googlefc;
    if (!g || typeof g.getGoogleConsentModeValues !== 'function') return null;
    var consent;
    try { consent = normalize(g.getGoogleConsentModeValues()); } catch (e) { return null; }
    if (!consent) return null;
    write(consent, src);
    publish(consent);
    api.value = consent;
    return consent;
  }

  function listenTcf() {
    if (typeof window.__tcfapi !== 'function') return;
    try {
      window.__tcfapi('addEventListener', 2, function (tc, ok) {
        if (!ok || !tc) return;
        api.tcf = {
          apiVersion: tc.tcfString ? '2' : undefined,
          gdprApplies: tc.gdprApplies === true,
          hasConsentString: !!tc.tcString,
          purposeConsents: tc.purposeConsents || null
        };
      });
    } catch (e) {}
  }

  function cmpReady() {
    return !!(window.googlefc && typeof window.googlefc.showRevocationMessage === 'function');
  }
  function open() {
    if (!cmpReady()) return false;
    try { window.googlefc.showRevocationMessage(); return true; } catch (e) { return false; }
  }

  /* footer links keep their privacy-policy#consent href as the graceful fallback, so a
     click is only intercepted when the CMP dialog actually opens */
  function wire() {
    var links = document.querySelectorAll('[data-consent-manage]');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function (e) { if (open()) e.preventDefault(); });
    }
    q({ CONSENT_API_READY: function () {
      var all = document.querySelectorAll('[data-consent-manage]');
      for (var j = 0; j < all.length; j++) all[j].setAttribute('data-consent-available', '1');
    } });
  }

  /* deep link used from privacy policy, support mails or an in-app webview: ?showconsent=1 */
  var autoOpened = false;
  function autoOpen() {
    if (!/[?&]showconsent=1(&|$)/.test(location.search)) return;
    q({ CONSENT_API_READY: function () { if (!autoOpened) { autoOpened = true; open(); } } });
  }

  var api = {
    key: KEY,
    value: null,
    tcf: null,
    get: function () {
      var c = read();
      return (c && c.consent) || null;
    },
    meta: function () { return read(); },
    reset: function () {
      try { localStorage.removeItem(KEY); } catch (e) {}
      api.value = null;
    },
    open: open
  };
  window.tapzensConsent = api;
  api.value = api.get();

  q({ CONSENT_MODE_DATA_READY: function () { capture('consent_mode_data_ready'); } });
  q({ CONSENT_DATA_READY: function () { capture('consent_data_ready'); listenTcf(); } });

  function start() { wire(); autoOpen(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
