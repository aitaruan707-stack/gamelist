window.boot = function () {
    var settings = window._CCSettings;
    window._CCSettings = undefined;
    var onProgress = null;
    
    var RESOURCES = cc.AssetManager.BuiltinBundleName.RESOURCES;
    var INTERNAL = cc.AssetManager.BuiltinBundleName.INTERNAL;
    var MAIN = cc.AssetManager.BuiltinBundleName.MAIN;

    // Instgame SDK（OPPO 免安装 H5）：不存在时全部走原生/浏览器原逻辑
    var IG = (typeof window.instgame !== 'undefined') ? window.instgame : null;
    var HAS_INSTGAME = !!(IG && IG.showRewardedVideo);

    function setLoadingDisplay () {
        // Loading splash scene
        var splash = document.getElementById('splash');
        var progressBar = splash.querySelector('.progress-bar span');
        onProgress = function (finish, total) {
            var percent = 100 * finish / total;
            if (progressBar) {
                progressBar.style.width = percent.toFixed(2) + '%';
            }
            // ★ 同步加载进度给渠道 SDK（官方要求，percent 取值 0~100）
            if (HAS_INSTGAME && IG.setLoadingProgress) {
                try {
                    IG.setLoadingProgress(percent);
                } catch (e) {}
            }
        };
        splash.style.display = 'block';
        progressBar.style.width = '0%';

        cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function () {
            splash.style.display = 'none';
        });
    }

    var onStart = function () {

        cc.view.enableRetina(true);
        cc.view.resizeWithBrowserSize(true);

        if (cc.sys.isBrowser) {
            setLoadingDisplay();
        }

        if (cc.sys.isMobile) {
            if (settings.orientation === 'landscape') {
                cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
            }
            else if (settings.orientation === 'portrait') {
                cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
            }
            if (HAS_INSTGAME) {
                // ★ 官方要求：接入 instgame 必须关闭自动全屏，否则手机 Chrome 上影响广告体验
                cc.view.enableAutoFullScreen(false);
            }
            else {
                cc.view.enableAutoFullScreen([
                    cc.sys.BROWSER_TYPE_BAIDU,
                    cc.sys.BROWSER_TYPE_BAIDU_APP,
                    cc.sys.BROWSER_TYPE_WECHAT,
                    cc.sys.BROWSER_TYPE_MOBILE_QQ,
                    cc.sys.BROWSER_TYPE_MIUI,
                    cc.sys.BROWSER_TYPE_HUAWEI,
                    cc.sys.BROWSER_TYPE_UC,
                ].indexOf(cc.sys.browserType) < 0);
            }
        }

        // Limit downloading max concurrent task to 2,
        // more tasks simultaneously may cause performance draw back on some android system / browsers.
        // You can adjust the number based on your own test result, you have to set it before any loading process to take effect.
        if (cc.sys.isBrowser && cc.sys.os === cc.sys.OS_ANDROID) {
            cc.assetManager.downloader.maxConcurrency = 8;
            cc.assetManager.downloader.maxRequestsPerFrame = 8;
        }

        var launchScene = settings.launchScene;
        var bundle = cc.assetManager.bundles.find(function (b) {
            return b.getSceneInfo(launchScene);
        });

        var sceneHolder = null;

        // 进入首场景。sdkOk = false 时保持无广告模式（AitaBridge 会自动降级，不会白送奖励）
        var enterGame = function (sdkOk) {
            cc.director.runSceneImmediate(sceneHolder);
            if (cc.sys.isBrowser) {
                // show canvas
                var canvas = document.getElementById('GameCanvas');
                canvas.style.visibility = '';
                var div = document.getElementById('GameDiv');
                if (div) {
                    div.style.backgroundImage = '';
                }
                console.log('Success to load scene: ' + launchScene);
            }
            if (sdkOk) {
                window.__instgameReady = true;
                try {
                    IG.onGameEvent && IG.onGameEvent('instgame_start', '');
                } catch (e) {}
            }
            else {
                console.warn('[instgame] 未启动 SDK，以无广告模式进入游戏');
            }
        };

        bundle.loadScene(launchScene, null, onProgress,
            function (err, scene) {
                if (err) {
                    console.error('loadScene fail: ' + launchScene, err);
                    return;
                }
                sceneHolder = scene;

                if (!HAS_INSTGAME || window.__instgameInited !== true) {
                    enterGame(false);
                    return;
                }

                // ★ 官方要求：首场景加载完后 startGameAsync，成功再 runSceneImmediate
                var done = false;
                var guard = setTimeout(function () {
                    if (done) return;
                    done = true;
                    console.warn('[instgame] startGameAsync 超时，以无广告模式进入游戏');
                    enterGame(false);
                }, 10000);
                var ok = function () {
                    if (done) return;
                    done = true;
                    clearTimeout(guard);
                    enterGame(true);
                };
                var fail = function (e) {
                    if (done) return;
                    done = true;
                    clearTimeout(guard);
                    console.warn('[instgame] startGameAsync 失败，以无广告模式进入游戏：', e);
                    enterGame(false);
                };
                try {
                    IG.startGameAsync().then(ok, fail);
                } catch (e) {
                    fail(e);
                }
            }
        );

    };

    var option = {
        id: 'GameCanvas',
        debugMode: settings.debug ? cc.debug.DebugMode.INFO : cc.debug.DebugMode.ERROR,
        showFPS: settings.debug,
        frameRate: 60,
        groupList: settings.groupList,
        collisionMatrix: settings.collisionMatrix,
    };

    cc.assetManager.init({ 
        bundleVers: settings.bundleVers,
        remoteBundles: settings.remoteBundles,
        server: settings.server
    });
    
    var bundleRoot = [INTERNAL];
    settings.hasResourcesBundle && bundleRoot.push(RESOURCES);

    var count = 0;
    function cb (err) {
        if (err) return console.error(err.message, err.stack);
        count++;
        if (count === bundleRoot.length + 1) {
            cc.assetManager.loadBundle(MAIN, function (err) {
                if (!err) cc.game.run(option, onStart);
            });
        }
    }

    cc.assetManager.loadScript(settings.jsList.map(function (x) { return 'src/' + x;}), cb);

    for (var i = 0; i < bundleRoot.length; i++) {
        cc.assetManager.loadBundle(bundleRoot[i], cb);
    }
};

if (window.jsb) {
    var isRuntime = (typeof loadRuntime === 'function');
    if (isRuntime) {
        require('src/settings.js');
        require('src/cocos2d-runtime.js');
        if (CC_PHYSICS_BUILTIN || CC_PHYSICS_CANNON) {
            require('src/physics.js');
        }
        require('jsb-adapter/engine/index.js');
    }
    else {
        require('src/settings.js');
        require('src/cocos2d-jsb.js');
        if (CC_PHYSICS_BUILTIN || CC_PHYSICS_CANNON) {
            require('src/physics.js');
        }
        require('jsb-adapter/jsb-engine.js');
    }

    cc.macro.CLEANUP_IMAGE_CACHE = true;
    window.boot();
}
