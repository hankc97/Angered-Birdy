class Pig {
    constructor(ctx, x, y, radius, velX = 0, velY = 0) {
        this.ctx = ctx;
        this.x = x; 
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.radius = radius;
        this.mass = 2;

        this.gravity = { x: 0, y: 0.1 };
        this.ground = this.ctx.canvas.height - 20;
        this.bounce = 0.4;
        this.frictionX = 0.9;
        this.mass = 2;
        this.pig = new Image();
        this.pig.src = "src/images/peppa.png"
    }

    render() {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), false);
        this.ctx.clip();
        this.ctx.closePath();
        this.ctx.drawImage(this.pig, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        this.ctx.restore();
    }

    update() {
        this.velX += this.gravity.x;
        this.velY += this.gravity.y;
        this.x += this.velX;
        this.y += this.velY;
        
        if (this.y >= this.ground) {
            this.y = this.ground - (this.y - this.ground);
            this.velY = -Math.abs(this.velY) * this.bounce;
            if (this.velY >= this.gravity.y) {
                this.velY = 0;
                this.y = this.ground - this.gravity.y;
            }
            if (this.velX > 0) {
                this.velX -= this.frictionX;
            }
            if (this.velX < 0) {
                this.velX += this.frictionX;
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
}


export default Pig;