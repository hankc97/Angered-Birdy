import Bird from "./bird";
class Projectile {
    constructor(ctx, birdProperties) {
        this.ctx = ctx;
        this.launchedObjects = [];
        this.max = 1;
        this.birdProperties = birdProperties;
        this.projectileImage = new Image();
        this.projectileImage.src = "src/images/slingS.png";
        this.lives = new Image();
        this.lives.src = "src/images/angered-birdy.png";
        this.lastLiveTimer;
        this.indicatorImage = new Image();
        this.indicatorImage.src = "src/images/indictor.png";
    }

    kickOffLaunchDirection(angleVal, magnitudeVal) {
        let angle = Math.PI * angleVal / 180;
        this.currentProjectileObject = new Bird(this.ctx, this.birdProperties);
        this.objectLaunched = new ObjectLaunch(this.ctx, this.currentProjectileObject);
        this.objectLaunched.objectType.velY =- magnitudeVal * Math.sin(angle);
        this.objectLaunched.objectType.velX = magnitudeVal * Math.cos(angle);
        this.objectLaunched.objectType.transfer = 0.8;
        this.launchedObjects.push(this.objectLaunched);
        this.updateLives();
    }

    update() {
        if (this.launchedObjects.length > this.max) {
            this.launchedObjects = this.launchedObjects.splice(1);
        }
        for (let i = 0; i < this.launchedObjects.length; i++) {
            let currentObject = this.launchedObjects[i].objectType;
            currentObject.velY += 1.53;
            currentObject.x += currentObject.velX / 3;
            currentObject.y += currentObject.velY / 3;
        
            this.launchedObjects[i].updateCurrentLaunchedObject()
        }
    }

    render() {
        this.ctx.drawImage(this.projectileImage, this.birdProperties.x - 33, this.birdProperties.y - 20, 75, 140);
        for (let i = 0; i < this.launchedObjects.length; i++) {
            let currentBird = this.launchedObjects[i].objectType;
            currentBird.render();
        }
    }

    updateLives() {
        this.birdProperties.playerLives -= 1
    }

    renderLives() {
        for (let i = 10; i < this.birdProperties.playerLives * 50; i+=50) {
            this.ctx.beginPath();
            this.ctx.drawImage(this.lives, i , 50, 30, 30)
            this.ctx.closePath();
        }
    }

    renderIndictor() {
        if (!this.currentProjectileObject) {
            this.ctx.drawImage(this.indicatorImage, this.birdProperties.x - 85 , this.birdProperties.y  - 35, 140, 140 )
        }
    }

    lostAllProjectileObjects() {
        if (this.birdProperties.playerLives === 0 && this.currentProjectileObject.state === "endState") {
            var timestamp = new Date().getTime();
            if (this.lastLiveTimer === undefined) {
                this.lastLiveTimer = timestamp;
            }

            const elapsed = timestamp - this.lastLiveTimer;
            if (elapsed > 500) {
                return true;
            }
        }
    }
}

class ObjectLaunch {
    constructor(ctx, objectType) {
        this.ctx = ctx;
        this.objectType = objectType;
    }

    renderObjectLaunch() {
        this.objectType.render();
    }

    updateCurrentLaunchedObject() {
        let currentObject = this.objectType;
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
        }
        // stops ball from bouncing in Y axis
        if ( currentObject.y >= currentObject.ground - 10) {
            if (currentObject.velY <= 0 && currentObject.velY > -2.5) {
                currentObject.velY = 0;
                currentObject.state = "endState";
            }
        }
        // stops ball from moving on X axis 
        if (Math.abs(currentObject.velX) < 1.1) {
            currentObject.velX = 0;
        }
    }
}


export default Projectile;