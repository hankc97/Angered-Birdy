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

          if (that.stageLoader.checkStageLost()) {
            that.gameOver();
          }
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
    value: function winLevel() {// increase stageLoader.stageNumber += 1;
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
      this.ctx.drawImage(this.projectileImage, this.birdProperties.x - 30, this.birdProperties.y - 70, 75, 140);

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
        var canvasProperties = this.canvas.getBoundingClientRect();
        mouse.x = e.x - canvasProperties.left;
        mouse.y = e.y - canvasProperties.top;
        var deltaX = mouse.x - this.startPosBird[0];
        var deltaY = mouse.y - this.startPosBird[1];
        var thetaRadian = Math.atan2(deltaY, deltaX);
        var angleVal = -((Math.abs(thetaRadian * 180 / Math.PI) - 270) % 90);
        var magnitudeVal = Math.abs(mouse.x - 130) / 2;
        this.projectileObject.kickOffLaunchDirection(angleVal, magnitudeVal);
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
        x: 1200,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYmlyZC5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYmxvY2suanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi8uL3NyYy9zY3JpcHRzL2NhbnZhcy5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvcGlnLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9wcm9qZWN0aWxlLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9zdGFnZUxvYWRlci5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvc3RhZ2VzL3N0YWdlS2V5cy5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvdXRpbC9jb2xsaXNpb25EZXRlY3Rpb25VdGlsLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy91dGlsL2NvbGxpc2lvbkxvZ2ljVXRpbC5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvdXRpbC9zdGF0ZUxvZ2ljLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc3R5bGVzL2luZGV4LnNjc3MiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiQmlyZCIsImN0eCIsImJpcmRQcm9wZXJ0aWVzIiwieCIsInkiLCJyYWRpdXMiLCJyYWQiLCJtYXNzIiwidmVsWCIsInZlbFkiLCJ0cmFuc2ZlciIsImdyYXZpdHkiLCJncm91bmQiLCJjYW52YXMiLCJoZWlnaHQiLCJib3VuY2UiLCJmcmljdGlvblgiLCJiaXJkIiwiSW1hZ2UiLCJzcmMiLCJzdGF0ZSIsInNhdmUiLCJiZWdpblBhdGgiLCJhcmMiLCJNYXRoIiwiUEkiLCJjbGlwIiwiY2xvc2VQYXRoIiwiZHJhd0ltYWdlIiwicmVzdG9yZSIsIkJsb2NrIiwidyIsImgiLCJyIiwiZHgiLCJkeSIsImRyIiwiSU5TRVQiLCJQSTkwIiwiUEkyIiwiV0FMTF9OT1JNUyIsIl9ncm91bmQiLCJnZXRNYXNzIiwic2V0VHJhbnNmb3JtIiwicm90YXRlIiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJzdHJva2VSZWN0IiwiaSIsInAiLCJnZXRQb2ludCIsInBvcyIsImRvQ29sbGlzaW9uIiwid2lkdGgiLCJ3aGljaCIsInh4IiwieXkiLCJ2ZWxvY2l0eUEiLCJ2ZWxvY2l0eVQiLCJ2ZWxvY2l0eSIsImNvcyIsInNpbiIsImRldGFpbHMiLCJhc1BvbGFyIiwidmVjdG9yIiwicG9sYXIiLCJtYWciLCJkaXIiLCJ2ZWN0b3JBZGQiLCJ2YWxpZGF0ZVBvbGFyIiwidmVjIiwiaXNQb2xhciIsInBWZWMiLCJyZXRWIiwiaXNDYXJ0IiwiY2FydFRvUG9sYXIiLCJ1bmRlZmluZWQiLCJwb2xhclRvQ2FydCIsImF0YW4yIiwiaHlwb3QiLCJ2ZWMxIiwidmVjMiIsInYxIiwiYXNDYXJ0IiwidjIiLCJmb3JjZSIsImxvYyIsImwiLCJ0b0NlbnRlciIsInBoZXRhIiwiRnYiLCJGYSIsImFjY2VsIiwiZGVsdGFWIiwiYWNjZWxBIiwidiIsImQxIiwiZDIiLCJhbG9uZyIsInRhbmdlbnQiLCJwb2ludERldGFpbHMiLCJ3YWxsSW5kZXgiLCJ2diIsInZhIiwidnZjIiwidmVjdG9yQ29tcG9uZW50c0ZvckRpciIsInZhYyIsImFwcGx5Rm9yY2UiLCJDYW52YXMiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJnZXRDb250ZXh0IiwiYmluZENhbnZhc1RvRE9NIiwicXVlcnlTZWxlY3RvciIsImNsZWFyQ2FudmFzIiwiYm9keSIsImFwcGVuZCIsImNsYXNzTGlzdCIsImFkZCIsImNsZWFyUmVjdCIsImdldEVsZW1lbnRCeUlkIiwicmVtb3ZlQ2hpbGQiLCJBbmdlcmVkQmlyZHMiLCJzdGFydCIsImJpbmQiLCJ0aGF0IiwiYW5pbWF0aW5nIiwiaW5pdGlhbGl6ZUVudGl0aWVzIiwiYW5pbWF0aW9uIiwic3RhZ2VMb2FkZXIiLCJ1cGRhdGUiLCJpbnRlcnZhbCIsIndpbmRvdyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNoZWNrU3RhZ2VMb3N0IiwiZ2FtZU92ZXIiLCJTdGFnZUxvYWRlciIsImluaXRpYWxpemVFdmVudExpc3RlbmVycyIsInJlc3RhcnRFbnRpdGllcyIsIlBpZyIsInBpZyIsInBvb2YiLCJzdGFydFRpbWVyIiwiYWJzIiwidGltZXN0YW1wIiwiRGF0ZSIsImdldFRpbWUiLCJlbGFwc2VkIiwiUHJvamVjdGlsZSIsImxhdW5jaGVkT2JqZWN0cyIsIm1heCIsInByb2plY3RpbGVJbWFnZSIsImxpdmVzIiwiYW5nbGVWYWwiLCJtYWduaXR1ZGVWYWwiLCJhbmdsZSIsImN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0Iiwib2JqZWN0TGF1bmNoZWQiLCJPYmplY3RMYXVuY2giLCJvYmplY3RUeXBlIiwicHVzaCIsInVwZGF0ZUxpdmVzIiwibGVuZ3RoIiwic3BsaWNlIiwiY3VycmVudE9iamVjdCIsInVwZGF0ZUN1cnJlbnRMYXVuY2hlZE9iamVjdCIsImN1cnJlbnRCaXJkIiwicmVuZGVyIiwicGxheWVyTGl2ZXMiLCJzY29yZSIsInN0YWdlTnVtYmVyIiwic3RhcnRQb3NCaXJkIiwicHJvamVjdGlsZU9iamVjdCIsInBpZ3MiLCJibG9ja3MiLCJ1cGRhdGVFbnRpdGllcyIsImNoZWNrQW5kVXBkYXRlRW50aXRpZXNDb2xsaXNpb24iLCJyZW5kZXJFbnRpdGllcyIsIm1vdXNlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJjYW52YXNQcm9wZXJ0aWVzIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwibGVmdCIsInRvcCIsImRlbHRhWCIsImRlbHRhWSIsInRoZXRhUmFkaWFuIiwia2lja09mZkxhdW5jaERpcmVjdGlvbiIsImN1cnJlbnRTdGFnZVZhbHVlcyIsInN0YWdlS2V5cyIsImxvYWRTdGFnZSIsInN0YXJ0aW5nTGl2ZXMiLCJjdXJyZW50TGV2ZWxIaWdoU2NvcmVLZXkiLCJoaWdoU2NvcmVTYXZlS2V5U3RyaW5nIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImhpZ2hTY29yZSIsInBhcnNlSW50IiwidXBkYXRlUGlnc0xlZnQiLCJ1cGRhdGVIaWdoU2NvcmUiLCJzZXRJdGVtIiwiY2hlY2tCaXJkQW5kUGlnU3RhdGUiLCJwb29mQW5pbWF0aW9uVGltZXJCb29sZWFuIiwiY2hlY2tCaXJkT25QaWdDb2xsaXNpb24iLCJiaXJkT25QaWdDb2xsaXNpb25Mb2dpYyIsImNoZWNrQmlyZE9uQmxvY2tDb2xsaXNpb24iLCJiaXJkT25CbG9ja0NvbGxpc2lvbkxvZ2ljIiwicmVuZGVyTGl2ZXMiLCJyZW5kZXJTY29yZSIsInJlbmRlckhpZ2hTY29yZSIsInJlbmRlclN0YWdlTnVtYmVyIiwidGV4dEFsaWduIiwidGV4dEJhc2VsaW5lIiwic3Ryb2tlU3R5bGUiLCJmb250IiwiZmlsbFRleHQiLCJzdHJva2VUZXh0IiwibG9zdEFsbFByb2plY3RpbGVPYmplY3RzIiwiZGlzdGFuY2UiLCJzcXJ0IiwiYmxvY2siLCJqIiwiY2lyY2xlQ2VudGVyIiwiY2hlY2tCaXJkSW50ZXJjZXB0QmxvY2siLCJwb2ludEEiLCJwb2ludEIiLCJkaXN0IiwidmVsMVgiLCJ2ZWwxWSIsInZlbDJYIiwidmVsMlkiLCJ1bml0IiwibmV3VmVsWDEiLCJuZXdWZWxZMSIsIm5ld1ZlbFgyIiwibmV3VmVsWTIiLCJjdXJyZW50UHJvamVjdGlsZU9iamVjdFN0YXRlIiwicGlnU3RhdGUiLCJpbml0IiwicmVzZXRMb2NhbFN0b3JhZ2UiLCJyZXN0YXJ0R2FtZSIsImxvY2F0aW9uIiwiaHJlZiIsImNsZWFyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztJQUFNQSxJO0FBQ0YsZ0JBQVlDLEdBQVosRUFBaUJDLGNBQWpCLEVBQWlDO0FBQUE7O0FBQzdCLFNBQUtELEdBQUwsR0FBV0EsR0FBWDtBQUNBLFNBQUtFLENBQUwsR0FBU0QsY0FBYyxDQUFDQyxDQUF4QjtBQUNBLFNBQUtDLENBQUwsR0FBU0YsY0FBYyxDQUFDRSxDQUF4QjtBQUNBLFNBQUtDLE1BQUwsR0FBY0gsY0FBYyxDQUFDSSxHQUE3QjtBQUNBLFNBQUtDLElBQUwsR0FBWSxDQUFaO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLENBQVo7QUFDQSxTQUFLQyxJQUFMLEdBQVksQ0FBWjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsR0FBaEI7QUFDQSxTQUFLQyxPQUFMLEdBQWU7QUFBRVIsT0FBQyxFQUFFLENBQUw7QUFBUUMsT0FBQyxFQUFFO0FBQVgsS0FBZjtBQUNBLFNBQUtRLE1BQUwsR0FBYyxLQUFLWCxHQUFMLENBQVNZLE1BQVQsQ0FBZ0JDLE1BQWhCLEdBQXlCLEVBQXZDO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLEdBQWQ7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLEdBQWpCO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLElBQUlDLEtBQUosRUFBWjtBQUNBLFNBQUtELElBQUwsQ0FBVUUsR0FBVixHQUFnQiw4QkFBaEI7QUFDQSxTQUFLQyxLQUFMLEdBQWEsWUFBYjtBQUNIOzs7O1dBRUQs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RUFBcUU2RCxpQkFBckU7QUFDQW5JLFFBQVEsQ0FBQ0ksYUFBVCxDQUF1QixpQkFBdkIsRUFBMENrRSxnQkFBMUMsQ0FBMkQsT0FBM0QsRUFBb0U4RCxXQUFwRTs7QUFFQSxTQUFTRixJQUFULEdBQWdCO0FBQ1osTUFBSXJILGtEQUFKLEdBQW1CQyxLQUFuQjtBQUNIOztBQUVELFNBQVNzSCxXQUFULEdBQXVCO0FBQ25CcEksVUFBUSxDQUFDcUksUUFBVCxDQUFrQkMsSUFBbEIsR0FBeUIsRUFBekI7QUFDSDs7QUFFRCxTQUFTSCxpQkFBVCxHQUE2QjtBQUN6QjVHLFFBQU0sQ0FBQytELFlBQVAsQ0FBb0JpRCxLQUFwQjtBQUNILEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEJpcmQge1xuICAgIGNvbnN0cnVjdG9yKGN0eCwgYmlyZFByb3BlcnRpZXMpIHtcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMueCA9IGJpcmRQcm9wZXJ0aWVzLng7XG4gICAgICAgIHRoaXMueSA9IGJpcmRQcm9wZXJ0aWVzLnk7XG4gICAgICAgIHRoaXMucmFkaXVzID0gYmlyZFByb3BlcnRpZXMucmFkO1xuICAgICAgICB0aGlzLm1hc3MgPSAyO1xuICAgICAgICB0aGlzLnZlbFggPSAwO1xuICAgICAgICB0aGlzLnZlbFkgPSAwO1xuICAgICAgICB0aGlzLnRyYW5zZmVyID0gMC45O1xuICAgICAgICB0aGlzLmdyYXZpdHkgPSB7IHg6IDAsIHk6IDAuMSB9O1xuICAgICAgICB0aGlzLmdyb3VuZCA9IHRoaXMuY3R4LmNhbnZhcy5oZWlnaHQgLSAyMDtcbiAgICAgICAgdGhpcy5ib3VuY2UgPSAwLjU7XG4gICAgICAgIHRoaXMuZnJpY3Rpb25YID0gMC45O1xuICAgICAgICB0aGlzLmJpcmQgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5iaXJkLnNyYyA9IFwic3JjL2ltYWdlcy9hbmdlcmVkLWJpcmR5LnBuZ1wiXG4gICAgICAgIHRoaXMuc3RhdGUgPSBcInN0YXJ0U3RhdGVcIjtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5yYWRpdXMsIDAsIChNYXRoLlBJICogMiksIGZhbHNlKTtcbiAgICAgICAgdGhpcy5jdHguY2xpcCgpO1xuICAgICAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMuYmlyZCwgdGhpcy54IC0gdGhpcy5yYWRpdXMsIHRoaXMueSAtIHRoaXMucmFkaXVzLCB0aGlzLnJhZGl1cyAqIDIsIHRoaXMucmFkaXVzICogMilcbiAgICAgICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmlyZDsiLCJjbGFzcyBCbG9jayB7XG4gICAgY29uc3RydWN0b3IoY3R4LCB4LCB5LCB3LCBoKSB7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGN0eC5jYW52YXM7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMudyA9IHc7XG4gICAgICAgIHRoaXMuaCA9IGg7XG4gICAgICAgIHRoaXMuciA9IDAuMTtcbiAgICAgICAgdGhpcy5keCA9IDA7XG4gICAgICAgIHRoaXMuZHkgPSAwO1xuICAgICAgICB0aGlzLmRyID0gMDtcbiAgICAgICAgdGhpcy5JTlNFVCA9IDEwO1xuICAgICAgICB0aGlzLlBJID0gTWF0aC5QSTtcbiAgICAgICAgdGhpcy5QSTkwID0gTWF0aC5QSSAvIDI7XG4gICAgICAgIHRoaXMuUEkyID0gTWF0aC5QSSAqIDI7XG4gICAgICAgIHRoaXMuV0FMTF9OT1JNUyA9IFsgTWF0aC5QSSAvIDIsIE1hdGguUEksIC0oTWF0aC5QSSAvIDIpLCAwXVxuICAgICAgICB0aGlzLl9ncm91bmQgPSB0aGlzLmNhbnZhcy5oZWlnaHQgLSAxMDU7XG4gICAgICAgIHRoaXMubWFzcyA9IHRoaXMuZ2V0TWFzcygpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLmN0eC5zYXZlKClcbiAgICAgICAgdGhpcy5jdHguc2V0VHJhbnNmb3JtKDEsMCwwLDEsdGhpcy54LHRoaXMueSk7XG4gICAgICAgIHRoaXMuY3R4LnJvdGF0ZSh0aGlzLnIpO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIkJsdWVcIjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoLXRoaXMudy8yLCAtdGhpcy5oLzIsIHRoaXMudywgdGhpcy5oKVxuICAgICAgICB0aGlzLmN0eC5zdHJva2VSZWN0KC10aGlzLncvMiwgLXRoaXMuaC8yLCB0aGlzLncsIHRoaXMuaClcbiAgICAgICAgdGhpcy5jdHgucmVzdG9yZSgpXG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLnggKz0gdGhpcy5keDtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMuZHk7XG4gICAgICAgIHRoaXMuZHkgKz0gMC4wNjE7XG4gICAgICAgIHRoaXMuciArPSB0aGlzLmRyO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCA0OyBpKyspe1xuICAgICAgICAgICAgdmFyIHAgPSB0aGlzLmdldFBvaW50KGkpO1xuICAgICAgICAgICAgLy8gb25seSBkbyBvbmUgY29sbGlzaW9uIHBlciBmcmFtZSBvciB3ZSB3aWxsIGVuZCB1cCBhZGRpbmcgZW5lcmd5XG4gICAgICAgICAgICBpZihwLnBvcy54IDwgdGhpcy5JTlNFVCl7XG4gICAgICAgICAgICAgICAgdGhpcy54ICs9ICh0aGlzLklOU0VUKSAtIHAucG9zLng7XG4gICAgICAgICAgICAgICAgdGhpcy5kb0NvbGxpc2lvbihwLDMpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKCBwLnBvcy54ID4gdGhpcy5jYW52YXMud2lkdGgtdGhpcy5JTlNFVCl7XG4gICAgICAgICAgICAgICAgdGhpcy54ICs9ICh0aGlzLmNhbnZhcy53aWR0aCAtIHRoaXMuSU5TRVQpIC0gcC5wb3MueDtcbiAgICAgICAgICAgICAgICB0aGlzLmRvQ29sbGlzaW9uKHAsMSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYocC5wb3MueSA8IHRoaXMuSU5TRVQpe1xuICAgICAgICAgICAgICAgIHRoaXMueSArPSAodGhpcy5JTlNFVCkgLSBwLnBvcy55O1xuICAgICAgICAgICAgICAgIHRoaXMuZG9Db2xsaXNpb24ocCwwKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiggcC5wb3MueSA+IHRoaXMuY2FudmFzLmhlaWdodCAtIHRoaXMuSU5TRVQpe1xuICAgICAgICAgICAgICAgIHRoaXMueSArPSAodGhpcy5jYW52YXMuaGVpZ2h0IC0gdGhpcy5JTlNFVCkgLSBwLnBvcy55O1xuICAgICAgICAgICAgICAgIHRoaXMuZG9Db2xsaXNpb24ocCwyKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TWFzcygpIHtcbiAgICAgICAgcmV0dXJuICggdGhpcy53ICogdGhpcy5oICogdGhpcy5oKSAvIDEwMDA7XG4gICAgfVxuXG4gICAgZ2V0UG9pbnQod2hpY2gpIHtcbiAgICAgICAgdmFyIGR4LCBkeSwgeCwgeSwgeHgsIHl5LCB2ZWxvY2l0eUEsIHZlbG9jaXR5VCwgdmVsb2NpdHk7XG5cbiAgICAgICAgZHggPSBNYXRoLmNvcyh0aGlzLnIpO1xuICAgICAgICBkeSA9IE1hdGguc2luKHRoaXMucik7XG5cbiAgICAgICAgc3dpdGNoICh3aGljaCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHggPSAtdGhpcy53IC8gMjtcbiAgICAgICAgICAgICAgICB5ID0gLXRoaXMuaCAvIDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgeCA9IHRoaXMudyAvIDI7XG4gICAgICAgICAgICAgICAgeSA9IC10aGlzLmggLyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHggPSB0aGlzLncgLyAyO1xuICAgICAgICAgICAgICAgIHkgPSB0aGlzLmggLyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHggPSAtdGhpcy53IC8gMjtcbiAgICAgICAgICAgICAgICB5ID0gdGhpcy5oIC8gMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICB4ID0gdGhpcy54O1xuICAgICAgICAgICAgICAgIHkgPSB0aGlzLnk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgeHggLCB5eTtcbiAgICAgICAgeHggPSB4ICogZHggKyB5ICogLWR5O1xuICAgICAgICB5eSA9IHggKiBkeSArIHkgKiBkeDtcblxuICAgICAgICB2YXIgZGV0YWlscyA9IHRoaXMuYXNQb2xhcih0aGlzLnZlY3Rvcih4eCwgeXkpKTtcblxuICAgICAgICB4eCArPSB0aGlzLng7XG4gICAgICAgIHl5ICs9IHRoaXMueTtcblxuICAgICAgICB2ZWxvY2l0eUEgPSB0aGlzLnBvbGFyKGRldGFpbHMubWFnICogdGhpcy5kciwgZGV0YWlscy5kaXIgKyB0aGlzLlBJOTApO1xuICAgICAgICB2ZWxvY2l0eVQgPSB0aGlzLnZlY3RvckFkZCh2ZWxvY2l0eSA9IHRoaXMudmVjdG9yKHRoaXMuZHgsIHRoaXMuZHkpLCB2ZWxvY2l0eUEpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2ZWxvY2l0eTogdmVsb2NpdHksXG4gICAgICAgICAgICB2ZWxvY2l0eVQ6IHZlbG9jaXR5VCxcbiAgICAgICAgICAgIHZlbG9jaXR5QSA6IHZlbG9jaXR5QSxcbiAgICAgICAgICAgIHBvczogdGhpcy52ZWN0b3IoeHgsIHl5KSxcbiAgICAgICAgICAgIHJhZGl1czogZGV0YWlscy5tYWdcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBvbGFyKG1hZyA9IDEsIGRpciA9IDApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGVQb2xhcih7ZGlyOiBkaXIsIG1hZzogbWFnfSlcbiAgICB9XG5cbiAgICB2ZWN0b3IoeCA9IDEsIHkgPSAwKSB7XG4gICAgICAgIHJldHVybiB7IHg6IHgsIHk6IHl9O1xuICAgIH1cblxuICAgIHZhbGlkYXRlUG9sYXIodmVjKSB7XG4gICAgICAgIGlmICh0aGlzLmlzUG9sYXIodmVjKSkge1xuICAgICAgICAgICAgaWYodmVjLm1hZyA8IDApe1xuICAgICAgICAgICAgICAgIHZlYy5tYWcgPSAtdmVjLm1hZztcbiAgICAgICAgICAgICAgICB2ZWMuZGlyICs9IHRoaXMuUEk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZlYztcbiAgICB9XG5cbiAgICBwb2xhclRvQ2FydChwVmVjLCByZXRWID0ge3g6IDAsIHk6IDB9KXtcbiAgICAgICAgcmV0Vi54ID0gTWF0aC5jb3MocFZlYy5kaXIpICogcFZlYy5tYWc7XG4gICAgICAgIHJldFYueSA9IE1hdGguc2luKHBWZWMuZGlyKSAqIHBWZWMubWFnO1xuICAgICAgICByZXR1cm4gcmV0VlxuICAgIH1cblxuICAgIGFzUG9sYXIodmVjKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQ2FydCh2ZWMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYXJ0VG9Qb2xhcih2ZWMpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZlYy5tYWcgPCAwKSB7XG4gICAgICAgICAgICB2ZWMubWFnID0gLXZlYy5tYWc7XG4gICAgICAgICAgICB2ZWMuZGlyICs9IHRoaXMuUEk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZGlyOiB2ZWMuZGlyLCBtYWc6IHZlYy5tYWd9O1xuICAgIH1cblxuICAgIGlzQ2FydCh2ZWMpIHsgaWYodmVjLnggIT09IHVuZGVmaW5lZCAmJiB2ZWMueSAhPT0gdW5kZWZpbmVkKSB7IHJldHVybiB0cnVlOyB9IHJldHVybiBmYWxzZTsgfVxuICAgIGlzUG9sYXIodmVjKSB7IGlmKHZlYy5tYWcgIT09IHVuZGVmaW5lZCAmJiB2ZWMuZGlyICE9PSB1bmRlZmluZWQpIHsgcmV0dXJuIHRydWU7IH0gcmV0dXJuIGZhbHNlOyB9XG4gICAgYXNDYXJ0KHZlYykge1xuICAgICAgICBpZiAodGhpcy5pc1BvbGFyKHZlYykpIHtyZXR1cm4gdGhpcy5wb2xhclRvQ2FydCh2ZWMpfVxuICAgICAgICByZXR1cm4ge3g6IHZlYy54LCB5OiB2ZWMueX1cbiAgICB9XG4gICAgY2FydFRvUG9sYXIodmVjLCByZXRWID0ge2RpcjogMCwgbWFnOiAwfSkge1xuICAgICAgICByZXRWLmRpciA9IE1hdGguYXRhbjIodmVjLnksIHZlYy54KTtcbiAgICAgICAgcmV0Vi5tYWcgPSBNYXRoLmh5cG90KHZlYy54LCB2ZWMueSk7XG4gICAgICAgIHJldHVybiByZXRWO1xuICAgIH1cblxuICAgIHZlY3RvckFkZCh2ZWMxLCB2ZWMyKSB7XG4gICAgICAgIHZhciB2MSA9IHRoaXMuYXNDYXJ0KHZlYzEpO1xuICAgICAgICB2YXIgdjIgPSB0aGlzLmFzQ2FydCh2ZWMyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMudmVjdG9yKHYxLnggKyB2Mi54LCB2MS55ICsgdjIueSlcbiAgICB9XG5cbiAgICBhcHBseUZvcmNlKGZvcmNlLCBsb2MpIHtcbiAgICAgICAgdGhpcy52YWxpZGF0ZVBvbGFyKGZvcmNlKTtcbiAgICAgICAgdmFyIGwgPSB0aGlzLmFzQ2FydChsb2MpO1xuICAgICAgICB2YXIgdG9DZW50ZXIgPSB0aGlzLmFzUG9sYXIodGhpcy52ZWN0b3IodGhpcy54IC0gbC54LCB0aGlzLnkgLSBsLnkpKTtcbiAgICAgICAgdmFyIHBoZXRhID0gdG9DZW50ZXIuZGlyIC0gZm9yY2UuZGlyO1xuICAgICAgICB2YXIgRnYgPSBNYXRoLmNvcyhwaGV0YSkgKiBmb3JjZS5tYWc7XG4gICAgICAgIHZhciBGYSA9IE1hdGguc2luKHBoZXRhKSAqIGZvcmNlLm1hZztcbiAgICAgICAgdmFyIGFjY2VsID0gdGhpcy5hc1BvbGFyKHRvQ2VudGVyKTtcbiAgICAgICAgYWNjZWwubWFnID0gRnYgLyB0aGlzLm1hc3M7IFxuICAgICAgICB2YXIgZGVsdGFWID0gdGhpcy5hc0NhcnQoYWNjZWwpOyBcbiAgICAgICAgdGhpcy5keCArPSBkZWx0YVYueCBcbiAgICAgICAgdGhpcy5keSArPSBkZWx0YVYueVxuICAgICAgICB2YXIgYWNjZWxBID0gRmEgLyAodG9DZW50ZXIubWFnICAqIHRoaXMubWFzcyk7IFxuICAgICAgICB0aGlzLmRyICs9IGFjY2VsQTtcbiAgICB9XG5cbiAgICB2ZWN0b3JDb21wb25lbnRzRm9yRGlyKHZlYywgZGlyKSB7XG4gICAgICAgIHZhciB2ID0gdGhpcy5hc1BvbGFyKHZlYyk7IFxuICAgICAgICB2YXIgcGhldGEgPSB2LmRpciAtIGRpcjtcbiAgICAgICAgdmFyIEZ2ID0gTWF0aC5jb3MocGhldGEpICogdi5tYWc7XG4gICAgICAgIHZhciBGYSA9IE1hdGguc2luKHBoZXRhKSAqIHYubWFnO1xuXG4gICAgICAgIHZhciBkMSA9IGRpcjtcbiAgICAgICAgdmFyIGQyID0gZGlyICsgdGhpcy5QSTkwOyAgICBcbiAgICAgICAgaWYoRnYgPCAwKXtcbiAgICAgICAgICAgIGQxICs9IHRoaXMuUEk7XG4gICAgICAgICAgICBGdiA9IC1GdjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKEZhIDwgMCl7XG4gICAgICAgICAgICBkMiArPSB0aGlzLlBJO1xuICAgICAgICAgICAgRmEgPSAtRmE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFsb25nIDogdGhpcy5wb2xhcihGdixkMSksXG4gICAgICAgICAgICB0YW5nZW50IDogdGhpcy5wb2xhcihGYSxkMilcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBkb0NvbGxpc2lvbihwb2ludERldGFpbHMsIHdhbGxJbmRleCkge1xuICAgICAgICB2YXIgdnYgPSB0aGlzLmFzUG9sYXIocG9pbnREZXRhaWxzLnZlbG9jaXR5KTsgXG4gICAgICAgIHZhciB2YSA9IHRoaXMuYXNQb2xhcihwb2ludERldGFpbHMudmVsb2NpdHlBKTsgXG4gICAgICAgIHZhciB2dmMgPSB0aGlzLnZlY3RvckNvbXBvbmVudHNGb3JEaXIodnYsIHRoaXMuV0FMTF9OT1JNU1t3YWxsSW5kZXhdKTtcbiAgICAgICAgdmFyIHZhYyA9IHRoaXMudmVjdG9yQ29tcG9uZW50c0ZvckRpcih2YSwgdGhpcy5XQUxMX05PUk1TW3dhbGxJbmRleF0pO1xuXG4gICAgICAgIHZ2Yy5hbG9uZy5tYWcgKj0gMS4xODsgXG4gICAgICAgIHZhYy5hbG9uZy5tYWcgKj0gMS4xODsgXG5cbiAgICAgICAgdnZjLmFsb25nLm1hZyAqPSB0aGlzLm1hc3M7XG4gICAgICAgIHZhYy5hbG9uZy5tYWcgKj0gdGhpcy5tYXNzO1xuXG4gICAgICAgIHZ2Yy5hbG9uZy5kaXIgKz0gdGhpcy5QSTtcbiAgICAgICAgdmFjLmFsb25nLmRpciArPSB0aGlzLlBJO1xuXG4gICAgICAgIHZ2Yy50YW5nZW50Lm1hZyAqPSAwLjE4OyAgXG4gICAgICAgIHZhYy50YW5nZW50Lm1hZyAqPSAwLjE4O1xuICAgICAgICB2dmMudGFuZ2VudC5tYWcgKj0gdGhpcy5tYXNzICBcbiAgICAgICAgdmFjLnRhbmdlbnQubWFnICo9IHRoaXMubWFzc1xuICAgICAgICB2dmMudGFuZ2VudC5kaXIgKz0gdGhpcy5QSTsgXG4gICAgICAgIHZhYy50YW5nZW50LmRpciArPSB0aGlzLlBJO1xuXG4gICAgICAgIHRoaXMuYXBwbHlGb3JjZSh2dmMuYWxvbmcsIHBvaW50RGV0YWlscy5wb3MpICAgIFxuICAgICAgICB0aGlzLmFwcGx5Rm9yY2UodnZjLnRhbmdlbnQsIHBvaW50RGV0YWlscy5wb3MpICAgIFxuICAgICAgICB0aGlzLmFwcGx5Rm9yY2UodmFjLmFsb25nLCBwb2ludERldGFpbHMucG9zKSAgICBcbiAgICAgICAgdGhpcy5hcHBseUZvcmNlKHZhYy50YW5nZW50LCBwb2ludERldGFpbHMucG9zKSAgICBcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJsb2NrIiwiY2xhc3MgQ2FudmFzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IDE0MDA7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IDc1MDtcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIHRoaXMuYmluZENhbnZhc1RvRE9NKClcbiAgICB9XG5cbiAgICBiaW5kQ2FudmFzVG9ET00oKSB7XG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tY2FudmFzXCIpICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmQodGhpcy5jYW52YXMpO1xuICAgICAgICB0aGlzLmNhbnZhcy5jbGFzc0xpc3QuYWRkKFwibWFpbi1jYW52YXNcIilcbiAgICB9XG5cbiAgICBjbGVhckNhbnZhcygpIHtcbiAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgIH1cblxuICAgIHJlbW92ZUNhbnZhc0Zyb21ET00oKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbi1ib2R5XCIpLnJlbW92ZUNoaWxkKHRoaXMuY2FudmFzKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhbnZhcztcbiIsIi8vIGltcG9ydCBcIi4vc3R5bGVzL2luZGV4LnNjc3NcIjtcbmltcG9ydCBDYW52YXMgZnJvbSBcIi4vY2FudmFzXCI7XG5pbXBvcnQgU3RhZ2VMb2FkZXIgZnJvbSBcIi4vc3RhZ2VMb2FkZXJcIjtcblxuY2xhc3MgQW5nZXJlZEJpcmRzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zdGFydCA9IHRoaXMuc3RhcnQuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgICAgIHRoaXMuYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBuZXcgQ2FudmFzKCk7XG4gICAgICAgIHRoaXMuY2FudmFzLmJpbmRDYW52YXNUb0RPTSgpO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVFbnRpdGllcygpO1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLmNsZWFyQ2FudmFzKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWdlTG9hZGVyLnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaW50ZXJ2YWwgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uKTtcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5zdGFnZUxvYWRlci5jaGVja1N0YWdlTG9zdCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZ2FtZU92ZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGlvbik7XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZUVudGl0aWVzKCkge1xuICAgICAgICB0aGlzLnN0YWdlTG9hZGVyID0gbmV3IFN0YWdlTG9hZGVyKHRoaXMuY2FudmFzLmN0eCk7XG4gICAgICAgIHRoaXMuc3RhZ2VMb2FkZXIuaW5pdGlhbGl6ZUVudGl0aWVzKCk7XG4gICAgICAgIHRoaXMuc3RhZ2VMb2FkZXIuaW5pdGlhbGl6ZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgd2luTGV2ZWwoKSB7XG4gICAgICAgIC8vIGluY3JlYXNlIHN0YWdlTG9hZGVyLnN0YWdlTnVtYmVyICs9IDE7XG4gICAgfVxuXG4gICAgZ2FtZU92ZXIoKSB7XG4gICAgICAgIHRoaXMuc3RhZ2VMb2FkZXIucmVzdGFydEVudGl0aWVzKCk7XG4gICAgICAgIHRoaXMuc3RhZ2VMb2FkZXIuaW5pdGlhbGl6ZUVudGl0aWVzKCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBbmdlcmVkQmlyZHM7IiwiY2xhc3MgUGlnIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgsIHgsIHksIHJhZGl1cywgdmVsWCA9IDAsIHZlbFkgPSAwKSB7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLnggPSB4OyBcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy52ZWxYID0gdmVsWDtcbiAgICAgICAgdGhpcy52ZWxZID0gdmVsWTtcbiAgICAgICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XG4gICAgICAgIHRoaXMubWFzcyA9IDI7XG5cbiAgICAgICAgdGhpcy5ncmF2aXR5ID0geyB4OiAwLCB5OiAwLjEgfTtcbiAgICAgICAgdGhpcy5ncm91bmQgPSB0aGlzLmN0eC5jYW52YXMuaGVpZ2h0IC0gMjA7XG4gICAgICAgIHRoaXMuYm91bmNlID0gMC40O1xuICAgICAgICB0aGlzLmZyaWN0aW9uWCA9IDAuOTtcbiAgICAgICAgdGhpcy5tYXNzID0gMjtcbiAgICAgICAgdGhpcy5waWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5waWcuc3JjID0gXCJzcmMvaW1hZ2VzL3BlcHBhLnBuZ1wiO1xuICAgICAgICB0aGlzLnN0YXRlID0gXCJhbGl2ZVwiO1xuXG4gICAgICAgIHRoaXMucG9vZiA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB0aGlzLnBvb2Yuc3JjID0gXCJzcmMvaW1hZ2VzL3Bvb2YucG5nXCI7XG4gICAgICAgIHRoaXMuc3RhcnRUaW1lcjtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5yYWRpdXMsIDAsIChNYXRoLlBJICogMiksIGZhbHNlKTtcbiAgICAgICAgdGhpcy5jdHguY2xpcCgpO1xuICAgICAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMucGlnLCB0aGlzLnggLSB0aGlzLnJhZGl1cywgdGhpcy55IC0gdGhpcy5yYWRpdXMsIHRoaXMucmFkaXVzICogMiwgdGhpcy5yYWRpdXMgKiAyKTtcbiAgICAgICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy52ZWxYICs9IHRoaXMuZ3Jhdml0eS54O1xuICAgICAgICB0aGlzLnZlbFkgKz0gdGhpcy5ncmF2aXR5Lnk7XG4gICAgICAgIHRoaXMueCArPSB0aGlzLnZlbFg7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLnZlbFk7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy55ID49IHRoaXMuZ3JvdW5kKSB7XG4gICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmdyb3VuZCAtICh0aGlzLnkgLSB0aGlzLmdyb3VuZCk7XG4gICAgICAgICAgICB0aGlzLnZlbFkgPSAtTWF0aC5hYnModGhpcy52ZWxZKSAqIHRoaXMuYm91bmNlO1xuICAgICAgICAgICAgaWYgKHRoaXMudmVsWSA+PSB0aGlzLmdyYXZpdHkueSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVsWSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5ncm91bmQgLSB0aGlzLmdyYXZpdHkueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnZlbFggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWxYIC09IHRoaXMuZnJpY3Rpb25YO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudmVsWCA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlbFggKz0gdGhpcy5mcmljdGlvblg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3RvcHMgYmFsbCBmcm9tIGJvdW5jaW5nIGluIFkgYXhpc1xuICAgICAgICBpZiAodGhpcy52ZWxZPDAgJiYgdGhpcy52ZWxZPi0yLjEpIHtcbiAgICAgICAgICAgIHRoaXMudmVsWSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3RvcHMgYmFsbCBmcm9tIG1vdmluZyBvbiBYIGF4aXMgaWYgeC12ZWxvY2l0eSA8IDEuMVxuICAgICAgICBpZiAoTWF0aC5hYnModGhpcy52ZWxYKSA8IDEuMSkge1xuICAgICAgICAgICAgdGhpcy52ZWxYID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBvb2ZBbmltYXRpb25UaW1lckJvb2xlYW4oKSB7XG4gICAgICAgIHRoaXMucGlnLnNyYyA9IFwic3JjL2ltYWdlcy9wb29mLnBuZ1wiO1xuICAgICAgICB0aGlzLnJhZGl1cyA9IDM1O1xuXG4gICAgICAgIHZhciB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRUaW1lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0VGltZXIgPSB0aW1lc3RhbXA7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZWxhcHNlZCA9IHRpbWVzdGFtcCAtIHRoaXMuc3RhcnRUaW1lcjtcbiAgICAgICAgaWYgKGVsYXBzZWQgPiAzMDAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQaWc7IiwiaW1wb3J0IEJpcmQgZnJvbSBcIi4vYmlyZFwiO1xuY2xhc3MgUHJvamVjdGlsZSB7XG4gICAgY29uc3RydWN0b3IoY3R4LCBiaXJkUHJvcGVydGllcykge1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5sYXVuY2hlZE9iamVjdHMgPSBbXTtcbiAgICAgICAgdGhpcy5tYXggPSAxO1xuICAgICAgICB0aGlzLmJpcmRQcm9wZXJ0aWVzID0gYmlyZFByb3BlcnRpZXM7XG4gICAgICAgIHRoaXMucHJvamVjdGlsZUltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMucHJvamVjdGlsZUltYWdlLnNyYyA9IFwic3JjL2ltYWdlcy9zbGluZ1MucG5nXCI7XG4gICAgICAgIHRoaXMubGl2ZXMgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5saXZlcy5zcmMgPSBcInNyYy9pbWFnZXMvYW5nZXJlZC1iaXJkeS5wbmdcIlxuICAgIH1cblxuICAgIGtpY2tPZmZMYXVuY2hEaXJlY3Rpb24oYW5nbGVWYWwsIG1hZ25pdHVkZVZhbCkge1xuICAgICAgICBsZXQgYW5nbGUgPSBNYXRoLlBJKiBhbmdsZVZhbCAvMTgwO1xuICAgICAgICB0aGlzLmN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0ID0gbmV3IEJpcmQodGhpcy5jdHgsIHRoaXMuYmlyZFByb3BlcnRpZXMpO1xuICAgICAgICB0aGlzLm9iamVjdExhdW5jaGVkID0gbmV3IE9iamVjdExhdW5jaCh0aGlzLmN0eCwgdGhpcy5jdXJyZW50UHJvamVjdGlsZU9iamVjdCk7XG4gICAgICAgIHRoaXMub2JqZWN0TGF1bmNoZWQub2JqZWN0VHlwZS52ZWxZID0tIG1hZ25pdHVkZVZhbCAqIE1hdGguc2luKGFuZ2xlKTtcbiAgICAgICAgdGhpcy5vYmplY3RMYXVuY2hlZC5vYmplY3RUeXBlLnZlbFggPSBtYWduaXR1ZGVWYWwgKiBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgIHRoaXMub2JqZWN0TGF1bmNoZWQub2JqZWN0VHlwZS50cmFuc2ZlciA9IDAuODtcbiAgICAgICAgdGhpcy5sYXVuY2hlZE9iamVjdHMucHVzaCh0aGlzLm9iamVjdExhdW5jaGVkKTtcbiAgICAgICAgdGhpcy51cGRhdGVMaXZlcygpO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubGF1bmNoZWRPYmplY3RzLmxlbmd0aCA+IHRoaXMubWF4KSB7XG4gICAgICAgICAgICB0aGlzLmxhdW5jaGVkT2JqZWN0cyA9IHRoaXMubGF1bmNoZWRPYmplY3RzLnNwbGljZSgxKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGF1bmNoZWRPYmplY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudE9iamVjdCA9IHRoaXMubGF1bmNoZWRPYmplY3RzW2ldLm9iamVjdFR5cGU7XG4gICAgICAgICAgICBjdXJyZW50T2JqZWN0LnZlbFkgKz0gMS41MztcbiAgICAgICAgICAgIGN1cnJlbnRPYmplY3QueCArPSBjdXJyZW50T2JqZWN0LnZlbFggLyAzO1xuICAgICAgICAgICAgY3VycmVudE9iamVjdC55ICs9IGN1cnJlbnRPYmplY3QudmVsWSAvIDM7XG4gICAgICAgIFxuICAgICAgICAgICAgdGhpcy5sYXVuY2hlZE9iamVjdHNbaV0udXBkYXRlQ3VycmVudExhdW5jaGVkT2JqZWN0KClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMucHJvamVjdGlsZUltYWdlLCB0aGlzLmJpcmRQcm9wZXJ0aWVzLnggLSAzMCwgdGhpcy5iaXJkUHJvcGVydGllcy55IC0gNzAsIDc1LCAxNDApO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGF1bmNoZWRPYmplY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudEJpcmQgPSB0aGlzLmxhdW5jaGVkT2JqZWN0c1tpXS5vYmplY3RUeXBlO1xuICAgICAgICAgICAgY3VycmVudEJpcmQucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVMaXZlcygpIHtcbiAgICAgICAgdGhpcy5iaXJkUHJvcGVydGllcy5wbGF5ZXJMaXZlcyAtPSAxXG4gICAgfVxuXG4gICAgcmVuZGVyTGl2ZXMoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAxMDsgaSA8IHRoaXMuYmlyZFByb3BlcnRpZXMucGxheWVyTGl2ZXMgKiA1MDsgaSs9NTApIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMubGl2ZXMsIGkgLCA1MCwgMzAsIDMwKVxuICAgICAgICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsb3N0QWxsUHJvamVjdGlsZU9iamVjdHMoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5iaXJkUHJvcGVydGllcy5wbGF5ZXJMaXZlcyA9PT0gMCAmJiB0aGlzLmN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnN0YXRlID09PSBcImVuZFN0YXRlXCIpO1xuICAgIH1cbn1cblxuY2xhc3MgT2JqZWN0TGF1bmNoIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgsIG9iamVjdFR5cGUpIHtcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMub2JqZWN0VHlwZSA9IG9iamVjdFR5cGU7XG4gICAgfVxuXG4gICAgcmVuZGVyT2JqZWN0TGF1bmNoKCkge1xuICAgICAgICB0aGlzLm9iamVjdFR5cGUucmVuZGVyKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlQ3VycmVudExhdW5jaGVkT2JqZWN0KCkge1xuICAgICAgICBsZXQgY3VycmVudE9iamVjdCA9IHRoaXMub2JqZWN0VHlwZTtcbiAgICAgICAgY3VycmVudE9iamVjdC52ZWxYICs9IGN1cnJlbnRPYmplY3QuZ3Jhdml0eS54O1xuICAgICAgICBjdXJyZW50T2JqZWN0LnZlbFkgKz0gY3VycmVudE9iamVjdC5ncmF2aXR5Lnk7XG4gICAgICAgIGN1cnJlbnRPYmplY3QueCArPSBjdXJyZW50T2JqZWN0LnZlbFg7XG4gICAgICAgIGN1cnJlbnRPYmplY3QueSArPSBjdXJyZW50T2JqZWN0LnZlbFk7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRPYmplY3QueSA+PSBjdXJyZW50T2JqZWN0Lmdyb3VuZCkge1xuICAgICAgICAgICAgY3VycmVudE9iamVjdC55ID0gY3VycmVudE9iamVjdC5ncm91bmQgLSAoY3VycmVudE9iamVjdC55IC0gY3VycmVudE9iamVjdC5ncm91bmQpO1xuICAgICAgICAgICAgY3VycmVudE9iamVjdC52ZWxZID0gLU1hdGguYWJzKGN1cnJlbnRPYmplY3QudmVsWSkgKiBjdXJyZW50T2JqZWN0LmJvdW5jZTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50T2JqZWN0LnZlbFkgPj0gY3VycmVudE9iamVjdC5ncmF2aXR5LnkpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50T2JqZWN0LnZlbFkgPSAwO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRPYmplY3QueSA9IGN1cnJlbnRPYmplY3QuZ3JvdW5kIC0gY3VycmVudE9iamVjdC5ncmF2aXR5Lnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY3VycmVudE9iamVjdC52ZWxYID4gMCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRPYmplY3QudmVsWCAtPSBjdXJyZW50T2JqZWN0LmZyaWN0aW9uWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjdXJyZW50T2JqZWN0LnZlbFggPCAwKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudE9iamVjdC52ZWxYICs9IGN1cnJlbnRPYmplY3QuZnJpY3Rpb25YO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHN0b3BzIGJhbGwgZnJvbSBib3VuY2luZyBpbiBZIGF4aXNcbiAgICAgICAgaWYgKCBjdXJyZW50T2JqZWN0LnkgPj0gY3VycmVudE9iamVjdC5ncm91bmQgLSAxMCkge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRPYmplY3QudmVsWSA8PSAwICYmIGN1cnJlbnRPYmplY3QudmVsWSA+IC0yLjUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50T2JqZWN0LnZlbFkgPSAwO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRPYmplY3Quc3RhdGUgPSBcImVuZFN0YXRlXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3RvcHMgYmFsbCBmcm9tIG1vdmluZyBvbiBYIGF4aXMgXG4gICAgICAgIGlmIChNYXRoLmFicyhjdXJyZW50T2JqZWN0LnZlbFgpIDwgMS4xKSB7XG4gICAgICAgICAgICBjdXJyZW50T2JqZWN0LnZlbFggPSAwO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RpbGU7IiwiaW1wb3J0IFBpZyBmcm9tIFwiLi9waWdcIjtcbmltcG9ydCBCbG9jayBmcm9tIFwiLi9ibG9ja1wiO1xuaW1wb3J0IFByb2plY3RpbGUgZnJvbSBcIi4vcHJvamVjdGlsZVwiO1xuaW1wb3J0IHtzdGFnZUtleXN9IGZyb20gXCIuL3N0YWdlcy9zdGFnZUtleXNcIjtcbmltcG9ydCB7Y2hlY2tCaXJkT25QaWdDb2xsaXNpb24sIGNoZWNrQmlyZE9uQmxvY2tDb2xsaXNpb259IGZyb20gXCIuL3V0aWwvY29sbGlzaW9uRGV0ZWN0aW9uVXRpbFwiO1xuaW1wb3J0IHtiaXJkT25QaWdDb2xsaXNpb25Mb2dpYywgYmlyZE9uQmxvY2tDb2xsaXNpb25Mb2dpY30gZnJvbSBcIi4vdXRpbC9jb2xsaXNpb25Mb2dpY1V0aWxcIjtcbmltcG9ydCB7Y2hlY2tCaXJkQW5kUGlnU3RhdGV9IGZyb20gXCIuL3V0aWwvc3RhdGVMb2dpY1wiO1xuXG5jbGFzcyBTdGFnZUxvYWRlciB7XG4gICAgY29uc3RydWN0b3IoY3R4KSB7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGN0eC5jYW52YXM7XG4gICAgICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgICAgICB0aGlzLnN0YWdlTnVtYmVyID0gMTtcbiAgICAgICAgdGhpcy5zdGFydFBvc0JpcmQgPSBbXTtcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlT2JqZWN0ID0ge307XG4gICAgICAgIHRoaXMucGlncyA9IFtdO1xuICAgICAgICB0aGlzLmJsb2NrcyA9IFtdO1xuICAgIH1cbiAgICBcbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlRW50aXRpZXMoKTtcbiAgICAgICAgaWYgKHRoaXMucHJvamVjdGlsZU9iamVjdC5vYmplY3RMYXVuY2hlZCkgdGhpcy5jaGVja0FuZFVwZGF0ZUVudGl0aWVzQ29sbGlzaW9uKCk7XG4gICAgICAgIHRoaXMucmVuZGVyRW50aXRpZXMoKTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXplRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGNvbnN0IG1vdXNlID0ge1xuICAgICAgICAgICAgeDogdGhpcy5jYW52YXMud2lkdGgvMixcbiAgICAgICAgICAgIHk6IHRoaXMuY2FudmFzLmhlaWdodC8yLFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgbGV0IGNhbnZhc1Byb3BlcnRpZXMgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIG1vdXNlLnggPSBlLnggLSBjYW52YXNQcm9wZXJ0aWVzLmxlZnQ7XG4gICAgICAgICAgICBtb3VzZS55ID0gZS55IC0gY2FudmFzUHJvcGVydGllcy50b3A7XG4gICAgICAgICAgICBsZXQgZGVsdGFYID0gbW91c2UueCAtIHRoaXMuc3RhcnRQb3NCaXJkWzBdO1xuICAgICAgICAgICAgbGV0IGRlbHRhWSA9IG1vdXNlLnkgLSB0aGlzLnN0YXJ0UG9zQmlyZFsxXTtcbiAgICAgICAgICAgIGxldCB0aGV0YVJhZGlhbiA9IE1hdGguYXRhbjIoZGVsdGFZLCBkZWx0YVgpO1xuICAgICAgICAgICAgbGV0IGFuZ2xlVmFsID0gLSgoTWF0aC5hYnModGhldGFSYWRpYW4gKiAxODAgLyBNYXRoLlBJKSAtIDI3MCkgJSA5MCk7XG4gICAgICAgICAgICBsZXQgbWFnbml0dWRlVmFsID0gKE1hdGguYWJzKG1vdXNlLnggLSAxMzApIC8gMik7XG5cbiAgICAgICAgICAgIHRoaXMucHJvamVjdGlsZU9iamVjdC5raWNrT2ZmTGF1bmNoRGlyZWN0aW9uKGFuZ2xlVmFsICwgbWFnbml0dWRlVmFsKVxuICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZUVudGl0aWVzKCkge1xuICAgICAgICBjb25zdCBjdXJyZW50U3RhZ2VWYWx1ZXMgPSBzdGFnZUtleXNbdGhpcy5zdGFnZU51bWJlcl07XG4gICAgICAgIHRoaXMubG9hZFN0YWdlKGN1cnJlbnRTdGFnZVZhbHVlcyk7XG4gICAgfVxuXG4gICAgcmVzdGFydEVudGl0aWVzKCkge1xuICAgICAgICB0aGlzLnNjb3JlID0gMDtcbiAgICAgICAgdGhpcy5zdGFydFBvc0JpcmQgPSBbXTtcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlT2JqZWN0LmJpcmRQcm9wZXJ0aWVzLnBsYXllckxpdmVzID0gdGhpcy5zdGFydGluZ0xpdmVzO1xuICAgICAgICB0aGlzLnByb2plY3RpbGVPYmplY3QgPSB7fTtcbiAgICAgICAgdGhpcy5waWdzID0gW107XG4gICAgICAgIHRoaXMuYmxvY2tzID0gW107XG4gICAgfVxuXG4gICAgbG9hZFN0YWdlKGN1cnJlbnRTdGFnZVZhbHVlcykge1xuICAgICAgICB0aGlzLnByb2plY3RpbGVPYmplY3QgPSBuZXcgUHJvamVjdGlsZSh0aGlzLmN0eCwgY3VycmVudFN0YWdlVmFsdWVzW1wiYmlyZFByb3BlcnRpZXNcIl0pO1xuICAgICAgICB0aGlzLnN0YXJ0aW5nTGl2ZXMgPSBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJiaXJkUHJvcGVydGllc1wiXS5wbGF5ZXJMaXZlcztcbiAgICAgICAgdGhpcy5zdGFydFBvc0JpcmQgPSBbY3VycmVudFN0YWdlVmFsdWVzW1wiYmlyZFByb3BlcnRpZXNcIl0ueCwgY3VycmVudFN0YWdlVmFsdWVzW1wiYmlyZFByb3BlcnRpZXNcIl0ueV1cbiAgICAgICAgdGhpcy5jdXJyZW50TGV2ZWxIaWdoU2NvcmVLZXkgPSBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJjdXJyZW50TGV2ZWxIaWdoU2NvcmVLZXlcIl07XG5cbiAgICAgICAgbGV0IGhpZ2hTY29yZVNhdmVLZXlTdHJpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmN1cnJlbnRMZXZlbEhpZ2hTY29yZUtleSk7XG4gICAgICAgIGlmIChoaWdoU2NvcmVTYXZlS2V5U3RyaW5nID09PSBudWxsKXtcbiAgICAgICAgICAgIHRoaXMuaGlnaFNjb3JlID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGlnaFNjb3JlID0gcGFyc2VJbnQoaGlnaFNjb3JlU2F2ZUtleVN0cmluZyk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnRTdGFnZVZhbHVlc1tcIm51bWJlck9mUGlnc1wiXTsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnBpZ3MucHVzaChuZXcgUGlnKFxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LCBcbiAgICAgICAgICAgICAgICBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJwaWdQcm9wZXJ0aWVzXCJdW2ldLngsIFxuICAgICAgICAgICAgICAgIGN1cnJlbnRTdGFnZVZhbHVlc1tcInBpZ1Byb3BlcnRpZXNcIl1baV0ueSwgXG4gICAgICAgICAgICAgICAgY3VycmVudFN0YWdlVmFsdWVzW1wicGlnUHJvcGVydGllc1wiXVtpXS5yYWQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3VycmVudFN0YWdlVmFsdWVzW1wibnVtYmVyT2ZCbG9ja3NcIl07IGkrKykge1xuICAgICAgICAgICAgdGhpcy5ibG9ja3MucHVzaChuZXcgQmxvY2soXG4gICAgICAgICAgICAgICAgdGhpcy5jdHgsIFxuICAgICAgICAgICAgICAgIGN1cnJlbnRTdGFnZVZhbHVlc1tcImJsb2NrUHJvcGVyaXRlc1wiXVtpXS54LCBcbiAgICAgICAgICAgICAgICBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJibG9ja1Byb3Blcml0ZXNcIl1baV0ueSxcbiAgICAgICAgICAgICAgICBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJibG9ja1Byb3Blcml0ZXNcIl1baV0udyxcbiAgICAgICAgICAgICAgICBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJibG9ja1Byb3Blcml0ZXNcIl1baV0uaCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlRW50aXRpZXMoKSB7XG4gICAgICAgIHRoaXMucHJvamVjdGlsZU9iamVjdC51cGRhdGUoKVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGlncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5waWdzW2ldLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ibG9ja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tzW2ldLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb2plY3RpbGVPYmplY3QuY3VycmVudFByb2plY3RpbGVPYmplY3QpIHRoaXMudXBkYXRlUGlnc0xlZnQoKTtcbiAgICAgICAgdGhpcy51cGRhdGVIaWdoU2NvcmUoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVIaWdoU2NvcmUoKSB7XG4gICAgICAgIGlmICh0aGlzLnNjb3JlID4gdGhpcy5oaWdoU2NvcmUpIHtcbiAgICAgICAgICAgIHRoaXMuaGlnaFNjb3JlID0gdGhpcy5zY29yZTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuY3VycmVudExldmVsSGlnaFNjb3JlS2V5LCB0aGlzLmhpZ2hTY29yZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVQaWdzTGVmdCgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBpZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjaGVja0JpcmRBbmRQaWdTdGF0ZSh0aGlzLnByb2plY3RpbGVPYmplY3QuY3VycmVudFByb2plY3RpbGVPYmplY3Quc3RhdGUsIHRoaXMucGlnc1tpXS5zdGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5waWdzW2ldLnBvb2ZBbmltYXRpb25UaW1lckJvb2xlYW4oKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBpZ3Muc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrQW5kVXBkYXRlRW50aXRpZXNDb2xsaXNpb24oKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5waWdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoY2hlY2tCaXJkT25QaWdDb2xsaXNpb24odGhpcy5wcm9qZWN0aWxlT2JqZWN0LmN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LCB0aGlzLnBpZ3NbaV0pKSB7XG4gICAgICAgICAgICAgICAgYmlyZE9uUGlnQ29sbGlzaW9uTG9naWModGhpcy5wcm9qZWN0aWxlT2JqZWN0LmN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LCB0aGlzLnBpZ3NbaV0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc2NvcmUgKz0gMzAwMDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJsb2Nrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGNoZWNrQmlyZE9uQmxvY2tDb2xsaXNpb24odGhpcy5wcm9qZWN0aWxlT2JqZWN0LmN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LCB0aGlzLmJsb2Nrc1tpXSkpIHtcbiAgICAgICAgICAgICAgICBiaXJkT25CbG9ja0NvbGxpc2lvbkxvZ2ljKHRoaXMucHJvamVjdGlsZU9iamVjdC5jdXJyZW50UHJvamVjdGlsZU9iamVjdCwgdGhpcy5ibG9ja3NbaV0pXG4gICAgICAgICAgICAgICAgdGhpcy5zY29yZSArPSAzMjU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJFbnRpdGllcygpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlT2JqZWN0LnJlbmRlcigpO1xuICAgICAgICB0aGlzLnByb2plY3RpbGVPYmplY3QucmVuZGVyTGl2ZXMoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBpZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucGlnc1tpXS5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYmxvY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmJsb2Nrc1tpXS5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbmRlclNjb3JlKCk7XG4gICAgICAgIHRoaXMucmVuZGVySGlnaFNjb3JlKCk7XG4gICAgICAgIHRoaXMucmVuZGVyU3RhZ2VOdW1iZXIoKTtcbiAgICB9XG5cbiAgICByZW5kZXJTY29yZSgpIHsgXG4gICAgICAgIHRoaXMuY3R4LnRleHRBbGlnbiA9IFwicmlnaHRcIjtcbiAgICAgICAgdGhpcy5jdHgudGV4dEJhc2VsaW5lID0gXCJ0b3BcIjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJXSElURVwiO1xuICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IFwiQkxBQ0tcIjtcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IDUwICsgXCJweCBCYW5nZXJzXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KHRoaXMuc2NvcmUsIHRoaXMuY2FudmFzLndpZHRoIC0gMzAgLyAyLCAwKVxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KHRoaXMuc2NvcmUsIHRoaXMuY2FudmFzLndpZHRoIC0gMzAgLyAyLCAwKTtcblxuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcInJpZ2h0XCI7XG4gICAgICAgIHRoaXMuY3R4LnRleHRCYXNlbGluZSA9IFwidG9wXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiV0hJVEVcIjtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIkJMQUNLXCI7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSA1MCArIFwicHggQmFuZ2Vyc1wiO1xuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KFwiU2NvcmU6ICAgICAgICAgICAgICAgICAgICAgIFwiLCB0aGlzLmNhbnZhcy53aWR0aCAtIDMwIC8gMiwgMCk7XG4gICAgfVxuXG4gICAgcmVuZGVySGlnaFNjb3JlKCkge1xuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcInJpZ2h0XCI7XG4gICAgICAgIHRoaXMuY3R4LnRleHRCYXNlbGluZSA9IFwidG9wXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiV0hJVEVcIjtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIkJMQUNLXCI7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSA1MCArIFwicHggQmFuZ2Vyc1wiO1xuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCh0aGlzLmhpZ2hTY29yZSwgdGhpcy5jYW52YXMud2lkdGggLSAzMCAvIDIsIDYwKTtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dCh0aGlzLmhpZ2hTY29yZSwgdGhpcy5jYW52YXMud2lkdGggLSAzMCAvIDIsIDYwKTtcblxuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcInJpZ2h0XCI7XG4gICAgICAgIHRoaXMuY3R4LnRleHRCYXNlbGluZSA9IFwidG9wXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiV0hJVEVcIjtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIkJMQUNLXCI7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSA1MCArIFwicHggQmFuZ2Vyc1wiO1xuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KFwiSGlnaHNjb3JlOiAgICAgICAgICAgICAgICAgICAgICBcIiwgdGhpcy5jYW52YXMud2lkdGggLSAzMCAvIDIsIDYwKTtcbiAgICB9XG5cbiAgICByZW5kZXJTdGFnZU51bWJlcigpIHtcbiAgICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gXCJsZWZ0XCI7XG4gICAgICAgIHRoaXMuY3R4LnRleHRCYXNlbGluZSA9IFwidG9wXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiV0hJVEVcIjtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIkJMQUNLXCI7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSAzMCArIFwicHggQmFuZ2Vyc1wiO1xuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIkxldmVsIFwiICsgdGhpcy5zdGFnZU51bWJlciwgMTAsIDEwKVxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KFwiTGV2ZWwgXCIgKyB0aGlzLnN0YWdlTnVtYmVyLCAgMTAsIDEwKTtcbiAgICB9XG5cbiAgICBjaGVja1N0YWdlTG9zdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvamVjdGlsZU9iamVjdC5sb3N0QWxsUHJvamVjdGlsZU9iamVjdHMoKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RhZ2VMb2FkZXI7IiwiZXhwb3J0IGNvbnN0IHN0YWdlS2V5cyA9IHtcbiAgICAxIDoge1xuICAgICAgICBcImN1cnJlbnRMZXZlbEhpZ2hTY29yZUtleVwiOiBcImhpZ2hTY29yZUtleUxldmVsMVwiLFxuICAgICAgICBcIm51bWJlck9mUGlnc1wiOiAyLFxuICAgICAgICBcInBpZ1Byb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgMCA6IHtcbiAgICAgICAgICAgICAgICB4OiA1MDAsXG4gICAgICAgICAgICAgICAgeTogNjAwLFxuICAgICAgICAgICAgICAgIHJhZDogMTUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgMSA6IHtcbiAgICAgICAgICAgICAgICB4OiAxMjAwLFxuICAgICAgICAgICAgICAgIHk6IDYwMCxcbiAgICAgICAgICAgICAgICByYWQ6IDE1LFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcIm51bWJlck9mQmxvY2tzXCI6IDIsXG4gICAgICAgIFwiYmxvY2tQcm9wZXJpdGVzXCI6IHtcbiAgICAgICAgICAgIDAgOiB7XG4gICAgICAgICAgICAgICAgeDogMTAwMCxcbiAgICAgICAgICAgICAgICB5OiA3MDAsXG4gICAgICAgICAgICAgICAgdzogMzAsXG4gICAgICAgICAgICAgICAgaDogMTAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIDE6IHtcbiAgICAgICAgICAgICAgICB4OiA3MDAsXG4gICAgICAgICAgICAgICAgeTogNzAwLFxuICAgICAgICAgICAgICAgIHc6IDUwLFxuICAgICAgICAgICAgICAgIGg6IDE0MCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJiaXJkUHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICBwbGF5ZXJMaXZlczogMyxcbiAgICAgICAgICAgIHg6IDEyMCxcbiAgICAgICAgICAgIHk6IDYzMCxcbiAgICAgICAgICAgIHJhZDogMTQsXG4gICAgICAgIH1cbiAgICB9XG59IiwiZXhwb3J0IGNvbnN0IGNoZWNrQmlyZE9uUGlnQ29sbGlzaW9uID0gKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LCBwaWcpID0+IHtcbiAgICBpZiAoY3VycmVudFByb2plY3RpbGVPYmplY3QueCArIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnJhZGl1cyArIHBpZy5yYWRpdXMgPiBwaWcueFxuICAgICAgICAmJiBjdXJyZW50UHJvamVjdGlsZU9iamVjdC54IDwgcGlnLnggKyBjdXJyZW50UHJvamVjdGlsZU9iamVjdC5yYWRpdXMgKyBwaWcucmFkaXVzXG4gICAgICAgICYmIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnkgKyBjdXJyZW50UHJvamVjdGlsZU9iamVjdC5yYWRpdXMgKyBwaWcucmFkaXVzID4gcGlnLnlcbiAgICAgICAgJiYgY3VycmVudFByb2plY3RpbGVPYmplY3QueSA8IHBpZy55ICsgY3VycmVudFByb2plY3RpbGVPYmplY3QucmFkaXVzICsgcGlnLnJhZGl1cykgXG4gICAge1xuICAgICAgICAvLyBweXRoYWdvcmVhbSB0aGVvcmVtIHRvIGJlIG1vcmUgZXhhY3Qgb24gY29sbGlzaW9uXG4gICAgICAgIGxldCBkaXN0YW5jZSA9IE1hdGguc3FydChcbiAgICAgICAgICAgICAgICAoKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnggLSBwaWcueCkgKiAoY3VycmVudFByb2plY3RpbGVPYmplY3QueCAtIHBpZy54KSlcbiAgICAgICAgICAgICsgKChjdXJyZW50UHJvamVjdGlsZU9iamVjdC55IC0gcGlnLnkpICogKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnkgLSBwaWcueSkpXG4gICAgICAgIClcbiAgICAgICAgcmV0dXJuIGRpc3RhbmNlIDwgY3VycmVudFByb2plY3RpbGVPYmplY3QucmFkaXVzICsgcGlnLnJhZGl1czsgXG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgY2hlY2tCaXJkT25CbG9ja0NvbGxpc2lvbiA9IChjdXJyZW50UHJvamVjdGlsZU9iamVjdCwgYmxvY2spID0+IHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDQ7IGorKyl7XG4gICAgICAgIGNvbnN0IGNpcmNsZUNlbnRlciA9IFtjdXJyZW50UHJvamVjdGlsZU9iamVjdC54LCBjdXJyZW50UHJvamVjdGlsZU9iamVjdC55XTtcbiAgICAgICAgaWYgKGogKyAxID09PSA0KSB7XG4gICAgICAgICAgICBpZiAoY2hlY2tCaXJkSW50ZXJjZXB0QmxvY2soYmxvY2suZ2V0UG9pbnQoaiksIGJsb2NrLmdldFBvaW50KDApLCBjaXJjbGVDZW50ZXIsIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnJhZGl1cykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjaGVja0JpcmRJbnRlcmNlcHRCbG9jayhibG9jay5nZXRQb2ludChqKSwgYmxvY2suZ2V0UG9pbnQoaiArIDEpLCBjaXJjbGVDZW50ZXIsIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnJhZGl1cykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuY29uc3QgY2hlY2tCaXJkSW50ZXJjZXB0QmxvY2sgPSAocG9pbnRBLCBwb2ludEIsIGNpcmNsZUNlbnRlciwgcmFkaXVzKSA9PiB7XG4gICAgbGV0IGRpc3Q7XG4gICAgY29uc3QgdmVsMVggPSBwb2ludEIucG9zLnggLSBwb2ludEEucG9zLng7XG4gICAgY29uc3QgdmVsMVkgPSBwb2ludEIucG9zLnkgLSBwb2ludEEucG9zLnk7XG4gICAgY29uc3QgdmVsMlggPSBjaXJjbGVDZW50ZXJbMF0gLSBwb2ludEEucG9zLng7XG4gICAgY29uc3QgdmVsMlkgPSBjaXJjbGVDZW50ZXJbMV0gLSBwb2ludEEucG9zLnk7XG4gICAgY29uc3QgdW5pdCA9ICh2ZWwyWCAqIHZlbDFYICsgdmVsMlkgKiB2ZWwxWSkgLyAodmVsMVkgKiB2ZWwxWSArIHZlbDFYICogdmVsMVgpO1xuICAgIGlmICh1bml0ID49IDAgJiYgdW5pdCA8PSAxKXtcbiAgICAgICAgZGlzdCA9IChwb2ludEEucG9zLnggICsgdmVsMVggKiB1bml0IC0gY2lyY2xlQ2VudGVyWzBdKSAqKiAyICsgKHBvaW50QS5wb3MueSArIHZlbDFZICogdW5pdCAtIGNpcmNsZUNlbnRlclsxXSkgKiogMjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBkaXN0ID0gdW5pdCA8IDAgPyBcbiAgICAgICAgICAgIChwb2ludEEucG9zLnggLSBjaXJjbGVDZW50ZXJbMF0pICoqIDIgKyAocG9pbnRBLnBvcy55IC0gY2lyY2xlQ2VudGVyWzFdKSAqKiAyIDpcbiAgICAgICAgICAgIChwb2ludEIucG9zLnggLSBjaXJjbGVDZW50ZXJbMF0pICoqIDIgKyAocG9pbnRCLnBvcy55IC0gY2lyY2xlQ2VudGVyWzFdKSAqKiAyO1xuICAgIH1cbiAgICByZXR1cm4gZGlzdCA8IHJhZGl1cyAqIHJhZGl1cztcbn1cblxuXG5cblxuXG4iLCJleHBvcnQgY29uc3QgYmlyZE9uUGlnQ29sbGlzaW9uTG9naWMgPSAoY3VycmVudFByb2plY3RpbGVPYmplY3QsIHBpZykgPT4ge1xuICAgIHBpZy5zdGF0ZSA9IFwiZGVhZFwiO1xuICAgIGxldCBuZXdWZWxYMSA9IChjdXJyZW50UHJvamVjdGlsZU9iamVjdC52ZWxYICogKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0Lm1hc3MgLSBwaWcubWFzcykgKyAoIDIgKiBwaWcubWFzcyAqIHBpZy52ZWxYKSkgLyAoY3VycmVudFByb2plY3RpbGVPYmplY3QubWFzcyArIHBpZy5tYXNzKTtcbiAgICBsZXQgbmV3VmVsWTEgPSAoY3VycmVudFByb2plY3RpbGVPYmplY3QudmVsWSAqIChjdXJyZW50UHJvamVjdGlsZU9iamVjdC5tYXNzIC0gcGlnLm1hc3MpICsgKCAyICogcGlnLm1hc3MgKiBwaWcudmVsWSkpIC8gKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0Lm1hc3MgKyBwaWcubWFzcyk7XG4gICAgbGV0IG5ld1ZlbFgyID0gKHBpZy52ZWxYICogKHBpZy5tYXNzIC0gY3VycmVudFByb2plY3RpbGVPYmplY3QubWFzcykgKyAoMiAqIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0Lm1hc3MgKiBjdXJyZW50UHJvamVjdGlsZU9iamVjdC52ZWxYKSkgLyAoY3VycmVudFByb2plY3RpbGVPYmplY3QubWFzcyArIHBpZy5tYXNzKTtcbiAgICBsZXQgbmV3VmVsWTIgPSAocGlnLnZlbFkgKiAocGlnLm1hc3MgLSBjdXJyZW50UHJvamVjdGlsZU9iamVjdC5tYXNzKSArICgyICogY3VycmVudFByb2plY3RpbGVPYmplY3QubWFzcyAqIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFkpKSAvIChjdXJyZW50UHJvamVjdGlsZU9iamVjdC5tYXNzICsgcGlnLm1hc3MpO1xuICAgIFxuICAgIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFggPSAtY3VycmVudFByb2plY3RpbGVPYmplY3QudmVsWDtcbiAgICBjdXJyZW50UHJvamVjdGlsZU9iamVjdC52ZWxZID0gLWN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFk7XG4gICAgcGlnLnZlbFggPSBuZXdWZWxYMjtcbiAgICBwaWcudmVsWSA9IG5ld1ZlbFkyO1xuXG4gICAgY3VycmVudFByb2plY3RpbGVPYmplY3QueCA9IGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnggKyBuZXdWZWxYMTtcbiAgICBjdXJyZW50UHJvamVjdGlsZU9iamVjdC55ID0gY3VycmVudFByb2plY3RpbGVPYmplY3QueSArIG5ld1ZlbFkxO1xuICAgIHBpZy54ID0gcGlnLnggKyBuZXdWZWxYMjtcbiAgICBwaWcueSA9IHBpZy55ICsgbmV3VmVsWTI7XG59XG5cbmV4cG9ydCBjb25zdCBiaXJkT25CbG9ja0NvbGxpc2lvbkxvZ2ljID0gKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LCBibG9jaykgPT4ge1xuICAgIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFggPSAtY3VycmVudFByb2plY3RpbGVPYmplY3QudmVsWDtcbiAgICBjdXJyZW50UHJvamVjdGlsZU9iamVjdC52ZWxZID0gLWN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFk7XG4gICAgbGV0IGZvcmNlID0gYmxvY2suYXNQb2xhcihibG9jay52ZWN0b3IoMTAsIDEwKSk7XG4gICAgZm9yY2UubWFnICo9IGJsb2NrLm1hc3MgKiAwLjE7XG4gICAgYmxvY2suYXBwbHlGb3JjZShmb3JjZSwgYmxvY2sudmVjdG9yKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LngsIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnkpKTtcbn1cblxuXG4iLCJleHBvcnQgY29uc3QgY2hlY2tCaXJkQW5kUGlnU3RhdGUgPSAoY3VycmVudFByb2plY3RpbGVPYmplY3RTdGF0ZSwgcGlnU3RhdGUpID0+IHtcbiAgICBpZiAoY3VycmVudFByb2plY3RpbGVPYmplY3RTdGF0ZSA9PT0gXCJlbmRTdGF0ZVwiICYmIHBpZ1N0YXRlID09PSBcImRlYWRcIikgcmV0dXJuIHRydWU7XG59XG5cbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vc3R5bGVzL2luZGV4LnNjc3NcIjtcbmltcG9ydCBBbmdlcmVkQmlyZHMgZnJvbSBcIi4vc2NyaXB0cy9nYW1lXCI7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FudmFzXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBpbml0KTtcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzZXQtaGlnaHNjb3JlXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZXNldExvY2FsU3RvcmFnZSk7XG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc3RhcnQtYnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZXN0YXJ0R2FtZSk7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgbmV3IEFuZ2VyZWRCaXJkcygpLnN0YXJ0KCk7XG59XG5cbmZ1bmN0aW9uIHJlc3RhcnRHYW1lKCkge1xuICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBcIlwiO1xufVxuXG5mdW5jdGlvbiByZXNldExvY2FsU3RvcmFnZSgpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLmNsZWFyKCk7XG59XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=