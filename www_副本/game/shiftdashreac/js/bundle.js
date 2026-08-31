(function () {
  'use strict';

  var d;
  (function (d) {
      d["Normal"] = "Normal";
      d["Endless"] = "Endless";
      d["Maze"] = "Maze";
      d["Egg"] = "Egg";
  })(d || (d = {}));
  var h;
  (function (h) {
      h["Ground"] = "Ground";
      h["Water"] = "Water";
      h["UpStairs"] = "UpStairs";
      h["Cliff"] = "Cliff";
      h["Bridge"] = "Bridge";
  })(h || (h = {}));
  var l;
  (function (l) {
      l[l["NONE"] = 0] = "NONE";
      l[l["DEFAULT"] = Laya.Physics3DUtils.COLLISIONFILTERGROUP_DEFAULTFILTER] = "DEFAULT";
      l[l["ALL"] = Laya.Physics3DUtils.COLLISIONFILTERGROUP_ALLFILTER] = "ALL";
      l[l["GROUND"] = Laya.Physics3DUtils.COLLISIONFILTERGROUP_STATICFILTER] = "GROUND";
      l[l["PLAYER"] = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CHARACTERFILTER] = "PLAYER";
      l[l["OBSTACLE"] = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1] = "OBSTACLE";
      l[l["OBSTACLE_BROKEN"] = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2] = "OBSTACLE_BROKEN";
      l[l["ENEMY"] = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER3] = "ENEMY";
  })(l || (l = {}));
  var o;
  (function (o) {
      o[o["E_GAME_READY"] = 1] = "E_GAME_READY";
      o[o["E_GAME_START"] = 2] = "E_GAME_START";
      o[o["E_GAME_PAUSE"] = 3] = "E_GAME_PAUSE";
      o[o["E_GAME_FINISH"] = 4] = "E_GAME_FINISH";
      o[o["E_GAME_FAILED"] = 5] = "E_GAME_FAILED";
      o[o["E_GAME_OVER"] = 6] = "E_GAME_OVER";
  })(o || (o = {}));
  (function (o) {
      o[o["E_COLLIDE_ENTER"] = 0] = "E_COLLIDE_ENTER";
      o[o["E_COLLIDE_EXIT"] = 1] = "E_COLLIDE_EXIT";
  })(o || (o = {}));
  var I;
  (function (I) {
      I[I["UNKOWN"] = 0] = "UNKOWN";
      I[I["COINS"] = 1] = "COINS";
      I[I["DIAMOND"] = 2] = "DIAMOND";
      I[I["SIGNIN"] = 3] = "SIGNIN";
      I[I["VIDEO"] = 4] = "VIDEO";
      I[I["TURNTABLE"] = 5] = "TURNTABLE";
      I[I["ICEBREAK"] = 6] = "ICEBREAK";
      I[I["STAGEPROGRESS"] = 7] = "STAGEPROGRESS";
      I[I["GODGIVE"] = 8] = "GODGIVE";
      I[I["EGG"] = 9] = "EGG";
      I[I["UGCSHARE"] = 10] = "UGCSHARE";
      I[I["FRAGMENT"] = 11] = "FRAGMENT";
      I[I["STAGE_ID"] = 12] = "STAGE_ID";
      I[I["ACTIVITY"] = 13] = "ACTIVITY";
      I[I["EGG_LEVEL"] = 15] = "EGG_LEVEL";
      I[I["MAZE"] = 16] = "MAZE";
      I[I["LOTTERY"] = 17] = "LOTTERY";
      I[I["TRY"] = 18] = "TRY";
      I[I["CARD"] = 19] = "CARD";
      I[I["INITIAL"] = 999] = "INITIAL";
  })(I || (I = {}));
  const s = {
      UI_HEAD: 'res/head.png',
      UI_TIPS: 'res/img_tips.png',
      UI_COINS_IMG: 'res/img_coins.png',
      UI_DIAMOND_IMG: 'res/img_diamond.png',
      UI_VIDEO_IMG: 'res/img_video.png',
      UI_SHARE_IMG: 'res/img_share.png',
      UI_SOUND_ON_IMG: '',
      UI_SOUND_OFF_IMG: '',
      UI_SHAKE_ON_IMG: '',
      UI_SHAKE_OFF_IMG: '',
      JSON_GAME_CFG: 'json/gameCfg.json',
      SOUND_CLICK: 'res/sound/click_ui.mp3',
      SOUND_TURNTABLE_START: 'res/turntable/wheel_start.mp3',
      SOUND_TURNTABLE_END: 'res/turntable/wheel_end.mp3',
      SOUND_XIANGJI: 'res/sound/xiangji.mp3',
      SOUND_COLLIDE_DIAMOND: 'res/sound/Diamond_Collect.mp3',
      SOUND_COLLIDE_KEY: 'res/sound/Key_Collect.mp3',
      TEX_SHADOW: 'res3d/Textures/shadow.png',
      PFB_BILLBOARD: 'scenes/prefab/ratioBillboard.json'
  };
  const n = {
      PHYSICS_DEBUG_SHOW: !1
  };
  const a = {
      E_GAME_STATE_CHANGED: '$GAME_STATE_CHANGE',
      E_GO_NEXT_STAGE: '$GO_NEXT_STAGE',
      E_COLLISION_ENTER: 'COLLISION_ENTER',
      E_COLLISION_EXIT: 'COLLISION_EXIT',
      E_TRIGGER_ENTER: 'TRIGGER_ENTER',
      E_TRIGGER_EXIT: 'TRIGGER_EXIT',
      E_PLAYER_EVENT: '$E_PLAYER_EVENT',
      E_HIDE_GUIDE: '$E_HIDE_GUIDE',
      E_REVIVE_TRANSFORM: '$E_REVIVE_TRANSFORM',
      E_GENERATE_ROAD: '$E_GENERATE_ROAD',
      E_Change_SelectType_List: '$E_Change_SelectType_List',
      E_ADD_OPPONENT_CNT: '$E_ADD_OPPONENT_CNT',
      E_ARRIVE_END: 'E_ARRIVE_END',
      E_MAZE_SELECT: 'E_MAZE_SELECT',
      E_Player_Transform: '$E_Player_Transform',
      E_Player_ARRIVE_END: '$E_Player_ARRIVE_END',
      E_UI_CLOSE_TURNTABLE: '$E_CLOSE_TURN_TABLE',
      E_COLLECT_GEM: '$E_COLLECT_KEY',
      E_COLLECT_KEY: '$E_COLLECT_KEY',
      E_TIME_BEGIN: 'E_TIME_BEGIN',
      E_Energy_Changed: 'E_Energy_Changed',
      E_Fly_Start: 'E_Fly_Start'
  };
  var C;
  (function (C) {
      C["Player"] = "Player";
      C["Car"] = "Car";
      C["Plane"] = "Plane";
      C["Boat"] = "Boat";
      C["Wing"] = "Wing";
      C["Bike"] = "Bike";
      C["Zuandiji"] = "Zuandiji";
  })(C || (C = {}));
  var p;
  (function (p) {
      p[p["SUCCESS"] = 0] = "SUCCESS";
      p[p["SKIN_ADDFAIL_EXIST"] = 1] = "SKIN_ADDFAIL_EXIST";
      p[p["SKIN_ADDFAIL_NOEXIST"] = 2] = "SKIN_ADDFAIL_NOEXIST";
      p[p["SKIN_ADD"] = 3] = "SKIN_ADD";
      p[p["SKIN_ADD_VIDEOCNT"] = 4] = "SKIN_ADD_VIDEOCNT";
      p[p["SKIN_LOTTERY_NOTENOUGH"] = 5] = "SKIN_LOTTERY_NOTENOUGH";
      p[p["SKIN_LOTTERY_UNKOWNGROUP"] = 6] = "SKIN_LOTTERY_UNKOWNGROUP";
      p[p["SKIN_LOTTERY_NOTENOUGH_COIN"] = 7] = "SKIN_LOTTERY_NOTENOUGH_COIN";
  })(p || (p = {}));
  const _ = {
      E_SKIN_UNLOCK: '$E_SKIN_UNLOCK',
      E_SKIN_CHANGE: '$E_SKIN_CHANGE',
      E_SKIN_FRAGMENT_CHANGE: '$E_SKIN_FRAGMENT_CHANGE'
  };
  var E;
  (function (E) {
      E[E["E_GENERAL"] = 1] = "E_GENERAL";
      E[E["E_RARE"] = 2] = "E_RARE";
      E[E["E_EPIC"] = 3] = "E_EPIC";
      E[E["E_LEGEND"] = 4] = "E_LEGEND";
  })(E || (E = {}));
  var b;
  (function (b) {
      b[b["LOCK"] = 0] = "LOCK";
      b[b["UNLOCK"] = 1] = "UNLOCK";
      b[b["TIMETRYUNLOCK"] = 2] = "TIMETRYUNLOCK";
  })(b || (b = {}));
  var T;
  (function (T) {
      T[T["UNKNOWN"] = 0] = "UNKNOWN";
      T[T["WHITE"] = 1] = "WHITE";
      T[T["GREEN"] = 2] = "GREEN";
      T[T["BLUE"] = 3] = "BLUE";
      T[T["PURPLE"] = 4] = "PURPLE";
      T[T["ORANGE"] = 5] = "ORANGE";
      T[T["RED"] = 6] = "RED";
  })(T || (T = {}));
  var $;
  (function ($) {
      $["R"] = "R";
      $["SR"] = "SR";
      $["SSR"] = "SSR";
      $["SSSR"] = "SSSR";
      $["SSSSR"] = "SSSSR";
  })($ || ($ = {}));
  const xe = {
      cardNorBg_open: 'res/boxReward/10.png',
      cardNorBg: 'res/boxReward/9.png',
      cardRare_open: 'res/boxReward/8.png',
      cardRare: 'res/boxReward/7.png',
      cardShi_open: 'res/boxReward/6.png',
      cardShi: 'res/boxReward/5.png',
      cardLegend_open: 'res/boxReward/4.png',
      cardLegeng: 'res/boxReward/3.png',
      cardLimit_open: 'res/boxReward/2.png',
      cardLimit: 'res/boxReward/1.png'
  };
  var Y;
  (function (Y) {
      Y[Y["UNKNOWN"] = 0] = "UNKNOWN";
      Y[Y["COINS"] = 1] = "COINS";
      Y[Y["SKINFRAG"] = 2] = "SKINFRAG";
      Y[Y["SKIN"] = 3] = "SKIN";
  })(Y || (Y = {}));
  const ge = {
      signIn_cur_bgUrl: 'res/signIn/img_19.png',
      signIn_other_bgUrl: 'res/signIn/img_20.png',
      signIn_cur7_bgUrl: 'res/signIn/img_day7.png',
      signIn_other7_bgUrl: 'res/signIn/img_day7.png',
      signIn_day_bgUrl: 'res/signIn/6.png',
      signIn_otherDay_bgUrl: 'res/signIn/5.png'
  };
  var z;
  (function (z) {
      z[z["UNKNOWN"] = 0] = "UNKNOWN";
      z[z["COINS"] = 1] = "COINS";
      z[z["SKIN"] = 2] = "SKIN";
  })(z || (z = {}));
  var X;
  (function (X) {
      X[X["E_SIGNIN_SUCCESS"] = 0] = "E_SIGNIN_SUCCESS";
      X[X["E_SIGNIN_REPEAT"] = 1] = "E_SIGNIN_REPEAT";
      X[X["E_GOLD_ADD"] = 2] = "E_GOLD_ADD";
      X[X["E_GOLD_SUB"] = 3] = "E_GOLD_SUB";
  })(X || (X = {}));
  const ye = {
      lock_bottomQ2bgUrl: 'res/skin/skin_1.png',
      lock_bottomQ1bgUrl: 'res/skin/skin_lock_1.png',
      [C.Player]: 'res/skin/tabIcon/a4.png',
      [C.Plane]: 'res/skin/tabIcon/a3.png',
      [C.Boat]: 'res/skin/tabIcon/a6.png',
      [C.Bike]: 'res/skin/tabIcon/a1.png',
      [C.Car]: 'res/skin/tabIcon/a5.png',
      [C.Wing]: 'res/skin/tabIcon/a8.png',
      [C.Zuandiji]: 'res/skin/tabIcon/a7.png',
      iconBg_using: 'res/skin/8.png',
      iconBg_not: 'res/skin/10.png'
  };
  const le = {
      FAN_NUM: 8
  };
  var j;
  (function (j) {
      j[j["DAY_7"] = 7] = "DAY_7";
      j[j["DAY_15"] = 15] = "DAY_15";
      j[j["DAY_30"] = 30] = "DAY_30";
  })(j || (j = {}));
  const Ye = {
      E_GAME_RECORD: '$GAME_RECORD'
  };
  var Ge;
  (function (Ge) {
      Ge["NOT_RECORD"] = "res/record_2.png";
      Ge["START_RECORD"] = "res/record_3.png";
      Ge["SUCCESS_RECORD"] = "res/record_1.png";
  })(Ge || (Ge = {}));
  var $e;
  (function ($e) {
      $e[$e["E_RECORD_READY"] = 0] = "E_RECORD_READY";
      $e[$e["E_RECORD_START"] = 1] = "E_RECORD_START";
      $e[$e["E_RECORD_FAILED"] = 2] = "E_RECORD_FAILED";
      $e[$e["E_RECORD_REVIVE"] = 3] = "E_RECORD_REVIVE";
      $e[$e["E_RECORD_FINISH"] = 4] = "E_RECORD_FINISH";
  })($e || ($e = {}));
  var Me;
  (function (Me) {
      Me[Me["NOT_RECORD"] = 1] = "NOT_RECORD";
      Me[Me["START_RECORD"] = 2] = "START_RECORD";
      Me[Me["SUCCESS_RECORD"] = 3] = "SUCCESS_RECORD";
  })(Me || (Me = {}));
  class game {
      static normalize(e = { x: 0, y: 0 }, t = { x: 0, y: 0 }) {
          var r = e.x, i = e.y, n = r * r + i * i;
          n > 0 && ((n = 1 / Math.sqrt(n)), (t.x = r * n), (t.y = i * n));
      }
  }
  game.qe = null;
  var Q;
  (function (Q) {
      Q[Q["UNKOWN"] = 0] = "UNKOWN";
      Q[Q["FOREVER"] = 1] = "FOREVER";
      Q[Q["ONE_TIME"] = 2] = "ONE_TIME";
      Q[Q["DAILY"] = 3] = "DAILY";
  })(Q || (Q = {}));
  var Z;
  (function (Z) {
      Z[Z["UNKOWN"] = 0] = "UNKOWN";
      Z[Z["WEIGHT"] = 1] = "WEIGHT";
      Z[Z["CNT"] = 2] = "CNT";
      Z[Z["WEIGHT_CNT"] = 3] = "WEIGHT_CNT";
  })(Z || (Z = {}));
  var D;
  (function (D) {
      D[D["E_Change"] = 0] = "E_Change";
      D[D["E_Destroy"] = 1] = "E_Destroy";
      D[D["E_Active"] = 2] = "E_Active";
      D[D["E_Deactive"] = 3] = "E_Deactive";
  })(D || (D = {}));

  class RewardBtnScript extends Laya.Script {
      constructor(e = null) {
          super(),
              (this.rewardStrategyInst = void 0),
              (this.isEnable = !0),
              e && ((this.adId = e.adId), (this.customStrategy = e.customStrategy));
      }
      onAwake() {
          console.log('大转盘抽奖..-激励广告');
          let e = fx.Utils.getUIComponetRoot(this.owner);
          e || (e = '默认'), this.customStrategy || (this.customStrategy = 'auto');
          let t = null;
          'auto' === this.customStrategy
              ? (t = fx.GetRewardSDKWay.AUTO)
              : 'video' === this.customStrategy
                  ? (t = fx.GetRewardSDKWay.VIDEO)
                  : 'share' === this.customStrategy && (t = fx.GetRewardSDKWay.SHARE);
          let i = fx.Sdk.instance.getVideoId();
          (this.rewardStrategyInst = fx.Sdk.instance.getRewardStrategyInst()),
              this.rewardStrategyInst.setCurStrategy(t, new fx.RewardGainWayParams({
                  source: e,
                  bindCtrlGId: this.owner['$_GID'],
                  id: i,
                  forever: this.forever
              }));
      }
      onEnable() {
          this.refreshSelf();
      }
      onDestroy() {
          this.rewardStrategyInst.setCurStrategy(void 0, void 0);
      }
      onClick() {
          this.isEnable && this.runStrategy();
      }
      onRweard(e) {
          this.cb && this.owner && this.owner['$_GID'] == e.gid && this.cb.runWith(e);
      }
      getStrategy() {
          return this.rewardStrategyInst.getStrategy();
      }
      runStrategy() {
          this.rewardStrategyInst.runStrategy();
      }
      refreshSelf() {
          if ('auto' !== this.customStrategy)
              return;
          let e = this.owner, t = e;
          if (this.changeNodeName && !(t = e.seekChildByName(this.changeNodeName)))
              return void console.log('###RewardBtnScript 没有对应名字的子节点');
          if (!this.shareSkinRes || !this.videoSkinRes)
              return void console.log('###RewardBtnScript 无纹理资源');
          let i = s[this.videoSkinRes] ? s[this.videoSkinRes] : this.videoSkinRes, n = s[this.shareSkinRes] ? s[this.shareSkinRes] : this.shareSkinRes;
          fx.GetRewardSDKWay.VIDEO === this.getStrategy() ? (t.skin = i) : (t.skin = n);
      }
      setCallback(e) {
          this.cb = e;
      }
      setEnalbe(e) {
          this.isEnable = e;
      }
  }

  class ScaleEffectBtn extends Laya.Script {
      constructor() {
          super(), (this.res = ''), (this.anchorCenter = !0), (this.scaleX = 0.88), (this.scaleY = 0.88);
      }
      onAwake() {
          let e = this.owner;
          this.anchorCenter && fx.Utils.resetAnchor(e, 0.5, 0.5),
              fx.Effect.btnScaleEff(this.owner, {
                  x: this.scaleX,
                  y: this.scaleY
              }),
              e.on(Laya.Event.MOUSE_DOWN, this, this.onClicked);
      }
      onClicked() {
          let e = this.res && s[this.res];
          e ? fx.SoundManager.instance.playSound(e) : fx.SoundManager.instance.playSound(s.SOUND_CLICK);
      }
  }

  class PulseEffectBtn extends Laya.Script {
      constructor() {
          super();
      }
      onAwake() {
          let e = this.owner;
          fx.Utils.resetAnchor(e, 0.5, 0.5);
          let t = e.scaleX;
          new fx.Sequence([
              {
                  t: 'to',
                  target: e,
                  props: {
                      scaleX: t + 0.1,
                      scaleY: t + 0.1
                  },
                  duration: 400,
                  ease: Laya.Ease.backOut,
                  complete: null,
                  completeArgs: null,
                  delay: 1e3
              },
              {
                  t: 'to',
                  target: e,
                  props: {
                      scaleX: t,
                      scaleY: t
                  },
                  duration: 400,
                  ease: Laya.Ease.backIn
              }
          ], !0).run();
      }
      onDisable() {
          Laya.Tween.clearAll(this.owner);
      }
  }

  var e = Laya.Vector3, t = (Laya.Vector4, Laya.Sprite3D), i = Laya.MeshSprite3D;
  class A extends fx.PhysicsScript {
      constructor() {
          super(...arguments),
              (this.min = new e()),
              (this.max = new e()),
              (this.temp2 = new e()),
              (this.impulse = new e());
      }
      init(e, t) {
          super.init(e), (this.safeArea = t), (this.enabled = !0);
      }
      onUpdate() {
          if (this.isStatic() && !this.isSyncShape())
              return;
          let e = this.body;
          !e.sleeping && e.parent
              ? (super.onUpdate(),
                  this.safeArea &&
                      0 ==
                          Laya.CollisionUtils.boxContainsPoint(this.safeArea, this.obstacle.transform.position) &&
                      this.onOutSide())
              : this.impulse.toDefault();
      }
      onOutSide() { }
      applyImpulse(t, i) {
          e.scalarLengthSquared(t) > 0 && (this.impulse.from(t), this.body.applyImpulse(t, i));
      }
      getImpulse() {
          return this.impulse;
      }
      setVelocity(e, t) {
          let i = this.body.linearVelocity;
          (i.x = e.x), t || (i.y = e.y), (i.z = e.z);
      }
      getVelocity() {
          let e = this.temp, t = this.body.linearVelocity;
          return e.setValue(t.x, t.y, t.z), e;
      }
      setSpeed(e) {
          let t = this.body.linearSpeed;
          (t.x = e.x), (t.y = e.y), (t.z = e.z);
      }
      getSpeed() {
          let e = this.temp, t = this.body.linearSpeed;
          return e.setValue(t.x, t.y, t.z), e;
      }
      getMass() {
          return this.body.mass;
      }
      getInvMass() {
          return this.body.inverseMass;
      }
      wakeUp() {
          this.body.sleeping && this.body.awake();
      }
      sleep() {
          this.body.sleep();
      }
      setGravity(e) {
          this.body && (this.body.overrideGravity = e);
      }
      getBodyName() {
          return this.body.name;
      }
      setPositionConstraint(e, t) {
          this.body.positionConstraint = [e.x, t.x, e.y, t.y, e.z, t.z];
      }
      setLinearVelocityConstraint(e) {
          this.body.linearVelocityConstraint = e;
      }
      setAngularVelocityConstraint(e) {
          this.body.angularVelocityConstraint = e;
      }
      freezeAngular(e) {
          let t = '';
          e.x || (t += 'x'),
              e.y || (t += 'y'),
              e.z || (t += 'z'),
              (this.body.angularVelocityConstraint = t);
      }
      freezePosition(e) {
          let t = '';
          e.x || (t += 'x'),
              e.y || (t += 'y'),
              e.z || (t += 'z'),
              (this.body.linearVelocityConstraint = t);
      }
      setKinematic(e) {
          this.body.isKinematic = e;
      }
      clearForces() {
          this.setSpeed(new Laya.Vector3(0, 0, 0)), this.setVelocity(new Laya.Vector3(0, 0, 0), null);
      }
      getBoundBox() {
          let t = this.min;
          t.from(this.boundBox.min);
          let i = this.max;
          i.from(this.boundBox.max);
          let s = this.obstacle.transform.position, n = this.obstacle.transform.rotation;
          e.transformQuat(t, n, t), e.transformQuat(i, n, i);
          let a = this.temp, r = this.temp2;
          return e.min(t, i, a), e.add(s, a, a), e.max(t, i, r), e.add(s, r, r), new Laya.BoundBox(a, r);
      }
  }

  class S extends fx.UserInfoEntity {
      constructor() {
          super(!1),
              (this.stageId = void 0),
              (this.vibrateEnable = void 0),
              (this.coins = void 0),
              (this.guideSteps = void 0),
              (this.curPlayer = void 0),
              (this.curCar = void 0),
              (this.curPlane = void 0),
              (this.curBoat = void 0),
              (this.curWing = void 0),
              (this.curBike = void 0),
              (this.curZuandiji = void 0),
              (this.ownSkins = void 0),
              (this.guideAnimals = void 0),
              (this.ugcShareSkinId = void 0),
              (this.ugcShareSkins = []),
              (this.stageSkinInfo = []),
              (this.stageSkins = []),
              (this.isBreakingIce = !0),
              (this.signInToday = void 0),
              (this.signInDays = void 0),
              (this.turntableFreetime = void 0),
              (this.turntableCnt = void 0),
              (this.turntableHasTakeIds = void 0),
              (this.trySkinNum = void 0),
              (this.closeTryNum = void 0),
              (this.keyNum = void 0),
              (this.departureTime = void 0),
              (this.openTurntable = void 0),
              (this.openTryBreakeIce = void 0),
              (this.fragments = void 0),
              (this.openCardNum = void 0),
              (this.stageId = 1),
              (this.coins = 0),
              (this.vibrateEnable = !1),
              (this.guideSteps = []),
              (this.trySkinNum = 0),
              (this.departureTime = 0),
              (this.openTryBreakeIce = !1),
              (this.openTurntable = !1),
              (this.openCardNum = 0),
              (this.fragments = []),
              (this.keyNum = 0),
              (this.closeTryNum = 0),
              fx.Utils.warpObjectGetterSetter(this, this.dirty);
      }
      addCoins(e) {
          e && (this.coins += e);
      }
      useCoins(e) {
          e && (this.coins < e || (this.coins -= e));
      }
  }

  class y extends fx.BaseLogic {
      constructor() {
          super();
      }
      static get instance() {
          return this._instance || (this._instance = new y()), this._instance;
      }
      onInitOnce() {
          fx.UserLogic.instance.init(S);
      }
      onInit() {
          (this.player = this.getPlayerInfo()),
              fx.UserLogic.instance.isNewDay() &&
                  ((this.player.openTryBreakeIce = !0), (this.player.openTurntable = !0));
      }
      getPlayerInfo() {
          return fx.UserLogic.instance.getUserInfo();
      }
      addCoins(e) {
          return !(!e || e < 0) && ((this.player.coins += e), !0);
      }
      coinsEnough(e) {
          return null != e && this.player.coins >= e;
      }
      useCoins(e) {
          return !(null == e || e < 0 || !this.coinsEnough(e)) && ((this.player.coins -= e), !0);
      }
  }

  class m extends fx.BaseLogic {
      constructor() {
          super();
      }
      static get instance() {
          return this._instance || (this._instance = new m()), this._instance;
      }
      onInitOnce() {
          console.log();
          this.timer3d = new Laya.Timer(!0);
          let e = fx.CfgMgr.instance;
          (this.constantCfg = e.get('constant')),
              s.JSON_GAME_CFG && (this.gameCfg = e.get(s.JSON_GAME_CFG)),
              (this.stageCfg = e.get('stageCfg')),
              (this.maxStageId = Object.keys(this.stageCfg).length);
      }
      onInit() {
          this.gameState = o.E_GAME_READY;
          let e = y.instance.getPlayerInfo();
          isNaN(e.stageId) && (e.stageId = 1),
              e.stageId > this.maxStageId && (e.stageId = 1),
              (this.curStageInfo = this.stageCfg[e.stageId]),
              (this._player = null),
              (this._players = []),
              (this._roads = []),
              (this._selectTypes = []),
              (this._arrivedCnt = 0),
              (this.gemCount = 0),
              (this._energy = 0),
              (this._maxEnergy = 0),
              (this.keyCount = 0),
              this.resume();
      }
      getTimer() {
          return this.timer3d;
      }
      getGameCfgJson() {
          return this.gameCfg;
      }
      getGameConstants() {
          return this.constantCfg;
      }
      setGameState(e) {
          if (this.gameState != e && this.gameState != o.E_GAME_OVER) {
              let t = this.gameState;
              (this.gameState = e),
                  e == o.E_GAME_START && this.resume(),
                  this.event(a.E_GAME_STATE_CHANGED, t),
                  (e != o.E_GAME_FINISH && e != o.E_GAME_OVER) || this.offAll();
          }
      }
      getGameState() {
          return this.gameState;
      }
      getCurStage() {
          return this.curStageInfo;
      }
      getStageCfg() {
          return this.stageCfg;
      }
      goNextStage() {
          let e = this.curStageInfo.id;
          e &&
              (++e > this.maxStageId && (e = 1),
                  (y.instance.getPlayerInfo().stageId = e),
                  this.init(),
                  this.event(a.E_GO_NEXT_STAGE));
      }
      get safeArea() {
          return this._safeArea;
      }
      set safeArea(e) {
          this._safeArea = e;
      }
      get player() {
          return this._player;
      }
      set player(e) {
          this._player = e;
      }
      get players() {
          return this._players;
      }
      set players(e) {
          this._players = e;
      }
      get guideAnimal() {
          return this._guideAnimal;
      }
      set guideAnimal(e) {
          this._guideAnimal = e;
      }
      set endReward(e) {
          this._endReward = e;
      }
      get endReward() {
          return this._endReward;
      }
      pause() {
          this.isPause() || this.timer3d.pause();
      }
      resume() {
          this.isPause() && this.timer3d.resume();
      }
      isPause() {
          return 0 == this.timer3d.scale;
      }
      setSelectTypes(e) {
          (this._selectTypes = e.slice()), this.event(a.E_Change_SelectType_List);
      }
      getSelectTypes() {
          return this._selectTypes;
      }
      collectGem(e, t) {
          (this.gemCount += e), this.event(a.E_COLLECT_GEM, t), y.instance.addCoins(e);
      }
      getCollectGem() {
          return this.gemCount;
      }
      collectKey(e, t) {
          (this.keyCount += e), y.instance.getPlayerInfo().keyNum++, this.event(a.E_COLLECT_KEY, t);
      }
      getCollectKey() {
          return this.keyCount;
      }
      isEndless() {
          return this.stageType == d.Endless;
      }
      isMaze() {
          return this.stageType == d.Maze;
      }
      getEndlessCfgList() {
          return this.endlessList;
      }
      getEndlessCfg(e) {
          for (let t in this.endlessList) {
              let i = this.endlessList[Number(t)];
              if (e >= i.roadArea[0] && e <= i.roadArea[1])
                  return i;
          }
          let t = Object.keys(this.endlessList).length;
          return this.endlessList[t];
      }
      getIndex(e) {
          let t = e.substring(e.length - 1);
          return Number(t);
      }
      isBreak(e) {
          return -1 != e.indexOf('break');
      }
      get arrivedCnt() {
          return this._arrivedCnt;
      }
      set arrivedCnt(e) {
          this._arrivedCnt = e;
      }
      get raceRank() {
          return this._raceRank;
      }
      set raceRank(e) {
          this._raceRank = e;
      }
      get raceEndPos() {
          return this._raceEndPos;
      }
      set raceEndPos(e) {
          this._raceEndPos = e;
      }
      get raceStartPos() {
          return this._raceStartPos;
      }
      set raceStartPos(e) {
          this._raceStartPos = e;
      }
      get raceFlyPos() {
          return this._raceFlyPos;
      }
      set raceFlyPos(e) {
          this._raceFlyPos = e;
      }
      get failTerrainType() {
          return this._failTerrainType;
      }
      set failTerrainType(e) {
          this._failTerrainType = e;
      }
      get roads() {
          return this._roads;
      }
      get energy() {
          return this._energy;
      }
      addEnergy(e) {
          (this._energy += e),
              (this._energy = Math.max(0, this._energy)),
              fx.EventCenter.instance.event(a.E_Energy_Changed);
      }
      get maxEnergy() {
          return this._maxEnergy;
      }
      set maxEnergy(e) {
          this._maxEnergy = e;
      }
      getEndNum() {
          let e = this.constantCfg.wingMaxFlight - 1;
          return Math.floor((this._energy / this._maxEnergy) * e) + 1;
      }
  }

  class N extends Laya.Script3D {
      constructor() {
          super(), (this.parts = []);
      }
      onAwake() {
          if (((this.ownerSp = this.owner), m.instance.isBreak(this.owner.name))) {
              let e = this.owner['getChildren']();
              for (const t of e) {
                  t.getComponent(Laya.PhysicsCollider) && ((t.active = !1), this.parts.push(t));
              }
          }
      }
      handleBreak() {
          if (m.instance.isBreak(this.ownerSp.name)) {
              for (const t of this.parts) {
                  t.active = !0;
                  let i = t.getComponent(Laya.PhysicsCollider);
                  fx.Utils.add3dModelTo(t, this.owner.scene);
                  let s = t.addComponent(A), a = {
                      static: !1,
                      kinematic: !1,
                      shape: i.colliderShape,
                      event: !0,
                      neverSleep: !0,
                      belongsTo: l.OBSTACLE_BROKEN,
                      collidesWith: l.ALL,
                      debug: n.PHYSICS_DEBUG_SHOW
                  };
                  s.init(a), i.destroy();
                  let r = new Laya.Vector3();
                  (r.x = fx.Utils.getNumberRandom(-2, 2)),
                      (r.y = fx.Utils.getNumberRandom(4, 5)),
                      (r.z = fx.Utils.getNumberRandom(0, 3)),
                      r.normalize(5 * s.getMass()),
                      s.applyImpulse(r),
                      t.timerOnce(2e3, t, () => {
                          t.destroy();
                      });
              }
              this.owner.destroy(),
                  -1 != this.ownerSp.name.indexOf('Rock')
                      ? fx.SoundManager.instance.playSound('res/sound/stone_destroy.mp3')
                      : -1 != this.ownerSp.name.indexOf('Woodbox') &&
                          fx.SoundManager.instance.playSound('res/sound/wood_destroy.mp3'),
                  fx.Sdk.instance.vibrate();
          }
      }
  }

  var e$1 = Laya.Vector3, t$1 = (Laya.Vector4, Laya.Sprite3D), i$1 = Laya.MeshSprite3D;
  class R extends fx.Helper {
      static crashSprite3D(e, t, i) { }
      static clearCrashBox() { }
      static crashSprite3dGravity(e, t, i, s = 90, n = !0, a = !1, r = 14, o = 16, l = 3e3) { }
      static clearCrashBoxGravity() { }
      static createMeshColliderShape(e, t) {
          let i = e.getComponent(Laya.PhysicsCollider);
          if (i)
              return;
          i = e.addComponent(Laya.PhysicsCollider);
          let s = new Laya.MeshColliderShape();
          return ((s.mesh = e.meshFilter.sharedMesh), (i.colliderShape = s), t && (i.collisionGroup = t), i);
      }
      static createBoxColliderShape(e, t, i) {
          let s = e.getComponent(Laya.PhysicsCollider);
          if (s)
              return;
          s = e.addComponent(Laya.PhysicsCollider);
          let n = fx.Utils.get3dLocalModelSize(e);
          i && ((n.x *= i.x), (n.y *= i.y), (n.z *= i.z));
          let a = new Laya.BoxColliderShape(n.x, n.y, n.z);
          return (s.colliderShape = a), t && (s.collisionGroup = t), s;
      }
      static setColliderShapeGroup(e, t, i = null) {
          let s = e.getComponent(Laya.PhysicsCollider);
          return s && ((s.collisionGroup = t), i && (s.canCollideWith = i)), s;
      }
      static setRigidBodyCollideWith(e, t, i) {
          let s = e.getComponent(Laya.Rigidbody3D);
          return s && (i && (s.collisionGroup = i), (s.canCollideWith = t)), s;
      }
      static smoothProcMeshCollider(e, t) {
          let i = e.meshFilter.sharedMesh, s = e;
          if (i && !s.__smoothprocmeshcollider) {
              let n;
              s.__smoothprocmeshcollider = !0;
              const a = () => {
                  let i = e.getComponent(Laya.PhysicsCollider);
                  if (!i) {
                      i = e.addComponent(Laya.PhysicsCollider);
                      let s = new Laya.MeshColliderShape();
                      (s.mesh = e.meshFilter.sharedMesh), (i.colliderShape = s), R.setColliderShapeGroup(e, t);
                  }
                  (s.__smoothprocmeshcollider = !1), e.off(Laya.Event.REMOVED, this, n);
              };
              let r = i;
              if (r._nativeTriangleMesh)
                  a();
              else {
                  let t = Laya.Mesh, i = new Laya3D['_physics3D'].btTriangleMesh(), o = t._nativeTempVector30, l = t._nativeTempVector31, h = t._nativeTempVector32, d = r._tempVector30, c = r._tempVector31, g = r._tempVector32, f = r._vertexBuffer, u = r._getPositionElement(f), S = f.getData(), y = f.vertexDeclaration.vertexStride / 4, m = u.offset / 4, _ = r._indexBuffer.getData(), p = 0;
                  const C = () => {
                      const e = Laya.Utils3D['_convertToBulletVec3'];
                      for (; p < _.length; p += 3) {
                          if (Laya.stage.getTimeFromFrameStart() > 30)
                              return;
                          let t = _[p] * y + m, s = _[p + 1] * y + m, n = _[p + 2] * y + m;
                          d.setValue(S[t], S[t + 1], S[t + 2]),
                              c.setValue(S[s], S[s + 1], S[s + 2]),
                              g.setValue(S[n], S[n + 1], S[n + 2]),
                              e(d, o, !0),
                              e(c, l, !0),
                              e(g, h, !0),
                              i.addTriangle(o, l, h, !0);
                      }
                      (r._nativeTriangleMesh = i), Laya.timer.clear(this, C), a();
                  };
                  Laya.timer.frameLoop(1, this, C),
                      (n = () => {
                          (s.__smoothprocmeshcollider = !1), Laya.timer.clear(this, C);
                      }),
                      e.once(Laya.Event.REMOVED, this, n);
              }
          }
      }
      static changeRigibodyToCollider(e) {
          let t = e.getComponent(Laya.Rigidbody3D);
          if (t) {
              let i = t.colliderShape.clone(), s = e.addComponent(Laya.PhysicsCollider);
              return (s.colliderShape = i), (t.enabled = !1), s;
          }
      }
      static changeColliderToRigibody(e) {
          let t = e.getComponent(Laya.PhysicsCollider);
          if (t) {
              let i = t.colliderShape.clone(), s = e.addComponent(Laya.Rigidbody3D);
              return (s.colliderShape = i), (t.enabled = !1), s;
          }
      }
      static playBombEff(e, t, i, s = !0) { }
      static playMagEff(e, t, i) { }
      static playChainEff(e, t, i) { }
      static playInvolveEff(e, t, i, s = 1, n = 1, a, r) {
          return e.__involveNodes;
      }
      static playHoleEff(e, t, i, s, n, a, r, o) { }
      static playRollUpEff(e, t, i = 1, s) { }
      static playTornadoEff(e, t, i, s, n, a) { }
      static playThunderLightEff(e, t, i, s) { }
      static effColorSplash(e, t, i) {
          let s, n = e;
          if (n.__color_splash_anim)
              return;
          let a = (s =
              e instanceof Laya.SkinnedMeshSprite3D
                  ? e.skinnedMeshRenderer.material
                  : e.meshRenderer.material).shininess;
          (n.__color_splash_anim = {
              tween: null,
              shininess: a
          }),
              (s.shininess = 0);
          let r = t.clone();
          const o = new Laya.Handler(this, function () {
              s.specularColor = r;
          });
          e.once(Laya.Event.REMOVED, this, this.stopColorSplashAnim, [e]),
              (function () {
                  n.__color_splash_anim.tween = Laya.Tween.to(r, {
                      x: 0,
                      y: 0,
                      z: 0,
                      update: o
                  }, i, null, Laya.Handler.create(this, () => {
                      R.stopColorSplashAnim(e);
                  }));
              })();
      }
      static stopColorSplashAnim(e) {
          let t = e;
          if (t.__color_splash_anim) {
              let i;
              e.off(Laya.Event.REMOVED, this, this.stopColorSplashAnim),
                  ((i =
                      e instanceof Laya.SkinnedMeshSprite3D
                          ? e.skinnedMeshRenderer.material
                          : e.meshRenderer.material).shininess = t.__color_splash_anim.shininess),
                  Laya.Tween.clear(t.__color_splash_anim.tween),
                  (t.__color_splash_anim = null);
          }
      }
      static scaleAnim(t, i, s, n = 0, a) {
          let r = t;
          if (!r || r.__scale_anim)
              return;
          (s *= 1e3), (n *= 1e3);
          let o = new e$1(), l = t.transform.getWorldLossyScale();
          o.from(l);
          let h = new Laya.Handler(this, function () {
              t.transform.setWorldLossyScale(o);
          });
          (r.__scale_anim = Laya.Tween.to(o, {
              x: i.x,
              y: i.y,
              z: i.z,
              update: h
          }, s, null, Laya.Handler.create(this, function () {
              R.stopScaleAnim(t), a && a.run();
          }), n)),
              t.once(Laya.Event.REMOVED, this, this.stopScaleAnim, [t]);
      }
      static stopScaleAnim(e) {
          let t = e, i = t.__scale_anim;
          i &&
              (Laya.Tween.clear(i),
                  e.off(Laya.Event.REMOVED, this, this.stopScaleAnim),
                  (t.__scale_anim = null));
      }
      static enableMeshRender(e, t) {
          const s = function (e) {
              e instanceof i$1 && (e.meshRenderer.enable = t);
              let n = e.getChildren();
              for (const e of n)
                  s(e);
          };
          s(e);
      }
      static filterAffectObstacles(e, t, i, s = !0, n, a, r) {
          return [];
      }
      static initCollider(e, t, i, s = !0) {
          let a = e.getComponent(Laya.PhysicsCollider);
          a &&
              (e.addComponent(A).init({
                  static: !0,
                  kinematic: !0,
                  event: !0,
                  eventOnce: !0,
                  belongsTo: t,
                  collidesWith: i,
                  shape: a.colliderShape,
                  debug: n.PHYSICS_DEBUG_SHOW,
                  neverSleep: !0
              }),
                  (a.collisionGroup = t),
                  s && a.destroy());
      }
      static haveAnim(e, t) {
          return !!e.getControllerLayer()._statesMap[t];
      }
      static handlePlayerModel(e) {
          let t = e.getComponent(Laya.Animator);
          t && t.play('Run');
          let i = e.getComponent(Laya.Rigidbody3D);
          i && i.destroy();
      }
      static playParticleSpEx(e, t = !0) {
          if (e instanceof Laya.ShuriKenParticle3D)
              (e.particleSystem.looping = t), e['play']();
          else {
              let t = e.numChildren;
              for (; t--;) {
                  let i = e.getChildAt(t);
                  this.playParticleSpEx(i);
              }
          }
      }
      static stopParticleSpEx(e) {
          if (e instanceof Laya.ShuriKenParticle3D)
              e['stop']();
          else {
              let t = e.numChildren;
              for (; t--;) {
                  let i = e.getChildAt(t);
                  this.stopParticleSpEx(i);
              }
          }
      }
      static convertPos(t) {
          let i = new e$1();
          return t && ((i.x = t[0]), (i.y = t[1]), (i.z = t[2])), i;
      }
      static getCubeSize(t) {
          function isOne(e) {
              return (e = Math.abs(e)), Math.abs(1 - e) <= 0.1;
          }
          let i, s, n, a = new e$1(), r = new Laya.Quaternion(), o = t.transform.position.clone(), l = t.transform.worldMatrix;
          e$1.TransformNormal(new Laya.Vector3(1, 1, 1), l, a),
              e$1.transformQuat(a, r, a),
              (i = a.x),
              (s = a.y),
              (n = a.z);
          let h = new e$1(i, s, n), d = t.getComponent(Laya.PhysicsCollider).colliderShape, c = d.sizeX * h.x, g = d.sizeY * h.y, f = d.sizeZ * h.z, u = new e$1(c, g, f), S = d.localOffset.x * h.x, y = d.localOffset.y * h.y, m = d.localOffset.z * h.z, _ = new e$1(S, y, m);
          e$1.TransformNormal(new Laya.Vector3(1, 0, 0), l, a),
              game.normalize(),
              isOne(a.y) ? ((u.y = c), (_.y = S)) : isOne(a.z) && ((u.z = c), (_.z = S)),
              e$1.TransformNormal(new Laya.Vector3(0, 1, 0), l, a),
              game.normalize(),
              isOne(a.x) ? ((u.x = g), (_.x = y)) : isOne(a.z) && ((u.z = g), (_.z = y)),
              e$1.TransformNormal(new Laya.Vector3(0, 0, 1), l, a),
              game.normalize(),
              isOne(a.x) ? ((u.x = f), (_.x = m)) : isOne(a.y) && ((u.y = f), (_.y = m)),
              e$1.scale(u, 0.5, u);
          let p = new e$1();
          e$1.subtract(_, u, p), e$1.add(o, p, p);
          let C = new e$1();
          return e$1.add(_, u, C), e$1.add(o, C, C), new Laya.BoundBox(p, C);
      }
  }

  var e$2 = Laya.Vector3, t$2 = (Laya.Vector4, Laya.Sprite3D), i$2 = Laya.MeshSprite3D;
  class P extends Laya.Script3D {
      constructor() {
          super(), (this.eff_jetFires = []);
      }
      onAwake() {
          (this.ownerSp = this.owner),
              'ironman' == this.ownerSp.name &&
                  (fx.Utils.recurisNode(this.ownerSp, e => {
                      e instanceof Laya.ShuriKenParticle3D && this.eff_jetFires.push(e);
                  }),
                      this.stopFireParticleSpEx()),
              (this.transform = this.ownerSp.transform),
              (this.animator = this.ownerSp.getComponent(Laya.Animator)),
              this.playAnim('Run'),
              R.addAnimatorScript(this.ownerSp, this.ownerSp, Laya.Handler.create(this, this.onAnimStateChange)),
              (this.curRoadType = h.Ground),
              (this.gravity = new e$2()),
              (this.temp = new e$2()),
              (this.hitResult = new Laya.HitResult()),
              (this.forwardSpeed = 0),
              (this.waterHeight = 0.4),
              (this.isAddSpeed = !1);
      }
      stopFireParticleSpEx() {
          this.eff_jetFires.forEach(e => {
              e.stop();
          });
      }
      playFireParticleSpEx() {
          this.eff_jetFires.forEach(e => {
              (e.particleSystem.looping = !0), e.play();
          });
      }
      onCollision() { }
      onDestroy() {
          this.stopSound();
      }
      closeBody() {
          this.rigidBody.enabled = !1;
      }
      init(e, t, i, s, a) {
          let r = this.owner.getComponent(Laya.PhysicsCollider), o = r.colliderShape, h = this.ownerSp.addComponent(A);
          h.init({
              static: !1,
              kinematic: !1,
              event: !0,
              eventOnce: !0,
              belongsTo: l.PLAYER,
              collidesWith: l.GROUND,
              shape: o,
              debug: n.PHYSICS_DEBUG_SHOW,
              neverSleep: !0
          }),
              this.ownerSp.on(fx.BaseEvent.E_PHYSICS_COLLISION, this, this.onCollision),
              (this.rigidBody = h),
              this.rigidBody.setLinearVelocityConstraint('x'),
              this.rigidBody.setAngularVelocityConstraint(e.freezeRotation);
          let d = this.ownerSp.transform.localScaleZ, c = (o.sizeZ * d) / 2;
          (this.headOffset = o.localOffset.z * d + c),
              r.destroy(),
              (this.cfg = e),
              (this.playerOwner = t),
              (this.rigidBody.enabled = i),
              (this.eventCb = s),
              (this.isRobot = a),
              (this.state = i ? D.E_Active : D.E_Deactive);
      }
      onUpdate() {
          if (!this.rigidBody || !this.rigidBody.enabled)
              return;
          let e = m.instance.getGameState();
          e == o.E_GAME_START &&
              (e != o.E_GAME_START || this.isStart || ((this.isStart = !0), this.playSound()),
                  this.checkRotation(),
                  this.checkRoadType(),
                  this.checkGround(),
                  this.checkIntersection(),
                  this.checkPanyan(),
                  this.checkSlope(),
                  this.checkWing(),
                  this.updateGravity(),
                  this.updateVelocity());
      }
      updateGravity() {
          let e = this.cfg.gravity;
          null == e && (e = -9.8),
              this.cfg.type == C.Boat &&
                  this.curRoadType == h.Water &&
                  this.transform.position.y <= this.groundHeight + this.waterHeight + 0.1 &&
                  (e = 0),
              this.inPanyan && this.canPanyan() && (e = 0),
              (this.gravity.y = e),
              this.rigidBody.setGravity(this.gravity);
      }
      AddForwardSpeed() {
          this.isAddSpeed = !0;
      }
      updateVelocity() {
          let e = this.getUpHeight(), t = this.getUpSpeed(), i = this.rigidBody.getVelocity().clone(), s = i.z, n = this.getFowardSpeed(), a = this.owner.timer.delta / 1e3;
          n > 0
              ? ((this.forwardSpeed = this.forwardSpeed + 5 * a),
                  this.isAddSpeed
                      ? (this.forwardSpeed = Math.max(this.forwardSpeed, n))
                      : (this.forwardSpeed = Math.min(this.forwardSpeed, n)),
                  (i.z = this.forwardSpeed))
              : this.isAddSpeed
                  ? (i.z = Math.max(i.z, 5))
                  : (i.z = Math.min(i.z, 5)),
              this.intersection && (s < 0 ? (i.z = s) : s < 0.001 && (i.z = 0)),
              this.inPanyan && this.canPanyan() && ((i.y = this.cfg.climbSpeed), (i.z = 0));
          let r = this.transform.position;
          null == this.groundHeight ||
              this.inPanyan ||
              (e > 0 && t > 0
                  ? r.y < this.groundHeight + e || this.intersection
                      ? (i.y = t)
                      : (i.y = 0)
                  : 0 == this.gravity.y && (i.y = 0)),
              this.cfg.maxDownSpeed && i.y < this.cfg.maxDownSpeed && (i.y = this.cfg.maxDownSpeed),
              this.rigidBody.setVelocity(i);
      }
      getFowardSpeed() {
          let e = this.cfg.forwardSpeed;
          switch (this.curRoadType) {
              case h.Ground:
                  e = this.cfg.forwardSpeed || 0;
                  break;
              case h.UpStairs:
                  e = this.cfg.upStairsSpeed || 0;
                  break;
              case h.Water:
                  (e = this.cfg.waterSpeed || 0),
                      this.groundHeight && this.transform.position.y > this.groundHeight + 0.5 && (e = 0);
                  break;
              case h.Bridge:
                  e = this.cfg.bridgeSpeed || 0;
          }
          return (this.lockForward
              ? (e = 0)
              : this.cfg.airSpeed && this.inAir && !this.intersection && (e = this.cfg.airSpeed),
              e);
      }
      getUpHeight() {
          return this.cfg.type == C.Boat &&
              this.curRoadType == h.Water &&
              this.transform.position.y < this.groundHeight + this.waterHeight
              ? this.waterHeight
              : this.cfg.upHeight || 0;
      }
      getUpSpeed() {
          return this.cfg.type == C.Boat && this.curRoadType == h.Water ? 2 : this.cfg.upSpeed || 0;
      }
      getGravity() {
          return this.cfg.type == C.Boat &&
              this.curRoadType == h.Water &&
              this.transform.position.y <= this.groundHeight + this.waterHeight + 0.1
              ? 0
              : this.cfg.gravity || -9.8;
      }
      clearForwardSpeed() {
          let e = this.rigidBody.getVelocity().clone();
          e.z > 0 && (e.z = 0), this.rigidBody.setVelocity(e);
      }
      checkRotation() { }
      checkRoadType() {
          let e = h.Ground, t = this.transform.position.clone(), i = m.instance.roads;
          for (let s = i.length - 1; s >= 0; --s) {
              let n = i[s];
              if (t.z >= n.start && t.z <= n.end) {
                  e = n.type;
                  break;
              }
          }
          e != this.curRoadType && this.enterRoad(e);
      }
      enterRoad(e) {
          this.onExitRoad(this.curRoadType), (this.curRoadType = e), this.onEnterRoad(this.curRoadType);
      }
      onEnterRoad(e) {
          e == h.UpStairs
              ? this.cfg.upStairsSpeed <= 0 && (this.lockForward = !0)
              : e == h.Water
                  ? this.playWaterFx()
                  : e == h.Bridge && (this.cfg.bridgeSpeed || this.clearForwardSpeed()),
              this.eventCb(this, 'enter', e);
      }
      onExitRoad(e) {
          e == h.Water && this.stopWaterFx(), this.eventCb(this, 'exit', e);
      }
      checkGround() {
          (this.grounded = !1), (this.inAir = !1);
          let e = this.transform.position;
          (this.groundHeight = this.getGroundHeight(e)),
              null != this.groundHeight && Math.abs(e.y - this.groundHeight) < 0.1 && (this.grounded = !0),
              (null == this.groundHeight || e.y - this.groundHeight > 1) && (this.inAir = !0);
      }
      getGroundHeight(t) {
          this.temp.from(t), (this.temp.y += 1);
          let i = new e$2(0, -1, 0), s = new Laya.Ray(this.temp, i);
          if (((this.hitResult.succeeded = !1),
              this.owner.scene.physicsSimulation.rayCast(s, this.hitResult, 200, l.PLAYER, l.GROUND),
              this.hitResult.succeeded))
              return this.hitResult.point.y;
      }
      checkIntersection() {
          this.intersection = null;
          let t = this.transform.position.clone(), i = new e$2(0, 0, 1), s = this.headOffset + 0.1, n = new Laya.Ray(t, i);
          if (((this.hitResult.succeeded = !1),
              this.owner.scene.physicsSimulation.rayCast(n, this.hitResult, s, l.ALL, l.GROUND | l.OBSTACLE | l.ENEMY),
              this.hitResult.succeeded && (this.intersection = this.hitResult.collider),
              this.intersection && m.instance.isBreak(this.hitResult.collider.owner.name)))
              if (this.cfg.canHit) {
                  this.hitResult.collider.owner.getComponent(N).handleBreak(),
                      (this.intersection = null),
                      this.eventCb(this, 'leaveObstacle');
              }
              else
                  this.eventCb(this, 'enterObstacle');
      }
      checkPanyan() {
          this.intersection && 'panyan' == this.intersection.owner.name
              ? this.changePanyan(!0)
              : this.changePanyan(!1);
      }
      changePanyan(e) {
          this.inPanyan != e &&
              (e
                  ? (this.canPanyan() && (this.playFireParticleSpEx(), this.playAnim('Climb')),
                      this.eventCb(this, 'enterPanyan'))
                  : this.inPanyan &&
                      ('ironman' == this.ownerSp.name && this.stopFireParticleSpEx(),
                          this.playAnim('Run'),
                          this.eventCb(this, 'leavePanyan')),
                  (this.inPanyan = e));
      }
      canPanyan() {
          return this.cfg.climbSpeed > 0;
      }
      checkSlope() {
          if (this.inPanyan)
              this.changeSlope(!1);
          else {
              if (this.intersection) {
                  let e = this.intersection.owner._topy;
                  if (null != e && e - this.transform.position.y > 1)
                      return void this.changeSlope(!0);
              }
              this.changeSlope(!1);
          }
      }
      changeSlope(e) {
          this.inSlope != e &&
              (e ? this.eventCb(this, 'enterSlope') : this.inSlope && this.eventCb(this, 'leaveSlope'),
                  (this.inSlope = e));
      }
      checkWing() {
          this.inPanyan || this.inSlope
              ? this.changeWing(!1)
              : null != this.groundHeight && this.transform.position.y - this.groundHeight > 5
                  ? this.changeWing(!0)
                  : null != this.groundHeight &&
                      this.transform.position.y - this.groundHeight < 1 &&
                      this.changeWing(!1);
      }
      changeWing(e) {
          this.inWing != e &&
              (e ? this.eventCb(this, 'enterWing') : this.inWing && this.eventCb(this, 'leaveWing'),
                  (this.inWing = e));
      }
      playSound() {
          this.cfg.sound && !this.isRobot && fx.SoundManager.instance.playSound(this.cfg.sound, -1);
      }
      stopSound() {
          this.cfg.sound && !this.isRobot && fx.SoundManager.instance.stopSoundFx(this.cfg.sound);
      }
      playWaterFx() {
          this.cfg.type == C.Boat &&
              (this.waterEff
                  ? ((this.waterEff.active = !0), R.playParticleSpEx(this.waterEff))
                  : fx.Utils.create3dModel('res3d/WaterFX.lh', this, t => {
                      t &&
                          !this.waterEff &&
                          ((this.waterEff = t.clone()),
                              this.ownerSp.addChild(this.waterEff),
                              (this.waterEff.transform.localPosition = new e$2(0, -0.3, 0)),
                              this.playWaterFx());
                  }));
      }
      stopWaterFx() {
          this.waterEff && (this.waterEff.active = !1);
      }
      onAnimStateChange(e) {
          e.code, fx.BaseCode.E_ANIM_STOP;
      }
      playAnim(e, t = null, i = null) {
          if (!this.animator)
              return;
          if (!R.haveAnim(this.animator, e))
              return;
          let s = fx.Utils.getAnimatorCurPlayStateName(this.animator);
          (i || s != e) && fx.Utils.playAnimator3d(this.animator, e, t);
      }
      changeAni(e = !0) {
          (this.state = D.E_Change),
              (this.ownerSp.active = !0),
              (this.ownerSp.transform.position = this.playerOwner.transform.position.clone()),
              (this.ownerSp.transform.rotation = new Laya.Quaternion()),
              (this.rigidBody.enabled = e),
              (this.lockForward = !1),
              (this.forwardSpeed = 2),
              this.playSound(),
              this.playAnim('ChangeAni', 1, !0),
              this.owner.clearTimer(this, this.onDestroyAniFinish),
              this.owner.clearTimer(this, this.onChangeAniFinish),
              'ironman' == this.ownerSp.name && this.stopFireParticleSpEx(),
              this.owner.timerOnce(300, this, this.onChangeAniFinish),
              this.checkRoadType();
      }
      onChangeAniFinish() {
          (this.state = D.E_Active),
              this.inPanyan && this.canPanyan()
                  ? (this.playFireParticleSpEx(), this.playAnim('Climb', 1, !0))
                  : this.playAnim('Run', 1, !0);
      }
      destroyAni(e) {
          (this.state = D.E_Destroy),
              this.playAnim('DestroyAni', 1, !0),
              (this.destroyChangeCb = e),
              this.owner.clearTimer(this, this.onDestroyAniFinish),
              this.owner.timerOnce(300, this, this.onDestroyAniFinish);
      }
      onDestroyAniFinish() {
          (this.state = D.E_Deactive),
              (this.ownerSp.active = !1),
              (this.rigidBody.enabled = !1),
              this.stopSound();
          let e = this.destroyChangeCb;
          (this.destroyChangeCb = null), e && e();
      }
      isInDestroy() {
          return this.state == D.E_Destroy;
      }
  }

  class L {
      constructor(e) {
          (this.id = void 0), (this.promotion = void 0), (this.id = e), (this.promotion = 0);
      }
  }

  class v {
      constructor() {
          (this.id = void 0), (this.state = void 0), (this.videoCnt = void 0), (this.endTryTime = void 0);
      }
      serialize() {
          let e = {}, t = Object.getOwnPropertyNames(this);
          for (let i = 0; i < t.length; ++i) {
              let s = t[i];
              this[s] && (e[s] = this[s]);
          }
          return e;
      }
      unserialize(e) {
          e.id && (this.id = e.id),
              (this.state = b.UNLOCK),
              e.videoCnt && e.state != b.UNLOCK && ((this.state = b.LOCK), (this.videoCnt = e.videoCnt)),
              e.endTryTime && (this.endTryTime = e.endTryTime);
      }
  }

  class w extends v {
      constructor(e = null) {
          super(), e && (this.id = e);
      }
  }

  class x extends fx.BaseLogic {
      constructor() {
          super(), (this._tryTimeSkins = []);
      }
      initCfg() {
          (this._cfg = new Map()), (this._ownSkins = []);
          for (const e in C)
              this._cfg.set(C[e], {});
          let e = fx.Utils.cloneDeep(fx.CfgMgr.instance.get('skinCfg'));
          for (const t in e) {
              let i = e[t].type;
              this._cfg.get(i)[t] = e[t];
          }
          (this._skinCfg = {}),
              this._cfg.forEach((e, t) => {
                  for (let t in e)
                      this._skinCfg[Number(t)] = e[t];
              }),
              (this._curIds = new Map()),
              (this._curTryIds = new Map());
      }
      get cfg() {
          return this._cfg;
      }
      static get inst() {
          return this._inst || (this._inst = new x()), this._inst;
      }
      storageOwn() {
          return 'ownSkins';
      }
      storageId(e) {
          return `cur${e}`;
      }
      onInitOnce() {
          this.initCfg(), this.initStorage();
          let e = m.instance.getCurStage().id;
          for (let t in this._skinCfg) {
              let i = this._skinCfg[t];
              i.unlock.way == I.INITIAL && this.unlockSkin(i.id),
                  i.unlock.way == I.STAGE_ID && e >= i.unlock.stageId && this.unlockSkin(i.id);
          }
          let t = y.instance.getPlayerInfo();
          for (const e in C) {
              let i = C[e], s = t[this.storageId(i)];
              if (!s || !this.getCfgById(s) || !this.isOwnSkin(s)) {
                  let e = this.getUnLockedSkinList(i);
                  e[0] && (s = e[0].id);
              }
              this.setCurSkin(i, s, !0);
          }
          let i = Date.now() / 1e3;
          for (let e in this._skinCfg) {
              let t = this._skinCfg[e], s = this.getSkinById(t.id);
              s &&
                  !this.isOwnSkin(t.id) &&
                  s.endTryTime &&
                  (s.endTryTime <= i
                      ? this.clearTryTimeSkin(t.id)
                      : -1 == this._tryTimeSkins.indexOf(t.id) && this._tryTimeSkins.push(t.id));
          }
          this._storageOwnSkin(), Laya.timer.loop(1e3, this, this.update);
      }
      initStorage() {
          let e = this.getOwnSkins(), t = y.instance.getPlayerInfo()[this.storageOwn()];
          if (t)
              for (let i = 0; i < t.length; ++i) {
                  let s = new w();
                  s.unserialize(t[i]), this.getCfgById(s.id) && e.push(s);
              }
      }
      getInitSkinCfg(e) {
          let t = this.cfg.get(e);
          if (!t)
              return;
          let i = void 0;
          for (let e in t) {
              let s = t[e];
              if (s && I.INITIAL === s.unlock.way) {
                  i = s;
                  break;
              }
          }
          return i;
      }
      getFirstSkinCfg(e) {
          return this.getSkinList(e)[0];
      }
      initStageIdSkin() {
          let e = m.instance.getCurStage().id;
          for (let t in this._skinCfg) {
              let i = this._skinCfg[t];
              if (i.unlock.way == I.STAGE_ID && !this.isOwnSkin(i.id) && e >= i.unlock.stageId) {
                  this.unlockSkin(i.id), this.getCurSkinCfg(i.type) || this.setCurSkin(i.type, i.id);
              }
          }
      }
      getOwnSkins() {
          return this._ownSkins;
      }
      getCurSkinId(e) {
          let t = this._curIds.get(e);
          return this._curTryIds.get(e) && (t = this._curTryIds.get(e)), t;
      }
      getSkinPrice(e) {
          let t = this.getCfgById(e);
          if (t.unlock.way === I.COINS)
              return t.unlock.num;
      }
      setCurSkinById(e) {
          let t = this.getCfgById(e);
          t && this.setCurSkin(t.type, e);
      }
      removeCurSkin(e) {
          this._curIds.set(e, void 0), Laya.LocalStorage.removeItem('_' + this.storageId(e));
      }
      setCurSkin(e, t, i = !1) {
          let s = this.getCurSkinId(e);
          if (!t || t === s)
              return;
          this._curIds.set(e, t), (y.instance.getPlayerInfo()[this.storageId(e)] = t);
          let n = {
              oldId: s,
              curId: t,
              type: e
          };
          this.event(_.E_SKIN_CHANGE, n);
      }
      getCurTrySkinId(e) {
          return this._curTryIds.get(e);
      }
      setCurTrySkin(e, t) {
          if (this.getCurTrySkinId(e) == t)
              return;
          let i = this.getCurSkinId(e);
          this._curTryIds.set(e, t);
          let s = {
              oldId: i,
              curId: t,
              type: e
          };
          this.event(_.E_SKIN_CHANGE, s);
      }
      clearCurTrySkin() {
          for (const e in C)
              this.setCurTrySkin(C[e], void 0);
      }
      getSkinType(e) {
          return this.getCfgById(e).type;
      }
      getSkinById(e) {
          return this.getOwnSkins().filter((t, i, s) => e === t.id, this)[0];
      }
      isOwnSkin(e) {
          if (!e)
              return;
          let t = this.getSkinById(e);
          return !!t && t.state !== b.LOCK;
      }
      isTryTimeSkin(e) {
          if (!e)
              return;
          let t = this.getSkinById(e);
          if (!t)
              return !1;
          let i = Date.now() / 1e3;
          return !!(t.endTryTime && t.endTryTime > i) || void 0;
      }
      getCfgById(e) {
          if (!e)
              return;
          let t = this._skinCfg[e];
          return fx.Utils.cloneDeep(t);
      }
      getSkinList(e) {
          let t = this.cfg.get(e);
          if (!t)
              return [];
          let i = [];
          for (let e in t) {
              let s = t[e];
              s && i.push(s);
          }
          return i;
      }
      getLockedSkinList(e, t) {
          let i = [], s = this.getSkinList(e);
          for (const e of s)
              this.isOwnSkin(e.id) || (null != t && t != e.unlock.way) || i.push(e);
          return i;
      }
      getAllLockSkinCfg() {
          let e = [], t = fx.CfgMgr.instance.get('skinCfg');
          for (const i in t)
              this.isOwnSkin(t[i].id) || e.push(t[i]);
          return e;
      }
      getUnLockedSkinList(e, t = null) {
          let i = [], s = this.getSkinList(e);
          for (const e of s)
              this.isOwnSkin(e.id) && ((null != t && t != e.unlock.way) || i.push(e));
          return i;
      }
      getRandomSkinList(e) {
          let t = [], i = this.getSkinList(e);
          for (const e of i)
              e.unlock.way == I.COINS && t.push(e);
          return t;
      }
      getAllRandomList() {
          let e = [], t = this._skinCfg;
          for (const i in t)
              t[i].unlock.way == I.COINS && e.push(t[i]);
          return e;
      }
      getlockedTryList() {
          let e = [], t = this._skinCfg;
          for (const i in t)
              t[i].unlock.way != I.TRY || this.isOwnSkin(t[i].id) || e.push(t[i]);
          return e;
      }
      getUnLockedAllRandomList() {
          let e = this.getAllRandomList(), t = [];
          for (let i = 0; i < e.length; i++)
              this.isOwnSkin(e[i].id) && t.push(e[i]);
          return t;
      }
      getCurCrosshairByWeaponType(e) {
          let t = e + '_Ch';
          return this.getCurSkinCfg(t);
      }
      isCurSkin(e, t) {
          return this._curIds.get(e) == t;
      }
      getCurSkinCfg(e, t = !1) {
          let i = this.getCurSkinId(e), s = this.getCfgById(i);
          return !s && t && (s = this.getFirstSkinCfg(e)), s;
      }
      getCurSkinCfgById(e) {
          let t = this.getCfgById(e);
          if (t)
              return this.getCurSkinCfg(t.type);
      }
      getSkinInfo(e) {
          return this.getSkinById(e);
      }
      getTrySkin(e) {
          if (0 == e.length)
              return;
          let t = this.getLockTrySkinListByType(e);
          return t && 0 != t.length ? fx.Utils.randomInArrayEx(t, 1) : void 0;
      }
      getLockTrySkinListByType(e) {
          let t = [];
          for (const i of e)
              for (const e in this._skinCfg)
                  this.isOwnSkin(this._skinCfg[e].id) ||
                      (i == this._skinCfg[e].type &&
                          this._skinCfg[e].unlock.way !== I.TRY &&
                          this._skinCfg[e].unlock.way !== I.ICEBREAK &&
                          t.push(this._skinCfg[e]));
          return t;
      }
      getTryBreakingIceSkin() {
          let e = [];
          for (const t in this._skinCfg)
              this._skinCfg[t].unlock.way != I.ICEBREAK ||
                  this.isOwnSkin(this._skinCfg[t].id) ||
                  e.push(this._skinCfg[t]);
          return e;
      }
      unlockSkin(e, t = null) {
          let i, s = this.getCfgById(e);
          if (!s)
              return;
          if (!(i = (t = t || s.unlock.tryTime) ? this._addTryTimeSkin(e, t) : this._addSkin(e, s.type)))
              return;
          this._storageOwnSkin();
          let n = {
              id: e,
              type: s.type
          };
          this.event(_.E_SKIN_UNLOCK, n);
      }
      _addTryTimeSkin(e, t) {
          let i = this.getCfgById(e), s = this._addSkin(e, i.type);
          if (s) {
              if (!this.isOwnSkin(e)) {
                  let i = Date.now() / 1e3;
                  (s.endTryTime = i + t),
                      (s.endTryTime = Math.ceil(s.endTryTime)),
                      -1 == this._tryTimeSkins.indexOf(e) && this._tryTimeSkins.push(e);
              }
              return s;
          }
      }
      _storageOwnSkin() {
          let e = this.getOwnSkins();
          if (!e)
              return;
          let t = [];
          for (let i = 0; i < e.length; ++i) {
              let s = e[i];
              t.push(s.serialize());
          }
          y.instance.getPlayerInfo()[this.storageOwn()] = t;
      }
      _addSkin(e, t) {
          let i = this.getCfgById(e);
          if (!i)
              return;
          if (this.isOwnSkin(e))
              return;
          let s = this.getOwnSkins(), n = this.getSkinById(e);
          if (i.unlock.videoNum)
              n ? n.videoCnt++ : ((n = new w(e)), s.push(n), (n.state = b.LOCK), (n.videoCnt = 1)),
                  n.videoCnt >= i.unlock.videoNum && ((n.state = b.UNLOCK), (n.videoCnt = void 0));
          else if (I.EGG === i.unlock.way)
              n
                  ? ((n.state = b.UNLOCK), (n.endTryTime = void 0), (n.videoCnt = void 0))
                  : (((n = new w(e)).state = b.UNLOCK), s.push(n));
          else {
              if (n)
                  return;
              ((n = new w(e)).state = b.UNLOCK), s.push(n);
          }
          return n;
      }
      get breakingIceSkinPools() {
          if (!this.cfg)
              return;
          if (this._breakingIceSkinPools)
              return this._breakingIceSkinPools;
          this._breakingIceSkinPools = [];
          let e = y.instance.getPlayerInfo().stageId;
          for (let t in this._skinCfg) {
              let i = this._skinCfg[t];
              i &&
                  i.unlock &&
                  ((I.ICEBREAK !== i.unlock.way && I.GODGIVE !== i.unlock.way) ||
                      this.isOwnSkin(i.id) ||
                      (i.unlock.stageId &&
                          e >= i.unlock.stageId &&
                          this._breakingIceSkinPools.push(new L(i.id))));
          }
          return this._breakingIceSkinPools;
      }
      set breakingIceSkinPools(e) {
          this._breakingIceSkinPools = e;
      }
      addBreakingIceRoleSkinPool() {
          let e = y.instance.getPlayerInfo();
          if (!e)
              return;
          let t = e.stageId;
          if (t)
              for (let e in this._skinCfg) {
                  let i = this._skinCfg[e];
                  if (i &&
                      i.unlock &&
                      (I.ICEBREAK === i.unlock.way || I.GODGIVE === i.unlock.way) &&
                      !this.isOwnSkin(i.id) &&
                      t >= i.unlock.stageId) {
                      this.breakingIceSkinPools.filter((e, t, s) => e.id === i.id, this)[0] ||
                          this.breakingIceSkinPools.push(new L(i.id));
                  }
              }
      }
      removeBreakingIceSkinPool(e) {
          if (!this.breakingIceSkinPools)
              return;
          let t = void 0;
          this.breakingIceSkinPools.filter((i, s, n) => i.id === e && ((t = s), !0), this),
              null !== t && this.breakingIceSkinPools.splice(t, 1);
      }
      addBreakingIceSkin(e) {
          this.isOwnSkin(e) ||
              (this.setCurSkin(this.getSkinType(e), e),
                  this.unlockSkin(e),
                  this.removeBreakingIceSkinPool(e));
      }
      checkBreakingIceSkinTrigger() {
          let e = [];
          for (let t = 0; t < this.breakingIceSkinPools.length; ++t) {
              let i = this.breakingIceSkinPools[t];
              i && this.getCfgById(i.id) && e.push(i);
          }
          if (e && e.length)
              return (e = e.sort((e, t) => e.promotion - t.promotion))[0].promotion++, e[0].id;
      }
      getUgcShareCnt(e) {
          let t = y.instance.getPlayerInfo();
          if (!t.ugcShareSkins)
              return 0;
          for (const i of t.ugcShareSkins)
              if (i[0] == e)
                  return i[1];
          return 0;
      }
      getCurUgcShareSkin() {
          let e = y.instance.getPlayerInfo(), t = e.ugcShareSkinId;
          if (t) {
              let e = t;
              if (!this.isOwnSkin(e))
                  return e;
          }
          e.ugcShareSkinId = void 0;
          let i = [], s = [];
          for (const e in C)
              s = s.concat(this.getSkinList(C[e]));
          for (const e of s)
              e && I.UGCSHARE === e.unlock.way && (this.isOwnSkin(e.id) || i.push(e));
          if (0 == i.length)
              return;
          i.sort((e, t) => e.unlock.order - t.unlock.order);
          let n = i[0];
          return (e.ugcShareSkinId = n.id), n.id;
      }
      getUgcShareNeedCount(e) {
          let t = this.getCfgById(e), i = this.getUgcShareCnt(e);
          return Math.max(t.unlock.num - i, 0);
      }
      onUgcShareSuccess(e) {
          if (this.isOwnSkin(e))
              return;
          let t = this.getCfgById(e);
          if (t.unlock.way != I.UGCSHARE)
              return;
          let i = this.getUgcShareCnt(e) + 1;
          return (i >= t.unlock.num && this.unlockSkin(e),
              this.updateUgcShareStorage(e, i),
              !!this.isOwnSkin(e) || void 0);
      }
      updateUgcShareStorage(e, t) {
          let i = y.instance.getPlayerInfo(), s = i.ugcShareSkins, n = !1, a = [];
          if (s)
              for (const i of s)
                  this.isOwnSkin(i[0]) || a.push(i), i[0] == e && ((i[1] = t), (n = !0));
          n || this.isOwnSkin(e) || a.push([e, t]), (i.ugcShareSkins = a);
      }
      getCurStageSkin() {
          let e = this._skinCfg;
          if (!e)
              return null;
          let t = y.instance.getPlayerInfo(), i = t.stageSkinInfo, s = i[0];
          if (s) {
              let e = this.getCfgById(s);
              if (e)
                  if (e.unlock.way == I.STAGEPROGRESS) {
                      let t = null != i[1] ? i[1] : 0;
                      if (t >= e.unlock.num)
                          this.setStageSkinProgress(s, t);
                      else if (!this.isOwnSkin(s))
                          return {
                              skin: e,
                              progress: t
                          };
                  }
                  else
                      (s = void 0), (t.stageSkinInfo = []);
          }
          let n = [], a = [];
          for (let t in e) {
              let i = e[t];
              i &&
                  I.STAGEPROGRESS === i.unlock.way &&
                  (this.isOwnSkin(i.id) || (this.isStageSkinFinish(i.id) ? n.push(i) : a.push(i)));
          }
          if (0 == n.length && 0 == a.length)
              return null;
          0 == a.length && (x.isAllStageSkinUnlocked = !0);
          let r, o = (e, t) => e.order - t.order;
          n.sort(o), a.sort(o);
          let l = 0;
          if (a.length > 0)
              r = a[0];
          else {
              if (s) {
                  let e = !1;
                  for (const t of n) {
                      if (e) {
                          r = t;
                          break;
                      }
                      t.id == s && (e = !0);
                  }
                  r || (r = n[0]);
              }
              else
                  r = n[0];
              r && (l = r.unlock.num);
          }
          return r
              ? ((t.stageSkinInfo = [r.id, 0]),
                  {
                      skin: r,
                      progress: l
                  })
              : null;
      }
      isStageSkinFinish(e) {
          return -1 != y.instance.getPlayerInfo().stageSkins.indexOf(e);
      }
      setStageSkinProgress(e, t) {
          let i = this.getCfgById(e);
          if (!i)
              return;
          let s = y.instance.getPlayerInfo();
          if (t >= i.unlock.num) {
              let t = s.stageSkins.slice();
              -1 == t.indexOf(e) && (t.push(e), (s.stageSkins = t)), (s.stageSkinInfo = [e, i.unlock.num]);
          }
          else
              s.stageSkinInfo = [e, t];
      }
      getLockedLotterId() {
          let e = [];
          for (const t in this._skinCfg)
              this.isOwnSkin(this._skinCfg[t].id) ||
                  this._skinCfg[t].unlock.way != I.LOTTERY ||
                  e.push(this._skinCfg[t].id);
          return e.length > 0 ? e[fx.Utils.getIntRandom(0, e.length - 1)] : null;
      }
      update() {
          let e = Date.now() / 1e3;
          for (let t = this._tryTimeSkins.length - 1; t >= 0; --t) {
              let i = this._tryTimeSkins[t], s = this.getSkinById(i);
              (this.isOwnSkin(i) || (s.endTryTime && s.endTryTime <= e)) &&
                  (this.clearTryTimeSkin(i), this._tryTimeSkins.splice(t, 1));
          }
      }
      clearTryTimeSkin(e) {
          let t = this.getSkinById(e), i = this.getCfgById(e);
          if (((t.endTryTime = void 0), !this.isOwnSkin(e) && this.getCurSkinId(i.type) == e)) {
              let e = this.getUnLockedSkinList(i.type);
              e[0] ? this.setCurSkin(i.type, e[0].id) : this.removeCurSkin(i.type);
          }
      }
      canUseSkin(e) {
          let t = this.isOwnSkin(e);
          return !t && this.isTryTimeSkin(e) && (t = !0), t;
      }
      isCompose(e) {
          if (this.isOwnSkin(e))
              return !0;
          let t = this.getSkinById(e), i = this.getCfgById(e);
          return (i && !(i.unlock.way != !t || !t.videoCnt)) || void 0;
      }
      isComposeFirst() {
          let e = [], t = fx.CfgMgr.instance.get('composeCfg');
          for (const i in t)
              e.push(t[i]);
          for (const t in e) {
              let i = this.getSkinById(e[t].id);
              if (i && i.videoCnt)
                  return !1;
          }
          return !0;
      }
  }
  x.isAllStageSkinUnlocked = !1;

  var e$3 = Laya.Vector3, t$3 = (Laya.Vector4, Laya.Sprite3D), i$3 = Laya.MeshSprite3D;
  class B extends Laya.Script3D {
      constructor() {
          super(), (this.isFly = !1);
      }
      onAwake() {
          (this.ownerSp = this.owner),
              (this.transform = this.ownerSp.transform),
              fx.Utils.create3dModel('res3d/eff_transform.lh', this, t => {
                  t &&
                      ((this.transfromEff = t.clone()),
                          this.ownerSp.addChild(this.transfromEff),
                          (this.transfromEff.transform.localPosition = new e$3(0, -10, 0)));
              });
      }
      init(t, i) {
          (this.players = t),
              this.players.forEach((e, t) => {
                  this.ownerSp.scene.addChild(e.model),
                      (e.model.transform.position = this.transform.position.clone()),
                      (e.control = e.model.addComponent(P)),
                      e.control.init(e.cfg, this.ownerSp, i == e.type, this.controlEventFunc.bind(this), this.isRobot),
                      (e.model.active = i == e.type),
                      i == e.type && (this.curPlayer = e);
              }),
              this.isRobot ||
                  fx.Utils.create3dModel('res3d/arrow.lh', this, t => {
                      if (!t)
                          return;
                      let i = (this.arrow = t.clone());
                      this.ownerSp.addChild(i), (i.transform.localPosition = new e$3(0, 1.5, 0));
                  });
      }
      changePlayer(e, t) {
          let i = this.players.get(e);
          if (!i)
              return;
          let s = i.model.active;
          i.model.destroy(),
              this.ownerSp.scene.addChild(t.model),
              (t.model.transform.position = this.transform.position.clone()),
              (t.control = t.model.addComponent(P)),
              t.control.init(t.cfg, this.ownerSp, s, this.controlEventFunc.bind(this), this.isRobot),
              (t.model.active = s),
              this.players.set(e, t),
              this.curPlayer.type == e && (this.curPlayer = t);
      }
      transformAnimal(e) {
          if (this.curPlayer.type == e)
              return void (this.curPlayer.control.isInDestroy() && this.curPlayer.control.changeAni());
          let i = this.players.get(e);
          i &&
              (this.curPlayer.control.destroyAni(() => {
                  this.curPlayer = i;
                  let e = this.curPlayer.control, t = !this.isFly;
                  e.changeAni(t), t || this.getFinal();
              }),
                  this.isRobot ||
                      (fx.SoundManager.instance.playSound('res/sound/change.mp3'), fx.Sdk.instance.vibrate()),
                  this.playTransformEff());
      }
      onUpdate() {
          let e = m.instance, t = e.getGameState();
          if ((t != o.E_GAME_START ||
              this.isStart ||
              ((this.isStart = !0), this.curPlayer && this.onEnterRoad(h.Ground)),
              (this.transform.position = this.curPlayer.model.transform.position.clone()),
              !this.curPlayer || t == o.E_GAME_FINISH || this.isFly))
              return;
          if (this.isArrivedEnd && this.isRobot)
              return;
          let i = e.raceEndPos;
          this.transform.position.z >= i && this.onArrivedEnd(),
              (i = e.raceFlyPos),
              this.transform.position.z >= i &&
                  1 == this.raceRank &&
                  !this.isFly &&
                  (this.isRobot || this.startFly());
      }
      controlEventFunc(e, t, i) {
          e == this.curPlayer.control &&
              ('exit' == t
                  ? this.onExitRoad(i)
                  : 'enter' == t
                      ? this.onEnterRoad(i)
                      : 'enterSlope' == t
                          ? this.onEnterSlope()
                          : 'leaveSlope' == t
                              ? this.onLeaveSlope()
                              : 'enterPanyan' == t
                                  ? this.onEnterPanyan()
                                  : 'leavePanyan' == t
                                      ? this.onLeavePanyan()
                                      : 'enterObstacle' == t
                                          ? this.onEnterObstacle()
                                          : 'leaveObstacle' == t
                                              ? this.onLeaveObstacle()
                                              : 'enterWing' == t
                                                  ? this.onEnterWing()
                                                  : 'leaveWing' == t && this.onLeaveWing());
      }
      onEnterRoad(e) { }
      onExitRoad(e) { }
      onEnterSlope() { }
      onLeaveSlope() { }
      onEnterPanyan() { }
      onLeavePanyan() { }
      onEnterObstacle() { }
      onLeaveObstacle() { }
      onEnterWing() { }
      onLeaveWing() { }
      getFinal() {
          let t = m.instance, i = t.getEndNum(), s = t.endReward, n = s.getChildByName('end' + i).getChildByName('landPoint'), r = s.getChildByName('treasurechest' + i), l = () => {
              fx.Utils.playAnimator3d(r.getComponent(Laya.Animator), 'treasureChestOpen', 1, !1, 0),
                  m.instance.setGameState(o.E_GAME_FINISH);
          }, h = 5;
          x.inst.getCurSkinCfg(C.Wing) && (h = x.inst.getCurSkinCfg(C.Wing).airSpeed);
          let d = n.transform.position.z - this.curPlayer.model.transform.position.z, c = Math.floor(d / h) / 5, g = new e$3(0, 0, 10), f = new e$3(0, 0, 0);
          e$3.subtract(n.transform.position, g, f),
              fx.EventCenter.instance.event(a.E_Fly_Start, c),
              fx.Helper.moveAnim(this.curPlayer.model, this.curPlayer.model.transform.position, f, c, 0, !1, !1, Laya.Handler.create(this, () => {
                  fx.Helper.moveAnim(this.curPlayer.model, f, n.transform.position, 1.5, 0, !1, !1, Laya.Handler.create(this, l));
              }));
      }
      startFly() {
          if (this.isFly)
              return;
          this.isFly = !0;
          let e = C.Wing;
          this.transformAnimal(e), fx.EventCenter.instance.event(a.E_Player_Transform, e);
      }
      onArrivedEnd() {
          if (!this.isArrivedEnd)
              if (((this.isArrivedEnd = !0),
                  m.instance.arrivedCnt++,
                  (this.raceRank = m.instance.arrivedCnt),
                  this.isRobot))
                  this.curPlayer.control.stopSound();
              else {
                  let e = 1 == this.raceRank;
                  if ((fx.EventCenter.instance.event(a.E_ARRIVE_END, e), e)) {
                      let e = C.Car;
                      this.transformAnimal(e),
                          this.players.get(e).control.AddForwardSpeed(),
                          fx.EventCenter.instance.event(a.E_Player_Transform, e);
                  }
                  else
                      (this.isFly = !0),
                          this.arrow && (this.arrow.active = !1),
                          m.instance.setGameState(o.E_GAME_FINISH);
              }
      }
      playTransformEff() {
          this.transfromEff &&
              ((this.transfromEff.transform.localPosition = new e$3(0, 0, 0)),
                  this.transfromEff.stop(),
                  this.transfromEff.play());
      }
      getCurPlayerType() {
          return this.curPlayer.type;
      }
      getRaceRank() {
          return this.raceRank;
      }
  }

  class SelectAnimalScript extends Laya.Script {
      onAwake() {
          x.inst.initStageIdSkin(),
              (this.ownerUI = this.owner),
              (this.ownerUI.visible = !1),
              (this.listAnimals = this.owner.getChildByName('list_animals')),
              fx.EventCenter.instance.on(a.E_GAME_STATE_CHANGED, this, this.onGameStateChange),
              fx.EventCenter.instance.on(a.E_REVIVE_TRANSFORM, this, this.changeItemByType),
              fx.EventCenter.instance.on(a.E_Change_SelectType_List, this, this.onChangeAnimalList),
              fx.EventCenter.instance.on(a.E_ARRIVE_END, this, () => {
                  this.ownerUI.visible = !1;
              });
      }
      onDestroy() {
          fx.EventCenter.instance.offAllCaller(this);
      }
      initList() {
          let e = [0, 60, 50, 40, 10], t = m.instance.getSelectTypes().slice(), i = 20;
          t.length <= e.length && (i = e[t.length - 1]);
          let s = this.itemPrefab.create(), n = s.width * s.scaleX;
          (this.listAnimals.width = n * t.length + i * (t.length - 1)),
              (this.listAnimals.height = s.height),
              this.listAnimals.removeChildren();
          let a = n / 2;
          for (let e = 0; e < t.length; ++e) {
              let r = 0 == e ? s : this.itemPrefab.create();
              this.listAnimals.addChild(r);
              let o = a + (n + i) * e, l = this.listAnimals.height / 2;
              r.pos(o, l), (r.dataSource = t[e]), this.updateListItem(r, e);
          }
          this.changeItemByType(this.getCurAnimlType());
      }
      getCurAnimlType() {
          let e = m.instance.player;
          if (!e)
              return C.Player;
          let t = e.getComponent(B).getCurPlayerType();
          return (t = t || C.Player);
      }
      updateListItem(e, t) {
          if (!e.dataSource)
              return;
          let i = e.dataSource;
          (e.getChildByName('img_animal').skin = `res/selectIcon/img_${i}.png`),
              (e.getChildByName('img_select').visible = !1),
              e.reg ||
                  ((e.reg = !0),
                      e.on(Laya.Event.CLICK, this, s => {
                          s.stopPropagation(), this.onClickItem(e, i, t);
                      }));
      }
      onClickItem(e, t, i) {
          if (m.instance.getGameState() != o.E_GAME_START)
              return;
          let s = m.instance.player;
          if (!s)
              return;
          let n = m.instance.guideAnimal;
          if (null != n) {
              if (n != i)
                  return;
              (m.instance.guideAnimal = void 0),
                  m.instance.resume(),
                  this.storageGuide(t),
                  fx.EventCenter.instance.event(a.E_HIDE_GUIDE);
          }
          else if (this.curItem == e)
              return;
          s.getComponent(B).transformAnimal(t),
              this.changeItem(e),
              fx.EventCenter.instance.event(a.E_Player_Transform, t);
      }
      storageGuide(e) {
          let t = y.instance.getPlayerInfo(), i = t.guideAnimals || [];
          -1 == i.indexOf(e) && i.push(e), (t.guideAnimals = i.slice());
      }
      onGameStateChange(e) {
          switch (m.instance.getGameState()) {
              case o.E_GAME_START:
                  e != o.E_GAME_FAILED && ((this.ownerUI.visible = !0), this.initList());
          }
      }
      changeItem(e) {
          if (this.curItem) {
              this.curItem.getChildByName('img_select').visible = !1;
          }
          (this.curItem = e), (e.getChildByName('img_select').visible = !0);
      }
      changeItemByType(e) {
          let t, i = this.listAnimals.getChildren();
          for (let s = 0; s < i.length; ++s)
              if (i[s].dataSource == e) {
                  t = i[s];
                  break;
              }
          t && this.changeItem(t);
      }
      onChangeAnimalList() {
          this.initList();
      }
  }

  class GuideScript extends Laya.Script {
      onAwake() {
          (this.ownerUI = this.owner),
              (this.anim = this.owner.getChildByName('boxAni')),
              (this.anim.visible = !1),
              (this.labelGuideTips = this.owner.getChildByName('labelGuideTips')),
              (this.labelGuideTips.visible = !1),
              fx.EventCenter.instance.on(a.E_PLAYER_EVENT, this, this.onPlayerEvent),
              fx.EventCenter.instance.on(a.E_HIDE_GUIDE, this, this.hideGuide);
      }
      onDestroy() {
          fx.EventCenter.instance.off(a.E_PLAYER_EVENT, this, this.onPlayerEvent),
              fx.EventCenter.instance.off(a.E_HIDE_GUIDE, this, this.hideGuide);
      }
      onPlayerEvent(e) {
          if (m.instance.getGameState() != o.E_GAME_START)
              return;
          let t = y.instance.getPlayerInfo().guideAnimals || [], i = m.instance.getSelectTypes().slice();
          for (const e of t) {
              let t = i.indexOf(e);
              -1 != t && i.splice(t, 1);
          }
          -1 != i.indexOf(e) && e != C.Player && this.guideAnimal(e);
      }
      guideAnimal(e) {
          let t, i = m.instance.getSelectTypes();
          for (let s = 0; s < i.length; ++s)
              if (i[s] == e) {
                  (t = this.listAnimals.getChildAt(s)), (m.instance.guideAnimal = s);
                  break;
              }
          if (!t)
              return;
          let s = new Laya.Point();
          t.localToGlobal(s),
              (s = this.ownerUI.globalToLocal(s)),
              (this.anim.visible = !0),
              this.anim.pos(s.x + 100, s.y + 50),
              this.anim.play(),
              (this.labelGuideTips.visible = !0),
              m.instance.pause();
      }
      hideGuide() {
          (this.anim.visible = !1), (this.labelGuideTips.visible = !1);
      }
  }

  class BoxCoinScript extends Laya.Script {
      constructor() {
          super();
      }
      onAwake() {
          this.CoinsChange('coins'),
              fx.EventCenter.instance.on(fx.BaseEvent.E_PROP_CHANGED, this, this.CoinsChange);
      }
      onEnable() {
          let e = this.owner;
          if (fx.SceneManager.getCurDialogRegName()) {
              let t = (Laya.stage.height - Laya.stage.designHeight) / 2;
              t > 0 && (e.top = 50 - t);
          }
      }
      CoinsChange(e) {
          if ('coins' === e) {
              let e = this.owner && this.owner.parent;
              if (e && !e.destroyed) {
                  let e = this.owner.getChildByName('coins_num');
                  e && (e.value = y.instance.getPlayerInfo().coins + '');
              }
          }
      }
      onDisable() {
          fx.EventCenter.instance.off(fx.BaseEvent.E_PROP_CHANGED, this, this.CoinsChange);
      }
  }

  class Flashing extends Laya.Script {
      constructor() {
          super(), (this.isVisibale = !0);
      }
      onAwake() { }
      onEnable() {
          this.owner.timer.clearAll(this),
              this.owner.timerLoop(200, this, () => {
                  this.owner['visible'] = this.FlashEffecf();
              });
      }
      FlashEffecf() {
          return (this.isVisibale = !this.isVisibale), this.isVisibale;
      }
      onDisable() {
          this.owner.timer.clearAll(this), (this.owner['visible'] = !1);
      }
  }

  class Mathf {
      clearRes3d() { }
      static clamp(t, e, a) {
          return Math.max(e, Math.min(a, t));
      }
      static Up() {
          return new Laya.Vector3(0, 1, 0);
      }
      static UnitX() {
          return new Laya.Vector3(1, 0, 0);
      }
      static UnitZ() {
          return new Laya.Vector3(0, 0, 1);
      }
      static sign(x) {
          if (x > 0) {
              return 1;
          }
          if (x < 0) {
              return -1;
          }
          return 0;
      }
      static lerp(t, e, a) {
          return (1 - a) * t + a * e;
      }
      static lerpAngle(current, target, t) {
          current %= 360;
          target %= 360;
          var dAngle = target - current;
          if (dAngle > 180) {
              target = current - (360 - dAngle);
          }
          else if (dAngle < -180) {
              target = current + (360 + dAngle);
          }
          return ((Mathf.lerp(current, target, t) % 360) + 360) % 360;
      }
      static angleTowards(current, target, speed) {
          current %= 360;
          target %= 360;
          var dAngle = target - current;
          if (dAngle > 180) {
              target = current - (360 - dAngle);
          }
          else if (dAngle < -180) {
              target = current + (360 + dAngle);
          }
          var dir = target - current;
          if (speed > Math.abs(dir)) {
              return target;
          }
          return (((current + speed * this.sign(dir)) % 360) + 360) % 360;
      }
      static probability(value) {
          return Math.random() < value;
      }
      static randomRange(min, max) {
          return Math.floor(Math.random() * (max - min + 1) + min);
      }
  }
  Mathf.deg2Rad = Math.PI / 180;
  Mathf.rad2Deg = 180 / Math.PI;

  class PlayerDistanceScript extends Laya.Script {
      onAwake() {
          (this.ownerUI = this.owner), (this.ownerUI.visible = !1), (this.img_players = []);
          let e = this.endless ? 0.3 * this.ownerUI.width : 0;
          for (let t = 1; t <= 4; ++t) {
              let i = this.ownerUI.getChildByName('img_player' + t);
              this.img_players.push(i), (i.x = e);
          }
          fx.EventCenter.instance.on(a.E_GAME_STATE_CHANGED, this, this.onGameStateChange);
      }
      onDestroy() {
          fx.EventCenter.instance.offAllCaller(this);
      }
      onGameStateChange(e) {
          let t = m.instance;
          switch (t.getGameState()) {
              case o.E_GAME_START:
                  e != o.E_GAME_FAILED &&
                      ((this.ownerUI.visible = !0),
                          (this.players = t.players),
                          (this.raceLength = t.raceEndPos - t.raceStartPos),
                          this.updateDist());
          }
      }
      onUpdate() {
          this.updateDist();
      }
      updateDist() {
          this.players && (this.endless ? this.updateEndless() : this.updateNormal());
      }
      updateEndless() { }
      updateNormal() {
          let e = m.instance.raceStartPos;
          for (let t = 0; t < 4; ++t) {
              let i = this.img_players[t], s = this.players[t];
              if (s) {
                  i.visible = !0;
                  if (s.transform && s.transform.position) {
                      let t = s.transform.position.z - e;
                      i.x = Mathf.clamp((this.ownerUI.width * t) / this.raceLength, 0, this.ownerUI.width);
                  }
                  else {
                      i.visible = !1;
                  }
                  i.x = Mathf.clamp((this.ownerUI.width * t) / this.raceLength, 0, this.ownerUI.width);
              }
              else
                  i.visible = !1;
          }
      }
  }

  class StageProgress extends Laya.Script {
      onAwake() {
          (this.ownerUI = this.owner),
              (this.panelProgress = this.ownerUI.seekChildByName('panelProgress')),
              (this.progressWidth = this.panelProgress.getChildAt(0).width),
              (this.labelStage1 = this.ownerUI.seekChildByName('labelStage1')),
              (this.labelStage2 = this.ownerUI.seekChildByName('labelStage2')),
              this.updateStage();
      }
      onUpdate() {
          let e = m.instance.player;
          if (!e)
              return;
          let t = e.transform.position, i = m.instance.raceStartPos, s = m.instance.raceEndPos - i, n = (t.z - i) / s;
          this.panelProgress.width = n * this.progressWidth;
      }
      updateStage() {
          let e = m.instance.getCurStage();
          (this.labelStage1.value = `${e.id}`), (this.labelStage2.value = `${e.id + 1}`);
      }
  }

  class EnergyScript extends Laya.Script {
      constructor() {
          super(), (this.curPropress = 0), (this.curWidth = 0), (this.isFlying = !1);
      }
      onAwake() {
          (this.ownerUI = this.owner),
              (this.ownerUI.visible = !1),
              (this.ownerUI.mouseThrough = !0),
              (this.panelProgress = this.ownerUI.getChildByName('panelProgress')),
              (this.progressWidth = this.panelProgress.getChildAt(0).height),
              (this.panelProgress.height = 0),
              fx.EventCenter.instance.on(a.E_GAME_STATE_CHANGED, this, this.onGameStateChange),
              fx.EventCenter.instance.on(a.E_Energy_Changed, this, this.onEnergyChange),
              fx.EventCenter.instance.on(a.E_Fly_Start, this, this.onFlyStart);
      }
      onDestroy() {
          Laya.Tween.clearTween(this.panelProgress), fx.EventCenter.instance.offAllCaller(this);
      }
      onUpdate() {
          if (this.isFlying)
              return;
          let e = this.curPropress * this.progressWidth, t = 10 * (this.owner.timer.delta / 1e3);
          (this.curWidth = Mathf.lerp(this.curWidth, e, t)), (this.panelProgress.height = this.curWidth);
      }
      onGameStateChange(e) {
          switch (m.instance.getGameState()) {
              case o.E_GAME_START:
                  e != o.E_GAME_FAILED && (this.ownerUI.visible = !0);
          }
      }
      onFlyStart(e) {
          (this.isFlying = !0),
              Laya.Tween.to(this.panelProgress, {
                  height: 0
              }, 1e3 * e);
      }
      onEnergyChange() {
          let e = m.instance, t = e.energy / e.maxEnergy;
          this.setProgress(t);
      }
      setProgress(e) {
          this.curPropress = e;
      }
  }

  class se extends fx.BaseLogic {
      constructor() {
          super(), (this.cfg = fx.CfgMgr.instance.get('reward'));
      }
      static get inst() {
          return this._inst || (this._inst = new se()), this._inst;
      }
      getRewardCfgById(e) {
          if (e)
              return this.cfg[e];
      }
      getRewardTypeById(e) {
          if (!e)
              return;
          let t = this.getRewardCfgById(e);
          return t ? t.t : void 0;
      }
      addRewardById(e, t = 1) {
          console.log(e, t);
          if (!e)
              return;
          let i = (e, t = 1) => {
              if (!e)
                  return;
              let i = this.getRewardCfgById(e);
              if (!i)
                  return;
              let s = `addReward_${i.t}`;
              if (this[s]) {
                  this[s].call(this, i, t);
              }
          };
          if (e instanceof Array)
              for (let s = 0; s < e.length; ++s)
                  i(e[s], t);
          else
              i(e, t);
      }
      addReward_1(e, t = 1) {
          if (!e.num)
              return;
          let i = e.num * t;
          y.instance.getPlayerInfo().addCoins(i), console.log(`###addReward_1_激励广告 金币添加[${i}]`);
      }
      addReward_2(e, t = 1) {
          e.id &&
              (x.inst.isOwnSkin(e.id) ||
                  (x.inst.unlockSkin(e.id), console.log(`###addReward_2_激励广告 皮肤添加[${e.id}]`)));
      }
  }

  class ae extends fx.BaseLogic {
      constructor() {
          super(),
              (this._signInToday = void 0),
              (this._signInDays = void 0),
              (this.cfg = fx.CfgMgr.instance.get('signIn')),
              (this.rInst = se.inst);
      }
      get signInToday() {
          return this._signInToday;
      }
      set signInToday(e) {
          e !== this.signInToday &&
              ((this._signInToday = e), (y.instance.getPlayerInfo().signInToday = this.signInToday));
      }
      get signInDays() {
          return this._signInDays;
      }
      set signInDays(e) {
          e !== this.signInDays &&
              ((this._signInDays = e), (y.instance.getPlayerInfo().signInDays = this.signInDays));
      }
      static get inst() {
          return this._inst || (this._inst = new ae()), this._inst;
      }
      onInitOnce() {
          void 0 === this.signInDays &&
              ((this.signInToday = y.instance.getPlayerInfo().signInToday),
                  fx.UserLogic.instance.isNewDay() && this.signInToday && (this.signInToday = !1),
                  (this.signInDays = y.instance.getPlayerInfo().signInDays),
                  this.signInDays || (this.signInDays = 0));
      }
      signIn(e = !1) {
          if (this.signInToday)
              return X.E_SIGNIN_REPEAT;
          (this.signInDays += 1), (this.signInToday = !0);
          let t = e ? 2 : 1, i = this.getSignInInfoCurDay();
          if (i) {
              this.rInst.addRewardById(i.rewardId, t);
              let s = this.rInst.getRewardTypeById(i.rewardId);
              if (e) {
                  console.log('双倍签到-激励广告');
              }
              if (z.SKIN === s && e) {
                  let e = this.getSignInCfgCurDay();
                  e && this.rInst.addRewardById(e.defaultRewardId, 1);
                  console.log('双倍签到-激励广告');
              }
          }
          return X.E_SIGNIN_SUCCESS;
      }
      getSignInCfgByDay(e) {
          if (e)
              return this.cfg[e];
      }
      getSignInCfgCurDay() {
          let e = this.getSignInCurDay();
          return this.getSignInCfgByDay(e);
      }
      getSignInInfoByDay(e) {
          let t = this.getSignInCfgByDay(e);
          if (!t)
              return;
          let i = {
              id: e,
              rewardId: t.rewardId,
              rewardIcon: t.rewardIcon,
              rewardDes: t.rewardDes
          }, s = this.rInst.getRewardTypeById(i.rewardId);
          return (z.SKIN === s &&
              this.signInDays >= ae.TYPE &&
              ((this.signInDays === ae.TYPE && this.signInToday) ||
                  ((i.rewardId = t.defaultRewardId),
                      (i.rewardIcon = t.defaultRewardIcon),
                      (i.rewardDes = t.defaultRewardDes))),
              i);
      }
      getSignInInfoCurDay() {
          let e = this.getSignInCurDay();
          return this.getSignInInfoByDay(e);
      }
      getSignInRewardTypeCurDay() {
          let e = this.getSignInInfoCurDay();
          if (!e)
              return;
          let t = this.rInst.getRewardCfgById(e.rewardId);
          return t ? t.t : void 0;
      }
      isSkinTypeRewardCurDay() {
          let e = this.getSignInRewardTypeCurDay();
          return e === z.COINS || e === z.SKIN;
      }
      getSignInCurDay() {
          let e = 0;
          return ((e = this.signInToday ? this.signInDays : this.signInDays + 1),
              0 === (e %= ae.TYPE) && (e = 7),
              e);
      }
  }
  ae.TYPE = j.DAY_7;

  var View = Laya.View;
  var BaseDialog = fx.BaseDialog;
  var BaseScene = fx.BaseScene;
  var BaseView = fx.BaseView;
  var REG = Laya.ClassUtils.regClass;
  var ui;
  (function (ui) {
      var scenes;
      (function (scenes) {
          class BoxRewardDialogUI extends BaseDialog {
              constructor() { super(); }
              createChildren() {
                  super.createChildren();
                  this.loadScene("scenes/BoxRewardDialog");
              }
          }
          scenes.BoxRewardDialogUI = BoxRewardDialogUI;
          REG("ui.scenes.BoxRewardDialogUI", BoxRewardDialogUI);
          class ComposeViewUI extends BaseView {
              constructor() { super(); }
              createChildren() {
                  super.createChildren();
                  this.loadScene("scenes/ComposeView");
              }
          }
          scenes.ComposeViewUI = ComposeViewUI;
          REG("ui.scenes.ComposeViewUI", ComposeViewUI);
          class CustomLevelUI extends BaseDialog {
              constructor() { super(); }
              createChildren() {
                  super.createChildren();
                  this.loadScene("scenes/CustomLevel");
              }
          }
          scenes.CustomLevelUI = CustomLevelUI;
          REG("ui.scenes.CustomLevelUI", CustomLevelUI);
          class GameFailedDialogUI extends BaseDialog {
              constructor() { super(); }
              createChildren() {
                  super.createChildren();
                  this.loadScene("scenes/GameFailedDialog");
              }
          }
          scenes.GameFailedDialogUI = GameFailedDialogUI;
          REG("ui.scenes.GameFailedDialogUI", GameFailedDialogUI);
          class GameReviveDialogUI extends BaseDialog {
              constructor() { super(); }
              createChildren() {
                  super.createChildren();
                  this.loadScene("scenes/GameReviveDialog");
              }
          }
          scenes.GameReviveDialogUI = GameReviveDialogUI;
          REG("ui.scenes.GameReviveDialogUI", GameReviveDialogUI);
          class GameSceneUI extends BaseScene {
              constructor() { super(); }
              createChildren() {
                  super.createChildren();
                  this.loadScene("scenes/GameScene");
              }
          }
          scenes.GameSceneUI = GameSceneUI;
          REG("ui.scenes.GameSceneUI", GameSceneUI);
          class GameSuccessDialogUI extends BaseDialog {
              constructor() { super(); }
              createChildren() {
                  super.createChildren();
                  this.loadScene("scenes/GameSuccessDialog");
              }
          }
          scenes.GameSuccessDialogUI = GameSuccessDialogUI;
          REG("ui.scenes.GameSuccessDialogUI", GameSuccessDialogUI);
          class LoadingSceneUI extends View {
              constructor() { super(); }
              createChildren() {
                  super.createChildren();
                  this.loadScene("scenes/LoadingScene");
              }
          }
          scenes.LoadingSceneUI = LoadingSceneUI;
          REG("ui.scenes.LoadingSceneUI", LoadingSceneUI);
          class RewardDialogUI extends BaseDialog {
              constructor() { super(); }
              createChildren() {
                  super.createChildren();
                  this.loadScene("scenes/RewardDialog");
              }
          }
          scenes.RewardDialogUI = RewardDialogUI;
          REG("ui.scenes.RewardDialogUI", RewardDialogUI);
          class SettingDialogUI extends BaseDialog {
              constructor() { super(); }
              createChildren() {
                  super.createChildren();
                  this.loadScene("scenes/SettingDialog");
              }
          }
          scenes.SettingDialogUI = SettingDialogUI;
          REG("ui.scenes.SettingDialogUI", SettingDialogUI);
          class TrySkinDialogUI extends BaseDialog {
              constructor() { super(); }
              createChildren() {
                  super.createChildren();
                  this.loadScene("scenes/TrySkinDialog");
              }
          }
          scenes.TrySkinDialogUI = TrySkinDialogUI;
          REG("ui.scenes.TrySkinDialogUI", TrySkinDialogUI);
          class fingeUI extends View {
              constructor() { super(); }
              createChildren() {
                  super.createChildren();
                  this.loadScene("scenes/finge");
              }
          }
          scenes.fingeUI = fingeUI;
          REG("ui.scenes.fingeUI", fingeUI);
      })(scenes = ui.scenes || (ui.scenes = {}));
  })(ui || (ui = {}));
  (function (ui) {
      var scenes;
      (function (scenes) {
          var luckyDraw;
          (function (luckyDraw) {
              class LotteryDialogUI extends BaseDialog {
                  constructor() { super(); }
                  createChildren() {
                      super.createChildren();
                      this.loadScene("scenes/luckyDraw/LotteryDialog");
                  }
              }
              luckyDraw.LotteryDialogUI = LotteryDialogUI;
              REG("ui.scenes.luckyDraw.LotteryDialogUI", LotteryDialogUI);
              class LotteryMultDialogUI extends BaseDialog {
                  constructor() { super(); }
                  createChildren() {
                      super.createChildren();
                      this.loadScene("scenes/luckyDraw/LotteryMultDialog");
                  }
              }
              luckyDraw.LotteryMultDialogUI = LotteryMultDialogUI;
              REG("ui.scenes.luckyDraw.LotteryMultDialogUI", LotteryMultDialogUI);
          })(luckyDraw = scenes.luckyDraw || (scenes.luckyDraw = {}));
      })(scenes = ui.scenes || (ui.scenes = {}));
  })(ui || (ui = {}));
  (function (ui) {
      var scenes;
      (function (scenes) {
          var signIn;
          (function (signIn) {
              class SignInDialogUI extends BaseDialog {
                  constructor() { super(); }
                  createChildren() {
                      super.createChildren();
                      this.loadScene("scenes/signIn/SignInDialog");
                  }
              }
              signIn.SignInDialogUI = SignInDialogUI;
              REG("ui.scenes.signIn.SignInDialogUI", SignInDialogUI);
          })(signIn = scenes.signIn || (scenes.signIn = {}));
      })(scenes = ui.scenes || (ui.scenes = {}));
  })(ui || (ui = {}));
  (function (ui) {
      var scenes;
      (function (scenes) {
          var skin;
          (function (skin) {
              class SkinDialogUI extends BaseView {
                  constructor() { super(); }
                  createChildren() {
                      super.createChildren();
                      this.loadScene("scenes/skin/SkinDialog");
                  }
              }
              skin.SkinDialogUI = SkinDialogUI;
              REG("ui.scenes.skin.SkinDialogUI", SkinDialogUI);
              class StageSkinDialogUI extends BaseDialog {
                  constructor() { super(); }
                  createChildren() {
                      super.createChildren();
                      this.loadScene("scenes/skin/StageSkinDialog");
                  }
              }
              skin.StageSkinDialogUI = StageSkinDialogUI;
              REG("ui.scenes.skin.StageSkinDialogUI", StageSkinDialogUI);
              class TrySkinBreakingIceDialogUI extends BaseDialog {
                  constructor() { super(); }
                  createChildren() {
                      super.createChildren();
                      this.loadScene("scenes/skin/TrySkinBreakingIceDialog");
                  }
              }
              skin.TrySkinBreakingIceDialogUI = TrySkinBreakingIceDialogUI;
              REG("ui.scenes.skin.TrySkinBreakingIceDialogUI", TrySkinBreakingIceDialogUI);
              class TrySkinNumDialogUI extends BaseDialog {
                  constructor() { super(); }
                  createChildren() {
                      super.createChildren();
                      this.loadScene("scenes/skin/TrySkinNumDialog");
                  }
              }
              skin.TrySkinNumDialogUI = TrySkinNumDialogUI;
              REG("ui.scenes.skin.TrySkinNumDialogUI", TrySkinNumDialogUI);
          })(skin = scenes.skin || (scenes.skin = {}));
      })(scenes = ui.scenes || (ui.scenes = {}));
  })(ui || (ui = {}));
  (function (ui) {
      var scenes;
      (function (scenes) {
          var turntable;
          (function (turntable) {
              class TurntableDialogUI extends BaseDialog {
                  constructor() { super(); }
                  createChildren() {
                      super.createChildren();
                      this.loadScene("scenes/turntable/TurntableDialog");
                  }
              }
              turntable.TurntableDialogUI = TurntableDialogUI;
              REG("ui.scenes.turntable.TurntableDialogUI", TurntableDialogUI);
          })(turntable = scenes.turntable || (scenes.turntable = {}));
      })(scenes = ui.scenes || (ui.scenes = {}));
  })(ui || (ui = {}));

  var e$4 = Laya.Vector3, t$4 = (Laya.Vector4, Laya.Sprite3D), i$4 = Laya.MeshSprite3D;
  class ComposeView extends ui.scenes.ComposeViewUI {
      constructor(...e) {
          super(),
              (this.selectMaterials = []),
              (this.isHui = !1),
              ([this.from, this.isHui, this.callback] = e);
      }
      onAdd() {
          (this.btn_last.skin = 'res/compose/8.png'),
              (this.btn_comp.skin = 'res/compose/3.png'),
              this.updateUI(),
              this.showRandomBtn
                  ? (this.btn_getMet.visible = !0)
                  : ((this.btn_getMet.visible = !1),
                      (this.btn_compose.centerX = 0),
                      (this.btn_videoCompose.centerX = 0)),
              this.timerOnce(1e3, this, () => {
                  this.createScene3d();
              }),
              this.initTabs(),
              this.initMaterialList(),
              this.btn_back.on(Laya.Event.CLICK, this, () => {
                  fx.SceneManager.popView();
              }),
              this.btn_compose.on(Laya.Event.CLICK, this, this.onClickCompose),
              this.on(fx.SdkEvent.E_REWARD_GAIN, this, e => {
                  fx.SdkCode.REWARD_GAIN_SUCCESS === e.code &&
                      this.btn_getMet['$_GID'] === e.gid &&
                      this.randomFormula();
              }),
              this.btn_last.on(Laya.Event.CLICK, this, () => {
                  (this.curTabIndex = 0), this.refreshHandleUI();
              }),
              this.btn_comp.on(Laya.Event.CLICK, this, () => {
                  (this.btn_last.skin = 'res/compose/8.png'),
                      (this.btn_comp.skin = 'res/compose/3.png'),
                      this.gotoCompose();
              });
          let e = this.btn_videoCompose.getComponent(RewardBtnScript);
          e.setCallback(Laya.Handler.create(this, e => {
              fx.SdkCode.REWARD_GAIN_SUCCESS === e.code && this.onClickCompose();
          }, null, !1)),
              this.btn_videoCompose.on(Laya.Event.MOUSE_DOWN, this, () => {
                  this.getCompose()
                      ? e.setEnalbe(!0)
                      : (e.setEnalbe(!1), fx.Utils.showTips('这些材料暂时无法合成'));
              }),
              this.btn_try.getComponent(RewardBtnScript).setCallback(Laya.Handler.create(this, e => {
                  fx.SdkCode.REWARD_GAIN_SUCCESS === e.code && this.onClickTry();
              }, null, !1)),
              (this.img_bg1.width = Laya.stage.width),
              (this.img_bg2.width = Laya.stage.width);
      }
      onRemove() {
          'skinDialog' == this.from && this.callback && this.callback.run(),
              Laya.loader.clearTextureRes('res/atlas/res/compose.atlas');
      }
      updateUI() {
          let e = fx.CfgMgr.instance.get('composeCfg'), t = [];
          for (let i in e)
              x.inst.isTryTimeSkin(e[i].id) ||
                  x.inst.isOwnSkin(e[i].id) ||
                  x.inst.isCompose(e[i].id) ||
                  t.push(e[i]);
          t && 0 != t.length ? (this.showRandomBtn = !0) : (this.showRandomBtn = !1);
      }
      gotoCompose() {
          (this.box_scene3d.visible = !1),
              (this.list_ability.visible = !1),
              (this.list_tabs.visible = !1),
              (this.label_notice.visible = !0),
              this.showRandomBtn && (this.btn_getMet.visible = !0),
              (this.list_material.visible = !0),
              (this.box_try.visible = !1),
              (this.btn_compose.visible = !1),
              (this.btn_videoCompose.visible = !1),
              x.inst.isComposeFirst()
                  ? (this.btn_compose.visible = !0)
                  : (this.btn_videoCompose.visible = !0);
      }
      initTabs() {
          let e = [], t = fx.CfgMgr.instance.get('composeCfg');
          for (const i in t)
              e.push(t[i]);
          (this.curTabIndex = 0),
              (this.list_tabs.vScrollBarSkin = ''),
              (this.list_tabs.repeatX = 3),
              (this.list_tabs.repeatY = Math.floor(e.length / 3)),
              (this.list_tabs.array = e),
              (this.list_tabs.renderHandler = new Laya.Handler(this, this.updateTabItem)),
              this.gotoCompose();
      }
      updateTabItem(e, t) {
          let i = e.dataSource, s = e.getChildByName('img_normal'), n = e.getChildByName('img_select'), a = e.getChildByName('img_locked'), r = e.getChildByName('img_icon');
          (s.skin = i.tabIcon1), (n.skin = i.tabIcon2), (n.visible = t == this.curTabIndex);
          let o = x.inst.getCfgById(e.dataSource.animalId);
          (r.skin = o.icon),
              x.inst.isOwnSkin(o.id) || x.inst.isCompose(o.id)
                  ? ((r.visible = !0), (a.visible = !1))
                  : ((a.visible = !0), (r.visible = !1)),
              e.reg ||
                  ((e.reg = !0),
                      e.on(Laya.Event.CLICK, this, e => {
                          e.stopPropagation();
                          this.selectTab(t);
                      }));
      }
      getItem(e) {
          let t = this.list_tabs.getItem(e);
          return this.list_tabs.cells.filter((e, i, s) => {
              let n = e.dataSource;
              return !!n && n == t;
          }, this)[0];
      }
      selectTab(e) {
          let t = this.curTabIndex;
          this.curTabIndex = e;
          let i = this.getItem(t);
          i && this.updateTabItem(i, t);
          let s = this.getItem(e);
          s && this.updateTabItem(s, e), this.clearMaterials(), this.refreshHandleUI();
      }
      initMaterialList() {
          let e = [], t = fx.CfgMgr.instance.get('composeMaterial');
          for (const i in t)
              e.push(t[i]);
          (this.list_material.vScrollBarSkin = ''),
              (this.list_material.repeatX = 3),
              (this.list_material.repeatY = Math.ceil(e.length / 3)),
              (this.list_material.array = e),
              (this.list_material.renderHandler = new Laya.Handler(this, this.updateMaterialItem));
      }
      clearMaterials() {
          (this.selectMaterials = []),
              this.box_materialContainer.removeChildren(),
              this.initMaterialList();
      }
      updateMaterialItem(e) {
          let t = e.dataSource;
          (e.getChildByName('img_material').skin = t.matIcon),
              (e.getChildByName('img_select').visible = this.isSelectMaterial(t.id)),
              e.reg ||
                  ((e.reg = !0),
                      e.on(Laya.Event.CLICK, this, e => {
                          e.stopPropagation(), this.onClickMaterialItem(e.target);
                      }));
      }
      onClickMaterialItem(e) {
          let t = e.dataSource, i = this.selectMaterials.indexOf(t.id);
          if (-1 == i) {
              this.selectMaterials.push(t.id);
              let i = new Laya.Image(t.matIcon);
              i.dataSource = t.id;
              let s = new Laya.Point();
              (s = e.localToGlobal(s)),
                  (s = this.box_materialContainer.globalToLocal(s)),
                  i.scale(0.6, 0.6),
                  (i.anchorX = 0.5),
                  (i.anchorY = 0.5),
                  this.box_materialContainer.addChild(i);
              let n = this.box_materialContainer.width, a = this.box_materialContainer.height, r = fx.Utils.getNumberRandom(0, n), o = fx.Utils.getNumberRandom(0, a);
              i.pos(s.x, s.y),
                  Laya.Tween.to(i, {
                      x: r,
                      y: o
                  }, 200);
          }
          else {
              this.selectMaterials.splice(i, 1);
              let e = this.box_materialContainer['getChildren']();
              for (const i of e)
                  if (i.dataSource == t.id) {
                      i.destroy();
                      break;
                  }
          }
          this.updateMaterialItem(e);
      }
      isSelectMaterial(e) {
          return -1 != this.selectMaterials.indexOf(e);
      }
      isMatchMaterial(e) {
          e = e.slice();
          let t = this.selectMaterials.slice();
          for (let i = e.length - 1; i >= 0; --i) {
              let s = t.indexOf(e[i]);
              if (-1 == s)
                  return !1;
              t.splice(s, 1);
          }
          return !(t.length > 0);
      }
      refreshHandleUI() {
          (this.btn_last.skin = 'res/compose/1.png'), (this.btn_comp.skin = 'res/compose/10.png');
          let e = this.list_tabs.getItem(this.curTabIndex), t = e.animalId;
          (this.btn_getMet.visible = !1),
              (this.list_material.visible = !1),
              (this.list_tabs.visible = !0),
              (this.btn_compose.visible = !1),
              (this.btn_videoCompose.visible = !1),
              (this.label_notice.visible = !1),
              x.inst.isOwnSkin(t)
                  ? (this.box_try.visible = !1)
                  : x.inst.isCompose(t)
                      ? ((this.box_try.visible = !0), this.updateTryUI(e))
                      : (this.box_try.visible = !1),
              (this.box_scene3d.visible = !0),
              x.inst.isOwnSkin(t) || x.inst.isTryTimeSkin(t)
                  ? this.createModel(t)
                  : (this.box_scene3d.visible = !1);
      }
      updateTryUI(e) {
          let t = e.animalId, i = x.inst.getSkinById(t);
          if (!i)
              return;
          let s = x.inst.getCfgById(t);
          s &&
              ((this.label_video.text = `${i.videoCnt}/${s.unlock.videoNum}`),
                  (this.label_tryCount.text = '' + (s.unlock.videoNum - i.videoCnt)),
                  this.updateTryTime(i.endTryTime),
                  this.label_tryTime.clearTimer(this, this.updateTryTime),
                  this.label_tryTime.timerLoop(1e3, this, this.updateTryTime, [i.endTryTime]));
      }
      updateTryTime(e) {
          if (e) {
              let t = 1e3 * e - Date.now();
              t = Math.max(t, 0);
              let i = fx.Utils.timestampToTime(t, {
                  separator: [':', ':', ''],
                  isAlign: !0
              });
              (this.label_tryTime.text = i),
                  (this.img_tryTime.visible = !0),
                  t || (this.img_tryTime.visible = !1);
          }
          else
              this.img_tryTime.visible = !1;
      }
      onClickTry() {
          console.log(this.curTabIndex, 'onClickTry');
          let e = this.list_tabs.getItem(this.curTabIndex), t = e.animalId;
          t && (x.inst.unlockSkin(t, e.tryTime), this.refreshHandleUI());
      }
      unlockSkin(e, t) {
          x.inst.getCfgById(e);
          if ((x.inst.unlockSkin(e, t), x.inst.isOwnSkin(e))) {
              let t = x.inst.getCfgById(e).type;
              x.inst.setCurSkin(t, e);
          }
          for (const e in C) {
              C[e];
          }
      }
      updateAbility() {
          let e = this.list_tabs.getItem(this.curTabIndex), t = [];
          for (const i of e.ability)
              t.push({
                  des: i
              });
          (this.list_ability.vScrollBarSkin = ''),
              (this.list_ability.repeatX = 1),
              (this.list_ability.repeatY = t.length),
              (this.list_ability.array = t),
              (this.list_ability.renderHandler = new Laya.Handler(this, this.updateAbilitItem));
      }
      updateAbilitItem(e) {
          e.seekChildByName('label_ability').text = e.dataSource.des;
      }
      getCompose() {
          let e, t = fx.CfgMgr.instance.get('composeCfg');
          for (const i in t) {
              let s = t[i], n = s.animalId;
              if (!x.inst.isOwnSkin(n) && !x.inst.isCompose(n) && this.isMatchMaterial(s.materials)) {
                  e = s;
                  break;
              }
          }
          return e;
      }
      onClickCompose() {
          let e = this.getCompose();
          if (e) {
              let t = e.animalId;
              this.unlockSkin(t, e.tryTime), fx.Utils.showTips(`恭喜成功合成${e.name}!`);
              let i = this.list_tabs.array.slice(), s = 0;
              for (const e of i) {
                  if (e && e.animalId && e.animalId == t)
                      break;
                  s++;
              }
              this.selectTab(s);
          }
          else
              fx.Utils.showTips('这些材料暂时无法合成'), this.clearMaterials();
          this.updateUI();
      }
      createScene3d() {
          let i = new Laya.Scene3D();
          (this.scene3d = i), this.box_scene3d.addChild(i);
          let s = new Laya.Camera();
          (s.clearFlag = Laya.BaseCamera.CLEARFLAG_DEPTHONLY),
              s.transform.translate(new Laya.Vector3(0, 0, -3.5), !1),
              (s.normalizedViewport = this.getViewPort()),
              s.transform.lookAt(new e$4(0, 0, 0), new e$4(0, 1, 0)),
              i.addChild(s);
          var n = i.addChild(new Laya.DirectionLight());
          (n.color = fx.Utils.colorHexTo3F('#FFF4D6')),
              (i.ambientMode = Laya.AmbientMode.SolidColor),
              i.ambientColor.setValue(0.51, 0.51, 0.51);
          var a = n.transform.worldMatrix;
          if ((a.setForward(new Laya.Vector3(0.25, -1, 1)),
              (n.transform.worldMatrix = a),
              this.animalSpSkinId)) {
              let e = this.animalSpSkinId;
              (this.animalSpSkinId = void 0), this.createModel(e);
          }
          (this.animalParentSp = new t$4()), this.scene3d.addChild(this.animalParentSp);
      }
      getViewPort() {
          let e = this.box_scene3d.width, t = this.box_scene3d.height, i = new Laya.Point(), s = (i = this.box_scene3d.localToGlobal(i)).x, n = i.y;
          return new Laya.Viewport(s / Laya.stage.width, n / Laya.stage.height, e / Laya.stage.width, t / Laya.stage.height);
      }
      createModel(t) {
          if (this.animalSpSkinId == t)
              return;
          this.animalSpSkinId = t;
          let i = x.inst.getCfgById(t);
          i &&
              fx.Utils.create3dModel(i.model, this, t => {
                  if (!t || !this.scene3d || this.scene3d.destroyed)
                      return;
                  this.animalSp && !this.animalSp.destroyed && this.animalSp.destroy();
                  let i = t.clone();
                  (this.animalSp = i), this.animalParentSp.addChild(i), i.transform.rotate(new e$4(0, -90, 0));
                  let s = this.animalSp.transform.localScaleX;
                  (s *= 1.5),
                      this.animalSp.transform.setWorldLossyScale(new e$4(s, s, s)),
                      (this.animalSp.transform.position = new e$4(0, -0.8, -0.6));
                  i.getComponent(Laya.Animator);
                  R.handlePlayerModel(i), fx.Helper.rotateAnim(i, 360, 10, 0, 'y', !0);
              });
      }
      randomFormula() {
          this.clearMaterials();
          let e = fx.CfgMgr.instance.get('composeCfg'), t = [];
          for (let i in e)
              x.inst.isTryTimeSkin(e[i].id) ||
                  x.inst.isOwnSkin(e[i].id) ||
                  x.inst.isCompose(e[i].id) ||
                  t.push(e[i]);
          if (!t || 0 == t.length)
              return;
          let i = t[fx.Utils.getIntRandom(0, t.length - 1)].materials;
          if (!i || 0 == i.length)
              return;
          let s = [], n = fx.CfgMgr.instance.get('composeMaterial');
          if (n) {
              for (const e in n)
                  for (const t of i)
                      e === t.toString() && s.push(n[e]);
              for (let e of this.list_material.cells)
                  for (const t of s)
                      e.dataSource == t && this.onClickMaterialItem(e);
          }
      }
  }

  class SettingDialog extends ui.scenes.SettingDialogUI {
      constructor() {
          super();
      }
      onAdd() {
          this.btn_close.on(Laya.Event.CLICK, this, this.onBtnCloseClick),
              this.btn_sound.on(Laya.Event.CLICK, this, this.onBtnSoundClick),
              this.refreshUI();
      }
      onRemove() {
          Laya.loader.clearTextureRes('res/atlas/res/settingRes.atlas');
      }
      refreshUI() {
          let e = fx.SoundManager.instance.getToggleSoundFxStatus();
          y.instance.getPlayerInfo().vibrateEnable;
          this.refreshBtn(this.btn_sound, e);
      }
      onBtnCloseClick(e) {
          e && e.stopPropagation(), fx.SceneManager.closePanel(this);
      }
      onBtnSoundClick(e) {
          e && e.stopPropagation(), this.triSound();
      }
      onBtnVibrationClick(e) {
          e && e.stopPropagation(), this.trivibration();
      }
      triSound() {
          let e = fx.SoundManager.instance.toggleAll();
          this.refreshBtn(this.btn_sound, e);
      }
      trivibration() {
          y.instance.getPlayerInfo().vibrateEnable = !y.instance.getPlayerInfo().vibrateEnable;
      }
      refreshBtn(e, t) {
          let i = e.getChildByName('img_close'), s = e.getChildByName('img_open');
          (i.visible = !t), (s.visible = t);
      }
  }

  class k {
  }

  class re extends fx.BaseLogic {
      static get instance() {
          return this._instance || (this._instance = new re()), this._instance;
      }
      onInitOnce() {
          this.fragments = y.instance.getPlayerInfo().fragments;
          for (let e = this.fragments.length - 1; e >= 0; --e) {
              let t = this.fragments[e];
              x.inst.isOwnSkin(t.id) ? this.fragments.splice(e, 1) : this.checkAutoConvert(t.id);
          }
      }
      onInit() { }
      getFragmentCount(e) {
          var t = this.getFragmentInfo(e);
          return null != t ? t.count : 0;
      }
      getFragmentPercent(e) {
          let t = this.getFragmentCount(e) / x.inst.getCfgById(e).unlock.num;
          return (t = Mathf.clamp(t, 0, 1));
      }
      getFragmentInfo(e) {
          for (const t of this.fragments)
              if (e == t.id)
                  return t;
          return null;
      }
      canConvert(e) {
          let t = x.inst.getCfgById(e);
          if (!t || t.unlock.way != I.FRAGMENT)
              return !1;
          if (x.inst.isOwnSkin(e))
              return !1;
          let i = this.getFragmentInfo(e);
          return !!(i && i.count >= t.unlock.num);
      }
      checkAutoConvert(e) {
          return !(!this.canConvert(e) || (x.inst.unlockSkin(e), !x.inst.isOwnSkin(e)));
      }
      addFragment(e, t) {
          let i = x.inst.getCfgById(e);
          if (i && i.unlock.way == I.FRAGMENT && !x.inst.isOwnSkin(e)) {
              var s = this.getFragmentInfo(e);
              null == s && (((s = new k())['id'] = e), (s.count = 0), this.fragments.push(s)),
                  (s.count = Math.max(s.count + t, 0)),
                  (y.instance.getPlayerInfo().fragments = this.fragments),
                  this.event(_.E_SKIN_FRAGMENT_CHANGE, {
                      id: e
                  }),
                  this.checkAutoConvert(e);
          }
      }
  }

  class RewardDialog extends ui.scenes.RewardDialogUI {
      constructor(e, t, i) {
          super(), (this.from = e), (this.skinId = t.id), (this.callback = i);
      }
      onAdd() {
          this.skinId
              ? ((this.width = Laya.stage.width),
                  (this.height = Laya.stage.height),
                  (this.centerX = 0.5 * this.width),
                  (this.centerY = 0.5 * this.height),
                  this.btn_sure.on(Laya.Event.CLICK, this, () => {
                      x.inst.setCurSkinById(this.skinId), fx.SceneManager.closePanel(this);
                  }))
              : fx.SceneManager.closePanel(this);
      }
      onEnter() {
          this.createScene3d();
      }
      onRemove() {
          this.callback &&
              (this.callback instanceof Laya.Handler ? this.callback.run() : this.callback());
      }
      createScene3d() {
          let t = new Laya.Scene3D();
          this.box_scene3d.addChild(t);
          let i = new Laya.Camera();
          (i.clearFlag = Laya.BaseCamera.CLEARFLAG_DEPTHONLY),
              i.transform.translate(new Laya.Vector3(0, 0, -1), !1),
              (i.normalizedViewport = this.getViewPort()),
              i.transform.lookAt(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 1, 0)),
              t.addChild(i);
          var s = t.addChild(new Laya.DirectionLight());
          (s.color = fx.Utils.colorHexTo3F('#FFF4D6')),
              (t.ambientMode = Laya['AmbientMode'].SolidColor),
              t.ambientColor.setValue(0.51, 0.51, 0.51);
          var n = s.transform.worldMatrix;
          n.setForward(new Laya.Vector3(0.25, -1, 1)), (s.transform.worldMatrix = n);
          let a = x.inst.getCfgById(this.skinId);
          fx.Utils.create3dModel(a.model, this, i => {
              if (!i || t.destroyed)
                  return;
              let s = i.clone();
              t.addChild(s), s.transform.rotate(new Laya.Vector3(0, 180, 0));
              let n = R.convertPos(a.displayPosition);
              s.transform.position = n;
              let r = a.displayScale || 1;
              (s.transform.localScale = new Laya.Vector3(r, r, r)),
                  R.handlePlayerModel(s),
                  (s.name = 'ironman') && R.stopParticleSpEx(s);
          });
      }
      getViewPort() {
          let e = this.box_scene3d.width, t = this.box_scene3d.height, i = new Laya.Point(), s = (i = this.box_scene3d.localToGlobal(i)).x, n = i.y;
          return new Laya.Viewport(s / Laya.stage.width, n / Laya.stage.height, e / Laya.stage.width, t / Laya.stage.height);
      }
  }

  class he extends fx.BaseLogic {
      constructor() {
          super(),
              (this._curTurntableCfgs = void 0),
              (this.cfg = fx.CfgMgr.instance.get('turntableReward')),
              (this.rInst = se.inst);
      }
      static get inst() {
          return this._inst || (this._inst = new he()), this._inst;
      }
      static set inst(e) {
          this._inst = e;
      }
      get turntableFreetime() {
          return this._turntableFreetime;
      }
      set turntableFreetime(e) {
          (this._turntableFreetime = e), (y.instance.getPlayerInfo().turntableFreetime = e);
      }
      get turntableCnt() {
          return this._turntableCnt;
      }
      set turntableCnt(e) {
          e !== this._turntableCnt &&
              ((this._turntableCnt = e), (y.instance.getPlayerInfo().turntableCnt = e));
      }
      get turntableHasTakeIds() {
          return this._turntableHasTakeIds;
      }
      set turntableHasTakeIds(e) {
          e &&
              ((this._turntableHasTakeIds = e),
                  (y.instance.getPlayerInfo().turntableHasTakeIds = fx.Utils.cloneArray(e)));
      }
      addTakeId(e) {
          e &&
              (this.isHasTakeById(e) ||
                  (this.turntableHasTakeIds || (this.turntableHasTakeIds = []),
                      this.turntableHasTakeIds.push(e),
                      (y.instance.getPlayerInfo().turntableHasTakeIds = fx.Utils.cloneArray(this.turntableHasTakeIds))));
      }
      isHasTakeById(e) {
          return !!e && !!this.turntableHasTakeIds && -1 !== this.turntableHasTakeIds.indexOf(e);
      }
      get curTurntableCfgs() {
          if (!this._curTurntableCfgs) {
              this._curTurntableCfgs = {};
              for (let e = 0; e < le.FAN_NUM; ++e) {
                  let t = e + 1, i = this.cfg[t];
                  if (i) {
                      if ((Q.ONE_TIME === i.refresh.t || Q.DAILY === i.refresh.t) && this.isHasTakeById(i.id)) {
                          let e = i.refresh.replaceId;
                          i = this.cfg[e];
                      }
                      this._curTurntableCfgs[t] = i;
                  }
              }
          }
          return this._curTurntableCfgs;
      }
      set curTurntableCfgs(e) {
          this._curTurntableCfgs = e;
      }
      getTurntableCfgById(e) {
          return this.curTurntableCfgs[e];
      }
      get curTakeData() {
          if (!this._curTakeData) {
              this._curTakeData = {
                  t: void 0
              };
              for (let e in this.curTurntableCfgs) {
                  let t = this.curTurntableCfgs[e];
                  t &&
                      (Z.CNT & t.take.t &&
                          (Z.CNT !== this._curTakeData.t &&
                              this.turntableCnt === t.take.cnt &&
                              (this._curTakeData.t = Z.CNT),
                              this._curTakeData.data
                                  ? (!this._curTakeData.data.cfg.take.cnt ||
                                      t.take.cnt < this._curTakeData.data.cfg.take.cnt) &&
                                      (this._curTakeData.data = {
                                          cfg: t,
                                          fanId: Number(e)
                                      })
                                  : (this._curTakeData.data = {
                                      cfg: t,
                                      fanId: Number(e)
                                  })),
                          Z.WEIGHT & t.take.t &&
                              (this._curTakeData.t || (this._curTakeData.t = Z.WEIGHT),
                                  this._curTakeData.datas || (this._curTakeData.datas = []),
                                  this._curTakeData.datas.push({
                                      o: {
                                          cfg: t,
                                          fanId: Number(e)
                                      },
                                      weight: t.take.weight
                                  })));
              }
          }
          return this._curTakeData;
      }
      set curTakeData(e) {
          this._curTakeData = e;
      }
      getLasCntTurntableCfg() {
          if (!this.curTakeData.data)
              return;
          if (!this.turntableHasTakeIds || !this.turntableHasTakeIds.length)
              return;
          let e = this.curTakeData.data.cfg, t = void 0, i = void 0;
          for (let s = 0; s < this.turntableHasTakeIds.length; ++s) {
              let n = this.turntableHasTakeIds[s], a = this.cfg[n];
              a &&
                  (a.take ||
                      (a.take = {
                          t: 1,
                          weight: 4,
                          cnt: 1
                      }),
                      i
                          ? a.take.cnt < e.take.cnt && i < a.take.cnt && ((i = a.take.cnt), (t = a))
                          : ((i = a.take.cnt), (t = a)));
          }
          return t;
      }
      getLastCntTurntalbeCfgCnt() {
          let e = this.getLasCntTurntableCfg();
          return e ? e.take.cnt : 1;
      }
      onInit() {
          if (fx.UserLogic.instance.isFirstLogin())
              (this.turntableFreetime = 1), (this.turntableCnt = 1);
          else if (((this._turntableFreetime = y.instance.getPlayerInfo().turntableFreetime),
              (this._turntableCnt = y.instance.getPlayerInfo().turntableCnt),
              (this._turntableHasTakeIds = fx.Utils.cloneArray(y.instance.getPlayerInfo().turntableHasTakeIds)),
              !this.turntableCnt)) {
              this.turntableCnt = 1;
              for (let e in this.cfg) {
                  let t = this.cfg[e];
                  if (!t)
                      continue;
                  if (Q.FOREVER === t.refresh.t)
                      continue;
                  let i = this.rInst.getRewardCfgById(t.rewardId);
                  z.SKIN === i.t && x.inst.getSkinById(i.id)
                      ? (this.turntableCnt >= t.take.cnt && (this.turntableCnt = t.take.cnt),
                          this.addTakeId(t.id))
                      : z.COINS === i.t &&
                          x.inst.getCfgById(i.id) &&
                          (this.turntableCnt >= t.take.cnt && (this.turntableCnt = t.take.cnt),
                              this.addTakeId(t.id));
              }
          }
      }
      takeTurntable(e) {
          this.turntableFreetime > 0 && 0 != e && this.turntableFreetime--;
          let t = {
              t: this.curTakeData.t,
              cfg: void 0,
              fanId: void 0
          };
          if (Z.CNT === this.curTakeData.t)
              (t.cfg = this.curTakeData.data.cfg), (t.fanId = this.curTakeData.data.fanId);
          else {
              let e = fx.Utils.takeOneByWeight(this.curTakeData.datas)[1].o;
              (t.cfg = e.cfg), (t.fanId = e.fanId);
          }
          return (this.turntableCnt++,
              (this.curTakeData = void 0),
              (Q.DAILY !== t.cfg.refresh.t && Q.ONE_TIME !== t.cfg.refresh.t) ||
                  (this.addTakeId(t.cfg.id),
                      (this.curTurntableCfgs[t.fanId] = this.cfg[t.cfg.refresh.replaceId])),
              t);
      }
  }

  class ne {
      constructor(e = null, t = 0, i = 0) {
          (this.t = e), (this.id = t), (this.num = i);
      }
  }

  class TrySkinBreakingIceDialog extends ui.scenes.skin.TrySkinBreakingIceDialogUI {
      constructor(...e) {
          super(), e && ([this.from, this.callBack] = e), (this.skin = x.inst.getTryBreakingIceSkin());
      }
      onAdd() {
          if (!this.skin || 0 == this.skin.length)
              return void fx.SceneManager.closePanel(this);
          (this.skincfg = fx.Utils.randomInArrayEx(this.skin, 1)[0]),
              (this.trySkin = x.inst.getSkinById(this.skincfg.id));
          let e = y.instance.getPlayerInfo();
          (e.isBreakingIce = !0),
              this.initUI(),
              this.on(fx.SdkEvent.E_REWARD_GAIN, this, t => {
                  if (fx.SdkCode.REWARD_GAIN_SUCCESS === t.code &&
                      this.btn_getVideoReward['$_GID'] === t.gid) {
                      if ((x.inst.isOwnSkin(this.skincfg.id) || x.inst.unlockSkin(this.skincfg.id),
                          x.inst.isOwnSkin(this.skincfg.id))) {
                          this.openGetDialog(0), x.inst.clearCurTrySkin();
                          let t = x.inst.getCfgById(this.skincfg.id).type;
                          return (x.inst.setCurSkin(t, this.skincfg.id),
                              (e.isBreakingIce = !1),
                              void fx.SceneManager.closePanel(this));
                      }
                      {
                          let e = x.inst.getCfgById(this.skincfg.id).name;
                          fx.Utils.showTips(`获取"${e}"皮肤碎片成功`);
                      }
                      let t = x.inst.getCfgById(this.skincfg.id).type;
                      x.inst.setCurTrySkin(t, this.skincfg.id), fx.SceneManager.closePanel(this);
                  }
              }),
              this.btn_close.on(Laya.Event.CLICK, this, () => {
                  (e.isBreakingIce = !1), fx.SceneManager.closePanel(this);
              });
      }
      openGetDialog(e) {
          fx.SceneManager.closePanel(this);
          let t = new ne();
          (t.id = this.skincfg.id),
              fx.SceneManager.openPanel(RewardDialog, {
                  from: '',
                  userArgs: [t],
                  closeOther: !1
              });
      }
      onRemove() {
          this.callBack && this.callBack.run(),
              Laya.loader.clearTextureRes('res/atlas/res/trySkin.atlas');
      }
      initUI() {
          let e = x.inst.getSkinInfo(this.skincfg.id);
          this.label_videocnt.text = e
              ? `${this.skincfg.unlock.videoNum - e.videoCnt}`
              : `${this.skincfg.unlock.videoNum}`;
      }
      getTitle(e) {
          return x.inst.getCfgById(e).type, '';
      }
  }

  class TurntableDialog extends ui.scenes.turntable.TurntableDialogUI {
      constructor(...e) {
          super(), (this.cntCount = 0), ([this.from] = e);
      }
      static getRes() {
          let e = [], t = he.inst;
          for (let i in t.cfg) {
              let s = t.cfg[i];
              if (!s)
                  continue;
              let n = s.rewardIcon.url;
              -1 === e.indexOf(n) && e.push(n);
          }
          return e;
      }
      onAdd() {
          this.once(a.E_UI_CLOSE_TURNTABLE, this, () => {
              fx.SceneManager.closePanel(this);
          }),
              this.img_closeBtn.on(Laya.Event.CLICK, this, e => {
                  e.stopPropagation(), fx.SceneManager.closePanel(this);
              }),
              this.btn_close.on(Laya.Event.CLICK, this, e => {
                  e.stopPropagation(), fx.SceneManager.closePanel(this);
              }),
              this.img_freestartBtn.on(Laya.Event.CLICK, this, e => {
                  e.stopPropagation(),
                      this.startTake(!0),
                      (y.instance.getPlayerInfo().departureTime = fx.Utils.getTime()),
                      fx.EventCenter.instance.event(a.E_TIME_BEGIN, this);
              }),
              this.on(fx.SdkEvent.E_REWARD_GAIN, this, e => {
                  fx.SdkCode.REWARD_GAIN_SUCCESS === e.code && this.startTake(!1);
              }),
              this.getIcon(),
              this.updateCells(),
              this.updateBtns(),
              this.updateBar();
      }
      onRemove() {
          if (this.from && 'gameScene' == this.from) {
              let e = x.inst.getTryBreakingIceSkin();
              e &&
                  e.length > 0 &&
                  (fx.SceneManager.openPanel(TrySkinBreakingIceDialog, {
                      from: 'gameScene'
                  }),
                      (y.instance.getPlayerInfo().openTryBreakeIce = !1));
          }
      }
      onDestroy() {
          Laya.loader.clearTextureRes('res/atlas/res/turntable.atlas'),
              Laya.loader.clearTextureRes('res/atlas/res/gunIcon.atlas');
      }
      updateCells() {
          for (let e = 0; e < le.FAN_NUM; ++e)
              this.updateCell(e + 1);
      }
      updateCell(e) {
          let t = this.box_turntableFan.getChildByName(`cell_${e}`);
          if (!t)
              return;
          let i = he.inst.getTurntableCfgById(e);
          if (!i)
              return;
          let s = t.getChildAt(0);
          s && (s.scale(i.rewardIcon.scale, i.rewardIcon.scale), (s.skin = i.rewardIcon.url));
          let n = t.getChildAt(1);
          n &&
              ((n.text = i.rewardDes.text),
                  i.rewardDes.color && (n.color = i.rewardDes.color),
                  i.rewardDes.strokeColor && (n.strokeColor = i.rewardDes.strokeColor));
      }
      getIcon() {
          let e = he.inst, t = [];
          for (let i in e.cfg) {
              let s = e.cfg[i];
              s && 2 === s.take.t && t.push(s);
          }
          if (t.length > 0)
              if (1 === t.length) {
                  (this.icon_1.visible = !1), (this.box_bardes.visible = !1);
                  let e = this.icon_2.getChildAt(0);
                  (e.skin = t[0].rewardIcon.url), e.scale(t[0].rewardIcon.scale, t[0].rewardIcon.scale);
              }
              else {
                  let e = this.icon_1.getChildAt(0);
                  (e.skin = t[0].rewardIcon.url), e.scale(t[0].rewardIcon.scale, t[0].rewardIcon.scale);
                  let i = this.icon_2.getChildAt(0);
                  (i.skin = t[1].rewardIcon.url), i.scale(t[1].rewardIcon.scale, t[1].rewardIcon.scale);
              }
          for (let e = 0; e < t.length; e++) {
              let i = 0;
              i < t[e].take.cnt && (i = t[e].take.cnt), (this.cntCount = i);
          }
      }
      startTake(e) {
          (this.takeRes = he.inst.takeTurntable(e)),
              (this.box_turntableFan.rotation = 0),
              (this.turntableAngle =
                  this.box_turntableFan.rotation -
                      (360 * le.FAN_NUM + (this.takeRes.fanId - 1) * (360 / le.FAN_NUM))),
              (this.slowdownAngle = this.turntableAngle + 720),
              (this.rotationAngle = 19),
              (this.img_videostartBtn.mouseEnabled = !1),
              (this.img_freestartBtn.disabled = !0),
              (this.img_closeBtn.mouseEnabled = !1),
              (this.img_freestartBtn.disabled = !0),
              (this.btn_close.visible = !0),
              (this.btn_close.mouseEnabled = !1),
              fx.SoundManager.instance.playSound(s.SOUND_TURNTABLE_START),
              Laya.timer.once(2200, this, function () {
                  fx.SoundManager.instance.playSound(s.SOUND_TURNTABLE_END),
                      Laya.timer.once(300, this, function () {
                          fx.SoundManager.instance.stopSoundFx(s.SOUND_TURNTABLE_START);
                      });
              }),
              Laya.timer.frameLoop(1, this, this.turning), (this.rewardImg.visible = !1);
          console.log('ae. page...-激励广告');
      }
      turning() {
          this.box_turntableFan.rotation -= this.rotationAngle;
          for (let e = 0; e < le.FAN_NUM; e++)
              this.box_turntableFan.rotation > this.slowdownAngle - (720 / le.FAN_NUM) * (e + 1) &&
                  this.box_turntableFan.rotation <= this.slowdownAngle - (720 / le.FAN_NUM) * e &&
                  (this.rotationAngle = 16 - 2 * e);
          this.box_turntableFan.rotation <= this.turntableAngle &&
              (Laya.timer.clear(this, this.turning),
                  Laya.timer.once(500, this, () => {
                      this.updateCell(this.takeRes.fanId),
                          (this.img_videostartBtn.mouseEnabled = !0),
                          (this.img_freestartBtn.disabled = !1),
                          (this.img_freestartBtn.disabled = !1),
                          (this.img_closeBtn.mouseEnabled = !0),
                          (this.btn_close.mouseEnabled = !0),
                          this.updateBtns(),
                          this.updateBar();
                      let e = se.inst.getRewardTypeById(this.takeRes.cfg.rewardId);
                      if (z.SKIN === e) {
                          se.inst.addRewardById(this.takeRes.cfg.rewardId, 1);
                          let e = se.inst.getRewardCfgById(this.takeRes.cfg.rewardId);
                          fx.SceneManager.openPanel(RewardDialog, {
                              from: 'TurntableDialog',
                              userArgs: [
                                  e,
                                  () => {
                                      fx.SceneManager.openPanel(TurntableDialog);
                                  }
                              ],
                              closeOther: !1
                          }),
                              fx.SceneManager.closePanel(this);
                      }
                      else
                          z.COINS === e &&
                              fx.Effect.getPropEffect(this.box_turnplate, this.box_Coins, Laya.Handler.create(this, () => {
                                  se.inst.addRewardById(this.takeRes.cfg.rewardId, 1);
                              }));
                  }));
      }
      updateBtns() {
          he.inst.turntableFreetime > 0
              ? ((this.img_freestartBtn.disabled = !1),
                  (this.img_freestartBtn.disabled = !1),
                  (this.btn_close.visible = !1))
              : ((this.img_freestartBtn.disabled = !0),
                  (this.img_freestartBtn.disabled = !0),
                  (this.btn_close.visible = !0));
      }
      updateBar() {
          let e = he.inst.curTakeData;
          if (e.data) {
              let t = he.inst, i = [];
              for (let e in t.cfg) {
                  let s = t.cfg[e];
                  s && 2 === s.take.t && i.push(s);
              }
              let s = e.data.cfg.take.cnt - he.inst.turntableCnt;
              0 === s
                  ? ((this.label_barTimeDes.value = `${s + 1}`),
                      fx.Effect.breathEff(this.img_barHead, 2500, 1.2, !0))
                  : ((this.label_barTimeDes.value = `${s + 1}`), Laya.Tween.clearAll(this.img_barHead));
              let n = (he.inst.turntableCnt - 1) / this.cntCount;
              (this.img_bar.width = 0 !== n ? this.box_bar.get_width() * n : 0.1),
                  (this.icon_1.x =
                      this.box_bar.x +
                          this.box_bar.width * (i[0].take.cnt / this.cntCount) -
                          this.icon_1.width / 2);
          }
          else
              this.bar_box.visible = !1;
      }
  }

  class SignInDialog extends ui.scenes.signIn.SignInDialogUI {
      constructor(...e) {
          super(), (this.flyCoinsFlag = !1), (this.isModal = !1), ([this.from] = e);
      }
      static getRes() {
          let e = [], t = ae.inst;
          for (let i in t.cfg) {
              let s = t.cfg[i];
              if (!s)
                  continue;
              let n = s.rewardIcon.url;
              -1 === e.indexOf(n) && e.push(n),
                  (n = s.defaultRewardIcon.url),
                  -1 === e.indexOf(n) && e.push(n);
          }
          return e;
      }
      onAdd() {
          this.img_close.on(Laya.Event.CLICK, this, function (e) {
              e.stopPropagation(), ae.inst.signInToday || this.getReward(), this.closePanel();
          }),
              this.updateCoins(),
              this.updateList(),
              this.updateBtns(),
              this.customInitUI();
      }
      onRemove() {
          this.from &&
              'gameScene' == this.from &&
              fx.SceneManager.openPanel(TurntableDialog, {
                  from: 'gameScene'
              });
      }
      onDestroy() {
          Laya.loader.clearTextureRes('res/atlas/res/signIn.atlas');
      }
      closePanel() {
          this.flyCoinsFlag
              ? Laya.timer.once(700, this, function () {
                  this.closePanel();
              })
              : fx.SceneManager.closePanel(this);
      }
      updateCoins() {
          y.instance.getPlayerInfo().coins;
      }
      updateList() {
          (this.img_rewardTips.visible = !1),
              this.list_day['reg']
                  ? (this.list_day.refresh(), this.updateListItem(this.box_day7, 6))
                  : ((this.list_day['reg'] = !0),
                      (this.list_day.hScrollBarSkin = ''),
                      (this.list_day.repeatX = 4),
                      (this.list_day.repeatY = 2),
                      (this.list_day.array = [1, 4, 2, 5, 3, 6]),
                      (this.list_day.renderHandler = new Laya.Handler(this, this.updateListItem)),
                      (this.box_day7.dataSource = 7),
                      this.updateListItem(this.box_day7, 6));
      }
      updateListItem(e, t) {
          e.reg ||
              ((e.reg = !0),
                  e.scale(0, 0),
                  Laya.timer.once(100 * t, this, function () {
                      new fx.Sequence([
                          {
                              t: 'to',
                              target: e,
                              props: {
                                  scaleX: 1.1,
                                  scaleY: 1.1
                              },
                              duration: 300
                          },
                          {
                              t: 'to',
                              target: e,
                              props: {
                                  scaleX: 1,
                                  scaleY: 1
                              },
                              duration: 200,
                              complete: this.showRewardTips.bind(this, e),
                              completeCaller: this
                          }
                      ]).run();
                  }));
          let i = e.dataSource;
          if (null === i)
              return void (e.visible = !1);
          let s, n = ae.inst.getSignInCurDay(), a = ae.inst.signInToday, r = ae.inst.getSignInInfoByDay(i);
          7 != i && (s = e.getChildByName('img_dayBg'));
          let o, l = e.getChildByName('img_iconBG');
          if (l) {
              let t = ge.signIn_other_bgUrl;
              i < n
                  ? (e.alpha = 0.5)
                  : i === n
                      ? ((t = ge.signIn_cur_bgUrl),
                          s && (s.skin = ge.signIn_day_bgUrl),
                          7 === i && (t = ge.signIn_cur7_bgUrl))
                      : ((t = ge.signIn_other_bgUrl),
                          s && (s.skin = ge.signIn_otherDay_bgUrl),
                          7 === i && (t = ge.signIn_other7_bgUrl)),
                  (l.source = Laya.loader.getRes(t));
          }
          if (r) {
              let t = e.getChildByName('img_icon');
              t && ((t.skin = r.rewardIcon.url), t.scale(r.rewardIcon.scale, r.rewardIcon.scale));
              let i = e.getChildByName('label_des');
              if (i)
                  if (se.inst.getRewardTypeById(r.rewardId) == z.COINS)
                      i.value = r.rewardDes;
                  else {
                      e.getChildByName('label_des').text = r.rewardDes;
                  }
          }
          (o = 7 !== i ? s.getChildByName('label_day') : e.getChildByName('label_day')) &&
              (o.text = `Day ${i}`);
          let h = e.getChildByName('img_select');
          h &&
              (n > i
                  ? ((h.visible = !0), (o.visible = !1))
                  : n === i
                      ? ((h.visible = a), (o.visible = !a))
                      : (h.visible = !1));
      }
      updateBtns() {
          ae.inst.signInToday
              ? ((this.label_noGain.visible = !0),
                  (this.label_getBtn.visible = !1),
                  (this.img_getBtn.visible = !1),
                  (this.img_videoGetBtn.visible = !1))
              : ((this.label_noGain.visible = !1),
                  (this.img_videoGetBtn.visible = !0),
                  ae.inst.isSkinTypeRewardCurDay()
                      ? ((this.label_getBtn.text = '只拿皮肤!'),
                          (this.label_videoBtnText.text = '还要钻石!'),
                          (this.img_videoGetBtn.skin = 'res/signIn/img_23.png'))
                      : ((this.label_getBtn.text = '领取'),
                          (this.label_videoBtnText.text = '双倍领取'),
                          (this.img_videoGetBtn.skin = 'res/signIn/img_24.png')),
                  this.label_getBtn.visible &&
                      !this.label_getBtn['reg'] &&
                      ((this.label_getBtn['reg'] = !0),
                          this.label_getBtn.on(Laya.Event.CLICK, this, function (e) {
                              e.stopPropagation(), this.getReward();
                          })),
                  this.img_getBtn.visible &&
                      !this.img_getBtn['reg'] &&
                      ((this.img_getBtn['reg'] = !0),
                          this.img_getBtn.on(Laya.Event.CLICK, this, function (e) {
                              e.stopPropagation(), this.getReward();
                          })),
                  this.img_videoGetBtn.visible &&
                      !this.img_videoGetBtn['reg'] &&
                      ((this.img_videoGetBtn['reg'] = !0),
                          this.on(fx.SdkEvent.E_REWARD_GAIN, this, function (e) {
                              fx.SdkCode.REWARD_GAIN_SUCCESS === e.code && this.getReward(!0);
                          })));
      }
      getReward(e = !1) {
          let t = () => {
              this.flyCoinsFlag = !0;
              let e = new Laya.Point(Laya.stage.width / 2, Laya.stage.height / 2);
              fx.Effect.getPropEffect(e, this.box_Coins, Laya.Handler.create(this, function () {
                  this.updateCoins(), (this.flyCoinsFlag = !1);
              }));
          }, i = ae.inst.signIn(e);
          if (X.E_SIGNIN_SUCCESS === i) {
              let i = ae.inst.getSignInInfoCurDay(), s = se.inst.getRewardTypeById(i.rewardId);
              if (s === z.COINS)
                  t();
              else {
                  if (s === z.SKIN) {
                      let e = se.inst.getRewardCfgById(i.rewardId);
                      return (x.inst.unlockSkin(e.id),
                          fx.SceneManager.openPanel(RewardDialog, {
                              from: '',
                              userArgs: [e],
                              closeOther: !1
                          }),
                          void fx.SceneManager.closePanel(this));
                  }
                  if (s === z.UNKNOWN) {
                      e && t();
                      let s = se.inst.getRewardCfgById(i.rewardId);
                      re.instance.addFragment(s.id, s.num);
                  }
              }
              this.updateList(), this.updateBtns();
          }
          else
              X.E_SIGNIN_REPEAT === i && fx.Utils.showTips('今日已经签过到啦！！！');
      }
      showRewardTips(e) {
          let t = e.dataSource, i = ae.inst.getSignInCurDay();
          if (!ae.inst.signInToday && i == t) {
              this.img_rewardTips.visible = !0;
              let t = e.localToGlobal(new Laya.Point(36, -6));
              (t = this.img_rewardTips.parent['globalToLocal'](t)),
                  this.img_rewardTips.pos(t.x, t.y + 20),
                  new fx.Sequence([
                      {
                          t: 'to',
                          target: this.img_rewardTips,
                          props: {
                              rotation: -10
                          },
                          duration: 400,
                          ease: null
                      },
                      {
                          t: 'to',
                          target: this.img_rewardTips,
                          props: {
                              rotation: 10
                          },
                          duration: 800,
                          ease: null
                      },
                      {
                          t: 'to',
                          target: this.img_rewardTips,
                          props: {
                              rotation: 0
                          },
                          duration: 400,
                          ease: null
                      }
                  ], !0).run();
          }
      }
      customInitUI() { }
  }

  class TrySkinNumDialog extends ui.scenes.skin.TrySkinNumDialogUI {
      constructor(...e) {
          super(), (this.trySkinCfg = void 0), ([this.from, this.callBack, this.trySkinId] = e);
      }
      onAdd() {
          if ((this.trySkinId && (this.trySkinCfg = x.inst.getCfgById(this.trySkinId)), !this.trySkinCfg)) {
              let e = x.inst.getlockedTryList();
              if (!e || 0 === e.length)
                  return void this.closeSelf();
              this.trySkinCfg = e[0];
          }
          this.trySkinCfg
              ? (this.updateUI(),
                  this.img_closeBtn.on(Laya.Event.CLICK, this, () => {
                      let e = y.instance.getPlayerInfo();
                      (e.closeTryNum = e.closeTryNum + 1), this.closeSelf();
                  }),
                  this.btn_free.on(Laya.Event.CLICK, this, () => {
                      this.trySuccess();
                  }),
                  this.on(fx.SdkEvent.E_SHARE_RESULT, this, e => {
                      e.code == fx.SdkCode.SHARE_SUCCESS && this.trySuccess();
                  }),
                  this.on(fx.SdkEvent.E_REWARD_GAIN, this, e => {
                      fx.SdkCode.REWARD_GAIN_SUCCESS === e.code &&
                          ((this.img_tryBtn['$_GID'] !== e.gid && this.btn_reTry['$_GID'] !== e.gid) ||
                              this.trySuccess());
                  }),
                  this.updateSkin3D())
              : this.closeSelf();
      }
      trySuccess() {
          console.log('获得一次皮肤碎片,激励广告');
          let e = y.instance.getPlayerInfo();
          (e.trySkinNum = e.trySkinNum + 1),
              x.inst.unlockSkin(this.trySkinCfg.id),
              x.inst.clearCurTrySkin(),
              x.inst.isOwnSkin(this.trySkinCfg.id)
                  ? x.inst.setCurSkin(this.trySkinCfg.type, this.trySkinCfg.id)
                  : x.inst.setCurTrySkin(this.trySkinCfg.type, this.trySkinCfg.id),
              fx.Utils.showTips('获得一次皮肤碎片'),
              this.closeSelf();
      }
      closeSelf() {
          (this.box_scene3d.visible = !1),
              this.box_scene3d.destroyChildren(),
              fx.SceneManager.closePanel(this);
      }
      updateUI() {
          let e = x.inst.getSkinInfo(this.trySkinCfg.id), t = 0;
          e && (t = e.videoCnt), (this.label_num.value = `${t}/${this.trySkinCfg.unlock.videoNum}`);
          let i = y.instance.getPlayerInfo();
          0 != i.trySkinNum
              ? (fx.UserLogic.instance.isNewDay() && (i.closeTryNum = 0),
                  'gameScene' == this.from ? (this.btn_reTry.visible = !0) : (this.img_tryBtn.visible = !0),
                  (this.img_closeBtn.visible = !0))
              : (this.btn_free.visible = !0);
      }
      onRemove() {
          this.callBack && this.callBack.run();
      }
      createScene3d() {
          (this.scene3d = new Laya.Scene3D()), this.box_scene3d.addChild(this.scene3d);
          let e = new Laya.Camera();
          (e.clearFlag = Laya.BaseCamera.CLEARFLAG_DEPTHONLY),
              e.transform.translate(new Laya.Vector3(0, 0.05, 1), !1),
              (e.normalizedViewport = this.getViewPort()),
              e.transform.rotate(new Laya.Vector3(0, 0, 0), !0, !1),
              this.scene3d.addChild(e);
          var t = this.scene3d.addChild(new Laya.DirectionLight());
          t.color = new Laya.Vector3(1, 1, 1);
          var i = t.transform.worldMatrix;
          i.setForward(new Laya.Vector3(-0.25, -1, -1)), (t.transform.worldMatrix = i);
      }
      getViewPort() {
          let e = this.box_scene3d.width;
          isNaN(this.box_scene3d.left) ||
              isNaN(this.box_scene3d.right) ||
              (e = Laya.stage.width - this.box_scene3d.left - this.box_scene3d.right);
          let t = this.box_scene3d.height;
          isNaN(this.box_scene3d.top) ||
              isNaN(this.box_scene3d.bottom) ||
              (t = Laya.stage.height - this.box_scene3d.top - this.box_scene3d.bottom);
          let i = this.box_scene3d.x;
          isNaN(this.box_scene3d.left) || (i = this.box_scene3d.left);
          let s = this.box_scene3d.y;
          return (isNaN(this.box_scene3d.top)
              ? isNaN(this.box_scene3d.bottom)
                  ? isNaN(this.box_scene3d.centerY) ||
                      (s = Laya.stage.height / 2 + this.box_scene3d.centerY - t / 2)
                  : (s = Laya.stage.height - this.box_scene3d.bottom - t)
              : (s = this.box_scene3d.top),
              new Laya.Viewport(i / Laya.stage.width, s / Laya.stage.height, e / Laya.stage.width, t / Laya.stage.height));
      }
      updateSkin3D() {
          this.scene3d || this.createScene3d();
          let t = this.trySkinCfg;
          t &&
              Laya.Sprite3D.load(t.model, Laya.Handler.create(this, i => {
                  if (!i)
                      return;
                  this.roleSp && (this.roleSp.removeSelf(), (this.roleSp = void 0)),
                      (this.roleSp = i.clone());
                  let s = t.displayScale;
                  s || (s = 0.5);
                  let n = R.convertPos(t.displayPosition);
                  n || (n = new Laya.Vector3(0, -0.3, 0)),
                      (this.roleSp.transform.position = n),
                      this.roleSp.transform.setWorldLossyScale(new Laya.Vector3(s, s, s)),
                      this.scene3d.addChild(this.roleSp),
                      fx.Helper.rotateAnim(this.roleSp, 360, 10, 0, 'y', !0);
                  this.roleSp.getComponent(Laya.Animator);
                  R.handlePlayerModel(this.roleSp);
              }));
      }
  }

  class SkinDialog extends ui.scenes.skin.SkinDialogUI {
      constructor() {
          super(), (this.gidMap = {}), (this.canRandom = !0), (this.selectIndex = 0);
      }
      onAdd() {
          this.initUI(),
              this.updateSkin3D(),
              this.btn_back.on(Laya.Event.CLICK, this, e => {
                  e.stopPropagation(), this.closePanel();
              }),
              this.on(fx.SdkEvent.E_REWARD_GAIN, this, e => {
                  if (fx.SdkCode.REWARD_GAIN_SUCCESS === e.code)
                      if (this.btn_getcoins['$_GID'] === e.gid)
                          y.instance.getPlayerInfo().addCoins(this.getVideoReward()),
                              fx.Effect.getPropEffect(this.btn_getcoins, this.box_Coins),
                              fx.Utils.showTips(`获得${this.getVideoReward()}金币`), console.log('skinDialog, 商城看视频获取金币...');
                      else if (this.unlockInfo === e.gid) {
                      }
                      else {
                          let t = this.gidMap[e.gid];
                          if (t && this.curTouchBoxVideo && this.curTouchBoxVideo.$_GID === e.gid) {
                              fx.Utils.showTips('恭喜获得碎片!'), x.inst.unlockSkin(t.id), console.log('skinDialog, 恭喜获得碎片...');
                              let e = this.getItem(t);
                              e &&
                                  e.dataSource &&
                                  e.dataSource.type == t.type &&
                                  e.dataSource.id == t.id &&
                                  (x.inst.isOwnSkin(t.id) && x.inst.setCurSkin(this.curselectTab, t.id),
                                      this.updateItem(e));
                          }
                      }
              }),
              this.on(_.E_SKIN_CHANGE, this, this.onChangeSkin),
              this.btn_random.on(Laya.Event.CLICK, this, this.onClickRandom);
      }
      onDestroy() {
          Laya.loader.clearTextureRes('res/atlas/res/iconSkin.atlas'),
              this.off(_.E_SKIN_CHANGE, this, this.onChangeSkin);
      }
      closePanel() {
          fx.SceneManager.popView();
      }
      initUI() {
          (this.curselectTab = C.Player), this.initTab(), this.updateListTabsUI(!0), this.updateUI();
      }
      updateUI() {
          (this.btn_getcoins.getChildByName('text_coins')['value'] = this.getVideoReward() + ''),
              (this.btn_random.getChildByName('text_coins')['value'] = this.getRandomCost() + ''),
              0 == x.inst.getLockedSkinList(this.curselectTab, I.COINS).length
                  ? ((this.btn_random.visible = !1), (this.btn_getcoins.centerX = 0))
                  : ((this.btn_random.visible = !0), (this.btn_getcoins.centerX = 175));
      }
      initTab() {
          let e = [];
          for (let t in C)
              'Bridge' !== t && 'Spiderweb' !== t && t && e.push(C[t]);
          if (!e)
              return;
          (this.list_tabs.hScrollBarSkin = ''),
              (this.list_tabs.repeatX = e.length),
              (this.list_tabs.repeatY = 1),
              (this.list_tabs.array = e),
              (this.list_tabs.renderHandler = new Laya.Handler(this, this.updateTabItem));
          let t = new Laya.Box();
          (t.dataSource = this.curselectTab), this.updateSkinListByType(t);
      }
      updateTabItem(e) {
          if (!e.dataSource)
              return;
          (e.getChildByName('img_icon').skin = ye[e.dataSource]),
              e.reg ||
                  ((e.reg = !0),
                      e.on(Laya.Event.CLICK, this, e => {
                          e.stopPropagation(), this.updateSkinListByType(e.target);
                      }));
      }
      updateListTabsUI(e = !1) {
          if (e) {
              for (let e of this.list_tabs.cells) {
                  let t = e.getChildByName('img_unselected');
                  (e.getChildByName('img_selected')['visible'] = !1), (t.visible = !0);
              }
              let e = this.list_tabs.cells[0], t = e.getChildByName('img_unselected');
              (e.getChildByName('img_selected')['visible'] = !0), (t.visible = !1);
          }
          else
              for (let e of this.list_tabs.cells) {
                  let t = e.getChildByName('img_unselected'), i = e.getChildByName('img_selected');
                  e.dataSource === this.curselectTab
                      ? ((i.visible = !0), (t.visible = !1))
                      : ((i.visible = !1), (t.visible = !0));
              }
      }
      updateSkinListByType(e) {
          x.inst;
          (this.curselectTab = e.dataSource), this.updateListTabsUI(), this.updateUI();
          let t = x.inst.getSkinList(e.dataSource);
          t &&
              (this.updateSkin3D(),
                  this.list_list.array && this.list_list.array['clear'](),
                  this.datasSort(t),
                  (this.list_list.vScrollBarSkin = ''),
                  (this.list_list.repeatX = 3),
                  (this.list_list.repeatY = Math.ceil(t.length / 3)),
                  (this.list_list.array = t),
                  (this.list_list.renderHandler = new Laya.Handler(this, this.updateItem)));
      }
      datasSort(e) {
          e = e.sort((e, t) => (e.order < t.order ? -1 : e.order > t.order ? 1 : void 0));
      }
      updateItem(e) {
          if (!e.dataSource)
              return;
          this.canRandom || (e.visible = !1), (e.visible = !0);
          let i = this.curselectTab, s = e.getChildByName('img_locked'), n = e.getChildByName('img_using'), a = e.getChildByName('img_icon'), r = e.getChildByName('img_iconBg'), o = e.dataSource, l = x.inst.getSkinInfo(o.id);
          (s.visible = !1),
              x.inst.isCurSkin(i, o.id)
                  ? ((n.visible = !0), (r.skin = ye.iconBg_using))
                  : ((r.skin = ye.iconBg_not), (n.visible = !1)),
              (a.visible = !0),
              (a.skin = o.icon),
              x.inst.isCurSkin(i, o.id) && (this.curItem = e),
              this.updateUnlockUI(e, o, l),
              e.reg ||
                  ((e.reg = !0),
                      e.on(Laya.Event.CLICK, this, e => {
                          e.stopPropagation(), this.onClickItem(this.curselectTab, e.target);
                      }),
                      e.on(Laya.Event.MOUSE_DOWN, this, e => {
                          this.curTouchBoxVideo = e.target;
                      }));
      }
      updateUnlockUI(e, t, i) {
          let s = t.unlock, n = e.getChildByName('box_video'), a = n.$_GID, r = e.getChildByName('img_des'), o = e.getChildByName('img_video'), l = e.getChildByName('img_fragment'), h = e.getChildByName('img_share'), d = e.getChildByName('img_locked'), c = e.getChildByName('img_coins'), g = e.getChildByName('img_unlocked'), f = e.getChildByName('img_try'), u = e.getChildByName('img_tryIce'), S = e.getChildByName('img_compose');
          if (((n.visible = !1),
              (r.visible = !1),
              (o.visible = !1),
              (l.visible = !1),
              (h.visible = !1),
              (c.visible = !1),
              (g.visible = !1),
              (f.visible = !1),
              (S.visible = !1),
              (u.visible = !1),
              x.inst.isOwnSkin(t.id) || x.inst.isTryTimeSkin(t.id)))
              return ((this.gidMap[a] = null),
                  (d.visible = !1),
                  void (x.inst.isTryTimeSkin(t.id) && !x.inst.isCurSkin(t.type, t.id) && (S.visible = !0)));
          d.visible = !0;
          let y = this.getUnlockDes(s.way), m = I.STAGEPROGRESS == s.way && x.inst.isStageSkinFinish(t.id);
          if (I.VIDEO == s.way || m) {
              (n.visible = !0), (o.visible = !0);
              let e, s = 0;
              i && (s = i.videoCnt),
                  (e = m ? '0/1' : `${s}/${t.unlock.videoNum}`),
                  (o.getChildByName('text_des').text = e),
                  (this.gidMap[a] = t);
          }
          else if (I.TRY == s.way) {
              f.visible = !0;
              let e = 0;
              i && (e = i.videoCnt);
              let s = `Try${e}/${t.unlock.videoNum}`;
              (f.getChildByName('text_des').text = s), (this.gidMap[a] = t);
          }
          else if (I.ICEBREAK == s.way) {
              x.inst.isOwnSkin(t.id) || (u.visible = !0);
              let e = 0;
              i && (e = i.videoCnt);
              let s = `视频解锁${e}/${t.unlock.videoNum}`;
              (u.getChildByName('text_des').text = s), (this.gidMap[a] = t);
          }
          else if (y) {
              (r.visible = !0), (r.getChildByName('text_des').text = y);
          }
          else if (I.FRAGMENT == s.way) {
              (l.visible = !0),
                  (l.getChildByName('progressBar').value = re.instance.getFragmentPercent(t.id));
              let e = l.getChildByName('text_des'), i = t.unlock.num, s = re.instance.getFragmentCount(t.id);
              (s = Math.min(s, i)), (e.text = `${s}/${i}`);
          }
          else if (I.UGCSHARE == s.way) {
          }
          else if (I.COINS == s.way) {
              c.visible = !0;
              let e = c.getChildByName('box_price').getChildByName('text_des'), i = x.inst.getSkinPrice(t.id);
              e.text = `${i}`;
          }
      }
      getUnlockDes(e) {
          return {
              [I.SIGNIN]: 'Sign In',
              [I.TURNTABLE]: 'Wheel',
              [I.STAGEPROGRESS]: 'Stage',
              [I.ACTIVITY]: 'Event Unlock',
              [I.STAGE_ID]: 'Stage',
              [I.EGG_LEVEL]: 'Egg',
              [I.MAZE]: 'Maze',
              [I.CARD]: 'Gacha',
              [I.LOTTERY]: 'Chest'
          }[e];
      }
      onClickItem(e, t) {
          let i = t.dataSource;
          if (!i)
              return;
          if (!x.inst.isOwnSkin(i.id) && !x.inst.isTryTimeSkin(i.id)) {
              if (i.unlock.way === I.COINS) {
                  let e = x.inst.getSkinInfo(i.id);
                  this.buySkin(t, i.id, i, e);
              }
              else if (I.TRY == i.unlock.way) {
                  let e = Laya.Handler.create(this, this.updateItem, [t]);
                  fx.SceneManager.openPanel(TrySkinNumDialog, {
                      from: '',
                      userArgs: [e, i.id]
                  });
              }
              else if (I.TURNTABLE == i.unlock.way)
                  fx.SceneManager.openPanel(TurntableDialog, {
                      from: ''
                  });
              else
                  I.SIGNIN == i.unlock.way
                      ? fx.SceneManager.openPanel(SignInDialog, {
                          from: ''
                      })
                      : fx.Utils.showTips('还未解锁该皮肤!');
              return;
          }
          if (x.inst.isCurSkin(e, i.id))
              return;
          let s = x.inst.getCurSkinCfg(e);
          if ((x.inst.setCurSkin(e, i.id), this.updateItem(t), null != s)) {
              let e = this.getItem(s);
              e && this.updateItem(e);
          }
      }
      refreshCells() {
          for (let e of this.list_list.cells)
              this.updateItem(e);
      }
      getItem(e) {
          if (!e)
              return null;
          return this.list_list.cells.filter((t, i, s) => {
              let n = t.dataSource;
              return !!n && n.id === e.id;
          }, this)[0];
      }
      buySkin(e, t, i, s) {
          let n = x.inst.getSkinPrice(t);
          n &&
              null != n &&
              (y.instance.getPlayerInfo().coins < n
                  ? fx.Utils.showTips('金币不足')
                  : (x.inst.unlockSkin(t),
                      y.instance.getPlayerInfo().useCoins(n),
                      this.updateUnlockUI(e, i, s),
                      fx.Utils.showTips('皮肤解锁成功!')));
      }
      onChangeSkin() {
          this.curItem && this.curItem.dataSource && this.updateItem(this.curItem),
              this.timer.once(100, this, () => {
                  let e = x.inst.getCurSkinCfg(this.curselectTab), t = this.getItem(e);
                  t && this.updateItem(t), this.updateSkin3D();
              });
      }
      getVideoReward() {
          return m.instance.getGameConstants().videoGetCoin;
      }
      onClickRandom() {
          if (!y.instance.coinsEnough(this.getRandomCost()))
              return void fx.Utils.showTips('金币不足');
          let e = x.inst.getLockedSkinList(this.curselectTab), t = [];
          for (const i of e)
              i.unlock.way === I.COINS && t.push(i);
          if (!t || 0 == t.length)
              return;
          y.instance.useCoins(this.getRandomCost());
          let i = t[fx.Utils.getIntRandom(0, t.length - 1)].id;
          x.inst.unlockSkin(i), fx.Utils.showTips('解锁成功!'), this.updateUI(), this.list_list.refresh();
      }
      getRandomCost() {
          let e, t, i = m.instance.getGameConstants();
          t = x.inst.getLockedSkinList(this.curselectTab, I.COINS);
          let s = (e = x.inst.getUnLockedSkinList(this.curselectTab, I.COINS)).length;
          return i.buySkinGem + i.buySkinGemAdd * s;
      }
      updateTryTimeUI(e) {
          let t = e.getChildByName('img_tryTime').getChildByName('label_tryTime'), i = e.getChildByName('img_videoComp').getChildByName('label_video'), s = x.inst.getSkinInfo(e.dataSource.id), n = x.inst.getCfgById(e.dataSource.id);
          n.unlock.tryTime &&
              s &&
              s.videoCnt &&
              ((i.text = `${s.videoCnt}/${n.unlock.videoNum}`),
                  x.inst.isTryTimeSkin(n.id) &&
                      !x.inst.isOwnSkin(n.id) &&
                      (this.updateTryTime(e, s.endTryTime),
                          t.clearTimer(this, this.updateTryTime),
                          t.timerLoop(1e3, this, this.updateTryTime, [e, s.endTryTime])));
      }
      updateTryTime(e, t) {
          let i = e.getChildByName('img_tryTime'), s = i.getChildByName('label_tryTime');
          if (t) {
              let e = 1e3 * t - Date.now();
              e = Math.max(e, 0);
              let n = fx.Utils.timestampToTime(e, {
                  separator: [':', ':', ''],
                  isAlign: !0
              });
              (s.text = n), (i.visible = !0), e || (i.visible = !1);
          }
          else
              i.visible = !1;
      }
      createScene3d() {
          (this.scene3d = new Laya.Scene3D()), this.box_scene3d.addChild(this.scene3d);
          let e = new Laya.Camera();
          (e.clearFlag = Laya.BaseCamera.CLEARFLAG_DEPTHONLY),
              e.transform.translate(new Laya.Vector3(0, 0.05, 2), !1),
              (e.normalizedViewport = this.getViewPort()),
              e.transform.rotate(new Laya.Vector3(0, 0, 0), !0, !1),
              this.scene3d.addChild(e);
          var t = this.scene3d.addChild(new Laya.DirectionLight());
          t.color = new Laya.Vector3(1, 1, 1);
          var i = t.transform.worldMatrix;
          i.setForward(new Laya.Vector3(-0.25, -1, -1)), (t.transform.worldMatrix = i);
      }
      getViewPort() {
          let e = this.box_scene3d.width;
          isNaN(this.box_scene3d.left) ||
              isNaN(this.box_scene3d.left) ||
              (e = Laya.stage.width - this.box_scene3d.left - this.box_scene3d.right);
          let t = this.box_scene3d.height;
          isNaN(this.box_scene3d.top) ||
              isNaN(this.box_scene3d.bottom) ||
              (t = Laya.stage.height - this.box_scene3d.top - this.box_scene3d.bottom);
          let i = this.box_scene3d.x;
          isNaN(this.box_scene3d.left) || (i = this.box_scene3d.left);
          let s = this.box_scene3d.y;
          return (isNaN(this.box_scene3d.top)
              ? isNaN(this.box_scene3d.bottom) || (s = Laya.stage.height - this.box_scene3d.bottom - t)
              : (s = this.box_scene3d.top),
              new Laya.Viewport(i / Laya.stage.width, s / Laya.stage.height, e / Laya.stage.width, t / Laya.stage.height));
      }
      updateSkin3D() {
          this.canRandom ? (this.box_scene3d.visible = !0) : (this.box_scene3d.visible = !1),
              this.scene3d || this.createScene3d();
          let t = x.inst, i = this.curselectTab, s = t.getCurSkinCfg(i);
          s
              ? Laya.Sprite3D.load(s.model, Laya.Handler.create(this, t => {
                  this.roleSp && (this.roleSp.removeSelf(), (this.roleSp = void 0)),
                      (this.roleSp = t.clone()),
                      this.scene3d.addChild(this.roleSp);
                  let i = this.roleSp.transform.localScaleX;
                  (i *= 1.5),
                      this.roleSp.transform.setWorldLossyScale(new Laya.Vector3(i, i, i)),
                      (this.roleSp.transform.position = new Laya.Vector3(0, -0.8, -0.6)),
                      fx.Helper.rotateAnim(this.roleSp, 360, 10, 0, 'y', !0),
                      R.handlePlayerModel(this.roleSp),
                      (this.roleSp.name = 'ironman') && R.stopParticleSpEx(this.roleSp);
              }))
              : (this.box_scene3d.visible = !1);
      }
  }

  class GameSceneUiScript extends Laya.Script {
      constructor() {
          super();
      }
      onEnable() {
          fx.Utils.bindScriptVarByName(this),
              this.regBtn(),
              this.popup(),
              fx.EventCenter.instance.on(a.E_GAME_STATE_CHANGED, this, this.onGameStateChange),
              fx.EventCenter.instance.on(fx.BaseEvent.E_PANEL_OPENCLOSE, this, e => {
                  if (fx.BaseCode.PANEL_CLOSE === e.code) {
                      e.name;
                      let t = x.inst.getTryBreakingIceSkin();
                      (t && 0 != t.length) || (this.img_trybreakIce.visible = !1);
                  }
                  else
                      fx.BaseCode.VIEW_CLOSE, e.code;
              }),
              fx.EventCenter.instance.on(a.E_COLLECT_KEY, this, this.onCollectKey);
      }
      onDisable() {
          fx.EventCenter.instance.offAllCaller(this);
      }
      regBtn() {
          if ((this.img_turnable.on(Laya.Event.CLICK, this, function (e) {
              e.stopPropagation();
              fx.SceneManager.openPanel(TurntableDialog);
          }),
              this.img_signIn.on(Laya.Event.CLICK, this, function (e) {
                  e.stopPropagation(), fx.SceneManager.openPanel(SignInDialog);
              }),
              this.img_shop.on(Laya.Event.CLICK, this, function (e) {
                  e.stopPropagation(), fx.SceneManager.pushView(SkinDialog);
              }),
              this.img_setting &&
                  this.img_setting.on(Laya.Event.CLICK, this, () => {
                      fx.SceneManager.openPanel(SettingDialog);
                  }),
              this.img_super &&
                  this.owner.on(fx.SdkEvent.E_REWARD_GAIN, this, e => {
                      if (e.code == fx.SdkCode.REWARD_GAIN_SUCCESS && e.gid === this.img_super.$_GID) {
                          let e = m.instance.player;
                          if (e) {
                              e.getComponent(B);
                          }
                      }
                  }),
              this.img_welfareSide &&
                  this.img_welfareSide.on(Laya.Event.CLICK, this, e => {
                      e.stopPropagation();
                      let t = this.img_welfareSide.getChildByName('img_arrow');
                      -280 == this.img_welfareSide.left
                          ? (Laya.Tween.to(t, {
                              rotation: 180
                          }, 150, null),
                              (this.img_welfareSide.mouseEnabled = !1),
                              Laya.Tween.to(this.img_welfareSide, {
                                  left: 0
                              }, 150, null, Laya.Handler.create(this, () => {
                                  this.img_welfareSide.mouseEnabled = !0;
                              })))
                          : 0 == this.img_welfareSide.left &&
                              (Laya.Tween.to(t, {
                                  rotation: 0
                              }, 150, null),
                                  (this.img_welfareSide.mouseEnabled = !1),
                                  Laya.Tween.to(this.img_welfareSide, {
                                      left: -280
                                  }, 150, null, Laya.Handler.create(this, () => {
                                      this.img_welfareSide.mouseEnabled = !0;
                                  })));
                  }),
              this.img_activitySide &&
                  this.img_activitySide.on(Laya.Event.CLICK, this, e => {
                      e.stopPropagation(),
                          -540 == this.img_activitySide.left
                              ? ((this.img_activitySide.mouseEnabled = !1),
                                  Laya.Tween.to(this.img_activitySide, {
                                      left: 0
                                  }, 150, null, Laya.Handler.create(this, () => {
                                      this.img_activitySide.mouseEnabled = !0;
                                  })))
                              : 0 == this.img_activitySide.left &&
                                  ((this.img_activitySide.mouseEnabled = !1),
                                      Laya.Tween.to(this.img_activitySide, {
                                          left: -540
                                      }, 150, null, Laya.Handler.create(this, () => {
                                          this.img_activitySide.mouseEnabled = !0;
                                      })));
                  }),
              this.img_compose.on(Laya.Event.CLICK, this, e => {
                  e.stopPropagation();
                  fx.SceneManager.pushView(ComposeView);
              }),
              this.img_moreGame && this.img_moreGame.on(Laya.Event.CLICK, this, () => { }),
              this.img_trybreakIce)) {
              let e = x.inst.getTryBreakingIceSkin();
              (e && 0 != e.length) || (this.img_trybreakIce.visible = !1),
                  this.img_trybreakIce.on(Laya.Event.CLICK, this, () => {
                      fx.SceneManager.openPanel(TrySkinBreakingIceDialog);
                  });
          }
      }
      onGameStateChange(e) {
          switch (m.instance.getGameState()) {
              case o.E_GAME_FINISH:
              case o.E_GAME_FAILED:
              case o.E_GAME_OVER:
                  break;
              case o.E_GAME_START:
                  if (e == o.E_GAME_FAILED) {
                  }
                  else {
                      this.owner['box_ui'].visible = !1;
                  }
          }
      }
      popup() {
          let e = !0;
          'loading' !== this.owner['from'] &&
              (ae.inst.signInToday
                  ? (fx.SceneManager.openPanel(TurntableDialog, {
                      from: 'gameScene'
                  }),
                      (e = !1))
                  : (fx.SceneManager.openPanel(SignInDialog, {
                      from: 'gameScene'
                  }),
                      (e = !1)));
      }
      checkTryBreakIce() {
          let e = x.inst.getTryBreakingIceSkin();
          e &&
              e.length > 0 &&
              fx.SceneManager.openPanel(TrySkinBreakingIceDialog, {
                  from: 'gameScene'
              });
      }
      onCollectKey(e) {
          let t = new Laya.Image('res/img_key_1.png');
          Laya.stage.addChild(t);
          let i = fx.Utils.convert3dto2dP(e, fx.Utils.getDefaultCamera());
          t.pos(i.x, i.y);
          let s = this.img_keyBg.localToGlobal(new Laya.Point());
          Laya.Tween.to(t, {
              x: s.x,
              y: s.y
          }, 500, Laya.Ease.sineInOut, Laya.Handler.create(this, function () {
              t.removeSelf();
          }));
      }
  }

  class Te extends fx.BaseLogic {
      constructor() {
          super();
      }
      static get instance() {
          return this._instance || (this._instance = new Te()), this._instance;
      }
      onInitOnce() {
          this.boxCfgs = [];
          let e = fx.CfgMgr.instance.get('boxCfg');
          if (e)
              for (const t in e)
                  this.boxCfgs.push(e[t]);
          this.boxRewardCfg = [];
          let t = fx.CfgMgr.instance.get('boxRewardCfg');
          if (t)
              for (const e in t)
                  this.boxRewardCfg.push(t[e]);
      }
      onInit() { }
      getBoxById(e) {
          for (const t of this.boxCfgs)
              if (t.id === e)
                  return t;
          return null;
      }
      getBoxRewardCfg() {
          let e = m.instance.getEndNum(), t = this.getBoxById(e);
          if (t)
              return t;
      }
      getBoxReward() {
          let e = void 0, t = this.getBoxRewardCfg();
          if ((t && (e = t.reward), e && e.length > 0))
              return e;
      }
      getRewardNum() {
          return this.getBoxRewardCfg().count;
      }
      getReward() {
          let e = this.getBoxReward(), t = this.getBoxRewardCfg().count, i = [];
          for (const t of e) {
              let e = {
                  o: t,
                  weight: t.weight
              };
              i.push(e);
          }
          let s = [];
          for (let e = 0; e < t; e++) {
              let e = fx.Utils.takeOneByWeight(i)[1].o;
              s.push(e.id);
          }
          return s.length > 0 ? s : null;
      }
      getRewardById(e) {
          for (const t of this.boxRewardCfg)
              if (t.rewardId === e)
                  return t;
      }
      isGotAllLimitReward() {
          let e = [];
          for (const t of this.boxRewardCfg)
              t.rarity !== $.SSSSR || x.inst.isOwnSkin(t.rewardId) || e.push(t);
          return e.length <= 0;
      }
      getLimitReward() {
          let e = [];
          for (const t of this.boxRewardCfg)
              t.rarity !== $.SSSSR || x.inst.isOwnSkin(t.rewardId) || e.push(t);
          return e.length <= 0 ? null : fx.Utils.randomInArrayEx(e, 1);
      }
  }

  class Ce extends Laya.Script3D {
      onAwake() {
          let e = this.owner;
          this.boundBox = R.getCubeSize(e);
          let t = this.owner.name;
          this.shiftType = this.roadTypeToPlayerType(t);
          let i = m.instance.getGameConstants().perfectEnergy;
          (m.instance.maxEnergy += i),
              fx.EventCenter.instance.on(a.E_Player_Transform, this, this.onPlayerTransform),
              e.getComponent(Laya.PhysicsCollider).destroy();
      }
      onDestroy() {
          fx.EventCenter.instance.offAllCaller(this);
      }
      onUpdate() {
          let e = m.instance.player;
          if (!e)
              return;
          let t = e.transform.position;
          this.isPlayerCollision ||
              (t.z >= this.boundBox.min.z && t.z <= this.boundBox.max.z && this.onPlayerEnter());
      }
      roadTypeToPlayerType(e) {
          return e.includes('Wing')
              ? C.Wing
              : e.includes('Player')
                  ? C.Player
                  : e.includes('Plane')
                      ? C.Plane
                      : e.includes('Car')
                          ? C.Car
                          : e.includes('Boat')
                              ? C.Boat
                              : e.includes('Bike')
                                  ? C.Bike
                                  : e.includes('Zuandiji')
                                      ? C.Zuandiji
                                      : void 0;
      }
      getPlayerType() {
          return m.instance.player.getComponent(B).getCurPlayerType();
      }
      onPlayerEnter() {
          if (!this.isHandle && ((this.isPlayerCollision = !0), this.shiftType == this.getPlayerType())) {
              let e = m.instance.getGameConstants().goodEnergy;
              m.instance.addEnergy(e), fx.Utils.showTips('Okay'), (this.isHandle = !0);
          }
      }
      onPlayerTransform(e) {
          if (this.isHandle)
              return;
          let t = m.instance.player.transform.position;
          if (t.z >= this.boundBox.min.z && t.z <= this.boundBox.max.z) {
              if (this.shiftType == e) {
                  let e = m.instance.getGameConstants().perfectEnergy;
                  m.instance.addEnergy(e), fx.Utils.showTips('Perfect!');
              }
              else
                  fx.Utils.showTips('Terrible');
              this.isHandle = !0;
          }
      }
  }

  class O {
  }

  var e$5 = Laya.Vector3, t$5 = (Laya.Vector4, Laya.Sprite3D), i$5 = Laya.MeshSprite3D;
  class _e extends Laya.Script3D {
      constructor() {
          super(),
              (this.forward = new Laya.Quaternion()),
              (this.positionOffset = new e$5()),
              (this.temp = new e$5()),
              (this.lastPos = new e$5()),
              (this.rotQ = new Laya.Quaternion()),
              (this.rotateEanble = !1);
      }
      onAwake() {
          let e = (this.cameraSp = this.owner);
          e instanceof Laya.Camera
              ? (this.camera = e)
              : fx.Utils.recurisNode(e, e => {
                  if (e instanceof Laya.Camera)
                      return (this.camera = e), !1;
              }),
              (this.camera.enableHDR = !1);
          let t = this.camera;
          (this.forward = t.transform.rotation.clone()),
              this.rotQ.from(t.transform.rotation),
              (this.animator = t.parent.getComponent(Laya.Animator)),
              fx.EventCenter.instance.on(a.E_ARRIVE_END, this, e => {
                  this.animator &&
                      e &&
                      ((this.animator.enabled = !0),
                          fx.Utils.playAnimator3d(this.animator, 'cameraWin', 1, !1, 0));
              }),
              fx.EventCenter.instance.on(a.E_Fly_Start, this, () => {
                  this.animator &&
                      ((this.animator.enabled = !0),
                          fx.Utils.playAnimator3d(this.animator, 'cameraFly', 1, !1, 0));
              });
      }
      bindPlayer(e) {
          (this.player = e), this.bindInit();
      }
      bindInit() {
          this.lastPos.from(this.player.transform.position),
              e$5.subtract(this.lastPos, this.cameraSp.transform.position, this.positionOffset),
              this.animator && (this.animator.enabled = !1),
              this.rotateEanble && (this.forward = this.player.transform.rotation.clone());
      }
      unbindPlayer() {
          this.player = null;
      }
      onUpdate() {
          if (!this.player || this.player.destroyed)
              return;
          m.instance.getGameState();
          this.locateCameraSp(), this.rotateEanble && this.rotateCameraSp();
      }
      locateCameraSp(t = !0) {
          this.lastPos.from(this.player.transform.position);
          let i = this.temp, s = this.cameraSp.transform, n = this.positionOffset;
          e$5.add(s.position, n, i),
              t && e$5.lerp(i, this.lastPos, 0.2, i),
              e$5.subtract(i, n, i),
              (s.position = i);
      }
      rotateCameraSp(e = !0) {
          let t = this.cameraSp.transform;
          Laya.Quaternion.slerp(t.rotation, this.player.transform.rotation, 0.2, this.forward),
              (t.rotation = this.forward);
      }
      onDestroy() {
          fx.EventCenter.instance.offAllCaller(this);
      }
  }

  class c {
  }

  class pe extends B {
      constructor() {
          super();
      }
      onAwake() {
          super.onAwake(), (this.isRobot = !0);
          let e = m.instance.getCurStage();
          if (((this.transformTime = void 0),
              (this.transformDelays = e.partnerTransformDelay.slice()),
              m.instance.isEndless())) {
              let e = m.instance.getEndlessCfg(1);
              this.transformDelays = e.partnerTransformDelay.slice();
          }
      }
      onUpdate() {
          if (m.instance.getGameState() == o.E_GAME_FINISH)
              return;
          let e = this.ownerSp.timer.currTimer;
          null != this.transformTime &&
              e >= this.transformTime &&
              ((this.transformTime = void 0), this.transformAnimal(this.transformType)),
              super.onUpdate();
      }
      getSkinTypeByRoadType(e) {
          return e == h.Ground
              ? C.Car
              : e == h.UpStairs
                  ? C.Player
                  : e == h.Water
                      ? C.Boat
                      : e == h.Bridge
                          ? C.Player
                          : void 0;
      }
      randomDelay() {
          let e = fx.Utils.getNumberRandom(this.transformDelays[0], this.transformDelays[1]);
          return (e *= 1e3);
      }
      delayToTransform(e, t) {
          (this.transformTime = this.ownerSp.timer.currTimer + e), (this.transformType = t);
      }
      cancelDelay() {
          this.transformTime = void 0;
      }
      onEnterRoad(e) {
          let t = this.randomDelay(), i = this.getSkinTypeByRoadType(e);
          this.delayToTransform(t, i), super.onEnterRoad(e);
      }
      onExitRoad(e) { }
      onEnterSlope() {
          if (this.transformType == C.Plane)
              return;
          let e = this.randomDelay();
          this.delayToTransform(e, C.Plane), super.onEnterSlope();
      }
      onLeaveSlope() {
          this.resetToCar();
      }
      onEnterPanyan() {
          if (this.transformType == C.Player)
              return;
          let e = this.randomDelay();
          this.delayToTransform(e, C.Player), super.onEnterPanyan();
      }
      onLeavePanyan() {
          this.resetToCar();
      }
      onEnterWing() {
          if (this.transformType == C.Wing)
              return;
          let e = 0.1 * this.randomDelay();
          this.delayToTransform(e, C.Wing);
      }
      onLeaveWing() {
          this.resetToCar();
      }
      onEnterObstacle() {
          if (this.transformType == C.Zuandiji)
              return;
          let e = this.randomDelay();
          this.delayToTransform(e, C.Zuandiji);
      }
      onLeaveObstacle() {
          this.resetToCar();
      }
      resetToCar() {
          if (this.transformType == C.Car)
              return;
          let e = this.randomDelay();
          this.delayToTransform(e, C.Car);
      }
  }

  var e$6 = Laya.Vector3, t$6 = (Laya.Vector4, Laya.Sprite3D), i$6 = Laya.MeshSprite3D;
  class Ie extends Laya.Script3D {
      constructor() {
          super(), (this.accumulatedTime = 0);
      }
      onAwake() {
          (this.scene3d = this.owner), (Laya.PhysicsSimulation.disableSimulation = !0);
          let e = new fx.Physics.World({
              iterations: 6,
              worldscale: 1,
              random: !1,
              gravity: [0, -9.8, 0]
          });
          (fx.Physics.World.instance = e),
              Laya.PhysicsSimulation.disableSimulation &&
                  (this.scene3d.physicsSimulation.rayCast = e.rayCast.bind(e)),
              (fx.Physics.World.SLEEP_LINEAR_VELOCITY = 0.1),
              (fx.Physics.World.SLEEP_ANGULAR_VELOCITY = 0.4),
              (fx.Physics.World.SLEEP_DELTA_TIME = 0.1),
              (fx.Physics.World.FIX_PENETRATE_SQ = 4);
          let t = this.scene3d.getChildByName('Main Camera');
          (this.cameraScript = t.addComponent(_e)), this.initLevel(), this.initPlayer();
          let i = m.instance.maxEnergy, s = m.instance.getGameConstants();
          (m.instance.maxEnergy = Math.max(i, s.maxEnergy)),
              fx.EventCenter.instance.on(_.E_SKIN_CHANGE, this, this.onSkinChange),
              fx.EventCenter.instance.on(a.E_GAME_STATE_CHANGED, this, this.onGameStateChange);
      }
      onDestroy() {
          fx.EventCenter.instance.offAllCaller(this);
      }
      onUpdate() {
          this.updatePhysics();
      }
      updatePhysics() {
          (fx.Physics.World.instance.timeStep = 0.016667), fx.Physics.World.instance.step();
      }
      initLevel() {
          let e = m.instance;
          this.playerPoints = [];
          let t = this.scene3d.getChildByName('SceneControl').getChildren();
          for (const e of t)
              this.playerPoints.push(e.transform.position.clone());
          let i = this.scene3d.getChildByName('Road'), s = i.getChildByName('RoadStart'), n = i.getChildByName('RoadEnd'), a = n.getChildByName('flyPoint');
          (e.endReward = n.getChildByName('end')),
              (e.raceStartPos = s.transform.position.z),
              (e.raceEndPos = n.transform.position.z),
              (e.raceFlyPos = a.transform.position.z);
          let r = e.roads;
          const o = t => {
              let i = t.name, s = t.getComponent(Laya.PhysicsCollider);
              if ('louti' == i) {
                  let e = t.getChildByName('start'), i = t.getChildByName('end'), s = new c();
                  (s.start = e.transform.position.z),
                      (s.end = i.transform.position.z),
                      (s.sp = t.parent),
                      (s.type = h.UpStairs),
                      r.push(s);
              }
              else if ('shui' == i) {
                  let e = t.getChildByName('start'), i = t.getChildByName('end'), s = new c();
                  (s.start = e.transform.position.z),
                      (s.end = i.transform.position.z),
                      (s.sp = t.parent),
                      (s.type = h.Water),
                      r.push(s);
              }
              else if ('bridge' == i) {
                  let e = t.getChildByName('start'), i = t.getChildByName('end'), s = new c();
                  (s.start = e.transform.position.z),
                      (s.end = i.transform.position.z),
                      (s.sp = t.parent),
                      (s.type = h.Bridge),
                      r.push(s);
              }
              else {
                  if (e.isBreak(i))
                      return R.initCollider(t, l.GROUND, l.ALL), void t.addComponent(N);
                  if (i.includes('PerfectZone'))
                      return void t.addComponent(Ce);
              }
              s &&
                  (this.isNoRot(t) && (t._topy = R.getCubeSize(t).max.y),
                      (s.collisionGroup = l.GROUND),
                      R.initCollider(t, l.GROUND, l.ALL));
              let n = t.getChildren();
              for (const e of n)
                  o(e);
          };
          o(i);
      }
      initPlayer() {
          let e = [], i = m.instance.getSelectTypes(), s = !0;
          -1 == i.indexOf(C.Wing) && ((s = !1), i.push(C.Wing));
          let n = !0;
          -1 == i.indexOf(C.Car) && ((n = !1), i.push(C.Car));
          let a = [];
          for (const e of i) {
              let t = x.inst.getCurSkinCfg(e, !0);
              a.push(t);
          }
          this.createPlayerModels(a, Laya.Handler.create(this, i => {
              let s = new t$6();
              this.scene3d.addChild(s), (s.transform.position = this.playerPoints[0].clone());
              let n = s.addComponent(B);
              n.init(i, C.Player),
                  this.cameraScript.bindPlayer(s),
                  (m.instance.player = s),
                  e.push(s),
                  (this.playerScript = n);
          })),
              s || i.pop(),
              n || i.pop();
          for (let s = 1; s < 4; ++s) {
              let n = m.instance.getCurStage(), a = [];
              for (const e of i) {
                  let t = x.inst.getFirstSkinCfg(e);
                  a.push(t);
              }
              let r = a.slice();
              fx.Utils.randomArray(r);
              for (let e = 0; e < n.buffAnimalNum; ++e) {
                  let t = r[e], i = x.inst.getSkinList(t.type), s = i.findIndex(e => e.id == t.id);
                  -1 != s &&
                      ((s = fx.Utils.getIntRandom(n.partnerAddLvl[0], n.partnerAddLvl[1])),
                          (s = Mathf.clamp(s, 0, i.length - 1)),
                          (r[e] = i[s]));
              }
              this.createPlayerModels(r, Laya.Handler.create(this, i => {
                  let n = new t$6();
                  this.scene3d.addChild(n),
                      (n.transform.position = this.playerPoints[s].clone()),
                      n.addComponent(pe).init(i, C.Player),
                      e.push(n);
              }));
          }
          m.instance.players = e;
      }
      createPlayerModels(e, t) {
          let i = [];
          for (const t of e)
              -1 == i.indexOf(t.model) && i.push(t.model);
          Laya.loader.create(i, Laya.Handler.create(this, i => {
              if (!i)
                  return;
              let s = new Map();
              for (const t of e) {
                  let e = new O();
                  (e.type = t.type),
                      (e.cfg = t),
                      (e.model = Laya.Loader.getRes(t.model).clone()),
                      s.set(t.type, e);
              }
              t.runWith(s);
          }));
      }
      onGameStateChange(e) {
          switch (m.instance.getGameState()) {
              case o.E_GAME_FAILED:
                  break;
              case o.E_GAME_FINISH:
                  1 == this.playerScript.getRaceRank() && this.playWinAnim();
          }
      }
      playWinAnim() {
          this.cameraScript.unbindPlayer();
          let e = this.scene3d
              .getChildByName('Road')
              .getChildByName('RoadEnd')
              .getChildByName('SettleFX');
          fx.Helper.playParticleSp(e, !1),
              fx.SoundManager.instance.playSound('res/sound/win.mp3'),
              fx.Sdk.instance.vibrate();
      }
      onSkinChange(e) {
          let t = x.inst.getCurSkinCfg(e.type);
          t &&
              fx.Utils.create3dModel(t.model, this, e => {
                  let i = m.instance.player;
                  if (!e || !i || i.destroyed)
                      return;
                  let s = new O();
                  (s.type = t.type),
                      (s.cfg = t),
                      (s.model = Laya.Loader.getRes(t.model).clone()),
                      i.getComponent(B).changePlayer(s.type, s);
              });
      }
      isZero(e) {
          return (e = Math.abs(e)) <= 3;
      }
      is90(e) {
          return !!this.isZero(e) || ((e = Math.abs(e)), Math.abs(90 - e) <= 3);
      }
      isNoRot(e) {
          let t = e.transform.rotationEuler;
          return !!this.is90(t.x) && !!this.is90(t.z);
      }
  }

  class ve extends Laya.BlinnPhongMaterial {
      constructor() {
          super(), ve.initShader(), this.setShaderName('MeshProgressMaterial');
      }
      get progressValue() {
          return this._shaderValues.getNumber(ve.PROGRESS_VALUE);
      }
      set progressValue(e) {
          this._shaderValues.setNumber(ve.PROGRESS_VALUE, e);
      }
      get lockColor() {
          return this._shaderValues.getVector3(ve.LOCK_COLOR);
      }
      set lockColor(e) {
          this._shaderValues.setVector3(ve.LOCK_COLOR, e);
      }
      static initShader() {
          if (ve.inited)
              return;
          ve.inited = !0;
          let e = Laya.Shader3D.find('BLINNPHONG').getSubShaderAt(0), t = e._passes[0], i = Laya.Shader3D.add('MeshProgressMaterial'), s = fx.Utils.clone(e._uniformMap);
          (s.u_ProgressValue = Laya.Shader3D.PERIOD_MATERIAL),
              (s.u_LockColor = Laya.Shader3D.PERIOD_MATERIAL);
          let n = new Laya.SubShader(e._attributeMap, s);
          i.addSubShader(n),
              n.addShaderPass('\n        #if defined(GL_FRAGMENT_PRECISION_HIGH)// 原来的写法会被我们自己的解析流程处理，而我们的解析是不认内置宏的，导致被删掉，所以改成 if defined 了\n            precision highp float;\n            precision highp int;\n        #else\n            precision mediump float;\n            precision mediump int;\n        #endif\n        #include "Lighting.glsl";\n        #include "LayaUtile.glsl"\n        #include "Shadow.glsl";\n\n\n        attribute vec4 a_Position;\n\n        #ifdef GPU_INSTANCE\n            uniform mat4 u_ViewProjection;\n        #else\n            uniform mat4 u_MvpMatrix;\n        #endif\n\n        #if defined(DIFFUSEMAP)||defined(THICKNESSMAP)||((defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT))&&(defined(SPECULARMAP)||defined(NORMALMAP)))||(defined(LIGHTMAP)&&defined(UV))\n            attribute vec2 a_Texcoord0;\n            varying vec2 v_Texcoord0;\n        #endif\n\n        #if defined(LIGHTMAP)&&defined(UV1)\n            attribute vec2 a_Texcoord1;\n        #endif\n\n        #ifdef LIGHTMAP\n            uniform vec4 u_LightmapScaleOffset;\n            varying vec2 v_LightMapUV;\n        #endif\n\n        #ifdef COLOR\n            attribute vec4 a_Color;\n            varying vec4 v_Color;\n        #endif\n\n        #ifdef BONE\n            const int c_MaxBoneCount = 24;\n            attribute vec4 a_BoneIndices;\n            attribute vec4 a_BoneWeights;\n            uniform mat4 u_Bones[c_MaxBoneCount];\n        #endif\n\n        attribute vec3 a_Normal;\n        varying vec3 v_Normal; \n\n        #if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)\n            uniform vec3 u_CameraPos;\n            varying vec3 v_ViewDir; \n        #endif\n\n        #if defined(NORMALMAP)\n            attribute vec4 a_Tangent0;\n            varying vec3 v_Tangent;\n            varying vec3 v_Binormal;\n        #endif\n\n        #ifdef GPU_INSTANCE\n            attribute mat4 a_WorldMat;\n        #else\n            uniform mat4 u_WorldMat;\n        #endif\n\n        #if defined(POINTLIGHT)||defined(SPOTLIGHT)||(defined(CALCULATE_SHADOWS)&&defined(SHADOW_CASCADE))||defined(CALCULATE_SPOTSHADOWS)\n            varying vec3 v_PositionWorld;\n        #endif\n\n        #if defined(CALCULATE_SHADOWS)&&!defined(SHADOW_CASCADE)\n            varying vec4 v_ShadowCoord;\n        #endif\n\n        #if defined(CALCULATE_SPOTSHADOWS)//shader中自定义的宏不可用ifdef 必须改成if defined\n            varying vec4 v_SpotShadowCoord;\n        #endif\n\n        uniform vec4 u_TilingOffset;\n\n        varying vec4 v_Position;\n\n        void main()\n        {\n            vec4 position;\n            #ifdef BONE\n                mat4 skinTransform;\n                #ifdef SIMPLEBONE\n                    float currentPixelPos;\n                    #ifdef GPU_INSTANCE\n                        currentPixelPos = a_SimpleTextureParams.x+a_SimpleTextureParams.y;\n                    #else\n                        currentPixelPos = u_SimpleAnimatorParams.x+u_SimpleAnimatorParams.y;\n                    #endif\n                    float offset = 1.0/u_SimpleAnimatorTextureSize;\n                    skinTransform =  loadMatFromTexture(currentPixelPos,int(a_BoneIndices.x),offset) * a_BoneWeights.x;\n                    skinTransform += loadMatFromTexture(currentPixelPos,int(a_BoneIndices.y),offset) * a_BoneWeights.y;\n                    skinTransform += loadMatFromTexture(currentPixelPos,int(a_BoneIndices.z),offset) * a_BoneWeights.z;\n                    skinTransform += loadMatFromTexture(currentPixelPos,int(a_BoneIndices.w),offset) * a_BoneWeights.w;\n                #else\n                    skinTransform =  u_Bones[int(a_BoneIndices.x)] * a_BoneWeights.x;\n                    skinTransform += u_Bones[int(a_BoneIndices.y)] * a_BoneWeights.y;\n                    skinTransform += u_Bones[int(a_BoneIndices.z)] * a_BoneWeights.z;\n                    skinTransform += u_Bones[int(a_BoneIndices.w)] * a_BoneWeights.w;\n                #endif\n                position=skinTransform*a_Position;\n            #else\n                position=a_Position;\n            #endif\n\n            v_Position = position;\n            \n            mat4 worldMat;\n            #ifdef GPU_INSTANCE\n                worldMat = a_WorldMat;\n            #else\n                worldMat = u_WorldMat;\n            #endif\n\n            #ifdef GPU_INSTANCE\n                gl_Position = u_ViewProjection * worldMat * position;\n            #else\n                gl_Position = u_MvpMatrix * position;\n            #endif\n\n            mat3 worldInvMat;\n            #ifdef BONE\n                worldInvMat=INVERSE_MAT(mat3(worldMat*skinTransform));\n            #else\n                worldInvMat=INVERSE_MAT(mat3(worldMat));\n            #endif  \n            v_Normal=normalize(a_Normal*worldInvMat);\n            #if defined(NORMALMAP)\n                v_Tangent=normalize(a_Tangent0.xyz*worldInvMat);\n                v_Binormal=cross(v_Normal,v_Tangent)*a_Tangent0.w;\n            #endif\n\n            #if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)||(defined(CALCULATE_SHADOWS)&&defined(SHADOW_CASCADE))||defined(CALCULATE_SPOTSHADOWS)\n                vec3 positionWS=(worldMat*position).xyz;\n                #if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)\n                    v_ViewDir = u_CameraPos-positionWS;\n                #endif\n                #if defined(POINTLIGHT)||defined(SPOTLIGHT)||(defined(CALCULATE_SHADOWS)&&defined(SHADOW_CASCADE))||defined(CALCULATE_SPOTSHADOWS)\n                    v_PositionWorld = positionWS;\n                #endif\n            #endif\n\n            #if defined(DIFFUSEMAP)||defined(THICKNESSMAP)||((defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT))&&(defined(SPECULARMAP)||defined(NORMALMAP)))\n                v_Texcoord0=TransformUV(a_Texcoord0,u_TilingOffset);\n            #endif\n\n            #ifdef LIGHTMAP\n                #ifdef UV1\n                    v_LightMapUV=vec2(a_Texcoord1.x,1.0-a_Texcoord1.y)*u_LightmapScaleOffset.xy+u_LightmapScaleOffset.zw;\n                #else\n                    v_LightMapUV=vec2(a_Texcoord0.x,1.0-a_Texcoord0.y)*u_LightmapScaleOffset.xy+u_LightmapScaleOffset.zw;\n                #endif \n                v_LightMapUV.y=1.0-v_LightMapUV.y;\n            #endif\n\n            #if defined(COLOR)&&defined(ENABLEVERTEXCOLOR)\n                v_Color=a_Color;\n            #endif\n\n            #if defined(CALCULATE_SHADOWS)&&!defined(SHADOW_CASCADE)\n                v_ShadowCoord =getShadowCoord(vec4(positionWS,1.0));\n            #endif\n\n            #if defined(CALCULATE_SPOTSHADOWS)//shader中自定义的宏不可用ifdef 必须改成if defined\n                v_SpotShadowCoord = u_SpotViewProjectMatrix*vec4(positionWS,1.0);\n            #endif\n\n            v_Position = gl_Position;\n            gl_Position=remapGLPositionZ(gl_Position);\n        }\n        ', '\n        #if defined(GL_FRAGMENT_PRECISION_HIGH)// 原来的写法会被我们自己的解析流程处理，而我们的解析是不认内置宏的，导致被删掉，所以改成 if defined 了\n            precision highp float;\n            precision highp int;\n        #else\n            precision mediump float;\n            precision mediump int;\n        #endif\n\n\n        #include "Lighting.glsl";\n        #include "Shadow.glsl"\n\n        uniform vec4 u_DiffuseColor;\n\n        #if defined(COLOR)&&defined(ENABLEVERTEXCOLOR)\n            varying vec4 v_Color;\n        #endif\n\n        #ifdef ALPHATEST\n            uniform float u_AlphaTestValue;\n        #endif\n\n        #ifdef DIFFUSEMAP\n            uniform sampler2D u_DiffuseTexture;\n        #endif\n\n\n        #if defined(DIFFUSEMAP)||defined(THICKNESSMAP)||((defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT))&&(defined(SPECULARMAP)||defined(NORMALMAP)))\n            varying vec2 v_Texcoord0;\n        #endif\n\n        #ifdef LIGHTMAP\n            varying vec2 v_LightMapUV;\n            uniform sampler2D u_LightMap;\n            #ifdef LIGHTMAP_DIRECTIONAL\n                uniform sampler2D u_LightMapDirection;\n            #endif\n        #endif\n\n        varying vec3 v_Normal;\n        #if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)\n            varying vec3 v_ViewDir; \n\n            uniform vec3 u_MaterialSpecular;\n            uniform float u_Shininess;\n\n            #ifdef LEGACYSINGLELIGHTING\n                #ifdef DIRECTIONLIGHT\n                    uniform DirectionLight u_DirectionLight;\n                #endif\n                #ifdef POINTLIGHT\n                    uniform PointLight u_PointLight;\n                #endif\n                #ifdef SPOTLIGHT\n                    uniform SpotLight u_SpotLight;\n                #endif\n            #else\n                uniform mat4 u_View;\n                uniform vec4 u_ProjectionParams;\n                uniform vec4 u_Viewport;\n                uniform int u_DirationLightCount;\n                uniform sampler2D u_LightBuffer;\n                uniform sampler2D u_LightClusterBuffer;\n            #endif\n\n            #ifdef SPECULARMAP \n                uniform sampler2D u_SpecularTexture;\n            #endif\n        #endif\n\n        #ifdef NORMALMAP \n            uniform sampler2D u_NormalTexture;\n            varying vec3 v_Tangent;\n            varying vec3 v_Binormal;\n        #endif\n\n        #ifdef FOG\n            uniform float u_FogStart;\n            uniform float u_FogRange;\n            uniform vec3 u_FogColor;\n        #endif\n\n        #if defined(POINTLIGHT)||defined(SPOTLIGHT)||(defined(CALCULATE_SHADOWS)&&defined(SHADOW_CASCADE))||defined(CALCULATE_SPOTSHADOWS)\n            varying vec3 v_PositionWorld;\n        #endif\n\n\n        #include "GlobalIllumination.glsl";//"GlobalIllumination.glsl use uniform should at front of this\n\n        #if defined(CALCULATE_SHADOWS)&&!defined(SHADOW_CASCADE)\n            varying vec4 v_ShadowCoord;\n        #endif\n\n        #if defined(CALCULATE_SPOTSHADOWS)//shader中自定义的宏不可用ifdef 必须改成if defined\n            varying vec4 v_SpotShadowCoord;\n        #endif\n\n        varying vec4 v_Position;\n\n        uniform float u_ProgressValue;\n        uniform vec3 u_LockColor;\n\n        void main()\n        {\n            vec3 normal;//light and SH maybe use normal\n            #if defined(NORMALMAP)\n                vec3 normalMapSample = texture2D(u_NormalTexture, v_Texcoord0).rgb;\n                normal = normalize(NormalSampleToWorldSpace(normalMapSample, v_Normal, v_Tangent,v_Binormal));\n            #else\n                normal = normalize(v_Normal);\n            #endif\n\n            #if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)\n                vec3 viewDir= normalize(v_ViewDir);\n            #endif\n\n            LayaGIInput giInput;\n            #ifdef LIGHTMAP\t\n                giInput.lightmapUV=v_LightMapUV;\n            #endif\n            vec3 globalDiffuse=layaGIBase(giInput,1.0,normal);\n            \n            vec4 mainColor=u_DiffuseColor;\n            #ifdef DIFFUSEMAP\n                vec4 difTexColor=texture2D(u_DiffuseTexture, v_Texcoord0);\n                mainColor=mainColor*difTexColor;\n            #endif \n            #if defined(COLOR)&&defined(ENABLEVERTEXCOLOR)\n                mainColor=mainColor*v_Color;\n            #endif \n            \n            #ifdef ALPHATEST\n                if(mainColor.a<u_AlphaTestValue)\n                    discard;\n            #endif\n        \n            \n            vec3 diffuse = vec3(0.0);\n            vec3 specular= vec3(0.0);\n            vec3 transmissionDiffuse = vec3(0.0);\n            #if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)\n                vec3 dif,spe,transmis;\n                float transmissionFactor;\n                #ifdef SPECULARMAP\n                    vec3 gloss=texture2D(u_SpecularTexture, v_Texcoord0).rgb;\n                #else\n                    #ifdef DIFFUSEMAP\n                        vec3 gloss=vec3(difTexColor.a);\n                    #else\n                        vec3 gloss=vec3(1.0);\n                    #endif\n                #endif\n                #ifdef THICKNESSMAP\n                    transmissionFactor = texture2D(u_ThinknessTexture, v_Texcoord0).r;\n                #endif\n            #endif\n\n            \n            \n            #ifdef LEGACYSINGLELIGHTING\n                #ifdef DIRECTIONLIGHT\n                    LayaAirBlinnPhongDiectionLight(u_MaterialSpecular,u_Shininess,normal,gloss,viewDir,u_DirectionLight,transmissionFactor,dif,spe,transmis);\n                    #if defined(CALCULATE_SHADOWS)//shader中自定义的宏不可用ifdef 必须改成if defined\n                        #ifdef SHADOW_CASCADE\n                            vec4 shadowCoord = getShadowCoord(vec4(v_PositionWorld,1.0));\n                        #else\n                            vec4 shadowCoord = v_ShadowCoord;\n                        #endif\n                        float shadowAttenuation=sampleShadowmap(shadowCoord);\n                        dif *= shadowAttenuation;\n                        spe *= shadowAttenuation;\n                        transmis *=shadowAttenuation;\n                    #endif\n                    diffuse+=dif;\n                    specular+=spe;\n                    transmissionDiffuse+=transmis;\n                #endif\n            \n                #ifdef POINTLIGHT\n                    LayaAirBlinnPhongPointLight(v_PositionWorld,u_MaterialSpecular,u_Shininess,normal,gloss,viewDir,u_PointLight,transmissionFactor,dif,spe,transmis);\n                    diffuse+=dif;\n                    specular+=spe;\n                    transmissionDiffuse+=transmis;\n                #endif\n\n                #ifdef SPOTLIGHT\n                    LayaAirBlinnPhongSpotLight(v_PositionWorld,u_MaterialSpecular,u_Shininess,normal,gloss,viewDir,u_SpotLight,transmissionFactor,dif,spe,transmis);\n                    #if defined(CALCULATE_SPOTSHADOWS)//shader中自定义的宏不可用ifdef 必须改成if defined\n                        vec4 spotShadowcoord = v_SpotShadowCoord;\n                        float spotShadowAttenuation = sampleSpotShadowmap(spotShadowcoord);\n                        dif *= spotShadowAttenuation;\n                        spe *= spotShadowAttenuation;\n                        transmis *=spotShadowAttenuation;\n                    #endif\n                    diffuse+=dif;\n                    specular+=spe;\n                    transmissionDiffuse+=transmis;\n                #endif\n            #else\n                #ifdef DIRECTIONLIGHT\n                    for (int i = 0; i < MAX_LIGHT_COUNT; i++) \n                    {\n                        if(i >= u_DirationLightCount)\n                            break;\n                        DirectionLight directionLight = getDirectionLight(u_LightBuffer,i);\n                        #if defined(CALCULATE_SHADOWS)//shader中自定义的宏不可用ifdef 必须改成if defined\n                            if(i == 0)\n                            {\n                                #ifdef SHADOW_CASCADE\n                                    vec4 shadowCoord = getShadowCoord(vec4(v_PositionWorld,1.0));\n                                #else\n                                    vec4 shadowCoord = v_ShadowCoord;\n                                #endif\n                                directionLight.color *= sampleShadowmap(shadowCoord);\n                            }\n                        #endif\n                        LayaAirBlinnPhongDiectionLight(u_MaterialSpecular,u_Shininess,normal,gloss,viewDir,directionLight,transmissionFactor,dif,spe,transmis);\n                        diffuse+=dif;\n                        specular+=spe;\n                        transmissionDiffuse+=transmis;\n                    }\n                #endif\n                #if defined(POINTLIGHT)||defined(SPOTLIGHT)\n                    ivec4 clusterInfo =getClusterInfo(u_LightClusterBuffer,u_View,u_Viewport, v_PositionWorld,gl_FragCoord,u_ProjectionParams);\n                    #ifdef POINTLIGHT\n                        for (int i = 0; i < MAX_LIGHT_COUNT; i++) \n                        {\n                            if(i >= clusterInfo.x)//PointLightCount\n                                break;\n                            PointLight pointLight = getPointLight(u_LightBuffer,u_LightClusterBuffer,clusterInfo,i);\n                            LayaAirBlinnPhongPointLight(v_PositionWorld,u_MaterialSpecular,u_Shininess,normal,gloss,viewDir,pointLight,transmissionFactor,dif,spe,transmis);\n                            diffuse+=dif;\n                            specular+=spe;\n                            transmissionDiffuse+=transmis;\n                        }\n                    #endif\n                    #ifdef SPOTLIGHT\n                        for (int i = 0; i < MAX_LIGHT_COUNT; i++) \n                        {\n                            if(i >= clusterInfo.y)//SpotLightCount\n                                break;\n                            SpotLight spotLight = getSpotLight(u_LightBuffer,u_LightClusterBuffer,clusterInfo,i);\n                            #if defined(CALCULATE_SPOTSHADOWS)//shader中自定义的宏不可用ifdef 必须改成if defined\n                                if(i == 0)\n                                {\n                                    vec4 spotShadowcoord = v_SpotShadowCoord;\n                                    spotLight.color *= sampleSpotShadowmap(spotShadowcoord);\n                                }\n                            #endif\n                            LayaAirBlinnPhongSpotLight(v_PositionWorld,u_MaterialSpecular,u_Shininess,normal,gloss,viewDir,spotLight,transmissionFactor,dif,spe,transmis);\n                            diffuse+=dif;\n                            specular+=spe;\n                            transmissionDiffuse+=transmis;\n                        }\n                    #endif\n                #endif\n            #endif\n\n            gl_FragColor =vec4(mainColor.rgb*(globalDiffuse + diffuse),mainColor.a);\n\n            #if defined(DIRECTIONLIGHT)||defined(POINTLIGHT)||defined(SPOTLIGHT)\n                gl_FragColor.rgb+=specular;\n            #endif\n\n            #ifdef ENABLETRANSMISSION\n                gl_FragColor.rgb+= transmissionDiffuse;\n            #endif\n\n            \n            #ifdef FOG\n                float lerpFact=clamp((1.0/gl_FragCoord.w-u_FogStart)/u_FogRange,0.0,1.0);\n                gl_FragColor.rgb=mix(gl_FragColor.rgb,u_FogColor,lerpFact);\n            #endif\n\n            if (v_Position.y > u_ProgressValue) {\n                gl_FragColor.rgb = u_LockColor;\n            }\n\n            //gl_FragColor.rgb =transmissionDiffuse;\n        }\n        ', t._stateMap);
      }
  }
  ve.PROGRESS_VALUE = Laya.Shader3D.propertyNameToID('u_ProgressValue');
  ve.LOCK_COLOR = Laya.Shader3D.propertyNameToID('u_LockColor');

  class StageSkinDialog extends ui.scenes.skin.StageSkinDialogUI {
      constructor(e, t, i) {
          super(), (this.from = e), (this.skinId = t);
      }
      onAdd() {
          if (!this.skinId)
              return (fx.SceneManager.closePanel(this),
                  void fx.SceneManager.changeScene(GameScene, {
                      from: 'StageSkinDialog'
                  }));
          this.btn_sure.on(Laya.Event.CLICK, this, () => {
              fx.SceneManager.closePanel(this),
                  fx.SceneManager.changeScene(GameScene, {
                      from: 'StageSkinDialog'
                  });
          }),
              this.on(fx.SdkEvent.E_REWARD_GAIN, this, e => {
                  this.btn_get['$_GID'] === e.gid &&
                      fx.SdkCode.REWARD_GAIN_SUCCESS === e.code &&
                      (x.inst.unlockSkin(this.skinId),
                          x.inst.setCurSkinById(this.skinId),
                          fx.SceneManager.openPanel(RewardDialog, {
                              from: 'StageSkinDialog',
                              userArgs: [
                                  new ne(z.SKIN, this.skinId),
                                  () => {
                                      fx.SceneManager.changeScene(GameScene, {
                                          from: 'StageSkinDialog'
                                      });
                                  }
                              ]
                          }),
                          fx.SceneManager.closePanel(this));
              });
      }
      onEnter() {
          this.createScene3d();
      }
      createScene3d() {
          let t = new Laya.Scene3D();
          this.box_scene3d.addChild(t);
          let i = new Laya.Camera();
          (i.clearFlag = Laya.BaseCamera.CLEARFLAG_DEPTHONLY),
              i.transform.translate(new Laya.Vector3(0, 0, -1), !1),
              (i.normalizedViewport = this.getViewPort()),
              i.transform.lookAt(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 1, 0)),
              t.addChild(i);
          var s = t.addChild(new Laya.DirectionLight());
          (s.color = fx.Utils.colorHexTo3F('#FFF4D6')),
              (t.ambientMode = Laya.AmbientMode.SolidColor),
              t.ambientColor.setValue(0.51, 0.51, 0.51);
          var n = s.transform.worldMatrix;
          n.setForward(new Laya.Vector3(0.25, -1, 1)), (s.transform.worldMatrix = n);
          let a = x.inst.getCfgById(this.skinId);
          fx.Utils.create3dModel(a.model, this, i => {
              if (!i || t.destroyed)
                  return;
              let s = i.clone();
              t.addChild(s), s.transform.rotate(new Laya.Vector3(0, 180, 0));
              let n = R.convertPos(a.displayPosition);
              s.transform.position = n;
              let r = a.displayScale || 1;
              (s.transform.localScale = new Laya.Vector3(r, r, r)), R.handlePlayerModel(s);
          });
      }
      getViewPort() {
          let e = this.box_scene3d.width, t = this.box_scene3d.height, i = new Laya.Point(), s = (i = this.box_scene3d.localToGlobal(i)).x, n = i.y;
          return new Laya.Viewport(s / Laya.stage.width, n / Laya.stage.height, e / Laya.stage.width, t / Laya.stage.height);
      }
  }

  class GameSuccessDialog extends ui.scenes.GameSuccessDialogUI {
      constructor(...e) {
          super(), (this.boxRewards = void 0), ([, this.boxRewards] = e);
      }
      onAdd() {
          x.inst.clearCurTrySkin(),
              y.instance.getPlayerInfo().keyNum++,
              this.rewardIcon3.scale(0.5, 0.5),
              this.boxRewards
                  ? ((this.rewardIcon1.skin = 'res/img_coins.png'),
                      (this.rewardIcon2.skin = 'res/boxReward/img_fragment.png'),
                      this.boxRewards.skin
                          ? (this.rewardIcon3.skin = this.boxRewards.skin.icon)
                          : (this.rewardIcon3.visible = !1),
                      (this.rewardIcon1.getChildAt(0)['value'] = `${this.boxRewards.coins}`),
                      (this.rewardIcon2.getChildAt(0)['value'] = `${this.boxRewards.frag}`),
                      (this.rewardIcon3.getChildAt(0)['visible'] = !1))
                  : (this.rewardIcon1.visible = this.rewardIcon2.visible = this.rewardIcon3.visible = !1),
              this.btn_next.on(Laya.Event.CLICK, this, () => {
                  fx.SceneManager.closePanel(this);
              }),
              this.on(fx.SdkEvent.E_SHARE_RESULT, this, e => {
                  e.code == fx.SdkCode.SHARE_SUCCESS && this.onShareSuccess();
              }),
              this.initUI();
      }
      onEnter() {
          Laya.Tween.to(this.img_key, {
              centerY: -30
          }, 300, null, Laya.Handler.create(this, () => {
              this.timerOnce(1e3, this, () => {
                  this.img_key.visible = !1;
              });
          })),
              this.initStageSkin();
      }
      initUI() {
          let e = m.instance, t = e.raceRank;
          (this.img_rank1.visible = 1 == t), (this.img_rank2.visible = t > 1);
          let i = e.getGameConstants();
          (this.coinsCount = i.stageReward),
              1 == t && (this.coinsCount = 2 * this.coinsCount),
              (this.label_coin.value = `${this.coinsCount}`),
              (this.stageSkin = x.inst.getCurStageSkin()),
              (this.box_stageSkin.visible = !1);
      }
      getReward(e = !1) {
          let t = e ? 2 * this.coinsCount : this.coinsCount;
          fx.Effect.getPropEffect(this.img_coin, this.box_Coins, Laya.Handler.create(this, () => {
              y.instance.addCoins(t), fx.SceneManager.closePanel(this);
          }));
      }
      onShareSuccess() {
          this.btn_next.centerX = 0;
      }
      onRemove() {
          Laya.Tween.clearTween(this),
              m.instance.goNextStage(),
              this.stageSkin && x.inst.isStageSkinFinish(this.stageSkin.skin.id)
                  ? fx.SceneManager.openPanel(StageSkinDialog, {
                      from: 'GameSuccessDialog',
                      userArgs: [this.stageSkin.skin.id]
                  })
                  : fx.SceneManager.changeScene(GameScene, {
                      from: 'gamescene'
                  });
      }
      initStageSkin() {
          if (!this.stageSkin)
              return;
          this.box_stageSkin.visible = !0;
          let e = this.stageSkin.skin, t = this.stageSkin.progress;
          x.inst.setStageSkinProgress(e.id, t + 1);
          let i = (100 * (t + 1)) / e.unlock.num;
          (i = Mathf.clamp(i, 0, 100)),
              (i = Math.floor(i)),
              (this.label_progress.text = `${i}%`),
              (this.label_name.text = e.name),
              this.createScene3d(e, i / 100);
      }
      createScene3d(t, i) {
          let s = new Laya.Scene3D();
          this.box_scene3d.addChild(s);
          let n = new Laya.Camera();
          (n.clearFlag = Laya.BaseCamera.CLEARFLAG_DEPTHONLY),
              n.transform.translate(new Laya.Vector3(0, 0, -1), !1),
              (n.normalizedViewport = this.getViewPort()),
              n.transform.lookAt(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 1, 0)),
              s.addChild(n);
          var a = s.addChild(new Laya.DirectionLight());
          (a.color = fx.Utils.colorHexTo3F('#FFF4D6')),
              (s.ambientMode = Laya.AmbientMode.SolidColor),
              s.ambientColor.setValue(0.51, 0.51, 0.51);
          var r = a.transform.worldMatrix;
          r.setForward(new Laya.Vector3(0.25, -1, 1)),
              (a.transform.worldMatrix = r),
              fx.Utils.create3dModel(t.model, this, n => {
                  if (!n || s.destroyed)
                      return;
                  let a = n.clone();
                  s.addChild(a), a.transform.rotate(new Laya.Vector3(0, 180, 0));
                  let r = R.convertPos(t.displayPosition);
                  a.transform.position = r;
                  let o = t.displayScale || 1;
                  (a.transform.localScale = new Laya.Vector3(o, o, o)),
                      fx.Utils.recurisNode(a, e => {
                          if (e instanceof Laya.RenderableSprite3D) {
                              let s = new ve(), n = fx.Utils.getSpRenderer(e), a = n.material;
                              (s.albedoColor = a.albedoColor),
                                  (s.albedoTexture = a.albedoTexture),
                                  (s.albedoIntensity = a.albedoIntensity),
                                  (s.specularColor = a.specularColor),
                                  (s.shininess = a.shininess),
                                  (s.cull = a.cull),
                                  (s.lockColor = fx.Utils.colorHexTo3F('#112E4C')),
                                  (n.material = s);
                              let l = t.animBounds ? t.animBounds[0] : 0, h = t.animBounds ? t.animBounds[1] : 0;
                              s.progressValue = r.y + l * o + (h - l) * i * o;
                          }
                      }),
                      R.handlePlayerModel(a);
              });
      }
      getViewPort() {
          let e = this.box_scene3d.width, t = this.box_scene3d.height, i = new Laya.Point(), s = (i = this.box_scene3d.localToGlobal(i)).x, n = i.y;
          return new Laya.Viewport(s / Laya.stage.width, n / Laya.stage.height, e / Laya.stage.width, t / Laya.stage.height);
      }
  }

  class BoxRewardDialog extends ui.scenes.BoxRewardDialogUI {
      constructor(...e) {
          super(),
              (this.rewardGain = {
                  coins: 0,
                  frag: 0,
                  skin: void 0
              }),
              (this.count = 0),
              (this.curCount = 0),
              (this.rewardCnt = 0),
              ([, this.test_GM] = e),
              (this.rewardGain.coins = 0),
              (this.rewardGain.frag = 0),
              (this.rewardGain.skin = void 0);
      }
      onAdd() {
          if (((this.count = Te.instance.getRewardNum()), this.getBox(), 0 == this.rewardCfg.length))
              return void fx.SceneManager.closePanel(this);
          this.btn_close.on(Laya.Event.CLICK, this, () => {
              fx.SceneManager.closePanel(this);
          }),
              this.btn_get.on(Laya.Event.CLICK, this, () => {
                  this.getReward(0), this.getReward(1), this.getReward(2), fx.SceneManager.closePanel(this);
              }),
              this.on(fx.SdkEvent.E_REWARD_GAIN, this, e => {
                  e.code === fx.SdkCode.REWARD_GAIN_SUCCESS &&
                      this.btn_videoGet['gid'] === e.$GID &&
                      (this.getReward(0),
                          this.getReward(1),
                          this.getReward(2),
                          fx.Utils.showTips('奖励领取成功！继续抽奖！'),
                          this.getBox(),
                          this.initCard(0),
                          this.getAgain(),
                          (this.label_cardNum.visible = !0),
                          (this.label_cardNum.text = `Cards Left:${this.count - this.curCount}`));
              }),
              (this.mouseEnabled = !1),
              this.initCard(0);
          let e = fx.CfgMgr.instance.getConstant('guranteeNum'), t = y.instance.getPlayerInfo().openCardNum, i = this.pb_bg.width * (t / e);
          i <= 0 && (i = 0.001),
              (this.pb.width = i),
              (this.label_limitNum.text = `${e - t} Draws → Guaranteed Limited Card`),
              Te.instance.isGotAllLimitReward() && (this.box_limitCnt.visible = !1);
      }
      onEnter() {
          Laya.Tween.to(this.img_card, {
              centerX: 0
          }, 300, null, Laya.Handler.create(this, () => {
              (this.label_cardNum.text = `Cards Left:${this.count - this.curCount}`),
                  (this.mouseEnabled = !0);
          })),
              this.on(Laya.Event.CLICK, this, e => {
                  if (this.getGID() === e.target.$_GID) {
                      if ((this.curCount < 3 && (this.mouseEnabled = !1),
                          (this.font_num.visible = !1),
                          (this.label_cardNum.visible = !0),
                          (this.img_card.visible = !0),
                          this.curCount > 0)) {
                          let e = this.initCard(this.curCount);
                          if (!e)
                              return;
                          Laya.Tween.to(this.img_card, {
                              centerX: 0
                          }, 300, null, Laya.Handler.create(this, () => {
                              this.openCard(e);
                          })),
                              this.curCount++;
                      }
                      else {
                          let e = this.initCard(this.curCount);
                          if (!e)
                              return;
                          this.openCard(e), this.curCount++;
                      }
                      Te.instance.isGotAllLimitReward() && (this.box_limitCnt.visible = !1);
                  }
                  this.label_cardNum.text = `Cards Left:${this.count - this.curCount}`;
              });
      }
      onRemove() {
          Laya.Tween.clearTween(this),
              fx.SceneManager.openPanel(GameSuccessDialog, {
                  from: 'boxRewardDialog',
                  userArgs: [this.rewardGain]
              });
      }
      getBox() {
          this.rewardCfg = [];
          let e = Te.instance.getReward();
          if (e)
              for (const t of e) {
                  let e = Te.instance.getRewardById(t);
                  if (Te.instance.isGotAllLimitReward)
                      e.rarity === $.SSSSR && (e = Te.instance.getRewardById(103));
                  else {
                      let t = fx.CfgMgr.instance.getConstant('guranteeNum');
                      y.instance.getPlayerInfo().openCardNum >= t - 3 &&
                          e.rarity === $.SSSSR &&
                          (e = Te.instance.getRewardById(103));
                  }
                  this.rewardCfg.push(e);
              }
      }
      initCard(e) {
          if (e >= this.count)
              return (this.img_card.visible = !1), void (this.box_cards.visible = !0);
          (this.img_icon.visible = !1), (this.img_card.skewY = 0);
          let t = this.rewardCfg[e];
          switch (t.rarity) {
              case $.R:
                  this.img_card.skin = xe.cardNorBg_open;
                  break;
              case $.SR:
                  this.img_card.skin = xe.cardRare_open;
                  break;
              case $.SSR:
                  this.img_card.skin = xe.cardShi_open;
                  break;
              case $.SSSR:
                  this.img_card.skin = xe.cardLegend_open;
                  break;
              case $.SSSSR:
                  this.img_card.skin = xe.cardLimit_open;
          }
          return t;
      }
      openCard(e) {
          let t = fx.CfgMgr.instance.getConstant('guranteeNum');
          if (y.instance.getPlayerInfo().openCardNum >= t - 1)
              if (Te.instance.isGotAllLimitReward())
                  this.box_limitCnt.visible = !1;
              else {
                  let t = Te.instance.getLimitReward()[0];
                  if (t) {
                      switch ((e = t).rarity) {
                          case $.R:
                              this.img_card.skin = xe.cardNorBg_open;
                              break;
                          case $.SR:
                              this.img_card.skin = xe.cardRare_open;
                              break;
                          case $.SSR:
                              this.img_card.skin = xe.cardShi_open;
                              break;
                          case $.SSSR:
                              this.img_card.skin = xe.cardLegend_open;
                              break;
                          case $.SSSSR:
                              this.img_card.skin = xe.cardLimit_open;
                      }
                      this.curCount < 3
                          ? (this.rewardCfg[this.curCount] = t)
                          : (this.rewardCfg[this.curCount - 1] = t);
                  }
              }
          Laya.Tween.to(this.img_card, {
              skewY: 360
          }, 500, Laya.Ease.strongInOut, Laya.Handler.create(this, () => {
              switch (e.rarity) {
                  case $.R:
                      this.img_card.skin = xe.cardNorBg;
                      break;
                  case $.SR:
                      this.img_card.skin = xe.cardRare;
                      break;
                  case $.SSR:
                      this.img_card.skin = xe.cardShi;
                      break;
                  case $.SSSR:
                      this.img_card.skin = xe.cardLegeng;
                      break;
                  case $.SSSSR:
                      this.img_card.skin = xe.cardLimit;
              }
              if (((this.img_icon.visible = !0),
                  (this.img_icon.skin = e.icon),
                  (this.font_num.value = `x${e.num}`),
                  e.type === Y.SKINFRAG)) {
                  let t = this.img_card.getChildByName('icon_frag'), i = x.inst.getCfgById(e.rewardId);
                  (t.skin = i.icon), (t.visible = !0);
              }
              let t = this.box_cards.getChildByName(`card${this.curCount}`), i = t.getChildByName('icon'), s = t.getChildByName('num');
              if (((t.skin = this.img_card.skin),
                  (i.skin = this.img_icon.skin),
                  (s.value = this.font_num.value),
                  (i.visible = !0),
                  e.type === Y.SKINFRAG)) {
                  let e = t.getChildByName('icon_frag');
                  (e.skin = this.img_card.getChildByName('icon_frag')['skin']), (e.visible = !0);
              }
              else if (e.type === Y.SKIN) {
                  t.getChildByName('icon_frag').visible = !1;
              }
              else {
                  t.getChildByName('icon_frag').visible = !1;
              }
              this.playAni(this.curCount);
          })),
              y.instance.getPlayerInfo().openCardNum++,
              y.instance.getPlayerInfo().openCardNum >= t && (y.instance.getPlayerInfo().openCardNum = 0),
              this.updatePbProgress();
      }
      getReward(e) {
          if (e > this.rewardCfg.length - 1)
              return;
          let t = this.rewardCfg[e];
          switch (t.type) {
              case Y.COINS:
                  y.instance.getPlayerInfo().addCoins(t.num), (this.rewardGain.coins += t.num);
                  break;
              case Y.SKINFRAG:
                  re.instance.addFragment(t.rewardId, t.num), (this.rewardGain.frag += t.num);
                  break;
              case Y.SKIN: {
                  let e = x.inst.getCfgById(t.rewardId);
                  if (e) {
                      if (((this.rewardGain.skin = e), e.unlock.videoNum))
                          for (let i = 0; i < e.unlock.videoNum; i++)
                              x.inst.unlockSkin(t.rewardId);
                      else
                          x.inst.unlockSkin(t.rewardId);
                      x.inst.setCurSkin(e.type, e.id);
                      break;
                  }
              }
          }
          this.box_cards.getChildByName(`card${e + 1}`);
          this.rewardCnt++,
              this.rewardCnt >= this.rewardCfg.length &&
                  ((this.btn_videoGet.visible = !0), (this.btn_get.visible = !0)),
              Te.instance.isGotAllLimitReward() && (this.box_limitCnt.visible = !1);
      }
      playAni(e) {
          switch (((this.img_card.visible = !1),
              (this.img_card.centerX = 600),
              (this.img_icon.visible = !1),
              (this.img_card.getChildByName('icon_frag')['visible'] = !1),
              e)) {
              case 1:
                  (this.card1.visible = !0),
                      Laya.Tween.to(this.card1, {
                          centerX: -250,
                          centerY: 80,
                          scaleX: 1,
                          scaleY: 1
                      }, 300, null, Laya.Handler.create(this, () => {
                          this.mouseEnabled = !0;
                      }));
                  break;
              case 2:
                  (this.card2.visible = !0),
                      Laya.Tween.to(this.card2, {
                          centerX: 0,
                          centerY: 80,
                          scaleX: 1,
                          scaleY: 1
                      }, 300, null, Laya.Handler.create(this, () => {
                          this.mouseEnabled = !0;
                      }));
                  break;
              case 3:
                  (this.card3.visible = !0),
                      Laya.Tween.to(this.card3, {
                          centerX: 250,
                          centerY: 80,
                          scaleX: 1,
                          scaleY: 1
                      }, 300, null, Laya.Handler.create(this, () => {
                          this.mouseEnabled = !0;
                      }));
          }
          this.curCount >= 3 &&
              ((this.label_tip.visible = !1),
                  (this.box_btns.visible = !0),
                  (this.label_cardNum.visible = !1));
      }
      getAgain() {
          (this.curCount = 0),
              (this.rewardCnt = 0),
              (this.img_card.visible = !0),
              (this.img_icon.skin = '');
          let e = this.img_card.getChildByName('icon_frag');
          (e.visible = !1),
              (e.skin = ''),
              (this.card1.visible = !1),
              (this.card2.visible = !1),
              (this.card3.visible = !1),
              (this.card1.centerX = this.card2.centerX = this.card3.centerX = 0),
              (this.card1.centerY = this.card2.centerY = this.card3.centerY = 0),
              (this.box_btns.visible = !1),
              (this.label_tip.visible = !0),
              Laya.Tween.to(this.img_card, {
                  centerX: 0
              }, 300, null, Laya.Handler.create(this, () => { }));
      }
      updatePbProgress() {
          let e = fx.CfgMgr.instance.getConstant('guranteeNum'), t = y.instance.getPlayerInfo().openCardNum, i = this.pb_bg.width * (t / e);
          i <= 0 && (i = 0.001),
              Laya.Tween.to(this.pb, {
                  width: i
              }, 500, null),
              (this.label_limitNum.text = `${e - t} Draws → Guaranteed Limited Card`);
      }
  }

  class GameFailedDialog extends ui.scenes.GameFailedDialogUI {
      onAdd() {
          this.btn_retry.on(Laya.Event.CLICK, this, () => {
              this.closeSelf(!1);
          }),
              this.on(fx.SdkEvent.E_REWARD_GAIN, this, e => {
                  this.btn_skip['$_GID'] === e.gid &&
                      fx.SdkCode.REWARD_GAIN_SUCCESS === e.code &&
                      this.closeSelf(!0);
              });
      }
      closeSelf(e) {
          fx.SceneManager.closePanel(this),
              e && m.instance.goNextStage(),
              fx.SceneManager.changeScene(GameScene, {
                  from: 'gamescene'
              });
      }
  }

  class GameReviveDialog extends ui.scenes.GameReviveDialogUI {
      constructor() {
          super(), (this.revive = !1);
      }
      onAdd() {
          x.inst.clearCurTrySkin(),
              this.btn_notrevive.on(Laya.Event.CLICK, this, () => {
                  this.closeSelf(!1);
              }),
              this.on(fx.SdkEvent.E_REWARD_GAIN, this, e => {
                  this.btn_revive['$_GID'] === e.gid &&
                      fx.SdkCode.REWARD_GAIN_SUCCESS === e.code &&
                      this.closeSelf(!0);
              });
      }
      onEnter() {
          let e = 5;
          this.timerLoop(1e3, this, () => {
              --e >= 0 && (this.label_cd.value = `${e}`), e < 0 && this.closeSelf(!1);
          });
      }
      onRemove() {
          let e = m.instance;
          this.revive ? e.setGameState(o.E_GAME_START) : fx.SceneManager.openPanel(GameFailedDialog);
      }
      closeSelf(e) {
          (this.revive = e), fx.SceneManager.closePanel(this);
      }
  }

  class LotteryMultDialog extends ui.scenes.luckyDraw.LotteryMultDialogUI {
      constructor(...e) {
          super(), (this.coins = 0), ([, this.coins] = e);
      }
      onAdd() {
          this.img_close.on(Laya.Event.CLICK, this, () => {
              this.getReward(1);
          }),
              this.on(fx.SdkEvent.E_REWARD_GAIN, this, e => {
                  fx.SdkCode.REWARD_GAIN_SUCCESS === e.code &&
                      this.img_video['$_GID'] === e.gid &&
                      this.getReward(5);
              }),
              this.initUI();
      }
      initUI() {
          this.label_coins.value = 5 * this.coins + '';
      }
      getReward(e = 1) {
          fx.Sdk.instance.vibrate();
          let t = this.coins * e;
          fx.Effect.getPropEffect(this.label_coins, this.box_Coins, Laya.Handler.create(this, () => {
              y.instance.getPlayerInfo().addCoins(t),
                  fx.Sdk.instance.vibrate(),
                  fx.SceneManager.closePanel(this);
          }));
      }
  }

  class LotteryDialog extends ui.scenes.luckyDraw.LotteryDialogUI {
      constructor() {
          super(), (this.roleCId = void 0), (this.decorationInfo = void 0), (this.touchNum = 0);
      }
      onAdd() {
          (this.img_bg.height = Laya.stage.height),
              (this.img_bg.width = Laya.stage.width),
              (this.roleCId = x.inst.getLockedLotterId());
          let e = x.inst.getLockedSkinList(C.Player);
          e.length > 0 && (this.decorationInfo = e[fx.Utils.getIntRandom(0, e.length - 1)]),
              (this.dataArray = new Array());
          let t = [15, 20, 25, 30, 35, 40, 45, 50, 55], i = fx.Utils.randomInArrayEx([0, 1, 2, 3, 4, 5, 6, 7, 8], 2), s = [];
          for (let e = 0; e < 9; e++) {
              let n = {
                  type: void 0,
                  index: void 0,
                  isTouch: !1,
                  isVideo: !1
              };
              e == i[0] && this.roleCId
                  ? ((n.type = 2), (n.index = this.roleCId))
                  : ((n.type = 1), (n.index = t[fx.Utils.getIntRandom(0, t.length - 1)])),
                  this.dataArray.push(n),
                  s.push({
                      o: e,
                      weight: 1
                  });
          }
          if (!fx.Sdk.instance.isAudit()) {
              let e = fx.Utils.randomInArrayEx(s, 3);
              for (let t = 0; t < e.length; t++) {
                  const i = e[t];
                  this.dataArray[i.o].isVideo = !0;
              }
          }
          (this.lotteryList.renderHandler = new Laya.Handler(this, this.cellUpdata)),
              (this.lotteryList.dataSource = this.dataArray),
              this.roleCId
                  ? (this.bestRewardIcon.skin = fx.CfgMgr.instance.get('skinCfg', this.roleCId, 'icon'))
                  : ((this.bestRewardIcon.skin = 'res/img_coins.png'), this.bestRewardIcon.scale(0.5, 0.5)),
              this.refreshIcon();
      }
      onRemove() { }
      onEnter() {
          this.img_closeBtn.on(Laya.Event.CLICK, this, function () {
              fx.SceneManager.closePanel(this);
          }),
              this.getLotteryNumBtn.on(Laya.Event.MOUSE_DOWN, this, () => {
                  this.once(fx.SdkEvent.E_REWARD_GAIN, this, e => {
                      if (fx.SdkCode.REWARD_GAIN_SUCCESS === e.code) {
                          if (((this.img_closeBtn.visible = !0),
                              (y.instance.getPlayerInfo().keyNum = 3),
                              !fx.Sdk.instance.isAudit())) {
                              let e = [];
                              for (let t = 0; t < this.dataArray.length; t++) {
                                  const i = this.dataArray[t];
                                  (i.isVideo = !1),
                                      i.isTouch ||
                                          e.push({
                                              o: t,
                                              weight: 1
                                          });
                              }
                              let t = e.length - 3;
                              t = (t = t < 0 ? 0 : t) > 3 ? 3 : t;
                              let i = fx.Utils.randomInArrayEx(e, t);
                              for (let e = 0; e < i.length; e++) {
                                  const t = i[e];
                                  this.dataArray[t.o].isVideo = !0;
                              }
                          }
                          this.refreshIcon(), this.lotteryList.refresh();
                      }
                  });
              });
      }
      onExit() {
          y.instance.getPlayerInfo();
          fx.SceneManager.openPanel(BoxRewardDialog);
      }
      cellUpdata(e, t) {
          let i = this.dataArray[t], s = e.getChildByName('bg'), n = e.getChildByName('goldBox'), a = n.getChildByName('goldNum'), r = e.getChildByName('bestBg'), o = r.getChildByName('bestRewardIcon'), l = e.getChildByName('img_box'), h = l.getChildByName('img_video');
          r.getChildByName('box_debris');
          if ((1 == i.type && (a.value = i.index + ''), e.offAllCaller(this), e.ComponentIntance)) {
              e.ComponentIntance.destroy();
          }
          if (i.isTouch) {
              if ((s && (s.skin = 'res/luckyDraw/3.png'), (l.visible = !1), 1 == i.type))
                  (n.visible = !0), (r.visible = !1);
              else if (2 == i.type) {
                  (n.visible = !1), (r.visible = !0);
                  let e = x.inst.getCfgById(i.index);
                  o.skin = e.icon;
              }
          }
          else {
              var d = (e, t, i) => {
                  if (this.touchNum < fx.Utils.getIntRandom(1, 3) && (2 == e.type || 3 == e.type)) {
                      let i = [];
                      for (let e = 0; e < this.dataArray.length; e++) {
                          const s = this.dataArray[e];
                          e != t && (s.isTouch || 1 != s.type || i.push(e));
                      }
                      let s = i[fx.Utils.getIntRandom(0, i.length - 1)], n = this.dataArray[t];
                      (e = this.dataArray[t] = this.dataArray[s]), (this.dataArray[s] = n);
                  }
                  1 == e.type ? i.getReward(t, e.index) : 2 == e.type && i.changeSkinType(),
                      !e.isVideo &&
                          y.instance.getPlayerInfo().keyNum > 0 &&
                          (y.instance.getPlayerInfo().keyNum -= 1),
                      (this.touchNum += 1),
                      (i.dataArray[t].isTouch = !0),
                      i.lotteryList.refresh(),
                      i.refreshIcon();
              };
              y.instance.getPlayerInfo().keyNum <= 0 || i.isVideo
                  ? ((h.visible = !0),
                      e.on(Laya.Event.MOUSE_DOWN, this, () => {
                          this.once(fx.SdkEvent.E_REWARD_GAIN, this, e => {
                              fx.SdkCode.REWARD_GAIN_SUCCESS === e.code && d(i, t, this);
                          });
                      }),
                      e.ComponentIntance
                          ? (e.ComponentIntance = e.addComponentIntance(e.ComponentIntance))
                          : (e.ComponentIntance = e.addComponentIntance(new RewardBtnScript({
                              adId: 'videoID0',
                              customStrategy: 'video'
                          }))))
                  : ((h.visible = !1),
                      e.on(Laya.Event.CLICK, this, function (e, t) {
                          d(e, t, this);
                      }, [i, t, this])),
                  Laya.Tween.clearAll(l);
          }
      }
      refreshIcon() {
          for (let e = 1; e <= 3; e++) {
              const t = this[`lottery_${e}`];
              e <= 3 - y.instance.getPlayerInfo().keyNum
                  ? (t.source = Laya.loader.getRes('res/luckyDraw/6.png'))
                  : (t.source = Laya.loader.getRes('res/luckyDraw/7.png'));
          }
          let e = !0;
          for (let t = 0; t < this.dataArray.length; t++) {
              if (!this.dataArray[t].isTouch) {
                  e = !1;
                  break;
              }
          }
          e
              ? ((this.lotteryBg.visible = !1),
                  (this.getLotteryNumBtn.visible = !1),
                  (this.img_closeBtn.visible = !0),
                  (this.img_closeBtn.centerX = 0))
              : y.instance.getPlayerInfo().keyNum <= 0
                  ? ((this.lotteryBg.visible = !1),
                      (this.getLotteryNumBtn.visible = !0),
                      (this.img_closeBtn.visible = !0))
                  : ((this.lotteryBg.visible = !0),
                      (this.getLotteryNumBtn.visible = !1),
                      (this.img_closeBtn.visible = !1));
      }
      changeSkinType() {
          (this.bestRewardBg_1.visible = !0), x.inst.unlockSkin(this.roleCId);
      }
      btnPulseEff(e) {
          new fx.Sequence([
              {
                  t: 'to',
                  target: e,
                  props: {
                      scaleX: 1.15,
                      scaleY: 1.15
                  },
                  duration: 500,
                  ease: Laya.Ease.backOut,
                  complete: null,
                  completeArgs: null,
                  delay: 1e3
              },
              {
                  t: 'to',
                  target: e,
                  props: {
                      scaleX: 1,
                      scaleY: 1
                  },
                  duration: 500,
                  ease: Laya.Ease.backIn
              }
          ], !0).run();
      }
      getReward(e, t) {
          fx.SceneManager.openPanel(LotteryMultDialog, {
              from: '',
              userArgs: [t],
              closeOther: !1
          });
      }
  }

  class TrySkinDialog extends ui.scenes.TrySkinDialogUI {
      constructor(...e) {
          super(), (this.trySkinCfg = void 0), ([, this.callBack, this.cfg] = e);
      }
      onAdd() {
          this.cfg &&
              (this.updateUI(),
                  this.trySkinCfg ||
                      ((this.trySkinCfg = {
                          type: void 0,
                          cfg: void 0
                      }),
                          this.trySkinCfg.cfg || (this.trySkinCfg.cfg = this.cfg),
                          (this.trySkinCfg.type = x.inst.getSkinType(this.trySkinCfg.cfg.id))),
                  this.trySkinCfg
                      ? (this.img_closeBtn.on(Laya.Event.CLICK, this, () => {
                          this.closeSelf();
                      }),
                          this.btn_free.on(Laya.Event.CLICK, this, () => {
                              let e = y.instance.getPlayerInfo();
                              (e.trySkinNum = e.trySkinNum + 1),
                                  this.updateUI(),
                                  x.inst.setCurTrySkin(this.trySkinCfg.type, this.trySkinCfg.cfg.id),
                                  this.closeSelf();
                          }),
                          this.on(fx.SdkEvent.E_REWARD_GAIN, this, e => {
                              if (fx.SdkCode.REWARD_GAIN_SUCCESS === e.code && this.img_tryBtn['$_GID'] === e.gid) {
                                  let e = y.instance.getPlayerInfo();
                                  (e.trySkinNum = e.trySkinNum + 1),
                                      this.updateUI(),
                                      x.inst.setCurTrySkin(this.trySkinCfg.type, this.trySkinCfg.cfg.id),
                                      this.closeSelf();
                              }
                              if (fx.SdkCode.REWARD_GAIN_SUCCESS === e.code && this.btn_reTry['$_GID'] === e.gid) {
                                  let e = y.instance.getPlayerInfo();
                                  (e.trySkinNum = e.trySkinNum + 1),
                                      this.updateUI(),
                                      x.inst.setCurTrySkin(this.trySkinCfg.type, this.trySkinCfg.cfg.id),
                                      this.closeSelf();
                              }
                          }),
                          this.updateSkin3D())
                      : this.closeSelf());
      }
      closeSelf() {
          (this.box_scene3d.visible = !1),
              this.box_scene3d.destroyChildren(),
              fx.SceneManager.closePanel(this);
      }
      updateUI() {
          let e = y.instance.getPlayerInfo();
          0 === e.trySkinNum
              ? ((this.btn_free.visible = !0), (this.btn_reTry.visible = this.img_tryBtn.visible = !1))
              : 1 === e.trySkinNum
                  ? ((this.img_tryBtn.visible = !0), (this.btn_reTry.visible = this.btn_free.visible = !1))
                  : ((this.btn_reTry.visible = !0), (this.btn_free.visible = this.img_tryBtn.visible = !1));
      }
      onRemove() {
          this.callBack && this.callBack.run();
      }
      createScene3d() {
          (this.scene3d = new Laya.Scene3D()), this.box_scene3d.addChild(this.scene3d);
          let e = new Laya.Camera();
          (e.clearFlag = Laya.BaseCamera.CLEARFLAG_DEPTHONLY),
              e.transform.translate(new Laya.Vector3(0, 0.05, 1), !1),
              (e.normalizedViewport = this.getViewPort()),
              e.transform.rotate(new Laya.Vector3(0, 0, 0), !0, !1),
              this.scene3d.addChild(e);
          var t = this.scene3d.addChild(new Laya.DirectionLight());
          t.color = new Laya.Vector3(1, 1, 1);
          var i = t.transform.worldMatrix;
          i.setForward(new Laya.Vector3(-0.25, -1, -1)), (t.transform.worldMatrix = i);
      }
      getViewPort() {
          let e = this.box_scene3d.width;
          isNaN(this.box_scene3d.left) ||
              isNaN(this.box_scene3d.left) ||
              (e = Laya.stage.width - this.box_scene3d.left - this.box_scene3d.right);
          let t = this.box_scene3d.height;
          isNaN(this.box_scene3d.top) ||
              isNaN(this.box_scene3d.bottom) ||
              (t = Laya.stage.height - this.box_scene3d.top - this.box_scene3d.bottom);
          let i = this.box_scene3d.x;
          isNaN(this.box_scene3d.left) || (i = this.box_scene3d.left);
          let s = this.box_scene3d.y;
          return (isNaN(this.box_scene3d.top)
              ? isNaN(this.box_scene3d.bottom)
                  ? isNaN(this.box_scene3d.centerY) ||
                      (s = Laya.stage.height / 2 + this.box_scene3d.centerY - t / 2)
                  : (s = Laya.stage.height - this.box_scene3d.bottom - t)
              : (s = this.box_scene3d.top),
              new Laya.Viewport(i / Laya.stage.width, s / Laya.stage.height, e / Laya.stage.width, t / Laya.stage.height));
      }
      updateSkin3D() {
          this.scene3d || this.createScene3d();
          let t = this.trySkinCfg.cfg;
          t &&
              fx.Utils.create3dModel(t.model, this, t => {
                  if (!t || !this.scene3d || this.scene3d.destroyed)
                      return;
                  this.roleSp = t.clone();
                  let i = this.roleSp.transform.localScaleX;
                  (i *= 1.2),
                      this.roleSp.transform.setWorldLossyScale(new Laya.Vector3(i, i, i)),
                      (this.roleSp.transform.position = new Laya.Vector3(0, -0.5, -0.9)),
                      this.scene3d.addChild(this.roleSp),
                      fx.Helper.rotateAnim(this.roleSp, 360, 10, 0, 'y', !0),
                      R.handlePlayerModel(this.roleSp);
              });
      }
  }

  class GameScene extends ui.scenes.GameSceneUI {
      constructor(...e) {
          super(),
              (this.checkId = 0),
              (this.checkArr = []),
              (this.endId = 0),
              (this.endArr = []),
              ([this.from] = e);
      }
      static getRes() {
          let e = m.instance.getCurStage();
          return (this.scenePath = e.path), [this.scenePath, s.PFB_BILLBOARD];
      }
      onAdd() {
          let e = m.instance;
          e.init();
          let t = Laya.loader.getRes(GameScene.scenePath);
          if (!t) {
              console.error(`Resource not found at path: ${GameScene.scenePath}`);
              return;
          }
          this.scene3d = t;
          t && t.size && t.size(this.width, this.height);
          t.timer = e.getTimer();
          this.addChildAt(t, 0);
          this.init3D(t);
          this.initUI();
      }
      initUI() {
          let e = fx.Utils.createPrefab(s.PFB_BILLBOARD), t = 7 * (e.height / e.width), i = new fx.Billboard(7, t);
          i.setRenderTarget(e),
              (i.transform.position = new Laya.Vector3(10, 2, 30)),
              this.scene3d.addChild(i);
      }
      init3D(e) {
          let t = m.instance.getCurStage().selectTypes;
          -1 == t.indexOf(C.Player) && t.unshift(C.Player),
              m.instance.setSelectTypes(t),
              e.addComponent(Ie);
      }
      onEnter() {
          console.log('GameSceneGameSceneGameScene');
          fx.EventCenter.instance.on(a.E_GAME_STATE_CHANGED, this, this.onGameStateChange),
              this.enableMouseEvent(!0),
              fx.SoundManager.instance.playMusic('res/sound/bgm.mp3');
      }
      onExit() { }
      enableMouseEvent(e = !0) {
          if (!this.scene3d) {
              console.error('scene3d is not initialized');
              return;
          }
          e
              ? (this.scene3d.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown),
                  this.scene3d.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove),
                  this.scene3d.on(Laya.Event.MOUSE_UP, this, this.onMouseUp),
                  this.scene3d.on(Laya.Event.MOUSE_OUT, this, this.onMouseUp))
              : (this.scene3d.off(Laya.Event.MOUSE_DOWN, this, this.onMouseDown),
                  this.scene3d.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove),
                  this.scene3d.off(Laya.Event.MOUSE_UP, this, this.onMouseUp),
                  this.scene3d.off(Laya.Event.MOUSE_OUT, this, this.onMouseUp));
      }
      onGameStateChange(e) {
          switch (m.instance.getGameState()) {
              case o.E_GAME_FINISH:
                  this.finished();
                  break;
              case o.E_GAME_FAILED:
                  this.onFailed();
                  break;
              case o.E_GAME_OVER:
                  this.gameOver();
                  break;
              case o.E_GAME_PAUSE:
                  break;
              case o.E_GAME_START:
                  e == o.E_GAME_FAILED ? this.revive() : this.start();
          }
      }
      onMouseDown(e) {
          m.instance.getGameState() == o.E_GAME_READY &&
              (this.checkAutoDialog(),
                  fx.Sdk.instance.showBanner(void 0, {
                      isPostLoadedShow: !0
                  }));
      }
      onMouseMove(e) { }
      onMouseUp(e) { }
      start() { }
      finished() {
          this.offAll(), this.timerOnce(2e3, this, this.checkEndDialog);
      }
      onFailed() {
          fx.SceneManager.openPanel(GameFailedDialog);
      }
      gameOver() { }
      revive() {
          fx.SceneManager.openPanel(GameReviveDialog);
      }
      clear() {
          this.enableMouseEvent(!1);
      }
      checkAutoDialog() {
          this.checkArr = [this.checkTrySkin];
          for (let e = this.checkId; e < this.checkArr.length; ++e)
              if ((this.checkId++, this.checkArr[e].apply(this)))
                  return;
          m.instance.setGameState(o.E_GAME_START);
      }
      checkTrySkin() {
          let e = fx.CfgMgr.instance.getConstant('trySkinStart'), t = fx.CfgMgr.instance.getConstant('trySkinInterval'), i = fx.Sdk.instance.getServerJsonCfg();
          if ((i && i.skinTryStartLev && ((e = i.skinTryStartLev), (t = i.skinTrySpace)),
              fx.Sdk.instance.checkStageOnoff(e, t))) {
              let e = m.instance.getSelectTypes(), t = x.inst.getlockedTryList();
              if (t && t.length > 0) {
                  let i = [], s = void 0;
                  for (const s of t)
                      e.includes(s.type) && i.push(s);
                  if ((i.length > 0 && (s = fx.Utils.randomInArrayEx(i, 1)[0].id), s))
                      return (fx.SceneManager.openPanel(TrySkinNumDialog, {
                          from: 'gamescene',
                          userArgs: [Laya.Handler.create(this, this.checkAutoDialog), s]
                      }),
                          !0);
              }
              let i = x.inst.getTrySkin(e);
              return (!!(i && i.length > 0) &&
                  (fx.SceneManager.openPanel(TrySkinDialog, {
                      from: 'gamescene',
                      userArgs: [Laya.Handler.create(this, this.checkAutoDialog), i[0]]
                  }),
                      !0));
          }
      }
      checkEndDialog() {
          this.endArr = [];
          for (let e = this.endId; e < this.endArr.length; ++e)
              if ((this.endId++, this.endArr[e].apply(this)))
                  return;
          1 == m.instance.player.getComponent(B).getRaceRank()
              ? y.instance.getPlayerInfo().keyNum >= 3
                  ? fx.SceneManager.openPanel(LotteryDialog)
                  : fx.SceneManager.openPanel(BoxRewardDialog)
              : fx.SceneManager.openPanel(GameFailedDialog);
      }
  }

  class LoadingScript extends Laya.Script {
      constructor() {
          super();
          this.packages = ['res', 'res3d', 'libsSp'];
          this.count = this.packages.length;
      }
      onEnable() {
          let e = this.owner.getChildByName('pb_progressBg'), t = e.getChildByName('pb_progress');
          t.width = 1e-4;
          this.pb_progress = t;
          this.pb_progressBg = e;
          this.loginServer();
      }
      onDisable() {
          fx.EventCenter.instance.offAllCaller(this);
      }
      loadNext() {
          if (0 == this.packages.length)
              return console.log('分包加载完成！'), void this.loginServer();
          let e = this.packages.shift(), t = fx.Sdk.instance.loadSubpackage({
              name: e,
              success: this.onLoadSuccess.bind(this)
          });
          if (!t)
              return void this.loadNext();
          let i = this.count, s = i - this.packages.length - 1;
          t.onProgressUpdate(e => {
              let t;
              (t = e.progress > 1 ? (0.01 * e.progress + s) / i : (e.progress + s) / i) >= 0 &&
                  (this.pb_progress.width = this.pb_progressBg.width * t),
                  console.log(e, t);
          });
      }
      onLoadSuccess(e) {
          console.log(e);
          this.loadNext();
      }
      loginServer() {
          fx.EventCenter.instance.once(fx.SdkEvent.E_SDK_INIT_OK, this, e => {
              console.log('SDK 初始化完成！');
              this.complete(e);
          });
          fx.Sdk.instance.init();
      }
      complete(e) {
          this.pb_progress.width = this.pb_progressBg.width;
          y.instance.init();
          m.instance.init();
          console.log(m.instance.init());
          x.inst.init();
          ae.inst.init();
          he.inst.init();
          Te.instance.init();
          re.instance.init();
          Laya.timer.callLater(this, function () {
              console.log('切换游戏场景！');
              fx.SceneManager.changeScene(GameScene, {
                  from: 'loading'
              });
          });
      }
  }

  class TimeControl extends Laya.Script {
      constructor() {
          super(), (this.Intime = 8), (this.timer = Laya.timer), (this.targetTime = 0);
      }
      onEnable() {
          this.initUI(), fx.EventCenter.instance.on(a.E_TIME_BEGIN, this, this.initUI);
      }
      initUI() {
          let e = this.owner;
          e &&
              (y.instance.getPlayerInfo().turntableFreetime > 0
                  ? (e.visible = !1)
                  : ((e.visible = !0), this.lessTime(), this.timer.loop(1e3, this, this.lessTime)));
      }
      lessTime() {
          this.targetTime =
              60 * this.Intime * 60 * 1e3 - (fx.Utils.getTime() - y.instance.getPlayerInfo().departureTime);
          let e = Math.floor(this.targetTime / 1e3);
          --e <= 0 &&
              ((he.inst.turntableFreetime = 1),
                  (y.instance.getPlayerInfo().departureTime = fx.Utils.getTime()));
          let t = this.owner.getChildByName('tili_time');
          if (y.instance.getPlayerInfo().turntableFreetime > 0) {
              (this.owner['visible'] = !1),
                  this.timer.clear(this, this.lessTime),
                  (y.instance.getPlayerInfo().departureTime = void 0);
          }
          let i = Math.floor(e / 3600) % 60, s = Math.floor(e / 60) % 60, n = e % 60;
          t.text = (i < 10 ? '0' + i : i) + ':' + (s < 10 ? '0' + s : s) + ':' + (n < 10 ? '0' + n : n);
      }
      onDisable() { }
  }

  class GameConfig {
      constructor() {
      }
      static init() {
          var reg = Laya.ClassUtils.regClass;
          reg("script/RewardBtnScript.ts", RewardBtnScript);
          reg("script/ScaleEffectBtn.ts", ScaleEffectBtn);
          reg("script/PulseEffectBtn.ts", PulseEffectBtn);
          reg("script/core/SelectAnimalScript.ts", SelectAnimalScript);
          reg("script/core/GuideScript.ts", GuideScript);
          reg("script/core/BoxCoinScript.ts", BoxCoinScript);
          reg("script/Flashing.ts", Flashing);
          reg("script/core/PlayerDistanceScript.ts", PlayerDistanceScript);
          reg("script/core/StageProgress.ts", StageProgress);
          reg("script/core/EnergyScript.ts", EnergyScript);
          reg("script/core/GameSceneUiScript.ts", GameSceneUiScript);
          reg("script/core/LoadingScript.ts", LoadingScript);
          reg("script/TimeControl.ts", TimeControl);
      }
  }
  GameConfig.width = 750;
  GameConfig.height = 1334;
  GameConfig.scaleMode = "fixedauto";
  GameConfig.screenMode = "vertical";
  GameConfig.alignV = "middle";
  GameConfig.alignH = "center";
  GameConfig.startScene = "scenes/LoadingScene.scene";
  GameConfig.sceneRoot = "";
  GameConfig.debug = false;
  GameConfig.stat = false;
  GameConfig.physicsDebug = false;
  GameConfig.exportSceneToJson = true;
  GameConfig.init();

  class Fe {
  }
  Fe.version = '1.0.0';
  Fe.manifestFile = 'version.json';
  Fe.user_unique_id = 'test_user_1312527';
  Fe.platform = fx.PlatformType.FTNN;
  Fe.server_url = '';
  Fe.server_url_common = '';
  Fe.server_cfg_url = '';
  Fe.res_server_url = '';
  Fe.local_share_title = '';
  Fe.local_share_image = '';
  Fe.ald_share_enable = !1;
  Fe.appSid = '';
  Fe.appId = 'wx87a9537afa90df78';
  Fe.stat = '';
  Fe.saveDurSec = 3;
  Fe.showBQ = !1;
  Fe.channel_AdIds = {
      videoId: '111',
      nativeAdId: ['', ''],
      bannerId: '',
      interstitialId: '',
      appBoxId: '',
      blockId: ''
  };

  new (class extends fx.AppBase {
      constructor() {
          let e = GameConfig;
          fx.Sdk.sInit(Fe);
          super(e, Fe.manifestFile);
          Laya.MouseManager.multiTouchEnabled = !1;
      }
      onLoaded() {
          fx.CfgMgr.instance.loadJson(s.JSON_GAME_CFG, Laya.Handler.create(this, () => {
              this.launch();
          }));
      }
      initGraphicsSetting(e) {
          super.initGraphicsSetting(e),
              fx.Utils.isOnPC() &&
                  ((fx.GraphicsCfg.enableShadow = !0), (fx.GraphicsCfg.enableMultiLight = !0));
      }
  })();

}());
