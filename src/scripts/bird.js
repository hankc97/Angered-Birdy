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
    }

    drawBird(ctx, x, y) {
        ctx.fillStyle = this._color;
        ctx.beginPath();
        ctx.arc(x, y, this._radius, 0, (Math.PI * 2), false);
        ctx.closePath();
        ctx.fill();
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