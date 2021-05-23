/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/bird.js":
/*!*****************************!*\
  !*** ./src/scripts/bird.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Bird = /*#__PURE__*/function () {
  function Bird(ctx, birdProperties) {
    _classCallCheck(this, Bird);

    this.ctx = ctx;
    this.x = birdProperties.x;
    this.y = birdProperties.y;
    this.radius = birdProperties.rad;
    this.mass = 2;
    this.velX = 0;
    this.velY = 0;
    this.transfer = 0.9;
    this.gravity = {
      x: 0,
      y: 0.1
    };
    this.ground = this.ctx.canvas.height - 20;
    this.bounce = 0.5;
    this.frictionX = 0.9;
    this.bird = new Image();
    this.bird.src = "src/images/angered-birdy.png";
    this.state = "startState";
  }

  _createClass(Bird, [{
    key: "render",
    value: function render() {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      this.ctx.clip();
      this.ctx.closePath();
      this.ctx.drawImage(this.bird, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
      this.ctx.restore();
    }
  }]);

  return Bird;
}();

/* harmony default export */ __webpack_exports__["default"] = (Bird);

/***/ }),

/***/ "./src/scripts/block.js":
/*!******************************!*\
  !*** ./src/scripts/block.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Block Collision Detection from https://stackoverflow.com/questions/36784456/calculating-angular-velocity-after-a-collision
var Block = /*#__PURE__*/function () {
  function Block(ctx, x, y, w, h) {
    _classCallCheck(this, Block);

    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = 0.1;
    this.dx = 0;
    this.dy = 0;
    this.dr = 0;
    this.INSET = 10;
    this.PI = Math.PI;
    this.PI90 = Math.PI / 2;
    this.PI2 = Math.PI * 2;
    this.WALL_NORMS = [Math.PI / 2, Math.PI, -(Math.PI / 2), 0];
    this._ground = this.canvas.height - 105;
    this.mass = this.getMass();
    this.block = new Image();
    this.block.src = "src/images/woodenBox.png";
  }

  _createClass(Block, [{
    key: "render",
    value: function render() {
      this.ctx.save();
      this.ctx.setTransform(1, 0, 0, 1, this.x, this.y);
      this.ctx.rotate(this.r);
      this.ctx.drawImage(this.block, -this.w / 2, -this.h / 2, this.w, this.h);
      this.ctx.restore();
    }
  }, {
    key: "update",
    value: function update() {
      this.x += this.dx;
      this.y += this.dy;
      this.dy += 0.061;
      this.r += this.dr;

      for (var i = 0; i < 4; i++) {
        var p = this.getPoint(i); // only do one collision per frame or we will end up adding energy

        if (p.pos.x < this.INSET) {
          this.x += this.INSET - p.pos.x;
          this.doCollision(p, 3);
        } else if (p.pos.x > this.canvas.width - this.INSET) {
          this.x += this.canvas.width - this.INSET - p.pos.x;
          this.doCollision(p, 1);
        } else if (p.pos.y < this.INSET) {
          this.y += this.INSET - p.pos.y;
          this.doCollision(p, 0);
        } else if (p.pos.y > this.canvas.height - this.INSET) {
          this.y += this.canvas.height - this.INSET - p.pos.y;
          this.doCollision(p, 2);
        }
      }
    }
  }, {
    key: "getMass",
    value: function getMass() {
      return this.w * this.h * this.h / 1000;
    }
  }, {
    key: "getPoint",
    value: function getPoint(which) {
      var dx, dy, x, y, xx, yy, velocityA, velocityT, velocity;
      dx = Math.cos(this.r);
      dy = Math.sin(this.r);

      switch (which) {
        case 0:
          x = -this.w / 2;
          y = -this.h / 2;
          break;

        case 1:
          x = this.w / 2;
          y = -this.h / 2;
          break;

        case 2:
          x = this.w / 2;
          y = this.h / 2;
          break;

        case 3:
          x = -this.w / 2;
          y = this.h / 2;
          break;

        case 4:
          x = this.x;
          y = this.y;
      }

      var xx, yy;
      xx = x * dx + y * -dy;
      yy = x * dy + y * dx;
      var details = this.asPolar(this.vector(xx, yy));
      xx += this.x;
      yy += this.y;
      velocityA = this.polar(details.mag * this.dr, details.dir + this.PI90);
      velocityT = this.vectorAdd(velocity = this.vector(this.dx, this.dy), velocityA);
      return {
        velocity: velocity,
        velocityT: velocityT,
        velocityA: velocityA,
        pos: this.vector(xx, yy),
        radius: details.mag
      };
    }
  }, {
    key: "polar",
    value: function polar() {
      var mag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var dir = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return this.validatePolar({
        dir: dir,
        mag: mag
      });
    }
  }, {
    key: "vector",
    value: function vector() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return {
        x: x,
        y: y
      };
    }
  }, {
    key: "validatePolar",
    value: function validatePolar(vec) {
      if (this.isPolar(vec)) {
        if (vec.mag < 0) {
          vec.mag = -vec.mag;
          vec.dir += this.PI;
        }
      }

      return vec;
    }
  }, {
    key: "polarToCart",
    value: function polarToCart(pVec) {
      var retV = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        x: 0,
        y: 0
      };
      retV.x = Math.cos(pVec.dir) * pVec.mag;
      retV.y = Math.sin(pVec.dir) * pVec.mag;
      return retV;
    }
  }, {
    key: "asPolar",
    value: function asPolar(vec) {
      if (this.isCart(vec)) {
        return this.cartToPolar(vec);
      }

      if (vec.mag < 0) {
        vec.mag = -vec.mag;
        vec.dir += this.PI;
      }

      return {
        dir: vec.dir,
        mag: vec.mag
      };
    }
  }, {
    key: "isCart",
    value: function isCart(vec) {
      if (vec.x !== undefined && vec.y !== undefined) {
        return true;
      }

      return false;
    }
  }, {
    key: "isPolar",
    value: function isPolar(vec) {
      if (vec.mag !== undefined && vec.dir !== undefined) {
        return true;
      }

      return false;
    }
  }, {
    key: "asCart",
    value: function asCart(vec) {
      if (this.isPolar(vec)) {
        return this.polarToCart(vec);
      }

      return {
        x: vec.x,
        y: vec.y
      };
    }
  }, {
    key: "cartToPolar",
    value: function cartToPolar(vec) {
      var retV = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        dir: 0,
        mag: 0
      };
      retV.dir = Math.atan2(vec.y, vec.x);
      retV.mag = Math.hypot(vec.x, vec.y);
      return retV;
    }
  }, {
    key: "vectorAdd",
    value: function vectorAdd(vec1, vec2) {
      var v1 = this.asCart(vec1);
      var v2 = this.asCart(vec2);
      return this.vector(v1.x + v2.x, v1.y + v2.y);
    }
  }, {
    key: "applyForce",
    value: function applyForce(force, loc) {
      this.validatePolar(force);
      var l = this.asCart(loc);
      var toCenter = this.asPolar(this.vector(this.x - l.x, this.y - l.y));
      var pheta = toCenter.dir - force.dir;
      var Fv = Math.cos(pheta) * force.mag;
      var Fa = Math.sin(pheta) * force.mag;
      var accel = this.asPolar(toCenter);
      accel.mag = Fv / this.mass;
      var deltaV = this.asCart(accel);
      this.dx += deltaV.x;
      this.dy += deltaV.y;
      var accelA = Fa / (toCenter.mag * this.mass);
      this.dr += accelA;
    }
  }, {
    key: "vectorComponentsForDir",
    value: function vectorComponentsForDir(vec, dir) {
      var v = this.asPolar(vec);
      var pheta = v.dir - dir;
      var Fv = Math.cos(pheta) * v.mag;
      var Fa = Math.sin(pheta) * v.mag;
      var d1 = dir;
      var d2 = dir + this.PI90;

      if (Fv < 0) {
        d1 += this.PI;
        Fv = -Fv;
      }

      if (Fa < 0) {
        d2 += this.PI;
        Fa = -Fa;
      }

      return {
        along: this.polar(Fv, d1),
        tangent: this.polar(Fa, d2)
      };
    }
  }, {
    key: "doCollision",
    value: function doCollision(pointDetails, wallIndex) {
      var vv = this.asPolar(pointDetails.velocity);
      var va = this.asPolar(pointDetails.velocityA);
      var vvc = this.vectorComponentsForDir(vv, this.WALL_NORMS[wallIndex]);
      var vac = this.vectorComponentsForDir(va, this.WALL_NORMS[wallIndex]);
      vvc.along.mag *= 1.18;
      vac.along.mag *= 1.18;
      vvc.along.mag *= this.mass;
      vac.along.mag *= this.mass;
      vvc.along.dir += this.PI;
      vac.along.dir += this.PI;
      vvc.tangent.mag *= 0.18;
      vac.tangent.mag *= 0.18;
      vvc.tangent.mag *= this.mass;
      vac.tangent.mag *= this.mass;
      vvc.tangent.dir += this.PI;
      vac.tangent.dir += this.PI;
      this.applyForce(vvc.along, pointDetails.pos);
      this.applyForce(vvc.tangent, pointDetails.pos);
      this.applyForce(vac.along, pointDetails.pos);
      this.applyForce(vac.tangent, pointDetails.pos);
    }
  }]);

  return Block;
}();

/* harmony default export */ __webpack_exports__["default"] = (Block);

/***/ }),

/***/ "./src/scripts/canvas.js":
/*!*******************************!*\
  !*** ./src/scripts/canvas.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Canvas = /*#__PURE__*/function () {
  function Canvas() {
    _classCallCheck(this, Canvas);

    this.canvas = document.createElement("canvas");
    this.canvas.width = 1400;
    this.canvas.height = 750;
    this.ctx = this.canvas.getContext("2d");
    this.bindCanvasToDOM();
  }

  _createClass(Canvas, [{
    key: "bindCanvasToDOM",
    value: function bindCanvasToDOM() {
      if (document.querySelector(".main-canvas") !== null) {
        this.clearCanvas();
        return;
      }

      document.body.append(this.canvas);
      this.canvas.classList.add("main-canvas");
    }
  }, {
    key: "clearCanvas",
    value: function clearCanvas() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }, {
    key: "removeCanvasFromDOM",
    value: function removeCanvasFromDOM() {
      document.getElementById("main-body").removeChild(this.canvas);
    }
  }]);

  return Canvas;
}();

/* harmony default export */ __webpack_exports__["default"] = (Canvas);

/***/ }),

/***/ "./src/scripts/game.js":
/*!*****************************!*\
  !*** ./src/scripts/game.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas */ "./src/scripts/canvas.js");
/* harmony import */ var _stageLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stageLoader */ "./src/scripts/stageLoader.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import "./styles/index.scss";



var AngeredBirds = /*#__PURE__*/function () {
  function AngeredBirds() {
    _classCallCheck(this, AngeredBirds);

    this.start = this.start.bind(this);
  }

  _createClass(AngeredBirds, [{
    key: "start",
    value: function start() {
      var _this = this;

      var that = this;
      this.animating = true;
      this.canvas = new _canvas__WEBPACK_IMPORTED_MODULE_0__.default();
      this.canvas.bindCanvasToDOM();
      this.initializeEntities();

      this.animation = function () {
        _this.canvas.clearCanvas();

        if (_this.animating) {
          _this.stageLoader.update();

          _this.interval = window.requestAnimationFrame(_this.animation);

          if (that.stageLoader.checkStageWon()) {
            that.winLevel();
          }

          ;

          if (that.stageLoader.checkStageLost()) {
            that.gameOver();
          }

          ;
        }
      };

      window.requestAnimationFrame(this.animation);
    }
  }, {
    key: "initializeEntities",
    value: function initializeEntities() {
      this.stageLoader = new _stageLoader__WEBPACK_IMPORTED_MODULE_1__.default(this.canvas.ctx);
      this.stageLoader.initializeEntities();
      this.stageLoader.initializeEventListeners();
    }
  }, {
    key: "winLevel",
    value: function winLevel() {
      this.stageLoader.stageNumber += 1;
      this.stageLoader.restartEntities();
      this.stageLoader.initializeEntities();
    }
  }, {
    key: "gameOver",
    value: function gameOver() {
      this.stageLoader.restartEntities();
      this.stageLoader.initializeEntities();
    }
  }]);

  return AngeredBirds;
}();

/* harmony default export */ __webpack_exports__["default"] = (AngeredBirds);

/***/ }),

/***/ "./src/scripts/pig.js":
/*!****************************!*\
  !*** ./src/scripts/pig.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Pig = /*#__PURE__*/function () {
  function Pig(ctx, x, y, radius) {
    var velX = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var velY = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

    _classCallCheck(this, Pig);

    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.radius = radius;
    this.mass = 2;
    this.gravity = {
      x: 0,
      y: 0.1
    };
    this.ground = this.ctx.canvas.height - 30;
    this.bounce = 0.4;
    this.frictionX = 0.9;
    this.mass = 2;
    this.pig = new Image();
    this.pig.src = "src/images/piggy.png";
    this.state = "alive";
    this.poof = new Image();
    this.poof.src = "src/images/poof.png";
    this.startTimer;
  }

  _createClass(Pig, [{
    key: "render",
    value: function render() {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      this.ctx.clip();
      this.ctx.closePath();
      this.ctx.drawImage(this.pig, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
      this.ctx.restore();
    }
  }, {
    key: "update",
    value: function update() {
      this.velX += this.gravity.x;
      this.velY += this.gravity.y;
      this.x += this.velX;
      this.y += this.velY;

      if (this.y >= this.ground) {
        this.y = this.ground - (this.y - this.ground);
        this.velY = -Math.abs(this.velY) * this.bounce;

        if (this.velY >= this.gravity.y) {
          this.velY = 0;
          this.y = this.ground - this.gravity.y;
        }

        if (this.velX > 0) {
          this.velX -= this.frictionX;
        }

        if (this.velX < 0) {
          this.velX += this.frictionX;
        }
      } // stops ball from bouncing in Y axis


      if (this.velY < 0 && this.velY > -2.1) {
        this.velY = 0;
      } // stops ball from moving on X axis if x-velocity < 1.1


      if (Math.abs(this.velX) < 1.1) {
        this.velX = 0;
      }
    }
  }, {
    key: "poofAnimationTimerBoolean",
    value: function poofAnimationTimerBoolean() {
      this.pig.src = "src/images/poof.png";
      this.radius = 35;
      var timestamp = new Date().getTime();

      if (this.startTimer === undefined) {
        this.startTimer = timestamp;
      }

      var elapsed = timestamp - this.startTimer;

      if (elapsed > 3000) {
        return true;
      }
    }
  }]);

  return Pig;
}();

/* harmony default export */ __webpack_exports__["default"] = (Pig);

/***/ }),

/***/ "./src/scripts/projectile.js":
/*!***********************************!*\
  !*** ./src/scripts/projectile.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bird__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bird */ "./src/scripts/bird.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Projectile = /*#__PURE__*/function () {
  function Projectile(ctx, birdProperties) {
    _classCallCheck(this, Projectile);

    this.ctx = ctx;
    this.launchedObjects = [];
    this.max = 1;
    this.birdProperties = birdProperties;
    this.projectileImage = new Image();
    this.projectileImage.src = "src/images/slingS.png";
    this.lives = new Image();
    this.lives.src = "src/images/angered-birdy.png";
    this.lastLiveTimer;
    this.indicatorImage = new Image();
    this.indicatorImage.src = "src/images/indictor.png";
  }

  _createClass(Projectile, [{
    key: "kickOffLaunchDirection",
    value: function kickOffLaunchDirection(angleVal, magnitudeVal) {
      var angle = Math.PI * angleVal / 180;
      this.currentProjectileObject = new _bird__WEBPACK_IMPORTED_MODULE_0__.default(this.ctx, this.birdProperties);
      this.objectLaunched = new ObjectLaunch(this.ctx, this.currentProjectileObject);
      this.objectLaunched.objectType.velY = -magnitudeVal * Math.sin(angle);
      this.objectLaunched.objectType.velX = magnitudeVal * Math.cos(angle);
      this.objectLaunched.objectType.transfer = 0.8;
      this.launchedObjects.push(this.objectLaunched);
      this.updateLives();
    }
  }, {
    key: "update",
    value: function update() {
      if (this.launchedObjects.length > this.max) {
        this.launchedObjects = this.launchedObjects.splice(1);
      }

      for (var i = 0; i < this.launchedObjects.length; i++) {
        var currentObject = this.launchedObjects[i].objectType;
        currentObject.velY += 1.53;
        currentObject.x += currentObject.velX / 3;
        currentObject.y += currentObject.velY / 3;
        this.launchedObjects[i].updateCurrentLaunchedObject();
      }
    }
  }, {
    key: "render",
    value: function render() {
      this.ctx.drawImage(this.projectileImage, this.birdProperties.x - 33, this.birdProperties.y - 20, 75, 140);

      for (var i = 0; i < this.launchedObjects.length; i++) {
        var currentBird = this.launchedObjects[i].objectType;
        currentBird.render();
      }
    }
  }, {
    key: "updateLives",
    value: function updateLives() {
      this.birdProperties.playerLives -= 1;
    }
  }, {
    key: "renderLives",
    value: function renderLives() {
      for (var i = 10; i < this.birdProperties.playerLives * 50; i += 50) {
        this.ctx.beginPath();
        this.ctx.drawImage(this.lives, i, 50, 30, 30);
        this.ctx.closePath();
      }
    }
  }, {
    key: "renderIndictor",
    value: function renderIndictor() {
      if (!this.currentProjectileObject) {
        this.ctx.drawImage(this.indicatorImage, this.birdProperties.x - 85, this.birdProperties.y - 35, 140, 140);
      }
    }
  }, {
    key: "lostAllProjectileObjects",
    value: function lostAllProjectileObjects() {
      if (this.birdProperties.playerLives === 0 && this.currentProjectileObject.state === "endState") {
        var timestamp = new Date().getTime();

        if (this.lastLiveTimer === undefined) {
          this.lastLiveTimer = timestamp;
        }

        var elapsed = timestamp - this.lastLiveTimer;

        if (elapsed > 500) {
          return true;
        }
      }
    }
  }]);

  return Projectile;
}();

var ObjectLaunch = /*#__PURE__*/function () {
  function ObjectLaunch(ctx, objectType) {
    _classCallCheck(this, ObjectLaunch);

    this.ctx = ctx;
    this.objectType = objectType;
  }

  _createClass(ObjectLaunch, [{
    key: "renderObjectLaunch",
    value: function renderObjectLaunch() {
      this.objectType.render();
    }
  }, {
    key: "updateCurrentLaunchedObject",
    value: function updateCurrentLaunchedObject() {
      var currentObject = this.objectType;
      currentObject.velX += currentObject.gravity.x;
      currentObject.velY += currentObject.gravity.y;
      currentObject.x += currentObject.velX;
      currentObject.y += currentObject.velY;

      if (currentObject.y >= currentObject.ground) {
        currentObject.y = currentObject.ground - (currentObject.y - currentObject.ground);
        currentObject.velY = -Math.abs(currentObject.velY) * currentObject.bounce;

        if (currentObject.velY >= currentObject.gravity.y) {
          currentObject.velY = 0;
          currentObject.y = currentObject.ground - currentObject.gravity.y;
        }

        if (currentObject.velX > 0) {
          currentObject.velX -= currentObject.frictionX;
        }

        if (currentObject.velX < 0) {
          currentObject.velX += currentObject.frictionX;
        }
      } // stops ball from bouncing in Y axis


      if (currentObject.y >= currentObject.ground - 10) {
        if (currentObject.velY <= 0 && currentObject.velY > -2.5) {
          currentObject.velY = 0;
          currentObject.state = "endState";
        }
      } // stops ball from moving on X axis 


      if (Math.abs(currentObject.velX) < 1.1) {
        currentObject.velX = 0;
      }
    }
  }]);

  return ObjectLaunch;
}();

/* harmony default export */ __webpack_exports__["default"] = (Projectile);

/***/ }),

/***/ "./src/scripts/stageLoader.js":
/*!************************************!*\
  !*** ./src/scripts/stageLoader.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pig */ "./src/scripts/pig.js");
/* harmony import */ var _block__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block */ "./src/scripts/block.js");
/* harmony import */ var _projectile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projectile */ "./src/scripts/projectile.js");
/* harmony import */ var _stages_stageKeys__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stages/stageKeys */ "./src/scripts/stages/stageKeys.js");
/* harmony import */ var _util_collisionDetectionUtil__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util/collisionDetectionUtil */ "./src/scripts/util/collisionDetectionUtil.js");
/* harmony import */ var _util_collisionLogicUtil__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util/collisionLogicUtil */ "./src/scripts/util/collisionLogicUtil.js");
/* harmony import */ var _util_stateLogic__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./util/stateLogic */ "./src/scripts/util/stateLogic.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }









var StageLoader = /*#__PURE__*/function () {
  function StageLoader(ctx) {
    _classCallCheck(this, StageLoader);

    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.score = 0;
    this.stageNumber = 1;
    this.startPosBird = [];
    this.projectileObject = {};
    this.pigs = [];
    this.blocks = [];
    this.clickedImage = new Image();
    this.clickedImage.src = "src/images/poof.png";
  }

  _createClass(StageLoader, [{
    key: "update",
    value: function update() {
      this.updateEntities();
      if (this.projectileObject.objectLaunched) this.checkAndUpdateEntitiesCollision();
      this.renderEntities();
    }
  }, {
    key: "initializeEventListeners",
    value: function initializeEventListeners() {
      var mouse = {
        x: this.canvas.width / 2,
        y: this.canvas.height / 2
      };
      this.canvas.addEventListener('mouseup', function (e) {
        if (this.projectileObject.launchedObjects.length === 0 || this.projectileObject.currentProjectileObject.state === "endState") {
          var canvasProperties = this.canvas.getBoundingClientRect();
          mouse.x = e.x - canvasProperties.left;
          mouse.y = e.y - canvasProperties.top;
          var deltaX = mouse.x - this.startPosBird[0];
          var deltaY = mouse.y - this.startPosBird[1];
          var thetaRadian = Math.atan2(deltaY, deltaX);
          var angleVal = -((Math.abs(thetaRadian * 180 / Math.PI) - 270) % 90);
          var magnitudeVal = Math.abs(mouse.x - 130) / 2;
          console.log(mouse.x, mouse.y);
          this.projectileObject.kickOffLaunchDirection(angleVal, magnitudeVal);
        }
      }.bind(this));
    }
  }, {
    key: "initializeEntities",
    value: function initializeEntities() {
      var currentStageValues = _stages_stageKeys__WEBPACK_IMPORTED_MODULE_3__.stageKeys[this.stageNumber];
      this.loadStage(currentStageValues);
    }
  }, {
    key: "restartEntities",
    value: function restartEntities() {
      this.score = 0;
      this.startPosBird = [];
      this.projectileObject.birdProperties.playerLives = this.startingLives;
      this.projectileObject = {};
      this.pigs = [];
      this.blocks = [];
    }
  }, {
    key: "loadStage",
    value: function loadStage(currentStageValues) {
      this.background = new Image();
      this.background.src = currentStageValues["backGroundImageKey"];
      this.projectileObject = new _projectile__WEBPACK_IMPORTED_MODULE_2__.default(this.ctx, currentStageValues["birdProperties"]);
      this.startingLives = currentStageValues["birdProperties"].playerLives;
      this.startPosBird = [currentStageValues["birdProperties"].x, currentStageValues["birdProperties"].y];
      this.currentLevelHighScoreKey = currentStageValues["currentLevelHighScoreKey"];
      var highScoreSaveKeyString = localStorage.getItem(this.currentLevelHighScoreKey);

      if (highScoreSaveKeyString === null) {
        this.highScore = 0;
      } else {
        this.highScore = parseInt(highScoreSaveKeyString);
      }

      for (var i = 0; i < currentStageValues["numberOfPigs"]; i++) {
        this.pigs.push(new _pig__WEBPACK_IMPORTED_MODULE_0__.default(this.ctx, currentStageValues["pigProperties"][i].x, currentStageValues["pigProperties"][i].y, currentStageValues["pigProperties"][i].rad));
      }

      for (var _i = 0; _i < currentStageValues["numberOfBlocks"]; _i++) {
        this.blocks.push(new _block__WEBPACK_IMPORTED_MODULE_1__.default(this.ctx, currentStageValues["blockProperites"][_i].x, currentStageValues["blockProperites"][_i].y, currentStageValues["blockProperites"][_i].w, currentStageValues["blockProperites"][_i].h));
      }
    }
  }, {
    key: "updateEntities",
    value: function updateEntities() {
      this.projectileObject.update();

      for (var i = 0; i < this.pigs.length; i++) {
        this.pigs[i].update();
      }

      for (var _i2 = 0; _i2 < this.blocks.length; _i2++) {
        this.blocks[_i2].update();
      }

      if (this.projectileObject.currentProjectileObject) this.updatePigsLeft();
      this.updateHighScore();
    }
  }, {
    key: "updateHighScore",
    value: function updateHighScore() {
      if (this.score > this.highScore) {
        this.highScore = this.score;
        localStorage.setItem(this.currentLevelHighScoreKey, this.highScore);
      }
    }
  }, {
    key: "updatePigsLeft",
    value: function updatePigsLeft() {
      for (var i = 0; i < this.pigs.length; i++) {
        if ((0,_util_stateLogic__WEBPACK_IMPORTED_MODULE_6__.checkBirdAndPigState)(this.projectileObject.currentProjectileObject.state, this.pigs[i].state)) {
          if (this.pigs[i].poofAnimationTimerBoolean()) {
            this.pigs.splice(i, 1);
          }
        }
      }
    }
  }, {
    key: "checkAndUpdateEntitiesCollision",
    value: function checkAndUpdateEntitiesCollision() {
      for (var i = 0; i < this.pigs.length; i++) {
        if ((0,_util_collisionDetectionUtil__WEBPACK_IMPORTED_MODULE_4__.checkBirdOnPigCollision)(this.projectileObject.currentProjectileObject, this.pigs[i])) {
          (0,_util_collisionLogicUtil__WEBPACK_IMPORTED_MODULE_5__.birdOnPigCollisionLogic)(this.projectileObject.currentProjectileObject, this.pigs[i]);
          this.score += 3000;
        }

        ;
      }

      for (var _i3 = 0; _i3 < this.blocks.length; _i3++) {
        if ((0,_util_collisionDetectionUtil__WEBPACK_IMPORTED_MODULE_4__.checkBirdOnBlockCollision)(this.projectileObject.currentProjectileObject, this.blocks[_i3])) {
          (0,_util_collisionLogicUtil__WEBPACK_IMPORTED_MODULE_5__.birdOnBlockCollisionLogic)(this.projectileObject.currentProjectileObject, this.blocks[_i3]);
          this.score += 325;
        }
      }
    }
  }, {
    key: "renderEntities",
    value: function renderEntities() {
      this.renderBackground();
      this.projectileObject.render();
      this.projectileObject.renderIndictor();
      this.projectileObject.renderLives();

      for (var i = 0; i < this.pigs.length; i++) {
        this.pigs[i].render();
      }

      for (var _i4 = 0; _i4 < this.blocks.length; _i4++) {
        this.blocks[_i4].render();
      }

      this.renderScore();
      this.renderHighScore();
      this.renderStageNumber();
    }
  }, {
    key: "renderScore",
    value: function renderScore() {
      this.ctx.textAlign = "right";
      this.ctx.textBaseline = "top";
      this.ctx.fillStyle = "WHITE";
      this.ctx.strokeStyle = "BLACK";
      this.ctx.font = 50 + "px Bangers";
      this.ctx.fillText(this.score, this.canvas.width - 30 / 2, 0);
      this.ctx.strokeText(this.score, this.canvas.width - 30 / 2, 0);
      this.ctx.textAlign = "right";
      this.ctx.textBaseline = "top";
      this.ctx.fillStyle = "WHITE";
      this.ctx.strokeStyle = "BLACK";
      this.ctx.font = 50 + "px Bangers";
      this.ctx.strokeText("Score:                      ", this.canvas.width - 30 / 2, 0);
    }
  }, {
    key: "renderHighScore",
    value: function renderHighScore() {
      this.ctx.textAlign = "right";
      this.ctx.textBaseline = "top";
      this.ctx.fillStyle = "WHITE";
      this.ctx.strokeStyle = "BLACK";
      this.ctx.font = 50 + "px Bangers";
      this.ctx.fillText(this.highScore, this.canvas.width - 30 / 2, 60);
      this.ctx.strokeText(this.highScore, this.canvas.width - 30 / 2, 60);
      this.ctx.textAlign = "right";
      this.ctx.textBaseline = "top";
      this.ctx.fillStyle = "WHITE";
      this.ctx.strokeStyle = "BLACK";
      this.ctx.font = 50 + "px Bangers";
      this.ctx.strokeText("Highscore:                      ", this.canvas.width - 30 / 2, 60);
    }
  }, {
    key: "renderStageNumber",
    value: function renderStageNumber() {
      this.ctx.textAlign = "left";
      this.ctx.textBaseline = "top";
      this.ctx.fillStyle = "WHITE";
      this.ctx.strokeStyle = "BLACK";
      this.ctx.font = 30 + "px Bangers";
      this.ctx.fillText("Level " + this.stageNumber, 10, 10);
      this.ctx.strokeText("Level " + this.stageNumber, 10, 10);
    }
  }, {
    key: "renderBackground",
    value: function renderBackground() {
      this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
    }
  }, {
    key: "checkStageWon",
    value: function checkStageWon() {
      return this.pigs.length === 0;
    }
  }, {
    key: "checkStageLost",
    value: function checkStageLost() {
      return this.projectileObject.lostAllProjectileObjects();
    }
  }]);

  return StageLoader;
}();

/* harmony default export */ __webpack_exports__["default"] = (StageLoader);

/***/ }),

/***/ "./src/scripts/stages/stageKeys.js":
/*!*****************************************!*\
  !*** ./src/scripts/stages/stageKeys.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "stageKeys": function() { return /* binding */ stageKeys; }
/* harmony export */ });
var stageKeys = {
  1: {
    "backGroundImageKey": "src/images/temp.jpg",
    "currentLevelHighScoreKey": "highScoreKeyLevel1",
    "numberOfPigs": 2,
    "pigProperties": {
      0: {
        x: 600,
        y: 600,
        rad: 25
      },
      1: {
        x: 300,
        y: 600,
        rad: 25
      }
    },
    "numberOfBlocks": 3,
    "blockProperites": {
      0: {
        x: 1000,
        y: 700,
        w: 70,
        h: 400
      },
      1: {
        x: 500,
        y: 700,
        w: 50,
        h: 140
      },
      2: {
        x: 900,
        y: 900,
        w: 50,
        h: 50
      }
    },
    "birdProperties": {
      playerLives: 3,
      x: 97.5,
      y: 552.5,
      rad: 14
    }
  },
  2: {
    "backGroundImageKey": "src/images/backgroundlevel2.jpg",
    "currentLevelHighScoreKey": "highScoreKeyLevel2",
    "numberOfPigs": 3,
    "pigProperties": {
      0: {
        x: 500,
        y: 600,
        rad: 25
      },
      1: {
        x: 1200,
        y: 600,
        rad: 25
      },
      2: {
        x: 700,
        y: 600,
        rad: 25
      }
    },
    "numberOfBlocks": 2,
    "blockProperites": {
      0: {
        x: 400,
        y: 700,
        w: 30,
        h: 100
      },
      1: {
        x: 1000,
        y: 700,
        w: 50,
        h: 140
      }
    },
    "birdProperties": {
      playerLives: 4,
      x: 97.5,
      y: 552.5,
      rad: 14
    }
  }
};

/***/ }),

/***/ "./src/scripts/util/collisionDetectionUtil.js":
/*!****************************************************!*\
  !*** ./src/scripts/util/collisionDetectionUtil.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkBirdOnPigCollision": function() { return /* binding */ checkBirdOnPigCollision; },
/* harmony export */   "checkBirdOnBlockCollision": function() { return /* binding */ checkBirdOnBlockCollision; }
/* harmony export */ });
// ball collision detection from https://burakkanber.com/blog/modeling-physics-javascript-gravity-and-drag/
// block https://codereview.stackexchange.com/questions/192477/circle-line-segment-collisions
var checkBirdOnPigCollision = function checkBirdOnPigCollision(currentProjectileObject, pig) {
  if (currentProjectileObject.x + currentProjectileObject.radius + pig.radius > pig.x && currentProjectileObject.x < pig.x + currentProjectileObject.radius + pig.radius && currentProjectileObject.y + currentProjectileObject.radius + pig.radius > pig.y && currentProjectileObject.y < pig.y + currentProjectileObject.radius + pig.radius) {
    // pythagoream theorem to be more exact on collision
    var distance = Math.sqrt((currentProjectileObject.x - pig.x) * (currentProjectileObject.x - pig.x) + (currentProjectileObject.y - pig.y) * (currentProjectileObject.y - pig.y));
    return distance < currentProjectileObject.radius + pig.radius;
  }
};
var checkBirdOnBlockCollision = function checkBirdOnBlockCollision(currentProjectileObject, block) {
  for (var j = 0; j < 4; j++) {
    var circleCenter = [currentProjectileObject.x, currentProjectileObject.y];

    if (j + 1 === 4) {
      if (checkBirdInterceptBlock(block.getPoint(j), block.getPoint(0), circleCenter, currentProjectileObject.radius)) {
        return true;
      }
    } else {
      if (checkBirdInterceptBlock(block.getPoint(j), block.getPoint(j + 1), circleCenter, currentProjectileObject.radius)) {
        return true;
      }
    }
  }
};

var checkBirdInterceptBlock = function checkBirdInterceptBlock(pointA, pointB, circleCenter, radius) {
  var dist;
  var vel1X = pointB.pos.x - pointA.pos.x;
  var vel1Y = pointB.pos.y - pointA.pos.y;
  var vel2X = circleCenter[0] - pointA.pos.x;
  var vel2Y = circleCenter[1] - pointA.pos.y;
  var unit = (vel2X * vel1X + vel2Y * vel1Y) / (vel1Y * vel1Y + vel1X * vel1X);

  if (unit >= 0 && unit <= 1) {
    dist = Math.pow(pointA.pos.x + vel1X * unit - circleCenter[0], 2) + Math.pow(pointA.pos.y + vel1Y * unit - circleCenter[1], 2);
  } else {
    dist = unit < 0 ? Math.pow(pointA.pos.x - circleCenter[0], 2) + Math.pow(pointA.pos.y - circleCenter[1], 2) : Math.pow(pointB.pos.x - circleCenter[0], 2) + Math.pow(pointB.pos.y - circleCenter[1], 2);
  }

  return dist < radius * radius;
};

/***/ }),

/***/ "./src/scripts/util/collisionLogicUtil.js":
/*!************************************************!*\
  !*** ./src/scripts/util/collisionLogicUtil.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "birdOnPigCollisionLogic": function() { return /* binding */ birdOnPigCollisionLogic; },
/* harmony export */   "birdOnBlockCollisionLogic": function() { return /* binding */ birdOnBlockCollisionLogic; }
/* harmony export */ });
var birdOnPigCollisionLogic = function birdOnPigCollisionLogic(currentProjectileObject, pig) {
  pig.state = "dead";
  var newVelX1 = (currentProjectileObject.velX * (currentProjectileObject.mass - pig.mass) + 2 * pig.mass * pig.velX) / (currentProjectileObject.mass + pig.mass);
  var newVelY1 = (currentProjectileObject.velY * (currentProjectileObject.mass - pig.mass) + 2 * pig.mass * pig.velY) / (currentProjectileObject.mass + pig.mass);
  var newVelX2 = (pig.velX * (pig.mass - currentProjectileObject.mass) + 2 * currentProjectileObject.mass * currentProjectileObject.velX) / (currentProjectileObject.mass + pig.mass);
  var newVelY2 = (pig.velY * (pig.mass - currentProjectileObject.mass) + 2 * currentProjectileObject.mass * currentProjectileObject.velY) / (currentProjectileObject.mass + pig.mass);
  currentProjectileObject.velX = -currentProjectileObject.velX;
  currentProjectileObject.velY = -currentProjectileObject.velY;
  pig.velX = newVelX2;
  pig.velY = newVelY2;
  currentProjectileObject.x = currentProjectileObject.x + newVelX1;
  currentProjectileObject.y = currentProjectileObject.y + newVelY1;
  pig.x = pig.x + newVelX2;
  pig.y = pig.y + newVelY2;
};
var birdOnBlockCollisionLogic = function birdOnBlockCollisionLogic(currentProjectileObject, block) {
  currentProjectileObject.velX = -currentProjectileObject.velX;
  currentProjectileObject.velY = -currentProjectileObject.velY;
  var force = block.asPolar(block.vector(10, 10));
  force.mag *= block.mass * 0.1;
  block.applyForce(force, block.vector(currentProjectileObject.x, currentProjectileObject.y));
};

/***/ }),

/***/ "./src/scripts/util/stateLogic.js":
/*!****************************************!*\
  !*** ./src/scripts/util/stateLogic.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkBirdAndPigState": function() { return /* binding */ checkBirdAndPigState; }
/* harmony export */ });
var checkBirdAndPigState = function checkBirdAndPigState(currentProjectileObjectState, pigState) {
  if (currentProjectileObjectState === "endState" && pigState === "dead") return true;
};

/***/ }),

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.scss */ "./src/styles/index.scss");
/* harmony import */ var _scripts_game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/game */ "./src/scripts/game.js");


document.querySelector("#canvas").addEventListener("click", init);
document.querySelector(".reset-highscore").addEventListener("click", resetLocalStorage);
document.querySelector(".restart-button").addEventListener("click", restartGame);

function init() {
  new _scripts_game__WEBPACK_IMPORTED_MODULE_1__.default().start();
}

function restartGame() {
  document.location.href = "";
}

function resetLocalStorage() {
  window.localStorage.clear();
}
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYmlyZC5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYmxvY2suanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi8uL3NyYy9zY3JpcHRzL2NhbnZhcy5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvcGlnLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9wcm9qZWN0aWxlLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9zdGFnZUxvYWRlci5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvc3RhZ2VzL3N0YWdlS2V5cy5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvdXRpbC9jb2xsaXNpb25EZXRlY3Rpb25VdGlsLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy91dGlsL2NvbGxpc2lvbkxvZ2ljVXRpbC5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvdXRpbC9zdGF0ZUxvZ2ljLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc3R5bGVzL2luZGV4LnNjc3MiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiQmlyZCIsImN0eCIsImJpcmRQcm9wZXJ0aWVzIiwieCIsInkiLCJyYWRpdXMiLCJyYWQiLCJtYXNzIiwidmVsWCIsInZlbFkiLCJ0cmFuc2ZlciIsImdyYXZpdHkiLCJncm91bmQiLCJjYW52YXMiLCJoZWlnaHQiLCJib3VuY2UiLCJmcmljdGlvblgiLCJiaXJkIiwiSW1hZ2UiLCJzcmMiLCJzdGF0ZSIsInNhdmUiLCJiZWdpblBhdGgiLCJhcmMiLCJNYXRoIiwiUEkiLCJjbGlwIiwiY2xvc2VQYXRoIiwiZHJhd0ltYWdlIiwicmVzdG9yZSIsIkJsb2NrIiwidyIsImgiLCJyIiwiZHgiLCJkeSIsImRyIiwiSU5TRVQiLCJQSTkwIiwiUEkyIiwiV0FMTF9OT1JNUyIsIl9ncm91bmQiLCJnZXRNYXNzIiwiYmxvY2siLCJzZXRUcmFuc2Zvcm0iLCJyb3RhdGUiLCJpIiwicCIsImdldFBvaW50IiwicG9zIiwiZG9Db2xsaXNpb24iLCJ3aWR0aCIsIndoaWNoIiwieHgiLCJ5eSIsInZlbG9jaXR5QSIsInZlbG9jaXR5VCIsInZlbG9jaXR5IiwiY29zIiwic2luIiwiZGV0YWlscyIsImFzUG9sYXIiLCJ2ZWN0b3IiLCJwb2xhciIsIm1hZyIsImRpciIsInZlY3RvckFkZCIsInZhbGlkYXRlUG9sYXIiLCJ2ZWMiLCJpc1BvbGFyIiwicFZlYyIsInJldFYiLCJpc0NhcnQiLCJjYXJ0VG9Qb2xhciIsInVuZGVmaW5lZCIsInBvbGFyVG9DYXJ0IiwiYXRhbjIiLCJoeXBvdCIsInZlYzEiLCJ2ZWMyIiwidjEiLCJhc0NhcnQiLCJ2MiIsImZvcmNlIiwibG9jIiwibCIsInRvQ2VudGVyIiwicGhldGEiLCJGdiIsIkZhIiwiYWNjZWwiLCJkZWx0YVYiLCJhY2NlbEEiLCJ2IiwiZDEiLCJkMiIsImFsb25nIiwidGFuZ2VudCIsInBvaW50RGV0YWlscyIsIndhbGxJbmRleCIsInZ2IiwidmEiLCJ2dmMiLCJ2ZWN0b3JDb21wb25lbnRzRm9yRGlyIiwidmFjIiwiYXBwbHlGb3JjZSIsIkNhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImdldENvbnRleHQiLCJiaW5kQ2FudmFzVG9ET00iLCJxdWVyeVNlbGVjdG9yIiwiY2xlYXJDYW52YXMiLCJib2R5IiwiYXBwZW5kIiwiY2xhc3NMaXN0IiwiYWRkIiwiY2xlYXJSZWN0IiwiZ2V0RWxlbWVudEJ5SWQiLCJyZW1vdmVDaGlsZCIsIkFuZ2VyZWRCaXJkcyIsInN0YXJ0IiwiYmluZCIsInRoYXQiLCJhbmltYXRpbmciLCJpbml0aWFsaXplRW50aXRpZXMiLCJhbmltYXRpb24iLCJzdGFnZUxvYWRlciIsInVwZGF0ZSIsImludGVydmFsIiwid2luZG93IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2hlY2tTdGFnZVdvbiIsIndpbkxldmVsIiwiY2hlY2tTdGFnZUxvc3QiLCJnYW1lT3ZlciIsIlN0YWdlTG9hZGVyIiwiaW5pdGlhbGl6ZUV2ZW50TGlzdGVuZXJzIiwic3RhZ2VOdW1iZXIiLCJyZXN0YXJ0RW50aXRpZXMiLCJQaWciLCJwaWciLCJwb29mIiwic3RhcnRUaW1lciIsImFicyIsInRpbWVzdGFtcCIsIkRhdGUiLCJnZXRUaW1lIiwiZWxhcHNlZCIsIlByb2plY3RpbGUiLCJsYXVuY2hlZE9iamVjdHMiLCJtYXgiLCJwcm9qZWN0aWxlSW1hZ2UiLCJsaXZlcyIsImxhc3RMaXZlVGltZXIiLCJpbmRpY2F0b3JJbWFnZSIsImFuZ2xlVmFsIiwibWFnbml0dWRlVmFsIiwiYW5nbGUiLCJjdXJyZW50UHJvamVjdGlsZU9iamVjdCIsIm9iamVjdExhdW5jaGVkIiwiT2JqZWN0TGF1bmNoIiwib2JqZWN0VHlwZSIsInB1c2giLCJ1cGRhdGVMaXZlcyIsImxlbmd0aCIsInNwbGljZSIsImN1cnJlbnRPYmplY3QiLCJ1cGRhdGVDdXJyZW50TGF1bmNoZWRPYmplY3QiLCJjdXJyZW50QmlyZCIsInJlbmRlciIsInBsYXllckxpdmVzIiwic2NvcmUiLCJzdGFydFBvc0JpcmQiLCJwcm9qZWN0aWxlT2JqZWN0IiwicGlncyIsImJsb2NrcyIsImNsaWNrZWRJbWFnZSIsInVwZGF0ZUVudGl0aWVzIiwiY2hlY2tBbmRVcGRhdGVFbnRpdGllc0NvbGxpc2lvbiIsInJlbmRlckVudGl0aWVzIiwibW91c2UiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImNhbnZhc1Byb3BlcnRpZXMiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJsZWZ0IiwidG9wIiwiZGVsdGFYIiwiZGVsdGFZIiwidGhldGFSYWRpYW4iLCJjb25zb2xlIiwibG9nIiwia2lja09mZkxhdW5jaERpcmVjdGlvbiIsImN1cnJlbnRTdGFnZVZhbHVlcyIsInN0YWdlS2V5cyIsImxvYWRTdGFnZSIsInN0YXJ0aW5nTGl2ZXMiLCJiYWNrZ3JvdW5kIiwiY3VycmVudExldmVsSGlnaFNjb3JlS2V5IiwiaGlnaFNjb3JlU2F2ZUtleVN0cmluZyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJoaWdoU2NvcmUiLCJwYXJzZUludCIsInVwZGF0ZVBpZ3NMZWZ0IiwidXBkYXRlSGlnaFNjb3JlIiwic2V0SXRlbSIsImNoZWNrQmlyZEFuZFBpZ1N0YXRlIiwicG9vZkFuaW1hdGlvblRpbWVyQm9vbGVhbiIsImNoZWNrQmlyZE9uUGlnQ29sbGlzaW9uIiwiYmlyZE9uUGlnQ29sbGlzaW9uTG9naWMiLCJjaGVja0JpcmRPbkJsb2NrQ29sbGlzaW9uIiwiYmlyZE9uQmxvY2tDb2xsaXNpb25Mb2dpYyIsInJlbmRlckJhY2tncm91bmQiLCJyZW5kZXJJbmRpY3RvciIsInJlbmRlckxpdmVzIiwicmVuZGVyU2NvcmUiLCJyZW5kZXJIaWdoU2NvcmUiLCJyZW5kZXJTdGFnZU51bWJlciIsInRleHRBbGlnbiIsInRleHRCYXNlbGluZSIsImZpbGxTdHlsZSIsInN0cm9rZVN0eWxlIiwiZm9udCIsImZpbGxUZXh0Iiwic3Ryb2tlVGV4dCIsImxvc3RBbGxQcm9qZWN0aWxlT2JqZWN0cyIsImRpc3RhbmNlIiwic3FydCIsImoiLCJjaXJjbGVDZW50ZXIiLCJjaGVja0JpcmRJbnRlcmNlcHRCbG9jayIsInBvaW50QSIsInBvaW50QiIsImRpc3QiLCJ2ZWwxWCIsInZlbDFZIiwidmVsMlgiLCJ2ZWwyWSIsInVuaXQiLCJuZXdWZWxYMSIsIm5ld1ZlbFkxIiwibmV3VmVsWDIiLCJuZXdWZWxZMiIsImN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0U3RhdGUiLCJwaWdTdGF0ZSIsImluaXQiLCJyZXNldExvY2FsU3RvcmFnZSIsInJlc3RhcnRHYW1lIiwibG9jYXRpb24iLCJocmVmIiwiY2xlYXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQU1BLEk7QUFDRixnQkFBWUMsR0FBWixFQUFpQkMsY0FBakIsRUFBaUM7QUFBQTs7QUFDN0IsU0FBS0QsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsU0FBS0UsQ0FBTCxHQUFTRCxjQUFjLENBQUNDLENBQXhCO0FBQ0EsU0FBS0MsQ0FBTCxHQUFTRixjQUFjLENBQUNFLENBQXhCO0FBQ0EsU0FBS0MsTUFBTCxHQUFjSCxjQUFjLENBQUNJLEdBQTdCO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLENBQVo7QUFDQSxTQUFLQyxJQUFMLEdBQVksQ0FBWjtBQUNBLFNBQUtDLElBQUwsR0FBWSxDQUFaO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixHQUFoQjtBQUNBLFNBQUtDLE9BQUwsR0FBZTtBQUFFUixPQUFDLEVBQUUsQ0FBTDtBQUFRQyxPQUFDLEVBQUU7QUFBWCxLQUFmO0FBQ0EsU0FBS1EsTUFBTCxHQUFjLEtBQUtYLEdBQUwsQ0FBU1ksTUFBVCxDQUFnQkMsTUFBaEIsR0FBeUIsRUFBdkM7QUFDQSxTQUFLQyxNQUFMLEdBQWMsR0FBZDtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsR0FBakI7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QzNFLENBRk0sQzs7Ozs7Ozs7Ozs7QUNBUDs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSw2Q0FBNkMsd0RBQXdELEU7Ozs7O1dDQXJHO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUVBM0ksUUFBUSxDQUFDSSxhQUFULENBQXVCLFNBQXZCLEVBQWtDdUUsZ0JBQWxDLENBQW1ELE9BQW5ELEVBQTREaUUsSUFBNUQ7QUFDQTVJLFFBQVEsQ0FBQ0ksYUFBVCxDQUF1QixrQkFBdkIsRUFBMkN1RSxnQkFBM0MsQ0FBNEQsT0FBNUQsRUFBcUVrRSxpQkFBckU7QUFDQTdJLFFBQVEsQ0FBQ0ksYUFBVCxDQUF1QixpQkFBdkIsRUFBMEN1RSxnQkFBMUMsQ0FBMkQsT0FBM0QsRUFBb0VtRSxXQUFwRTs7QUFFQSxTQUFTRixJQUFULEdBQWdCO0FBQ1osTUFBSS9ILGtEQUFKLEdBQW1CQyxLQUFuQjtBQUNIOztBQUVELFNBQVNnSSxXQUFULEdBQXVCO0FBQ25COUksVUFBUSxDQUFDK0ksUUFBVCxDQUFrQkMsSUFBbEIsR0FBeUIsRUFBekI7QUFDSDs7QUFFRCxTQUFTSCxpQkFBVCxHQUE2QjtBQUN6QnRILFFBQU0sQ0FBQ3VFLFlBQVAsQ0FBb0JtRCxLQUFwQjtBQUNILEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEJpcmQge1xuICAgIGNvbnN0cnVjdG9yKGN0eCwgYmlyZFByb3BlcnRpZXMpIHtcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMueCA9IGJpcmRQcm9wZXJ0aWVzLng7XG4gICAgICAgIHRoaXMueSA9IGJpcmRQcm9wZXJ0aWVzLnk7XG4gICAgICAgIHRoaXMucmFkaXVzID0gYmlyZFByb3BlcnRpZXMucmFkO1xuICAgICAgICB0aGlzLm1hc3MgPSAyO1xuICAgICAgICB0aGlzLnZlbFggPSAwO1xuICAgICAgICB0aGlzLnZlbFkgPSAwO1xuICAgICAgICB0aGlzLnRyYW5zZmVyID0gMC45O1xuICAgICAgICB0aGlzLmdyYXZpdHkgPSB7IHg6IDAsIHk6IDAuMSB9O1xuICAgICAgICB0aGlzLmdyb3VuZCA9IHRoaXMuY3R4LmNhbnZhcy5oZWlnaHQgLSAyMDtcbiAgICAgICAgdGhpcy5ib3VuY2UgPSAwLjU7XG4gICAgICAgIHRoaXMuZnJpY3Rpb25YID0gMC45O1xuICAgICAgICB0aGlzLmJpcmQgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5iaXJkLnNyYyA9IFwic3JjL2ltYWdlcy9hbmdlcmVkLWJpcmR5LnBuZ1wiXG4gICAgICAgIHRoaXMuc3RhdGUgPSBcInN0YXJ0U3RhdGVcIjtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5yYWRpdXMsIDAsIChNYXRoLlBJICogMiksIGZhbHNlKTtcbiAgICAgICAgdGhpcy5jdHguY2xpcCgpO1xuICAgICAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMuYmlyZCwgdGhpcy54IC0gdGhpcy5yYWRpdXMsIHRoaXMueSAtIHRoaXMucmFkaXVzLCB0aGlzLnJhZGl1cyAqIDIsIHRoaXMucmFkaXVzICogMilcbiAgICAgICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmlyZDsiLCIvLyBCbG9jayBDb2xsaXNpb24gRGV0ZWN0aW9uIGZyb20gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzY3ODQ0NTYvY2FsY3VsYXRpbmctYW5ndWxhci12ZWxvY2l0eS1hZnRlci1hLWNvbGxpc2lvblxuY2xhc3MgQmxvY2sge1xuICAgIGNvbnN0cnVjdG9yKGN0eCwgeCwgeSwgdywgaCkge1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjdHguY2FudmFzO1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLncgPSB3O1xuICAgICAgICB0aGlzLmggPSBoO1xuICAgICAgICB0aGlzLnIgPSAwLjE7XG4gICAgICAgIHRoaXMuZHggPSAwO1xuICAgICAgICB0aGlzLmR5ID0gMDtcbiAgICAgICAgdGhpcy5kciA9IDA7XG4gICAgICAgIHRoaXMuSU5TRVQgPSAxMDtcbiAgICAgICAgdGhpcy5QSSA9IE1hdGguUEk7XG4gICAgICAgIHRoaXMuUEk5MCA9IE1hdGguUEkgLyAyO1xuICAgICAgICB0aGlzLlBJMiA9IE1hdGguUEkgKiAyO1xuICAgICAgICB0aGlzLldBTExfTk9STVMgPSBbIE1hdGguUEkgLyAyLCBNYXRoLlBJLCAtKE1hdGguUEkgLyAyKSwgMF1cbiAgICAgICAgdGhpcy5fZ3JvdW5kID0gdGhpcy5jYW52YXMuaGVpZ2h0IC0gMTA1O1xuICAgICAgICB0aGlzLm1hc3MgPSB0aGlzLmdldE1hc3MoKVxuICAgICAgICB0aGlzLmJsb2NrID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMuYmxvY2suc3JjID0gXCJzcmMvaW1hZ2VzL3dvb2RlbkJveC5wbmdcIjtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHRoaXMuY3R4LnNhdmUoKVxuICAgICAgICB0aGlzLmN0eC5zZXRUcmFuc2Zvcm0oMSwwLDAsMSx0aGlzLngsdGhpcy55KTtcbiAgICAgICAgdGhpcy5jdHgucm90YXRlKHRoaXMucik7XG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLmJsb2NrLCAtdGhpcy53LzIsIC10aGlzLmgvMiwgdGhpcy53LCB0aGlzLmgpXG4gICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKVxuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy54ICs9IHRoaXMuZHg7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLmR5O1xuICAgICAgICB0aGlzLmR5ICs9IDAuMDYxO1xuICAgICAgICB0aGlzLnIgKz0gdGhpcy5kcjtcblxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgNDsgaSsrKXtcbiAgICAgICAgICAgIHZhciBwID0gdGhpcy5nZXRQb2ludChpKTtcbiAgICAgICAgICAgIC8vIG9ubHkgZG8gb25lIGNvbGxpc2lvbiBwZXIgZnJhbWUgb3Igd2Ugd2lsbCBlbmQgdXAgYWRkaW5nIGVuZXJneVxuICAgICAgICAgICAgaWYocC5wb3MueCA8IHRoaXMuSU5TRVQpe1xuICAgICAgICAgICAgICAgIHRoaXMueCArPSAodGhpcy5JTlNFVCkgLSBwLnBvcy54O1xuICAgICAgICAgICAgICAgIHRoaXMuZG9Db2xsaXNpb24ocCwzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiggcC5wb3MueCA+IHRoaXMuY2FudmFzLndpZHRoLXRoaXMuSU5TRVQpe1xuICAgICAgICAgICAgICAgIHRoaXMueCArPSAodGhpcy5jYW52YXMud2lkdGggLSB0aGlzLklOU0VUKSAtIHAucG9zLng7XG4gICAgICAgICAgICAgICAgdGhpcy5kb0NvbGxpc2lvbihwLDEpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKHAucG9zLnkgPCB0aGlzLklOU0VUKXtcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gKHRoaXMuSU5TRVQpIC0gcC5wb3MueTtcbiAgICAgICAgICAgICAgICB0aGlzLmRvQ29sbGlzaW9uKHAsMClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoIHAucG9zLnkgPiB0aGlzLmNhbnZhcy5oZWlnaHQgLSB0aGlzLklOU0VUKXtcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gKHRoaXMuY2FudmFzLmhlaWdodCAtIHRoaXMuSU5TRVQpIC0gcC5wb3MueTtcbiAgICAgICAgICAgICAgICB0aGlzLmRvQ29sbGlzaW9uKHAsMilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldE1hc3MoKSB7XG4gICAgICAgIHJldHVybiAoIHRoaXMudyAqIHRoaXMuaCAqIHRoaXMuaCkgLyAxMDAwO1xuICAgIH1cblxuICAgIGdldFBvaW50KHdoaWNoKSB7XG4gICAgICAgIHZhciBkeCwgZHksIHgsIHksIHh4LCB5eSwgdmVsb2NpdHlBLCB2ZWxvY2l0eVQsIHZlbG9jaXR5O1xuXG4gICAgICAgIGR4ID0gTWF0aC5jb3ModGhpcy5yKTtcbiAgICAgICAgZHkgPSBNYXRoLnNpbih0aGlzLnIpO1xuXG4gICAgICAgIHN3aXRjaCAod2hpY2gpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB4ID0gLXRoaXMudyAvIDI7XG4gICAgICAgICAgICAgICAgeSA9IC10aGlzLmggLyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHggPSB0aGlzLncgLyAyO1xuICAgICAgICAgICAgICAgIHkgPSAtdGhpcy5oIC8gMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB4ID0gdGhpcy53IC8gMjtcbiAgICAgICAgICAgICAgICB5ID0gdGhpcy5oIC8gMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICB4ID0gLXRoaXMudyAvIDI7XG4gICAgICAgICAgICAgICAgeSA9IHRoaXMuaCAvIDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgeCA9IHRoaXMueDtcbiAgICAgICAgICAgICAgICB5ID0gdGhpcy55O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHh4ICwgeXk7XG4gICAgICAgIHh4ID0geCAqIGR4ICsgeSAqIC1keTtcbiAgICAgICAgeXkgPSB4ICogZHkgKyB5ICogZHg7XG5cbiAgICAgICAgdmFyIGRldGFpbHMgPSB0aGlzLmFzUG9sYXIodGhpcy52ZWN0b3IoeHgsIHl5KSk7XG5cbiAgICAgICAgeHggKz0gdGhpcy54O1xuICAgICAgICB5eSArPSB0aGlzLnk7XG5cbiAgICAgICAgdmVsb2NpdHlBID0gdGhpcy5wb2xhcihkZXRhaWxzLm1hZyAqIHRoaXMuZHIsIGRldGFpbHMuZGlyICsgdGhpcy5QSTkwKTtcbiAgICAgICAgdmVsb2NpdHlUID0gdGhpcy52ZWN0b3JBZGQodmVsb2NpdHkgPSB0aGlzLnZlY3Rvcih0aGlzLmR4LCB0aGlzLmR5KSwgdmVsb2NpdHlBKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmVsb2NpdHk6IHZlbG9jaXR5LFxuICAgICAgICAgICAgdmVsb2NpdHlUOiB2ZWxvY2l0eVQsXG4gICAgICAgICAgICB2ZWxvY2l0eUEgOiB2ZWxvY2l0eUEsXG4gICAgICAgICAgICBwb3M6IHRoaXMudmVjdG9yKHh4LCB5eSksXG4gICAgICAgICAgICByYWRpdXM6IGRldGFpbHMubWFnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwb2xhcihtYWcgPSAxLCBkaXIgPSAwKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlUG9sYXIoe2RpcjogZGlyLCBtYWc6IG1hZ30pXG4gICAgfVxuXG4gICAgdmVjdG9yKHggPSAxLCB5ID0gMCkge1xuICAgICAgICByZXR1cm4geyB4OiB4LCB5OiB5fTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZVBvbGFyKHZlYykge1xuICAgICAgICBpZiAodGhpcy5pc1BvbGFyKHZlYykpIHtcbiAgICAgICAgICAgIGlmKHZlYy5tYWcgPCAwKXtcbiAgICAgICAgICAgICAgICB2ZWMubWFnID0gLXZlYy5tYWc7XG4gICAgICAgICAgICAgICAgdmVjLmRpciArPSB0aGlzLlBJO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2ZWM7XG4gICAgfVxuXG4gICAgcG9sYXJUb0NhcnQocFZlYywgcmV0ViA9IHt4OiAwLCB5OiAwfSl7XG4gICAgICAgIHJldFYueCA9IE1hdGguY29zKHBWZWMuZGlyKSAqIHBWZWMubWFnO1xuICAgICAgICByZXRWLnkgPSBNYXRoLnNpbihwVmVjLmRpcikgKiBwVmVjLm1hZztcbiAgICAgICAgcmV0dXJuIHJldFZcbiAgICB9XG5cbiAgICBhc1BvbGFyKHZlYykge1xuICAgICAgICBpZiAodGhpcy5pc0NhcnQodmVjKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FydFRvUG9sYXIodmVjKVxuICAgICAgICB9XG4gICAgICAgIGlmICh2ZWMubWFnIDwgMCkge1xuICAgICAgICAgICAgdmVjLm1hZyA9IC12ZWMubWFnO1xuICAgICAgICAgICAgdmVjLmRpciArPSB0aGlzLlBJO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGRpcjogdmVjLmRpciwgbWFnOiB2ZWMubWFnfTtcbiAgICB9XG5cbiAgICBpc0NhcnQodmVjKSB7IGlmKHZlYy54ICE9PSB1bmRlZmluZWQgJiYgdmVjLnkgIT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdHJ1ZTsgfSByZXR1cm4gZmFsc2U7IH1cbiAgICBpc1BvbGFyKHZlYykgeyBpZih2ZWMubWFnICE9PSB1bmRlZmluZWQgJiYgdmVjLmRpciAhPT0gdW5kZWZpbmVkKSB7IHJldHVybiB0cnVlOyB9IHJldHVybiBmYWxzZTsgfVxuICAgIGFzQ2FydCh2ZWMpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNQb2xhcih2ZWMpKSB7cmV0dXJuIHRoaXMucG9sYXJUb0NhcnQodmVjKX1cbiAgICAgICAgcmV0dXJuIHt4OiB2ZWMueCwgeTogdmVjLnl9XG4gICAgfVxuICAgIGNhcnRUb1BvbGFyKHZlYywgcmV0ViA9IHtkaXI6IDAsIG1hZzogMH0pIHtcbiAgICAgICAgcmV0Vi5kaXIgPSBNYXRoLmF0YW4yKHZlYy55LCB2ZWMueCk7XG4gICAgICAgIHJldFYubWFnID0gTWF0aC5oeXBvdCh2ZWMueCwgdmVjLnkpO1xuICAgICAgICByZXR1cm4gcmV0VjtcbiAgICB9XG5cbiAgICB2ZWN0b3JBZGQodmVjMSwgdmVjMikge1xuICAgICAgICB2YXIgdjEgPSB0aGlzLmFzQ2FydCh2ZWMxKTtcbiAgICAgICAgdmFyIHYyID0gdGhpcy5hc0NhcnQodmVjMik7XG4gICAgICAgIHJldHVybiB0aGlzLnZlY3Rvcih2MS54ICsgdjIueCwgdjEueSArIHYyLnkpXG4gICAgfVxuXG4gICAgYXBwbHlGb3JjZShmb3JjZSwgbG9jKSB7XG4gICAgICAgIHRoaXMudmFsaWRhdGVQb2xhcihmb3JjZSk7XG4gICAgICAgIHZhciBsID0gdGhpcy5hc0NhcnQobG9jKTtcbiAgICAgICAgdmFyIHRvQ2VudGVyID0gdGhpcy5hc1BvbGFyKHRoaXMudmVjdG9yKHRoaXMueCAtIGwueCwgdGhpcy55IC0gbC55KSk7XG4gICAgICAgIHZhciBwaGV0YSA9IHRvQ2VudGVyLmRpciAtIGZvcmNlLmRpcjtcbiAgICAgICAgdmFyIEZ2ID0gTWF0aC5jb3MocGhldGEpICogZm9yY2UubWFnO1xuICAgICAgICB2YXIgRmEgPSBNYXRoLnNpbihwaGV0YSkgKiBmb3JjZS5tYWc7XG4gICAgICAgIHZhciBhY2NlbCA9IHRoaXMuYXNQb2xhcih0b0NlbnRlcik7XG4gICAgICAgIGFjY2VsLm1hZyA9IEZ2IC8gdGhpcy5tYXNzOyBcbiAgICAgICAgdmFyIGRlbHRhViA9IHRoaXMuYXNDYXJ0KGFjY2VsKTsgXG4gICAgICAgIHRoaXMuZHggKz0gZGVsdGFWLnggXG4gICAgICAgIHRoaXMuZHkgKz0gZGVsdGFWLnlcbiAgICAgICAgdmFyIGFjY2VsQSA9IEZhIC8gKHRvQ2VudGVyLm1hZyAgKiB0aGlzLm1hc3MpOyBcbiAgICAgICAgdGhpcy5kciArPSBhY2NlbEE7XG4gICAgfVxuXG4gICAgdmVjdG9yQ29tcG9uZW50c0ZvckRpcih2ZWMsIGRpcikge1xuICAgICAgICB2YXIgdiA9IHRoaXMuYXNQb2xhcih2ZWMpOyBcbiAgICAgICAgdmFyIHBoZXRhID0gdi5kaXIgLSBkaXI7XG4gICAgICAgIHZhciBGdiA9IE1hdGguY29zKHBoZXRhKSAqIHYubWFnO1xuICAgICAgICB2YXIgRmEgPSBNYXRoLnNpbihwaGV0YSkgKiB2Lm1hZztcblxuICAgICAgICB2YXIgZDEgPSBkaXI7XG4gICAgICAgIHZhciBkMiA9IGRpciArIHRoaXMuUEk5MDsgICAgXG4gICAgICAgIGlmKEZ2IDwgMCl7XG4gICAgICAgICAgICBkMSArPSB0aGlzLlBJO1xuICAgICAgICAgICAgRnYgPSAtRnY7XG4gICAgICAgIH1cblxuICAgICAgICBpZihGYSA8IDApe1xuICAgICAgICAgICAgZDIgKz0gdGhpcy5QSTtcbiAgICAgICAgICAgIEZhID0gLUZhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbG9uZyA6IHRoaXMucG9sYXIoRnYsZDEpLFxuICAgICAgICAgICAgdGFuZ2VudCA6IHRoaXMucG9sYXIoRmEsZDIpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZG9Db2xsaXNpb24ocG9pbnREZXRhaWxzLCB3YWxsSW5kZXgpIHtcbiAgICAgICAgdmFyIHZ2ID0gdGhpcy5hc1BvbGFyKHBvaW50RGV0YWlscy52ZWxvY2l0eSk7IFxuICAgICAgICB2YXIgdmEgPSB0aGlzLmFzUG9sYXIocG9pbnREZXRhaWxzLnZlbG9jaXR5QSk7IFxuICAgICAgICB2YXIgdnZjID0gdGhpcy52ZWN0b3JDb21wb25lbnRzRm9yRGlyKHZ2LCB0aGlzLldBTExfTk9STVNbd2FsbEluZGV4XSk7XG4gICAgICAgIHZhciB2YWMgPSB0aGlzLnZlY3RvckNvbXBvbmVudHNGb3JEaXIodmEsIHRoaXMuV0FMTF9OT1JNU1t3YWxsSW5kZXhdKTtcblxuICAgICAgICB2dmMuYWxvbmcubWFnICo9IDEuMTg7IFxuICAgICAgICB2YWMuYWxvbmcubWFnICo9IDEuMTg7IFxuXG4gICAgICAgIHZ2Yy5hbG9uZy5tYWcgKj0gdGhpcy5tYXNzO1xuICAgICAgICB2YWMuYWxvbmcubWFnICo9IHRoaXMubWFzcztcblxuICAgICAgICB2dmMuYWxvbmcuZGlyICs9IHRoaXMuUEk7XG4gICAgICAgIHZhYy5hbG9uZy5kaXIgKz0gdGhpcy5QSTtcblxuICAgICAgICB2dmMudGFuZ2VudC5tYWcgKj0gMC4xODsgIFxuICAgICAgICB2YWMudGFuZ2VudC5tYWcgKj0gMC4xODtcbiAgICAgICAgdnZjLnRhbmdlbnQubWFnICo9IHRoaXMubWFzcyAgXG4gICAgICAgIHZhYy50YW5nZW50Lm1hZyAqPSB0aGlzLm1hc3NcbiAgICAgICAgdnZjLnRhbmdlbnQuZGlyICs9IHRoaXMuUEk7IFxuICAgICAgICB2YWMudGFuZ2VudC5kaXIgKz0gdGhpcy5QSTtcblxuICAgICAgICB0aGlzLmFwcGx5Rm9yY2UodnZjLmFsb25nLCBwb2ludERldGFpbHMucG9zKSAgICBcbiAgICAgICAgdGhpcy5hcHBseUZvcmNlKHZ2Yy50YW5nZW50LCBwb2ludERldGFpbHMucG9zKSAgICBcbiAgICAgICAgdGhpcy5hcHBseUZvcmNlKHZhYy5hbG9uZywgcG9pbnREZXRhaWxzLnBvcykgICAgXG4gICAgICAgIHRoaXMuYXBwbHlGb3JjZSh2YWMudGFuZ2VudCwgcG9pbnREZXRhaWxzLnBvcykgICAgXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCbG9jayIsImNsYXNzIENhbnZhcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSAxNDAwO1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSA3NTA7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICB0aGlzLmJpbmRDYW52YXNUb0RPTSgpXG4gICAgfVxuXG4gICAgYmluZENhbnZhc1RvRE9NKCkge1xuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLWNhbnZhc1wiKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhckNhbnZhcygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKHRoaXMuY2FudmFzKTtcbiAgICAgICAgdGhpcy5jYW52YXMuY2xhc3NMaXN0LmFkZChcIm1haW4tY2FudmFzXCIpXG4gICAgfVxuXG4gICAgY2xlYXJDYW52YXMoKSB7XG4gICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICByZW1vdmVDYW52YXNGcm9tRE9NKCkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW4tYm9keVwiKS5yZW1vdmVDaGlsZCh0aGlzLmNhbnZhcyk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYW52YXM7XG4iLCIvLyBpbXBvcnQgXCIuL3N0eWxlcy9pbmRleC5zY3NzXCI7XG5pbXBvcnQgQ2FudmFzIGZyb20gXCIuL2NhbnZhc1wiO1xuaW1wb3J0IFN0YWdlTG9hZGVyIGZyb20gXCIuL3N0YWdlTG9hZGVyXCI7XG5cbmNsYXNzIEFuZ2VyZWRCaXJkcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc3RhcnQgPSB0aGlzLnN0YXJ0LmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgICAgICB0aGlzLmFuaW1hdGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuY2FudmFzID0gbmV3IENhbnZhcygpO1xuICAgICAgICB0aGlzLmNhbnZhcy5iaW5kQ2FudmFzVG9ET00oKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplRW50aXRpZXMoKTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5jbGVhckNhbnZhcygpO1xuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFnZUxvYWRlci51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmludGVydmFsID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGlvbik7XG4gICAgICAgICAgICAgICAgaWYgKHRoYXQuc3RhZ2VMb2FkZXIuY2hlY2tTdGFnZVdvbigpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQud2luTGV2ZWwoKVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKHRoYXQuc3RhZ2VMb2FkZXIuY2hlY2tTdGFnZUxvc3QoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGF0LmdhbWVPdmVyKClcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRpb24pO1xuICAgIH1cblxuICAgIGluaXRpYWxpemVFbnRpdGllcygpIHtcbiAgICAgICAgdGhpcy5zdGFnZUxvYWRlciA9IG5ldyBTdGFnZUxvYWRlcih0aGlzLmNhbnZhcy5jdHgpO1xuICAgICAgICB0aGlzLnN0YWdlTG9hZGVyLmluaXRpYWxpemVFbnRpdGllcygpO1xuICAgICAgICB0aGlzLnN0YWdlTG9hZGVyLmluaXRpYWxpemVFdmVudExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIHdpbkxldmVsKCkge1xuICAgICAgICB0aGlzLnN0YWdlTG9hZGVyLnN0YWdlTnVtYmVyICs9IDE7XG4gICAgICAgIHRoaXMuc3RhZ2VMb2FkZXIucmVzdGFydEVudGl0aWVzKCk7XG4gICAgICAgIHRoaXMuc3RhZ2VMb2FkZXIuaW5pdGlhbGl6ZUVudGl0aWVzKCk7XG4gICAgfVxuXG4gICAgZ2FtZU92ZXIoKSB7XG4gICAgICAgIHRoaXMuc3RhZ2VMb2FkZXIucmVzdGFydEVudGl0aWVzKCk7XG4gICAgICAgIHRoaXMuc3RhZ2VMb2FkZXIuaW5pdGlhbGl6ZUVudGl0aWVzKCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBbmdlcmVkQmlyZHM7IiwiY2xhc3MgUGlnIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgsIHgsIHksIHJhZGl1cywgdmVsWCA9IDAsIHZlbFkgPSAwKSB7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLnggPSB4OyBcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy52ZWxYID0gdmVsWDtcbiAgICAgICAgdGhpcy52ZWxZID0gdmVsWTtcbiAgICAgICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XG4gICAgICAgIHRoaXMubWFzcyA9IDI7XG5cbiAgICAgICAgdGhpcy5ncmF2aXR5ID0geyB4OiAwLCB5OiAwLjEgfTtcbiAgICAgICAgdGhpcy5ncm91bmQgPSB0aGlzLmN0eC5jYW52YXMuaGVpZ2h0IC0gMzA7XG4gICAgICAgIHRoaXMuYm91bmNlID0gMC40O1xuICAgICAgICB0aGlzLmZyaWN0aW9uWCA9IDAuOTtcbiAgICAgICAgdGhpcy5tYXNzID0gMjtcbiAgICAgICAgdGhpcy5waWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5waWcuc3JjID0gXCJzcmMvaW1hZ2VzL3BpZ2d5LnBuZ1wiO1xuICAgICAgICB0aGlzLnN0YXRlID0gXCJhbGl2ZVwiO1xuXG4gICAgICAgIHRoaXMucG9vZiA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB0aGlzLnBvb2Yuc3JjID0gXCJzcmMvaW1hZ2VzL3Bvb2YucG5nXCI7XG4gICAgICAgIHRoaXMuc3RhcnRUaW1lcjtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5yYWRpdXMsIDAsIChNYXRoLlBJICogMiksIGZhbHNlKTtcbiAgICAgICAgdGhpcy5jdHguY2xpcCgpO1xuICAgICAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMucGlnLCB0aGlzLnggLSB0aGlzLnJhZGl1cywgdGhpcy55IC0gdGhpcy5yYWRpdXMsIHRoaXMucmFkaXVzICogMiwgdGhpcy5yYWRpdXMgKiAyKTtcbiAgICAgICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy52ZWxYICs9IHRoaXMuZ3Jhdml0eS54O1xuICAgICAgICB0aGlzLnZlbFkgKz0gdGhpcy5ncmF2aXR5Lnk7XG4gICAgICAgIHRoaXMueCArPSB0aGlzLnZlbFg7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLnZlbFk7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy55ID49IHRoaXMuZ3JvdW5kKSB7XG4gICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmdyb3VuZCAtICh0aGlzLnkgLSB0aGlzLmdyb3VuZCk7XG4gICAgICAgICAgICB0aGlzLnZlbFkgPSAtTWF0aC5hYnModGhpcy52ZWxZKSAqIHRoaXMuYm91bmNlO1xuICAgICAgICAgICAgaWYgKHRoaXMudmVsWSA+PSB0aGlzLmdyYXZpdHkueSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVsWSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5ncm91bmQgLSB0aGlzLmdyYXZpdHkueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnZlbFggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWxYIC09IHRoaXMuZnJpY3Rpb25YO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudmVsWCA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlbFggKz0gdGhpcy5mcmljdGlvblg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3RvcHMgYmFsbCBmcm9tIGJvdW5jaW5nIGluIFkgYXhpc1xuICAgICAgICBpZiAodGhpcy52ZWxZPDAgJiYgdGhpcy52ZWxZPi0yLjEpIHtcbiAgICAgICAgICAgIHRoaXMudmVsWSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3RvcHMgYmFsbCBmcm9tIG1vdmluZyBvbiBYIGF4aXMgaWYgeC12ZWxvY2l0eSA8IDEuMVxuICAgICAgICBpZiAoTWF0aC5hYnModGhpcy52ZWxYKSA8IDEuMSkge1xuICAgICAgICAgICAgdGhpcy52ZWxYID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBvb2ZBbmltYXRpb25UaW1lckJvb2xlYW4oKSB7XG4gICAgICAgIHRoaXMucGlnLnNyYyA9IFwic3JjL2ltYWdlcy9wb29mLnBuZ1wiO1xuICAgICAgICB0aGlzLnJhZGl1cyA9IDM1O1xuXG4gICAgICAgIHZhciB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRUaW1lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0VGltZXIgPSB0aW1lc3RhbXA7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZWxhcHNlZCA9IHRpbWVzdGFtcCAtIHRoaXMuc3RhcnRUaW1lcjtcbiAgICAgICAgaWYgKGVsYXBzZWQgPiAzMDAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQaWc7IiwiaW1wb3J0IEJpcmQgZnJvbSBcIi4vYmlyZFwiO1xuY2xhc3MgUHJvamVjdGlsZSB7XG4gICAgY29uc3RydWN0b3IoY3R4LCBiaXJkUHJvcGVydGllcykge1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5sYXVuY2hlZE9iamVjdHMgPSBbXTtcbiAgICAgICAgdGhpcy5tYXggPSAxO1xuICAgICAgICB0aGlzLmJpcmRQcm9wZXJ0aWVzID0gYmlyZFByb3BlcnRpZXM7XG4gICAgICAgIHRoaXMucHJvamVjdGlsZUltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMucHJvamVjdGlsZUltYWdlLnNyYyA9IFwic3JjL2ltYWdlcy9zbGluZ1MucG5nXCI7XG4gICAgICAgIHRoaXMubGl2ZXMgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5saXZlcy5zcmMgPSBcInNyYy9pbWFnZXMvYW5nZXJlZC1iaXJkeS5wbmdcIjtcbiAgICAgICAgdGhpcy5sYXN0TGl2ZVRpbWVyO1xuICAgICAgICB0aGlzLmluZGljYXRvckltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMuaW5kaWNhdG9ySW1hZ2Uuc3JjID0gXCJzcmMvaW1hZ2VzL2luZGljdG9yLnBuZ1wiO1xuICAgIH1cblxuICAgIGtpY2tPZmZMYXVuY2hEaXJlY3Rpb24oYW5nbGVWYWwsIG1hZ25pdHVkZVZhbCkge1xuICAgICAgICBsZXQgYW5nbGUgPSBNYXRoLlBJICogYW5nbGVWYWwgLyAxODA7XG4gICAgICAgIHRoaXMuY3VycmVudFByb2plY3RpbGVPYmplY3QgPSBuZXcgQmlyZCh0aGlzLmN0eCwgdGhpcy5iaXJkUHJvcGVydGllcyk7XG4gICAgICAgIHRoaXMub2JqZWN0TGF1bmNoZWQgPSBuZXcgT2JqZWN0TGF1bmNoKHRoaXMuY3R4LCB0aGlzLmN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0KTtcbiAgICAgICAgdGhpcy5vYmplY3RMYXVuY2hlZC5vYmplY3RUeXBlLnZlbFkgPS0gbWFnbml0dWRlVmFsICogTWF0aC5zaW4oYW5nbGUpO1xuICAgICAgICB0aGlzLm9iamVjdExhdW5jaGVkLm9iamVjdFR5cGUudmVsWCA9IG1hZ25pdHVkZVZhbCAqIE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgdGhpcy5vYmplY3RMYXVuY2hlZC5vYmplY3RUeXBlLnRyYW5zZmVyID0gMC44O1xuICAgICAgICB0aGlzLmxhdW5jaGVkT2JqZWN0cy5wdXNoKHRoaXMub2JqZWN0TGF1bmNoZWQpO1xuICAgICAgICB0aGlzLnVwZGF0ZUxpdmVzKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy5sYXVuY2hlZE9iamVjdHMubGVuZ3RoID4gdGhpcy5tYXgpIHtcbiAgICAgICAgICAgIHRoaXMubGF1bmNoZWRPYmplY3RzID0gdGhpcy5sYXVuY2hlZE9iamVjdHMuc3BsaWNlKDEpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sYXVuY2hlZE9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50T2JqZWN0ID0gdGhpcy5sYXVuY2hlZE9iamVjdHNbaV0ub2JqZWN0VHlwZTtcbiAgICAgICAgICAgIGN1cnJlbnRPYmplY3QudmVsWSArPSAxLjUzO1xuICAgICAgICAgICAgY3VycmVudE9iamVjdC54ICs9IGN1cnJlbnRPYmplY3QudmVsWCAvIDM7XG4gICAgICAgICAgICBjdXJyZW50T2JqZWN0LnkgKz0gY3VycmVudE9iamVjdC52ZWxZIC8gMztcbiAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmxhdW5jaGVkT2JqZWN0c1tpXS51cGRhdGVDdXJyZW50TGF1bmNoZWRPYmplY3QoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UodGhpcy5wcm9qZWN0aWxlSW1hZ2UsIHRoaXMuYmlyZFByb3BlcnRpZXMueCAtIDMzLCB0aGlzLmJpcmRQcm9wZXJ0aWVzLnkgLSAyMCwgNzUsIDE0MCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sYXVuY2hlZE9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50QmlyZCA9IHRoaXMubGF1bmNoZWRPYmplY3RzW2ldLm9iamVjdFR5cGU7XG4gICAgICAgICAgICBjdXJyZW50QmlyZC5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUxpdmVzKCkge1xuICAgICAgICB0aGlzLmJpcmRQcm9wZXJ0aWVzLnBsYXllckxpdmVzIC09IDFcbiAgICB9XG5cbiAgICByZW5kZXJMaXZlcygpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDEwOyBpIDwgdGhpcy5iaXJkUHJvcGVydGllcy5wbGF5ZXJMaXZlcyAqIDUwOyBpKz01MCkge1xuICAgICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UodGhpcy5saXZlcywgaSAsIDUwLCAzMCwgMzApXG4gICAgICAgICAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckluZGljdG9yKCkge1xuICAgICAgICBpZiAoIXRoaXMuY3VycmVudFByb2plY3RpbGVPYmplY3QpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLmluZGljYXRvckltYWdlLCB0aGlzLmJpcmRQcm9wZXJ0aWVzLnggLSA4NSAsIHRoaXMuYmlyZFByb3BlcnRpZXMueSAgLSAzNSwgMTQwLCAxNDAgKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9zdEFsbFByb2plY3RpbGVPYmplY3RzKCkge1xuICAgICAgICBpZiAodGhpcy5iaXJkUHJvcGVydGllcy5wbGF5ZXJMaXZlcyA9PT0gMCAmJiB0aGlzLmN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnN0YXRlID09PSBcImVuZFN0YXRlXCIpIHtcbiAgICAgICAgICAgIHZhciB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmxhc3RMaXZlVGltZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdExpdmVUaW1lciA9IHRpbWVzdGFtcDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZWxhcHNlZCA9IHRpbWVzdGFtcCAtIHRoaXMubGFzdExpdmVUaW1lcjtcbiAgICAgICAgICAgIGlmIChlbGFwc2VkID4gNTAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIE9iamVjdExhdW5jaCB7XG4gICAgY29uc3RydWN0b3IoY3R4LCBvYmplY3RUeXBlKSB7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLm9iamVjdFR5cGUgPSBvYmplY3RUeXBlO1xuICAgIH1cblxuICAgIHJlbmRlck9iamVjdExhdW5jaCgpIHtcbiAgICAgICAgdGhpcy5vYmplY3RUeXBlLnJlbmRlcigpO1xuICAgIH1cblxuICAgIHVwZGF0ZUN1cnJlbnRMYXVuY2hlZE9iamVjdCgpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRPYmplY3QgPSB0aGlzLm9iamVjdFR5cGU7XG4gICAgICAgIGN1cnJlbnRPYmplY3QudmVsWCArPSBjdXJyZW50T2JqZWN0LmdyYXZpdHkueDtcbiAgICAgICAgY3VycmVudE9iamVjdC52ZWxZICs9IGN1cnJlbnRPYmplY3QuZ3Jhdml0eS55O1xuICAgICAgICBjdXJyZW50T2JqZWN0LnggKz0gY3VycmVudE9iamVjdC52ZWxYO1xuICAgICAgICBjdXJyZW50T2JqZWN0LnkgKz0gY3VycmVudE9iamVjdC52ZWxZO1xuXG4gICAgICAgIGlmIChjdXJyZW50T2JqZWN0LnkgPj0gY3VycmVudE9iamVjdC5ncm91bmQpIHtcbiAgICAgICAgICAgIGN1cnJlbnRPYmplY3QueSA9IGN1cnJlbnRPYmplY3QuZ3JvdW5kIC0gKGN1cnJlbnRPYmplY3QueSAtIGN1cnJlbnRPYmplY3QuZ3JvdW5kKTtcbiAgICAgICAgICAgIGN1cnJlbnRPYmplY3QudmVsWSA9IC1NYXRoLmFicyhjdXJyZW50T2JqZWN0LnZlbFkpICogY3VycmVudE9iamVjdC5ib3VuY2U7XG4gICAgICAgICAgICBpZiAoY3VycmVudE9iamVjdC52ZWxZID49IGN1cnJlbnRPYmplY3QuZ3Jhdml0eS55KSB7XG4gICAgICAgICAgICAgICAgY3VycmVudE9iamVjdC52ZWxZID0gMDtcbiAgICAgICAgICAgICAgICBjdXJyZW50T2JqZWN0LnkgPSBjdXJyZW50T2JqZWN0Lmdyb3VuZCAtIGN1cnJlbnRPYmplY3QuZ3Jhdml0eS55O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGN1cnJlbnRPYmplY3QudmVsWCA+IDApIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50T2JqZWN0LnZlbFggLT0gY3VycmVudE9iamVjdC5mcmljdGlvblg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY3VycmVudE9iamVjdC52ZWxYIDwgMCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRPYmplY3QudmVsWCArPSBjdXJyZW50T2JqZWN0LmZyaWN0aW9uWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBzdG9wcyBiYWxsIGZyb20gYm91bmNpbmcgaW4gWSBheGlzXG4gICAgICAgIGlmICggY3VycmVudE9iamVjdC55ID49IGN1cnJlbnRPYmplY3QuZ3JvdW5kIC0gMTApIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50T2JqZWN0LnZlbFkgPD0gMCAmJiBjdXJyZW50T2JqZWN0LnZlbFkgPiAtMi41KSB7XG4gICAgICAgICAgICAgICAgY3VycmVudE9iamVjdC52ZWxZID0gMDtcbiAgICAgICAgICAgICAgICBjdXJyZW50T2JqZWN0LnN0YXRlID0gXCJlbmRTdGF0ZVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHN0b3BzIGJhbGwgZnJvbSBtb3Zpbmcgb24gWCBheGlzIFxuICAgICAgICBpZiAoTWF0aC5hYnMoY3VycmVudE9iamVjdC52ZWxYKSA8IDEuMSkge1xuICAgICAgICAgICAgY3VycmVudE9iamVjdC52ZWxYID0gMDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0aWxlOyIsImltcG9ydCBQaWcgZnJvbSBcIi4vcGlnXCI7XG5pbXBvcnQgQmxvY2sgZnJvbSBcIi4vYmxvY2tcIjtcbmltcG9ydCBQcm9qZWN0aWxlIGZyb20gXCIuL3Byb2plY3RpbGVcIjtcbmltcG9ydCB7c3RhZ2VLZXlzfSBmcm9tIFwiLi9zdGFnZXMvc3RhZ2VLZXlzXCI7XG5pbXBvcnQge2NoZWNrQmlyZE9uUGlnQ29sbGlzaW9uLCBjaGVja0JpcmRPbkJsb2NrQ29sbGlzaW9ufSBmcm9tIFwiLi91dGlsL2NvbGxpc2lvbkRldGVjdGlvblV0aWxcIjtcbmltcG9ydCB7YmlyZE9uUGlnQ29sbGlzaW9uTG9naWMsIGJpcmRPbkJsb2NrQ29sbGlzaW9uTG9naWN9IGZyb20gXCIuL3V0aWwvY29sbGlzaW9uTG9naWNVdGlsXCI7XG5pbXBvcnQge2NoZWNrQmlyZEFuZFBpZ1N0YXRlfSBmcm9tIFwiLi91dGlsL3N0YXRlTG9naWNcIjtcblxuY2xhc3MgU3RhZ2VMb2FkZXIge1xuICAgIGNvbnN0cnVjdG9yKGN0eCkge1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjdHguY2FudmFzO1xuICAgICAgICB0aGlzLnNjb3JlID0gMDtcbiAgICAgICAgdGhpcy5zdGFnZU51bWJlciA9IDE7XG4gICAgICAgIHRoaXMuc3RhcnRQb3NCaXJkID0gW107XG4gICAgICAgIHRoaXMucHJvamVjdGlsZU9iamVjdCA9IHt9O1xuICAgICAgICB0aGlzLnBpZ3MgPSBbXTtcbiAgICAgICAgdGhpcy5ibG9ja3MgPSBbXTtcbiAgICAgICAgdGhpcy5jbGlja2VkSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5jbGlja2VkSW1hZ2Uuc3JjID0gXCJzcmMvaW1hZ2VzL3Bvb2YucG5nXCJcbiAgICB9XG4gICAgXG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUVudGl0aWVzKCk7XG4gICAgICAgIGlmICh0aGlzLnByb2plY3RpbGVPYmplY3Qub2JqZWN0TGF1bmNoZWQpIHRoaXMuY2hlY2tBbmRVcGRhdGVFbnRpdGllc0NvbGxpc2lvbigpO1xuICAgICAgICB0aGlzLnJlbmRlckVudGl0aWVzKCk7XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZUV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICBjb25zdCBtb3VzZSA9IHtcbiAgICAgICAgICAgIHg6IHRoaXMuY2FudmFzLndpZHRoLzIsXG4gICAgICAgICAgICB5OiB0aGlzLmNhbnZhcy5oZWlnaHQvMixcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlmICgodGhpcy5wcm9qZWN0aWxlT2JqZWN0LmxhdW5jaGVkT2JqZWN0cy5sZW5ndGggPT09IDApIHx8IHRoaXMucHJvamVjdGlsZU9iamVjdC5jdXJyZW50UHJvamVjdGlsZU9iamVjdC5zdGF0ZSA9PT0gXCJlbmRTdGF0ZVwiKXtcbiAgICAgICAgICAgICAgICBsZXQgY2FudmFzUHJvcGVydGllcyA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgIG1vdXNlLnggPSBlLnggLSBjYW52YXNQcm9wZXJ0aWVzLmxlZnQ7XG4gICAgICAgICAgICAgICAgbW91c2UueSA9IGUueSAtIGNhbnZhc1Byb3BlcnRpZXMudG9wO1xuICAgICAgICAgICAgICAgIGxldCBkZWx0YVggPSBtb3VzZS54IC0gdGhpcy5zdGFydFBvc0JpcmRbMF07XG4gICAgICAgICAgICAgICAgbGV0IGRlbHRhWSA9IG1vdXNlLnkgLSB0aGlzLnN0YXJ0UG9zQmlyZFsxXTtcbiAgICAgICAgICAgICAgICBsZXQgdGhldGFSYWRpYW4gPSBNYXRoLmF0YW4yKGRlbHRhWSwgZGVsdGFYKTtcbiAgICAgICAgICAgICAgICBsZXQgYW5nbGVWYWwgPSAtKChNYXRoLmFicyh0aGV0YVJhZGlhbiAqIDE4MCAvIE1hdGguUEkpIC0gMjcwKSAlIDkwKTtcbiAgICAgICAgICAgICAgICBsZXQgbWFnbml0dWRlVmFsID0gKE1hdGguYWJzKG1vdXNlLnggLSAxMzApIC8gMik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobW91c2UueCwgbW91c2UueSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9qZWN0aWxlT2JqZWN0LmtpY2tPZmZMYXVuY2hEaXJlY3Rpb24oYW5nbGVWYWwgLCBtYWduaXR1ZGVWYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZUVudGl0aWVzKCkge1xuICAgICAgICBjb25zdCBjdXJyZW50U3RhZ2VWYWx1ZXMgPSBzdGFnZUtleXNbdGhpcy5zdGFnZU51bWJlcl07XG4gICAgICAgIHRoaXMubG9hZFN0YWdlKGN1cnJlbnRTdGFnZVZhbHVlcyk7XG4gICAgfVxuXG4gICAgcmVzdGFydEVudGl0aWVzKCkge1xuICAgICAgICB0aGlzLnNjb3JlID0gMDtcbiAgICAgICAgdGhpcy5zdGFydFBvc0JpcmQgPSBbXTtcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlT2JqZWN0LmJpcmRQcm9wZXJ0aWVzLnBsYXllckxpdmVzID0gdGhpcy5zdGFydGluZ0xpdmVzO1xuICAgICAgICB0aGlzLnByb2plY3RpbGVPYmplY3QgPSB7fTtcbiAgICAgICAgdGhpcy5waWdzID0gW107XG4gICAgICAgIHRoaXMuYmxvY2tzID0gW107XG4gICAgfVxuXG4gICAgbG9hZFN0YWdlKGN1cnJlbnRTdGFnZVZhbHVlcykge1xuICAgICAgICB0aGlzLmJhY2tncm91bmQgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kLnNyYyA9IGN1cnJlbnRTdGFnZVZhbHVlc1tcImJhY2tHcm91bmRJbWFnZUtleVwiXTtcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlT2JqZWN0ID0gbmV3IFByb2plY3RpbGUodGhpcy5jdHgsIGN1cnJlbnRTdGFnZVZhbHVlc1tcImJpcmRQcm9wZXJ0aWVzXCJdKTtcbiAgICAgICAgdGhpcy5zdGFydGluZ0xpdmVzID0gY3VycmVudFN0YWdlVmFsdWVzW1wiYmlyZFByb3BlcnRpZXNcIl0ucGxheWVyTGl2ZXM7XG4gICAgICAgIHRoaXMuc3RhcnRQb3NCaXJkID0gW2N1cnJlbnRTdGFnZVZhbHVlc1tcImJpcmRQcm9wZXJ0aWVzXCJdLngsIGN1cnJlbnRTdGFnZVZhbHVlc1tcImJpcmRQcm9wZXJ0aWVzXCJdLnldXG4gICAgICAgIHRoaXMuY3VycmVudExldmVsSGlnaFNjb3JlS2V5ID0gY3VycmVudFN0YWdlVmFsdWVzW1wiY3VycmVudExldmVsSGlnaFNjb3JlS2V5XCJdO1xuXG4gICAgICAgIGxldCBoaWdoU2NvcmVTYXZlS2V5U3RyaW5nID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5jdXJyZW50TGV2ZWxIaWdoU2NvcmVLZXkpO1xuICAgICAgICBpZiAoaGlnaFNjb3JlU2F2ZUtleVN0cmluZyA9PT0gbnVsbCl7XG4gICAgICAgICAgICB0aGlzLmhpZ2hTY29yZSA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpZ2hTY29yZSA9IHBhcnNlSW50KGhpZ2hTY29yZVNhdmVLZXlTdHJpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJudW1iZXJPZlBpZ3NcIl07IGkrKykge1xuICAgICAgICAgICAgdGhpcy5waWdzLnB1c2gobmV3IFBpZyhcbiAgICAgICAgICAgICAgICB0aGlzLmN0eCwgXG4gICAgICAgICAgICAgICAgY3VycmVudFN0YWdlVmFsdWVzW1wicGlnUHJvcGVydGllc1wiXVtpXS54LCBcbiAgICAgICAgICAgICAgICBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJwaWdQcm9wZXJ0aWVzXCJdW2ldLnksIFxuICAgICAgICAgICAgICAgIGN1cnJlbnRTdGFnZVZhbHVlc1tcInBpZ1Byb3BlcnRpZXNcIl1baV0ucmFkKSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnRTdGFnZVZhbHVlc1tcIm51bWJlck9mQmxvY2tzXCJdOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tzLnB1c2gobmV3IEJsb2NrKFxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LCBcbiAgICAgICAgICAgICAgICBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJibG9ja1Byb3Blcml0ZXNcIl1baV0ueCwgXG4gICAgICAgICAgICAgICAgY3VycmVudFN0YWdlVmFsdWVzW1wiYmxvY2tQcm9wZXJpdGVzXCJdW2ldLnksXG4gICAgICAgICAgICAgICAgY3VycmVudFN0YWdlVmFsdWVzW1wiYmxvY2tQcm9wZXJpdGVzXCJdW2ldLncsXG4gICAgICAgICAgICAgICAgY3VycmVudFN0YWdlVmFsdWVzW1wiYmxvY2tQcm9wZXJpdGVzXCJdW2ldLmgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUVudGl0aWVzKCkge1xuICAgICAgICB0aGlzLnByb2plY3RpbGVPYmplY3QudXBkYXRlKClcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBpZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucGlnc1tpXS51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYmxvY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmJsb2Nrc1tpXS51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcm9qZWN0aWxlT2JqZWN0LmN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0KSB0aGlzLnVwZGF0ZVBpZ3NMZWZ0KCk7XG4gICAgICAgIHRoaXMudXBkYXRlSGlnaFNjb3JlKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlSGlnaFNjb3JlKCkge1xuICAgICAgICBpZiAodGhpcy5zY29yZSA+IHRoaXMuaGlnaFNjb3JlKSB7XG4gICAgICAgICAgICB0aGlzLmhpZ2hTY29yZSA9IHRoaXMuc2NvcmU7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmN1cnJlbnRMZXZlbEhpZ2hTY29yZUtleSwgdGhpcy5oaWdoU2NvcmUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlUGlnc0xlZnQoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5waWdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoY2hlY2tCaXJkQW5kUGlnU3RhdGUodGhpcy5wcm9qZWN0aWxlT2JqZWN0LmN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnN0YXRlLCB0aGlzLnBpZ3NbaV0uc3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGlnc1tpXS5wb29mQW5pbWF0aW9uVGltZXJCb29sZWFuKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWdzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja0FuZFVwZGF0ZUVudGl0aWVzQ29sbGlzaW9uKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGlncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGNoZWNrQmlyZE9uUGlnQ29sbGlzaW9uKHRoaXMucHJvamVjdGlsZU9iamVjdC5jdXJyZW50UHJvamVjdGlsZU9iamVjdCwgdGhpcy5waWdzW2ldKSkge1xuICAgICAgICAgICAgICAgIGJpcmRPblBpZ0NvbGxpc2lvbkxvZ2ljKHRoaXMucHJvamVjdGlsZU9iamVjdC5jdXJyZW50UHJvamVjdGlsZU9iamVjdCwgdGhpcy5waWdzW2ldKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3JlICs9IDMwMDA7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ibG9ja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjaGVja0JpcmRPbkJsb2NrQ29sbGlzaW9uKHRoaXMucHJvamVjdGlsZU9iamVjdC5jdXJyZW50UHJvamVjdGlsZU9iamVjdCwgdGhpcy5ibG9ja3NbaV0pKSB7XG4gICAgICAgICAgICAgICAgYmlyZE9uQmxvY2tDb2xsaXNpb25Mb2dpYyh0aGlzLnByb2plY3RpbGVPYmplY3QuY3VycmVudFByb2plY3RpbGVPYmplY3QsIHRoaXMuYmxvY2tzW2ldKVxuICAgICAgICAgICAgICAgIHRoaXMuc2NvcmUgKz0gMzI1O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyRW50aXRpZXMoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyQmFja2dyb3VuZCgpO1xuICAgICAgICB0aGlzLnByb2plY3RpbGVPYmplY3QucmVuZGVyKCk7XG4gICAgICAgIHRoaXMucHJvamVjdGlsZU9iamVjdC5yZW5kZXJJbmRpY3RvcigpO1xuICAgICAgICB0aGlzLnByb2plY3RpbGVPYmplY3QucmVuZGVyTGl2ZXMoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBpZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucGlnc1tpXS5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYmxvY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmJsb2Nrc1tpXS5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbmRlclNjb3JlKCk7XG4gICAgICAgIHRoaXMucmVuZGVySGlnaFNjb3JlKCk7XG4gICAgICAgIHRoaXMucmVuZGVyU3RhZ2VOdW1iZXIoKTtcbiAgICB9XG5cbiAgICByZW5kZXJTY29yZSgpIHsgXG4gICAgICAgIHRoaXMuY3R4LnRleHRBbGlnbiA9IFwicmlnaHRcIjtcbiAgICAgICAgdGhpcy5jdHgudGV4dEJhc2VsaW5lID0gXCJ0b3BcIjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJXSElURVwiO1xuICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IFwiQkxBQ0tcIjtcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IDUwICsgXCJweCBCYW5nZXJzXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KHRoaXMuc2NvcmUsIHRoaXMuY2FudmFzLndpZHRoIC0gMzAgLyAyLCAwKVxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KHRoaXMuc2NvcmUsIHRoaXMuY2FudmFzLndpZHRoIC0gMzAgLyAyLCAwKTtcblxuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcInJpZ2h0XCI7XG4gICAgICAgIHRoaXMuY3R4LnRleHRCYXNlbGluZSA9IFwidG9wXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiV0hJVEVcIjtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIkJMQUNLXCI7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSA1MCArIFwicHggQmFuZ2Vyc1wiO1xuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KFwiU2NvcmU6ICAgICAgICAgICAgICAgICAgICAgIFwiLCB0aGlzLmNhbnZhcy53aWR0aCAtIDMwIC8gMiwgMCk7XG4gICAgfVxuXG4gICAgcmVuZGVySGlnaFNjb3JlKCkge1xuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcInJpZ2h0XCI7XG4gICAgICAgIHRoaXMuY3R4LnRleHRCYXNlbGluZSA9IFwidG9wXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiV0hJVEVcIjtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIkJMQUNLXCI7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSA1MCArIFwicHggQmFuZ2Vyc1wiO1xuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCh0aGlzLmhpZ2hTY29yZSwgdGhpcy5jYW52YXMud2lkdGggLSAzMCAvIDIsIDYwKTtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dCh0aGlzLmhpZ2hTY29yZSwgdGhpcy5jYW52YXMud2lkdGggLSAzMCAvIDIsIDYwKTtcblxuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcInJpZ2h0XCI7XG4gICAgICAgIHRoaXMuY3R4LnRleHRCYXNlbGluZSA9IFwidG9wXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiV0hJVEVcIjtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIkJMQUNLXCI7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSA1MCArIFwicHggQmFuZ2Vyc1wiO1xuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KFwiSGlnaHNjb3JlOiAgICAgICAgICAgICAgICAgICAgICBcIiwgdGhpcy5jYW52YXMud2lkdGggLSAzMCAvIDIsIDYwKTtcbiAgICB9XG5cbiAgICByZW5kZXJTdGFnZU51bWJlcigpIHtcbiAgICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gXCJsZWZ0XCI7XG4gICAgICAgIHRoaXMuY3R4LnRleHRCYXNlbGluZSA9IFwidG9wXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiV0hJVEVcIjtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIkJMQUNLXCI7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSAzMCArIFwicHggQmFuZ2Vyc1wiO1xuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIkxldmVsIFwiICsgdGhpcy5zdGFnZU51bWJlciwgMTAsIDEwKVxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KFwiTGV2ZWwgXCIgKyB0aGlzLnN0YWdlTnVtYmVyLCAgMTAsIDEwKTtcbiAgICB9XG5cbiAgICByZW5kZXJCYWNrZ3JvdW5kKCkge1xuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UodGhpcy5iYWNrZ3JvdW5kLCAwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBjaGVja1N0YWdlV29uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5waWdzLmxlbmd0aCA9PT0gMDsgXG4gICAgfVxuXG4gICAgY2hlY2tTdGFnZUxvc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2plY3RpbGVPYmplY3QubG9zdEFsbFByb2plY3RpbGVPYmplY3RzKClcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RhZ2VMb2FkZXI7IiwiZXhwb3J0IGNvbnN0IHN0YWdlS2V5cyA9IHtcbiAgICAxIDoge1xuICAgICAgICBcImJhY2tHcm91bmRJbWFnZUtleVwiIDogXCJzcmMvaW1hZ2VzL3RlbXAuanBnXCIsXG4gICAgICAgIFwiY3VycmVudExldmVsSGlnaFNjb3JlS2V5XCI6IFwiaGlnaFNjb3JlS2V5TGV2ZWwxXCIsXG4gICAgICAgIFwibnVtYmVyT2ZQaWdzXCI6IDIsXG4gICAgICAgIFwicGlnUHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICAwIDoge1xuICAgICAgICAgICAgICAgIHg6IDYwMCxcbiAgICAgICAgICAgICAgICB5OiA2MDAsXG4gICAgICAgICAgICAgICAgcmFkOiAyNSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAxIDoge1xuICAgICAgICAgICAgICAgIHg6IDMwMCxcbiAgICAgICAgICAgICAgICB5OiA2MDAsXG4gICAgICAgICAgICAgICAgcmFkOiAyNSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJudW1iZXJPZkJsb2Nrc1wiOiAzLFxuICAgICAgICBcImJsb2NrUHJvcGVyaXRlc1wiOiB7XG4gICAgICAgICAgICAwIDoge1xuICAgICAgICAgICAgICAgIHg6IDEwMDAsXG4gICAgICAgICAgICAgICAgeTogNzAwLFxuICAgICAgICAgICAgICAgIHc6IDcwLFxuICAgICAgICAgICAgICAgIGg6IDQwMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAxOiB7XG4gICAgICAgICAgICAgICAgeDogNTAwLFxuICAgICAgICAgICAgICAgIHk6IDcwMCxcbiAgICAgICAgICAgICAgICB3OiA1MCxcbiAgICAgICAgICAgICAgICBoOiAxNDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgMjoge1xuICAgICAgICAgICAgICAgIHg6IDkwMCxcbiAgICAgICAgICAgICAgICB5OiA5MDAsXG4gICAgICAgICAgICAgICAgdzogNTAsXG4gICAgICAgICAgICAgICAgaDogNTAsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiYmlyZFByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgcGxheWVyTGl2ZXM6IDMsXG4gICAgICAgICAgICB4OiA5Ny41LFxuICAgICAgICAgICAgeTogNTUyLjUsXG4gICAgICAgICAgICByYWQ6IDE0LFxuICAgICAgICB9XG4gICAgfSxcbiAgICBcbiAgICAyIDoge1xuICAgICAgICBcImJhY2tHcm91bmRJbWFnZUtleVwiIDogXCJzcmMvaW1hZ2VzL2JhY2tncm91bmRsZXZlbDIuanBnXCIsXG4gICAgICAgIFwiY3VycmVudExldmVsSGlnaFNjb3JlS2V5XCI6IFwiaGlnaFNjb3JlS2V5TGV2ZWwyXCIsXG4gICAgICAgIFwibnVtYmVyT2ZQaWdzXCI6IDMsXG4gICAgICAgIFwicGlnUHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICAwIDoge1xuICAgICAgICAgICAgICAgIHg6IDUwMCxcbiAgICAgICAgICAgICAgICB5OiA2MDAsXG4gICAgICAgICAgICAgICAgcmFkOiAyNSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAxIDoge1xuICAgICAgICAgICAgICAgIHg6IDEyMDAsXG4gICAgICAgICAgICAgICAgeTogNjAwLFxuICAgICAgICAgICAgICAgIHJhZDogMjUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgMiA6IHtcbiAgICAgICAgICAgICAgICB4OiA3MDAsXG4gICAgICAgICAgICAgICAgeTogNjAwLFxuICAgICAgICAgICAgICAgIHJhZDogMjUsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwibnVtYmVyT2ZCbG9ja3NcIjogMixcbiAgICAgICAgXCJibG9ja1Byb3Blcml0ZXNcIjoge1xuICAgICAgICAgICAgMCA6IHtcbiAgICAgICAgICAgICAgICB4OiA0MDAsXG4gICAgICAgICAgICAgICAgeTogNzAwLFxuICAgICAgICAgICAgICAgIHc6IDMwLFxuICAgICAgICAgICAgICAgIGg6IDEwMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAxOiB7XG4gICAgICAgICAgICAgICAgeDogMTAwMCxcbiAgICAgICAgICAgICAgICB5OiA3MDAsXG4gICAgICAgICAgICAgICAgdzogNTAsXG4gICAgICAgICAgICAgICAgaDogMTQwLFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImJpcmRQcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgIHBsYXllckxpdmVzOiA0LFxuICAgICAgICAgICAgeDogOTcuNSxcbiAgICAgICAgICAgIHk6IDU1Mi41LFxuICAgICAgICAgICAgcmFkOiAxNCxcbiAgICAgICAgfVxuICAgIH1cbn0iLCIvLyBiYWxsIGNvbGxpc2lvbiBkZXRlY3Rpb24gZnJvbSBodHRwczovL2J1cmFra2FuYmVyLmNvbS9ibG9nL21vZGVsaW5nLXBoeXNpY3MtamF2YXNjcmlwdC1ncmF2aXR5LWFuZC1kcmFnL1xuLy8gYmxvY2sgaHR0cHM6Ly9jb2RlcmV2aWV3LnN0YWNrZXhjaGFuZ2UuY29tL3F1ZXN0aW9ucy8xOTI0NzcvY2lyY2xlLWxpbmUtc2VnbWVudC1jb2xsaXNpb25zXG5leHBvcnQgY29uc3QgY2hlY2tCaXJkT25QaWdDb2xsaXNpb24gPSAoY3VycmVudFByb2plY3RpbGVPYmplY3QsIHBpZykgPT4ge1xuICAgIGlmIChjdXJyZW50UHJvamVjdGlsZU9iamVjdC54ICsgY3VycmVudFByb2plY3RpbGVPYmplY3QucmFkaXVzICsgcGlnLnJhZGl1cyA+IHBpZy54XG4gICAgICAgICYmIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnggPCBwaWcueCArIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnJhZGl1cyArIHBpZy5yYWRpdXNcbiAgICAgICAgJiYgY3VycmVudFByb2plY3RpbGVPYmplY3QueSArIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnJhZGl1cyArIHBpZy5yYWRpdXMgPiBwaWcueVxuICAgICAgICAmJiBjdXJyZW50UHJvamVjdGlsZU9iamVjdC55IDwgcGlnLnkgKyBjdXJyZW50UHJvamVjdGlsZU9iamVjdC5yYWRpdXMgKyBwaWcucmFkaXVzKSBcbiAgICB7XG4gICAgICAgIC8vIHB5dGhhZ29yZWFtIHRoZW9yZW0gdG8gYmUgbW9yZSBleGFjdCBvbiBjb2xsaXNpb25cbiAgICAgICAgbGV0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KFxuICAgICAgICAgICAgICAgICgoY3VycmVudFByb2plY3RpbGVPYmplY3QueCAtIHBpZy54KSAqIChjdXJyZW50UHJvamVjdGlsZU9iamVjdC54IC0gcGlnLngpKVxuICAgICAgICAgICAgKyAoKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnkgLSBwaWcueSkgKiAoY3VycmVudFByb2plY3RpbGVPYmplY3QueSAtIHBpZy55KSlcbiAgICAgICAgKVxuICAgICAgICByZXR1cm4gZGlzdGFuY2UgPCBjdXJyZW50UHJvamVjdGlsZU9iamVjdC5yYWRpdXMgKyBwaWcucmFkaXVzOyBcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBjaGVja0JpcmRPbkJsb2NrQ29sbGlzaW9uID0gKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LCBibG9jaykgPT4ge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgNDsgaisrKXtcbiAgICAgICAgY29uc3QgY2lyY2xlQ2VudGVyID0gW2N1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LngsIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnldO1xuICAgICAgICBpZiAoaiArIDEgPT09IDQpIHtcbiAgICAgICAgICAgIGlmIChjaGVja0JpcmRJbnRlcmNlcHRCbG9jayhibG9jay5nZXRQb2ludChqKSwgYmxvY2suZ2V0UG9pbnQoMCksIGNpcmNsZUNlbnRlciwgY3VycmVudFByb2plY3RpbGVPYmplY3QucmFkaXVzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGNoZWNrQmlyZEludGVyY2VwdEJsb2NrKGJsb2NrLmdldFBvaW50KGopLCBibG9jay5nZXRQb2ludChqICsgMSksIGNpcmNsZUNlbnRlciwgY3VycmVudFByb2plY3RpbGVPYmplY3QucmFkaXVzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5jb25zdCBjaGVja0JpcmRJbnRlcmNlcHRCbG9jayA9IChwb2ludEEsIHBvaW50QiwgY2lyY2xlQ2VudGVyLCByYWRpdXMpID0+IHtcbiAgICBsZXQgZGlzdDtcbiAgICBjb25zdCB2ZWwxWCA9IHBvaW50Qi5wb3MueCAtIHBvaW50QS5wb3MueDtcbiAgICBjb25zdCB2ZWwxWSA9IHBvaW50Qi5wb3MueSAtIHBvaW50QS5wb3MueTtcbiAgICBjb25zdCB2ZWwyWCA9IGNpcmNsZUNlbnRlclswXSAtIHBvaW50QS5wb3MueDtcbiAgICBjb25zdCB2ZWwyWSA9IGNpcmNsZUNlbnRlclsxXSAtIHBvaW50QS5wb3MueTtcbiAgICBjb25zdCB1bml0ID0gKHZlbDJYICogdmVsMVggKyB2ZWwyWSAqIHZlbDFZKSAvICh2ZWwxWSAqIHZlbDFZICsgdmVsMVggKiB2ZWwxWCk7XG4gICAgaWYgKHVuaXQgPj0gMCAmJiB1bml0IDw9IDEpe1xuICAgICAgICBkaXN0ID0gKHBvaW50QS5wb3MueCAgKyB2ZWwxWCAqIHVuaXQgLSBjaXJjbGVDZW50ZXJbMF0pICoqIDIgKyAocG9pbnRBLnBvcy55ICsgdmVsMVkgKiB1bml0IC0gY2lyY2xlQ2VudGVyWzFdKSAqKiAyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc3QgPSB1bml0IDwgMCA/IFxuICAgICAgICAgICAgKHBvaW50QS5wb3MueCAtIGNpcmNsZUNlbnRlclswXSkgKiogMiArIChwb2ludEEucG9zLnkgLSBjaXJjbGVDZW50ZXJbMV0pICoqIDIgOlxuICAgICAgICAgICAgKHBvaW50Qi5wb3MueCAtIGNpcmNsZUNlbnRlclswXSkgKiogMiArIChwb2ludEIucG9zLnkgLSBjaXJjbGVDZW50ZXJbMV0pICoqIDI7XG4gICAgfVxuICAgIHJldHVybiBkaXN0IDwgcmFkaXVzICogcmFkaXVzO1xufVxuXG5cblxuXG5cbiIsImV4cG9ydCBjb25zdCBiaXJkT25QaWdDb2xsaXNpb25Mb2dpYyA9IChjdXJyZW50UHJvamVjdGlsZU9iamVjdCwgcGlnKSA9PiB7XG4gICAgcGlnLnN0YXRlID0gXCJkZWFkXCI7XG4gICAgbGV0IG5ld1ZlbFgxID0gKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFggKiAoY3VycmVudFByb2plY3RpbGVPYmplY3QubWFzcyAtIHBpZy5tYXNzKSArICggMiAqIHBpZy5tYXNzICogcGlnLnZlbFgpKSAvIChjdXJyZW50UHJvamVjdGlsZU9iamVjdC5tYXNzICsgcGlnLm1hc3MpO1xuICAgIGxldCBuZXdWZWxZMSA9IChjdXJyZW50UHJvamVjdGlsZU9iamVjdC52ZWxZICogKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0Lm1hc3MgLSBwaWcubWFzcykgKyAoIDIgKiBwaWcubWFzcyAqIHBpZy52ZWxZKSkgLyAoY3VycmVudFByb2plY3RpbGVPYmplY3QubWFzcyArIHBpZy5tYXNzKTtcbiAgICBsZXQgbmV3VmVsWDIgPSAocGlnLnZlbFggKiAocGlnLm1hc3MgLSBjdXJyZW50UHJvamVjdGlsZU9iamVjdC5tYXNzKSArICgyICogY3VycmVudFByb2plY3RpbGVPYmplY3QubWFzcyAqIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFgpKSAvIChjdXJyZW50UHJvamVjdGlsZU9iamVjdC5tYXNzICsgcGlnLm1hc3MpO1xuICAgIGxldCBuZXdWZWxZMiA9IChwaWcudmVsWSAqIChwaWcubWFzcyAtIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0Lm1hc3MpICsgKDIgKiBjdXJyZW50UHJvamVjdGlsZU9iamVjdC5tYXNzICogY3VycmVudFByb2plY3RpbGVPYmplY3QudmVsWSkpIC8gKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0Lm1hc3MgKyBwaWcubWFzcyk7XG4gICAgXG4gICAgY3VycmVudFByb2plY3RpbGVPYmplY3QudmVsWCA9IC1jdXJyZW50UHJvamVjdGlsZU9iamVjdC52ZWxYO1xuICAgIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFkgPSAtY3VycmVudFByb2plY3RpbGVPYmplY3QudmVsWTtcbiAgICBwaWcudmVsWCA9IG5ld1ZlbFgyO1xuICAgIHBpZy52ZWxZID0gbmV3VmVsWTI7XG5cbiAgICBjdXJyZW50UHJvamVjdGlsZU9iamVjdC54ID0gY3VycmVudFByb2plY3RpbGVPYmplY3QueCArIG5ld1ZlbFgxO1xuICAgIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnkgPSBjdXJyZW50UHJvamVjdGlsZU9iamVjdC55ICsgbmV3VmVsWTE7XG4gICAgcGlnLnggPSBwaWcueCArIG5ld1ZlbFgyO1xuICAgIHBpZy55ID0gcGlnLnkgKyBuZXdWZWxZMjtcbn1cblxuZXhwb3J0IGNvbnN0IGJpcmRPbkJsb2NrQ29sbGlzaW9uTG9naWMgPSAoY3VycmVudFByb2plY3RpbGVPYmplY3QsIGJsb2NrKSA9PiB7XG4gICAgY3VycmVudFByb2plY3RpbGVPYmplY3QudmVsWCA9IC1jdXJyZW50UHJvamVjdGlsZU9iamVjdC52ZWxYO1xuICAgIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFkgPSAtY3VycmVudFByb2plY3RpbGVPYmplY3QudmVsWTtcbiAgICBsZXQgZm9yY2UgPSBibG9jay5hc1BvbGFyKGJsb2NrLnZlY3RvcigxMCwgMTApKTtcbiAgICBmb3JjZS5tYWcgKj0gYmxvY2subWFzcyAqIDAuMTtcbiAgICBibG9jay5hcHBseUZvcmNlKGZvcmNlLCBibG9jay52ZWN0b3IoY3VycmVudFByb2plY3RpbGVPYmplY3QueCwgY3VycmVudFByb2plY3RpbGVPYmplY3QueSkpO1xufVxuXG5cbiIsImV4cG9ydCBjb25zdCBjaGVja0JpcmRBbmRQaWdTdGF0ZSA9IChjdXJyZW50UHJvamVjdGlsZU9iamVjdFN0YXRlLCBwaWdTdGF0ZSkgPT4ge1xuICAgIGlmIChjdXJyZW50UHJvamVjdGlsZU9iamVjdFN0YXRlID09PSBcImVuZFN0YXRlXCIgJiYgcGlnU3RhdGUgPT09IFwiZGVhZFwiKSByZXR1cm4gdHJ1ZTtcbn1cblxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9zdHlsZXMvaW5kZXguc2Nzc1wiO1xuaW1wb3J0IEFuZ2VyZWRCaXJkcyBmcm9tIFwiLi9zY3JpcHRzL2dhbWVcIjtcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYW52YXNcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGluaXQpO1xuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXNldC1oaWdoc2NvcmVcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlc2V0TG9jYWxTdG9yYWdlKTtcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzdGFydC1idXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlc3RhcnRHYW1lKTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBuZXcgQW5nZXJlZEJpcmRzKCkuc3RhcnQoKTtcbn1cblxuZnVuY3Rpb24gcmVzdGFydEdhbWUoKSB7XG4gICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IFwiXCI7XG59XG5cbmZ1bmN0aW9uIHJlc2V0TG9jYWxTdG9yYWdlKCkge1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbn1cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==