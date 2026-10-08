/* Ambient decorative activity column on the detail / play pages (.gh-comments): a vertical
   auto-scrolling list of avatar / nick / country / line cards.

   The site has no backend, so the whole dataset is the pool below. Every visit
   re-rolls nickname / country / avatar / text, so no two visitors see the same
   sequence — that is the entire point of the layer.

   Decorative only: the host carries aria-hidden and the column sits beside the game,
   never over a playable screen. Nothing here is a verified review, star rating or play count. */
(function () {
  'use strict';

  var col = document.querySelector('.gh-comments');
  if (!col) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var NICKS = [
    'pixel_fox', 'MiraPlays', 'koji_04', 'SunnyDeck', 'noodlecat', 'Vex_Runs', 'luna.jpg',
    'Bram', 'tinyrobot', 'avi_wins', 'MochiMax', 'quietstorm', 'JunoPop', 'redpanda9',
    'sable', 'MiffyGG', 'octane_o', 'kiwiii', 'Dune', 'pocketlint', 'VeraV', 'gus_gg',
    'nimbus', 'Sora_7', 'waffleiron', 'TofuRex', 'echo_ln', 'pixiebyte'
  ];

  /* stored as ASCII ISO codes; the flag glyph is built at runtime from the two
     regional-indicator code points so no emoji literal can be mis-transcribed */
  var COUNTRIES = [
    ['US', 'United States'], ['BR', 'Brazil'], ['JP', 'Japan'], ['DE', 'Germany'],
    ['FR', 'France'], ['KR', 'South Korea'], ['ID', 'Indonesia'], ['TR', 'Turkiye'],
    ['GB', 'United Kingdom'], ['CA', 'Canada'], ['AU', 'Australia'], ['IN', 'India'],
    ['MX', 'Mexico'], ['ES', 'Spain'], ['IT', 'Italy'], ['NL', 'Netherlands'],
    ['SE', 'Sweden'], ['PL', 'Poland'], ['PH', 'Philippines'], ['VN', 'Vietnam'],
    ['TH', 'Thailand'], ['ZA', 'South Africa'], ['AE', 'UAE'], ['PT', 'Portugal']
  ];

  /* kept deliberately game-agnostic — the feed belongs to no single title, so a line naming
     a mechanic that the reader is not looking at would read as a glitch */
  var LINES = [
    'first try and I already lost the plot', 'ok that was clean', 'why is this so satisfying',
    'I swear the last one was rigged', 'three runs in a row, no regrets', 'my thumb hurts, worth it',
    'this is my brain-off game now', 'wait, that actually works?', 'how are you this calm',
    'playing this on the train every morning', 'I came for one round', 'it literally just loads, respect',
    'the colours here are so good', 'finally past the intro screen', 'portrait mode wins again',
    'I keep tapping the wrong spot', 'one more level said me', 'my break time favourite',
    'my high score is embarrassing', 'found this five minutes ago, staying', 'screen time report hates me',
    'starting to see the pattern', 'that close and I still missed it', 'how is this free',
    'I have been here 40 minutes', 'not the pause screen again', 'need a bigger phone for this',
    'my kid took the device to play this', 'this beats scrolling', 'the last board was brutal',
    'I need to stop', 'good grief, that timer', 'best thing I clicked today', 'no download and it runs',
    'I keep competing with myself', 'the reward screen is generous', 'why am I grinning',
    'second monitor game confirmed', 'lag? never heard of it', 'this is cheaper than coffee',
    'alright alright alright', 'back for round nine', 'does anyone else restart every run'
  ];

  var AVATARS = 32;

  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function flag(cc) {
    var up = String(cc).toUpperCase();
    var out = '';
    for (var i = 0; i < 2; i++) out += String.fromCodePoint(0x1F1E6 + (up.charCodeAt(i) - 65));
    return out;
  }

  /* no two entries at once should read as a copy-paste of the last one */
  function fresh(pool, seen, keep) {
    for (var t = 0; t < 8; t++) {
      var v = pick(pool);
      if (seen.indexOf(v) < 0) {
        seen.push(v);
        if (seen.length > keep) seen.shift();
        return v;
      }
    }
    return pick(pool);
  }

  /* avatar keyed to the nickname, so the same name always wears the same face */
  function avatarFor(nick) {
    var ni = Math.max(0, NICKS.indexOf(nick));
    return '/assets/avatars/avatar_' + String((ni % AVATARS) + 1).padStart(2, '0') + '.webp';
  }

  /* ---------- vertical comment column (detail / play pages) ---------- */
  if (col) {
    var seenCol = [];
    function makeCard() {
      var nick = fresh(NICKS, seenCol, 10);
      var c = pick(COUNTRIES);
      var el = document.createElement('div');
      el.className = 'dm-card';
      el.innerHTML =
        /* eager on purpose: cards slide into view by transform, so the browser's lazy-load
           viewport prediction never fires and the lower cards would pop in blank */
        '<img class="dm-avatar" src="' + avatarFor(nick) + '" alt="" width="34" height="34" loading="eager" decoding="async">' +
        '<div class="dm-body">' +
          '<div class="dm-head"><span class="dm-nick"></span><span class="dm-country" title="' + c[1] + '"></span></div>' +
          '<p class="dm-text"></p>' +
        '</div>';
      el.querySelector('.dm-nick').textContent = nick;
      el.querySelector('.dm-country').textContent = flag(c[0]) + ' ' + c[1];
      el.querySelector('.dm-text').textContent = pick(LINES);
      return el;
    }
    var track = document.createElement('div');
    track.className = 'dm-track';
    var cards = [];
    for (var i = 0; i < 8; i++) cards.push(makeCard());
    cards.forEach(function (n) { track.appendChild(n); });
    /* duplicate the set so the -50% marquee loops seamlessly; skipped when motion is reduced */
    if (!reduce) cards.forEach(function (n) { track.appendChild(n.cloneNode(true)); });
    col.appendChild(track);
  }
})();
