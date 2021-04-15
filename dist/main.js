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
  function Bird(ctx) {
    var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
    var velX = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var velY = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var radius = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 14;
    var color = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : "RED";

    _classCallCheck(this, Bird);

    this._ctx = ctx;
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this._radius = radius;
    this._color = color;
    this._gravity = {
      x: 0,
      y: 0.1
    };
    this._ground = this._ctx.canvas.height;
    this._bounce = 1.3;
    this.bird = new Image();
    this.bird.src = "src/images/birds.png";
  }

  _createClass(Bird, [{
    key: "drawBird",
    value: function drawBird(ctx, x, y) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, this._radius, 0, Math.PI * 2, false);
      ctx.clip();
      ctx.closePath();
      ctx.drawImage(this.bird, x - this._radius, y - this._radius, this._radius * 2, this._radius * 2);
      ctx.restore();
    }
  }, {
    key: "updateBird",
    value: function updateBird() {
      this.velX += this._gravity.x;
      this.velY += this._gravity.y;
      this.x += this.velX;
      this.y += this.velY;

      if (this.y >= this._ground) {
        this.y = this._ground - (this.y - this._ground);
        this.velY = -Math.abs(this.velY) * this._bounce;

        if (this.velY >= this._gravity.y) {
          this.velY = 0;
          this.y = this._ground - this._gravity.y;
        }
      }
    }
  }, {
    key: "animate",
    value: function animate(ctx) {
      this.drawBird(ctx);
      this.updateBird();
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
  function Block(ctx, x, y) {
    var w = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 30;
    var h = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 100;

    _classCallCheck(this, Block);

    this._ctx = ctx;
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
    this._ground = this._ctx.canvas.height - 105;
    this.mass = this.getMass();
  }

  _createClass(Block, [{
    key: "animate",
    value: function animate(ctx) {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.updateBlock();
      this.drawBlock(ctx);
      ctx.restore();

      for (var i = 0; i < 4; i++) {
        var p = this.getPoint(i); // only do one collision per frame or we will end up adding energy

        if (p.pos.x < this.INSET) {
          this.x += this.INSET - p.pos.x;
          this.doCollision(p, 3);
        } else if (p.pos.x > ctx.canvas.width - this.INSET) {
          this.x += ctx.canvas.width - this.INSET - p.pos.x;
          this.doCollision(p, 1);
        } else if (p.pos.y < this.INSET) {
          this.y += this.INSET - p.pos.y;
          this.doCollision(p, 0);
        } else if (p.pos.y > ctx.canvas.height - this.INSET) {
          this.y += ctx.canvas.height - this.INSET - p.pos.y;
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
    key: "drawBlock",
    value: function drawBlock(ctx) {
      ctx.setTransform(1, 0, 0, 1, this.x, this.y);
      ctx.rotate(this.r);
      ctx.fillStyle = "Blue";
      ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
      ctx.strokeRect(-this.w / 2, -this.h / 2, this.w, this.h);
    }
  }, {
    key: "updateBlock",
    value: function updateBlock() {
      this.x += this.dx;
      this.y += this.dy;
      this.dy += 0.061;
      this.r += this.dr; // if (this.y >= this._ground) {
      //     this.y = this._ground 
      // }
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
  }

  _createClass(Canvas, [{
    key: "createCanvas",
    value: function createCanvas() {
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
  function Pig(ctx, x, y) {
    var velX = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var velY = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var radius = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 15;
    var color = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : "ORANGE";

    _classCallCheck(this, Pig);

    this._ctx = ctx;
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this._radius = radius;
    this._mass = 2;
    this._color = color;
    this._gravity = {
      x: 0,
      y: 0.1
    };
    this._ground = this._ctx.canvas.height - 20;
    this._bounce = 0.4;
    this._frictionX = 0.9;
    this._mass = 2;
    this.pig = new Image();
    this.pig.src = "src/images/peppa.png";
  }

  _createClass(Pig, [{
    key: "drawPig",
    value: function drawPig(ctx) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this._radius, 0, Math.PI * 2, false);
      ctx.clip();
      ctx.closePath();
      ctx.drawImage(this.pig, this.x - this._radius, this.y - this._radius, this._radius * 2, this._radius * 2);
      ctx.restore();
    }
  }, {
    key: "updatePig",
    value: function updatePig() {
      this.velX += this._gravity.x;
      this.velY += this._gravity.y;
      this.x += this.velX;
      this.y += this.velY;

      if (this.y >= this._ground) {
        this.y = this._ground - (this.y - this._ground);
        this.velY = -Math.abs(this.velY) * this._bounce;

        if (this.velY >= this._gravity.y) {
          this.velY = 0;
          this.y = this._ground - this._gravity.y;
        }

        if (this.velX > 0) {
          this.velX -= this._frictionX;
        }

        if (this.velX < 0) {
          this.velX += this._frictionX;
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
    key: "animate",
    value: function animate(ctx) {
      this.updatePig();
      this.drawPig(ctx);
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
  function Projectile(ctx, score) {
    _classCallCheck(this, Projectile);

    this._ctx = ctx;
    this.score = 0;
    this.launch = this.launch.bind(this);
    this.birdObjects = [];
    this.max = 1;
    this.currentBird;
  }

  _createClass(Projectile, [{
    key: "launch",
    value: function launch(angleVal, magVal) {
      var angle = Math.PI * angleVal / 180;
      var magnitude = magVal;
      var objLaunch = new ObjectLaunch(this._ctx, 125, 650, new _bird__WEBPACK_IMPORTED_MODULE_0__.default(this._ctx));
      this.birdObjects.push(objLaunch);
      objLaunch.velY = -magnitude * Math.sin(angle);
      objLaunch.velX = magnitude * Math.cos(angle);
      objLaunch.transfer = 0.8;
    }
  }, {
    key: "launchLoop",
    value: function launchLoop(ctx, pigs, blocks) {
      if (this.birdObjects.length > this.max) {
        this.birdObjects[0].remove();
        this.birdObjects = this.birdObjects.splice(1);
      }

      for (var i = 0; i < this.birdObjects.length; i++) {
        var currentBird = this.birdObjects[i];
        currentBird.velY += 1.53;
        currentBird._x += currentBird.velX / 3;
        currentBird._y += currentBird.velY / 3;

        if (currentBird._y + currentBird.type.radius > 700) {
          currentBird._y = 700 - currentBird.type.radius;
        }

        currentBird.updateObject(pigs, blocks, this.score);
        currentBird.drawObjectLaunch(this._ctx);
      }
    }
  }, {
    key: "animate",
    value: function animate(ctx, pigs, blocks) {
      this.launchLoop(ctx, pigs, blocks);
    }
  }]);

  return Projectile;
}();

var ObjectLaunch = /*#__PURE__*/function () {
  function ObjectLaunch(ctx) {
    var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
    var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
    var type = arguments.length > 3 ? arguments[3] : undefined;

    _classCallCheck(this, ObjectLaunch);

    this._ctx = ctx;
    this._x = x;
    this._y = y;
    this.velX = 0;
    this.velY = 0;
    this.type = type;
    this.transfer = 0.9;
    this.removed = false;
    this._gravity = {
      x: 0,
      y: 0.1
    };
    this._ground = this._ctx.canvas.height - 20;
    this._bounce = 0.5;
    this._frictionX = 0.9;
    this._mass = 2;
    this.radius = 14;
    this.birdOnPigCollisionPoints = 5500;
    this.birdOnBlockCollisionPoints = 325;
  }

  _createClass(ObjectLaunch, [{
    key: "remove",
    value: function remove() {
      this.removed = true;
    }
  }, {
    key: "drawObjectLaunch",
    value: function drawObjectLaunch(ctx) {
      this.type.drawBird(ctx, this._x, this._y); // this.drawScore(ctx, 0)
    }
  }, {
    key: "checkBirdOnPigCollision",
    value: function checkBirdOnPigCollision(pigs, score) {
      if (pigs) {
        for (var i = 0; i < pigs.length; i++) {
          if (this._x + this.type._radius + pigs[i]._radius > pigs[i].x && this._x < pigs[i].x + this.type._radius + pigs[i]._radius && this._y + this.type._radius + pigs[i]._radius > pigs[i].y && this._y < pigs[i].y + this.type._radius + pigs[i]._radius) {
            // pythagoream theorem to be more exact on collision
            var distance = Math.sqrt((this._x - pigs[i].x) * (this._x - pigs[i].x) + (this._y - pigs[i].y) * (this._y - pigs[i].y));

            if (distance < this.type._radius + pigs[i]._radius) {
              this.birdOnPigCollisionLogic(pigs[i], score);
            }
          }
        }
      }
    }
  }, {
    key: "checkBirdOnBlockCollision",
    value: function checkBirdOnBlockCollision(blocks, score) {
      if (blocks) {
        for (var i = 0; i < blocks.length; i++) {
          for (var j = 0; j < 4; j++) {
            var circleCenter = [this._x, this._y];

            if (j + 1 === 4) {
              if (this.checkBirdInterceptBlock(blocks[i].getPoint(j), blocks[i].getPoint(0), circleCenter, this.radius)) {
                this.birdOnBlockCollisionLogic(blocks[i], score);
              }
            } else {
              if (this.checkBirdInterceptBlock(blocks[i].getPoint(j), blocks[i].getPoint(j + 1), circleCenter, this.radius)) {
                this.birdOnBlockCollisionLogic(blocks[i], score);
              }
            }
          }
        }
      }
    }
  }, {
    key: "birdOnPigCollisionLogic",
    value: function birdOnPigCollisionLogic(pig, score) {
      score += this.birdOnPigCollisionPoints;
      var mass1 = this.type._radius;
      var mass2 = pig._radius;
      if (pig.velX === 0) pig.velX = 9; // if (pig.velY === 0) pig.velY = 6;
      // const pigVelX = pig.velX;
      // const pigVelY = pig.velY;

      this.velX = -this.velX;
      this.velY = -this.velY;
      pig.velX = -pig.velX;
      pig.velY = -pig.velY; // this.velX = ( this.velX * (mass1 - mass2) + (2 * mass2 * pigVelX)) / (mass1 + mass2);
      // this.velY = ( this.velY * (mass1 - mass2) + (2 * mass2 * pigVelY)) / (mass1 + mass2);
      // pig.velX = ( pigVelX * (mass2 - mass1) + (2 * mass1 * this.velX)) / (mass1 + mass2);
      // pig.velY = ( pigVelY * (mass2 - mass1) + (2 * mass1 * this.velY)) / (mass1 + mass2);

      this._x += this.velX;
      this._y += this.velY;
      pig.x += pig.velX;
      pig.y += pig.velY;
    }
  }, {
    key: "birdOnBlockCollisionLogic",
    value: function birdOnBlockCollisionLogic(block, score) {
      score += this.birdOnBlockCollisionPoints;
      this.velX = -this.velX;
      this.velY = -this.velY;
      this._x += this.velX;
      this._y += this.velY;
    }
  }, {
    key: "checkBirdInterceptBlock",
    value: function checkBirdInterceptBlock(pointA, pointB, circleCenter, radius) {
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
    }
  }, {
    key: "updateObject",
    value: function updateObject(pigs, blocks, score) {
      this.checkBirdOnPigCollision(pigs, score);
      this.checkBirdOnBlockCollision(blocks, score);
      this.velX += this._gravity.x;
      this.velY += this._gravity.y;
      this._x += this.velX;
      this._y += this.velY;

      if (this._y >= this._ground) {
        this._y = this._ground - (this._y - this._ground);
        this.velY = -Math.abs(this.velY) * this._bounce;

        if (this.velY >= this._gravity.y) {
          this.velY = 0;
          this._y = this._ground - this._gravity.y;
        }

        if (this.velX > 0) {
          this.velX -= this._frictionX;
        }

        if (this.velX < 0) {
          this.velX += this._frictionX;
        }
      } // stops ball from bouncing in Y axis


      if (this._y >= this._ground - 10) {
        if (this.velY < 0 && this.velY > -1.1) {
          this.velY = 0;
        }
      } // stops ball from moving on X axis if x-velocity < 1.1


      if (Math.abs(this.velX) < 1.1) {
        this.velX = 0;
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
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var StageLoader = /*#__PURE__*/function () {
  function StageLoader() {
    var numberOfPigs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
    var pigsLocationArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [[500, 600], [600, 600]];
    var numberofBlocks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
    var blockLocationArray = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [[350, 700], [700, 700]];

    _classCallCheck(this, StageLoader);

    this.numberOfPigs = numberOfPigs;
    this.pigsLocationArray = pigsLocationArray;
    this.pigs = [];
    this.numberofBlocks = numberofBlocks;
    this.blockLocationArray = blockLocationArray;
    this.blocks = [];
  }

  _createClass(StageLoader, [{
    key: "drawPigs",
    value: function drawPigs(ctx) {
      if (this.pigs.length === 0) {
        for (var i = 0; i < this.pigsLocationArray.length; i++) {
          this.pigs.push(new _pig__WEBPACK_IMPORTED_MODULE_0__.default(ctx, this.pigsLocationArray[i][0], this.pigsLocationArray[i][1]));
        }
      }
    }
  }, {
    key: "drawBlocks",
    value: function drawBlocks(ctx) {
      if (this.blocks.length === 0) {
        for (var i = 0; i < this.blockLocationArray.length; i++) {
          this.blocks.push(new _block__WEBPACK_IMPORTED_MODULE_1__.default(ctx, this.blockLocationArray[i][0], this.blockLocationArray[i][1]));
        }
      }
    }
  }, {
    key: "animate",
    value: function animate(ctx) {
      this.drawPigs(ctx);

      for (var i = 0; i < this.pigs.length; i++) {
        this.pigs[i].animate(ctx);
      }

      this.drawBlocks(ctx);

      for (var _i = 0; _i < this.blocks.length; _i++) {
        this.blocks[_i].animate(ctx);
      }
    }
  }]);

  return StageLoader;
}();

/* harmony default export */ __webpack_exports__["default"] = (StageLoader);

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
/* harmony import */ var _scripts_canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/canvas */ "./src/scripts/canvas.js");
/* harmony import */ var _scripts_projectile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/projectile */ "./src/scripts/projectile.js");
/* harmony import */ var _scripts_stageLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scripts/stageLoader */ "./src/scripts/stageLoader.js");



 // const currentStateObj = {
//   currentExample: null,
//   currentEventListeners: [],
// };

var deltaX, deltaY;
var centerX = 104.70;
var centerY = 455;
var score = 0;
document.querySelector("#canvas").addEventListener("click", startCanvas);

function startCanvas() {
  // unregisterEventListeners();
  var canvas = new _scripts_canvas__WEBPACK_IMPORTED_MODULE_1__.default();
  canvas.createCanvas();
  var canvasObj = canvas.canvas;
  var canvasPosition = canvasObj.getBoundingClientRect();
  var projectile = new _scripts_projectile__WEBPACK_IMPORTED_MODULE_2__.default(canvas.ctx, score);
  var mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
  };
  canvasObj.addEventListener('mousedown', function (e) {
    mouse.x = e.x - canvasPosition.left;
    mouse.y = e.y - canvasPosition.top;
  });
  canvasObj.addEventListener('mouseup', function (e) {
    mouse.x = e.x - canvasPosition.left;
    mouse.y = e.y - canvasPosition.top;
    deltaX = mouse.x - centerX;
    deltaY = mouse.y - centerY;
    var thetaRadian = Math.atan2(deltaY, deltaX);
    var degrees = -((Math.abs(thetaRadian * 180 / Math.PI) - 270) % 90);
    projectile.launch(degrees, Math.abs(mouse.x - 130) / 2);
  });
  var stageLoader = new _scripts_stageLoader__WEBPACK_IMPORTED_MODULE_3__.default();
  var animating = true;

  var animation = function animation() {
    canvas.clearCanvas();

    if (animating) {
      var img = new Image();
      img.src = "src/images/pixil-layer-Background.png";
      canvas.ctx.drawImage(img, 90, 570);
      stageLoader.animate(canvas.ctx);
      projectile.animate(canvas.ctx, stageLoader.pigs, stageLoader.blocks);
      drawScore(canvas.ctx, score);
      window.requestAnimationFrame(animation);
    }
  };

  window.requestAnimationFrame(animation);
}

function drawScore(ctx, score) {
  ctx.textAlign = "right";
  ctx.textBaseline = "top";
  ctx.fillStyle = "WHITE";
  ctx.font = 50 + "px dejavu sans mono";
  ctx.fillText(score, ctx.canvas.width - 50 / 2, 0);
} // function unregisterEventListeners() {
//   while (currentStateObj.currentEventListeners.length) {
//     let [
//       selector,
//       event,
//       handler,
//     ] = currentStateObj.currentEventListeners.pop();
//     if (selector === "window") {
//       window.removeEventListener(event, handler);
//       console.log(handler);
//     } else {
//       document.querySelector(selector).removeEventListener(event, handler);
//     }
//   }
// }
// function clearDemo() {
//   if (currentStateObj.currentExample === "CANVASDEMO")
//     document.body.removeChild(document.querySelector("canvas"));
//   if (currentStateObj.currentExample === "DOMDEMO") {
//     [...document.querySelectorAll(".card")].forEach((elem) =>
//       document.body.removeChild(elem)
//     );
//   }
// }
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYmlyZC5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYmxvY2suanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi8uL3NyYy9zY3JpcHRzL2NhbnZhcy5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvcGlnLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9wcm9qZWN0aWxlLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9zdGFnZUxvYWRlci5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiQmlyZCIsImN0eCIsIngiLCJ5IiwidmVsWCIsInZlbFkiLCJyYWRpdXMiLCJjb2xvciIsIl9jdHgiLCJfcmFkaXVzIiwiX2NvbG9yIiwiX2dyYXZpdHkiLCJfZ3JvdW5kIiwiY2FudmFzIiwiaGVpZ2h0IiwiX2JvdW5jZSIsImJpcmQiLCJJbWFnZSIsInNyYyIsInNhdmUiLCJiZWdpblBhdGgiLCJhcmMiLCJNYXRoIiwiUEkiLCJjbGlwIiwiY2xvc2VQYXRoIiwiZHJhd0ltYWdlIiwicmVzdG9yZSIsImFicyIsImRyYXdCaXJkIiwidXBkYXRlQmlyZCIsIkJsb2NrIiwidyIsImgiLCJyIiwiZHgiLCJkeSIsImRyIiwiSU5TRVQiLCJQSTkwIiwiUEkyIiwiV0FMTF9OT1JNUyIsIm1hc3MiLCJnZXRNYXNzIiwic2V0VHJhbnNmb3JtIiwidXBkYXRlQmxvY2siLCJkcmF3QmxvY2siLCJpIiwicCIsImdldFBvaW50IiwicG9zIiwiZG9Db2xsaXNpb24iLCJ3aWR0aCIsInJvdGF0ZSIsImZpbGxTdHlsZSIsImZpbGxSZWN0Iiwic3Ryb2tlUmVjdCIsIndoaWNoIiwieHgiLCJ5eSIsInZlbG9jaXR5QSIsInZlbG9jaXR5VCIsInZlbG9jaXR5IiwiY29zIiwic2luIiwiZGV0YWlscyIsImFzUG9sYXIiLCJ2ZWN0b3IiLCJwb2xhciIsIm1hZyIsImRpciIsInZlY3RvckFkZCIsInZhbGlkYXRlUG9sYXIiLCJ2ZWMiLCJpc1BvbGFyIiwicFZlYyIsInJldFYiLCJpc0NhcnQiLCJjYXJ0VG9Qb2xhciIsInVuZGVmaW5lZCIsInBvbGFyVG9DYXJ0IiwiYXRhbjIiLCJoeXBvdCIsInZlYzEiLCJ2ZWMyIiwidjEiLCJhc0NhcnQiLCJ2MiIsImZvcmNlIiwibG9jIiwibCIsInRvQ2VudGVyIiwicGhldGEiLCJGdiIsIkZhIiwiYWNjZWwiLCJkZWx0YVYiLCJhY2NlbEEiLCJ2IiwiZDEiLCJkMiIsImFsb25nIiwidGFuZ2VudCIsInBvaW50RGV0YWlscyIsIndhbGxJbmRleCIsInZ2IiwidmEiLCJ2dmMiLCJ2ZWN0b3JDb21wb25lbnRzRm9yRGlyIiwidmFjIiwiYXBwbHlGb3JjZSIsIkNhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImdldENvbnRleHQiLCJib2R5IiwiYXBwZW5kIiwiY2xhc3NMaXN0IiwiYWRkIiwiY2xlYXJSZWN0IiwiUGlnIiwiX21hc3MiLCJfZnJpY3Rpb25YIiwicGlnIiwidXBkYXRlUGlnIiwiZHJhd1BpZyIsIlByb2plY3RpbGUiLCJzY29yZSIsImxhdW5jaCIsImJpbmQiLCJiaXJkT2JqZWN0cyIsIm1heCIsImN1cnJlbnRCaXJkIiwiYW5nbGVWYWwiLCJtYWdWYWwiLCJhbmdsZSIsIm1hZ25pdHVkZSIsIm9iakxhdW5jaCIsIk9iamVjdExhdW5jaCIsInB1c2giLCJ0cmFuc2ZlciIsInBpZ3MiLCJibG9ja3MiLCJsZW5ndGgiLCJyZW1vdmUiLCJzcGxpY2UiLCJfeCIsIl95IiwidHlwZSIsInVwZGF0ZU9iamVjdCIsImRyYXdPYmplY3RMYXVuY2giLCJsYXVuY2hMb29wIiwicmVtb3ZlZCIsImJpcmRPblBpZ0NvbGxpc2lvblBvaW50cyIsImJpcmRPbkJsb2NrQ29sbGlzaW9uUG9pbnRzIiwiZGlzdGFuY2UiLCJzcXJ0IiwiYmlyZE9uUGlnQ29sbGlzaW9uTG9naWMiLCJqIiwiY2lyY2xlQ2VudGVyIiwiY2hlY2tCaXJkSW50ZXJjZXB0QmxvY2siLCJiaXJkT25CbG9ja0NvbGxpc2lvbkxvZ2ljIiwibWFzczEiLCJtYXNzMiIsImJsb2NrIiwicG9pbnRBIiwicG9pbnRCIiwiZGlzdCIsInZlbDFYIiwidmVsMVkiLCJ2ZWwyWCIsInZlbDJZIiwidW5pdCIsImNoZWNrQmlyZE9uUGlnQ29sbGlzaW9uIiwiY2hlY2tCaXJkT25CbG9ja0NvbGxpc2lvbiIsIlN0YWdlTG9hZGVyIiwibnVtYmVyT2ZQaWdzIiwicGlnc0xvY2F0aW9uQXJyYXkiLCJudW1iZXJvZkJsb2NrcyIsImJsb2NrTG9jYXRpb25BcnJheSIsImRyYXdQaWdzIiwiYW5pbWF0ZSIsImRyYXdCbG9ja3MiLCJkZWx0YVgiLCJkZWx0YVkiLCJjZW50ZXJYIiwiY2VudGVyWSIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwic3RhcnRDYW52YXMiLCJjcmVhdGVDYW52YXMiLCJjYW52YXNPYmoiLCJjYW52YXNQb3NpdGlvbiIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInByb2plY3RpbGUiLCJtb3VzZSIsImUiLCJsZWZ0IiwidG9wIiwidGhldGFSYWRpYW4iLCJkZWdyZWVzIiwic3RhZ2VMb2FkZXIiLCJhbmltYXRpbmciLCJhbmltYXRpb24iLCJjbGVhckNhbnZhcyIsImltZyIsImRyYXdTY29yZSIsIndpbmRvdyIsInJlcXVlc3RBbmlt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QVcsQ0FBQ3BCLE9BQVosQ0FBb0J4SyxNQUFNLENBQUNaLEdBQTNCO0FBQ0FpTSxnQkFBVSxDQUFDYixPQUFYLENBQW1CeEssTUFBTSxDQUFDWixHQUExQixFQUErQndNLFdBQVcsQ0FBQzVELElBQTNDLEVBQWlENEQsV0FBVyxDQUFDM0QsTUFBN0Q7QUFDQWdFLGVBQVMsQ0FBQ2pNLE1BQU0sQ0FBQ1osR0FBUixFQUFhOEgsS0FBYixDQUFUO0FBRUFnRixZQUFNLENBQUNDLHFCQUFQLENBQTZCTCxTQUE3QjtBQUNIO0FBQ0osR0FaRDs7QUFjQUksUUFBTSxDQUFDQyxxQkFBUCxDQUE2QkwsU0FBN0I7QUFDSDs7QUFFRCxTQUFTRyxTQUFULENBQW1CN00sR0FBbkIsRUFBd0I4SCxLQUF4QixFQUErQjtBQUMzQjlILEtBQUcsQ0FBQ2dOLFNBQUosR0FBZ0IsT0FBaEI7QUFDQWhOLEtBQUcsQ0FBQ2lOLFlBQUosR0FBbUIsS0FBbkI7QUFDQWpOLEtBQUcsQ0FBQ3FELFNBQUosR0FBZ0IsT0FBaEI7QUFDQXJELEtBQUcsQ0FBQ2tOLElBQUosR0FBVyxLQUFLLHFCQUFoQjtBQUNBbE4sS0FBRyxDQUFDbU4sUUFBSixDQUFhckYsS0FBYixFQUFvQjlILEdBQUcsQ0FBQ1ksTUFBSixDQUFXdUMsS0FBWCxHQUFtQixLQUFLLENBQTVDLEVBQStDLENBQS9DO0FBQ0gsQyxDQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBCaXJkIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgsIHggPSAxMDAsIHkgPSAxMDAsIHZlbFggPSAwLCB2ZWxZID0gMCwgcmFkaXVzID0gMTQsIGNvbG9yID0gXCJSRURcIikge1xuICAgICAgICB0aGlzLl9jdHggPSBjdHg7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMudmVsWCA9IHZlbFg7XG4gICAgICAgIHRoaXMudmVsWSA9IHZlbFk7XG4gICAgICAgIHRoaXMuX3JhZGl1cyA9IHJhZGl1cztcbiAgICAgICAgdGhpcy5fY29sb3IgPSBjb2xvcjtcblxuICAgICAgICB0aGlzLl9ncmF2aXR5ID0geyB4OiAwLCB5OiAwLjEgfTtcbiAgICAgICAgdGhpcy5fZ3JvdW5kID0gdGhpcy5fY3R4LmNhbnZhcy5oZWlnaHQ7XG4gICAgICAgIHRoaXMuX2JvdW5jZSA9IDEuMztcbiAgICAgICAgdGhpcy5iaXJkID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMuYmlyZC5zcmMgPSBcInNyYy9pbWFnZXMvYmlyZHMucG5nXCJcbiAgICB9XG5cbiAgICBkcmF3QmlyZChjdHgsIHgsIHkpIHtcbiAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKHgsIHksIHRoaXMuX3JhZGl1cywgMCwgKE1hdGguUEkgKiAyKSwgZmFsc2UpO1xuICAgICAgICBjdHguY2xpcCgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5iaXJkLCB4IC0gdGhpcy5fcmFkaXVzLCB5IC0gdGhpcy5fcmFkaXVzLCB0aGlzLl9yYWRpdXMgKiAyLCB0aGlzLl9yYWRpdXMgKiAyKVxuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZUJpcmQoKSB7XG4gICAgICAgIHRoaXMudmVsWCArPSB0aGlzLl9ncmF2aXR5Lng7XG4gICAgICAgIHRoaXMudmVsWSArPSB0aGlzLl9ncmF2aXR5Lnk7XG4gICAgICAgIHRoaXMueCArPSB0aGlzLnZlbFg7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLnZlbFk7XG5cbiAgICAgICAgaWYgKHRoaXMueSA+PSB0aGlzLl9ncm91bmQpIHtcbiAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuX2dyb3VuZCAtICh0aGlzLnkgLSB0aGlzLl9ncm91bmQpO1xuICAgICAgICAgICAgdGhpcy52ZWxZID0gLU1hdGguYWJzKHRoaXMudmVsWSkgKiB0aGlzLl9ib3VuY2U7XG4gICAgICAgICAgICBpZiAodGhpcy52ZWxZID49IHRoaXMuX2dyYXZpdHkueSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVsWSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5fZ3JvdW5kIC0gdGhpcy5fZ3Jhdml0eS55O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYW5pbWF0ZShjdHgpIHtcbiAgICAgICAgdGhpcy5kcmF3QmlyZChjdHgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUJpcmQoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJpcmQ7IiwiY2xhc3MgQmxvY2sge1xuICAgIGNvbnN0cnVjdG9yKGN0eCwgeCwgeSwgdyA9IDMwLCBoID0gMTAwKSB7XG4gICAgICAgIHRoaXMuX2N0eCA9IGN0eDtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy53ID0gdztcbiAgICAgICAgdGhpcy5oID0gaDtcbiAgICAgICAgdGhpcy5yID0gMC4xO1xuICAgICAgICB0aGlzLmR4ID0gMDtcbiAgICAgICAgdGhpcy5keSA9IDA7XG4gICAgICAgIHRoaXMuZHIgPSAwO1xuICAgICAgICB0aGlzLklOU0VUID0gMTA7XG4gICAgICAgIHRoaXMuUEkgPSBNYXRoLlBJO1xuICAgICAgICB0aGlzLlBJOTAgPSBNYXRoLlBJIC8gMjtcbiAgICAgICAgdGhpcy5QSTIgPSBNYXRoLlBJICogMjtcbiAgICAgICAgdGhpcy5XQUxMX05PUk1TID0gWyBNYXRoLlBJIC8gMiwgTWF0aC5QSSwgLShNYXRoLlBJIC8gMiksIDBdXG4gICAgICAgIHRoaXMuX2dyb3VuZCA9IHRoaXMuX2N0eC5jYW52YXMuaGVpZ2h0IC0gMTA1O1xuICAgICAgICB0aGlzLm1hc3MgPSB0aGlzLmdldE1hc3MoKVxuICAgIH1cblxuICAgIGFuaW1hdGUoY3R4KSB7XG4gICAgICAgIGN0eC5zYXZlKClcbiAgICAgICAgY3R4LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTtcbiAgICAgICAgdGhpcy51cGRhdGVCbG9jaygpO1xuICAgICAgICB0aGlzLmRyYXdCbG9jayhjdHgpO1xuICAgICAgICBjdHgucmVzdG9yZSgpXG5cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDQ7IGkrKyl7XG4gICAgICAgICAgICB2YXIgcCA9IHRoaXMuZ2V0UG9pbnQoaSk7XG4gICAgICAgICAgICAvLyBvbmx5IGRvIG9uZSBjb2xsaXNpb24gcGVyIGZyYW1lIG9yIHdlIHdpbGwgZW5kIHVwIGFkZGluZyBlbmVyZ3lcbiAgICAgICAgICAgIGlmKHAucG9zLnggPCB0aGlzLklOU0VUKXtcbiAgICAgICAgICAgICAgICB0aGlzLnggKz0gKHRoaXMuSU5TRVQpIC0gcC5wb3MueDtcbiAgICAgICAgICAgICAgICB0aGlzLmRvQ29sbGlzaW9uKHAsMylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoIHAucG9zLnggPiBjdHguY2FudmFzLndpZHRoLXRoaXMuSU5TRVQpe1xuICAgICAgICAgICAgICAgIHRoaXMueCArPSAoY3R4LmNhbnZhcy53aWR0aCAtIHRoaXMuSU5TRVQpIC0gcC5wb3MueDtcbiAgICAgICAgICAgICAgICB0aGlzLmRvQ29sbGlzaW9uKHAsMSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYocC5wb3MueSA8IHRoaXMuSU5TRVQpe1xuICAgICAgICAgICAgICAgIHRoaXMueSArPSAodGhpcy5JTlNFVCkgLSBwLnBvcy55O1xuICAgICAgICAgICAgICAgIHRoaXMuZG9Db2xsaXNpb24ocCwwKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiggcC5wb3MueSA+IGN0eC5jYW52YXMuaGVpZ2h0IC0gdGhpcy5JTlNFVCl7XG4gICAgICAgICAgICAgICAgdGhpcy55ICs9IChjdHguY2FudmFzLmhlaWdodCAtIHRoaXMuSU5TRVQpIC0gcC5wb3MueTtcbiAgICAgICAgICAgICAgICB0aGlzLmRvQ29sbGlzaW9uKHAsMilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldE1hc3MoKSB7XG4gICAgICAgIHJldHVybiAoIHRoaXMudyAqIHRoaXMuaCAqIHRoaXMuaCkgLyAxMDAwO1xuICAgIH1cblxuICAgIGRyYXdCbG9jayhjdHgpIHtcbiAgICAgICAgY3R4LnNldFRyYW5zZm9ybSgxLDAsMCwxLHRoaXMueCx0aGlzLnkpO1xuICAgICAgICBjdHgucm90YXRlKHRoaXMucik7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIkJsdWVcIjtcbiAgICAgICAgY3R4LmZpbGxSZWN0KC10aGlzLncvMiwgLXRoaXMuaC8yLCB0aGlzLncsIHRoaXMuaClcbiAgICAgICAgY3R4LnN0cm9rZVJlY3QoLXRoaXMudy8yLCAtdGhpcy5oLzIsIHRoaXMudywgdGhpcy5oKVxuICAgIH1cblxuICAgIHVwZGF0ZUJsb2NrKCkge1xuICAgICAgICB0aGlzLnggKz0gdGhpcy5keDtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMuZHk7XG4gICAgICAgIHRoaXMuZHkgKz0gMC4wNjE7XG4gICAgICAgIHRoaXMuciArPSB0aGlzLmRyO1xuXG4gICAgICAgIC8vIGlmICh0aGlzLnkgPj0gdGhpcy5fZ3JvdW5kKSB7XG4gICAgICAgIC8vICAgICB0aGlzLnkgPSB0aGlzLl9ncm91bmQgXG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICBnZXRQb2ludCh3aGljaCkge1xuICAgICAgICB2YXIgZHgsIGR5LCB4LCB5LCB4eCwgeXksIHZlbG9jaXR5QSwgdmVsb2NpdHlULCB2ZWxvY2l0eTtcblxuICAgICAgICBkeCA9IE1hdGguY29zKHRoaXMucik7XG4gICAgICAgIGR5ID0gTWF0aC5zaW4odGhpcy5yKTtcblxuICAgICAgICBzd2l0Y2ggKHdoaWNoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgeCA9IC10aGlzLncgLyAyO1xuICAgICAgICAgICAgICAgIHkgPSAtdGhpcy5oIC8gMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICB4ID0gdGhpcy53IC8gMjtcbiAgICAgICAgICAgICAgICB5ID0gLXRoaXMuaCAvIDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgeCA9IHRoaXMudyAvIDI7XG4gICAgICAgICAgICAgICAgeSA9IHRoaXMuaCAvIDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgeCA9IC10aGlzLncgLyAyO1xuICAgICAgICAgICAgICAgIHkgPSB0aGlzLmggLyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHggPSB0aGlzLng7XG4gICAgICAgICAgICAgICAgeSA9IHRoaXMueTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB4eCAsIHl5O1xuICAgICAgICB4eCA9IHggKiBkeCArIHkgKiAtZHk7XG4gICAgICAgIHl5ID0geCAqIGR5ICsgeSAqIGR4O1xuXG4gICAgICAgIHZhciBkZXRhaWxzID0gdGhpcy5hc1BvbGFyKHRoaXMudmVjdG9yKHh4LCB5eSkpO1xuXG4gICAgICAgIHh4ICs9IHRoaXMueDtcbiAgICAgICAgeXkgKz0gdGhpcy55O1xuXG4gICAgICAgIHZlbG9jaXR5QSA9IHRoaXMucG9sYXIoZGV0YWlscy5tYWcgKiB0aGlzLmRyLCBkZXRhaWxzLmRpciArIHRoaXMuUEk5MCk7XG4gICAgICAgIHZlbG9jaXR5VCA9IHRoaXMudmVjdG9yQWRkKHZlbG9jaXR5ID0gdGhpcy52ZWN0b3IodGhpcy5keCwgdGhpcy5keSksIHZlbG9jaXR5QSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZlbG9jaXR5OiB2ZWxvY2l0eSxcbiAgICAgICAgICAgIHZlbG9jaXR5VDogdmVsb2NpdHlULFxuICAgICAgICAgICAgdmVsb2NpdHlBIDogdmVsb2NpdHlBLFxuICAgICAgICAgICAgcG9zOiB0aGlzLnZlY3Rvcih4eCwgeXkpLFxuICAgICAgICAgICAgcmFkaXVzOiBkZXRhaWxzLm1hZ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcG9sYXIobWFnID0gMSwgZGlyID0gMCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZVBvbGFyKHtkaXI6IGRpciwgbWFnOiBtYWd9KVxuICAgIH1cblxuICAgIHZlY3Rvcih4ID0gMSwgeSA9IDApIHtcbiAgICAgICAgcmV0dXJuIHsgeDogeCwgeTogeX07XG4gICAgfVxuXG4gICAgdmFsaWRhdGVQb2xhcih2ZWMpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNQb2xhcih2ZWMpKSB7XG4gICAgICAgICAgICBpZih2ZWMubWFnIDwgMCl7XG4gICAgICAgICAgICAgICAgdmVjLm1hZyA9IC12ZWMubWFnO1xuICAgICAgICAgICAgICAgIHZlYy5kaXIgKz0gdGhpcy5QSTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmVjO1xuICAgIH1cblxuICAgIHBvbGFyVG9DYXJ0KHBWZWMsIHJldFYgPSB7eDogMCwgeTogMH0pe1xuICAgICAgICByZXRWLnggPSBNYXRoLmNvcyhwVmVjLmRpcikgKiBwVmVjLm1hZztcbiAgICAgICAgcmV0Vi55ID0gTWF0aC5zaW4ocFZlYy5kaXIpICogcFZlYy5tYWc7XG4gICAgICAgIHJldHVybiByZXRWXG4gICAgfVxuXG4gICAgYXNQb2xhcih2ZWMpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNDYXJ0KHZlYykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhcnRUb1BvbGFyKHZlYylcbiAgICAgICAgfVxuICAgICAgICBpZiAodmVjLm1hZyA8IDApIHtcbiAgICAgICAgICAgIHZlYy5tYWcgPSAtdmVjLm1hZztcbiAgICAgICAgICAgIHZlYy5kaXIgKz0gdGhpcy5QSTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBkaXI6IHZlYy5kaXIsIG1hZzogdmVjLm1hZ307XG4gICAgfVxuXG4gICAgaXNDYXJ0KHZlYykgeyBpZih2ZWMueCAhPT0gdW5kZWZpbmVkICYmIHZlYy55ICE9PSB1bmRlZmluZWQpIHsgcmV0dXJuIHRydWU7IH0gcmV0dXJuIGZhbHNlOyB9XG4gICAgaXNQb2xhcih2ZWMpIHsgaWYodmVjLm1hZyAhPT0gdW5kZWZpbmVkICYmIHZlYy5kaXIgIT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdHJ1ZTsgfSByZXR1cm4gZmFsc2U7IH1cbiAgICBhc0NhcnQodmVjKSB7XG4gICAgICAgIGlmICh0aGlzLmlzUG9sYXIodmVjKSkge3JldHVybiB0aGlzLnBvbGFyVG9DYXJ0KHZlYyl9XG4gICAgICAgIHJldHVybiB7eDogdmVjLngsIHk6IHZlYy55fVxuICAgIH1cbiAgICBjYXJ0VG9Qb2xhcih2ZWMsIHJldFYgPSB7ZGlyOiAwLCBtYWc6IDB9KSB7XG4gICAgICAgIHJldFYuZGlyID0gTWF0aC5hdGFuMih2ZWMueSwgdmVjLngpO1xuICAgICAgICByZXRWLm1hZyA9IE1hdGguaHlwb3QodmVjLngsIHZlYy55KTtcbiAgICAgICAgcmV0dXJuIHJldFY7XG4gICAgfVxuXG4gICAgdmVjdG9yQWRkKHZlYzEsIHZlYzIpIHtcbiAgICAgICAgdmFyIHYxID0gdGhpcy5hc0NhcnQodmVjMSk7XG4gICAgICAgIHZhciB2MiA9IHRoaXMuYXNDYXJ0KHZlYzIpO1xuICAgICAgICByZXR1cm4gdGhpcy52ZWN0b3IodjEueCArIHYyLngsIHYxLnkgKyB2Mi55KVxuICAgIH1cblxuICAgIGFwcGx5Rm9yY2UoZm9yY2UsIGxvYykge1xuICAgICAgICB0aGlzLnZhbGlkYXRlUG9sYXIoZm9yY2UpO1xuICAgICAgICB2YXIgbCA9IHRoaXMuYXNDYXJ0KGxvYyk7XG4gICAgICAgIHZhciB0b0NlbnRlciA9IHRoaXMuYXNQb2xhcih0aGlzLnZlY3Rvcih0aGlzLnggLSBsLngsIHRoaXMueSAtIGwueSkpO1xuICAgICAgICB2YXIgcGhldGEgPSB0b0NlbnRlci5kaXIgLSBmb3JjZS5kaXI7XG4gICAgICAgIHZhciBGdiA9IE1hdGguY29zKHBoZXRhKSAqIGZvcmNlLm1hZztcbiAgICAgICAgdmFyIEZhID0gTWF0aC5zaW4ocGhldGEpICogZm9yY2UubWFnO1xuICAgICAgICB2YXIgYWNjZWwgPSB0aGlzLmFzUG9sYXIodG9DZW50ZXIpO1xuICAgICAgICBhY2NlbC5tYWcgPSBGdiAvIHRoaXMubWFzczsgXG4gICAgICAgIHZhciBkZWx0YVYgPSB0aGlzLmFzQ2FydChhY2NlbCk7IFxuICAgICAgICB0aGlzLmR4ICs9IGRlbHRhVi54IFxuICAgICAgICB0aGlzLmR5ICs9IGRlbHRhVi55XG4gICAgICAgIHZhciBhY2NlbEEgPSBGYSAvICh0b0NlbnRlci5tYWcgICogdGhpcy5tYXNzKTsgXG4gICAgICAgIHRoaXMuZHIgKz0gYWNjZWxBO1xuICAgIH1cblxuICAgIHZlY3RvckNvbXBvbmVudHNGb3JEaXIodmVjLCBkaXIpIHtcbiAgICAgICAgdmFyIHYgPSB0aGlzLmFzUG9sYXIodmVjKTsgXG4gICAgICAgIHZhciBwaGV0YSA9IHYuZGlyIC0gZGlyO1xuICAgICAgICB2YXIgRnYgPSBNYXRoLmNvcyhwaGV0YSkgKiB2Lm1hZztcbiAgICAgICAgdmFyIEZhID0gTWF0aC5zaW4ocGhldGEpICogdi5tYWc7XG5cbiAgICAgICAgdmFyIGQxID0gZGlyO1xuICAgICAgICB2YXIgZDIgPSBkaXIgKyB0aGlzLlBJOTA7ICAgIFxuICAgICAgICBpZihGdiA8IDApe1xuICAgICAgICAgICAgZDEgKz0gdGhpcy5QSTtcbiAgICAgICAgICAgIEZ2ID0gLUZ2O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoRmEgPCAwKXtcbiAgICAgICAgICAgIGQyICs9IHRoaXMuUEk7XG4gICAgICAgICAgICBGYSA9IC1GYTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWxvbmcgOiB0aGlzLnBvbGFyKEZ2LGQxKSxcbiAgICAgICAgICAgIHRhbmdlbnQgOiB0aGlzLnBvbGFyKEZhLGQyKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGRvQ29sbGlzaW9uKHBvaW50RGV0YWlscywgd2FsbEluZGV4KSB7XG4gICAgICAgIHZhciB2diA9IHRoaXMuYXNQb2xhcihwb2ludERldGFpbHMudmVsb2NpdHkpOyBcbiAgICAgICAgdmFyIHZhID0gdGhpcy5hc1BvbGFyKHBvaW50RGV0YWlscy52ZWxvY2l0eUEpOyBcbiAgICAgICAgdmFyIHZ2YyA9IHRoaXMudmVjdG9yQ29tcG9uZW50c0ZvckRpcih2diwgdGhpcy5XQUxMX05PUk1TW3dhbGxJbmRleF0pO1xuICAgICAgICB2YXIgdmFjID0gdGhpcy52ZWN0b3JDb21wb25lbnRzRm9yRGlyKHZhLCB0aGlzLldBTExfTk9STVNbd2FsbEluZGV4XSk7XG5cbiAgICAgICAgdnZjLmFsb25nLm1hZyAqPSAxLjE4OyBcbiAgICAgICAgdmFjLmFsb25nLm1hZyAqPSAxLjE4OyBcblxuICAgICAgICB2dmMuYWxvbmcubWFnICo9IHRoaXMubWFzcztcbiAgICAgICAgdmFjLmFsb25nLm1hZyAqPSB0aGlzLm1hc3M7XG5cbiAgICAgICAgdnZjLmFsb25nLmRpciArPSB0aGlzLlBJO1xuICAgICAgICB2YWMuYWxvbmcuZGlyICs9IHRoaXMuUEk7XG5cbiAgICAgICAgdnZjLnRhbmdlbnQubWFnICo9IDAuMTg7ICBcbiAgICAgICAgdmFjLnRhbmdlbnQubWFnICo9IDAuMTg7XG4gICAgICAgIHZ2Yy50YW5nZW50Lm1hZyAqPSB0aGlzLm1hc3MgIFxuICAgICAgICB2YWMudGFuZ2VudC5tYWcgKj0gdGhpcy5tYXNzXG4gICAgICAgIHZ2Yy50YW5nZW50LmRpciArPSB0aGlzLlBJOyBcbiAgICAgICAgdmFjLnRhbmdlbnQuZGlyICs9IHRoaXMuUEk7XG5cbiAgICAgICAgdGhpcy5hcHBseUZvcmNlKHZ2Yy5hbG9uZywgcG9pbnREZXRhaWxzLnBvcykgICAgXG4gICAgICAgIHRoaXMuYXBwbHlGb3JjZSh2dmMudGFuZ2VudCwgcG9pbnREZXRhaWxzLnBvcykgICAgXG4gICAgICAgIHRoaXMuYXBwbHlGb3JjZSh2YWMuYWxvbmcsIHBvaW50RGV0YWlscy5wb3MpICAgIFxuICAgICAgICB0aGlzLmFwcGx5Rm9yY2UodmFjLnRhbmdlbnQsIHBvaW50RGV0YWlscy5wb3MpICAgIFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmxvY2siLCJjbGFzcyBDYW52YXMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gMTQwMDtcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gNzUwO1xuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB9XG5cbiAgICBjcmVhdGVDYW52YXMoKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKHRoaXMuY2FudmFzKTtcbiAgICAgICAgdGhpcy5jYW52YXMuY2xhc3NMaXN0LmFkZChcIm1haW4tY2FudmFzXCIpXG4gICAgfVxuXG4gICAgY2xlYXJDYW52YXMoKSB7XG4gICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhbnZhcztcbiIsImNsYXNzIFBpZyB7XG4gICAgY29uc3RydWN0b3IoY3R4LCB4LCB5LCB2ZWxYID0gMCwgdmVsWSA9IDAsIHJhZGl1cyA9IDE1LCBjb2xvciA9IFwiT1JBTkdFXCIpIHtcbiAgICAgICAgdGhpcy5fY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLnZlbFggPSB2ZWxYO1xuICAgICAgICB0aGlzLnZlbFkgPSB2ZWxZO1xuICAgICAgICB0aGlzLl9yYWRpdXMgPSByYWRpdXM7XG4gICAgICAgIHRoaXMuX21hc3MgPSAyO1xuICAgICAgICB0aGlzLl9jb2xvciA9IGNvbG9yO1xuXG4gICAgICAgIHRoaXMuX2dyYXZpdHkgPSB7IHg6IDAsIHk6IDAuMSB9O1xuICAgICAgICB0aGlzLl9ncm91bmQgPSB0aGlzLl9jdHguY2FudmFzLmhlaWdodCAtIDIwO1xuICAgICAgICB0aGlzLl9ib3VuY2UgPSAwLjQ7XG4gICAgICAgIHRoaXMuX2ZyaWN0aW9uWCA9IDAuOTtcbiAgICAgICAgdGhpcy5fbWFzcyA9IDI7XG4gICAgICAgIHRoaXMucGlnID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMucGlnLnNyYyA9IFwic3JjL2ltYWdlcy9wZXBwYS5wbmdcIlxuICAgIH1cblxuICAgIGRyYXdQaWcoY3R4KSB7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5fcmFkaXVzLCAwLCAoTWF0aC5QSSAqIDIpLCBmYWxzZSk7XG4gICAgICAgIGN0eC5jbGlwKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLnBpZywgdGhpcy54IC0gdGhpcy5fcmFkaXVzLCB0aGlzLnkgLSB0aGlzLl9yYWRpdXMsIHRoaXMuX3JhZGl1cyAqIDIsIHRoaXMuX3JhZGl1cyAqIDIpO1xuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZVBpZygpIHtcbiAgICAgICAgdGhpcy52ZWxYICs9IHRoaXMuX2dyYXZpdHkueDtcbiAgICAgICAgdGhpcy52ZWxZICs9IHRoaXMuX2dyYXZpdHkueTtcbiAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsWDtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMudmVsWTtcblxuICAgICAgICBpZiAodGhpcy55ID49IHRoaXMuX2dyb3VuZCkge1xuICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5fZ3JvdW5kIC0gKHRoaXMueSAtIHRoaXMuX2dyb3VuZCk7XG4gICAgICAgICAgICB0aGlzLnZlbFkgPSAtTWF0aC5hYnModGhpcy52ZWxZKSAqIHRoaXMuX2JvdW5jZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnZlbFkgPj0gdGhpcy5fZ3Jhdml0eS55KSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWxZID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLl9ncm91bmQgLSB0aGlzLl9ncmF2aXR5Lnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy52ZWxYID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVsWCAtPSB0aGlzLl9mcmljdGlvblg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy52ZWxYIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVsWCArPSB0aGlzLl9mcmljdGlvblg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3RvcHMgYmFsbCBmcm9tIGJvdW5jaW5nIGluIFkgYXhpc1xuICAgICAgICBpZiAodGhpcy52ZWxZPDAgJiYgdGhpcy52ZWxZPi0yLjEpIHtcbiAgICAgICAgICAgIHRoaXMudmVsWSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3RvcHMgYmFsbCBmcm9tIG1vdmluZyBvbiBYIGF4aXMgaWYgeC12ZWxvY2l0eSA8IDEuMVxuICAgICAgICBpZiAoTWF0aC5hYnModGhpcy52ZWxYKSA8IDEuMSkge1xuICAgICAgICAgICAgdGhpcy52ZWxYID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFuaW1hdGUoY3R4KSB7XG4gICAgICAgIHRoaXMudXBkYXRlUGlnKCk7XG4gICAgICAgIHRoaXMuZHJhd1BpZyhjdHgpO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQaWc7IiwiaW1wb3J0IEJpcmQgZnJvbSBcIi4vYmlyZFwiO1xuXG5jbGFzcyBQcm9qZWN0aWxlIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgsIHNjb3JlKSB7XG4gICAgICAgIHRoaXMuX2N0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5zY29yZSA9IDA7XG5cbiAgICAgICAgdGhpcy5sYXVuY2ggPSB0aGlzLmxhdW5jaC5iaW5kKHRoaXMpXG4gICAgICAgIHRoaXMuYmlyZE9iamVjdHMgPSBbXTtcbiAgICAgICAgdGhpcy5tYXggPSAxO1xuICAgICAgICB0aGlzLmN1cnJlbnRCaXJkO1xuICAgIH1cblxuICAgIGxhdW5jaChhbmdsZVZhbCwgbWFnVmFsKSB7XG4gICAgICAgIGxldCBhbmdsZSA9IE1hdGguUEkqIGFuZ2xlVmFsIC8xODA7XG4gICAgICAgIGxldCBtYWduaXR1ZGUgPSBtYWdWYWw7XG5cbiAgICAgICAgY29uc3Qgb2JqTGF1bmNoID0gbmV3IE9iamVjdExhdW5jaCh0aGlzLl9jdHgsIDEyNSwgNjUwLCBuZXcgQmlyZCh0aGlzLl9jdHgpKTtcbiAgICAgICAgdGhpcy5iaXJkT2JqZWN0cy5wdXNoKG9iakxhdW5jaCk7XG4gICAgICAgIG9iakxhdW5jaC52ZWxZID0tIG1hZ25pdHVkZSAqIE1hdGguc2luKGFuZ2xlKTtcbiAgICAgICAgb2JqTGF1bmNoLnZlbFggPSBtYWduaXR1ZGUgKiBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgIG9iakxhdW5jaC50cmFuc2ZlciA9IDAuODtcbiAgICB9XG5cbiAgICBsYXVuY2hMb29wKGN0eCwgcGlncywgYmxvY2tzKSB7XG4gICAgICAgIGlmICh0aGlzLmJpcmRPYmplY3RzLmxlbmd0aCA+IHRoaXMubWF4KSB7XG4gICAgICAgICAgICB0aGlzLmJpcmRPYmplY3RzWzBdLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy5iaXJkT2JqZWN0cyA9IHRoaXMuYmlyZE9iamVjdHMuc3BsaWNlKDEpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5iaXJkT2JqZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRCaXJkID0gdGhpcy5iaXJkT2JqZWN0c1tpXVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBjdXJyZW50QmlyZC52ZWxZICs9IDEuNTM7XG4gICAgICAgICAgICBjdXJyZW50QmlyZC5feCArPSBjdXJyZW50QmlyZC52ZWxYIC8gMztcbiAgICAgICAgICAgIGN1cnJlbnRCaXJkLl95ICs9IGN1cnJlbnRCaXJkLnZlbFkgLyAzO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRCaXJkLl95ICsgY3VycmVudEJpcmQudHlwZS5yYWRpdXMgPiA3MDApIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50QmlyZC5feSA9IDcwMCAtIGN1cnJlbnRCaXJkLnR5cGUucmFkaXVzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VycmVudEJpcmQudXBkYXRlT2JqZWN0KHBpZ3MsIGJsb2NrcywgdGhpcy5zY29yZSlcbiAgICAgICAgICAgIGN1cnJlbnRCaXJkLmRyYXdPYmplY3RMYXVuY2godGhpcy5fY3R4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFuaW1hdGUoY3R4LCBwaWdzLCBibG9ja3MpIHtcbiAgICAgICAgdGhpcy5sYXVuY2hMb29wKGN0eCwgcGlncywgYmxvY2tzKTtcbiAgICB9XG59XG5cbmNsYXNzIE9iamVjdExhdW5jaCB7XG4gICAgY29uc3RydWN0b3IoY3R4LCB4ID0gNTAsIHkgPSA1MCwgdHlwZSkge1xuICAgICAgICB0aGlzLl9jdHggPSBjdHg7XG4gICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgdGhpcy52ZWxYID0gMDtcbiAgICAgICAgdGhpcy52ZWxZID0gMDtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy50cmFuc2ZlciA9IDAuOTtcbiAgICAgICAgdGhpcy5yZW1vdmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2dyYXZpdHkgPSB7IHg6IDAsIHk6IDAuMSB9O1xuICAgICAgICB0aGlzLl9ncm91bmQgPSB0aGlzLl9jdHguY2FudmFzLmhlaWdodCAtIDIwO1xuICAgICAgICB0aGlzLl9ib3VuY2UgPSAwLjU7XG4gICAgICAgIHRoaXMuX2ZyaWN0aW9uWCA9IDAuOTtcbiAgICAgICAgdGhpcy5fbWFzcyA9IDI7XG4gICAgICAgIHRoaXMucmFkaXVzID0gMTQ7XG5cbiAgICAgICAgdGhpcy5iaXJkT25QaWdDb2xsaXNpb25Qb2ludHMgPSA1NTAwO1xuICAgICAgICB0aGlzLmJpcmRPbkJsb2NrQ29sbGlzaW9uUG9pbnRzID0gMzI1O1xuICAgIH1cblxuICAgIHJlbW92ZSgpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBkcmF3T2JqZWN0TGF1bmNoKGN0eCkge1xuICAgICAgICB0aGlzLnR5cGUuZHJhd0JpcmQoY3R4LCB0aGlzLl94LCB0aGlzLl95KTtcbiAgICAgICAgLy8gdGhpcy5kcmF3U2NvcmUoY3R4LCAwKVxuICAgIH1cblxuICAgIGNoZWNrQmlyZE9uUGlnQ29sbGlzaW9uKHBpZ3MsIHNjb3JlKSB7XG4gICAgICAgIGlmIChwaWdzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBpZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5feCArIHRoaXMudHlwZS5fcmFkaXVzICsgcGlnc1tpXS5fcmFkaXVzID4gcGlnc1tpXS54XG4gICAgICAgICAgICAgICAgICAgICYmIHRoaXMuX3ggPCBwaWdzW2ldLnggKyB0aGlzLnR5cGUuX3JhZGl1cyArIHBpZ3NbaV0uX3JhZGl1c1xuICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLl95ICsgdGhpcy50eXBlLl9yYWRpdXMgKyBwaWdzW2ldLl9yYWRpdXMgPiBwaWdzW2ldLnlcbiAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5feSA8IHBpZ3NbaV0ueSArIHRoaXMudHlwZS5fcmFkaXVzICsgcGlnc1tpXS5fcmFkaXVzKSBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHB5dGhhZ29yZWFtIHRoZW9yZW0gdG8gYmUgbW9yZSBleGFjdCBvbiBjb2xsaXNpb25cbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoKHRoaXMuX3ggLSBwaWdzW2ldLngpICogKHRoaXMuX3ggLSBwaWdzW2ldLngpKVxuICAgICAgICAgICAgICAgICAgICAgICAgKyAoKHRoaXMuX3kgLSBwaWdzW2ldLnkpICogKHRoaXMuX3kgLSBwaWdzW2ldLnkpKVxuICAgICAgICAgICAgICAgICAgICApXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDwgdGhpcy50eXBlLl9yYWRpdXMgKyBwaWdzW2ldLl9yYWRpdXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmlyZE9uUGlnQ29sbGlzaW9uTG9naWMocGlnc1tpXSwgc2NvcmUpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja0JpcmRPbkJsb2NrQ29sbGlzaW9uKGJsb2Nrcywgc2NvcmUpIHtcbiAgICAgICAgaWYgKGJsb2Nrcykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBibG9ja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDQ7IGorKyl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNpcmNsZUNlbnRlciA9IFt0aGlzLl94LCB0aGlzLl95XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGogKyAxID09PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGVja0JpcmRJbnRlcmNlcHRCbG9jayhibG9ja3NbaV0uZ2V0UG9pbnQoaiksIGJsb2Nrc1tpXS5nZXRQb2ludCgwKSwgY2lyY2xlQ2VudGVyLCB0aGlzLnJhZGl1cykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJpcmRPbkJsb2NrQ29sbGlzaW9uTG9naWMoYmxvY2tzW2ldLCBzY29yZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrQmlyZEludGVyY2VwdEJsb2NrKGJsb2Nrc1tpXS5nZXRQb2ludChqKSwgYmxvY2tzW2ldLmdldFBvaW50KGogKyAxKSwgY2lyY2xlQ2VudGVyLCB0aGlzLnJhZGl1cykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJpcmRPbkJsb2NrQ29sbGlzaW9uTG9naWMoYmxvY2tzW2ldLCBzY29yZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpcmRPblBpZ0NvbGxpc2lvbkxvZ2ljKHBpZywgc2NvcmUpIHtcbiAgICAgICAgc2NvcmUgKz0gdGhpcy5iaXJkT25QaWdDb2xsaXNpb25Qb2ludHM7XG4gICAgICAgIGNvbnN0IG1hc3MxID0gdGhpcy50eXBlLl9yYWRpdXM7XG4gICAgICAgIGNvbnN0IG1hc3MyID0gcGlnLl9yYWRpdXM7XG4gICAgICAgIGlmIChwaWcudmVsWCA9PT0gMCkgcGlnLnZlbFggPSA5O1xuICAgICAgICAvLyBpZiAocGlnLnZlbFkgPT09IDApIHBpZy52ZWxZID0gNjtcbiAgICAgICAgLy8gY29uc3QgcGlnVmVsWCA9IHBpZy52ZWxYO1xuICAgICAgICAvLyBjb25zdCBwaWdWZWxZID0gcGlnLnZlbFk7XG5cbiAgICAgICAgdGhpcy52ZWxYID0gLXRoaXMudmVsWDtcbiAgICAgICAgdGhpcy52ZWxZID0gLXRoaXMudmVsWTtcblxuICAgICAgICBwaWcudmVsWCA9IC1waWcudmVsWDtcbiAgICAgICAgcGlnLnZlbFkgPSAtcGlnLnZlbFk7XG4gICAgICAgIFxuICAgICAgICAvLyB0aGlzLnZlbFggPSAoIHRoaXMudmVsWCAqIChtYXNzMSAtIG1hc3MyKSArICgyICogbWFzczIgKiBwaWdWZWxYKSkgLyAobWFzczEgKyBtYXNzMik7XG4gICAgICAgIC8vIHRoaXMudmVsWSA9ICggdGhpcy52ZWxZICogKG1hc3MxIC0gbWFzczIpICsgKDIgKiBtYXNzMiAqIHBpZ1ZlbFkpKSAvIChtYXNzMSArIG1hc3MyKTtcbiAgICAgICAgLy8gcGlnLnZlbFggPSAoIHBpZ1ZlbFggKiAobWFzczIgLSBtYXNzMSkgKyAoMiAqIG1hc3MxICogdGhpcy52ZWxYKSkgLyAobWFzczEgKyBtYXNzMik7XG4gICAgICAgIC8vIHBpZy52ZWxZID0gKCBwaWdWZWxZICogKG1hc3MyIC0gbWFzczEpICsgKDIgKiBtYXNzMSAqIHRoaXMudmVsWSkpIC8gKG1hc3MxICsgbWFzczIpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5feCArPSB0aGlzLnZlbFg7XG4gICAgICAgIHRoaXMuX3kgKz0gdGhpcy52ZWxZO1xuICAgICAgICBwaWcueCArPSBwaWcudmVsWDtcbiAgICAgICAgcGlnLnkgKz0gcGlnLnZlbFk7XG4gICAgfVxuXG4gICAgYmlyZE9uQmxvY2tDb2xsaXNpb25Mb2dpYyhibG9jaywgc2NvcmUpIHtcbiAgICAgICAgc2NvcmUgKz0gdGhpcy5iaXJkT25CbG9ja0NvbGxpc2lvblBvaW50cztcbiAgICAgICAgdGhpcy52ZWxYID0gLXRoaXMudmVsWDtcbiAgICAgICAgdGhpcy52ZWxZID0gLXRoaXMudmVsWTtcblxuICAgICAgICB0aGlzLl94ICs9IHRoaXMudmVsWDtcbiAgICAgICAgdGhpcy5feSArPSB0aGlzLnZlbFk7XG4gICAgfVxuXG4gICAgY2hlY2tCaXJkSW50ZXJjZXB0QmxvY2socG9pbnRBLCBwb2ludEIsIGNpcmNsZUNlbnRlciwgcmFkaXVzKSB7XG4gICAgICAgIGxldCBkaXN0O1xuICAgICAgICBjb25zdCB2ZWwxWCA9IHBvaW50Qi5wb3MueCAtIHBvaW50QS5wb3MueDtcbiAgICAgICAgY29uc3QgdmVsMVkgPSBwb2ludEIucG9zLnkgLSBwb2ludEEucG9zLnk7XG4gICAgICAgIGNvbnN0IHZlbDJYID0gY2lyY2xlQ2VudGVyWzBdIC0gcG9pbnRBLnBvcy54O1xuICAgICAgICBjb25zdCB2ZWwyWSA9IGNpcmNsZUNlbnRlclsxXSAtIHBvaW50QS5wb3MueTtcbiAgICAgICAgY29uc3QgdW5pdCA9ICh2ZWwyWCAqIHZlbDFYICsgdmVsMlkgKiB2ZWwxWSkgLyAodmVsMVkgKiB2ZWwxWSArIHZlbDFYICogdmVsMVgpO1xuICAgICAgICBpZiAodW5pdCA+PSAwICYmIHVuaXQgPD0gMSl7XG4gICAgICAgICAgICBkaXN0ID0gKHBvaW50QS5wb3MueCAgKyB2ZWwxWCAqIHVuaXQgLSBjaXJjbGVDZW50ZXJbMF0pICoqIDIgKyAocG9pbnRBLnBvcy55ICsgdmVsMVkgKiB1bml0IC0gY2lyY2xlQ2VudGVyWzFdKSAqKiAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGlzdCA9IHVuaXQgPCAwID8gXG4gICAgICAgICAgICAgICAgKHBvaW50QS5wb3MueCAtIGNpcmNsZUNlbnRlclswXSkgKiogMiArIChwb2ludEEucG9zLnkgLSBjaXJjbGVDZW50ZXJbMV0pICoqIDIgOlxuICAgICAgICAgICAgICAgIChwb2ludEIucG9zLnggLSBjaXJjbGVDZW50ZXJbMF0pICoqIDIgKyAocG9pbnRCLnBvcy55IC0gY2lyY2xlQ2VudGVyWzFdKSAqKiAyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkaXN0IDwgcmFkaXVzICogcmFkaXVzO1xuICAgIH1cblxuICAgIHVwZGF0ZU9iamVjdChwaWdzLCBibG9ja3MsIHNjb3JlKSB7XG4gICAgICAgIHRoaXMuY2hlY2tCaXJkT25QaWdDb2xsaXNpb24ocGlncywgc2NvcmUpXG4gICAgICAgIHRoaXMuY2hlY2tCaXJkT25CbG9ja0NvbGxpc2lvbihibG9ja3MsIHNjb3JlKVxuICAgICAgICB0aGlzLnZlbFggKz0gdGhpcy5fZ3Jhdml0eS54O1xuICAgICAgICB0aGlzLnZlbFkgKz0gdGhpcy5fZ3Jhdml0eS55O1xuICAgICAgICB0aGlzLl94ICs9IHRoaXMudmVsWDtcbiAgICAgICAgdGhpcy5feSArPSB0aGlzLnZlbFk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3kgPj0gdGhpcy5fZ3JvdW5kKSB7XG4gICAgICAgICAgICB0aGlzLl95ID0gdGhpcy5fZ3JvdW5kIC0gKHRoaXMuX3kgLSB0aGlzLl9ncm91bmQpO1xuICAgICAgICAgICAgdGhpcy52ZWxZID0gLU1hdGguYWJzKHRoaXMudmVsWSkgKiB0aGlzLl9ib3VuY2U7XG4gICAgICAgICAgICBpZiAodGhpcy52ZWxZID49IHRoaXMuX2dyYXZpdHkueSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVsWSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5feSA9IHRoaXMuX2dyb3VuZCAtIHRoaXMuX2dyYXZpdHkueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnZlbFggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWxYIC09IHRoaXMuX2ZyaWN0aW9uWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnZlbFggPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWxYICs9IHRoaXMuX2ZyaWN0aW9uWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBzdG9wcyBiYWxsIGZyb20gYm91bmNpbmcgaW4gWSBheGlzXG4gICAgICAgIGlmICggdGhpcy5feSA+PSB0aGlzLl9ncm91bmQgLSAxMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMudmVsWSA8IDAgJiYgdGhpcy52ZWxZID4gLTEuMSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVsWSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3RvcHMgYmFsbCBmcm9tIG1vdmluZyBvbiBYIGF4aXMgaWYgeC12ZWxvY2l0eSA8IDEuMVxuICAgICAgICBpZiAoTWF0aC5hYnModGhpcy52ZWxYKSA8IDEuMSkge1xuICAgICAgICAgICAgdGhpcy52ZWxYID0gMDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0aWxlOyIsImltcG9ydCBQaWcgZnJvbSBcIi4vcGlnXCI7XG5pbXBvcnQgQmxvY2sgZnJvbSBcIi4vYmxvY2tcIjtcblxuY2xhc3MgU3RhZ2VMb2FkZXIge1xuICAgIGNvbnN0cnVjdG9yKCBudW1iZXJPZlBpZ3MgPSAyLCBwaWdzTG9jYXRpb25BcnJheSA9IFtbNTAwLCA2MDBdLCBbNjAwLCA2MDBdXSwgbnVtYmVyb2ZCbG9ja3MgPSAyLCBibG9ja0xvY2F0aW9uQXJyYXkgPSBbWzM1MCwgNzAwXSwgWzcwMCwgNzAwXV0pIHtcbiAgICAgICAgdGhpcy5udW1iZXJPZlBpZ3MgPSBudW1iZXJPZlBpZ3M7XG4gICAgICAgIHRoaXMucGlnc0xvY2F0aW9uQXJyYXkgPSBwaWdzTG9jYXRpb25BcnJheTtcbiAgICAgICAgdGhpcy5waWdzID0gW107XG5cbiAgICAgICAgdGhpcy5udW1iZXJvZkJsb2NrcyA9IG51bWJlcm9mQmxvY2tzO1xuICAgICAgICB0aGlzLmJsb2NrTG9jYXRpb25BcnJheSA9IGJsb2NrTG9jYXRpb25BcnJheTtcbiAgICAgICAgdGhpcy5ibG9ja3MgPSBbXTtcbiAgICB9XG5cbiAgICBkcmF3UGlncyhjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMucGlncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5waWdzTG9jYXRpb25BcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMucGlncy5wdXNoKG5ldyBQaWcoY3R4LCB0aGlzLnBpZ3NMb2NhdGlvbkFycmF5W2ldWzBdLCB0aGlzLnBpZ3NMb2NhdGlvbkFycmF5W2ldWzFdKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdCbG9ja3MoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLmJsb2Nrcy5sZW5ndGggPT09IDApe1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJsb2NrTG9jYXRpb25BcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tzLnB1c2gobmV3IEJsb2NrKGN0eCwgdGhpcy5ibG9ja0xvY2F0aW9uQXJyYXlbaV1bMF0sIHRoaXMuYmxvY2tMb2NhdGlvbkFycmF5W2ldWzFdKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFuaW1hdGUoY3R4KSB7XG4gICAgICAgIHRoaXMuZHJhd1BpZ3MoY3R4KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBpZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucGlnc1tpXS5hbmltYXRlKGN0eCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZHJhd0Jsb2NrcyhjdHgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYmxvY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmJsb2Nrc1tpXS5hbmltYXRlKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0YWdlTG9hZGVyOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vc3R5bGVzL2luZGV4LnNjc3NcIjtcbmltcG9ydCBDYW52YXMgZnJvbSBcIi4vc2NyaXB0cy9jYW52YXNcIjtcbmltcG9ydCBQcm9qZWN0aWxlIGZyb20gXCIuL3NjcmlwdHMvcHJvamVjdGlsZVwiO1xuaW1wb3J0IFN0YWdlTG9hZGVyIGZyb20gXCIuL3NjcmlwdHMvc3RhZ2VMb2FkZXJcIjtcblxuLy8gY29uc3QgY3VycmVudFN0YXRlT2JqID0ge1xuLy8gICBjdXJyZW50RXhhbXBsZTogbnVsbCxcbi8vICAgY3VycmVudEV2ZW50TGlzdGVuZXJzOiBbXSxcbi8vIH07XG5cbmxldCBkZWx0YVgsIGRlbHRhWTtcbmNvbnN0IGNlbnRlclggPSAxMDQuNzA7XG5jb25zdCBjZW50ZXJZID0gNDU1O1xubGV0IHNjb3JlID0gMDtcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYW52YXNcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0YXJ0Q2FudmFzKTtcblxuZnVuY3Rpb24gc3RhcnRDYW52YXMoKSB7XG4gICAgLy8gdW5yZWdpc3RlckV2ZW50TGlzdGVuZXJzKCk7XG4gICAgY29uc3QgY2FudmFzID0gbmV3IENhbnZhcygpO1xuICAgIGNhbnZhcy5jcmVhdGVDYW52YXMoKTtcbiAgICBjb25zdCBjYW52YXNPYmogPSBjYW52YXMuY2FudmFzO1xuICAgIGxldCBjYW52YXNQb3NpdGlvbiA9IGNhbnZhc09iai5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIGNvbnN0IHByb2plY3RpbGUgPSBuZXcgUHJvamVjdGlsZShjYW52YXMuY3R4LCBzY29yZSk7XG5cbiAgICBjb25zdCBtb3VzZSA9IHtcbiAgICAgICAgeDogY2FudmFzLndpZHRoLzIsXG4gICAgICAgIHk6IGNhbnZhcy5oZWlnaHQvMixcbiAgICB9XG4gICAgXG4gICAgY2FudmFzT2JqLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgbW91c2UueCA9IGUueCAtIGNhbnZhc1Bvc2l0aW9uLmxlZnQ7XG4gICAgICAgIG1vdXNlLnkgPSBlLnkgLSBjYW52YXNQb3NpdGlvbi50b3A7XG5cbiAgICB9KVxuXG4gICAgY2FudmFzT2JqLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgbW91c2UueCA9IGUueCAtIGNhbnZhc1Bvc2l0aW9uLmxlZnQ7XG4gICAgICAgIG1vdXNlLnkgPSBlLnkgLSBjYW52YXNQb3NpdGlvbi50b3A7XG5cbiAgICAgICAgZGVsdGFYID0gbW91c2UueCAtIGNlbnRlclg7XG4gICAgICAgIGRlbHRhWSA9IG1vdXNlLnkgLSBjZW50ZXJZO1xuICAgICAgICBsZXQgdGhldGFSYWRpYW4gPSBNYXRoLmF0YW4yKGRlbHRhWSwgZGVsdGFYKTtcbiAgICAgICAgbGV0IGRlZ3JlZXMgPSAtKChNYXRoLmFicyh0aGV0YVJhZGlhbiAqIDE4MCAvIE1hdGguUEkpIC0gMjcwKSAlIDkwKTtcbiAgICAgICAgcHJvamVjdGlsZS5sYXVuY2goZGVncmVlcyAsIChNYXRoLmFicyhtb3VzZS54IC0gMTMwKSAvIDIpKVxuICAgIH0pXG5cbiAgICBjb25zdCBzdGFnZUxvYWRlciA9IG5ldyBTdGFnZUxvYWRlcigpXG5cbiAgICBsZXQgYW5pbWF0aW5nID0gdHJ1ZTtcblxuICAgIGNvbnN0IGFuaW1hdGlvbiA9ICgpID0+IHtcbiAgICAgICAgY2FudmFzLmNsZWFyQ2FudmFzKCk7XG4gICAgICAgIGlmIChhbmltYXRpbmcpIHtcbiAgICAgICAgICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIGltZy5zcmMgPSBcInNyYy9pbWFnZXMvcGl4aWwtbGF5ZXItQmFja2dyb3VuZC5wbmdcIjtcbiAgICAgICAgICAgIGNhbnZhcy5jdHguZHJhd0ltYWdlKGltZyw5MCw1NzApO1xuICAgICAgICAgICAgc3RhZ2VMb2FkZXIuYW5pbWF0ZShjYW52YXMuY3R4KVxuICAgICAgICAgICAgcHJvamVjdGlsZS5hbmltYXRlKGNhbnZhcy5jdHgsIHN0YWdlTG9hZGVyLnBpZ3MsIHN0YWdlTG9hZGVyLmJsb2NrcylcbiAgICAgICAgICAgIGRyYXdTY29yZShjYW52YXMuY3R4LCBzY29yZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbik7XG59XG5cbmZ1bmN0aW9uIGRyYXdTY29yZShjdHgsIHNjb3JlKSB7IFxuICAgIGN0eC50ZXh0QWxpZ24gPSBcInJpZ2h0XCI7XG4gICAgY3R4LnRleHRCYXNlbGluZSA9IFwidG9wXCI7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiV0hJVEVcIjtcbiAgICBjdHguZm9udCA9IDUwICsgXCJweCBkZWphdnUgc2FucyBtb25vXCI7XG4gICAgY3R4LmZpbGxUZXh0KHNjb3JlLCBjdHguY2FudmFzLndpZHRoIC0gNTAgLyAyLCAwKVxufVxuXG4vLyBmdW5jdGlvbiB1bnJlZ2lzdGVyRXZlbnRMaXN0ZW5lcnMoKSB7XG4vLyAgIHdoaWxlIChjdXJyZW50U3RhdGVPYmouY3VycmVudEV2ZW50TGlzdGVuZXJzLmxlbmd0aCkge1xuLy8gICAgIGxldCBbXG4vLyAgICAgICBzZWxlY3Rvcixcbi8vICAgICAgIGV2ZW50LFxuLy8gICAgICAgaGFuZGxlcixcbi8vICAgICBdID0gY3VycmVudFN0YXRlT2JqLmN1cnJlbnRFdmVudExpc3RlbmVycy5wb3AoKTtcbi8vICAgICBpZiAoc2VsZWN0b3IgPT09IFwid2luZG93XCIpIHtcbi8vICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyKTtcbi8vICAgICAgIGNvbnNvbGUubG9nKGhhbmRsZXIpO1xuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyKTtcbi8vICAgICB9XG4vLyAgIH1cbi8vIH1cblxuLy8gZnVuY3Rpb24gY2xlYXJEZW1vKCkge1xuLy8gICBpZiAoY3VycmVudFN0YXRlT2JqLmN1cnJlbnRFeGFtcGxlID09PSBcIkNBTlZBU0RFTU9cIilcbi8vICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJjYW52YXNcIikpO1xuLy8gICBpZiAoY3VycmVudFN0YXRlT2JqLmN1cnJlbnRFeGFtcGxlID09PSBcIkRPTURFTU9cIikge1xuLy8gICAgIFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNhcmRcIildLmZvckVhY2goKGVsZW0pID0+XG4vLyAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsZW0pXG4vLyAgICAgKTtcbi8vICAgfVxuLy8gfVxuIl0sInNvdXJjZVJvb3QiOiIifQ==