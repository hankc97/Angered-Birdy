class Bird {
    constructor(ctx, x = 100, y = 100, velX = 0, velY = 0, radius = 14, color = "RED") {
        this._ctx = ctx;
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this._radius = radius;
        this._color = color;

        this._gravity = { x: 0, y: 0.1 };
        this._ground = this._ctx.canvas.height;
        this._bounce = 1.3;
        this.bird = new Image();
        this.bird.src = "src/images/birds.png"
    }

    drawBird(ctx, x, y) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, this._radius, 0, (Math.PI * 2), false);
        ctx.clip();
        ctx.closePath();
        ctx.drawImage(this.bird, x - this._radius, y - this._radius, this._radius * 2, this._radius * 2)
        ctx.restore();
    }

    updateBird() {
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

    animate(ctx) {
        this.drawBird(ctx);
        this.updateBird();
    }
}

export default Bird;