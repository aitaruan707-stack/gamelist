System.register(["./application.a5cc2.js"], function (_export, _context) {
  "use strict";

  var Application, canvas, $p, bcr, application;
  function topLevelImport(url) {
    return System["import"](url);
  }
  return {
    setters: [function (_applicationJs) {
      Application = _applicationJs.Application;
    }],
    execute: function () {
      canvas = document.getElementById('GameCanvas');
      $p = canvas.parentElement;
      bcr = $p.getBoundingClientRect();
      canvas.width = bcr.width;
      canvas.height = bcr.height;
      application = new Application();
      /**
       * OPPO/instgame 渠道 SDK 初始化：只发起 initializeAsync，并把结果闸门交给
       * window.__instgameInit，由 InstgameBridge 在投广告 / startGameAsync / 进度上报之前等它。
       *
       * 故意不把 cc.game 串在 initializeAsync 后面：渠道 SDK 域名不可用时游戏必须照常进得去，
       * 否则就是一个白屏事故。闸门统一 resolve 成布尔值，失败只影响广告投放。
       */
      (function bootInstgame() {
        var sdk = window.instgame;
        if (!sdk || typeof sdk.initializeAsync !== 'function') {
          window.__instgameInit = null;
          return;
        }
        try {
          window.__instgameInit = Promise.resolve(sdk.initializeAsync()).then(function () {
            return true;
          }, function (error) {
            console.error('[instgame] initializeAsync failed', error && error.message);
            return false;
          });
        } catch (error) {
          console.error('[instgame] initializeAsync threw', error);
          window.__instgameInit = null;
        }
      })();
      topLevelImport('cc').then(function (engine) {
        // Creator 3.8.7 may still inject its default Splash into settings even when
        // useSplashScreen is false. Runtime overrides are applied before settings
        // are consumed, so the default logo can never render.
        if (engine.settings && typeof engine.settings.overrideSettings === 'function') {
          engine.settings.overrideSettings('splashScreen', 'totalTime', 0);
          engine.settings.overrideSettings('splashScreen', 'logo', {
            type: 'none'
          });
        }
        return application.init(engine);
      }).then(function () {
        return application.start();
      })["catch"](function (err) {
        console.error(err);
      });
    }
  };
});