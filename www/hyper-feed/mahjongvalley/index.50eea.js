System.register(["./application.221a0.js"], function (_export, _context) {
  "use strict";

  var Application, canvas, $p, bcr, application;
  function topLevelImport(url) {
    return System["import"](url);
  }

  // AdSense 全局配置。adConfig 只接受 preloadAdBreaks / sound 两个参数，多传的字段 API 会忽略。
  // preloadAdBreaks 必须是 'on'：实测不预加载时 adBreak 会立即以 breakStatus=noAdPreloaded 定案，
  // 也就是一条广告都不会出。sound 跟随游戏音量，每次静音状态变化都要重新上报。
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
      try {
        if (typeof window.adConfig === 'function') {
          window.adConfig({
            preloadAdBreaks: 'on',
            sound: 'on'
          });
        }
      } catch (err) {
        console.warn('[AdSense] adConfig failed', err);
      }
      application = new Application();
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