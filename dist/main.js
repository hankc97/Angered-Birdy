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
    this.bird.src = "src/images/birds.png";
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

    this.animating = true;
  }

  _createClass(AngeredBirds, [{
    key: "start",
    value: function start() {
      var _this = this;

      this.canvas = new _canvas__WEBPACK_IMPORTED_MODULE_0__.default();
      this.canvas.bindCanvasToDOM();
      this.initializeEntities();

      var animation = function animation() {
        _this.canvas.clearCanvas();

        if (_this.animating) {
          _this.stageLoader.update();

          window.requestAnimationFrame(animation);
        }
      };

      window.requestAnimationFrame(animation);
    }
  }, {
    key: "initializeEntities",
    value: function initializeEntities() {
      this.stageLoader = new _stageLoader__WEBPACK_IMPORTED_MODULE_1__.default(this.canvas.ctx);
      this.stageLoader.initializeEntities();
      this.stageLoader.initializeEventListeners();
    }
  }, {
    key: "gameOver",
    value: function gameOver() {// restart Game, after certain birdy shots
      // drop eventListeners and reattach DOM canvas node
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
    this.projectileImage.src = "src/images/pixil-layer-Background.png";
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
      this.ctx.drawImage(this.projectileImage, this.birdProperties.x - 30, this.birdProperties.y - 70);

      for (var i = 0; i < this.launchedObjects.length; i++) {
        var currentBird = this.launchedObjects[i].objectType;
        currentBird.render();
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
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }








var StageLoader = /*#__PURE__*/function () {
  function StageLoader(ctx) {
    _classCallCheck(this, StageLoader);

    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.score = 0;
    this.stageNumber = 1; // this.highscore using localStorage

    this.startPosBird = [];
    this.projectileObject = {};
    this.pigs = [];
    this.blocks = [];
  }

  _createClass(StageLoader, [{
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
    key: "loadStage",
    value: function loadStage(currentStageValues) {
      this.projectileObject = new _projectile__WEBPACK_IMPORTED_MODULE_2__.default(this.ctx, currentStageValues["birdProperties"]);
      this.startPosBird = [currentStageValues["birdProperties"].x, currentStageValues["birdProperties"].y];

      for (var i = 0; i < currentStageValues["numberOfPigs"]; i++) {
        this.pigs.push(new _pig__WEBPACK_IMPORTED_MODULE_0__.default(this.ctx, currentStageValues["pigProperties"][i].x, currentStageValues["pigProperties"][i].y, currentStageValues["pigProperties"][i].rad));
      }

      for (var _i = 0; _i < currentStageValues["numberOfBlocks"]; _i++) {
        this.blocks.push(new _block__WEBPACK_IMPORTED_MODULE_1__.default(this.ctx, currentStageValues["blockProperites"][_i].x, currentStageValues["blockProperites"][_i].y, currentStageValues["blockProperites"][_i].w, currentStageValues["blockProperites"][_i].h));
      }
    }
  }, {
    key: "update",
    value: function update() {
      this.updateEntities();
      if (this.projectileObject.objectLaunched) this.checkAndUpdateEntitiesCollision();
      this.renderEntities();
    }
  }, {
    key: "updateEntities",
    value: function updateEntities() {
      this.projectileObject.update();

      for (var i = 0; i < this.pigs.length; i++) {
        this.pigs[i].update();
      }

      for (var _i2 = 0; _i2 < this.pigs.length; _i2++) {
        this.blocks[_i2].update();
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

      for (var i = 0; i < this.pigs.length; i++) {
        this.pigs[i].render();
      }

      for (var _i4 = 0; _i4 < this.pigs.length; _i4++) {
        this.blocks[_i4].render();
      }

      this.renderScore();
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
    "numberOfPigs": 2,
    "pigProperties": {
      0: {
        x: 500,
        y: 600,
        rad: 15
      },
      1: {
        x: 600,
        y: 600,
        rad: 15
      }
    },
    "numberOfBlocks": 2,
    "blockProperites": {
      0: {
        x: 350,
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

function init() {
  new _scripts_game__WEBPACK_IMPORTED_MODULE_1__.default().start();
}
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYmlyZC5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYmxvY2suanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi8uL3NyYy9zY3JpcHRzL2NhbnZhcy5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvcGlnLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9wcm9qZWN0aWxlLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9zdGFnZUxvYWRlci5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvc3RhZ2VzL3N0YWdlS2V5cy5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvdXRpbC9jb2xsaXNpb25EZXRlY3Rpb25VdGlsLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy91dGlsL2NvbGxpc2lvbkxvZ2ljVXRpbC5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIkJpcmQiLCJjdHgiLCJiaXJkUHJvcGVydGllcyIsIngiLCJ5IiwicmFkaXVzIiwicmFkIiwibWFzcyIsInZlbFgiLCJ2ZWxZIiwidHJhbnNmZXIiLCJncmF2aXR5IiwiZ3JvdW5kIiwiY2FudmFzIiwiaGVpZ2h0IiwiYm91bmNlIiwiZnJpY3Rpb25YIiwiYmlyZCIsIkltYWdlIiwic3JjIiwic2F2ZSIsImJlZ2luUGF0aCIsImFyYyIsIk1hdGgiLCJQSSIsImNsaXAiLCJjbG9zZVBhdGgiLCJkcmF3SW1hZ2UiLCJyZXN0b3JlIiwiQmxvY2siLCJ3IiwiaCIsInIiLCJkeCIsImR5IiwiZHIiLCJJTlNFVCIsIlBJOTAiLCJQSTIiLCJXQUxMX05PUk1TIiwiX2dyb3VuZCIsImdldE1hc3MiLCJzZXRUcmFuc2Zvcm0iLCJyb3RhdGUiLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsInN0cm9rZVJlY3QiLCJpIiwicCIsImdldFBvaW50IiwicG9zIiwiZG9Db2xsaXNpb24iLCJ3aWR0aCIsIndoaWNoIiwieHgiLCJ5eSIsInZlbG9jaXR5QSIsInZlbG9jaXR5VCIsInZlbG9jaXR5IiwiY29zIiwic2luIiwiZGV0YWlscyIsImFzUG9sYXIiLCJ2ZWN0b3IiLCJwb2xhciIsIm1hZyIsImRpciIsInZlY3RvckFkZCIsInZhbGlkYXRlUG9sYXIiLCJ2ZWMiLCJpc1BvbGFyIiwicFZlYyIsInJldFYiLCJpc0NhcnQiLCJjYXJ0VG9Qb2xhciIsInVuZGVmaW5lZCIsInBvbGFyVG9DYXJ0IiwiYXRhbjIiLCJoeXBvdCIsInZlYzEiLCJ2ZWMyIiwidjEiLCJhc0NhcnQiLCJ2MiIsImZvcmNlIiwibG9jIiwibCIsInRvQ2VudGVyIiwicGhldGEiLCJGdiIsIkZhIiwiYWNjZWwiLCJkZWx0YVYiLCJhY2NlbEEiLCJ2IiwiZDEiLCJkMiIsImFsb25nIiwidGFuZ2VudCIsInBvaW50RGV0YWlscyIsIndhbGxJbmRleCIsInZ2IiwidmEiLCJ2dmMiLCJ2ZWN0b3JDb21wb25lbnRzRm9yRGlyIiwidmFjIiwiYXBwbHlGb3JjZSIsIkNhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImdldENvbnRleHQiLCJiaW5kQ2FudmFzVG9ET00iLCJxdWVyeVNlbGVjdG9yIiwiY2xlYXJDYW52YXMiLCJib2R5IiwiYXBwZW5kIiwiY2xhc3NMaXN0IiwiYWRkIiwiY2xlYXJSZWN0IiwiQW5nZXJlZEJpcmRzIiwiYW5pbWF0aW5nIiwiaW5pdGlhbGl6ZUVudGl0aWVzIiwiYW5pbWF0aW9uIiwic3RhZ2VMb2FkZXIiLCJ1cGRhdGUiLCJ3aW5kb3ciLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJTdGFnZUxvYWRlciIsImluaXRpYWxpemVFdmVudExpc3RlbmVycyIsIlBpZyIsInBpZyIsImFicyIsIlByb2plY3RpbGUiLCJsYXVuY2hlZE9iamVjdHMiLCJtYXgiLCJwcm9qZWN0aWxlSW1hZ2UiLCJhbmdsZVZhbCIsIm1hZ25pdHVkZVZhbCIsImFuZ2xlIiwiY3VycmVudFByb2plY3RpbGVPYmplY3QiLCJvYmplY3RMYXVuY2hlZCIsIk9iamVjdExhdW5jaCIsIm9iamVjdFR5cGUiLCJwdXNoIiwibGVuZ3RoIiwic3BsaWNlIiwiY3VycmVudE9iamVjdCIsInVwZGF0ZUN1cnJlbnRMYXVuY2hlZE9iamVjdCIsImN1cnJlbnRCaXJkIiwicmVuZGVyIiwic2NvcmUiLCJzdGFnZU51bWJlciIsInN0YXJ0UG9zQmlyZCIsInByb2plY3RpbGVPYmplY3QiLCJwaWdzIiwiYmxvY2tzIiwibW91c2UiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImNhbnZhc1Byb3BlcnRpZXMiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJsZWZ0IiwidG9wIiwiZGVsdGFYIiwiZGVsdGFZIiwidGhldGFSYWRpYW4iLCJraWNrT2ZmTGF1bmNoRGlyZWN0aW9uIiwiYmluZCIsImN1cnJlbnRTdGFnZVZhbHVlcyIsInN0YWdlS2V5cyIsImxvYWRTdGFnZSIsInVwZGF0ZUVudGl0aWVzIiwiY2hlY2tBbmRVcGRhdGVFbnRpdGllc0NvbGxpc2lvbiIsInJlbmRlckVudGl0aWVzIiwiY2hlY2tCaXJkT25QaWdDb2xsaXNpb24iLCJiaXJkT25QaWdDb2xsaXNpb25Mb2dpYyIsImNoZWNrQmlyZE9uQmxvY2tDb2xsaXNpb24iLCJiaXJkT25CbG9ja0NvbGxpc2lvbkxvZ2ljIiwicmVuZGVyU2NvcmUiLCJ0ZXh0QWxpZ24iLCJ0ZXh0QmFzZWxpbmUiLCJzdHJva2VTdHlsZSIsImZvbnQiLCJmaWxsVGV4dCIsInN0cm9rZVRleHQiLCJkaXN0YW5jZSIsInNxcnQiLCJibG9jayIsImoiLCJjaXJjbGVDZW50ZXIiLCJjaGVja0JpcmRJbnRlcmNlcHRCbG9jayIsInBvaW50QSIsInBvaW50QiIsImRpc3QiLCJ2ZWwxWCIsInZlbDFZIiwidmVsMlgiLCJ2ZWwyWSIsInVuaXQiLCJuZXdWZWxYMSIsIm5ld1ZlbFkxIiwibmV3VmVsWDIiLCJuZXdWZWxZMiIsImluaXQiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBTUEsSTtBQUNGLGdCQUFZQyxHQUFaLEVBQWlCQyxjQUFqQixFQUFpQztBQUFBOztBQUM3QixTQUFLRCxHQUFMLEdBQVdBLEdBQVg7QUFDQSxTQUFLRSxDQUFMLEdBQVNELGNBQWMsQ0FBQ0MsQ0FBeEI7QUFDQSxTQUFLQyxDQUFMLEdBQVNGLGNBQWMsQ0FBQ0UsQ0FBeEI7QUFDQSxTQUFLQyxNQUFMLEdBQWNILGNBQWMsQ0FBQ0ksR0FBN0I7QUFDQSxTQUFLQyxJQUFMLEdBQVksQ0FBWjtBQUNBLFNBQUtDLElBQUwsR0FBWSxDQUFaO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLENBQVo7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLEdBQWhCO0FBQ0EsU0FBS0MsT0FBTCxHQUFlO0FBQUVSLE9BQUMsRUFBRSxDQUFMO0FBQVFDLE9BQUMsRUFBRTtBQUFY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OztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLDZDQUE2Qyx3REFBd0QsRTs7Ozs7V0NBckc7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBRUF3RyxRQUFRLENBQUNJLGFBQVQsQ0FBdUIsU0FBdkIsRUFBa0M2QyxnQkFBbEMsQ0FBbUQsT0FBbkQsRUFBNEQ4QyxJQUE1RDs7QUFDQSxTQUFTQSxJQUFULEdBQWdCO0FBQ1osTUFBSXBGLGtEQUFKLEdBQW1CcUYsS0FBbkI7QUFDSCxDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBCaXJkIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgsIGJpcmRQcm9wZXJ0aWVzKSB7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLnggPSBiaXJkUHJvcGVydGllcy54O1xuICAgICAgICB0aGlzLnkgPSBiaXJkUHJvcGVydGllcy55O1xuICAgICAgICB0aGlzLnJhZGl1cyA9IGJpcmRQcm9wZXJ0aWVzLnJhZDtcbiAgICAgICAgdGhpcy5tYXNzID0gMjtcbiAgICAgICAgdGhpcy52ZWxYID0gMDtcbiAgICAgICAgdGhpcy52ZWxZID0gMDtcbiAgICAgICAgdGhpcy50cmFuc2ZlciA9IDAuOTtcbiAgICAgICAgdGhpcy5ncmF2aXR5ID0geyB4OiAwLCB5OiAwLjEgfTtcbiAgICAgICAgdGhpcy5ncm91bmQgPSB0aGlzLmN0eC5jYW52YXMuaGVpZ2h0IC0gMjA7XG4gICAgICAgIHRoaXMuYm91bmNlID0gMC41O1xuICAgICAgICB0aGlzLmZyaWN0aW9uWCA9IDAuOTtcbiAgICAgICAgdGhpcy5iaXJkID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMuYmlyZC5zcmMgPSBcInNyYy9pbWFnZXMvYmlyZHMucG5nXCJcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5yYWRpdXMsIDAsIChNYXRoLlBJICogMiksIGZhbHNlKTtcbiAgICAgICAgdGhpcy5jdHguY2xpcCgpO1xuICAgICAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMuYmlyZCwgdGhpcy54IC0gdGhpcy5yYWRpdXMsIHRoaXMueSAtIHRoaXMucmFkaXVzLCB0aGlzLnJhZGl1cyAqIDIsIHRoaXMucmFkaXVzICogMilcbiAgICAgICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmlyZDsiLCJjbGFzcyBCbG9jayB7XG4gICAgY29uc3RydWN0b3IoY3R4LCB4LCB5LCB3LCBoKSB7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGN0eC5jYW52YXM7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMudyA9IHc7XG4gICAgICAgIHRoaXMuaCA9IGg7XG4gICAgICAgIHRoaXMuciA9IDAuMTtcbiAgICAgICAgdGhpcy5keCA9IDA7XG4gICAgICAgIHRoaXMuZHkgPSAwO1xuICAgICAgICB0aGlzLmRyID0gMDtcbiAgICAgICAgdGhpcy5JTlNFVCA9IDEwO1xuICAgICAgICB0aGlzLlBJID0gTWF0aC5QSTtcbiAgICAgICAgdGhpcy5QSTkwID0gTWF0aC5QSSAvIDI7XG4gICAgICAgIHRoaXMuUEkyID0gTWF0aC5QSSAqIDI7XG4gICAgICAgIHRoaXMuV0FMTF9OT1JNUyA9IFsgTWF0aC5QSSAvIDIsIE1hdGguUEksIC0oTWF0aC5QSSAvIDIpLCAwXVxuICAgICAgICB0aGlzLl9ncm91bmQgPSB0aGlzLmNhbnZhcy5oZWlnaHQgLSAxMDU7XG4gICAgICAgIHRoaXMubWFzcyA9IHRoaXMuZ2V0TWFzcygpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLmN0eC5zYXZlKClcbiAgICAgICAgdGhpcy5jdHguc2V0VHJhbnNmb3JtKDEsMCwwLDEsdGhpcy54LHRoaXMueSk7XG4gICAgICAgIHRoaXMuY3R4LnJvdGF0ZSh0aGlzLnIpO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIkJsdWVcIjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoLXRoaXMudy8yLCAtdGhpcy5oLzIsIHRoaXMudywgdGhpcy5oKVxuICAgICAgICB0aGlzLmN0eC5zdHJva2VSZWN0KC10aGlzLncvMiwgLXRoaXMuaC8yLCB0aGlzLncsIHRoaXMuaClcbiAgICAgICAgdGhpcy5jdHgucmVzdG9yZSgpXG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLnggKz0gdGhpcy5keDtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMuZHk7XG4gICAgICAgIHRoaXMuZHkgKz0gMC4wNjE7XG4gICAgICAgIHRoaXMuciArPSB0aGlzLmRyO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCA0OyBpKyspe1xuICAgICAgICAgICAgdmFyIHAgPSB0aGlzLmdldFBvaW50KGkpO1xuICAgICAgICAgICAgLy8gb25seSBkbyBvbmUgY29sbGlzaW9uIHBlciBmcmFtZSBvciB3ZSB3aWxsIGVuZCB1cCBhZGRpbmcgZW5lcmd5XG4gICAgICAgICAgICBpZihwLnBvcy54IDwgdGhpcy5JTlNFVCl7XG4gICAgICAgICAgICAgICAgdGhpcy54ICs9ICh0aGlzLklOU0VUKSAtIHAucG9zLng7XG4gICAgICAgICAgICAgICAgdGhpcy5kb0NvbGxpc2lvbihwLDMpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKCBwLnBvcy54ID4gdGhpcy5jYW52YXMud2lkdGgtdGhpcy5JTlNFVCl7XG4gICAgICAgICAgICAgICAgdGhpcy54ICs9ICh0aGlzLmNhbnZhcy53aWR0aCAtIHRoaXMuSU5TRVQpIC0gcC5wb3MueDtcbiAgICAgICAgICAgICAgICB0aGlzLmRvQ29sbGlzaW9uKHAsMSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYocC5wb3MueSA8IHRoaXMuSU5TRVQpe1xuICAgICAgICAgICAgICAgIHRoaXMueSArPSAodGhpcy5JTlNFVCkgLSBwLnBvcy55O1xuICAgICAgICAgICAgICAgIHRoaXMuZG9Db2xsaXNpb24ocCwwKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiggcC5wb3MueSA+IHRoaXMuY2FudmFzLmhlaWdodCAtIHRoaXMuSU5TRVQpe1xuICAgICAgICAgICAgICAgIHRoaXMueSArPSAodGhpcy5jYW52YXMuaGVpZ2h0IC0gdGhpcy5JTlNFVCkgLSBwLnBvcy55O1xuICAgICAgICAgICAgICAgIHRoaXMuZG9Db2xsaXNpb24ocCwyKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TWFzcygpIHtcbiAgICAgICAgcmV0dXJuICggdGhpcy53ICogdGhpcy5oICogdGhpcy5oKSAvIDEwMDA7XG4gICAgfVxuXG4gICAgZ2V0UG9pbnQod2hpY2gpIHtcbiAgICAgICAgdmFyIGR4LCBkeSwgeCwgeSwgeHgsIHl5LCB2ZWxvY2l0eUEsIHZlbG9jaXR5VCwgdmVsb2NpdHk7XG5cbiAgICAgICAgZHggPSBNYXRoLmNvcyh0aGlzLnIpO1xuICAgICAgICBkeSA9IE1hdGguc2luKHRoaXMucik7XG5cbiAgICAgICAgc3dpdGNoICh3aGljaCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHggPSAtdGhpcy53IC8gMjtcbiAgICAgICAgICAgICAgICB5ID0gLXRoaXMuaCAvIDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgeCA9IHRoaXMudyAvIDI7XG4gICAgICAgICAgICAgICAgeSA9IC10aGlzLmggLyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHggPSB0aGlzLncgLyAyO1xuICAgICAgICAgICAgICAgIHkgPSB0aGlzLmggLyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHggPSAtdGhpcy53IC8gMjtcbiAgICAgICAgICAgICAgICB5ID0gdGhpcy5oIC8gMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICB4ID0gdGhpcy54O1xuICAgICAgICAgICAgICAgIHkgPSB0aGlzLnk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgeHggLCB5eTtcbiAgICAgICAgeHggPSB4ICogZHggKyB5ICogLWR5O1xuICAgICAgICB5eSA9IHggKiBkeSArIHkgKiBkeDtcblxuICAgICAgICB2YXIgZGV0YWlscyA9IHRoaXMuYXNQb2xhcih0aGlzLnZlY3Rvcih4eCwgeXkpKTtcblxuICAgICAgICB4eCArPSB0aGlzLng7XG4gICAgICAgIHl5ICs9IHRoaXMueTtcblxuICAgICAgICB2ZWxvY2l0eUEgPSB0aGlzLnBvbGFyKGRldGFpbHMubWFnICogdGhpcy5kciwgZGV0YWlscy5kaXIgKyB0aGlzLlBJOTApO1xuICAgICAgICB2ZWxvY2l0eVQgPSB0aGlzLnZlY3RvckFkZCh2ZWxvY2l0eSA9IHRoaXMudmVjdG9yKHRoaXMuZHgsIHRoaXMuZHkpLCB2ZWxvY2l0eUEpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2ZWxvY2l0eTogdmVsb2NpdHksXG4gICAgICAgICAgICB2ZWxvY2l0eVQ6IHZlbG9jaXR5VCxcbiAgICAgICAgICAgIHZlbG9jaXR5QSA6IHZlbG9jaXR5QSxcbiAgICAgICAgICAgIHBvczogdGhpcy52ZWN0b3IoeHgsIHl5KSxcbiAgICAgICAgICAgIHJhZGl1czogZGV0YWlscy5tYWdcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBvbGFyKG1hZyA9IDEsIGRpciA9IDApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGVQb2xhcih7ZGlyOiBkaXIsIG1hZzogbWFnfSlcbiAgICB9XG5cbiAgICB2ZWN0b3IoeCA9IDEsIHkgPSAwKSB7XG4gICAgICAgIHJldHVybiB7IHg6IHgsIHk6IHl9O1xuICAgIH1cblxuICAgIHZhbGlkYXRlUG9sYXIodmVjKSB7XG4gICAgICAgIGlmICh0aGlzLmlzUG9sYXIodmVjKSkge1xuICAgICAgICAgICAgaWYodmVjLm1hZyA8IDApe1xuICAgICAgICAgICAgICAgIHZlYy5tYWcgPSAtdmVjLm1hZztcbiAgICAgICAgICAgICAgICB2ZWMuZGlyICs9IHRoaXMuUEk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZlYztcbiAgICB9XG5cbiAgICBwb2xhclRvQ2FydChwVmVjLCByZXRWID0ge3g6IDAsIHk6IDB9KXtcbiAgICAgICAgcmV0Vi54ID0gTWF0aC5jb3MocFZlYy5kaXIpICogcFZlYy5tYWc7XG4gICAgICAgIHJldFYueSA9IE1hdGguc2luKHBWZWMuZGlyKSAqIHBWZWMubWFnO1xuICAgICAgICByZXR1cm4gcmV0VlxuICAgIH1cblxuICAgIGFzUG9sYXIodmVjKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQ2FydCh2ZWMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYXJ0VG9Qb2xhcih2ZWMpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZlYy5tYWcgPCAwKSB7XG4gICAgICAgICAgICB2ZWMubWFnID0gLXZlYy5tYWc7XG4gICAgICAgICAgICB2ZWMuZGlyICs9IHRoaXMuUEk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZGlyOiB2ZWMuZGlyLCBtYWc6IHZlYy5tYWd9O1xuICAgIH1cblxuICAgIGlzQ2FydCh2ZWMpIHsgaWYodmVjLnggIT09IHVuZGVmaW5lZCAmJiB2ZWMueSAhPT0gdW5kZWZpbmVkKSB7IHJldHVybiB0cnVlOyB9IHJldHVybiBmYWxzZTsgfVxuICAgIGlzUG9sYXIodmVjKSB7IGlmKHZlYy5tYWcgIT09IHVuZGVmaW5lZCAmJiB2ZWMuZGlyICE9PSB1bmRlZmluZWQpIHsgcmV0dXJuIHRydWU7IH0gcmV0dXJuIGZhbHNlOyB9XG4gICAgYXNDYXJ0KHZlYykge1xuICAgICAgICBpZiAodGhpcy5pc1BvbGFyKHZlYykpIHtyZXR1cm4gdGhpcy5wb2xhclRvQ2FydCh2ZWMpfVxuICAgICAgICByZXR1cm4ge3g6IHZlYy54LCB5OiB2ZWMueX1cbiAgICB9XG4gICAgY2FydFRvUG9sYXIodmVjLCByZXRWID0ge2RpcjogMCwgbWFnOiAwfSkge1xuICAgICAgICByZXRWLmRpciA9IE1hdGguYXRhbjIodmVjLnksIHZlYy54KTtcbiAgICAgICAgcmV0Vi5tYWcgPSBNYXRoLmh5cG90KHZlYy54LCB2ZWMueSk7XG4gICAgICAgIHJldHVybiByZXRWO1xuICAgIH1cblxuICAgIHZlY3RvckFkZCh2ZWMxLCB2ZWMyKSB7XG4gICAgICAgIHZhciB2MSA9IHRoaXMuYXNDYXJ0KHZlYzEpO1xuICAgICAgICB2YXIgdjIgPSB0aGlzLmFzQ2FydCh2ZWMyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMudmVjdG9yKHYxLnggKyB2Mi54LCB2MS55ICsgdjIueSlcbiAgICB9XG5cbiAgICBhcHBseUZvcmNlKGZvcmNlLCBsb2MpIHtcbiAgICAgICAgdGhpcy52YWxpZGF0ZVBvbGFyKGZvcmNlKTtcbiAgICAgICAgdmFyIGwgPSB0aGlzLmFzQ2FydChsb2MpO1xuICAgICAgICB2YXIgdG9DZW50ZXIgPSB0aGlzLmFzUG9sYXIodGhpcy52ZWN0b3IodGhpcy54IC0gbC54LCB0aGlzLnkgLSBsLnkpKTtcbiAgICAgICAgdmFyIHBoZXRhID0gdG9DZW50ZXIuZGlyIC0gZm9yY2UuZGlyO1xuICAgICAgICB2YXIgRnYgPSBNYXRoLmNvcyhwaGV0YSkgKiBmb3JjZS5tYWc7XG4gICAgICAgIHZhciBGYSA9IE1hdGguc2luKHBoZXRhKSAqIGZvcmNlLm1hZztcbiAgICAgICAgdmFyIGFjY2VsID0gdGhpcy5hc1BvbGFyKHRvQ2VudGVyKTtcbiAgICAgICAgYWNjZWwubWFnID0gRnYgLyB0aGlzLm1hc3M7IFxuICAgICAgICB2YXIgZGVsdGFWID0gdGhpcy5hc0NhcnQoYWNjZWwpOyBcbiAgICAgICAgdGhpcy5keCArPSBkZWx0YVYueCBcbiAgICAgICAgdGhpcy5keSArPSBkZWx0YVYueVxuICAgICAgICB2YXIgYWNjZWxBID0gRmEgLyAodG9DZW50ZXIubWFnICAqIHRoaXMubWFzcyk7IFxuICAgICAgICB0aGlzLmRyICs9IGFjY2VsQTtcbiAgICB9XG5cbiAgICB2ZWN0b3JDb21wb25lbnRzRm9yRGlyKHZlYywgZGlyKSB7XG4gICAgICAgIHZhciB2ID0gdGhpcy5hc1BvbGFyKHZlYyk7IFxuICAgICAgICB2YXIgcGhldGEgPSB2LmRpciAtIGRpcjtcbiAgICAgICAgdmFyIEZ2ID0gTWF0aC5jb3MocGhldGEpICogdi5tYWc7XG4gICAgICAgIHZhciBGYSA9IE1hdGguc2luKHBoZXRhKSAqIHYubWFnO1xuXG4gICAgICAgIHZhciBkMSA9IGRpcjtcbiAgICAgICAgdmFyIGQyID0gZGlyICsgdGhpcy5QSTkwOyAgICBcbiAgICAgICAgaWYoRnYgPCAwKXtcbiAgICAgICAgICAgIGQxICs9IHRoaXMuUEk7XG4gICAgICAgICAgICBGdiA9IC1GdjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKEZhIDwgMCl7XG4gICAgICAgICAgICBkMiArPSB0aGlzLlBJO1xuICAgICAgICAgICAgRmEgPSAtRmE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFsb25nIDogdGhpcy5wb2xhcihGdixkMSksXG4gICAgICAgICAgICB0YW5nZW50IDogdGhpcy5wb2xhcihGYSxkMilcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBkb0NvbGxpc2lvbihwb2ludERldGFpbHMsIHdhbGxJbmRleCkge1xuICAgICAgICB2YXIgdnYgPSB0aGlzLmFzUG9sYXIocG9pbnREZXRhaWxzLnZlbG9jaXR5KTsgXG4gICAgICAgIHZhciB2YSA9IHRoaXMuYXNQb2xhcihwb2ludERldGFpbHMudmVsb2NpdHlBKTsgXG4gICAgICAgIHZhciB2dmMgPSB0aGlzLnZlY3RvckNvbXBvbmVudHNGb3JEaXIodnYsIHRoaXMuV0FMTF9OT1JNU1t3YWxsSW5kZXhdKTtcbiAgICAgICAgdmFyIHZhYyA9IHRoaXMudmVjdG9yQ29tcG9uZW50c0ZvckRpcih2YSwgdGhpcy5XQUxMX05PUk1TW3dhbGxJbmRleF0pO1xuXG4gICAgICAgIHZ2Yy5hbG9uZy5tYWcgKj0gMS4xODsgXG4gICAgICAgIHZhYy5hbG9uZy5tYWcgKj0gMS4xODsgXG5cbiAgICAgICAgdnZjLmFsb25nLm1hZyAqPSB0aGlzLm1hc3M7XG4gICAgICAgIHZhYy5hbG9uZy5tYWcgKj0gdGhpcy5tYXNzO1xuXG4gICAgICAgIHZ2Yy5hbG9uZy5kaXIgKz0gdGhpcy5QSTtcbiAgICAgICAgdmFjLmFsb25nLmRpciArPSB0aGlzLlBJO1xuXG4gICAgICAgIHZ2Yy50YW5nZW50Lm1hZyAqPSAwLjE4OyAgXG4gICAgICAgIHZhYy50YW5nZW50Lm1hZyAqPSAwLjE4O1xuICAgICAgICB2dmMudGFuZ2VudC5tYWcgKj0gdGhpcy5tYXNzICBcbiAgICAgICAgdmFjLnRhbmdlbnQubWFnICo9IHRoaXMubWFzc1xuICAgICAgICB2dmMudGFuZ2VudC5kaXIgKz0gdGhpcy5QSTsgXG4gICAgICAgIHZhYy50YW5nZW50LmRpciArPSB0aGlzLlBJO1xuXG4gICAgICAgIHRoaXMuYXBwbHlGb3JjZSh2dmMuYWxvbmcsIHBvaW50RGV0YWlscy5wb3MpICAgIFxuICAgICAgICB0aGlzLmFwcGx5Rm9yY2UodnZjLnRhbmdlbnQsIHBvaW50RGV0YWlscy5wb3MpICAgIFxuICAgICAgICB0aGlzLmFwcGx5Rm9yY2UodmFjLmFsb25nLCBwb2ludERldGFpbHMucG9zKSAgICBcbiAgICAgICAgdGhpcy5hcHBseUZvcmNlKHZhYy50YW5nZW50LCBwb2ludERldGFpbHMucG9zKSAgICBcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJsb2NrIiwiY2xhc3MgQ2FudmFzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IDE0MDA7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IDc1MDtcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIHRoaXMuYmluZENhbnZhc1RvRE9NKClcbiAgICB9XG5cbiAgICBiaW5kQ2FudmFzVG9ET00oKSB7XG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tY2FudmFzXCIpICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmQodGhpcy5jYW52YXMpO1xuICAgICAgICB0aGlzLmNhbnZhcy5jbGFzc0xpc3QuYWRkKFwibWFpbi1jYW52YXNcIilcbiAgICB9XG5cbiAgICBjbGVhckNhbnZhcygpIHtcbiAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FudmFzO1xuIiwiLy8gaW1wb3J0IFwiLi9zdHlsZXMvaW5kZXguc2Nzc1wiO1xuaW1wb3J0IENhbnZhcyBmcm9tIFwiLi9jYW52YXNcIjtcbmltcG9ydCBTdGFnZUxvYWRlciBmcm9tIFwiLi9zdGFnZUxvYWRlclwiO1xuXG5jbGFzcyBBbmdlcmVkQmlyZHMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmFuaW1hdGluZyA9IHRydWU7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gbmV3IENhbnZhcygpXG4gICAgICAgIHRoaXMuY2FudmFzLmJpbmRDYW52YXNUb0RPTSgpO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVFbnRpdGllcygpO1xuICAgICAgICBjb25zdCBhbmltYXRpb24gPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5jbGVhckNhbnZhcygpO1xuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFnZUxvYWRlci51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRpb24pO1xuICAgIH1cblxuICAgIGluaXRpYWxpemVFbnRpdGllcygpIHtcbiAgICAgICAgdGhpcy5zdGFnZUxvYWRlciA9IG5ldyBTdGFnZUxvYWRlcih0aGlzLmNhbnZhcy5jdHgpO1xuICAgICAgICB0aGlzLnN0YWdlTG9hZGVyLmluaXRpYWxpemVFbnRpdGllcygpO1xuICAgICAgICB0aGlzLnN0YWdlTG9hZGVyLmluaXRpYWxpemVFdmVudExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIGdhbWVPdmVyKCkge1xuICAgICAgICAvLyByZXN0YXJ0IEdhbWUsIGFmdGVyIGNlcnRhaW4gYmlyZHkgc2hvdHNcbiAgICAgICAgLy8gZHJvcCBldmVudExpc3RlbmVycyBhbmQgcmVhdHRhY2ggRE9NIGNhbnZhcyBub2RlXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBbmdlcmVkQmlyZHM7IiwiY2xhc3MgUGlnIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgsIHgsIHksIHJhZGl1cywgdmVsWCA9IDAsIHZlbFkgPSAwKSB7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLnggPSB4OyBcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy52ZWxYID0gdmVsWDtcbiAgICAgICAgdGhpcy52ZWxZID0gdmVsWTtcbiAgICAgICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XG4gICAgICAgIHRoaXMubWFzcyA9IDI7XG5cbiAgICAgICAgdGhpcy5ncmF2aXR5ID0geyB4OiAwLCB5OiAwLjEgfTtcbiAgICAgICAgdGhpcy5ncm91bmQgPSB0aGlzLmN0eC5jYW52YXMuaGVpZ2h0IC0gMjA7XG4gICAgICAgIHRoaXMuYm91bmNlID0gMC40O1xuICAgICAgICB0aGlzLmZyaWN0aW9uWCA9IDAuOTtcbiAgICAgICAgdGhpcy5tYXNzID0gMjtcbiAgICAgICAgdGhpcy5waWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5waWcuc3JjID0gXCJzcmMvaW1hZ2VzL3BlcHBhLnBuZ1wiXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLmN0eC5zYXZlKCk7XG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICB0aGlzLmN0eC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCAoTWF0aC5QSSAqIDIpLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuY3R4LmNsaXAoKTtcbiAgICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLnBpZywgdGhpcy54IC0gdGhpcy5yYWRpdXMsIHRoaXMueSAtIHRoaXMucmFkaXVzLCB0aGlzLnJhZGl1cyAqIDIsIHRoaXMucmFkaXVzICogMik7XG4gICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMudmVsWCArPSB0aGlzLmdyYXZpdHkueDtcbiAgICAgICAgdGhpcy52ZWxZICs9IHRoaXMuZ3Jhdml0eS55O1xuICAgICAgICB0aGlzLnggKz0gdGhpcy52ZWxYO1xuICAgICAgICB0aGlzLnkgKz0gdGhpcy52ZWxZO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMueSA+PSB0aGlzLmdyb3VuZCkge1xuICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5ncm91bmQgLSAodGhpcy55IC0gdGhpcy5ncm91bmQpO1xuICAgICAgICAgICAgdGhpcy52ZWxZID0gLU1hdGguYWJzKHRoaXMudmVsWSkgKiB0aGlzLmJvdW5jZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnZlbFkgPj0gdGhpcy5ncmF2aXR5LnkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlbFkgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuZ3JvdW5kIC0gdGhpcy5ncmF2aXR5Lnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy52ZWxYID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVsWCAtPSB0aGlzLmZyaWN0aW9uWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnZlbFggPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWxYICs9IHRoaXMuZnJpY3Rpb25YO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHN0b3BzIGJhbGwgZnJvbSBib3VuY2luZyBpbiBZIGF4aXNcbiAgICAgICAgaWYgKHRoaXMudmVsWTwwICYmIHRoaXMudmVsWT4tMi4xKSB7XG4gICAgICAgICAgICB0aGlzLnZlbFkgPSAwO1xuICAgICAgICB9XG4gICAgICAgIC8vIHN0b3BzIGJhbGwgZnJvbSBtb3Zpbmcgb24gWCBheGlzIGlmIHgtdmVsb2NpdHkgPCAxLjFcbiAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMudmVsWCkgPCAxLjEpIHtcbiAgICAgICAgICAgIHRoaXMudmVsWCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUGlnOyIsImltcG9ydCBCaXJkIGZyb20gXCIuL2JpcmRcIjtcbmNsYXNzIFByb2plY3RpbGUge1xuICAgIGNvbnN0cnVjdG9yKGN0eCwgYmlyZFByb3BlcnRpZXMpIHtcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMubGF1bmNoZWRPYmplY3RzID0gW107XG4gICAgICAgIHRoaXMubWF4ID0gMTtcbiAgICAgICAgdGhpcy5iaXJkUHJvcGVydGllcyA9IGJpcmRQcm9wZXJ0aWVzO1xuICAgICAgICB0aGlzLnByb2plY3RpbGVJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB0aGlzLnByb2plY3RpbGVJbWFnZS5zcmMgPSBcInNyYy9pbWFnZXMvcGl4aWwtbGF5ZXItQmFja2dyb3VuZC5wbmdcIjtcbiAgICB9XG5cbiAgICBraWNrT2ZmTGF1bmNoRGlyZWN0aW9uKGFuZ2xlVmFsLCBtYWduaXR1ZGVWYWwpIHtcbiAgICAgICAgbGV0IGFuZ2xlID0gTWF0aC5QSSogYW5nbGVWYWwgLzE4MDtcbiAgICAgICAgdGhpcy5jdXJyZW50UHJvamVjdGlsZU9iamVjdCA9IG5ldyBCaXJkKHRoaXMuY3R4LCB0aGlzLmJpcmRQcm9wZXJ0aWVzKTtcbiAgICAgICAgdGhpcy5vYmplY3RMYXVuY2hlZCA9IG5ldyBPYmplY3RMYXVuY2godGhpcy5jdHgsIHRoaXMuY3VycmVudFByb2plY3RpbGVPYmplY3QpO1xuICAgICAgICB0aGlzLm9iamVjdExhdW5jaGVkLm9iamVjdFR5cGUudmVsWSA9LSBtYWduaXR1ZGVWYWwgKiBNYXRoLnNpbihhbmdsZSk7XG4gICAgICAgIHRoaXMub2JqZWN0TGF1bmNoZWQub2JqZWN0VHlwZS52ZWxYID0gbWFnbml0dWRlVmFsICogTWF0aC5jb3MoYW5nbGUpO1xuICAgICAgICB0aGlzLm9iamVjdExhdW5jaGVkLm9iamVjdFR5cGUudHJhbnNmZXIgPSAwLjg7XG4gICAgICAgIHRoaXMubGF1bmNoZWRPYmplY3RzLnB1c2godGhpcy5vYmplY3RMYXVuY2hlZCk7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy5sYXVuY2hlZE9iamVjdHMubGVuZ3RoID4gdGhpcy5tYXgpIHtcbiAgICAgICAgICAgIHRoaXMubGF1bmNoZWRPYmplY3RzID0gdGhpcy5sYXVuY2hlZE9iamVjdHMuc3BsaWNlKDEpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sYXVuY2hlZE9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50T2JqZWN0ID0gdGhpcy5sYXVuY2hlZE9iamVjdHNbaV0ub2JqZWN0VHlwZTtcbiAgICAgICAgICAgIGN1cnJlbnRPYmplY3QudmVsWSArPSAxLjUzO1xuICAgICAgICAgICAgY3VycmVudE9iamVjdC54ICs9IGN1cnJlbnRPYmplY3QudmVsWCAvIDM7XG4gICAgICAgICAgICBjdXJyZW50T2JqZWN0LnkgKz0gY3VycmVudE9iamVjdC52ZWxZIC8gMztcbiAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmxhdW5jaGVkT2JqZWN0c1tpXS51cGRhdGVDdXJyZW50TGF1bmNoZWRPYmplY3QoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UodGhpcy5wcm9qZWN0aWxlSW1hZ2UsIHRoaXMuYmlyZFByb3BlcnRpZXMueCAtIDMwLCB0aGlzLmJpcmRQcm9wZXJ0aWVzLnkgLSA3MCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sYXVuY2hlZE9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50QmlyZCA9IHRoaXMubGF1bmNoZWRPYmplY3RzW2ldLm9iamVjdFR5cGU7XG4gICAgICAgICAgICBjdXJyZW50QmlyZC5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY2xhc3MgT2JqZWN0TGF1bmNoIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgsIG9iamVjdFR5cGUpIHtcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMub2JqZWN0VHlwZSA9IG9iamVjdFR5cGU7XG4gICAgfVxuXG4gICAgcmVuZGVyT2JqZWN0TGF1bmNoKCkge1xuICAgICAgICB0aGlzLm9iamVjdFR5cGUucmVuZGVyKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlQ3VycmVudExhdW5jaGVkT2JqZWN0KCkge1xuICAgICAgICBsZXQgY3VycmVudE9iamVjdCA9IHRoaXMub2JqZWN0VHlwZTtcbiAgICAgICAgY3VycmVudE9iamVjdC52ZWxYICs9IGN1cnJlbnRPYmplY3QuZ3Jhdml0eS54O1xuICAgICAgICBjdXJyZW50T2JqZWN0LnZlbFkgKz0gY3VycmVudE9iamVjdC5ncmF2aXR5Lnk7XG4gICAgICAgIGN1cnJlbnRPYmplY3QueCArPSBjdXJyZW50T2JqZWN0LnZlbFg7XG4gICAgICAgIGN1cnJlbnRPYmplY3QueSArPSBjdXJyZW50T2JqZWN0LnZlbFk7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRPYmplY3QueSA+PSBjdXJyZW50T2JqZWN0Lmdyb3VuZCkge1xuICAgICAgICAgICAgY3VycmVudE9iamVjdC55ID0gY3VycmVudE9iamVjdC5ncm91bmQgLSAoY3VycmVudE9iamVjdC55IC0gY3VycmVudE9iamVjdC5ncm91bmQpO1xuICAgICAgICAgICAgY3VycmVudE9iamVjdC52ZWxZID0gLU1hdGguYWJzKGN1cnJlbnRPYmplY3QudmVsWSkgKiBjdXJyZW50T2JqZWN0LmJvdW5jZTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50T2JqZWN0LnZlbFkgPj0gY3VycmVudE9iamVjdC5ncmF2aXR5LnkpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50T2JqZWN0LnZlbFkgPSAwO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRPYmplY3QueSA9IGN1cnJlbnRPYmplY3QuZ3JvdW5kIC0gY3VycmVudE9iamVjdC5ncmF2aXR5Lnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY3VycmVudE9iamVjdC52ZWxYID4gMCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRPYmplY3QudmVsWCAtPSBjdXJyZW50T2JqZWN0LmZyaWN0aW9uWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjdXJyZW50T2JqZWN0LnZlbFggPCAwKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudE9iamVjdC52ZWxYICs9IGN1cnJlbnRPYmplY3QuZnJpY3Rpb25YO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHN0b3BzIGJhbGwgZnJvbSBib3VuY2luZyBpbiBZIGF4aXNcbiAgICAgICAgaWYgKCBjdXJyZW50T2JqZWN0LnkgPj0gY3VycmVudE9iamVjdC5ncm91bmQgLSAxMCkge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRPYmplY3QudmVsWSA8PSAwICYmIGN1cnJlbnRPYmplY3QudmVsWSA+IC0yLjUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50T2JqZWN0LnZlbFkgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHN0b3BzIGJhbGwgZnJvbSBtb3Zpbmcgb24gWCBheGlzIFxuICAgICAgICBpZiAoTWF0aC5hYnMoY3VycmVudE9iamVjdC52ZWxYKSA8IDEuMSkge1xuICAgICAgICAgICAgY3VycmVudE9iamVjdC52ZWxYID0gMDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0aWxlOyIsImltcG9ydCBQaWcgZnJvbSBcIi4vcGlnXCI7XG5pbXBvcnQgQmxvY2sgZnJvbSBcIi4vYmxvY2tcIjtcbmltcG9ydCBQcm9qZWN0aWxlIGZyb20gXCIuL3Byb2plY3RpbGVcIjtcbmltcG9ydCB7c3RhZ2VLZXlzfSBmcm9tIFwiLi9zdGFnZXMvc3RhZ2VLZXlzXCI7XG5pbXBvcnQge2NoZWNrQmlyZE9uUGlnQ29sbGlzaW9uLCBjaGVja0JpcmRPbkJsb2NrQ29sbGlzaW9ufSBmcm9tIFwiLi91dGlsL2NvbGxpc2lvbkRldGVjdGlvblV0aWxcIjtcbmltcG9ydCB7YmlyZE9uUGlnQ29sbGlzaW9uTG9naWMsIGJpcmRPbkJsb2NrQ29sbGlzaW9uTG9naWN9IGZyb20gXCIuL3V0aWwvY29sbGlzaW9uTG9naWNVdGlsXCI7XG5cbmNsYXNzIFN0YWdlTG9hZGVyIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgpIHtcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMuY2FudmFzID0gY3R4LmNhbnZhcztcbiAgICAgICAgdGhpcy5zY29yZSA9IDA7XG4gICAgICAgIHRoaXMuc3RhZ2VOdW1iZXIgPSAxO1xuICAgICAgICAvLyB0aGlzLmhpZ2hzY29yZSB1c2luZyBsb2NhbFN0b3JhZ2VcbiAgICAgICAgdGhpcy5zdGFydFBvc0JpcmQgPSBbXTtcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlT2JqZWN0ID0ge307XG4gICAgICAgIHRoaXMucGlncyA9IFtdO1xuICAgICAgICB0aGlzLmJsb2NrcyA9IFtdO1xuICAgIH1cblxuICAgIGluaXRpYWxpemVFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgY29uc3QgbW91c2UgPSB7XG4gICAgICAgICAgICB4OiB0aGlzLmNhbnZhcy53aWR0aC8yLFxuICAgICAgICAgICAgeTogdGhpcy5jYW52YXMuaGVpZ2h0LzIsXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBsZXQgY2FudmFzUHJvcGVydGllcyA9IHRoaXMuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgbW91c2UueCA9IGUueCAtIGNhbnZhc1Byb3BlcnRpZXMubGVmdDtcbiAgICAgICAgICAgIG1vdXNlLnkgPSBlLnkgLSBjYW52YXNQcm9wZXJ0aWVzLnRvcDtcbiAgICAgICAgICAgIGxldCBkZWx0YVggPSBtb3VzZS54IC0gdGhpcy5zdGFydFBvc0JpcmRbMF07XG4gICAgICAgICAgICBsZXQgZGVsdGFZID0gbW91c2UueSAtIHRoaXMuc3RhcnRQb3NCaXJkWzFdO1xuICAgICAgICAgICAgbGV0IHRoZXRhUmFkaWFuID0gTWF0aC5hdGFuMihkZWx0YVksIGRlbHRhWCk7XG4gICAgICAgICAgICBsZXQgYW5nbGVWYWwgPSAtKChNYXRoLmFicyh0aGV0YVJhZGlhbiAqIDE4MCAvIE1hdGguUEkpIC0gMjcwKSAlIDkwKTtcbiAgICAgICAgICAgIGxldCBtYWduaXR1ZGVWYWwgPSAoTWF0aC5hYnMobW91c2UueCAtIDEzMCkgLyAyKTtcblxuICAgICAgICAgICAgdGhpcy5wcm9qZWN0aWxlT2JqZWN0LmtpY2tPZmZMYXVuY2hEaXJlY3Rpb24oYW5nbGVWYWwgLCBtYWduaXR1ZGVWYWwpXG4gICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICB9XG5cbiAgICBpbml0aWFsaXplRW50aXRpZXMoKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTdGFnZVZhbHVlcyA9IHN0YWdlS2V5c1t0aGlzLnN0YWdlTnVtYmVyXTtcbiAgICAgICAgdGhpcy5sb2FkU3RhZ2UoY3VycmVudFN0YWdlVmFsdWVzKTtcbiAgICB9XG5cbiAgICBsb2FkU3RhZ2UoY3VycmVudFN0YWdlVmFsdWVzKSB7XG4gICAgICAgIHRoaXMucHJvamVjdGlsZU9iamVjdCA9IG5ldyBQcm9qZWN0aWxlKHRoaXMuY3R4LCBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJiaXJkUHJvcGVydGllc1wiXSk7XG4gICAgICAgIHRoaXMuc3RhcnRQb3NCaXJkID0gW2N1cnJlbnRTdGFnZVZhbHVlc1tcImJpcmRQcm9wZXJ0aWVzXCJdLngsIGN1cnJlbnRTdGFnZVZhbHVlc1tcImJpcmRQcm9wZXJ0aWVzXCJdLnldXG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJudW1iZXJPZlBpZ3NcIl07IGkrKykge1xuICAgICAgICAgICAgdGhpcy5waWdzLnB1c2gobmV3IFBpZyhcbiAgICAgICAgICAgICAgICB0aGlzLmN0eCwgXG4gICAgICAgICAgICAgICAgY3VycmVudFN0YWdlVmFsdWVzW1wicGlnUHJvcGVydGllc1wiXVtpXS54LCBcbiAgICAgICAgICAgICAgICBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJwaWdQcm9wZXJ0aWVzXCJdW2ldLnksIFxuICAgICAgICAgICAgICAgIGN1cnJlbnRTdGFnZVZhbHVlc1tcInBpZ1Byb3BlcnRpZXNcIl1baV0ucmFkKSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnRTdGFnZVZhbHVlc1tcIm51bWJlck9mQmxvY2tzXCJdOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tzLnB1c2gobmV3IEJsb2NrKFxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LCBcbiAgICAgICAgICAgICAgICBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJibG9ja1Byb3Blcml0ZXNcIl1baV0ueCwgXG4gICAgICAgICAgICAgICAgY3VycmVudFN0YWdlVmFsdWVzW1wiYmxvY2tQcm9wZXJpdGVzXCJdW2ldLnksXG4gICAgICAgICAgICAgICAgY3VycmVudFN0YWdlVmFsdWVzW1wiYmxvY2tQcm9wZXJpdGVzXCJdW2ldLncsXG4gICAgICAgICAgICAgICAgY3VycmVudFN0YWdlVmFsdWVzW1wiYmxvY2tQcm9wZXJpdGVzXCJdW2ldLmgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVFbnRpdGllcygpO1xuICAgICAgICBpZiAodGhpcy5wcm9qZWN0aWxlT2JqZWN0Lm9iamVjdExhdW5jaGVkKSB0aGlzLmNoZWNrQW5kVXBkYXRlRW50aXRpZXNDb2xsaXNpb24oKTtcbiAgICAgICAgdGhpcy5yZW5kZXJFbnRpdGllcygpO1xuICAgIH1cblxuICAgIHVwZGF0ZUVudGl0aWVzKCkge1xuICAgICAgICB0aGlzLnByb2plY3RpbGVPYmplY3QudXBkYXRlKClcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBpZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucGlnc1tpXS51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGlncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5ibG9ja3NbaV0udXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja0FuZFVwZGF0ZUVudGl0aWVzQ29sbGlzaW9uKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGlncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGNoZWNrQmlyZE9uUGlnQ29sbGlzaW9uKHRoaXMucHJvamVjdGlsZU9iamVjdC5jdXJyZW50UHJvamVjdGlsZU9iamVjdCwgdGhpcy5waWdzW2ldKSkge1xuICAgICAgICAgICAgICAgIGJpcmRPblBpZ0NvbGxpc2lvbkxvZ2ljKHRoaXMucHJvamVjdGlsZU9iamVjdC5jdXJyZW50UHJvamVjdGlsZU9iamVjdCwgdGhpcy5waWdzW2ldKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3JlICs9IDMwMDA7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ibG9ja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjaGVja0JpcmRPbkJsb2NrQ29sbGlzaW9uKHRoaXMucHJvamVjdGlsZU9iamVjdC5jdXJyZW50UHJvamVjdGlsZU9iamVjdCwgdGhpcy5ibG9ja3NbaV0pKSB7XG4gICAgICAgICAgICAgICAgYmlyZE9uQmxvY2tDb2xsaXNpb25Mb2dpYyh0aGlzLnByb2plY3RpbGVPYmplY3QuY3VycmVudFByb2plY3RpbGVPYmplY3QsIHRoaXMuYmxvY2tzW2ldKVxuICAgICAgICAgICAgICAgIHRoaXMuc2NvcmUgKz0gMzI1O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyRW50aXRpZXMoKSB7XG4gICAgICAgIHRoaXMucHJvamVjdGlsZU9iamVjdC5yZW5kZXIoKVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGlncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5waWdzW2ldLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5waWdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmJsb2Nrc1tpXS5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbmRlclNjb3JlKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyU2NvcmUoKSB7IFxuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcInJpZ2h0XCI7XG4gICAgICAgIHRoaXMuY3R4LnRleHRCYXNlbGluZSA9IFwidG9wXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiV0hJVEVcIjtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIkJMQUNLXCI7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSA1MCArIFwicHggQmFuZ2Vyc1wiO1xuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCh0aGlzLnNjb3JlLCB0aGlzLmNhbnZhcy53aWR0aCAtIDMwIC8gMiwgMClcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dCh0aGlzLnNjb3JlLCB0aGlzLmNhbnZhcy53aWR0aCAtIDMwIC8gMiwgMClcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0YWdlTG9hZGVyOyIsImV4cG9ydCBjb25zdCBzdGFnZUtleXMgPSB7XG4gICAgMSA6IHtcbiAgICAgICAgXCJudW1iZXJPZlBpZ3NcIjogMixcbiAgICAgICAgXCJwaWdQcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgIDAgOiB7XG4gICAgICAgICAgICAgICAgeDogNTAwLFxuICAgICAgICAgICAgICAgIHk6IDYwMCxcbiAgICAgICAgICAgICAgICByYWQ6IDE1LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIDEgOiB7XG4gICAgICAgICAgICAgICAgeDogNjAwLFxuICAgICAgICAgICAgICAgIHk6IDYwMCxcbiAgICAgICAgICAgICAgICByYWQ6IDE1LFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIFwibnVtYmVyT2ZCbG9ja3NcIjogMixcbiAgICAgICAgXCJibG9ja1Byb3Blcml0ZXNcIjoge1xuICAgICAgICAgICAgMCA6IHtcbiAgICAgICAgICAgICAgICB4OiAzNTAsXG4gICAgICAgICAgICAgICAgeTogNzAwLFxuICAgICAgICAgICAgICAgIHc6IDMwLFxuICAgICAgICAgICAgICAgIGg6IDEwMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAxOiB7XG4gICAgICAgICAgICAgICAgeDogNzAwLFxuICAgICAgICAgICAgICAgIHk6IDcwMCxcbiAgICAgICAgICAgICAgICB3OiA1MCxcbiAgICAgICAgICAgICAgICBoOiAxNDAsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgXCJiaXJkUHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICB4OiAxMjAsXG4gICAgICAgICAgICB5OiA2MzAsXG4gICAgICAgICAgICByYWQ6IDE0LFxuICAgICAgICB9XG4gICAgfVxufSIsImV4cG9ydCBjb25zdCBjaGVja0JpcmRPblBpZ0NvbGxpc2lvbiA9IChjdXJyZW50UHJvamVjdGlsZU9iamVjdCwgcGlnKSA9PiB7XG4gICAgaWYgKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnggKyBjdXJyZW50UHJvamVjdGlsZU9iamVjdC5yYWRpdXMgKyBwaWcucmFkaXVzID4gcGlnLnhcbiAgICAgICAgJiYgY3VycmVudFByb2plY3RpbGVPYmplY3QueCA8IHBpZy54ICsgY3VycmVudFByb2plY3RpbGVPYmplY3QucmFkaXVzICsgcGlnLnJhZGl1c1xuICAgICAgICAmJiBjdXJyZW50UHJvamVjdGlsZU9iamVjdC55ICsgY3VycmVudFByb2plY3RpbGVPYmplY3QucmFkaXVzICsgcGlnLnJhZGl1cyA+IHBpZy55XG4gICAgICAgICYmIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnkgPCBwaWcueSArIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnJhZGl1cyArIHBpZy5yYWRpdXMpIFxuICAgIHtcbiAgICAgICAgLy8gcHl0aGFnb3JlYW0gdGhlb3JlbSB0byBiZSBtb3JlIGV4YWN0IG9uIGNvbGxpc2lvblxuICAgICAgICBsZXQgZGlzdGFuY2UgPSBNYXRoLnNxcnQoXG4gICAgICAgICAgICAgICAgKChjdXJyZW50UHJvamVjdGlsZU9iamVjdC54IC0gcGlnLngpICogKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnggLSBwaWcueCkpXG4gICAgICAgICAgICArICgoY3VycmVudFByb2plY3RpbGVPYmplY3QueSAtIHBpZy55KSAqIChjdXJyZW50UHJvamVjdGlsZU9iamVjdC55IC0gcGlnLnkpKVxuICAgICAgICApXG4gICAgICAgIHJldHVybiBkaXN0YW5jZSA8IGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnJhZGl1cyArIHBpZy5yYWRpdXM7IFxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGNoZWNrQmlyZE9uQmxvY2tDb2xsaXNpb24gPSAoY3VycmVudFByb2plY3RpbGVPYmplY3QsIGJsb2NrKSA9PiB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCA0OyBqKyspe1xuICAgICAgICBjb25zdCBjaXJjbGVDZW50ZXIgPSBbY3VycmVudFByb2plY3RpbGVPYmplY3QueCwgY3VycmVudFByb2plY3RpbGVPYmplY3QueV07XG4gICAgICAgIGlmIChqICsgMSA9PT0gNCkge1xuICAgICAgICAgICAgaWYgKGNoZWNrQmlyZEludGVyY2VwdEJsb2NrKGJsb2NrLmdldFBvaW50KGopLCBibG9jay5nZXRQb2ludCgwKSwgY2lyY2xlQ2VudGVyLCBjdXJyZW50UHJvamVjdGlsZU9iamVjdC5yYWRpdXMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoY2hlY2tCaXJkSW50ZXJjZXB0QmxvY2soYmxvY2suZ2V0UG9pbnQoaiksIGJsb2NrLmdldFBvaW50KGogKyAxKSwgY2lyY2xlQ2VudGVyLCBjdXJyZW50UHJvamVjdGlsZU9iamVjdC5yYWRpdXMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNvbnN0IGNoZWNrQmlyZEludGVyY2VwdEJsb2NrID0gKHBvaW50QSwgcG9pbnRCLCBjaXJjbGVDZW50ZXIsIHJhZGl1cykgPT4ge1xuICAgIGxldCBkaXN0O1xuICAgIGNvbnN0IHZlbDFYID0gcG9pbnRCLnBvcy54IC0gcG9pbnRBLnBvcy54O1xuICAgIGNvbnN0IHZlbDFZID0gcG9pbnRCLnBvcy55IC0gcG9pbnRBLnBvcy55O1xuICAgIGNvbnN0IHZlbDJYID0gY2lyY2xlQ2VudGVyWzBdIC0gcG9pbnRBLnBvcy54O1xuICAgIGNvbnN0IHZlbDJZID0gY2lyY2xlQ2VudGVyWzFdIC0gcG9pbnRBLnBvcy55O1xuICAgIGNvbnN0IHVuaXQgPSAodmVsMlggKiB2ZWwxWCArIHZlbDJZICogdmVsMVkpIC8gKHZlbDFZICogdmVsMVkgKyB2ZWwxWCAqIHZlbDFYKTtcbiAgICBpZiAodW5pdCA+PSAwICYmIHVuaXQgPD0gMSl7XG4gICAgICAgIGRpc3QgPSAocG9pbnRBLnBvcy54ICArIHZlbDFYICogdW5pdCAtIGNpcmNsZUNlbnRlclswXSkgKiogMiArIChwb2ludEEucG9zLnkgKyB2ZWwxWSAqIHVuaXQgLSBjaXJjbGVDZW50ZXJbMV0pICoqIDI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZGlzdCA9IHVuaXQgPCAwID8gXG4gICAgICAgICAgICAocG9pbnRBLnBvcy54IC0gY2lyY2xlQ2VudGVyWzBdKSAqKiAyICsgKHBvaW50QS5wb3MueSAtIGNpcmNsZUNlbnRlclsxXSkgKiogMiA6XG4gICAgICAgICAgICAocG9pbnRCLnBvcy54IC0gY2lyY2xlQ2VudGVyWzBdKSAqKiAyICsgKHBvaW50Qi5wb3MueSAtIGNpcmNsZUNlbnRlclsxXSkgKiogMjtcbiAgICB9XG4gICAgcmV0dXJuIGRpc3QgPCByYWRpdXMgKiByYWRpdXM7XG59XG5cblxuXG5cblxuIiwiZXhwb3J0IGNvbnN0IGJpcmRPblBpZ0NvbGxpc2lvbkxvZ2ljID0gKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LCBwaWcpID0+IHtcbiAgICBsZXQgbmV3VmVsWDEgPSAoY3VycmVudFByb2plY3RpbGVPYmplY3QudmVsWCAqIChjdXJyZW50UHJvamVjdGlsZU9iamVjdC5tYXNzIC0gcGlnLm1hc3MpICsgKCAyICogcGlnLm1hc3MgKiBwaWcudmVsWCkpIC8gKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0Lm1hc3MgKyBwaWcubWFzcyk7XG4gICAgbGV0IG5ld1ZlbFkxID0gKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFkgKiAoY3VycmVudFByb2plY3RpbGVPYmplY3QubWFzcyAtIHBpZy5tYXNzKSArICggMiAqIHBpZy5tYXNzICogcGlnLnZlbFkpKSAvIChjdXJyZW50UHJvamVjdGlsZU9iamVjdC5tYXNzICsgcGlnLm1hc3MpO1xuICAgIGxldCBuZXdWZWxYMiA9IChwaWcudmVsWCAqIChwaWcubWFzcyAtIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0Lm1hc3MpICsgKDIgKiBjdXJyZW50UHJvamVjdGlsZU9iamVjdC5tYXNzICogY3VycmVudFByb2plY3RpbGVPYmplY3QudmVsWCkpIC8gKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0Lm1hc3MgKyBwaWcubWFzcyk7XG4gICAgbGV0IG5ld1ZlbFkyID0gKHBpZy52ZWxZICogKHBpZy5tYXNzIC0gY3VycmVudFByb2plY3RpbGVPYmplY3QubWFzcykgKyAoMiAqIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0Lm1hc3MgKiBjdXJyZW50UHJvamVjdGlsZU9iamVjdC52ZWxZKSkgLyAoY3VycmVudFByb2plY3RpbGVPYmplY3QubWFzcyArIHBpZy5tYXNzKTtcblxuICAgIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFggPSAtY3VycmVudFByb2plY3RpbGVPYmplY3QudmVsWDtcbiAgICBjdXJyZW50UHJvamVjdGlsZU9iamVjdC52ZWxZID0gLWN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFk7XG4gICAgcGlnLnZlbFggPSBuZXdWZWxYMjtcbiAgICBwaWcudmVsWSA9IG5ld1ZlbFkyO1xuXG4gICAgY3VycmVudFByb2plY3RpbGVPYmplY3QueCA9IGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnggKyBuZXdWZWxYMTtcbiAgICBjdXJyZW50UHJvamVjdGlsZU9iamVjdC55ID0gY3VycmVudFByb2plY3RpbGVPYmplY3QueSArIG5ld1ZlbFkxO1xuICAgIHBpZy54ID0gcGlnLnggKyBuZXdWZWxYMjtcbiAgICBwaWcueSA9IHBpZy55ICsgbmV3VmVsWTI7XG59XG5cbmV4cG9ydCBjb25zdCBiaXJkT25CbG9ja0NvbGxpc2lvbkxvZ2ljID0gKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LCBibG9jaykgPT4ge1xuICAgIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFggPSAtY3VycmVudFByb2plY3RpbGVPYmplY3QudmVsWDtcbiAgICBjdXJyZW50UHJvamVjdGlsZU9iamVjdC52ZWxZID0gLWN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFk7XG4gICAgbGV0IGZvcmNlID0gYmxvY2suYXNQb2xhcihibG9jay52ZWN0b3IoMTAsIDEwKSk7XG4gICAgZm9yY2UubWFnICo9IGJsb2NrLm1hc3MgKiAwLjE7XG4gICAgYmxvY2suYXBwbHlGb3JjZShmb3JjZSwgYmxvY2sudmVjdG9yKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LngsIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnkpKTtcbn1cblxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9zdHlsZXMvaW5kZXguc2Nzc1wiO1xuaW1wb3J0IEFuZ2VyZWRCaXJkcyBmcm9tIFwiLi9zY3JpcHRzL2dhbWVcIjtcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYW52YXNcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGluaXQpO1xuZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBuZXcgQW5nZXJlZEJpcmRzKCkuc3RhcnQoKTtcbn1cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==