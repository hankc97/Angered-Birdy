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
    key: "loadStage",
    value: function loadStage(currentStageValues) {
      this.projectileObject = new _projectile__WEBPACK_IMPORTED_MODULE_2__.default(this.ctx, currentStageValues["birdProperties"]);
      this.startPosBird = [currentStageValues["birdProperties"].x, currentStageValues["birdProperties"].y];
      this.currentLevelHighScoreKey = currentStageValues["currentLevelHighScoreKey"];
      var highScoreSaveKeyString = localStorage.getItem(this.currentLevelHighScoreKey);

      if (highScoreSaveKeyString === "undefined") {
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

      for (var _i2 = 0; _i2 < this.pigs.length; _i2++) {
        this.blocks[_i2].update();
      }

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
      this.renderHighScore();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYmlyZC5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYmxvY2suanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi8uL3NyYy9zY3JpcHRzL2NhbnZhcy5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvcGlnLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9wcm9qZWN0aWxlLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9zdGFnZUxvYWRlci5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvc3RhZ2VzL3N0YWdlS2V5cy5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvdXRpbC9jb2xsaXNpb25EZXRlY3Rpb25VdGlsLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy91dGlsL2NvbGxpc2lvbkxvZ2ljVXRpbC5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIkJpcmQiLCJjdHgiLCJiaXJkUHJvcGVydGllcyIsIngiLCJ5IiwicmFkaXVzIiwicmFkIiwibWFzcyIsInZlbFgiLCJ2ZWxZIiwidHJhbnNmZXIiLCJncmF2aXR5IiwiZ3JvdW5kIiwiY2FudmFzIiwiaGVpZ2h0IiwiYm91bmNlIiwiZnJpY3Rpb25YIiwiYmlyZCIsIkltYWdlIiwic3JjIiwic2F2ZSIsImJlZ2luUGF0aCIsImFyYyIsIk1hdGgiLCJQSSIsImNsaXAiLCJjbG9zZVBhdGgiLCJkcmF3SW1hZ2UiLCJyZXN0b3JlIiwiQmxvY2siLCJ3IiwiaCIsInIiLCJkeCIsImR5IiwiZHIiLCJJTlNFVCIsIlBJOTAiLCJQSTIiLCJXQUxMX05PUk1TIiwiX2dyb3VuZCIsImdldE1hc3MiLCJzZXRUcmFuc2Zvcm0iLCJyb3RhdGUiLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsInN0cm9rZVJlY3QiLCJpIiwicCIsImdldFBvaW50IiwicG9zIiwiZG9Db2xsaXNpb24iLCJ3aWR0aCIsIndoaWNoIiwieHgiLCJ5eSIsInZlbG9jaXR5QSIsInZlbG9jaXR5VCIsInZlbG9jaXR5IiwiY29zIiwic2luIiwiZGV0YWlscyIsImFzUG9sYXIiLCJ2ZWN0b3IiLCJwb2xhciIsIm1hZyIsImRpciIsInZlY3RvckFkZCIsInZhbGlkYXRlUG9sYXIiLCJ2ZWMiLCJpc1BvbGFyIiwicFZlYyIsInJldFYiLCJpc0NhcnQiLCJjYXJ0VG9Qb2xhciIsInVuZGVmaW5lZCIsInBvbGFyVG9DYXJ0IiwiYXRhbjIiLCJoeXBvdCIsInZlYzEiLCJ2ZWMyIiwidjEiLCJhc0NhcnQiLCJ2MiIsImZvcmNlIiwibG9jIiwibCIsInRvQ2VudGVyIiwicGhldGEiLCJGdiIsIkZhIiwiYWNjZWwiLCJkZWx0YVYiLCJhY2NlbEEiLCJ2IiwiZDEiLCJkMiIsImFsb25nIiwidGFuZ2VudCIsInBvaW50RGV0YWlscyIsIndhbGxJbmRleCIsInZ2IiwidmEiLCJ2dmMiLCJ2ZWN0b3JDb21wb25lbnRzRm9yRGlyIiwidmFjIiwiYXBwbHlGb3JjZSIsIkNhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImdldENvbnRleHQiLCJiaW5kQ2FudmFzVG9ET00iLCJxdWVyeVNlbGVjdG9yIiwiY2xlYXJDYW52YXMiLCJib2R5IiwiYXBwZW5kIiwiY2xhc3NMaXN0IiwiYWRkIiwiY2xlYXJSZWN0IiwiQW5nZXJlZEJpcmRzIiwiYW5pbWF0aW5nIiwiaW5pdGlhbGl6ZUVudGl0aWVzIiwiYW5pbWF0aW9uIiwic3RhZ2VMb2FkZXIiLCJ1cGRhdGUiLCJ3aW5kb3ciLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJTdGFnZUxvYWRlciIsImluaXRpYWxpemVFdmVudExpc3RlbmVycyIsIlBpZyIsInBpZyIsImFicyIsIlByb2plY3RpbGUiLCJsYXVuY2hlZE9iamVjdHMiLCJtYXgiLCJwcm9qZWN0aWxlSW1hZ2UiLCJhbmdsZVZhbCIsIm1hZ25pdHVkZVZhbCIsImFuZ2xlIiwiY3VycmVudFByb2plY3RpbGVPYmplY3QiLCJvYmplY3RMYXVuY2hlZCIsIk9iamVjdExhdW5jaCIsIm9iamVjdFR5cGUiLCJwdXNoIiwibGVuZ3RoIiwic3BsaWNlIiwiY3VycmVudE9iamVjdCIsInVwZGF0ZUN1cnJlbnRMYXVuY2hlZE9iamVjdCIsImN1cnJlbnRCaXJkIiwicmVuZGVyIiwic2NvcmUiLCJzdGFnZU51bWJlciIsInN0YXJ0UG9zQmlyZCIsInByb2plY3RpbGVPYmplY3QiLCJwaWdzIiwiYmxvY2tzIiwidXBkYXRlRW50aXRpZXMiLCJjaGVja0FuZFVwZGF0ZUVudGl0aWVzQ29sbGlzaW9uIiwicmVuZGVyRW50aXRpZXMiLCJtb3VzZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiY2FudmFzUHJvcGVydGllcyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImxlZnQiLCJ0b3AiLCJkZWx0YVgiLCJkZWx0YVkiLCJ0aGV0YVJhZGlhbiIsImtpY2tPZmZMYXVuY2hEaXJlY3Rpb24iLCJiaW5kIiwiY3VycmVudFN0YWdlVmFsdWVzIiwic3RhZ2VLZXlzIiwibG9hZFN0YWdlIiwiY3VycmVudExldmVsSGlnaFNjb3JlS2V5IiwiaGlnaFNjb3JlU2F2ZUtleVN0cmluZyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJoaWdoU2NvcmUiLCJwYXJzZUludCIsInVwZGF0ZUhpZ2hTY29yZSIsInNldEl0ZW0iLCJjaGVja0JpcmRPblBpZ0NvbGxpc2lvbiIsImJpcmRPblBpZ0NvbGxpc2lvbkxvZ2ljIiwiY2hlY2tCaXJkT25CbG9ja0NvbGxpc2lvbiIsImJpcmRPbkJsb2NrQ29sbGlzaW9uTG9naWMiLCJyZW5kZXJTY29yZSIsInJlbmRlckhpZ2hTY29yZSIsInRleHRBbGlnbiIsInRleHRCYXNlbGluZSIsInN0cm9rZVN0eWxlIiwiZm9udCIsImZpbGxUZXh0Iiwic3Ryb2tlVGV4dCIsImRpc3RhbmNlIiwic3FydCIsImJsb2NrIiwiaiIsImNpcmNsZUNlbnRlciIsImNoZWNrQmlyZEludGVyY2VwdEJsb2NrIiwicG9pbnRBIiwicG9pbnRCIiwiZGlzdCIsInZlbDFYIiwidmVsMVkiLCJ2ZWwyWCIsInZlbDJZIiwidW5pdCIsIm5ld1ZlbFgxIiwibmV3VmVsWTEiLCJuZXdWZWxYMiIsIm5ld1ZlbFkyIiwiaW5pdCIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztJQUFNQSxJO0FBQ0YsZ0JBQVlDLEdBQVosRUFBaUJDLGNBQWpCLEVBQWlDO0FBQUE7O0FBQzdCLFNBQUtELEdBQUwsR0FBV0EsR0FBWDtBQUNBLFNBQUtFLENBQUwsR0FBU0QsY0FBYyxDQUFDQyxDQUF4QjtBQUNBLFNBQUtDLENBQUwsR0FBU0YsY0FBYyxDQUFDRSxDQUF4QjtBQUNBLFNBQUtDLE1BQUwsR0FBY0gsY0FBYyxDQUFDSSxHQUE3QjtBQUNBLFNBQUtDLElBQUwsR0FBWSxD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RCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUVBd0csUUFBUSxDQUFDSSxhQUFULENBQXVCLFNBQXZCLEVBQWtDZ0QsZ0JBQWxDLENBQW1ELE9BQW5ELEVBQTREb0QsSUFBNUQ7O0FBQ0EsU0FBU0EsSUFBVCxHQUFnQjtBQUNaLE1BQUk3RixrREFBSixHQUFtQjhGLEtBQW5CO0FBQ0gsQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQmlyZCB7XG4gICAgY29uc3RydWN0b3IoY3R4LCBiaXJkUHJvcGVydGllcykge1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy54ID0gYmlyZFByb3BlcnRpZXMueDtcbiAgICAgICAgdGhpcy55ID0gYmlyZFByb3BlcnRpZXMueTtcbiAgICAgICAgdGhpcy5yYWRpdXMgPSBiaXJkUHJvcGVydGllcy5yYWQ7XG4gICAgICAgIHRoaXMubWFzcyA9IDI7XG4gICAgICAgIHRoaXMudmVsWCA9IDA7XG4gICAgICAgIHRoaXMudmVsWSA9IDA7XG4gICAgICAgIHRoaXMudHJhbnNmZXIgPSAwLjk7XG4gICAgICAgIHRoaXMuZ3Jhdml0eSA9IHsgeDogMCwgeTogMC4xIH07XG4gICAgICAgIHRoaXMuZ3JvdW5kID0gdGhpcy5jdHguY2FudmFzLmhlaWdodCAtIDIwO1xuICAgICAgICB0aGlzLmJvdW5jZSA9IDAuNTtcbiAgICAgICAgdGhpcy5mcmljdGlvblggPSAwLjk7XG4gICAgICAgIHRoaXMuYmlyZCA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB0aGlzLmJpcmQuc3JjID0gXCJzcmMvaW1hZ2VzL2JpcmRzLnBuZ1wiXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLmN0eC5zYXZlKCk7XG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICB0aGlzLmN0eC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCAoTWF0aC5QSSAqIDIpLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuY3R4LmNsaXAoKTtcbiAgICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLmJpcmQsIHRoaXMueCAtIHRoaXMucmFkaXVzLCB0aGlzLnkgLSB0aGlzLnJhZGl1cywgdGhpcy5yYWRpdXMgKiAyLCB0aGlzLnJhZGl1cyAqIDIpXG4gICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJpcmQ7IiwiY2xhc3MgQmxvY2sge1xuICAgIGNvbnN0cnVjdG9yKGN0eCwgeCwgeSwgdywgaCkge1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjdHguY2FudmFzO1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLncgPSB3O1xuICAgICAgICB0aGlzLmggPSBoO1xuICAgICAgICB0aGlzLnIgPSAwLjE7XG4gICAgICAgIHRoaXMuZHggPSAwO1xuICAgICAgICB0aGlzLmR5ID0gMDtcbiAgICAgICAgdGhpcy5kciA9IDA7XG4gICAgICAgIHRoaXMuSU5TRVQgPSAxMDtcbiAgICAgICAgdGhpcy5QSSA9IE1hdGguUEk7XG4gICAgICAgIHRoaXMuUEk5MCA9IE1hdGguUEkgLyAyO1xuICAgICAgICB0aGlzLlBJMiA9IE1hdGguUEkgKiAyO1xuICAgICAgICB0aGlzLldBTExfTk9STVMgPSBbIE1hdGguUEkgLyAyLCBNYXRoLlBJLCAtKE1hdGguUEkgLyAyKSwgMF1cbiAgICAgICAgdGhpcy5fZ3JvdW5kID0gdGhpcy5jYW52YXMuaGVpZ2h0IC0gMTA1O1xuICAgICAgICB0aGlzLm1hc3MgPSB0aGlzLmdldE1hc3MoKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdGhpcy5jdHguc2F2ZSgpXG4gICAgICAgIHRoaXMuY3R4LnNldFRyYW5zZm9ybSgxLDAsMCwxLHRoaXMueCx0aGlzLnkpO1xuICAgICAgICB0aGlzLmN0eC5yb3RhdGUodGhpcy5yKTtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJCbHVlXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KC10aGlzLncvMiwgLXRoaXMuaC8yLCB0aGlzLncsIHRoaXMuaClcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlUmVjdCgtdGhpcy53LzIsIC10aGlzLmgvMiwgdGhpcy53LCB0aGlzLmgpXG4gICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKVxuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy54ICs9IHRoaXMuZHg7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLmR5O1xuICAgICAgICB0aGlzLmR5ICs9IDAuMDYxO1xuICAgICAgICB0aGlzLnIgKz0gdGhpcy5kcjtcblxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgNDsgaSsrKXtcbiAgICAgICAgICAgIHZhciBwID0gdGhpcy5nZXRQb2ludChpKTtcbiAgICAgICAgICAgIC8vIG9ubHkgZG8gb25lIGNvbGxpc2lvbiBwZXIgZnJhbWUgb3Igd2Ugd2lsbCBlbmQgdXAgYWRkaW5nIGVuZXJneVxuICAgICAgICAgICAgaWYocC5wb3MueCA8IHRoaXMuSU5TRVQpe1xuICAgICAgICAgICAgICAgIHRoaXMueCArPSAodGhpcy5JTlNFVCkgLSBwLnBvcy54O1xuICAgICAgICAgICAgICAgIHRoaXMuZG9Db2xsaXNpb24ocCwzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiggcC5wb3MueCA+IHRoaXMuY2FudmFzLndpZHRoLXRoaXMuSU5TRVQpe1xuICAgICAgICAgICAgICAgIHRoaXMueCArPSAodGhpcy5jYW52YXMud2lkdGggLSB0aGlzLklOU0VUKSAtIHAucG9zLng7XG4gICAgICAgICAgICAgICAgdGhpcy5kb0NvbGxpc2lvbihwLDEpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKHAucG9zLnkgPCB0aGlzLklOU0VUKXtcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gKHRoaXMuSU5TRVQpIC0gcC5wb3MueTtcbiAgICAgICAgICAgICAgICB0aGlzLmRvQ29sbGlzaW9uKHAsMClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoIHAucG9zLnkgPiB0aGlzLmNhbnZhcy5oZWlnaHQgLSB0aGlzLklOU0VUKXtcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gKHRoaXMuY2FudmFzLmhlaWdodCAtIHRoaXMuSU5TRVQpIC0gcC5wb3MueTtcbiAgICAgICAgICAgICAgICB0aGlzLmRvQ29sbGlzaW9uKHAsMilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldE1hc3MoKSB7XG4gICAgICAgIHJldHVybiAoIHRoaXMudyAqIHRoaXMuaCAqIHRoaXMuaCkgLyAxMDAwO1xuICAgIH1cblxuICAgIGdldFBvaW50KHdoaWNoKSB7XG4gICAgICAgIHZhciBkeCwgZHksIHgsIHksIHh4LCB5eSwgdmVsb2NpdHlBLCB2ZWxvY2l0eVQsIHZlbG9jaXR5O1xuXG4gICAgICAgIGR4ID0gTWF0aC5jb3ModGhpcy5yKTtcbiAgICAgICAgZHkgPSBNYXRoLnNpbih0aGlzLnIpO1xuXG4gICAgICAgIHN3aXRjaCAod2hpY2gpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB4ID0gLXRoaXMudyAvIDI7XG4gICAgICAgICAgICAgICAgeSA9IC10aGlzLmggLyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHggPSB0aGlzLncgLyAyO1xuICAgICAgICAgICAgICAgIHkgPSAtdGhpcy5oIC8gMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB4ID0gdGhpcy53IC8gMjtcbiAgICAgICAgICAgICAgICB5ID0gdGhpcy5oIC8gMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICB4ID0gLXRoaXMudyAvIDI7XG4gICAgICAgICAgICAgICAgeSA9IHRoaXMuaCAvIDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgeCA9IHRoaXMueDtcbiAgICAgICAgICAgICAgICB5ID0gdGhpcy55O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHh4ICwgeXk7XG4gICAgICAgIHh4ID0geCAqIGR4ICsgeSAqIC1keTtcbiAgICAgICAgeXkgPSB4ICogZHkgKyB5ICogZHg7XG5cbiAgICAgICAgdmFyIGRldGFpbHMgPSB0aGlzLmFzUG9sYXIodGhpcy52ZWN0b3IoeHgsIHl5KSk7XG5cbiAgICAgICAgeHggKz0gdGhpcy54O1xuICAgICAgICB5eSArPSB0aGlzLnk7XG5cbiAgICAgICAgdmVsb2NpdHlBID0gdGhpcy5wb2xhcihkZXRhaWxzLm1hZyAqIHRoaXMuZHIsIGRldGFpbHMuZGlyICsgdGhpcy5QSTkwKTtcbiAgICAgICAgdmVsb2NpdHlUID0gdGhpcy52ZWN0b3JBZGQodmVsb2NpdHkgPSB0aGlzLnZlY3Rvcih0aGlzLmR4LCB0aGlzLmR5KSwgdmVsb2NpdHlBKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmVsb2NpdHk6IHZlbG9jaXR5LFxuICAgICAgICAgICAgdmVsb2NpdHlUOiB2ZWxvY2l0eVQsXG4gICAgICAgICAgICB2ZWxvY2l0eUEgOiB2ZWxvY2l0eUEsXG4gICAgICAgICAgICBwb3M6IHRoaXMudmVjdG9yKHh4LCB5eSksXG4gICAgICAgICAgICByYWRpdXM6IGRldGFpbHMubWFnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwb2xhcihtYWcgPSAxLCBkaXIgPSAwKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlUG9sYXIoe2RpcjogZGlyLCBtYWc6IG1hZ30pXG4gICAgfVxuXG4gICAgdmVjdG9yKHggPSAxLCB5ID0gMCkge1xuICAgICAgICByZXR1cm4geyB4OiB4LCB5OiB5fTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZVBvbGFyKHZlYykge1xuICAgICAgICBpZiAodGhpcy5pc1BvbGFyKHZlYykpIHtcbiAgICAgICAgICAgIGlmKHZlYy5tYWcgPCAwKXtcbiAgICAgICAgICAgICAgICB2ZWMubWFnID0gLXZlYy5tYWc7XG4gICAgICAgICAgICAgICAgdmVjLmRpciArPSB0aGlzLlBJO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2ZWM7XG4gICAgfVxuXG4gICAgcG9sYXJUb0NhcnQocFZlYywgcmV0ViA9IHt4OiAwLCB5OiAwfSl7XG4gICAgICAgIHJldFYueCA9IE1hdGguY29zKHBWZWMuZGlyKSAqIHBWZWMubWFnO1xuICAgICAgICByZXRWLnkgPSBNYXRoLnNpbihwVmVjLmRpcikgKiBwVmVjLm1hZztcbiAgICAgICAgcmV0dXJuIHJldFZcbiAgICB9XG5cbiAgICBhc1BvbGFyKHZlYykge1xuICAgICAgICBpZiAodGhpcy5pc0NhcnQodmVjKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FydFRvUG9sYXIodmVjKVxuICAgICAgICB9XG4gICAgICAgIGlmICh2ZWMubWFnIDwgMCkge1xuICAgICAgICAgICAgdmVjLm1hZyA9IC12ZWMubWFnO1xuICAgICAgICAgICAgdmVjLmRpciArPSB0aGlzLlBJO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGRpcjogdmVjLmRpciwgbWFnOiB2ZWMubWFnfTtcbiAgICB9XG5cbiAgICBpc0NhcnQodmVjKSB7IGlmKHZlYy54ICE9PSB1bmRlZmluZWQgJiYgdmVjLnkgIT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdHJ1ZTsgfSByZXR1cm4gZmFsc2U7IH1cbiAgICBpc1BvbGFyKHZlYykgeyBpZih2ZWMubWFnICE9PSB1bmRlZmluZWQgJiYgdmVjLmRpciAhPT0gdW5kZWZpbmVkKSB7IHJldHVybiB0cnVlOyB9IHJldHVybiBmYWxzZTsgfVxuICAgIGFzQ2FydCh2ZWMpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNQb2xhcih2ZWMpKSB7cmV0dXJuIHRoaXMucG9sYXJUb0NhcnQodmVjKX1cbiAgICAgICAgcmV0dXJuIHt4OiB2ZWMueCwgeTogdmVjLnl9XG4gICAgfVxuICAgIGNhcnRUb1BvbGFyKHZlYywgcmV0ViA9IHtkaXI6IDAsIG1hZzogMH0pIHtcbiAgICAgICAgcmV0Vi5kaXIgPSBNYXRoLmF0YW4yKHZlYy55LCB2ZWMueCk7XG4gICAgICAgIHJldFYubWFnID0gTWF0aC5oeXBvdCh2ZWMueCwgdmVjLnkpO1xuICAgICAgICByZXR1cm4gcmV0VjtcbiAgICB9XG5cbiAgICB2ZWN0b3JBZGQodmVjMSwgdmVjMikge1xuICAgICAgICB2YXIgdjEgPSB0aGlzLmFzQ2FydCh2ZWMxKTtcbiAgICAgICAgdmFyIHYyID0gdGhpcy5hc0NhcnQodmVjMik7XG4gICAgICAgIHJldHVybiB0aGlzLnZlY3Rvcih2MS54ICsgdjIueCwgdjEueSArIHYyLnkpXG4gICAgfVxuXG4gICAgYXBwbHlGb3JjZShmb3JjZSwgbG9jKSB7XG4gICAgICAgIHRoaXMudmFsaWRhdGVQb2xhcihmb3JjZSk7XG4gICAgICAgIHZhciBsID0gdGhpcy5hc0NhcnQobG9jKTtcbiAgICAgICAgdmFyIHRvQ2VudGVyID0gdGhpcy5hc1BvbGFyKHRoaXMudmVjdG9yKHRoaXMueCAtIGwueCwgdGhpcy55IC0gbC55KSk7XG4gICAgICAgIHZhciBwaGV0YSA9IHRvQ2VudGVyLmRpciAtIGZvcmNlLmRpcjtcbiAgICAgICAgdmFyIEZ2ID0gTWF0aC5jb3MocGhldGEpICogZm9yY2UubWFnO1xuICAgICAgICB2YXIgRmEgPSBNYXRoLnNpbihwaGV0YSkgKiBmb3JjZS5tYWc7XG4gICAgICAgIHZhciBhY2NlbCA9IHRoaXMuYXNQb2xhcih0b0NlbnRlcik7XG4gICAgICAgIGFjY2VsLm1hZyA9IEZ2IC8gdGhpcy5tYXNzOyBcbiAgICAgICAgdmFyIGRlbHRhViA9IHRoaXMuYXNDYXJ0KGFjY2VsKTsgXG4gICAgICAgIHRoaXMuZHggKz0gZGVsdGFWLnggXG4gICAgICAgIHRoaXMuZHkgKz0gZGVsdGFWLnlcbiAgICAgICAgdmFyIGFjY2VsQSA9IEZhIC8gKHRvQ2VudGVyLm1hZyAgKiB0aGlzLm1hc3MpOyBcbiAgICAgICAgdGhpcy5kciArPSBhY2NlbEE7XG4gICAgfVxuXG4gICAgdmVjdG9yQ29tcG9uZW50c0ZvckRpcih2ZWMsIGRpcikge1xuICAgICAgICB2YXIgdiA9IHRoaXMuYXNQb2xhcih2ZWMpOyBcbiAgICAgICAgdmFyIHBoZXRhID0gdi5kaXIgLSBkaXI7XG4gICAgICAgIHZhciBGdiA9IE1hdGguY29zKHBoZXRhKSAqIHYubWFnO1xuICAgICAgICB2YXIgRmEgPSBNYXRoLnNpbihwaGV0YSkgKiB2Lm1hZztcblxuICAgICAgICB2YXIgZDEgPSBkaXI7XG4gICAgICAgIHZhciBkMiA9IGRpciArIHRoaXMuUEk5MDsgICAgXG4gICAgICAgIGlmKEZ2IDwgMCl7XG4gICAgICAgICAgICBkMSArPSB0aGlzLlBJO1xuICAgICAgICAgICAgRnYgPSAtRnY7XG4gICAgICAgIH1cblxuICAgICAgICBpZihGYSA8IDApe1xuICAgICAgICAgICAgZDIgKz0gdGhpcy5QSTtcbiAgICAgICAgICAgIEZhID0gLUZhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbG9uZyA6IHRoaXMucG9sYXIoRnYsZDEpLFxuICAgICAgICAgICAgdGFuZ2VudCA6IHRoaXMucG9sYXIoRmEsZDIpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZG9Db2xsaXNpb24ocG9pbnREZXRhaWxzLCB3YWxsSW5kZXgpIHtcbiAgICAgICAgdmFyIHZ2ID0gdGhpcy5hc1BvbGFyKHBvaW50RGV0YWlscy52ZWxvY2l0eSk7IFxuICAgICAgICB2YXIgdmEgPSB0aGlzLmFzUG9sYXIocG9pbnREZXRhaWxzLnZlbG9jaXR5QSk7IFxuICAgICAgICB2YXIgdnZjID0gdGhpcy52ZWN0b3JDb21wb25lbnRzRm9yRGlyKHZ2LCB0aGlzLldBTExfTk9STVNbd2FsbEluZGV4XSk7XG4gICAgICAgIHZhciB2YWMgPSB0aGlzLnZlY3RvckNvbXBvbmVudHNGb3JEaXIodmEsIHRoaXMuV0FMTF9OT1JNU1t3YWxsSW5kZXhdKTtcblxuICAgICAgICB2dmMuYWxvbmcubWFnICo9IDEuMTg7IFxuICAgICAgICB2YWMuYWxvbmcubWFnICo9IDEuMTg7IFxuXG4gICAgICAgIHZ2Yy5hbG9uZy5tYWcgKj0gdGhpcy5tYXNzO1xuICAgICAgICB2YWMuYWxvbmcubWFnICo9IHRoaXMubWFzcztcblxuICAgICAgICB2dmMuYWxvbmcuZGlyICs9IHRoaXMuUEk7XG4gICAgICAgIHZhYy5hbG9uZy5kaXIgKz0gdGhpcy5QSTtcblxuICAgICAgICB2dmMudGFuZ2VudC5tYWcgKj0gMC4xODsgIFxuICAgICAgICB2YWMudGFuZ2VudC5tYWcgKj0gMC4xODtcbiAgICAgICAgdnZjLnRhbmdlbnQubWFnICo9IHRoaXMubWFzcyAgXG4gICAgICAgIHZhYy50YW5nZW50Lm1hZyAqPSB0aGlzLm1hc3NcbiAgICAgICAgdnZjLnRhbmdlbnQuZGlyICs9IHRoaXMuUEk7IFxuICAgICAgICB2YWMudGFuZ2VudC5kaXIgKz0gdGhpcy5QSTtcblxuICAgICAgICB0aGlzLmFwcGx5Rm9yY2UodnZjLmFsb25nLCBwb2ludERldGFpbHMucG9zKSAgICBcbiAgICAgICAgdGhpcy5hcHBseUZvcmNlKHZ2Yy50YW5nZW50LCBwb2ludERldGFpbHMucG9zKSAgICBcbiAgICAgICAgdGhpcy5hcHBseUZvcmNlKHZhYy5hbG9uZywgcG9pbnREZXRhaWxzLnBvcykgICAgXG4gICAgICAgIHRoaXMuYXBwbHlGb3JjZSh2YWMudGFuZ2VudCwgcG9pbnREZXRhaWxzLnBvcykgICAgXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCbG9jayIsImNsYXNzIENhbnZhcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSAxNDAwO1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSA3NTA7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICB0aGlzLmJpbmRDYW52YXNUb0RPTSgpXG4gICAgfVxuXG4gICAgYmluZENhbnZhc1RvRE9NKCkge1xuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLWNhbnZhc1wiKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhckNhbnZhcygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKHRoaXMuY2FudmFzKTtcbiAgICAgICAgdGhpcy5jYW52YXMuY2xhc3NMaXN0LmFkZChcIm1haW4tY2FudmFzXCIpXG4gICAgfVxuXG4gICAgY2xlYXJDYW52YXMoKSB7XG4gICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhbnZhcztcbiIsIi8vIGltcG9ydCBcIi4vc3R5bGVzL2luZGV4LnNjc3NcIjtcbmltcG9ydCBDYW52YXMgZnJvbSBcIi4vY2FudmFzXCI7XG5pbXBvcnQgU3RhZ2VMb2FkZXIgZnJvbSBcIi4vc3RhZ2VMb2FkZXJcIjtcblxuY2xhc3MgQW5nZXJlZEJpcmRzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IG5ldyBDYW52YXMoKVxuICAgICAgICB0aGlzLmNhbnZhcy5iaW5kQ2FudmFzVG9ET00oKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplRW50aXRpZXMoKTtcbiAgICAgICAgY29uc3QgYW5pbWF0aW9uID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jYW52YXMuY2xlYXJDYW52YXMoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2VMb2FkZXIudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uKTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXplRW50aXRpZXMoKSB7XG4gICAgICAgIHRoaXMuc3RhZ2VMb2FkZXIgPSBuZXcgU3RhZ2VMb2FkZXIodGhpcy5jYW52YXMuY3R4KTtcbiAgICAgICAgdGhpcy5zdGFnZUxvYWRlci5pbml0aWFsaXplRW50aXRpZXMoKTtcbiAgICAgICAgdGhpcy5zdGFnZUxvYWRlci5pbml0aWFsaXplRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9XG5cbiAgICBnYW1lT3ZlcigpIHtcbiAgICAgICAgLy8gcmVzdGFydCBHYW1lLCBhZnRlciBjZXJ0YWluIGJpcmR5IHNob3RzXG4gICAgICAgIC8vIGRyb3AgZXZlbnRMaXN0ZW5lcnMgYW5kIHJlYXR0YWNoIERPTSBjYW52YXMgbm9kZVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQW5nZXJlZEJpcmRzOyIsImNsYXNzIFBpZyB7XG4gICAgY29uc3RydWN0b3IoY3R4LCB4LCB5LCByYWRpdXMsIHZlbFggPSAwLCB2ZWxZID0gMCkge1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy54ID0geDsgXG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMudmVsWCA9IHZlbFg7XG4gICAgICAgIHRoaXMudmVsWSA9IHZlbFk7XG4gICAgICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xuICAgICAgICB0aGlzLm1hc3MgPSAyO1xuXG4gICAgICAgIHRoaXMuZ3Jhdml0eSA9IHsgeDogMCwgeTogMC4xIH07XG4gICAgICAgIHRoaXMuZ3JvdW5kID0gdGhpcy5jdHguY2FudmFzLmhlaWdodCAtIDIwO1xuICAgICAgICB0aGlzLmJvdW5jZSA9IDAuNDtcbiAgICAgICAgdGhpcy5mcmljdGlvblggPSAwLjk7XG4gICAgICAgIHRoaXMubWFzcyA9IDI7XG4gICAgICAgIHRoaXMucGlnID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMucGlnLnNyYyA9IFwic3JjL2ltYWdlcy9wZXBwYS5wbmdcIlxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdGhpcy5jdHguc2F2ZSgpO1xuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5jdHguYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLnJhZGl1cywgMCwgKE1hdGguUEkgKiAyKSwgZmFsc2UpO1xuICAgICAgICB0aGlzLmN0eC5jbGlwKCk7XG4gICAgICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UodGhpcy5waWcsIHRoaXMueCAtIHRoaXMucmFkaXVzLCB0aGlzLnkgLSB0aGlzLnJhZGl1cywgdGhpcy5yYWRpdXMgKiAyLCB0aGlzLnJhZGl1cyAqIDIpO1xuICAgICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLnZlbFggKz0gdGhpcy5ncmF2aXR5Lng7XG4gICAgICAgIHRoaXMudmVsWSArPSB0aGlzLmdyYXZpdHkueTtcbiAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsWDtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMudmVsWTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnkgPj0gdGhpcy5ncm91bmQpIHtcbiAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuZ3JvdW5kIC0gKHRoaXMueSAtIHRoaXMuZ3JvdW5kKTtcbiAgICAgICAgICAgIHRoaXMudmVsWSA9IC1NYXRoLmFicyh0aGlzLnZlbFkpICogdGhpcy5ib3VuY2U7XG4gICAgICAgICAgICBpZiAodGhpcy52ZWxZID49IHRoaXMuZ3Jhdml0eS55KSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWxZID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmdyb3VuZCAtIHRoaXMuZ3Jhdml0eS55O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudmVsWCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlbFggLT0gdGhpcy5mcmljdGlvblg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy52ZWxYIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVsWCArPSB0aGlzLmZyaWN0aW9uWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBzdG9wcyBiYWxsIGZyb20gYm91bmNpbmcgaW4gWSBheGlzXG4gICAgICAgIGlmICh0aGlzLnZlbFk8MCAmJiB0aGlzLnZlbFk+LTIuMSkge1xuICAgICAgICAgICAgdGhpcy52ZWxZID0gMDtcbiAgICAgICAgfVxuICAgICAgICAvLyBzdG9wcyBiYWxsIGZyb20gbW92aW5nIG9uIFggYXhpcyBpZiB4LXZlbG9jaXR5IDwgMS4xXG4gICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnZlbFgpIDwgMS4xKSB7XG4gICAgICAgICAgICB0aGlzLnZlbFggPSAwO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFBpZzsiLCJpbXBvcnQgQmlyZCBmcm9tIFwiLi9iaXJkXCI7XG5jbGFzcyBQcm9qZWN0aWxlIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgsIGJpcmRQcm9wZXJ0aWVzKSB7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLmxhdW5jaGVkT2JqZWN0cyA9IFtdO1xuICAgICAgICB0aGlzLm1heCA9IDE7XG4gICAgICAgIHRoaXMuYmlyZFByb3BlcnRpZXMgPSBiaXJkUHJvcGVydGllcztcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlSW1hZ2Uuc3JjID0gXCJzcmMvaW1hZ2VzL3BpeGlsLWxheWVyLUJhY2tncm91bmQucG5nXCI7XG4gICAgfVxuXG4gICAga2lja09mZkxhdW5jaERpcmVjdGlvbihhbmdsZVZhbCwgbWFnbml0dWRlVmFsKSB7XG4gICAgICAgIGxldCBhbmdsZSA9IE1hdGguUEkqIGFuZ2xlVmFsIC8xODA7XG4gICAgICAgIHRoaXMuY3VycmVudFByb2plY3RpbGVPYmplY3QgPSBuZXcgQmlyZCh0aGlzLmN0eCwgdGhpcy5iaXJkUHJvcGVydGllcyk7XG4gICAgICAgIHRoaXMub2JqZWN0TGF1bmNoZWQgPSBuZXcgT2JqZWN0TGF1bmNoKHRoaXMuY3R4LCB0aGlzLmN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0KTtcbiAgICAgICAgdGhpcy5vYmplY3RMYXVuY2hlZC5vYmplY3RUeXBlLnZlbFkgPS0gbWFnbml0dWRlVmFsICogTWF0aC5zaW4oYW5nbGUpO1xuICAgICAgICB0aGlzLm9iamVjdExhdW5jaGVkLm9iamVjdFR5cGUudmVsWCA9IG1hZ25pdHVkZVZhbCAqIE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgdGhpcy5vYmplY3RMYXVuY2hlZC5vYmplY3RUeXBlLnRyYW5zZmVyID0gMC44O1xuICAgICAgICB0aGlzLmxhdW5jaGVkT2JqZWN0cy5wdXNoKHRoaXMub2JqZWN0TGF1bmNoZWQpO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubGF1bmNoZWRPYmplY3RzLmxlbmd0aCA+IHRoaXMubWF4KSB7XG4gICAgICAgICAgICB0aGlzLmxhdW5jaGVkT2JqZWN0cyA9IHRoaXMubGF1bmNoZWRPYmplY3RzLnNwbGljZSgxKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGF1bmNoZWRPYmplY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudE9iamVjdCA9IHRoaXMubGF1bmNoZWRPYmplY3RzW2ldLm9iamVjdFR5cGU7XG4gICAgICAgICAgICBjdXJyZW50T2JqZWN0LnZlbFkgKz0gMS41MztcbiAgICAgICAgICAgIGN1cnJlbnRPYmplY3QueCArPSBjdXJyZW50T2JqZWN0LnZlbFggLyAzO1xuICAgICAgICAgICAgY3VycmVudE9iamVjdC55ICs9IGN1cnJlbnRPYmplY3QudmVsWSAvIDM7XG4gICAgICAgIFxuICAgICAgICAgICAgdGhpcy5sYXVuY2hlZE9iamVjdHNbaV0udXBkYXRlQ3VycmVudExhdW5jaGVkT2JqZWN0KClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMucHJvamVjdGlsZUltYWdlLCB0aGlzLmJpcmRQcm9wZXJ0aWVzLnggLSAzMCwgdGhpcy5iaXJkUHJvcGVydGllcy55IC0gNzApO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGF1bmNoZWRPYmplY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudEJpcmQgPSB0aGlzLmxhdW5jaGVkT2JqZWN0c1tpXS5vYmplY3RUeXBlO1xuICAgICAgICAgICAgY3VycmVudEJpcmQucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIE9iamVjdExhdW5jaCB7XG4gICAgY29uc3RydWN0b3IoY3R4LCBvYmplY3RUeXBlKSB7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLm9iamVjdFR5cGUgPSBvYmplY3RUeXBlO1xuICAgIH1cblxuICAgIHJlbmRlck9iamVjdExhdW5jaCgpIHtcbiAgICAgICAgdGhpcy5vYmplY3RUeXBlLnJlbmRlcigpO1xuICAgIH1cblxuICAgIHVwZGF0ZUN1cnJlbnRMYXVuY2hlZE9iamVjdCgpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRPYmplY3QgPSB0aGlzLm9iamVjdFR5cGU7XG4gICAgICAgIGN1cnJlbnRPYmplY3QudmVsWCArPSBjdXJyZW50T2JqZWN0LmdyYXZpdHkueDtcbiAgICAgICAgY3VycmVudE9iamVjdC52ZWxZICs9IGN1cnJlbnRPYmplY3QuZ3Jhdml0eS55O1xuICAgICAgICBjdXJyZW50T2JqZWN0LnggKz0gY3VycmVudE9iamVjdC52ZWxYO1xuICAgICAgICBjdXJyZW50T2JqZWN0LnkgKz0gY3VycmVudE9iamVjdC52ZWxZO1xuXG4gICAgICAgIGlmIChjdXJyZW50T2JqZWN0LnkgPj0gY3VycmVudE9iamVjdC5ncm91bmQpIHtcbiAgICAgICAgICAgIGN1cnJlbnRPYmplY3QueSA9IGN1cnJlbnRPYmplY3QuZ3JvdW5kIC0gKGN1cnJlbnRPYmplY3QueSAtIGN1cnJlbnRPYmplY3QuZ3JvdW5kKTtcbiAgICAgICAgICAgIGN1cnJlbnRPYmplY3QudmVsWSA9IC1NYXRoLmFicyhjdXJyZW50T2JqZWN0LnZlbFkpICogY3VycmVudE9iamVjdC5ib3VuY2U7XG4gICAgICAgICAgICBpZiAoY3VycmVudE9iamVjdC52ZWxZID49IGN1cnJlbnRPYmplY3QuZ3Jhdml0eS55KSB7XG4gICAgICAgICAgICAgICAgY3VycmVudE9iamVjdC52ZWxZID0gMDtcbiAgICAgICAgICAgICAgICBjdXJyZW50T2JqZWN0LnkgPSBjdXJyZW50T2JqZWN0Lmdyb3VuZCAtIGN1cnJlbnRPYmplY3QuZ3Jhdml0eS55O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGN1cnJlbnRPYmplY3QudmVsWCA+IDApIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50T2JqZWN0LnZlbFggLT0gY3VycmVudE9iamVjdC5mcmljdGlvblg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY3VycmVudE9iamVjdC52ZWxYIDwgMCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRPYmplY3QudmVsWCArPSBjdXJyZW50T2JqZWN0LmZyaWN0aW9uWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBzdG9wcyBiYWxsIGZyb20gYm91bmNpbmcgaW4gWSBheGlzXG4gICAgICAgIGlmICggY3VycmVudE9iamVjdC55ID49IGN1cnJlbnRPYmplY3QuZ3JvdW5kIC0gMTApIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50T2JqZWN0LnZlbFkgPD0gMCAmJiBjdXJyZW50T2JqZWN0LnZlbFkgPiAtMi41KSB7XG4gICAgICAgICAgICAgICAgY3VycmVudE9iamVjdC52ZWxZID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBzdG9wcyBiYWxsIGZyb20gbW92aW5nIG9uIFggYXhpcyBcbiAgICAgICAgaWYgKE1hdGguYWJzKGN1cnJlbnRPYmplY3QudmVsWCkgPCAxLjEpIHtcbiAgICAgICAgICAgIGN1cnJlbnRPYmplY3QudmVsWCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdGlsZTsiLCJpbXBvcnQgUGlnIGZyb20gXCIuL3BpZ1wiO1xuaW1wb3J0IEJsb2NrIGZyb20gXCIuL2Jsb2NrXCI7XG5pbXBvcnQgUHJvamVjdGlsZSBmcm9tIFwiLi9wcm9qZWN0aWxlXCI7XG5pbXBvcnQge3N0YWdlS2V5c30gZnJvbSBcIi4vc3RhZ2VzL3N0YWdlS2V5c1wiO1xuaW1wb3J0IHtjaGVja0JpcmRPblBpZ0NvbGxpc2lvbiwgY2hlY2tCaXJkT25CbG9ja0NvbGxpc2lvbn0gZnJvbSBcIi4vdXRpbC9jb2xsaXNpb25EZXRlY3Rpb25VdGlsXCI7XG5pbXBvcnQge2JpcmRPblBpZ0NvbGxpc2lvbkxvZ2ljLCBiaXJkT25CbG9ja0NvbGxpc2lvbkxvZ2ljfSBmcm9tIFwiLi91dGlsL2NvbGxpc2lvbkxvZ2ljVXRpbFwiO1xuXG5jbGFzcyBTdGFnZUxvYWRlciB7XG4gICAgY29uc3RydWN0b3IoY3R4KSB7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGN0eC5jYW52YXM7XG4gICAgICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgICAgICB0aGlzLnN0YWdlTnVtYmVyID0gMTtcbiAgICAgICAgdGhpcy5zdGFydFBvc0JpcmQgPSBbXTtcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlT2JqZWN0ID0ge307XG4gICAgICAgIHRoaXMucGlncyA9IFtdO1xuICAgICAgICB0aGlzLmJsb2NrcyA9IFtdO1xuICAgIH1cbiAgICBcbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlRW50aXRpZXMoKTtcbiAgICAgICAgaWYgKHRoaXMucHJvamVjdGlsZU9iamVjdC5vYmplY3RMYXVuY2hlZCkgdGhpcy5jaGVja0FuZFVwZGF0ZUVudGl0aWVzQ29sbGlzaW9uKCk7XG4gICAgICAgIHRoaXMucmVuZGVyRW50aXRpZXMoKTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXplRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGNvbnN0IG1vdXNlID0ge1xuICAgICAgICAgICAgeDogdGhpcy5jYW52YXMud2lkdGgvMixcbiAgICAgICAgICAgIHk6IHRoaXMuY2FudmFzLmhlaWdodC8yLFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgbGV0IGNhbnZhc1Byb3BlcnRpZXMgPSB0aGlzLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIG1vdXNlLnggPSBlLnggLSBjYW52YXNQcm9wZXJ0aWVzLmxlZnQ7XG4gICAgICAgICAgICBtb3VzZS55ID0gZS55IC0gY2FudmFzUHJvcGVydGllcy50b3A7XG4gICAgICAgICAgICBsZXQgZGVsdGFYID0gbW91c2UueCAtIHRoaXMuc3RhcnRQb3NCaXJkWzBdO1xuICAgICAgICAgICAgbGV0IGRlbHRhWSA9IG1vdXNlLnkgLSB0aGlzLnN0YXJ0UG9zQmlyZFsxXTtcbiAgICAgICAgICAgIGxldCB0aGV0YVJhZGlhbiA9IE1hdGguYXRhbjIoZGVsdGFZLCBkZWx0YVgpO1xuICAgICAgICAgICAgbGV0IGFuZ2xlVmFsID0gLSgoTWF0aC5hYnModGhldGFSYWRpYW4gKiAxODAgLyBNYXRoLlBJKSAtIDI3MCkgJSA5MCk7XG4gICAgICAgICAgICBsZXQgbWFnbml0dWRlVmFsID0gKE1hdGguYWJzKG1vdXNlLnggLSAxMzApIC8gMik7XG5cbiAgICAgICAgICAgIHRoaXMucHJvamVjdGlsZU9iamVjdC5raWNrT2ZmTGF1bmNoRGlyZWN0aW9uKGFuZ2xlVmFsICwgbWFnbml0dWRlVmFsKVxuICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZUVudGl0aWVzKCkge1xuICAgICAgICBjb25zdCBjdXJyZW50U3RhZ2VWYWx1ZXMgPSBzdGFnZUtleXNbdGhpcy5zdGFnZU51bWJlcl07XG4gICAgICAgIHRoaXMubG9hZFN0YWdlKGN1cnJlbnRTdGFnZVZhbHVlcyk7XG4gICAgfVxuXG4gICAgbG9hZFN0YWdlKGN1cnJlbnRTdGFnZVZhbHVlcykge1xuICAgICAgICB0aGlzLnByb2plY3RpbGVPYmplY3QgPSBuZXcgUHJvamVjdGlsZSh0aGlzLmN0eCwgY3VycmVudFN0YWdlVmFsdWVzW1wiYmlyZFByb3BlcnRpZXNcIl0pO1xuICAgICAgICB0aGlzLnN0YXJ0UG9zQmlyZCA9IFtjdXJyZW50U3RhZ2VWYWx1ZXNbXCJiaXJkUHJvcGVydGllc1wiXS54LCBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJiaXJkUHJvcGVydGllc1wiXS55XVxuICAgICAgICB0aGlzLmN1cnJlbnRMZXZlbEhpZ2hTY29yZUtleSA9IGN1cnJlbnRTdGFnZVZhbHVlc1tcImN1cnJlbnRMZXZlbEhpZ2hTY29yZUtleVwiXTtcblxuICAgICAgICBsZXQgaGlnaFNjb3JlU2F2ZUtleVN0cmluZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuY3VycmVudExldmVsSGlnaFNjb3JlS2V5KTtcbiAgICAgICAgaWYgKGhpZ2hTY29yZVNhdmVLZXlTdHJpbmcgPT09IFwidW5kZWZpbmVkXCIpe1xuICAgICAgICAgICAgdGhpcy5oaWdoU2NvcmUgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oaWdoU2NvcmUgPSBwYXJzZUludChoaWdoU2NvcmVTYXZlS2V5U3RyaW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3VycmVudFN0YWdlVmFsdWVzW1wibnVtYmVyT2ZQaWdzXCJdOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucGlncy5wdXNoKG5ldyBQaWcoXG4gICAgICAgICAgICAgICAgdGhpcy5jdHgsIFxuICAgICAgICAgICAgICAgIGN1cnJlbnRTdGFnZVZhbHVlc1tcInBpZ1Byb3BlcnRpZXNcIl1baV0ueCwgXG4gICAgICAgICAgICAgICAgY3VycmVudFN0YWdlVmFsdWVzW1wicGlnUHJvcGVydGllc1wiXVtpXS55LCBcbiAgICAgICAgICAgICAgICBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJwaWdQcm9wZXJ0aWVzXCJdW2ldLnJhZCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJudW1iZXJPZkJsb2Nrc1wiXTsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmJsb2Nrcy5wdXNoKG5ldyBCbG9jayhcbiAgICAgICAgICAgICAgICB0aGlzLmN0eCwgXG4gICAgICAgICAgICAgICAgY3VycmVudFN0YWdlVmFsdWVzW1wiYmxvY2tQcm9wZXJpdGVzXCJdW2ldLngsIFxuICAgICAgICAgICAgICAgIGN1cnJlbnRTdGFnZVZhbHVlc1tcImJsb2NrUHJvcGVyaXRlc1wiXVtpXS55LFxuICAgICAgICAgICAgICAgIGN1cnJlbnRTdGFnZVZhbHVlc1tcImJsb2NrUHJvcGVyaXRlc1wiXVtpXS53LFxuICAgICAgICAgICAgICAgIGN1cnJlbnRTdGFnZVZhbHVlc1tcImJsb2NrUHJvcGVyaXRlc1wiXVtpXS5oKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVFbnRpdGllcygpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlT2JqZWN0LnVwZGF0ZSgpXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5waWdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnBpZ3NbaV0udXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBpZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tzW2ldLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlSGlnaFNjb3JlKClcbiAgICB9XG5cbiAgICB1cGRhdGVIaWdoU2NvcmUoKSB7XG4gICAgICAgIGlmICh0aGlzLnNjb3JlID4gdGhpcy5oaWdoU2NvcmUpIHtcbiAgICAgICAgICAgIHRoaXMuaGlnaFNjb3JlID0gdGhpcy5zY29yZTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuY3VycmVudExldmVsSGlnaFNjb3JlS2V5LCB0aGlzLmhpZ2hTY29yZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja0FuZFVwZGF0ZUVudGl0aWVzQ29sbGlzaW9uKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGlncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGNoZWNrQmlyZE9uUGlnQ29sbGlzaW9uKHRoaXMucHJvamVjdGlsZU9iamVjdC5jdXJyZW50UHJvamVjdGlsZU9iamVjdCwgdGhpcy5waWdzW2ldKSkge1xuICAgICAgICAgICAgICAgIGJpcmRPblBpZ0NvbGxpc2lvbkxvZ2ljKHRoaXMucHJvamVjdGlsZU9iamVjdC5jdXJyZW50UHJvamVjdGlsZU9iamVjdCwgdGhpcy5waWdzW2ldKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3JlICs9IDMwMDA7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ibG9ja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjaGVja0JpcmRPbkJsb2NrQ29sbGlzaW9uKHRoaXMucHJvamVjdGlsZU9iamVjdC5jdXJyZW50UHJvamVjdGlsZU9iamVjdCwgdGhpcy5ibG9ja3NbaV0pKSB7XG4gICAgICAgICAgICAgICAgYmlyZE9uQmxvY2tDb2xsaXNpb25Mb2dpYyh0aGlzLnByb2plY3RpbGVPYmplY3QuY3VycmVudFByb2plY3RpbGVPYmplY3QsIHRoaXMuYmxvY2tzW2ldKVxuICAgICAgICAgICAgICAgIHRoaXMuc2NvcmUgKz0gMzI1O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyRW50aXRpZXMoKSB7XG4gICAgICAgIHRoaXMucHJvamVjdGlsZU9iamVjdC5yZW5kZXIoKVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGlncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5waWdzW2ldLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5waWdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmJsb2Nrc1tpXS5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbmRlclNjb3JlKCk7XG4gICAgICAgIHRoaXMucmVuZGVySGlnaFNjb3JlKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyU2NvcmUoKSB7IFxuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcInJpZ2h0XCI7XG4gICAgICAgIHRoaXMuY3R4LnRleHRCYXNlbGluZSA9IFwidG9wXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiV0hJVEVcIjtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIkJMQUNLXCI7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSA1MCArIFwicHggQmFuZ2Vyc1wiO1xuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCh0aGlzLnNjb3JlLCB0aGlzLmNhbnZhcy53aWR0aCAtIDMwIC8gMiwgMClcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dCh0aGlzLnNjb3JlLCB0aGlzLmNhbnZhcy53aWR0aCAtIDMwIC8gMiwgMCk7XG5cbiAgICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gXCJyaWdodFwiO1xuICAgICAgICB0aGlzLmN0eC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIldISVRFXCI7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCJCTEFDS1wiO1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gNTAgKyBcInB4IEJhbmdlcnNcIjtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dChcIlNjb3JlOiAgICAgICAgICAgICAgICAgICAgICBcIiwgdGhpcy5jYW52YXMud2lkdGggLSAzMCAvIDIsIDApO1xuICAgIH1cblxuICAgIHJlbmRlckhpZ2hTY29yZSgpIHtcbiAgICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gXCJyaWdodFwiO1xuICAgICAgICB0aGlzLmN0eC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIldISVRFXCI7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCJCTEFDS1wiO1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gNTAgKyBcInB4IEJhbmdlcnNcIjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQodGhpcy5oaWdoU2NvcmUsIHRoaXMuY2FudmFzLndpZHRoIC0gMzAgLyAyLCA2MCk7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVRleHQodGhpcy5oaWdoU2NvcmUsIHRoaXMuY2FudmFzLndpZHRoIC0gMzAgLyAyLCA2MCk7XG5cbiAgICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gXCJyaWdodFwiO1xuICAgICAgICB0aGlzLmN0eC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIldISVRFXCI7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCJCTEFDS1wiO1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gNTAgKyBcInB4IEJhbmdlcnNcIjtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dChcIkhpZ2hzY29yZTogICAgICAgICAgICAgICAgICAgICAgXCIsIHRoaXMuY2FudmFzLndpZHRoIC0gMzAgLyAyLCA2MCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdGFnZUxvYWRlcjsiLCJleHBvcnQgY29uc3Qgc3RhZ2VLZXlzID0ge1xuICAgIDEgOiB7XG4gICAgICAgIFwiY3VycmVudExldmVsSGlnaFNjb3JlS2V5XCI6IFwiaGlnaFNjb3JlS2V5TGV2ZWwxXCIsXG4gICAgICAgIFwibnVtYmVyT2ZQaWdzXCI6IDIsXG4gICAgICAgIFwicGlnUHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICAwIDoge1xuICAgICAgICAgICAgICAgIHg6IDUwMCxcbiAgICAgICAgICAgICAgICB5OiA2MDAsXG4gICAgICAgICAgICAgICAgcmFkOiAxNSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAxIDoge1xuICAgICAgICAgICAgICAgIHg6IDYwMCxcbiAgICAgICAgICAgICAgICB5OiA2MDAsXG4gICAgICAgICAgICAgICAgcmFkOiAxNSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBcIm51bWJlck9mQmxvY2tzXCI6IDIsXG4gICAgICAgIFwiYmxvY2tQcm9wZXJpdGVzXCI6IHtcbiAgICAgICAgICAgIDAgOiB7XG4gICAgICAgICAgICAgICAgeDogMzUwLFxuICAgICAgICAgICAgICAgIHk6IDcwMCxcbiAgICAgICAgICAgICAgICB3OiAzMCxcbiAgICAgICAgICAgICAgICBoOiAxMDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgMToge1xuICAgICAgICAgICAgICAgIHg6IDcwMCxcbiAgICAgICAgICAgICAgICB5OiA3MDAsXG4gICAgICAgICAgICAgICAgdzogNTAsXG4gICAgICAgICAgICAgICAgaDogMTQwLFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIFwiYmlyZFByb3BlcnRpZXNcIjoge1xuICAgICAgICAgICAgeDogMTIwLFxuICAgICAgICAgICAgeTogNjMwLFxuICAgICAgICAgICAgcmFkOiAxNCxcbiAgICAgICAgfVxuICAgIH1cbn0iLCJleHBvcnQgY29uc3QgY2hlY2tCaXJkT25QaWdDb2xsaXNpb24gPSAoY3VycmVudFByb2plY3RpbGVPYmplY3QsIHBpZykgPT4ge1xuICAgIGlmIChjdXJyZW50UHJvamVjdGlsZU9iamVjdC54ICsgY3VycmVudFByb2plY3RpbGVPYmplY3QucmFkaXVzICsgcGlnLnJhZGl1cyA+IHBpZy54XG4gICAgICAgICYmIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnggPCBwaWcueCArIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnJhZGl1cyArIHBpZy5yYWRpdXNcbiAgICAgICAgJiYgY3VycmVudFByb2plY3RpbGVPYmplY3QueSArIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnJhZGl1cyArIHBpZy5yYWRpdXMgPiBwaWcueVxuICAgICAgICAmJiBjdXJyZW50UHJvamVjdGlsZU9iamVjdC55IDwgcGlnLnkgKyBjdXJyZW50UHJvamVjdGlsZU9iamVjdC5yYWRpdXMgKyBwaWcucmFkaXVzKSBcbiAgICB7XG4gICAgICAgIC8vIHB5dGhhZ29yZWFtIHRoZW9yZW0gdG8gYmUgbW9yZSBleGFjdCBvbiBjb2xsaXNpb25cbiAgICAgICAgbGV0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KFxuICAgICAgICAgICAgICAgICgoY3VycmVudFByb2plY3RpbGVPYmplY3QueCAtIHBpZy54KSAqIChjdXJyZW50UHJvamVjdGlsZU9iamVjdC54IC0gcGlnLngpKVxuICAgICAgICAgICAgKyAoKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnkgLSBwaWcueSkgKiAoY3VycmVudFByb2plY3RpbGVPYmplY3QueSAtIHBpZy55KSlcbiAgICAgICAgKVxuICAgICAgICByZXR1cm4gZGlzdGFuY2UgPCBjdXJyZW50UHJvamVjdGlsZU9iamVjdC5yYWRpdXMgKyBwaWcucmFkaXVzOyBcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBjaGVja0JpcmRPbkJsb2NrQ29sbGlzaW9uID0gKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LCBibG9jaykgPT4ge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgNDsgaisrKXtcbiAgICAgICAgY29uc3QgY2lyY2xlQ2VudGVyID0gW2N1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LngsIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnldO1xuICAgICAgICBpZiAoaiArIDEgPT09IDQpIHtcbiAgICAgICAgICAgIGlmIChjaGVja0JpcmRJbnRlcmNlcHRCbG9jayhibG9jay5nZXRQb2ludChqKSwgYmxvY2suZ2V0UG9pbnQoMCksIGNpcmNsZUNlbnRlciwgY3VycmVudFByb2plY3RpbGVPYmplY3QucmFkaXVzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGNoZWNrQmlyZEludGVyY2VwdEJsb2NrKGJsb2NrLmdldFBvaW50KGopLCBibG9jay5nZXRQb2ludChqICsgMSksIGNpcmNsZUNlbnRlciwgY3VycmVudFByb2plY3RpbGVPYmplY3QucmFkaXVzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5jb25zdCBjaGVja0JpcmRJbnRlcmNlcHRCbG9jayA9IChwb2ludEEsIHBvaW50QiwgY2lyY2xlQ2VudGVyLCByYWRpdXMpID0+IHtcbiAgICBsZXQgZGlzdDtcbiAgICBjb25zdCB2ZWwxWCA9IHBvaW50Qi5wb3MueCAtIHBvaW50QS5wb3MueDtcbiAgICBjb25zdCB2ZWwxWSA9IHBvaW50Qi5wb3MueSAtIHBvaW50QS5wb3MueTtcbiAgICBjb25zdCB2ZWwyWCA9IGNpcmNsZUNlbnRlclswXSAtIHBvaW50QS5wb3MueDtcbiAgICBjb25zdCB2ZWwyWSA9IGNpcmNsZUNlbnRlclsxXSAtIHBvaW50QS5wb3MueTtcbiAgICBjb25zdCB1bml0ID0gKHZlbDJYICogdmVsMVggKyB2ZWwyWSAqIHZlbDFZKSAvICh2ZWwxWSAqIHZlbDFZICsgdmVsMVggKiB2ZWwxWCk7XG4gICAgaWYgKHVuaXQgPj0gMCAmJiB1bml0IDw9IDEpe1xuICAgICAgICBkaXN0ID0gKHBvaW50QS5wb3MueCAgKyB2ZWwxWCAqIHVuaXQgLSBjaXJjbGVDZW50ZXJbMF0pICoqIDIgKyAocG9pbnRBLnBvcy55ICsgdmVsMVkgKiB1bml0IC0gY2lyY2xlQ2VudGVyWzFdKSAqKiAyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc3QgPSB1bml0IDwgMCA/IFxuICAgICAgICAgICAgKHBvaW50QS5wb3MueCAtIGNpcmNsZUNlbnRlclswXSkgKiogMiArIChwb2ludEEucG9zLnkgLSBjaXJjbGVDZW50ZXJbMV0pICoqIDIgOlxuICAgICAgICAgICAgKHBvaW50Qi5wb3MueCAtIGNpcmNsZUNlbnRlclswXSkgKiogMiArIChwb2ludEIucG9zLnkgLSBjaXJjbGVDZW50ZXJbMV0pICoqIDI7XG4gICAgfVxuICAgIHJldHVybiBkaXN0IDwgcmFkaXVzICogcmFkaXVzO1xufVxuXG5cblxuXG5cbiIsImV4cG9ydCBjb25zdCBiaXJkT25QaWdDb2xsaXNpb25Mb2dpYyA9IChjdXJyZW50UHJvamVjdGlsZU9iamVjdCwgcGlnKSA9PiB7XG4gICAgbGV0IG5ld1ZlbFgxID0gKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFggKiAoY3VycmVudFByb2plY3RpbGVPYmplY3QubWFzcyAtIHBpZy5tYXNzKSArICggMiAqIHBpZy5tYXNzICogcGlnLnZlbFgpKSAvIChjdXJyZW50UHJvamVjdGlsZU9iamVjdC5tYXNzICsgcGlnLm1hc3MpO1xuICAgIGxldCBuZXdWZWxZMSA9IChjdXJyZW50UHJvamVjdGlsZU9iamVjdC52ZWxZICogKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0Lm1hc3MgLSBwaWcubWFzcykgKyAoIDIgKiBwaWcubWFzcyAqIHBpZy52ZWxZKSkgLyAoY3VycmVudFByb2plY3RpbGVPYmplY3QubWFzcyArIHBpZy5tYXNzKTtcbiAgICBsZXQgbmV3VmVsWDIgPSAocGlnLnZlbFggKiAocGlnLm1hc3MgLSBjdXJyZW50UHJvamVjdGlsZU9iamVjdC5tYXNzKSArICgyICogY3VycmVudFByb2plY3RpbGVPYmplY3QubWFzcyAqIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFgpKSAvIChjdXJyZW50UHJvamVjdGlsZU9iamVjdC5tYXNzICsgcGlnLm1hc3MpO1xuICAgIGxldCBuZXdWZWxZMiA9IChwaWcudmVsWSAqIChwaWcubWFzcyAtIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0Lm1hc3MpICsgKDIgKiBjdXJyZW50UHJvamVjdGlsZU9iamVjdC5tYXNzICogY3VycmVudFByb2plY3RpbGVPYmplY3QudmVsWSkpIC8gKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0Lm1hc3MgKyBwaWcubWFzcyk7XG5cbiAgICBjdXJyZW50UHJvamVjdGlsZU9iamVjdC52ZWxYID0gLWN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFg7XG4gICAgY3VycmVudFByb2plY3RpbGVPYmplY3QudmVsWSA9IC1jdXJyZW50UHJvamVjdGlsZU9iamVjdC52ZWxZO1xuICAgIHBpZy52ZWxYID0gbmV3VmVsWDI7XG4gICAgcGlnLnZlbFkgPSBuZXdWZWxZMjtcblxuICAgIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnggPSBjdXJyZW50UHJvamVjdGlsZU9iamVjdC54ICsgbmV3VmVsWDE7XG4gICAgY3VycmVudFByb2plY3RpbGVPYmplY3QueSA9IGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnkgKyBuZXdWZWxZMTtcbiAgICBwaWcueCA9IHBpZy54ICsgbmV3VmVsWDI7XG4gICAgcGlnLnkgPSBwaWcueSArIG5ld1ZlbFkyO1xufVxuXG5leHBvcnQgY29uc3QgYmlyZE9uQmxvY2tDb2xsaXNpb25Mb2dpYyA9IChjdXJyZW50UHJvamVjdGlsZU9iamVjdCwgYmxvY2spID0+IHtcbiAgICBjdXJyZW50UHJvamVjdGlsZU9iamVjdC52ZWxYID0gLWN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFg7XG4gICAgY3VycmVudFByb2plY3RpbGVPYmplY3QudmVsWSA9IC1jdXJyZW50UHJvamVjdGlsZU9iamVjdC52ZWxZO1xuICAgIGxldCBmb3JjZSA9IGJsb2NrLmFzUG9sYXIoYmxvY2sudmVjdG9yKDEwLCAxMCkpO1xuICAgIGZvcmNlLm1hZyAqPSBibG9jay5tYXNzICogMC4xO1xuICAgIGJsb2NrLmFwcGx5Rm9yY2UoZm9yY2UsIGJsb2NrLnZlY3RvcihjdXJyZW50UHJvamVjdGlsZU9iamVjdC54LCBjdXJyZW50UHJvamVjdGlsZU9iamVjdC55KSk7XG59XG5cbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vc3R5bGVzL2luZGV4LnNjc3NcIjtcbmltcG9ydCBBbmdlcmVkQmlyZHMgZnJvbSBcIi4vc2NyaXB0cy9nYW1lXCI7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FudmFzXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBpbml0KTtcbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgbmV3IEFuZ2VyZWRCaXJkcygpLnN0YXJ0KCk7XG59XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=