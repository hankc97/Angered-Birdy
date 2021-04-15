class Pig {
    constructor(ctx, x, y, velX = 0, velY = 0, radius = 15, color = "ORANGE") {
        this._ctx = ctx;
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this._radius = radius;
        this._mass = 2;
        this._color = color;

        this._gravity = { x: 0, y: 0.1 };
        this._ground = this._ctx.canvas.height - 20;
        this._bounce = 0.4;
        this._frictionX = 0.9;
        this._mass = 2;
        this.pig = new Image();
        this.pig.src = "src/images/peppa.png"
    }

    drawPig(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this._radius, 0, (Math.PI * 2), false);
        ctx.clip();
        ctx.closePath();
        ctx.drawImage(this.pig, this.x - this._radius, this.y - this._radius, this._radius * 2, this._radius * 2);
        ctx.restore();
    }

    updatePig() {
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
        }
        // stops ball from bouncing in Y axis
        if (this.velY<0 && this.velY>-2.1) {
            this.velY = 0;
        }
        // stops ball from moving on X axis if x-velocity < 1.1
        if (Math.abs(this.velX) < 1.1) {
            this.velX = 0;
        }
    }

    animate(ctx) {
        this.updatePig();
        this.drawPig(ctx);
    }
}


export default Pig;