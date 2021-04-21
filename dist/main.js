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
  }

  _createClass(Block, [{
    key: "render",
    value: function render() {
      this.ctx.save();
      this.ctx.setTransform(1, 0, 0, 1, this.x, this.y);
      this.ctx.rotate(this.r);
      this.ctx.fillStyle = "Blue";
      this.ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
      this.ctx.strokeRect(-this.w / 2, -this.h / 2, this.w, this.h);
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
            debugger;
            that.winLevel();
          }

          ;
          if (that.stageLoader.checkStageLost()) that.gameOver();
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
    this.ground = this.ctx.canvas.height - 20;
    this.bounce = 0.4;
    this.frictionX = 0.9;
    this.mass = 2;
    this.pig = new Image();
    this.pig.src = "src/images/peppa.png";
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
      this.ctx.drawImage(this.projectileImage, this.birdProperties.x - 30, this.birdProperties.y - 50, 75, 140);

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
    key: "lostAllProjectileObjects",
    value: function lostAllProjectileObjects() {
      return this.birdProperties.playerLives === 0 && this.currentProjectileObject.state === "endState";
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
      this.projectileObject.render();
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
    key: "checkStageLost",
    value: function checkStageLost() {
      return this.projectileObject.lostAllProjectileObjects();
    }
  }, {
    key: "checkStageWon",
    value: function checkStageWon() {
      return this.pigs.length === 0;
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
    "currentLevelHighScoreKey": "highScoreKeyLevel1",
    "numberOfPigs": 2,
    "pigProperties": {
      0: {
        x: 500,
        y: 600,
        rad: 15
      },
      1: {
        x: 300,
        y: 600,
        rad: 15
      }
    },
    "numberOfBlocks": 2,
    "blockProperites": {
      0: {
        x: 1000,
        y: 700,
        w: 30,
        h: 100
      },
      1: {
        x: 700,
        y: 700,
        w: 50,
        h: 140
      }
    },
    "birdProperties": {
      playerLives: 3,
      x: 120,
      y: 630,
      rad: 14
    }
  },
  2: {
    "currentLevelHighScoreKey": "highScoreKeyLevel2",
    "numberOfPigs": 3,
    "pigProperties": {
      0: {
        x: 500,
        y: 600,
        rad: 15
      },
      1: {
        x: 1200,
        y: 600,
        rad: 15
      },
      2: {
        x: 700,
        y: 600,
        rad: 15
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
      playerLives: 3,
      x: 120,
      y: 630,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYmlyZC5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYmxvY2suanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi8uL3NyYy9zY3JpcHRzL2NhbnZhcy5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvcGlnLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9wcm9qZWN0aWxlLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9zdGFnZUxvYWRlci5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvc3RhZ2VzL3N0YWdlS2V5cy5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvdXRpbC9jb2xsaXNpb25EZXRlY3Rpb25VdGlsLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy91dGlsL2NvbGxpc2lvbkxvZ2ljVXRpbC5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvdXRpbC9zdGF0ZUxvZ2ljLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc3R5bGVzL2luZGV4LnNjc3MiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiQmlyZCIsImN0eCIsImJpcmRQcm9wZXJ0aWVzIiwieCIsInkiLCJyYWRpdXMiLCJyYWQiLCJtYXNzIiwidmVsWCIsInZlbFkiLCJ0cmFuc2ZlciIsImdyYXZpdHkiLCJncm91bmQiLCJjYW52YXMiLCJoZWlnaHQiLCJib3VuY2UiLCJmcmljdGlvblgiLCJiaXJkIiwiSW1hZ2UiLCJzcmMiLCJzdGF0ZSIsInNhdmUiLCJiZWdpblBhdGgiLCJhcmMiLCJNYXRoIiwiUEkiLCJjbGlwIiwiY2xvc2VQYXRoIiwiZHJhd0ltYWdlIiwicmVzdG9yZSIsIkJsb2NrIiwidyIsImgiLCJyIiwiZHgiLCJkeSIsImRyIiwiSU5TRVQiLCJQSTkwIiwiUEkyIiwiV0FMTF9OT1JNUyIsIl9ncm91bmQiLCJnZXRNYXNzIiwic2V0VHJhbnNmb3JtIiwicm90YXRlIiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJzdHJva2VSZWN0IiwiaSIsInAiLCJnZXRQb2ludCIsInBvcyIsImRvQ29sbGlzaW9uIiwid2lkdGgiLCJ3aGljaCIsInh4IiwieXkiLCJ2ZWxvY2l0eUEiLCJ2ZWxvY2l0eVQiLCJ2ZWxvY2l0eSIsImNvcyIsInNpbiIsImRldGFpbHMiLCJhc1BvbGFyIiwidmVjdG9yIiwicG9sYXIiLCJtYWciLCJkaXIiLCJ2ZWN0b3JBZGQiLCJ2YWxpZGF0ZVBvbGFyIiwidmVjIiwiaXNQb2xhciIsInBWZWMiLCJyZXRWIiwiaXNDYXJ0IiwiY2FydFRvUG9sYXIiLCJ1bmRlZmluZWQiLCJwb2xhclRvQ2FydCIsImF0YW4yIiwiaHlwb3QiLCJ2ZWMxIiwidmVjMiIsInYxIiwiYXNDYXJ0IiwidjIiLCJmb3JjZSIsImxvYyIsImwiLCJ0b0NlbnRlciIsInBoZXRhIiwiRnYiLCJGYSIsImFjY2VsIiwiZGVsdGFWIiwiYWNjZWxBIiwidiIsImQxIiwiZDIiLCJhbG9uZyIsInRhbmdlbnQiLCJwb2ludERldGFpbHMiLCJ3YWxsSW5kZXgiLCJ2diIsInZhIiwidnZjIiwidmVjdG9yQ29tcG9uZW50c0ZvckRpciIsInZhYyIsImFwcGx5Rm9yY2UiLCJDYW52YXMiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJnZXRDb250ZXh0IiwiYmluZENhbnZhc1RvRE9NIiwicXVlcnlTZWxlY3RvciIsImNsZWFyQ2FudmFzIiwiYm9keSIsImFwcGVuZCIsImNsYXNzTGlzdCIsImFkZCIsImNsZWFyUmVjdCIsImdldEVsZW1lbnRCeUlkIiwicmVtb3ZlQ2hpbGQiLCJBbmdlcmVkQmlyZHMiLCJzdGFydCIsImJpbmQiLCJ0aGF0IiwiYW5pbWF0aW5nIiwiaW5pdGlhbGl6ZUVudGl0aWVzIiwiYW5pbWF0aW9uIiwic3RhZ2VMb2FkZXIiLCJ1cGRhdGUiLCJpbnRlcnZhbCIsIndpbmRvdyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNoZWNrU3RhZ2VXb24iLCJ3aW5MZXZlbCIsImNoZWNrU3RhZ2VMb3N0IiwiZ2FtZU92ZXIiLCJTdGFnZUxvYWRlciIsImluaXRpYWxpemVFdmVudExpc3RlbmVycyIsInN0YWdlTnVtYmVyIiwicmVzdGFydEVudGl0aWVzIiwiUGlnIiwicGlnIiwicG9vZiIsInN0YXJ0VGltZXIiLCJhYnMiLCJ0aW1lc3RhbXAiLCJEYXRlIiwiZ2V0VGltZSIsImVsYXBzZWQiLCJQcm9qZWN0aWxlIiwibGF1bmNoZWRPYmplY3RzIiwibWF4IiwicHJvamVjdGlsZUltYWdlIiwibGl2ZXMiLCJhbmdsZVZhbCIsIm1hZ25pdHVkZVZhbCIsImFuZ2xlIiwiY3VycmVudFByb2plY3RpbGVPYmplY3QiLCJvYmplY3RMYXVuY2hlZCIsIk9iamVjdExhdW5jaCIsIm9iamVjdFR5cGUiLCJwdXNoIiwidXBkYXRlTGl2ZXMiLCJsZW5ndGgiLCJzcGxpY2UiLCJjdXJyZW50T2JqZWN0IiwidXBkYXRlQ3VycmVudExhdW5jaGVkT2JqZWN0IiwiY3VycmVudEJpcmQiLCJyZW5kZXIiLCJwbGF5ZXJMaXZlcyIsInNjb3JlIiwic3RhcnRQb3NCaXJkIiwicHJvamVjdGlsZU9iamVjdCIsInBpZ3MiLCJibG9ja3MiLCJ1cGRhdGVFbnRpdGllcyIsImNoZWNrQW5kVXBkYXRlRW50aXRpZXNDb2xsaXNpb24iLCJyZW5kZXJFbnRpdGllcyIsIm1vdXNlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJjYW52YXNQcm9wZXJ0aWVzIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwibGVmdCIsInRvcCIsImRlbHRhWCIsImRlbHRhWSIsInRoZXRhUmFkaWFuIiwia2lja09mZkxhdW5jaERpcmVjdGlvbiIsImN1cnJlbnRTdGFnZVZhbHVlcyIsInN0YWdlS2V5cyIsImxvYWRTdGFnZSIsInN0YXJ0aW5nTGl2ZXMiLCJjdXJyZW50TGV2ZWxIaWdoU2NvcmVLZXkiLCJoaWdoU2NvcmVTYXZlS2V5U3RyaW5nIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImhpZ2hTY29yZSIsInBhcnNlSW50IiwidXBkYXRlUGlnc0xlZnQiLCJ1cGRhdGVIaWdoU2NvcmUiLCJzZXRJdGVtIiwiY2hlY2tCaXJkQW5kUGlnU3RhdGUiLCJwb29mQW5pbWF0aW9uVGltZXJCb29sZWFuIiwiY2hlY2tCaXJkT25QaWdDb2xsaXNpb24iLCJiaXJkT25QaWdDb2xsaXNpb25Mb2dpYyIsImNoZWNrQmlyZE9uQmxvY2tDb2xsaXNpb24iLCJiaXJkT25CbG9ja0NvbGxpc2lvbkxvZ2ljIiwicmVuZGVyTGl2ZXMiLCJyZW5kZXJTY29yZSIsInJlbmRlckhpZ2hTY29yZSIsInJlbmRlclN0YWdlTnVtYmVyIiwidGV4dEFsaWduIiwidGV4dEJhc2VsaW5lIiwic3Ryb2tlU3R5bGUiLCJmb250IiwiZmlsbFRleHQiLCJzdHJva2VUZXh0IiwibG9zdEFsbFByb2plY3RpbGVPYmplY3RzIiwiZGlzdGFuY2UiLCJzcXJ0IiwiYmxvY2siLCJqIiwiY2lyY2xlQ2VudGVyIiwiY2hlY2tCaXJkSW50ZXJjZXB0QmxvY2siLCJwb2ludEEiLCJwb2ludEIiLCJkaXN0IiwidmVsMVgiLCJ2ZWwxWSIsInZlbDJYIiwidmVsMlkiLCJ1bml0IiwibmV3VmVsWDEiLCJuZXdWZWxZMSIsIm5ld1ZlbFgyIiwibmV3VmVsWTIiLCJjdXJyZW50UHJvamVjdGlsZU9iamVjdFN0YXRlIiwicGlnU3RhdGUiLCJpbml0IiwicmVzZXRMb2NhbFN0b3JhZ2UiLCJyZXN0YXJ0R2FtZSIsImxvY2F0aW9uIiwiaHJlZiIsImNsZWFyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztJQUFNQSxJO0FBQ0YsZ0JBQVlDLEdBQVosRUFBaUJDLGNBQWpCLEVBQWlDO0FBQUE7O0FBQzdCLFNBQUtELEdBQUwsR0FBV0EsR0FBWDtBQUNBLFNBQUtFLENBQUwsR0FBU0QsY0FBYyxDQUFDQyxDQUF4QjtBQUNBLFNBQUtDLENBQUwsR0FBU0YsY0FBYyxDQUFDRSxDQUF4QjtBQUNBLFNBQUtDLE1BQUwsR0FBY0gsY0FBYyxDQUFDSSxHQUE3QjtBQUNBLFNBQUtDLElBQUwsR0FBWSxDQUFaO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLENBQVo7QUFDQSxTQUFLQyxJQUFMLEdBQVksQ0FBWjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsR0FBaEI7QUFDQSxTQUFLQyxPQUFMLEdBQWU7QUFBRVIsT0FBQyxFQUFFLENBQUw7QUFBUUMsT0FBQyxFQUFFO0FBQVgsS0FBZjtBQUNBLFNBQUtRLE1BQUwsR0FBYyxLQUFLWCxHQUFMLENBQVNZLE1BQVQsQ0FBZ0JDLE1BQWhCLEdBQXlCLEVBQXZDO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLEdBQWQ7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLEdBQWpCO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLElBQUlDLEtBQUosRUFBWjtBQUNBLFNBQUtELElBQUwsQ0FBVUUsR0FBVixHQUFnQiw4QkFBaEI7QUFDQSxTQUFLQyxL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OztBQ05BO0FBQ0E7QUFFQW5JLFFBQVEsQ0FBQ0ksYUFBVCxDQUF1QixTQUF2QixFQUFrQ29FLGdCQUFsQyxDQUFtRCxPQUFuRCxFQUE0RDRELElBQTVEO0FBQ0FwSSxRQUFRLENBQUNJLGFBQVQsQ0FBdUIsa0JBQXZCLEVBQTJDb0UsZ0JBQTNDLENBQTRELE9BQTVELEVBQXFFNkQsaUJBQXJFO0FBQ0FySSxRQUFRLENBQUNJLGFBQVQsQ0FBdUIsaUJBQXZCLEVBQTBDb0UsZ0JBQTFDLENBQTJELE9BQTNELEVBQW9FOEQsV0FBcEU7O0FBRUEsU0FBU0YsSUFBVCxHQUFnQjtBQUNaLE1BQUl2SCxrREFBSixHQUFtQkMsS0FBbkI7QUFDSDs7QUFFRCxTQUFTd0gsV0FBVCxHQUF1QjtBQUNuQnRJLFVBQVEsQ0FBQ3VJLFFBQVQsQ0FBa0JDLElBQWxCLEdBQXlCLEVBQXpCO0FBQ0g7O0FBRUQsU0FBU0gsaUJBQVQsR0FBNkI7QUFDekI5RyxRQUFNLENBQUNpRSxZQUFQLENBQW9CaUQsS0FBcEI7QUFDSCxDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBCaXJkIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgsIGJpcmRQcm9wZXJ0aWVzKSB7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLnggPSBiaXJkUHJvcGVydGllcy54O1xuICAgICAgICB0aGlzLnkgPSBiaXJkUHJvcGVydGllcy55O1xuICAgICAgICB0aGlzLnJhZGl1cyA9IGJpcmRQcm9wZXJ0aWVzLnJhZDtcbiAgICAgICAgdGhpcy5tYXNzID0gMjtcbiAgICAgICAgdGhpcy52ZWxYID0gMDtcbiAgICAgICAgdGhpcy52ZWxZID0gMDtcbiAgICAgICAgdGhpcy50cmFuc2ZlciA9IDAuOTtcbiAgICAgICAgdGhpcy5ncmF2aXR5ID0geyB4OiAwLCB5OiAwLjEgfTtcbiAgICAgICAgdGhpcy5ncm91bmQgPSB0aGlzLmN0eC5jYW52YXMuaGVpZ2h0IC0gMjA7XG4gICAgICAgIHRoaXMuYm91bmNlID0gMC41O1xuICAgICAgICB0aGlzLmZyaWN0aW9uWCA9IDAuOTtcbiAgICAgICAgdGhpcy5iaXJkID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMuYmlyZC5zcmMgPSBcInNyYy9pbWFnZXMvYW5nZXJlZC1iaXJkeS5wbmdcIlxuICAgICAgICB0aGlzLnN0YXRlID0gXCJzdGFydFN0YXRlXCI7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLmN0eC5zYXZlKCk7XG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICB0aGlzLmN0eC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCAoTWF0aC5QSSAqIDIpLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuY3R4LmNsaXAoKTtcbiAgICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLmJpcmQsIHRoaXMueCAtIHRoaXMucmFkaXVzLCB0aGlzLnkgLSB0aGlzLnJhZGl1cywgdGhpcy5yYWRpdXMgKiAyLCB0aGlzLnJhZGl1cyAqIDIpXG4gICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJpcmQ7IiwiY2xhc3MgQmxvY2sge1xuICAgIGNvbnN0cnVjdG9yKGN0eCwgeCwgeSwgdywgaCkge1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjdHguY2FudmFzO1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLncgPSB3O1xuICAgICAgICB0aGlzLmggPSBoO1xuICAgICAgICB0aGlzLnIgPSAwLjE7XG4gICAgICAgIHRoaXMuZHggPSAwO1xuICAgICAgICB0aGlzLmR5ID0gMDtcbiAgICAgICAgdGhpcy5kciA9IDA7XG4gICAgICAgIHRoaXMuSU5TRVQgPSAxMDtcbiAgICAgICAgdGhpcy5QSSA9IE1hdGguUEk7XG4gICAgICAgIHRoaXMuUEk5MCA9IE1hdGguUEkgLyAyO1xuICAgICAgICB0aGlzLlBJMiA9IE1hdGguUEkgKiAyO1xuICAgICAgICB0aGlzLldBTExfTk9STVMgPSBbIE1hdGguUEkgLyAyLCBNYXRoLlBJLCAtKE1hdGguUEkgLyAyKSwgMF1cbiAgICAgICAgdGhpcy5fZ3JvdW5kID0gdGhpcy5jYW52YXMuaGVpZ2h0IC0gMTA1O1xuICAgICAgICB0aGlzLm1hc3MgPSB0aGlzLmdldE1hc3MoKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdGhpcy5jdHguc2F2ZSgpXG4gICAgICAgIHRoaXMuY3R4LnNldFRyYW5zZm9ybSgxLDAsMCwxLHRoaXMueCx0aGlzLnkpO1xuICAgICAgICB0aGlzLmN0eC5yb3RhdGUodGhpcy5yKTtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJCbHVlXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KC10aGlzLncvMiwgLXRoaXMuaC8yLCB0aGlzLncsIHRoaXMuaClcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlUmVjdCgtdGhpcy53LzIsIC10aGlzLmgvMiwgdGhpcy53LCB0aGlzLmgpXG4gICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKVxuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy54ICs9IHRoaXMuZHg7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLmR5O1xuICAgICAgICB0aGlzLmR5ICs9IDAuMDYxO1xuICAgICAgICB0aGlzLnIgKz0gdGhpcy5kcjtcblxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgNDsgaSsrKXtcbiAgICAgICAgICAgIHZhciBwID0gdGhpcy5nZXRQb2ludChpKTtcbiAgICAgICAgICAgIC8vIG9ubHkgZG8gb25lIGNvbGxpc2lvbiBwZXIgZnJhbWUgb3Igd2Ugd2lsbCBlbmQgdXAgYWRkaW5nIGVuZXJneVxuICAgICAgICAgICAgaWYocC5wb3MueCA8IHRoaXMuSU5TRVQpe1xuICAgICAgICAgICAgICAgIHRoaXMueCArPSAodGhpcy5JTlNFVCkgLSBwLnBvcy54O1xuICAgICAgICAgICAgICAgIHRoaXMuZG9Db2xsaXNpb24ocCwzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiggcC5wb3MueCA+IHRoaXMuY2FudmFzLndpZHRoLXRoaXMuSU5TRVQpe1xuICAgICAgICAgICAgICAgIHRoaXMueCArPSAodGhpcy5jYW52YXMud2lkdGggLSB0aGlzLklOU0VUKSAtIHAucG9zLng7XG4gICAgICAgICAgICAgICAgdGhpcy5kb0NvbGxpc2lvbihwLDEpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKHAucG9zLnkgPCB0aGlzLklOU0VUKXtcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gKHRoaXMuSU5TRVQpIC0gcC5wb3MueTtcbiAgICAgICAgICAgICAgICB0aGlzLmRvQ29sbGlzaW9uKHAsMClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoIHAucG9zLnkgPiB0aGlzLmNhbnZhcy5oZWlnaHQgLSB0aGlzLklOU0VUKXtcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gKHRoaXMuY2FudmFzLmhlaWdodCAtIHRoaXMuSU5TRVQpIC0gcC5wb3MueTtcbiAgICAgICAgICAgICAgICB0aGlzLmRvQ29sbGlzaW9uKHAsMilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldE1hc3MoKSB7XG4gICAgICAgIHJldHVybiAoIHRoaXMudyAqIHRoaXMuaCAqIHRoaXMuaCkgLyAxMDAwO1xuICAgIH1cblxuICAgIGdldFBvaW50KHdoaWNoKSB7XG4gICAgICAgIHZhciBkeCwgZHksIHgsIHksIHh4LCB5eSwgdmVsb2NpdHlBLCB2ZWxvY2l0eVQsIHZlbG9jaXR5O1xuXG4gICAgICAgIGR4ID0gTWF0aC5jb3ModGhpcy5yKTtcbiAgICAgICAgZHkgPSBNYXRoLnNpbih0aGlzLnIpO1xuXG4gICAgICAgIHN3aXRjaCAod2hpY2gpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB4ID0gLXRoaXMudyAvIDI7XG4gICAgICAgICAgICAgICAgeSA9IC10aGlzLmggLyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHggPSB0aGlzLncgLyAyO1xuICAgICAgICAgICAgICAgIHkgPSAtdGhpcy5oIC8gMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB4ID0gdGhpcy53IC8gMjtcbiAgICAgICAgICAgICAgICB5ID0gdGhpcy5oIC8gMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICB4ID0gLXRoaXMudyAvIDI7XG4gICAgICAgICAgICAgICAgeSA9IHRoaXMuaCAvIDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgeCA9IHRoaXMueDtcbiAgICAgICAgICAgICAgICB5ID0gdGhpcy55O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHh4ICwgeXk7XG4gICAgICAgIHh4ID0geCAqIGR4ICsgeSAqIC1keTtcbiAgICAgICAgeXkgPSB4ICogZHkgKyB5ICogZHg7XG5cbiAgICAgICAgdmFyIGRldGFpbHMgPSB0aGlzLmFzUG9sYXIodGhpcy52ZWN0b3IoeHgsIHl5KSk7XG5cbiAgICAgICAgeHggKz0gdGhpcy54O1xuICAgICAgICB5eSArPSB0aGlzLnk7XG5cbiAgICAgICAgdmVsb2NpdHlBID0gdGhpcy5wb2xhcihkZXRhaWxzLm1hZyAqIHRoaXMuZHIsIGRldGFpbHMuZGlyICsgdGhpcy5QSTkwKTtcbiAgICAgICAgdmVsb2NpdHlUID0gdGhpcy52ZWN0b3JBZGQodmVsb2NpdHkgPSB0aGlzLnZlY3Rvcih0aGlzLmR4LCB0aGlzLmR5KSwgdmVsb2NpdHlBKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmVsb2NpdHk6IHZlbG9jaXR5LFxuICAgICAgICAgICAgdmVsb2NpdHlUOiB2ZWxvY2l0eVQsXG4gICAgICAgICAgICB2ZWxvY2l0eUEgOiB2ZWxvY2l0eUEsXG4gICAgICAgICAgICBwb3M6IHRoaXMudmVjdG9yKHh4LCB5eSksXG4gICAgICAgICAgICByYWRpdXM6IGRldGFpbHMubWFnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwb2xhcihtYWcgPSAxLCBkaXIgPSAwKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlUG9sYXIoe2RpcjogZGlyLCBtYWc6IG1hZ30pXG4gICAgfVxuXG4gICAgdmVjdG9yKHggPSAxLCB5ID0gMCkge1xuICAgICAgICByZXR1cm4geyB4OiB4LCB5OiB5fTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZVBvbGFyKHZlYykge1xuICAgICAgICBpZiAodGhpcy5pc1BvbGFyKHZlYykpIHtcbiAgICAgICAgICAgIGlmKHZlYy5tYWcgPCAwKXtcbiAgICAgICAgICAgICAgICB2ZWMubWFnID0gLXZlYy5tYWc7XG4gICAgICAgICAgICAgICAgdmVjLmRpciArPSB0aGlzLlBJO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2ZWM7XG4gICAgfVxuXG4gICAgcG9sYXJUb0NhcnQocFZlYywgcmV0ViA9IHt4OiAwLCB5OiAwfSl7XG4gICAgICAgIHJldFYueCA9IE1hdGguY29zKHBWZWMuZGlyKSAqIHBWZWMubWFnO1xuICAgICAgICByZXRWLnkgPSBNYXRoLnNpbihwVmVjLmRpcikgKiBwVmVjLm1hZztcbiAgICAgICAgcmV0dXJuIHJldFZcbiAgICB9XG5cbiAgICBhc1BvbGFyKHZlYykge1xuICAgICAgICBpZiAodGhpcy5pc0NhcnQodmVjKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FydFRvUG9sYXIodmVjKVxuICAgICAgICB9XG4gICAgICAgIGlmICh2ZWMubWFnIDwgMCkge1xuICAgICAgICAgICAgdmVjLm1hZyA9IC12ZWMubWFnO1xuICAgICAgICAgICAgdmVjLmRpciArPSB0aGlzLlBJO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGRpcjogdmVjLmRpciwgbWFnOiB2ZWMubWFnfTtcbiAgICB9XG5cbiAgICBpc0NhcnQodmVjKSB7IGlmKHZlYy54ICE9PSB1bmRlZmluZWQgJiYgdmVjLnkgIT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdHJ1ZTsgfSByZXR1cm4gZmFsc2U7IH1cbiAgICBpc1BvbGFyKHZlYykgeyBpZih2ZWMubWFnICE9PSB1bmRlZmluZWQgJiYgdmVjLmRpciAhPT0gdW5kZWZpbmVkKSB7IHJldHVybiB0cnVlOyB9IHJldHVybiBmYWxzZTsgfVxuICAgIGFzQ2FydCh2ZWMpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNQb2xhcih2ZWMpKSB7cmV0dXJuIHRoaXMucG9sYXJUb0NhcnQodmVjKX1cbiAgICAgICAgcmV0dXJuIHt4OiB2ZWMueCwgeTogdmVjLnl9XG4gICAgfVxuICAgIGNhcnRUb1BvbGFyKHZlYywgcmV0ViA9IHtkaXI6IDAsIG1hZzogMH0pIHtcbiAgICAgICAgcmV0Vi5kaXIgPSBNYXRoLmF0YW4yKHZlYy55LCB2ZWMueCk7XG4gICAgICAgIHJldFYubWFnID0gTWF0aC5oeXBvdCh2ZWMueCwgdmVjLnkpO1xuICAgICAgICByZXR1cm4gcmV0VjtcbiAgICB9XG5cbiAgICB2ZWN0b3JBZGQodmVjMSwgdmVjMikge1xuICAgICAgICB2YXIgdjEgPSB0aGlzLmFzQ2FydCh2ZWMxKTtcbiAgICAgICAgdmFyIHYyID0gdGhpcy5hc0NhcnQodmVjMik7XG4gICAgICAgIHJldHVybiB0aGlzLnZlY3Rvcih2MS54ICsgdjIueCwgdjEueSArIHYyLnkpXG4gICAgfVxuXG4gICAgYXBwbHlGb3JjZShmb3JjZSwgbG9jKSB7XG4gICAgICAgIHRoaXMudmFsaWRhdGVQb2xhcihmb3JjZSk7XG4gICAgICAgIHZhciBsID0gdGhpcy5hc0NhcnQobG9jKTtcbiAgICAgICAgdmFyIHRvQ2VudGVyID0gdGhpcy5hc1BvbGFyKHRoaXMudmVjdG9yKHRoaXMueCAtIGwueCwgdGhpcy55IC0gbC55KSk7XG4gICAgICAgIHZhciBwaGV0YSA9IHRvQ2VudGVyLmRpciAtIGZvcmNlLmRpcjtcbiAgICAgICAgdmFyIEZ2ID0gTWF0aC5jb3MocGhldGEpICogZm9yY2UubWFnO1xuICAgICAgICB2YXIgRmEgPSBNYXRoLnNpbihwaGV0YSkgKiBmb3JjZS5tYWc7XG4gICAgICAgIHZhciBhY2NlbCA9IHRoaXMuYXNQb2xhcih0b0NlbnRlcik7XG4gICAgICAgIGFjY2VsLm1hZyA9IEZ2IC8gdGhpcy5tYXNzOyBcbiAgICAgICAgdmFyIGRlbHRhViA9IHRoaXMuYXNDYXJ0KGFjY2VsKTsgXG4gICAgICAgIHRoaXMuZHggKz0gZGVsdGFWLnggXG4gICAgICAgIHRoaXMuZHkgKz0gZGVsdGFWLnlcbiAgICAgICAgdmFyIGFjY2VsQSA9IEZhIC8gKHRvQ2VudGVyLm1hZyAgKiB0aGlzLm1hc3MpOyBcbiAgICAgICAgdGhpcy5kciArPSBhY2NlbEE7XG4gICAgfVxuXG4gICAgdmVjdG9yQ29tcG9uZW50c0ZvckRpcih2ZWMsIGRpcikge1xuICAgICAgICB2YXIgdiA9IHRoaXMuYXNQb2xhcih2ZWMpOyBcbiAgICAgICAgdmFyIHBoZXRhID0gdi5kaXIgLSBkaXI7XG4gICAgICAgIHZhciBGdiA9IE1hdGguY29zKHBoZXRhKSAqIHYubWFnO1xuICAgICAgICB2YXIgRmEgPSBNYXRoLnNpbihwaGV0YSkgKiB2Lm1hZztcblxuICAgICAgICB2YXIgZDEgPSBkaXI7XG4gICAgICAgIHZhciBkMiA9IGRpciArIHRoaXMuUEk5MDsgICAgXG4gICAgICAgIGlmKEZ2IDwgMCl7XG4gICAgICAgICAgICBkMSArPSB0aGlzLlBJO1xuICAgICAgICAgICAgRnYgPSAtRnY7XG4gICAgICAgIH1cblxuICAgICAgICBpZihGYSA8IDApe1xuICAgICAgICAgICAgZDIgKz0gdGhpcy5QSTtcbiAgICAgICAgICAgIEZhID0gLUZhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbG9uZyA6IHRoaXMucG9sYXIoRnYsZDEpLFxuICAgICAgICAgICAgdGFuZ2VudCA6IHRoaXMucG9sYXIoRmEsZDIpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZG9Db2xsaXNpb24ocG9pbnREZXRhaWxzLCB3YWxsSW5kZXgpIHtcbiAgICAgICAgdmFyIHZ2ID0gdGhpcy5hc1BvbGFyKHBvaW50RGV0YWlscy52ZWxvY2l0eSk7IFxuICAgICAgICB2YXIgdmEgPSB0aGlzLmFzUG9sYXIocG9pbnREZXRhaWxzLnZlbG9jaXR5QSk7IFxuICAgICAgICB2YXIgdnZjID0gdGhpcy52ZWN0b3JDb21wb25lbnRzRm9yRGlyKHZ2LCB0aGlzLldBTExfTk9STVNbd2FsbEluZGV4XSk7XG4gICAgICAgIHZhciB2YWMgPSB0aGlzLnZlY3RvckNvbXBvbmVudHNGb3JEaXIodmEsIHRoaXMuV0FMTF9OT1JNU1t3YWxsSW5kZXhdKTtcblxuICAgICAgICB2dmMuYWxvbmcubWFnICo9IDEuMTg7IFxuICAgICAgICB2YWMuYWxvbmcubWFnICo9IDEuMTg7IFxuXG4gICAgICAgIHZ2Yy5hbG9uZy5tYWcgKj0gdGhpcy5tYXNzO1xuICAgICAgICB2YWMuYWxvbmcubWFnICo9IHRoaXMubWFzcztcblxuICAgICAgICB2dmMuYWxvbmcuZGlyICs9IHRoaXMuUEk7XG4gICAgICAgIHZhYy5hbG9uZy5kaXIgKz0gdGhpcy5QSTtcblxuICAgICAgICB2dmMudGFuZ2VudC5tYWcgKj0gMC4xODsgIFxuICAgICAgICB2YWMudGFuZ2VudC5tYWcgKj0gMC4xODtcbiAgICAgICAgdnZjLnRhbmdlbnQubWFnICo9IHRoaXMubWFzcyAgXG4gICAgICAgIHZhYy50YW5nZW50Lm1hZyAqPSB0aGlzLm1hc3NcbiAgICAgICAgdnZjLnRhbmdlbnQuZGlyICs9IHRoaXMuUEk7IFxuICAgICAgICB2YWMudGFuZ2VudC5kaXIgKz0gdGhpcy5QSTtcblxuICAgICAgICB0aGlzLmFwcGx5Rm9yY2UodnZjLmFsb25nLCBwb2ludERldGFpbHMucG9zKSAgICBcbiAgICAgICAgdGhpcy5hcHBseUZvcmNlKHZ2Yy50YW5nZW50LCBwb2ludERldGFpbHMucG9zKSAgICBcbiAgICAgICAgdGhpcy5hcHBseUZvcmNlKHZhYy5hbG9uZywgcG9pbnREZXRhaWxzLnBvcykgICAgXG4gICAgICAgIHRoaXMuYXBwbHlGb3JjZSh2YWMudGFuZ2VudCwgcG9pbnREZXRhaWxzLnBvcykgICAgXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCbG9jayIsImNsYXNzIENhbnZhcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSAxNDAwO1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSA3NTA7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICB0aGlzLmJpbmRDYW52YXNUb0RPTSgpXG4gICAgfVxuXG4gICAgYmluZENhbnZhc1RvRE9NKCkge1xuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLWNhbnZhc1wiKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhckNhbnZhcygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKHRoaXMuY2FudmFzKTtcbiAgICAgICAgdGhpcy5jYW52YXMuY2xhc3NMaXN0LmFkZChcIm1haW4tY2FudmFzXCIpXG4gICAgfVxuXG4gICAgY2xlYXJDYW52YXMoKSB7XG4gICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICByZW1vdmVDYW52YXNGcm9tRE9NKCkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW4tYm9keVwiKS5yZW1vdmVDaGlsZCh0aGlzLmNhbnZhcyk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYW52YXM7XG4iLCIvLyBpbXBvcnQgXCIuL3N0eWxlcy9pbmRleC5zY3NzXCI7XG5pbXBvcnQgQ2FudmFzIGZyb20gXCIuL2NhbnZhc1wiO1xuaW1wb3J0IFN0YWdlTG9hZGVyIGZyb20gXCIuL3N0YWdlTG9hZGVyXCI7XG5cbmNsYXNzIEFuZ2VyZWRCaXJkcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc3RhcnQgPSB0aGlzLnN0YXJ0LmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgICAgICB0aGlzLmFuaW1hdGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuY2FudmFzID0gbmV3IENhbnZhcygpO1xuICAgICAgICB0aGlzLmNhbnZhcy5iaW5kQ2FudmFzVG9ET00oKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplRW50aXRpZXMoKTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5jbGVhckNhbnZhcygpO1xuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFnZUxvYWRlci51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmludGVydmFsID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGlvbik7XG4gICAgICAgICAgICAgICAgaWYgKHRoYXQuc3RhZ2VMb2FkZXIuY2hlY2tTdGFnZVdvbigpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQud2luTGV2ZWwoKVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKHRoYXQuc3RhZ2VMb2FkZXIuY2hlY2tTdGFnZUxvc3QoKSkgdGhhdC5nYW1lT3ZlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRpb24pO1xuICAgIH1cblxuICAgIGluaXRpYWxpemVFbnRpdGllcygpIHtcbiAgICAgICAgdGhpcy5zdGFnZUxvYWRlciA9IG5ldyBTdGFnZUxvYWRlcih0aGlzLmNhbnZhcy5jdHgpO1xuICAgICAgICB0aGlzLnN0YWdlTG9hZGVyLmluaXRpYWxpemVFbnRpdGllcygpO1xuICAgICAgICB0aGlzLnN0YWdlTG9hZGVyLmluaXRpYWxpemVFdmVudExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIHdpbkxldmVsKCkge1xuICAgICAgICB0aGlzLnN0YWdlTG9hZGVyLnN0YWdlTnVtYmVyICs9IDE7XG4gICAgICAgIHRoaXMuc3RhZ2VMb2FkZXIucmVzdGFydEVudGl0aWVzKCk7XG4gICAgICAgIHRoaXMuc3RhZ2VMb2FkZXIuaW5pdGlhbGl6ZUVudGl0aWVzKCk7XG4gICAgfVxuXG4gICAgZ2FtZU92ZXIoKSB7XG4gICAgICAgIHRoaXMuc3RhZ2VMb2FkZXIucmVzdGFydEVudGl0aWVzKCk7XG4gICAgICAgIHRoaXMuc3RhZ2VMb2FkZXIuaW5pdGlhbGl6ZUVudGl0aWVzKCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBbmdlcmVkQmlyZHM7IiwiY2xhc3MgUGlnIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgsIHgsIHksIHJhZGl1cywgdmVsWCA9IDAsIHZlbFkgPSAwKSB7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLnggPSB4OyBcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy52ZWxYID0gdmVsWDtcbiAgICAgICAgdGhpcy52ZWxZID0gdmVsWTtcbiAgICAgICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XG4gICAgICAgIHRoaXMubWFzcyA9IDI7XG5cbiAgICAgICAgdGhpcy5ncmF2aXR5ID0geyB4OiAwLCB5OiAwLjEgfTtcbiAgICAgICAgdGhpcy5ncm91bmQgPSB0aGlzLmN0eC5jYW52YXMuaGVpZ2h0IC0gMjA7XG4gICAgICAgIHRoaXMuYm91bmNlID0gMC40O1xuICAgICAgICB0aGlzLmZyaWN0aW9uWCA9IDAuOTtcbiAgICAgICAgdGhpcy5tYXNzID0gMjtcbiAgICAgICAgdGhpcy5waWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5waWcuc3JjID0gXCJzcmMvaW1hZ2VzL3BlcHBhLnBuZ1wiO1xuICAgICAgICB0aGlzLnN0YXRlID0gXCJhbGl2ZVwiO1xuXG4gICAgICAgIHRoaXMucG9vZiA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB0aGlzLnBvb2Yuc3JjID0gXCJzcmMvaW1hZ2VzL3Bvb2YucG5nXCI7XG4gICAgICAgIHRoaXMuc3RhcnRUaW1lcjtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5yYWRpdXMsIDAsIChNYXRoLlBJICogMiksIGZhbHNlKTtcbiAgICAgICAgdGhpcy5jdHguY2xpcCgpO1xuICAgICAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMucGlnLCB0aGlzLnggLSB0aGlzLnJhZGl1cywgdGhpcy55IC0gdGhpcy5yYWRpdXMsIHRoaXMucmFkaXVzICogMiwgdGhpcy5yYWRpdXMgKiAyKTtcbiAgICAgICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy52ZWxYICs9IHRoaXMuZ3Jhdml0eS54O1xuICAgICAgICB0aGlzLnZlbFkgKz0gdGhpcy5ncmF2aXR5Lnk7XG4gICAgICAgIHRoaXMueCArPSB0aGlzLnZlbFg7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLnZlbFk7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy55ID49IHRoaXMuZ3JvdW5kKSB7XG4gICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmdyb3VuZCAtICh0aGlzLnkgLSB0aGlzLmdyb3VuZCk7XG4gICAgICAgICAgICB0aGlzLnZlbFkgPSAtTWF0aC5hYnModGhpcy52ZWxZKSAqIHRoaXMuYm91bmNlO1xuICAgICAgICAgICAgaWYgKHRoaXMudmVsWSA+PSB0aGlzLmdyYXZpdHkueSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVsWSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5ncm91bmQgLSB0aGlzLmdyYXZpdHkueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnZlbFggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWxYIC09IHRoaXMuZnJpY3Rpb25YO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudmVsWCA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlbFggKz0gdGhpcy5mcmljdGlvblg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3RvcHMgYmFsbCBmcm9tIGJvdW5jaW5nIGluIFkgYXhpc1xuICAgICAgICBpZiAodGhpcy52ZWxZPDAgJiYgdGhpcy52ZWxZPi0yLjEpIHtcbiAgICAgICAgICAgIHRoaXMudmVsWSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3RvcHMgYmFsbCBmcm9tIG1vdmluZyBvbiBYIGF4aXMgaWYgeC12ZWxvY2l0eSA8IDEuMVxuICAgICAgICBpZiAoTWF0aC5hYnModGhpcy52ZWxYKSA8IDEuMSkge1xuICAgICAgICAgICAgdGhpcy52ZWxYID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBvb2ZBbmltYXRpb25UaW1lckJvb2xlYW4oKSB7XG4gICAgICAgIHRoaXMucGlnLnNyYyA9IFwic3JjL2ltYWdlcy9wb29mLnBuZ1wiO1xuICAgICAgICB0aGlzLnJhZGl1cyA9IDM1O1xuXG4gICAgICAgIHZhciB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRUaW1lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0VGltZXIgPSB0aW1lc3RhbXA7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZWxhcHNlZCA9IHRpbWVzdGFtcCAtIHRoaXMuc3RhcnRUaW1lcjtcbiAgICAgICAgaWYgKGVsYXBzZWQgPiAzMDAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQaWc7IiwiaW1wb3J0IEJpcmQgZnJvbSBcIi4vYmlyZFwiO1xuY2xhc3MgUHJvamVjdGlsZSB7XG4gICAgY29uc3RydWN0b3IoY3R4LCBiaXJkUHJvcGVydGllcykge1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5sYXVuY2hlZE9iamVjdHMgPSBbXTtcbiAgICAgICAgdGhpcy5tYXggPSAxO1xuICAgICAgICB0aGlzLmJpcmRQcm9wZXJ0aWVzID0gYmlyZFByb3BlcnRpZXM7XG4gICAgICAgIHRoaXMucHJvamVjdGlsZUltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMucHJvamVjdGlsZUltYWdlLnNyYyA9IFwic3JjL2ltYWdlcy9zbGluZ1MucG5nXCI7XG4gICAgICAgIHRoaXMubGl2ZXMgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5saXZlcy5zcmMgPSBcInNyYy9pbWFnZXMvYW5nZXJlZC1iaXJkeS5wbmdcIlxuICAgIH1cblxuICAgIGtpY2tPZmZMYXVuY2hEaXJlY3Rpb24oYW5nbGVWYWwsIG1hZ25pdHVkZVZhbCkge1xuICAgICAgICBsZXQgYW5nbGUgPSBNYXRoLlBJKiBhbmdsZVZhbCAvMTgwO1xuICAgICAgICB0aGlzLmN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0ID0gbmV3IEJpcmQodGhpcy5jdHgsIHRoaXMuYmlyZFByb3BlcnRpZXMpO1xuICAgICAgICB0aGlzLm9iamVjdExhdW5jaGVkID0gbmV3IE9iamVjdExhdW5jaCh0aGlzLmN0eCwgdGhpcy5jdXJyZW50UHJvamVjdGlsZU9iamVjdCk7XG4gICAgICAgIHRoaXMub2JqZWN0TGF1bmNoZWQub2JqZWN0VHlwZS52ZWxZID0tIG1hZ25pdHVkZVZhbCAqIE1hdGguc2luKGFuZ2xlKTtcbiAgICAgICAgdGhpcy5vYmplY3RMYXVuY2hlZC5vYmplY3RUeXBlLnZlbFggPSBtYWduaXR1ZGVWYWwgKiBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgIHRoaXMub2JqZWN0TGF1bmNoZWQub2JqZWN0VHlwZS50cmFuc2ZlciA9IDAuODtcbiAgICAgICAgdGhpcy5sYXVuY2hlZE9iamVjdHMucHVzaCh0aGlzLm9iamVjdExhdW5jaGVkKTtcbiAgICAgICAgdGhpcy51cGRhdGVMaXZlcygpO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubGF1bmNoZWRPYmplY3RzLmxlbmd0aCA+IHRoaXMubWF4KSB7XG4gICAgICAgICAgICB0aGlzLmxhdW5jaGVkT2JqZWN0cyA9IHRoaXMubGF1bmNoZWRPYmplY3RzLnNwbGljZSgxKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGF1bmNoZWRPYmplY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudE9iamVjdCA9IHRoaXMubGF1bmNoZWRPYmplY3RzW2ldLm9iamVjdFR5cGU7XG4gICAgICAgICAgICBjdXJyZW50T2JqZWN0LnZlbFkgKz0gMS41MztcbiAgICAgICAgICAgIGN1cnJlbnRPYmplY3QueCArPSBjdXJyZW50T2JqZWN0LnZlbFggLyAzO1xuICAgICAgICAgICAgY3VycmVudE9iamVjdC55ICs9IGN1cnJlbnRPYmplY3QudmVsWSAvIDM7XG4gICAgICAgIFxuICAgICAgICAgICAgdGhpcy5sYXVuY2hlZE9iamVjdHNbaV0udXBkYXRlQ3VycmVudExhdW5jaGVkT2JqZWN0KClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMucHJvamVjdGlsZUltYWdlLCB0aGlzLmJpcmRQcm9wZXJ0aWVzLnggLSAzMCwgdGhpcy5iaXJkUHJvcGVydGllcy55IC0gNTAsIDc1LCAxNDApO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGF1bmNoZWRPYmplY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudEJpcmQgPSB0aGlzLmxhdW5jaGVkT2JqZWN0c1tpXS5vYmplY3RUeXBlO1xuICAgICAgICAgICAgY3VycmVudEJpcmQucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVMaXZlcygpIHtcbiAgICAgICAgdGhpcy5iaXJkUHJvcGVydGllcy5wbGF5ZXJMaXZlcyAtPSAxXG4gICAgfVxuXG4gICAgcmVuZGVyTGl2ZXMoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAxMDsgaSA8IHRoaXMuYmlyZFByb3BlcnRpZXMucGxheWVyTGl2ZXMgKiA1MDsgaSs9NTApIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMubGl2ZXMsIGkgLCA1MCwgMzAsIDMwKVxuICAgICAgICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsb3N0QWxsUHJvamVjdGlsZU9iamVjdHMoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5iaXJkUHJvcGVydGllcy5wbGF5ZXJMaXZlcyA9PT0gMCAmJiB0aGlzLmN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnN0YXRlID09PSBcImVuZFN0YXRlXCIpO1xuICAgIH1cbn1cblxuY2xhc3MgT2JqZWN0TGF1bmNoIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgsIG9iamVjdFR5cGUpIHtcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMub2JqZWN0VHlwZSA9IG9iamVjdFR5cGU7XG4gICAgfVxuXG4gICAgcmVuZGVyT2JqZWN0TGF1bmNoKCkge1xuICAgICAgICB0aGlzLm9iamVjdFR5cGUucmVuZGVyKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlQ3VycmVudExhdW5jaGVkT2JqZWN0KCkge1xuICAgICAgICBsZXQgY3VycmVudE9iamVjdCA9IHRoaXMub2JqZWN0VHlwZTtcbiAgICAgICAgY3VycmVudE9iamVjdC52ZWxYICs9IGN1cnJlbnRPYmplY3QuZ3Jhdml0eS54O1xuICAgICAgICBjdXJyZW50T2JqZWN0LnZlbFkgKz0gY3VycmVudE9iamVjdC5ncmF2aXR5Lnk7XG4gICAgICAgIGN1cnJlbnRPYmplY3QueCArPSBjdXJyZW50T2JqZWN0LnZlbFg7XG4gICAgICAgIGN1cnJlbnRPYmplY3QueSArPSBjdXJyZW50T2JqZWN0LnZlbFk7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRPYmplY3QueSA+PSBjdXJyZW50T2JqZWN0Lmdyb3VuZCkge1xuICAgICAgICAgICAgY3VycmVudE9iamVjdC55ID0gY3VycmVudE9iamVjdC5ncm91bmQgLSAoY3VycmVudE9iamVjdC55IC0gY3VycmVudE9iamVjdC5ncm91bmQpO1xuICAgICAgICAgICAgY3VycmVudE9iamVjdC52ZWxZID0gLU1hdGguYWJzKGN1cnJlbnRPYmplY3QudmVsWSkgKiBjdXJyZW50T2JqZWN0LmJvdW5jZTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50T2JqZWN0LnZlbFkgPj0gY3VycmVudE9iamVjdC5ncmF2aXR5LnkpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50T2JqZWN0LnZlbFkgPSAwO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRPYmplY3QueSA9IGN1cnJlbnRPYmplY3QuZ3JvdW5kIC0gY3VycmVudE9iamVjdC5ncmF2aXR5Lnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY3VycmVudE9iamVjdC52ZWxYID4gMCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRPYmplY3QudmVsWCAtPSBjdXJyZW50T2JqZWN0LmZyaWN0aW9uWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjdXJyZW50T2JqZWN0LnZlbFggPCAwKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudE9iamVjdC52ZWxYICs9IGN1cnJlbnRPYmplY3QuZnJpY3Rpb25YO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHN0b3BzIGJhbGwgZnJvbSBib3VuY2luZyBpbiBZIGF4aXNcbiAgICAgICAgaWYgKCBjdXJyZW50T2JqZWN0LnkgPj0gY3VycmVudE9iamVjdC5ncm91bmQgLSAxMCkge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRPYmplY3QudmVsWSA8PSAwICYmIGN1cnJlbnRPYmplY3QudmVsWSA+IC0yLjUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50T2JqZWN0LnZlbFkgPSAwO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRPYmplY3Quc3RhdGUgPSBcImVuZFN0YXRlXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3RvcHMgYmFsbCBmcm9tIG1vdmluZyBvbiBYIGF4aXMgXG4gICAgICAgIGlmIChNYXRoLmFicyhjdXJyZW50T2JqZWN0LnZlbFgpIDwgMS4xKSB7XG4gICAgICAgICAgICBjdXJyZW50T2JqZWN0LnZlbFggPSAwO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RpbGU7IiwiaW1wb3J0IFBpZyBmcm9tIFwiLi9waWdcIjtcbmltcG9ydCBCbG9jayBmcm9tIFwiLi9ibG9ja1wiO1xuaW1wb3J0IFByb2plY3RpbGUgZnJvbSBcIi4vcHJvamVjdGlsZVwiO1xuaW1wb3J0IHtzdGFnZUtleXN9IGZyb20gXCIuL3N0YWdlcy9zdGFnZUtleXNcIjtcbmltcG9ydCB7Y2hlY2tCaXJkT25QaWdDb2xsaXNpb24sIGNoZWNrQmlyZE9uQmxvY2tDb2xsaXNpb259IGZyb20gXCIuL3V0aWwvY29sbGlzaW9uRGV0ZWN0aW9uVXRpbFwiO1xuaW1wb3J0IHtiaXJkT25QaWdDb2xsaXNpb25Mb2dpYywgYmlyZE9uQmxvY2tDb2xsaXNpb25Mb2dpY30gZnJvbSBcIi4vdXRpbC9jb2xsaXNpb25Mb2dpY1V0aWxcIjtcbmltcG9ydCB7Y2hlY2tCaXJkQW5kUGlnU3RhdGV9IGZyb20gXCIuL3V0aWwvc3RhdGVMb2dpY1wiO1xuXG5jbGFzcyBTdGFnZUxvYWRlciB7XG4gICAgY29uc3RydWN0b3IoY3R4KSB7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGN0eC5jYW52YXM7XG4gICAgICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgICAgICB0aGlzLnN0YWdlTnVtYmVyID0gMTtcbiAgICAgICAgdGhpcy5zdGFydFBvc0JpcmQgPSBbXTtcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlT2JqZWN0ID0ge307XG4gICAgICAgIHRoaXMucGlncyA9IFtdO1xuICAgICAgICB0aGlzLmJsb2NrcyA9IFtdO1xuICAgIH1cbiAgICBcbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlRW50aXRpZXMoKTtcbiAgICAgICAgaWYgKHRoaXMucHJvamVjdGlsZU9iamVjdC5vYmplY3RMYXVuY2hlZCkgdGhpcy5jaGVja0FuZFVwZGF0ZUVudGl0aWVzQ29sbGlzaW9uKCk7XG4gICAgICAgIHRoaXMucmVuZGVyRW50aXRpZXMoKTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXplRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGNvbnN0IG1vdXNlID0ge1xuICAgICAgICAgICAgeDogdGhpcy5jYW52YXMud2lkdGgvMixcbiAgICAgICAgICAgIHk6IHRoaXMuY2FudmFzLmhlaWdodC8yLFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaWYgKCh0aGlzLnByb2plY3RpbGVPYmplY3QubGF1bmNoZWRPYmplY3RzLmxlbmd0aCA9PT0gMCkgfHwgdGhpcy5wcm9qZWN0aWxlT2JqZWN0LmN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnN0YXRlID09PSBcImVuZFN0YXRlXCIpe1xuICAgICAgICAgICAgICAgIGxldCBjYW52YXNQcm9wZXJ0aWVzID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgbW91c2UueCA9IGUueCAtIGNhbnZhc1Byb3BlcnRpZXMubGVmdDtcbiAgICAgICAgICAgICAgICBtb3VzZS55ID0gZS55IC0gY2FudmFzUHJvcGVydGllcy50b3A7XG4gICAgICAgICAgICAgICAgbGV0IGRlbHRhWCA9IG1vdXNlLnggLSB0aGlzLnN0YXJ0UG9zQmlyZFswXTtcbiAgICAgICAgICAgICAgICBsZXQgZGVsdGFZID0gbW91c2UueSAtIHRoaXMuc3RhcnRQb3NCaXJkWzFdO1xuICAgICAgICAgICAgICAgIGxldCB0aGV0YVJhZGlhbiA9IE1hdGguYXRhbjIoZGVsdGFZLCBkZWx0YVgpO1xuICAgICAgICAgICAgICAgIGxldCBhbmdsZVZhbCA9IC0oKE1hdGguYWJzKHRoZXRhUmFkaWFuICogMTgwIC8gTWF0aC5QSSkgLSAyNzApICUgOTApO1xuICAgICAgICAgICAgICAgIGxldCBtYWduaXR1ZGVWYWwgPSAoTWF0aC5hYnMobW91c2UueCAtIDEzMCkgLyAyKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2plY3RpbGVPYmplY3Qua2lja09mZkxhdW5jaERpcmVjdGlvbihhbmdsZVZhbCAsIG1hZ25pdHVkZVZhbClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgIH1cblxuICAgIGluaXRpYWxpemVFbnRpdGllcygpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFN0YWdlVmFsdWVzID0gc3RhZ2VLZXlzW3RoaXMuc3RhZ2VOdW1iZXJdO1xuICAgICAgICB0aGlzLmxvYWRTdGFnZShjdXJyZW50U3RhZ2VWYWx1ZXMpO1xuICAgIH1cblxuICAgIHJlc3RhcnRFbnRpdGllcygpIHtcbiAgICAgICAgdGhpcy5zY29yZSA9IDA7XG4gICAgICAgIHRoaXMuc3RhcnRQb3NCaXJkID0gW107XG4gICAgICAgIHRoaXMucHJvamVjdGlsZU9iamVjdC5iaXJkUHJvcGVydGllcy5wbGF5ZXJMaXZlcyA9IHRoaXMuc3RhcnRpbmdMaXZlcztcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlT2JqZWN0ID0ge307XG4gICAgICAgIHRoaXMucGlncyA9IFtdO1xuICAgICAgICB0aGlzLmJsb2NrcyA9IFtdO1xuICAgIH1cblxuICAgIGxvYWRTdGFnZShjdXJyZW50U3RhZ2VWYWx1ZXMpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlT2JqZWN0ID0gbmV3IFByb2plY3RpbGUodGhpcy5jdHgsIGN1cnJlbnRTdGFnZVZhbHVlc1tcImJpcmRQcm9wZXJ0aWVzXCJdKTtcbiAgICAgICAgdGhpcy5zdGFydGluZ0xpdmVzID0gY3VycmVudFN0YWdlVmFsdWVzW1wiYmlyZFByb3BlcnRpZXNcIl0ucGxheWVyTGl2ZXM7XG4gICAgICAgIHRoaXMuc3RhcnRQb3NCaXJkID0gW2N1cnJlbnRTdGFnZVZhbHVlc1tcImJpcmRQcm9wZXJ0aWVzXCJdLngsIGN1cnJlbnRTdGFnZVZhbHVlc1tcImJpcmRQcm9wZXJ0aWVzXCJdLnldXG4gICAgICAgIHRoaXMuY3VycmVudExldmVsSGlnaFNjb3JlS2V5ID0gY3VycmVudFN0YWdlVmFsdWVzW1wiY3VycmVudExldmVsSGlnaFNjb3JlS2V5XCJdO1xuXG4gICAgICAgIGxldCBoaWdoU2NvcmVTYXZlS2V5U3RyaW5nID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5jdXJyZW50TGV2ZWxIaWdoU2NvcmVLZXkpO1xuICAgICAgICBpZiAoaGlnaFNjb3JlU2F2ZUtleVN0cmluZyA9PT0gbnVsbCl7XG4gICAgICAgICAgICB0aGlzLmhpZ2hTY29yZSA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpZ2hTY29yZSA9IHBhcnNlSW50KGhpZ2hTY29yZVNhdmVLZXlTdHJpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJudW1iZXJPZlBpZ3NcIl07IGkrKykge1xuICAgICAgICAgICAgdGhpcy5waWdzLnB1c2gobmV3IFBpZyhcbiAgICAgICAgICAgICAgICB0aGlzLmN0eCwgXG4gICAgICAgICAgICAgICAgY3VycmVudFN0YWdlVmFsdWVzW1wicGlnUHJvcGVydGllc1wiXVtpXS54LCBcbiAgICAgICAgICAgICAgICBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJwaWdQcm9wZXJ0aWVzXCJdW2ldLnksIFxuICAgICAgICAgICAgICAgIGN1cnJlbnRTdGFnZVZhbHVlc1tcInBpZ1Byb3BlcnRpZXNcIl1baV0ucmFkKSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnRTdGFnZVZhbHVlc1tcIm51bWJlck9mQmxvY2tzXCJdOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tzLnB1c2gobmV3IEJsb2NrKFxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LCBcbiAgICAgICAgICAgICAgICBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJibG9ja1Byb3Blcml0ZXNcIl1baV0ueCwgXG4gICAgICAgICAgICAgICAgY3VycmVudFN0YWdlVmFsdWVzW1wiYmxvY2tQcm9wZXJpdGVzXCJdW2ldLnksXG4gICAgICAgICAgICAgICAgY3VycmVudFN0YWdlVmFsdWVzW1wiYmxvY2tQcm9wZXJpdGVzXCJdW2ldLncsXG4gICAgICAgICAgICAgICAgY3VycmVudFN0YWdlVmFsdWVzW1wiYmxvY2tQcm9wZXJpdGVzXCJdW2ldLmgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUVudGl0aWVzKCkge1xuICAgICAgICB0aGlzLnByb2plY3RpbGVPYmplY3QudXBkYXRlKClcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBpZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucGlnc1tpXS51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYmxvY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmJsb2Nrc1tpXS51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcm9qZWN0aWxlT2JqZWN0LmN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0KSB0aGlzLnVwZGF0ZVBpZ3NMZWZ0KCk7XG4gICAgICAgIHRoaXMudXBkYXRlSGlnaFNjb3JlKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlSGlnaFNjb3JlKCkge1xuICAgICAgICBpZiAodGhpcy5zY29yZSA+IHRoaXMuaGlnaFNjb3JlKSB7XG4gICAgICAgICAgICB0aGlzLmhpZ2hTY29yZSA9IHRoaXMuc2NvcmU7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmN1cnJlbnRMZXZlbEhpZ2hTY29yZUtleSwgdGhpcy5oaWdoU2NvcmUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlUGlnc0xlZnQoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5waWdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoY2hlY2tCaXJkQW5kUGlnU3RhdGUodGhpcy5wcm9qZWN0aWxlT2JqZWN0LmN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnN0YXRlLCB0aGlzLnBpZ3NbaV0uc3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGlnc1tpXS5wb29mQW5pbWF0aW9uVGltZXJCb29sZWFuKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWdzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja0FuZFVwZGF0ZUVudGl0aWVzQ29sbGlzaW9uKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGlncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGNoZWNrQmlyZE9uUGlnQ29sbGlzaW9uKHRoaXMucHJvamVjdGlsZU9iamVjdC5jdXJyZW50UHJvamVjdGlsZU9iamVjdCwgdGhpcy5waWdzW2ldKSkge1xuICAgICAgICAgICAgICAgIGJpcmRPblBpZ0NvbGxpc2lvbkxvZ2ljKHRoaXMucHJvamVjdGlsZU9iamVjdC5jdXJyZW50UHJvamVjdGlsZU9iamVjdCwgdGhpcy5waWdzW2ldKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3JlICs9IDMwMDA7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ibG9ja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjaGVja0JpcmRPbkJsb2NrQ29sbGlzaW9uKHRoaXMucHJvamVjdGlsZU9iamVjdC5jdXJyZW50UHJvamVjdGlsZU9iamVjdCwgdGhpcy5ibG9ja3NbaV0pKSB7XG4gICAgICAgICAgICAgICAgYmlyZE9uQmxvY2tDb2xsaXNpb25Mb2dpYyh0aGlzLnByb2plY3RpbGVPYmplY3QuY3VycmVudFByb2plY3RpbGVPYmplY3QsIHRoaXMuYmxvY2tzW2ldKVxuICAgICAgICAgICAgICAgIHRoaXMuc2NvcmUgKz0gMzI1O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyRW50aXRpZXMoKSB7XG4gICAgICAgIHRoaXMucHJvamVjdGlsZU9iamVjdC5yZW5kZXIoKTtcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlT2JqZWN0LnJlbmRlckxpdmVzKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5waWdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnBpZ3NbaV0ucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJsb2Nrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5ibG9ja3NbaV0ucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW5kZXJTY29yZSgpO1xuICAgICAgICB0aGlzLnJlbmRlckhpZ2hTY29yZSgpO1xuICAgICAgICB0aGlzLnJlbmRlclN0YWdlTnVtYmVyKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyU2NvcmUoKSB7IFxuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcInJpZ2h0XCI7XG4gICAgICAgIHRoaXMuY3R4LnRleHRCYXNlbGluZSA9IFwidG9wXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiV0hJVEVcIjtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIkJMQUNLXCI7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSA1MCArIFwicHggQmFuZ2Vyc1wiO1xuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCh0aGlzLnNjb3JlLCB0aGlzLmNhbnZhcy53aWR0aCAtIDMwIC8gMiwgMClcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dCh0aGlzLnNjb3JlLCB0aGlzLmNhbnZhcy53aWR0aCAtIDMwIC8gMiwgMCk7XG5cbiAgICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gXCJyaWdodFwiO1xuICAgICAgICB0aGlzLmN0eC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIldISVRFXCI7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCJCTEFDS1wiO1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gNTAgKyBcInB4IEJhbmdlcnNcIjtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dChcIlNjb3JlOiAgICAgICAgICAgICAgICAgICAgICBcIiwgdGhpcy5jYW52YXMud2lkdGggLSAzMCAvIDIsIDApO1xuICAgIH1cblxuICAgIHJlbmRlckhpZ2hTY29yZSgpIHtcbiAgICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gXCJyaWdodFwiO1xuICAgICAgICB0aGlzLmN0eC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIldISVRFXCI7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCJCTEFDS1wiO1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gNTAgKyBcInB4IEJhbmdlcnNcIjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQodGhpcy5oaWdoU2NvcmUsIHRoaXMuY2FudmFzLndpZHRoIC0gMzAgLyAyLCA2MCk7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVRleHQodGhpcy5oaWdoU2NvcmUsIHRoaXMuY2FudmFzLndpZHRoIC0gMzAgLyAyLCA2MCk7XG5cbiAgICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gXCJyaWdodFwiO1xuICAgICAgICB0aGlzLmN0eC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIldISVRFXCI7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCJCTEFDS1wiO1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gNTAgKyBcInB4IEJhbmdlcnNcIjtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dChcIkhpZ2hzY29yZTogICAgICAgICAgICAgICAgICAgICAgXCIsIHRoaXMuY2FudmFzLndpZHRoIC0gMzAgLyAyLCA2MCk7XG4gICAgfVxuXG4gICAgcmVuZGVyU3RhZ2VOdW1iZXIoKSB7XG4gICAgICAgIHRoaXMuY3R4LnRleHRBbGlnbiA9IFwibGVmdFwiO1xuICAgICAgICB0aGlzLmN0eC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIldISVRFXCI7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCJCTEFDS1wiO1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gMzAgKyBcInB4IEJhbmdlcnNcIjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJMZXZlbCBcIiArIHRoaXMuc3RhZ2VOdW1iZXIsIDEwLCAxMClcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dChcIkxldmVsIFwiICsgdGhpcy5zdGFnZU51bWJlciwgIDEwLCAxMCk7XG4gICAgfVxuXG4gICAgY2hlY2tTdGFnZUxvc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2plY3RpbGVPYmplY3QubG9zdEFsbFByb2plY3RpbGVPYmplY3RzKClcbiAgICB9XG5cbiAgICBjaGVja1N0YWdlV29uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5waWdzLmxlbmd0aCA9PT0gMDsgXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdGFnZUxvYWRlcjsiLCJleHBvcnQgY29uc3Qgc3RhZ2VLZXlzID0ge1xuICAgIDEgOiB7XG4gICAgICAgIFwiY3VycmVudExldmVsSGlnaFNjb3JlS2V5XCI6IFwiaGlnaFNjb3JlS2V5TGV2ZWwxXCIsXG4gICAgICAgIFwibnVtYmVyT2ZQaWdzXCI6IDIsXG4gICAgICAgIFwicGlnUHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICAwIDoge1xuICAgICAgICAgICAgICAgIHg6IDUwMCxcbiAgICAgICAgICAgICAgICB5OiA2MDAsXG4gICAgICAgICAgICAgICAgcmFkOiAxNSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAxIDoge1xuICAgICAgICAgICAgICAgIHg6IDMwMCxcbiAgICAgICAgICAgICAgICB5OiA2MDAsXG4gICAgICAgICAgICAgICAgcmFkOiAxNSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJudW1iZXJPZkJsb2Nrc1wiOiAyLFxuICAgICAgICBcImJsb2NrUHJvcGVyaXRlc1wiOiB7XG4gICAgICAgICAgICAwIDoge1xuICAgICAgICAgICAgICAgIHg6IDEwMDAsXG4gICAgICAgICAgICAgICAgeTogNzAwLFxuICAgICAgICAgICAgICAgIHc6IDMwLFxuICAgICAgICAgICAgICAgIGg6IDEwMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAxOiB7XG4gICAgICAgICAgICAgICAgeDogNzAwLFxuICAgICAgICAgICAgICAgIHk6IDcwMCxcbiAgICAgICAgICAgICAgICB3OiA1MCxcbiAgICAgICAgICAgICAgICBoOiAxNDAsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiYmlyZFByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgcGxheWVyTGl2ZXM6IDMsXG4gICAgICAgICAgICB4OiAxMjAsXG4gICAgICAgICAgICB5OiA2MzAsXG4gICAgICAgICAgICByYWQ6IDE0LFxuICAgICAgICB9XG4gICAgfSxcbiAgICAyIDoge1xuICAgICAgICBcImN1cnJlbnRMZXZlbEhpZ2hTY29yZUtleVwiOiBcImhpZ2hTY29yZUtleUxldmVsMlwiLFxuICAgICAgICBcIm51bWJlck9mUGlnc1wiOiAzLFxuICAgICAgICBcInBpZ1Byb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgMCA6IHtcbiAgICAgICAgICAgICAgICB4OiA1MDAsXG4gICAgICAgICAgICAgICAgeTogNjAwLFxuICAgICAgICAgICAgICAgIHJhZDogMTUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgMSA6IHtcbiAgICAgICAgICAgICAgICB4OiAxMjAwLFxuICAgICAgICAgICAgICAgIHk6IDYwMCxcbiAgICAgICAgICAgICAgICByYWQ6IDE1LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIDIgOiB7XG4gICAgICAgICAgICAgICAgeDogNzAwLFxuICAgICAgICAgICAgICAgIHk6IDYwMCxcbiAgICAgICAgICAgICAgICByYWQ6IDE1LFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIm51bWJlck9mQmxvY2tzXCI6IDIsXG4gICAgICAgIFwiYmxvY2tQcm9wZXJpdGVzXCI6IHtcbiAgICAgICAgICAgIDAgOiB7XG4gICAgICAgICAgICAgICAgeDogNDAwLFxuICAgICAgICAgICAgICAgIHk6IDcwMCxcbiAgICAgICAgICAgICAgICB3OiAzMCxcbiAgICAgICAgICAgICAgICBoOiAxMDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgMToge1xuICAgICAgICAgICAgICAgIHg6IDEwMDAsXG4gICAgICAgICAgICAgICAgeTogNzAwLFxuICAgICAgICAgICAgICAgIHc6IDUwLFxuICAgICAgICAgICAgICAgIGg6IDE0MCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJiaXJkUHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICBwbGF5ZXJMaXZlczogMyxcbiAgICAgICAgICAgIHg6IDEyMCxcbiAgICAgICAgICAgIHk6IDYzMCxcbiAgICAgICAgICAgIHJhZDogMTQsXG4gICAgICAgIH1cbiAgICB9XG59IiwiZXhwb3J0IGNvbnN0IGNoZWNrQmlyZE9uUGlnQ29sbGlzaW9uID0gKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LCBwaWcpID0+IHtcbiAgICBpZiAoY3VycmVudFByb2plY3RpbGVPYmplY3QueCArIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnJhZGl1cyArIHBpZy5yYWRpdXMgPiBwaWcueFxuICAgICAgICAmJiBjdXJyZW50UHJvamVjdGlsZU9iamVjdC54IDwgcGlnLnggKyBjdXJyZW50UHJvamVjdGlsZU9iamVjdC5yYWRpdXMgKyBwaWcucmFkaXVzXG4gICAgICAgICYmIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnkgKyBjdXJyZW50UHJvamVjdGlsZU9iamVjdC5yYWRpdXMgKyBwaWcucmFkaXVzID4gcGlnLnlcbiAgICAgICAgJiYgY3VycmVudFByb2plY3RpbGVPYmplY3QueSA8IHBpZy55ICsgY3VycmVudFByb2plY3RpbGVPYmplY3QucmFkaXVzICsgcGlnLnJhZGl1cykgXG4gICAge1xuICAgICAgICAvLyBweXRoYWdvcmVhbSB0aGVvcmVtIHRvIGJlIG1vcmUgZXhhY3Qgb24gY29sbGlzaW9uXG4gICAgICAgIGxldCBkaXN0YW5jZSA9IE1hdGguc3FydChcbiAgICAgICAgICAgICAgICAoKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnggLSBwaWcueCkgKiAoY3VycmVudFByb2plY3RpbGVPYmplY3QueCAtIHBpZy54KSlcbiAgICAgICAgICAgICsgKChjdXJyZW50UHJvamVjdGlsZU9iamVjdC55IC0gcGlnLnkpICogKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnkgLSBwaWcueSkpXG4gICAgICAgIClcbiAgICAgICAgcmV0dXJuIGRpc3RhbmNlIDwgY3VycmVudFByb2plY3RpbGVPYmplY3QucmFkaXVzICsgcGlnLnJhZGl1czsgXG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgY2hlY2tCaXJkT25CbG9ja0NvbGxpc2lvbiA9IChjdXJyZW50UHJvamVjdGlsZU9iamVjdCwgYmxvY2spID0+IHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDQ7IGorKyl7XG4gICAgICAgIGNvbnN0IGNpcmNsZUNlbnRlciA9IFtjdXJyZW50UHJvamVjdGlsZU9iamVjdC54LCBjdXJyZW50UHJvamVjdGlsZU9iamVjdC55XTtcbiAgICAgICAgaWYgKGogKyAxID09PSA0KSB7XG4gICAgICAgICAgICBpZiAoY2hlY2tCaXJkSW50ZXJjZXB0QmxvY2soYmxvY2suZ2V0UG9pbnQoaiksIGJsb2NrLmdldFBvaW50KDApLCBjaXJjbGVDZW50ZXIsIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnJhZGl1cykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjaGVja0JpcmRJbnRlcmNlcHRCbG9jayhibG9jay5nZXRQb2ludChqKSwgYmxvY2suZ2V0UG9pbnQoaiArIDEpLCBjaXJjbGVDZW50ZXIsIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnJhZGl1cykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuY29uc3QgY2hlY2tCaXJkSW50ZXJjZXB0QmxvY2sgPSAocG9pbnRBLCBwb2ludEIsIGNpcmNsZUNlbnRlciwgcmFkaXVzKSA9PiB7XG4gICAgbGV0IGRpc3Q7XG4gICAgY29uc3QgdmVsMVggPSBwb2ludEIucG9zLnggLSBwb2ludEEucG9zLng7XG4gICAgY29uc3QgdmVsMVkgPSBwb2ludEIucG9zLnkgLSBwb2ludEEucG9zLnk7XG4gICAgY29uc3QgdmVsMlggPSBjaXJjbGVDZW50ZXJbMF0gLSBwb2ludEEucG9zLng7XG4gICAgY29uc3QgdmVsMlkgPSBjaXJjbGVDZW50ZXJbMV0gLSBwb2ludEEucG9zLnk7XG4gICAgY29uc3QgdW5pdCA9ICh2ZWwyWCAqIHZlbDFYICsgdmVsMlkgKiB2ZWwxWSkgLyAodmVsMVkgKiB2ZWwxWSArIHZlbDFYICogdmVsMVgpO1xuICAgIGlmICh1bml0ID49IDAgJiYgdW5pdCA8PSAxKXtcbiAgICAgICAgZGlzdCA9IChwb2ludEEucG9zLnggICsgdmVsMVggKiB1bml0IC0gY2lyY2xlQ2VudGVyWzBdKSAqKiAyICsgKHBvaW50QS5wb3MueSArIHZlbDFZICogdW5pdCAtIGNpcmNsZUNlbnRlclsxXSkgKiogMjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBkaXN0ID0gdW5pdCA8IDAgPyBcbiAgICAgICAgICAgIChwb2ludEEucG9zLnggLSBjaXJjbGVDZW50ZXJbMF0pICoqIDIgKyAocG9pbnRBLnBvcy55IC0gY2lyY2xlQ2VudGVyWzFdKSAqKiAyIDpcbiAgICAgICAgICAgIChwb2ludEIucG9zLnggLSBjaXJjbGVDZW50ZXJbMF0pICoqIDIgKyAocG9pbnRCLnBvcy55IC0gY2lyY2xlQ2VudGVyWzFdKSAqKiAyO1xuICAgIH1cbiAgICByZXR1cm4gZGlzdCA8IHJhZGl1cyAqIHJhZGl1cztcbn1cblxuXG5cblxuXG4iLCJleHBvcnQgY29uc3QgYmlyZE9uUGlnQ29sbGlzaW9uTG9naWMgPSAoY3VycmVudFByb2plY3RpbGVPYmplY3QsIHBpZykgPT4ge1xuICAgIHBpZy5zdGF0ZSA9IFwiZGVhZFwiO1xuICAgIGxldCBuZXdWZWxYMSA9IChjdXJyZW50UHJvamVjdGlsZU9iamVjdC52ZWxYICogKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0Lm1hc3MgLSBwaWcubWFzcykgKyAoIDIgKiBwaWcubWFzcyAqIHBpZy52ZWxYKSkgLyAoY3VycmVudFByb2plY3RpbGVPYmplY3QubWFzcyArIHBpZy5tYXNzKTtcbiAgICBsZXQgbmV3VmVsWTEgPSAoY3VycmVudFByb2plY3RpbGVPYmplY3QudmVsWSAqIChjdXJyZW50UHJvamVjdGlsZU9iamVjdC5tYXNzIC0gcGlnLm1hc3MpICsgKCAyICogcGlnLm1hc3MgKiBwaWcudmVsWSkpIC8gKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0Lm1hc3MgKyBwaWcubWFzcyk7XG4gICAgbGV0IG5ld1ZlbFgyID0gKHBpZy52ZWxYICogKHBpZy5tYXNzIC0gY3VycmVudFByb2plY3RpbGVPYmplY3QubWFzcykgKyAoMiAqIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0Lm1hc3MgKiBjdXJyZW50UHJvamVjdGlsZU9iamVjdC52ZWxYKSkgLyAoY3VycmVudFByb2plY3RpbGVPYmplY3QubWFzcyArIHBpZy5tYXNzKTtcbiAgICBsZXQgbmV3VmVsWTIgPSAocGlnLnZlbFkgKiAocGlnLm1hc3MgLSBjdXJyZW50UHJvamVjdGlsZU9iamVjdC5tYXNzKSArICgyICogY3VycmVudFByb2plY3RpbGVPYmplY3QubWFzcyAqIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFkpKSAvIChjdXJyZW50UHJvamVjdGlsZU9iamVjdC5tYXNzICsgcGlnLm1hc3MpO1xuICAgIFxuICAgIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFggPSAtY3VycmVudFByb2plY3RpbGVPYmplY3QudmVsWDtcbiAgICBjdXJyZW50UHJvamVjdGlsZU9iamVjdC52ZWxZID0gLWN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFk7XG4gICAgcGlnLnZlbFggPSBuZXdWZWxYMjtcbiAgICBwaWcudmVsWSA9IG5ld1ZlbFkyO1xuXG4gICAgY3VycmVudFByb2plY3RpbGVPYmplY3QueCA9IGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnggKyBuZXdWZWxYMTtcbiAgICBjdXJyZW50UHJvamVjdGlsZU9iamVjdC55ID0gY3VycmVudFByb2plY3RpbGVPYmplY3QueSArIG5ld1ZlbFkxO1xuICAgIHBpZy54ID0gcGlnLnggKyBuZXdWZWxYMjtcbiAgICBwaWcueSA9IHBpZy55ICsgbmV3VmVsWTI7XG59XG5cbmV4cG9ydCBjb25zdCBiaXJkT25CbG9ja0NvbGxpc2lvbkxvZ2ljID0gKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LCBibG9jaykgPT4ge1xuICAgIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFggPSAtY3VycmVudFByb2plY3RpbGVPYmplY3QudmVsWDtcbiAgICBjdXJyZW50UHJvamVjdGlsZU9iamVjdC52ZWxZID0gLWN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFk7XG4gICAgbGV0IGZvcmNlID0gYmxvY2suYXNQb2xhcihibG9jay52ZWN0b3IoMTAsIDEwKSk7XG4gICAgZm9yY2UubWFnICo9IGJsb2NrLm1hc3MgKiAwLjE7XG4gICAgYmxvY2suYXBwbHlGb3JjZShmb3JjZSwgYmxvY2sudmVjdG9yKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LngsIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnkpKTtcbn1cblxuXG4iLCJleHBvcnQgY29uc3QgY2hlY2tCaXJkQW5kUGlnU3RhdGUgPSAoY3VycmVudFByb2plY3RpbGVPYmplY3RTdGF0ZSwgcGlnU3RhdGUpID0+IHtcbiAgICBpZiAoY3VycmVudFByb2plY3RpbGVPYmplY3RTdGF0ZSA9PT0gXCJlbmRTdGF0ZVwiICYmIHBpZ1N0YXRlID09PSBcImRlYWRcIikgcmV0dXJuIHRydWU7XG59XG5cbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vc3R5bGVzL2luZGV4LnNjc3NcIjtcbmltcG9ydCBBbmdlcmVkQmlyZHMgZnJvbSBcIi4vc2NyaXB0cy9nYW1lXCI7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FudmFzXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBpbml0KTtcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzZXQtaGlnaHNjb3JlXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZXNldExvY2FsU3RvcmFnZSk7XG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc3RhcnQtYnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZXN0YXJ0R2FtZSk7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgbmV3IEFuZ2VyZWRCaXJkcygpLnN0YXJ0KCk7XG59XG5cbmZ1bmN0aW9uIHJlc3RhcnRHYW1lKCkge1xuICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBcIlwiO1xufVxuXG5mdW5jdGlvbiByZXNldExvY2FsU3RvcmFnZSgpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLmNsZWFyKCk7XG59XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=