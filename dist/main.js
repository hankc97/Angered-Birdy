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
    this.bird.src = "src/images/bird.png";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYmlyZC5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYmxvY2suanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi8uL3NyYy9zY3JpcHRzL2NhbnZhcy5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvcGlnLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9wcm9qZWN0aWxlLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9zdGFnZUxvYWRlci5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiQmlyZCIsImN0eCIsIngiLCJ5IiwidmVsWCIsInZlbFkiLCJyYWRpdXMiLCJjb2xvciIsIl9jdHgiLCJfcmFkaXVzIiwiX2NvbG9yIiwiX2dyYXZpdHkiLCJfZ3JvdW5kIiwiY2FudmFzIiwiaGVpZ2h0IiwiX2JvdW5jZSIsImJpcmQiLCJJbWFnZSIsInNyYyIsInNhdmUiLCJiZWdpblBhdGgiLCJhcmMiLCJNYXRoIiwiUEkiLCJjbGlwIiwiY2xvc2VQYXRoIiwiZHJhd0ltYWdlIiwicmVzdG9yZSIsImFicyIsImRyYXdCaXJkIiwidXBkYXRlQmlyZCIsIkJsb2NrIiwidyIsImgiLCJyIiwiZHgiLCJkeSIsImRyIiwiSU5TRVQiLCJQSTkwIiwiUEkyIiwiV0FMTF9OT1JNUyIsIm1hc3MiLCJnZXRNYXNzIiwic2V0VHJhbnNmb3JtIiwidXBkYXRlQmxvY2siLCJkcmF3QmxvY2siLCJpIiwicCIsImdldFBvaW50IiwicG9zIiwiZG9Db2xsaXNpb24iLCJ3aWR0aCIsInJvdGF0ZSIsImZpbGxTdHlsZSIsImZpbGxSZWN0Iiwic3Ryb2tlUmVjdCIsIndoaWNoIiwieHgiLCJ5eSIsInZlbG9jaXR5QSIsInZlbG9jaXR5VCIsInZlbG9jaXR5IiwiY29zIiwic2luIiwiZGV0YWlscyIsImFzUG9sYXIiLCJ2ZWN0b3IiLCJwb2xhciIsIm1hZyIsImRpciIsInZlY3RvckFkZCIsInZhbGlkYXRlUG9sYXIiLCJ2ZWMiLCJpc1BvbGFyIiwicFZlYyIsInJldFYiLCJpc0NhcnQiLCJjYXJ0VG9Qb2xhciIsInVuZGVmaW5lZCIsInBvbGFyVG9DYXJ0IiwiYXRhbjIiLCJoeXBvdCIsInZlYzEiLCJ2ZWMyIiwidjEiLCJhc0NhcnQiLCJ2MiIsImZvcmNlIiwibG9jIiwibCIsInRvQ2VudGVyIiwicGhldGEiLCJGdiIsIkZhIiwiYWNjZWwiLCJkZWx0YVYiLCJhY2NlbEEiLCJ2IiwiZDEiLCJkMiIsImFsb25nIiwidGFuZ2VudCIsInBvaW50RGV0YWlscyIsIndhbGxJbmRleCIsInZ2IiwidmEiLCJ2dmMiLCJ2ZWN0b3JDb21wb25lbnRzRm9yRGlyIiwidmFjIiwiYXBwbHlGb3JjZSIsIkNhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJnZXRDb250ZXh0IiwiYm9keSIsImFwcGVuZCIsImNsYXNzTGlzdCIsImFkZCIsImNsZWFyUmVjdCIsIlBpZyIsIl9tYXNzIiwiX2ZyaWN0aW9uWCIsImZpbGwiLCJ1cGRhdGVQaWciLCJkcmF3UGlnIiwiUHJvamVjdGlsZSIsImNvbnQiLCJsYXVuY2giLCJiaW5kIiwidGFyZ2V0IiwicmFuZG9tIiwiYmlyZE9iamVjdHMiLCJtYXgiLCJjdXJyZW50QmlyZCIsImFuZ2xlVmFsIiwibWFnVmFsIiwiYW5nbGUiLCJtYWduaXR1ZGUiLCJvYmpMYXVuY2giLCJPYmplY3RMYXVuY2giLCJwdXNoIiwidHJhbnNmZXIiLCJwaWdzIiwiYmxvY2tzIiwibGVuZ3RoIiwicmVtb3ZlIiwic3BsaWNlIiwiX3giLCJfeSIsInR5cGUiLCJ1cGRhdGVPYmplY3QiLCJkcmF3T2JqZWN0TGF1bmNoIiwibGF1bmNoTG9vcCIsInJlbW92ZWQiLCJkaXN0YW5jZSIsInNxcnQiLCJiaXJkT25QaWdDb2xsaXNpb25Mb2dpYyIsImoiLCJjaXJjbGVDZW50ZXIiLCJjaGVja0JpcmRJbnRlcmNlcHRCbG9jayIsImJpcmRPbkJsb2NrQ29sbGlzaW9uTG9naWMiLCJwaWciLCJtYXNzMSIsIm1hc3MyIiwiYmxvY2siLCJwb2ludEEiLCJwb2ludEIiLCJkaXN0IiwidmVsMVgiLCJ2ZWwxWSIsInZlbDJYIiwidmVsMlkiLCJ1bml0IiwiY2hlY2tCaXJkT25QaWdDb2xsaXNpb24iLCJjaGVja0JpcmRPbkJsb2NrQ29sbGlzaW9uIiwiU3RhZ2VMb2FkZXIiLCJudW1iZXJPZlBpZ3MiLCJwaWdzTG9jYXRpb25BcnJheSIsIm51bWJlcm9mQmxvY2tzIiwiYmxvY2tMb2NhdGlvbkFycmF5IiwiZHJhd1BpZ3MiLCJhbmltYXRlIiwiZHJhd0Jsb2NrcyIsImN1cnJlbnRTdGF0ZU9iaiIsImN1cnJlbnRFeGFtcGxlIiwiY3VycmVudEV2ZW50TGlzdGVuZXJzIiwiZGVsdGFYIiwiZGVsdGFZIiwiY2VudGVyWCIsImNlbnRlclkiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsInN0YXJ0Q2FudmFzIiwidW5yZWdpc3RlckV2ZW50TGlzdGVuZXJzIiwiY3JlYXRlQ2FudmFzIiwiY2FudmFzT2JqIiwiY2FudmFzUG9zaXRpb24iLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJwcm9qZWN0aWxlIiwibW91c2UiLCJjbGljayIsImUiLCJsZWZ0IiwidG9wIiwiY29uc29sZSIsImxvZyIsInRoZXRhUmFkaWFuIiwiZGVncmVlcyIsInN0YWdlTG9hZGVyIiwiYW5pbWF0aW5nIiwiYW5pbWF0aW9uIiwiY2xlYXJDYW52YXMiLCJpbWciLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJwb3AiLCJzZWxlY3RvciIsImV2ZW50IiwiaGFuZGxlciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjbGVhckRlbW8iLCJyZW1vdmVDaGlsZCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZWxlbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBTUEsSTtBQUNGLGdCQUFZQyxHQUFaLEVBQW1GO0FBQUEsUUFBbEVDLENBQWtFLHVFQUE5RCxHQUE4RDtBQUFBLFFBQXpEQyxDQUF5RCx1RUFBckQsR0FBcUQ7QUFBQSxRQUFoREMsSUFBZ0QsdUVBQXpDLENBQXlDO0FBQUEsUUFBdENDLElBQXNDLHVFQUEvQixDQUErQjtBQUFBLFFBQTVCQyxNQUE0Qix1RUFBbkIsRUFBbUI7QUFBQSxRQUFmQyxLQUFlLHVFQUFQLEtBQU87O0FBQUE7O0FBQy9FLFNBQUtDLElBQUwsR0FBWVAsR0FBWjtBQUNBLFNBQUtDLENBQUwsR0FBU0EsQ0FBVDtBQUNBLFNBQUtDLENBQUwsR0FBU0EsQ0FBVDtBQUNBLFNBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtJLE9BQUwsR0FBZUgsTUFBZjtBQUNBLFNBQUtJLE1BQUwsR0FBY0gsS0FBZDtBQUVBLFNBQUtJLFFBQUwsR0FBZ0I7QUFBRVQsT0FBQyxFQUFFLENBQUw7QUFBUUMsT0FBQyxFQUFFO0FBQVgsS0FBaEI7QUFDQSxTQUFLUyxPQUFMLEdBQWUsS0FBS0osSUFBTCxDQUFVSyxNQUFWLENBQWlCQyxNQUFoQztBQUNBLFNBQUtDLE9BQUwsR0FBZSxHQUFmO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLElBQUlDLEtBQUosRUFBWjtBQUNBLFNBQUtELElBQUwsQ0FBVUUsR0FBVixHQUFnQixxQkFBaEI7QUFDSDs7OztXQUVELGtCQUFTakIs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LEdBQXFCO0FBQ25CLE1BQUlwQyxlQUFlLENBQUNDLGNBQWhCLEtBQW1DLFlBQXZDLEVBQ0UzRSxRQUFRLENBQUNLLElBQVQsQ0FBYzBHLFdBQWQsQ0FBMEIvRyxRQUFRLENBQUNpRixhQUFULENBQXVCLFFBQXZCLENBQTFCOztBQUNGLE1BQUlQLGVBQWUsQ0FBQ0MsY0FBaEIsS0FBbUMsU0FBdkMsRUFBa0Q7QUFDaEQsdUJBQUkzRSxRQUFRLENBQUNnSCxnQkFBVCxDQUEwQixPQUExQixDQUFKLEVBQXdDQyxPQUF4QyxDQUFnRCxVQUFDQyxJQUFEO0FBQUEsYUFDOUNsSCxRQUFRLENBQUNLLElBQVQsQ0FBYzBHLFdBQWQsQ0FBMEJHLElBQTFCLENBRDhDO0FBQUEsS0FBaEQ7QUFHRDtBQUNGLEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEJpcmQge1xuICAgIGNvbnN0cnVjdG9yKGN0eCwgeCA9IDEwMCwgeSA9IDEwMCwgdmVsWCA9IDAsIHZlbFkgPSAwLCByYWRpdXMgPSAxNCwgY29sb3IgPSBcIlJFRFwiKSB7XG4gICAgICAgIHRoaXMuX2N0eCA9IGN0eDtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy52ZWxYID0gdmVsWDtcbiAgICAgICAgdGhpcy52ZWxZID0gdmVsWTtcbiAgICAgICAgdGhpcy5fcmFkaXVzID0gcmFkaXVzO1xuICAgICAgICB0aGlzLl9jb2xvciA9IGNvbG9yO1xuXG4gICAgICAgIHRoaXMuX2dyYXZpdHkgPSB7IHg6IDAsIHk6IDAuMSB9O1xuICAgICAgICB0aGlzLl9ncm91bmQgPSB0aGlzLl9jdHguY2FudmFzLmhlaWdodDtcbiAgICAgICAgdGhpcy5fYm91bmNlID0gMS4zO1xuICAgICAgICB0aGlzLmJpcmQgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5iaXJkLnNyYyA9IFwic3JjL2ltYWdlcy9iaXJkLnBuZ1wiXG4gICAgfVxuXG4gICAgZHJhd0JpcmQoY3R4LCB4LCB5KSB7XG4gICAgICAgIC8vIGN0eC5kcmF3SW1hZ2UodGhpcy5iaXJkLCAwLCAwLCAxMCwgMTAsIHgsIHksIDEwLCAxMClcbiAgICAgICAgLy8gY3R4LmZpbGxTdHlsZSA9IHRoaXMuX2NvbG9yO1xuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmMoeCwgeSwgdGhpcy5fcmFkaXVzLCAwLCAoTWF0aC5QSSAqIDIpLCBmYWxzZSk7XG4gICAgICAgIGN0eC5jbGlwKCk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmJpcmQsIHggLSB0aGlzLl9yYWRpdXMsIHkgLSB0aGlzLl9yYWRpdXMsIHRoaXMuX3JhZGl1cyAqIDIsIHRoaXMuX3JhZGl1cyAqIDIpXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgIC8vIGN0eC5maWxsKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlQmlyZCgpIHtcbiAgICAgICAgdGhpcy52ZWxYICs9IHRoaXMuX2dyYXZpdHkueDtcbiAgICAgICAgdGhpcy52ZWxZICs9IHRoaXMuX2dyYXZpdHkueTtcbiAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsWDtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMudmVsWTtcblxuICAgICAgICBpZiAodGhpcy55ID49IHRoaXMuX2dyb3VuZCkge1xuICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5fZ3JvdW5kIC0gKHRoaXMueSAtIHRoaXMuX2dyb3VuZCk7XG4gICAgICAgICAgICB0aGlzLnZlbFkgPSAtTWF0aC5hYnModGhpcy52ZWxZKSAqIHRoaXMuX2JvdW5jZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnZlbFkgPj0gdGhpcy5fZ3Jhdml0eS55KSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWxZID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLl9ncm91bmQgLSB0aGlzLl9ncmF2aXR5Lnk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbmltYXRlKGN0eCkge1xuICAgICAgICB0aGlzLmRyYXdCaXJkKGN0eCk7XG4gICAgICAgIHRoaXMudXBkYXRlQmlyZCgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmlyZDsiLCJjbGFzcyBCbG9jayB7XG4gICAgY29uc3RydWN0b3IoY3R4LCB4LCB5LCB3ID0gMzAsIGggPSAxMDApIHtcbiAgICAgICAgdGhpcy5fY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLncgPSB3O1xuICAgICAgICB0aGlzLmggPSBoO1xuICAgICAgICB0aGlzLnIgPSAwLjE7XG4gICAgICAgIHRoaXMuZHggPSAwO1xuICAgICAgICB0aGlzLmR5ID0gMDtcbiAgICAgICAgdGhpcy5kciA9IDA7XG4gICAgICAgIHRoaXMuSU5TRVQgPSAxMDtcbiAgICAgICAgdGhpcy5QSSA9IE1hdGguUEk7XG4gICAgICAgIHRoaXMuUEk5MCA9IE1hdGguUEkgLyAyO1xuICAgICAgICB0aGlzLlBJMiA9IE1hdGguUEkgKiAyO1xuICAgICAgICB0aGlzLldBTExfTk9STVMgPSBbIE1hdGguUEkgLyAyLCBNYXRoLlBJLCAtKE1hdGguUEkgLyAyKSwgMF1cbiAgICAgICAgdGhpcy5fZ3JvdW5kID0gdGhpcy5fY3R4LmNhbnZhcy5oZWlnaHQgLSAxMDU7XG4gICAgICAgIHRoaXMubWFzcyA9IHRoaXMuZ2V0TWFzcygpXG4gICAgfVxuXG4gICAgYW5pbWF0ZShjdHgpIHtcbiAgICAgICAgY3R4LnNhdmUoKVxuICAgICAgICBjdHguc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xuICAgICAgICB0aGlzLnVwZGF0ZUJsb2NrKCk7XG4gICAgICAgIHRoaXMuZHJhd0Jsb2NrKGN0eCk7XG4gICAgICAgIGN0eC5yZXN0b3JlKClcblxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgNDsgaSsrKXtcbiAgICAgICAgICAgIHZhciBwID0gdGhpcy5nZXRQb2ludChpKTtcbiAgICAgICAgICAgIC8vIG9ubHkgZG8gb25lIGNvbGxpc2lvbiBwZXIgZnJhbWUgb3Igd2Ugd2lsbCBlbmQgdXAgYWRkaW5nIGVuZXJneVxuICAgICAgICAgICAgaWYocC5wb3MueCA8IHRoaXMuSU5TRVQpe1xuICAgICAgICAgICAgICAgIHRoaXMueCArPSAodGhpcy5JTlNFVCkgLSBwLnBvcy54O1xuICAgICAgICAgICAgICAgIHRoaXMuZG9Db2xsaXNpb24ocCwzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiggcC5wb3MueCA+IGN0eC5jYW52YXMud2lkdGgtdGhpcy5JTlNFVCl7XG4gICAgICAgICAgICAgICAgdGhpcy54ICs9IChjdHguY2FudmFzLndpZHRoIC0gdGhpcy5JTlNFVCkgLSBwLnBvcy54O1xuICAgICAgICAgICAgICAgIHRoaXMuZG9Db2xsaXNpb24ocCwxKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihwLnBvcy55IDwgdGhpcy5JTlNFVCl7XG4gICAgICAgICAgICAgICAgdGhpcy55ICs9ICh0aGlzLklOU0VUKSAtIHAucG9zLnk7XG4gICAgICAgICAgICAgICAgdGhpcy5kb0NvbGxpc2lvbihwLDApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKCBwLnBvcy55ID4gY3R4LmNhbnZhcy5oZWlnaHQgLSB0aGlzLklOU0VUKXtcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gKGN0eC5jYW52YXMuaGVpZ2h0IC0gdGhpcy5JTlNFVCkgLSBwLnBvcy55O1xuICAgICAgICAgICAgICAgIHRoaXMuZG9Db2xsaXNpb24ocCwyKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TWFzcygpIHtcbiAgICAgICAgcmV0dXJuICggdGhpcy53ICogdGhpcy5oICogdGhpcy5oKSAvIDEwMDA7XG4gICAgfVxuXG4gICAgZHJhd0Jsb2NrKGN0eCkge1xuICAgICAgICBjdHguc2V0VHJhbnNmb3JtKDEsMCwwLDEsdGhpcy54LHRoaXMueSk7XG4gICAgICAgIGN0eC5yb3RhdGUodGhpcy5yKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiQmx1ZVwiO1xuICAgICAgICBjdHguZmlsbFJlY3QoLXRoaXMudy8yLCAtdGhpcy5oLzIsIHRoaXMudywgdGhpcy5oKVxuICAgICAgICBjdHguc3Ryb2tlUmVjdCgtdGhpcy53LzIsIC10aGlzLmgvMiwgdGhpcy53LCB0aGlzLmgpXG4gICAgfVxuXG4gICAgdXBkYXRlQmxvY2soKSB7XG4gICAgICAgIHRoaXMueCArPSB0aGlzLmR4O1xuICAgICAgICB0aGlzLnkgKz0gdGhpcy5keTtcbiAgICAgICAgdGhpcy5keSArPSAwLjA2MTtcbiAgICAgICAgdGhpcy5yICs9IHRoaXMuZHI7XG5cbiAgICAgICAgLy8gaWYgKHRoaXMueSA+PSB0aGlzLl9ncm91bmQpIHtcbiAgICAgICAgLy8gICAgIHRoaXMueSA9IHRoaXMuX2dyb3VuZCBcbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIGdldFBvaW50KHdoaWNoKSB7XG4gICAgICAgIHZhciBkeCwgZHksIHgsIHksIHh4LCB5eSwgdmVsb2NpdHlBLCB2ZWxvY2l0eVQsIHZlbG9jaXR5O1xuXG4gICAgICAgIGR4ID0gTWF0aC5jb3ModGhpcy5yKTtcbiAgICAgICAgZHkgPSBNYXRoLnNpbih0aGlzLnIpO1xuXG4gICAgICAgIHN3aXRjaCAod2hpY2gpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB4ID0gLXRoaXMudyAvIDI7XG4gICAgICAgICAgICAgICAgeSA9IC10aGlzLmggLyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHggPSB0aGlzLncgLyAyO1xuICAgICAgICAgICAgICAgIHkgPSAtdGhpcy5oIC8gMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB4ID0gdGhpcy53IC8gMjtcbiAgICAgICAgICAgICAgICB5ID0gdGhpcy5oIC8gMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICB4ID0gLXRoaXMudyAvIDI7XG4gICAgICAgICAgICAgICAgeSA9IHRoaXMuaCAvIDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgeCA9IHRoaXMueDtcbiAgICAgICAgICAgICAgICB5ID0gdGhpcy55O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHh4ICwgeXk7XG4gICAgICAgIHh4ID0geCAqIGR4ICsgeSAqIC1keTtcbiAgICAgICAgeXkgPSB4ICogZHkgKyB5ICogZHg7XG5cbiAgICAgICAgdmFyIGRldGFpbHMgPSB0aGlzLmFzUG9sYXIodGhpcy52ZWN0b3IoeHgsIHl5KSk7XG5cbiAgICAgICAgeHggKz0gdGhpcy54O1xuICAgICAgICB5eSArPSB0aGlzLnk7XG5cbiAgICAgICAgdmVsb2NpdHlBID0gdGhpcy5wb2xhcihkZXRhaWxzLm1hZyAqIHRoaXMuZHIsIGRldGFpbHMuZGlyICsgdGhpcy5QSTkwKTtcbiAgICAgICAgdmVsb2NpdHlUID0gdGhpcy52ZWN0b3JBZGQodmVsb2NpdHkgPSB0aGlzLnZlY3Rvcih0aGlzLmR4LCB0aGlzLmR5KSwgdmVsb2NpdHlBKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmVsb2NpdHk6IHZlbG9jaXR5LFxuICAgICAgICAgICAgdmVsb2NpdHlUOiB2ZWxvY2l0eVQsXG4gICAgICAgICAgICB2ZWxvY2l0eUEgOiB2ZWxvY2l0eUEsXG4gICAgICAgICAgICBwb3M6IHRoaXMudmVjdG9yKHh4LCB5eSksXG4gICAgICAgICAgICByYWRpdXM6IGRldGFpbHMubWFnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwb2xhcihtYWcgPSAxLCBkaXIgPSAwKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlUG9sYXIoe2RpcjogZGlyLCBtYWc6IG1hZ30pXG4gICAgfVxuXG4gICAgdmVjdG9yKHggPSAxLCB5ID0gMCkge1xuICAgICAgICByZXR1cm4geyB4OiB4LCB5OiB5fTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZVBvbGFyKHZlYykge1xuICAgICAgICBpZiAodGhpcy5pc1BvbGFyKHZlYykpIHtcbiAgICAgICAgICAgIGlmKHZlYy5tYWcgPCAwKXtcbiAgICAgICAgICAgICAgICB2ZWMubWFnID0gLXZlYy5tYWc7XG4gICAgICAgICAgICAgICAgdmVjLmRpciArPSB0aGlzLlBJO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2ZWM7XG4gICAgfVxuXG4gICAgcG9sYXJUb0NhcnQocFZlYywgcmV0ViA9IHt4OiAwLCB5OiAwfSl7XG4gICAgICAgIHJldFYueCA9IE1hdGguY29zKHBWZWMuZGlyKSAqIHBWZWMubWFnO1xuICAgICAgICByZXRWLnkgPSBNYXRoLnNpbihwVmVjLmRpcikgKiBwVmVjLm1hZztcbiAgICAgICAgcmV0dXJuIHJldFZcbiAgICB9XG5cbiAgICBhc1BvbGFyKHZlYykge1xuICAgICAgICBpZiAodGhpcy5pc0NhcnQodmVjKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FydFRvUG9sYXIodmVjKVxuICAgICAgICB9XG4gICAgICAgIGlmICh2ZWMubWFnIDwgMCkge1xuICAgICAgICAgICAgdmVjLm1hZyA9IC12ZWMubWFnO1xuICAgICAgICAgICAgdmVjLmRpciArPSB0aGlzLlBJO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGRpcjogdmVjLmRpciwgbWFnOiB2ZWMubWFnfTtcbiAgICB9XG5cbiAgICBpc0NhcnQodmVjKSB7IGlmKHZlYy54ICE9PSB1bmRlZmluZWQgJiYgdmVjLnkgIT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdHJ1ZTsgfSByZXR1cm4gZmFsc2U7IH1cbiAgICBpc1BvbGFyKHZlYykgeyBpZih2ZWMubWFnICE9PSB1bmRlZmluZWQgJiYgdmVjLmRpciAhPT0gdW5kZWZpbmVkKSB7IHJldHVybiB0cnVlOyB9IHJldHVybiBmYWxzZTsgfVxuICAgIGFzQ2FydCh2ZWMpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNQb2xhcih2ZWMpKSB7cmV0dXJuIHRoaXMucG9sYXJUb0NhcnQodmVjKX1cbiAgICAgICAgcmV0dXJuIHt4OiB2ZWMueCwgeTogdmVjLnl9XG4gICAgfVxuICAgIGNhcnRUb1BvbGFyKHZlYywgcmV0ViA9IHtkaXI6IDAsIG1hZzogMH0pIHtcbiAgICAgICAgcmV0Vi5kaXIgPSBNYXRoLmF0YW4yKHZlYy55LCB2ZWMueCk7XG4gICAgICAgIHJldFYubWFnID0gTWF0aC5oeXBvdCh2ZWMueCwgdmVjLnkpO1xuICAgICAgICByZXR1cm4gcmV0VjtcbiAgICB9XG5cbiAgICB2ZWN0b3JBZGQodmVjMSwgdmVjMikge1xuICAgICAgICB2YXIgdjEgPSB0aGlzLmFzQ2FydCh2ZWMxKTtcbiAgICAgICAgdmFyIHYyID0gdGhpcy5hc0NhcnQodmVjMik7XG4gICAgICAgIHJldHVybiB0aGlzLnZlY3Rvcih2MS54ICsgdjIueCwgdjEueSArIHYyLnkpXG4gICAgfVxuXG4gICAgYXBwbHlGb3JjZShmb3JjZSwgbG9jKSB7XG4gICAgICAgIHRoaXMudmFsaWRhdGVQb2xhcihmb3JjZSk7XG4gICAgICAgIHZhciBsID0gdGhpcy5hc0NhcnQobG9jKTtcbiAgICAgICAgdmFyIHRvQ2VudGVyID0gdGhpcy5hc1BvbGFyKHRoaXMudmVjdG9yKHRoaXMueCAtIGwueCwgdGhpcy55IC0gbC55KSk7XG4gICAgICAgIHZhciBwaGV0YSA9IHRvQ2VudGVyLmRpciAtIGZvcmNlLmRpcjtcbiAgICAgICAgdmFyIEZ2ID0gTWF0aC5jb3MocGhldGEpICogZm9yY2UubWFnO1xuICAgICAgICB2YXIgRmEgPSBNYXRoLnNpbihwaGV0YSkgKiBmb3JjZS5tYWc7XG4gICAgICAgIHZhciBhY2NlbCA9IHRoaXMuYXNQb2xhcih0b0NlbnRlcik7XG4gICAgICAgIGFjY2VsLm1hZyA9IEZ2IC8gdGhpcy5tYXNzOyBcbiAgICAgICAgdmFyIGRlbHRhViA9IHRoaXMuYXNDYXJ0KGFjY2VsKTsgXG4gICAgICAgIHRoaXMuZHggKz0gZGVsdGFWLnggXG4gICAgICAgIHRoaXMuZHkgKz0gZGVsdGFWLnlcbiAgICAgICAgdmFyIGFjY2VsQSA9IEZhIC8gKHRvQ2VudGVyLm1hZyAgKiB0aGlzLm1hc3MpOyBcbiAgICAgICAgdGhpcy5kciArPSBhY2NlbEE7XG4gICAgfVxuXG4gICAgdmVjdG9yQ29tcG9uZW50c0ZvckRpcih2ZWMsIGRpcikge1xuICAgICAgICB2YXIgdiA9IHRoaXMuYXNQb2xhcih2ZWMpOyBcbiAgICAgICAgdmFyIHBoZXRhID0gdi5kaXIgLSBkaXI7XG4gICAgICAgIHZhciBGdiA9IE1hdGguY29zKHBoZXRhKSAqIHYubWFnO1xuICAgICAgICB2YXIgRmEgPSBNYXRoLnNpbihwaGV0YSkgKiB2Lm1hZztcblxuICAgICAgICB2YXIgZDEgPSBkaXI7XG4gICAgICAgIHZhciBkMiA9IGRpciArIHRoaXMuUEk5MDsgICAgXG4gICAgICAgIGlmKEZ2IDwgMCl7XG4gICAgICAgICAgICBkMSArPSB0aGlzLlBJO1xuICAgICAgICAgICAgRnYgPSAtRnY7XG4gICAgICAgIH1cblxuICAgICAgICBpZihGYSA8IDApe1xuICAgICAgICAgICAgZDIgKz0gdGhpcy5QSTtcbiAgICAgICAgICAgIEZhID0gLUZhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbG9uZyA6IHRoaXMucG9sYXIoRnYsZDEpLFxuICAgICAgICAgICAgdGFuZ2VudCA6IHRoaXMucG9sYXIoRmEsZDIpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZG9Db2xsaXNpb24ocG9pbnREZXRhaWxzLCB3YWxsSW5kZXgpIHtcbiAgICAgICAgdmFyIHZ2ID0gdGhpcy5hc1BvbGFyKHBvaW50RGV0YWlscy52ZWxvY2l0eSk7IFxuICAgICAgICB2YXIgdmEgPSB0aGlzLmFzUG9sYXIocG9pbnREZXRhaWxzLnZlbG9jaXR5QSk7IFxuICAgICAgICB2YXIgdnZjID0gdGhpcy52ZWN0b3JDb21wb25lbnRzRm9yRGlyKHZ2LCB0aGlzLldBTExfTk9STVNbd2FsbEluZGV4XSk7XG4gICAgICAgIHZhciB2YWMgPSB0aGlzLnZlY3RvckNvbXBvbmVudHNGb3JEaXIodmEsIHRoaXMuV0FMTF9OT1JNU1t3YWxsSW5kZXhdKTtcblxuICAgICAgICB2dmMuYWxvbmcubWFnICo9IDEuMTg7IFxuICAgICAgICB2YWMuYWxvbmcubWFnICo9IDEuMTg7IFxuXG4gICAgICAgIHZ2Yy5hbG9uZy5tYWcgKj0gdGhpcy5tYXNzO1xuICAgICAgICB2YWMuYWxvbmcubWFnICo9IHRoaXMubWFzcztcblxuICAgICAgICB2dmMuYWxvbmcuZGlyICs9IHRoaXMuUEk7XG4gICAgICAgIHZhYy5hbG9uZy5kaXIgKz0gdGhpcy5QSTtcblxuICAgICAgICB2dmMudGFuZ2VudC5tYWcgKj0gMC4xODsgIFxuICAgICAgICB2YWMudGFuZ2VudC5tYWcgKj0gMC4xODtcbiAgICAgICAgdnZjLnRhbmdlbnQubWFnICo9IHRoaXMubWFzcyAgXG4gICAgICAgIHZhYy50YW5nZW50Lm1hZyAqPSB0aGlzLm1hc3NcbiAgICAgICAgdnZjLnRhbmdlbnQuZGlyICs9IHRoaXMuUEk7IFxuICAgICAgICB2YWMudGFuZ2VudC5kaXIgKz0gdGhpcy5QSTtcblxuICAgICAgICB0aGlzLmFwcGx5Rm9yY2UodnZjLmFsb25nLCBwb2ludERldGFpbHMucG9zKSAgICBcbiAgICAgICAgdGhpcy5hcHBseUZvcmNlKHZ2Yy50YW5nZW50LCBwb2ludERldGFpbHMucG9zKSAgICBcbiAgICAgICAgdGhpcy5hcHBseUZvcmNlKHZhYy5hbG9uZywgcG9pbnREZXRhaWxzLnBvcykgICAgXG4gICAgICAgIHRoaXMuYXBwbHlGb3JjZSh2YWMudGFuZ2VudCwgcG9pbnREZXRhaWxzLnBvcykgICAgXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCbG9jayIsImNsYXNzIENhbnZhcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCAtIDQwMDtcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gdGhpcy5jYW52YXMud2lkdGggLyAyO1xuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB9XG4gICAgY3JlYXRlQ2FudmFzKCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZCh0aGlzLmNhbnZhcyk7XG4gICAgICAgIHRoaXMuY2FudmFzLmNsYXNzTGlzdC5hZGQoXCJtYWluLWNhbnZhc1wiKVxuICAgIH1cblxuICAgIGNsZWFyQ2FudmFzKCkge1xuICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYW52YXM7XG4iLCJjbGFzcyBQaWcge1xuICAgIGNvbnN0cnVjdG9yKGN0eCwgeCwgeSwgdmVsWCA9IDAsIHZlbFkgPSAwLCByYWRpdXMgPSAxNSwgY29sb3IgPSBcIk9SQU5HRVwiKSB7XG4gICAgICAgIHRoaXMuX2N0eCA9IGN0eDtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy52ZWxYID0gdmVsWDtcbiAgICAgICAgdGhpcy52ZWxZID0gdmVsWTtcbiAgICAgICAgdGhpcy5fcmFkaXVzID0gcmFkaXVzO1xuICAgICAgICB0aGlzLl9tYXNzID0gMjtcbiAgICAgICAgdGhpcy5fY29sb3IgPSBjb2xvcjtcblxuICAgICAgICB0aGlzLl9ncmF2aXR5ID0geyB4OiAwLCB5OiAwLjEgfTtcbiAgICAgICAgdGhpcy5fZ3JvdW5kID0gdGhpcy5fY3R4LmNhbnZhcy5oZWlnaHQgLSAyMDtcbiAgICAgICAgdGhpcy5fYm91bmNlID0gMC40O1xuICAgICAgICB0aGlzLl9mcmljdGlvblggPSAwLjk7XG4gICAgICAgIHRoaXMuX21hc3MgPSAyO1xuICAgIH1cblxuICAgIGRyYXdQaWcoY3R4KSB7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLl9jb2xvcjtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLl9yYWRpdXMsIDAsIChNYXRoLlBJICogMiksIGZhbHNlKTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgIH1cblxuICAgIHVwZGF0ZVBpZygpIHtcbiAgICAgICAgdGhpcy52ZWxYICs9IHRoaXMuX2dyYXZpdHkueDtcbiAgICAgICAgdGhpcy52ZWxZICs9IHRoaXMuX2dyYXZpdHkueTtcbiAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsWDtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMudmVsWTtcblxuICAgICAgICBpZiAodGhpcy55ID49IHRoaXMuX2dyb3VuZCkge1xuICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5fZ3JvdW5kIC0gKHRoaXMueSAtIHRoaXMuX2dyb3VuZCk7XG4gICAgICAgICAgICB0aGlzLnZlbFkgPSAtTWF0aC5hYnModGhpcy52ZWxZKSAqIHRoaXMuX2JvdW5jZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnZlbFkgPj0gdGhpcy5fZ3Jhdml0eS55KSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWxZID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLl9ncm91bmQgLSB0aGlzLl9ncmF2aXR5Lnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy52ZWxYID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVsWCAtPSB0aGlzLl9mcmljdGlvblg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy52ZWxYIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVsWCArPSB0aGlzLl9mcmljdGlvblg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3RvcHMgYmFsbCBmcm9tIGJvdW5jaW5nIGluIFkgYXhpc1xuICAgICAgICBpZiAodGhpcy52ZWxZPDAgJiYgdGhpcy52ZWxZPi0yLjEpIHtcbiAgICAgICAgICAgIHRoaXMudmVsWSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc3RvcHMgYmFsbCBmcm9tIG1vdmluZyBvbiBYIGF4aXMgaWYgeC12ZWxvY2l0eSA8IDEuMVxuICAgICAgICBpZiAoTWF0aC5hYnModGhpcy52ZWxYKSA8IDEuMSkge1xuICAgICAgICAgICAgdGhpcy52ZWxYID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFuaW1hdGUoY3R4KSB7XG4gICAgICAgIHRoaXMudXBkYXRlUGlnKCk7XG4gICAgICAgIHRoaXMuZHJhd1BpZyhjdHgpO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQaWc7IiwiaW1wb3J0IEJpcmQgZnJvbSBcIi4vYmlyZFwiO1xuXG5jbGFzcyBQcm9qZWN0aWxlIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgpIHtcbiAgICAgICAgdGhpcy5fY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLmNvbnQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLmxhdW5jaCA9IHRoaXMubGF1bmNoLmJpbmQodGhpcylcbiAgICAgICAgdGhpcy50YXJnZXQgPSBNYXRoLnJhbmRvbSgpKjcwMCsyMDtcbiAgICAgICAgdGhpcy5iaXJkT2JqZWN0cyA9IFtdO1xuICAgICAgICB0aGlzLm1heCA9IDE7XG4gICAgICAgIHRoaXMuY3VycmVudEJpcmQ7XG4gICAgfVxuXG4gICAgbGF1bmNoKGFuZ2xlVmFsLCBtYWdWYWwpIHtcbiAgICAgICAgbGV0IGFuZ2xlID0gTWF0aC5QSSogYW5nbGVWYWwgLzE4MDtcbiAgICAgICAgbGV0IG1hZ25pdHVkZSA9IG1hZ1ZhbDtcblxuICAgICAgICBjb25zdCBvYmpMYXVuY2ggPSBuZXcgT2JqZWN0TGF1bmNoKHRoaXMuX2N0eCwgMTAwLCA2NTAsIG5ldyBCaXJkKHRoaXMuX2N0eCkpO1xuICAgICAgICB0aGlzLmJpcmRPYmplY3RzLnB1c2gob2JqTGF1bmNoKTtcbiAgICAgICAgb2JqTGF1bmNoLnZlbFkgPS0gbWFnbml0dWRlICogTWF0aC5zaW4oYW5nbGUpO1xuICAgICAgICBvYmpMYXVuY2gudmVsWCA9IG1hZ25pdHVkZSAqIE1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgb2JqTGF1bmNoLnRyYW5zZmVyID0gMC44O1xuICAgIH1cblxuICAgIGxhdW5jaExvb3AoY3R4LCBwaWdzLCBibG9ja3MpIHtcbiAgICAgICAgaWYgKHRoaXMuYmlyZE9iamVjdHMubGVuZ3RoID4gdGhpcy5tYXgpIHtcbiAgICAgICAgICAgIHRoaXMuYmlyZE9iamVjdHNbMF0ucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLmJpcmRPYmplY3RzID0gdGhpcy5iaXJkT2JqZWN0cy5zcGxpY2UoMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29udCkge1xuICAgICAgICAgICAgdGhpcy5sYXVuY2goKVxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5iaXJkT2JqZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRCaXJkID0gdGhpcy5iaXJkT2JqZWN0c1tpXVxuICAgICAgICAgICAgLy8gaWYgKHRoaXMuY3VycmVudEJpcmQuX3kgKyB0aGlzLmN1cnJlbnRCaXJkLnR5cGUucmFkaXVzID49IDcwMCkge1xuICAgICAgICAgICAgLy8gICAgIGlmICh0aGlzLmJvdW5jZSkge1xuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmN1cnJlbnRCaXJkLnZlbFkgKj0gdGhpcy5jdXJyZW50QmlyZC50cmFuc2ZlcjtcbiAgICAgICAgICAgIC8vICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmN1cnJlbnRCaXJkLnZlbFggPSAwO1xuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmN1cnJlbnRCaXJkLnZlbFkgPSAwO1xuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIGN1cnJlbnRCaXJkLnZlbFkgKz0gMS41MztcbiAgICAgICAgICAgIGN1cnJlbnRCaXJkLl94ICs9IGN1cnJlbnRCaXJkLnZlbFggLyAzO1xuICAgICAgICAgICAgY3VycmVudEJpcmQuX3kgKz0gY3VycmVudEJpcmQudmVsWSAvIDM7XG4gICAgICAgICAgICBpZiAoY3VycmVudEJpcmQuX3kgKyBjdXJyZW50QmlyZC50eXBlLnJhZGl1cyA+IDcwMCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRCaXJkLl95ID0gNzAwIC0gY3VycmVudEJpcmQudHlwZS5yYWRpdXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50QmlyZC51cGRhdGVPYmplY3QocGlncywgYmxvY2tzKVxuICAgICAgICAgICAgY3VycmVudEJpcmQuZHJhd09iamVjdExhdW5jaCh0aGlzLl9jdHgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYW5pbWF0ZShjdHgsIHBpZ3MsIGJsb2Nrcykge1xuICAgICAgICB0aGlzLmxhdW5jaExvb3AoY3R4LCBwaWdzLCBibG9ja3MpO1xuICAgIH1cbn1cblxuY2xhc3MgT2JqZWN0TGF1bmNoIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgsIHggPSA1MCwgeSA9IDUwLCB0eXBlKSB7XG4gICAgICAgIHRoaXMuX2N0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgIHRoaXMuX3kgPSB5O1xuICAgICAgICB0aGlzLnZlbFggPSAwO1xuICAgICAgICB0aGlzLnZlbFkgPSAwO1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLnRyYW5zZmVyID0gMC45O1xuICAgICAgICB0aGlzLnJlbW92ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZ3Jhdml0eSA9IHsgeDogMCwgeTogMC4xIH07XG4gICAgICAgIHRoaXMuX2dyb3VuZCA9IHRoaXMuX2N0eC5jYW52YXMuaGVpZ2h0IC0gMjA7XG4gICAgICAgIHRoaXMuX2JvdW5jZSA9IDAuNTtcbiAgICAgICAgdGhpcy5fZnJpY3Rpb25YID0gMC45O1xuICAgICAgICB0aGlzLl9tYXNzID0gMjtcbiAgICAgICAgdGhpcy5yYWRpdXMgPSAxNDtcbiAgICAgICAgLy8gdGhpcy5iaXJkID0gbmV3IEltYWdlKCk7XG4gICAgICAgIC8vIHRoaXMuYmlyZC5zcmMgPSBcIi9zcmMvaW1hZ2VzL2JpcmQucG5nXCJcbiAgICB9XG5cbiAgICByZW1vdmUoKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgZHJhd09iamVjdExhdW5jaChjdHgpIHtcbiAgICAgICAgdGhpcy50eXBlLmRyYXdCaXJkKGN0eCwgdGhpcy5feCwgdGhpcy5feSlcbiAgICB9XG5cbiAgICBjaGVja0JpcmRPblBpZ0NvbGxpc2lvbihwaWdzKSB7XG4gICAgICAgIGlmIChwaWdzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBpZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5feCArIHRoaXMudHlwZS5fcmFkaXVzICsgcGlnc1tpXS5fcmFkaXVzID4gcGlnc1tpXS54XG4gICAgICAgICAgICAgICAgICAgICYmIHRoaXMuX3ggPCBwaWdzW2ldLnggKyB0aGlzLnR5cGUuX3JhZGl1cyArIHBpZ3NbaV0uX3JhZGl1c1xuICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLl95ICsgdGhpcy50eXBlLl9yYWRpdXMgKyBwaWdzW2ldLl9yYWRpdXMgPiBwaWdzW2ldLnlcbiAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5feSA8IHBpZ3NbaV0ueSArIHRoaXMudHlwZS5fcmFkaXVzICsgcGlnc1tpXS5fcmFkaXVzKSBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHB5dGhhZ29yZWFtIHRoZW9yZW0gdG8gYmUgbW9yZSBleGFjdCBvbiBjb2xsaXNpb25cbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAoKHRoaXMuX3ggLSBwaWdzW2ldLngpICogKHRoaXMuX3ggLSBwaWdzW2ldLngpKVxuICAgICAgICAgICAgICAgICAgICAgICAgKyAoKHRoaXMuX3kgLSBwaWdzW2ldLnkpICogKHRoaXMuX3kgLSBwaWdzW2ldLnkpKVxuICAgICAgICAgICAgICAgICAgICApXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDwgdGhpcy50eXBlLl9yYWRpdXMgKyBwaWdzW2ldLl9yYWRpdXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmlyZE9uUGlnQ29sbGlzaW9uTG9naWMocGlnc1tpXSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrQmlyZE9uQmxvY2tDb2xsaXNpb24oYmxvY2tzKSB7XG4gICAgICAgIGlmIChibG9ja3MpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmxvY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA0OyBqKyspe1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaXJjbGVDZW50ZXIgPSBbdGhpcy5feCwgdGhpcy5feV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChqICsgMSA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tCaXJkSW50ZXJjZXB0QmxvY2soYmxvY2tzW2ldLmdldFBvaW50KGopLCBibG9ja3NbaV0uZ2V0UG9pbnQoMCksIGNpcmNsZUNlbnRlciwgdGhpcy5yYWRpdXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iaXJkT25CbG9ja0NvbGxpc2lvbkxvZ2ljKGJsb2Nrc1tpXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrQmlyZEludGVyY2VwdEJsb2NrKGJsb2Nrc1tpXS5nZXRQb2ludChqKSwgYmxvY2tzW2ldLmdldFBvaW50KGogKyAxKSwgY2lyY2xlQ2VudGVyLCB0aGlzLnJhZGl1cykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJpcmRPbkJsb2NrQ29sbGlzaW9uTG9naWMoYmxvY2tzW2ldKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGlmIChjaGVja0JpcmRJbnRlcmNlcHRCbG9jayhibG9ja3NbaV0pKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmlyZE9uUGlnQ29sbGlzaW9uTG9naWMocGlnKSB7XG4gICAgICAgIGNvbnN0IG1hc3MxID0gdGhpcy50eXBlLl9yYWRpdXM7XG4gICAgICAgIGNvbnN0IG1hc3MyID0gcGlnLl9yYWRpdXM7XG4gICAgICAgIGlmIChwaWcudmVsWCA9PT0gMCkgcGlnLnZlbFggPSA5O1xuICAgICAgICAvLyBpZiAocGlnLnZlbFkgPT09IDApIHBpZy52ZWxZID0gNjtcbiAgICAgICAgLy8gY29uc3QgcGlnVmVsWCA9IHBpZy52ZWxYO1xuICAgICAgICAvLyBjb25zdCBwaWdWZWxZID0gcGlnLnZlbFk7XG5cbiAgICAgICAgdGhpcy52ZWxYID0gLXRoaXMudmVsWDtcbiAgICAgICAgdGhpcy52ZWxZID0gLXRoaXMudmVsWTtcblxuICAgICAgICBwaWcudmVsWCA9IC1waWcudmVsWDtcbiAgICAgICAgcGlnLnZlbFkgPSAtcGlnLnZlbFk7XG4gICAgICAgIFxuICAgICAgICAvLyB0aGlzLnZlbFggPSAoIHRoaXMudmVsWCAqIChtYXNzMSAtIG1hc3MyKSArICgyICogbWFzczIgKiBwaWdWZWxYKSkgLyAobWFzczEgKyBtYXNzMik7XG4gICAgICAgIC8vIHRoaXMudmVsWSA9ICggdGhpcy52ZWxZICogKG1hc3MxIC0gbWFzczIpICsgKDIgKiBtYXNzMiAqIHBpZ1ZlbFkpKSAvIChtYXNzMSArIG1hc3MyKTtcbiAgICAgICAgLy8gcGlnLnZlbFggPSAoIHBpZ1ZlbFggKiAobWFzczIgLSBtYXNzMSkgKyAoMiAqIG1hc3MxICogdGhpcy52ZWxYKSkgLyAobWFzczEgKyBtYXNzMik7XG4gICAgICAgIC8vIHBpZy52ZWxZID0gKCBwaWdWZWxZICogKG1hc3MyIC0gbWFzczEpICsgKDIgKiBtYXNzMSAqIHRoaXMudmVsWSkpIC8gKG1hc3MxICsgbWFzczIpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5feCArPSB0aGlzLnZlbFg7XG4gICAgICAgIHRoaXMuX3kgKz0gdGhpcy52ZWxZO1xuICAgICAgICBwaWcueCArPSBwaWcudmVsWDtcbiAgICAgICAgcGlnLnkgKz0gcGlnLnZlbFk7XG4gICAgfVxuXG4gICAgYmlyZE9uQmxvY2tDb2xsaXNpb25Mb2dpYyhibG9jaykge1xuICAgICAgICB0aGlzLnZlbFggPSAtdGhpcy52ZWxYO1xuICAgICAgICB0aGlzLnZlbFkgPSAtdGhpcy52ZWxZO1xuXG4gICAgICAgIHRoaXMuX3ggKz0gdGhpcy52ZWxYO1xuICAgICAgICB0aGlzLl95ICs9IHRoaXMudmVsWTtcbiAgICB9XG5cbiAgICBjaGVja0JpcmRJbnRlcmNlcHRCbG9jayhwb2ludEEsIHBvaW50QiwgY2lyY2xlQ2VudGVyLCByYWRpdXMpIHtcbiAgICAgICAgbGV0IGRpc3Q7XG4gICAgICAgIGNvbnN0IHZlbDFYID0gcG9pbnRCLnBvcy54IC0gcG9pbnRBLnBvcy54O1xuICAgICAgICBjb25zdCB2ZWwxWSA9IHBvaW50Qi5wb3MueSAtIHBvaW50QS5wb3MueTtcbiAgICAgICAgY29uc3QgdmVsMlggPSBjaXJjbGVDZW50ZXJbMF0gLSBwb2ludEEucG9zLng7XG4gICAgICAgIGNvbnN0IHZlbDJZID0gY2lyY2xlQ2VudGVyWzFdIC0gcG9pbnRBLnBvcy55O1xuICAgICAgICBjb25zdCB1bml0ID0gKHZlbDJYICogdmVsMVggKyB2ZWwyWSAqIHZlbDFZKSAvICh2ZWwxWSAqIHZlbDFZICsgdmVsMVggKiB2ZWwxWCk7XG4gICAgICAgIGlmICh1bml0ID49IDAgJiYgdW5pdCA8PSAxKXtcbiAgICAgICAgICAgIGRpc3QgPSAocG9pbnRBLnBvcy54ICArIHZlbDFYICogdW5pdCAtIGNpcmNsZUNlbnRlclswXSkgKiogMiArIChwb2ludEEucG9zLnkgKyB2ZWwxWSAqIHVuaXQgLSBjaXJjbGVDZW50ZXJbMV0pICoqIDI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkaXN0ID0gdW5pdCA8IDAgPyBcbiAgICAgICAgICAgICAgICAocG9pbnRBLnBvcy54IC0gY2lyY2xlQ2VudGVyWzBdKSAqKiAyICsgKHBvaW50QS5wb3MueSAtIGNpcmNsZUNlbnRlclsxXSkgKiogMiA6XG4gICAgICAgICAgICAgICAgKHBvaW50Qi5wb3MueCAtIGNpcmNsZUNlbnRlclswXSkgKiogMiArIChwb2ludEIucG9zLnkgLSBjaXJjbGVDZW50ZXJbMV0pICoqIDI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRpc3QgPCByYWRpdXMgKiByYWRpdXM7XG4gICAgfVxuXG4gICAgdXBkYXRlT2JqZWN0KHBpZ3MsIGJsb2Nrcykge1xuICAgICAgICB0aGlzLmNoZWNrQmlyZE9uUGlnQ29sbGlzaW9uKHBpZ3MpXG4gICAgICAgIHRoaXMuY2hlY2tCaXJkT25CbG9ja0NvbGxpc2lvbihibG9ja3MpXG4gICAgICAgIHRoaXMudmVsWCArPSB0aGlzLl9ncmF2aXR5Lng7XG4gICAgICAgIHRoaXMudmVsWSArPSB0aGlzLl9ncmF2aXR5Lnk7XG4gICAgICAgIHRoaXMuX3ggKz0gdGhpcy52ZWxYO1xuICAgICAgICB0aGlzLl95ICs9IHRoaXMudmVsWTtcblxuICAgICAgICBpZiAodGhpcy5feSA+PSB0aGlzLl9ncm91bmQpIHtcbiAgICAgICAgICAgIHRoaXMuX3kgPSB0aGlzLl9ncm91bmQgLSAodGhpcy5feSAtIHRoaXMuX2dyb3VuZCk7XG4gICAgICAgICAgICB0aGlzLnZlbFkgPSAtTWF0aC5hYnModGhpcy52ZWxZKSAqIHRoaXMuX2JvdW5jZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnZlbFkgPj0gdGhpcy5fZ3Jhdml0eS55KSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWxZID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLl95ID0gdGhpcy5fZ3JvdW5kIC0gdGhpcy5fZ3Jhdml0eS55O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudmVsWCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlbFggLT0gdGhpcy5fZnJpY3Rpb25YO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudmVsWCA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlbFggKz0gdGhpcy5fZnJpY3Rpb25YO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHN0b3BzIGJhbGwgZnJvbSBib3VuY2luZyBpbiBZIGF4aXNcbiAgICAgICAgaWYgKCB0aGlzLl95ID49IHRoaXMuX2dyb3VuZCAtIDEwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy52ZWxZIDwgMCAmJiB0aGlzLnZlbFkgPiAtMS4xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWxZID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBzdG9wcyBiYWxsIGZyb20gbW92aW5nIG9uIFggYXhpcyBpZiB4LXZlbG9jaXR5IDwgMS4xXG4gICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnZlbFgpIDwgMS4xKSB7XG4gICAgICAgICAgICB0aGlzLnZlbFggPSAwO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RpbGU7IiwiaW1wb3J0IFBpZyBmcm9tIFwiLi9waWdcIjtcbmltcG9ydCBCbG9jayBmcm9tIFwiLi9ibG9ja1wiO1xuXG5jbGFzcyBTdGFnZUxvYWRlciB7XG4gICAgY29uc3RydWN0b3IoIG51bWJlck9mUGlncyA9IDIsIHBpZ3NMb2NhdGlvbkFycmF5ID0gW1s1MDAsIDYwMF0sIFs2MDAsIDYwMF1dLCBudW1iZXJvZkJsb2NrcyA9IDIsIGJsb2NrTG9jYXRpb25BcnJheSA9IFtbMzUwLCA3MDBdLCBbNzAwLCA3MDBdXSkge1xuICAgICAgICB0aGlzLm51bWJlck9mUGlncyA9IG51bWJlck9mUGlncztcbiAgICAgICAgdGhpcy5waWdzTG9jYXRpb25BcnJheSA9IHBpZ3NMb2NhdGlvbkFycmF5O1xuICAgICAgICB0aGlzLnBpZ3MgPSBbXTtcblxuICAgICAgICB0aGlzLm51bWJlcm9mQmxvY2tzID0gbnVtYmVyb2ZCbG9ja3M7XG4gICAgICAgIHRoaXMuYmxvY2tMb2NhdGlvbkFycmF5ID0gYmxvY2tMb2NhdGlvbkFycmF5O1xuICAgICAgICB0aGlzLmJsb2NrcyA9IFtdO1xuICAgIH1cblxuICAgIGRyYXdQaWdzKGN0eCkge1xuICAgICAgICBpZiAodGhpcy5waWdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBpZ3NMb2NhdGlvbkFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5waWdzLnB1c2gobmV3IFBpZyhjdHgsIHRoaXMucGlnc0xvY2F0aW9uQXJyYXlbaV1bMF0sIHRoaXMucGlnc0xvY2F0aW9uQXJyYXlbaV1bMV0pKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhd0Jsb2NrcyhjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMuYmxvY2tzLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYmxvY2tMb2NhdGlvbkFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja3MucHVzaChuZXcgQmxvY2soY3R4LCB0aGlzLmJsb2NrTG9jYXRpb25BcnJheVtpXVswXSwgdGhpcy5ibG9ja0xvY2F0aW9uQXJyYXlbaV1bMV0pKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYW5pbWF0ZShjdHgpIHtcbiAgICAgICAgdGhpcy5kcmF3UGlncyhjdHgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGlncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5waWdzW2ldLmFuaW1hdGUoY3R4KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5kcmF3QmxvY2tzKGN0eCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ibG9ja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tzW2ldLmFuaW1hdGUoY3R4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RhZ2VMb2FkZXI7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9zdHlsZXMvaW5kZXguc2Nzc1wiO1xuaW1wb3J0IENhbnZhcyBmcm9tIFwiLi9zY3JpcHRzL2NhbnZhc1wiO1xuaW1wb3J0IFByb2plY3RpbGUgZnJvbSBcIi4vc2NyaXB0cy9wcm9qZWN0aWxlXCI7XG5pbXBvcnQgU3RhZ2VMb2FkZXIgZnJvbSBcIi4vc2NyaXB0cy9zdGFnZUxvYWRlclwiO1xuXG5jb25zdCBjdXJyZW50U3RhdGVPYmogPSB7XG4gIGN1cnJlbnRFeGFtcGxlOiBudWxsLFxuICBjdXJyZW50RXZlbnRMaXN0ZW5lcnM6IFtdLFxufTtcblxubGV0IHgsIHk7XG5sZXQgZGVsdGFYLCBkZWx0YVk7XG5jb25zdCBjZW50ZXJYID0gMTM0O1xuY29uc3QgY2VudGVyWSA9IDI3MTtcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYW52YXNcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHN0YXJ0Q2FudmFzKTtcblxuZnVuY3Rpb24gc3RhcnRDYW52YXMoKSB7XG4gICAgdW5yZWdpc3RlckV2ZW50TGlzdGVuZXJzKCk7XG4gICAgY29uc3QgY2FudmFzID0gbmV3IENhbnZhcygpO1xuICAgIGNhbnZhcy5jcmVhdGVDYW52YXMoKTtcbiAgICBjb25zdCBjYW52YXNPYmogPSBjYW52YXMuY2FudmFzO1xuICAgIGxldCBjYW52YXNQb3NpdGlvbiA9IGNhbnZhc09iai5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIGNvbnN0IHByb2plY3RpbGUgPSBuZXcgUHJvamVjdGlsZShjYW52YXMuY3R4KVxuXG4gICAgY29uc3QgbW91c2UgPSB7XG4gICAgICB4OiBjYW52YXMud2lkdGgvMixcbiAgICAgIHk6IGNhbnZhcy5oZWlnaHQvMixcbiAgICAgIGNsaWNrOiBmYWxzZSxcbiAgICB9XG4gICAgXG4gICAgY2FudmFzT2JqLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIG1vdXNlLnggPSBlLnggLSBjYW52YXNQb3NpdGlvbi5sZWZ0O1xuICAgICAgbW91c2UueSA9IGUueSAtIGNhbnZhc1Bvc2l0aW9uLnRvcDtcblxuICAgIH0pXG5cbiAgICBjYW52YXNPYmouYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgbW91c2UueCA9IGUueCAtIGNhbnZhc1Bvc2l0aW9uLmxlZnQ7XG4gICAgICBtb3VzZS55ID0gZS55IC0gY2FudmFzUG9zaXRpb24udG9wO1xuXG4gICAgICBkZWx0YVggPSBtb3VzZS54IC0gY2VudGVyWDtcbiAgICAgIGRlbHRhWSA9IG1vdXNlLnkgLSBjZW50ZXJZO1xuICAgICAgY29uc29sZS5sb2coTWF0aC5hYnMobW91c2UueCAtIDEzMCkpXG4gICAgICBsZXQgdGhldGFSYWRpYW4gPSBNYXRoLmF0YW4yKGRlbHRhWSwgZGVsdGFYKTtcbiAgICAgIGxldCBkZWdyZWVzID0gLSgoTWF0aC5hYnModGhldGFSYWRpYW4gKiAxODAgLyBNYXRoLlBJKSAtIDI3MCkgJSA5MCk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhkZWdyZWVzKVxuICAgICAgcHJvamVjdGlsZS5sYXVuY2goZGVncmVlcyAsIE1hdGguYWJzKG1vdXNlLnggLSAxMzApKVxuICAgIH0pXG5cbiAgICBjb25zdCBzdGFnZUxvYWRlciA9IG5ldyBTdGFnZUxvYWRlcigpXG5cbiAgICBsZXQgYW5pbWF0aW5nID0gdHJ1ZTtcblxuICAgIGNvbnN0IGFuaW1hdGlvbiA9ICgpID0+IHtcbiAgICAgICAgY2FudmFzLmNsZWFyQ2FudmFzKCk7XG4gICAgICAgIGlmIChhbmltYXRpbmcpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgaW1nLnNyYyA9IFwic3JjL2ltYWdlcy9waXhpbC1sYXllci1CYWNrZ3JvdW5kLnBuZ1wiO1xuICAgICAgICAgICAgY2FudmFzLmN0eC5kcmF3SW1hZ2UoaW1nLDkwLDM1MCk7XG4gICAgICAgICAgICBzdGFnZUxvYWRlci5hbmltYXRlKGNhbnZhcy5jdHgpXG4gICAgICAgICAgICBwcm9qZWN0aWxlLmFuaW1hdGUoY2FudmFzLmN0eCwgc3RhZ2VMb2FkZXIucGlncywgc3RhZ2VMb2FkZXIuYmxvY2tzKVxuICAgICAgICAgICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsYXVuY2gtYnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwcm9qZWN0aWxlLmxhdW5jaClcblxuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRpb24pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uKTtcblxuICAgIC8vICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZUtleURvd24pO1xuICAgIC8vICAgY3VycmVudFN0YXRlT2JqLmN1cnJlbnRFdmVudExpc3RlbmVycy5wdXNoKFtcbiAgICAvLyAgICAgXCJ3aW5kb3dcIixcbiAgICAvLyAgICAgXCJrZXlkb3duXCIsXG4gICAgLy8gICAgIGhhbmRsZUtleURvd24sXG4gICAgLy8gICBdKTtcblxuICAgIC8vICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlTW91c2VEb3duKTtcbiAgICAvLyAgIGN1cnJlbnRTdGF0ZU9iai5jdXJyZW50RXZlbnRMaXN0ZW5lcnMucHVzaChbXG4gICAgLy8gICAgIFwid2luZG93XCIsXG4gICAgLy8gICAgIFwibW91c2Vkb3duXCIsXG4gICAgLy8gICAgIGhhbmRsZU1vdXNlRG93bixcbiAgICAvLyAgIF0pO1xuXG4gICAgLy8gICBmdW5jdGlvbiBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG4gICAgLy8gICAgIGlmIChldmVudC53aGljaCA9PT0gMzIpIHtcbiAgICAvLyAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vICAgICAgIHNxdWFyZXMuZm9yRWFjaCgoc3EpID0+IHNxLnJldmVyc2VBbmltYXRpb24oKSk7XG4gICAgLy8gICAgICAgY2FudmFzLnNldENvbG9yKGAjJHtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNjc3NzIxNSkudG9TdHJpbmcoMTYpfWApO1xuICAgIC8vICAgICB9XG4gICAgLy8gICB9XG5cbiAgICAvLyAgIGZ1bmN0aW9uIGhhbmRsZU1vdXNlRG93bihldmVudCkge1xuICAgIC8vICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vICAgICBzcXVhcmVzLnB1c2goXG4gICAgLy8gICAgICAgbmV3IFNxdWFyZShcbiAgICAvLyAgICAgICAgIGNhbnZhcy5jdHgsXG4gICAgLy8gICAgICAgICBjYW52YXMuY29vcmRzLm1hcCgoY28pID0+IGNvICsgMjUpLFxuICAgIC8vICAgICAgICAgY2FudmFzLmZpbGxDb2xvclxuICAgIC8vICAgICAgIClcbiAgICAvLyAgICAgKTtcbiAgICAgICAgLy8gYW5pbWF0aW5nID0gIWFuaW1hdGluZztcbiAgICAvLyAgIH1cbn1cblxuXG5mdW5jdGlvbiB1bnJlZ2lzdGVyRXZlbnRMaXN0ZW5lcnMoKSB7XG4gIHdoaWxlIChjdXJyZW50U3RhdGVPYmouY3VycmVudEV2ZW50TGlzdGVuZXJzLmxlbmd0aCkge1xuICAgIGxldCBbXG4gICAgICBzZWxlY3RvcixcbiAgICAgIGV2ZW50LFxuICAgICAgaGFuZGxlcixcbiAgICBdID0gY3VycmVudFN0YXRlT2JqLmN1cnJlbnRFdmVudExpc3RlbmVycy5wb3AoKTtcbiAgICBpZiAoc2VsZWN0b3IgPT09IFwid2luZG93XCIpIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyKTtcbiAgICAgIGNvbnNvbGUubG9nKGhhbmRsZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2xlYXJEZW1vKCkge1xuICBpZiAoY3VycmVudFN0YXRlT2JqLmN1cnJlbnRFeGFtcGxlID09PSBcIkNBTlZBU0RFTU9cIilcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJjYW52YXNcIikpO1xuICBpZiAoY3VycmVudFN0YXRlT2JqLmN1cnJlbnRFeGFtcGxlID09PSBcIkRPTURFTU9cIikge1xuICAgIFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNhcmRcIildLmZvckVhY2goKGVsZW0pID0+XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsZW0pXG4gICAgKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==