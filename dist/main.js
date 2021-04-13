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
  }

  _createClass(Bird, [{
    key: "drawBird",
    value: function drawBird(ctx, x, y) {
      ctx.fillStyle = this._color;
      ctx.beginPath();
      ctx.arc(x, y, this._radius, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();
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
    this.canvas.width = window.innerWidth - 400;
    this.canvas.height = this.canvas.width / 2;
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
  }

  _createClass(Pig, [{
    key: "drawPig",
    value: function drawPig(ctx) {
      ctx.fillStyle = this._color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this._radius, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();
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
  function Projectile(ctx) {
    _classCallCheck(this, Projectile);

    this._ctx = ctx;
    this.cont = false;
    this.launch = this.launch.bind(this);
    this.target = Math.random() * 700 + 20;
    this.birdObjects = [];
    this.max = 1;
    this.currentBird;
  }

  _createClass(Projectile, [{
    key: "launch",
    value: function launch(angleVal, magVal) {
      var angle = Math.PI * angleVal / 180;
      var magnitude = magVal;
      var objLaunch = new ObjectLaunch(this._ctx, 100, 650, new _bird__WEBPACK_IMPORTED_MODULE_0__.default(this._ctx));
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

      if (this.cont) {
        this.launch();
      }

      for (var i = 0; i < this.birdObjects.length; i++) {
        var currentBird = this.birdObjects[i]; // if (this.currentBird._y + this.currentBird.type.radius >= 700) {
        //     if (this.bounce) {
        //         this.currentBird.velY *= this.currentBird.transfer;
        //     } else {
        //         this.currentBird.velX = 0;
        //         this.currentBird.velY = 0;
        //     }
        // }

        currentBird.velY += 1.53;
        currentBird._x += currentBird.velX / 3;
        currentBird._y += currentBird.velY / 3;

        if (currentBird._y + currentBird.type.radius > 700) {
          currentBird._y = 700 - currentBird.type.radius;
        }

        currentBird.updateObject(pigs, blocks);
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
  }

  _createClass(ObjectLaunch, [{
    key: "remove",
    value: function remove() {
      this.removed = true;
    }
  }, {
    key: "drawObjectLaunch",
    value: function drawObjectLaunch(ctx) {
      this.type.drawBird(ctx, this._x, this._y);
    }
  }, {
    key: "checkBirdOnPigCollision",
    value: function checkBirdOnPigCollision(pigs) {
      if (pigs) {
        for (var i = 0; i < pigs.length; i++) {
          if (this._x + this.type._radius + pigs[i]._radius > pigs[i].x && this._x < pigs[i].x + this.type._radius + pigs[i]._radius && this._y + this.type._radius + pigs[i]._radius > pigs[i].y && this._y < pigs[i].y + this.type._radius + pigs[i]._radius) {
            // pythagoream theorem to be more exact on collision
            var distance = Math.sqrt((this._x - pigs[i].x) * (this._x - pigs[i].x) + (this._y - pigs[i].y) * (this._y - pigs[i].y));

            if (distance < this.type._radius + pigs[i]._radius) {
              this.birdOnPigCollisionLogic(pigs[i]);
            }
          }
        }
      }
    }
  }, {
    key: "checkBirdOnBlockCollision",
    value: function checkBirdOnBlockCollision(blocks) {
      if (blocks) {
        for (var i = 0; i < blocks.length; i++) {
          for (var j = 0; j < 4; j++) {
            var circleCenter = [this._x, this._y];

            if (j + 1 === 4) {
              if (this.checkBirdInterceptBlock(blocks[i].getPoint(j), blocks[i].getPoint(0), circleCenter, this.radius)) {
                this.birdOnBlockCollisionLogic(blocks[i]);
              }
            } else {
              if (this.checkBirdInterceptBlock(blocks[i].getPoint(j), blocks[i].getPoint(j + 1), circleCenter, this.radius)) {
                this.birdOnBlockCollisionLogic(blocks[i]);
              }
            }
          } // if (checkBirdInterceptBlock(blocks[i]))

        }
      }
    }
  }, {
    key: "birdOnPigCollisionLogic",
    value: function birdOnPigCollisionLogic(pig) {
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
    value: function birdOnBlockCollisionLogic(block) {
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
    value: function updateObject(pigs, blocks) {
      this.checkBirdOnPigCollision(pigs);
      this.checkBirdOnBlockCollision(blocks);
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
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var currentStateObj = {
  currentExample: null,
  currentEventListeners: []
};
var x, y;
var deltaX, deltaY;
var centerX = 134;
var centerY = 271;
document.querySelector("#canvas").addEventListener("click", startCanvas);

function startCanvas() {
  unregisterEventListeners();
  var canvas = new _scripts_canvas__WEBPACK_IMPORTED_MODULE_1__.default();
  canvas.createCanvas();
  var canvasObj = canvas.canvas;
  var canvasPosition = canvasObj.getBoundingClientRect();
  var projectile = new _scripts_projectile__WEBPACK_IMPORTED_MODULE_2__.default(canvas.ctx);
  var mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    click: false
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
    console.log(Math.abs(mouse.x - 130));
    var thetaRadian = Math.atan2(deltaY, deltaX);
    var degrees = -((Math.abs(thetaRadian * 180 / Math.PI) - 270) % 90); // console.log(degrees)

    projectile.launch(degrees, Math.abs(mouse.x - 130));
  });
  var stageLoader = new _scripts_stageLoader__WEBPACK_IMPORTED_MODULE_3__.default();
  var animating = true;

  var animation = function animation() {
    canvas.clearCanvas();

    if (animating) {
      var img = new Image();
      img.src = "src/images/pixil-layer-Background.png";
      canvas.ctx.drawImage(img, 90, 350);
      stageLoader.animate(canvas.ctx);
      projectile.animate(canvas.ctx, stageLoader.pigs, stageLoader.blocks); // document.querySelector("#launch-button").addEventListener("click", projectile.launch)

      window.requestAnimationFrame(animation);
    }
  };

  window.requestAnimationFrame(animation); //   window.addEventListener("keydown", handleKeyDown);
  //   currentStateObj.currentEventListeners.push([
  //     "window",
  //     "keydown",
  //     handleKeyDown,
  //   ]);
  //   window.addEventListener("mousedown", handleMouseDown);
  //   currentStateObj.currentEventListeners.push([
  //     "window",
  //     "mousedown",
  //     handleMouseDown,
  //   ]);
  //   function handleKeyDown(event) {
  //     if (event.which === 32) {
  //       event.preventDefault();
  //       squares.forEach((sq) => sq.reverseAnimation());
  //       canvas.setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
  //     }
  //   }
  //   function handleMouseDown(event) {
  //     event.preventDefault();
  //     squares.push(
  //       new Square(
  //         canvas.ctx,
  //         canvas.coords.map((co) => co + 25),
  //         canvas.fillColor
  //       )
  //     );
  // animating = !animating;
  //   }
}

function unregisterEventListeners() {
  while (currentStateObj.currentEventListeners.length) {
    var _currentStateObj$curr = currentStateObj.currentEventListeners.pop(),
        _currentStateObj$curr2 = _slicedToArray(_currentStateObj$curr, 3),
        selector = _currentStateObj$curr2[0],
        event = _currentStateObj$curr2[1],
        handler = _currentStateObj$curr2[2];

    if (selector === "window") {
      window.removeEventListener(event, handler);
      console.log(handler);
    } else {
      document.querySelector(selector).removeEventListener(event, handler);
    }
  }
}

function clearDemo() {
  if (currentStateObj.currentExample === "CANVASDEMO") document.body.removeChild(document.querySelector("canvas"));

  if (currentStateObj.currentExample === "DOMDEMO") {
    _toConsumableArray(document.querySelectorAll(".card")).forEach(function (elem) {
      return document.body.removeChild(elem);
    });
  }
}
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYmlyZC5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYmxvY2suanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi8uL3NyYy9zY3JpcHRzL2NhbnZhcy5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvcGlnLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9wcm9qZWN0aWxlLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9zdGFnZUxvYWRlci5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiQmlyZCIsImN0eCIsIngiLCJ5IiwidmVsWCIsInZlbFkiLCJyYWRpdXMiLCJjb2xvciIsIl9jdHgiLCJfcmFkaXVzIiwiX2NvbG9yIiwiX2dyYXZpdHkiLCJfZ3JvdW5kIiwiY2FudmFzIiwiaGVpZ2h0IiwiX2JvdW5jZSIsImZpbGxTdHlsZSIsImJlZ2luUGF0aCIsImFyYyIsIk1hdGgiLCJQSSIsImNsb3NlUGF0aCIsImZpbGwiLCJhYnMiLCJkcmF3QmlyZCIsInVwZGF0ZUJpcmQiLCJCbG9jayIsInciLCJoIiwiciIsImR4IiwiZHkiLCJkciIsIklOU0VUIiwiUEk5MCIsIlBJMiIsIldBTExfTk9STVMiLCJtYXNzIiwiZ2V0TWFzcyIsInNhdmUiLCJzZXRUcmFuc2Zvcm0iLCJ1cGRhdGVCbG9jayIsImRyYXdCbG9jayIsInJlc3RvcmUiLCJpIiwicCIsImdldFBvaW50IiwicG9zIiwiZG9Db2xsaXNpb24iLCJ3aWR0aCIsInJvdGF0ZSIsImZpbGxSZWN0Iiwic3Ryb2tlUmVjdCIsIndoaWNoIiwieHgiLCJ5eSIsInZlbG9jaXR5QSIsInZlbG9jaXR5VCIsInZlbG9jaXR5IiwiY29zIiwic2luIiwiZGV0YWlscyIsImFzUG9sYXIiLCJ2ZWN0b3IiLCJwb2xhciIsIm1hZyIsImRpciIsInZlY3RvckFkZCIsInZhbGlkYXRlUG9sYXIiLCJ2ZWMiLCJpc1BvbGFyIiwicFZlYyIsInJldFYiLCJpc0NhcnQiLCJjYXJ0VG9Qb2xhciIsInVuZGVmaW5lZCIsInBvbGFyVG9DYXJ0IiwiYXRhbjIiLCJoeXBvdCIsInZlYzEiLCJ2ZWMyIiwidjEiLCJhc0NhcnQiLCJ2MiIsImZvcmNlIiwibG9jIiwibCIsInRvQ2VudGVyIiwicGhldGEiLCJGdiIsIkZhIiwiYWNjZWwiLCJkZWx0YVYiLCJhY2NlbEEiLCJ2IiwiZDEiLCJkMiIsImFsb25nIiwidGFuZ2VudCIsInBvaW50RGV0YWlscyIsIndhbGxJbmRleCIsInZ2IiwidmEiLCJ2dmMiLCJ2ZWN0b3JDb21wb25lbnRzRm9yRGlyIiwidmFjIiwiYXBwbHlGb3JjZSIsIkNhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJnZXRDb250ZXh0IiwiYm9keSIsImFwcGVuZCIsImNsYXNzTGlzdCIsImFkZCIsImNsZWFyUmVjdCIsIlBpZyIsIl9tYXNzIiwiX2ZyaWN0aW9uWCIsInVwZGF0ZVBpZyIsImRyYXdQaWciLCJQcm9qZWN0aWxlIiwiY29udCIsImxhdW5jaCIsImJpbmQiLCJ0YXJnZXQiLCJyYW5kb20iLCJiaXJkT2JqZWN0cyIsIm1heCIsImN1cnJlbnRCaXJkIiwiYW5nbGVWYWwiLCJtYWdWYWwiLCJhbmdsZSIsIm1hZ25pdHVkZSIsIm9iakxhdW5jaCIsIk9iamVjdExhdW5jaCIsInB1c2giLCJ0cmFuc2ZlciIsInBpZ3MiLCJibG9ja3MiLCJsZW5ndGgiLCJyZW1vdmUiLCJzcGxpY2UiLCJfeCIsIl95IiwidHlwZSIsInVwZGF0ZU9iamVjdCIsImRyYXdPYmplY3RMYXVuY2giLCJsYXVuY2hMb29wIiwicmVtb3ZlZCIsImRpc3RhbmNlIiwic3FydCIsImJpcmRPblBpZ0NvbGxpc2lvbkxvZ2ljIiwiaiIsImNpcmNsZUNlbnRlciIsImNoZWNrQmlyZEludGVyY2VwdEJsb2NrIiwiYmlyZE9uQmxvY2tDb2xsaXNpb25Mb2dpYyIsInBpZyIsIm1hc3MxIiwibWFzczIiLCJibG9jayIsInBvaW50QSIsInBvaW50QiIsImRpc3QiLCJ2ZWwxWCIsInZlbDFZIiwidmVsMlgiLCJ2ZWwyWSIsInVuaXQiLCJjaGVja0JpcmRPblBpZ0NvbGxpc2lvbiIsImNoZWNrQmlyZE9uQmxvY2tDb2xsaXNpb24iLCJTdGFnZUxvYWRlciIsIm51bWJlck9mUGlncyIsInBpZ3NMb2NhdGlvbkFycmF5IiwibnVtYmVyb2ZCbG9ja3MiLCJibG9ja0xvY2F0aW9uQXJyYXkiLCJkcmF3UGlncyIsImFuaW1hdGUiLCJkcmF3QmxvY2tzIiwiY3VycmVudFN0YXRlT2JqIiwiY3VycmVudEV4YW1wbGUiLCJjdXJyZW50RXZlbnRMaXN0ZW5lcnMiLCJkZWx0YVgiLCJkZWx0YVkiLCJjZW50ZXJYIiwiY2VudGVyWSIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwic3RhcnRDYW52YXMiLCJ1bnJlZ2lzdGVyRXZlbnRMaXN0ZW5lcnMiLCJjcmVhdGVDYW52YXMiLCJjYW52YXNPYmoiLCJjYW52YXNQb3NpdGlvbiIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInByb2plY3RpbGUiLCJtb3VzZSIsImNsaWNrIiwiZSIsImxlZnQiLCJ0b3AiLCJjb25zb2xlIiwibG9nIiwidGhldGFSYWRpYW4iLCJkZWdyZWVzIiwic3RhZ2VMb2FkZXIiLCJhbmltYXRpbmciLCJhbmltYXRpb24iLCJjbGVhckNhbnZhcyIsImltZyIsIkltYWdlIiwic3JjIiwiZHJhd0ltYWdlIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicG9wIiwic2VsZWN0b3IiLCJldmVudCIsImhhbmRsZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY2xlYXJEZW1vIiwicmVtb3ZlQ2hpbGQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImVsZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQU1BLEk7QUFDRixnQkFBWUMsR0FBWixFQUFtRjtBQUFBLFFBQWxFQyxDQUFrRSx1RUFBOUQsR0FBOEQ7QUFBQSxRQUF6REMsQ0FBeUQsdUVBQXJELEdBQXFEO0FBQUEsUUFBaERDLElBQWdELHVFQUF6QyxDQUF5QztBQUFBLFFBQXRDQyxJQUFzQyx1RUFBL0IsQ0FBK0I7QUFBQSxRQUE1QkMsTUFBNEIsdUVBQW5CLEVBQW1CO0FBQUEsUUFBZkMsS0FBZSx1RUFBUCxLQUFPOztBQUFBOztBQUMvRSxTQUFLQyxJQUFMLEdBQVlQLEdBQVo7QUFDQSxTQUFLQyxDQUFMLEdBQVNBLENBQVQ7QUFDQSxTQUFLQyxDQUFMLEdBQVNBLENBQVQ7QUFDQSxTQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLSSxPQUFMLEdBQWVILE1BQWY7QUFDQSxTQUFLSSxNQUFMLEdBQWNILEtBQWQ7QUFFQSxTQUFLSSxRQUFMLEdBQWdCO0FBQUVULE9BQUMsRUFBRSxDQUFMO0FBQVFDLE9BQUMsRUFBRTtBQUFYLEtBQWhCO0FBQ0EsU0FBS1MsT0FBTCxHQUFlLEtBQUtKLElBQUwsQ0FBVUssTUFBVixDQUFpQkMsTUFBaEM7QUFDQSxTQUFLQyxPQUFMLEdBQWUsR0FBZjtBQUNIOzs7O1dBRUQsa0JBQVNkLEdBQVQsRUFBY0MsQ0FBZCxFQUFpQkMsQ0FBakIsRUFBb0I7QUFDaEJGLFNBQUcsQ0FBQ2UsU0FBSixHQUFnQixLQUFLTixNQUFyQjtBQUNBVCxTQUFHLENBQUNn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LENBRDhDO0FBQUEsS0FBaEQ7QUFHRDtBQUNGLEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEJpcmQge1xuICAgIGNvbnN0cnVjdG9yKGN0eCwgeCA9IDEwMCwgeSA9IDEwMCwgdmVsWCA9IDAsIHZlbFkgPSAwLCByYWRpdXMgPSAxNCwgY29sb3IgPSBcIlJFRFwiKSB7XG4gICAgICAgIHRoaXMuX2N0eCA9IGN0eDtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy52ZWxYID0gdmVsWDtcbiAgICAgICAgdGhpcy52ZWxZID0gdmVsWTtcbiAgICAgICAgdGhpcy5fcmFkaXVzID0gcmFkaXVzO1xuICAgICAgICB0aGlzLl9jb2xvciA9IGNvbG9yO1xuXG4gICAgICAgIHRoaXMuX2dyYXZpdHkgPSB7IHg6IDAsIHk6IDAuMSB9O1xuICAgICAgICB0aGlzLl9ncm91bmQgPSB0aGlzLl9jdHguY2FudmFzLmhlaWdodDtcbiAgICAgICAgdGhpcy5fYm91bmNlID0gMS4zO1xuICAgIH1cblxuICAgIGRyYXdCaXJkKGN0eCwgeCwgeSkge1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5fY29sb3I7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LmFyYyh4LCB5LCB0aGlzLl9yYWRpdXMsIDAsIChNYXRoLlBJICogMiksIGZhbHNlKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgIH1cblxuICAgIHVwZGF0ZUJpcmQoKSB7XG4gICAgICAgIHRoaXMudmVsWCArPSB0aGlzLl9ncmF2aXR5Lng7XG4gICAgICAgIHRoaXMudmVsWSArPSB0aGlzLl9ncmF2aXR5Lnk7XG4gICAgICAgIHRoaXMueCArPSB0aGlzLnZlbFg7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLnZlbFk7XG5cbiAgICAgICAgaWYgKHRoaXMueSA+PSB0aGlzLl9ncm91bmQpIHtcbiAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuX2dyb3VuZCAtICh0aGlzLnkgLSB0aGlzLl9ncm91bmQpO1xuICAgICAgICAgICAgdGhpcy52ZWxZID0gLU1hdGguYWJzKHRoaXMudmVsWSkgKiB0aGlzLl9ib3VuY2U7XG4gICAgICAgICAgICBpZiAodGhpcy52ZWxZID49IHRoaXMuX2dyYXZpdHkueSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVsWSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5fZ3JvdW5kIC0gdGhpcy5fZ3Jhdml0eS55O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYW5pbWF0ZShjdHgpIHtcbiAgICAgICAgdGhpcy5kcmF3QmlyZChjdHgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUJpcmQoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJpcmQ7IiwiY2xhc3MgQmxvY2sge1xuICAgIGNvbnN0cnVjdG9yKGN0eCwgeCwgeSwgdyA9IDMwLCBoID0gMTAwKSB7XG4gICAgICAgIHRoaXMuX2N0eCA9IGN0eDtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy53ID0gdztcbiAgICAgICAgdGhpcy5oID0gaDtcbiAgICAgICAgdGhpcy5yID0gMC4xO1xuICAgICAgICB0aGlzLmR4ID0gMDtcbiAgICAgICAgdGhpcy5keSA9IDA7XG4gICAgICAgIHRoaXMuZHIgPSAwO1xuICAgICAgICB0aGlzLklOU0VUID0gMTA7XG4gICAgICAgIHRoaXMuUEkgPSBNYXRoLlBJO1xuICAgICAgICB0aGlzLlBJOTAgPSBNYXRoLlBJIC8gMjtcbiAgICAgICAgdGhpcy5QSTIgPSBNYXRoLlBJICogMjtcbiAgICAgICAgdGhpcy5XQUxMX05PUk1TID0gWyBNYXRoLlBJIC8gMiwgTWF0aC5QSSwgLShNYXRoLlBJIC8gMiksIDBdXG4gICAgICAgIHRoaXMuX2dyb3VuZCA9IHRoaXMuX2N0eC5jYW52YXMuaGVpZ2h0IC0gMTA1O1xuICAgICAgICB0aGlzLm1hc3MgPSB0aGlzLmdldE1hc3MoKVxuICAgIH1cblxuICAgIGFuaW1hdGUoY3R4KSB7XG4gICAgICAgIGN0eC5zYXZlKClcbiAgICAgICAgY3R4LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTtcbiAgICAgICAgdGhpcy51cGRhdGVCbG9jaygpO1xuICAgICAgICB0aGlzLmRyYXdCbG9jayhjdHgpO1xuICAgICAgICBjdHgucmVzdG9yZSgpXG5cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDQ7IGkrKyl7XG4gICAgICAgICAgICB2YXIgcCA9IHRoaXMuZ2V0UG9pbnQoaSk7XG4gICAgICAgICAgICAvLyBvbmx5IGRvIG9uZSBjb2xsaXNpb24gcGVyIGZyYW1lIG9yIHdlIHdpbGwgZW5kIHVwIGFkZGluZyBlbmVyZ3lcbiAgICAgICAgICAgIGlmKHAucG9zLnggPCB0aGlzLklOU0VUKXtcbiAgICAgICAgICAgICAgICB0aGlzLnggKz0gKHRoaXMuSU5TRVQpIC0gcC5wb3MueDtcbiAgICAgICAgICAgICAgICB0aGlzLmRvQ29sbGlzaW9uKHAsMylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoIHAucG9zLnggPiBjdHguY2FudmFzLndpZHRoLXRoaXMuSU5TRVQpe1xuICAgICAgICAgICAgICAgIHRoaXMueCArPSAoY3R4LmNhbnZhcy53aWR0aCAtIHRoaXMuSU5TRVQpIC0gcC5wb3MueDtcbiAgICAgICAgICAgICAgICB0aGlzLmRvQ29sbGlzaW9uKHAsMSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYocC5wb3MueSA8IHRoaXMuSU5TRVQpe1xuICAgICAgICAgICAgICAgIHRoaXMueSArPSAodGhpcy5JTlNFVCkgLSBwLnBvcy55O1xuICAgICAgICAgICAgICAgIHRoaXMuZG9Db2xsaXNpb24ocCwwKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiggcC5wb3MueSA+IGN0eC5jYW52YXMuaGVpZ2h0IC0gdGhpcy5JTlNFVCl7XG4gICAgICAgICAgICAgICAgdGhpcy55ICs9IChjdHguY2FudmFzLmhlaWdodCAtIHRoaXMuSU5TRVQpIC0gcC5wb3MueTtcbiAgICAgICAgICAgICAgICB0aGlzLmRvQ29sbGlzaW9uKHAsMilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldE1hc3MoKSB7XG4gICAgICAgIHJldHVybiAoIHRoaXMudyAqIHRoaXMuaCAqIHRoaXMuaCkgLyAxMDAwO1xuICAgIH1cblxuICAgIGRyYXdCbG9jayhjdHgpIHtcbiAgICAgICAgY3R4LnNldFRyYW5zZm9ybSgxLDAsMCwxLHRoaXMueCx0aGlzLnkpO1xuICAgICAgICBjdHgucm90YXRlKHRoaXMucik7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIkJsdWVcIjtcbiAgICAgICAgY3R4LmZpbGxSZWN0KC10aGlzLncvMiwgLXRoaXMuaC8yLCB0aGlzLncsIHRoaXMuaClcbiAgICAgICAgY3R4LnN0cm9rZVJlY3QoLXRoaXMudy8yLCAtdGhpcy5oLzIsIHRoaXMudywgdGhpcy5oKVxuICAgIH1cblxuICAgIHVwZGF0ZUJsb2NrKCkge1xuICAgICAgICB0aGlzLnggKz0gdGhpcy5keDtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMuZHk7XG4gICAgICAgIHRoaXMuZHkgKz0gMC4wNjE7XG4gICAgICAgIHRoaXMuciArPSB0aGlzLmRyO1xuXG4gICAgICAgIC8vIGlmICh0aGlzLnkgPj0gdGhpcy5fZ3JvdW5kKSB7XG4gICAgICAgIC8vICAgICB0aGlzLnkgPSB0aGlzLl9ncm91bmQgXG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICBnZXRQb2ludCh3aGljaCkge1xuICAgICAgICB2YXIgZHgsIGR5LCB4LCB5LCB4eCwgeXksIHZlbG9jaXR5QSwgdmVsb2NpdHlULCB2ZWxvY2l0eTtcblxuICAgICAgICBkeCA9IE1hdGguY29zKHRoaXMucik7XG4gICAgICAgIGR5ID0gTWF0aC5zaW4odGhpcy5yKTtcblxuICAgICAgICBzd2l0Y2ggKHdoaWNoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgeCA9IC10aGlzLncgLyAyO1xuICAgICAgICAgICAgICAgIHkgPSAtdGhpcy5oIC8gMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICB4ID0gdGhpcy53IC8gMjtcbiAgICAgICAgICAgICAgICB5ID0gLXRoaXMuaCAvIDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgeCA9IHRoaXMudyAvIDI7XG4gICAgICAgICAgICAgICAgeSA9IHRoaXMuaCAvIDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgeCA9IC10aGlzLncgLyAyO1xuICAgICAgICAgICAgICAgIHkgPSB0aGlzLmggLyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHggPSB0aGlzLng7XG4gICAgICAgICAgICAgICAgeSA9IHRoaXMueTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB4eCAsIHl5O1xuICAgICAgICB4eCA9IHggKiBkeCArIHkgKiAtZHk7XG4gICAgICAgIHl5ID0geCAqIGR5ICsgeSAqIGR4O1xuXG4gICAgICAgIHZhciBkZXRhaWxzID0gdGhpcy5hc1BvbGFyKHRoaXMudmVjdG9yKHh4LCB5eSkpO1xuXG4gICAgICAgIHh4ICs9IHRoaXMueDtcbiAgICAgICAgeXkgKz0gdGhpcy55O1xuXG4gICAgICAgIHZlbG9jaXR5QSA9IHRoaXMucG9sYXIoZGV0YWlscy5tYWcgKiB0aGlzLmRyLCBkZXRhaWxzLmRpciArIHRoaXMuUEk5MCk7XG4gICAgICAgIHZlbG9jaXR5VCA9IHRoaXMudmVjdG9yQWRkKHZlbG9jaXR5ID0gdGhpcy52ZWN0b3IodGhpcy5keCwgdGhpcy5keSksIHZlbG9jaXR5QSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZlbG9jaXR5OiB2ZWxvY2l0eSxcbiAgICAgICAgICAgIHZlbG9jaXR5VDogdmVsb2NpdHlULFxuICAgICAgICAgICAgdmVsb2NpdHlBIDogdmVsb2NpdHlBLFxuICAgICAgICAgICAgcG9zOiB0aGlzLnZlY3Rvcih4eCwgeXkpLFxuICAgICAgICAgICAgcmFkaXVzOiBkZXRhaWxzLm1hZ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcG9sYXIobWFnID0gMSwgZGlyID0gMCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZVBvbGFyKHtkaXI6IGRpciwgbWFnOiBtYWd9KVxuICAgIH1cblxuICAgIHZlY3Rvcih4ID0gMSwgeSA9IDApIHtcbiAgICAgICAgcmV0dXJuIHsgeDogeCwgeTogeX07XG4gICAgfVxuXG4gICAgdmFsaWRhdGVQb2xhcih2ZWMpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNQb2xhcih2ZWMpKSB7XG4gICAgICAgICAgICBpZih2ZWMubWFnIDwgMCl7XG4gICAgICAgICAgICAgICAgdmVjLm1hZyA9IC12ZWMubWFnO1xuICAgICAgICAgICAgICAgIHZlYy5kaXIgKz0gdGhpcy5QSTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmVjO1xuICAgIH1cblxuICAgIHBvbGFyVG9DYXJ0KHBWZWMsIHJldFYgPSB7eDogMCwgeTogMH0pe1xuICAgICAgICByZXRWLnggPSBNYXRoLmNvcyhwVmVjLmRpcikgKiBwVmVjLm1hZztcbiAgICAgICAgcmV0Vi55ID0gTWF0aC5zaW4ocFZlYy5kaXIpICogcFZlYy5tYWc7XG4gICAgICAgIHJldHVybiByZXRWXG4gICAgfVxuXG4gICAgYXNQb2xhcih2ZWMpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNDYXJ0KHZlYykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhcnRUb1BvbGFyKHZlYylcbiAgICAgICAgfVxuICAgICAgICBpZiAodmVjLm1hZyA8IDApIHtcbiAgICAgICAgICAgIHZlYy5tYWcgPSAtdmVjLm1hZztcbiAgICAgICAgICAgIHZlYy5kaXIgKz0gdGhpcy5QSTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBkaXI6IHZlYy5kaXIsIG1hZzogdmVjLm1hZ307XG4gICAgfVxuXG4gICAgaXNDYXJ0KHZlYykgeyBpZih2ZWMueCAhPT0gdW5kZWZpbmVkICYmIHZlYy55ICE9PSB1bmRlZmluZWQpIHsgcmV0dXJuIHRydWU7IH0gcmV0dXJuIGZhbHNlOyB9XG4gICAgaXNQb2xhcih2ZWMpIHsgaWYodmVjLm1hZyAhPT0gdW5kZWZpbmVkICYmIHZlYy5kaXIgIT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdHJ1ZTsgfSByZXR1cm4gZmFsc2U7IH1cbiAgICBhc0NhcnQodmVjKSB7XG4gICAgICAgIGlmICh0aGlzLmlzUG9sYXIodmVjKSkge3JldHVybiB0aGlzLnBvbGFyVG9DYXJ0KHZlYyl9XG4gICAgICAgIHJldHVybiB7eDogdmVjLngsIHk6IHZlYy55fVxuICAgIH1cbiAgICBjYXJ0VG9Qb2xhcih2ZWMsIHJldFYgPSB7ZGlyOiAwLCBtYWc6IDB9KSB7XG4gICAgICAgIHJldFYuZGlyID0gTWF0aC5hdGFuMih2ZWMueSwgdmVjLngpO1xuICAgICAgICByZXRWLm1hZyA9IE1hdGguaHlwb3QodmVjLngsIHZlYy55KTtcbiAgICAgICAgcmV0dXJuIHJldFY7XG4gICAgfVxuXG4gICAgdmVjdG9yQWRkKHZlYzEsIHZlYzIpIHtcbiAgICAgICAgdmFyIHYxID0gdGhpcy5hc0NhcnQodmVjMSk7XG4gICAgICAgIHZhciB2MiA9IHRoaXMuYXNDYXJ0KHZlYzIpO1xuICAgICAgICByZXR1cm4gdGhpcy52ZWN0b3IodjEueCArIHYyLngsIHYxLnkgKyB2Mi55KVxuICAgIH1cblxuICAgIGFwcGx5Rm9yY2UoZm9yY2UsIGxvYykge1xuICAgICAgICB0aGlzLnZhbGlkYXRlUG9sYXIoZm9yY2UpO1xuICAgICAgICB2YXIgbCA9IHRoaXMuYXNDYXJ0KGxvYyk7XG4gICAgICAgIHZhciB0b0NlbnRlciA9IHRoaXMuYXNQb2xhcih0aGlzLnZlY3Rvcih0aGlzLnggLSBsLngsIHRoaXMueSAtIGwueSkpO1xuICAgICAgICB2YXIgcGhldGEgPSB0b0NlbnRlci5kaXIgLSBmb3JjZS5kaXI7XG4gICAgICAgIHZhciBGdiA9IE1hdGguY29zKHBoZXRhKSAqIGZvcmNlLm1hZztcbiAgICAgICAgdmFyIEZhID0gTWF0aC5zaW4ocGhldGEpICogZm9yY2UubWFnO1xuICAgICAgICB2YXIgYWNjZWwgPSB0aGlzLmFzUG9sYXIodG9DZW50ZXIpO1xuICAgICAgICBhY2NlbC5tYWcgPSBGdiAvIHRoaXMubWFzczsgXG4gICAgICAgIHZhciBkZWx0YVYgPSB0aGlzLmFzQ2FydChhY2NlbCk7IFxuICAgICAgICB0aGlzLmR4ICs9IGRlbHRhVi54IFxuICAgICAgICB0aGlzLmR5ICs9IGRlbHRhVi55XG4gICAgICAgIHZhciBhY2NlbEEgPSBGYSAvICh0b0NlbnRlci5tYWcgICogdGhpcy5tYXNzKTsgXG4gICAgICAgIHRoaXMuZHIgKz0gYWNjZWxBO1xuICAgIH1cblxuICAgIHZlY3RvckNvbXBvbmVudHNGb3JEaXIodmVjLCBkaXIpIHtcbiAgICAgICAgdmFyIHYgPSB0aGlzLmFzUG9sYXIodmVjKTsgXG4gICAgICAgIHZhciBwaGV0YSA9IHYuZGlyIC0gZGlyO1xuICAgICAgICB2YXIgRnYgPSBNYXRoLmNvcyhwaGV0YSkgKiB2Lm1hZztcbiAgICAgICAgdmFyIEZhID0gTWF0aC5zaW4ocGhldGEpICogdi5tYWc7XG5cbiAgICAgICAgdmFyIGQxID0gZGlyO1xuICAgICAgICB2YXIgZDIgPSBkaXIgKyB0aGlzLlBJOTA7ICAgIFxuICAgICAgICBpZihGdiA8IDApe1xuICAgICAgICAgICAgZDEgKz0gdGhpcy5QSTtcbiAgICAgICAgICAgIEZ2ID0gLUZ2O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoRmEgPCAwKXtcbiAgICAgICAgICAgIGQyICs9IHRoaXMuUEk7XG4gICAgICAgICAgICBGYSA9IC1GYTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWxvbmcgOiB0aGlzLnBvbGFyKEZ2LGQxKSxcbiAgICAgICAgICAgIHRhbmdlbnQgOiB0aGlzLnBvbGFyKEZhLGQyKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGRvQ29sbGlzaW9uKHBvaW50RGV0YWlscywgd2FsbEluZGV4KSB7XG4gICAgICAgIHZhciB2diA9IHRoaXMuYXNQb2xhcihwb2ludERldGFpbHMudmVsb2NpdHkpOyBcbiAgICAgICAgdmFyIHZhID0gdGhpcy5hc1BvbGFyKHBvaW50RGV0YWlscy52ZWxvY2l0eUEpOyBcbiAgICAgICAgdmFyIHZ2YyA9IHRoaXMudmVjdG9yQ29tcG9uZW50c0ZvckRpcih2diwgdGhpcy5XQUxMX05PUk1TW3dhbGxJbmRleF0pO1xuICAgICAgICB2YXIgdmFjID0gdGhpcy52ZWN0b3JDb21wb25lbnRzRm9yRGlyKHZhLCB0aGlzLldBTExfTk9STVNbd2FsbEluZGV4XSk7XG5cbiAgICAgICAgdnZjLmFsb25nLm1hZyAqPSAxLjE4OyBcbiAgICAgICAgdmFjLmFsb25nLm1hZyAqPSAxLjE4OyBcblxuICAgICAgICB2dmMuYWxvbmcubWFnICo9IHRoaXMubWFzcztcbiAgICAgICAgdmFjLmFsb25nLm1hZyAqPSB0aGlzLm1hc3M7XG5cbiAgICAgICAgdnZjLmFsb25nLmRpciArPSB0aGlzLlBJO1xuICAgICAgICB2YWMuYWxvbmcuZGlyICs9IHRoaXMuUEk7XG5cbiAgICAgICAgdnZjLnRhbmdlbnQubWFnICo9IDAuMTg7ICBcbiAgICAgICAgdmFjLnRhbmdlbnQubWFnICo9IDAuMTg7XG4gICAgICAgIHZ2Yy50YW5nZW50Lm1hZyAqPSB0aGlzLm1hc3MgIFxuICAgICAgICB2YWMudGFuZ2VudC5tYWcgKj0gdGhpcy5tYXNzXG4gICAgICAgIHZ2Yy50YW5nZW50LmRpciArPSB0aGlzLlBJOyBcbiAgICAgICAgdmFjLnRhbmdlbnQuZGlyICs9IHRoaXMuUEk7XG5cbiAgICAgICAgdGhpcy5hcHBseUZvcmNlKHZ2Yy5hbG9uZywgcG9pbnREZXRhaWxzLnBvcykgICAgXG4gICAgICAgIHRoaXMuYXBwbHlGb3JjZSh2dmMudGFuZ2VudCwgcG9pbnREZXRhaWxzLnBvcykgICAgXG4gICAgICAgIHRoaXMuYXBwbHlGb3JjZSh2YWMuYWxvbmcsIHBvaW50RGV0YWlscy5wb3MpICAgIFxuICAgICAgICB0aGlzLmFwcGx5Rm9yY2UodmFjLnRhbmdlbnQsIHBvaW50RGV0YWlscy5wb3MpICAgIFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmxvY2siLCJjbGFzcyBDYW52YXMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGggLSA0MDA7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMuY2FudmFzLndpZHRoIC8gMjtcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgfVxuICAgIGNyZWF0ZUNhbnZhcygpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmQodGhpcy5jYW52YXMpO1xuICAgICAgICB0aGlzLmNhbnZhcy5jbGFzc0xpc3QuYWRkKFwibWFpbi1jYW52YXNcIilcbiAgICB9XG5cbiAgICBjbGVhckNhbnZhcygpIHtcbiAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FudmFzO1xuIiwiY2xhc3MgUGlnIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgsIHgsIHksIHZlbFggPSAwLCB2ZWxZID0gMCwgcmFkaXVzID0gMTUsIGNvbG9yID0gXCJPUkFOR0VcIikge1xuICAgICAgICB0aGlzLl9jdHggPSBjdHg7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMudmVsWCA9IHZlbFg7XG4gICAgICAgIHRoaXMudmVsWSA9IHZlbFk7XG4gICAgICAgIHRoaXMuX3JhZGl1cyA9IHJhZGl1cztcbiAgICAgICAgdGhpcy5fbWFzcyA9IDI7XG4gICAgICAgIHRoaXMuX2NvbG9yID0gY29sb3I7XG5cbiAgICAgICAgdGhpcy5fZ3Jhdml0eSA9IHsgeDogMCwgeTogMC4xIH07XG4gICAgICAgIHRoaXMuX2dyb3VuZCA9IHRoaXMuX2N0eC5jYW52YXMuaGVpZ2h0IC0gMjA7XG4gICAgICAgIHRoaXMuX2JvdW5jZSA9IDAuNDtcbiAgICAgICAgdGhpcy5fZnJpY3Rpb25YID0gMC45O1xuICAgICAgICB0aGlzLl9tYXNzID0gMjtcbiAgICB9XG5cbiAgICBkcmF3UGlnKGN0eCkge1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5fY29sb3I7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5fcmFkaXVzLCAwLCAoTWF0aC5QSSAqIDIpLCBmYWxzZSk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVQaWcoKSB7XG4gICAgICAgIHRoaXMudmVsWCArPSB0aGlzLl9ncmF2aXR5Lng7XG4gICAgICAgIHRoaXMudmVsWSArPSB0aGlzLl9ncmF2aXR5Lnk7XG4gICAgICAgIHRoaXMueCArPSB0aGlzLnZlbFg7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLnZlbFk7XG5cbiAgICAgICAgaWYgKHRoaXMueSA+PSB0aGlzLl9ncm91bmQpIHtcbiAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuX2dyb3VuZCAtICh0aGlzLnkgLSB0aGlzLl9ncm91bmQpO1xuICAgICAgICAgICAgdGhpcy52ZWxZID0gLU1hdGguYWJzKHRoaXMudmVsWSkgKiB0aGlzLl9ib3VuY2U7XG4gICAgICAgICAgICBpZiAodGhpcy52ZWxZID49IHRoaXMuX2dyYXZpdHkueSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVsWSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5fZ3JvdW5kIC0gdGhpcy5fZ3Jhdml0eS55O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudmVsWCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlbFggLT0gdGhpcy5fZnJpY3Rpb25YO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudmVsWCA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlbFggKz0gdGhpcy5fZnJpY3Rpb25YO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHN0b3BzIGJhbGwgZnJvbSBib3VuY2luZyBpbiBZIGF4aXNcbiAgICAgICAgaWYgKHRoaXMudmVsWTwwICYmIHRoaXMudmVsWT4tMi4xKSB7XG4gICAgICAgICAgICB0aGlzLnZlbFkgPSAwO1xuICAgICAgICB9XG4gICAgICAgIC8vIHN0b3BzIGJhbGwgZnJvbSBtb3Zpbmcgb24gWCBheGlzIGlmIHgtdmVsb2NpdHkgPCAxLjFcbiAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMudmVsWCkgPCAxLjEpIHtcbiAgICAgICAgICAgIHRoaXMudmVsWCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbmltYXRlKGN0eCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVBpZygpO1xuICAgICAgICB0aGlzLmRyYXdQaWcoY3R4KTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUGlnOyIsImltcG9ydCBCaXJkIGZyb20gXCIuL2JpcmRcIjtcblxuY2xhc3MgUHJvamVjdGlsZSB7XG4gICAgY29uc3RydWN0b3IoY3R4KSB7XG4gICAgICAgIHRoaXMuX2N0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5jb250ID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5sYXVuY2ggPSB0aGlzLmxhdW5jaC5iaW5kKHRoaXMpXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gTWF0aC5yYW5kb20oKSo3MDArMjA7XG4gICAgICAgIHRoaXMuYmlyZE9iamVjdHMgPSBbXTtcbiAgICAgICAgdGhpcy5tYXggPSAxO1xuICAgICAgICB0aGlzLmN1cnJlbnRCaXJkO1xuICAgIH1cblxuICAgIGxhdW5jaChhbmdsZVZhbCwgbWFnVmFsKSB7XG4gICAgICAgIGxldCBhbmdsZSA9IE1hdGguUEkqIGFuZ2xlVmFsIC8xODA7XG4gICAgICAgIGxldCBtYWduaXR1ZGUgPSBtYWdWYWw7XG5cbiAgICAgICAgY29uc3Qgb2JqTGF1bmNoID0gbmV3IE9iamVjdExhdW5jaCh0aGlzLl9jdHgsIDEwMCwgNjUwLCBuZXcgQmlyZCh0aGlzLl9jdHgpKTtcbiAgICAgICAgdGhpcy5iaXJkT2JqZWN0cy5wdXNoKG9iakxhdW5jaCk7XG4gICAgICAgIG9iakxhdW5jaC52ZWxZID0tIG1hZ25pdHVkZSAqIE1hdGguc2luKGFuZ2xlKTtcbiAgICAgICAgb2JqTGF1bmNoLnZlbFggPSBtYWduaXR1ZGUgKiBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgIG9iakxhdW5jaC50cmFuc2ZlciA9IDAuODtcbiAgICB9XG5cbiAgICBsYXVuY2hMb29wKGN0eCwgcGlncywgYmxvY2tzKSB7XG4gICAgICAgIGlmICh0aGlzLmJpcmRPYmplY3RzLmxlbmd0aCA+IHRoaXMubWF4KSB7XG4gICAgICAgICAgICB0aGlzLmJpcmRPYmplY3RzWzBdLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy5iaXJkT2JqZWN0cyA9IHRoaXMuYmlyZE9iamVjdHMuc3BsaWNlKDEpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNvbnQpIHtcbiAgICAgICAgICAgIHRoaXMubGF1bmNoKClcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYmlyZE9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50QmlyZCA9IHRoaXMuYmlyZE9iamVjdHNbaV1cbiAgICAgICAgICAgIC8vIGlmICh0aGlzLmN1cnJlbnRCaXJkLl95ICsgdGhpcy5jdXJyZW50QmlyZC50eXBlLnJhZGl1cyA+PSA3MDApIHtcbiAgICAgICAgICAgIC8vICAgICBpZiAodGhpcy5ib3VuY2UpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5jdXJyZW50QmlyZC52ZWxZICo9IHRoaXMuY3VycmVudEJpcmQudHJhbnNmZXI7XG4gICAgICAgICAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5jdXJyZW50QmlyZC52ZWxYID0gMDtcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5jdXJyZW50QmlyZC52ZWxZID0gMDtcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICBjdXJyZW50QmlyZC52ZWxZICs9IDEuNTM7XG4gICAgICAgICAgICBjdXJyZW50QmlyZC5feCArPSBjdXJyZW50QmlyZC52ZWxYIC8gMztcbiAgICAgICAgICAgIGN1cnJlbnRCaXJkLl95ICs9IGN1cnJlbnRCaXJkLnZlbFkgLyAzO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRCaXJkLl95ICsgY3VycmVudEJpcmQudHlwZS5yYWRpdXMgPiA3MDApIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50QmlyZC5feSA9IDcwMCAtIGN1cnJlbnRCaXJkLnR5cGUucmFkaXVzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VycmVudEJpcmQudXBkYXRlT2JqZWN0KHBpZ3MsIGJsb2NrcylcbiAgICAgICAgICAgIGN1cnJlbnRCaXJkLmRyYXdPYmplY3RMYXVuY2godGhpcy5fY3R4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFuaW1hdGUoY3R4LCBwaWdzLCBibG9ja3MpIHtcbiAgICAgICAgdGhpcy5sYXVuY2hMb29wKGN0eCwgcGlncywgYmxvY2tzKTtcbiAgICB9XG59XG5cbmNsYXNzIE9iamVjdExhdW5jaCB7XG4gICAgY29uc3RydWN0b3IoY3R4LCB4ID0gNTAsIHkgPSA1MCwgdHlwZSkge1xuICAgICAgICB0aGlzLl9jdHggPSBjdHg7XG4gICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgdGhpcy52ZWxYID0gMDtcbiAgICAgICAgdGhpcy52ZWxZID0gMDtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy50cmFuc2ZlciA9IDAuOTtcbiAgICAgICAgdGhpcy5yZW1vdmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2dyYXZpdHkgPSB7IHg6IDAsIHk6IDAuMSB9O1xuICAgICAgICB0aGlzLl9ncm91bmQgPSB0aGlzLl9jdHguY2FudmFzLmhlaWdodCAtIDIwO1xuICAgICAgICB0aGlzLl9ib3VuY2UgPSAwLjU7XG4gICAgICAgIHRoaXMuX2ZyaWN0aW9uWCA9IDAuOTtcbiAgICAgICAgdGhpcy5fbWFzcyA9IDI7XG4gICAgICAgIHRoaXMucmFkaXVzID0gMTQ7XG4gICAgfVxuXG4gICAgcmVtb3ZlKCkge1xuICAgICAgICB0aGlzLnJlbW92ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGRyYXdPYmplY3RMYXVuY2goY3R4KSB7XG4gICAgICAgIHRoaXMudHlwZS5kcmF3QmlyZChjdHgsIHRoaXMuX3gsIHRoaXMuX3kpXG4gICAgfVxuXG4gICAgY2hlY2tCaXJkT25QaWdDb2xsaXNpb24ocGlncykge1xuICAgICAgICBpZiAocGlncykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwaWdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ggKyB0aGlzLnR5cGUuX3JhZGl1cyArIHBpZ3NbaV0uX3JhZGl1cyA+IHBpZ3NbaV0ueFxuICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLl94IDwgcGlnc1tpXS54ICsgdGhpcy50eXBlLl9yYWRpdXMgKyBwaWdzW2ldLl9yYWRpdXNcbiAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5feSArIHRoaXMudHlwZS5fcmFkaXVzICsgcGlnc1tpXS5fcmFkaXVzID4gcGlnc1tpXS55XG4gICAgICAgICAgICAgICAgICAgICYmIHRoaXMuX3kgPCBwaWdzW2ldLnkgKyB0aGlzLnR5cGUuX3JhZGl1cyArIHBpZ3NbaV0uX3JhZGl1cykgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAvLyBweXRoYWdvcmVhbSB0aGVvcmVtIHRvIGJlIG1vcmUgZXhhY3Qgb24gY29sbGlzaW9uXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IE1hdGguc3FydChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKCh0aGlzLl94IC0gcGlnc1tpXS54KSAqICh0aGlzLl94IC0gcGlnc1tpXS54KSlcbiAgICAgICAgICAgICAgICAgICAgICAgICsgKCh0aGlzLl95IC0gcGlnc1tpXS55KSAqICh0aGlzLl95IC0gcGlnc1tpXS55KSlcbiAgICAgICAgICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8IHRoaXMudHlwZS5fcmFkaXVzICsgcGlnc1tpXS5fcmFkaXVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJpcmRPblBpZ0NvbGxpc2lvbkxvZ2ljKHBpZ3NbaV0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja0JpcmRPbkJsb2NrQ29sbGlzaW9uKGJsb2Nrcykge1xuICAgICAgICBpZiAoYmxvY2tzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJsb2Nrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgNDsgaisrKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2lyY2xlQ2VudGVyID0gW3RoaXMuX3gsIHRoaXMuX3ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaiArIDEgPT09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrQmlyZEludGVyY2VwdEJsb2NrKGJsb2Nrc1tpXS5nZXRQb2ludChqKSwgYmxvY2tzW2ldLmdldFBvaW50KDApLCBjaXJjbGVDZW50ZXIsIHRoaXMucmFkaXVzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmlyZE9uQmxvY2tDb2xsaXNpb25Mb2dpYyhibG9ja3NbaV0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGVja0JpcmRJbnRlcmNlcHRCbG9jayhibG9ja3NbaV0uZ2V0UG9pbnQoaiksIGJsb2Nrc1tpXS5nZXRQb2ludChqICsgMSksIGNpcmNsZUNlbnRlciwgdGhpcy5yYWRpdXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iaXJkT25CbG9ja0NvbGxpc2lvbkxvZ2ljKGJsb2Nrc1tpXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBpZiAoY2hlY2tCaXJkSW50ZXJjZXB0QmxvY2soYmxvY2tzW2ldKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpcmRPblBpZ0NvbGxpc2lvbkxvZ2ljKHBpZykge1xuICAgICAgICBjb25zdCBtYXNzMSA9IHRoaXMudHlwZS5fcmFkaXVzO1xuICAgICAgICBjb25zdCBtYXNzMiA9IHBpZy5fcmFkaXVzO1xuICAgICAgICBpZiAocGlnLnZlbFggPT09IDApIHBpZy52ZWxYID0gOTtcbiAgICAgICAgLy8gaWYgKHBpZy52ZWxZID09PSAwKSBwaWcudmVsWSA9IDY7XG4gICAgICAgIC8vIGNvbnN0IHBpZ1ZlbFggPSBwaWcudmVsWDtcbiAgICAgICAgLy8gY29uc3QgcGlnVmVsWSA9IHBpZy52ZWxZO1xuXG4gICAgICAgIHRoaXMudmVsWCA9IC10aGlzLnZlbFg7XG4gICAgICAgIHRoaXMudmVsWSA9IC10aGlzLnZlbFk7XG5cbiAgICAgICAgcGlnLnZlbFggPSAtcGlnLnZlbFg7XG4gICAgICAgIHBpZy52ZWxZID0gLXBpZy52ZWxZO1xuICAgICAgICBcbiAgICAgICAgLy8gdGhpcy52ZWxYID0gKCB0aGlzLnZlbFggKiAobWFzczEgLSBtYXNzMikgKyAoMiAqIG1hc3MyICogcGlnVmVsWCkpIC8gKG1hc3MxICsgbWFzczIpO1xuICAgICAgICAvLyB0aGlzLnZlbFkgPSAoIHRoaXMudmVsWSAqIChtYXNzMSAtIG1hc3MyKSArICgyICogbWFzczIgKiBwaWdWZWxZKSkgLyAobWFzczEgKyBtYXNzMik7XG4gICAgICAgIC8vIHBpZy52ZWxYID0gKCBwaWdWZWxYICogKG1hc3MyIC0gbWFzczEpICsgKDIgKiBtYXNzMSAqIHRoaXMudmVsWCkpIC8gKG1hc3MxICsgbWFzczIpO1xuICAgICAgICAvLyBwaWcudmVsWSA9ICggcGlnVmVsWSAqIChtYXNzMiAtIG1hc3MxKSArICgyICogbWFzczEgKiB0aGlzLnZlbFkpKSAvIChtYXNzMSArIG1hc3MyKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuX3ggKz0gdGhpcy52ZWxYO1xuICAgICAgICB0aGlzLl95ICs9IHRoaXMudmVsWTtcbiAgICAgICAgcGlnLnggKz0gcGlnLnZlbFg7XG4gICAgICAgIHBpZy55ICs9IHBpZy52ZWxZO1xuICAgIH1cblxuICAgIGJpcmRPbkJsb2NrQ29sbGlzaW9uTG9naWMoYmxvY2spIHtcbiAgICAgICAgdGhpcy52ZWxYID0gLXRoaXMudmVsWDtcbiAgICAgICAgdGhpcy52ZWxZID0gLXRoaXMudmVsWTtcblxuICAgICAgICB0aGlzLl94ICs9IHRoaXMudmVsWDtcbiAgICAgICAgdGhpcy5feSArPSB0aGlzLnZlbFk7XG4gICAgfVxuXG4gICAgY2hlY2tCaXJkSW50ZXJjZXB0QmxvY2socG9pbnRBLCBwb2ludEIsIGNpcmNsZUNlbnRlciwgcmFkaXVzKSB7XG4gICAgICAgIGxldCBkaXN0O1xuICAgICAgICBjb25zdCB2ZWwxWCA9IHBvaW50Qi5wb3MueCAtIHBvaW50QS5wb3MueDtcbiAgICAgICAgY29uc3QgdmVsMVkgPSBwb2ludEIucG9zLnkgLSBwb2ludEEucG9zLnk7XG4gICAgICAgIGNvbnN0IHZlbDJYID0gY2lyY2xlQ2VudGVyWzBdIC0gcG9pbnRBLnBvcy54O1xuICAgICAgICBjb25zdCB2ZWwyWSA9IGNpcmNsZUNlbnRlclsxXSAtIHBvaW50QS5wb3MueTtcbiAgICAgICAgY29uc3QgdW5pdCA9ICh2ZWwyWCAqIHZlbDFYICsgdmVsMlkgKiB2ZWwxWSkgLyAodmVsMVkgKiB2ZWwxWSArIHZlbDFYICogdmVsMVgpO1xuICAgICAgICBpZiAodW5pdCA+PSAwICYmIHVuaXQgPD0gMSl7XG4gICAgICAgICAgICBkaXN0ID0gKHBvaW50QS5wb3MueCAgKyB2ZWwxWCAqIHVuaXQgLSBjaXJjbGVDZW50ZXJbMF0pICoqIDIgKyAocG9pbnRBLnBvcy55ICsgdmVsMVkgKiB1bml0IC0gY2lyY2xlQ2VudGVyWzFdKSAqKiAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGlzdCA9IHVuaXQgPCAwID8gXG4gICAgICAgICAgICAgICAgKHBvaW50QS5wb3MueCAtIGNpcmNsZUNlbnRlclswXSkgKiogMiArIChwb2ludEEucG9zLnkgLSBjaXJjbGVDZW50ZXJbMV0pICoqIDIgOlxuICAgICAgICAgICAgICAgIChwb2ludEIucG9zLnggLSBjaXJjbGVDZW50ZXJbMF0pICoqIDIgKyAocG9pbnRCLnBvcy55IC0gY2lyY2xlQ2VudGVyWzFdKSAqKiAyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkaXN0IDwgcmFkaXVzICogcmFkaXVzO1xuICAgIH1cblxuICAgIHVwZGF0ZU9iamVjdChwaWdzLCBibG9ja3MpIHtcbiAgICAgICAgdGhpcy5jaGVja0JpcmRPblBpZ0NvbGxpc2lvbihwaWdzKVxuICAgICAgICB0aGlzLmNoZWNrQmlyZE9uQmxvY2tDb2xsaXNpb24oYmxvY2tzKVxuICAgICAgICB0aGlzLnZlbFggKz0gdGhpcy5fZ3Jhdml0eS54O1xuICAgICAgICB0aGlzLnZlbFkgKz0gdGhpcy5fZ3Jhdml0eS55O1xuICAgICAgICB0aGlzLl94ICs9IHRoaXMudmVsWDtcbiAgICAgICAgdGhpcy5feSArPSB0aGlzLnZlbFk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3kgPj0gdGhpcy5fZ3JvdW5kKSB7XG4gICAgICAgICAgICB0aGlzLl95ID0gdGhpcy5fZ3JvdW5kIC0gKHRoaXMuX3kgLSB0aGlzLl9ncm91bmQpO1xuICAgICAgICAgICAgdGhpcy52ZWxZID0gLU1hdGguYWJzKHRoaXMudmVsWSkgKiB0aGlzLl9ib3VuY2U7XG4gICAgICAgICAgICBpZiAodGhpcy52ZWxZID49IHRoaXMuX2dyYXZpdHkueSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVsWSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5feSA9IHRoaXMuX2dyb3VuZCAtIHRoaXMuX2dyYXZpdHkueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnZlbFggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWxYIC09IHRoaXMuX2ZyaWN0aW9uWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnZlbFggPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWxYICs9IHRoaXMuX2ZyaWN0aW9uWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBzdG9wcyBiYWxsIGZyb20gYm91bmNpbmcgaW4gWSBheGlzXG4gICAgICAgIGlmICggdGhpcy5feSA+PSB0aGlzLl9ncm91bmQgLSAxMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMudmVsWSA8IDAgJiYgdGhpcy52ZWxZID4gLTEuMSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVsWSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3RvcHMgYmFsbCBmcm9tIG1vdmluZyBvbiBYIGF4aXMgaWYgeC12ZWxvY2l0eSA8IDEuMVxuICAgICAgICBpZiAoTWF0aC5hYnModGhpcy52ZWxYKSA8IDEuMSkge1xuICAgICAgICAgICAgdGhpcy52ZWxYID0gMDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0aWxlOyIsImltcG9ydCBQaWcgZnJvbSBcIi4vcGlnXCI7XG5pbXBvcnQgQmxvY2sgZnJvbSBcIi4vYmxvY2tcIjtcblxuY2xhc3MgU3RhZ2VMb2FkZXIge1xuICAgIGNvbnN0cnVjdG9yKCBudW1iZXJPZlBpZ3MgPSAyLCBwaWdzTG9jYXRpb25BcnJheSA9IFtbNTAwLCA2MDBdLCBbNjAwLCA2MDBdXSwgbnVtYmVyb2ZCbG9ja3MgPSAyLCBibG9ja0xvY2F0aW9uQXJyYXkgPSBbWzM1MCwgNzAwXSwgWzcwMCwgNzAwXV0pIHtcbiAgICAgICAgdGhpcy5udW1iZXJPZlBpZ3MgPSBudW1iZXJPZlBpZ3M7XG4gICAgICAgIHRoaXMucGlnc0xvY2F0aW9uQXJyYXkgPSBwaWdzTG9jYXRpb25BcnJheTtcbiAgICAgICAgdGhpcy5waWdzID0gW107XG5cbiAgICAgICAgdGhpcy5udW1iZXJvZkJsb2NrcyA9IG51bWJlcm9mQmxvY2tzO1xuICAgICAgICB0aGlzLmJsb2NrTG9jYXRpb25BcnJheSA9IGJsb2NrTG9jYXRpb25BcnJheTtcbiAgICAgICAgdGhpcy5ibG9ja3MgPSBbXTtcbiAgICB9XG5cbiAgICBkcmF3UGlncyhjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMucGlncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5waWdzTG9jYXRpb25BcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMucGlncy5wdXNoKG5ldyBQaWcoY3R4LCB0aGlzLnBpZ3NMb2NhdGlvbkFycmF5W2ldWzBdLCB0aGlzLnBpZ3NMb2NhdGlvbkFycmF5W2ldWzFdKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdCbG9ja3MoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLmJsb2Nrcy5sZW5ndGggPT09IDApe1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJsb2NrTG9jYXRpb25BcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tzLnB1c2gobmV3IEJsb2NrKGN0eCwgdGhpcy5ibG9ja0xvY2F0aW9uQXJyYXlbaV1bMF0sIHRoaXMuYmxvY2tMb2NhdGlvbkFycmF5W2ldWzFdKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFuaW1hdGUoY3R4KSB7XG4gICAgICAgIHRoaXMuZHJhd1BpZ3MoY3R4KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBpZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucGlnc1tpXS5hbmltYXRlKGN0eCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZHJhd0Jsb2NrcyhjdHgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYmxvY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmJsb2Nrc1tpXS5hbmltYXRlKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0YWdlTG9hZGVyOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vc3R5bGVzL2luZGV4LnNjc3NcIjtcbmltcG9ydCBDYW52YXMgZnJvbSBcIi4vc2NyaXB0cy9jYW52YXNcIjtcbmltcG9ydCBQcm9qZWN0aWxlIGZyb20gXCIuL3NjcmlwdHMvcHJvamVjdGlsZVwiO1xuaW1wb3J0IFN0YWdlTG9hZGVyIGZyb20gXCIuL3NjcmlwdHMvc3RhZ2VMb2FkZXJcIjtcblxuY29uc3QgY3VycmVudFN0YXRlT2JqID0ge1xuICBjdXJyZW50RXhhbXBsZTogbnVsbCxcbiAgY3VycmVudEV2ZW50TGlzdGVuZXJzOiBbXSxcbn07XG5cbmxldCB4LCB5O1xubGV0IGRlbHRhWCwgZGVsdGFZO1xuY29uc3QgY2VudGVyWCA9IDEzNDtcbmNvbnN0IGNlbnRlclkgPSAyNzE7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FudmFzXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdGFydENhbnZhcyk7XG5cbmZ1bmN0aW9uIHN0YXJ0Q2FudmFzKCkge1xuICAgIHVucmVnaXN0ZXJFdmVudExpc3RlbmVycygpO1xuICAgIGNvbnN0IGNhbnZhcyA9IG5ldyBDYW52YXMoKTtcbiAgICBjYW52YXMuY3JlYXRlQ2FudmFzKCk7XG4gICAgY29uc3QgY2FudmFzT2JqID0gY2FudmFzLmNhbnZhcztcbiAgICBsZXQgY2FudmFzUG9zaXRpb24gPSBjYW52YXNPYmouZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICBjb25zdCBwcm9qZWN0aWxlID0gbmV3IFByb2plY3RpbGUoY2FudmFzLmN0eClcblxuICAgIGNvbnN0IG1vdXNlID0ge1xuICAgICAgeDogY2FudmFzLndpZHRoLzIsXG4gICAgICB5OiBjYW52YXMuaGVpZ2h0LzIsXG4gICAgICBjbGljazogZmFsc2UsXG4gICAgfVxuICAgIFxuICAgIGNhbnZhc09iai5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgICBtb3VzZS54ID0gZS54IC0gY2FudmFzUG9zaXRpb24ubGVmdDtcbiAgICAgIG1vdXNlLnkgPSBlLnkgLSBjYW52YXNQb3NpdGlvbi50b3A7XG5cbiAgICB9KVxuXG4gICAgY2FudmFzT2JqLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBmdW5jdGlvbihlKXtcbiAgICAgIG1vdXNlLnggPSBlLnggLSBjYW52YXNQb3NpdGlvbi5sZWZ0O1xuICAgICAgbW91c2UueSA9IGUueSAtIGNhbnZhc1Bvc2l0aW9uLnRvcDtcblxuICAgICAgZGVsdGFYID0gbW91c2UueCAtIGNlbnRlclg7XG4gICAgICBkZWx0YVkgPSBtb3VzZS55IC0gY2VudGVyWTtcbiAgICAgIGNvbnNvbGUubG9nKE1hdGguYWJzKG1vdXNlLnggLSAxMzApKVxuICAgICAgbGV0IHRoZXRhUmFkaWFuID0gTWF0aC5hdGFuMihkZWx0YVksIGRlbHRhWCk7XG4gICAgICBsZXQgZGVncmVlcyA9IC0oKE1hdGguYWJzKHRoZXRhUmFkaWFuICogMTgwIC8gTWF0aC5QSSkgLSAyNzApICUgOTApO1xuICAgICAgLy8gY29uc29sZS5sb2coZGVncmVlcylcbiAgICAgIHByb2plY3RpbGUubGF1bmNoKGRlZ3JlZXMgLCBNYXRoLmFicyhtb3VzZS54IC0gMTMwKSlcbiAgICB9KVxuXG4gICAgY29uc3Qgc3RhZ2VMb2FkZXIgPSBuZXcgU3RhZ2VMb2FkZXIoKVxuXG4gICAgbGV0IGFuaW1hdGluZyA9IHRydWU7XG5cbiAgICBjb25zdCBhbmltYXRpb24gPSAoKSA9PiB7XG4gICAgICAgIGNhbnZhcy5jbGVhckNhbnZhcygpO1xuICAgICAgICBpZiAoYW5pbWF0aW5nKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIGltZy5zcmMgPSBcInNyYy9pbWFnZXMvcGl4aWwtbGF5ZXItQmFja2dyb3VuZC5wbmdcIjtcbiAgICAgICAgICAgIGNhbnZhcy5jdHguZHJhd0ltYWdlKGltZyw5MCwzNTApO1xuICAgICAgICAgICAgc3RhZ2VMb2FkZXIuYW5pbWF0ZShjYW52YXMuY3R4KVxuICAgICAgICAgICAgcHJvamVjdGlsZS5hbmltYXRlKGNhbnZhcy5jdHgsIHN0YWdlTG9hZGVyLnBpZ3MsIHN0YWdlTG9hZGVyLmJsb2NrcylcbiAgICAgICAgICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGF1bmNoLWJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvamVjdGlsZS5sYXVuY2gpXG5cbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbik7XG5cbiAgICAvLyAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVLZXlEb3duKTtcbiAgICAvLyAgIGN1cnJlbnRTdGF0ZU9iai5jdXJyZW50RXZlbnRMaXN0ZW5lcnMucHVzaChbXG4gICAgLy8gICAgIFwid2luZG93XCIsXG4gICAgLy8gICAgIFwia2V5ZG93blwiLFxuICAgIC8vICAgICBoYW5kbGVLZXlEb3duLFxuICAgIC8vICAgXSk7XG5cbiAgICAvLyAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZU1vdXNlRG93bik7XG4gICAgLy8gICBjdXJyZW50U3RhdGVPYmouY3VycmVudEV2ZW50TGlzdGVuZXJzLnB1c2goW1xuICAgIC8vICAgICBcIndpbmRvd1wiLFxuICAgIC8vICAgICBcIm1vdXNlZG93blwiLFxuICAgIC8vICAgICBoYW5kbGVNb3VzZURvd24sXG4gICAgLy8gICBdKTtcblxuICAgIC8vICAgZnVuY3Rpb24gaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgIC8vICAgICBpZiAoZXZlbnQud2hpY2ggPT09IDMyKSB7XG4gICAgLy8gICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAvLyAgICAgICBzcXVhcmVzLmZvckVhY2goKHNxKSA9PiBzcS5yZXZlcnNlQW5pbWF0aW9uKCkpO1xuICAgIC8vICAgICAgIGNhbnZhcy5zZXRDb2xvcihgIyR7TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTY3NzcyMTUpLnRvU3RyaW5nKDE2KX1gKTtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgfVxuXG4gICAgLy8gICBmdW5jdGlvbiBoYW5kbGVNb3VzZURvd24oZXZlbnQpIHtcbiAgICAvLyAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAvLyAgICAgc3F1YXJlcy5wdXNoKFxuICAgIC8vICAgICAgIG5ldyBTcXVhcmUoXG4gICAgLy8gICAgICAgICBjYW52YXMuY3R4LFxuICAgIC8vICAgICAgICAgY2FudmFzLmNvb3Jkcy5tYXAoKGNvKSA9PiBjbyArIDI1KSxcbiAgICAvLyAgICAgICAgIGNhbnZhcy5maWxsQ29sb3JcbiAgICAvLyAgICAgICApXG4gICAgLy8gICAgICk7XG4gICAgICAgIC8vIGFuaW1hdGluZyA9ICFhbmltYXRpbmc7XG4gICAgLy8gICB9XG59XG5cblxuZnVuY3Rpb24gdW5yZWdpc3RlckV2ZW50TGlzdGVuZXJzKCkge1xuICB3aGlsZSAoY3VycmVudFN0YXRlT2JqLmN1cnJlbnRFdmVudExpc3RlbmVycy5sZW5ndGgpIHtcbiAgICBsZXQgW1xuICAgICAgc2VsZWN0b3IsXG4gICAgICBldmVudCxcbiAgICAgIGhhbmRsZXIsXG4gICAgXSA9IGN1cnJlbnRTdGF0ZU9iai5jdXJyZW50RXZlbnRMaXN0ZW5lcnMucG9wKCk7XG4gICAgaWYgKHNlbGVjdG9yID09PSBcIndpbmRvd1wiKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlcik7XG4gICAgICBjb25zb2xlLmxvZyhoYW5kbGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlcik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNsZWFyRGVtbygpIHtcbiAgaWYgKGN1cnJlbnRTdGF0ZU9iai5jdXJyZW50RXhhbXBsZSA9PT0gXCJDQU5WQVNERU1PXCIpXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2FudmFzXCIpKTtcbiAgaWYgKGN1cnJlbnRTdGF0ZU9iai5jdXJyZW50RXhhbXBsZSA9PT0gXCJET01ERU1PXCIpIHtcbiAgICBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jYXJkXCIpXS5mb3JFYWNoKChlbGVtKSA9PlxuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlbGVtKVxuICAgICk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=