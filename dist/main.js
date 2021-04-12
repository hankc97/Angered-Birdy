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
    var w = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 40;
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
    value: function launch() {
      var angle = Math.PI * 60.0 / 180;
      var magnitude = 25.5;
      var objLaunch = new ObjectLaunch(this._ctx, 5, 690, new _bird__WEBPACK_IMPORTED_MODULE_0__.default(this._ctx));
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

      ctx.beginPath();
      ctx.fillStyle = "#555";
      ctx.moveTo(0, 700);
      ctx.lineTo(10, 680);
      ctx.lineTo(15, 690);
      ctx.lineTo(0, 700);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = "#0f0";
      ctx.arc(this.target, 701, 10, 0, Math.PI * 2, true);
      ctx.closePath();

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
    var pigsLocationArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [[200, 600], [500, 600]];
    var numberofBlocks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
    var blockLocationArray = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [[900, 700], [900, 400]];

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
document.querySelector("#canvas").addEventListener("click", startCanvas);

function startCanvas() {
  unregisterEventListeners();
  var canvas = new _scripts_canvas__WEBPACK_IMPORTED_MODULE_1__.default();
  canvas.createCanvas();
  var projectile = new _scripts_projectile__WEBPACK_IMPORTED_MODULE_2__.default(canvas.ctx);
  var stageLoader = new _scripts_stageLoader__WEBPACK_IMPORTED_MODULE_3__.default();
  var animating = true;

  var animation = function animation() {
    canvas.clearCanvas();

    if (animating) {
      stageLoader.animate(canvas.ctx);
      projectile.animate(canvas.ctx, stageLoader.pigs, stageLoader.blocks);
      document.querySelector("#launch-button").addEventListener("click", projectile.launch);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYmlyZC5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYmxvY2suanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi8uL3NyYy9zY3JpcHRzL2NhbnZhcy5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvcGlnLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9wcm9qZWN0aWxlLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9zdGFnZUxvYWRlci5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiQmlyZCIsImN0eCIsIngiLCJ5IiwidmVsWCIsInZlbFkiLCJyYWRpdXMiLCJjb2xvciIsIl9jdHgiLCJfcmFkaXVzIiwiX2NvbG9yIiwiX2dyYXZpdHkiLCJfZ3JvdW5kIiwiY2FudmFzIiwiaGVpZ2h0IiwiX2JvdW5jZSIsImZpbGxTdHlsZSIsImJlZ2luUGF0aCIsImFyYyIsIk1hdGgiLCJQSSIsImNsb3NlUGF0aCIsImZpbGwiLCJhYnMiLCJkcmF3QmlyZCIsInVwZGF0ZUJpcmQiLCJCbG9jayIsInciLCJoIiwiciIsImR4IiwiZHkiLCJkciIsIklOU0VUIiwiUEk5MCIsIlBJMiIsIldBTExfTk9STVMiLCJtYXNzIiwiZ2V0TWFzcyIsInNhdmUiLCJzZXRUcmFuc2Zvcm0iLCJ1cGRhdGVCbG9jayIsImRyYXdCbG9jayIsInJlc3RvcmUiLCJpIiwicCIsImdldFBvaW50IiwicG9zIiwiZG9Db2xsaXNpb24iLCJ3aWR0aCIsInJvdGF0ZSIsImZpbGxSZWN0Iiwic3Ryb2tlUmVjdCIsIndoaWNoIiwieHgiLCJ5eSIsInZlbG9jaXR5QSIsInZlbG9jaXR5VCIsInZlbG9jaXR5IiwiY29zIiwic2luIiwiZGV0YWlscyIsImFzUG9sYXIiLCJ2ZWN0b3IiLCJwb2xhciIsIm1hZyIsImRpciIsInZlY3RvckFkZCIsInZhbGlkYXRlUG9sYXIiLCJ2ZWMiLCJpc1BvbGFyIiwicFZlYyIsInJldFYiLCJpc0NhcnQiLCJjYXJ0VG9Qb2xhciIsInVuZGVmaW5lZCIsInBvbGFyVG9DYXJ0IiwiYXRhbjIiLCJoeXBvdCIsInZlYzEiLCJ2ZWMyIiwidjEiLCJhc0NhcnQiLCJ2MiIsImZvcmNlIiwibG9jIiwibCIsInRvQ2VudGVyIiwicGhldGEiLCJGdiIsIkZhIiwiYWNjZWwiLCJkZWx0YVYiLCJhY2NlbEEiLCJ2IiwiZDEiLCJkMiIsImFsb25nIiwidGFuZ2VudCIsInBvaW50RGV0YWlscyIsIndhbGxJbmRleCIsInZ2IiwidmEiLCJ2dmMiLCJ2ZWN0b3JDb21wb25lbnRzRm9yRGlyIiwidmFjIiwiYXBwbHlGb3JjZSIsIkNhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJnZXRDb250ZXh0IiwiYm9keSIsImFwcGVuZCIsImNsYXNzTGlzdCIsImFkZCIsImNsZWFyUmVjdCIsIlBpZyIsIl9tYXNzIiwiX2ZyaWN0aW9uWCIsInVwZGF0ZVBpZyIsImRyYXdQaWciLCJQcm9qZWN0aWxlIiwiY29udCIsImxhdW5jaCIsImJpbmQiLCJ0YXJnZXQiLCJyYW5kb20iLCJiaXJkT2JqZWN0cyIsIm1heCIsImN1cnJlbnRCaXJkIiwiYW5nbGUiLCJtYWduaXR1ZGUiLCJvYmpMYXVuY2giLCJPYmplY3RMYXVuY2giLCJwdXNoIiwidHJhbnNmZXIiLCJwaWdzIiwiYmxvY2tzIiwibGVuZ3RoIiwicmVtb3ZlIiwic3BsaWNlIiwibW92ZVRvIiwibGluZVRvIiwiX3giLCJfeSIsInR5cGUiLCJ1cGRhdGVPYmplY3QiLCJkcmF3T2JqZWN0TGF1bmNoIiwibGF1bmNoTG9vcCIsInJlbW92ZWQiLCJkaXN0YW5jZSIsInNxcnQiLCJiaXJkT25QaWdDb2xsaXNpb25Mb2dpYyIsImoiLCJjaXJjbGVDZW50ZXIiLCJjaGVja0JpcmRJbnRlcmNlcHRCbG9jayIsImJpcmRPbkJsb2NrQ29sbGlzaW9uTG9naWMiLCJwaWciLCJtYXNzMSIsIm1hc3MyIiwiYmxvY2siLCJwb2ludEEiLCJwb2ludEIiLCJkaXN0IiwidmVsMVgiLCJ2ZWwxWSIsInZlbDJYIiwidmVsMlkiLCJ1bml0IiwiY2hlY2tCaXJkT25QaWdDb2xsaXNpb24iLCJjaGVja0JpcmRPbkJsb2NrQ29sbGlzaW9uIiwiU3RhZ2VMb2FkZXIiLCJudW1iZXJPZlBpZ3MiLCJwaWdzTG9jYXRpb25BcnJheSIsIm51bWJlcm9mQmxvY2tzIiwiYmxvY2tMb2NhdGlvbkFycmF5IiwiZHJhd1BpZ3MiLCJhbmltYXRlIiwiZHJhd0Jsb2NrcyIsImN1cnJlbnRTdGF0ZU9iaiIsImN1cnJlbnRFeGFtcGxlIiwiY3VycmVudEV2ZW50TGlzdGVuZXJzIiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdGFydENhbnZhcyIsInVucmVnaXN0ZXJFdmVudExpc3RlbmVycyIsImNyZWF0ZUNhbnZhcyIsInByb2plY3RpbGUiLCJzdGFnZUxvYWRlciIsImFuaW1hdGluZyIsImFuaW1hdGlvbiIsImNsZWFyQ2FudmFzIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicG9wIiwic2VsZWN0b3IiLCJldmVudCIsImhhbmRsZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY29uc29sZSIsImxvZyIsImNsZWFyRGVtbyIsInJlbW92ZUNoaWxkIiwicXVlcnlTZWxlY3RvckFsbCIsImZv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Q0E7QUFDQTtBQUNBO0FBQ0k7QUFDSjtBQUNIOztBQUVELFNBQVNMLHdCQUFULEdBQW9DO0FBQ2xDLFNBQU9OLGVBQWUsQ0FBQ0UscUJBQWhCLENBQXNDM0MsTUFBN0MsRUFBcUQ7QUFBQSxnQ0FLL0N5QyxlQUFlLENBQUNFLHFCQUFoQixDQUFzQ1ksR0FBdEMsRUFMK0M7QUFBQTtBQUFBLFFBRWpEQyxRQUZpRDtBQUFBLFFBR2pEQyxLQUhpRDtBQUFBLFFBSWpEQyxPQUppRDs7QUFNbkQsUUFBSUYsUUFBUSxLQUFLLFFBQWpCLEVBQTJCO0FBQ3pCdEYsWUFBTSxDQUFDeUYsbUJBQVAsQ0FBMkJGLEtBQTNCLEVBQWtDQyxPQUFsQztBQUNBRSxhQUFPLENBQUNDLEdBQVIsQ0FBWUgsT0FBWjtBQUNELEtBSEQsTUFHTztBQUNMMUYsY0FBUSxDQUFDNEUsYUFBVCxDQUF1QlksUUFBdkIsRUFBaUNHLG1CQUFqQyxDQUFxREYsS0FBckQsRUFBNERDLE9BQTVEO0FBQ0Q7QUFDRjtBQUNGOztBQUVELFNBQVNJLFNBQVQsR0FBcUI7QUFDbkIsTUFBSXJCLGVBQWUsQ0FBQ0MsY0FBaEIsS0FBbUMsWUFBdkMsRUFDRTFFLFFBQVEsQ0FBQ0ssSUFBVCxDQUFjMEYsV0FBZCxDQUEwQi9GLFFBQVEsQ0FBQzRFLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBMUI7O0FBQ0YsTUFBSUgsZUFBZSxDQUFDQyxjQUFoQixLQUFtQyxTQUF2QyxFQUFrRDtBQUNoRCx1QkFBSTFFLFFBQVEsQ0FBQ2dHLGdCQUFULENBQTBCLE9BQTFCLENBQUosRUFBd0NDLE9BQXhDLENBQWdELFVBQUNDLElBQUQ7QUFBQSxhQUM5Q2xHLFFBQVEsQ0FBQ0ssSUFBVCxDQUFjMEYsV0FBZCxDQUEwQkcsSUFBMUIsQ0FEOEM7QUFBQSxLQUFoRDtBQUdEO0FBQ0YsQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQmlyZCB7XG4gICAgY29uc3RydWN0b3IoY3R4LCB4ID0gMTAwLCB5ID0gMTAwLCB2ZWxYID0gMCwgdmVsWSA9IDAsIHJhZGl1cyA9IDE0LCBjb2xvciA9IFwiUkVEXCIpIHtcbiAgICAgICAgdGhpcy5fY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLnZlbFggPSB2ZWxYO1xuICAgICAgICB0aGlzLnZlbFkgPSB2ZWxZO1xuICAgICAgICB0aGlzLl9yYWRpdXMgPSByYWRpdXM7XG4gICAgICAgIHRoaXMuX2NvbG9yID0gY29sb3I7XG5cbiAgICAgICAgdGhpcy5fZ3Jhdml0eSA9IHsgeDogMCwgeTogMC4xIH07XG4gICAgICAgIHRoaXMuX2dyb3VuZCA9IHRoaXMuX2N0eC5jYW52YXMuaGVpZ2h0O1xuICAgICAgICB0aGlzLl9ib3VuY2UgPSAxLjM7XG4gICAgfVxuXG4gICAgZHJhd0JpcmQoY3R4LCB4LCB5KSB7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLl9jb2xvcjtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKHgsIHksIHRoaXMuX3JhZGl1cywgMCwgKE1hdGguUEkgKiAyKSwgZmFsc2UpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlQmlyZCgpIHtcbiAgICAgICAgdGhpcy52ZWxYICs9IHRoaXMuX2dyYXZpdHkueDtcbiAgICAgICAgdGhpcy52ZWxZICs9IHRoaXMuX2dyYXZpdHkueTtcbiAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsWDtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMudmVsWTtcblxuICAgICAgICBpZiAodGhpcy55ID49IHRoaXMuX2dyb3VuZCkge1xuICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5fZ3JvdW5kIC0gKHRoaXMueSAtIHRoaXMuX2dyb3VuZCk7XG4gICAgICAgICAgICB0aGlzLnZlbFkgPSAtTWF0aC5hYnModGhpcy52ZWxZKSAqIHRoaXMuX2JvdW5jZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnZlbFkgPj0gdGhpcy5fZ3Jhdml0eS55KSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWxZID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLl9ncm91bmQgLSB0aGlzLl9ncmF2aXR5Lnk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbmltYXRlKGN0eCkge1xuICAgICAgICB0aGlzLmRyYXdCaXJkKGN0eCk7XG4gICAgICAgIHRoaXMudXBkYXRlQmlyZCgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmlyZDsiLCJjbGFzcyBCbG9jayB7XG4gICAgY29uc3RydWN0b3IoY3R4LCB4LCB5LCB3ID0gNDAsIGggPSAxMDApIHtcbiAgICAgICAgdGhpcy5fY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLncgPSB3O1xuICAgICAgICB0aGlzLmggPSBoO1xuICAgICAgICB0aGlzLnIgPSAwLjE7XG4gICAgICAgIHRoaXMuZHggPSAwO1xuICAgICAgICB0aGlzLmR5ID0gMDtcbiAgICAgICAgdGhpcy5kciA9IDA7XG4gICAgICAgIHRoaXMuSU5TRVQgPSAxMDtcbiAgICAgICAgdGhpcy5QSSA9IE1hdGguUEk7XG4gICAgICAgIHRoaXMuUEk5MCA9IE1hdGguUEkgLyAyO1xuICAgICAgICB0aGlzLlBJMiA9IE1hdGguUEkgKiAyO1xuICAgICAgICB0aGlzLldBTExfTk9STVMgPSBbIE1hdGguUEkgLyAyLCBNYXRoLlBJLCAtKE1hdGguUEkgLyAyKSwgMF1cbiAgICAgICAgdGhpcy5fZ3JvdW5kID0gdGhpcy5fY3R4LmNhbnZhcy5oZWlnaHQgLSAxMDU7XG4gICAgICAgIHRoaXMubWFzcyA9IHRoaXMuZ2V0TWFzcygpXG4gICAgfVxuXG4gICAgYW5pbWF0ZShjdHgpIHtcbiAgICAgICAgY3R4LnNhdmUoKVxuICAgICAgICBjdHguc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xuICAgICAgICB0aGlzLnVwZGF0ZUJsb2NrKCk7XG4gICAgICAgIHRoaXMuZHJhd0Jsb2NrKGN0eCk7XG4gICAgICAgIGN0eC5yZXN0b3JlKClcblxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgNDsgaSsrKXtcbiAgICAgICAgICAgIHZhciBwID0gdGhpcy5nZXRQb2ludChpKTtcbiAgICAgICAgICAgIC8vIG9ubHkgZG8gb25lIGNvbGxpc2lvbiBwZXIgZnJhbWUgb3Igd2Ugd2lsbCBlbmQgdXAgYWRkaW5nIGVuZXJneVxuICAgICAgICAgICAgaWYocC5wb3MueCA8IHRoaXMuSU5TRVQpe1xuICAgICAgICAgICAgICAgIHRoaXMueCArPSAodGhpcy5JTlNFVCkgLSBwLnBvcy54O1xuICAgICAgICAgICAgICAgIHRoaXMuZG9Db2xsaXNpb24ocCwzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiggcC5wb3MueCA+IGN0eC5jYW52YXMud2lkdGgtdGhpcy5JTlNFVCl7XG4gICAgICAgICAgICAgICAgdGhpcy54ICs9IChjdHguY2FudmFzLndpZHRoIC0gdGhpcy5JTlNFVCkgLSBwLnBvcy54O1xuICAgICAgICAgICAgICAgIHRoaXMuZG9Db2xsaXNpb24ocCwxKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihwLnBvcy55IDwgdGhpcy5JTlNFVCl7XG4gICAgICAgICAgICAgICAgdGhpcy55ICs9ICh0aGlzLklOU0VUKSAtIHAucG9zLnk7XG4gICAgICAgICAgICAgICAgdGhpcy5kb0NvbGxpc2lvbihwLDApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKCBwLnBvcy55ID4gY3R4LmNhbnZhcy5oZWlnaHQgLSB0aGlzLklOU0VUKXtcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gKGN0eC5jYW52YXMuaGVpZ2h0IC0gdGhpcy5JTlNFVCkgLSBwLnBvcy55O1xuICAgICAgICAgICAgICAgIHRoaXMuZG9Db2xsaXNpb24ocCwyKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TWFzcygpIHtcbiAgICAgICAgcmV0dXJuICggdGhpcy53ICogdGhpcy5oICogdGhpcy5oKSAvIDEwMDA7XG4gICAgfVxuXG4gICAgZHJhd0Jsb2NrKGN0eCkge1xuICAgICAgICBjdHguc2V0VHJhbnNmb3JtKDEsMCwwLDEsdGhpcy54LHRoaXMueSk7XG4gICAgICAgIGN0eC5yb3RhdGUodGhpcy5yKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiQmx1ZVwiO1xuICAgICAgICBjdHguZmlsbFJlY3QoLXRoaXMudy8yLCAtdGhpcy5oLzIsIHRoaXMudywgdGhpcy5oKVxuICAgICAgICBjdHguc3Ryb2tlUmVjdCgtdGhpcy53LzIsIC10aGlzLmgvMiwgdGhpcy53LCB0aGlzLmgpXG4gICAgfVxuXG4gICAgdXBkYXRlQmxvY2soKSB7XG4gICAgICAgIHRoaXMueCArPSB0aGlzLmR4O1xuICAgICAgICB0aGlzLnkgKz0gdGhpcy5keTtcbiAgICAgICAgdGhpcy5keSArPSAwLjA2MTtcbiAgICAgICAgdGhpcy5yICs9IHRoaXMuZHI7XG5cbiAgICAgICAgLy8gaWYgKHRoaXMueSA+PSB0aGlzLl9ncm91bmQpIHtcbiAgICAgICAgLy8gICAgIHRoaXMueSA9IHRoaXMuX2dyb3VuZCBcbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIGdldFBvaW50KHdoaWNoKSB7XG4gICAgICAgIHZhciBkeCwgZHksIHgsIHksIHh4LCB5eSwgdmVsb2NpdHlBLCB2ZWxvY2l0eVQsIHZlbG9jaXR5O1xuXG4gICAgICAgIGR4ID0gTWF0aC5jb3ModGhpcy5yKTtcbiAgICAgICAgZHkgPSBNYXRoLnNpbih0aGlzLnIpO1xuXG4gICAgICAgIHN3aXRjaCAod2hpY2gpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB4ID0gLXRoaXMudyAvIDI7XG4gICAgICAgICAgICAgICAgeSA9IC10aGlzLmggLyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHggPSB0aGlzLncgLyAyO1xuICAgICAgICAgICAgICAgIHkgPSAtdGhpcy5oIC8gMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB4ID0gdGhpcy53IC8gMjtcbiAgICAgICAgICAgICAgICB5ID0gdGhpcy5oIC8gMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICB4ID0gLXRoaXMudyAvIDI7XG4gICAgICAgICAgICAgICAgeSA9IHRoaXMuaCAvIDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgeCA9IHRoaXMueDtcbiAgICAgICAgICAgICAgICB5ID0gdGhpcy55O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHh4ICwgeXk7XG4gICAgICAgIHh4ID0geCAqIGR4ICsgeSAqIC1keTtcbiAgICAgICAgeXkgPSB4ICogZHkgKyB5ICogZHg7XG5cbiAgICAgICAgdmFyIGRldGFpbHMgPSB0aGlzLmFzUG9sYXIodGhpcy52ZWN0b3IoeHgsIHl5KSk7XG5cbiAgICAgICAgeHggKz0gdGhpcy54O1xuICAgICAgICB5eSArPSB0aGlzLnk7XG5cbiAgICAgICAgdmVsb2NpdHlBID0gdGhpcy5wb2xhcihkZXRhaWxzLm1hZyAqIHRoaXMuZHIsIGRldGFpbHMuZGlyICsgdGhpcy5QSTkwKTtcbiAgICAgICAgdmVsb2NpdHlUID0gdGhpcy52ZWN0b3JBZGQodmVsb2NpdHkgPSB0aGlzLnZlY3Rvcih0aGlzLmR4LCB0aGlzLmR5KSwgdmVsb2NpdHlBKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmVsb2NpdHk6IHZlbG9jaXR5LFxuICAgICAgICAgICAgdmVsb2NpdHlUOiB2ZWxvY2l0eVQsXG4gICAgICAgICAgICB2ZWxvY2l0eUEgOiB2ZWxvY2l0eUEsXG4gICAgICAgICAgICBwb3M6IHRoaXMudmVjdG9yKHh4LCB5eSksXG4gICAgICAgICAgICByYWRpdXM6IGRldGFpbHMubWFnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwb2xhcihtYWcgPSAxLCBkaXIgPSAwKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlUG9sYXIoe2RpcjogZGlyLCBtYWc6IG1hZ30pXG4gICAgfVxuXG4gICAgdmVjdG9yKHggPSAxLCB5ID0gMCkge1xuICAgICAgICByZXR1cm4geyB4OiB4LCB5OiB5fTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZVBvbGFyKHZlYykge1xuICAgICAgICBpZiAodGhpcy5pc1BvbGFyKHZlYykpIHtcbiAgICAgICAgICAgIGlmKHZlYy5tYWcgPCAwKXtcbiAgICAgICAgICAgICAgICB2ZWMubWFnID0gLXZlYy5tYWc7XG4gICAgICAgICAgICAgICAgdmVjLmRpciArPSB0aGlzLlBJO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2ZWM7XG4gICAgfVxuXG4gICAgcG9sYXJUb0NhcnQocFZlYywgcmV0ViA9IHt4OiAwLCB5OiAwfSl7XG4gICAgICAgIHJldFYueCA9IE1hdGguY29zKHBWZWMuZGlyKSAqIHBWZWMubWFnO1xuICAgICAgICByZXRWLnkgPSBNYXRoLnNpbihwVmVjLmRpcikgKiBwVmVjLm1hZztcbiAgICAgICAgcmV0dXJuIHJldFZcbiAgICB9XG5cbiAgICBhc1BvbGFyKHZlYykge1xuICAgICAgICBpZiAodGhpcy5pc0NhcnQodmVjKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FydFRvUG9sYXIodmVjKVxuICAgICAgICB9XG4gICAgICAgIGlmICh2ZWMubWFnIDwgMCkge1xuICAgICAgICAgICAgdmVjLm1hZyA9IC12ZWMubWFnO1xuICAgICAgICAgICAgdmVjLmRpciArPSB0aGlzLlBJO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGRpcjogdmVjLmRpciwgbWFnOiB2ZWMubWFnfTtcbiAgICB9XG5cbiAgICBpc0NhcnQodmVjKSB7IGlmKHZlYy54ICE9PSB1bmRlZmluZWQgJiYgdmVjLnkgIT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdHJ1ZTsgfSByZXR1cm4gZmFsc2U7IH1cbiAgICBpc1BvbGFyKHZlYykgeyBpZih2ZWMubWFnICE9PSB1bmRlZmluZWQgJiYgdmVjLmRpciAhPT0gdW5kZWZpbmVkKSB7IHJldHVybiB0cnVlOyB9IHJldHVybiBmYWxzZTsgfVxuICAgIGFzQ2FydCh2ZWMpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNQb2xhcih2ZWMpKSB7cmV0dXJuIHRoaXMucG9sYXJUb0NhcnQodmVjKX1cbiAgICAgICAgcmV0dXJuIHt4OiB2ZWMueCwgeTogdmVjLnl9XG4gICAgfVxuICAgIGNhcnRUb1BvbGFyKHZlYywgcmV0ViA9IHtkaXI6IDAsIG1hZzogMH0pIHtcbiAgICAgICAgcmV0Vi5kaXIgPSBNYXRoLmF0YW4yKHZlYy55LCB2ZWMueCk7XG4gICAgICAgIHJldFYubWFnID0gTWF0aC5oeXBvdCh2ZWMueCwgdmVjLnkpO1xuICAgICAgICByZXR1cm4gcmV0VjtcbiAgICB9XG5cbiAgICB2ZWN0b3JBZGQodmVjMSwgdmVjMikge1xuICAgICAgICB2YXIgdjEgPSB0aGlzLmFzQ2FydCh2ZWMxKTtcbiAgICAgICAgdmFyIHYyID0gdGhpcy5hc0NhcnQodmVjMik7XG4gICAgICAgIHJldHVybiB0aGlzLnZlY3Rvcih2MS54ICsgdjIueCwgdjEueSArIHYyLnkpXG4gICAgfVxuXG4gICAgYXBwbHlGb3JjZShmb3JjZSwgbG9jKSB7XG4gICAgICAgIHRoaXMudmFsaWRhdGVQb2xhcihmb3JjZSk7XG4gICAgICAgIHZhciBsID0gdGhpcy5hc0NhcnQobG9jKTtcbiAgICAgICAgdmFyIHRvQ2VudGVyID0gdGhpcy5hc1BvbGFyKHRoaXMudmVjdG9yKHRoaXMueCAtIGwueCwgdGhpcy55IC0gbC55KSk7XG4gICAgICAgIHZhciBwaGV0YSA9IHRvQ2VudGVyLmRpciAtIGZvcmNlLmRpcjtcbiAgICAgICAgdmFyIEZ2ID0gTWF0aC5jb3MocGhldGEpICogZm9yY2UubWFnO1xuICAgICAgICB2YXIgRmEgPSBNYXRoLnNpbihwaGV0YSkgKiBmb3JjZS5tYWc7XG4gICAgICAgIHZhciBhY2NlbCA9IHRoaXMuYXNQb2xhcih0b0NlbnRlcik7XG4gICAgICAgIGFjY2VsLm1hZyA9IEZ2IC8gdGhpcy5tYXNzOyBcbiAgICAgICAgdmFyIGRlbHRhViA9IHRoaXMuYXNDYXJ0KGFjY2VsKTsgXG4gICAgICAgIHRoaXMuZHggKz0gZGVsdGFWLnggXG4gICAgICAgIHRoaXMuZHkgKz0gZGVsdGFWLnlcbiAgICAgICAgdmFyIGFjY2VsQSA9IEZhIC8gKHRvQ2VudGVyLm1hZyAgKiB0aGlzLm1hc3MpOyBcbiAgICAgICAgdGhpcy5kciArPSBhY2NlbEE7XG4gICAgfVxuXG4gICAgdmVjdG9yQ29tcG9uZW50c0ZvckRpcih2ZWMsIGRpcikge1xuICAgICAgICB2YXIgdiA9IHRoaXMuYXNQb2xhcih2ZWMpOyBcbiAgICAgICAgdmFyIHBoZXRhID0gdi5kaXIgLSBkaXI7XG4gICAgICAgIHZhciBGdiA9IE1hdGguY29zKHBoZXRhKSAqIHYubWFnO1xuICAgICAgICB2YXIgRmEgPSBNYXRoLnNpbihwaGV0YSkgKiB2Lm1hZztcblxuICAgICAgICB2YXIgZDEgPSBkaXI7XG4gICAgICAgIHZhciBkMiA9IGRpciArIHRoaXMuUEk5MDsgICAgXG4gICAgICAgIGlmKEZ2IDwgMCl7XG4gICAgICAgICAgICBkMSArPSB0aGlzLlBJO1xuICAgICAgICAgICAgRnYgPSAtRnY7XG4gICAgICAgIH1cblxuICAgICAgICBpZihGYSA8IDApe1xuICAgICAgICAgICAgZDIgKz0gdGhpcy5QSTtcbiAgICAgICAgICAgIEZhID0gLUZhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbG9uZyA6IHRoaXMucG9sYXIoRnYsZDEpLFxuICAgICAgICAgICAgdGFuZ2VudCA6IHRoaXMucG9sYXIoRmEsZDIpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZG9Db2xsaXNpb24ocG9pbnREZXRhaWxzLCB3YWxsSW5kZXgpIHtcbiAgICAgICAgdmFyIHZ2ID0gdGhpcy5hc1BvbGFyKHBvaW50RGV0YWlscy52ZWxvY2l0eSk7IFxuICAgICAgICB2YXIgdmEgPSB0aGlzLmFzUG9sYXIocG9pbnREZXRhaWxzLnZlbG9jaXR5QSk7IFxuICAgICAgICB2YXIgdnZjID0gdGhpcy52ZWN0b3JDb21wb25lbnRzRm9yRGlyKHZ2LCB0aGlzLldBTExfTk9STVNbd2FsbEluZGV4XSk7XG4gICAgICAgIHZhciB2YWMgPSB0aGlzLnZlY3RvckNvbXBvbmVudHNGb3JEaXIodmEsIHRoaXMuV0FMTF9OT1JNU1t3YWxsSW5kZXhdKTtcblxuICAgICAgICB2dmMuYWxvbmcubWFnICo9IDEuMTg7IFxuICAgICAgICB2YWMuYWxvbmcubWFnICo9IDEuMTg7IFxuXG4gICAgICAgIHZ2Yy5hbG9uZy5tYWcgKj0gdGhpcy5tYXNzO1xuICAgICAgICB2YWMuYWxvbmcubWFnICo9IHRoaXMubWFzcztcblxuICAgICAgICB2dmMuYWxvbmcuZGlyICs9IHRoaXMuUEk7XG4gICAgICAgIHZhYy5hbG9uZy5kaXIgKz0gdGhpcy5QSTtcblxuICAgICAgICB2dmMudGFuZ2VudC5tYWcgKj0gMC4xODsgIFxuICAgICAgICB2YWMudGFuZ2VudC5tYWcgKj0gMC4xODtcbiAgICAgICAgdnZjLnRhbmdlbnQubWFnICo9IHRoaXMubWFzcyAgXG4gICAgICAgIHZhYy50YW5nZW50Lm1hZyAqPSB0aGlzLm1hc3NcbiAgICAgICAgdnZjLnRhbmdlbnQuZGlyICs9IHRoaXMuUEk7IFxuICAgICAgICB2YWMudGFuZ2VudC5kaXIgKz0gdGhpcy5QSTtcblxuICAgICAgICB0aGlzLmFwcGx5Rm9yY2UodnZjLmFsb25nLCBwb2ludERldGFpbHMucG9zKSAgICBcbiAgICAgICAgdGhpcy5hcHBseUZvcmNlKHZ2Yy50YW5nZW50LCBwb2ludERldGFpbHMucG9zKSAgICBcbiAgICAgICAgdGhpcy5hcHBseUZvcmNlKHZhYy5hbG9uZywgcG9pbnREZXRhaWxzLnBvcykgICAgXG4gICAgICAgIHRoaXMuYXBwbHlGb3JjZSh2YWMudGFuZ2VudCwgcG9pbnREZXRhaWxzLnBvcykgICAgXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCbG9jayIsImNsYXNzIENhbnZhcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCAtIDQwMDtcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gdGhpcy5jYW52YXMud2lkdGggLyAyO1xuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB9XG4gICAgY3JlYXRlQ2FudmFzKCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZCh0aGlzLmNhbnZhcyk7XG4gICAgICAgIHRoaXMuY2FudmFzLmNsYXNzTGlzdC5hZGQoXCJtYWluLWNhbnZhc1wiKVxuICAgIH1cblxuICAgIGNsZWFyQ2FudmFzKCkge1xuICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYW52YXM7XG4iLCJjbGFzcyBQaWcge1xuICAgIGNvbnN0cnVjdG9yKGN0eCwgeCwgeSwgdmVsWCA9IDAsIHZlbFkgPSAwLCByYWRpdXMgPSAxNSwgY29sb3IgPSBcIk9SQU5HRVwiKSB7XG4gICAgICAgIHRoaXMuX2N0eCA9IGN0eDtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy52ZWxYID0gdmVsWDtcbiAgICAgICAgdGhpcy52ZWxZID0gdmVsWTtcbiAgICAgICAgdGhpcy5fcmFkaXVzID0gcmFkaXVzO1xuICAgICAgICB0aGlzLl9tYXNzID0gMjtcbiAgICAgICAgdGhpcy5fY29sb3IgPSBjb2xvcjtcblxuICAgICAgICB0aGlzLl9ncmF2aXR5ID0geyB4OiAwLCB5OiAwLjEgfTtcbiAgICAgICAgdGhpcy5fZ3JvdW5kID0gdGhpcy5fY3R4LmNhbnZhcy5oZWlnaHQgLSAyMDtcbiAgICAgICAgdGhpcy5fYm91bmNlID0gMC40O1xuICAgICAgICB0aGlzLl9mcmljdGlvblggPSAwLjk7XG4gICAgICAgIHRoaXMuX21hc3MgPSAyO1xuICAgIH1cblxuICAgIGRyYXdQaWcoY3R4KSB7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLl9jb2xvcjtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLl9yYWRpdXMsIDAsIChNYXRoLlBJICogMiksIGZhbHNlKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgIH1cblxuICAgIHVwZGF0ZVBpZygpIHtcbiAgICAgICAgdGhpcy52ZWxYICs9IHRoaXMuX2dyYXZpdHkueDtcbiAgICAgICAgdGhpcy52ZWxZICs9IHRoaXMuX2dyYXZpdHkueTtcbiAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsWDtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMudmVsWTtcblxuICAgICAgICBpZiAodGhpcy55ID49IHRoaXMuX2dyb3VuZCkge1xuICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5fZ3JvdW5kIC0gKHRoaXMueSAtIHRoaXMuX2dyb3VuZCk7XG4gICAgICAgICAgICB0aGlzLnZlbFkgPSAtTWF0aC5hYnModGhpcy52ZWxZKSAqIHRoaXMuX2JvdW5jZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnZlbFkgPj0gdGhpcy5fZ3Jhdml0eS55KSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWxZID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLl9ncm91bmQgLSB0aGlzLl9ncmF2aXR5Lnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy52ZWxYID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVsWCAtPSB0aGlzLl9mcmljdGlvblg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy52ZWxYIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVsWCArPSB0aGlzLl9mcmljdGlvblg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3RvcHMgYmFsbCBmcm9tIGJvdW5jaW5nIGluIFkgYXhpc1xuICAgICAgICBpZiAodGhpcy52ZWxZPDAgJiYgdGhpcy52ZWxZPi0yLjEpIHtcbiAgICAgICAgICAgIHRoaXMudmVsWSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3RvcHMgYmFsbCBmcm9tIG1vdmluZyBvbiBYIGF4aXMgaWYgeC12ZWxvY2l0eSA8IDEuMVxuICAgICAgICBpZiAoTWF0aC5hYnModGhpcy52ZWxYKSA8IDEuMSkge1xuICAgICAgICAgICAgdGhpcy52ZWxYID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFuaW1hdGUoY3R4KSB7XG4gICAgICAgIHRoaXMudXBkYXRlUGlnKCk7XG4gICAgICAgIHRoaXMuZHJhd1BpZyhjdHgpO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQaWc7IiwiaW1wb3J0IEJpcmQgZnJvbSBcIi4vYmlyZFwiO1xuXG5jbGFzcyBQcm9qZWN0aWxlIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgpIHtcbiAgICAgICAgdGhpcy5fY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLmNvbnQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLmxhdW5jaCA9IHRoaXMubGF1bmNoLmJpbmQodGhpcylcbiAgICAgICAgdGhpcy50YXJnZXQgPSBNYXRoLnJhbmRvbSgpKjcwMCsyMDtcbiAgICAgICAgdGhpcy5iaXJkT2JqZWN0cyA9IFtdO1xuICAgICAgICB0aGlzLm1heCA9IDE7XG4gICAgICAgIHRoaXMuY3VycmVudEJpcmQ7XG4gICAgfVxuXG4gICAgbGF1bmNoKCkge1xuICAgICAgICBsZXQgYW5nbGUgPSBNYXRoLlBJKjYwLjAvMTgwO1xuICAgICAgICBsZXQgbWFnbml0dWRlID0gMjUuNTtcblxuICAgICAgICBjb25zdCBvYmpMYXVuY2ggPSBuZXcgT2JqZWN0TGF1bmNoKHRoaXMuX2N0eCwgNSwgNjkwLCBuZXcgQmlyZCh0aGlzLl9jdHgpKTtcbiAgICAgICAgdGhpcy5iaXJkT2JqZWN0cy5wdXNoKG9iakxhdW5jaCk7XG4gICAgICAgIG9iakxhdW5jaC52ZWxZID0tIG1hZ25pdHVkZSAqIE1hdGguc2luKGFuZ2xlKTtcbiAgICAgICAgb2JqTGF1bmNoLnZlbFggPSBtYWduaXR1ZGUgKiBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgIG9iakxhdW5jaC50cmFuc2ZlciA9IDAuODtcbiAgICB9XG5cbiAgICBsYXVuY2hMb29wKGN0eCwgcGlncywgYmxvY2tzKSB7XG4gICAgICAgIGlmICh0aGlzLmJpcmRPYmplY3RzLmxlbmd0aCA+IHRoaXMubWF4KSB7XG4gICAgICAgICAgICB0aGlzLmJpcmRPYmplY3RzWzBdLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy5iaXJkT2JqZWN0cyA9IHRoaXMuYmlyZE9iamVjdHMuc3BsaWNlKDEpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNvbnQpIHtcbiAgICAgICAgICAgIHRoaXMubGF1bmNoKClcbiAgICAgICAgfVxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiM1NTVcIjtcbiAgICAgICAgY3R4Lm1vdmVUbygwLDcwMClcbiAgICAgICAgY3R4LmxpbmVUbygxMCw2ODApXG4gICAgICAgIGN0eC5saW5lVG8oMTUsNjkwKVxuICAgICAgICBjdHgubGluZVRvKDAsNzAwKVxuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzBmMFwiO1xuICAgICAgICBjdHguYXJjKHRoaXMudGFyZ2V0LDcwMSwxMCwwLE1hdGguUEkqMix0cnVlKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5iaXJkT2JqZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRCaXJkID0gdGhpcy5iaXJkT2JqZWN0c1tpXVxuICAgICAgICAgICAgLy8gaWYgKHRoaXMuY3VycmVudEJpcmQuX3kgKyB0aGlzLmN1cnJlbnRCaXJkLnR5cGUucmFkaXVzID49IDcwMCkge1xuICAgICAgICAgICAgLy8gICAgIGlmICh0aGlzLmJvdW5jZSkge1xuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmN1cnJlbnRCaXJkLnZlbFkgKj0gdGhpcy5jdXJyZW50QmlyZC50cmFuc2ZlcjtcbiAgICAgICAgICAgIC8vICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmN1cnJlbnRCaXJkLnZlbFggPSAwO1xuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmN1cnJlbnRCaXJkLnZlbFkgPSAwO1xuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIGN1cnJlbnRCaXJkLnZlbFkgKz0gMS41MztcbiAgICAgICAgICAgIGN1cnJlbnRCaXJkLl94ICs9IGN1cnJlbnRCaXJkLnZlbFggLyAzO1xuICAgICAgICAgICAgY3VycmVudEJpcmQuX3kgKz0gY3VycmVudEJpcmQudmVsWSAvIDM7XG4gICAgICAgICAgICBpZiAoY3VycmVudEJpcmQuX3kgKyBjdXJyZW50QmlyZC50eXBlLnJhZGl1cyA+IDcwMCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRCaXJkLl95ID0gNzAwIC0gY3VycmVudEJpcmQudHlwZS5yYWRpdXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50QmlyZC51cGRhdGVPYmplY3QocGlncywgYmxvY2tzKVxuICAgICAgICAgICAgY3VycmVudEJpcmQuZHJhd09iamVjdExhdW5jaCh0aGlzLl9jdHgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYW5pbWF0ZShjdHgsIHBpZ3MsIGJsb2Nrcykge1xuICAgICAgICB0aGlzLmxhdW5jaExvb3AoY3R4LCBwaWdzLCBibG9ja3MpO1xuICAgIH1cbn1cblxuY2xhc3MgT2JqZWN0TGF1bmNoIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgsIHggPSA1MCwgeSA9IDUwLCB0eXBlKSB7XG4gICAgICAgIHRoaXMuX2N0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgIHRoaXMuX3kgPSB5O1xuICAgICAgICB0aGlzLnZlbFggPSAwO1xuICAgICAgICB0aGlzLnZlbFkgPSAwO1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLnRyYW5zZmVyID0gMC45O1xuICAgICAgICB0aGlzLnJlbW92ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZ3Jhdml0eSA9IHsgeDogMCwgeTogMC4xIH07XG4gICAgICAgIHRoaXMuX2dyb3VuZCA9IHRoaXMuX2N0eC5jYW52YXMuaGVpZ2h0IC0gMjA7XG4gICAgICAgIHRoaXMuX2JvdW5jZSA9IDAuNTtcbiAgICAgICAgdGhpcy5fZnJpY3Rpb25YID0gMC45O1xuICAgICAgICB0aGlzLl9tYXNzID0gMjtcbiAgICAgICAgdGhpcy5yYWRpdXMgPSAxNDtcbiAgICB9XG5cbiAgICByZW1vdmUoKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgZHJhd09iamVjdExhdW5jaChjdHgpIHtcbiAgICAgICAgdGhpcy50eXBlLmRyYXdCaXJkKGN0eCwgdGhpcy5feCwgdGhpcy5feSlcbiAgICB9XG5cbiAgICBjaGVja0JpcmRPblBpZ0NvbGxpc2lvbihwaWdzKSB7XG4gICAgICAgIGlmIChwaWdzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBpZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5feCArIHRoaXMudHlwZS5fcmFkaXVzICsgcGlnc1tpXS5fcmFkaXVzID4gcGlnc1tpXS54XG4gICAgICAgICAgICAgICAgICAgICYmIHRoaXMuX3ggPCBwaWdzW2ldLnggKyB0aGlzLnR5cGUuX3JhZGl1cyArIHBpZ3NbaV0uX3JhZGl1c1xuICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLl95ICsgdGhpcy50eXBlLl9yYWRpdXMgKyBwaWdzW2ldLl9yYWRpdXMgPiBwaWdzW2ldLnlcbiAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5feSA8IHBpZ3NbaV0ueSArIHRoaXMudHlwZS5fcmFkaXVzICsgcGlnc1tpXS5fcmFkaXVzKSBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHB5dGhhZ29yZWFtIHRoZW9yZW0gdG8gYmUgbW9yZSBleGFjdCBvbiBjb2xsaXNpb25cbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoKHRoaXMuX3ggLSBwaWdzW2ldLngpICogKHRoaXMuX3ggLSBwaWdzW2ldLngpKVxuICAgICAgICAgICAgICAgICAgICAgICAgKyAoKHRoaXMuX3kgLSBwaWdzW2ldLnkpICogKHRoaXMuX3kgLSBwaWdzW2ldLnkpKVxuICAgICAgICAgICAgICAgICAgICApXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDwgdGhpcy50eXBlLl9yYWRpdXMgKyBwaWdzW2ldLl9yYWRpdXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmlyZE9uUGlnQ29sbGlzaW9uTG9naWMocGlnc1tpXSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrQmlyZE9uQmxvY2tDb2xsaXNpb24oYmxvY2tzKSB7XG4gICAgICAgIGlmIChibG9ja3MpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmxvY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA0OyBqKyspe1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaXJjbGVDZW50ZXIgPSBbdGhpcy5feCwgdGhpcy5feV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChqICsgMSA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tCaXJkSW50ZXJjZXB0QmxvY2soYmxvY2tzW2ldLmdldFBvaW50KGopLCBibG9ja3NbaV0uZ2V0UG9pbnQoMCksIGNpcmNsZUNlbnRlciwgdGhpcy5yYWRpdXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iaXJkT25CbG9ja0NvbGxpc2lvbkxvZ2ljKGJsb2Nrc1tpXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrQmlyZEludGVyY2VwdEJsb2NrKGJsb2Nrc1tpXS5nZXRQb2ludChqKSwgYmxvY2tzW2ldLmdldFBvaW50KGogKyAxKSwgY2lyY2xlQ2VudGVyLCB0aGlzLnJhZGl1cykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJpcmRPbkJsb2NrQ29sbGlzaW9uTG9naWMoYmxvY2tzW2ldKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGlmIChjaGVja0JpcmRJbnRlcmNlcHRCbG9jayhibG9ja3NbaV0pKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmlyZE9uUGlnQ29sbGlzaW9uTG9naWMocGlnKSB7XG4gICAgICAgIGNvbnN0IG1hc3MxID0gdGhpcy50eXBlLl9yYWRpdXM7XG4gICAgICAgIGNvbnN0IG1hc3MyID0gcGlnLl9yYWRpdXM7XG4gICAgICAgIGlmIChwaWcudmVsWCA9PT0gMCkgcGlnLnZlbFggPSA5O1xuICAgICAgICAvLyBpZiAocGlnLnZlbFkgPT09IDApIHBpZy52ZWxZID0gNjtcbiAgICAgICAgLy8gY29uc3QgcGlnVmVsWCA9IHBpZy52ZWxYO1xuICAgICAgICAvLyBjb25zdCBwaWdWZWxZID0gcGlnLnZlbFk7XG5cbiAgICAgICAgdGhpcy52ZWxYID0gLXRoaXMudmVsWDtcbiAgICAgICAgdGhpcy52ZWxZID0gLXRoaXMudmVsWTtcblxuICAgICAgICBwaWcudmVsWCA9IC1waWcudmVsWDtcbiAgICAgICAgcGlnLnZlbFkgPSAtcGlnLnZlbFk7XG4gICAgICAgIFxuICAgICAgICAvLyB0aGlzLnZlbFggPSAoIHRoaXMudmVsWCAqIChtYXNzMSAtIG1hc3MyKSArICgyICogbWFzczIgKiBwaWdWZWxYKSkgLyAobWFzczEgKyBtYXNzMik7XG4gICAgICAgIC8vIHRoaXMudmVsWSA9ICggdGhpcy52ZWxZICogKG1hc3MxIC0gbWFzczIpICsgKDIgKiBtYXNzMiAqIHBpZ1ZlbFkpKSAvIChtYXNzMSArIG1hc3MyKTtcbiAgICAgICAgLy8gcGlnLnZlbFggPSAoIHBpZ1ZlbFggKiAobWFzczIgLSBtYXNzMSkgKyAoMiAqIG1hc3MxICogdGhpcy52ZWxYKSkgLyAobWFzczEgKyBtYXNzMik7XG4gICAgICAgIC8vIHBpZy52ZWxZID0gKCBwaWdWZWxZICogKG1hc3MyIC0gbWFzczEpICsgKDIgKiBtYXNzMSAqIHRoaXMudmVsWSkpIC8gKG1hc3MxICsgbWFzczIpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5feCArPSB0aGlzLnZlbFg7XG4gICAgICAgIHRoaXMuX3kgKz0gdGhpcy52ZWxZO1xuICAgICAgICBwaWcueCArPSBwaWcudmVsWDtcbiAgICAgICAgcGlnLnkgKz0gcGlnLnZlbFk7XG4gICAgfVxuXG4gICAgYmlyZE9uQmxvY2tDb2xsaXNpb25Mb2dpYyhibG9jaykge1xuICAgICAgICB0aGlzLnZlbFggPSAtdGhpcy52ZWxYO1xuICAgICAgICB0aGlzLnZlbFkgPSAtdGhpcy52ZWxZO1xuXG4gICAgICAgIHRoaXMuX3ggKz0gdGhpcy52ZWxYO1xuICAgICAgICB0aGlzLl95ICs9IHRoaXMudmVsWTtcbiAgICB9XG5cbiAgICBjaGVja0JpcmRJbnRlcmNlcHRCbG9jayhwb2ludEEsIHBvaW50QiwgY2lyY2xlQ2VudGVyLCByYWRpdXMpIHtcbiAgICAgICAgbGV0IGRpc3Q7XG4gICAgICAgIGNvbnN0IHZlbDFYID0gcG9pbnRCLnBvcy54IC0gcG9pbnRBLnBvcy54O1xuICAgICAgICBjb25zdCB2ZWwxWSA9IHBvaW50Qi5wb3MueSAtIHBvaW50QS5wb3MueTtcbiAgICAgICAgY29uc3QgdmVsMlggPSBjaXJjbGVDZW50ZXJbMF0gLSBwb2ludEEucG9zLng7XG4gICAgICAgIGNvbnN0IHZlbDJZID0gY2lyY2xlQ2VudGVyWzFdIC0gcG9pbnRBLnBvcy55O1xuICAgICAgICBjb25zdCB1bml0ID0gKHZlbDJYICogdmVsMVggKyB2ZWwyWSAqIHZlbDFZKSAvICh2ZWwxWSAqIHZlbDFZICsgdmVsMVggKiB2ZWwxWCk7XG4gICAgICAgIGlmICh1bml0ID49IDAgJiYgdW5pdCA8PSAxKXtcbiAgICAgICAgICAgIGRpc3QgPSAocG9pbnRBLnBvcy54ICArIHZlbDFYICogdW5pdCAtIGNpcmNsZUNlbnRlclswXSkgKiogMiArIChwb2ludEEucG9zLnkgKyB2ZWwxWSAqIHVuaXQgLSBjaXJjbGVDZW50ZXJbMV0pICoqIDI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkaXN0ID0gdW5pdCA8IDAgPyBcbiAgICAgICAgICAgICAgICAocG9pbnRBLnBvcy54IC0gY2lyY2xlQ2VudGVyWzBdKSAqKiAyICsgKHBvaW50QS5wb3MueSAtIGNpcmNsZUNlbnRlclsxXSkgKiogMiA6XG4gICAgICAgICAgICAgICAgKHBvaW50Qi5wb3MueCAtIGNpcmNsZUNlbnRlclswXSkgKiogMiArIChwb2ludEIucG9zLnkgLSBjaXJjbGVDZW50ZXJbMV0pICoqIDI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRpc3QgPCByYWRpdXMgKiByYWRpdXM7XG4gICAgfVxuXG4gICAgdXBkYXRlT2JqZWN0KHBpZ3MsIGJsb2Nrcykge1xuICAgICAgICB0aGlzLmNoZWNrQmlyZE9uUGlnQ29sbGlzaW9uKHBpZ3MpXG4gICAgICAgIHRoaXMuY2hlY2tCaXJkT25CbG9ja0NvbGxpc2lvbihibG9ja3MpXG4gICAgICAgIHRoaXMudmVsWCArPSB0aGlzLl9ncmF2aXR5Lng7XG4gICAgICAgIHRoaXMudmVsWSArPSB0aGlzLl9ncmF2aXR5Lnk7XG4gICAgICAgIHRoaXMuX3ggKz0gdGhpcy52ZWxYO1xuICAgICAgICB0aGlzLl95ICs9IHRoaXMudmVsWTtcblxuICAgICAgICBpZiAodGhpcy5feSA+PSB0aGlzLl9ncm91bmQpIHtcbiAgICAgICAgICAgIHRoaXMuX3kgPSB0aGlzLl9ncm91bmQgLSAodGhpcy5feSAtIHRoaXMuX2dyb3VuZCk7XG4gICAgICAgICAgICB0aGlzLnZlbFkgPSAtTWF0aC5hYnModGhpcy52ZWxZKSAqIHRoaXMuX2JvdW5jZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnZlbFkgPj0gdGhpcy5fZ3Jhdml0eS55KSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWxZID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLl95ID0gdGhpcy5fZ3JvdW5kIC0gdGhpcy5fZ3Jhdml0eS55O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudmVsWCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlbFggLT0gdGhpcy5fZnJpY3Rpb25YO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudmVsWCA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlbFggKz0gdGhpcy5fZnJpY3Rpb25YO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHN0b3BzIGJhbGwgZnJvbSBib3VuY2luZyBpbiBZIGF4aXNcbiAgICAgICAgaWYgKCB0aGlzLl95ID49IHRoaXMuX2dyb3VuZCAtIDEwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy52ZWxZIDwgMCAmJiB0aGlzLnZlbFkgPiAtMS4xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWxZID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBzdG9wcyBiYWxsIGZyb20gbW92aW5nIG9uIFggYXhpcyBpZiB4LXZlbG9jaXR5IDwgMS4xXG4gICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnZlbFgpIDwgMS4xKSB7XG4gICAgICAgICAgICB0aGlzLnZlbFggPSAwO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RpbGU7IiwiaW1wb3J0IFBpZyBmcm9tIFwiLi9waWdcIjtcbmltcG9ydCBCbG9jayBmcm9tIFwiLi9ibG9ja1wiO1xuXG5jbGFzcyBTdGFnZUxvYWRlciB7XG4gICAgY29uc3RydWN0b3IoIG51bWJlck9mUGlncyA9IDIsIHBpZ3NMb2NhdGlvbkFycmF5ID0gW1syMDAsIDYwMF0sIFs1MDAsIDYwMF1dLCBudW1iZXJvZkJsb2NrcyA9IDIsIGJsb2NrTG9jYXRpb25BcnJheSA9IFtbOTAwLCA3MDBdLCBbOTAwLCA0MDBdXSkge1xuICAgICAgICB0aGlzLm51bWJlck9mUGlncyA9IG51bWJlck9mUGlncztcbiAgICAgICAgdGhpcy5waWdzTG9jYXRpb25BcnJheSA9IHBpZ3NMb2NhdGlvbkFycmF5O1xuICAgICAgICB0aGlzLnBpZ3MgPSBbXTtcblxuICAgICAgICB0aGlzLm51bWJlcm9mQmxvY2tzID0gbnVtYmVyb2ZCbG9ja3M7XG4gICAgICAgIHRoaXMuYmxvY2tMb2NhdGlvbkFycmF5ID0gYmxvY2tMb2NhdGlvbkFycmF5O1xuICAgICAgICB0aGlzLmJsb2NrcyA9IFtdO1xuICAgIH1cblxuICAgIGRyYXdQaWdzKGN0eCkge1xuICAgICAgICBpZiAodGhpcy5waWdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBpZ3NMb2NhdGlvbkFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5waWdzLnB1c2gobmV3IFBpZyhjdHgsIHRoaXMucGlnc0xvY2F0aW9uQXJyYXlbaV1bMF0sIHRoaXMucGlnc0xvY2F0aW9uQXJyYXlbaV1bMV0pKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhd0Jsb2NrcyhjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMuYmxvY2tzLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYmxvY2tMb2NhdGlvbkFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja3MucHVzaChuZXcgQmxvY2soY3R4LCB0aGlzLmJsb2NrTG9jYXRpb25BcnJheVtpXVswXSwgdGhpcy5ibG9ja0xvY2F0aW9uQXJyYXlbaV1bMV0pKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYW5pbWF0ZShjdHgpIHtcbiAgICAgICAgdGhpcy5kcmF3UGlncyhjdHgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGlncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5waWdzW2ldLmFuaW1hdGUoY3R4KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5kcmF3QmxvY2tzKGN0eCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ibG9ja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tzW2ldLmFuaW1hdGUoY3R4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RhZ2VMb2FkZXI7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9zdHlsZXMvaW5kZXguc2Nzc1wiO1xuaW1wb3J0IENhbnZhcyBmcm9tIFwiLi9zY3JpcHRzL2NhbnZhc1wiO1xuaW1wb3J0IFByb2plY3RpbGUgZnJvbSBcIi4vc2NyaXB0cy9wcm9qZWN0aWxlXCI7XG5pbXBvcnQgU3RhZ2VMb2FkZXIgZnJvbSBcIi4vc2NyaXB0cy9zdGFnZUxvYWRlclwiO1xuXG5jb25zdCBjdXJyZW50U3RhdGVPYmogPSB7XG4gIGN1cnJlbnRFeGFtcGxlOiBudWxsLFxuICBjdXJyZW50RXZlbnRMaXN0ZW5lcnM6IFtdLFxufTtcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYW52YXNcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0YXJ0Q2FudmFzKTtcblxuZnVuY3Rpb24gc3RhcnRDYW52YXMoKSB7XG4gICAgdW5yZWdpc3RlckV2ZW50TGlzdGVuZXJzKCk7XG4gICAgY29uc3QgY2FudmFzID0gbmV3IENhbnZhcygpO1xuICAgIGNhbnZhcy5jcmVhdGVDYW52YXMoKTtcbiAgICBjb25zdCBwcm9qZWN0aWxlID0gbmV3IFByb2plY3RpbGUoY2FudmFzLmN0eClcbiAgICBjb25zdCBzdGFnZUxvYWRlciA9IG5ldyBTdGFnZUxvYWRlcigpXG5cbiAgICBsZXQgYW5pbWF0aW5nID0gdHJ1ZTtcblxuICAgIGNvbnN0IGFuaW1hdGlvbiA9ICgpID0+IHtcbiAgICAgICAgY2FudmFzLmNsZWFyQ2FudmFzKCk7XG4gICAgICAgIGlmIChhbmltYXRpbmcpIHtcbiAgICAgICAgICAgIHN0YWdlTG9hZGVyLmFuaW1hdGUoY2FudmFzLmN0eClcbiAgICAgICAgICAgIHByb2plY3RpbGUuYW5pbWF0ZShjYW52YXMuY3R4LCBzdGFnZUxvYWRlci5waWdzLCBzdGFnZUxvYWRlci5ibG9ja3MpXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xhdW5jaC1idXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHByb2plY3RpbGUubGF1bmNoKVxuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRpb24pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uKTtcblxuICAgIC8vICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZUtleURvd24pO1xuICAgIC8vICAgY3VycmVudFN0YXRlT2JqLmN1cnJlbnRFdmVudExpc3RlbmVycy5wdXNoKFtcbiAgICAvLyAgICAgXCJ3aW5kb3dcIixcbiAgICAvLyAgICAgXCJrZXlkb3duXCIsXG4gICAgLy8gICAgIGhhbmRsZUtleURvd24sXG4gICAgLy8gICBdKTtcblxuICAgIC8vICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlTW91c2VEb3duKTtcbiAgICAvLyAgIGN1cnJlbnRTdGF0ZU9iai5jdXJyZW50RXZlbnRMaXN0ZW5lcnMucHVzaChbXG4gICAgLy8gICAgIFwid2luZG93XCIsXG4gICAgLy8gICAgIFwibW91c2Vkb3duXCIsXG4gICAgLy8gICAgIGhhbmRsZU1vdXNlRG93bixcbiAgICAvLyAgIF0pO1xuXG4gICAgLy8gICBmdW5jdGlvbiBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgLy8gICAgIGlmIChldmVudC53aGljaCA9PT0gMzIpIHtcbiAgICAvLyAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vICAgICAgIHNxdWFyZXMuZm9yRWFjaCgoc3EpID0+IHNxLnJldmVyc2VBbmltYXRpb24oKSk7XG4gICAgLy8gICAgICAgY2FudmFzLnNldENvbG9yKGAjJHtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNjc3NzIxNSkudG9TdHJpbmcoMTYpfWApO1xuICAgIC8vICAgICB9XG4gICAgLy8gICB9XG5cbiAgICAvLyAgIGZ1bmN0aW9uIGhhbmRsZU1vdXNlRG93bihldmVudCkge1xuICAgIC8vICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vICAgICBzcXVhcmVzLnB1c2goXG4gICAgLy8gICAgICAgbmV3IFNxdWFyZShcbiAgICAvLyAgICAgICAgIGNhbnZhcy5jdHgsXG4gICAgLy8gICAgICAgICBjYW52YXMuY29vcmRzLm1hcCgoY28pID0+IGNvICsgMjUpLFxuICAgIC8vICAgICAgICAgY2FudmFzLmZpbGxDb2xvclxuICAgIC8vICAgICAgIClcbiAgICAvLyAgICAgKTtcbiAgICAgICAgLy8gYW5pbWF0aW5nID0gIWFuaW1hdGluZztcbiAgICAvLyAgIH1cbn1cblxuZnVuY3Rpb24gdW5yZWdpc3RlckV2ZW50TGlzdGVuZXJzKCkge1xuICB3aGlsZSAoY3VycmVudFN0YXRlT2JqLmN1cnJlbnRFdmVudExpc3RlbmVycy5sZW5ndGgpIHtcbiAgICBsZXQgW1xuICAgICAgc2VsZWN0b3IsXG4gICAgICBldmVudCxcbiAgICAgIGhhbmRsZXIsXG4gICAgXSA9IGN1cnJlbnRTdGF0ZU9iai5jdXJyZW50RXZlbnRMaXN0ZW5lcnMucG9wKCk7XG4gICAgaWYgKHNlbGVjdG9yID09PSBcIndpbmRvd1wiKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlcik7XG4gICAgICBjb25zb2xlLmxvZyhoYW5kbGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlcik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNsZWFyRGVtbygpIHtcbiAgaWYgKGN1cnJlbnRTdGF0ZU9iai5jdXJyZW50RXhhbXBsZSA9PT0gXCJDQU5WQVNERU1PXCIpXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2FudmFzXCIpKTtcbiAgaWYgKGN1cnJlbnRTdGF0ZU9iai5jdXJyZW50RXhhbXBsZSA9PT0gXCJET01ERU1PXCIpIHtcbiAgICBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jYXJkXCIpXS5mb3JFYWNoKChlbGVtKSA9PlxuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlbGVtKVxuICAgICk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=