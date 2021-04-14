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
      // ctx.drawImage(this.bird, 0, 0, 10, 10, x, y, 10, 10)
      // ctx.fillStyle = this._color;
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, this._radius, 0, Math.PI * 2, false);
      ctx.clip();
      ctx.closePath();
      ctx.drawImage(this.bird, x - this._radius, y - this._radius, this._radius * 2, this._radius * 2);
      ctx.restore(); // ctx.fill();
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
      ctx.restore(); // ctx.fillStyle = this._color;
      // ctx.beginPath();
      // ctx.arc(this.x, this.y, this._radius, 0, (Math.PI * 2), false);
      // ctx.closePath();
      // ctx.fill();
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
    this.radius = 14; // this.bird = new Image();
    // this.bird.src = "/src/images/bird.png"
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
var centerX = 104.70;
var centerY = 455;
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
    deltaY = mouse.y - centerY; //   console.log(mouse.x, mouse.y);
    //   console.log(Math.abs(mouse.x - 130))

    var thetaRadian = Math.atan2(deltaY, deltaX);
    var degrees = -((Math.abs(thetaRadian * 180 / Math.PI) - 270) % 90); // console.log(degrees)

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYmlyZC5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYmxvY2suanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi8uL3NyYy9zY3JpcHRzL2NhbnZhcy5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvcGlnLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9wcm9qZWN0aWxlLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9zdGFnZUxvYWRlci5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiQmlyZCIsImN0eCIsIngiLCJ5IiwidmVsWCIsInZlbFkiLCJyYWRpdXMiLCJjb2xvciIsIl9jdHgiLCJfcmFkaXVzIiwiX2NvbG9yIiwiX2dyYXZpdHkiLCJfZ3JvdW5kIiwiY2FudmFzIiwiaGVpZ2h0IiwiX2JvdW5jZSIsImJpcmQiLCJJbWFnZSIsInNyYyIsInNhdmUiLCJiZWdpblBhdGgiLCJhcmMiLCJNYXRoIiwiUEkiLCJjbGlwIiwiY2xvc2VQYXRoIiwiZHJhd0ltYWdlIiwicmVzdG9yZSIsImFicyIsImRyYXdCaXJkIiwidXBkYXRlQmlyZCIsIkJsb2NrIiwidyIsImgiLCJyIiwiZHgiLCJkeSIsImRyIiwiSU5TRVQiLCJQSTkwIiwiUEkyIiwiV0FMTF9OT1JNUyIsIm1hc3MiLCJnZXRNYXNzIiwic2V0VHJhbnNmb3JtIiwidXBkYXRlQmxvY2siLCJkcmF3QmxvY2siLCJpIiwicCIsImdldFBvaW50IiwicG9zIiwiZG9Db2xsaXNpb24iLCJ3aWR0aCIsInJvdGF0ZSIsImZpbGxTdHlsZSIsImZpbGxSZWN0Iiwic3Ryb2tlUmVjdCIsIndoaWNoIiwieHgiLCJ5eSIsInZlbG9jaXR5QSIsInZlbG9jaXR5VCIsInZlbG9jaXR5IiwiY29zIiwic2luIiwiZGV0YWlscyIsImFzUG9sYXIiLCJ2ZWN0b3IiLCJwb2xhciIsIm1hZyIsImRpciIsInZlY3RvckFkZCIsInZhbGlkYXRlUG9sYXIiLCJ2ZWMiLCJpc1BvbGFyIiwicFZlYyIsInJldFYiLCJpc0NhcnQiLCJjYXJ0VG9Qb2xhciIsInVuZGVmaW5lZCIsInBvbGFyVG9DYXJ0IiwiYXRhbjIiLCJoeXBvdCIsInZlYzEiLCJ2ZWMyIiwidjEiLCJhc0NhcnQiLCJ2MiIsImZvcmNlIiwibG9jIiwibCIsInRvQ2VudGVyIiwicGhldGEiLCJGdiIsIkZhIiwiYWNjZWwiLCJkZWx0YVYiLCJhY2NlbEEiLCJ2IiwiZDEiLCJkMiIsImFsb25nIiwidGFuZ2VudCIsInBvaW50RGV0YWlscyIsIndhbGxJbmRleCIsInZ2IiwidmEiLCJ2dmMiLCJ2ZWN0b3JDb21wb25lbnRzRm9yRGlyIiwidmFjIiwiYXBwbHlGb3JjZSIsIkNhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImdldENvbnRleHQiLCJib2R5IiwiYXBwZW5kIiwiY2xhc3NMaXN0IiwiYWRkIiwiY2xlYXJSZWN0IiwiUGlnIiwiX21hc3MiLCJfZnJpY3Rpb25YIiwicGlnIiwidXBkYXRlUGlnIiwiZHJhd1BpZyIsIlByb2plY3RpbGUiLCJjb250IiwibGF1bmNoIiwiYmluZCIsInRhcmdldCIsInJhbmRvbSIsImJpcmRPYmplY3RzIiwibWF4IiwiY3VycmVudEJpcmQiLCJhbmdsZVZhbCIsIm1hZ1ZhbCIsImFuZ2xlIiwibWFnbml0dWRlIiwib2JqTGF1bmNoIiwiT2JqZWN0TGF1bmNoIiwicHVzaCIsInRyYW5zZmVyIiwicGlncyIsImJsb2NrcyIsImxlbmd0aCIsInJlbW92ZSIsInNwbGljZSIsIl94IiwiX3kiLCJ0eXBlIiwidXBkYXRlT2JqZWN0IiwiZHJhd09iamVjdExhdW5jaCIsImxhdW5jaExvb3AiLCJyZW1vdmVkIiwiZGlzdGFuY2UiLCJzcXJ0IiwiYmlyZE9uUGlnQ29sbGlzaW9uTG9naWMiLCJqIiwiY2lyY2xlQ2VudGVyIiwiY2hlY2tCaXJkSW50ZXJjZXB0QmxvY2siLCJiaXJkT25CbG9ja0NvbGxpc2lvbkxvZ2ljIiwibWFzczEiLCJtYXNzMiIsImJsb2NrIiwicG9pbnRBIiwicG9pbnRCIiwiZGlzdCIsInZlbDFYIiwidmVsMVkiLCJ2ZWwyWCIsInZlbDJZIiwidW5pdCIsImNoZWNrQmlyZE9uUGlnQ29sbGlzaW9uIiwiY2hlY2tCaXJkT25CbG9ja0NvbGxpc2lvbiIsIlN0YWdlTG9hZGVyIiwibnVtYmVyT2ZQaWdzIiwicGlnc0xvY2F0aW9uQXJyYXkiLCJudW1iZXJvZkJsb2NrcyIsImJsb2NrTG9jYXRpb25BcnJheSIsImRyYXdQaWdzIiwiYW5pbWF0ZSIsImRyYXdCbG9ja3MiLCJjdXJyZW50U3RhdGVPYmoiLCJjdXJyZW50RXhhbXBsZSIsImN1cnJlbnRFdmVudExpc3RlbmVycyIsImRlbHRhWCIsImRlbHRhWSIsImNlbnRlclgiLCJjZW50ZXJZIiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdGFydENhbnZhcyIsInVucmVnaXN0ZXJFdmVudExpc3RlbmVycyIsImNyZWF0ZUNhbnZhcyIsImNhbnZhc09iaiIsImNhbnZhc1Bvc2l0aW9uIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicHJvamVjdGlsZSIsIm1vdXNlIiwiY2xpY2siLCJlIiwibGVmdCIsInRvcCIsInRoZXRhUmFkaWFuIiwiZGVncmVlcyIsInN0YWdlTG9hZGVyIiwiYW5pbWF0aW5nIiwiYW5pbWF0aW9uIiwiY2xlYXJDYW52YXMiLCJpbWciLCJ3aW5kb3ciLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJwb3AiLCJzZWxlY3RvciIsImV2ZW50IiwiaGFuZGxlciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjb25zb2xlIiwibG9nIiwiY2xlYXJEZW1vIiwicmVtb3ZlQ2hpbGQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImVsZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQU1BLEk7QUFDRixnQkFBWUMsR0FBWixFQUFtRjtBQUFBLFFBQWxFQyxDQUFrRSx1RUFBOUQsR0FBOEQ7QUFBQSxRQUF6REMsQ0FBeUQsdUVBQXJELEdBQXFEO0FBQUEsUUFBaERDLElBQWdELHVFQUF6QyxDQUF5QztBQUFBLFFBQXRDQyxJQUFzQyx1RUFBL0IsQ0FBK0I7QUFBQSxRQUE1QkMsTUFBNEIsdUVBQW5CLEVBQW1CO0FBQUEsUUFBZkMsS0FBZSx1RUFBUCxLQUFPOztBQUFBOztBQUMvRSxTQUFLQyxJQUFMLEdBQVlQLEdBQVo7QUFDQSxTQUFLQyxDQUFMLEdBQVNBLENBQVQ7QUFDQSxTQUFLQyxDQUFMLEdBQVNBLENBQVQ7QUFDQSxTQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLSSxPQUFMLEdBQWVILE1BQWY7QUFDQSxTQUFLSSxNQUFMLEdBQWNILEtBQWQ7QUFFQSxTQUFLSSxRQUFMLEdBQWdCO0FBQUVULE9BQUMsRUFBRSxDQUFMO0FBQVFDLE9BQUMsRUFBRTtBQUFYLEtBQWhCO0FBQ0EsU0FBS1MsT0FBTCxHQUFlLEtBQUtKLElBQUwsQ0FBVUssTUFBVixDQUFpQkMsTUFBaEM7QUFDQSxTQUFLQyxPQUFMLEdBQWUsR0FBZjtBQUNBLFNBQUtDLElBQUwsR0FBWSxJQUFJQyxLQUFKLEVBQVo7QUFDQSxTQUFLRCxJQUFMLENBQVVFLEdBQVYsR0FBZ0Isc0JBQWhCO0FBQ0g7Ozs7V0FFRCxrQkFBU2pCLEdBQVQsRUFBY0MsQ0FBZCxFQUFpQkMsQ0FBakIsRUFBb0I7QUFDaEI7QUFDQTtBQUNBRixTQUFHLENBQUNrQixJQUFKO0FBQ0FsQixTQUFHLENBQUNtQixTQUFKO0FBQ0FuQixTQUFHLENBQUNvQixHQUFKLENBQVFuQixDQUFSLEVBQVdDLENBQVgsRUFBYyxLQUFLTSxPQUFuQixFQUE0QixDQUE1QixFQUFnQ2EsSUFBSSxDQUFDQyxFQUFMLEdBQVUsQ0FBMUMsRUFBOEMsS0FBOUM7QUFDQXRCLFNBQUcsQ0FBQ3VCLElBQUo7QUFDQXZCLFNBQUcsQ0FBQ3dCLFNBQUo7QUFDQXhCLFNBQUcsQ0FBQ3lCLFNBQUosQ0FBYyxLQUFLVixJQUFuQixFQUF5QmQsQ0FBQyxHQUFHLEtBQUtPLE9BQWxDLEVBQTJDTixDQUFDLEdBQUcsS0FBS00sT0FBcEQsRUFBNkQsS0FBS0EsT0FBTCxHQUFlLENBQTVFLEVBQStFLEtBQUtBLE9BQUwsR0FBZSxDQUE5RjtBQUNBUixTQUFHLENBQUMwQixPQUFKLEdBVGdCLENBVWhCO0FBQ0g7OztXQUVELHNCQUFhO0FBQ1QsV0FBS3ZCLElBQUwsSUFBYSxLQUFLTyxRQUFMLENBQWNULENBQTNCO0FBQ0EsV0FBS0csSUFBTCxJQUFhLEtBQUtNLFFBQUwsQ0FBY1IsQ0FBM0I7QUFDQSxXQUFLRCxDQUFMLElBQVUsS0FBS0UsSUFBZjtBQUNBLFdBQUtELENBQUwsSUFBVSxLQUFLRSxJQUFmOztBQUVBLFVBQUksS0FBS0YsQ0FBTCxJQUFVLEtBQUtTLE9BQW5CLEVBQTRCO0FBQ3hCLGFBQUtULENBQUwsR0FBUyxLQUFLUyxPQUFMLElBQWdCLEtBQUtULENBQUwsR0FBUyxLQUFLUyxPQUE5QixDQUFUO0FBQ0EsYUFBS1AsSUFBTCxHQUFZLENBQUNpQixJQUFJLENBQUNNLEdBQUwsQ0FBUyxLQUFLdkIsSUFBZCxDQUFELEdBQXVCLEtBQUtVLE9BQXhDOztBQUNBLFlBQUksS0FBS1YsSUFBTCxJQUFhLEtBQUtNLFFBQUwsQ0FBY1IsQ0FBL0IsRUFBa0M7QUFDOUIsZUFBS0UsSUFBTCxHQUFZLENBQVo7QUFDQSxlQUFLRixDQUFMLEdBQVMsS0FBS1MsT0FBTCxHQUFlLEtBQUtELFFBQUwsQ0FBY1IsQ0FBdEM7QUFDSDtBQUNKO0FBQ0o7OztXQUVELGlCQUFRRixHQUFSLEVBQWE7QUFDVCxXQUFLNEIsUUFBTCxDQUFjNUIsR0FBZDtBQUNBLFdBQUs2QixVQUFMO0FBQ0g7Ozs7OztBQUdMLCtEQUFlOUIsSUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7OztJQ3BETStCLEs7QUFDRixpQkFBWTlCLEdBQVosRUFBaUJDLENBQWpCLEVBQW9CQyxDQUFwQixFQUF3QztBQUFBLFFBQWpCNkIsQ0FBaUIsdUVBQWIsRUFBYTtBQUFBLFFBQVRDLENBQVMsdUVBQUwsR0FBSzs7QUFBQTs7QUFDcEMsU0FBS3pCLElBQUwsR0FBWVAsR0FBWjtBQUNBLFNBQUtDLENBQUwsR0FBU0EsQ0FBVDtBQUNBLFNBQUtDLENBQUwsR0FBU0EsQ0FBVDtBQUNBLFNBQUs2QixDQUFMLEdBQVNBLENBQVQ7QUFDQSxTQUFLQyxDQUFMLEdBQVNBLENBQVQ7QUFDQSxTQUFLQyxDQUFMLEdBQVMsR0FBVDtBQUNBLFNBQUtDLEVBQUwsR0FBVSxDQUFWO0FBQ0EsU0FBS0MsRUFBTCxHQUFVLENBQVY7QUFDQSxTQUFLQyxFQUFMLEdBQVUsQ0FBVjtBQUNBLFNBQUtDLEtBQUwsR0FBYSxFQUFiO0FBQ0EsU0FBS2YsRUFBTCxHQUFVRCxJQUFJLENBQUNDLEVBQWY7QUFDQSxTQUFLZ0IsSUFBTCxHQUFZakIsSUFBSSxDQUFDQyxFQUFMLEdBQVUsQ0FBdEI7QUFDQSxTQUFLaUIsR0FBTCxHQUFXbEIsSUFBSSxDQUFDQyxFQUFMLEdBQVUsQ0FBckI7QUFDQSxTQUFLa0IsVUFBTCxHQUFrQixDQUFFbkIsSUFBSSxDQUFDQyxFQUFMLEdBQVUsQ0FBWixFQUFlRCxJQUFJLENBQUNDLEVBQXBCLEVBQXdCLEVBQUVELElBQUksQ0FBQ0MsRUFBTCxHQUFVLENBQVosQ0FBeEIsRUFBd0MsQ0FBeEMsQ0FBbEI7QUFDQSxTQUFLWCxPQUFMLEdBQWUsS0FBS0osSUFBTCxDQUFVSyxNQUFWLENBQWlCQyxNQUFqQixHQUEwQixHQUF6QztBQUNBLFNBQUs0QixJQUFMLEdBQVksS0FBS0MsT0FBTCxFQUFaO0FBQ0g7Ozs7V0FFRCxpQkFBUTFDLEdBQVIsRUFBYTtBQUNUQSxTQUFHLENBQUNrQixJQUFKO0FBQ0FsQixTQUFHLENBQUMyQyxZQUFKLENBQWlCLENBQWpCLEVBQW9CLENBQXBCLEVBQXVCLENBQXZCLEVBQTBCLENBQTFCLEVBQTZCLENBQTdCLEVBQWdDLENBQWhDO0FBQ0EsV0FBS0MsV0FBTDtBQUNBLFdBQUtDLFNBQUwsQ0FBZTdDLEdBQWY7QUFDQUEsU0FBRyxDQUFDMEIsT0FBSjs7QUFFQSxXQUFJLElBQUlvQixDQUFDLEdBQUcsQ0FBWixFQUFlQSxDQUFDLEdBQUcsQ0FBbkIsRUFBc0JBLENBQUMsRUFBdkIsRUFBMEI7QUFDdEIsWUFBSUMsQ0FBQyxHQUFHLEtBQUtDLFFBQUwsQ0FBY0YsQ0FBZCxDQUFSLENBRHNCLENBRXRCOztBQUNBLFlBQUdDLENBQUMsQ0FBQ0UsR0FBRixDQUFNaEQsQ0FBTixHQUFVLEtBQUtvQyxLQUFsQixFQUF3QjtBQUNwQixlQUFLcEMsQ0FBTCxJQUFXLEtBQUtvQyxLQUFOLEdBQWVVLENBQUMsQ0FBQ0UsR0FBRixDQUFNaEQsQ0FBL0I7QUFDQSxlQUFLaUQsV0FBTCxDQUFpQkgsQ0FBakIsRUFBbUIsQ0FBbkI7QUFDSCxTQUhELE1BSUssSUFBSUEsQ0FBQyxDQUFDRSxHQUFGLENBQU1oRCxDQUFOLEdBQVVELEdBQUcsQ0FBQ1ksTUFBSixDQUFXdUMsS0FBWCxHQUFpQixLQUFLZCxLQUFwQyxFQUEwQztBQUMzQyxlQUFLcEMsQ0FBTCxJQUFXRCxHQUFHLENBQUNZLE1BQUosQ0FBV3VDLEtBQVgsR0FBbUIsS0FBS2QsS0FBekIsR0FBa0NVLENBQUMsQ0FBQ0UsR0FBRixDQUFNaEQsQ0FBbEQ7QUFDQSxlQUFLaUQsV0FBTCxDQUFpQkgsQ0FBakIsRUFBbUIsQ0FBbkI7QUFDSCxTQUhJLE1BSUEsSUFBR0EsQ0FBQyxDQUFDRSxHQUFGLENBQU0vQyxDQUFOLEdBQVUsS0FBS21DLEtBQWxCLEVBQXdCO0FBQ3pCLGVBQUtuQyxDQUFMLElBQVcsS0FBS21DLEtBQU4sR0FBZVUsQ0FBQyxDQUFDRSxHQUFGLENBQU0vQyxDQUEvQjtBQUNBLGVBQUtnRCxXQUFMLENBQWlCSCxDQUFqQixFQUFtQixDQUFuQjtBQUNILFNBSEksTUFJQSxJQUFJQSxDQUFDLENBQUNFLEdBQUYsQ0FBTS9DLENBQU4sR0FBVUYsR0FBRyxDQUFDWSxNQUFKLENBQVdDLE1BQVgsR0FBb0IsS0FBS3dCLEtBQXZDLEVBQTZDO0FBQzlDLGVBQUtuQyxDQUFMLElBQVdGLEdBQUcsQ0FBQ1ksTUFBSixDQUFXQyxNQUFYLEdBQW9CLEtBQUt3QixLQUExQixHQUFtQ1UsQ0FBQyxDQUFDRSxHQUFGLENBQU0vQyxDQUFuRDtBQUNBLGVBQUtnRCxXQUFMLENBQWlCSCxDQUFqQixFQUFtQixDQUFuQjtBQUNIO0FBQ0o7QUFDSjs7O1dBRUQsbUJBQVU7QUFDTixhQUFTLEtBQUtoQixDQUFMLEdBQVMsS0FBS0MsQ0FBZCxHQUFrQixLQUFLQSxDQUF6QixHQUE4QixJQUFyQztBQUNIOzs7V0FFRCxtQkFBVWhDLEdBQVYsRUFBZTtBQUNYQSxTQUFHLENBQUMyQyxZQUFKLENBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLEtBQUsxQyxDQUE5QixFQUFnQyxLQUFLQyxDQUFyQztBQUNBRixTQUFHLENBQUNvRCxNQUFKLENBQVcsS0FBS25CLENBQWhCO0FBQ0FqQyxTQUFHLENBQUNxRCxTQUFKLEdBQWdCLE1BQWhCO0FBQ0FyRCxTQUFHLENBQUNzRCxRQUFKLENBQWEsQ0FBQyxLQUFLdkIsQ0FBTixHQUFRLENBQXJCLEVBQXdCLENBQUMsS0FBS0MsQ0FBTixHQUFRLENBQWhDLEVBQW1DLEtBQUtELENBQXhDLEVBQTJDLEtBQUtDLENBQWhEO0FBQ0FoQyxTQUFHLENBQUN1RCxVQUFKLENBQWUsQ0FBQyxLQUFLeEIsQ0FBTixHQUFRLENBQXZCLEVBQTBCLENBQUMsS0FBS0MsQ0FBTixHQUFRLENBQWxDLEVBQXFDLEtBQUtELENBQTFDLEVBQTZDLEtBQUtDLENBQWxEO0FBQ0g7OztXQUVELHVCQUFjO0FBQ1YsV0FBSy9CLENBQUwsSUFBVSxLQUFLaUMsRUFBZjtBQUNBLFdBQUtoQyxDQUFMLElBQVUsS0FBS2lDLEVBQWY7QUFDQSxXQUFLQSxFQUFMLElBQVcsS0FBWDtBQUNBLFdBQUtGLENBQUwsSUFBVSxLQUFLRyxFQUFmLENBSlUsQ0FNVjtBQUNBO0FBQ0E7QUFDSDs7O1dBRUQsa0JBQVNvQixLQUFULEVBQWdCO0FBQ1osVUFBSXRCLEVBQUosRUFBUUMsRUFBUixFQUFZbEMsQ0FBWixFQUFlQyxDQUFmLEVBQWtCdUQsRUFBbEIsRUFBc0JDLEVBQXRCLEVBQTBCQyxTQUExQixFQUFxQ0MsU0FBckMsRUFBZ0RDLFFBQWhEO0FBRUEzQixRQUFFLEdBQUdiLElBQUksQ0FBQ3lDLEdBQUwsQ0FBUyxLQUFLN0IsQ0FBZCxDQUFMO0FBQ0FFLFFBQUUsR0FBR2QsSUFBSSxDQUFDMEMsR0FBTCxDQUFTLEtBQUs5QixDQUFkLENBQUw7O0FBRUEsY0FBUXVCLEtBQVI7QUFDSSxhQUFLLENBQUw7QUFDSXZELFdBQUMsR0FBRyxDQUFDLEtBQUs4QixDQUFOLEdBQVUsQ0FBZDtBQUNBN0IsV0FBQyxHQUFHLENBQUMsS0FBSzhCLENBQU4sR0FBVSxDQUFkO0FBQ0E7O0FBQ0osYUFBSyxDQUFMO0FBQ0kvQixXQUFDLEdBQUcsS0FBSzhCLENBQUwsR0FBUyxDQUFiO0FBQ0E3QixXQUFDLEdBQUcsQ0FBQyxLQUFLOEIsQ0FBTixHQUFVLENBQWQ7QUFDQTs7QUFDSixhQUFLLENBQUw7QUFDSS9CLFdBQUMsR0FBRyxLQUFLOEIsQ0FBTCxHQUFTLENBQWI7QUFDQTdCLFdBQUMsR0FBRyxLQUFLOEIsQ0FBTCxHQUFTLENBQWI7QUFDQTs7QUFDSixhQUFLLENBQUw7QUFDSS9CLFdBQUMsR0FBRyxDQUFDLEtBQUs4QixDQUFOLEdBQVUsQ0FBZDtBQUNBN0IsV0FBQyxHQUFHLEtBQUs4QixDQUFMLEdBQVMsQ0FBYjtBQUNBOztBQUNKLGFBQUssQ0FBTDtBQUNJL0IsV0FBQyxHQUFHLEtBQUtBLENBQVQ7QUFDQUMsV0FBQyxHQUFHLEtBQUtBLENBQVQ7QUFuQlI7O0FBc0JBLFVBQUl1RCxFQUFKLEVBQVNDLEVBQVQ7QUFDQUQsUUFBRSxHQUFHeEQsQ0FBQyxHQUFHaUMsRUFBSixHQUFTaEMsQ0FBQyxHQUFHLENBQUNpQyxFQUFuQjtBQUNBdUIsUUFBRSxHQUFHekQsQ0FBQyxHQUFHa0MsRUFBSixHQUFTakMsQ0FBQyxHQUFHZ0MsRUFBbEI7QUFFQSxVQUFJOEIsT0FBTyxHQUFHLEtBQUtDLE9BQUwsQ0FBYSxLQUFLQyxNQUFMLENBQVlULEVBQVosRUFBZ0JDLEVBQWhCLENBQWIsQ0FBZDtBQUVBRCxRQUFFLElBQUksS0FBS3hELENBQVg7QUFDQXlELFFBQUUsSUFBSSxLQUFLeEQsQ0FBWDtBQUVBeUQsZUFBUyxHQUFHLEtBQUtRLEtBQUwsQ0FBV0gsT0FBTyxDQUFDSSxHQUFSLEdBQWMsS0FBS2hDLEVBQTlCLEVBQWtDNEIsT0FBTyxDQUFDSyxHQUFSLEdBQWMsS0FBSy9CLElBQXJELENBQVo7QUFDQXNCLGVBQVMsR0FBRyxLQUFLVSxTQUFMLENBQWVULFFBQVEsR0FBRyxLQUFLSyxNQUFMLENBQVksS0FBS2hDLEVBQWpCLEVBQXFCLEtBQUtDLEVBQTFCLENBQTFCLEVBQXlEd0IsU0FBekQsQ0FBWjtBQUVBLGFBQU87QUFDSEUsZ0JBQVEsRUFBRUEsUUFEUDtBQUVIRCxpQkFBUyxFQUFFQSxTQUZSO0FBR0hELGlCQUFTLEVBQUdBLFNBSFQ7QUFJSFYsV0FBRyxFQUFFLEtBQUtpQixNQUFMLENBQVlULEVBQVosRUFBZ0JDLEVBQWhCLENBSkY7QUFLSHJELGNBQU0sRUFBRTJELE9BQU8sQ0FBQ0k7QUFMYixPQUFQO0FBT0g7OztXQUVELGlCQUF3QjtBQUFBLFVBQWxCQSxHQUFrQix1RUFBWixDQUFZO0FBQUEsVUFBVEMsR0FBUyx1RUFBSCxDQUFHO0FBQ3BCLGFBQU8sS0FBS0UsYUFBTCxDQUFtQjtBQUFDRixXQUFHLEVBQUVBLEdBQU47QUFBV0QsV0FBRyxFQUFFQTtBQUFoQixPQUFuQixDQUFQO0FBQ0g7OztXQUVELGtCQUFxQjtBQUFBLFVBQWRuRSxDQUFjLHVFQUFWLENBQVU7QUFBQSxVQUFQQyxDQUFPLHVFQUFILENBQUc7QUFDakIsYUFBTztBQUFFRCxTQUFDLEVBQUVBLENBQUw7QUFBUUMsU0FBQyxFQUFFQTtBQUFYLE9BQVA7QUFDSDs7O1dBRUQsdUJBQWNzRSxHQUFkLEVBQW1CO0FBQ2YsVUFBSSxLQUFLQyxPQUFMLENBQWFELEdBQWIsQ0FBSixFQUF1QjtBQUNuQixZQUFHQSxHQUFHLENBQUNKLEdBQUosR0FBVSxDQUFiLEVBQWU7QUFDWEksYUFBRyxDQUFDSixHQUFKLEdBQVUsQ0FBQ0ksR0FBRyxDQUFDSixHQUFmO0FBQ0FJLGFBQUcsQ0FBQ0gsR0FBSixJQUFXLEtBQUsvQyxFQUFoQjtBQUNIO0FBQ0o7O0FBQ0QsYUFBT2tELEdBQVA7QUFDSDs7O1dBRUQscUJBQVlFLElBQVosRUFBc0M7QUFBQSxVQUFwQkMsSUFBb0IsdUVBQWI7QUFBQzFFLFNBQUMsRUFBRSxDQUFKO0FBQU9DLFNBQUMsRUFBRTtBQUFWLE9BQWE7QUFDbEN5RSxVQUFJLENBQUMxRSxDQUFMLEdBQVNvQixJQUFJLENBQUN5QyxHQUFMLENBQVNZLElBQUksQ0FBQ0wsR0FBZCxJQUFxQkssSUFBSSxDQUFDTixHQUFuQztBQUNBTyxVQUFJLENBQUN6RSxDQUFMLEdBQVNtQixJQUFJLENBQUMwQyxHQUFMLENBQVNXLElBQUksQ0FBQ0wsR0FBZCxJQUFxQkssSUFBSSxDQUFDTixHQUFuQztBQUNBLGFBQU9PLElBQVA7QUFDSDs7O1dBRUQsaUJBQVFILEdBQVIsRUFBYTtBQUNULFVBQUksS0FBS0ksTUFBTCxDQUFZSixHQUFaLENBQUosRUFBc0I7QUFDbEIsZUFBTyxLQUFLSyxXQUFMLENBQWlCTCxHQUFqQixDQUFQO0FBQ0g7O0FBQ0QsVUFBSUEsR0FBRyxDQUFDSixHQUFKLEdBQVUsQ0FBZCxFQUFpQjtBQUNiSSxXQUFHLENBQUNKLEdBQUosR0FBVSxDQUFDSSxHQUFHLENBQUNKLEdBQWY7QUFDQUksV0FBRyxDQUFDSCxHQUFKLElBQVcsS0FBSy9DLEVBQWhCO0FBQ0g7O0FBQ0QsYUFBTztBQUFFK0MsV0FBRyxFQUFFRyxHQUFHLENBQUNILEdBQVg7QUFBZ0JELFdBQUcsRUFBRUksR0FBRyxDQUFDSjtBQUF6QixPQUFQO0FBQ0g7OztXQUVELGdCQUFPSSxHQUFQLEVBQVk7QUFBRSxVQUFHQSxHQUFHLENBQUN2RSxDQUFKLEtBQVU2RSxTQUFWLElBQXVCTixHQUFHLENBQUN0RSxDQUFKLEtBQVU0RSxTQUFwQyxFQUErQztBQUFFLGVBQU8sSUFBUDtBQUFjOztBQUFDLGFBQU8sS0FBUDtBQUFlOzs7V0FDN0YsaUJBQVFOLEdBQVIsRUFBYTtBQUFFLFVBQUdBLEdBQUcsQ0FBQ0osR0FBSixLQUFZVSxTQUFaLElBQXlCTixHQUFHLENBQUNILEdBQUosS0FBWVMsU0FBeEMsRUFBbUQ7QUFBRSxlQUFPLElBQVA7QUFBYzs7QUFBQyxhQUFPLEtBQVA7QUFBZTs7O1dBQ2xHLGdCQUFPTixHQUFQLEVBQVk7QUFDUixVQUFJLEtBQUtDLE9BQUwsQ0FBYUQsR0FBYixDQUFKLEVBQXVCO0FBQUMsZUFBTyxLQUFLTyxXQUFMLENBQWlCUCxHQUFqQixDQUFQO0FBQTZCOztBQUNyRCxhQUFPO0FBQUN2RSxTQUFDLEVBQUV1RSxHQUFHLENBQUN2RSxDQUFSO0FBQVdDLFNBQUMsRUFBRXNFLEdBQUcsQ0FBQ3RFO0FBQWxCLE9BQVA7QUFDSDs7O1dBQ0QscUJBQVlzRSxHQUFaLEVBQTBDO0FBQUEsVUFBekJHLElBQXlCLHVFQUFsQjtBQUFDTixXQUFHLEVBQUUsQ0FBTjtBQUFTRCxXQUFHLEVBQUU7QUFBZCxPQUFrQjtBQUN0Q08sVUFBSSxDQUFDTixHQUFMLEdBQVdoRCxJQUFJLENBQUMyRCxLQUFMLENBQVdSLEdBQUcsQ0FBQ3RFLENBQWYsRUFBa0JzRSxHQUFHLENBQUN2RSxDQUF0QixDQUFYO0FBQ0EwRSxVQUFJLENBQUNQLEdBQUwsR0FBVy9DLElBQUksQ0FBQzRELEtBQUwsQ0FBV1QsR0FBRyxDQUFDdkUsQ0FBZixFQUFrQnVFLEdBQUcsQ0FBQ3RFLENBQXRCLENBQVg7QUFDQSxhQUFPeUUsSUFBUDtBQUNIOzs7V0FFRCxtQkFBVU8sSUFBVixFQUFnQkMsSUFBaEIsRUFBc0I7QUFDbEIsVUFBSUMsRUFBRSxHQUFHLEtBQUtDLE1BQUwsQ0FBWUgsSUFBWixDQUFUO0FBQ0EsVUFBSUksRUFBRSxHQUFHLEtBQUtELE1BQUwsQ0FBWUYsSUFBWixDQUFUO0FBQ0EsYUFBTyxLQUFLakIsTUFBTCxDQUFZa0IsRUFBRSxDQUFDbkYsQ0FBSCxHQUFPcUYsRUFBRSxDQUFDckYsQ0FBdEIsRUFBeUJtRixFQUFFLENBQUNsRixDQUFILEdBQU9vRixFQUFFLENBQUNwRixDQUFuQyxDQUFQO0FBQ0g7OztXQUVELG9CQUFXcUYsS0FBWCxFQUFrQkMsR0FBbEIsRUFBdUI7QUFDbkIsV0FBS2pCLGFBQUwsQ0FBbUJnQixLQUFuQjtBQUNBLFVBQUlFLENBQUMsR0FBRyxLQUFLSixNQUFMLENBQVlHLEdBQVosQ0FBUjtBQUNBLFVBQUlFLFFBQVEsR0FBRyxLQUFLekIsT0FBTCxDQUFhLEtBQUtDLE1BQUwsQ0FBWSxLQUFLakUsQ0FBTCxHQUFTd0YsQ0FBQyxDQUFDeEYsQ0FBdkIsRUFBMEIsS0FBS0MsQ0FBTCxHQUFTdUYsQ0FBQyxDQUFDdkYsQ0FBckMsQ0FBYixDQUFmO0FBQ0EsVUFBSXlGLEtBQUssR0FBR0QsUUFBUSxDQUFDckIsR0FBVCxHQUFla0IsS0FBSyxDQUFDbEIsR0FBakM7QUFDQSxVQUFJdUIsRUFBRSxHQUFHdkUsSUFBSSxDQUFDeUMsR0FBTCxDQUFTNkIsS0FBVCxJQUFrQkosS0FBSyxDQUFDbkIsR0FBakM7QUFDQSxVQUFJeUIsRUFBRSxHQUFHeEUsSUFBSSxDQUFDMEMsR0FBTCxDQUFTNEIsS0FBVCxJQUFrQkosS0FBSyxDQUFDbkIsR0FBakM7QUFDQSxVQUFJMEIsS0FBSyxHQUFHLEtBQUs3QixPQUFMLENBQWF5QixRQUFiLENBQVo7QUFDQUksV0FBSyxDQUFDMUIsR0FBTixHQUFZd0IsRUFBRSxHQUFHLEtBQUtuRCxJQUF0QjtBQUNBLFVBQUlzRCxNQUFNLEdBQUcsS0FBS1YsTUFBTCxDQUFZUyxLQUFaLENBQWI7QUFDQSxXQUFLNUQsRUFBTCxJQUFXNkQsTUFBTSxDQUFDOUYsQ0FBbEI7QUFDQSxXQUFLa0MsRUFBTCxJQUFXNEQsTUFBTSxDQUFDN0YsQ0FBbEI7QUFDQSxVQUFJOEYsTUFBTSxHQUFHSCxFQUFFLElBQUlILFFBQVEsQ0FBQ3RCLEdBQVQsR0FBZ0IsS0FBSzNCLElBQXpCLENBQWY7QUFDQSxXQUFLTCxFQUFMLElBQVc0RCxNQUFYO0FBQ0g7OztXQUVELGdDQUF1QnhCLEdBQXZCLEVBQTRCSCxHQUE1QixFQUFpQztBQUM3QixVQUFJNEIsQ0FBQyxHQUFHLEtBQUtoQyxPQUFMLENBQWFPLEdBQWIsQ0FBUjtBQUNBLFVBQUltQixLQUFLLEdBQUdNLENBQUMsQ0FBQzVCLEdBQUYsR0FBUUEsR0FBcEI7QUFDQSxVQUFJdUIsRUFBRSxHQUFHdkUsSUFBSSxDQUFDeUMsR0FBTCxDQUFTNkIsS0FBVCxJQUFrQk0sQ0FBQyxDQUFDN0IsR0FBN0I7QUFDQSxVQUFJeUIsRUFBRSxHQUFHeEUsSUFBSSxDQUFDMEMsR0FBTCxDQUFTNEIsS0FBVCxJQUFrQk0sQ0FBQyxDQUFDN0IsR0FBN0I7QUFFQSxVQUFJOEIsRUFBRSxHQUFHN0IsR0FBVDtBQUNBLFVBQUk4QixFQUFFLEdBQUc5QixHQUFHLEdBQUcsS0FBSy9CLElBQXBCOztBQUNBLFVBQUdzRCxFQUFFLEdBQUcsQ0FBUixFQUFVO0FBQ05NLFVBQUUsSUFBSSxLQUFLNUUsRUFBWDtBQUNBc0UsVUFBRSxHQUFHLENBQUNBLEVBQU47QUFDSDs7QUFFRCxVQUFHQyxFQUFFLEdBQUcsQ0FBUixFQUFVO0FBQ05NLFVBQUUsSUFBSSxLQUFLN0UsRUFBWDtBQUNBdUUsVUFBRSxHQUFHLENBQUNBLEVBQU47QUFDSDs7QUFDRCxhQUFPO0FBQ0hPLGFBQUssRUFBRyxLQUFLakMsS0FBTCxDQUFXeUIsRUFBWCxFQUFjTSxFQUFkLENBREw7QUFFSEcsZUFBTyxFQUFHLEtBQUtsQyxLQUFMLENBQVcwQixFQUFYLEVBQWNNLEVBQWQ7QUFGUCxPQUFQO0FBSUg7OztXQUVELHFCQUFZRyxZQUFaLEVBQTBCQyxTQUExQixFQUFxQztBQUNqQyxVQUFJQyxFQUFFLEdBQUcsS0FBS3ZDLE9BQUwsQ0FBYXFDLFlBQVksQ0FBQ3pDLFFBQTFCLENBQVQ7QUFDQSxVQUFJNEMsRUFBRSxHQUFHLEtBQUt4QyxPQUFMLENBQWFxQyxZQUFZLENBQUMzQyxTQUExQixDQUFUO0FBQ0EsVUFBSStDLEdBQUcsR0FBRyxLQUFLQyxzQkFBTCxDQUE0QkgsRUFBNUIsRUFBZ0MsS0FBS2hFLFVBQUwsQ0FBZ0IrRCxTQUFoQixDQUFoQyxDQUFWO0FBQ0EsVUFBSUssR0FBRyxHQUFHLEtBQUtELHNCQUFMLENBQTRCRixFQUE1QixFQUFnQyxLQUFLakUsVUFBTCxDQUFnQitELFNBQWhCLENBQWhDLENBQVY7QUFFQUcsU0FBRyxDQUFDTixLQUFKLENBQVVoQyxHQUFWLElBQWlCLElBQWpCO0FBQ0F3QyxTQUFHLENBQUNSLEtBQUosQ0FBVWhDLEdBQVYsSUFBaUIsSUFBakI7QUFFQXNDLFNBQUcsQ0FBQ04sS0FBSixDQUFVaEMsR0FBVixJQUFpQixLQUFLM0IsSUFBdEI7QUFDQW1FLFNBQUcsQ0FBQ1IsS0FBSixDQUFVaEMsR0FBVixJQUFpQixLQUFLM0IsSUFBdEI7QUFFQWlFLFNBQUcsQ0FBQ04sS0FBSixDQUFVL0IsR0FBVixJQUFpQixLQUFLL0MsRUFBdEI7QUFDQXNGLFNBQUcsQ0FBQ1IsS0FBSixDQUFVL0IsR0FBVixJQUFpQixLQUFLL0MsRUFBdEI7QUFFQW9GLFNBQUcsQ0FBQ0wsT0FBSixDQUFZakMsR0FBWixJQUFtQixJQUFuQjtBQUNBd0MsU0FBRyxDQUFDUCxPQUFKLENBQVlqQyxHQUFaLElBQW1CLElBQW5CO0FBQ0FzQyxTQUFHLENBQUNMLE9BQUosQ0FBWWpDLEdBQVosSUFBbUIsS0FBSzNCLElBQXhCO0FBQ0FtRSxTQUFHLENBQUNQLE9BQUosQ0FBWWpDLEdBQVosSUFBbUIsS0FBSzNCLElBQXhCO0FBQ0FpRSxTQUFHLENBQUNMLE9BQUosQ0FBWWhDLEdBQVosSUFBbUIsS0FBSy9DLEVBQXhCO0FBQ0FzRixTQUFHLENBQUNQLE9BQUosQ0FBWWhDLEdBQVosSUFBbUIsS0FBSy9DLEVBQXhCO0FBRUEsV0FBS3VGLFVBQUwsQ0FBZ0JILEdBQUcsQ0FBQ04sS0FBcEIsRUFBMkJFLFlBQVksQ0FBQ3JELEdBQXhDO0FBQ0EsV0FBSzRELFVBQUwsQ0FBZ0JILEdBQUcsQ0FBQ0wsT0FBcEIsRUFBNkJDLFlBQVksQ0FBQ3JELEdBQTFDO0FBQ0EsV0FBSzRELFVBQUwsQ0FBZ0JELEdBQUcsQ0FBQ1IsS0FBcEIsRUFBMkJFLFlBQVksQ0FBQ3JELEdBQXhDO0FBQ0EsV0FBSzRELFVBQUwsQ0FBZ0JELEdBQUcsQ0FBQ1AsT0FBcEIsRUFBNkJDLFlBQVksQ0FBQ3JELEdBQTFDO0FBQ0g7Ozs7OztBQUdMLCtEQUFlbkIsS0FBZixFOzs7Ozs7Ozs7Ozs7Ozs7OztJQ2xQTWdGLE07QUFDRixvQkFBYztBQUFBOztBQUNWLFNBQUtsRyxNQUFMLEdBQWNtRyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBZDtBQUNBLFNBQUtwRyxNQUFMLENBQVl1QyxLQUFaLEdBQW9CLElBQXBCO0FBQ0EsU0FBS3ZDLE1BQUwsQ0FBWUMsTUFBWixHQUFxQixHQUFyQjtBQUNBLFNBQUtiLEdBQUwsR0FBVyxLQUFLWSxNQUFMLENBQVlxRyxVQUFaLENBQXVCLElBQXZCLENBQVg7QUFDSDs7OztXQUNELHdCQUFlO0FBQ1hGLGNBQVEsQ0FBQ0csSUFBVCxDQUFjQyxNQUFkLENBQXFCLEtBQUt2RyxNQUExQjtBQUNBLFdBQUtBLE1BQUwsQ0FBWXdHLFNBQVosQ0FBc0JDLEdBQXRCLENBQTBCLGFBQTFCO0FBQ0g7OztXQUVELHVCQUFjO0FBQ1YsV0FBS3JILEdBQUwsQ0FBU3NILFNBQVQsQ0FBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsS0FBSzFHLE1BQUwsQ0FBWXVDLEtBQXJDLEVBQTRDLEtBQUt2QyxNQUFMLENBQVlDLE1BQXhEO0FBQ0g7Ozs7OztBQUdMLCtEQUFlaUcsTUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7OztJQ2pCTVMsRztBQUNGLGVBQVl2SCxHQUFaLEVBQWlCQyxDQUFqQixFQUFvQkMsQ0FBcEIsRUFBMEU7QUFBQSxRQUFuREMsSUFBbUQsdUVBQTVDLENBQTRDO0FBQUEsUUFBekNDLElBQXlDLHVFQUFsQyxDQUFrQztBQUFBLFFBQS9CQyxNQUErQix1RUFBdEIsRUFBc0I7QUFBQSxRQUFsQkMsS0FBa0IsdUVBQVYsUUFBVTs7QUFBQTs7QUFDdEUsU0FBS0MsSUFBTCxHQUFZUCxHQUFaO0FBQ0EsU0FBS0MsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsU0FBS0MsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsU0FBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0ksT0FBTCxHQUFlSCxNQUFmO0FBQ0EsU0FBS21ILEtBQUwsR0FBYSxDQUFiO0FBQ0EsU0FBSy9HLE1BQUwsR0FBY0gsS0FBZDtBQUVBLFNBQUtJLFFBQUwsR0FBZ0I7QUFBRVQsT0FBQyxFQUFFLENBQUw7QUFBUUMsT0FBQyxFQUFFO0FBQVgsS0FBaEI7QUFDQSxTQUFLUyxPQUFMLEdBQWUsS0FBS0osSUFBTCxDQUFVSyxNQUFWLENBQWlCQyxNQUFqQixHQUEwQixFQUF6QztBQUNBLFNBQUtDLE9BQUwsR0FBZSxHQUFmO0FBQ0EsU0FBSzJHLFVBQUwsR0FBa0IsR0FBbEI7QUFDQSxTQUFLRCxLQUFMLEdBQWEsQ0FBYjtBQUNBLFNBQUtFLEdBQUwsR0FBVyxJQUFJMUcsS0FBSixFQUFYO0FBQ0EsU0FBSzBHLEdBQUwsQ0FBU3pHLEdBQVQsR0FBZSxzQkFBZjtBQUNIOzs7O1dBRUQsaUJBQVFqQixHQUFSLEVBQWE7QUFDVEEsU0FBRyxDQUFDa0IsSUFBSjtBQUNBbEIsU0FBRyxDQUFDbUIsU0FBSjtBQUNBbkIsU0FBRyxDQUFDb0IsR0FBSixDQUFRLEtBQUtuQixDQUFiLEVBQWdCLEtBQUtDLENBQXJCLEVBQXdCLEtBQUtNLE9BQTdCLEVBQXNDLENBQXRDLEVBQTBDYSxJQUFJLENBQUNDLEVBQUwsR0FBVSxDQUFwRCxFQUF3RCxLQUF4RDtBQUNBdEIsU0FBRyxDQUFDdUIsSUFBSjtBQUNBdkIsU0FBRyxDQUFDd0IsU0FBSjtBQUNBeEIsU0FBRyxDQUFDeUIsU0FBSixDQUFjLEtBQUtpRyxHQUFuQixFQUF3QixLQUFLekgsQ0FBTCxHQUFTLEtBQUtPLE9BQXRDLEVBQStDLEtBQUtOLENBQUwsR0FBUyxLQUFLTSxPQUE3RCxFQUFzRSxLQUFLQSxPQUFMLEdBQWUsQ0FBckYsRUFBd0YsS0FBS0EsT0FBTCxHQUFlLENBQXZHO0FBQ0FSLFNBQUcsQ0FBQzBCLE9BQUosR0FQUyxDQVFUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDs7O1dBRUQscUJBQVk7QUFDUixXQUFLdkIsSUFBTCxJQUFhLEtBQUtPLFFBQUwsQ0FBY1QsQ0FBM0I7QUFDQSxXQUFLRyxJQUFMLElBQWEsS0FBS00sUUFBTCxDQUFjUixDQUEzQjtBQUNBLFdBQUtELENBQUwsSUFBVSxLQUFLRSxJQUFmO0FBQ0EsV0FBS0QsQ0FBTCxJQUFVLEtBQUtFLElBQWY7O0FBRUEsVUFBSSxLQUFLRixDQUFMLElBQVUsS0FBS1MsT0FBbkIsRUFBNEI7QUFDeEIsYUFBS1QsQ0FBTCxHQUFTLEtBQUtTLE9BQUwsSUFBZ0IsS0FBS1QsQ0FBTCxHQUFTLEtBQUtTLE9BQTlCLENBQVQ7QUFDQSxhQUFLUCxJQUFMLEdBQVksQ0FBQ2lCLElBQUksQ0FBQ00sR0FBTCxDQUFTLEtBQUt2QixJQUFkLENBQUQsR0FBdUIsS0FBS1UsT0FBeEM7O0FBQ0EsWUFBSSxLQUFLVixJQUFMLElBQWEsS0FBS00sUUFBTCxDQUFjUixDQUEvQixFQUFrQztBQUM5QixlQUFLRSxJQUFMLEdBQVksQ0FBWjtBQUNBLGVBQUtGLENBQUwsR0FBUyxLQUFLUyxPQUFMLEdBQWUsS0FBS0QsUUFBTCxDQUFjUixDQUF0QztBQUNIOztBQUNELFlBQUksS0FBS0MsSUFBTCxHQUFZLENBQWhCLEVBQW1CO0FBQ2YsZUFBS0EsSUFBTCxJQUFhLEtBQUtzSCxVQUFsQjtBQUNIOztBQUNELFlBQUksS0FBS3RILElBQUwsR0FBWSxDQUFoQixFQUFtQjtBQUNmLGVBQUtBLElBQUwsSUFBYSxLQUFLc0gsVUFBbEI7QUFDSDtBQUNKLE9BbkJPLENBb0JSOzs7QUFDQSxVQUFJLEtBQUtySCxJQUFMLEdBQVUsQ0FBVixJQUFlLEtBQUtBLElBQUwsR0FBVSxDQUFDLEdBQTlCLEVBQW1DO0FBQy9CLGFBQUtBLElBQUwsR0FBWSxDQUFaO0FBQ0gsT0F2Qk8sQ0F3QlI7OztBQUNBLFVBQUlpQixJQUFJLENBQUNNLEdBQUwsQ0FBUyxLQUFLeEIsSUFBZCxJQUFzQixHQUExQixFQUErQjtBQUMzQixhQUFLQSxJQUFMLEdBQVksQ0FBWjtBQUNIO0FBQ0o7OztXQUVELGlCQUFRSCxHQUFSLEVBQWE7QUFDVCxXQUFLMkgsU0FBTDtBQUNBLFdBQUtDLE9BQUwsQ0FBYTVILEdBQWI7QUFDSDs7Ozs7O0FBSUwsK0RBQWV1SCxHQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hFQTs7SUFFTU0sVTtBQUNGLHNCQUFZN0gsR0FBWixFQUFpQjtBQUFBOztBQUNiLFNBQUtPLElBQUwsR0FBWVAsR0FBWjtBQUNBLFNBQUs4SCxJQUFMLEdBQVksS0FBWjtBQUVBLFNBQUtDLE1BQUwsR0FBYyxLQUFLQSxNQUFMLENBQVlDLElBQVosQ0FBaUIsSUFBakIsQ0FBZDtBQUNBLFNBQUtDLE1BQUwsR0FBYzVHLElBQUksQ0FBQzZHLE1BQUwsS0FBYyxHQUFkLEdBQWtCLEVBQWhDO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQixFQUFuQjtBQUNBLFNBQUtDLEdBQUwsR0FBVyxDQUFYO0FBQ0EsU0FBS0MsV0FBTDtBQUNIOzs7O1dBRUQsZ0JBQU9DLFFBQVAsRUFBaUJDLE1BQWpCLEVBQXlCO0FBQ3JCLFVBQUlDLEtBQUssR0FBR25ILElBQUksQ0FBQ0MsRUFBTCxHQUFTZ0gsUUFBVCxHQUFtQixHQUEvQjtBQUNBLFVBQUlHLFNBQVMsR0FBR0YsTUFBaEI7QUFFQSxVQUFNRyxTQUFTLEdBQUcsSUFBSUMsWUFBSixDQUFpQixLQUFLcEksSUFBdEIsRUFBNEIsR0FBNUIsRUFBaUMsR0FBakMsRUFBc0MsSUFBSVIsMENBQUosQ0FBUyxLQUFLUSxJQUFkLENBQXRDLENBQWxCO0FBQ0EsV0FBSzRILFdBQUwsQ0FBaUJTLElBQWpCLENBQXNCRixTQUF0QjtBQUNBQSxlQUFTLENBQUN0SSxJQUFWLEdBQWdCLENBQUVxSSxTQUFGLEdBQWNwSCxJQUFJLENBQUMwQyxHQUFMLENBQVN5RSxLQUFULENBQTlCO0FBQ0FFLGVBQVMsQ0FBQ3ZJLElBQVYsR0FBaUJzSSxTQUFTLEdBQUdwSCxJQUFJLENBQUN5QyxHQUFMLENBQVMwRSxLQUFULENBQTdCO0FBQ0FFLGVBQVMsQ0FBQ0csUUFBVixHQUFxQixHQUFyQjtBQUNIOzs7V0FFRCxvQkFBVzdJLEdBQVgsRUFBZ0I4SSxJQUFoQixFQUFzQkMsTUFBdEIsRUFBOEI7QUFDMUIsVUFBSSxLQUFLWixXQUFMLENBQWlCYSxNQUFqQixHQUEwQixLQUFLWixHQUFuQyxFQUF3QztBQUNwQyxhQUFLRCxXQUFMLENBQWlCLENBQWpCLEVBQW9CYyxNQUFwQjtBQUNBLGFBQUtkLFdBQUwsR0FBbUIsS0FBS0EsV0FBTCxDQUFpQmUsTUFBakIsQ0FBd0IsQ0FBeEIsQ0FBbkI7QUFDSDs7QUFDRCxVQUFJLEtBQUtwQixJQUFULEVBQWU7QUFDWCxhQUFLQyxNQUFMO0FBQ0g7O0FBQ0QsV0FBSyxJQUFJakYsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLcUYsV0FBTCxDQUFpQmEsTUFBckMsRUFBNkNsRyxDQUFDLEVBQTlDLEVBQWtEO0FBQzlDLFlBQUl1RixXQUFXLEdBQUcsS0FBS0YsV0FBTCxDQUFpQnJGLENBQWpCLENBQWxCLENBRDhDLENBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0F1RixtQkFBVyxDQUFDakksSUFBWixJQUFvQixJQUFwQjtBQUNBaUksbUJBQVcsQ0FBQ2MsRUFBWixJQUFrQmQsV0FBVyxDQUFDbEksSUFBWixHQUFtQixDQUFyQztBQUNBa0ksbUJBQVcsQ0FBQ2UsRUFBWixJQUFrQmYsV0FBVyxDQUFDakksSUFBWixHQUFtQixDQUFyQzs7QUFDQSxZQUFJaUksV0FBVyxDQUFDZSxFQUFaLEdBQWlCZixXQUFXLENBQUNnQixJQUFaLENBQWlCaEosTUFBbEMsR0FBMkMsR0FBL0MsRUFBb0Q7QUFDaERnSSxxQkFBVyxDQUFDZSxFQUFaLEdBQWlCLE1BQU1mLFdBQVcsQ0FBQ2dCLElBQVosQ0FBaUJoSixNQUF4QztBQUNIOztBQUNEZ0ksbUJBQVcsQ0FBQ2lCLFlBQVosQ0FBeUJSLElBQXpCLEVBQStCQyxNQUEvQjtBQUNBVixtQkFBVyxDQUFDa0IsZ0JBQVosQ0FBNkIsS0FBS2hKLElBQWxDO0FBQ0g7QUFDSjs7O1dBRUQsaUJBQVFQLEdBQVIsRUFBYThJLElBQWIsRUFBbUJDLE1BQW5CLEVBQTJCO0FBQ3ZCLFdBQUtTLFVBQUwsQ0FBZ0J4SixHQUFoQixFQUFxQjhJLElBQXJCLEVBQTJCQyxNQUEzQjtBQUNIOzs7Ozs7SUFHQ0osWTtBQUNGLHdCQUFZM0ksR0FBWixFQUF1QztBQUFBLFFBQXRCQyxDQUFzQix1RUFBbEIsRUFBa0I7QUFBQSxRQUFkQyxDQUFjLHVFQUFWLEVBQVU7QUFBQSxRQUFObUosSUFBTTs7QUFBQTs7QUFDbkMsU0FBSzlJLElBQUwsR0FBWVAsR0FBWjtBQUNBLFNBQUttSixFQUFMLEdBQVVsSixDQUFWO0FBQ0EsU0FBS21KLEVBQUwsR0FBVWxKLENBQVY7QUFDQSxTQUFLQyxJQUFMLEdBQVksQ0FBWjtBQUNBLFNBQUtDLElBQUwsR0FBWSxDQUFaO0FBQ0EsU0FBS2lKLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtSLFFBQUwsR0FBZ0IsR0FBaEI7QUFDQSxTQUFLWSxPQUFMLEdBQWUsS0FBZjtBQUNBLFNBQUsvSSxRQUFMLEdBQWdCO0FBQUVULE9BQUMsRUFBRSxDQUFMO0FBQVFDLE9BQUMsRUFBRTtBQUFYLEtBQWhCO0FBQ0EsU0FBS1MsT0FBTCxHQUFlLEtBQUtKLElBQUwsQ0FBVUssTUFBVixDQUFpQkMsTUFBakIsR0FBMEIsRUFBekM7QUFDQSxTQUFLQyxPQUFMLEdBQWUsR0FBZjtBQUNBLFNBQUsyRyxVQUFMLEdBQWtCLEdBQWxCO0FBQ0EsU0FBS0QsS0FBTCxHQUFhLENBQWI7QUFDQSxTQUFLbkgsTUFBTCxHQUFjLEVBQWQsQ0FkbUMsQ0FlbkM7QUFDQTtBQUNIOzs7O1dBRUQsa0JBQVM7QUFDTCxXQUFLb0osT0FBTCxHQUFlLElBQWY7QUFDSDs7O1dBRUQsMEJBQWlCekosR0FBakIsRUFBc0I7QUFDbEIsV0FBS3FKLElBQUwsQ0FBVXpILFFBQVYsQ0FBbUI1QixHQUFuQixFQUF3QixLQUFLbUosRUFBN0IsRUFBaUMsS0FBS0MsRUFBdEM7QUFDSDs7O1dBRUQsaUNBQXdCTixJQUF4QixFQUE4QjtBQUMxQixVQUFJQSxJQUFKLEVBQVU7QUFDTixhQUFLLElBQUloRyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHZ0csSUFBSSxDQUFDRSxNQUF6QixFQUFpQ2xHLENBQUMsRUFBbEMsRUFBc0M7QUFDbEMsY0FBSSxLQUFLcUcsRUFBTCxHQUFVLEtBQUtFLElBQUwsQ0FBVTdJLE9BQXBCLEdBQThCc0ksSUFBSSxDQUFDaEcsQ0FBRCxDQUFKLENBQVF0QyxPQUF0QyxHQUFnRHNJLElBQUksQ0FBQ2hHLENBQUQsQ0FBSixDQUFRN0MsQ0FBeEQsSUFDRyxLQUFLa0osRUFBTCxHQUFVTCxJQUFJLENBQUNoRyxDQUFELENBQUosQ0FBUTdDLENBQVIsR0FBWSxLQUFLb0osSUFBTCxDQUFVN0ksT0FBdEIsR0FBZ0NzSSxJQUFJLENBQUNoRyxDQUFELENBQUosQ0FBUXRDLE9BRHJELElBRUcsS0FBSzRJLEVBQUwsR0FBVSxLQUFLQyxJQUFMLENBQVU3SSxPQUFwQixHQUE4QnNJLElBQUksQ0FBQ2hHLENBQUQsQ0FBSixDQUFRdEMsT0FBdEMsR0FBZ0RzSSxJQUFJLENBQUNoRyxDQUFELENBQUosQ0FBUTVDLENBRjNELElBR0csS0FBS2tKLEVBQUwsR0FBVU4sSUFBSSxDQUFDaEcsQ0FBRCxDQUFKLENBQVE1QyxDQUFSLEdBQVksS0FBS21KLElBQUwsQ0FBVTdJLE9BQXRCLEdBQWdDc0ksSUFBSSxDQUFDaEcsQ0FBRCxDQUFKLENBQVF0QyxPQUh6RCxFQUlBO0FBQ0k7QUFDQSxnQkFBSWtKLFFBQVEsR0FBR3JJLElBQUksQ0FBQ3NJLElBQUwsQ0FDUixDQUFDLEtBQUtSLEVBQUwsR0FBVUwsSUFBSSxDQUFDaEcsQ0FBRCxDQUFKLENBQVE3QyxDQUFuQixLQUF5QixLQUFLa0osRUFBTCxHQUFVTCxJQUFJLENBQUNoRyxDQUFELENBQUosQ0FBUTdDLENBQTNDLENBQUQsR0FDQyxDQUFDLEtBQUttSixFQUFMLEdBQVVOLElBQUksQ0FBQ2hHLENBQUQsQ0FBSixDQUFRNUMsQ0FBbkIsS0FBeUIsS0FBS2tKLEVBQUwsR0FBVU4sSUFBSSxDQUFDaEcsQ0FBRCxDQUFKLENBQVE1QyxDQUEzQyxDQUZRLENBQWY7O0FBS0EsZ0JBQUl3SixRQUFRLEdBQUcsS0FBS0wsSUFBTCxDQUFVN0ksT0FBVixHQUFvQnNJLElBQUksQ0FBQ2hHLENBQUQsQ0FBSixDQUFRdEMsT0FBM0MsRUFBb0Q7QUFDaEQsbUJBQUtvSix1QkFBTCxDQUE2QmQsSUFBSSxDQUFDaEcsQ0FBRCxDQUFqQztBQUNIO0FBQ0o7QUFDSjtBQUNKO0FBQ0o7OztXQUVELG1DQUEwQmlHLE1BQTFCLEVBQWtDO0FBQzlCLFVBQUlBLE1BQUosRUFBWTtBQUNSLGFBQUssSUFBSWpHLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdpRyxNQUFNLENBQUNDLE1BQTNCLEVBQW1DbEcsQ0FBQyxFQUFwQyxFQUF3QztBQUNwQyxlQUFLLElBQUkrRyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLENBQXBCLEVBQXVCQSxDQUFDLEVBQXhCLEVBQTJCO0FBQ3ZCLGdCQUFNQyxZQUFZLEdBQUcsQ0FBQyxLQUFLWCxFQUFOLEVBQVUsS0FBS0MsRUFBZixDQUFyQjs7QUFDQSxnQkFBSVMsQ0FBQyxHQUFHLENBQUosS0FBVSxDQUFkLEVBQWlCO0FBQ2Isa0JBQUksS0FBS0UsdUJBQUwsQ0FBNkJoQixNQUFNLENBQUNqRyxDQUFELENBQU4sQ0FBVUUsUUFBVixDQUFtQjZHLENBQW5CLENBQTdCLEVBQW9EZCxNQUFNLENBQUNqRyxDQUFELENBQU4sQ0FBVUUsUUFBVixDQUFtQixDQUFuQixDQUFwRCxFQUEyRThHLFlBQTNFLEVBQXlGLEtBQUt6SixNQUE5RixDQUFKLEVBQTJHO0FBQ3ZHLHFCQUFLMkoseUJBQUwsQ0FBK0JqQixNQUFNLENBQUNqRyxDQUFELENBQXJDO0FBQ0g7QUFDSixhQUpELE1BSU87QUFDSCxrQkFBSSxLQUFLaUgsdUJBQUwsQ0FBNkJoQixNQUFNLENBQUNqRyxDQUFELENBQU4sQ0FBVUUsUUFBVixDQUFtQjZHLENBQW5CLENBQTdCLEVBQW9EZCxNQUFNLENBQUNqRyxDQUFELENBQU4sQ0FBVUUsUUFBVixDQUFtQjZHLENBQUMsR0FBRyxDQUF2QixDQUFwRCxFQUErRUMsWUFBL0UsRUFBNkYsS0FBS3pKLE1BQWxHLENBQUosRUFBK0c7QUFDM0cscUJBQUsySix5QkFBTCxDQUErQmpCLE1BQU0sQ0FBQ2pHLENBQUQsQ0FBckM7QUFDSDtBQUNKO0FBQ0osV0FabUMsQ0FhcEM7O0FBQ0g7QUFDSjtBQUNKOzs7V0FFRCxpQ0FBd0I0RSxHQUF4QixFQUE2QjtBQUN6QixVQUFNdUMsS0FBSyxHQUFHLEtBQUtaLElBQUwsQ0FBVTdJLE9BQXhCO0FBQ0EsVUFBTTBKLEtBQUssR0FBR3hDLEdBQUcsQ0FBQ2xILE9BQWxCO0FBQ0EsVUFBSWtILEdBQUcsQ0FBQ3ZILElBQUosS0FBYSxDQUFqQixFQUFvQnVILEdBQUcsQ0FBQ3ZILElBQUosR0FBVyxDQUFYLENBSEssQ0FJekI7QUFDQTtBQUNBOztBQUVBLFdBQUtBLElBQUwsR0FBWSxDQUFDLEtBQUtBLElBQWxCO0FBQ0EsV0FBS0MsSUFBTCxHQUFZLENBQUMsS0FBS0EsSUFBbEI7QUFFQXNILFNBQUcsQ0FBQ3ZILElBQUosR0FBVyxDQUFDdUgsR0FBRyxDQUFDdkgsSUFBaEI7QUFDQXVILFNBQUcsQ0FBQ3RILElBQUosR0FBVyxDQUFDc0gsR0FBRyxDQUFDdEgsSUFBaEIsQ0FaeUIsQ0FjekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBSytJLEVBQUwsSUFBVyxLQUFLaEosSUFBaEI7QUFDQSxXQUFLaUosRUFBTCxJQUFXLEtBQUtoSixJQUFoQjtBQUNBc0gsU0FBRyxDQUFDekgsQ0FBSixJQUFTeUgsR0FBRyxDQUFDdkgsSUFBYjtBQUNBdUgsU0FBRyxDQUFDeEgsQ0FBSixJQUFTd0gsR0FBRyxDQUFDdEgsSUFBYjtBQUNIOzs7V0FFRCxtQ0FBMEIrSixLQUExQixFQUFpQztBQUM3QixXQUFLaEssSUFBTCxHQUFZLENBQUMsS0FBS0EsSUFBbEI7QUFDQSxXQUFLQyxJQUFMLEdBQVksQ0FBQyxLQUFLQSxJQUFsQjtBQUVBLFdBQUsrSSxFQUFMLElBQVcsS0FBS2hKLElBQWhCO0FBQ0EsV0FBS2lKLEVBQUwsSUFBVyxLQUFLaEosSUFBaEI7QUFDSDs7O1dBRUQsaUNBQXdCZ0ssTUFBeEIsRUFBZ0NDLE1BQWhDLEVBQXdDUCxZQUF4QyxFQUFzRHpKLE1BQXRELEVBQThEO0FBQzFELFVBQUlpSyxJQUFKO0FBQ0EsVUFBTUMsS0FBSyxHQUFHRixNQUFNLENBQUNwSCxHQUFQLENBQVdoRCxDQUFYLEdBQWVtSyxNQUFNLENBQUNuSCxHQUFQLENBQVdoRCxDQUF4QztBQUNBLFVBQU11SyxLQUFLLEdBQUdILE1BQU0sQ0FBQ3BILEdBQVAsQ0FBVy9DLENBQVgsR0FBZWtLLE1BQU0sQ0FBQ25ILEdBQVAsQ0FBVy9DLENBQXhDO0FBQ0EsVUFBTXVLLEtBQUssR0FBR1gsWUFBWSxDQUFDLENBQUQsQ0FBWixHQUFrQk0sTUFBTSxDQUFDbkgsR0FBUCxDQUFXaEQsQ0FBM0M7QUFDQSxVQUFNeUssS0FBSyxHQUFHWixZQUFZLENBQUMsQ0FBRCxDQUFaLEdBQWtCTSxNQUFNLENBQUNuSCxHQUFQLENBQVcvQyxDQUEzQztBQUNBLFVBQU15SyxJQUFJLEdBQUcsQ0FBQ0YsS0FBSyxHQUFHRixLQUFSLEdBQWdCRyxLQUFLLEdBQUdGLEtBQXpCLEtBQW1DQSxLQUFLLEdBQUdBLEtBQVIsR0FBZ0JELEtBQUssR0FBR0EsS0FBM0QsQ0FBYjs7QUFDQSxVQUFJSSxJQUFJLElBQUksQ0FBUixJQUFhQSxJQUFJLElBQUksQ0FBekIsRUFBMkI7QUFDdkJMLFlBQUksR0FBRyxTQUFDRixNQUFNLENBQUNuSCxHQUFQLENBQVdoRCxDQUFYLEdBQWdCc0ssS0FBSyxHQUFHSSxJQUF4QixHQUErQmIsWUFBWSxDQUFDLENBQUQsQ0FBNUMsRUFBb0QsQ0FBcEQsYUFBeURNLE1BQU0sQ0FBQ25ILEdBQVAsQ0FBVy9DLENBQVgsR0FBZXNLLEtBQUssR0FBR0csSUFBdkIsR0FBOEJiLFlBQVksQ0FBQyxDQUFELENBQW5HLEVBQTJHLENBQTNHLENBQVA7QUFDSCxPQUZELE1BRU87QUFDSFEsWUFBSSxHQUFHSyxJQUFJLEdBQUcsQ0FBUCxHQUNILFNBQUNQLE1BQU0sQ0FBQ25ILEdBQVAsQ0FBV2hELENBQVgsR0FBZTZKLFlBQVksQ0FBQyxDQUFELENBQTVCLEVBQW9DLENBQXBDLGFBQXlDTSxNQUFNLENBQUNuSCxHQUFQLENBQVcvQyxDQUFYLEdBQWU0SixZQUFZLENBQUMsQ0FBRCxDQUFwRSxFQUE0RSxDQUE1RSxDQURHLEdBRUgsU0FBQ08sTUFBTSxDQUFDcEgsR0FBUCxDQUFXaEQsQ0FBWCxHQUFlNkosWUFBWSxDQUFDLENBQUQsQ0FBNUIsRUFBb0MsQ0FBcEMsYUFBeUNPLE1BQU0sQ0FBQ3BILEdBQVAsQ0FBVy9DLENBQVgsR0FBZTRKLFlBQVksQ0FBQyxDQUFELENBQXBFLEVBQTRFLENBQTVFLENBRko7QUFHSDs7QUFDRCxhQUFPUSxJQUFJLEdBQUdqSyxNQUFNLEdBQUdBLE1BQXZCO0FBQ0g7OztXQUVELHNCQUFheUksSUFBYixFQUFtQkMsTUFBbkIsRUFBMkI7QUFDdkIsV0FBSzZCLHVCQUFMLENBQTZCOUIsSUFBN0I7QUFDQSxXQUFLK0IseUJBQUwsQ0FBK0I5QixNQUEvQjtBQUNBLFdBQUs1SSxJQUFMLElBQWEsS0FBS08sUUFBTCxDQUFjVCxDQUEzQjtBQUNBLFdBQUtHLElBQUwsSUFBYSxLQUFLTSxRQUFMLENBQWNSLENBQTNCO0FBQ0EsV0FBS2lKLEVBQUwsSUFBVyxLQUFLaEosSUFBaEI7QUFDQSxXQUFLaUosRUFBTCxJQUFXLEtBQUtoSixJQUFoQjs7QUFFQSxVQUFJLEtBQUtnSixFQUFMLElBQVcsS0FBS3pJLE9BQXBCLEVBQTZCO0FBQ3pCLGFBQUt5SSxFQUFMLEdBQVUsS0FBS3pJLE9BQUwsSUFBZ0IsS0FBS3lJLEVBQUwsR0FBVSxLQUFLekksT0FBL0IsQ0FBVjtBQUNBLGFBQUtQLElBQUwsR0FBWSxDQUFDaUIsSUFBSSxDQUFDTSxHQUFMLENBQVMsS0FBS3ZCLElBQWQsQ0FBRCxHQUF1QixLQUFLVSxPQUF4Qzs7QUFDQSxZQUFJLEtBQUtWLElBQUwsSUFBYSxLQUFLTSxRQUFMLENBQWNSLENBQS9CLEVBQWtDO0FBQzlCLGVBQUtFLElBQUwsR0FBWSxDQUFaO0FBQ0EsZUFBS2dKLEVBQUwsR0FBVSxLQUFLekksT0FBTCxHQUFlLEtBQUtELFFBQUwsQ0FBY1IsQ0FBdkM7QUFDSDs7QUFDRCxZQUFJLEtBQUtDLElBQUwsR0FBWSxDQUFoQixFQUFtQjtBQUNmLGVBQUtBLElBQUwsSUFBYSxLQUFLc0gsVUFBbEI7QUFDSDs7QUFDRCxZQUFJLEtBQUt0SCxJQUFMLEdBQVksQ0FBaEIsRUFBbUI7QUFDZixlQUFLQSxJQUFMLElBQWEsS0FBS3NILFVBQWxCO0FBQ0g7QUFDSixPQXJCc0IsQ0FzQnZCOzs7QUFDQSxVQUFLLEtBQUsyQixFQUFMLElBQVcsS0FBS3pJLE9BQUwsR0FBZSxFQUEvQixFQUFtQztBQUMvQixZQUFJLEtBQUtQLElBQUwsR0FBWSxDQUFaLElBQWlCLEtBQUtBLElBQUwsR0FBWSxDQUFDLEdBQWxDLEVBQXVDO0FBQ25DLGVBQUtBLElBQUwsR0FBWSxDQUFaO0FBQ0g7QUFDSixPQTNCc0IsQ0E0QnZCOzs7QUFDQSxVQUFJaUIsSUFBSSxDQUFDTSxHQUFMLENBQVMsS0FBS3hCLElBQWQsSUFBc0IsR0FBMUIsRUFBK0I7QUFDM0IsYUFBS0EsSUFBTCxHQUFZLENBQVo7QUFDSDtBQUNKOzs7Ozs7QUFJTCwrREFBZTBILFVBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZOQTtBQUNBOztJQUVNaUQsVztBQUNGLHlCQUFnSjtBQUFBLFFBQW5JQyxZQUFtSSx1RUFBcEgsQ0FBb0g7QUFBQSxRQUFqSEMsaUJBQWlILHVFQUE3RixDQUFDLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBRCxFQUFhLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBYixDQUE2RjtBQUFBLFFBQW5FQyxjQUFtRSx1RUFBbEQsQ0FBa0Q7QUFBQSxRQUEvQ0Msa0JBQStDLHVFQUExQixDQUFDLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBRCxFQUFhLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBYixDQUEwQjs7QUFBQTs7QUFDNUksU0FBS0gsWUFBTCxHQUFvQkEsWUFBcEI7QUFDQSxTQUFLQyxpQkFBTCxHQUF5QkEsaUJBQXpCO0FBQ0EsU0FBS2xDLElBQUwsR0FBWSxFQUFaO0FBRUEsU0FBS21DLGNBQUwsR0FBc0JBLGNBQXRCO0FBQ0EsU0FBS0Msa0JBQUwsR0FBMEJBLGtCQUExQjtBQUNBLFNBQUtuQyxNQUFMLEdBQWMsRUFBZDtBQUNIOzs7O1dBRUQsa0JBQVMvSSxHQUFULEVBQWM7QUFDVixVQUFJLEtBQUs4SSxJQUFMLENBQVVFLE1BQVYsS0FBcUIsQ0FBekIsRUFBNEI7QUFDeEIsYUFBSyxJQUFJbEcsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLa0ksaUJBQUwsQ0FBdUJoQyxNQUEzQyxFQUFtRGxHLENBQUMsRUFBcEQsRUFBd0Q7QUFDcEQsZUFBS2dHLElBQUwsQ0FBVUYsSUFBVixDQUFlLElBQUlyQix5Q0FBSixDQUFRdkgsR0FBUixFQUFhLEtBQUtnTCxpQkFBTCxDQUF1QmxJLENBQXZCLEVBQTBCLENBQTFCLENBQWIsRUFBMkMsS0FBS2tJLGlCQUFMLENBQXVCbEksQ0FBdkIsRUFBMEIsQ0FBMUIsQ0FBM0MsQ0FBZjtBQUNIO0FBQ0o7QUFDSjs7O1dBRUQsb0JBQVc5QyxHQUFYLEVBQWdCO0FBQ1osVUFBSSxLQUFLK0ksTUFBTCxDQUFZQyxNQUFaLEtBQXVCLENBQTNCLEVBQTZCO0FBQ3pCLGFBQUssSUFBSWxHLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS29JLGtCQUFMLENBQXdCbEMsTUFBNUMsRUFBb0RsRyxDQUFDLEVBQXJELEVBQXlEO0FBQ3JELGVBQUtpRyxNQUFMLENBQVlILElBQVosQ0FBaUIsSUFBSTlHLDJDQUFKLENBQVU5QixHQUFWLEVBQWUsS0FBS2tMLGtCQUFMLENBQXdCcEksQ0FBeEIsRUFBMkIsQ0FBM0IsQ0FBZixFQUE4QyxLQUFLb0ksa0JBQUwsQ0FBd0JwSSxDQUF4QixFQUEyQixDQUEzQixDQUE5QyxDQUFqQjtBQUNIO0FBQ0o7QUFDSjs7O1dBRUQsaUJBQVE5QyxHQUFSLEVBQWE7QUFDVCxXQUFLbUwsUUFBTCxDQUFjbkwsR0FBZDs7QUFDQSxXQUFLLElBQUk4QyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtnRyxJQUFMLENBQVVFLE1BQTlCLEVBQXNDbEcsQ0FBQyxFQUF2QyxFQUEyQztBQUN2QyxhQUFLZ0csSUFBTCxDQUFVaEcsQ0FBVixFQUFhc0ksT0FBYixDQUFxQnBMLEdBQXJCO0FBQ0g7O0FBRUQsV0FBS3FMLFVBQUwsQ0FBZ0JyTCxHQUFoQjs7QUFDQSxXQUFLLElBQUk4QyxFQUFDLEdBQUcsQ0FBYixFQUFnQkEsRUFBQyxHQUFHLEtBQUtpRyxNQUFMLENBQVlDLE1BQWhDLEVBQXdDbEcsRUFBQyxFQUF6QyxFQUE2QztBQUN6QyxhQUFLaUcsTUFBTCxDQUFZakcsRUFBWixFQUFlc0ksT0FBZixDQUF1QnBMLEdBQXZCO0FBQ0g7QUFDSjs7Ozs7O0FBR0wsK0RBQWU4SyxXQUFmLEU7Ozs7Ozs7Ozs7O0FDM0NBOzs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFFQSxJQUFNUSxlQUFlLEdBQUc7QUFDdEJDLGdCQUFjLEVBQUUsSUFETTtBQUV0QkMsdUJBQXFCLEVBQUU7QUFGRCxDQUF4QjtBQUtBLElBQUl2TCxDQUFKLEVBQU9DLENBQVA7QUFDQSxJQUFJdUwsTUFBSixFQUFZQyxNQUFaO0FBQ0EsSUFBTUMsT0FBTyxHQUFHLE1BQWhCO0FBQ0EsSUFBTUMsT0FBTyxHQUFHLEdBQWhCO0FBRUE3RSxRQUFRLENBQUM4RSxhQUFULENBQXVCLFNBQXZCLEVBQWtDQyxnQkFBbEMsQ0FBbUQsT0FBbkQsRUFBNERDLFdBQTVEOztBQUVBLFNBQVNBLFdBQVQsR0FBdUI7QUFDbkJDLDBCQUF3QjtBQUN4QixNQUFNcEwsTUFBTSxHQUFHLElBQUlrRyxvREFBSixFQUFmO0FBQ0FsRyxRQUFNLENBQUNxTCxZQUFQO0FBQ0EsTUFBTUMsU0FBUyxHQUFHdEwsTUFBTSxDQUFDQSxNQUF6QjtBQUNBLE1BQUl1TCxjQUFjLEdBQUdELFNBQVMsQ0FBQ0UscUJBQVYsRUFBckI7QUFDQSxNQUFNQyxVQUFVLEdBQUcsSUFBSXhFLHdEQUFKLENBQWVqSCxNQUFNLENBQUNaLEdBQXRCLENBQW5CO0FBRUEsTUFBTXNNLEtBQUssR0FBRztBQUNack0sS0FBQyxFQUFFVyxNQUFNLENBQUN1QyxLQUFQLEdBQWEsQ0FESjtBQUVaakQsS0FBQyxFQUFFVSxNQUFNLENBQUNDLE1BQVAsR0FBYyxDQUZMO0FBR1owTCxTQUFLLEVBQUU7QUFISyxHQUFkO0FBTUFMLFdBQVMsQ0FBQ0osZ0JBQVYsQ0FBMkIsV0FBM0IsRUFBd0MsVUFBU1UsQ0FBVCxFQUFZO0FBQ2xERixTQUFLLENBQUNyTSxDQUFOLEdBQVV1TSxDQUFDLENBQUN2TSxDQUFGLEdBQU1rTSxjQUFjLENBQUNNLElBQS9CO0FBQ0FILFNBQUssQ0FBQ3BNLENBQU4sR0FBVXNNLENBQUMsQ0FBQ3RNLENBQUYsR0FBTWlNLGNBQWMsQ0FBQ08sR0FBL0I7QUFFRCxHQUpEO0FBTUFSLFdBQVMsQ0FBQ0osZ0JBQVYsQ0FBMkIsU0FBM0IsRUFBc0MsVUFBU1UsQ0FBVCxFQUFXO0FBQy9DRixTQUFLLENBQUNyTSxDQUFOLEdBQVV1TSxDQUFDLENBQUN2TSxDQUFGLEdBQU1rTSxjQUFjLENBQUNNLElBQS9CO0FBQ0FILFNBQUssQ0FBQ3BNLENBQU4sR0FBVXNNLENBQUMsQ0FBQ3RNLENBQUYsR0FBTWlNLGNBQWMsQ0FBQ08sR0FBL0I7QUFFQWpCLFVBQU0sR0FBR2EsS0FBSyxDQUFDck0sQ0FBTixHQUFVMEwsT0FBbkI7QUFDQUQsVUFBTSxHQUFHWSxLQUFLLENBQUNwTSxDQUFOLEdBQVUwTCxPQUFuQixDQUwrQyxDQU1qRDtBQUNBOztBQUNFLFFBQUllLFdBQVcsR0FBR3RMLElBQUksQ0FBQzJELEtBQUwsQ0FBVzBHLE1BQVgsRUFBbUJELE1BQW5CLENBQWxCO0FBQ0EsUUFBSW1CLE9BQU8sR0FBRyxFQUFFLENBQUN2TCxJQUFJLENBQUNNLEdBQUwsQ0FBU2dMLFdBQVcsR0FBRyxHQUFkLEdBQW9CdEwsSUFBSSxDQUFDQyxFQUFsQyxJQUF3QyxHQUF6QyxJQUFnRCxFQUFsRCxDQUFkLENBVCtDLENBVS9DOztBQUNBK0ssY0FBVSxDQUFDdEUsTUFBWCxDQUFrQjZFLE9BQWxCLEVBQTZCdkwsSUFBSSxDQUFDTSxHQUFMLENBQVMySyxLQUFLLENBQUNyTSxDQUFOLEdBQVUsR0FBbkIsSUFBMEIsQ0FBdkQ7QUFDRCxHQVpEO0FBY0EsTUFBTTRNLFdBQVcsR0FBRyxJQUFJL0IseURBQUosRUFBcEI7QUFFQSxNQUFJZ0MsU0FBUyxHQUFHLElBQWhCOztBQUVBLE1BQU1DLFNBQVMsR0FBRyxTQUFaQSxTQUFZLEdBQU07QUFDcEJuTSxVQUFNLENBQUNvTSxXQUFQOztBQUNBLFFBQUlGLFNBQUosRUFBZTtBQUVYLFVBQUlHLEdBQUcsR0FBRyxJQUFJak0sS0FBSixFQUFWO0FBQ0FpTSxTQUFHLENBQUNoTSxHQUFKLEdBQVUsdUNBQVY7QUFDQUwsWUFBTSxDQUFDWixHQUFQLENBQVd5QixTQUFYLENBQXFCd0wsR0FBckIsRUFBeUIsRUFBekIsRUFBNEIsR0FBNUI7QUFDQUosaUJBQVcsQ0FBQ3pCLE9BQVosQ0FBb0J4SyxNQUFNLENBQUNaLEdBQTNCO0FBQ0FxTSxnQkFBVSxDQUFDakIsT0FBWCxDQUFtQnhLLE1BQU0sQ0FBQ1osR0FBMUIsRUFBK0I2TSxXQUFXLENBQUMvRCxJQUEzQyxFQUFpRCtELFdBQVcsQ0FBQzlELE1BQTdELEVBTlcsQ0FPWDs7QUFFQW1FLFlBQU0sQ0FBQ0MscUJBQVAsQ0FBNkJKLFNBQTdCO0FBQ0g7QUFDSixHQWJEOztBQWVBRyxRQUFNLENBQUNDLHFCQUFQLENBQTZCSixTQUE3QixFQXJEbUIsQ0F1RG5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDSjtBQUNIOztBQUdELFNBQVNmLHdCQUFULEdBQW9DO0FBQ2xDLFNBQU9WLGVBQWUsQ0FBQ0UscUJBQWhCLENBQXNDeEMsTUFBN0MsRUFBcUQ7QUFBQSxnQ0FLL0NzQyxlQUFlLENBQUNFLHFCQUFoQixDQUFzQzRCLEdBQXRDLEVBTCtDO0FBQUE7QUFBQSxRQUVqREMsUUFGaUQ7QUFBQSxRQUdqREMsS0FIaUQ7QUFBQSxRQUlqREMsT0FKaUQ7O0FBTW5ELFFBQUlGLFFBQVEsS0FBSyxRQUFqQixFQUEyQjtBQUN6QkgsWUFBTSxDQUFDTSxtQkFBUCxDQUEyQkYsS0FBM0IsRUFBa0NDLE9BQWxDO0FBQ0FFLGFBQU8sQ0FBQ0MsR0FBUixDQUFZSCxPQUFaO0FBQ0QsS0FIRCxNQUdPO0FBQ0x4RyxjQUFRLENBQUM4RSxhQUFULENBQXVCd0IsUUFBdkIsRUFBaUNHLG1CQUFqQyxDQUFxREYsS0FBckQsRUFBNERDLE9BQTVEO0FBQ0Q7QUFDRjtBQUNGOztBQUVELFNBQVNJLFNBQVQsR0FBcUI7QUFDbkIsTUFBSXJDLGVBQWUsQ0FBQ0MsY0FBaEIsS0FBbUMsWUFBdkMsRUFDRXhFLFFBQVEsQ0FBQ0csSUFBVCxDQUFjMEcsV0FBZCxDQUEwQjdHLFFBQVEsQ0FBQzhFLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBMUI7O0FBQ0YsTUFBSVAsZUFBZSxDQUFDQyxjQUFoQixLQUFtQyxTQUF2QyxFQUFrRDtBQUNoRCx1QkFBSXhFLFFBQVEsQ0FBQzhHLGdCQUFULENBQTBCLE9BQTFCLENBQUosRUFBd0NDLE9BQXhDLENBQWdELFVBQUNDLElBQUQ7QUFBQSxhQUM5Q2hILFFBQVEsQ0FBQ0csSUFBVCxDQUFjMEcsV0FBZCxDQUEwQkcsSUFBMUIsQ0FEOEM7QUFBQSxLQUFoRDtBQUdEO0FBQ0YsQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQmlyZCB7XG4gICAgY29uc3RydWN0b3IoY3R4LCB4ID0gMTAwLCB5ID0gMTAwLCB2ZWxYID0gMCwgdmVsWSA9IDAsIHJhZGl1cyA9IDE0LCBjb2xvciA9IFwiUkVEXCIpIHtcbiAgICAgICAgdGhpcy5fY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLnZlbFggPSB2ZWxYO1xuICAgICAgICB0aGlzLnZlbFkgPSB2ZWxZO1xuICAgICAgICB0aGlzLl9yYWRpdXMgPSByYWRpdXM7XG4gICAgICAgIHRoaXMuX2NvbG9yID0gY29sb3I7XG5cbiAgICAgICAgdGhpcy5fZ3Jhdml0eSA9IHsgeDogMCwgeTogMC4xIH07XG4gICAgICAgIHRoaXMuX2dyb3VuZCA9IHRoaXMuX2N0eC5jYW52YXMuaGVpZ2h0O1xuICAgICAgICB0aGlzLl9ib3VuY2UgPSAxLjM7XG4gICAgICAgIHRoaXMuYmlyZCA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB0aGlzLmJpcmQuc3JjID0gXCJzcmMvaW1hZ2VzL2JpcmRzLnBuZ1wiXG4gICAgfVxuXG4gICAgZHJhd0JpcmQoY3R4LCB4LCB5KSB7XG4gICAgICAgIC8vIGN0eC5kcmF3SW1hZ2UodGhpcy5iaXJkLCAwLCAwLCAxMCwgMTAsIHgsIHksIDEwLCAxMClcbiAgICAgICAgLy8gY3R4LmZpbGxTdHlsZSA9IHRoaXMuX2NvbG9yO1xuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmMoeCwgeSwgdGhpcy5fcmFkaXVzLCAwLCAoTWF0aC5QSSAqIDIpLCBmYWxzZSk7XG4gICAgICAgIGN0eC5jbGlwKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmJpcmQsIHggLSB0aGlzLl9yYWRpdXMsIHkgLSB0aGlzLl9yYWRpdXMsIHRoaXMuX3JhZGl1cyAqIDIsIHRoaXMuX3JhZGl1cyAqIDIpXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgIC8vIGN0eC5maWxsKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlQmlyZCgpIHtcbiAgICAgICAgdGhpcy52ZWxYICs9IHRoaXMuX2dyYXZpdHkueDtcbiAgICAgICAgdGhpcy52ZWxZICs9IHRoaXMuX2dyYXZpdHkueTtcbiAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsWDtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMudmVsWTtcblxuICAgICAgICBpZiAodGhpcy55ID49IHRoaXMuX2dyb3VuZCkge1xuICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5fZ3JvdW5kIC0gKHRoaXMueSAtIHRoaXMuX2dyb3VuZCk7XG4gICAgICAgICAgICB0aGlzLnZlbFkgPSAtTWF0aC5hYnModGhpcy52ZWxZKSAqIHRoaXMuX2JvdW5jZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnZlbFkgPj0gdGhpcy5fZ3Jhdml0eS55KSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWxZID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLl9ncm91bmQgLSB0aGlzLl9ncmF2aXR5Lnk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbmltYXRlKGN0eCkge1xuICAgICAgICB0aGlzLmRyYXdCaXJkKGN0eCk7XG4gICAgICAgIHRoaXMudXBkYXRlQmlyZCgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmlyZDsiLCJjbGFzcyBCbG9jayB7XG4gICAgY29uc3RydWN0b3IoY3R4LCB4LCB5LCB3ID0gMzAsIGggPSAxMDApIHtcbiAgICAgICAgdGhpcy5fY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLncgPSB3O1xuICAgICAgICB0aGlzLmggPSBoO1xuICAgICAgICB0aGlzLnIgPSAwLjE7XG4gICAgICAgIHRoaXMuZHggPSAwO1xuICAgICAgICB0aGlzLmR5ID0gMDtcbiAgICAgICAgdGhpcy5kciA9IDA7XG4gICAgICAgIHRoaXMuSU5TRVQgPSAxMDtcbiAgICAgICAgdGhpcy5QSSA9IE1hdGguUEk7XG4gICAgICAgIHRoaXMuUEk5MCA9IE1hdGguUEkgLyAyO1xuICAgICAgICB0aGlzLlBJMiA9IE1hdGguUEkgKiAyO1xuICAgICAgICB0aGlzLldBTExfTk9STVMgPSBbIE1hdGguUEkgLyAyLCBNYXRoLlBJLCAtKE1hdGguUEkgLyAyKSwgMF1cbiAgICAgICAgdGhpcy5fZ3JvdW5kID0gdGhpcy5fY3R4LmNhbnZhcy5oZWlnaHQgLSAxMDU7XG4gICAgICAgIHRoaXMubWFzcyA9IHRoaXMuZ2V0TWFzcygpXG4gICAgfVxuXG4gICAgYW5pbWF0ZShjdHgpIHtcbiAgICAgICAgY3R4LnNhdmUoKVxuICAgICAgICBjdHguc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xuICAgICAgICB0aGlzLnVwZGF0ZUJsb2NrKCk7XG4gICAgICAgIHRoaXMuZHJhd0Jsb2NrKGN0eCk7XG4gICAgICAgIGN0eC5yZXN0b3JlKClcblxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgNDsgaSsrKXtcbiAgICAgICAgICAgIHZhciBwID0gdGhpcy5nZXRQb2ludChpKTtcbiAgICAgICAgICAgIC8vIG9ubHkgZG8gb25lIGNvbGxpc2lvbiBwZXIgZnJhbWUgb3Igd2Ugd2lsbCBlbmQgdXAgYWRkaW5nIGVuZXJneVxuICAgICAgICAgICAgaWYocC5wb3MueCA8IHRoaXMuSU5TRVQpe1xuICAgICAgICAgICAgICAgIHRoaXMueCArPSAodGhpcy5JTlNFVCkgLSBwLnBvcy54O1xuICAgICAgICAgICAgICAgIHRoaXMuZG9Db2xsaXNpb24ocCwzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiggcC5wb3MueCA+IGN0eC5jYW52YXMud2lkdGgtdGhpcy5JTlNFVCl7XG4gICAgICAgICAgICAgICAgdGhpcy54ICs9IChjdHguY2FudmFzLndpZHRoIC0gdGhpcy5JTlNFVCkgLSBwLnBvcy54O1xuICAgICAgICAgICAgICAgIHRoaXMuZG9Db2xsaXNpb24ocCwxKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihwLnBvcy55IDwgdGhpcy5JTlNFVCl7XG4gICAgICAgICAgICAgICAgdGhpcy55ICs9ICh0aGlzLklOU0VUKSAtIHAucG9zLnk7XG4gICAgICAgICAgICAgICAgdGhpcy5kb0NvbGxpc2lvbihwLDApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKCBwLnBvcy55ID4gY3R4LmNhbnZhcy5oZWlnaHQgLSB0aGlzLklOU0VUKXtcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gKGN0eC5jYW52YXMuaGVpZ2h0IC0gdGhpcy5JTlNFVCkgLSBwLnBvcy55O1xuICAgICAgICAgICAgICAgIHRoaXMuZG9Db2xsaXNpb24ocCwyKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TWFzcygpIHtcbiAgICAgICAgcmV0dXJuICggdGhpcy53ICogdGhpcy5oICogdGhpcy5oKSAvIDEwMDA7XG4gICAgfVxuXG4gICAgZHJhd0Jsb2NrKGN0eCkge1xuICAgICAgICBjdHguc2V0VHJhbnNmb3JtKDEsMCwwLDEsdGhpcy54LHRoaXMueSk7XG4gICAgICAgIGN0eC5yb3RhdGUodGhpcy5yKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiQmx1ZVwiO1xuICAgICAgICBjdHguZmlsbFJlY3QoLXRoaXMudy8yLCAtdGhpcy5oLzIsIHRoaXMudywgdGhpcy5oKVxuICAgICAgICBjdHguc3Ryb2tlUmVjdCgtdGhpcy53LzIsIC10aGlzLmgvMiwgdGhpcy53LCB0aGlzLmgpXG4gICAgfVxuXG4gICAgdXBkYXRlQmxvY2soKSB7XG4gICAgICAgIHRoaXMueCArPSB0aGlzLmR4O1xuICAgICAgICB0aGlzLnkgKz0gdGhpcy5keTtcbiAgICAgICAgdGhpcy5keSArPSAwLjA2MTtcbiAgICAgICAgdGhpcy5yICs9IHRoaXMuZHI7XG5cbiAgICAgICAgLy8gaWYgKHRoaXMueSA+PSB0aGlzLl9ncm91bmQpIHtcbiAgICAgICAgLy8gICAgIHRoaXMueSA9IHRoaXMuX2dyb3VuZCBcbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIGdldFBvaW50KHdoaWNoKSB7XG4gICAgICAgIHZhciBkeCwgZHksIHgsIHksIHh4LCB5eSwgdmVsb2NpdHlBLCB2ZWxvY2l0eVQsIHZlbG9jaXR5O1xuXG4gICAgICAgIGR4ID0gTWF0aC5jb3ModGhpcy5yKTtcbiAgICAgICAgZHkgPSBNYXRoLnNpbih0aGlzLnIpO1xuXG4gICAgICAgIHN3aXRjaCAod2hpY2gpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB4ID0gLXRoaXMudyAvIDI7XG4gICAgICAgICAgICAgICAgeSA9IC10aGlzLmggLyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHggPSB0aGlzLncgLyAyO1xuICAgICAgICAgICAgICAgIHkgPSAtdGhpcy5oIC8gMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB4ID0gdGhpcy53IC8gMjtcbiAgICAgICAgICAgICAgICB5ID0gdGhpcy5oIC8gMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICB4ID0gLXRoaXMudyAvIDI7XG4gICAgICAgICAgICAgICAgeSA9IHRoaXMuaCAvIDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgeCA9IHRoaXMueDtcbiAgICAgICAgICAgICAgICB5ID0gdGhpcy55O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHh4ICwgeXk7XG4gICAgICAgIHh4ID0geCAqIGR4ICsgeSAqIC1keTtcbiAgICAgICAgeXkgPSB4ICogZHkgKyB5ICogZHg7XG5cbiAgICAgICAgdmFyIGRldGFpbHMgPSB0aGlzLmFzUG9sYXIodGhpcy52ZWN0b3IoeHgsIHl5KSk7XG5cbiAgICAgICAgeHggKz0gdGhpcy54O1xuICAgICAgICB5eSArPSB0aGlzLnk7XG5cbiAgICAgICAgdmVsb2NpdHlBID0gdGhpcy5wb2xhcihkZXRhaWxzLm1hZyAqIHRoaXMuZHIsIGRldGFpbHMuZGlyICsgdGhpcy5QSTkwKTtcbiAgICAgICAgdmVsb2NpdHlUID0gdGhpcy52ZWN0b3JBZGQodmVsb2NpdHkgPSB0aGlzLnZlY3Rvcih0aGlzLmR4LCB0aGlzLmR5KSwgdmVsb2NpdHlBKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmVsb2NpdHk6IHZlbG9jaXR5LFxuICAgICAgICAgICAgdmVsb2NpdHlUOiB2ZWxvY2l0eVQsXG4gICAgICAgICAgICB2ZWxvY2l0eUEgOiB2ZWxvY2l0eUEsXG4gICAgICAgICAgICBwb3M6IHRoaXMudmVjdG9yKHh4LCB5eSksXG4gICAgICAgICAgICByYWRpdXM6IGRldGFpbHMubWFnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwb2xhcihtYWcgPSAxLCBkaXIgPSAwKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlUG9sYXIoe2RpcjogZGlyLCBtYWc6IG1hZ30pXG4gICAgfVxuXG4gICAgdmVjdG9yKHggPSAxLCB5ID0gMCkge1xuICAgICAgICByZXR1cm4geyB4OiB4LCB5OiB5fTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZVBvbGFyKHZlYykge1xuICAgICAgICBpZiAodGhpcy5pc1BvbGFyKHZlYykpIHtcbiAgICAgICAgICAgIGlmKHZlYy5tYWcgPCAwKXtcbiAgICAgICAgICAgICAgICB2ZWMubWFnID0gLXZlYy5tYWc7XG4gICAgICAgICAgICAgICAgdmVjLmRpciArPSB0aGlzLlBJO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2ZWM7XG4gICAgfVxuXG4gICAgcG9sYXJUb0NhcnQocFZlYywgcmV0ViA9IHt4OiAwLCB5OiAwfSl7XG4gICAgICAgIHJldFYueCA9IE1hdGguY29zKHBWZWMuZGlyKSAqIHBWZWMubWFnO1xuICAgICAgICByZXRWLnkgPSBNYXRoLnNpbihwVmVjLmRpcikgKiBwVmVjLm1hZztcbiAgICAgICAgcmV0dXJuIHJldFZcbiAgICB9XG5cbiAgICBhc1BvbGFyKHZlYykge1xuICAgICAgICBpZiAodGhpcy5pc0NhcnQodmVjKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FydFRvUG9sYXIodmVjKVxuICAgICAgICB9XG4gICAgICAgIGlmICh2ZWMubWFnIDwgMCkge1xuICAgICAgICAgICAgdmVjLm1hZyA9IC12ZWMubWFnO1xuICAgICAgICAgICAgdmVjLmRpciArPSB0aGlzLlBJO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGRpcjogdmVjLmRpciwgbWFnOiB2ZWMubWFnfTtcbiAgICB9XG5cbiAgICBpc0NhcnQodmVjKSB7IGlmKHZlYy54ICE9PSB1bmRlZmluZWQgJiYgdmVjLnkgIT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdHJ1ZTsgfSByZXR1cm4gZmFsc2U7IH1cbiAgICBpc1BvbGFyKHZlYykgeyBpZih2ZWMubWFnICE9PSB1bmRlZmluZWQgJiYgdmVjLmRpciAhPT0gdW5kZWZpbmVkKSB7IHJldHVybiB0cnVlOyB9IHJldHVybiBmYWxzZTsgfVxuICAgIGFzQ2FydCh2ZWMpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNQb2xhcih2ZWMpKSB7cmV0dXJuIHRoaXMucG9sYXJUb0NhcnQodmVjKX1cbiAgICAgICAgcmV0dXJuIHt4OiB2ZWMueCwgeTogdmVjLnl9XG4gICAgfVxuICAgIGNhcnRUb1BvbGFyKHZlYywgcmV0ViA9IHtkaXI6IDAsIG1hZzogMH0pIHtcbiAgICAgICAgcmV0Vi5kaXIgPSBNYXRoLmF0YW4yKHZlYy55LCB2ZWMueCk7XG4gICAgICAgIHJldFYubWFnID0gTWF0aC5oeXBvdCh2ZWMueCwgdmVjLnkpO1xuICAgICAgICByZXR1cm4gcmV0VjtcbiAgICB9XG5cbiAgICB2ZWN0b3JBZGQodmVjMSwgdmVjMikge1xuICAgICAgICB2YXIgdjEgPSB0aGlzLmFzQ2FydCh2ZWMxKTtcbiAgICAgICAgdmFyIHYyID0gdGhpcy5hc0NhcnQodmVjMik7XG4gICAgICAgIHJldHVybiB0aGlzLnZlY3Rvcih2MS54ICsgdjIueCwgdjEueSArIHYyLnkpXG4gICAgfVxuXG4gICAgYXBwbHlGb3JjZShmb3JjZSwgbG9jKSB7XG4gICAgICAgIHRoaXMudmFsaWRhdGVQb2xhcihmb3JjZSk7XG4gICAgICAgIHZhciBsID0gdGhpcy5hc0NhcnQobG9jKTtcbiAgICAgICAgdmFyIHRvQ2VudGVyID0gdGhpcy5hc1BvbGFyKHRoaXMudmVjdG9yKHRoaXMueCAtIGwueCwgdGhpcy55IC0gbC55KSk7XG4gICAgICAgIHZhciBwaGV0YSA9IHRvQ2VudGVyLmRpciAtIGZvcmNlLmRpcjtcbiAgICAgICAgdmFyIEZ2ID0gTWF0aC5jb3MocGhldGEpICogZm9yY2UubWFnO1xuICAgICAgICB2YXIgRmEgPSBNYXRoLnNpbihwaGV0YSkgKiBmb3JjZS5tYWc7XG4gICAgICAgIHZhciBhY2NlbCA9IHRoaXMuYXNQb2xhcih0b0NlbnRlcik7XG4gICAgICAgIGFjY2VsLm1hZyA9IEZ2IC8gdGhpcy5tYXNzOyBcbiAgICAgICAgdmFyIGRlbHRhViA9IHRoaXMuYXNDYXJ0KGFjY2VsKTsgXG4gICAgICAgIHRoaXMuZHggKz0gZGVsdGFWLnggXG4gICAgICAgIHRoaXMuZHkgKz0gZGVsdGFWLnlcbiAgICAgICAgdmFyIGFjY2VsQSA9IEZhIC8gKHRvQ2VudGVyLm1hZyAgKiB0aGlzLm1hc3MpOyBcbiAgICAgICAgdGhpcy5kciArPSBhY2NlbEE7XG4gICAgfVxuXG4gICAgdmVjdG9yQ29tcG9uZW50c0ZvckRpcih2ZWMsIGRpcikge1xuICAgICAgICB2YXIgdiA9IHRoaXMuYXNQb2xhcih2ZWMpOyBcbiAgICAgICAgdmFyIHBoZXRhID0gdi5kaXIgLSBkaXI7XG4gICAgICAgIHZhciBGdiA9IE1hdGguY29zKHBoZXRhKSAqIHYubWFnO1xuICAgICAgICB2YXIgRmEgPSBNYXRoLnNpbihwaGV0YSkgKiB2Lm1hZztcblxuICAgICAgICB2YXIgZDEgPSBkaXI7XG4gICAgICAgIHZhciBkMiA9IGRpciArIHRoaXMuUEk5MDsgICAgXG4gICAgICAgIGlmKEZ2IDwgMCl7XG4gICAgICAgICAgICBkMSArPSB0aGlzLlBJO1xuICAgICAgICAgICAgRnYgPSAtRnY7XG4gICAgICAgIH1cblxuICAgICAgICBpZihGYSA8IDApe1xuICAgICAgICAgICAgZDIgKz0gdGhpcy5QSTtcbiAgICAgICAgICAgIEZhID0gLUZhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbG9uZyA6IHRoaXMucG9sYXIoRnYsZDEpLFxuICAgICAgICAgICAgdGFuZ2VudCA6IHRoaXMucG9sYXIoRmEsZDIpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZG9Db2xsaXNpb24ocG9pbnREZXRhaWxzLCB3YWxsSW5kZXgpIHtcbiAgICAgICAgdmFyIHZ2ID0gdGhpcy5hc1BvbGFyKHBvaW50RGV0YWlscy52ZWxvY2l0eSk7IFxuICAgICAgICB2YXIgdmEgPSB0aGlzLmFzUG9sYXIocG9pbnREZXRhaWxzLnZlbG9jaXR5QSk7IFxuICAgICAgICB2YXIgdnZjID0gdGhpcy52ZWN0b3JDb21wb25lbnRzRm9yRGlyKHZ2LCB0aGlzLldBTExfTk9STVNbd2FsbEluZGV4XSk7XG4gICAgICAgIHZhciB2YWMgPSB0aGlzLnZlY3RvckNvbXBvbmVudHNGb3JEaXIodmEsIHRoaXMuV0FMTF9OT1JNU1t3YWxsSW5kZXhdKTtcblxuICAgICAgICB2dmMuYWxvbmcubWFnICo9IDEuMTg7IFxuICAgICAgICB2YWMuYWxvbmcubWFnICo9IDEuMTg7IFxuXG4gICAgICAgIHZ2Yy5hbG9uZy5tYWcgKj0gdGhpcy5tYXNzO1xuICAgICAgICB2YWMuYWxvbmcubWFnICo9IHRoaXMubWFzcztcblxuICAgICAgICB2dmMuYWxvbmcuZGlyICs9IHRoaXMuUEk7XG4gICAgICAgIHZhYy5hbG9uZy5kaXIgKz0gdGhpcy5QSTtcblxuICAgICAgICB2dmMudGFuZ2VudC5tYWcgKj0gMC4xODsgIFxuICAgICAgICB2YWMudGFuZ2VudC5tYWcgKj0gMC4xODtcbiAgICAgICAgdnZjLnRhbmdlbnQubWFnICo9IHRoaXMubWFzcyAgXG4gICAgICAgIHZhYy50YW5nZW50Lm1hZyAqPSB0aGlzLm1hc3NcbiAgICAgICAgdnZjLnRhbmdlbnQuZGlyICs9IHRoaXMuUEk7IFxuICAgICAgICB2YWMudGFuZ2VudC5kaXIgKz0gdGhpcy5QSTtcblxuICAgICAgICB0aGlzLmFwcGx5Rm9yY2UodnZjLmFsb25nLCBwb2ludERldGFpbHMucG9zKSAgICBcbiAgICAgICAgdGhpcy5hcHBseUZvcmNlKHZ2Yy50YW5nZW50LCBwb2ludERldGFpbHMucG9zKSAgICBcbiAgICAgICAgdGhpcy5hcHBseUZvcmNlKHZhYy5hbG9uZywgcG9pbnREZXRhaWxzLnBvcykgICAgXG4gICAgICAgIHRoaXMuYXBwbHlGb3JjZSh2YWMudGFuZ2VudCwgcG9pbnREZXRhaWxzLnBvcykgICAgXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCbG9jayIsImNsYXNzIENhbnZhcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSAxNDAwO1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSA3NTA7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIH1cbiAgICBjcmVhdGVDYW52YXMoKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKHRoaXMuY2FudmFzKTtcbiAgICAgICAgdGhpcy5jYW52YXMuY2xhc3NMaXN0LmFkZChcIm1haW4tY2FudmFzXCIpXG4gICAgfVxuXG4gICAgY2xlYXJDYW52YXMoKSB7XG4gICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhbnZhcztcbiIsImNsYXNzIFBpZyB7XG4gICAgY29uc3RydWN0b3IoY3R4LCB4LCB5LCB2ZWxYID0gMCwgdmVsWSA9IDAsIHJhZGl1cyA9IDE1LCBjb2xvciA9IFwiT1JBTkdFXCIpIHtcbiAgICAgICAgdGhpcy5fY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLnZlbFggPSB2ZWxYO1xuICAgICAgICB0aGlzLnZlbFkgPSB2ZWxZO1xuICAgICAgICB0aGlzLl9yYWRpdXMgPSByYWRpdXM7XG4gICAgICAgIHRoaXMuX21hc3MgPSAyO1xuICAgICAgICB0aGlzLl9jb2xvciA9IGNvbG9yO1xuXG4gICAgICAgIHRoaXMuX2dyYXZpdHkgPSB7IHg6IDAsIHk6IDAuMSB9O1xuICAgICAgICB0aGlzLl9ncm91bmQgPSB0aGlzLl9jdHguY2FudmFzLmhlaWdodCAtIDIwO1xuICAgICAgICB0aGlzLl9ib3VuY2UgPSAwLjQ7XG4gICAgICAgIHRoaXMuX2ZyaWN0aW9uWCA9IDAuOTtcbiAgICAgICAgdGhpcy5fbWFzcyA9IDI7XG4gICAgICAgIHRoaXMucGlnID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMucGlnLnNyYyA9IFwic3JjL2ltYWdlcy9wZXBwYS5wbmdcIlxuICAgIH1cblxuICAgIGRyYXdQaWcoY3R4KSB7XG4gICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5fcmFkaXVzLCAwLCAoTWF0aC5QSSAqIDIpLCBmYWxzZSk7XG4gICAgICAgIGN0eC5jbGlwKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLnBpZywgdGhpcy54IC0gdGhpcy5fcmFkaXVzLCB0aGlzLnkgLSB0aGlzLl9yYWRpdXMsIHRoaXMuX3JhZGl1cyAqIDIsIHRoaXMuX3JhZGl1cyAqIDIpO1xuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgICAvLyBjdHguZmlsbFN0eWxlID0gdGhpcy5fY29sb3I7XG4gICAgICAgIC8vIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgLy8gY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5fcmFkaXVzLCAwLCAoTWF0aC5QSSAqIDIpLCBmYWxzZSk7XG4gICAgICAgIC8vIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgLy8gY3R4LmZpbGwoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVQaWcoKSB7XG4gICAgICAgIHRoaXMudmVsWCArPSB0aGlzLl9ncmF2aXR5Lng7XG4gICAgICAgIHRoaXMudmVsWSArPSB0aGlzLl9ncmF2aXR5Lnk7XG4gICAgICAgIHRoaXMueCArPSB0aGlzLnZlbFg7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLnZlbFk7XG5cbiAgICAgICAgaWYgKHRoaXMueSA+PSB0aGlzLl9ncm91bmQpIHtcbiAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuX2dyb3VuZCAtICh0aGlzLnkgLSB0aGlzLl9ncm91bmQpO1xuICAgICAgICAgICAgdGhpcy52ZWxZID0gLU1hdGguYWJzKHRoaXMudmVsWSkgKiB0aGlzLl9ib3VuY2U7XG4gICAgICAgICAgICBpZiAodGhpcy52ZWxZID49IHRoaXMuX2dyYXZpdHkueSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVsWSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5fZ3JvdW5kIC0gdGhpcy5fZ3Jhdml0eS55O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudmVsWCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlbFggLT0gdGhpcy5fZnJpY3Rpb25YO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudmVsWCA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlbFggKz0gdGhpcy5fZnJpY3Rpb25YO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHN0b3BzIGJhbGwgZnJvbSBib3VuY2luZyBpbiBZIGF4aXNcbiAgICAgICAgaWYgKHRoaXMudmVsWTwwICYmIHRoaXMudmVsWT4tMi4xKSB7XG4gICAgICAgICAgICB0aGlzLnZlbFkgPSAwO1xuICAgICAgICB9XG4gICAgICAgIC8vIHN0b3BzIGJhbGwgZnJvbSBtb3Zpbmcgb24gWCBheGlzIGlmIHgtdmVsb2NpdHkgPCAxLjFcbiAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMudmVsWCkgPCAxLjEpIHtcbiAgICAgICAgICAgIHRoaXMudmVsWCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbmltYXRlKGN0eCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVBpZygpO1xuICAgICAgICB0aGlzLmRyYXdQaWcoY3R4KTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUGlnOyIsImltcG9ydCBCaXJkIGZyb20gXCIuL2JpcmRcIjtcblxuY2xhc3MgUHJvamVjdGlsZSB7XG4gICAgY29uc3RydWN0b3IoY3R4KSB7XG4gICAgICAgIHRoaXMuX2N0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5jb250ID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5sYXVuY2ggPSB0aGlzLmxhdW5jaC5iaW5kKHRoaXMpXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gTWF0aC5yYW5kb20oKSo3MDArMjA7XG4gICAgICAgIHRoaXMuYmlyZE9iamVjdHMgPSBbXTtcbiAgICAgICAgdGhpcy5tYXggPSAxO1xuICAgICAgICB0aGlzLmN1cnJlbnRCaXJkO1xuICAgIH1cblxuICAgIGxhdW5jaChhbmdsZVZhbCwgbWFnVmFsKSB7XG4gICAgICAgIGxldCBhbmdsZSA9IE1hdGguUEkqIGFuZ2xlVmFsIC8xODA7XG4gICAgICAgIGxldCBtYWduaXR1ZGUgPSBtYWdWYWw7XG5cbiAgICAgICAgY29uc3Qgb2JqTGF1bmNoID0gbmV3IE9iamVjdExhdW5jaCh0aGlzLl9jdHgsIDEyNSwgNjUwLCBuZXcgQmlyZCh0aGlzLl9jdHgpKTtcbiAgICAgICAgdGhpcy5iaXJkT2JqZWN0cy5wdXNoKG9iakxhdW5jaCk7XG4gICAgICAgIG9iakxhdW5jaC52ZWxZID0tIG1hZ25pdHVkZSAqIE1hdGguc2luKGFuZ2xlKTtcbiAgICAgICAgb2JqTGF1bmNoLnZlbFggPSBtYWduaXR1ZGUgKiBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgIG9iakxhdW5jaC50cmFuc2ZlciA9IDAuODtcbiAgICB9XG5cbiAgICBsYXVuY2hMb29wKGN0eCwgcGlncywgYmxvY2tzKSB7XG4gICAgICAgIGlmICh0aGlzLmJpcmRPYmplY3RzLmxlbmd0aCA+IHRoaXMubWF4KSB7XG4gICAgICAgICAgICB0aGlzLmJpcmRPYmplY3RzWzBdLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy5iaXJkT2JqZWN0cyA9IHRoaXMuYmlyZE9iamVjdHMuc3BsaWNlKDEpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNvbnQpIHtcbiAgICAgICAgICAgIHRoaXMubGF1bmNoKClcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYmlyZE9iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50QmlyZCA9IHRoaXMuYmlyZE9iamVjdHNbaV1cbiAgICAgICAgICAgIC8vIGlmICh0aGlzLmN1cnJlbnRCaXJkLl95ICsgdGhpcy5jdXJyZW50QmlyZC50eXBlLnJhZGl1cyA+PSA3MDApIHtcbiAgICAgICAgICAgIC8vICAgICBpZiAodGhpcy5ib3VuY2UpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5jdXJyZW50QmlyZC52ZWxZICo9IHRoaXMuY3VycmVudEJpcmQudHJhbnNmZXI7XG4gICAgICAgICAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5jdXJyZW50QmlyZC52ZWxYID0gMDtcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5jdXJyZW50QmlyZC52ZWxZID0gMDtcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICBjdXJyZW50QmlyZC52ZWxZICs9IDEuNTM7XG4gICAgICAgICAgICBjdXJyZW50QmlyZC5feCArPSBjdXJyZW50QmlyZC52ZWxYIC8gMztcbiAgICAgICAgICAgIGN1cnJlbnRCaXJkLl95ICs9IGN1cnJlbnRCaXJkLnZlbFkgLyAzO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRCaXJkLl95ICsgY3VycmVudEJpcmQudHlwZS5yYWRpdXMgPiA3MDApIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50QmlyZC5feSA9IDcwMCAtIGN1cnJlbnRCaXJkLnR5cGUucmFkaXVzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VycmVudEJpcmQudXBkYXRlT2JqZWN0KHBpZ3MsIGJsb2NrcylcbiAgICAgICAgICAgIGN1cnJlbnRCaXJkLmRyYXdPYmplY3RMYXVuY2godGhpcy5fY3R4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFuaW1hdGUoY3R4LCBwaWdzLCBibG9ja3MpIHtcbiAgICAgICAgdGhpcy5sYXVuY2hMb29wKGN0eCwgcGlncywgYmxvY2tzKTtcbiAgICB9XG59XG5cbmNsYXNzIE9iamVjdExhdW5jaCB7XG4gICAgY29uc3RydWN0b3IoY3R4LCB4ID0gNTAsIHkgPSA1MCwgdHlwZSkge1xuICAgICAgICB0aGlzLl9jdHggPSBjdHg7XG4gICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgdGhpcy52ZWxYID0gMDtcbiAgICAgICAgdGhpcy52ZWxZID0gMDtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy50cmFuc2ZlciA9IDAuOTtcbiAgICAgICAgdGhpcy5yZW1vdmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2dyYXZpdHkgPSB7IHg6IDAsIHk6IDAuMSB9O1xuICAgICAgICB0aGlzLl9ncm91bmQgPSB0aGlzLl9jdHguY2FudmFzLmhlaWdodCAtIDIwO1xuICAgICAgICB0aGlzLl9ib3VuY2UgPSAwLjU7XG4gICAgICAgIHRoaXMuX2ZyaWN0aW9uWCA9IDAuOTtcbiAgICAgICAgdGhpcy5fbWFzcyA9IDI7XG4gICAgICAgIHRoaXMucmFkaXVzID0gMTQ7XG4gICAgICAgIC8vIHRoaXMuYmlyZCA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAvLyB0aGlzLmJpcmQuc3JjID0gXCIvc3JjL2ltYWdlcy9iaXJkLnBuZ1wiXG4gICAgfVxuXG4gICAgcmVtb3ZlKCkge1xuICAgICAgICB0aGlzLnJlbW92ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGRyYXdPYmplY3RMYXVuY2goY3R4KSB7XG4gICAgICAgIHRoaXMudHlwZS5kcmF3QmlyZChjdHgsIHRoaXMuX3gsIHRoaXMuX3kpXG4gICAgfVxuXG4gICAgY2hlY2tCaXJkT25QaWdDb2xsaXNpb24ocGlncykge1xuICAgICAgICBpZiAocGlncykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwaWdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ggKyB0aGlzLnR5cGUuX3JhZGl1cyArIHBpZ3NbaV0uX3JhZGl1cyA+IHBpZ3NbaV0ueFxuICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLl94IDwgcGlnc1tpXS54ICsgdGhpcy50eXBlLl9yYWRpdXMgKyBwaWdzW2ldLl9yYWRpdXNcbiAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5feSArIHRoaXMudHlwZS5fcmFkaXVzICsgcGlnc1tpXS5fcmFkaXVzID4gcGlnc1tpXS55XG4gICAgICAgICAgICAgICAgICAgICYmIHRoaXMuX3kgPCBwaWdzW2ldLnkgKyB0aGlzLnR5cGUuX3JhZGl1cyArIHBpZ3NbaV0uX3JhZGl1cykgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAvLyBweXRoYWdvcmVhbSB0aGVvcmVtIHRvIGJlIG1vcmUgZXhhY3Qgb24gY29sbGlzaW9uXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IE1hdGguc3FydChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKCh0aGlzLl94IC0gcGlnc1tpXS54KSAqICh0aGlzLl94IC0gcGlnc1tpXS54KSlcbiAgICAgICAgICAgICAgICAgICAgICAgICsgKCh0aGlzLl95IC0gcGlnc1tpXS55KSAqICh0aGlzLl95IC0gcGlnc1tpXS55KSlcbiAgICAgICAgICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8IHRoaXMudHlwZS5fcmFkaXVzICsgcGlnc1tpXS5fcmFkaXVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJpcmRPblBpZ0NvbGxpc2lvbkxvZ2ljKHBpZ3NbaV0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja0JpcmRPbkJsb2NrQ29sbGlzaW9uKGJsb2Nrcykge1xuICAgICAgICBpZiAoYmxvY2tzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJsb2Nrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgNDsgaisrKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2lyY2xlQ2VudGVyID0gW3RoaXMuX3gsIHRoaXMuX3ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaiArIDEgPT09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrQmlyZEludGVyY2VwdEJsb2NrKGJsb2Nrc1tpXS5nZXRQb2ludChqKSwgYmxvY2tzW2ldLmdldFBvaW50KDApLCBjaXJjbGVDZW50ZXIsIHRoaXMucmFkaXVzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmlyZE9uQmxvY2tDb2xsaXNpb25Mb2dpYyhibG9ja3NbaV0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGVja0JpcmRJbnRlcmNlcHRCbG9jayhibG9ja3NbaV0uZ2V0UG9pbnQoaiksIGJsb2Nrc1tpXS5nZXRQb2ludChqICsgMSksIGNpcmNsZUNlbnRlciwgdGhpcy5yYWRpdXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iaXJkT25CbG9ja0NvbGxpc2lvbkxvZ2ljKGJsb2Nrc1tpXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBpZiAoY2hlY2tCaXJkSW50ZXJjZXB0QmxvY2soYmxvY2tzW2ldKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpcmRPblBpZ0NvbGxpc2lvbkxvZ2ljKHBpZykge1xuICAgICAgICBjb25zdCBtYXNzMSA9IHRoaXMudHlwZS5fcmFkaXVzO1xuICAgICAgICBjb25zdCBtYXNzMiA9IHBpZy5fcmFkaXVzO1xuICAgICAgICBpZiAocGlnLnZlbFggPT09IDApIHBpZy52ZWxYID0gOTtcbiAgICAgICAgLy8gaWYgKHBpZy52ZWxZID09PSAwKSBwaWcudmVsWSA9IDY7XG4gICAgICAgIC8vIGNvbnN0IHBpZ1ZlbFggPSBwaWcudmVsWDtcbiAgICAgICAgLy8gY29uc3QgcGlnVmVsWSA9IHBpZy52ZWxZO1xuXG4gICAgICAgIHRoaXMudmVsWCA9IC10aGlzLnZlbFg7XG4gICAgICAgIHRoaXMudmVsWSA9IC10aGlzLnZlbFk7XG5cbiAgICAgICAgcGlnLnZlbFggPSAtcGlnLnZlbFg7XG4gICAgICAgIHBpZy52ZWxZID0gLXBpZy52ZWxZO1xuICAgICAgICBcbiAgICAgICAgLy8gdGhpcy52ZWxYID0gKCB0aGlzLnZlbFggKiAobWFzczEgLSBtYXNzMikgKyAoMiAqIG1hc3MyICogcGlnVmVsWCkpIC8gKG1hc3MxICsgbWFzczIpO1xuICAgICAgICAvLyB0aGlzLnZlbFkgPSAoIHRoaXMudmVsWSAqIChtYXNzMSAtIG1hc3MyKSArICgyICogbWFzczIgKiBwaWdWZWxZKSkgLyAobWFzczEgKyBtYXNzMik7XG4gICAgICAgIC8vIHBpZy52ZWxYID0gKCBwaWdWZWxYICogKG1hc3MyIC0gbWFzczEpICsgKDIgKiBtYXNzMSAqIHRoaXMudmVsWCkpIC8gKG1hc3MxICsgbWFzczIpO1xuICAgICAgICAvLyBwaWcudmVsWSA9ICggcGlnVmVsWSAqIChtYXNzMiAtIG1hc3MxKSArICgyICogbWFzczEgKiB0aGlzLnZlbFkpKSAvIChtYXNzMSArIG1hc3MyKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuX3ggKz0gdGhpcy52ZWxYO1xuICAgICAgICB0aGlzLl95ICs9IHRoaXMudmVsWTtcbiAgICAgICAgcGlnLnggKz0gcGlnLnZlbFg7XG4gICAgICAgIHBpZy55ICs9IHBpZy52ZWxZO1xuICAgIH1cblxuICAgIGJpcmRPbkJsb2NrQ29sbGlzaW9uTG9naWMoYmxvY2spIHtcbiAgICAgICAgdGhpcy52ZWxYID0gLXRoaXMudmVsWDtcbiAgICAgICAgdGhpcy52ZWxZID0gLXRoaXMudmVsWTtcblxuICAgICAgICB0aGlzLl94ICs9IHRoaXMudmVsWDtcbiAgICAgICAgdGhpcy5feSArPSB0aGlzLnZlbFk7XG4gICAgfVxuXG4gICAgY2hlY2tCaXJkSW50ZXJjZXB0QmxvY2socG9pbnRBLCBwb2ludEIsIGNpcmNsZUNlbnRlciwgcmFkaXVzKSB7XG4gICAgICAgIGxldCBkaXN0O1xuICAgICAgICBjb25zdCB2ZWwxWCA9IHBvaW50Qi5wb3MueCAtIHBvaW50QS5wb3MueDtcbiAgICAgICAgY29uc3QgdmVsMVkgPSBwb2ludEIucG9zLnkgLSBwb2ludEEucG9zLnk7XG4gICAgICAgIGNvbnN0IHZlbDJYID0gY2lyY2xlQ2VudGVyWzBdIC0gcG9pbnRBLnBvcy54O1xuICAgICAgICBjb25zdCB2ZWwyWSA9IGNpcmNsZUNlbnRlclsxXSAtIHBvaW50QS5wb3MueTtcbiAgICAgICAgY29uc3QgdW5pdCA9ICh2ZWwyWCAqIHZlbDFYICsgdmVsMlkgKiB2ZWwxWSkgLyAodmVsMVkgKiB2ZWwxWSArIHZlbDFYICogdmVsMVgpO1xuICAgICAgICBpZiAodW5pdCA+PSAwICYmIHVuaXQgPD0gMSl7XG4gICAgICAgICAgICBkaXN0ID0gKHBvaW50QS5wb3MueCAgKyB2ZWwxWCAqIHVuaXQgLSBjaXJjbGVDZW50ZXJbMF0pICoqIDIgKyAocG9pbnRBLnBvcy55ICsgdmVsMVkgKiB1bml0IC0gY2lyY2xlQ2VudGVyWzFdKSAqKiAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGlzdCA9IHVuaXQgPCAwID8gXG4gICAgICAgICAgICAgICAgKHBvaW50QS5wb3MueCAtIGNpcmNsZUNlbnRlclswXSkgKiogMiArIChwb2ludEEucG9zLnkgLSBjaXJjbGVDZW50ZXJbMV0pICoqIDIgOlxuICAgICAgICAgICAgICAgIChwb2ludEIucG9zLnggLSBjaXJjbGVDZW50ZXJbMF0pICoqIDIgKyAocG9pbnRCLnBvcy55IC0gY2lyY2xlQ2VudGVyWzFdKSAqKiAyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkaXN0IDwgcmFkaXVzICogcmFkaXVzO1xuICAgIH1cblxuICAgIHVwZGF0ZU9iamVjdChwaWdzLCBibG9ja3MpIHtcbiAgICAgICAgdGhpcy5jaGVja0JpcmRPblBpZ0NvbGxpc2lvbihwaWdzKVxuICAgICAgICB0aGlzLmNoZWNrQmlyZE9uQmxvY2tDb2xsaXNpb24oYmxvY2tzKVxuICAgICAgICB0aGlzLnZlbFggKz0gdGhpcy5fZ3Jhdml0eS54O1xuICAgICAgICB0aGlzLnZlbFkgKz0gdGhpcy5fZ3Jhdml0eS55O1xuICAgICAgICB0aGlzLl94ICs9IHRoaXMudmVsWDtcbiAgICAgICAgdGhpcy5feSArPSB0aGlzLnZlbFk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3kgPj0gdGhpcy5fZ3JvdW5kKSB7XG4gICAgICAgICAgICB0aGlzLl95ID0gdGhpcy5fZ3JvdW5kIC0gKHRoaXMuX3kgLSB0aGlzLl9ncm91bmQpO1xuICAgICAgICAgICAgdGhpcy52ZWxZID0gLU1hdGguYWJzKHRoaXMudmVsWSkgKiB0aGlzLl9ib3VuY2U7XG4gICAgICAgICAgICBpZiAodGhpcy52ZWxZID49IHRoaXMuX2dyYXZpdHkueSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVsWSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5feSA9IHRoaXMuX2dyb3VuZCAtIHRoaXMuX2dyYXZpdHkueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnZlbFggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWxYIC09IHRoaXMuX2ZyaWN0aW9uWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnZlbFggPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWxYICs9IHRoaXMuX2ZyaWN0aW9uWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBzdG9wcyBiYWxsIGZyb20gYm91bmNpbmcgaW4gWSBheGlzXG4gICAgICAgIGlmICggdGhpcy5feSA+PSB0aGlzLl9ncm91bmQgLSAxMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMudmVsWSA8IDAgJiYgdGhpcy52ZWxZID4gLTEuMSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVsWSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3RvcHMgYmFsbCBmcm9tIG1vdmluZyBvbiBYIGF4aXMgaWYgeC12ZWxvY2l0eSA8IDEuMVxuICAgICAgICBpZiAoTWF0aC5hYnModGhpcy52ZWxYKSA8IDEuMSkge1xuICAgICAgICAgICAgdGhpcy52ZWxYID0gMDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0aWxlOyIsImltcG9ydCBQaWcgZnJvbSBcIi4vcGlnXCI7XG5pbXBvcnQgQmxvY2sgZnJvbSBcIi4vYmxvY2tcIjtcblxuY2xhc3MgU3RhZ2VMb2FkZXIge1xuICAgIGNvbnN0cnVjdG9yKCBudW1iZXJPZlBpZ3MgPSAyLCBwaWdzTG9jYXRpb25BcnJheSA9IFtbNTAwLCA2MDBdLCBbNjAwLCA2MDBdXSwgbnVtYmVyb2ZCbG9ja3MgPSAyLCBibG9ja0xvY2F0aW9uQXJyYXkgPSBbWzM1MCwgNzAwXSwgWzcwMCwgNzAwXV0pIHtcbiAgICAgICAgdGhpcy5udW1iZXJPZlBpZ3MgPSBudW1iZXJPZlBpZ3M7XG4gICAgICAgIHRoaXMucGlnc0xvY2F0aW9uQXJyYXkgPSBwaWdzTG9jYXRpb25BcnJheTtcbiAgICAgICAgdGhpcy5waWdzID0gW107XG5cbiAgICAgICAgdGhpcy5udW1iZXJvZkJsb2NrcyA9IG51bWJlcm9mQmxvY2tzO1xuICAgICAgICB0aGlzLmJsb2NrTG9jYXRpb25BcnJheSA9IGJsb2NrTG9jYXRpb25BcnJheTtcbiAgICAgICAgdGhpcy5ibG9ja3MgPSBbXTtcbiAgICB9XG5cbiAgICBkcmF3UGlncyhjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMucGlncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5waWdzTG9jYXRpb25BcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMucGlncy5wdXNoKG5ldyBQaWcoY3R4LCB0aGlzLnBpZ3NMb2NhdGlvbkFycmF5W2ldWzBdLCB0aGlzLnBpZ3NMb2NhdGlvbkFycmF5W2ldWzFdKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXdCbG9ja3MoY3R4KSB7XG4gICAgICAgIGlmICh0aGlzLmJsb2Nrcy5sZW5ndGggPT09IDApe1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJsb2NrTG9jYXRpb25BcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tzLnB1c2gobmV3IEJsb2NrKGN0eCwgdGhpcy5ibG9ja0xvY2F0aW9uQXJyYXlbaV1bMF0sIHRoaXMuYmxvY2tMb2NhdGlvbkFycmF5W2ldWzFdKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFuaW1hdGUoY3R4KSB7XG4gICAgICAgIHRoaXMuZHJhd1BpZ3MoY3R4KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBpZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucGlnc1tpXS5hbmltYXRlKGN0eCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZHJhd0Jsb2NrcyhjdHgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYmxvY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmJsb2Nrc1tpXS5hbmltYXRlKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0YWdlTG9hZGVyOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vc3R5bGVzL2luZGV4LnNjc3NcIjtcbmltcG9ydCBDYW52YXMgZnJvbSBcIi4vc2NyaXB0cy9jYW52YXNcIjtcbmltcG9ydCBQcm9qZWN0aWxlIGZyb20gXCIuL3NjcmlwdHMvcHJvamVjdGlsZVwiO1xuaW1wb3J0IFN0YWdlTG9hZGVyIGZyb20gXCIuL3NjcmlwdHMvc3RhZ2VMb2FkZXJcIjtcblxuY29uc3QgY3VycmVudFN0YXRlT2JqID0ge1xuICBjdXJyZW50RXhhbXBsZTogbnVsbCxcbiAgY3VycmVudEV2ZW50TGlzdGVuZXJzOiBbXSxcbn07XG5cbmxldCB4LCB5O1xubGV0IGRlbHRhWCwgZGVsdGFZO1xuY29uc3QgY2VudGVyWCA9IDEwNC43MDtcbmNvbnN0IGNlbnRlclkgPSA0NTU7XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FudmFzXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdGFydENhbnZhcyk7XG5cbmZ1bmN0aW9uIHN0YXJ0Q2FudmFzKCkge1xuICAgIHVucmVnaXN0ZXJFdmVudExpc3RlbmVycygpO1xuICAgIGNvbnN0IGNhbnZhcyA9IG5ldyBDYW52YXMoKTtcbiAgICBjYW52YXMuY3JlYXRlQ2FudmFzKCk7XG4gICAgY29uc3QgY2FudmFzT2JqID0gY2FudmFzLmNhbnZhcztcbiAgICBsZXQgY2FudmFzUG9zaXRpb24gPSBjYW52YXNPYmouZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICBjb25zdCBwcm9qZWN0aWxlID0gbmV3IFByb2plY3RpbGUoY2FudmFzLmN0eClcblxuICAgIGNvbnN0IG1vdXNlID0ge1xuICAgICAgeDogY2FudmFzLndpZHRoLzIsXG4gICAgICB5OiBjYW52YXMuaGVpZ2h0LzIsXG4gICAgICBjbGljazogZmFsc2UsXG4gICAgfVxuICAgIFxuICAgIGNhbnZhc09iai5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgICBtb3VzZS54ID0gZS54IC0gY2FudmFzUG9zaXRpb24ubGVmdDtcbiAgICAgIG1vdXNlLnkgPSBlLnkgLSBjYW52YXNQb3NpdGlvbi50b3A7XG5cbiAgICB9KVxuXG4gICAgY2FudmFzT2JqLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBmdW5jdGlvbihlKXtcbiAgICAgIG1vdXNlLnggPSBlLnggLSBjYW52YXNQb3NpdGlvbi5sZWZ0O1xuICAgICAgbW91c2UueSA9IGUueSAtIGNhbnZhc1Bvc2l0aW9uLnRvcDtcblxuICAgICAgZGVsdGFYID0gbW91c2UueCAtIGNlbnRlclg7XG4gICAgICBkZWx0YVkgPSBtb3VzZS55IC0gY2VudGVyWTtcbiAgICAvLyAgIGNvbnNvbGUubG9nKG1vdXNlLngsIG1vdXNlLnkpO1xuICAgIC8vICAgY29uc29sZS5sb2coTWF0aC5hYnMobW91c2UueCAtIDEzMCkpXG4gICAgICBsZXQgdGhldGFSYWRpYW4gPSBNYXRoLmF0YW4yKGRlbHRhWSwgZGVsdGFYKTtcbiAgICAgIGxldCBkZWdyZWVzID0gLSgoTWF0aC5hYnModGhldGFSYWRpYW4gKiAxODAgLyBNYXRoLlBJKSAtIDI3MCkgJSA5MCk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhkZWdyZWVzKVxuICAgICAgcHJvamVjdGlsZS5sYXVuY2goZGVncmVlcyAsIChNYXRoLmFicyhtb3VzZS54IC0gMTMwKSAvIDIpKVxuICAgIH0pXG5cbiAgICBjb25zdCBzdGFnZUxvYWRlciA9IG5ldyBTdGFnZUxvYWRlcigpXG5cbiAgICBsZXQgYW5pbWF0aW5nID0gdHJ1ZTtcblxuICAgIGNvbnN0IGFuaW1hdGlvbiA9ICgpID0+IHtcbiAgICAgICAgY2FudmFzLmNsZWFyQ2FudmFzKCk7XG4gICAgICAgIGlmIChhbmltYXRpbmcpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgaW1nLnNyYyA9IFwic3JjL2ltYWdlcy9waXhpbC1sYXllci1CYWNrZ3JvdW5kLnBuZ1wiO1xuICAgICAgICAgICAgY2FudmFzLmN0eC5kcmF3SW1hZ2UoaW1nLDkwLDU3MCk7XG4gICAgICAgICAgICBzdGFnZUxvYWRlci5hbmltYXRlKGNhbnZhcy5jdHgpXG4gICAgICAgICAgICBwcm9qZWN0aWxlLmFuaW1hdGUoY2FudmFzLmN0eCwgc3RhZ2VMb2FkZXIucGlncywgc3RhZ2VMb2FkZXIuYmxvY2tzKVxuICAgICAgICAgICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsYXVuY2gtYnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwcm9qZWN0aWxlLmxhdW5jaClcblxuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRpb24pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uKTtcblxuICAgIC8vICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZUtleURvd24pO1xuICAgIC8vICAgY3VycmVudFN0YXRlT2JqLmN1cnJlbnRFdmVudExpc3RlbmVycy5wdXNoKFtcbiAgICAvLyAgICAgXCJ3aW5kb3dcIixcbiAgICAvLyAgICAgXCJrZXlkb3duXCIsXG4gICAgLy8gICAgIGhhbmRsZUtleURvd24sXG4gICAgLy8gICBdKTtcblxuICAgIC8vICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlTW91c2VEb3duKTtcbiAgICAvLyAgIGN1cnJlbnRTdGF0ZU9iai5jdXJyZW50RXZlbnRMaXN0ZW5lcnMucHVzaChbXG4gICAgLy8gICAgIFwid2luZG93XCIsXG4gICAgLy8gICAgIFwibW91c2Vkb3duXCIsXG4gICAgLy8gICAgIGhhbmRsZU1vdXNlRG93bixcbiAgICAvLyAgIF0pO1xuXG4gICAgLy8gICBmdW5jdGlvbiBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgLy8gICAgIGlmIChldmVudC53aGljaCA9PT0gMzIpIHtcbiAgICAvLyAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vICAgICAgIHNxdWFyZXMuZm9yRWFjaCgoc3EpID0+IHNxLnJldmVyc2VBbmltYXRpb24oKSk7XG4gICAgLy8gICAgICAgY2FudmFzLnNldENvbG9yKGAjJHtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNjc3NzIxNSkudG9TdHJpbmcoMTYpfWApO1xuICAgIC8vICAgICB9XG4gICAgLy8gICB9XG5cbiAgICAvLyAgIGZ1bmN0aW9uIGhhbmRsZU1vdXNlRG93bihldmVudCkge1xuICAgIC8vICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vICAgICBzcXVhcmVzLnB1c2goXG4gICAgLy8gICAgICAgbmV3IFNxdWFyZShcbiAgICAvLyAgICAgICAgIGNhbnZhcy5jdHgsXG4gICAgLy8gICAgICAgICBjYW52YXMuY29vcmRzLm1hcCgoY28pID0+IGNvICsgMjUpLFxuICAgIC8vICAgICAgICAgY2FudmFzLmZpbGxDb2xvclxuICAgIC8vICAgICAgIClcbiAgICAvLyAgICAgKTtcbiAgICAgICAgLy8gYW5pbWF0aW5nID0gIWFuaW1hdGluZztcbiAgICAvLyAgIH1cbn1cblxuXG5mdW5jdGlvbiB1bnJlZ2lzdGVyRXZlbnRMaXN0ZW5lcnMoKSB7XG4gIHdoaWxlIChjdXJyZW50U3RhdGVPYmouY3VycmVudEV2ZW50TGlzdGVuZXJzLmxlbmd0aCkge1xuICAgIGxldCBbXG4gICAgICBzZWxlY3RvcixcbiAgICAgIGV2ZW50LFxuICAgICAgaGFuZGxlcixcbiAgICBdID0gY3VycmVudFN0YXRlT2JqLmN1cnJlbnRFdmVudExpc3RlbmVycy5wb3AoKTtcbiAgICBpZiAoc2VsZWN0b3IgPT09IFwid2luZG93XCIpIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyKTtcbiAgICAgIGNvbnNvbGUubG9nKGhhbmRsZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2xlYXJEZW1vKCkge1xuICBpZiAoY3VycmVudFN0YXRlT2JqLmN1cnJlbnRFeGFtcGxlID09PSBcIkNBTlZBU0RFTU9cIilcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJjYW52YXNcIikpO1xuICBpZiAoY3VycmVudFN0YXRlT2JqLmN1cnJlbnRFeGFtcGxlID09PSBcIkRPTURFTU9cIikge1xuICAgIFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNhcmRcIildLmZvckVhY2goKGVsZW0pID0+XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsZW0pXG4gICAgKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==