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
    this.poofAnimation = this.poofAnimation.bind(this);
    this.poof = new Image();
    this.poof.src = "src/images/poof.png";
    this.startTime;
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
    key: "poofAnimation",
    value: function poofAnimation() {
      this.pig.src = "src/images/poof.png";
      this.radius = 30; // const that = this;
      // var timestamp = new Date().getTime();
      // if (this.start === undefined) {
      //     this.start = timestamp;
      // }
      // const elapsed = timestamp - this.start;
      // this.ctx.beginPath();
      // this.ctx.drawImage(this.poof, this.x - this.radius, this.y - this.radius, 100, 100);
      // this.ctx.closePath();
      // if (elapsed < 3000) {
      //     window.requestAnimationFrame(function(timestamp) {
      //         that.poofAnimation(timestamp)
      //     })
      // }
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

      for (var _i2 = 0; _i2 < this.blocks.length; _i2++) {
        this.blocks[_i2].update();
      } // this.updateRoundLives();


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
    key: "updateRoundLives",
    value: function updateRoundLives() {
      for (var i = 0; i < this.pigs.length; i++) {
        if (this.projectileObject.currentProjectileObject && (0,_util_stateLogic__WEBPACK_IMPORTED_MODULE_6__.checkBirdAndPigState)(this.projectileObject.currentProjectileObject.state, this.pigs[i].state)) {
          alert("s");
        }
      }
    }
  }, {
    key: "updatePigsLeft",
    value: function updatePigsLeft() {
      for (var i = 0; i < this.pigs.length; i++) {
        if ((0,_util_stateLogic__WEBPACK_IMPORTED_MODULE_6__.checkBirdAndPigState)(this.projectileObject.currentProjectileObject.state, this.pigs[i].state)) {
          this.pigs[i].poofAnimation(); // this.pigs.splice(i, 1);
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

function init() {
  new _scripts_game__WEBPACK_IMPORTED_MODULE_1__.default().start();
}

function resetLocalStorage() {
  window.localStorage.clear();
}
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYmlyZC5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYmxvY2suanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi8uL3NyYy9zY3JpcHRzL2NhbnZhcy5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvcGlnLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9wcm9qZWN0aWxlLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9zdGFnZUxvYWRlci5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvc3RhZ2VzL3N0YWdlS2V5cy5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvdXRpbC9jb2xsaXNpb25EZXRlY3Rpb25VdGlsLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy91dGlsL2NvbGxpc2lvbkxvZ2ljVXRpbC5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvdXRpbC9zdGF0ZUxvZ2ljLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc3R5bGVzL2luZGV4LnNjc3MiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiQmlyZCIsImN0eCIsImJpcmRQcm9wZXJ0aWVzIiwieCIsInkiLCJyYWRpdXMiLCJyYWQiLCJtYXNzIiwidmVsWCIsInZlbFkiLCJ0cmFuc2ZlciIsImdyYXZpdHkiLCJncm91bmQiLCJjYW52YXMiLCJoZWlnaHQiLCJib3VuY2UiLCJmcmljdGlvblgiLCJiaXJkIiwiSW1hZ2UiLCJzcmMiLCJzdGF0ZSIsInNhdmUiLCJiZWdpblBhdGgiLCJhcmMiLCJNYXRoIiwiUEkiLCJjbGlwIiwiY2xvc2VQYXRoIiwiZHJhd0ltYWdlIiwicmVzdG9yZSIsIkJsb2NrIiwidyIsImgiLCJyIiwiZHgiLCJkeSIsImRyIiwiSU5TRVQiLCJQSTkwIiwiUEkyIiwiV0FMTF9OT1JNUyIsIl9ncm91bmQiLCJnZXRNYXNzIiwic2V0VHJhbnNmb3JtIiwicm90YXRlIiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJzdHJva2VSZWN0IiwiaSIsInAiLCJnZXRQb2ludCIsInBvcyIsImRvQ29sbGlzaW9uIiwid2lkdGgiLCJ3aGljaCIsInh4IiwieXkiLCJ2ZWxvY2l0eUEiLCJ2ZWxvY2l0eVQiLCJ2ZWxvY2l0eSIsImNvcyIsInNpbiIsImRldGFpbHMiLCJhc1BvbGFyIiwidmVjdG9yIiwicG9sYXIiLCJtYWciLCJkaXIiLCJ2ZWN0b3JBZGQiLCJ2YWxpZGF0ZVBvbGFyIiwidmVjIiwiaXNQb2xhciIsInBWZWMiLCJyZXRWIiwiaXNDYXJ0IiwiY2FydFRvUG9sYXIiLCJ1bmRlZmluZWQiLCJwb2xhclRvQ2FydCIsImF0YW4yIiwiaHlwb3QiLCJ2ZWMxIiwidmVjMiIsInYxIiwiYXNDYXJ0IiwidjIiLCJmb3JjZSIsImxvYyIsImwiLCJ0b0NlbnRlciIsInBoZXRhIiwiRnYiLCJGYSIsImFjY2VsIiwiZGVsdGFWIiwiYWNjZWxBIiwidiIsImQxIiwiZDIiLCJhbG9uZyIsInRhbmdlbnQiLCJwb2ludERldGFpbHMiLCJ3YWxsSW5kZXgiLCJ2diIsInZhIiwidnZjIiwidmVjdG9yQ29tcG9uZW50c0ZvckRpciIsInZhYyIsImFwcGx5Rm9yY2UiLCJDYW52YXMiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJnZXRDb250ZXh0IiwiYmluZENhbnZhc1RvRE9NIiwicXVlcnlTZWxlY3RvciIsImNsZWFyQ2FudmFzIiwiYm9keSIsImFwcGVuZCIsImNsYXNzTGlzdCIsImFkZCIsImNsZWFyUmVjdCIsIkFuZ2VyZWRCaXJkcyIsImFuaW1hdGluZyIsImluaXRpYWxpemVFbnRpdGllcyIsImFuaW1hdGlvbiIsInN0YWdlTG9hZGVyIiwidXBkYXRlIiwid2luZG93IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiU3RhZ2VMb2FkZXIiLCJpbml0aWFsaXplRXZlbnRMaXN0ZW5lcnMiLCJQaWciLCJwaWciLCJwb29mQW5pbWF0aW9uIiwiYmluZCIsInBvb2YiLCJzdGFydFRpbWUiLCJhYnMiLCJQcm9qZWN0aWxlIiwibGF1bmNoZWRPYmplY3RzIiwibWF4IiwicHJvamVjdGlsZUltYWdlIiwiYW5nbGVWYWwiLCJtYWduaXR1ZGVWYWwiLCJhbmdsZSIsImN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0Iiwib2JqZWN0TGF1bmNoZWQiLCJPYmplY3RMYXVuY2giLCJvYmplY3RUeXBlIiwicHVzaCIsImxlbmd0aCIsInNwbGljZSIsImN1cnJlbnRPYmplY3QiLCJ1cGRhdGVDdXJyZW50TGF1bmNoZWRPYmplY3QiLCJjdXJyZW50QmlyZCIsInJlbmRlciIsInNjb3JlIiwic3RhZ2VOdW1iZXIiLCJzdGFydFBvc0JpcmQiLCJwcm9qZWN0aWxlT2JqZWN0IiwicGlncyIsImJsb2NrcyIsInVwZGF0ZUVudGl0aWVzIiwiY2hlY2tBbmRVcGRhdGVFbnRpdGllc0NvbGxpc2lvbiIsInJlbmRlckVudGl0aWVzIiwibW91c2UiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImNhbnZhc1Byb3BlcnRpZXMiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJsZWZ0IiwidG9wIiwiZGVsdGFYIiwiZGVsdGFZIiwidGhldGFSYWRpYW4iLCJraWNrT2ZmTGF1bmNoRGlyZWN0aW9uIiwiY3VycmVudFN0YWdlVmFsdWVzIiwic3RhZ2VLZXlzIiwibG9hZFN0YWdlIiwiY3VycmVudExldmVsSGlnaFNjb3JlS2V5IiwiaGlnaFNjb3JlU2F2ZUtleVN0cmluZyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJoaWdoU2NvcmUiLCJwYXJzZUludCIsInVwZGF0ZVBpZ3NMZWZ0IiwidXBkYXRlSGlnaFNjb3JlIiwic2V0SXRlbSIsImNoZWNrQmlyZEFuZFBpZ1N0YXRlIiwiYWxlcnQiLCJjaGVja0JpcmRPblBpZ0NvbGxpc2lvbiIsImJpcmRPblBpZ0NvbGxpc2lvbkxvZ2ljIiwiY2hlY2tCaXJkT25CbG9ja0NvbGxpc2lvbiIsImJpcmRPbkJsb2NrQ29sbGlzaW9uTG9naWMiLCJyZW5kZXJTY29yZSIsInJlbmRlckhpZ2hTY29yZSIsInJlbmRlclN0YWdlTnVtYmVyIiwidGV4dEFsaWduIiwidGV4dEJhc2VsaW5lIiwic3Ryb2tlU3R5bGUiLCJmb250IiwiZmlsbFRleHQiLCJzdHJva2VUZXh0IiwiZGlzdGFuY2UiLCJzcXJ0IiwiYmxvY2siLCJqIiwiY2lyY2xlQ2VudGVyIiwiY2hlY2tCaXJkSW50ZXJjZXB0QmxvY2siLCJwb2ludEEiLCJwb2ludEIiLCJkaXN0IiwidmVsMVgiLCJ2ZWwxWSIsInZlbDJYIiwidmVsMlkiLCJ1bml0IiwibmV3VmVsWDEiLCJuZXdWZWxZMSIsIm5ld1ZlbFgyIiwibmV3VmVsWTIiLCJjdXJyZW50UHJvamVjdGlsZU9iamVjdFN0YXRlIiwicGlnU3RhdGUiLCJpbml0IiwicmVzZXRMb2NhbFN0b3JhZ2UiLCJzdGFydCIsImNsZWFyIl0s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O1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSw2Q0FBNkMsd0RBQXdELEU7Ozs7O1dDQXJHO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUVBaEgsUUFBUSxDQUFDSSxhQUFULENBQXVCLFNBQXZCLEVBQWtDb0QsZ0JBQWxDLENBQW1ELE9BQW5ELEVBQTREeUQsSUFBNUQ7QUFDQWpILFFBQVEsQ0FBQ0ksYUFBVCxDQUF1QixrQkFBdkIsRUFBMkNvRCxnQkFBM0MsQ0FBNEQsT0FBNUQsRUFBcUUwRCxpQkFBckU7O0FBRUEsU0FBU0QsSUFBVCxHQUFnQjtBQUNaLE1BQUl0RyxrREFBSixHQUFtQndHLEtBQW5CO0FBQ0g7O0FBRUQsU0FBU0QsaUJBQVQsR0FBNkI7QUFDekJqRyxRQUFNLENBQUNzRCxZQUFQLENBQW9CNkMsS0FBcEI7QUFDSCxDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBCaXJkIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgsIGJpcmRQcm9wZXJ0aWVzKSB7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLnggPSBiaXJkUHJvcGVydGllcy54O1xuICAgICAgICB0aGlzLnkgPSBiaXJkUHJvcGVydGllcy55O1xuICAgICAgICB0aGlzLnJhZGl1cyA9IGJpcmRQcm9wZXJ0aWVzLnJhZDtcbiAgICAgICAgdGhpcy5tYXNzID0gMjtcbiAgICAgICAgdGhpcy52ZWxYID0gMDtcbiAgICAgICAgdGhpcy52ZWxZID0gMDtcbiAgICAgICAgdGhpcy50cmFuc2ZlciA9IDAuOTtcbiAgICAgICAgdGhpcy5ncmF2aXR5ID0geyB4OiAwLCB5OiAwLjEgfTtcbiAgICAgICAgdGhpcy5ncm91bmQgPSB0aGlzLmN0eC5jYW52YXMuaGVpZ2h0IC0gMjA7XG4gICAgICAgIHRoaXMuYm91bmNlID0gMC41O1xuICAgICAgICB0aGlzLmZyaWN0aW9uWCA9IDAuOTtcbiAgICAgICAgdGhpcy5iaXJkID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMuYmlyZC5zcmMgPSBcInNyYy9pbWFnZXMvYW5nZXJlZC1iaXJkeS5wbmdcIlxuICAgICAgICB0aGlzLnN0YXRlID0gXCJzdGFydFN0YXRlXCI7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLmN0eC5zYXZlKCk7XG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICB0aGlzLmN0eC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCAoTWF0aC5QSSAqIDIpLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuY3R4LmNsaXAoKTtcbiAgICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLmJpcmQsIHRoaXMueCAtIHRoaXMucmFkaXVzLCB0aGlzLnkgLSB0aGlzLnJhZGl1cywgdGhpcy5yYWRpdXMgKiAyLCB0aGlzLnJhZGl1cyAqIDIpXG4gICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJpcmQ7IiwiY2xhc3MgQmxvY2sge1xuICAgIGNvbnN0cnVjdG9yKGN0eCwgeCwgeSwgdywgaCkge1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjdHguY2FudmFzO1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLncgPSB3O1xuICAgICAgICB0aGlzLmggPSBoO1xuICAgICAgICB0aGlzLnIgPSAwLjE7XG4gICAgICAgIHRoaXMuZHggPSAwO1xuICAgICAgICB0aGlzLmR5ID0gMDtcbiAgICAgICAgdGhpcy5kciA9IDA7XG4gICAgICAgIHRoaXMuSU5TRVQgPSAxMDtcbiAgICAgICAgdGhpcy5QSSA9IE1hdGguUEk7XG4gICAgICAgIHRoaXMuUEk5MCA9IE1hdGguUEkgLyAyO1xuICAgICAgICB0aGlzLlBJMiA9IE1hdGguUEkgKiAyO1xuICAgICAgICB0aGlzLldBTExfTk9STVMgPSBbIE1hdGguUEkgLyAyLCBNYXRoLlBJLCAtKE1hdGguUEkgLyAyKSwgMF1cbiAgICAgICAgdGhpcy5fZ3JvdW5kID0gdGhpcy5jYW52YXMuaGVpZ2h0IC0gMTA1O1xuICAgICAgICB0aGlzLm1hc3MgPSB0aGlzLmdldE1hc3MoKVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdGhpcy5jdHguc2F2ZSgpXG4gICAgICAgIHRoaXMuY3R4LnNldFRyYW5zZm9ybSgxLDAsMCwxLHRoaXMueCx0aGlzLnkpO1xuICAgICAgICB0aGlzLmN0eC5yb3RhdGUodGhpcy5yKTtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJCbHVlXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KC10aGlzLncvMiwgLXRoaXMuaC8yLCB0aGlzLncsIHRoaXMuaClcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlUmVjdCgtdGhpcy53LzIsIC10aGlzLmgvMiwgdGhpcy53LCB0aGlzLmgpXG4gICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKVxuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy54ICs9IHRoaXMuZHg7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLmR5O1xuICAgICAgICB0aGlzLmR5ICs9IDAuMDYxO1xuICAgICAgICB0aGlzLnIgKz0gdGhpcy5kcjtcblxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgNDsgaSsrKXtcbiAgICAgICAgICAgIHZhciBwID0gdGhpcy5nZXRQb2ludChpKTtcbiAgICAgICAgICAgIC8vIG9ubHkgZG8gb25lIGNvbGxpc2lvbiBwZXIgZnJhbWUgb3Igd2Ugd2lsbCBlbmQgdXAgYWRkaW5nIGVuZXJneVxuICAgICAgICAgICAgaWYocC5wb3MueCA8IHRoaXMuSU5TRVQpe1xuICAgICAgICAgICAgICAgIHRoaXMueCArPSAodGhpcy5JTlNFVCkgLSBwLnBvcy54O1xuICAgICAgICAgICAgICAgIHRoaXMuZG9Db2xsaXNpb24ocCwzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiggcC5wb3MueCA+IHRoaXMuY2FudmFzLndpZHRoLXRoaXMuSU5TRVQpe1xuICAgICAgICAgICAgICAgIHRoaXMueCArPSAodGhpcy5jYW52YXMud2lkdGggLSB0aGlzLklOU0VUKSAtIHAucG9zLng7XG4gICAgICAgICAgICAgICAgdGhpcy5kb0NvbGxpc2lvbihwLDEpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKHAucG9zLnkgPCB0aGlzLklOU0VUKXtcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gKHRoaXMuSU5TRVQpIC0gcC5wb3MueTtcbiAgICAgICAgICAgICAgICB0aGlzLmRvQ29sbGlzaW9uKHAsMClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoIHAucG9zLnkgPiB0aGlzLmNhbnZhcy5oZWlnaHQgLSB0aGlzLklOU0VUKXtcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gKHRoaXMuY2FudmFzLmhlaWdodCAtIHRoaXMuSU5TRVQpIC0gcC5wb3MueTtcbiAgICAgICAgICAgICAgICB0aGlzLmRvQ29sbGlzaW9uKHAsMilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldE1hc3MoKSB7XG4gICAgICAgIHJldHVybiAoIHRoaXMudyAqIHRoaXMuaCAqIHRoaXMuaCkgLyAxMDAwO1xuICAgIH1cblxuICAgIGdldFBvaW50KHdoaWNoKSB7XG4gICAgICAgIHZhciBkeCwgZHksIHgsIHksIHh4LCB5eSwgdmVsb2NpdHlBLCB2ZWxvY2l0eVQsIHZlbG9jaXR5O1xuXG4gICAgICAgIGR4ID0gTWF0aC5jb3ModGhpcy5yKTtcbiAgICAgICAgZHkgPSBNYXRoLnNpbih0aGlzLnIpO1xuXG4gICAgICAgIHN3aXRjaCAod2hpY2gpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB4ID0gLXRoaXMudyAvIDI7XG4gICAgICAgICAgICAgICAgeSA9IC10aGlzLmggLyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHggPSB0aGlzLncgLyAyO1xuICAgICAgICAgICAgICAgIHkgPSAtdGhpcy5oIC8gMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB4ID0gdGhpcy53IC8gMjtcbiAgICAgICAgICAgICAgICB5ID0gdGhpcy5oIC8gMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICB4ID0gLXRoaXMudyAvIDI7XG4gICAgICAgICAgICAgICAgeSA9IHRoaXMuaCAvIDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgeCA9IHRoaXMueDtcbiAgICAgICAgICAgICAgICB5ID0gdGhpcy55O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHh4ICwgeXk7XG4gICAgICAgIHh4ID0geCAqIGR4ICsgeSAqIC1keTtcbiAgICAgICAgeXkgPSB4ICogZHkgKyB5ICogZHg7XG5cbiAgICAgICAgdmFyIGRldGFpbHMgPSB0aGlzLmFzUG9sYXIodGhpcy52ZWN0b3IoeHgsIHl5KSk7XG5cbiAgICAgICAgeHggKz0gdGhpcy54O1xuICAgICAgICB5eSArPSB0aGlzLnk7XG5cbiAgICAgICAgdmVsb2NpdHlBID0gdGhpcy5wb2xhcihkZXRhaWxzLm1hZyAqIHRoaXMuZHIsIGRldGFpbHMuZGlyICsgdGhpcy5QSTkwKTtcbiAgICAgICAgdmVsb2NpdHlUID0gdGhpcy52ZWN0b3JBZGQodmVsb2NpdHkgPSB0aGlzLnZlY3Rvcih0aGlzLmR4LCB0aGlzLmR5KSwgdmVsb2NpdHlBKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmVsb2NpdHk6IHZlbG9jaXR5LFxuICAgICAgICAgICAgdmVsb2NpdHlUOiB2ZWxvY2l0eVQsXG4gICAgICAgICAgICB2ZWxvY2l0eUEgOiB2ZWxvY2l0eUEsXG4gICAgICAgICAgICBwb3M6IHRoaXMudmVjdG9yKHh4LCB5eSksXG4gICAgICAgICAgICByYWRpdXM6IGRldGFpbHMubWFnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwb2xhcihtYWcgPSAxLCBkaXIgPSAwKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlUG9sYXIoe2RpcjogZGlyLCBtYWc6IG1hZ30pXG4gICAgfVxuXG4gICAgdmVjdG9yKHggPSAxLCB5ID0gMCkge1xuICAgICAgICByZXR1cm4geyB4OiB4LCB5OiB5fTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZVBvbGFyKHZlYykge1xuICAgICAgICBpZiAodGhpcy5pc1BvbGFyKHZlYykpIHtcbiAgICAgICAgICAgIGlmKHZlYy5tYWcgPCAwKXtcbiAgICAgICAgICAgICAgICB2ZWMubWFnID0gLXZlYy5tYWc7XG4gICAgICAgICAgICAgICAgdmVjLmRpciArPSB0aGlzLlBJO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2ZWM7XG4gICAgfVxuXG4gICAgcG9sYXJUb0NhcnQocFZlYywgcmV0ViA9IHt4OiAwLCB5OiAwfSl7XG4gICAgICAgIHJldFYueCA9IE1hdGguY29zKHBWZWMuZGlyKSAqIHBWZWMubWFnO1xuICAgICAgICByZXRWLnkgPSBNYXRoLnNpbihwVmVjLmRpcikgKiBwVmVjLm1hZztcbiAgICAgICAgcmV0dXJuIHJldFZcbiAgICB9XG5cbiAgICBhc1BvbGFyKHZlYykge1xuICAgICAgICBpZiAodGhpcy5pc0NhcnQodmVjKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FydFRvUG9sYXIodmVjKVxuICAgICAgICB9XG4gICAgICAgIGlmICh2ZWMubWFnIDwgMCkge1xuICAgICAgICAgICAgdmVjLm1hZyA9IC12ZWMubWFnO1xuICAgICAgICAgICAgdmVjLmRpciArPSB0aGlzLlBJO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGRpcjogdmVjLmRpciwgbWFnOiB2ZWMubWFnfTtcbiAgICB9XG5cbiAgICBpc0NhcnQodmVjKSB7IGlmKHZlYy54ICE9PSB1bmRlZmluZWQgJiYgdmVjLnkgIT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdHJ1ZTsgfSByZXR1cm4gZmFsc2U7IH1cbiAgICBpc1BvbGFyKHZlYykgeyBpZih2ZWMubWFnICE9PSB1bmRlZmluZWQgJiYgdmVjLmRpciAhPT0gdW5kZWZpbmVkKSB7IHJldHVybiB0cnVlOyB9IHJldHVybiBmYWxzZTsgfVxuICAgIGFzQ2FydCh2ZWMpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNQb2xhcih2ZWMpKSB7cmV0dXJuIHRoaXMucG9sYXJUb0NhcnQodmVjKX1cbiAgICAgICAgcmV0dXJuIHt4OiB2ZWMueCwgeTogdmVjLnl9XG4gICAgfVxuICAgIGNhcnRUb1BvbGFyKHZlYywgcmV0ViA9IHtkaXI6IDAsIG1hZzogMH0pIHtcbiAgICAgICAgcmV0Vi5kaXIgPSBNYXRoLmF0YW4yKHZlYy55LCB2ZWMueCk7XG4gICAgICAgIHJldFYubWFnID0gTWF0aC5oeXBvdCh2ZWMueCwgdmVjLnkpO1xuICAgICAgICByZXR1cm4gcmV0VjtcbiAgICB9XG5cbiAgICB2ZWN0b3JBZGQodmVjMSwgdmVjMikge1xuICAgICAgICB2YXIgdjEgPSB0aGlzLmFzQ2FydCh2ZWMxKTtcbiAgICAgICAgdmFyIHYyID0gdGhpcy5hc0NhcnQodmVjMik7XG4gICAgICAgIHJldHVybiB0aGlzLnZlY3Rvcih2MS54ICsgdjIueCwgdjEueSArIHYyLnkpXG4gICAgfVxuXG4gICAgYXBwbHlGb3JjZShmb3JjZSwgbG9jKSB7XG4gICAgICAgIHRoaXMudmFsaWRhdGVQb2xhcihmb3JjZSk7XG4gICAgICAgIHZhciBsID0gdGhpcy5hc0NhcnQobG9jKTtcbiAgICAgICAgdmFyIHRvQ2VudGVyID0gdGhpcy5hc1BvbGFyKHRoaXMudmVjdG9yKHRoaXMueCAtIGwueCwgdGhpcy55IC0gbC55KSk7XG4gICAgICAgIHZhciBwaGV0YSA9IHRvQ2VudGVyLmRpciAtIGZvcmNlLmRpcjtcbiAgICAgICAgdmFyIEZ2ID0gTWF0aC5jb3MocGhldGEpICogZm9yY2UubWFnO1xuICAgICAgICB2YXIgRmEgPSBNYXRoLnNpbihwaGV0YSkgKiBmb3JjZS5tYWc7XG4gICAgICAgIHZhciBhY2NlbCA9IHRoaXMuYXNQb2xhcih0b0NlbnRlcik7XG4gICAgICAgIGFjY2VsLm1hZyA9IEZ2IC8gdGhpcy5tYXNzOyBcbiAgICAgICAgdmFyIGRlbHRhViA9IHRoaXMuYXNDYXJ0KGFjY2VsKTsgXG4gICAgICAgIHRoaXMuZHggKz0gZGVsdGFWLnggXG4gICAgICAgIHRoaXMuZHkgKz0gZGVsdGFWLnlcbiAgICAgICAgdmFyIGFjY2VsQSA9IEZhIC8gKHRvQ2VudGVyLm1hZyAgKiB0aGlzLm1hc3MpOyBcbiAgICAgICAgdGhpcy5kciArPSBhY2NlbEE7XG4gICAgfVxuXG4gICAgdmVjdG9yQ29tcG9uZW50c0ZvckRpcih2ZWMsIGRpcikge1xuICAgICAgICB2YXIgdiA9IHRoaXMuYXNQb2xhcih2ZWMpOyBcbiAgICAgICAgdmFyIHBoZXRhID0gdi5kaXIgLSBkaXI7XG4gICAgICAgIHZhciBGdiA9IE1hdGguY29zKHBoZXRhKSAqIHYubWFnO1xuICAgICAgICB2YXIgRmEgPSBNYXRoLnNpbihwaGV0YSkgKiB2Lm1hZztcblxuICAgICAgICB2YXIgZDEgPSBkaXI7XG4gICAgICAgIHZhciBkMiA9IGRpciArIHRoaXMuUEk5MDsgICAgXG4gICAgICAgIGlmKEZ2IDwgMCl7XG4gICAgICAgICAgICBkMSArPSB0aGlzLlBJO1xuICAgICAgICAgICAgRnYgPSAtRnY7XG4gICAgICAgIH1cblxuICAgICAgICBpZihGYSA8IDApe1xuICAgICAgICAgICAgZDIgKz0gdGhpcy5QSTtcbiAgICAgICAgICAgIEZhID0gLUZhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbG9uZyA6IHRoaXMucG9sYXIoRnYsZDEpLFxuICAgICAgICAgICAgdGFuZ2VudCA6IHRoaXMucG9sYXIoRmEsZDIpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZG9Db2xsaXNpb24ocG9pbnREZXRhaWxzLCB3YWxsSW5kZXgpIHtcbiAgICAgICAgdmFyIHZ2ID0gdGhpcy5hc1BvbGFyKHBvaW50RGV0YWlscy52ZWxvY2l0eSk7IFxuICAgICAgICB2YXIgdmEgPSB0aGlzLmFzUG9sYXIocG9pbnREZXRhaWxzLnZlbG9jaXR5QSk7IFxuICAgICAgICB2YXIgdnZjID0gdGhpcy52ZWN0b3JDb21wb25lbnRzRm9yRGlyKHZ2LCB0aGlzLldBTExfTk9STVNbd2FsbEluZGV4XSk7XG4gICAgICAgIHZhciB2YWMgPSB0aGlzLnZlY3RvckNvbXBvbmVudHNGb3JEaXIodmEsIHRoaXMuV0FMTF9OT1JNU1t3YWxsSW5kZXhdKTtcblxuICAgICAgICB2dmMuYWxvbmcubWFnICo9IDEuMTg7IFxuICAgICAgICB2YWMuYWxvbmcubWFnICo9IDEuMTg7IFxuXG4gICAgICAgIHZ2Yy5hbG9uZy5tYWcgKj0gdGhpcy5tYXNzO1xuICAgICAgICB2YWMuYWxvbmcubWFnICo9IHRoaXMubWFzcztcblxuICAgICAgICB2dmMuYWxvbmcuZGlyICs9IHRoaXMuUEk7XG4gICAgICAgIHZhYy5hbG9uZy5kaXIgKz0gdGhpcy5QSTtcblxuICAgICAgICB2dmMudGFuZ2VudC5tYWcgKj0gMC4xODsgIFxuICAgICAgICB2YWMudGFuZ2VudC5tYWcgKj0gMC4xODtcbiAgICAgICAgdnZjLnRhbmdlbnQubWFnICo9IHRoaXMubWFzcyAgXG4gICAgICAgIHZhYy50YW5nZW50Lm1hZyAqPSB0aGlzLm1hc3NcbiAgICAgICAgdnZjLnRhbmdlbnQuZGlyICs9IHRoaXMuUEk7IFxuICAgICAgICB2YWMudGFuZ2VudC5kaXIgKz0gdGhpcy5QSTtcblxuICAgICAgICB0aGlzLmFwcGx5Rm9yY2UodnZjLmFsb25nLCBwb2ludERldGFpbHMucG9zKSAgICBcbiAgICAgICAgdGhpcy5hcHBseUZvcmNlKHZ2Yy50YW5nZW50LCBwb2ludERldGFpbHMucG9zKSAgICBcbiAgICAgICAgdGhpcy5hcHBseUZvcmNlKHZhYy5hbG9uZywgcG9pbnREZXRhaWxzLnBvcykgICAgXG4gICAgICAgIHRoaXMuYXBwbHlGb3JjZSh2YWMudGFuZ2VudCwgcG9pbnREZXRhaWxzLnBvcykgICAgXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCbG9jayIsImNsYXNzIENhbnZhcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSAxNDAwO1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSA3NTA7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICB0aGlzLmJpbmRDYW52YXNUb0RPTSgpXG4gICAgfVxuXG4gICAgYmluZENhbnZhc1RvRE9NKCkge1xuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLWNhbnZhc1wiKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhckNhbnZhcygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKHRoaXMuY2FudmFzKTtcbiAgICAgICAgdGhpcy5jYW52YXMuY2xhc3NMaXN0LmFkZChcIm1haW4tY2FudmFzXCIpXG4gICAgfVxuXG4gICAgY2xlYXJDYW52YXMoKSB7XG4gICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhbnZhcztcbiIsIi8vIGltcG9ydCBcIi4vc3R5bGVzL2luZGV4LnNjc3NcIjtcbmltcG9ydCBDYW52YXMgZnJvbSBcIi4vY2FudmFzXCI7XG5pbXBvcnQgU3RhZ2VMb2FkZXIgZnJvbSBcIi4vc3RhZ2VMb2FkZXJcIjtcblxuY2xhc3MgQW5nZXJlZEJpcmRzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IG5ldyBDYW52YXMoKVxuICAgICAgICB0aGlzLmNhbnZhcy5iaW5kQ2FudmFzVG9ET00oKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplRW50aXRpZXMoKTtcbiAgICAgICAgY29uc3QgYW5pbWF0aW9uID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jYW52YXMuY2xlYXJDYW52YXMoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2VMb2FkZXIudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uKTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXplRW50aXRpZXMoKSB7XG4gICAgICAgIHRoaXMuc3RhZ2VMb2FkZXIgPSBuZXcgU3RhZ2VMb2FkZXIodGhpcy5jYW52YXMuY3R4KTtcbiAgICAgICAgdGhpcy5zdGFnZUxvYWRlci5pbml0aWFsaXplRW50aXRpZXMoKTtcbiAgICAgICAgdGhpcy5zdGFnZUxvYWRlci5pbml0aWFsaXplRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9XG5cbiAgICBnYW1lT3ZlcigpIHtcbiAgICAgICAgLy8gcmVzdGFydCBHYW1lLCBhZnRlciBjZXJ0YWluIGJpcmR5IHNob3RzXG4gICAgICAgIC8vIGRyb3AgZXZlbnRMaXN0ZW5lcnMgYW5kIHJlYXR0YWNoIERPTSBjYW52YXMgbm9kZVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQW5nZXJlZEJpcmRzOyIsImNsYXNzIFBpZyB7XG4gICAgY29uc3RydWN0b3IoY3R4LCB4LCB5LCByYWRpdXMsIHZlbFggPSAwLCB2ZWxZID0gMCkge1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy54ID0geDsgXG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMudmVsWCA9IHZlbFg7XG4gICAgICAgIHRoaXMudmVsWSA9IHZlbFk7XG4gICAgICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xuICAgICAgICB0aGlzLm1hc3MgPSAyO1xuXG4gICAgICAgIHRoaXMuZ3Jhdml0eSA9IHsgeDogMCwgeTogMC4xIH07XG4gICAgICAgIHRoaXMuZ3JvdW5kID0gdGhpcy5jdHguY2FudmFzLmhlaWdodCAtIDIwO1xuICAgICAgICB0aGlzLmJvdW5jZSA9IDAuNDtcbiAgICAgICAgdGhpcy5mcmljdGlvblggPSAwLjk7XG4gICAgICAgIHRoaXMubWFzcyA9IDI7XG4gICAgICAgIHRoaXMucGlnID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMucGlnLnNyYyA9IFwic3JjL2ltYWdlcy9wZXBwYS5wbmdcIjtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFwiYWxpdmVcIjtcblxuICAgICAgICB0aGlzLnBvb2ZBbmltYXRpb24gPSB0aGlzLnBvb2ZBbmltYXRpb24uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5wb29mID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMucG9vZi5zcmMgPSBcInNyYy9pbWFnZXMvcG9vZi5wbmdcIjtcbiAgICAgICAgdGhpcy5zdGFydFRpbWU7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLmN0eC5zYXZlKCk7XG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICB0aGlzLmN0eC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCAoTWF0aC5QSSAqIDIpLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuY3R4LmNsaXAoKTtcbiAgICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLnBpZywgdGhpcy54IC0gdGhpcy5yYWRpdXMsIHRoaXMueSAtIHRoaXMucmFkaXVzLCB0aGlzLnJhZGl1cyAqIDIsIHRoaXMucmFkaXVzICogMik7XG4gICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMudmVsWCArPSB0aGlzLmdyYXZpdHkueDtcbiAgICAgICAgdGhpcy52ZWxZICs9IHRoaXMuZ3Jhdml0eS55O1xuICAgICAgICB0aGlzLnggKz0gdGhpcy52ZWxYO1xuICAgICAgICB0aGlzLnkgKz0gdGhpcy52ZWxZO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMueSA+PSB0aGlzLmdyb3VuZCkge1xuICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5ncm91bmQgLSAodGhpcy55IC0gdGhpcy5ncm91bmQpO1xuICAgICAgICAgICAgdGhpcy52ZWxZID0gLU1hdGguYWJzKHRoaXMudmVsWSkgKiB0aGlzLmJvdW5jZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnZlbFkgPj0gdGhpcy5ncmF2aXR5LnkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlbFkgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuZ3JvdW5kIC0gdGhpcy5ncmF2aXR5Lnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy52ZWxYID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVsWCAtPSB0aGlzLmZyaWN0aW9uWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnZlbFggPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWxYICs9IHRoaXMuZnJpY3Rpb25YO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHN0b3BzIGJhbGwgZnJvbSBib3VuY2luZyBpbiBZIGF4aXNcbiAgICAgICAgaWYgKHRoaXMudmVsWTwwICYmIHRoaXMudmVsWT4tMi4xKSB7XG4gICAgICAgICAgICB0aGlzLnZlbFkgPSAwO1xuICAgICAgICB9XG4gICAgICAgIC8vIHN0b3BzIGJhbGwgZnJvbSBtb3Zpbmcgb24gWCBheGlzIGlmIHgtdmVsb2NpdHkgPCAxLjFcbiAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMudmVsWCkgPCAxLjEpIHtcbiAgICAgICAgICAgIHRoaXMudmVsWCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwb29mQW5pbWF0aW9uKCkge1xuICAgICAgICB0aGlzLnBpZy5zcmMgPSBcInNyYy9pbWFnZXMvcG9vZi5wbmdcIjtcbiAgICAgICAgdGhpcy5yYWRpdXMgPSAzMDtcblxuXG4gICAgICAgIC8vIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgICAgICAvLyB2YXIgdGltZXN0YW1wID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIC8vIGlmICh0aGlzLnN0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gICAgIHRoaXMuc3RhcnQgPSB0aW1lc3RhbXA7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gY29uc3QgZWxhcHNlZCA9IHRpbWVzdGFtcCAtIHRoaXMuc3RhcnQ7XG5cbiAgICAgICAgLy8gdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIC8vIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLnBvb2YsIHRoaXMueCAtIHRoaXMucmFkaXVzLCB0aGlzLnkgLSB0aGlzLnJhZGl1cywgMTAwLCAxMDApO1xuICAgICAgICAvLyB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgXG4gICAgICAgIC8vIGlmIChlbGFwc2VkIDwgMzAwMCkge1xuICAgICAgICAvLyAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbih0aW1lc3RhbXApIHtcbiAgICAgICAgLy8gICAgICAgICB0aGF0LnBvb2ZBbmltYXRpb24odGltZXN0YW1wKVxuICAgICAgICAvLyAgICAgfSlcbiAgICAgICAgLy8gfVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQaWc7IiwiaW1wb3J0IEJpcmQgZnJvbSBcIi4vYmlyZFwiO1xuY2xhc3MgUHJvamVjdGlsZSB7XG4gICAgY29uc3RydWN0b3IoY3R4LCBiaXJkUHJvcGVydGllcykge1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5sYXVuY2hlZE9iamVjdHMgPSBbXTtcbiAgICAgICAgdGhpcy5tYXggPSAxO1xuICAgICAgICB0aGlzLmJpcmRQcm9wZXJ0aWVzID0gYmlyZFByb3BlcnRpZXM7XG4gICAgICAgIHRoaXMucHJvamVjdGlsZUltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMucHJvamVjdGlsZUltYWdlLnNyYyA9IFwic3JjL2ltYWdlcy9zbGluZ1MucG5nXCI7XG4gICAgfVxuXG4gICAga2lja09mZkxhdW5jaERpcmVjdGlvbihhbmdsZVZhbCwgbWFnbml0dWRlVmFsKSB7XG4gICAgICAgIGxldCBhbmdsZSA9IE1hdGguUEkqIGFuZ2xlVmFsIC8xODA7XG4gICAgICAgIHRoaXMuY3VycmVudFByb2plY3RpbGVPYmplY3QgPSBuZXcgQmlyZCh0aGlzLmN0eCwgdGhpcy5iaXJkUHJvcGVydGllcyk7XG4gICAgICAgIHRoaXMub2JqZWN0TGF1bmNoZWQgPSBuZXcgT2JqZWN0TGF1bmNoKHRoaXMuY3R4LCB0aGlzLmN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0KTtcbiAgICAgICAgdGhpcy5vYmplY3RMYXVuY2hlZC5vYmplY3RUeXBlLnZlbFkgPS0gbWFnbml0dWRlVmFsICogTWF0aC5zaW4oYW5nbGUpO1xuICAgICAgICB0aGlzLm9iamVjdExhdW5jaGVkLm9iamVjdFR5cGUudmVsWCA9IG1hZ25pdHVkZVZhbCAqIE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgdGhpcy5vYmplY3RMYXVuY2hlZC5vYmplY3RUeXBlLnRyYW5zZmVyID0gMC44O1xuICAgICAgICB0aGlzLmxhdW5jaGVkT2JqZWN0cy5wdXNoKHRoaXMub2JqZWN0TGF1bmNoZWQpO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubGF1bmNoZWRPYmplY3RzLmxlbmd0aCA+IHRoaXMubWF4KSB7XG4gICAgICAgICAgICB0aGlzLmxhdW5jaGVkT2JqZWN0cyA9IHRoaXMubGF1bmNoZWRPYmplY3RzLnNwbGljZSgxKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGF1bmNoZWRPYmplY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudE9iamVjdCA9IHRoaXMubGF1bmNoZWRPYmplY3RzW2ldLm9iamVjdFR5cGU7XG4gICAgICAgICAgICBjdXJyZW50T2JqZWN0LnZlbFkgKz0gMS41MztcbiAgICAgICAgICAgIGN1cnJlbnRPYmplY3QueCArPSBjdXJyZW50T2JqZWN0LnZlbFggLyAzO1xuICAgICAgICAgICAgY3VycmVudE9iamVjdC55ICs9IGN1cnJlbnRPYmplY3QudmVsWSAvIDM7XG4gICAgICAgIFxuICAgICAgICAgICAgdGhpcy5sYXVuY2hlZE9iamVjdHNbaV0udXBkYXRlQ3VycmVudExhdW5jaGVkT2JqZWN0KClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMucHJvamVjdGlsZUltYWdlLCB0aGlzLmJpcmRQcm9wZXJ0aWVzLnggLSAzMCwgdGhpcy5iaXJkUHJvcGVydGllcy55IC0gNzAsIDc1LCAxNDApO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGF1bmNoZWRPYmplY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudEJpcmQgPSB0aGlzLmxhdW5jaGVkT2JqZWN0c1tpXS5vYmplY3RUeXBlO1xuICAgICAgICAgICAgY3VycmVudEJpcmQucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIE9iamVjdExhdW5jaCB7XG4gICAgY29uc3RydWN0b3IoY3R4LCBvYmplY3RUeXBlKSB7XG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLm9iamVjdFR5cGUgPSBvYmplY3RUeXBlO1xuICAgIH1cblxuICAgIHJlbmRlck9iamVjdExhdW5jaCgpIHtcbiAgICAgICAgdGhpcy5vYmplY3RUeXBlLnJlbmRlcigpO1xuICAgIH1cblxuICAgIHVwZGF0ZUN1cnJlbnRMYXVuY2hlZE9iamVjdCgpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRPYmplY3QgPSB0aGlzLm9iamVjdFR5cGU7XG4gICAgICAgIGN1cnJlbnRPYmplY3QudmVsWCArPSBjdXJyZW50T2JqZWN0LmdyYXZpdHkueDtcbiAgICAgICAgY3VycmVudE9iamVjdC52ZWxZICs9IGN1cnJlbnRPYmplY3QuZ3Jhdml0eS55O1xuICAgICAgICBjdXJyZW50T2JqZWN0LnggKz0gY3VycmVudE9iamVjdC52ZWxYO1xuICAgICAgICBjdXJyZW50T2JqZWN0LnkgKz0gY3VycmVudE9iamVjdC52ZWxZO1xuXG4gICAgICAgIGlmIChjdXJyZW50T2JqZWN0LnkgPj0gY3VycmVudE9iamVjdC5ncm91bmQpIHtcbiAgICAgICAgICAgIGN1cnJlbnRPYmplY3QueSA9IGN1cnJlbnRPYmplY3QuZ3JvdW5kIC0gKGN1cnJlbnRPYmplY3QueSAtIGN1cnJlbnRPYmplY3QuZ3JvdW5kKTtcbiAgICAgICAgICAgIGN1cnJlbnRPYmplY3QudmVsWSA9IC1NYXRoLmFicyhjdXJyZW50T2JqZWN0LnZlbFkpICogY3VycmVudE9iamVjdC5ib3VuY2U7XG4gICAgICAgICAgICBpZiAoY3VycmVudE9iamVjdC52ZWxZID49IGN1cnJlbnRPYmplY3QuZ3Jhdml0eS55KSB7XG4gICAgICAgICAgICAgICAgY3VycmVudE9iamVjdC52ZWxZID0gMDtcbiAgICAgICAgICAgICAgICBjdXJyZW50T2JqZWN0LnkgPSBjdXJyZW50T2JqZWN0Lmdyb3VuZCAtIGN1cnJlbnRPYmplY3QuZ3Jhdml0eS55O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGN1cnJlbnRPYmplY3QudmVsWCA+IDApIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50T2JqZWN0LnZlbFggLT0gY3VycmVudE9iamVjdC5mcmljdGlvblg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY3VycmVudE9iamVjdC52ZWxYIDwgMCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRPYmplY3QudmVsWCArPSBjdXJyZW50T2JqZWN0LmZyaWN0aW9uWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBzdG9wcyBiYWxsIGZyb20gYm91bmNpbmcgaW4gWSBheGlzXG4gICAgICAgIGlmICggY3VycmVudE9iamVjdC55ID49IGN1cnJlbnRPYmplY3QuZ3JvdW5kIC0gMTApIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50T2JqZWN0LnZlbFkgPD0gMCAmJiBjdXJyZW50T2JqZWN0LnZlbFkgPiAtMi41KSB7XG4gICAgICAgICAgICAgICAgY3VycmVudE9iamVjdC52ZWxZID0gMDtcbiAgICAgICAgICAgICAgICBjdXJyZW50T2JqZWN0LnN0YXRlID0gXCJlbmRTdGF0ZVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHN0b3BzIGJhbGwgZnJvbSBtb3Zpbmcgb24gWCBheGlzIFxuICAgICAgICBpZiAoTWF0aC5hYnMoY3VycmVudE9iamVjdC52ZWxYKSA8IDEuMSkge1xuICAgICAgICAgICAgY3VycmVudE9iamVjdC52ZWxYID0gMDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0aWxlOyIsImltcG9ydCBQaWcgZnJvbSBcIi4vcGlnXCI7XG5pbXBvcnQgQmxvY2sgZnJvbSBcIi4vYmxvY2tcIjtcbmltcG9ydCBQcm9qZWN0aWxlIGZyb20gXCIuL3Byb2plY3RpbGVcIjtcbmltcG9ydCB7c3RhZ2VLZXlzfSBmcm9tIFwiLi9zdGFnZXMvc3RhZ2VLZXlzXCI7XG5pbXBvcnQge2NoZWNrQmlyZE9uUGlnQ29sbGlzaW9uLCBjaGVja0JpcmRPbkJsb2NrQ29sbGlzaW9ufSBmcm9tIFwiLi91dGlsL2NvbGxpc2lvbkRldGVjdGlvblV0aWxcIjtcbmltcG9ydCB7YmlyZE9uUGlnQ29sbGlzaW9uTG9naWMsIGJpcmRPbkJsb2NrQ29sbGlzaW9uTG9naWN9IGZyb20gXCIuL3V0aWwvY29sbGlzaW9uTG9naWNVdGlsXCI7XG5pbXBvcnQge2NoZWNrQmlyZEFuZFBpZ1N0YXRlfSBmcm9tIFwiLi91dGlsL3N0YXRlTG9naWNcIjtcblxuY2xhc3MgU3RhZ2VMb2FkZXIge1xuICAgIGNvbnN0cnVjdG9yKGN0eCkge1xuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjdHguY2FudmFzO1xuICAgICAgICB0aGlzLnNjb3JlID0gMDtcbiAgICAgICAgdGhpcy5zdGFnZU51bWJlciA9IDE7XG4gICAgICAgIHRoaXMuc3RhcnRQb3NCaXJkID0gW107XG4gICAgICAgIHRoaXMucHJvamVjdGlsZU9iamVjdCA9IHt9O1xuICAgICAgICB0aGlzLnBpZ3MgPSBbXTtcbiAgICAgICAgdGhpcy5ibG9ja3MgPSBbXTtcbiAgICB9XG4gICAgXG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUVudGl0aWVzKCk7XG4gICAgICAgIGlmICh0aGlzLnByb2plY3RpbGVPYmplY3Qub2JqZWN0TGF1bmNoZWQpIHRoaXMuY2hlY2tBbmRVcGRhdGVFbnRpdGllc0NvbGxpc2lvbigpO1xuICAgICAgICB0aGlzLnJlbmRlckVudGl0aWVzKCk7XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZUV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICBjb25zdCBtb3VzZSA9IHtcbiAgICAgICAgICAgIHg6IHRoaXMuY2FudmFzLndpZHRoLzIsXG4gICAgICAgICAgICB5OiB0aGlzLmNhbnZhcy5oZWlnaHQvMixcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGxldCBjYW52YXNQcm9wZXJ0aWVzID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBtb3VzZS54ID0gZS54IC0gY2FudmFzUHJvcGVydGllcy5sZWZ0O1xuICAgICAgICAgICAgbW91c2UueSA9IGUueSAtIGNhbnZhc1Byb3BlcnRpZXMudG9wO1xuICAgICAgICAgICAgbGV0IGRlbHRhWCA9IG1vdXNlLnggLSB0aGlzLnN0YXJ0UG9zQmlyZFswXTtcbiAgICAgICAgICAgIGxldCBkZWx0YVkgPSBtb3VzZS55IC0gdGhpcy5zdGFydFBvc0JpcmRbMV07XG4gICAgICAgICAgICBsZXQgdGhldGFSYWRpYW4gPSBNYXRoLmF0YW4yKGRlbHRhWSwgZGVsdGFYKTtcbiAgICAgICAgICAgIGxldCBhbmdsZVZhbCA9IC0oKE1hdGguYWJzKHRoZXRhUmFkaWFuICogMTgwIC8gTWF0aC5QSSkgLSAyNzApICUgOTApO1xuICAgICAgICAgICAgbGV0IG1hZ25pdHVkZVZhbCA9IChNYXRoLmFicyhtb3VzZS54IC0gMTMwKSAvIDIpO1xuXG4gICAgICAgICAgICB0aGlzLnByb2plY3RpbGVPYmplY3Qua2lja09mZkxhdW5jaERpcmVjdGlvbihhbmdsZVZhbCAsIG1hZ25pdHVkZVZhbClcbiAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgIH1cblxuICAgIGluaXRpYWxpemVFbnRpdGllcygpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFN0YWdlVmFsdWVzID0gc3RhZ2VLZXlzW3RoaXMuc3RhZ2VOdW1iZXJdO1xuICAgICAgICB0aGlzLmxvYWRTdGFnZShjdXJyZW50U3RhZ2VWYWx1ZXMpO1xuICAgIH1cblxuICAgIGxvYWRTdGFnZShjdXJyZW50U3RhZ2VWYWx1ZXMpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0aWxlT2JqZWN0ID0gbmV3IFByb2plY3RpbGUodGhpcy5jdHgsIGN1cnJlbnRTdGFnZVZhbHVlc1tcImJpcmRQcm9wZXJ0aWVzXCJdKTtcbiAgICAgICAgdGhpcy5zdGFydFBvc0JpcmQgPSBbY3VycmVudFN0YWdlVmFsdWVzW1wiYmlyZFByb3BlcnRpZXNcIl0ueCwgY3VycmVudFN0YWdlVmFsdWVzW1wiYmlyZFByb3BlcnRpZXNcIl0ueV1cbiAgICAgICAgdGhpcy5jdXJyZW50TGV2ZWxIaWdoU2NvcmVLZXkgPSBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJjdXJyZW50TGV2ZWxIaWdoU2NvcmVLZXlcIl07XG5cbiAgICAgICAgbGV0IGhpZ2hTY29yZVNhdmVLZXlTdHJpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmN1cnJlbnRMZXZlbEhpZ2hTY29yZUtleSk7XG4gICAgICAgIGlmIChoaWdoU2NvcmVTYXZlS2V5U3RyaW5nID09PSBudWxsKXtcbiAgICAgICAgICAgIHRoaXMuaGlnaFNjb3JlID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGlnaFNjb3JlID0gcGFyc2VJbnQoaGlnaFNjb3JlU2F2ZUtleVN0cmluZyk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnRTdGFnZVZhbHVlc1tcIm51bWJlck9mUGlnc1wiXTsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnBpZ3MucHVzaChuZXcgUGlnKFxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LCBcbiAgICAgICAgICAgICAgICBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJwaWdQcm9wZXJ0aWVzXCJdW2ldLngsIFxuICAgICAgICAgICAgICAgIGN1cnJlbnRTdGFnZVZhbHVlc1tcInBpZ1Byb3BlcnRpZXNcIl1baV0ueSwgXG4gICAgICAgICAgICAgICAgY3VycmVudFN0YWdlVmFsdWVzW1wicGlnUHJvcGVydGllc1wiXVtpXS5yYWQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3VycmVudFN0YWdlVmFsdWVzW1wibnVtYmVyT2ZCbG9ja3NcIl07IGkrKykge1xuICAgICAgICAgICAgdGhpcy5ibG9ja3MucHVzaChuZXcgQmxvY2soXG4gICAgICAgICAgICAgICAgdGhpcy5jdHgsIFxuICAgICAgICAgICAgICAgIGN1cnJlbnRTdGFnZVZhbHVlc1tcImJsb2NrUHJvcGVyaXRlc1wiXVtpXS54LCBcbiAgICAgICAgICAgICAgICBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJibG9ja1Byb3Blcml0ZXNcIl1baV0ueSxcbiAgICAgICAgICAgICAgICBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJibG9ja1Byb3Blcml0ZXNcIl1baV0udyxcbiAgICAgICAgICAgICAgICBjdXJyZW50U3RhZ2VWYWx1ZXNbXCJibG9ja1Byb3Blcml0ZXNcIl1baV0uaCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlRW50aXRpZXMoKSB7XG4gICAgICAgIHRoaXMucHJvamVjdGlsZU9iamVjdC51cGRhdGUoKVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGlncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5waWdzW2ldLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ibG9ja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tzW2ldLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMudXBkYXRlUm91bmRMaXZlcygpO1xuICAgICAgICBpZiAodGhpcy5wcm9qZWN0aWxlT2JqZWN0LmN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0KSB0aGlzLnVwZGF0ZVBpZ3NMZWZ0KCk7XG4gICAgICAgIHRoaXMudXBkYXRlSGlnaFNjb3JlKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlSGlnaFNjb3JlKCkge1xuICAgICAgICBpZiAodGhpcy5zY29yZSA+IHRoaXMuaGlnaFNjb3JlKSB7XG4gICAgICAgICAgICB0aGlzLmhpZ2hTY29yZSA9IHRoaXMuc2NvcmU7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmN1cnJlbnRMZXZlbEhpZ2hTY29yZUtleSwgdGhpcy5oaWdoU2NvcmUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlUm91bmRMaXZlcygpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBpZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb2plY3RpbGVPYmplY3QuY3VycmVudFByb2plY3RpbGVPYmplY3QgJiYgY2hlY2tCaXJkQW5kUGlnU3RhdGUodGhpcy5wcm9qZWN0aWxlT2JqZWN0LmN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnN0YXRlLCB0aGlzLnBpZ3NbaV0uc3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJzXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlUGlnc0xlZnQoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5waWdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoY2hlY2tCaXJkQW5kUGlnU3RhdGUodGhpcy5wcm9qZWN0aWxlT2JqZWN0LmN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnN0YXRlLCB0aGlzLnBpZ3NbaV0uc3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5waWdzW2ldLnBvb2ZBbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnBpZ3Muc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tBbmRVcGRhdGVFbnRpdGllc0NvbGxpc2lvbigpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBpZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjaGVja0JpcmRPblBpZ0NvbGxpc2lvbih0aGlzLnByb2plY3RpbGVPYmplY3QuY3VycmVudFByb2plY3RpbGVPYmplY3QsIHRoaXMucGlnc1tpXSkpIHtcbiAgICAgICAgICAgICAgICBiaXJkT25QaWdDb2xsaXNpb25Mb2dpYyh0aGlzLnByb2plY3RpbGVPYmplY3QuY3VycmVudFByb2plY3RpbGVPYmplY3QsIHRoaXMucGlnc1tpXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zY29yZSArPSAzMDAwO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYmxvY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoY2hlY2tCaXJkT25CbG9ja0NvbGxpc2lvbih0aGlzLnByb2plY3RpbGVPYmplY3QuY3VycmVudFByb2plY3RpbGVPYmplY3QsIHRoaXMuYmxvY2tzW2ldKSkge1xuICAgICAgICAgICAgICAgIGJpcmRPbkJsb2NrQ29sbGlzaW9uTG9naWModGhpcy5wcm9qZWN0aWxlT2JqZWN0LmN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LCB0aGlzLmJsb2Nrc1tpXSlcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3JlICs9IDMyNTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlckVudGl0aWVzKCkge1xuICAgICAgICB0aGlzLnByb2plY3RpbGVPYmplY3QucmVuZGVyKClcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBpZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucGlnc1tpXS5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYmxvY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmJsb2Nrc1tpXS5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbmRlclNjb3JlKCk7XG4gICAgICAgIHRoaXMucmVuZGVySGlnaFNjb3JlKCk7XG4gICAgICAgIHRoaXMucmVuZGVyU3RhZ2VOdW1iZXIoKTtcbiAgICB9XG5cbiAgICByZW5kZXJTY29yZSgpIHsgXG4gICAgICAgIHRoaXMuY3R4LnRleHRBbGlnbiA9IFwicmlnaHRcIjtcbiAgICAgICAgdGhpcy5jdHgudGV4dEJhc2VsaW5lID0gXCJ0b3BcIjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJXSElURVwiO1xuICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IFwiQkxBQ0tcIjtcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IDUwICsgXCJweCBCYW5nZXJzXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KHRoaXMuc2NvcmUsIHRoaXMuY2FudmFzLndpZHRoIC0gMzAgLyAyLCAwKVxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KHRoaXMuc2NvcmUsIHRoaXMuY2FudmFzLndpZHRoIC0gMzAgLyAyLCAwKTtcblxuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcInJpZ2h0XCI7XG4gICAgICAgIHRoaXMuY3R4LnRleHRCYXNlbGluZSA9IFwidG9wXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiV0hJVEVcIjtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIkJMQUNLXCI7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSA1MCArIFwicHggQmFuZ2Vyc1wiO1xuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KFwiU2NvcmU6ICAgICAgICAgICAgICAgICAgICAgIFwiLCB0aGlzLmNhbnZhcy53aWR0aCAtIDMwIC8gMiwgMCk7XG4gICAgfVxuXG4gICAgcmVuZGVySGlnaFNjb3JlKCkge1xuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcInJpZ2h0XCI7XG4gICAgICAgIHRoaXMuY3R4LnRleHRCYXNlbGluZSA9IFwidG9wXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiV0hJVEVcIjtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIkJMQUNLXCI7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSA1MCArIFwicHggQmFuZ2Vyc1wiO1xuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dCh0aGlzLmhpZ2hTY29yZSwgdGhpcy5jYW52YXMud2lkdGggLSAzMCAvIDIsIDYwKTtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dCh0aGlzLmhpZ2hTY29yZSwgdGhpcy5jYW52YXMud2lkdGggLSAzMCAvIDIsIDYwKTtcblxuICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSBcInJpZ2h0XCI7XG4gICAgICAgIHRoaXMuY3R4LnRleHRCYXNlbGluZSA9IFwidG9wXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiV0hJVEVcIjtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIkJMQUNLXCI7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSA1MCArIFwicHggQmFuZ2Vyc1wiO1xuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KFwiSGlnaHNjb3JlOiAgICAgICAgICAgICAgICAgICAgICBcIiwgdGhpcy5jYW52YXMud2lkdGggLSAzMCAvIDIsIDYwKTtcbiAgICB9XG5cbiAgICByZW5kZXJTdGFnZU51bWJlcigpIHtcbiAgICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gXCJsZWZ0XCI7XG4gICAgICAgIHRoaXMuY3R4LnRleHRCYXNlbGluZSA9IFwidG9wXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiV0hJVEVcIjtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcIkJMQUNLXCI7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSAzMCArIFwicHggQmFuZ2Vyc1wiO1xuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIkxldmVsIFwiICsgdGhpcy5zdGFnZU51bWJlciwgMTAsIDEwKVxuICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KFwiTGV2ZWwgXCIgKyB0aGlzLnN0YWdlTnVtYmVyLCAgMTAsIDEwKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0YWdlTG9hZGVyOyIsImV4cG9ydCBjb25zdCBzdGFnZUtleXMgPSB7XG4gICAgMSA6IHtcbiAgICAgICAgXCJjdXJyZW50TGV2ZWxIaWdoU2NvcmVLZXlcIjogXCJoaWdoU2NvcmVLZXlMZXZlbDFcIixcbiAgICAgICAgXCJudW1iZXJPZlBpZ3NcIjogMixcbiAgICAgICAgXCJwaWdQcm9wZXJ0aWVzXCI6IHtcbiAgICAgICAgICAgIDAgOiB7XG4gICAgICAgICAgICAgICAgeDogNTAwLFxuICAgICAgICAgICAgICAgIHk6IDYwMCxcbiAgICAgICAgICAgICAgICByYWQ6IDE1LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIDEgOiB7XG4gICAgICAgICAgICAgICAgeDogMTIwMCxcbiAgICAgICAgICAgICAgICB5OiA2MDAsXG4gICAgICAgICAgICAgICAgcmFkOiAxNSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJudW1iZXJPZkJsb2Nrc1wiOiAyLFxuICAgICAgICBcImJsb2NrUHJvcGVyaXRlc1wiOiB7XG4gICAgICAgICAgICAwIDoge1xuICAgICAgICAgICAgICAgIHg6IDM1MCxcbiAgICAgICAgICAgICAgICB5OiA3MDAsXG4gICAgICAgICAgICAgICAgdzogMzAsXG4gICAgICAgICAgICAgICAgaDogMTAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIDE6IHtcbiAgICAgICAgICAgICAgICB4OiA3MDAsXG4gICAgICAgICAgICAgICAgeTogNzAwLFxuICAgICAgICAgICAgICAgIHc6IDUwLFxuICAgICAgICAgICAgICAgIGg6IDE0MCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJiaXJkUHJvcGVydGllc1wiOiB7XG4gICAgICAgICAgICB4OiAxMjAsXG4gICAgICAgICAgICB5OiA2MzAsXG4gICAgICAgICAgICByYWQ6IDE0LFxuICAgICAgICB9XG4gICAgfVxufSIsImV4cG9ydCBjb25zdCBjaGVja0JpcmRPblBpZ0NvbGxpc2lvbiA9IChjdXJyZW50UHJvamVjdGlsZU9iamVjdCwgcGlnKSA9PiB7XG4gICAgaWYgKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnggKyBjdXJyZW50UHJvamVjdGlsZU9iamVjdC5yYWRpdXMgKyBwaWcucmFkaXVzID4gcGlnLnhcbiAgICAgICAgJiYgY3VycmVudFByb2plY3RpbGVPYmplY3QueCA8IHBpZy54ICsgY3VycmVudFByb2plY3RpbGVPYmplY3QucmFkaXVzICsgcGlnLnJhZGl1c1xuICAgICAgICAmJiBjdXJyZW50UHJvamVjdGlsZU9iamVjdC55ICsgY3VycmVudFByb2plY3RpbGVPYmplY3QucmFkaXVzICsgcGlnLnJhZGl1cyA+IHBpZy55XG4gICAgICAgICYmIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnkgPCBwaWcueSArIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnJhZGl1cyArIHBpZy5yYWRpdXMpIFxuICAgIHtcbiAgICAgICAgLy8gcHl0aGFnb3JlYW0gdGhlb3JlbSB0byBiZSBtb3JlIGV4YWN0IG9uIGNvbGxpc2lvblxuICAgICAgICBsZXQgZGlzdGFuY2UgPSBNYXRoLnNxcnQoXG4gICAgICAgICAgICAgICAgKChjdXJyZW50UHJvamVjdGlsZU9iamVjdC54IC0gcGlnLngpICogKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnggLSBwaWcueCkpXG4gICAgICAgICAgICArICgoY3VycmVudFByb2plY3RpbGVPYmplY3QueSAtIHBpZy55KSAqIChjdXJyZW50UHJvamVjdGlsZU9iamVjdC55IC0gcGlnLnkpKVxuICAgICAgICApXG4gICAgICAgIHJldHVybiBkaXN0YW5jZSA8IGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnJhZGl1cyArIHBpZy5yYWRpdXM7IFxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGNoZWNrQmlyZE9uQmxvY2tDb2xsaXNpb24gPSAoY3VycmVudFByb2plY3RpbGVPYmplY3QsIGJsb2NrKSA9PiB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCA0OyBqKyspe1xuICAgICAgICBjb25zdCBjaXJjbGVDZW50ZXIgPSBbY3VycmVudFByb2plY3RpbGVPYmplY3QueCwgY3VycmVudFByb2plY3RpbGVPYmplY3QueV07XG4gICAgICAgIGlmIChqICsgMSA9PT0gNCkge1xuICAgICAgICAgICAgaWYgKGNoZWNrQmlyZEludGVyY2VwdEJsb2NrKGJsb2NrLmdldFBvaW50KGopLCBibG9jay5nZXRQb2ludCgwKSwgY2lyY2xlQ2VudGVyLCBjdXJyZW50UHJvamVjdGlsZU9iamVjdC5yYWRpdXMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoY2hlY2tCaXJkSW50ZXJjZXB0QmxvY2soYmxvY2suZ2V0UG9pbnQoaiksIGJsb2NrLmdldFBvaW50KGogKyAxKSwgY2lyY2xlQ2VudGVyLCBjdXJyZW50UHJvamVjdGlsZU9iamVjdC5yYWRpdXMpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNvbnN0IGNoZWNrQmlyZEludGVyY2VwdEJsb2NrID0gKHBvaW50QSwgcG9pbnRCLCBjaXJjbGVDZW50ZXIsIHJhZGl1cykgPT4ge1xuICAgIGxldCBkaXN0O1xuICAgIGNvbnN0IHZlbDFYID0gcG9pbnRCLnBvcy54IC0gcG9pbnRBLnBvcy54O1xuICAgIGNvbnN0IHZlbDFZID0gcG9pbnRCLnBvcy55IC0gcG9pbnRBLnBvcy55O1xuICAgIGNvbnN0IHZlbDJYID0gY2lyY2xlQ2VudGVyWzBdIC0gcG9pbnRBLnBvcy54O1xuICAgIGNvbnN0IHZlbDJZID0gY2lyY2xlQ2VudGVyWzFdIC0gcG9pbnRBLnBvcy55O1xuICAgIGNvbnN0IHVuaXQgPSAodmVsMlggKiB2ZWwxWCArIHZlbDJZICogdmVsMVkpIC8gKHZlbDFZICogdmVsMVkgKyB2ZWwxWCAqIHZlbDFYKTtcbiAgICBpZiAodW5pdCA+PSAwICYmIHVuaXQgPD0gMSl7XG4gICAgICAgIGRpc3QgPSAocG9pbnRBLnBvcy54ICArIHZlbDFYICogdW5pdCAtIGNpcmNsZUNlbnRlclswXSkgKiogMiArIChwb2ludEEucG9zLnkgKyB2ZWwxWSAqIHVuaXQgLSBjaXJjbGVDZW50ZXJbMV0pICoqIDI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZGlzdCA9IHVuaXQgPCAwID8gXG4gICAgICAgICAgICAocG9pbnRBLnBvcy54IC0gY2lyY2xlQ2VudGVyWzBdKSAqKiAyICsgKHBvaW50QS5wb3MueSAtIGNpcmNsZUNlbnRlclsxXSkgKiogMiA6XG4gICAgICAgICAgICAocG9pbnRCLnBvcy54IC0gY2lyY2xlQ2VudGVyWzBdKSAqKiAyICsgKHBvaW50Qi5wb3MueSAtIGNpcmNsZUNlbnRlclsxXSkgKiogMjtcbiAgICB9XG4gICAgcmV0dXJuIGRpc3QgPCByYWRpdXMgKiByYWRpdXM7XG59XG5cblxuXG5cblxuIiwiZXhwb3J0IGNvbnN0IGJpcmRPblBpZ0NvbGxpc2lvbkxvZ2ljID0gKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LCBwaWcpID0+IHtcbiAgICBwaWcuc3RhdGUgPSBcImRlYWRcIjtcbiAgICBsZXQgbmV3VmVsWDEgPSAoY3VycmVudFByb2plY3RpbGVPYmplY3QudmVsWCAqIChjdXJyZW50UHJvamVjdGlsZU9iamVjdC5tYXNzIC0gcGlnLm1hc3MpICsgKCAyICogcGlnLm1hc3MgKiBwaWcudmVsWCkpIC8gKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0Lm1hc3MgKyBwaWcubWFzcyk7XG4gICAgbGV0IG5ld1ZlbFkxID0gKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFkgKiAoY3VycmVudFByb2plY3RpbGVPYmplY3QubWFzcyAtIHBpZy5tYXNzKSArICggMiAqIHBpZy5tYXNzICogcGlnLnZlbFkpKSAvIChjdXJyZW50UHJvamVjdGlsZU9iamVjdC5tYXNzICsgcGlnLm1hc3MpO1xuICAgIGxldCBuZXdWZWxYMiA9IChwaWcudmVsWCAqIChwaWcubWFzcyAtIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0Lm1hc3MpICsgKDIgKiBjdXJyZW50UHJvamVjdGlsZU9iamVjdC5tYXNzICogY3VycmVudFByb2plY3RpbGVPYmplY3QudmVsWCkpIC8gKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0Lm1hc3MgKyBwaWcubWFzcyk7XG4gICAgbGV0IG5ld1ZlbFkyID0gKHBpZy52ZWxZICogKHBpZy5tYXNzIC0gY3VycmVudFByb2plY3RpbGVPYmplY3QubWFzcykgKyAoMiAqIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0Lm1hc3MgKiBjdXJyZW50UHJvamVjdGlsZU9iamVjdC52ZWxZKSkgLyAoY3VycmVudFByb2plY3RpbGVPYmplY3QubWFzcyArIHBpZy5tYXNzKTtcbiAgICBcbiAgICBjdXJyZW50UHJvamVjdGlsZU9iamVjdC52ZWxYID0gLWN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFg7XG4gICAgY3VycmVudFByb2plY3RpbGVPYmplY3QudmVsWSA9IC1jdXJyZW50UHJvamVjdGlsZU9iamVjdC52ZWxZO1xuICAgIHBpZy52ZWxYID0gbmV3VmVsWDI7XG4gICAgcGlnLnZlbFkgPSBuZXdWZWxZMjtcblxuICAgIGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnggPSBjdXJyZW50UHJvamVjdGlsZU9iamVjdC54ICsgbmV3VmVsWDE7XG4gICAgY3VycmVudFByb2plY3RpbGVPYmplY3QueSA9IGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnkgKyBuZXdWZWxZMTtcbiAgICBwaWcueCA9IHBpZy54ICsgbmV3VmVsWDI7XG4gICAgcGlnLnkgPSBwaWcueSArIG5ld1ZlbFkyO1xufVxuXG5leHBvcnQgY29uc3QgYmlyZE9uQmxvY2tDb2xsaXNpb25Mb2dpYyA9IChjdXJyZW50UHJvamVjdGlsZU9iamVjdCwgYmxvY2spID0+IHtcbiAgICBjdXJyZW50UHJvamVjdGlsZU9iamVjdC52ZWxYID0gLWN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0LnZlbFg7XG4gICAgY3VycmVudFByb2plY3RpbGVPYmplY3QudmVsWSA9IC1jdXJyZW50UHJvamVjdGlsZU9iamVjdC52ZWxZO1xuICAgIGxldCBmb3JjZSA9IGJsb2NrLmFzUG9sYXIoYmxvY2sudmVjdG9yKDEwLCAxMCkpO1xuICAgIGZvcmNlLm1hZyAqPSBibG9jay5tYXNzICogMC4xO1xuICAgIGJsb2NrLmFwcGx5Rm9yY2UoZm9yY2UsIGJsb2NrLnZlY3RvcihjdXJyZW50UHJvamVjdGlsZU9iamVjdC54LCBjdXJyZW50UHJvamVjdGlsZU9iamVjdC55KSk7XG59XG5cblxuIiwiZXhwb3J0IGNvbnN0IGNoZWNrQmlyZEFuZFBpZ1N0YXRlID0gKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0U3RhdGUsIHBpZ1N0YXRlKSA9PiB7XG4gICAgaWYgKGN1cnJlbnRQcm9qZWN0aWxlT2JqZWN0U3RhdGUgPT09IFwiZW5kU3RhdGVcIiAmJiBwaWdTdGF0ZSA9PT0gXCJkZWFkXCIpIHJldHVybiB0cnVlO1xufVxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9zdHlsZXMvaW5kZXguc2Nzc1wiO1xuaW1wb3J0IEFuZ2VyZWRCaXJkcyBmcm9tIFwiLi9zY3JpcHRzL2dhbWVcIjtcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYW52YXNcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGluaXQpO1xuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXNldC1oaWdoc2NvcmVcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlc2V0TG9jYWxTdG9yYWdlKTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBuZXcgQW5nZXJlZEJpcmRzKCkuc3RhcnQoKTtcbn1cblxuZnVuY3Rpb24gcmVzZXRMb2NhbFN0b3JhZ2UoKSB7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5jbGVhcigpO1xufVxuXG4iXSwic291cmNlUm9vdCI6IiJ9