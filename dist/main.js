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
    this.ctx = this.canvas.getContext("2d"); // this.coords = [50, 10, 150, 100];
    // this.animationDir = 1;
    // this.fillColor = `green`;
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
    } //   drawSquare() {
    //     this.ctx.fillStyle = this.fillColor;
    //     this.ctx.fillRect(...this.coords);
    //   }
    //   updateSquare() {
    //     this.coords = this.coords.map((coord) => (coord += 1 * this.animationDir));
    //   }
    //   clearSquare() {
    //     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //   }
    //   reverseAnimation() {
    //     this.animationDir *= -1;
    //   }
    //   setColor(color) {
    //     this.fillColor = color;
    //     document.body.style.backgroundColor = color;
    //     document.body.style.filter = `brightness(150%)`;
    //   }

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
    value: function launchLoop(ctx, pigs) {
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

        currentBird.updateObject(pigs);
        currentBird.drawObjectLaunch(this._ctx);
      }
    }
  }, {
    key: "animate",
    value: function animate(ctx, pigs) {
      this.launchLoop(ctx, pigs);
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
    value: function checkBirdOnBlockCollision() {}
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
    key: "updateObject",
    value: function updateObject(pigs) {
      this.checkBirdOnPigCollision(pigs);
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
      projectile.animate(canvas.ctx, stageLoader.pigs);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYmlyZC5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvYmxvY2suanMiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi8uL3NyYy9zY3JpcHRzL2NhbnZhcy5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3NjcmlwdHMvcGlnLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9wcm9qZWN0aWxlLmpzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvc2NyaXB0cy9zdGFnZUxvYWRlci5qcyIsIndlYnBhY2s6Ly9qc19wcm9qZWN0X3NrZWxldG9uLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vanNfcHJvamVjdF9za2VsZXRvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2pzX3Byb2plY3Rfc2tlbGV0b24vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiQmlyZCIsImN0eCIsIngiLCJ5IiwidmVsWCIsInZlbFkiLCJyYWRpdXMiLCJjb2xvciIsIl9jdHgiLCJfcmFkaXVzIiwiX2NvbG9yIiwiX2dyYXZpdHkiLCJfZ3JvdW5kIiwiY2FudmFzIiwiaGVpZ2h0IiwiX2JvdW5jZSIsImZpbGxTdHlsZSIsImJlZ2luUGF0aCIsImFyYyIsIk1hdGgiLCJQSSIsImNsb3NlUGF0aCIsImZpbGwiLCJhYnMiLCJkcmF3QmlyZCIsInVwZGF0ZUJpcmQiLCJCbG9jayIsInciLCJoIiwiciIsImR4IiwiZHkiLCJkciIsIklOU0VUIiwiUEk5MCIsIlBJMiIsIldBTExfTk9STVMiLCJtYXNzIiwiZ2V0TWFzcyIsInNhdmUiLCJzZXRUcmFuc2Zvcm0iLCJ1cGRhdGVCbG9jayIsImRyYXdCbG9jayIsInJlc3RvcmUiLCJpIiwicCIsImdldFBvaW50IiwicG9zIiwiZG9Db2xsaXNpb24iLCJ3aWR0aCIsInJvdGF0ZSIsImZpbGxSZWN0Iiwic3Ryb2tlUmVjdCIsIndoaWNoIiwieHgiLCJ5eSIsInZlbG9jaXR5QSIsInZlbG9jaXR5VCIsInZlbG9jaXR5IiwiY29zIiwic2luIiwiZGV0YWlscyIsImFzUG9sYXIiLCJ2ZWN0b3IiLCJwb2xhciIsIm1hZyIsImRpciIsInZlY3RvckFkZCIsInZhbGlkYXRlUG9sYXIiLCJ2ZWMiLCJpc1BvbGFyIiwicFZlYyIsInJldFYiLCJpc0NhcnQiLCJjYXJ0VG9Qb2xhciIsInVuZGVmaW5lZCIsInBvbGFyVG9DYXJ0IiwiYXRhbjIiLCJoeXBvdCIsInZlYzEiLCJ2ZWMyIiwidjEiLCJhc0NhcnQiLCJ2MiIsImZvcmNlIiwibG9jIiwibCIsInRvQ2VudGVyIiwicGhldGEiLCJGdiIsIkZhIiwiYWNjZWwiLCJkZWx0YVYiLCJhY2NlbEEiLCJ2IiwiZDEiLCJkMiIsImFsb25nIiwidGFuZ2VudCIsInBvaW50RGV0YWlscyIsIndhbGxJbmRleCIsInZ2IiwidmEiLCJ2dmMiLCJ2ZWN0b3JDb21wb25lbnRzRm9yRGlyIiwidmFjIiwiYXBwbHlGb3JjZSIsIkNhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJnZXRDb250ZXh0IiwiYm9keSIsImFwcGVuZCIsImNsYXNzTGlzdCIsImFkZCIsImNsZWFyUmVjdCIsIlBpZyIsIl9tYXNzIiwiX2ZyaWN0aW9uWCIsInVwZGF0ZVBpZyIsImRyYXdQaWciLCJQcm9qZWN0aWxlIiwiY29udCIsImxhdW5jaCIsImJpbmQiLCJ0YXJnZXQiLCJyYW5kb20iLCJiaXJkT2JqZWN0cyIsIm1heCIsImN1cnJlbnRCaXJkIiwiYW5nbGUiLCJtYWduaXR1ZGUiLCJvYmpMYXVuY2giLCJPYmplY3RMYXVuY2giLCJwdXNoIiwidHJhbnNmZXIiLCJwaWdzIiwibGVuZ3RoIiwicmVtb3ZlIiwic3BsaWNlIiwibW92ZVRvIiwibGluZVRvIiwiX3giLCJfeSIsInR5cGUiLCJ1cGRhdGVPYmplY3QiLCJkcmF3T2JqZWN0TGF1bmNoIiwibGF1bmNoTG9vcCIsInJlbW92ZWQiLCJkaXN0YW5jZSIsInNxcnQiLCJiaXJkT25QaWdDb2xsaXNpb25Mb2dpYyIsInBpZyIsIm1hc3MxIiwibWFzczIiLCJjaGVja0JpcmRPblBpZ0NvbGxpc2lvbiIsIlN0YWdlTG9hZGVyIiwibnVtYmVyT2ZQaWdzIiwicGlnc0xvY2F0aW9uQXJyYXkiLCJudW1iZXJvZkJsb2NrcyIsImJsb2NrTG9jYXRpb25BcnJheSIsImJsb2NrcyIsImRyYXdQaWdzIiwiYW5pbWF0ZSIsImRyYXdCbG9ja3MiLCJjdXJyZW50U3RhdGVPYmoiLCJjdXJyZW50RXhhbXBsZSIsImN1cnJlbnRFdmVudExpc3RlbmVycyIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwic3RhcnRDYW52YXMiLCJ1bnJlZ2lzdGVyRXZlbnRMaXN0ZW5lcnMiLCJjcmVhdGVDYW52YXMiLCJwcm9qZWN0aWxlIiwic3RhZ2VMb2FkZXIiLCJhbmltYXRpbmciLCJhbmltYXRpb24iLCJjbGVhckNhbnZhcyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInBvcCIsInNlbGVjdG9yIiwiZXZlbnQiLCJoYW5kbGVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImNvbnNvbGUiLCJsb2ciLCJjbGVhckRlbW8iLCJyZW1vdmVDaGlsZCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZWxlbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBTUEsSTtBQUNGLGdCQUFZQyxHQUFaLEVBQW1GO0FBQUEsUUFBbEVDLENBQWtFLHVFQUE5RCxHQUE4RDtBQUFBLFFBQXpEQyxDQUF5RCx1RUFBckQsR0FBcUQ7QUFBQSxRQUFoREMsSUFBZ0QsdUVBQXpDLENBQXlDO0FBQUEsUUFBdENDLElBQXNDLHVFQUEvQixDQUErQjtBQUFBLFFBQTVCQyxNQUE0Qix1RUFBbkIsRUFBbUI7QUFBQSxRQUFmQyxLQUFlLHVFQUFQLEtBQU87O0FBQUE7O0FBQy9FLFNBQUtDLElBQUwsR0FBWVAsR0FBWjtBQUNBLFNBQUtDLENBQUwsR0FBU0EsQ0FBVDtBQUNBLFNBQUtDLENBQUwsR0FBU0EsQ0FBVDtBQUNBLFNBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtJLE9BQUwsR0FBZUgsTUFBZjtBQUNBLFNBQUtJLE1BQUwsR0FBY0gsS0FBZDtBQUVBLFNBQUtJLFFBQUwsR0FBZ0I7QUFBRVQsT0FBQyxFQUFFLENBQUw7QUFBUUMsT0FBQyxFQUFFO0FBQVgsS0FBaEI7QUFDQSxTQUFLUyxPQUFMLEdBQWUsS0FBS0osSUFBTCxDQUFVSyxNQUFWLENBQWlCQyxNQUFoQztBQUNBLFNBQUtDLE9BQUwsR0FBZSxHQUFmO0FBQ0g7Ozs7V0FFRCxrQkFBU2QsR0FBVCxFQUFjQyxDQUFkLEVBQWlCQyxDQUFqQixFQUFvQjtBQUNoQkYsU0FBRyxDQUFDZSxTQUFKLEdBQWdCLEtBQUtOLE1BQXJCO0FBQ0FULFNBQUcsQ0FBQ2dCLFNBQUo7QUFDQWhCLFNBQUcsQ0FBQ2lCLEdBQUosQ0FBUWhCLENBQVIsRUFBV0MsQ0FBWCxFQUFjLEtBQUtNLE9BQW5CLEVBQTRCLENBQTVCLEVBQWdDVSxJQUFJLENBQUNDLEVBQUwsR0FBVSxDQUExQyxFQUE4QyxLQUE5QztBQUNBbkIsU0FBRyxDQUFDb0IsU0FBSjtBQUNBcEIsU0FBRyxDQUFDcUIsSUFBSjtBQUNIOzs7V0FFRCxzQkFBYTtBQUNULFdBQUtsQixJQUFMLElBQWEsS0FBS08sUUFBTCxDQUFjVCxDQUEzQjtBQUNBLFdBQUtHLElBQUwsSUFBYSxLQUFLTSxRQUFMLENBQWNSLENBQTNCO0FBQ0EsV0FBS0QsQ0FBTCxJQUFVLEtBQUtFLElBQWY7QUFDQSxXQUFLRCxDQUFMLElBQVUsS0FBS0UsSUFBZjs7QUFFQSxVQUFJLEtBQUtGLENBQUwsSUFBVSxLQUFLUyxPQUFuQixFQUE0QjtBQUN4QixhQUFLVCxDQUFMLEdBQVMsS0FBS1MsT0FBTCxJQUFnQixLQUFLVCxDQUFMLEdBQVMsS0FBS1MsT0FBOUIsQ0FBVDtBQUNBLGFBQUtQLElBQUwsR0FBWSxDQUFDYyxJQUFJLENBQUNJLEdBQUwsQ0FBUyxLQUFLbEIsSUFBZCxDQUFELEdBQXVCLEtBQUtVLE9BQXhDOztBQUNBLFlBQUksS0FBS1YsSUFBTCxJQUFhLEtBQUtNLFFBQUwsQ0FBY1IsQ0FBL0IsRUFBa0M7QUFDOUIsZUFBS0UsSUFBTCxHQUFZLENBQVo7QUFDQSxlQUFLRixDQUFMLEdBQVMsS0FBS1MsT0FBTCxHQUFlLEtBQUtELFFBQUwsQ0FBY1IsQ0FBdEM7QUFDSDtBQUNKO0FBQ0o7OztXQUVELGlCQUFRRixHQUFSLEVBQWE7QUFDVCxXQUFLdUIsUUFBTCxDQUFjdkIsR0FBZDtBQUNBLFdBQUt3QixVQUFMO0FBQ0g7Ozs7OztBQUdMLCtEQUFlekIsSUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7OztJQzdDTTBCLEs7QUFDRixpQkFBWXpCLEdBQVosRUFBaUJDLENBQWpCLEVBQW9CQyxDQUFwQixFQUF3QztBQUFBLFFBQWpCd0IsQ0FBaUIsdUVBQWIsRUFBYTtBQUFBLFFBQVRDLENBQVMsdUVBQUwsR0FBSzs7QUFBQTs7QUFDcEMsU0FBS3BCLElBQUwsR0FBWVAsR0FBWjtBQUNBLFNBQUtDLENBQUwsR0FBU0EsQ0FBVDtBQUNBLFNBQUtDLENBQUwsR0FBU0EsQ0FBVDtBQUNBLFNBQUt3QixDQUFMLEdBQVNBLENBQVQ7QUFDQSxTQUFLQyxDQUFMLEdBQVNBLENBQVQ7QUFDQSxTQUFLQyxDQUFMLEdBQVMsR0FBVDtBQUNBLFNBQUtDLEVBQUwsR0FBVSxDQUFWO0FBQ0EsU0FBS0MsRUFBTCxHQUFVLENBQVY7QUFDQSxTQUFLQyxFQUFMLEdBQVUsQ0FBVjtBQUNBLFNBQUtDLEtBQUwsR0FBYSxFQUFiO0FBQ0EsU0FBS2IsRUFBTCxHQUFVRCxJQUFJLENBQUNDLEVBQWY7QUFDQSxTQUFLYyxJQUFMLEdBQVlmLElBQUksQ0FBQ0MsRUFBTCxHQUFVLENBQXRCO0FBQ0EsU0FBS2UsR0FBTCxHQUFXaEIsSUFBSSxDQUFDQyxFQUFMLEdBQVUsQ0FBckI7QUFDQSxTQUFLZ0IsVUFBTCxHQUFrQixDQUFFakIsSUFBSSxDQUFDQyxFQUFMLEdBQVUsQ0FBWixFQUFlRCxJQUFJLENBQUNDLEVBQXBCLEVBQXdCLEVBQUVELElBQUksQ0FBQ0MsRUFBTCxHQUFVLENBQVosQ0FBeEIsRUFBd0MsQ0FBeEMsQ0FBbEI7QUFDQSxTQUFLUixPQUFMLEdBQWUsS0FBS0osSUFBTCxDQUFVSyxNQUFWLENBQWlCQyxNQUFqQixHQUEwQixHQUF6QztBQUNBLFNBQUt1QixJQUFMLEdBQVksS0FBS0MsT0FBTCxFQUFaO0FBQ0g7Ozs7V0FFRCxpQkFBUXJDLEdBQVIsRUFBYTtBQUNUQSxTQUFHLENBQUNzQyxJQUFKO0FBQ0F0QyxTQUFHLENBQUN1QyxZQUFKLENBQWlCLENBQWpCLEVBQW9CLENBQXBCLEVBQXVCLENBQXZCLEVBQTBCLENBQTFCLEVBQTZCLENBQTdCLEVBQWdDLENBQWhDO0FBQ0EsV0FBS0MsV0FBTDtBQUNBLFdBQUtDLFNBQUwsQ0FBZXpDLEdBQWY7QUFDQUEsU0FBRyxDQUFDMEMsT0FBSjs7QUFFQSxXQUFJLElBQUlDLENBQUMsR0FBRyxDQUFaLEVBQWVBLENBQUMsR0FBRyxDQUFuQixFQUFzQkEsQ0FBQyxFQUF2QixFQUEwQjtBQUN0QixZQUFJQyxDQUFDLEdBQUcsS0FBS0MsUUFBTCxDQUFjRixDQUFkLENBQVIsQ0FEc0IsQ0FFdEI7O0FBQ0EsWUFBR0MsQ0FBQyxDQUFDRSxHQUFGLENBQU03QyxDQUFOLEdBQVUsS0FBSytCLEtBQWxCLEVBQXdCO0FBQ3BCLGVBQUsvQixDQUFMLElBQVcsS0FBSytCLEtBQU4sR0FBZVksQ0FBQyxDQUFDRSxHQUFGLENBQU03QyxDQUEvQjtBQUNBLGVBQUs4QyxXQUFMLENBQWlCSCxDQUFqQixFQUFtQixDQUFuQjtBQUNILFNBSEQsTUFJSyxJQUFJQSxDQUFDLENBQUNFLEdBQUYsQ0FBTTdDLENBQU4sR0FBVUQsR0FBRyxDQUFDWSxNQUFKLENBQVdvQyxLQUFYLEdBQWlCLEtBQUtoQixLQUFwQyxFQUEwQztBQUMzQyxlQUFLL0IsQ0FBTCxJQUFXRCxHQUFHLENBQUNZLE1BQUosQ0FBV29DLEtBQVgsR0FBbUIsS0FBS2hCLEtBQXpCLEdBQWtDWSxDQUFDLENBQUNFLEdBQUYsQ0FBTTdDLENBQWxEO0FBQ0EsZUFBSzhDLFdBQUwsQ0FBaUJILENBQWpCLEVBQW1CLENBQW5CO0FBQ0gsU0FISSxNQUlBLElBQUdBLENBQUMsQ0FBQ0UsR0FBRixDQUFNNUMsQ0FBTixHQUFVLEtBQUs4QixLQUFsQixFQUF3QjtBQUN6QixlQUFLOUIsQ0FBTCxJQUFXLEtBQUs4QixLQUFOLEdBQWVZLENBQUMsQ0FBQ0UsR0FBRixDQUFNNUMsQ0FBL0I7QUFDQSxlQUFLNkMsV0FBTCxDQUFpQkgsQ0FBakIsRUFBbUIsQ0FBbkI7QUFDSCxTQUhJLE1BSUEsSUFBSUEsQ0FBQyxDQUFDRSxHQUFGLENBQU01QyxDQUFOLEdBQVVGLEdBQUcsQ0FBQ1ksTUFBSixDQUFXQyxNQUFYLEdBQW9CLEtBQUttQixLQUF2QyxFQUE2QztBQUM5QyxlQUFLOUIsQ0FBTCxJQUFXRixHQUFHLENBQUNZLE1BQUosQ0FBV0MsTUFBWCxHQUFvQixLQUFLbUIsS0FBMUIsR0FBbUNZLENBQUMsQ0FBQ0UsR0FBRixDQUFNNUMsQ0FBbkQ7QUFDQSxlQUFLNkMsV0FBTCxDQUFpQkgsQ0FBakIsRUFBbUIsQ0FBbkI7QUFDSDtBQUNKO0FBQ0o7OztXQUVELG1CQUFVO0FBQ04sYUFBUyxLQUFLbEIsQ0FBTCxHQUFTLEtBQUtDLENBQWQsR0FBa0IsS0FBS0EsQ0FBekIsR0FBOEIsSUFBckM7QUFDSDs7O1dBRUQsbUJBQVUzQixHQUFWLEVBQWU7QUFDWEEsU0FBRyxDQUFDdUMsWUFBSixDQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixLQUFLdEMsQ0FBOUIsRUFBZ0MsS0FBS0MsQ0FBckM7QUFDQUYsU0FBRyxDQUFDaUQsTUFBSixDQUFXLEtBQUtyQixDQUFoQjtBQUNBNUIsU0FBRyxDQUFDZSxTQUFKLEdBQWdCLE1BQWhCO0FBQ0FmLFNBQUcsQ0FBQ2tELFFBQUosQ0FBYSxDQUFDLEtBQUt4QixDQUFOLEdBQVEsQ0FBckIsRUFBd0IsQ0FBQyxLQUFLQyxDQUFOLEdBQVEsQ0FBaEMsRUFBbUMsS0FBS0QsQ0FBeEMsRUFBMkMsS0FBS0MsQ0FBaEQ7QUFDQTNCLFNBQUcsQ0FBQ21ELFVBQUosQ0FBZSxDQUFDLEtBQUt6QixDQUFOLEdBQVEsQ0FBdkIsRUFBMEIsQ0FBQyxLQUFLQyxDQUFOLEdBQVEsQ0FBbEMsRUFBcUMsS0FBS0QsQ0FBMUMsRUFBNkMsS0FBS0MsQ0FBbEQ7QUFDSDs7O1dBRUQsdUJBQWM7QUFDVixXQUFLMUIsQ0FBTCxJQUFVLEtBQUs0QixFQUFmO0FBQ0EsV0FBSzNCLENBQUwsSUFBVSxLQUFLNEIsRUFBZjtBQUNBLFdBQUtBLEVBQUwsSUFBVyxLQUFYO0FBQ0EsV0FBS0YsQ0FBTCxJQUFVLEtBQUtHLEVBQWYsQ0FKVSxDQU1WO0FBQ0E7QUFDQTtBQUNIOzs7V0FFRCxrQkFBU3FCLEtBQVQsRUFBZ0I7QUFDWixVQUFJdkIsRUFBSixFQUFRQyxFQUFSLEVBQVk3QixDQUFaLEVBQWVDLENBQWYsRUFBa0JtRCxFQUFsQixFQUFzQkMsRUFBdEIsRUFBMEJDLFNBQTFCLEVBQXFDQyxTQUFyQyxFQUFnREMsUUFBaEQ7QUFFQTVCLFFBQUUsR0FBR1gsSUFBSSxDQUFDd0MsR0FBTCxDQUFTLEtBQUs5QixDQUFkLENBQUw7QUFDQUUsUUFBRSxHQUFHWixJQUFJLENBQUN5QyxHQUFMLENBQVMsS0FBSy9CLENBQWQsQ0FBTDs7QUFFQSxjQUFRd0IsS0FBUjtBQUNJLGFBQUssQ0FBTDtBQUNJbkQsV0FBQyxHQUFHLENBQUMsS0FBS3lCLENBQU4sR0FBVSxDQUFkO0FBQ0F4QixXQUFDLEdBQUcsQ0FBQyxLQUFLeUIsQ0FBTixHQUFVLENBQWQ7QUFDQTs7QUFDSixhQUFLLENBQUw7QUFDSTFCLFdBQUMsR0FBRyxLQUFLeUIsQ0FBTCxHQUFTLENBQWI7QUFDQXhCLFdBQUMsR0FBRyxDQUFDLEtBQUt5QixDQUFOLEdBQVUsQ0FBZDtBQUNBOztBQUNKLGFBQUssQ0FBTDtBQUNJMUIsV0FBQyxHQUFHLEtBQUt5QixDQUFMLEdBQVMsQ0FBYjtBQUNBeEIsV0FBQyxHQUFHLEtBQUt5QixDQUFMLEdBQVMsQ0FBYjtBQUNBOztBQUNKLGFBQUssQ0FBTDtBQUNJMUIsV0FBQyxHQUFHLENBQUMsS0FBS3lCLENBQU4sR0FBVSxDQUFkO0FBQ0F4QixXQUFDLEdBQUcsS0FBS3lCLENBQUwsR0FBUyxDQUFiO0FBQ0E7O0FBQ0osYUFBSyxDQUFMO0FBQ0kxQixXQUFDLEdBQUcsS0FBS0EsQ0FBVDtBQUNBQyxXQUFDLEdBQUcsS0FBS0EsQ0FBVDtBQW5CUjs7QUFzQkEsVUFBSW1ELEVBQUosRUFBU0MsRUFBVDtBQUNBRCxRQUFFLEdBQUdwRCxDQUFDLEdBQUc0QixFQUFKLEdBQVMzQixDQUFDLEdBQUcsQ0FBQzRCLEVBQW5CO0FBQ0F3QixRQUFFLEdBQUdyRCxDQUFDLEdBQUc2QixFQUFKLEdBQVM1QixDQUFDLEdBQUcyQixFQUFsQjtBQUVBLFVBQUkrQixPQUFPLEdBQUcsS0FBS0MsT0FBTCxDQUFhLEtBQUtDLE1BQUwsQ0FBWVQsRUFBWixFQUFnQkMsRUFBaEIsQ0FBYixDQUFkO0FBRUFELFFBQUUsSUFBSSxLQUFLcEQsQ0FBWDtBQUNBcUQsUUFBRSxJQUFJLEtBQUtwRCxDQUFYO0FBRUFxRCxlQUFTLEdBQUcsS0FBS1EsS0FBTCxDQUFXSCxPQUFPLENBQUNJLEdBQVIsR0FBYyxLQUFLakMsRUFBOUIsRUFBa0M2QixPQUFPLENBQUNLLEdBQVIsR0FBYyxLQUFLaEMsSUFBckQsQ0FBWjtBQUNBdUIsZUFBUyxHQUFHLEtBQUtVLFNBQUwsQ0FBZVQsUUFBUSxHQUFHLEtBQUtLLE1BQUwsQ0FBWSxLQUFLakMsRUFBakIsRUFBcUIsS0FBS0MsRUFBMUIsQ0FBMUIsRUFBeUR5QixTQUF6RCxDQUFaO0FBRUEsYUFBTztBQUNIRSxnQkFBUSxFQUFFQSxRQURQO0FBRUhELGlCQUFTLEVBQUVBLFNBRlI7QUFHSEQsaUJBQVMsRUFBR0EsU0FIVDtBQUlIVCxXQUFHLEVBQUUsS0FBS2dCLE1BQUwsQ0FBWVQsRUFBWixFQUFnQkMsRUFBaEIsQ0FKRjtBQUtIakQsY0FBTSxFQUFFdUQsT0FBTyxDQUFDSTtBQUxiLE9BQVA7QUFPSDs7O1dBRUQsaUJBQXdCO0FBQUEsVUFBbEJBLEdBQWtCLHVFQUFaLENBQVk7QUFBQSxVQUFUQyxHQUFTLHVFQUFILENBQUc7QUFDcEIsYUFBTyxLQUFLRSxhQUFMLENBQW1CO0FBQUNGLFdBQUcsRUFBRUEsR0FBTjtBQUFXRCxXQUFHLEVBQUVBO0FBQWhCLE9BQW5CLENBQVA7QUFDSDs7O1dBRUQsa0JBQXFCO0FBQUEsVUFBZC9ELENBQWMsdUVBQVYsQ0FBVTtBQUFBLFVBQVBDLENBQU8sdUVBQUgsQ0FBRztBQUNqQixhQUFPO0FBQUVELFNBQUMsRUFBRUEsQ0FBTDtBQUFRQyxTQUFDLEVBQUVBO0FBQVgsT0FBUDtBQUNIOzs7V0FFRCx1QkFBY2tFLEdBQWQsRUFBbUI7QUFDZixVQUFJLEtBQUtDLE9BQUwsQ0FBYUQsR0FBYixDQUFKLEVBQXVCO0FBQ25CLFlBQUdBLEdBQUcsQ0FBQ0osR0FBSixHQUFVLENBQWIsRUFBZTtBQUNYSSxhQUFHLENBQUNKLEdBQUosR0FBVSxDQUFDSSxHQUFHLENBQUNKLEdBQWY7QUFDQUksYUFBRyxDQUFDSCxHQUFKLElBQVcsS0FBSzlDLEVBQWhCO0FBQ0g7QUFDSjs7QUFDRCxhQUFPaUQsR0FBUDtBQUNIOzs7V0FFRCxxQkFBWUUsSUFBWixFQUFzQztBQUFBLFVBQXBCQyxJQUFvQix1RUFBYjtBQUFDdEUsU0FBQyxFQUFFLENBQUo7QUFBT0MsU0FBQyxFQUFFO0FBQVYsT0FBYTtBQUNsQ3FFLFVBQUksQ0FBQ3RFLENBQUwsR0FBU2lCLElBQUksQ0FBQ3dDLEdBQUwsQ0FBU1ksSUFBSSxDQUFDTCxHQUFkLElBQXFCSyxJQUFJLENBQUNOLEdBQW5DO0FBQ0FPLFVBQUksQ0FBQ3JFLENBQUwsR0FBU2dCLElBQUksQ0FBQ3lDLEdBQUwsQ0FBU1csSUFBSSxDQUFDTCxHQUFkLElBQXFCSyxJQUFJLENBQUNOLEdBQW5DO0FBQ0EsYUFBT08sSUFBUDtBQUNIOzs7V0FFRCxpQkFBUUgsR0FBUixFQUFhO0FBQ1QsVUFBSSxLQUFLSSxNQUFMLENBQVlKLEdBQVosQ0FBSixFQUFzQjtBQUNsQixlQUFPLEtBQUtLLFdBQUwsQ0FBaUJMLEdBQWpCLENBQVA7QUFDSDs7QUFDRCxVQUFJQSxHQUFHLENBQUNKLEdBQUosR0FBVSxDQUFkLEVBQWlCO0FBQ2JJLFdBQUcsQ0FBQ0osR0FBSixHQUFVLENBQUNJLEdBQUcsQ0FBQ0osR0FBZjtBQUNBSSxXQUFHLENBQUNILEdBQUosSUFBVyxLQUFLOUMsRUFBaEI7QUFDSDs7QUFDRCxhQUFPO0FBQUU4QyxXQUFHLEVBQUVHLEdBQUcsQ0FBQ0gsR0FBWDtBQUFnQkQsV0FBRyxFQUFFSSxHQUFHLENBQUNKO0FBQXpCLE9BQVA7QUFDSDs7O1dBRUQsZ0JBQU9JLEdBQVAsRUFBWTtBQUFFLFVBQUdBLEdBQUcsQ0FBQ25FLENBQUosS0FBVXlFLFNBQVYsSUFBdUJOLEdBQUcsQ0FBQ2xFLENBQUosS0FBVXdFLFNBQXBDLEVBQStDO0FBQUUsZUFBTyxJQUFQO0FBQWM7O0FBQUMsYUFBTyxLQUFQO0FBQWU7OztXQUM3RixpQkFBUU4sR0FBUixFQUFhO0FBQUUsVUFBR0EsR0FBRyxDQUFDSixHQUFKLEtBQVlVLFNBQVosSUFBeUJOLEdBQUcsQ0FBQ0gsR0FBSixLQUFZUyxTQUF4QyxFQUFtRDtBQUFFLGVBQU8sSUFBUDtBQUFjOztBQUFDLGFBQU8sS0FBUDtBQUFlOzs7V0FDbEcsZ0JBQU9OLEdBQVAsRUFBWTtBQUNSLFVBQUksS0FBS0MsT0FBTCxDQUFhRCxHQUFiLENBQUosRUFBdUI7QUFBQyxlQUFPLEtBQUtPLFdBQUwsQ0FBaUJQLEdBQWpCLENBQVA7QUFBNkI7O0FBQ3JELGFBQU87QUFBQ25FLFNBQUMsRUFBRW1FLEdBQUcsQ0FBQ25FLENBQVI7QUFBV0MsU0FBQyxFQUFFa0UsR0FBRyxDQUFDbEU7QUFBbEIsT0FBUDtBQUNIOzs7V0FDRCxxQkFBWWtFLEdBQVosRUFBMEM7QUFBQSxVQUF6QkcsSUFBeUIsdUVBQWxCO0FBQUNOLFdBQUcsRUFBRSxDQUFOO0FBQVNELFdBQUcsRUFBRTtBQUFkLE9BQWtCO0FBQ3RDTyxVQUFJLENBQUNOLEdBQUwsR0FBVy9DLElBQUksQ0FBQzBELEtBQUwsQ0FBV1IsR0FBRyxDQUFDbEUsQ0FBZixFQUFrQmtFLEdBQUcsQ0FBQ25FLENBQXRCLENBQVg7QUFDQXNFLFVBQUksQ0FBQ1AsR0FBTCxHQUFXOUMsSUFBSSxDQUFDMkQsS0FBTCxDQUFXVCxHQUFHLENBQUNuRSxDQUFmLEVBQWtCbUUsR0FBRyxDQUFDbEUsQ0FBdEIsQ0FBWDtBQUNBLGFBQU9xRSxJQUFQO0FBQ0g7OztXQUVELG1CQUFVTyxJQUFWLEVBQWdCQyxJQUFoQixFQUFzQjtBQUNsQixVQUFJQyxFQUFFLEdBQUcsS0FBS0MsTUFBTCxDQUFZSCxJQUFaLENBQVQ7QUFDQSxVQUFJSSxFQUFFLEdBQUcsS0FBS0QsTUFBTCxDQUFZRixJQUFaLENBQVQ7QUFDQSxhQUFPLEtBQUtqQixNQUFMLENBQVlrQixFQUFFLENBQUMvRSxDQUFILEdBQU9pRixFQUFFLENBQUNqRixDQUF0QixFQUF5QitFLEVBQUUsQ0FBQzlFLENBQUgsR0FBT2dGLEVBQUUsQ0FBQ2hGLENBQW5DLENBQVA7QUFDSDs7O1dBRUQsb0JBQVdpRixLQUFYLEVBQWtCQyxHQUFsQixFQUF1QjtBQUNuQixXQUFLakIsYUFBTCxDQUFtQmdCLEtBQW5CO0FBQ0EsVUFBSUUsQ0FBQyxHQUFHLEtBQUtKLE1BQUwsQ0FBWUcsR0FBWixDQUFSO0FBQ0EsVUFBSUUsUUFBUSxHQUFHLEtBQUt6QixPQUFMLENBQWEsS0FBS0MsTUFBTCxDQUFZLEtBQUs3RCxDQUFMLEdBQVNvRixDQUFDLENBQUNwRixDQUF2QixFQUEwQixLQUFLQyxDQUFMLEdBQVNtRixDQUFDLENBQUNuRixDQUFyQyxDQUFiLENBQWY7QUFDQSxVQUFJcUYsS0FBSyxHQUFHRCxRQUFRLENBQUNyQixHQUFULEdBQWVrQixLQUFLLENBQUNsQixHQUFqQztBQUNBLFVBQUl1QixFQUFFLEdBQUd0RSxJQUFJLENBQUN3QyxHQUFMLENBQVM2QixLQUFULElBQWtCSixLQUFLLENBQUNuQixHQUFqQztBQUNBLFVBQUl5QixFQUFFLEdBQUd2RSxJQUFJLENBQUN5QyxHQUFMLENBQVM0QixLQUFULElBQWtCSixLQUFLLENBQUNuQixHQUFqQztBQUNBLFVBQUkwQixLQUFLLEdBQUcsS0FBSzdCLE9BQUwsQ0FBYXlCLFFBQWIsQ0FBWjtBQUNBSSxXQUFLLENBQUMxQixHQUFOLEdBQVl3QixFQUFFLEdBQUcsS0FBS3BELElBQXRCO0FBQ0EsVUFBSXVELE1BQU0sR0FBRyxLQUFLVixNQUFMLENBQVlTLEtBQVosQ0FBYjtBQUNBLFdBQUs3RCxFQUFMLElBQVc4RCxNQUFNLENBQUMxRixDQUFsQjtBQUNBLFdBQUs2QixFQUFMLElBQVc2RCxNQUFNLENBQUN6RixDQUFsQjtBQUNBLFVBQUkwRixNQUFNLEdBQUdILEVBQUUsSUFBSUgsUUFBUSxDQUFDdEIsR0FBVCxHQUFnQixLQUFLNUIsSUFBekIsQ0FBZjtBQUNBLFdBQUtMLEVBQUwsSUFBVzZELE1BQVg7QUFDSDs7O1dBRUQsZ0NBQXVCeEIsR0FBdkIsRUFBNEJILEdBQTVCLEVBQWlDO0FBQzdCLFVBQUk0QixDQUFDLEdBQUcsS0FBS2hDLE9BQUwsQ0FBYU8sR0FBYixDQUFSO0FBQ0EsVUFBSW1CLEtBQUssR0FBR00sQ0FBQyxDQUFDNUIsR0FBRixHQUFRQSxHQUFwQjtBQUNBLFVBQUl1QixFQUFFLEdBQUd0RSxJQUFJLENBQUN3QyxHQUFMLENBQVM2QixLQUFULElBQWtCTSxDQUFDLENBQUM3QixHQUE3QjtBQUNBLFVBQUl5QixFQUFFLEdBQUd2RSxJQUFJLENBQUN5QyxHQUFMLENBQVM0QixLQUFULElBQWtCTSxDQUFDLENBQUM3QixHQUE3QjtBQUVBLFVBQUk4QixFQUFFLEdBQUc3QixHQUFUO0FBQ0EsVUFBSThCLEVBQUUsR0FBRzlCLEdBQUcsR0FBRyxLQUFLaEMsSUFBcEI7O0FBQ0EsVUFBR3VELEVBQUUsR0FBRyxDQUFSLEVBQVU7QUFDTk0sVUFBRSxJQUFJLEtBQUszRSxFQUFYO0FBQ0FxRSxVQUFFLEdBQUcsQ0FBQ0EsRUFBTjtBQUNIOztBQUVELFVBQUdDLEVBQUUsR0FBRyxDQUFSLEVBQVU7QUFDTk0sVUFBRSxJQUFJLEtBQUs1RSxFQUFYO0FBQ0FzRSxVQUFFLEdBQUcsQ0FBQ0EsRUFBTjtBQUNIOztBQUNELGFBQU87QUFDSE8sYUFBSyxFQUFHLEtBQUtqQyxLQUFMLENBQVd5QixFQUFYLEVBQWNNLEVBQWQsQ0FETDtBQUVIRyxlQUFPLEVBQUcsS0FBS2xDLEtBQUwsQ0FBVzBCLEVBQVgsRUFBY00sRUFBZDtBQUZQLE9BQVA7QUFJSDs7O1dBRUQscUJBQVlHLFlBQVosRUFBMEJDLFNBQTFCLEVBQXFDO0FBQ2pDLFVBQUlDLEVBQUUsR0FBRyxLQUFLdkMsT0FBTCxDQUFhcUMsWUFBWSxDQUFDekMsUUFBMUIsQ0FBVDtBQUNBLFVBQUk0QyxFQUFFLEdBQUcsS0FBS3hDLE9BQUwsQ0FBYXFDLFlBQVksQ0FBQzNDLFNBQTFCLENBQVQ7QUFDQSxVQUFJK0MsR0FBRyxHQUFHLEtBQUtDLHNCQUFMLENBQTRCSCxFQUE1QixFQUFnQyxLQUFLakUsVUFBTCxDQUFnQmdFLFNBQWhCLENBQWhDLENBQVY7QUFDQSxVQUFJSyxHQUFHLEdBQUcsS0FBS0Qsc0JBQUwsQ0FBNEJGLEVBQTVCLEVBQWdDLEtBQUtsRSxVQUFMLENBQWdCZ0UsU0FBaEIsQ0FBaEMsQ0FBVjtBQUVBRyxTQUFHLENBQUNOLEtBQUosQ0FBVWhDLEdBQVYsSUFBaUIsSUFBakI7QUFDQXdDLFNBQUcsQ0FBQ1IsS0FBSixDQUFVaEMsR0FBVixJQUFpQixJQUFqQjtBQUVBc0MsU0FBRyxDQUFDTixLQUFKLENBQVVoQyxHQUFWLElBQWlCLEtBQUs1QixJQUF0QjtBQUNBb0UsU0FBRyxDQUFDUixLQUFKLENBQVVoQyxHQUFWLElBQWlCLEtBQUs1QixJQUF0QjtBQUVBa0UsU0FBRyxDQUFDTixLQUFKLENBQVUvQixHQUFWLElBQWlCLEtBQUs5QyxFQUF0QjtBQUNBcUYsU0FBRyxDQUFDUixLQUFKLENBQVUvQixHQUFWLElBQWlCLEtBQUs5QyxFQUF0QjtBQUVBbUYsU0FBRyxDQUFDTCxPQUFKLENBQVlqQyxHQUFaLElBQW1CLElBQW5CO0FBQ0F3QyxTQUFHLENBQUNQLE9BQUosQ0FBWWpDLEdBQVosSUFBbUIsSUFBbkI7QUFDQXNDLFNBQUcsQ0FBQ0wsT0FBSixDQUFZakMsR0FBWixJQUFtQixLQUFLNUIsSUFBeEI7QUFDQW9FLFNBQUcsQ0FBQ1AsT0FBSixDQUFZakMsR0FBWixJQUFtQixLQUFLNUIsSUFBeEI7QUFDQWtFLFNBQUcsQ0FBQ0wsT0FBSixDQUFZaEMsR0FBWixJQUFtQixLQUFLOUMsRUFBeEI7QUFDQXFGLFNBQUcsQ0FBQ1AsT0FBSixDQUFZaEMsR0FBWixJQUFtQixLQUFLOUMsRUFBeEI7QUFFQSxXQUFLc0YsVUFBTCxDQUFnQkgsR0FBRyxDQUFDTixLQUFwQixFQUEyQkUsWUFBWSxDQUFDcEQsR0FBeEM7QUFDQSxXQUFLMkQsVUFBTCxDQUFnQkgsR0FBRyxDQUFDTCxPQUFwQixFQUE2QkMsWUFBWSxDQUFDcEQsR0FBMUM7QUFDQSxXQUFLMkQsVUFBTCxDQUFnQkQsR0FBRyxDQUFDUixLQUFwQixFQUEyQkUsWUFBWSxDQUFDcEQsR0FBeEM7QUFDQSxXQUFLMkQsVUFBTCxDQUFnQkQsR0FBRyxDQUFDUCxPQUFwQixFQUE2QkMsWUFBWSxDQUFDcEQsR0FBMUM7QUFDSDs7Ozs7O0FBSUwsK0RBQWVyQixLQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDblBNaUYsTTtBQUNGLG9CQUFjO0FBQUE7O0FBQ1YsU0FBSzlGLE1BQUwsR0FBYytGLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixRQUF2QixDQUFkO0FBQ0EsU0FBS2hHLE1BQUwsQ0FBWW9DLEtBQVosR0FBb0I2RCxNQUFNLENBQUNDLFVBQVAsR0FBb0IsR0FBeEM7QUFDQSxTQUFLbEcsTUFBTCxDQUFZQyxNQUFaLEdBQXFCLEtBQUtELE1BQUwsQ0FBWW9DLEtBQVosR0FBb0IsQ0FBekM7QUFDQSxTQUFLaEQsR0FBTCxHQUFXLEtBQUtZLE1BQUwsQ0FBWW1HLFVBQVosQ0FBdUIsSUFBdkIsQ0FBWCxDQUpVLENBS1Y7QUFDQTtBQUNBO0FBQ0g7Ozs7V0FDRCx3QkFBZTtBQUNYSixjQUFRLENBQUNLLElBQVQsQ0FBY0MsTUFBZCxDQUFxQixLQUFLckcsTUFBMUI7QUFDQSxXQUFLQSxNQUFMLENBQVlzRyxTQUFaLENBQXNCQyxHQUF0QixDQUEwQixhQUExQjtBQUNIOzs7V0FFRCx1QkFBYztBQUNWLFdBQUtuSCxHQUFMLENBQVNvSCxTQUFULENBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLEtBQUt4RyxNQUFMLENBQVlvQyxLQUFyQyxFQUE0QyxLQUFLcEMsTUFBTCxDQUFZQyxNQUF4RDtBQUNILEssQ0FDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFHQSwrREFBZTZGLE1BQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7SUN6Q01XLEc7QUFDRixlQUFZckgsR0FBWixFQUFpQkMsQ0FBakIsRUFBb0JDLENBQXBCLEVBQTBFO0FBQUEsUUFBbkRDLElBQW1ELHVFQUE1QyxDQUE0QztBQUFBLFFBQXpDQyxJQUF5Qyx1RUFBbEMsQ0FBa0M7QUFBQSxRQUEvQkMsTUFBK0IsdUVBQXRCLEVBQXNCO0FBQUEsUUFBbEJDLEtBQWtCLHVFQUFWLFFBQVU7O0FBQUE7O0FBQ3RFLFNBQUtDLElBQUwsR0FBWVAsR0FBWjtBQUNBLFNBQUtDLENBQUwsR0FBU0EsQ0FBVDtBQUNBLFNBQUtDLENBQUwsR0FBU0EsQ0FBVDtBQUNBLFNBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtJLE9BQUwsR0FBZUgsTUFBZjtBQUNBLFNBQUtpSCxLQUFMLEdBQWEsQ0FBYjtBQUNBLFNBQUs3RyxNQUFMLEdBQWNILEtBQWQ7QUFFQSxTQUFLSSxRQUFMLEdBQWdCO0FBQUVULE9BQUMsRUFBRSxDQUFMO0FBQVFDLE9BQUMsRUFBRTtBQUFYLEtBQWhCO0FBQ0EsU0FBS1MsT0FBTCxHQUFlLEtBQUtKLElBQUwsQ0FBVUssTUFBVixDQUFpQkMsTUFBakIsR0FBMEIsRUFBekM7QUFDQSxTQUFLQyxPQUFMLEdBQWUsR0FBZjtBQUNBLFNBQUt5RyxVQUFMLEdBQWtCLEdBQWxCO0FBQ0EsU0FBS0QsS0FBTCxHQUFhLENBQWI7QUFDSDs7OztXQUVELGlCQUFRdEgsR0FBUixFQUFhO0FBQ1RBLFNBQUcsQ0FBQ2UsU0FBSixHQUFnQixLQUFLTixNQUFyQjtBQUNBVCxTQUFHLENBQUNnQixTQUFKO0FBQ0FoQixTQUFHLENBQUNpQixHQUFKLENBQVEsS0FBS2hCLENBQWIsRUFBZ0IsS0FBS0MsQ0FBckIsRUFBd0IsS0FBS00sT0FBN0IsRUFBc0MsQ0FBdEMsRUFBMENVLElBQUksQ0FBQ0MsRUFBTCxHQUFVLENBQXBELEVBQXdELEtBQXhEO0FBQ0FuQixTQUFHLENBQUNvQixTQUFKO0FBQ0FwQixTQUFHLENBQUNxQixJQUFKO0FBQ0g7OztXQUVELHFCQUFZO0FBQ1IsV0FBS2xCLElBQUwsSUFBYSxLQUFLTyxRQUFMLENBQWNULENBQTNCO0FBQ0EsV0FBS0csSUFBTCxJQUFhLEtBQUtNLFFBQUwsQ0FBY1IsQ0FBM0I7QUFDQSxXQUFLRCxDQUFMLElBQVUsS0FBS0UsSUFBZjtBQUNBLFdBQUtELENBQUwsSUFBVSxLQUFLRSxJQUFmOztBQUVBLFVBQUksS0FBS0YsQ0FBTCxJQUFVLEtBQUtTLE9BQW5CLEVBQTRCO0FBQ3hCLGFBQUtULENBQUwsR0FBUyxLQUFLUyxPQUFMLElBQWdCLEtBQUtULENBQUwsR0FBUyxLQUFLUyxPQUE5QixDQUFUO0FBQ0EsYUFBS1AsSUFBTCxHQUFZLENBQUNjLElBQUksQ0FBQ0ksR0FBTCxDQUFTLEtBQUtsQixJQUFkLENBQUQsR0FBdUIsS0FBS1UsT0FBeEM7O0FBQ0EsWUFBSSxLQUFLVixJQUFMLElBQWEsS0FBS00sUUFBTCxDQUFjUixDQUEvQixFQUFrQztBQUM5QixlQUFLRSxJQUFMLEdBQVksQ0FBWjtBQUNBLGVBQUtGLENBQUwsR0FBUyxLQUFLUyxPQUFMLEdBQWUsS0FBS0QsUUFBTCxDQUFjUixDQUF0QztBQUNIOztBQUNELFlBQUksS0FBS0MsSUFBTCxHQUFZLENBQWhCLEVBQW1CO0FBQ2YsZUFBS0EsSUFBTCxJQUFhLEtBQUtvSCxVQUFsQjtBQUNIOztBQUNELFlBQUksS0FBS3BILElBQUwsR0FBWSxDQUFoQixFQUFtQjtBQUNmLGVBQUtBLElBQUwsSUFBYSxLQUFLb0gsVUFBbEI7QUFDSDtBQUNKLE9BbkJPLENBb0JSOzs7QUFDQSxVQUFJLEtBQUtuSCxJQUFMLEdBQVUsQ0FBVixJQUFlLEtBQUtBLElBQUwsR0FBVSxDQUFDLEdBQTlCLEVBQW1DO0FBQy9CLGFBQUtBLElBQUwsR0FBWSxDQUFaO0FBQ0gsT0F2Qk8sQ0F3QlI7OztBQUNBLFVBQUljLElBQUksQ0FBQ0ksR0FBTCxDQUFTLEtBQUtuQixJQUFkLElBQXNCLEdBQTFCLEVBQStCO0FBQzNCLGFBQUtBLElBQUwsR0FBWSxDQUFaO0FBQ0g7QUFDSjs7O1dBRUQsaUJBQVFILEdBQVIsRUFBYTtBQUNULFdBQUt3SCxTQUFMO0FBQ0EsV0FBS0MsT0FBTCxDQUFhekgsR0FBYjtBQUNIOzs7Ozs7QUFJTCwrREFBZXFILEdBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0RBOztJQUVNSyxVO0FBQ0Ysc0JBQVkxSCxHQUFaLEVBQWlCO0FBQUE7O0FBQ2IsU0FBS08sSUFBTCxHQUFZUCxHQUFaO0FBQ0EsU0FBSzJILElBQUwsR0FBWSxLQUFaO0FBRUEsU0FBS0MsTUFBTCxHQUFjLEtBQUtBLE1BQUwsQ0FBWUMsSUFBWixDQUFpQixJQUFqQixDQUFkO0FBQ0EsU0FBS0MsTUFBTCxHQUFjNUcsSUFBSSxDQUFDNkcsTUFBTCxLQUFjLEdBQWQsR0FBa0IsRUFBaEM7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0EsU0FBS0MsR0FBTCxHQUFXLENBQVg7QUFDQSxTQUFLQyxXQUFMO0FBQ0g7Ozs7V0FFRCxrQkFBUztBQUNMLFVBQUlDLEtBQUssR0FBR2pILElBQUksQ0FBQ0MsRUFBTCxHQUFRLElBQVIsR0FBYSxHQUF6QjtBQUNBLFVBQUlpSCxTQUFTLEdBQUcsSUFBaEI7QUFFQSxVQUFNQyxTQUFTLEdBQUcsSUFBSUMsWUFBSixDQUFpQixLQUFLL0gsSUFBdEIsRUFBNEIsQ0FBNUIsRUFBK0IsR0FBL0IsRUFBb0MsSUFBSVIsMENBQUosQ0FBUyxLQUFLUSxJQUFkLENBQXBDLENBQWxCO0FBQ0EsV0FBS3lILFdBQUwsQ0FBaUJPLElBQWpCLENBQXNCRixTQUF0QjtBQUNBQSxlQUFTLENBQUNqSSxJQUFWLEdBQWdCLENBQUVnSSxTQUFGLEdBQWNsSCxJQUFJLENBQUN5QyxHQUFMLENBQVN3RSxLQUFULENBQTlCO0FBQ0FFLGVBQVMsQ0FBQ2xJLElBQVYsR0FBaUJpSSxTQUFTLEdBQUdsSCxJQUFJLENBQUN3QyxHQUFMLENBQVN5RSxLQUFULENBQTdCO0FBQ0FFLGVBQVMsQ0FBQ0csUUFBVixHQUFxQixHQUFyQjtBQUNIOzs7V0FFRCxvQkFBV3hJLEdBQVgsRUFBZ0J5SSxJQUFoQixFQUFzQjtBQUNsQixVQUFJLEtBQUtULFdBQUwsQ0FBaUJVLE1BQWpCLEdBQTBCLEtBQUtULEdBQW5DLEVBQXdDO0FBQ3BDLGFBQUtELFdBQUwsQ0FBaUIsQ0FBakIsRUFBb0JXLE1BQXBCO0FBQ0EsYUFBS1gsV0FBTCxHQUFtQixLQUFLQSxXQUFMLENBQWlCWSxNQUFqQixDQUF3QixDQUF4QixDQUFuQjtBQUNIOztBQUNELFVBQUksS0FBS2pCLElBQVQsRUFBZTtBQUNYLGFBQUtDLE1BQUw7QUFDSDs7QUFDRDVILFNBQUcsQ0FBQ2dCLFNBQUo7QUFDQWhCLFNBQUcsQ0FBQ2UsU0FBSixHQUFnQixNQUFoQjtBQUNBZixTQUFHLENBQUM2SSxNQUFKLENBQVcsQ0FBWCxFQUFhLEdBQWI7QUFDQTdJLFNBQUcsQ0FBQzhJLE1BQUosQ0FBVyxFQUFYLEVBQWMsR0FBZDtBQUNBOUksU0FBRyxDQUFDOEksTUFBSixDQUFXLEVBQVgsRUFBYyxHQUFkO0FBQ0E5SSxTQUFHLENBQUM4SSxNQUFKLENBQVcsQ0FBWCxFQUFhLEdBQWI7QUFDQTlJLFNBQUcsQ0FBQ29CLFNBQUo7QUFDQXBCLFNBQUcsQ0FBQ3FCLElBQUo7QUFDQXJCLFNBQUcsQ0FBQ2dCLFNBQUo7QUFDQWhCLFNBQUcsQ0FBQ2UsU0FBSixHQUFnQixNQUFoQjtBQUNBZixTQUFHLENBQUNpQixHQUFKLENBQVEsS0FBSzZHLE1BQWIsRUFBb0IsR0FBcEIsRUFBd0IsRUFBeEIsRUFBMkIsQ0FBM0IsRUFBNkI1RyxJQUFJLENBQUNDLEVBQUwsR0FBUSxDQUFyQyxFQUF1QyxJQUF2QztBQUNBbkIsU0FBRyxDQUFDb0IsU0FBSjs7QUFFQSxXQUFLLElBQUl1QixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtxRixXQUFMLENBQWlCVSxNQUFyQyxFQUE2Qy9GLENBQUMsRUFBOUMsRUFBa0Q7QUFDOUMsWUFBSXVGLFdBQVcsR0FBRyxLQUFLRixXQUFMLENBQWlCckYsQ0FBakIsQ0FBbEIsQ0FEOEMsQ0FFOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQXVGLG1CQUFXLENBQUM5SCxJQUFaLElBQW9CLElBQXBCO0FBQ0E4SCxtQkFBVyxDQUFDYSxFQUFaLElBQWtCYixXQUFXLENBQUMvSCxJQUFaLEdBQW1CLENBQXJDO0FBQ0ErSCxtQkFBVyxDQUFDYyxFQUFaLElBQWtCZCxXQUFXLENBQUM5SCxJQUFaLEdBQW1CLENBQXJDOztBQUVBLFlBQUk4SCxXQUFXLENBQUNjLEVBQVosR0FBaUJkLFdBQVcsQ0FBQ2UsSUFBWixDQUFpQjVJLE1BQWxDLEdBQTJDLEdBQS9DLEVBQW9EO0FBQ2hENkgscUJBQVcsQ0FBQ2MsRUFBWixHQUFpQixNQUFNZCxXQUFXLENBQUNlLElBQVosQ0FBaUI1SSxNQUF4QztBQUNIOztBQUNENkgsbUJBQVcsQ0FBQ2dCLFlBQVosQ0FBeUJULElBQXpCO0FBQ0FQLG1CQUFXLENBQUNpQixnQkFBWixDQUE2QixLQUFLNUksSUFBbEM7QUFDSDtBQUNKOzs7V0FFRCxpQkFBUVAsR0FBUixFQUFheUksSUFBYixFQUFtQjtBQUNmLFdBQUtXLFVBQUwsQ0FBZ0JwSixHQUFoQixFQUFxQnlJLElBQXJCO0FBQ0g7Ozs7OztJQUdDSCxZO0FBQ0Ysd0JBQVl0SSxHQUFaLEVBQXVDO0FBQUEsUUFBdEJDLENBQXNCLHVFQUFsQixFQUFrQjtBQUFBLFFBQWRDLENBQWMsdUVBQVYsRUFBVTtBQUFBLFFBQU4rSSxJQUFNOztBQUFBOztBQUNuQyxTQUFLMUksSUFBTCxHQUFZUCxHQUFaO0FBQ0EsU0FBSytJLEVBQUwsR0FBVTlJLENBQVY7QUFDQSxTQUFLK0ksRUFBTCxHQUFVOUksQ0FBVjtBQUNBLFNBQUtDLElBQUwsR0FBWSxDQUFaO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLENBQVo7QUFDQSxTQUFLNkksSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS1QsUUFBTCxHQUFnQixHQUFoQjtBQUNBLFNBQUthLE9BQUwsR0FBZSxLQUFmO0FBQ0EsU0FBSzNJLFFBQUwsR0FBZ0I7QUFBRVQsT0FBQyxFQUFFLENBQUw7QUFBUUMsT0FBQyxFQUFFO0FBQVgsS0FBaEI7QUFDQSxTQUFLUyxPQUFMLEdBQWUsS0FBS0osSUFBTCxDQUFVSyxNQUFWLENBQWlCQyxNQUFqQixHQUEwQixFQUF6QztBQUNBLFNBQUtDLE9BQUwsR0FBZSxHQUFmO0FBQ0EsU0FBS3lHLFVBQUwsR0FBa0IsR0FBbEI7QUFDQSxTQUFLRCxLQUFMLEdBQWEsQ0FBYjtBQUNIOzs7O1dBRUQsa0JBQVM7QUFDTCxXQUFLK0IsT0FBTCxHQUFlLElBQWY7QUFDSDs7O1dBRUQsMEJBQWlCckosR0FBakIsRUFBc0I7QUFDbEIsV0FBS2lKLElBQUwsQ0FBVTFILFFBQVYsQ0FBbUJ2QixHQUFuQixFQUF3QixLQUFLK0ksRUFBN0IsRUFBaUMsS0FBS0MsRUFBdEM7QUFDSDs7O1dBRUQsaUNBQXdCUCxJQUF4QixFQUE4QjtBQUMxQixVQUFJQSxJQUFKLEVBQVU7QUFDTixhQUFLLElBQUk5RixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHOEYsSUFBSSxDQUFDQyxNQUF6QixFQUFpQy9GLENBQUMsRUFBbEMsRUFBc0M7QUFDbEMsY0FBSSxLQUFLb0csRUFBTCxHQUFVLEtBQUtFLElBQUwsQ0FBVXpJLE9BQXBCLEdBQThCaUksSUFBSSxDQUFDOUYsQ0FBRCxDQUFKLENBQVFuQyxPQUF0QyxHQUFnRGlJLElBQUksQ0FBQzlGLENBQUQsQ0FBSixDQUFRMUMsQ0FBeEQsSUFDRyxLQUFLOEksRUFBTCxHQUFVTixJQUFJLENBQUM5RixDQUFELENBQUosQ0FBUTFDLENBQVIsR0FBWSxLQUFLZ0osSUFBTCxDQUFVekksT0FBdEIsR0FBZ0NpSSxJQUFJLENBQUM5RixDQUFELENBQUosQ0FBUW5DLE9BRHJELElBRUcsS0FBS3dJLEVBQUwsR0FBVSxLQUFLQyxJQUFMLENBQVV6SSxPQUFwQixHQUE4QmlJLElBQUksQ0FBQzlGLENBQUQsQ0FBSixDQUFRbkMsT0FBdEMsR0FBZ0RpSSxJQUFJLENBQUM5RixDQUFELENBQUosQ0FBUXpDLENBRjNELElBR0csS0FBSzhJLEVBQUwsR0FBVVAsSUFBSSxDQUFDOUYsQ0FBRCxDQUFKLENBQVF6QyxDQUFSLEdBQVksS0FBSytJLElBQUwsQ0FBVXpJLE9BQXRCLEdBQWdDaUksSUFBSSxDQUFDOUYsQ0FBRCxDQUFKLENBQVFuQyxPQUh6RCxFQUlBO0FBQ0k7QUFDQSxnQkFBSThJLFFBQVEsR0FBR3BJLElBQUksQ0FBQ3FJLElBQUwsQ0FDUixDQUFDLEtBQUtSLEVBQUwsR0FBVU4sSUFBSSxDQUFDOUYsQ0FBRCxDQUFKLENBQVExQyxDQUFuQixLQUF5QixLQUFLOEksRUFBTCxHQUFVTixJQUFJLENBQUM5RixDQUFELENBQUosQ0FBUTFDLENBQTNDLENBQUQsR0FDQyxDQUFDLEtBQUsrSSxFQUFMLEdBQVVQLElBQUksQ0FBQzlGLENBQUQsQ0FBSixDQUFRekMsQ0FBbkIsS0FBeUIsS0FBSzhJLEVBQUwsR0FBVVAsSUFBSSxDQUFDOUYsQ0FBRCxDQUFKLENBQVF6QyxDQUEzQyxDQUZRLENBQWY7O0FBS0EsZ0JBQUlvSixRQUFRLEdBQUcsS0FBS0wsSUFBTCxDQUFVekksT0FBVixHQUFvQmlJLElBQUksQ0FBQzlGLENBQUQsQ0FBSixDQUFRbkMsT0FBM0MsRUFBb0Q7QUFDaEQsbUJBQUtnSix1QkFBTCxDQUE2QmYsSUFBSSxDQUFDOUYsQ0FBRCxDQUFqQztBQUNIO0FBQ0o7QUFDSjtBQUNKO0FBQ0o7OztXQUVELHFDQUE0QixDQUUzQjs7O1dBRUQsaUNBQXdCOEcsR0FBeEIsRUFBNkI7QUFDekIsVUFBTUMsS0FBSyxHQUFHLEtBQUtULElBQUwsQ0FBVXpJLE9BQXhCO0FBQ0EsVUFBTW1KLEtBQUssR0FBR0YsR0FBRyxDQUFDakosT0FBbEI7QUFDQSxVQUFJaUosR0FBRyxDQUFDdEosSUFBSixLQUFhLENBQWpCLEVBQW9Cc0osR0FBRyxDQUFDdEosSUFBSixHQUFXLENBQVgsQ0FISyxDQUl6QjtBQUNBO0FBQ0E7O0FBRUEsV0FBS0EsSUFBTCxHQUFZLENBQUMsS0FBS0EsSUFBbEI7QUFDQSxXQUFLQyxJQUFMLEdBQVksQ0FBQyxLQUFLQSxJQUFsQjtBQUVBcUosU0FBRyxDQUFDdEosSUFBSixHQUFXLENBQUNzSixHQUFHLENBQUN0SixJQUFoQjtBQUNBc0osU0FBRyxDQUFDckosSUFBSixHQUFXLENBQUNxSixHQUFHLENBQUNySixJQUFoQixDQVp5QixDQWN6QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFLMkksRUFBTCxJQUFXLEtBQUs1SSxJQUFoQjtBQUNBLFdBQUs2SSxFQUFMLElBQVcsS0FBSzVJLElBQWhCO0FBQ0FxSixTQUFHLENBQUN4SixDQUFKLElBQVN3SixHQUFHLENBQUN0SixJQUFiO0FBQ0FzSixTQUFHLENBQUN2SixDQUFKLElBQVN1SixHQUFHLENBQUNySixJQUFiO0FBQ0g7OztXQUVELHNCQUFhcUksSUFBYixFQUFtQjtBQUNmLFdBQUttQix1QkFBTCxDQUE2Qm5CLElBQTdCO0FBQ0EsV0FBS3RJLElBQUwsSUFBYSxLQUFLTyxRQUFMLENBQWNULENBQTNCO0FBQ0EsV0FBS0csSUFBTCxJQUFhLEtBQUtNLFFBQUwsQ0FBY1IsQ0FBM0I7QUFDQSxXQUFLNkksRUFBTCxJQUFXLEtBQUs1SSxJQUFoQjtBQUNBLFdBQUs2SSxFQUFMLElBQVcsS0FBSzVJLElBQWhCOztBQUVBLFVBQUksS0FBSzRJLEVBQUwsSUFBVyxLQUFLckksT0FBcEIsRUFBNkI7QUFDekIsYUFBS3FJLEVBQUwsR0FBVSxLQUFLckksT0FBTCxJQUFnQixLQUFLcUksRUFBTCxHQUFVLEtBQUtySSxPQUEvQixDQUFWO0FBQ0EsYUFBS1AsSUFBTCxHQUFZLENBQUNjLElBQUksQ0FBQ0ksR0FBTCxDQUFTLEtBQUtsQixJQUFkLENBQUQsR0FBdUIsS0FBS1UsT0FBeEM7O0FBQ0EsWUFBSSxLQUFLVixJQUFMLElBQWEsS0FBS00sUUFBTCxDQUFjUixDQUEvQixFQUFrQztBQUM5QixlQUFLRSxJQUFMLEdBQVksQ0FBWjtBQUNBLGVBQUs0SSxFQUFMLEdBQVUsS0FBS3JJLE9BQUwsR0FBZSxLQUFLRCxRQUFMLENBQWNSLENBQXZDO0FBQ0g7O0FBQ0QsWUFBSSxLQUFLQyxJQUFMLEdBQVksQ0FBaEIsRUFBbUI7QUFDZixlQUFLQSxJQUFMLElBQWEsS0FBS29ILFVBQWxCO0FBQ0g7O0FBQ0QsWUFBSSxLQUFLcEgsSUFBTCxHQUFZLENBQWhCLEVBQW1CO0FBQ2YsZUFBS0EsSUFBTCxJQUFhLEtBQUtvSCxVQUFsQjtBQUNIO0FBQ0osT0FwQmMsQ0FxQmY7OztBQUNBLFVBQUssS0FBS3lCLEVBQUwsSUFBVyxLQUFLckksT0FBTCxHQUFlLEVBQS9CLEVBQW1DO0FBQy9CLFlBQUksS0FBS1AsSUFBTCxHQUFZLENBQVosSUFBaUIsS0FBS0EsSUFBTCxHQUFZLENBQUMsR0FBbEMsRUFBdUM7QUFDbkMsZUFBS0EsSUFBTCxHQUFZLENBQVo7QUFDSDtBQUNKLE9BMUJjLENBMkJmOzs7QUFDQSxVQUFJYyxJQUFJLENBQUNJLEdBQUwsQ0FBUyxLQUFLbkIsSUFBZCxJQUFzQixHQUExQixFQUErQjtBQUMzQixhQUFLQSxJQUFMLEdBQVksQ0FBWjtBQUNIO0FBQ0o7Ozs7OztBQUlMLCtEQUFldUgsVUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeExBO0FBQ0E7O0lBRU1tQyxXO0FBQ0YseUJBQWdKO0FBQUEsUUFBbklDLFlBQW1JLHVFQUFwSCxDQUFvSDtBQUFBLFFBQWpIQyxpQkFBaUgsdUVBQTdGLENBQUMsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFELEVBQWEsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFiLENBQTZGO0FBQUEsUUFBbkVDLGNBQW1FLHVFQUFsRCxDQUFrRDtBQUFBLFFBQS9DQyxrQkFBK0MsdUVBQTFCLENBQUMsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFELEVBQWEsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFiLENBQTBCOztBQUFBOztBQUM1SSxTQUFLSCxZQUFMLEdBQW9CQSxZQUFwQjtBQUNBLFNBQUtDLGlCQUFMLEdBQXlCQSxpQkFBekI7QUFDQSxTQUFLdEIsSUFBTCxHQUFZLEVBQVo7QUFFQSxTQUFLdUIsY0FBTCxHQUFzQkEsY0FBdEI7QUFDQSxTQUFLQyxrQkFBTCxHQUEwQkEsa0JBQTFCO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDSDs7OztXQUVELGtCQUFTbEssR0FBVCxFQUFjO0FBQ1YsVUFBSSxLQUFLeUksSUFBTCxDQUFVQyxNQUFWLEtBQXFCLENBQXpCLEVBQTRCO0FBQ3hCLGFBQUssSUFBSS9GLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS29ILGlCQUFMLENBQXVCckIsTUFBM0MsRUFBbUQvRixDQUFDLEVBQXBELEVBQXdEO0FBQ3BELGVBQUs4RixJQUFMLENBQVVGLElBQVYsQ0FBZSxJQUFJbEIseUNBQUosQ0FBUXJILEdBQVIsRUFBYSxLQUFLK0osaUJBQUwsQ0FBdUJwSCxDQUF2QixFQUEwQixDQUExQixDQUFiLEVBQTJDLEtBQUtvSCxpQkFBTCxDQUF1QnBILENBQXZCLEVBQTBCLENBQTFCLENBQTNDLENBQWY7QUFDSDtBQUNKO0FBQ0o7OztXQUVELG9CQUFXM0MsR0FBWCxFQUFnQjtBQUNaLFVBQUksS0FBS2tLLE1BQUwsQ0FBWXhCLE1BQVosS0FBdUIsQ0FBM0IsRUFBNkI7QUFDekIsYUFBSyxJQUFJL0YsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLc0gsa0JBQUwsQ0FBd0J2QixNQUE1QyxFQUFvRC9GLENBQUMsRUFBckQsRUFBeUQ7QUFDckQsZUFBS3VILE1BQUwsQ0FBWTNCLElBQVosQ0FBaUIsSUFBSTlHLDJDQUFKLENBQVV6QixHQUFWLEVBQWUsS0FBS2lLLGtCQUFMLENBQXdCdEgsQ0FBeEIsRUFBMkIsQ0FBM0IsQ0FBZixFQUE4QyxLQUFLc0gsa0JBQUwsQ0FBd0J0SCxDQUF4QixFQUEyQixDQUEzQixDQUE5QyxDQUFqQjtBQUNIO0FBQ0o7QUFDSjs7O1dBRUQsaUJBQVEzQyxHQUFSLEVBQWE7QUFDVCxXQUFLbUssUUFBTCxDQUFjbkssR0FBZDs7QUFDQSxXQUFLLElBQUkyQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUs4RixJQUFMLENBQVVDLE1BQTlCLEVBQXNDL0YsQ0FBQyxFQUF2QyxFQUEyQztBQUN2QyxhQUFLOEYsSUFBTCxDQUFVOUYsQ0FBVixFQUFheUgsT0FBYixDQUFxQnBLLEdBQXJCO0FBQ0g7O0FBQ0QsV0FBS3FLLFVBQUwsQ0FBZ0JySyxHQUFoQjs7QUFFQSxXQUFLLElBQUkyQyxFQUFDLEdBQUcsQ0FBYixFQUFnQkEsRUFBQyxHQUFHLEtBQUt1SCxNQUFMLENBQVl4QixNQUFoQyxFQUF3Qy9GLEVBQUMsRUFBekMsRUFBNkM7QUFDekMsYUFBS3VILE1BQUwsQ0FBWXZILEVBQVosRUFBZXlILE9BQWYsQ0FBdUJwSyxHQUF2QjtBQUNIO0FBQ0o7Ozs7OztBQUdMLCtEQUFlNkosV0FBZixFOzs7Ozs7Ozs7OztBQzNDQTs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTVMsZUFBZSxHQUFHO0FBQ3RCQyxnQkFBYyxFQUFFLElBRE07QUFFdEJDLHVCQUFxQixFQUFFO0FBRkQsQ0FBeEI7QUFLQTdELFFBQVEsQ0FBQzhELGFBQVQsQ0FBdUIsU0FBdkIsRUFBa0NDLGdCQUFsQyxDQUFtRCxPQUFuRCxFQUE0REMsV0FBNUQ7O0FBRUEsU0FBU0EsV0FBVCxHQUF1QjtBQUNuQkMsMEJBQXdCO0FBQ3hCLE1BQU1oSyxNQUFNLEdBQUcsSUFBSThGLG9EQUFKLEVBQWY7QUFDQTlGLFFBQU0sQ0FBQ2lLLFlBQVA7QUFDQSxNQUFNQyxVQUFVLEdBQUcsSUFBSXBELHdEQUFKLENBQWU5RyxNQUFNLENBQUNaLEdBQXRCLENBQW5CO0FBQ0EsTUFBTStLLFdBQVcsR0FBRyxJQUFJbEIseURBQUosRUFBcEI7QUFFQSxNQUFJbUIsU0FBUyxHQUFHLElBQWhCOztBQUVBLE1BQU1DLFNBQVMsR0FBRyxTQUFaQSxTQUFZLEdBQU07QUFDcEJySyxVQUFNLENBQUNzSyxXQUFQOztBQUNBLFFBQUlGLFNBQUosRUFBZTtBQUNYRCxpQkFBVyxDQUFDWCxPQUFaLENBQW9CeEosTUFBTSxDQUFDWixHQUEzQjtBQUNBOEssZ0JBQVUsQ0FBQ1YsT0FBWCxDQUFtQnhKLE1BQU0sQ0FBQ1osR0FBMUIsRUFBK0IrSyxXQUFXLENBQUN0QyxJQUEzQztBQUNBOUIsY0FBUSxDQUFDOEQsYUFBVCxDQUF1QixnQkFBdkIsRUFBeUNDLGdCQUF6QyxDQUEwRCxPQUExRCxFQUFtRUksVUFBVSxDQUFDbEQsTUFBOUU7QUFFQWYsWUFBTSxDQUFDc0UscUJBQVAsQ0FBNkJGLFNBQTdCO0FBQ0g7QUFDSixHQVREOztBQVdBcEUsUUFBTSxDQUFDc0UscUJBQVAsQ0FBNkJGLFNBQTdCLEVBcEJtQixDQXNCbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNKO0FBQ0g7O0FBRUQsU0FBU0wsd0JBQVQsR0FBb0M7QUFDbEMsU0FBT04sZUFBZSxDQUFDRSxxQkFBaEIsQ0FBc0M5QixNQUE3QyxFQUFxRDtBQUFBLGdDQUsvQzRCLGVBQWUsQ0FBQ0UscUJBQWhCLENBQXNDWSxHQUF0QyxFQUwrQztBQUFBO0FBQUEsUUFFakRDLFFBRmlEO0FBQUEsUUFHakRDLEtBSGlEO0FBQUEsUUFJakRDLE9BSmlEOztBQU1uRCxRQUFJRixRQUFRLEtBQUssUUFBakIsRUFBMkI7QUFDekJ4RSxZQUFNLENBQUMyRSxtQkFBUCxDQUEyQkYsS0FBM0IsRUFBa0NDLE9BQWxDO0FBQ0FFLGFBQU8sQ0FBQ0MsR0FBUixDQUFZSCxPQUFaO0FBQ0QsS0FIRCxNQUdPO0FBQ0w1RSxjQUFRLENBQUM4RCxhQUFULENBQXVCWSxRQUF2QixFQUFpQ0csbUJBQWpDLENBQXFERixLQUFyRCxFQUE0REMsT0FBNUQ7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsU0FBU0ksU0FBVCxHQUFxQjtBQUNuQixNQUFJckIsZUFBZSxDQUFDQyxjQUFoQixLQUFtQyxZQUF2QyxFQUNFNUQsUUFBUSxDQUFDSyxJQUFULENBQWM0RSxXQUFkLENBQTBCakYsUUFBUSxDQUFDOEQsYUFBVCxDQUF1QixRQUF2QixDQUExQjs7QUFDRixNQUFJSCxlQUFlLENBQUNDLGNBQWhCLEtBQW1DLFNBQXZDLEVBQWtEO0FBQ2hELHVCQUFJNUQsUUFBUSxDQUFDa0YsZ0JBQVQsQ0FBMEIsT0FBMUIsQ0FBSixFQUF3Q0MsT0FBeEMsQ0FBZ0QsVUFBQ0MsSUFBRDtBQUFBLGFBQzlDcEYsUUFBUSxDQUFDSyxJQUFULENBQWM0RSxXQUFkLENBQTBCRyxJQUExQixDQUQ4QztBQUFBLEtBQWhEO0FBR0Q7QUFDRixDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBCaXJkIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgsIHggPSAxMDAsIHkgPSAxMDAsIHZlbFggPSAwLCB2ZWxZID0gMCwgcmFkaXVzID0gMTQsIGNvbG9yID0gXCJSRURcIikge1xuICAgICAgICB0aGlzLl9jdHggPSBjdHg7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMudmVsWCA9IHZlbFg7XG4gICAgICAgIHRoaXMudmVsWSA9IHZlbFk7XG4gICAgICAgIHRoaXMuX3JhZGl1cyA9IHJhZGl1cztcbiAgICAgICAgdGhpcy5fY29sb3IgPSBjb2xvcjtcblxuICAgICAgICB0aGlzLl9ncmF2aXR5ID0geyB4OiAwLCB5OiAwLjEgfTtcbiAgICAgICAgdGhpcy5fZ3JvdW5kID0gdGhpcy5fY3R4LmNhbnZhcy5oZWlnaHQ7XG4gICAgICAgIHRoaXMuX2JvdW5jZSA9IDEuMztcbiAgICB9XG5cbiAgICBkcmF3QmlyZChjdHgsIHgsIHkpIHtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuX2NvbG9yO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmMoeCwgeSwgdGhpcy5fcmFkaXVzLCAwLCAoTWF0aC5QSSAqIDIpLCBmYWxzZSk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVCaXJkKCkge1xuICAgICAgICB0aGlzLnZlbFggKz0gdGhpcy5fZ3Jhdml0eS54O1xuICAgICAgICB0aGlzLnZlbFkgKz0gdGhpcy5fZ3Jhdml0eS55O1xuICAgICAgICB0aGlzLnggKz0gdGhpcy52ZWxYO1xuICAgICAgICB0aGlzLnkgKz0gdGhpcy52ZWxZO1xuXG4gICAgICAgIGlmICh0aGlzLnkgPj0gdGhpcy5fZ3JvdW5kKSB7XG4gICAgICAgICAgICB0aGlzLnkgPSB0aGlzLl9ncm91bmQgLSAodGhpcy55IC0gdGhpcy5fZ3JvdW5kKTtcbiAgICAgICAgICAgIHRoaXMudmVsWSA9IC1NYXRoLmFicyh0aGlzLnZlbFkpICogdGhpcy5fYm91bmNlO1xuICAgICAgICAgICAgaWYgKHRoaXMudmVsWSA+PSB0aGlzLl9ncmF2aXR5LnkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlbFkgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuX2dyb3VuZCAtIHRoaXMuX2dyYXZpdHkueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFuaW1hdGUoY3R4KSB7XG4gICAgICAgIHRoaXMuZHJhd0JpcmQoY3R4KTtcbiAgICAgICAgdGhpcy51cGRhdGVCaXJkKCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCaXJkOyIsImNsYXNzIEJsb2NrIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgsIHgsIHksIHcgPSA0MCwgaCA9IDEwMCkge1xuICAgICAgICB0aGlzLl9jdHggPSBjdHg7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMudyA9IHc7XG4gICAgICAgIHRoaXMuaCA9IGg7XG4gICAgICAgIHRoaXMuciA9IDAuMTtcbiAgICAgICAgdGhpcy5keCA9IDA7XG4gICAgICAgIHRoaXMuZHkgPSAwO1xuICAgICAgICB0aGlzLmRyID0gMDtcbiAgICAgICAgdGhpcy5JTlNFVCA9IDEwO1xuICAgICAgICB0aGlzLlBJID0gTWF0aC5QSTtcbiAgICAgICAgdGhpcy5QSTkwID0gTWF0aC5QSSAvIDI7XG4gICAgICAgIHRoaXMuUEkyID0gTWF0aC5QSSAqIDI7XG4gICAgICAgIHRoaXMuV0FMTF9OT1JNUyA9IFsgTWF0aC5QSSAvIDIsIE1hdGguUEksIC0oTWF0aC5QSSAvIDIpLCAwXVxuICAgICAgICB0aGlzLl9ncm91bmQgPSB0aGlzLl9jdHguY2FudmFzLmhlaWdodCAtIDEwNTtcbiAgICAgICAgdGhpcy5tYXNzID0gdGhpcy5nZXRNYXNzKClcbiAgICB9XG5cbiAgICBhbmltYXRlKGN0eCkge1xuICAgICAgICBjdHguc2F2ZSgpXG4gICAgICAgIGN0eC5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7XG4gICAgICAgIHRoaXMudXBkYXRlQmxvY2soKTtcbiAgICAgICAgdGhpcy5kcmF3QmxvY2soY3R4KTtcbiAgICAgICAgY3R4LnJlc3RvcmUoKVxuXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCA0OyBpKyspe1xuICAgICAgICAgICAgdmFyIHAgPSB0aGlzLmdldFBvaW50KGkpO1xuICAgICAgICAgICAgLy8gb25seSBkbyBvbmUgY29sbGlzaW9uIHBlciBmcmFtZSBvciB3ZSB3aWxsIGVuZCB1cCBhZGRpbmcgZW5lcmd5XG4gICAgICAgICAgICBpZihwLnBvcy54IDwgdGhpcy5JTlNFVCl7XG4gICAgICAgICAgICAgICAgdGhpcy54ICs9ICh0aGlzLklOU0VUKSAtIHAucG9zLng7XG4gICAgICAgICAgICAgICAgdGhpcy5kb0NvbGxpc2lvbihwLDMpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKCBwLnBvcy54ID4gY3R4LmNhbnZhcy53aWR0aC10aGlzLklOU0VUKXtcbiAgICAgICAgICAgICAgICB0aGlzLnggKz0gKGN0eC5jYW52YXMud2lkdGggLSB0aGlzLklOU0VUKSAtIHAucG9zLng7XG4gICAgICAgICAgICAgICAgdGhpcy5kb0NvbGxpc2lvbihwLDEpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKHAucG9zLnkgPCB0aGlzLklOU0VUKXtcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gKHRoaXMuSU5TRVQpIC0gcC5wb3MueTtcbiAgICAgICAgICAgICAgICB0aGlzLmRvQ29sbGlzaW9uKHAsMClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoIHAucG9zLnkgPiBjdHguY2FudmFzLmhlaWdodCAtIHRoaXMuSU5TRVQpe1xuICAgICAgICAgICAgICAgIHRoaXMueSArPSAoY3R4LmNhbnZhcy5oZWlnaHQgLSB0aGlzLklOU0VUKSAtIHAucG9zLnk7XG4gICAgICAgICAgICAgICAgdGhpcy5kb0NvbGxpc2lvbihwLDIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRNYXNzKCkge1xuICAgICAgICByZXR1cm4gKCB0aGlzLncgKiB0aGlzLmggKiB0aGlzLmgpIC8gMTAwMDtcbiAgICB9XG5cbiAgICBkcmF3QmxvY2soY3R4KSB7XG4gICAgICAgIGN0eC5zZXRUcmFuc2Zvcm0oMSwwLDAsMSx0aGlzLngsdGhpcy55KTtcbiAgICAgICAgY3R4LnJvdGF0ZSh0aGlzLnIpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJCbHVlXCI7XG4gICAgICAgIGN0eC5maWxsUmVjdCgtdGhpcy53LzIsIC10aGlzLmgvMiwgdGhpcy53LCB0aGlzLmgpXG4gICAgICAgIGN0eC5zdHJva2VSZWN0KC10aGlzLncvMiwgLXRoaXMuaC8yLCB0aGlzLncsIHRoaXMuaClcbiAgICB9XG5cbiAgICB1cGRhdGVCbG9jaygpIHtcbiAgICAgICAgdGhpcy54ICs9IHRoaXMuZHg7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLmR5O1xuICAgICAgICB0aGlzLmR5ICs9IDAuMDYxO1xuICAgICAgICB0aGlzLnIgKz0gdGhpcy5kcjtcblxuICAgICAgICAvLyBpZiAodGhpcy55ID49IHRoaXMuX2dyb3VuZCkge1xuICAgICAgICAvLyAgICAgdGhpcy55ID0gdGhpcy5fZ3JvdW5kIFxuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgZ2V0UG9pbnQod2hpY2gpIHtcbiAgICAgICAgdmFyIGR4LCBkeSwgeCwgeSwgeHgsIHl5LCB2ZWxvY2l0eUEsIHZlbG9jaXR5VCwgdmVsb2NpdHk7XG5cbiAgICAgICAgZHggPSBNYXRoLmNvcyh0aGlzLnIpO1xuICAgICAgICBkeSA9IE1hdGguc2luKHRoaXMucik7XG5cbiAgICAgICAgc3dpdGNoICh3aGljaCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHggPSAtdGhpcy53IC8gMjtcbiAgICAgICAgICAgICAgICB5ID0gLXRoaXMuaCAvIDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgeCA9IHRoaXMudyAvIDI7XG4gICAgICAgICAgICAgICAgeSA9IC10aGlzLmggLyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHggPSB0aGlzLncgLyAyO1xuICAgICAgICAgICAgICAgIHkgPSB0aGlzLmggLyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHggPSAtdGhpcy53IC8gMjtcbiAgICAgICAgICAgICAgICB5ID0gdGhpcy5oIC8gMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICB4ID0gdGhpcy54O1xuICAgICAgICAgICAgICAgIHkgPSB0aGlzLnk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgeHggLCB5eTtcbiAgICAgICAgeHggPSB4ICogZHggKyB5ICogLWR5O1xuICAgICAgICB5eSA9IHggKiBkeSArIHkgKiBkeDtcblxuICAgICAgICB2YXIgZGV0YWlscyA9IHRoaXMuYXNQb2xhcih0aGlzLnZlY3Rvcih4eCwgeXkpKTtcblxuICAgICAgICB4eCArPSB0aGlzLng7XG4gICAgICAgIHl5ICs9IHRoaXMueTtcblxuICAgICAgICB2ZWxvY2l0eUEgPSB0aGlzLnBvbGFyKGRldGFpbHMubWFnICogdGhpcy5kciwgZGV0YWlscy5kaXIgKyB0aGlzLlBJOTApO1xuICAgICAgICB2ZWxvY2l0eVQgPSB0aGlzLnZlY3RvckFkZCh2ZWxvY2l0eSA9IHRoaXMudmVjdG9yKHRoaXMuZHgsIHRoaXMuZHkpLCB2ZWxvY2l0eUEpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2ZWxvY2l0eTogdmVsb2NpdHksXG4gICAgICAgICAgICB2ZWxvY2l0eVQ6IHZlbG9jaXR5VCxcbiAgICAgICAgICAgIHZlbG9jaXR5QSA6IHZlbG9jaXR5QSxcbiAgICAgICAgICAgIHBvczogdGhpcy52ZWN0b3IoeHgsIHl5KSxcbiAgICAgICAgICAgIHJhZGl1czogZGV0YWlscy5tYWdcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBvbGFyKG1hZyA9IDEsIGRpciA9IDApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGVQb2xhcih7ZGlyOiBkaXIsIG1hZzogbWFnfSlcbiAgICB9XG5cbiAgICB2ZWN0b3IoeCA9IDEsIHkgPSAwKSB7XG4gICAgICAgIHJldHVybiB7IHg6IHgsIHk6IHl9O1xuICAgIH1cblxuICAgIHZhbGlkYXRlUG9sYXIodmVjKSB7XG4gICAgICAgIGlmICh0aGlzLmlzUG9sYXIodmVjKSkge1xuICAgICAgICAgICAgaWYodmVjLm1hZyA8IDApe1xuICAgICAgICAgICAgICAgIHZlYy5tYWcgPSAtdmVjLm1hZztcbiAgICAgICAgICAgICAgICB2ZWMuZGlyICs9IHRoaXMuUEk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZlYztcbiAgICB9XG5cbiAgICBwb2xhclRvQ2FydChwVmVjLCByZXRWID0ge3g6IDAsIHk6IDB9KXtcbiAgICAgICAgcmV0Vi54ID0gTWF0aC5jb3MocFZlYy5kaXIpICogcFZlYy5tYWc7XG4gICAgICAgIHJldFYueSA9IE1hdGguc2luKHBWZWMuZGlyKSAqIHBWZWMubWFnO1xuICAgICAgICByZXR1cm4gcmV0VlxuICAgIH1cblxuICAgIGFzUG9sYXIodmVjKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQ2FydCh2ZWMpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYXJ0VG9Qb2xhcih2ZWMpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZlYy5tYWcgPCAwKSB7XG4gICAgICAgICAgICB2ZWMubWFnID0gLXZlYy5tYWc7XG4gICAgICAgICAgICB2ZWMuZGlyICs9IHRoaXMuUEk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZGlyOiB2ZWMuZGlyLCBtYWc6IHZlYy5tYWd9O1xuICAgIH1cblxuICAgIGlzQ2FydCh2ZWMpIHsgaWYodmVjLnggIT09IHVuZGVmaW5lZCAmJiB2ZWMueSAhPT0gdW5kZWZpbmVkKSB7IHJldHVybiB0cnVlOyB9IHJldHVybiBmYWxzZTsgfVxuICAgIGlzUG9sYXIodmVjKSB7IGlmKHZlYy5tYWcgIT09IHVuZGVmaW5lZCAmJiB2ZWMuZGlyICE9PSB1bmRlZmluZWQpIHsgcmV0dXJuIHRydWU7IH0gcmV0dXJuIGZhbHNlOyB9XG4gICAgYXNDYXJ0KHZlYykge1xuICAgICAgICBpZiAodGhpcy5pc1BvbGFyKHZlYykpIHtyZXR1cm4gdGhpcy5wb2xhclRvQ2FydCh2ZWMpfVxuICAgICAgICByZXR1cm4ge3g6IHZlYy54LCB5OiB2ZWMueX1cbiAgICB9XG4gICAgY2FydFRvUG9sYXIodmVjLCByZXRWID0ge2RpcjogMCwgbWFnOiAwfSkge1xuICAgICAgICByZXRWLmRpciA9IE1hdGguYXRhbjIodmVjLnksIHZlYy54KTtcbiAgICAgICAgcmV0Vi5tYWcgPSBNYXRoLmh5cG90KHZlYy54LCB2ZWMueSk7XG4gICAgICAgIHJldHVybiByZXRWO1xuICAgIH1cblxuICAgIHZlY3RvckFkZCh2ZWMxLCB2ZWMyKSB7XG4gICAgICAgIHZhciB2MSA9IHRoaXMuYXNDYXJ0KHZlYzEpO1xuICAgICAgICB2YXIgdjIgPSB0aGlzLmFzQ2FydCh2ZWMyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMudmVjdG9yKHYxLnggKyB2Mi54LCB2MS55ICsgdjIueSlcbiAgICB9XG5cbiAgICBhcHBseUZvcmNlKGZvcmNlLCBsb2MpIHtcbiAgICAgICAgdGhpcy52YWxpZGF0ZVBvbGFyKGZvcmNlKTtcbiAgICAgICAgdmFyIGwgPSB0aGlzLmFzQ2FydChsb2MpO1xuICAgICAgICB2YXIgdG9DZW50ZXIgPSB0aGlzLmFzUG9sYXIodGhpcy52ZWN0b3IodGhpcy54IC0gbC54LCB0aGlzLnkgLSBsLnkpKTtcbiAgICAgICAgdmFyIHBoZXRhID0gdG9DZW50ZXIuZGlyIC0gZm9yY2UuZGlyO1xuICAgICAgICB2YXIgRnYgPSBNYXRoLmNvcyhwaGV0YSkgKiBmb3JjZS5tYWc7XG4gICAgICAgIHZhciBGYSA9IE1hdGguc2luKHBoZXRhKSAqIGZvcmNlLm1hZztcbiAgICAgICAgdmFyIGFjY2VsID0gdGhpcy5hc1BvbGFyKHRvQ2VudGVyKTtcbiAgICAgICAgYWNjZWwubWFnID0gRnYgLyB0aGlzLm1hc3M7IFxuICAgICAgICB2YXIgZGVsdGFWID0gdGhpcy5hc0NhcnQoYWNjZWwpOyBcbiAgICAgICAgdGhpcy5keCArPSBkZWx0YVYueCBcbiAgICAgICAgdGhpcy5keSArPSBkZWx0YVYueVxuICAgICAgICB2YXIgYWNjZWxBID0gRmEgLyAodG9DZW50ZXIubWFnICAqIHRoaXMubWFzcyk7IFxuICAgICAgICB0aGlzLmRyICs9IGFjY2VsQTtcbiAgICB9XG5cbiAgICB2ZWN0b3JDb21wb25lbnRzRm9yRGlyKHZlYywgZGlyKSB7XG4gICAgICAgIHZhciB2ID0gdGhpcy5hc1BvbGFyKHZlYyk7IFxuICAgICAgICB2YXIgcGhldGEgPSB2LmRpciAtIGRpcjtcbiAgICAgICAgdmFyIEZ2ID0gTWF0aC5jb3MocGhldGEpICogdi5tYWc7XG4gICAgICAgIHZhciBGYSA9IE1hdGguc2luKHBoZXRhKSAqIHYubWFnO1xuXG4gICAgICAgIHZhciBkMSA9IGRpcjtcbiAgICAgICAgdmFyIGQyID0gZGlyICsgdGhpcy5QSTkwOyAgICBcbiAgICAgICAgaWYoRnYgPCAwKXtcbiAgICAgICAgICAgIGQxICs9IHRoaXMuUEk7XG4gICAgICAgICAgICBGdiA9IC1GdjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKEZhIDwgMCl7XG4gICAgICAgICAgICBkMiArPSB0aGlzLlBJO1xuICAgICAgICAgICAgRmEgPSAtRmE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFsb25nIDogdGhpcy5wb2xhcihGdixkMSksXG4gICAgICAgICAgICB0YW5nZW50IDogdGhpcy5wb2xhcihGYSxkMilcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBkb0NvbGxpc2lvbihwb2ludERldGFpbHMsIHdhbGxJbmRleCkge1xuICAgICAgICB2YXIgdnYgPSB0aGlzLmFzUG9sYXIocG9pbnREZXRhaWxzLnZlbG9jaXR5KTsgXG4gICAgICAgIHZhciB2YSA9IHRoaXMuYXNQb2xhcihwb2ludERldGFpbHMudmVsb2NpdHlBKTsgXG4gICAgICAgIHZhciB2dmMgPSB0aGlzLnZlY3RvckNvbXBvbmVudHNGb3JEaXIodnYsIHRoaXMuV0FMTF9OT1JNU1t3YWxsSW5kZXhdKTtcbiAgICAgICAgdmFyIHZhYyA9IHRoaXMudmVjdG9yQ29tcG9uZW50c0ZvckRpcih2YSwgdGhpcy5XQUxMX05PUk1TW3dhbGxJbmRleF0pO1xuXG4gICAgICAgIHZ2Yy5hbG9uZy5tYWcgKj0gMS4xODsgXG4gICAgICAgIHZhYy5hbG9uZy5tYWcgKj0gMS4xODsgXG5cbiAgICAgICAgdnZjLmFsb25nLm1hZyAqPSB0aGlzLm1hc3M7XG4gICAgICAgIHZhYy5hbG9uZy5tYWcgKj0gdGhpcy5tYXNzO1xuXG4gICAgICAgIHZ2Yy5hbG9uZy5kaXIgKz0gdGhpcy5QSTtcbiAgICAgICAgdmFjLmFsb25nLmRpciArPSB0aGlzLlBJO1xuXG4gICAgICAgIHZ2Yy50YW5nZW50Lm1hZyAqPSAwLjE4OyAgXG4gICAgICAgIHZhYy50YW5nZW50Lm1hZyAqPSAwLjE4O1xuICAgICAgICB2dmMudGFuZ2VudC5tYWcgKj0gdGhpcy5tYXNzICBcbiAgICAgICAgdmFjLnRhbmdlbnQubWFnICo9IHRoaXMubWFzc1xuICAgICAgICB2dmMudGFuZ2VudC5kaXIgKz0gdGhpcy5QSTsgXG4gICAgICAgIHZhYy50YW5nZW50LmRpciArPSB0aGlzLlBJO1xuXG4gICAgICAgIHRoaXMuYXBwbHlGb3JjZSh2dmMuYWxvbmcsIHBvaW50RGV0YWlscy5wb3MpICAgIFxuICAgICAgICB0aGlzLmFwcGx5Rm9yY2UodnZjLnRhbmdlbnQsIHBvaW50RGV0YWlscy5wb3MpICAgIFxuICAgICAgICB0aGlzLmFwcGx5Rm9yY2UodmFjLmFsb25nLCBwb2ludERldGFpbHMucG9zKSAgICBcbiAgICAgICAgdGhpcy5hcHBseUZvcmNlKHZhYy50YW5nZW50LCBwb2ludERldGFpbHMucG9zKSAgICBcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmxvY2siLCJjbGFzcyBDYW52YXMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGggLSA0MDA7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMuY2FudmFzLndpZHRoIC8gMjtcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIC8vIHRoaXMuY29vcmRzID0gWzUwLCAxMCwgMTUwLCAxMDBdO1xuICAgICAgICAvLyB0aGlzLmFuaW1hdGlvbkRpciA9IDE7XG4gICAgICAgIC8vIHRoaXMuZmlsbENvbG9yID0gYGdyZWVuYDtcbiAgICB9XG4gICAgY3JlYXRlQ2FudmFzKCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZCh0aGlzLmNhbnZhcyk7XG4gICAgICAgIHRoaXMuY2FudmFzLmNsYXNzTGlzdC5hZGQoXCJtYWluLWNhbnZhc1wiKVxuICAgIH1cblxuICAgIGNsZWFyQ2FudmFzKCkge1xuICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgfVxuLy8gICBkcmF3U3F1YXJlKCkge1xuLy8gICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMuZmlsbENvbG9yO1xuLy8gICAgIHRoaXMuY3R4LmZpbGxSZWN0KC4uLnRoaXMuY29vcmRzKTtcbi8vICAgfVxuLy8gICB1cGRhdGVTcXVhcmUoKSB7XG4vLyAgICAgdGhpcy5jb29yZHMgPSB0aGlzLmNvb3Jkcy5tYXAoKGNvb3JkKSA9PiAoY29vcmQgKz0gMSAqIHRoaXMuYW5pbWF0aW9uRGlyKSk7XG4vLyAgIH1cblxuLy8gICBjbGVhclNxdWFyZSgpIHtcbi8vICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4vLyAgIH1cblxuLy8gICByZXZlcnNlQW5pbWF0aW9uKCkge1xuLy8gICAgIHRoaXMuYW5pbWF0aW9uRGlyICo9IC0xO1xuLy8gICB9XG5cbi8vICAgc2V0Q29sb3IoY29sb3IpIHtcbi8vICAgICB0aGlzLmZpbGxDb2xvciA9IGNvbG9yO1xuLy8gICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3I7XG4vLyAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5maWx0ZXIgPSBgYnJpZ2h0bmVzcygxNTAlKWA7XG4vLyAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FudmFzO1xuIiwiY2xhc3MgUGlnIHtcbiAgICBjb25zdHJ1Y3RvcihjdHgsIHgsIHksIHZlbFggPSAwLCB2ZWxZID0gMCwgcmFkaXVzID0gMTUsIGNvbG9yID0gXCJPUkFOR0VcIikge1xuICAgICAgICB0aGlzLl9jdHggPSBjdHg7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMudmVsWCA9IHZlbFg7XG4gICAgICAgIHRoaXMudmVsWSA9IHZlbFk7XG4gICAgICAgIHRoaXMuX3JhZGl1cyA9IHJhZGl1cztcbiAgICAgICAgdGhpcy5fbWFzcyA9IDI7XG4gICAgICAgIHRoaXMuX2NvbG9yID0gY29sb3I7XG5cbiAgICAgICAgdGhpcy5fZ3Jhdml0eSA9IHsgeDogMCwgeTogMC4xIH07XG4gICAgICAgIHRoaXMuX2dyb3VuZCA9IHRoaXMuX2N0eC5jYW52YXMuaGVpZ2h0IC0gMjA7XG4gICAgICAgIHRoaXMuX2JvdW5jZSA9IDAuNDtcbiAgICAgICAgdGhpcy5fZnJpY3Rpb25YID0gMC45O1xuICAgICAgICB0aGlzLl9tYXNzID0gMjtcbiAgICB9XG5cbiAgICBkcmF3UGlnKGN0eCkge1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5fY29sb3I7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5fcmFkaXVzLCAwLCAoTWF0aC5QSSAqIDIpLCBmYWxzZSk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVQaWcoKSB7XG4gICAgICAgIHRoaXMudmVsWCArPSB0aGlzLl9ncmF2aXR5Lng7XG4gICAgICAgIHRoaXMudmVsWSArPSB0aGlzLl9ncmF2aXR5Lnk7XG4gICAgICAgIHRoaXMueCArPSB0aGlzLnZlbFg7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLnZlbFk7XG5cbiAgICAgICAgaWYgKHRoaXMueSA+PSB0aGlzLl9ncm91bmQpIHtcbiAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuX2dyb3VuZCAtICh0aGlzLnkgLSB0aGlzLl9ncm91bmQpO1xuICAgICAgICAgICAgdGhpcy52ZWxZID0gLU1hdGguYWJzKHRoaXMudmVsWSkgKiB0aGlzLl9ib3VuY2U7XG4gICAgICAgICAgICBpZiAodGhpcy52ZWxZID49IHRoaXMuX2dyYXZpdHkueSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmVsWSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0gdGhpcy5fZ3JvdW5kIC0gdGhpcy5fZ3Jhdml0eS55O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudmVsWCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlbFggLT0gdGhpcy5fZnJpY3Rpb25YO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudmVsWCA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlbFggKz0gdGhpcy5fZnJpY3Rpb25YO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHN0b3BzIGJhbGwgZnJvbSBib3VuY2luZyBpbiBZIGF4aXNcbiAgICAgICAgaWYgKHRoaXMudmVsWTwwICYmIHRoaXMudmVsWT4tMi4xKSB7XG4gICAgICAgICAgICB0aGlzLnZlbFkgPSAwO1xuICAgICAgICB9XG4gICAgICAgIC8vIHN0b3BzIGJhbGwgZnJvbSBtb3Zpbmcgb24gWCBheGlzIGlmIHgtdmVsb2NpdHkgPCAxLjFcbiAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMudmVsWCkgPCAxLjEpIHtcbiAgICAgICAgICAgIHRoaXMudmVsWCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbmltYXRlKGN0eCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVBpZygpO1xuICAgICAgICB0aGlzLmRyYXdQaWcoY3R4KTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUGlnOyIsImltcG9ydCBCaXJkIGZyb20gXCIuL2JpcmRcIjtcblxuY2xhc3MgUHJvamVjdGlsZSB7XG4gICAgY29uc3RydWN0b3IoY3R4KSB7XG4gICAgICAgIHRoaXMuX2N0eCA9IGN0eDtcbiAgICAgICAgdGhpcy5jb250ID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5sYXVuY2ggPSB0aGlzLmxhdW5jaC5iaW5kKHRoaXMpXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gTWF0aC5yYW5kb20oKSo3MDArMjA7XG4gICAgICAgIHRoaXMuYmlyZE9iamVjdHMgPSBbXTtcbiAgICAgICAgdGhpcy5tYXggPSAxO1xuICAgICAgICB0aGlzLmN1cnJlbnRCaXJkO1xuICAgIH1cblxuICAgIGxhdW5jaCgpIHtcbiAgICAgICAgbGV0IGFuZ2xlID0gTWF0aC5QSSo2MC4wLzE4MDtcbiAgICAgICAgbGV0IG1hZ25pdHVkZSA9IDI1LjU7XG5cbiAgICAgICAgY29uc3Qgb2JqTGF1bmNoID0gbmV3IE9iamVjdExhdW5jaCh0aGlzLl9jdHgsIDUsIDY5MCwgbmV3IEJpcmQodGhpcy5fY3R4KSk7XG4gICAgICAgIHRoaXMuYmlyZE9iamVjdHMucHVzaChvYmpMYXVuY2gpO1xuICAgICAgICBvYmpMYXVuY2gudmVsWSA9LSBtYWduaXR1ZGUgKiBNYXRoLnNpbihhbmdsZSk7XG4gICAgICAgIG9iakxhdW5jaC52ZWxYID0gbWFnbml0dWRlICogTWF0aC5jb3MoYW5nbGUpO1xuICAgICAgICBvYmpMYXVuY2gudHJhbnNmZXIgPSAwLjg7XG4gICAgfVxuXG4gICAgbGF1bmNoTG9vcChjdHgsIHBpZ3MpIHtcbiAgICAgICAgaWYgKHRoaXMuYmlyZE9iamVjdHMubGVuZ3RoID4gdGhpcy5tYXgpIHtcbiAgICAgICAgICAgIHRoaXMuYmlyZE9iamVjdHNbMF0ucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLmJpcmRPYmplY3RzID0gdGhpcy5iaXJkT2JqZWN0cy5zcGxpY2UoMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29udCkge1xuICAgICAgICAgICAgdGhpcy5sYXVuY2goKVxuICAgICAgICB9XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzU1NVwiO1xuICAgICAgICBjdHgubW92ZVRvKDAsNzAwKVxuICAgICAgICBjdHgubGluZVRvKDEwLDY4MClcbiAgICAgICAgY3R4LmxpbmVUbygxNSw2OTApXG4gICAgICAgIGN0eC5saW5lVG8oMCw3MDApXG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjMGYwXCI7XG4gICAgICAgIGN0eC5hcmModGhpcy50YXJnZXQsNzAxLDEwLDAsTWF0aC5QSSoyLHRydWUpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJpcmRPYmplY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudEJpcmQgPSB0aGlzLmJpcmRPYmplY3RzW2ldXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5jdXJyZW50QmlyZC5feSArIHRoaXMuY3VycmVudEJpcmQudHlwZS5yYWRpdXMgPj0gNzAwKSB7XG4gICAgICAgICAgICAvLyAgICAgaWYgKHRoaXMuYm91bmNlKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuY3VycmVudEJpcmQudmVsWSAqPSB0aGlzLmN1cnJlbnRCaXJkLnRyYW5zZmVyO1xuICAgICAgICAgICAgLy8gICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuY3VycmVudEJpcmQudmVsWCA9IDA7XG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuY3VycmVudEJpcmQudmVsWSA9IDA7XG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgY3VycmVudEJpcmQudmVsWSArPSAxLjUzO1xuICAgICAgICAgICAgY3VycmVudEJpcmQuX3ggKz0gY3VycmVudEJpcmQudmVsWCAvIDM7XG4gICAgICAgICAgICBjdXJyZW50QmlyZC5feSArPSBjdXJyZW50QmlyZC52ZWxZIC8gMztcblxuICAgICAgICAgICAgaWYgKGN1cnJlbnRCaXJkLl95ICsgY3VycmVudEJpcmQudHlwZS5yYWRpdXMgPiA3MDApIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50QmlyZC5feSA9IDcwMCAtIGN1cnJlbnRCaXJkLnR5cGUucmFkaXVzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VycmVudEJpcmQudXBkYXRlT2JqZWN0KHBpZ3MpXG4gICAgICAgICAgICBjdXJyZW50QmlyZC5kcmF3T2JqZWN0TGF1bmNoKHRoaXMuX2N0eCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbmltYXRlKGN0eCwgcGlncykge1xuICAgICAgICB0aGlzLmxhdW5jaExvb3AoY3R4LCBwaWdzKTtcbiAgICB9XG59XG5cbmNsYXNzIE9iamVjdExhdW5jaCB7XG4gICAgY29uc3RydWN0b3IoY3R4LCB4ID0gNTAsIHkgPSA1MCwgdHlwZSkge1xuICAgICAgICB0aGlzLl9jdHggPSBjdHg7XG4gICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgdGhpcy52ZWxYID0gMDtcbiAgICAgICAgdGhpcy52ZWxZID0gMDtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy50cmFuc2ZlciA9IDAuOTtcbiAgICAgICAgdGhpcy5yZW1vdmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2dyYXZpdHkgPSB7IHg6IDAsIHk6IDAuMSB9O1xuICAgICAgICB0aGlzLl9ncm91bmQgPSB0aGlzLl9jdHguY2FudmFzLmhlaWdodCAtIDIwO1xuICAgICAgICB0aGlzLl9ib3VuY2UgPSAwLjU7XG4gICAgICAgIHRoaXMuX2ZyaWN0aW9uWCA9IDAuOTtcbiAgICAgICAgdGhpcy5fbWFzcyA9IDI7XG4gICAgfVxuXG4gICAgcmVtb3ZlKCkge1xuICAgICAgICB0aGlzLnJlbW92ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGRyYXdPYmplY3RMYXVuY2goY3R4KSB7XG4gICAgICAgIHRoaXMudHlwZS5kcmF3QmlyZChjdHgsIHRoaXMuX3gsIHRoaXMuX3kpXG4gICAgfVxuXG4gICAgY2hlY2tCaXJkT25QaWdDb2xsaXNpb24ocGlncykge1xuICAgICAgICBpZiAocGlncykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwaWdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3ggKyB0aGlzLnR5cGUuX3JhZGl1cyArIHBpZ3NbaV0uX3JhZGl1cyA+IHBpZ3NbaV0ueFxuICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLl94IDwgcGlnc1tpXS54ICsgdGhpcy50eXBlLl9yYWRpdXMgKyBwaWdzW2ldLl9yYWRpdXNcbiAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5feSArIHRoaXMudHlwZS5fcmFkaXVzICsgcGlnc1tpXS5fcmFkaXVzID4gcGlnc1tpXS55XG4gICAgICAgICAgICAgICAgICAgICYmIHRoaXMuX3kgPCBwaWdzW2ldLnkgKyB0aGlzLnR5cGUuX3JhZGl1cyArIHBpZ3NbaV0uX3JhZGl1cykgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAvLyBweXRoYWdvcmVhbSB0aGVvcmVtIHRvIGJlIG1vcmUgZXhhY3Qgb24gY29sbGlzaW9uXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IE1hdGguc3FydChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKCh0aGlzLl94IC0gcGlnc1tpXS54KSAqICh0aGlzLl94IC0gcGlnc1tpXS54KSlcbiAgICAgICAgICAgICAgICAgICAgICAgICsgKCh0aGlzLl95IC0gcGlnc1tpXS55KSAqICh0aGlzLl95IC0gcGlnc1tpXS55KSlcbiAgICAgICAgICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXN0YW5jZSA8IHRoaXMudHlwZS5fcmFkaXVzICsgcGlnc1tpXS5fcmFkaXVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJpcmRPblBpZ0NvbGxpc2lvbkxvZ2ljKHBpZ3NbaV0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja0JpcmRPbkJsb2NrQ29sbGlzaW9uKCkge1xuICAgICAgICBcbiAgICB9XG5cbiAgICBiaXJkT25QaWdDb2xsaXNpb25Mb2dpYyhwaWcpIHtcbiAgICAgICAgY29uc3QgbWFzczEgPSB0aGlzLnR5cGUuX3JhZGl1cztcbiAgICAgICAgY29uc3QgbWFzczIgPSBwaWcuX3JhZGl1cztcbiAgICAgICAgaWYgKHBpZy52ZWxYID09PSAwKSBwaWcudmVsWCA9IDk7XG4gICAgICAgIC8vIGlmIChwaWcudmVsWSA9PT0gMCkgcGlnLnZlbFkgPSA2O1xuICAgICAgICAvLyBjb25zdCBwaWdWZWxYID0gcGlnLnZlbFg7XG4gICAgICAgIC8vIGNvbnN0IHBpZ1ZlbFkgPSBwaWcudmVsWTtcblxuICAgICAgICB0aGlzLnZlbFggPSAtdGhpcy52ZWxYO1xuICAgICAgICB0aGlzLnZlbFkgPSAtdGhpcy52ZWxZO1xuXG4gICAgICAgIHBpZy52ZWxYID0gLXBpZy52ZWxYO1xuICAgICAgICBwaWcudmVsWSA9IC1waWcudmVsWTtcbiAgICAgICAgXG4gICAgICAgIC8vIHRoaXMudmVsWCA9ICggdGhpcy52ZWxYICogKG1hc3MxIC0gbWFzczIpICsgKDIgKiBtYXNzMiAqIHBpZ1ZlbFgpKSAvIChtYXNzMSArIG1hc3MyKTtcbiAgICAgICAgLy8gdGhpcy52ZWxZID0gKCB0aGlzLnZlbFkgKiAobWFzczEgLSBtYXNzMikgKyAoMiAqIG1hc3MyICogcGlnVmVsWSkpIC8gKG1hc3MxICsgbWFzczIpO1xuICAgICAgICAvLyBwaWcudmVsWCA9ICggcGlnVmVsWCAqIChtYXNzMiAtIG1hc3MxKSArICgyICogbWFzczEgKiB0aGlzLnZlbFgpKSAvIChtYXNzMSArIG1hc3MyKTtcbiAgICAgICAgLy8gcGlnLnZlbFkgPSAoIHBpZ1ZlbFkgKiAobWFzczIgLSBtYXNzMSkgKyAoMiAqIG1hc3MxICogdGhpcy52ZWxZKSkgLyAobWFzczEgKyBtYXNzMik7XG4gICAgICAgIFxuICAgICAgICB0aGlzLl94ICs9IHRoaXMudmVsWDtcbiAgICAgICAgdGhpcy5feSArPSB0aGlzLnZlbFk7XG4gICAgICAgIHBpZy54ICs9IHBpZy52ZWxYO1xuICAgICAgICBwaWcueSArPSBwaWcudmVsWTtcbiAgICB9XG5cbiAgICB1cGRhdGVPYmplY3QocGlncykge1xuICAgICAgICB0aGlzLmNoZWNrQmlyZE9uUGlnQ29sbGlzaW9uKHBpZ3MpXG4gICAgICAgIHRoaXMudmVsWCArPSB0aGlzLl9ncmF2aXR5Lng7XG4gICAgICAgIHRoaXMudmVsWSArPSB0aGlzLl9ncmF2aXR5Lnk7XG4gICAgICAgIHRoaXMuX3ggKz0gdGhpcy52ZWxYO1xuICAgICAgICB0aGlzLl95ICs9IHRoaXMudmVsWTtcblxuICAgICAgICBpZiAodGhpcy5feSA+PSB0aGlzLl9ncm91bmQpIHtcbiAgICAgICAgICAgIHRoaXMuX3kgPSB0aGlzLl9ncm91bmQgLSAodGhpcy5feSAtIHRoaXMuX2dyb3VuZCk7XG4gICAgICAgICAgICB0aGlzLnZlbFkgPSAtTWF0aC5hYnModGhpcy52ZWxZKSAqIHRoaXMuX2JvdW5jZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnZlbFkgPj0gdGhpcy5fZ3Jhdml0eS55KSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWxZID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLl95ID0gdGhpcy5fZ3JvdW5kIC0gdGhpcy5fZ3Jhdml0eS55O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudmVsWCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlbFggLT0gdGhpcy5fZnJpY3Rpb25YO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMudmVsWCA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZlbFggKz0gdGhpcy5fZnJpY3Rpb25YO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHN0b3BzIGJhbGwgZnJvbSBib3VuY2luZyBpbiBZIGF4aXNcbiAgICAgICAgaWYgKCB0aGlzLl95ID49IHRoaXMuX2dyb3VuZCAtIDEwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy52ZWxZIDwgMCAmJiB0aGlzLnZlbFkgPiAtMS4xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZWxZID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBzdG9wcyBiYWxsIGZyb20gbW92aW5nIG9uIFggYXhpcyBpZiB4LXZlbG9jaXR5IDwgMS4xXG4gICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnZlbFgpIDwgMS4xKSB7XG4gICAgICAgICAgICB0aGlzLnZlbFggPSAwO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RpbGU7IiwiaW1wb3J0IFBpZyBmcm9tIFwiLi9waWdcIjtcbmltcG9ydCBCbG9jayBmcm9tIFwiLi9ibG9ja1wiO1xuXG5jbGFzcyBTdGFnZUxvYWRlciB7XG4gICAgY29uc3RydWN0b3IoIG51bWJlck9mUGlncyA9IDIsIHBpZ3NMb2NhdGlvbkFycmF5ID0gW1syMDAsIDYwMF0sIFs1MDAsIDYwMF1dLCBudW1iZXJvZkJsb2NrcyA9IDIsIGJsb2NrTG9jYXRpb25BcnJheSA9IFtbOTAwLCA3MDBdLCBbOTAwLCA0MDBdXSkge1xuICAgICAgICB0aGlzLm51bWJlck9mUGlncyA9IG51bWJlck9mUGlncztcbiAgICAgICAgdGhpcy5waWdzTG9jYXRpb25BcnJheSA9IHBpZ3NMb2NhdGlvbkFycmF5O1xuICAgICAgICB0aGlzLnBpZ3MgPSBbXTtcblxuICAgICAgICB0aGlzLm51bWJlcm9mQmxvY2tzID0gbnVtYmVyb2ZCbG9ja3M7XG4gICAgICAgIHRoaXMuYmxvY2tMb2NhdGlvbkFycmF5ID0gYmxvY2tMb2NhdGlvbkFycmF5O1xuICAgICAgICB0aGlzLmJsb2NrcyA9IFtdO1xuICAgIH1cblxuICAgIGRyYXdQaWdzKGN0eCkge1xuICAgICAgICBpZiAodGhpcy5waWdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBpZ3NMb2NhdGlvbkFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5waWdzLnB1c2gobmV3IFBpZyhjdHgsIHRoaXMucGlnc0xvY2F0aW9uQXJyYXlbaV1bMF0sIHRoaXMucGlnc0xvY2F0aW9uQXJyYXlbaV1bMV0pKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhd0Jsb2NrcyhjdHgpIHtcbiAgICAgICAgaWYgKHRoaXMuYmxvY2tzLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYmxvY2tMb2NhdGlvbkFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja3MucHVzaChuZXcgQmxvY2soY3R4LCB0aGlzLmJsb2NrTG9jYXRpb25BcnJheVtpXVswXSwgdGhpcy5ibG9ja0xvY2F0aW9uQXJyYXlbaV1bMV0pKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYW5pbWF0ZShjdHgpIHtcbiAgICAgICAgdGhpcy5kcmF3UGlncyhjdHgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGlncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5waWdzW2ldLmFuaW1hdGUoY3R4KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRyYXdCbG9ja3MoY3R4KTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYmxvY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmJsb2Nrc1tpXS5hbmltYXRlKGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0YWdlTG9hZGVyOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vc3R5bGVzL2luZGV4LnNjc3NcIjtcbmltcG9ydCBDYW52YXMgZnJvbSBcIi4vc2NyaXB0cy9jYW52YXNcIjtcbmltcG9ydCBQcm9qZWN0aWxlIGZyb20gXCIuL3NjcmlwdHMvcHJvamVjdGlsZVwiO1xuaW1wb3J0IFN0YWdlTG9hZGVyIGZyb20gXCIuL3NjcmlwdHMvc3RhZ2VMb2FkZXJcIjtcblxuY29uc3QgY3VycmVudFN0YXRlT2JqID0ge1xuICBjdXJyZW50RXhhbXBsZTogbnVsbCxcbiAgY3VycmVudEV2ZW50TGlzdGVuZXJzOiBbXSxcbn07XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FudmFzXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzdGFydENhbnZhcyk7XG5cbmZ1bmN0aW9uIHN0YXJ0Q2FudmFzKCkge1xuICAgIHVucmVnaXN0ZXJFdmVudExpc3RlbmVycygpO1xuICAgIGNvbnN0IGNhbnZhcyA9IG5ldyBDYW52YXMoKTtcbiAgICBjYW52YXMuY3JlYXRlQ2FudmFzKCk7XG4gICAgY29uc3QgcHJvamVjdGlsZSA9IG5ldyBQcm9qZWN0aWxlKGNhbnZhcy5jdHgpXG4gICAgY29uc3Qgc3RhZ2VMb2FkZXIgPSBuZXcgU3RhZ2VMb2FkZXIoKVxuXG4gICAgbGV0IGFuaW1hdGluZyA9IHRydWU7XG5cbiAgICBjb25zdCBhbmltYXRpb24gPSAoKSA9PiB7XG4gICAgICAgIGNhbnZhcy5jbGVhckNhbnZhcygpO1xuICAgICAgICBpZiAoYW5pbWF0aW5nKSB7XG4gICAgICAgICAgICBzdGFnZUxvYWRlci5hbmltYXRlKGNhbnZhcy5jdHgpXG4gICAgICAgICAgICBwcm9qZWN0aWxlLmFuaW1hdGUoY2FudmFzLmN0eCwgc3RhZ2VMb2FkZXIucGlncylcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGF1bmNoLWJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcHJvamVjdGlsZS5sYXVuY2gpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbik7XG5cbiAgICAvLyAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVLZXlEb3duKTtcbiAgICAvLyAgIGN1cnJlbnRTdGF0ZU9iai5jdXJyZW50RXZlbnRMaXN0ZW5lcnMucHVzaChbXG4gICAgLy8gICAgIFwid2luZG93XCIsXG4gICAgLy8gICAgIFwia2V5ZG93blwiLFxuICAgIC8vICAgICBoYW5kbGVLZXlEb3duLFxuICAgIC8vICAgXSk7XG5cbiAgICAvLyAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZU1vdXNlRG93bik7XG4gICAgLy8gICBjdXJyZW50U3RhdGVPYmouY3VycmVudEV2ZW50TGlzdGVuZXJzLnB1c2goW1xuICAgIC8vICAgICBcIndpbmRvd1wiLFxuICAgIC8vICAgICBcIm1vdXNlZG93blwiLFxuICAgIC8vICAgICBoYW5kbGVNb3VzZURvd24sXG4gICAgLy8gICBdKTtcblxuICAgIC8vICAgZnVuY3Rpb24gaGFuZGxlS2V5RG93bihldmVudCkge1xuICAgIC8vICAgICBpZiAoZXZlbnQud2hpY2ggPT09IDMyKSB7XG4gICAgLy8gICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAvLyAgICAgICBzcXVhcmVzLmZvckVhY2goKHNxKSA9PiBzcS5yZXZlcnNlQW5pbWF0aW9uKCkpO1xuICAgIC8vICAgICAgIGNhbnZhcy5zZXRDb2xvcihgIyR7TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTY3NzcyMTUpLnRvU3RyaW5nKDE2KX1gKTtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgfVxuXG4gICAgLy8gICBmdW5jdGlvbiBoYW5kbGVNb3VzZURvd24oZXZlbnQpIHtcbiAgICAvLyAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAvLyAgICAgc3F1YXJlcy5wdXNoKFxuICAgIC8vICAgICAgIG5ldyBTcXVhcmUoXG4gICAgLy8gICAgICAgICBjYW52YXMuY3R4LFxuICAgIC8vICAgICAgICAgY2FudmFzLmNvb3Jkcy5tYXAoKGNvKSA9PiBjbyArIDI1KSxcbiAgICAvLyAgICAgICAgIGNhbnZhcy5maWxsQ29sb3JcbiAgICAvLyAgICAgICApXG4gICAgLy8gICAgICk7XG4gICAgICAgIC8vIGFuaW1hdGluZyA9ICFhbmltYXRpbmc7XG4gICAgLy8gICB9XG59XG5cbmZ1bmN0aW9uIHVucmVnaXN0ZXJFdmVudExpc3RlbmVycygpIHtcbiAgd2hpbGUgKGN1cnJlbnRTdGF0ZU9iai5jdXJyZW50RXZlbnRMaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgbGV0IFtcbiAgICAgIHNlbGVjdG9yLFxuICAgICAgZXZlbnQsXG4gICAgICBoYW5kbGVyLFxuICAgIF0gPSBjdXJyZW50U3RhdGVPYmouY3VycmVudEV2ZW50TGlzdGVuZXJzLnBvcCgpO1xuICAgIGlmIChzZWxlY3RvciA9PT0gXCJ3aW5kb3dcIikge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIpO1xuICAgICAgY29uc29sZS5sb2coaGFuZGxlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjbGVhckRlbW8oKSB7XG4gIGlmIChjdXJyZW50U3RhdGVPYmouY3VycmVudEV4YW1wbGUgPT09IFwiQ0FOVkFTREVNT1wiKVxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhc1wiKSk7XG4gIGlmIChjdXJyZW50U3RhdGVPYmouY3VycmVudEV4YW1wbGUgPT09IFwiRE9NREVNT1wiKSB7XG4gICAgWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2FyZFwiKV0uZm9yRWFjaCgoZWxlbSkgPT5cbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZWxlbSlcbiAgICApO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9