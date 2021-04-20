class Bird {
    constructor(ctx, birdProperties) {
        this.ctx = ctx;
        this.x = birdProperties.x;
        this.y = birdProperties.y;
        this.radius = birdProperties.rad;
        this.mass = 2;
        this.velX = 0;
        this.velY = 0;
        this.transfer = 0.9;
        this.gravity = { x: 0, y: 0.1 };
        this.ground = this.ctx.canvas.height - 20;
        this.bounce = 0.5;
        this.frictionX = 0.9;
        this.bird = new Image();
        this.bird.src = "src/images/angered-birdy.png"
        this.state = "startState";
    }

    render() {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, (Math.PI * 2), false);
        this.ctx.clip();
        this.ctx.closePath();
        this.ctx.drawImage(this.bird, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2)
        this.ctx.restore();
    }
}

export default Bird;