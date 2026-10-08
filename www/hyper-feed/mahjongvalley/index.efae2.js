System.register(["./application.41b28.js"], function (_export, _context) {
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