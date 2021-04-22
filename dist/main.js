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

        if (elapsed > 4000) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYmlyZC5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYmxvY2suanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi8uL3NyYy9zY3JpcHRzL2NhbnZhcy5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvcGlnLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9wcm9qZWN0aWxlLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9zdGFnZUxvYWRlci5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvc3RhZ2VzL3N0YWdlS2V5cy5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvdXRpbC9jb2xsaXNpb25EZXRlY3Rpb25VdGlsLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy91dGlsL2NvbGxpc2lvbkxvZ2ljVXRpbC5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvdXRpbC9zdGF0ZUxvZ2ljLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc3R5bGVzL2luZGV4LnNjc3MiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiQmlyZCIsImN0eCIsImJpcmRQcm9wZXJ0aWVzIiwieCIsInkiLCJyYWRpdXMiLCJyYWQiLCJtYXNzIiwidmVsWCIsInZlbFkiLCJ0cmFuc2ZlciIsImdyYXZpdHkiLCJncm91bmQiLCJjYW52YXMiLCJoZWlnaHQiLCJib3VuY2UiLCJmcmljdGlvblgiLCJiaXJkIiwiSW1hZ2UiLCJzcmMiLCJzdGF0ZSIsInNhdmUiLCJiZWdpblBhdGgiLCJhcmMiLCJNYXRoIiwiUEkiLCJjbGlwIiwiY2xvc2VQYXRoIiwiZHJhd0ltYWdlIiwicmVzdG9yZSIsIkJsb2NrIiwidyIsImgiLCJyIiwiZHgiLCJkeSIsImRyIiwiSU5TRVQiLCJQSTkwIiwiUEkyIiwiV0FMTF9OT1JNUyIsIl9ncm91bmQiLCJnZXRNYXNzIiwiYmxvY2siLCJzZXRUcmFuc2Zvcm0iLCJyb3RhdGUiLCJpIiwicCIsImdldFBvaW50IiwicG9zIiwiZG9Db2xsaXNpb24iLCJ3aWR0aCIsIndoaWNoIiwieHgiLCJ5eSIsInZlbG9jaXR5QSIsInZlbG9jaXR5VCIsInZlbG9jaXR5IiwiY29zIiwic2luIiwiZGV0YWlscyIsImFzUG9sYXIiLCJ2ZWN0b3IiLCJwb2xhciIsIm1hZyIsImRpciIsInZlY3RvckFkZCIsInZhbGlkYXRlUG9sYXIiLCJ2ZWMiLCJpc1BvbGFyIiwicFZlYyIsInJldFYiLCJpc0NhcnQiLCJjYXJ0VG9Qb2xhciIsInVuZGVmaW5lZCIsInBvbGFyVG9DYXJ0IiwiYXRhbjIiLCJoeXBvdCIsInZlYzEiLCJ2ZWMyIiwidjEiLCJhc0NhcnQiLCJ2MiIsImZvcmNlIiwibG9jIiwibCIsInRvQ2VudGVyIiwicGhldGEiLCJGdiIsIkZhIiwiYWNjZWwiLCJkZWx0YVYiLCJhY2NlbEEiLCJ2IiwiZDEiLCJkMiIsImFsb25nIiwidGFuZ2VudCIsInBvaW50RGV0YWlscyIsIndhbGxJbmRleCIsInZ2IiwidmEiLCJ2dmMiLCJ2ZWN0b3JDb21wb25lbnRzRm9yRGlyIiwidmFjIiwiYXBwbHlGb3JjZSIsIkNhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImdldENvbnRleHQiLCJiaW5kQ2FudmFzVG9ET00iLCJxdWVyeVNlbGVjdG9yIiwiY2xlYXJDYW52YXMiLCJib2R5IiwiYXBwZW5kIiwiY2xhc3NMaXN0IiwiYWRkIiwiY2xlYXJSZWN0IiwiZ2V0RWxlbWVudEJ5SWQiLCJyZW1vdmVDaGlsZCIsIkFuZ2VyZWRCaXJkcyIsInN0YXJ0IiwiYmluZCIsInRoYXQiLCJhbmltYXRpbmciLCJpbml0aWFsaXplRW50aXRpZXMiLCJhbmltYXRpb24iLCJzdGFnZUxvYWRlciIsInVwZGF0ZSIsImludGVydmFsIiwid2luZG93IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2hlY2tTdGFnZVdvbiIsIndpbkxldmVsIiwiY2hlY2tTdGFnZUxvc3QiLCJnYW1lT3ZlciIsIlN0YWdlTG9hZGVyIiwiaW5pdGlhbGl6ZUV2ZW50TGlzdGVuZXJzIiwic3RhZ2VOdW1iZXIiLCJyZXN0YXJ0RW50aXRpZXMiLCJQaWciLCJwaWciLCJwb29mIiwic3RhcnRUaW1lciIsImFicyIsInRpbWVzdGFtcCIsIkRhdGUiLCJnZXRUaW1lIiwiZWxhcHNlZCIsIlByb2plY3RpbGUiLCJsYXVuY2hlZE9iamVjdHMiLCJtYXgiLCJwcm9qZWN0aWxlSW1hZ2UiLCJsaXZlcyIsImxhc3RMaXZlVGltZXIiLCJpbmRpY2F0b3JJbWFnZSIsImFuZ2xlVmFsIiwibWFnbml0dWRlVmFsIiwiYW5nbGUiLCJjdXJyZW50UHJvamVjdGlsZU9iamVjdCIsIm9iamVjdExhdW5jaGVkIiwiT2JqZWN0TGF1bmNoIiwib2JqZWN0VHlwZSIsInB1c2giLCJ1cGRhdGVMaXZlcyIsImxlbmd0aCIsInNwbGljZSIsImN1cnJlbnRPYmplY3QiLCJ1cGRhdGVDdXJyZW50TGF1bmNoZWRPYmplY3QiLCJjdXJyZW50QmlyZCIsInJlbmRlciIsInBsYXllckxpdmVzIiwic2NvcmUiLCJzdGFydFBvc0JpcmQiLCJwcm9qZWN0aWxlT2JqZWN0IiwicGlncyIsImJsb2NrcyIsImNsaWNrZWRJbWFnZSIsInVwZGF0ZUVudGl0aWVzIiwiY2hlY2tBbmRVcGRhdGVFbnRpdGllc0NvbGxpc2lvbiIsInJlbmRlckVudGl0aWVzIiwibW91c2UiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImNhbnZhc1Byb3BlcnRpZXMiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJsZWZ0IiwidG9wIiwiZGVsdGFYIiwiZGVsdGFZIiwidGhldGFSYWRpYW4iLCJjb25zb2xlIiwibG9nIiwia2lja09mZkxhdW5jaERpcmVjdGlvbiIsImN1cnJlbnRTdGFnZVZhbHVlcyIsInN0YWdlS2V5cyIsImxvYWRTdGFnZSIsInN0YXJ0aW5nTGl2ZXMiLCJiYWNrZ3JvdW5kIiwiY3VycmVudExldmVsSGlnaFNjb3JlS2V5IiwiaGlnaFNjb3JlU2F2ZUtleVN0cmluZyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJoaWdoU2NvcmUiLCJwYXJzZUludCIsInVwZGF0ZVBpZ3NMZWZ0IiwidXBkYXRlSGlnaFNjb3JlIiwic2V0SXRlbSIsImNoZWNrQmlyZEFuZFBpZ1N0YXRlIiwicG9vZkFuaW1hdGlvblRpbWVyQm9vbGVhbiIsImNoZWNrQmlyZE9uUGlnQ29sbGlzaW9uIiwiYmlyZE9uUGlnQ29sbGlzaW9uTG9naWMiLCJjaGVja0JpcmRPbkJsb2NrQ29sbGlzaW9uIiwiYmlyZE9uQmxvY2tDb2xsaXNpb25Mb2dpYyIsInJlbmRlckJhY2tncm91bmQiLCJyZW5kZXJJbmRpY3RvciIsInJlbmRlckxpdmVzIiwicmVuZGVyU2NvcmUiLCJyZW5kZXJIaWdoU2NvcmUiLCJyZW5kZXJTdGFnZU51bWJlciIsInRleHRBbGlnbiIsInRleHRCYXNlbGluZSIsImZpbGxTdHlsZSIsInN0cm9rZVN0eWxlIiwiZm9udCIsImZpbGxUZXh0Iiwic3Ryb2tlVGV4dCIsImxvc3RBbGxQcm9qZWN0aWxlT2JqZWN0cyIsImRpc3RhbmNlIiwic3FydCIsImoiLCJjaXJjbGVDZW50ZXIiLCJjaGVja0JpcmRJbnRlcmNlcHRCbG9jayIsInBvaW50QSIsInBvaW50QiIsImRpc3QiLCJ2ZWwxWCIsInZlbDFZIiwidmVsMlgiLCJ2ZWwyWSIsInVuaXQiLCJuZXdWZWxYMSIsIm5ld1ZlbFkxIiwibmV3VmVsWDIiLCJuZXdWZWxZMiIsImN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0U3RhdGUiLCJwaWdTdGF0ZSIsImluaXQiLCJyZXNldExvY2FsU3RvcmFnZSIsInJlc3RhcnRHYW1lIiwibG9jYXRpb24iLCJocmVmIiwiY2xlYXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQU1BLEk7QUFDRixnQkFBWUMsR0FBWixFQUFpQkMsY0FBakIsRUFBaUM7QUFBQTs7QUFDN0IsU0FBS0QsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsU0FBS0UsQ0FBTCxHQUFTRCxjQUFjLENBQUNDLENBQXhCO0FBQ0EsU0FBS0MsQ0FBTCxHQUFTRixjQUFjLENBQUNFLENBQXhCO0FBQ0EsU0FBS0MsTUFBTCxHQUFjSCxjQUFjLENBQUNJLEdBQTdCO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLENBQVo7QUFDQSxTQUFLQyxJQUFMLEdBQVksQ0FBWjtBQUNBLFNBQUtDLElBQUwsR0FBWSxDQUFaO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixHQUFoQjtBQUNBLFNBQUtDLE9BQUwsR0FBZTtBQUFFUixPQUFDLEVBQUUsQ0FBTDtBQUFRQyxPQUFDLEVBQUU7QUFBWCxLQUFmO0FBQ0EsU0FBS1EsTUFBTCxHQUFjLEtBQUtYLEdBQUwsQ0FBU1ksTUFBVCxDQUFnQkMsTUFBaEIsR0FBeUIsRUFBdkM7QUFDQSxTQUFLQyxNQUFMLEdBQWMsR0FBZDtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsR0FBakI7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Ozs7Ozs7O0FDQVA7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsNkNBQTZDLHdEQUF3RCxFOzs7OztXQ0FyRztXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFFQTNJLFFBQVEsQ0FBQ0ksYUFBVCxDQUF1QixTQUF2QixFQUFrQ3VFLGdCQUFsQyxDQUFtRCxPQUFuRCxFQUE0RGlFLElBQTVEO0FBQ0E1SSxRQUFRLENBQUNJLGFBQVQsQ0FBdUIsa0JBQXZCLEVBQTJDdUUsZ0JBQTNDLENBQTRELE9BQTVELEVBQXFFa0UsaUJBQXJFO0FBQ0E3SSxRQUFRLENBQUNJLGFBQVQsQ0FBdUIsaUJBQXZCLEVBQTBDdUUsZ0JBQTFDLENBQTJELE9BQTNELEVBQW9FbUUsV0FBcEU7O0FBRUEsU0FBU0YsSUFBVCxHQUFnQjtBQUNaLE1BQUkvSCxrREFBSixHQUFtQkMsS0FBbkI7QUFDSDs7QUFFRCxTQUFTZ0ksV0FBVCxHQUF1QjtBQUNuQjlJLFVBQVEsQ0FBQytJLFFBQVQsQ0FBa0JDLElBQWxCLEdBQXlCLEVBQXpCO0FBQ0g7O0FBRUQsU0FBU0gsaUJBQVQsR0FBNkI7QUFDekJ0SCxRQUFNLENBQUN1RSxZQUFQLENBQW9CbUQsS0FBcEI7QUFDSCxDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBCaXJkIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgsIGJpcmRQcm9wZXJ0aWVzKSB7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLnggPSBiaXJkUHJvcGVydGllcy54O1xuICAgICAgICB0aGlzLnkgPSBiaXJkUHJvcGVydGllcy55O1xuICAgICAgICB0aGlzLnJhZGl1cyA9IGJpcmRQcm9wZXJ0aWVzLnJhZDtcbiAgICAgICAgdGhpcy5tYXNzID0gMjtcbiAgICAgICAgdGhpcy52ZWxYID0gMDtcbiAgICAgICAgdGhpcy52ZWxZID0gMDtcbiAgICAgICAgdGhpcy50cmFuc2ZlciA9IDAuOTtcbiAgICAgICAgdGhpcy5ncmF2aXR5ID0geyB4OiAwLCB5OiAwLjEgfTtcbiAgICAgICAgdGhpcy5ncm91bmQgPSB0aGlzLmN0eC5jYW52YXMuaGVpZ2h0IC0gMjA7XG4gICAgICAgIHRoaXMuYm91bmNlID0gMC41O1xuICAgICAgICB0aGlzLmZyaWN0aW9uWCA9IDAuOTtcbiAgICAgICAgdGhpcy5iaXJkID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMuYmlyZC5zcmMgPSBcInNyYy9pbWFnZXMvYW5nZXJlZC1iaXJkeS5wbmdcIlxuICAgICAgICB0aGlzLnN0YXRlID0gXCJzdGFydFN0YXRlXCI7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLmN0eC5zYXZlKCk7XG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICB0aGlzLmN0eC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCAoTWF0aC5QSSAqIDIpLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuY3R4LmNsaXAoKTtcbiAgICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLmJpcmQsIHRoaXMueCAtIHRoaXMucmFkaXVzLCB0aGlzLnkgLSB0aGlzLnJhZGl1cywgdGhpcy5yYWRpdXMgKiAyLCB0aGlzLnJhZGl1cyAqIDIpXG4gICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJpcmQ7IiwiY2xhc3MgQmxvY2sge1xuICAgIGNvbnN0cnVjdG9yKGN0eCwgeCwgeSwgdywgaCkge1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjdHguY2FudmFzO1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLncgPSB3O1xuICAgICAgICB0aGlzLmggPSBoO1xuICAgICAgICB0aGlzLnIgPSAwLjE7XG4gICAgICAgIHRoaXMuZHggPSAwO1xuICAgICAgICB0aGlzLmR5ID0gMDtcbiAgICAgICAgdGhpcy5kciA9IDA7XG4gICAgICAgIHRoaXMuSU5TRVQgPSAxMDtcbiAgICAgICAgdGhpcy5QSSA9IE1hdGguUEk7XG4gICAgICAgIHRoaXMuUEk5MCA9IE1hdGguUEkgLyAyO1xuICAgICAgICB0aGlzLlBJMiA9IE1hdGguUEkgKiAyO1xuICAgICAgICB0aGlzLldBTExfTk9STVMgPSBbIE1hdGguUEkgLyAyLCBNYXRoLlBJLCAtKE1hdGguUEkgLyAyKSwgMF1cbiAgICAgICAgdGhpcy5fZ3JvdW5kID0gdGhpcy5jYW52YXMuaGVpZ2h0IC0gMTA1O1xuICAgICAgICB0aGlzLm1hc3MgPSB0aGlzLmdldE1hc3MoKVxuICAgICAgICB0aGlzLmJsb2NrID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMuYmxvY2suc3JjID0gXCJzcmMvaW1hZ2VzL3dvb2RlbkJveC5wbmdcIjtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHRoaXMuY3R4LnNhdmUoKVxuICAgICAgICB0aGlzLmN0eC5zZXRUcmFuc2Zvcm0oMSwwLDAsMSx0aGlzLngsdGhpcy55KTtcbiAgICAgICAgdGhpcy5jdHgucm90YXRlKHRoaXMucik7XG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLmJsb2NrLCAtdGhpcy53LzIsIC10aGlzLmgvMiwgdGhpcy53LCB0aGlzLmgpXG4gICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKVxuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy54ICs9IHRoaXMuZHg7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLmR5O1xuICAgICAgICB0aGlzLmR5ICs9IDAuMDYxO1xuICAgICAgICB0aGlzLnIgKz0gdGhpcy5kcjtcblxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgNDsgaSsrKXtcbiAgICAgICAgICAgIHZhciBwID0gdGhpcy5nZXRQb2ludChpKTtcbiAgICAgICAgICAgIC8vIG9ubHkgZG8gb25lIGNvbGxpc2lvbiBwZXIgZnJhbWUgb3Igd2Ugd2lsbCBlbmQgdXAgYWRkaW5nIGVuZXJneVxuICAgICAgICAgICAgaWYocC5wb3MueCA8IHRoaXMuSU5TRVQpe1xuICAgICAgICAgICAgICAgIHRoaXMueCArPSAodGhpcy5JTlNFVCkgLSBwLnBvcy54O1xuICAgICAgICAgICAgICAgIHRoaXMuZG9Db2xsaXNpb24ocCwzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiggcC5wb3MueCA+IHRoaXMuY2FudmFzLndpZHRoLXRoaXMuSU5TRVQpe1xuICAgICAgICAgICAgICAgIHRoaXMueCArPSAodGhpcy5jYW52YXMud2lkdGggLSB0aGlzLklOU0VUKSAtIHAucG9zLng7XG4gICAgICAgICAgICAgICAgdGhpcy5kb0NvbGxpc2lvbihwLDEpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKHAucG9zLnkgPCB0aGlzLklOU0VUKXtcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gKHRoaXMuSU5TRVQpIC0gcC5wb3MueTtcbiAgICAgICAgICAgICAgICB0aGlzLmRvQ29sbGlzaW9uKHAsMClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoIHAucG9zLnkgPiB0aGlzLmNhbnZhcy5oZWlnaHQgLSB0aGlzLklOU0VUKXtcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gKHRoaXMuY2FudmFzLmhlaWdodCAtIHRoaXMuSU5TRVQpIC0gcC5wb3MueTtcbiAgICAgICAgICAgICAgICB0aGlzLmRvQ29sbGlzaW9uKHAsMilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldE1hc3MoKSB7XG4gICAgICAgIHJldHVybiAoIHRoaXMudyAqIHRoaXMuaCAqIHRoaXMuaCkgLyAxMDAwO1xuICAgIH1cblxuICAgIGdldFBvaW50KHdoaWNoKSB7XG4gICAgICAgIHZhciBkeCwgZHksIHgsIHksIHh4LCB5eSwgdmVsb2NpdHlBLCB2ZWxvY2l0eVQsIHZlbG9jaXR5O1xuXG4gICAgICAgIGR4ID0gTWF0aC5jb3ModGhpcy5yKTtcbiAgICAgICAgZHkgPSBNYXRoLnNpbih0aGlzLnIpO1xuXG4gICAgICAgIHN3aXRjaCAod2hpY2gpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB4ID0gLXRoaXMudyAvIDI7XG4gICAgICAgICAgICAgICAgeSA9IC10aGlzLmggLyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHggPSB0aGlzLncgLyAyO1xuICAgICAgICAgICAgICAgIHkgPSAtdGhpcy5oIC8gMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB4ID0gdGhpcy53IC8gMjtcbiAgICAgICAgICAgICAgICB5ID0gdGhpcy5oIC8gMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICB4ID0gLXRoaXMudyAvIDI7XG4gICAgICAgICAgICAgICAgeSA9IHRoaXMuaCAvIDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgeCA9IHRoaXMueDtcbiAgICAgICAgICAgICAgICB5ID0gdGhpcy55O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHh4ICwgeXk7XG4gICAgICAgIHh4ID0geCAqIGR4ICsgeSAqIC1keTtcbiAgICAgICAgeXkgPSB4ICogZHkgKyB5ICogZHg7XG5cbiAgICAgICAgdmFyIGRldGFpbHMgPSB0aGlzLmFzUG9sYXIodGhpcy52ZWN0b3IoeHgsIHl5KSk7XG5cbiAgICAgICAgeHggKz0gdGhpcy54O1xuICAgICAgICB5eSArPSB0aGlzLnk7XG5cbiAgICAgICAgdmVsb2NpdHlBID0gdGhpcy5wb2xhcihkZXRhaWxzLm1hZyAqIHRoaXMuZHIsIGRldGFpbHMuZGlyICsgdGhpcy5QSTkwKTtcbiAgICAgICAgdmVsb2NpdHlUID0gdGhpcy52ZWN0b3JBZGQodmVsb2NpdHkgPSB0aGlzLnZlY3Rvcih0aGlzLmR4LCB0aGlzLmR5KSwgdmVsb2NpdHlBKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmVsb2NpdHk6IHZlbG9jaXR5LFxuICAgICAgICAgICAgdmVsb2NpdHlUOiB2ZWxvY2l0eVQsXG4gICAgICAgICAgICB2ZWxvY2l0eUEgOiB2ZWxvY2l0eUEsXG4gICAgICAgICAgICBwb3M6IHRoaXMudmVjdG9yKHh4LCB5eSksXG4gICAgICAgICAgICByYWRpdXM6IGRldGFpbHMubWFnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwb2xhcihtYWcgPSAxLCBkaXIgPSAwKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlUG9sYXIoe2RpcjogZGlyLCBtYWc6IG1hZ30pXG4gICAgfVxuXG4gICAgdmVjdG9yKHggPSAxLCB5ID0gMCkge1xuICAgICAgICByZXR1cm4geyB4OiB4LCB5OiB5fTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZVBvbGFyKHZlYykge1xuICAgICAgICBpZiAodGhpcy5pc1BvbGFyKHZlYykpIHtcbiAgICAgICAgICAgIGlmKHZlYy5tYWcgPCAwKXtcbiAgICAgICAgICAgICAgICB2ZWMubWFnID0gLXZlYy5tYWc7XG4gICAgICAgICAgICAgICAgdmVjLmRpciArPSB0aGlzLlBJO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2ZWM7XG4gICAgfVxuXG4gICAgcG9sYXJUb0NhcnQocFZlYywgcmV0ViA9IHt4OiAwLCB5OiAwfSl7XG4gICAgICAgIHJldFYueCA9IE1hdGguY29zKHBWZWMuZGlyKSAqIHBWZWMubWFnO1xuICAgICAgICByZXRWLnkgPSBNYXRoLnNpbihwVmVjLmRpcikgKiBwVmVjLm1hZztcbiAgICAgICAgcmV0dXJuIHJldFZcbiAgICB9XG5cbiAgICBhc1BvbGFyKHZlYykge1xuICAgICAgICBpZiAodGhpcy5pc0NhcnQodmVjKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FydFRvUG9sYXIodmVjKVxuICAgICAgICB9XG4gICAgICAgIGlmICh2ZWMubWFnIDwgMCkge1xuICAgICAgICAgICAgdmVjLm1hZyA9IC12ZWMubWFnO1xuICAgICAgICAgICAgdmVjLmRpciArPSB0aGlzLlBJO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGRpcjogdmVjLmRpciwgbWFnOiB2ZWMubWFnfTtcbiAgICB9XG5cbiAgICBpc0NhcnQodmVjKSB7IGlmKHZlYy54ICE9PSB1bmRlZmluZWQgJiYgdmVjLnkgIT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdHJ1ZTsgfSByZXR1cm4gZmFsc2U7IH1cbiAgICBpc1BvbGFyKHZlYykgeyBpZih2ZWMubWFnICE9PSB1bmRlZmluZWQgJiYgdmVjLmRpciAhPT0gdW5kZWZpbmVkKSB7IHJldHVybiB0cnVlOyB9IHJldHVybiBmYWxzZTsgfVxuICAgIGFzQ2FydCh2ZWMpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNQb2xhcih2ZWMpKSB7cmV0dXJuIHRoaXMucG9sYXJUb0NhcnQodmVjKX1cbiAgICAgICAgcmV0dXJuIHt4OiB2ZWMueCwgeTogdmVjLnl9XG4gICAgfVxuICAgIGNhcnRUb1BvbGFyKHZlYywgcmV0ViA9IHtkaXI6IDAsIG1hZzogMH0pIHtcbiAgICAgICAgcmV0Vi5kaXIgPSBNYXRoLmF0YW4yKHZlYy55LCB2ZWMueCk7XG4gICAgICAgIHJldFYubWFnID0gTWF0aC5oeXBvdCh2ZWMueCwgdmVjLnkpO1xuICAgICAgICByZXR1cm4gcmV0VjtcbiAgICB9XG5cbiAgICB2ZWN0b3JBZGQodmVjMSwgdmVjMikge1xuICAgICAgICB2YXIgdjEgPSB0aGlzLmFzQ2FydCh2ZWMxKTtcbiAgICAgICAgdmFyIHYyID0gdGhpcy5hc0NhcnQodmVjMik7XG4gICAgICAgIHJldHVybiB0aGlzLnZlY3Rvcih2MS54ICsgdjIueCwgdjEueSArIHYyLnkpXG4gICAgfVxuXG4gICAgYXBwbHlGb3JjZShmb3JjZSwgbG9jKSB7XG4gICAgICAgIHRoaXMudmFsaWRhdGVQb2xhcihmb3JjZSk7XG4gICAgICAgIHZhciBsID0gdGhpcy5hc0NhcnQobG9jKTtcbiAgICAgICAgdmFyIHRvQ2VudGVyID0gdGhpcy5hc1BvbGFyKHRoaXMudmVjdG9yKHRoaXMueCAtIGwueCwgdGhpcy55IC0gbC55KSk7XG4gICAgICAgIHZhciBwaGV0YSA9IHRvQ2VudGVyLmRpciAtIGZvcmNlLmRpcjtcbiAgICAgICAgdmFyIEZ2ID0gTWF0aC5jb3MocGhldGEpICogZm9yY2UubWFnO1xuICAgICAgICB2YXIgRmEgPSBNYXRoLnNpbihwaGV0YSkgKiBmb3JjZS5tYWc7XG4gICAgICAgIHZhciBhY2NlbCA9IHRoaXMuYXNQb2xhcih0b0NlbnRlcik7XG4gICAgICAgIGFjY2VsLm1hZyA9IEZ2IC8gdGhpcy5tYXNzOyBcbiAgICAgICAgdmFyIGRlbHRhViA9IHRoaXMuYXNDYXJ0KGFjY2VsKTsgXG4gICAgICAgIHRoaXMuZHggKz0gZGVsdGFWLnggXG4gICAgICAgIHRoaXMuZHkgKz0gZGVsdGFWLnlcbiAgICAgICAgdmFyIGFjY2VsQSA9IEZhIC8gKHRvQ2VudGVyLm1hZyAgKiB0aGlzLm1hc3MpOyBcbiAgICAgICAgdGhpcy5kciArPSBhY2NlbEE7XG4gICAgfVxuXG4gICAgdmVjdG9yQ29tcG9uZW50c0ZvckRpcih2ZWMsIGRpcikge1xuICAgICAgICB2YXIgdiA9IHRoaXMuYXNQb2xhcih2ZWMpOyBcbiAgICAgICAgdmFyIHBoZXRhID0gdi5kaXIgLSBkaXI7XG4gICAgICAgIHZhciBGdiA9IE1hdGguY29zKHBoZXRhKSAqIHYubWFnO1xuICAgICAgICB2YXIgRmEgPSBNYXRoLnNpbihwaGV0YSkgKiB2Lm1hZztcblxuICAgICAgICB2YXIgZDEgPSBkaXI7XG4gICAgICAgIHZhciBkMiA9IGRpciArIHRoaXMuUEk5MDsgICAgXG4gICAgICAgIGlmKEZ2IDwgMCl7XG4gICAgICAgICAgICBkMSArPSB0aGlzLlBJO1xuICAgICAgICAgICAgRnYgPSAtRnY7XG4gICAgICAgIH1cblxuICAgICAgICBpZihGYSA8IDApe1xuICAgICAgICAgICAgZDIgKz0gdGhpcy5QSTtcbiAgICAgICAgICAgIEZhID0gLUZhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbG9uZyA6IHRoaXMucG9sYXIoRnYsZDEpLFxuICAgICAgICAgICAgdGFuZ2VudCA6IHRoaXMucG9sYXIoRmEsZDIpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZG9Db2xsaXNpb24ocG9pbnREZXRhaWxzLCB3YWxsSW5kZXgpIHtcbiAgICAgICAgdmFyIHZ2ID0gdGhpcy5hc1BvbGFyKHBvaW50RGV0YWlscy52ZWxvY2l0eSk7IFxuICAgICAgICB2YXIgdmEgPSB0aGlzLmFzUG9sYXIocG9pbnREZXRhaWxzLnZlbG9jaXR5QSk7IFxuICAgICAgICB2YXIgdnZjID0gdGhpcy52ZWN0b3JDb21wb25lbnRzRm9yRGlyKHZ2LCB0aGlzLldBTExfTk9STVNbd2FsbEluZGV4XSk7XG4gICAgICAgIHZhciB2YWMgPSB0aGlzLnZlY3RvckNvbXBvbmVudHNGb3JEaXIodmEsIHRoaXMuV0FMTF9OT1JNU1t3YWxsSW5kZXhdKTtcblxuICAgICAgICB2dmMuYWxvbmcubWFnICo9IDEuMTg7IFxuICAgICAgICB2YWMuYWxvbmcubWFnICo9IDEuMTg7IFxuXG4gICAgICAgIHZ2Yy5hbG9uZy5tYWcgKj0gdGhpcy5tYXNzO1xuICAgICAgICB2YWMuYWxvbmcubWFnICo9IHRoaXMubWFzcztcblxuICAgICAgICB2dmMuYWxvbmcuZGlyICs9IHRoaXMuUEk7XG4gICAgICAgIHZhYy5hbG9uZy5kaXIgKz0gdGhpcy5QSTtcblxuICAgICAgICB2dmMudGFuZ2VudC5tYWcgKj0gMC4xODsgIFxuICAgICAgICB2YWMudGFuZ2VudC5tYWcgKj0gMC4xODtcbiAgICAgICAgdnZjLnRhbmdlbnQubWFnICo9IHRoaXMubWFzcyAgXG4gICAgICAgIHZhYy50YW5nZW50Lm1hZyAqPSB0aGlzLm1hc3NcbiAgICAgICAgdnZjLnRhbmdlbnQuZGlyICs9IHRoaXMuUEk7IFxuICAgICAgICB2YWMudGFuZ2VudC5kaXIgKz0gdGhpcy5QSTtcblxuICAgICAgICB0aGlzLmFwcGx5Rm9yY2UodnZjLmFsb25nLCBwb2ludERldGFpbHMucG9zKSAgICBcbiAgICAgICAgdGhpcy5hcHBseUZvcmNlKHZ2Yy50YW5nZW50LCBwb2ludERldGFpbHMucG9zKSAgICBcbiAgICAgICAgdGhpcy5hcHBseUZvcmNlKHZhYy5hbG9uZywgcG9pbnREZXRhaWxzLnBvcykgICAgXG4gICAgICAgIHRoaXMuYXBwbHlGb3JjZSh2YWMudGFuZ2VudCwgcG9pbnREZXRhaWxzLnBvcykgICAgXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCbG9jayIsImNsYXNzIENhbnZhcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSAxNDAwO1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSA3NTA7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICB0aGlzLmJpbmRDYW52YXNUb0RPTSgpXG4gICAgfVxuXG4gICAgYmluZENhbnZhc1RvRE9NKCkge1xuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLWNhbnZhc1wiKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhckNhbnZhcygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKHRoaXMuY2FudmFzKTtcbiAgICAgICAgdGhpcy5jYW52YXMuY2xhc3NMaXN0LmFkZChcIm1haW4tY2FudmFzXCIpXG4gICAgfVxuXG4gICAgY2xlYXJDYW52YXMoKSB7XG4gICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICByZW1vdmVDYW52YXNGcm9tRE9NKCkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW4tYm9keVwiKS5yZW1vdmVDaGlsZCh0aGlzLmNhbnZhcyk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYW52YXM7XG4iLCIvLyBpbXBvcnQgXCIuL3N0eWxlcy9pbmRleC5zY3NzXCI7XG5pbXBvcnQgQ2FudmFzIGZyb20gXCIuL2NhbnZhc1wiO1xuaW1wb3J0IFN0YWdlTG9hZGVyIGZyb20gXCIuL3N0YWdlTG9hZGVyXCI7XG5cbmNsYXNzIEFuZ2VyZWRCaXJkcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc3RhcnQgPSB0aGlzLnN0YXJ0LmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgICAgICB0aGlzLmFuaW1hdGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuY2FudmFzID0gbmV3IENhbnZhcygpO1xuICAgICAgICB0aGlzLmNhbnZhcy5iaW5kQ2FudmFzVG9ET00oKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplRW50aXRpZXMoKTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5jbGVhckNhbnZhcygpO1xuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFnZUxvYWRlci51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmludGVydmFsID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGlvbik7XG4gICAgICAgICAgICAgICAgaWYgKHRoYXQuc3RhZ2VMb2FkZXIuY2hlY2tTdGFnZVdvbigpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQud2luTGV2ZWwoKVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKHRoYXQuc3RhZ2VMb2FkZXIuY2hlY2tTdGFnZUxvc3QoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGF0LmdhbWVPdmVyKClcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRpb24pO1xuICAgIH1cblxuICAgIGluaXRpYWxpemVFbnRpdGllcygpIHtcbiAgICAgICAgdGhpcy5zdGFnZUxvYWRlciA9IG5ldyBTdGFnZUxvYWRlcih0aGlzLmNhbnZhcy5jdHgpO1xuICAgICAgICB0aGlzLnN0YWdlTG9hZGVyLmluaXRpYWxpemVFbnRpdGllcygpO1xuICAgICAgICB0aGlzLnN0YWdlTG9hZGVyLmluaXRpYWxpemVFdmVudExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIHdpbkxldmVsKCkge1xuICAgICAgICB0aGlzLnN0YWdlTG9hZGVyLnN0YWdlTnVtYmVyICs9IDE7XG4gICAgICAgIHRoaXMuc3RhZ2VMb2FkZXIucmVzdGFydEVudGl0aWVzKCk7XG4gICAgICAgIHRoaXMuc3RhZ2VMb2FkZXIuaW5pdGlhbGl6ZUVudGl0aWVzKCk7XG4gICAgfVxuXG4gICAgZ2FtZU92ZXIoKSB7XG4gICAgICAgIHRoaXMuc3RhZ2VMb2FkZXIucmVzdGFydEVudGl0aWVzKCk7XG4gICAgICAgIHRoaXMuc3RhZ2VMb2FkZXIuaW5pdGlhbGl6ZUVudGl0aWVzKCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBbmdlcmVkQmlyZHM7IiwiY2xhc3MgUGlnIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgsIHgsIHksIHJhZGl1cywgdmVsWCA9IDAsIHZlbFkgPSAwKSB7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLnggPSB4OyBcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy52ZWxYID0gdmVsWDtcbiAgICAgICAgdGhpcy52ZWxZID0gdmVsWTtcbiAgICAgICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XG4gICAgICAgIHRoaXMubWFzcyA9IDI7XG5cbiAgICAgICAgdGhpcy5ncmF2aXR5ID0geyB4OiAwLCB5OiAwLjEgfTtcbiAgICAgICAgdGhpcy5ncm91bmQgPSB0aGlzLmN0eC5jYW52YXMuaGVpZ2h0IC0gMzA7XG4gICAgICAgIHRoaXMuYm91bmNlID0gMC40O1xuICAgICAgICB0aGlzLmZyaWN0aW9uWCA9IDAuOTtcbiAgICAgICAgdGhpcy5tYXNzID0gMjtcbiAgICAgICAgdGhpcy5waWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5waWcuc3JjID0gXCJzcmMvaW1hZ2VzL3BpZ2d5LnBuZ1wiO1xuICAgICAgICB0aGlzLnN0YXRlID0gXCJhbGl2ZVwiO1xuXG4gICAgICAgIHRoaXMucG9vZiA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB0aGlzLnBvb2Yuc3JjID0gXCJzcmMvaW1hZ2VzL3Bvb2YucG5nXCI7XG4gICAgICAgIHRoaXMuc3RhcnRUaW1lcjtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5yYWRpdXMsIDAsIChNYXRoLlBJICogMiksIGZhbHNlKTtcbiAgICAgICAgdGhpcy5jdHguY2xpcCgpO1xuICAgICAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMucGlnLCB0aGlzLnggLSB0aGlzLnJhZGl1cywgdGhpcy55IC0gdGhpcy5yYWRpdXMsIHRoaXMucmFkaXVzICogMiwgdGhpcy5yYWRpdXMgKiAyKTtcbiAgICAgICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy52ZWxYICs9IHRoaXMuZ3Jhdml0eS54O1xuICAgICAgICB0aGlzLnZlbFkgKz0gdGhpcy5ncmF2aXR5Lnk7XG4gICAgICAgIHRoaXMueCArPSB0aGlzLnZlbFg7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLnZlbFk7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy55ID49IHRoaXMuZ3JvdW5kKSB7XG4gICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmdyb3VuZCAtICh0aGlzLnkgLSB0aGlzLmdyb3VuZCk7XG4gICAgICAgICAgICB0aGlzLnZlbFkgPSAtTWF0aC5hYnModGhpcy52ZWxZKSAqIHRoaXMuYm91bmNlO1xuICAgICAgICAgICAgaWYgKHRoaXMudmVsWSA+PSB0aGlzLmdyYXZpdHkueSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVsWSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5ncm91bmQgLSB0aGlzLmdyYXZpdHkueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnZlbFggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWxYIC09IHRoaXMuZnJpY3Rpb25YO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudmVsWCA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlbFggKz0gdGhpcy5mcmljdGlvblg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3RvcHMgYmFsbCBmcm9tIGJvdW5jaW5nIGluIFkgYXhpc1xuICAgICAgICBpZiAodGhpcy52ZWxZPDAgJiYgdGhpcy52ZWxZPi0yLjEpIHtcbiAgICAgICAgICAgIHRoaXMudmVsWSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3RvcHMgYmFsbCBmcm9tIG1vdmluZyBvbiBYIGF4aXMgaWYgeC12ZWxvY2l0eSA8IDEuMVxuICAgICAgICBpZiAoTWF0aC5hYnModGhpcy52ZWxYKSA8IDEuMSkge1xuICAgICAgICAgICAgdGhpcy52ZWxYID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBvb2ZBbmltYXRpb25UaW1lckJvb2xlYW4oKSB7XG4gICAgICAgIHRoaXMucGlnLnNyYyA9IFwic3JjL2ltYWdlcy9wb29mLnBuZ1wiO1xuICAgICAgICB0aGlzLnJhZGl1cyA9IDM1O1xuXG4gICAgICAgIHZhciB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRUaW1lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0VGltZXIgPSB0aW1lc3RhbXA7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZWxhcHNlZCA9IHRpbWVzdGFtcCAtIHRoaXMuc3RhcnRUaW1lcjtcbiAgICAgICAgaWYgKGVsYXBzZWQgPiAzMDAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQaWc7IiwiaW1wb3J0IEJpcmQgZnJvbSBcIi4vYmlyZFwiO1xuY2xhc3MgUHJvamVjdGlsZSB7XG4gICAgY29uc3RydWN0b3IoY3R4LCBiaXJkUHJvcGVydGllcykge1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5sYXVuY2hlZE9iamVjdHMgPSBbXTtcbiAgICAgICAgdGhpcy5tYXggPSAxO1xuICAgICAgICB0aGlzLmJpcmRQcm9wZXJ0aWVzID0gYmlyZFByb3BlcnRpZXM7XG4gICAgICAgIHRoaXMucHJvamVjdGlsZUltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMucHJvamVjdGlsZUltYWdlLnNyYyA9IFwic3JjL2ltYWdlcy9zbGluZ1MucG5nXCI7XG4gICAgICAgIHRoaXMubGl2ZXMgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5saXZlcy5zcmMgPSBcInNyYy9pbWFnZXMvYW5nZXJlZC1iaXJkeS5wbmdcIjtcbiAgICAgICAgdGhpcy5sYXN0TGl2ZVRpbWVyO1xuICAgICAgICB0aGlzLmluZGljYXRvckltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMuaW5kaWNhdG9ySW1hZ2Uuc3JjID0gXCJzcmMvaW1hZ2VzL2luZGljdG9yLnBuZ1wiO1xuICAgIH1cblxuICAgIGtpY2tPZmZMYXVuY2hEaXJlY3Rpb24oYW5nbGVWYWwsIG1hZ25pdHVkZVZhbCkge1xuICAgICAgICBsZXQgYW5nbGUgPSBNYXRoLlBJICogYW5nbGVWYWwgLyAxODA7XG4gICAgICAgIHRoaXMuY3VycmVudFByb2plY3RpbGVPYmplY3QgPSBuZXcgQmlyZCh0aGlzLmN0eCwgdGhpcy5iaXJkUHJvcGVydGllcyk7XG4gICAgICAgIHRoaXMub2JqZWN0TGF1bmNoZWQgPSBuZXcgT2JqZWN0TGF1bmNoKHRoaXMuY3R4LCB0aGlzLmN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0KTtcbiAgICAgICAgdGhpcy5vYmplY3RMYXVuY2hlZC5vYmplY3RUeXBlLnZlbFkgPS0gbWFnbml0dWRlVmFsICogTWF0aC5zaW4oYW5nbGUpO1xuICAgICAgICB0aGlzLm9iamVjdExhdW5jaGVkLm9iamVjdFR5cGUudmVsWCA9IG1hZ25pdHVkZVZhbCAqIE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgdGhpcy5vYmplY3RMYXVuY2hlZC5vYmplY3RUeXBlLnRyYW5zZmVyID0gMC44O1xuICAgICAgICB0aGlzLmxhdW5jaGVkT2JqZWN0cy5wdXNoKHRoaXMub2JqZWN0TGF1bmNoZWQpO1xuICAgICAgICB0aGlzLnVwZGF0ZUxpdmVzKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy5sYXVuY2hlZE9iamVjdHMubGVuZ3RoID4gdGhpcy5tYXgpIHtcbiAgICAgICAgICAgIHRoaXMubGF1bmNoZWRPYmplY3RzID0gdGhpcy5sYXVuY2hlZE9iamVjdHMuc3BsaWNlKDEpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sYXVuY2hlZE9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50T2JqZWN0ID0gdGhpcy5sYXVuY2hlZE9iamVjdHNbaV0ub2JqZWN0VHlwZTtcbiAgICAgICAgICAgIGN1cnJlbnRPYmplY3QudmVsWSArPSAxLjUzO1xuICAgICAgICAgICAgY3VycmVudE9iamVjdC54ICs9IGN1cnJlbnRPYmplY3QudmVsWCAvIDM7XG4gICAgICAgICAgICBjdXJyZW50T2JqZWN0LnkgKz0gY3VycmVudE9iamVjdC52ZWxZIC8gMztcbiAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmxhdW5jaGVkT2JqZWN0c1tpXS51cGRhdGVDdXJyZW50TGF1bmNoZWRPYmplY3QoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UodGhpcy5wcm9qZWN0aWxlSW1hZ2UsIHRoaXMuYmlyZFByb3BlcnRpZXMueCAtIDMzLCB0aGlzLmJpcmRQcm9wZXJ0aWVzLnkgLSAyMCwgNzUsIDE0MCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sYXVuY2hlZE9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50QmlyZCA9IHRoaXMubGF1bmNoZWRPYmplY3RzW2ldLm9iamVjdFR5cGU7XG4gICAgICAgICAgICBjdXJyZW50QmlyZC5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUxpdmVzKCkge1xuICAgICAgICB0aGlzLmJpcmRQcm9wZXJ0aWVzLnBsYXllckxpdmVzIC09IDFcbiAgICB9XG5cbiAgICByZW5kZXJMaXZlcygpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDEwOyBpIDwgdGhpcy5iaXJkUHJvcGVydGllcy5wbGF5ZXJMaXZlcyAqIDUwOyBpKz01MCkge1xuICAgICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UodGhpcy5saXZlcywgaSAsIDUwLCAzMCwgMzApXG4gICAgICAgICAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckluZGljdG9yKCkge1xuICAgICAgICBpZiAoIXRoaXMuY3VycmVudFByb2plY3RpbGVPYmplY3QpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLmluZGljYXRvckltYWdlLCB0aGlzLmJpcmRQcm9wZXJ0aWVzLnggLSA4NSAsIHRoaXMuYmlyZFByb3BlcnRpZXMueSAgLSAzNSwgMTQwLCAxNDAgKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9zdEFsbFByb2plY3RpbGVPYmplY3RzKCkge1xuICAgICAgICBpZiAodGhpcy5iaXJkUHJvcGVydGllcy5wbGF5ZXJMaXZlcyA9PT0gMCAmJiB0aGlzLmN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnN0YXRlID09PSBcImVuZFN0YXRlXCIpIHtcbiAgICAgICAgICAgIHZhciB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmxhc3RMaXZlVGltZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdExpdmVUaW1lciA9IHRpbWVzdGFtcDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZWxhcHNlZCA9IHRpbWVzdGFtcCAtIHRoaXMubGFzdExpdmVUaW1lcjtcbiAgICAgICAgICAgIGlmIChlbGFwc2VkID4gNDAwMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5jbGFzcyBPYmplY3RMYXVuY2gge1xuICAgIGNvbnN0cnVjdG9yKGN0eCwgb2JqZWN0VHlwZSkge1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5vYmplY3RUeXBlID0gb2JqZWN0VHlwZTtcbiAgICB9XG5cbiAgICByZW5kZXJPYmplY3RMYXVuY2goKSB7XG4gICAgICAgIHRoaXMub2JqZWN0VHlwZS5yZW5kZXIoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVDdXJyZW50TGF1bmNoZWRPYmplY3QoKSB7XG4gICAgICAgIGxldCBjdXJyZW50T2JqZWN0ID0gdGhpcy5vYmplY3RUeXBlO1xuICAgICAgICBjdXJyZW50T2JqZWN0LnZlbFggKz0gY3VycmVudE9iamVjdC5ncmF2aXR5Lng7XG4gICAgICAgIGN1cnJlbnRPYmplY3QudmVsWSArPSBjdXJyZW50T2JqZWN0LmdyYXZpdHkueTtcbiAgICAgICAgY3VycmVudE9iamVjdC54ICs9IGN1cnJlbnRPYmplY3QudmVsWDtcbiAgICAgICAgY3VycmVudE9iamVjdC55ICs9IGN1cnJlbnRPYmplY3QudmVsWTtcblxuICAgICAgICBpZiAoY3VycmVudE9iamVjdC55ID49IGN1cnJlbnRPYmplY3QuZ3JvdW5kKSB7XG4gICAgICAgICAgICBjdXJyZW50T2JqZWN0LnkgPSBjdXJyZW50T2JqZWN0Lmdyb3VuZCAtIChjdXJyZW50T2JqZWN0LnkgLSBjdXJyZW50T2JqZWN0Lmdyb3VuZCk7XG4gICAgICAgICAgICBjdXJyZW50T2JqZWN0LnZlbFkgPSAtTWF0aC5hYnMoY3VycmVudE9iamVjdC52ZWxZKSAqIGN1cnJlbnRPYmplY3QuYm91bmNlO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRPYmplY3QudmVsWSA+PSBjdXJyZW50T2JqZWN0LmdyYXZpdHkueSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRPYmplY3QudmVsWSA9IDA7XG4gICAgICAgICAgICAgICAgY3VycmVudE9iamVjdC55ID0gY3VycmVudE9iamVjdC5ncm91bmQgLSBjdXJyZW50T2JqZWN0LmdyYXZpdHkueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjdXJyZW50T2JqZWN0LnZlbFggPiAwKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudE9iamVjdC52ZWxYIC09IGN1cnJlbnRPYmplY3QuZnJpY3Rpb25YO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGN1cnJlbnRPYmplY3QudmVsWCA8IDApIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50T2JqZWN0LnZlbFggKz0gY3VycmVudE9iamVjdC5mcmljdGlvblg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3RvcHMgYmFsbCBmcm9tIGJvdW5jaW5nIGluIFkgYXhpc1xuICAgICAgICBpZiAoIGN1cnJlbnRPYmplY3QueSA+PSBjdXJyZW50T2JqZWN0Lmdyb3VuZCAtIDEwKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudE9iamVjdC52ZWxZIDw9IDAgJiYgY3VycmVudE9iamVjdC52ZWxZID4gLTIuNSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRPYmplY3QudmVsWSA9IDA7XG4gICAgICAgICAgICAgICAgY3VycmVudE9iamVjdC5zdGF0ZSA9IFwiZW5kU3RhdGVcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBzdG9wcyBiYWxsIGZyb20gbW92aW5nIG9uIFggYXhpcyBcbiAgICAgICAgaWYgKE1hdGguYWJzKGN1cnJlbnRPYmplY3QudmVsWCkgPCAxLjEpIHtcbiAgICAgICAgICAgIGN1cnJlbnRPYmplY3QudmVsWCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdGlsZTsiLCJpbXBvcnQgUGlnIGZyb20gXCIuL3BpZ1wiO1xuaW1wb3J0IEJsb2NrIGZyb20gXCIuL2Jsb2NrXCI7XG5pbXBvcnQgUHJvamVjdGlsZSBmcm9tIFwiLi9wcm9qZWN0aWxlXCI7XG5pbXBvcnQge3N0YWdlS2V5c30gZnJvbSBcIi4vc3RhZ2VzL3N0YWdlS2V5c1wiO1xuaW1wb3J0IHtjaGVja0JpcmRPblBpZ0NvbGxpc2lvbiwgY2hlY2tCaXJkT25CbG9ja0NvbGxpc2lvbn0gZnJvbSBcIi4vdXRpbC9jb2xsaXNpb25EZXRlY3Rpb25VdGlsXCI7XG5pbXBvcnQge2JpcmRPblBpZ0NvbGxpc2lvbkxvZ2ljLCBiaXJkT25CbG9ja0NvbGxpc2lvbkxvZ2ljfSBmcm9tIFwiLi91dGlsL2NvbGxpc2lvbkxvZ2ljVXRpbFwiO1xuaW1wb3J0IHtjaGVja0JpcmRBbmRQaWdTdGF0ZX0gZnJvbSBcIi4vdXRpbC9zdGF0ZUxvZ2ljXCI7XG5cbmNsYXNzIFN0YWdlTG9hZGVyIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgpIHtcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMuY2FudmFzID0gY3R4LmNhbnZhcztcbiAgICAgICAgdGhpcy5zY29yZSA9IDA7XG4gICAgICAgIHRoaXMuc3RhZ2VOdW1iZXIgPSAxO1xuICAgICAgICB0aGlzLnN0YXJ0UG9zQmlyZCA9IFtdO1xuICAgICAgICB0aGlzLnByb2plY3RpbGVPYmplY3QgPSB7fTtcbiAgICAgICAgdGhpcy5waWdzID0gW107XG4gICAgICAgIHRoaXMuYmxvY2tzID0gW107XG4gICAgICAgIHRoaXMuY2xpY2tlZEltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMuY2xpY2tlZEltYWdlLnNyYyA9IFwic3JjL2ltYWdlcy9wb29mLnBuZ1wiXG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVFbnRpdGllcygpO1xuICAgICAgICBpZiAodGhpcy5wcm9qZWN0aWxlT2JqZWN0Lm9iamVjdExhdW5jaGVkKSB0aGlzLmNoZWNrQW5kVXBkYXRlRW50aXRpZXNDb2xsaXNpb24oKTtcbiAgICAgICAgdGhpcy5yZW5kZXJFbnRpdGllcygpO1xuICAgIH1cblxuICAgIGluaXRpYWxpemVFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgY29uc3QgbW91c2UgPSB7XG4gICAgICAgICAgICB4OiB0aGlzLmNhbnZhcy53aWR0aC8yLFxuICAgICAgICAgICAgeTogdGhpcy5jYW52YXMuaGVpZ2h0LzIsXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpZiAoKHRoaXMucHJvamVjdGlsZU9iamVjdC5sYXVuY2hlZE9iamVjdHMubGVuZ3RoID09PSAwKSB8fCB0aGlzLnByb2plY3RpbGVPYmplY3QuY3VycmVudFByb2plY3RpbGVPYmplY3Quc3RhdGUgPT09IFwiZW5kU3RhdGVcIil7XG4gICAgICAgICAgICAgICAgbGV0IGNhbnZhc1Byb3BlcnRpZXMgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICBtb3VzZS54ID0gZS54IC0gY2FudmFzUHJvcGVydGllcy5sZWZ0O1xuICAgICAgICAgICAgICAgIG1vdXNlLnkgPSBlLnkgLSBjYW52YXNQcm9wZXJ0aWVzLnRvcDtcbiAgICAgICAgICAgICAgICBsZXQgZGVsdGFYID0gbW91c2UueCAtIHRoaXMuc3RhcnRQb3NCaXJkWzBdO1xuICAgICAgICAgICAgICAgIGxldCBkZWx0YVkgPSBtb3VzZS55IC0gdGhpcy5zdGFydFBvc0JpcmRbMV07XG4gICAgICAgICAgICAgICAgbGV0IHRoZXRhUmFkaWFuID0gTWF0aC5hdGFuMihkZWx0YVksIGRlbHRhWCk7XG4gICAgICAgICAgICAgICAgbGV0IGFuZ2xlVmFsID0gLSgoTWF0aC5hYnModGhldGFSYWRpYW4gKiAxODAgLyBNYXRoLlBJKSAtIDI3MCkgJSA5MCk7XG4gICAgICAgICAgICAgICAgbGV0IG1hZ25pdHVkZVZhbCA9IChNYXRoLmFicyhtb3VzZS54IC0gMTMwKSAvIDIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1vdXNlLngsIG1vdXNlLnkpO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdGlsZU9iamVjdC5raWNrT2ZmTGF1bmNoRGlyZWN0aW9uKGFuZ2xlVmFsICwgbWFnbml0dWRlVmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgIH1cblxuICAgIGluaXRpYWxpemVFbnRpdGllcygpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFN0YWdlVmFsdWVzID0gc3RhZ2VLZXlzW3RoaXMuc3RhZ2VOdW1iZXJdO1xuICAgICAgICB0aGlzLmxvYWRTdGFnZShjdXJyZW50U3RhZ2VWYWx1ZXMpO1xuICAgIH1cblxuICAgIHJlc3RhcnRFbnRpdGllcygpIHtcbiAgICAgICAgdGhpcy5zY29yZSA9IDA7XG4gICAgICAgIHRoaXMuc3RhcnRQb3NCaXJkID0gW107XG4gICAgICAgIHRoaXMucHJvamVjdGlsZU9iamVjdC5iaXJkUHJvcGVydGllcy5wbGF5ZXJMaXZlcyA9IHRoaXMuc3RhcnRpbmdMaXZlcztcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlT2JqZWN0ID0ge307XG4gICAgICAgIHRoaXMucGlncyA9IFtdO1xuICAgICAgICB0aGlzLmJsb2NrcyA9IFtdO1xuICAgIH1cblxuICAgIGxvYWRTdGFnZShjdXJyZW50U3RhZ2VWYWx1ZXMpIHtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZC5zcmMgPSBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJiYWNrR3JvdW5kSW1hZ2VLZXlcIl07XG4gICAgICAgIHRoaXMucHJvamVjdGlsZU9iamVjdCA9IG5ldyBQcm9qZWN0aWxlKHRoaXMuY3R4LCBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJiaXJkUHJvcGVydGllc1wiXSk7XG4gICAgICAgIHRoaXMuc3RhcnRpbmdMaXZlcyA9IGN1cnJlbnRTdGFnZVZhbHVlc1tcImJpcmRQcm9wZXJ0aWVzXCJdLnBsYXllckxpdmVzO1xuICAgICAgICB0aGlzLnN0YXJ0UG9zQmlyZCA9IFtjdXJyZW50U3RhZ2VWYWx1ZXNbXCJiaXJkUHJvcGVydGllc1wiXS54LCBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJiaXJkUHJvcGVydGllc1wiXS55XVxuICAgICAgICB0aGlzLmN1cnJlbnRMZXZlbEhpZ2hTY29yZUtleSA9IGN1cnJlbnRTdGFnZVZhbHVlc1tcImN1cnJlbnRMZXZlbEhpZ2hTY29yZUtleVwiXTtcblxuICAgICAgICBsZXQgaGlnaFNjb3JlU2F2ZUtleVN0cmluZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuY3VycmVudExldmVsSGlnaFNjb3JlS2V5KTtcbiAgICAgICAgaWYgKGhpZ2hTY29yZVNhdmVLZXlTdHJpbmcgPT09IG51bGwpe1xuICAgICAgICAgICAgdGhpcy5oaWdoU2NvcmUgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oaWdoU2NvcmUgPSBwYXJzZUludChoaWdoU2NvcmVTYXZlS2V5U3RyaW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3VycmVudFN0YWdlVmFsdWVzW1wibnVtYmVyT2ZQaWdzXCJdOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucGlncy5wdXNoKG5ldyBQaWcoXG4gICAgICAgICAgICAgICAgdGhpcy5jdHgsIFxuICAgICAgICAgICAgICAgIGN1cnJlbnRTdGFnZVZhbHVlc1tcInBpZ1Byb3BlcnRpZXNcIl1baV0ueCwgXG4gICAgICAgICAgICAgICAgY3VycmVudFN0YWdlVmFsdWVzW1wicGlnUHJvcGVydGllc1wiXVtpXS55LCBcbiAgICAgICAgICAgICAgICBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJwaWdQcm9wZXJ0aWVzXCJdW2ldLnJhZCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJudW1iZXJPZkJsb2Nrc1wiXTsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmJsb2Nrcy5wdXNoKG5ldyBCbG9jayhcbiAgICAgICAgICAgICAgICB0aGlzLmN0eCwgXG4gICAgICAgICAgICAgICAgY3VycmVudFN0YWdlVmFsdWVzW1wiYmxvY2tQcm9wZXJpdGVzXCJdW2ldLngsIFxuICAgICAgICAgICAgICAgIGN1cnJlbnRTdGFnZVZhbHVlc1tcImJsb2NrUHJvcGVyaXRlc1wiXVtpXS55LFxuICAgICAgICAgICAgICAgIGN1cnJlbnRTdGFnZVZhbHVlc1tcImJsb2NrUHJvcGVyaXRlc1wiXVtpXS53LFxuICAgICAgICAgICAgICAgIGN1cnJlbnRTdGFnZVZhbHVlc1tcImJsb2NrUHJvcGVyaXRlc1wiXVtpXS5oKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVFbnRpdGllcygpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlT2JqZWN0LnVwZGF0ZSgpXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5waWdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnBpZ3NbaV0udXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJsb2Nrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5ibG9ja3NbaV0udXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJvamVjdGlsZU9iamVjdC5jdXJyZW50UHJvamVjdGlsZU9iamVjdCkgdGhpcy51cGRhdGVQaWdzTGVmdCgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUhpZ2hTY29yZSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZUhpZ2hTY29yZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2NvcmUgPiB0aGlzLmhpZ2hTY29yZSkge1xuICAgICAgICAgICAgdGhpcy5oaWdoU2NvcmUgPSB0aGlzLnNjb3JlO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5jdXJyZW50TGV2ZWxIaWdoU2NvcmVLZXksIHRoaXMuaGlnaFNjb3JlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVBpZ3NMZWZ0KCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGlncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGNoZWNrQmlyZEFuZFBpZ1N0YXRlKHRoaXMucHJvamVjdGlsZU9iamVjdC5jdXJyZW50UHJvamVjdGlsZU9iamVjdC5zdGF0ZSwgdGhpcy5waWdzW2ldLnN0YXRlKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBpZ3NbaV0ucG9vZkFuaW1hdGlvblRpbWVyQm9vbGVhbigpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGlncy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tBbmRVcGRhdGVFbnRpdGllc0NvbGxpc2lvbigpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBpZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjaGVja0JpcmRPblBpZ0NvbGxpc2lvbih0aGlzLnByb2plY3RpbGVPYmplY3QuY3VycmVudFByb2plY3RpbGVPYmplY3QsIHRoaXMucGlnc1tpXSkpIHtcbiAgICAgICAgICAgICAgICBiaXJkT25QaWdDb2xsaXNpb25Mb2dpYyh0aGlzLnByb2plY3RpbGVPYmplY3QuY3VycmVudFByb2plY3RpbGVPYmplY3QsIHRoaXMucGlnc1tpXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zY29yZSArPSAzMDAwO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYmxvY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoY2hlY2tCaXJkT25CbG9ja0NvbGxpc2lvbih0aGlzLnByb2plY3RpbGVPYmplY3QuY3VycmVudFByb2plY3RpbGVPYmplY3QsIHRoaXMuYmxvY2tzW2ldKSkge1xuICAgICAgICAgICAgICAgIGJpcmRPbkJsb2NrQ29sbGlzaW9uTG9naWModGhpcy5wcm9qZWN0aWxlT2JqZWN0LmN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LCB0aGlzLmJsb2Nrc1tpXSlcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3JlICs9IDMyNTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckVudGl0aWVzKCkge1xuICAgICAgICB0aGlzLnJlbmRlckJhY2tncm91bmQoKTtcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlT2JqZWN0LnJlbmRlcigpO1xuICAgICAgICB0aGlzLnByb2plY3RpbGVPYmplY3QucmVuZGVySW5kaWN0b3IoKTtcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlT2JqZWN0LnJlbmRlckxpdmVzKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5waWdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnBpZ3NbaV0ucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJsb2Nrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5ibG9ja3NbaV0ucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW5kZXJTY29yZSgpO1xuICAgICAgICB0aGlzLnJlbmRlckhpZ2hTY29yZSgpO1xuICAgICAgICB0aGlzLnJlbmRlclN0YWdlTnVtYmVyKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyU2NvcmUoKSB7IFxuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcInJpZ2h0XCI7XG4gICAgICAgIHRoaXMuY3R4LnRleHRCYXNlbGluZSA9IFwidG9wXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiV0hJVEVcIjtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIkJMQUNLXCI7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSA1MCArIFwicHggQmFuZ2Vyc1wiO1xuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCh0aGlzLnNjb3JlLCB0aGlzLmNhbnZhcy53aWR0aCAtIDMwIC8gMiwgMClcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dCh0aGlzLnNjb3JlLCB0aGlzLmNhbnZhcy53aWR0aCAtIDMwIC8gMiwgMCk7XG5cbiAgICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gXCJyaWdodFwiO1xuICAgICAgICB0aGlzLmN0eC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIldISVRFXCI7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCJCTEFDS1wiO1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gNTAgKyBcInB4IEJhbmdlcnNcIjtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dChcIlNjb3JlOiAgICAgICAgICAgICAgICAgICAgICBcIiwgdGhpcy5jYW52YXMud2lkdGggLSAzMCAvIDIsIDApO1xuICAgIH1cblxuICAgIHJlbmRlckhpZ2hTY29yZSgpIHtcbiAgICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gXCJyaWdodFwiO1xuICAgICAgICB0aGlzLmN0eC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIldISVRFXCI7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCJCTEFDS1wiO1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gNTAgKyBcInB4IEJhbmdlcnNcIjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQodGhpcy5oaWdoU2NvcmUsIHRoaXMuY2FudmFzLndpZHRoIC0gMzAgLyAyLCA2MCk7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVRleHQodGhpcy5oaWdoU2NvcmUsIHRoaXMuY2FudmFzLndpZHRoIC0gMzAgLyAyLCA2MCk7XG5cbiAgICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gXCJyaWdodFwiO1xuICAgICAgICB0aGlzLmN0eC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIldISVRFXCI7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCJCTEFDS1wiO1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gNTAgKyBcInB4IEJhbmdlcnNcIjtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dChcIkhpZ2hzY29yZTogICAgICAgICAgICAgICAgICAgICAgXCIsIHRoaXMuY2FudmFzLndpZHRoIC0gMzAgLyAyLCA2MCk7XG4gICAgfVxuXG4gICAgcmVuZGVyU3RhZ2VOdW1iZXIoKSB7XG4gICAgICAgIHRoaXMuY3R4LnRleHRBbGlnbiA9IFwibGVmdFwiO1xuICAgICAgICB0aGlzLmN0eC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIldISVRFXCI7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCJCTEFDS1wiO1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gMzAgKyBcInB4IEJhbmdlcnNcIjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJMZXZlbCBcIiArIHRoaXMuc3RhZ2VOdW1iZXIsIDEwLCAxMClcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dChcIkxldmVsIFwiICsgdGhpcy5zdGFnZU51bWJlciwgIDEwLCAxMCk7XG4gICAgfVxuXG4gICAgcmVuZGVyQmFja2dyb3VuZCgpIHtcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMuYmFja2dyb3VuZCwgMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgfVxuXG4gICAgY2hlY2tTdGFnZVdvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGlncy5sZW5ndGggPT09IDA7IFxuICAgIH1cblxuICAgIGNoZWNrU3RhZ2VMb3N0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0aWxlT2JqZWN0Lmxvc3RBbGxQcm9qZWN0aWxlT2JqZWN0cygpXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0YWdlTG9hZGVyOyIsImV4cG9ydCBjb25zdCBzdGFnZUtleXMgPSB7XG4gICAgMSA6IHtcbiAgICAgICAgXCJiYWNrR3JvdW5kSW1hZ2VLZXlcIiA6IFwic3JjL2ltYWdlcy90ZW1wLmpwZ1wiLFxuICAgICAgICBcImN1cnJlbnRMZXZlbEhpZ2hTY29yZUtleVwiOiBcImhpZ2hTY29yZUtleUxldmVsMVwiLFxuICAgICAgICBcIm51bWJlck9mUGlnc1wiOiAyLFxuICAgICAgICBcInBpZ1Byb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgMCA6IHtcbiAgICAgICAgICAgICAgICB4OiA2MDAsXG4gICAgICAgICAgICAgICAgeTogNjAwLFxuICAgICAgICAgICAgICAgIHJhZDogMjUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgMSA6IHtcbiAgICAgICAgICAgICAgICB4OiAzMDAsXG4gICAgICAgICAgICAgICAgeTogNjAwLFxuICAgICAgICAgICAgICAgIHJhZDogMjUsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwibnVtYmVyT2ZCbG9ja3NcIjogMyxcbiAgICAgICAgXCJibG9ja1Byb3Blcml0ZXNcIjoge1xuICAgICAgICAgICAgMCA6IHtcbiAgICAgICAgICAgICAgICB4OiAxMDAwLFxuICAgICAgICAgICAgICAgIHk6IDcwMCxcbiAgICAgICAgICAgICAgICB3OiA3MCxcbiAgICAgICAgICAgICAgICBoOiA0MDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgMToge1xuICAgICAgICAgICAgICAgIHg6IDUwMCxcbiAgICAgICAgICAgICAgICB5OiA3MDAsXG4gICAgICAgICAgICAgICAgdzogNTAsXG4gICAgICAgICAgICAgICAgaDogMTQwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIDI6IHtcbiAgICAgICAgICAgICAgICB4OiA5MDAsXG4gICAgICAgICAgICAgICAgeTogOTAwLFxuICAgICAgICAgICAgICAgIHc6IDUwLFxuICAgICAgICAgICAgICAgIGg6IDUwLFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImJpcmRQcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgIHBsYXllckxpdmVzOiAzLFxuICAgICAgICAgICAgeDogOTcuNSxcbiAgICAgICAgICAgIHk6IDU1Mi41LFxuICAgICAgICAgICAgcmFkOiAxNCxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgMiA6IHtcbiAgICAgICAgXCJiYWNrR3JvdW5kSW1hZ2VLZXlcIiA6IFwic3JjL2ltYWdlcy9iYWNrZ3JvdW5kbGV2ZWwyLmpwZ1wiLFxuICAgICAgICBcImN1cnJlbnRMZXZlbEhpZ2hTY29yZUtleVwiOiBcImhpZ2hTY29yZUtleUxldmVsMlwiLFxuICAgICAgICBcIm51bWJlck9mUGlnc1wiOiAzLFxuICAgICAgICBcInBpZ1Byb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgMCA6IHtcbiAgICAgICAgICAgICAgICB4OiA1MDAsXG4gICAgICAgICAgICAgICAgeTogNjAwLFxuICAgICAgICAgICAgICAgIHJhZDogMjUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgMSA6IHtcbiAgICAgICAgICAgICAgICB4OiAxMjAwLFxuICAgICAgICAgICAgICAgIHk6IDYwMCxcbiAgICAgICAgICAgICAgICByYWQ6IDI1LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIDIgOiB7XG4gICAgICAgICAgICAgICAgeDogNzAwLFxuICAgICAgICAgICAgICAgIHk6IDYwMCxcbiAgICAgICAgICAgICAgICByYWQ6IDI1LFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIm51bWJlck9mQmxvY2tzXCI6IDIsXG4gICAgICAgIFwiYmxvY2tQcm9wZXJpdGVzXCI6IHtcbiAgICAgICAgICAgIDAgOiB7XG4gICAgICAgICAgICAgICAgeDogNDAwLFxuICAgICAgICAgICAgICAgIHk6IDcwMCxcbiAgICAgICAgICAgICAgICB3OiAzMCxcbiAgICAgICAgICAgICAgICBoOiAxMDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgMToge1xuICAgICAgICAgICAgICAgIHg6IDEwMDAsXG4gICAgICAgICAgICAgICAgeTogNzAwLFxuICAgICAgICAgICAgICAgIHc6IDUwLFxuICAgICAgICAgICAgICAgIGg6IDE0MCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJiaXJkUHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICBwbGF5ZXJMaXZlczogNCxcbiAgICAgICAgICAgIHg6IDk3LjUsXG4gICAgICAgICAgICB5OiA1NTIuNSxcbiAgICAgICAgICAgIHJhZDogMTQsXG4gICAgICAgIH1cbiAgICB9XG59IiwiZXhwb3J0IGNvbnN0IGNoZWNrQmlyZE9uUGlnQ29sbGlzaW9uID0gKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LCBwaWcpID0+IHtcbiAgICBpZiAoY3VycmVudFByb2plY3RpbGVPYmplY3QueCArIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnJhZGl1cyArIHBpZy5yYWRpdXMgPiBwaWcueFxuICAgICAgICAmJiBjdXJyZW50UHJvamVjdGlsZU9iamVjdC54IDwgcGlnLnggKyBjdXJyZW50UHJvamVjdGlsZU9iamVjdC5yYWRpdXMgKyBwaWcucmFkaXVzXG4gICAgICAgICYmIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnkgKyBjdXJyZW50UHJvamVjdGlsZU9iamVjdC5yYWRpdXMgKyBwaWcucmFkaXVzID4gcGlnLnlcbiAgICAgICAgJiYgY3VycmVudFByb2plY3RpbGVPYmplY3QueSA8IHBpZy55ICsgY3VycmVudFByb2plY3RpbGVPYmplY3QucmFkaXVzICsgcGlnLnJhZGl1cykgXG4gICAge1xuICAgICAgICAvLyBweXRoYWdvcmVhbSB0aGVvcmVtIHRvIGJlIG1vcmUgZXhhY3Qgb24gY29sbGlzaW9uXG4gICAgICAgIGxldCBkaXN0YW5jZSA9IE1hdGguc3FydChcbiAgICAgICAgICAgICAgICAoKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnggLSBwaWcueCkgKiAoY3VycmVudFByb2plY3RpbGVPYmplY3QueCAtIHBpZy54KSlcbiAgICAgICAgICAgICsgKChjdXJyZW50UHJvamVjdGlsZU9iamVjdC55IC0gcGlnLnkpICogKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnkgLSBwaWcueSkpXG4gICAgICAgIClcbiAgICAgICAgcmV0dXJuIGRpc3RhbmNlIDwgY3VycmVudFByb2plY3RpbGVPYmplY3QucmFkaXVzICsgcGlnLnJhZGl1czsgXG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgY2hlY2tCaXJkT25CbG9ja0NvbGxpc2lvbiA9IChjdXJyZW50UHJvamVjdGlsZU9iamVjdCwgYmxvY2spID0+IHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDQ7IGorKyl7XG4gICAgICAgIGNvbnN0IGNpcmNsZUNlbnRlciA9IFtjdXJyZW50UHJvamVjdGlsZU9iamVjdC54LCBjdXJyZW50UHJvamVjdGlsZU9iamVjdC55XTtcbiAgICAgICAgaWYgKGogKyAxID09PSA0KSB7XG4gICAgICAgICAgICBpZiAoY2hlY2tCaXJkSW50ZXJjZXB0QmxvY2soYmxvY2suZ2V0UG9pbnQoaiksIGJsb2NrLmdldFBvaW50KDApLCBjaXJjbGVDZW50ZXIsIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnJhZGl1cykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjaGVja0JpcmRJbnRlcmNlcHRCbG9jayhibG9jay5nZXRQb2ludChqKSwgYmxvY2suZ2V0UG9pbnQoaiArIDEpLCBjaXJjbGVDZW50ZXIsIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnJhZGl1cykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuY29uc3QgY2hlY2tCaXJkSW50ZXJjZXB0QmxvY2sgPSAocG9pbnRBLCBwb2ludEIsIGNpcmNsZUNlbnRlciwgcmFkaXVzKSA9PiB7XG4gICAgbGV0IGRpc3Q7XG4gICAgY29uc3QgdmVsMVggPSBwb2ludEIucG9zLnggLSBwb2ludEEucG9zLng7XG4gICAgY29uc3QgdmVsMVkgPSBwb2ludEIucG9zLnkgLSBwb2ludEEucG9zLnk7XG4gICAgY29uc3QgdmVsMlggPSBjaXJjbGVDZW50ZXJbMF0gLSBwb2ludEEucG9zLng7XG4gICAgY29uc3QgdmVsMlkgPSBjaXJjbGVDZW50ZXJbMV0gLSBwb2ludEEucG9zLnk7XG4gICAgY29uc3QgdW5pdCA9ICh2ZWwyWCAqIHZlbDFYICsgdmVsMlkgKiB2ZWwxWSkgLyAodmVsMVkgKiB2ZWwxWSArIHZlbDFYICogdmVsMVgpO1xuICAgIGlmICh1bml0ID49IDAgJiYgdW5pdCA8PSAxKXtcbiAgICAgICAgZGlzdCA9IChwb2ludEEucG9zLnggICsgdmVsMVggKiB1bml0IC0gY2lyY2xlQ2VudGVyWzBdKSAqKiAyICsgKHBvaW50QS5wb3MueSArIHZlbDFZICogdW5pdCAtIGNpcmNsZUNlbnRlclsxXSkgKiogMjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBkaXN0ID0gdW5pdCA8IDAgPyBcbiAgICAgICAgICAgIChwb2ludEEucG9zLnggLSBjaXJjbGVDZW50ZXJbMF0pICoqIDIgKyAocG9pbnRBLnBvcy55IC0gY2lyY2xlQ2VudGVyWzFdKSAqKiAyIDpcbiAgICAgICAgICAgIChwb2ludEIucG9zLnggLSBjaXJjbGVDZW50ZXJbMF0pICoqIDIgKyAocG9pbnRCLnBvcy55IC0gY2lyY2xlQ2VudGVyWzFdKSAqKiAyO1xuICAgIH1cbiAgICByZXR1cm4gZGlzdCA8IHJhZGl1cyAqIHJhZGl1cztcbn1cblxuXG5cblxuXG4iLCJleHBvcnQgY29uc3QgYmlyZE9uUGlnQ29sbGlzaW9uTG9naWMgPSAoY3VycmVudFByb2plY3RpbGVPYmplY3QsIHBpZykgPT4ge1xuICAgIHBpZy5zdGF0ZSA9IFwiZGVhZFwiO1xuICAgIGxldCBuZXdWZWxYMSA9IChjdXJyZW50UHJvamVjdGlsZU9iamVjdC52ZWxYICogKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0Lm1hc3MgLSBwaWcubWFzcykgKyAoIDIgKiBwaWcubWFzcyAqIHBpZy52ZWxYKSkgLyAoY3VycmVudFByb2plY3RpbGVPYmplY3QubWFzcyArIHBpZy5tYXNzKTtcbiAgICBsZXQgbmV3VmVsWTEgPSAoY3VycmVudFByb2plY3RpbGVPYmplY3QudmVsWSAqIChjdXJyZW50UHJvamVjdGlsZU9iamVjdC5tYXNzIC0gcGlnLm1hc3MpICsgKCAyICogcGlnLm1hc3MgKiBwaWcudmVsWSkpIC8gKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0Lm1hc3MgKyBwaWcubWFzcyk7XG4gICAgbGV0IG5ld1ZlbFgyID0gKHBpZy52ZWxYICogKHBpZy5tYXNzIC0gY3VycmVudFByb2plY3RpbGVPYmplY3QubWFzcykgKyAoMiAqIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0Lm1hc3MgKiBjdXJyZW50UHJvamVjdGlsZU9iamVjdC52ZWxYKSkgLyAoY3VycmVudFByb2plY3RpbGVPYmplY3QubWFzcyArIHBpZy5tYXNzKTtcbiAgICBsZXQgbmV3VmVsWTIgPSAocGlnLnZlbFkgKiAocGlnLm1hc3MgLSBjdXJyZW50UHJvamVjdGlsZU9iamVjdC5tYXNzKSArICgyICogY3VycmVudFByb2plY3RpbGVPYmplY3QubWFzcyAqIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFkpKSAvIChjdXJyZW50UHJvamVjdGlsZU9iamVjdC5tYXNzICsgcGlnLm1hc3MpO1xuICAgIFxuICAgIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFggPSAtY3VycmVudFByb2plY3RpbGVPYmplY3QudmVsWDtcbiAgICBjdXJyZW50UHJvamVjdGlsZU9iamVjdC52ZWxZID0gLWN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFk7XG4gICAgcGlnLnZlbFggPSBuZXdWZWxYMjtcbiAgICBwaWcudmVsWSA9IG5ld1ZlbFkyO1xuXG4gICAgY3VycmVudFByb2plY3RpbGVPYmplY3QueCA9IGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnggKyBuZXdWZWxYMTtcbiAgICBjdXJyZW50UHJvamVjdGlsZU9iamVjdC55ID0gY3VycmVudFByb2plY3RpbGVPYmplY3QueSArIG5ld1ZlbFkxO1xuICAgIHBpZy54ID0gcGlnLnggKyBuZXdWZWxYMjtcbiAgICBwaWcueSA9IHBpZy55ICsgbmV3VmVsWTI7XG59XG5cbmV4cG9ydCBjb25zdCBiaXJkT25CbG9ja0NvbGxpc2lvbkxvZ2ljID0gKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LCBibG9jaykgPT4ge1xuICAgIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFggPSAtY3VycmVudFByb2plY3RpbGVPYmplY3QudmVsWDtcbiAgICBjdXJyZW50UHJvamVjdGlsZU9iamVjdC52ZWxZID0gLWN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFk7XG4gICAgbGV0IGZvcmNlID0gYmxvY2suYXNQb2xhcihibG9jay52ZWN0b3IoMTAsIDEwKSk7XG4gICAgZm9yY2UubWFnICo9IGJsb2NrLm1hc3MgKiAwLjE7XG4gICAgYmxvY2suYXBwbHlGb3JjZShmb3JjZSwgYmxvY2sudmVjdG9yKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LngsIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnkpKTtcbn1cblxuXG4iLCJleHBvcnQgY29uc3QgY2hlY2tCaXJkQW5kUGlnU3RhdGUgPSAoY3VycmVudFByb2plY3RpbGVPYmplY3RTdGF0ZSwgcGlnU3RhdGUpID0+IHtcbiAgICBpZiAoY3VycmVudFByb2plY3RpbGVPYmplY3RTdGF0ZSA9PT0gXCJlbmRTdGF0ZVwiICYmIHBpZ1N0YXRlID09PSBcImRlYWRcIikgcmV0dXJuIHRydWU7XG59XG5cbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vc3R5bGVzL2luZGV4LnNjc3NcIjtcbmltcG9ydCBBbmdlcmVkQmlyZHMgZnJvbSBcIi4vc2NyaXB0cy9nYW1lXCI7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FudmFzXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBpbml0KTtcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzZXQtaGlnaHNjb3JlXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZXNldExvY2FsU3RvcmFnZSk7XG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc3RhcnQtYnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZXN0YXJ0R2FtZSk7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgbmV3IEFuZ2VyZWRCaXJkcygpLnN0YXJ0KCk7XG59XG5cbmZ1bmN0aW9uIHJlc3RhcnRHYW1lKCkge1xuICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBcIlwiO1xufVxuXG5mdW5jdGlvbiByZXNldExvY2FsU3RvcmFnZSgpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLmNsZWFyKCk7XG59XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=