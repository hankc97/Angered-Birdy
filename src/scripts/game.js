import "./styles/index.scss";
import Canvas from "./scripts/canvas";
import Projectile from "./scripts/projectile";
import StageLoader from "./scripts/stageLoader";

class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.score = 0;
        this.centerX = 104.70;
        this.centerY = 455;
        this.animating = true;
    }

    startGame() {
        const canvas = new Canvas()
        canvas.createCanvas();
        canvas.clearCanvas();


        if (this.animating) {
            let img = new Image();
            img.src = "src/images/pixil-layer-Background.png";
            canvas.ctx.drawImage(img,90,570);
            stageLoader.animate(canvas.ctx)
            projectile.animate(canvas.ctx, stageLoader.pigs, stageLoader.blocks)
            drawScore(canvas.ctx, score);
            
            window.requestAnimationFrame(animation);
        }
        window.requestAnimationFrame(animation);
    }

    drawScore(ctx, score) { 
        ctx.textAlign = "right";
        ctx.textBaseline = "top";
        ctx.fillStyle = "WHITE";
        ctx.font = 50 + "px dejavu sans mono";
        ctx.fillText(score, ctx.canvas.width - 50 / 2, 0)
    }

}