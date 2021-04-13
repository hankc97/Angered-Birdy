import Bird from "./bird";

class Projectile {
    constructor(ctx) {
        this._ctx = ctx;
        this.cont = false;

        this.launch = this.launch.bind(this)
        this.target = Math.random()*700+20;
        this.birdObjects = [];
        this.max = 1;
        this.currentBird;
    }

    launch(angleVal, magVal) {
        let angle = Math.PI* angleVal /180;
        let magnitude = magVal;

        const objLaunch = new ObjectLaunch(this._ctx, 100, 650, new Bird(this._ctx));
        this.birdObjects.push(objLaunch);
        objLaunch.velY =- magnitude * Math.sin(angle);
        objLaunch.velX = magnitude * Math.cos(angle);
        objLaunch.transfer = 0.8;
    }

    launchLoop(ctx, pigs, blocks) {
        if (this.birdObjects.length > this.max) {
            this.birdObjects[0].remove();
            this.birdObjects = this.birdObjects.splice(1);
        }
        if (this.cont) {
            this.launch()
        }
        for (let i = 0; i < this.birdObjects.length; i++) {
            let currentBird = this.birdObjects[i]
            // if (this.currentBird._y + this.currentBird.type.radius >= 700) {
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
            currentBird.updateObject(pigs, blocks)
            currentBird.drawObjectLaunch(this._ctx);
        }
    }

    animate(ctx, pigs, blocks) {
        this.launchLoop(ctx, pigs, blocks);
    }
}

class ObjectLaunch {
    constructor(ctx, x = 50, y = 50, type) {
        this._ctx = ctx;
        this._x = x;
        this._y = y;
        this.velX = 0;
        this.velY = 0;
        this.type = type;
        this.transfer = 0.9;
        this.removed = false;
        this._gravity = { x: 0, y: 0.1 };
        this._ground = this._ctx.canvas.height - 20;
        this._bounce = 0.5;
        this._frictionX = 0.9;
        this._mass = 2;
        this.radius = 14;
        // this.bird = new Image();
        // this.bird.src = "/src/images/bird.png"
    }

    remove() {
        this.removed = true;
    }

    drawObjectLaunch(ctx) {
        this.type.drawBird(ctx, this._x, this._y)
    }

    checkBirdOnPigCollision(pigs) {
        if (pigs) {
            for (let i = 0; i < pigs.length; i++) {
                if (this._x + this.type._radius + pigs[i]._radius > pigs[i].x
                    && this._x < pigs[i].x + this.type._radius + pigs[i]._radius
                    && this._y + this.type._radius + pigs[i]._radius > pigs[i].y
                    && this._y < pigs[i].y + this.type._radius + pigs[i]._radius) 
                {
                    // pythagoream theorem to be more exact on collision
                    let distance = Math.sqrt(
                          ((this._x - pigs[i].x) * (this._x - pigs[i].x))
                        + ((this._y - pigs[i].y) * (this._y - pigs[i].y))
                    )

                    if (distance < this.type._radius + pigs[i]._radius) {
                        this.birdOnPigCollisionLogic(pigs[i])
                    }
                }
            }
        }
    }

    checkBirdOnBlockCollision(blocks) {
        if (blocks) {
            for (let i = 0; i < blocks.length; i++) {
                for (let j = 0; j < 4; j++){
                    const circleCenter = [this._x, this._y];
                    if (j + 1 === 4) {
                        if (this.checkBirdInterceptBlock(blocks[i].getPoint(j), blocks[i].getPoint(0), circleCenter, this.radius)) {
                            this.birdOnBlockCollisionLogic(blocks[i])
                        }
                    } else {
                        if (this.checkBirdInterceptBlock(blocks[i].getPoint(j), blocks[i].getPoint(j + 1), circleCenter, this.radius)) {
                            this.birdOnBlockCollisionLogic(blocks[i])
                        }
                    }
                }
                // if (checkBirdInterceptBlock(blocks[i]))
            }
        }
    }

    birdOnPigCollisionLogic(pig) {
        const mass1 = this.type._radius;
        const mass2 = pig._radius;
        if (pig.velX === 0) pig.velX = 9;
        // if (pig.velY === 0) pig.velY = 6;
        // const pigVelX = pig.velX;
        // const pigVelY = pig.velY;

        this.velX = -this.velX;
        this.velY = -this.velY;

        pig.velX = -pig.velX;
        pig.velY = -pig.velY;
        
        // this.velX = ( this.velX * (mass1 - mass2) + (2 * mass2 * pigVelX)) / (mass1 + mass2);
        // this.velY = ( this.velY * (mass1 - mass2) + (2 * mass2 * pigVelY)) / (mass1 + mass2);
        // pig.velX = ( pigVelX * (mass2 - mass1) + (2 * mass1 * this.velX)) / (mass1 + mass2);
        // pig.velY = ( pigVelY * (mass2 - mass1) + (2 * mass1 * this.velY)) / (mass1 + mass2);
        
        this._x += this.velX;
        this._y += this.velY;
        pig.x += pig.velX;
        pig.y += pig.velY;
    }

    birdOnBlockCollisionLogic(block) {
        this.velX = -this.velX;
        this.velY = -this.velY;

        this._x += this.velX;
        this._y += this.velY;
    }

    checkBirdInterceptBlock(pointA, pointB, circleCenter, radius) {
        let dist;
        const vel1X = pointB.pos.x - pointA.pos.x;
        const vel1Y = pointB.pos.y - pointA.pos.y;
        const vel2X = circleCenter[0] - pointA.pos.x;
        const vel2Y = circleCenter[1] - pointA.pos.y;
        const unit = (vel2X * vel1X + vel2Y * vel1Y) / (vel1Y * vel1Y + vel1X * vel1X);
        if (unit >= 0 && unit <= 1){
            dist = (pointA.pos.x  + vel1X * unit - circleCenter[0]) ** 2 + (pointA.pos.y + vel1Y * unit - circleCenter[1]) ** 2;
        } else {
            dist = unit < 0 ? 
                (pointA.pos.x - circleCenter[0]) ** 2 + (pointA.pos.y - circleCenter[1]) ** 2 :
                (pointB.pos.x - circleCenter[0]) ** 2 + (pointB.pos.y - circleCenter[1]) ** 2;
        }
        return dist < radius * radius;
    }

    updateObject(pigs, blocks) {
        this.checkBirdOnPigCollision(pigs)
        this.checkBirdOnBlockCollision(blocks)
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
        }
        // stops ball from bouncing in Y axis
        if ( this._y >= this._ground - 10) {
            if (this.velY < 0 && this.velY > -1.1) {
                this.velY = 0;
            }
        }
        // stops ball from moving on X axis if x-velocity < 1.1
        if (Math.abs(this.velX) < 1.1) {
            this.velX = 0;
        }
    }
}


export default Projectile;