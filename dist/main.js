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
    this.state = "alive";
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
    this.projectileImage.src = "src/images/slingS.png";
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
      this.ctx.drawImage(this.projectileImage, this.birdProperties.x - 30, this.birdProperties.y - 70, 75, 140);

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
document.querySelector(".reset-highscore").addEventListener("click", resetLocalStorage);

function init() {
  new _scripts_game__WEBPACK_IMPORTED_MODULE_1__.default().start();
}

function resetLocalStorage() {
  window.localStorage.clear();
}
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYmlyZC5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYmxvY2suanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi8uL3NyYy9zY3JpcHRzL2NhbnZhcy5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvcGlnLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9wcm9qZWN0aWxlLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9zdGFnZUxvYWRlci5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvc3RhZ2VzL3N0YWdlS2V5cy5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvdXRpbC9jb2xsaXNpb25EZXRlY3Rpb25VdGlsLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy91dGlsL2NvbGxpc2lvbkxvZ2ljVXRpbC5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIkJpcmQiLCJjdHgiLCJiaXJkUHJvcGVydGllcyIsIngiLCJ5IiwicmFkaXVzIiwicmFkIiwibWFzcyIsInZlbFgiLCJ2ZWxZIiwidHJhbnNmZXIiLCJncmF2aXR5IiwiZ3JvdW5kIiwiY2FudmFzIiwiaGVpZ2h0IiwiYm91bmNlIiwiZnJpY3Rpb25YIiwiYmlyZCIsIkltYWdlIiwic3JjIiwic3RhdGUiLCJzYXZlIiwiYmVnaW5QYXRoIiwiYXJjIiwiTWF0aCIsIlBJIiwiY2xpcCIsImNsb3NlUGF0aCIsImRyYXdJbWFnZSIsInJlc3RvcmUiLCJCbG9jayIsInciLCJoIiwiciIsImR4IiwiZHkiLCJkciIsIklOU0VUIiwiUEk5MCIsIlBJMiIsIldBTExfTk9STVMiLCJfZ3JvdW5kIiwiZ2V0TWFzcyIsInNldFRyYW5zZm9ybSIsInJvdGF0ZSIsImZpbGxTdHlsZSIsImZpbGxSZWN0Iiwic3Ryb2tlUmVjdCIsImkiLCJwIiwiZ2V0UG9pbnQiLCJwb3MiLCJkb0NvbGxpc2lvbiIsIndpZHRoIiwid2hpY2giLCJ4eCIsInl5IiwidmVsb2NpdHlBIiwidmVsb2NpdHlUIiwidmVsb2NpdHkiLCJjb3MiLCJzaW4iLCJkZXRhaWxzIiwiYXNQb2xhciIsInZlY3RvciIsInBvbGFyIiwibWFnIiwiZGlyIiwidmVjdG9yQWRkIiwidmFsaWRhdGVQb2xhciIsInZlYyIsImlzUG9sYXIiLCJwVmVjIiwicmV0ViIsImlzQ2FydCIsImNhcnRUb1BvbGFyIiwidW5kZWZpbmVkIiwicG9sYXJUb0NhcnQiLCJhdGFuMiIsImh5cG90IiwidmVjMSIsInZlYzIiLCJ2MSIsImFzQ2FydCIsInYyIiwiZm9yY2UiLCJsb2MiLCJsIiwidG9DZW50ZXIiLCJwaGV0YSIsIkZ2IiwiRmEiLCJhY2NlbCIsImRlbHRhViIsImFjY2VsQSIsInYiLCJkMSIsImQyIiwiYWxvbmciLCJ0YW5nZW50IiwicG9pbnREZXRhaWxzIiwid2FsbEluZGV4IiwidnYiLCJ2YSIsInZ2YyIsInZlY3RvckNvbXBvbmVudHNGb3JEaXIiLCJ2YWMiLCJhcHBseUZvcmNlIiwiQ2FudmFzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiZ2V0Q29udGV4dCIsImJpbmRDYW52YXNUb0RPTSIsInF1ZXJ5U2VsZWN0b3IiLCJjbGVhckNhbnZhcyIsImJvZHkiLCJhcHBlbmQiLCJjbGFzc0xpc3QiLCJhZGQiLCJjbGVhclJlY3QiLCJBbmdlcmVkQmlyZHMiLCJhbmltYXRpbmciLCJpbml0aWFsaXplRW50aXRpZXMiLCJhbmltYXRpb24iLCJzdGFnZUxvYWRlciIsInVwZGF0ZSIsIndpbmRvdyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIlN0YWdlTG9hZGVyIiwiaW5pdGlhbGl6ZUV2ZW50TGlzdGVuZXJzIiwiUGlnIiwicGlnIiwiYWJzIiwiUHJvamVjdGlsZSIsImxhdW5jaGVkT2JqZWN0cyIsIm1heCIsInByb2plY3RpbGVJbWFnZSIsImFuZ2xlVmFsIiwibWFnbml0dWRlVmFsIiwiYW5nbGUiLCJjdXJyZW50UHJvamVjdGlsZU9iamVjdCIsIm9iamVjdExhdW5jaGVkIiwiT2JqZWN0TGF1bmNoIiwib2JqZWN0VHlwZSIsInB1c2giLCJsZW5ndGgiLCJzcGxpY2UiLCJjdXJyZW50T2JqZWN0IiwidXBkYXRlQ3VycmVudExhdW5jaGVkT2JqZWN0IiwiY3VycmVudEJpcmQiLCJyZW5kZXIiLCJzY29yZSIsInN0YWdlTnVtYmVyIiwic3RhcnRQb3NCaXJkIiwicHJvamVjdGlsZU9iamVjdCIsInBpZ3MiLCJibG9ja3MiLCJ1cGRhdGVFbnRpdGllcyIsImNoZWNrQW5kVXBkYXRlRW50aXRpZXNDb2xsaXNpb24iLCJyZW5kZXJFbnRpdGllcyIsIm1vdXNlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJjYW52YXNQcm9wZXJ0aWVzIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwibGVmdCIsInRvcCIsImRlbHRhWCIsImRlbHRhWSIsInRoZXRhUmFkaWFuIiwia2lja09mZkxhdW5jaERpcmVjdGlvbiIsImJpbmQiLCJjdXJyZW50U3RhZ2VWYWx1ZXMiLCJzdGFnZUtleXMiLCJsb2FkU3RhZ2UiLCJjdXJyZW50TGV2ZWxIaWdoU2NvcmVLZXkiLCJoaWdoU2NvcmVTYXZlS2V5U3RyaW5nIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImhpZ2hTY29yZSIsInBhcnNlSW50IiwidXBkYXRlSGlnaFNjb3JlIiwic2V0SXRlbSIsImNoZWNrQmlyZE9uUGlnQ29sbGlzaW9uIiwiYmlyZE9uUGlnQ29sbGlzaW9uTG9naWMiLCJjaGVja0JpcmRPbkJsb2NrQ29sbGlzaW9uIiwiYmlyZE9uQmxvY2tDb2xsaXNpb25Mb2dpYyIsInJlbmRlclNjb3JlIiwicmVuZGVySGlnaFNjb3JlIiwicmVuZGVyU3RhZ2VOdW1iZXIiLCJ0ZXh0QWxpZ24iLCJ0ZXh0QmFzZWxpbmUiLCJzdHJva2VTdHlsZSIsImZvbnQiLCJmaWxsVGV4dCIsInN0cm9rZVRleHQiLCJkaXN0YW5jZSIsInNxcnQiLCJibG9jayIsImoiLCJjaXJjbGVDZW50ZXIiLCJjaGVja0JpcmRJbnRlcmNlcHRCbG9jayIsInBvaW50QSIsInBvaW50QiIsImRpc3QiLCJ2ZWwxWCIsInZlbDFZIiwidmVsMlgiLCJ2ZWwyWSIsInVuaXQiLCJuZXdWZWxYMSIsIm5ld1ZlbFkxIiwibmV3VmVsWDIiLCJuZXdWZWxZMiIsImluaXQiLCJyZXNldExvY2FsU3RvcmFnZSIsInN0YXJ0IiwiY2xlYXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQU1BLEk7QUFDRixnQkFBWUMsR0FBWixFQUFpQkMsY0FBakIsRUFBaUM7QUFBQTs7QUFDN0IsU0FBS0QsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsU0FBS0UsQ0FBTCxHQUFTRCxjQUFjLENBQUNDLENBQXhCO0FBQ0EsU0FBS0MsQ0FBTCxHQUFTRixjQUFjLENBQUNFLENBQXhCO0FBQ0Es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QyxLQUFwQjtBQUNILEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEJpcmQge1xuICAgIGNvbnN0cnVjdG9yKGN0eCwgYmlyZFByb3BlcnRpZXMpIHtcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMueCA9IGJpcmRQcm9wZXJ0aWVzLng7XG4gICAgICAgIHRoaXMueSA9IGJpcmRQcm9wZXJ0aWVzLnk7XG4gICAgICAgIHRoaXMucmFkaXVzID0gYmlyZFByb3BlcnRpZXMucmFkO1xuICAgICAgICB0aGlzLm1hc3MgPSAyO1xuICAgICAgICB0aGlzLnZlbFggPSAwO1xuICAgICAgICB0aGlzLnZlbFkgPSAwO1xuICAgICAgICB0aGlzLnRyYW5zZmVyID0gMC45O1xuICAgICAgICB0aGlzLmdyYXZpdHkgPSB7IHg6IDAsIHk6IDAuMSB9O1xuICAgICAgICB0aGlzLmdyb3VuZCA9IHRoaXMuY3R4LmNhbnZhcy5oZWlnaHQgLSAyMDtcbiAgICAgICAgdGhpcy5ib3VuY2UgPSAwLjU7XG4gICAgICAgIHRoaXMuZnJpY3Rpb25YID0gMC45O1xuICAgICAgICB0aGlzLmJpcmQgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5iaXJkLnNyYyA9IFwic3JjL2ltYWdlcy9hbmdlcmVkLWJpcmR5LnBuZ1wiXG4gICAgICAgIHRoaXMuc3RhdGUgPSBcInN0YXJ0U3RhdGVcIjtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5yYWRpdXMsIDAsIChNYXRoLlBJICogMiksIGZhbHNlKTtcbiAgICAgICAgdGhpcy5jdHguY2xpcCgpO1xuICAgICAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMuYmlyZCwgdGhpcy54IC0gdGhpcy5yYWRpdXMsIHRoaXMueSAtIHRoaXMucmFkaXVzLCB0aGlzLnJhZGl1cyAqIDIsIHRoaXMucmFkaXVzICogMilcbiAgICAgICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmlyZDsiLCJjbGFzcyBCbG9jayB7XG4gICAgY29uc3RydWN0b3IoY3R4LCB4LCB5LCB3LCBoKSB7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGN0eC5jYW52YXM7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMudyA9IHc7XG4gICAgICAgIHRoaXMuaCA9IGg7XG4gICAgICAgIHRoaXMuciA9IDAuMTtcbiAgICAgICAgdGhpcy5keCA9IDA7XG4gICAgICAgIHRoaXMuZHkgPSAwO1xuICAgICAgICB0aGlzLmRyID0gMDtcbiAgICAgICAgdGhpcy5JTlNFVCA9IDEwO1xuICAgICAgICB0aGlzLlBJID0gTWF0aC5QSTtcbiAgICAgICAgdGhpcy5QSTkwID0gTWF0aC5QSSAvIDI7XG4gICAgICAgIHRoaXMuUEkyID0gTWF0aC5QSSAqIDI7XG4gICAgICAgIHRoaXMuV0FMTF9OT1JNUyA9IFsgTWF0aC5QSSAvIDIsIE1hdGguUEksIC0oTWF0aC5QSSAvIDIpLCAwXVxuICAgICAgICB0aGlzLl9ncm91bmQgPSB0aGlzLmNhbnZhcy5oZWlnaHQgLSAxMDU7XG4gICAgICAgIHRoaXMubWFzcyA9IHRoaXMuZ2V0TWFzcygpXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLmN0eC5zYXZlKClcbiAgICAgICAgdGhpcy5jdHguc2V0VHJhbnNmb3JtKDEsMCwwLDEsdGhpcy54LHRoaXMueSk7XG4gICAgICAgIHRoaXMuY3R4LnJvdGF0ZSh0aGlzLnIpO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIkJsdWVcIjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoLXRoaXMudy8yLCAtdGhpcy5oLzIsIHRoaXMudywgdGhpcy5oKVxuICAgICAgICB0aGlzLmN0eC5zdHJva2VSZWN0KC10aGlzLncvMiwgLXRoaXMuaC8yLCB0aGlzLncsIHRoaXMuaClcbiAgICAgICAgdGhpcy5jdHgucmVzdG9yZSgpXG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLnggKz0gdGhpcy5keDtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMuZHk7XG4gICAgICAgIHRoaXMuZHkgKz0gMC4wNjE7XG4gICAgICAgIHRoaXMuciArPSB0aGlzLmRyO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCA0OyBpKyspe1xuICAgICAgICAgICAgdmFyIHAgPSB0aGlzLmdldFBvaW50KGkpO1xuICAgICAgICAgICAgLy8gb25seSBkbyBvbmUgY29sbGlzaW9uIHBlciBmcmFtZSBvciB3ZSB3aWxsIGVuZCB1cCBhZGRpbmcgZW5lcmd5XG4gICAgICAgICAgICBpZihwLnBvcy54IDwgdGhpcy5JTlNFVCl7XG4gICAgICAgICAgICAgICAgdGhpcy54ICs9ICh0aGlzLklOU0VUKSAtIHAucG9zLng7XG4gICAgICAgICAgICAgICAgdGhpcy5kb0NvbGxpc2lvbihwLDMpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKCBwLnBvcy54ID4gdGhpcy5jYW52YXMud2lkdGgtdGhpcy5JTlNFVCl7XG4gICAgICAgICAgICAgICAgdGhpcy54ICs9ICh0aGlzLmNhbnZhcy53aWR0aCAtIHRoaXMuSU5TRVQpIC0gcC5wb3MueDtcbiAgICAgICAgICAgICAgICB0aGlzLmRvQ29sbGlzaW9uKHAsMSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYocC5wb3MueSA8IHRoaXMuSU5TRVQpe1xuICAgICAgICAgICAgICAgIHRoaXMueSArPSAodGhpcy5JTlNFVCkgLSBwLnBvcy55O1xuICAgICAgICAgICAgICAgIHRoaXMuZG9Db2xsaXNpb24ocCwwKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiggcC5wb3MueSA+IHRoaXMuY2FudmFzLmhlaWdodCAtIHRoaXMuSU5TRVQpe1xuICAgICAgICAgICAgICAgIHRoaXMueSArPSAodGhpcy5jYW52YXMuaGVpZ2h0IC0gdGhpcy5JTlNFVCkgLSBwLnBvcy55O1xuICAgICAgICAgICAgICAgIHRoaXMuZG9Db2xsaXNpb24ocCwyKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TWFzcygpIHtcbiAgICAgICAgcmV0dXJuICggdGhpcy53ICogdGhpcy5oICogdGhpcy5oKSAvIDEwMDA7XG4gICAgfVxuXG4gICAgZ2V0UG9pbnQod2hpY2gpIHtcbiAgICAgICAgdmFyIGR4LCBkeSwgeCwgeSwgeHgsIHl5LCB2ZWxvY2l0eUEsIHZlbG9jaXR5VCwgdmVsb2NpdHk7XG5cbiAgICAgICAgZHggPSBNYXRoLmNvcyh0aGlzLnIpO1xuICAgICAgICBkeSA9IE1hdGguc2luKHRoaXMucik7XG5cbiAgICAgICAgc3dpdGNoICh3aGljaCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHggPSAtdGhpcy53IC8gMjtcbiAgICAgICAgICAgICAgICB5ID0gLXRoaXMuaCAvIDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgeCA9IHRoaXMudyAvIDI7XG4gICAgICAgICAgICAgICAgeSA9IC10aGlzLmggLyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHggPSB0aGlzLncgLyAyO1xuICAgICAgICAgICAgICAgIHkgPSB0aGlzLmggLyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHggPSAtdGhpcy53IC8gMjtcbiAgICAgICAgICAgICAgICB5ID0gdGhpcy5oIC8gMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICB4ID0gdGhpcy54O1xuICAgICAgICAgICAgICAgIHkgPSB0aGlzLnk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgeHggLCB5eTtcbiAgICAgICAgeHggPSB4ICogZHggKyB5ICogLWR5O1xuICAgICAgICB5eSA9IHggKiBkeSArIHkgKiBkeDtcblxuICAgICAgICB2YXIgZGV0YWlscyA9IHRoaXMuYXNQb2xhcih0aGlzLnZlY3Rvcih4eCwgeXkpKTtcblxuICAgICAgICB4eCArPSB0aGlzLng7XG4gICAgICAgIHl5ICs9IHRoaXMueTtcblxuICAgICAgICB2ZWxvY2l0eUEgPSB0aGlzLnBvbGFyKGRldGFpbHMubWFnICogdGhpcy5kciwgZGV0YWlscy5kaXIgKyB0aGlzLlBJOTApO1xuICAgICAgICB2ZWxvY2l0eVQgPSB0aGlzLnZlY3RvckFkZCh2ZWxvY2l0eSA9IHRoaXMudmVjdG9yKHRoaXMuZHgsIHRoaXMuZHkpLCB2ZWxvY2l0eUEpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2ZWxvY2l0eTogdmVsb2NpdHksXG4gICAgICAgICAgICB2ZWxvY2l0eVQ6IHZlbG9jaXR5VCxcbiAgICAgICAgICAgIHZlbG9jaXR5QSA6IHZlbG9jaXR5QSxcbiAgICAgICAgICAgIHBvczogdGhpcy52ZWN0b3IoeHgsIHl5KSxcbiAgICAgICAgICAgIHJhZGl1czogZGV0YWlscy5tYWdcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBvbGFyKG1hZyA9IDEsIGRpciA9IDApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGVQb2xhcih7ZGlyOiBkaXIsIG1hZzogbWFnfSlcbiAgICB9XG5cbiAgICB2ZWN0b3IoeCA9IDEsIHkgPSAwKSB7XG4gICAgICAgIHJldHVybiB7IHg6IHgsIHk6IHl9O1xuICAgIH1cblxuICAgIHZhbGlkYXRlUG9sYXIodmVjKSB7XG4gICAgICAgIGlmICh0aGlzLmlzUG9sYXIodmVjKSkge1xuICAgICAgICAgICAgaWYodmVjLm1hZyA8IDApe1xuICAgICAgICAgICAgICAgIHZlYy5tYWcgPSAtdmVjLm1hZztcbiAgICAgICAgICAgICAgICB2ZWMuZGlyICs9IHRoaXMuUEk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZlYztcbiAgICB9XG5cbiAgICBwb2xhclRvQ2FydChwVmVjLCByZXRWID0ge3g6IDAsIHk6IDB9KXtcbiAgICAgICAgcmV0Vi54ID0gTWF0aC5jb3MocFZlYy5kaXIpICogcFZlYy5tYWc7XG4gICAgICAgIHJldFYueSA9IE1hdGguc2luKHBWZWMuZGlyKSAqIHBWZWMubWFnO1xuICAgICAgICByZXR1cm4gcmV0VlxuICAgIH1cblxuICAgIGFzUG9sYXIodmVjKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQ2FydCh2ZWMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYXJ0VG9Qb2xhcih2ZWMpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZlYy5tYWcgPCAwKSB7XG4gICAgICAgICAgICB2ZWMubWFnID0gLXZlYy5tYWc7XG4gICAgICAgICAgICB2ZWMuZGlyICs9IHRoaXMuUEk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZGlyOiB2ZWMuZGlyLCBtYWc6IHZlYy5tYWd9O1xuICAgIH1cblxuICAgIGlzQ2FydCh2ZWMpIHsgaWYodmVjLnggIT09IHVuZGVmaW5lZCAmJiB2ZWMueSAhPT0gdW5kZWZpbmVkKSB7IHJldHVybiB0cnVlOyB9IHJldHVybiBmYWxzZTsgfVxuICAgIGlzUG9sYXIodmVjKSB7IGlmKHZlYy5tYWcgIT09IHVuZGVmaW5lZCAmJiB2ZWMuZGlyICE9PSB1bmRlZmluZWQpIHsgcmV0dXJuIHRydWU7IH0gcmV0dXJuIGZhbHNlOyB9XG4gICAgYXNDYXJ0KHZlYykge1xuICAgICAgICBpZiAodGhpcy5pc1BvbGFyKHZlYykpIHtyZXR1cm4gdGhpcy5wb2xhclRvQ2FydCh2ZWMpfVxuICAgICAgICByZXR1cm4ge3g6IHZlYy54LCB5OiB2ZWMueX1cbiAgICB9XG4gICAgY2FydFRvUG9sYXIodmVjLCByZXRWID0ge2RpcjogMCwgbWFnOiAwfSkge1xuICAgICAgICByZXRWLmRpciA9IE1hdGguYXRhbjIodmVjLnksIHZlYy54KTtcbiAgICAgICAgcmV0Vi5tYWcgPSBNYXRoLmh5cG90KHZlYy54LCB2ZWMueSk7XG4gICAgICAgIHJldHVybiByZXRWO1xuICAgIH1cblxuICAgIHZlY3RvckFkZCh2ZWMxLCB2ZWMyKSB7XG4gICAgICAgIHZhciB2MSA9IHRoaXMuYXNDYXJ0KHZlYzEpO1xuICAgICAgICB2YXIgdjIgPSB0aGlzLmFzQ2FydCh2ZWMyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMudmVjdG9yKHYxLnggKyB2Mi54LCB2MS55ICsgdjIueSlcbiAgICB9XG5cbiAgICBhcHBseUZvcmNlKGZvcmNlLCBsb2MpIHtcbiAgICAgICAgdGhpcy52YWxpZGF0ZVBvbGFyKGZvcmNlKTtcbiAgICAgICAgdmFyIGwgPSB0aGlzLmFzQ2FydChsb2MpO1xuICAgICAgICB2YXIgdG9DZW50ZXIgPSB0aGlzLmFzUG9sYXIodGhpcy52ZWN0b3IodGhpcy54IC0gbC54LCB0aGlzLnkgLSBsLnkpKTtcbiAgICAgICAgdmFyIHBoZXRhID0gdG9DZW50ZXIuZGlyIC0gZm9yY2UuZGlyO1xuICAgICAgICB2YXIgRnYgPSBNYXRoLmNvcyhwaGV0YSkgKiBmb3JjZS5tYWc7XG4gICAgICAgIHZhciBGYSA9IE1hdGguc2luKHBoZXRhKSAqIGZvcmNlLm1hZztcbiAgICAgICAgdmFyIGFjY2VsID0gdGhpcy5hc1BvbGFyKHRvQ2VudGVyKTtcbiAgICAgICAgYWNjZWwubWFnID0gRnYgLyB0aGlzLm1hc3M7IFxuICAgICAgICB2YXIgZGVsdGFWID0gdGhpcy5hc0NhcnQoYWNjZWwpOyBcbiAgICAgICAgdGhpcy5keCArPSBkZWx0YVYueCBcbiAgICAgICAgdGhpcy5keSArPSBkZWx0YVYueVxuICAgICAgICB2YXIgYWNjZWxBID0gRmEgLyAodG9DZW50ZXIubWFnICAqIHRoaXMubWFzcyk7IFxuICAgICAgICB0aGlzLmRyICs9IGFjY2VsQTtcbiAgICB9XG5cbiAgICB2ZWN0b3JDb21wb25lbnRzRm9yRGlyKHZlYywgZGlyKSB7XG4gICAgICAgIHZhciB2ID0gdGhpcy5hc1BvbGFyKHZlYyk7IFxuICAgICAgICB2YXIgcGhldGEgPSB2LmRpciAtIGRpcjtcbiAgICAgICAgdmFyIEZ2ID0gTWF0aC5jb3MocGhldGEpICogdi5tYWc7XG4gICAgICAgIHZhciBGYSA9IE1hdGguc2luKHBoZXRhKSAqIHYubWFnO1xuXG4gICAgICAgIHZhciBkMSA9IGRpcjtcbiAgICAgICAgdmFyIGQyID0gZGlyICsgdGhpcy5QSTkwOyAgICBcbiAgICAgICAgaWYoRnYgPCAwKXtcbiAgICAgICAgICAgIGQxICs9IHRoaXMuUEk7XG4gICAgICAgICAgICBGdiA9IC1GdjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKEZhIDwgMCl7XG4gICAgICAgICAgICBkMiArPSB0aGlzLlBJO1xuICAgICAgICAgICAgRmEgPSAtRmE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFsb25nIDogdGhpcy5wb2xhcihGdixkMSksXG4gICAgICAgICAgICB0YW5nZW50IDogdGhpcy5wb2xhcihGYSxkMilcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBkb0NvbGxpc2lvbihwb2ludERldGFpbHMsIHdhbGxJbmRleCkge1xuICAgICAgICB2YXIgdnYgPSB0aGlzLmFzUG9sYXIocG9pbnREZXRhaWxzLnZlbG9jaXR5KTsgXG4gICAgICAgIHZhciB2YSA9IHRoaXMuYXNQb2xhcihwb2ludERldGFpbHMudmVsb2NpdHlBKTsgXG4gICAgICAgIHZhciB2dmMgPSB0aGlzLnZlY3RvckNvbXBvbmVudHNGb3JEaXIodnYsIHRoaXMuV0FMTF9OT1JNU1t3YWxsSW5kZXhdKTtcbiAgICAgICAgdmFyIHZhYyA9IHRoaXMudmVjdG9yQ29tcG9uZW50c0ZvckRpcih2YSwgdGhpcy5XQUxMX05PUk1TW3dhbGxJbmRleF0pO1xuXG4gICAgICAgIHZ2Yy5hbG9uZy5tYWcgKj0gMS4xODsgXG4gICAgICAgIHZhYy5hbG9uZy5tYWcgKj0gMS4xODsgXG5cbiAgICAgICAgdnZjLmFsb25nLm1hZyAqPSB0aGlzLm1hc3M7XG4gICAgICAgIHZhYy5hbG9uZy5tYWcgKj0gdGhpcy5tYXNzO1xuXG4gICAgICAgIHZ2Yy5hbG9uZy5kaXIgKz0gdGhpcy5QSTtcbiAgICAgICAgdmFjLmFsb25nLmRpciArPSB0aGlzLlBJO1xuXG4gICAgICAgIHZ2Yy50YW5nZW50Lm1hZyAqPSAwLjE4OyAgXG4gICAgICAgIHZhYy50YW5nZW50Lm1hZyAqPSAwLjE4O1xuICAgICAgICB2dmMudGFuZ2VudC5tYWcgKj0gdGhpcy5tYXNzICBcbiAgICAgICAgdmFjLnRhbmdlbnQubWFnICo9IHRoaXMubWFzc1xuICAgICAgICB2dmMudGFuZ2VudC5kaXIgKz0gdGhpcy5QSTsgXG4gICAgICAgIHZhYy50YW5nZW50LmRpciArPSB0aGlzLlBJO1xuXG4gICAgICAgIHRoaXMuYXBwbHlGb3JjZSh2dmMuYWxvbmcsIHBvaW50RGV0YWlscy5wb3MpICAgIFxuICAgICAgICB0aGlzLmFwcGx5Rm9yY2UodnZjLnRhbmdlbnQsIHBvaW50RGV0YWlscy5wb3MpICAgIFxuICAgICAgICB0aGlzLmFwcGx5Rm9yY2UodmFjLmFsb25nLCBwb2ludERldGFpbHMucG9zKSAgICBcbiAgICAgICAgdGhpcy5hcHBseUZvcmNlKHZhYy50YW5nZW50LCBwb2ludERldGFpbHMucG9zKSAgICBcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJsb2NrIiwiY2xhc3MgQ2FudmFzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IDE0MDA7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IDc1MDtcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIHRoaXMuYmluZENhbnZhc1RvRE9NKClcbiAgICB9XG5cbiAgICBiaW5kQ2FudmFzVG9ET00oKSB7XG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tY2FudmFzXCIpICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmQodGhpcy5jYW52YXMpO1xuICAgICAgICB0aGlzLmNhbnZhcy5jbGFzc0xpc3QuYWRkKFwibWFpbi1jYW52YXNcIilcbiAgICB9XG5cbiAgICBjbGVhckNhbnZhcygpIHtcbiAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FudmFzO1xuIiwiLy8gaW1wb3J0IFwiLi9zdHlsZXMvaW5kZXguc2Nzc1wiO1xuaW1wb3J0IENhbnZhcyBmcm9tIFwiLi9jYW52YXNcIjtcbmltcG9ydCBTdGFnZUxvYWRlciBmcm9tIFwiLi9zdGFnZUxvYWRlclwiO1xuXG5jbGFzcyBBbmdlcmVkQmlyZHMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmFuaW1hdGluZyA9IHRydWU7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gbmV3IENhbnZhcygpXG4gICAgICAgIHRoaXMuY2FudmFzLmJpbmRDYW52YXNUb0RPTSgpO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVFbnRpdGllcygpO1xuICAgICAgICBjb25zdCBhbmltYXRpb24gPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5jbGVhckNhbnZhcygpO1xuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFnZUxvYWRlci51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRpb24pO1xuICAgIH1cblxuICAgIGluaXRpYWxpemVFbnRpdGllcygpIHtcbiAgICAgICAgdGhpcy5zdGFnZUxvYWRlciA9IG5ldyBTdGFnZUxvYWRlcih0aGlzLmNhbnZhcy5jdHgpO1xuICAgICAgICB0aGlzLnN0YWdlTG9hZGVyLmluaXRpYWxpemVFbnRpdGllcygpO1xuICAgICAgICB0aGlzLnN0YWdlTG9hZGVyLmluaXRpYWxpemVFdmVudExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIGdhbWVPdmVyKCkge1xuICAgICAgICAvLyByZXN0YXJ0IEdhbWUsIGFmdGVyIGNlcnRhaW4gYmlyZHkgc2hvdHNcbiAgICAgICAgLy8gZHJvcCBldmVudExpc3RlbmVycyBhbmQgcmVhdHRhY2ggRE9NIGNhbnZhcyBub2RlXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBbmdlcmVkQmlyZHM7IiwiY2xhc3MgUGlnIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgsIHgsIHksIHJhZGl1cywgdmVsWCA9IDAsIHZlbFkgPSAwKSB7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLnggPSB4OyBcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy52ZWxYID0gdmVsWDtcbiAgICAgICAgdGhpcy52ZWxZID0gdmVsWTtcbiAgICAgICAgdGhpcy5yYWRpdXMgPSByYWRpdXM7XG4gICAgICAgIHRoaXMubWFzcyA9IDI7XG5cbiAgICAgICAgdGhpcy5ncmF2aXR5ID0geyB4OiAwLCB5OiAwLjEgfTtcbiAgICAgICAgdGhpcy5ncm91bmQgPSB0aGlzLmN0eC5jYW52YXMuaGVpZ2h0IC0gMjA7XG4gICAgICAgIHRoaXMuYm91bmNlID0gMC40O1xuICAgICAgICB0aGlzLmZyaWN0aW9uWCA9IDAuOTtcbiAgICAgICAgdGhpcy5tYXNzID0gMjtcbiAgICAgICAgdGhpcy5waWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5waWcuc3JjID0gXCJzcmMvaW1hZ2VzL3BlcHBhLnBuZ1wiO1xuICAgICAgICB0aGlzLnN0YXRlID0gXCJhbGl2ZVwiO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdGhpcy5jdHguc2F2ZSgpO1xuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5jdHguYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLnJhZGl1cywgMCwgKE1hdGguUEkgKiAyKSwgZmFsc2UpO1xuICAgICAgICB0aGlzLmN0eC5jbGlwKCk7XG4gICAgICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UodGhpcy5waWcsIHRoaXMueCAtIHRoaXMucmFkaXVzLCB0aGlzLnkgLSB0aGlzLnJhZGl1cywgdGhpcy5yYWRpdXMgKiAyLCB0aGlzLnJhZGl1cyAqIDIpO1xuICAgICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLnZlbFggKz0gdGhpcy5ncmF2aXR5Lng7XG4gICAgICAgIHRoaXMudmVsWSArPSB0aGlzLmdyYXZpdHkueTtcbiAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsWDtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMudmVsWTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnkgPj0gdGhpcy5ncm91bmQpIHtcbiAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuZ3JvdW5kIC0gKHRoaXMueSAtIHRoaXMuZ3JvdW5kKTtcbiAgICAgICAgICAgIHRoaXMudmVsWSA9IC1NYXRoLmFicyh0aGlzLnZlbFkpICogdGhpcy5ib3VuY2U7XG4gICAgICAgICAgICBpZiAodGhpcy52ZWxZID49IHRoaXMuZ3Jhdml0eS55KSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWxZID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmdyb3VuZCAtIHRoaXMuZ3Jhdml0eS55O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudmVsWCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlbFggLT0gdGhpcy5mcmljdGlvblg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy52ZWxYIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVsWCArPSB0aGlzLmZyaWN0aW9uWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBzdG9wcyBiYWxsIGZyb20gYm91bmNpbmcgaW4gWSBheGlzXG4gICAgICAgIGlmICh0aGlzLnZlbFk8MCAmJiB0aGlzLnZlbFk+LTIuMSkge1xuICAgICAgICAgICAgdGhpcy52ZWxZID0gMDtcbiAgICAgICAgfVxuICAgICAgICAvLyBzdG9wcyBiYWxsIGZyb20gbW92aW5nIG9uIFggYXhpcyBpZiB4LXZlbG9jaXR5IDwgMS4xXG4gICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnZlbFgpIDwgMS4xKSB7XG4gICAgICAgICAgICB0aGlzLnZlbFggPSAwO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFBpZzsiLCJpbXBvcnQgQmlyZCBmcm9tIFwiLi9iaXJkXCI7XG5jbGFzcyBQcm9qZWN0aWxlIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgsIGJpcmRQcm9wZXJ0aWVzKSB7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLmxhdW5jaGVkT2JqZWN0cyA9IFtdO1xuICAgICAgICB0aGlzLm1heCA9IDE7XG4gICAgICAgIHRoaXMuYmlyZFByb3BlcnRpZXMgPSBiaXJkUHJvcGVydGllcztcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlSW1hZ2Uuc3JjID0gXCJzcmMvaW1hZ2VzL3NsaW5nUy5wbmdcIjtcbiAgICB9XG5cbiAgICBraWNrT2ZmTGF1bmNoRGlyZWN0aW9uKGFuZ2xlVmFsLCBtYWduaXR1ZGVWYWwpIHtcbiAgICAgICAgbGV0IGFuZ2xlID0gTWF0aC5QSSogYW5nbGVWYWwgLzE4MDtcbiAgICAgICAgdGhpcy5jdXJyZW50UHJvamVjdGlsZU9iamVjdCA9IG5ldyBCaXJkKHRoaXMuY3R4LCB0aGlzLmJpcmRQcm9wZXJ0aWVzKTtcbiAgICAgICAgdGhpcy5vYmplY3RMYXVuY2hlZCA9IG5ldyBPYmplY3RMYXVuY2godGhpcy5jdHgsIHRoaXMuY3VycmVudFByb2plY3RpbGVPYmplY3QpO1xuICAgICAgICB0aGlzLm9iamVjdExhdW5jaGVkLm9iamVjdFR5cGUudmVsWSA9LSBtYWduaXR1ZGVWYWwgKiBNYXRoLnNpbihhbmdsZSk7XG4gICAgICAgIHRoaXMub2JqZWN0TGF1bmNoZWQub2JqZWN0VHlwZS52ZWxYID0gbWFnbml0dWRlVmFsICogTWF0aC5jb3MoYW5nbGUpO1xuICAgICAgICB0aGlzLm9iamVjdExhdW5jaGVkLm9iamVjdFR5cGUudHJhbnNmZXIgPSAwLjg7XG4gICAgICAgIHRoaXMubGF1bmNoZWRPYmplY3RzLnB1c2godGhpcy5vYmplY3RMYXVuY2hlZCk7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy5sYXVuY2hlZE9iamVjdHMubGVuZ3RoID4gdGhpcy5tYXgpIHtcbiAgICAgICAgICAgIHRoaXMubGF1bmNoZWRPYmplY3RzID0gdGhpcy5sYXVuY2hlZE9iamVjdHMuc3BsaWNlKDEpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sYXVuY2hlZE9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50T2JqZWN0ID0gdGhpcy5sYXVuY2hlZE9iamVjdHNbaV0ub2JqZWN0VHlwZTtcbiAgICAgICAgICAgIGN1cnJlbnRPYmplY3QudmVsWSArPSAxLjUzO1xuICAgICAgICAgICAgY3VycmVudE9iamVjdC54ICs9IGN1cnJlbnRPYmplY3QudmVsWCAvIDM7XG4gICAgICAgICAgICBjdXJyZW50T2JqZWN0LnkgKz0gY3VycmVudE9iamVjdC52ZWxZIC8gMztcbiAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmxhdW5jaGVkT2JqZWN0c1tpXS51cGRhdGVDdXJyZW50TGF1bmNoZWRPYmplY3QoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UodGhpcy5wcm9qZWN0aWxlSW1hZ2UsIHRoaXMuYmlyZFByb3BlcnRpZXMueCAtIDMwLCB0aGlzLmJpcmRQcm9wZXJ0aWVzLnkgLSA3MCwgNzUsIDE0MCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sYXVuY2hlZE9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50QmlyZCA9IHRoaXMubGF1bmNoZWRPYmplY3RzW2ldLm9iamVjdFR5cGU7XG4gICAgICAgICAgICBjdXJyZW50QmlyZC5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuY2xhc3MgT2JqZWN0TGF1bmNoIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgsIG9iamVjdFR5cGUpIHtcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XG4gICAgICAgIHRoaXMub2JqZWN0VHlwZSA9IG9iamVjdFR5cGU7XG4gICAgfVxuXG4gICAgcmVuZGVyT2JqZWN0TGF1bmNoKCkge1xuICAgICAgICB0aGlzLm9iamVjdFR5cGUucmVuZGVyKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlQ3VycmVudExhdW5jaGVkT2JqZWN0KCkge1xuICAgICAgICBsZXQgY3VycmVudE9iamVjdCA9IHRoaXMub2JqZWN0VHlwZTtcbiAgICAgICAgY3VycmVudE9iamVjdC52ZWxYICs9IGN1cnJlbnRPYmplY3QuZ3Jhdml0eS54O1xuICAgICAgICBjdXJyZW50T2JqZWN0LnZlbFkgKz0gY3VycmVudE9iamVjdC5ncmF2aXR5Lnk7XG4gICAgICAgIGN1cnJlbnRPYmplY3QueCArPSBjdXJyZW50T2JqZWN0LnZlbFg7XG4gICAgICAgIGN1cnJlbnRPYmplY3QueSArPSBjdXJyZW50T2JqZWN0LnZlbFk7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRPYmplY3QueSA+PSBjdXJyZW50T2JqZWN0Lmdyb3VuZCkge1xuICAgICAgICAgICAgY3VycmVudE9iamVjdC55ID0gY3VycmVudE9iamVjdC5ncm91bmQgLSAoY3VycmVudE9iamVjdC55IC0gY3VycmVudE9iamVjdC5ncm91bmQpO1xuICAgICAgICAgICAgY3VycmVudE9iamVjdC52ZWxZID0gLU1hdGguYWJzKGN1cnJlbnRPYmplY3QudmVsWSkgKiBjdXJyZW50T2JqZWN0LmJvdW5jZTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50T2JqZWN0LnZlbFkgPj0gY3VycmVudE9iamVjdC5ncmF2aXR5LnkpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50T2JqZWN0LnZlbFkgPSAwO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRPYmplY3QueSA9IGN1cnJlbnRPYmplY3QuZ3JvdW5kIC0gY3VycmVudE9iamVjdC5ncmF2aXR5Lnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY3VycmVudE9iamVjdC52ZWxYID4gMCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRPYmplY3QudmVsWCAtPSBjdXJyZW50T2JqZWN0LmZyaWN0aW9uWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjdXJyZW50T2JqZWN0LnZlbFggPCAwKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudE9iamVjdC52ZWxYICs9IGN1cnJlbnRPYmplY3QuZnJpY3Rpb25YO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHN0b3BzIGJhbGwgZnJvbSBib3VuY2luZyBpbiBZIGF4aXNcbiAgICAgICAgaWYgKCBjdXJyZW50T2JqZWN0LnkgPj0gY3VycmVudE9iamVjdC5ncm91bmQgLSAxMCkge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRPYmplY3QudmVsWSA8PSAwICYmIGN1cnJlbnRPYmplY3QudmVsWSA+IC0yLjUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50T2JqZWN0LnZlbFkgPSAwO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRPYmplY3Quc3RhdGUgPSBcImVuZFN0YXRlXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3RvcHMgYmFsbCBmcm9tIG1vdmluZyBvbiBYIGF4aXMgXG4gICAgICAgIGlmIChNYXRoLmFicyhjdXJyZW50T2JqZWN0LnZlbFgpIDwgMS4xKSB7XG4gICAgICAgICAgICBjdXJyZW50T2JqZWN0LnZlbFggPSAwO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RpbGU7IiwiaW1wb3J0IFBpZyBmcm9tIFwiLi9waWdcIjtcbmltcG9ydCBCbG9jayBmcm9tIFwiLi9ibG9ja1wiO1xuaW1wb3J0IFByb2plY3RpbGUgZnJvbSBcIi4vcHJvamVjdGlsZVwiO1xuaW1wb3J0IHtzdGFnZUtleXN9IGZyb20gXCIuL3N0YWdlcy9zdGFnZUtleXNcIjtcbmltcG9ydCB7Y2hlY2tCaXJkT25QaWdDb2xsaXNpb24sIGNoZWNrQmlyZE9uQmxvY2tDb2xsaXNpb259IGZyb20gXCIuL3V0aWwvY29sbGlzaW9uRGV0ZWN0aW9uVXRpbFwiO1xuaW1wb3J0IHtiaXJkT25QaWdDb2xsaXNpb25Mb2dpYywgYmlyZE9uQmxvY2tDb2xsaXNpb25Mb2dpY30gZnJvbSBcIi4vdXRpbC9jb2xsaXNpb25Mb2dpY1V0aWxcIjtcblxuY2xhc3MgU3RhZ2VMb2FkZXIge1xuICAgIGNvbnN0cnVjdG9yKGN0eCkge1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjdHguY2FudmFzO1xuICAgICAgICB0aGlzLnNjb3JlID0gMDtcbiAgICAgICAgdGhpcy5zdGFnZU51bWJlciA9IDE7XG4gICAgICAgIHRoaXMuc3RhcnRQb3NCaXJkID0gW107XG4gICAgICAgIHRoaXMucHJvamVjdGlsZU9iamVjdCA9IHt9O1xuICAgICAgICB0aGlzLnBpZ3MgPSBbXTtcbiAgICAgICAgdGhpcy5ibG9ja3MgPSBbXTtcbiAgICB9XG4gICAgXG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUVudGl0aWVzKCk7XG4gICAgICAgIGlmICh0aGlzLnByb2plY3RpbGVPYmplY3Qub2JqZWN0TGF1bmNoZWQpIHRoaXMuY2hlY2tBbmRVcGRhdGVFbnRpdGllc0NvbGxpc2lvbigpO1xuICAgICAgICB0aGlzLnJlbmRlckVudGl0aWVzKCk7XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZUV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICBjb25zdCBtb3VzZSA9IHtcbiAgICAgICAgICAgIHg6IHRoaXMuY2FudmFzLndpZHRoLzIsXG4gICAgICAgICAgICB5OiB0aGlzLmNhbnZhcy5oZWlnaHQvMixcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGxldCBjYW52YXNQcm9wZXJ0aWVzID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBtb3VzZS54ID0gZS54IC0gY2FudmFzUHJvcGVydGllcy5sZWZ0O1xuICAgICAgICAgICAgbW91c2UueSA9IGUueSAtIGNhbnZhc1Byb3BlcnRpZXMudG9wO1xuICAgICAgICAgICAgbGV0IGRlbHRhWCA9IG1vdXNlLnggLSB0aGlzLnN0YXJ0UG9zQmlyZFswXTtcbiAgICAgICAgICAgIGxldCBkZWx0YVkgPSBtb3VzZS55IC0gdGhpcy5zdGFydFBvc0JpcmRbMV07XG4gICAgICAgICAgICBsZXQgdGhldGFSYWRpYW4gPSBNYXRoLmF0YW4yKGRlbHRhWSwgZGVsdGFYKTtcbiAgICAgICAgICAgIGxldCBhbmdsZVZhbCA9IC0oKE1hdGguYWJzKHRoZXRhUmFkaWFuICogMTgwIC8gTWF0aC5QSSkgLSAyNzApICUgOTApO1xuICAgICAgICAgICAgbGV0IG1hZ25pdHVkZVZhbCA9IChNYXRoLmFicyhtb3VzZS54IC0gMTMwKSAvIDIpO1xuXG4gICAgICAgICAgICB0aGlzLnByb2plY3RpbGVPYmplY3Qua2lja09mZkxhdW5jaERpcmVjdGlvbihhbmdsZVZhbCAsIG1hZ25pdHVkZVZhbClcbiAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgIH1cblxuICAgIGluaXRpYWxpemVFbnRpdGllcygpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFN0YWdlVmFsdWVzID0gc3RhZ2VLZXlzW3RoaXMuc3RhZ2VOdW1iZXJdO1xuICAgICAgICB0aGlzLmxvYWRTdGFnZShjdXJyZW50U3RhZ2VWYWx1ZXMpO1xuICAgIH1cblxuICAgIGxvYWRTdGFnZShjdXJyZW50U3RhZ2VWYWx1ZXMpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlT2JqZWN0ID0gbmV3IFByb2plY3RpbGUodGhpcy5jdHgsIGN1cnJlbnRTdGFnZVZhbHVlc1tcImJpcmRQcm9wZXJ0aWVzXCJdKTtcbiAgICAgICAgdGhpcy5zdGFydFBvc0JpcmQgPSBbY3VycmVudFN0YWdlVmFsdWVzW1wiYmlyZFByb3BlcnRpZXNcIl0ueCwgY3VycmVudFN0YWdlVmFsdWVzW1wiYmlyZFByb3BlcnRpZXNcIl0ueV1cbiAgICAgICAgdGhpcy5jdXJyZW50TGV2ZWxIaWdoU2NvcmVLZXkgPSBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJjdXJyZW50TGV2ZWxIaWdoU2NvcmVLZXlcIl07XG5cbiAgICAgICAgbGV0IGhpZ2hTY29yZVNhdmVLZXlTdHJpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmN1cnJlbnRMZXZlbEhpZ2hTY29yZUtleSk7XG4gICAgICAgIGlmIChoaWdoU2NvcmVTYXZlS2V5U3RyaW5nID09PSBudWxsKXtcbiAgICAgICAgICAgIHRoaXMuaGlnaFNjb3JlID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGlnaFNjb3JlID0gcGFyc2VJbnQoaGlnaFNjb3JlU2F2ZUtleVN0cmluZyk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnRTdGFnZVZhbHVlc1tcIm51bWJlck9mUGlnc1wiXTsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnBpZ3MucHVzaChuZXcgUGlnKFxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LCBcbiAgICAgICAgICAgICAgICBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJwaWdQcm9wZXJ0aWVzXCJdW2ldLngsIFxuICAgICAgICAgICAgICAgIGN1cnJlbnRTdGFnZVZhbHVlc1tcInBpZ1Byb3BlcnRpZXNcIl1baV0ueSwgXG4gICAgICAgICAgICAgICAgY3VycmVudFN0YWdlVmFsdWVzW1wicGlnUHJvcGVydGllc1wiXVtpXS5yYWQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3VycmVudFN0YWdlVmFsdWVzW1wibnVtYmVyT2ZCbG9ja3NcIl07IGkrKykge1xuICAgICAgICAgICAgdGhpcy5ibG9ja3MucHVzaChuZXcgQmxvY2soXG4gICAgICAgICAgICAgICAgdGhpcy5jdHgsIFxuICAgICAgICAgICAgICAgIGN1cnJlbnRTdGFnZVZhbHVlc1tcImJsb2NrUHJvcGVyaXRlc1wiXVtpXS54LCBcbiAgICAgICAgICAgICAgICBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJibG9ja1Byb3Blcml0ZXNcIl1baV0ueSxcbiAgICAgICAgICAgICAgICBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJibG9ja1Byb3Blcml0ZXNcIl1baV0udyxcbiAgICAgICAgICAgICAgICBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJibG9ja1Byb3Blcml0ZXNcIl1baV0uaCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlRW50aXRpZXMoKSB7XG4gICAgICAgIHRoaXMucHJvamVjdGlsZU9iamVjdC51cGRhdGUoKVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGlncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5waWdzW2ldLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5waWdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmJsb2Nrc1tpXS51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZUhpZ2hTY29yZSgpXG4gICAgfVxuXG4gICAgdXBkYXRlSGlnaFNjb3JlKCkge1xuICAgICAgICBpZiAodGhpcy5zY29yZSA+IHRoaXMuaGlnaFNjb3JlKSB7XG4gICAgICAgICAgICB0aGlzLmhpZ2hTY29yZSA9IHRoaXMuc2NvcmU7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmN1cnJlbnRMZXZlbEhpZ2hTY29yZUtleSwgdGhpcy5oaWdoU2NvcmUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tBbmRVcGRhdGVFbnRpdGllc0NvbGxpc2lvbigpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBpZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjaGVja0JpcmRPblBpZ0NvbGxpc2lvbih0aGlzLnByb2plY3RpbGVPYmplY3QuY3VycmVudFByb2plY3RpbGVPYmplY3QsIHRoaXMucGlnc1tpXSkpIHtcbiAgICAgICAgICAgICAgICBiaXJkT25QaWdDb2xsaXNpb25Mb2dpYyh0aGlzLnByb2plY3RpbGVPYmplY3QuY3VycmVudFByb2plY3RpbGVPYmplY3QsIHRoaXMucGlnc1tpXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zY29yZSArPSAzMDAwO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYmxvY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoY2hlY2tCaXJkT25CbG9ja0NvbGxpc2lvbih0aGlzLnByb2plY3RpbGVPYmplY3QuY3VycmVudFByb2plY3RpbGVPYmplY3QsIHRoaXMuYmxvY2tzW2ldKSkge1xuICAgICAgICAgICAgICAgIGJpcmRPbkJsb2NrQ29sbGlzaW9uTG9naWModGhpcy5wcm9qZWN0aWxlT2JqZWN0LmN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LCB0aGlzLmJsb2Nrc1tpXSlcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3JlICs9IDMyNTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckVudGl0aWVzKCkge1xuICAgICAgICB0aGlzLnByb2plY3RpbGVPYmplY3QucmVuZGVyKClcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBpZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucGlnc1tpXS5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGlncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5ibG9ja3NbaV0ucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW5kZXJTY29yZSgpO1xuICAgICAgICB0aGlzLnJlbmRlckhpZ2hTY29yZSgpO1xuICAgICAgICB0aGlzLnJlbmRlclN0YWdlTnVtYmVyKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyU2NvcmUoKSB7IFxuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcInJpZ2h0XCI7XG4gICAgICAgIHRoaXMuY3R4LnRleHRCYXNlbGluZSA9IFwidG9wXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiV0hJVEVcIjtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIkJMQUNLXCI7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSA1MCArIFwicHggQmFuZ2Vyc1wiO1xuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCh0aGlzLnNjb3JlLCB0aGlzLmNhbnZhcy53aWR0aCAtIDMwIC8gMiwgMClcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dCh0aGlzLnNjb3JlLCB0aGlzLmNhbnZhcy53aWR0aCAtIDMwIC8gMiwgMCk7XG5cbiAgICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gXCJyaWdodFwiO1xuICAgICAgICB0aGlzLmN0eC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIldISVRFXCI7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCJCTEFDS1wiO1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gNTAgKyBcInB4IEJhbmdlcnNcIjtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dChcIlNjb3JlOiAgICAgICAgICAgICAgICAgICAgICBcIiwgdGhpcy5jYW52YXMud2lkdGggLSAzMCAvIDIsIDApO1xuICAgIH1cblxuICAgIHJlbmRlckhpZ2hTY29yZSgpIHtcbiAgICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gXCJyaWdodFwiO1xuICAgICAgICB0aGlzLmN0eC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIldISVRFXCI7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCJCTEFDS1wiO1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gNTAgKyBcInB4IEJhbmdlcnNcIjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQodGhpcy5oaWdoU2NvcmUsIHRoaXMuY2FudmFzLndpZHRoIC0gMzAgLyAyLCA2MCk7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVRleHQodGhpcy5oaWdoU2NvcmUsIHRoaXMuY2FudmFzLndpZHRoIC0gMzAgLyAyLCA2MCk7XG5cbiAgICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gXCJyaWdodFwiO1xuICAgICAgICB0aGlzLmN0eC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIldISVRFXCI7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCJCTEFDS1wiO1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gNTAgKyBcInB4IEJhbmdlcnNcIjtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dChcIkhpZ2hzY29yZTogICAgICAgICAgICAgICAgICAgICAgXCIsIHRoaXMuY2FudmFzLndpZHRoIC0gMzAgLyAyLCA2MCk7XG4gICAgfVxuXG4gICAgcmVuZGVyU3RhZ2VOdW1iZXIoKSB7XG4gICAgICAgIHRoaXMuY3R4LnRleHRBbGlnbiA9IFwibGVmdFwiO1xuICAgICAgICB0aGlzLmN0eC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIldISVRFXCI7XG4gICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCJCTEFDS1wiO1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gMzAgKyBcInB4IEJhbmdlcnNcIjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJMZXZlbCBcIiArIHRoaXMuc3RhZ2VOdW1iZXIsIDEwLCAxMClcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dChcIkxldmVsIFwiICsgdGhpcy5zdGFnZU51bWJlciwgIDEwLCAxMCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdGFnZUxvYWRlcjsiLCJleHBvcnQgY29uc3Qgc3RhZ2VLZXlzID0ge1xuICAgIDEgOiB7XG4gICAgICAgIFwiY3VycmVudExldmVsSGlnaFNjb3JlS2V5XCI6IFwiaGlnaFNjb3JlS2V5TGV2ZWwxXCIsXG4gICAgICAgIFwibnVtYmVyT2ZQaWdzXCI6IDIsXG4gICAgICAgIFwicGlnUHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICAwIDoge1xuICAgICAgICAgICAgICAgIHg6IDUwMCxcbiAgICAgICAgICAgICAgICB5OiA2MDAsXG4gICAgICAgICAgICAgICAgcmFkOiAxNSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAxIDoge1xuICAgICAgICAgICAgICAgIHg6IDYwMCxcbiAgICAgICAgICAgICAgICB5OiA2MDAsXG4gICAgICAgICAgICAgICAgcmFkOiAxNSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJudW1iZXJPZkJsb2Nrc1wiOiAyLFxuICAgICAgICBcImJsb2NrUHJvcGVyaXRlc1wiOiB7XG4gICAgICAgICAgICAwIDoge1xuICAgICAgICAgICAgICAgIHg6IDM1MCxcbiAgICAgICAgICAgICAgICB5OiA3MDAsXG4gICAgICAgICAgICAgICAgdzogMzAsXG4gICAgICAgICAgICAgICAgaDogMTAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIDE6IHtcbiAgICAgICAgICAgICAgICB4OiA3MDAsXG4gICAgICAgICAgICAgICAgeTogNzAwLFxuICAgICAgICAgICAgICAgIHc6IDUwLFxuICAgICAgICAgICAgICAgIGg6IDE0MCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJiaXJkUHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICB4OiAxMjAsXG4gICAgICAgICAgICB5OiA2MzAsXG4gICAgICAgICAgICByYWQ6IDE0LFxuICAgICAgICB9XG4gICAgfVxufSIsImV4cG9ydCBjb25zdCBjaGVja0JpcmRPblBpZ0NvbGxpc2lvbiA9IChjdXJyZW50UHJvamVjdGlsZU9iamVjdCwgcGlnKSA9PiB7XG4gICAgaWYgKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnggKyBjdXJyZW50UHJvamVjdGlsZU9iamVjdC5yYWRpdXMgKyBwaWcucmFkaXVzID4gcGlnLnhcbiAgICAgICAgJiYgY3VycmVudFByb2plY3RpbGVPYmplY3QueCA8IHBpZy54ICsgY3VycmVudFByb2plY3RpbGVPYmplY3QucmFkaXVzICsgcGlnLnJhZGl1c1xuICAgICAgICAmJiBjdXJyZW50UHJvamVjdGlsZU9iamVjdC55ICsgY3VycmVudFByb2plY3RpbGVPYmplY3QucmFkaXVzICsgcGlnLnJhZGl1cyA+IHBpZy55XG4gICAgICAgICYmIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnkgPCBwaWcueSArIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnJhZGl1cyArIHBpZy5yYWRpdXMpIFxuICAgIHtcbiAgICAgICAgLy8gcHl0aGFnb3JlYW0gdGhlb3JlbSB0byBiZSBtb3JlIGV4YWN0IG9uIGNvbGxpc2lvblxuICAgICAgICBsZXQgZGlzdGFuY2UgPSBNYXRoLnNxcnQoXG4gICAgICAgICAgICAgICAgKChjdXJyZW50UHJvamVjdGlsZU9iamVjdC54IC0gcGlnLngpICogKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnggLSBwaWcueCkpXG4gICAgICAgICAgICArICgoY3VycmVudFByb2plY3RpbGVPYmplY3QueSAtIHBpZy55KSAqIChjdXJyZW50UHJvamVjdGlsZU9iamVjdC55IC0gcGlnLnkpKVxuICAgICAgICApXG4gICAgICAgIHJldHVybiBkaXN0YW5jZSA8IGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnJhZGl1cyArIHBpZy5yYWRpdXM7IFxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGNoZWNrQmlyZE9uQmxvY2tDb2xsaXNpb24gPSAoY3VycmVudFByb2plY3RpbGVPYmplY3QsIGJsb2NrKSA9PiB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCA0OyBqKyspe1xuICAgICAgICBjb25zdCBjaXJjbGVDZW50ZXIgPSBbY3VycmVudFByb2plY3RpbGVPYmplY3QueCwgY3VycmVudFByb2plY3RpbGVPYmplY3QueV07XG4gICAgICAgIGlmIChqICsgMSA9PT0gNCkge1xuICAgICAgICAgICAgaWYgKGNoZWNrQmlyZEludGVyY2VwdEJsb2NrKGJsb2NrLmdldFBvaW50KGopLCBibG9jay5nZXRQb2ludCgwKSwgY2lyY2xlQ2VudGVyLCBjdXJyZW50UHJvamVjdGlsZU9iamVjdC5yYWRpdXMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoY2hlY2tCaXJkSW50ZXJjZXB0QmxvY2soYmxvY2suZ2V0UG9pbnQoaiksIGJsb2NrLmdldFBvaW50KGogKyAxKSwgY2lyY2xlQ2VudGVyLCBjdXJyZW50UHJvamVjdGlsZU9iamVjdC5yYWRpdXMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNvbnN0IGNoZWNrQmlyZEludGVyY2VwdEJsb2NrID0gKHBvaW50QSwgcG9pbnRCLCBjaXJjbGVDZW50ZXIsIHJhZGl1cykgPT4ge1xuICAgIGxldCBkaXN0O1xuICAgIGNvbnN0IHZlbDFYID0gcG9pbnRCLnBvcy54IC0gcG9pbnRBLnBvcy54O1xuICAgIGNvbnN0IHZlbDFZID0gcG9pbnRCLnBvcy55IC0gcG9pbnRBLnBvcy55O1xuICAgIGNvbnN0IHZlbDJYID0gY2lyY2xlQ2VudGVyWzBdIC0gcG9pbnRBLnBvcy54O1xuICAgIGNvbnN0IHZlbDJZID0gY2lyY2xlQ2VudGVyWzFdIC0gcG9pbnRBLnBvcy55O1xuICAgIGNvbnN0IHVuaXQgPSAodmVsMlggKiB2ZWwxWCArIHZlbDJZICogdmVsMVkpIC8gKHZlbDFZICogdmVsMVkgKyB2ZWwxWCAqIHZlbDFYKTtcbiAgICBpZiAodW5pdCA+PSAwICYmIHVuaXQgPD0gMSl7XG4gICAgICAgIGRpc3QgPSAocG9pbnRBLnBvcy54ICArIHZlbDFYICogdW5pdCAtIGNpcmNsZUNlbnRlclswXSkgKiogMiArIChwb2ludEEucG9zLnkgKyB2ZWwxWSAqIHVuaXQgLSBjaXJjbGVDZW50ZXJbMV0pICoqIDI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZGlzdCA9IHVuaXQgPCAwID8gXG4gICAgICAgICAgICAocG9pbnRBLnBvcy54IC0gY2lyY2xlQ2VudGVyWzBdKSAqKiAyICsgKHBvaW50QS5wb3MueSAtIGNpcmNsZUNlbnRlclsxXSkgKiogMiA6XG4gICAgICAgICAgICAocG9pbnRCLnBvcy54IC0gY2lyY2xlQ2VudGVyWzBdKSAqKiAyICsgKHBvaW50Qi5wb3MueSAtIGNpcmNsZUNlbnRlclsxXSkgKiogMjtcbiAgICB9XG4gICAgcmV0dXJuIGRpc3QgPCByYWRpdXMgKiByYWRpdXM7XG59XG5cblxuXG5cblxuIiwiZXhwb3J0IGNvbnN0IGJpcmRPblBpZ0NvbGxpc2lvbkxvZ2ljID0gKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LCBwaWcpID0+IHtcbiAgICBsZXQgbmV3VmVsWDEgPSAoY3VycmVudFByb2plY3RpbGVPYmplY3QudmVsWCAqIChjdXJyZW50UHJvamVjdGlsZU9iamVjdC5tYXNzIC0gcGlnLm1hc3MpICsgKCAyICogcGlnLm1hc3MgKiBwaWcudmVsWCkpIC8gKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0Lm1hc3MgKyBwaWcubWFzcyk7XG4gICAgbGV0IG5ld1ZlbFkxID0gKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFkgKiAoY3VycmVudFByb2plY3RpbGVPYmplY3QubWFzcyAtIHBpZy5tYXNzKSArICggMiAqIHBpZy5tYXNzICogcGlnLnZlbFkpKSAvIChjdXJyZW50UHJvamVjdGlsZU9iamVjdC5tYXNzICsgcGlnLm1hc3MpO1xuICAgIGxldCBuZXdWZWxYMiA9IChwaWcudmVsWCAqIChwaWcubWFzcyAtIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0Lm1hc3MpICsgKDIgKiBjdXJyZW50UHJvamVjdGlsZU9iamVjdC5tYXNzICogY3VycmVudFByb2plY3RpbGVPYmplY3QudmVsWCkpIC8gKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0Lm1hc3MgKyBwaWcubWFzcyk7XG4gICAgbGV0IG5ld1ZlbFkyID0gKHBpZy52ZWxZICogKHBpZy5tYXNzIC0gY3VycmVudFByb2plY3RpbGVPYmplY3QubWFzcykgKyAoMiAqIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0Lm1hc3MgKiBjdXJyZW50UHJvamVjdGlsZU9iamVjdC52ZWxZKSkgLyAoY3VycmVudFByb2plY3RpbGVPYmplY3QubWFzcyArIHBpZy5tYXNzKTtcblxuICAgIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFggPSAtY3VycmVudFByb2plY3RpbGVPYmplY3QudmVsWDtcbiAgICBjdXJyZW50UHJvamVjdGlsZU9iamVjdC52ZWxZID0gLWN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFk7XG4gICAgcGlnLnZlbFggPSBuZXdWZWxYMjtcbiAgICBwaWcudmVsWSA9IG5ld1ZlbFkyO1xuXG4gICAgY3VycmVudFByb2plY3RpbGVPYmplY3QueCA9IGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnggKyBuZXdWZWxYMTtcbiAgICBjdXJyZW50UHJvamVjdGlsZU9iamVjdC55ID0gY3VycmVudFByb2plY3RpbGVPYmplY3QueSArIG5ld1ZlbFkxO1xuICAgIHBpZy54ID0gcGlnLnggKyBuZXdWZWxYMjtcbiAgICBwaWcueSA9IHBpZy55ICsgbmV3VmVsWTI7XG59XG5cbmV4cG9ydCBjb25zdCBiaXJkT25CbG9ja0NvbGxpc2lvbkxvZ2ljID0gKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LCBibG9jaykgPT4ge1xuICAgIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFggPSAtY3VycmVudFByb2plY3RpbGVPYmplY3QudmVsWDtcbiAgICBjdXJyZW50UHJvamVjdGlsZU9iamVjdC52ZWxZID0gLWN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFk7XG4gICAgbGV0IGZvcmNlID0gYmxvY2suYXNQb2xhcihibG9jay52ZWN0b3IoMTAsIDEwKSk7XG4gICAgZm9yY2UubWFnICo9IGJsb2NrLm1hc3MgKiAwLjE7XG4gICAgYmxvY2suYXBwbHlGb3JjZShmb3JjZSwgYmxvY2sudmVjdG9yKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LngsIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnkpKTtcbn1cblxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9zdHlsZXMvaW5kZXguc2Nzc1wiO1xuaW1wb3J0IEFuZ2VyZWRCaXJkcyBmcm9tIFwiLi9zY3JpcHRzL2dhbWVcIjtcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYW52YXNcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGluaXQpO1xuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXNldC1oaWdoc2NvcmVcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlc2V0TG9jYWxTdG9yYWdlKTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBuZXcgQW5nZXJlZEJpcmRzKCkuc3RhcnQoKTtcbn1cblxuZnVuY3Rpb24gcmVzZXRMb2NhbFN0b3JhZ2UoKSB7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5jbGVhcigpO1xufVxuXG4iXSwic291cmNlUm9vdCI6IiJ9