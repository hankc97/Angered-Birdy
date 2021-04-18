import Pig from "./pig";
import Block from "./block";
import Projectile from "./projectile";
import {stageKeys} from "./stages/stageKeys";
import {checkBirdOnPigCollision, checkBirdOnBlockCollision} from "./util/collisionDetectionUtil";
import {birdOnPigCollisionLogic, birdOnBlockCollisionLogic} from "./util/collisionLogicUtil";

class StageLoader {
    constructor(ctx) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.score = 0;
        this.stageNumber = 1;
        // this.highscore using localStorage
        this.startPosBird = [];
        this.projectileObject = {};
        this.pigs = [];
        this.blocks = [];
    }

    initializeEventListeners() {
        const mouse = {
            x: this.canvas.width/2,
            y: this.canvas.height/2,
        }

        this.canvas.addEventListener('mouseup', function(e){
            let canvasProperties = this.canvas.getBoundingClientRect();
            mouse.x = e.x - canvasProperties.left;
            mouse.y = e.y - canvasProperties.top;
            let deltaX = mouse.x - this.startPosBird[0];
            let deltaY = mouse.y - this.startPosBird[1];
            let thetaRadian = Math.atan2(deltaY, deltaX);
            let angleVal = -((Math.abs(thetaRadian * 180 / Math.PI) - 270) % 90);
            let magnitudeVal = (Math.abs(mouse.x - 130) / 2);

            this.projectileObject.kickOffLaunchDirection(angleVal , magnitudeVal)
        }.bind(this))
    }

    initializeEntities() {
        const currentStageValues = stageKeys[this.stageNumber];
        this.loadStage(currentStageValues);
    }

    loadStage(currentStageValues) {
        this.projectileObject = new Projectile(this.ctx, currentStageValues["birdProperties"]);
        this.startPosBird = [currentStageValues["birdProperties"].x, currentStageValues["birdProperties"].y]

        for (let i = 0; i < currentStageValues["numberOfPigs"]; i++) {
            this.pigs.push(new Pig(
                this.ctx, 
                currentStageValues["pigProperties"][i].x, 
                currentStageValues["pigProperties"][i].y, 
                currentStageValues["pigProperties"][i].rad));
        }

        for (let i = 0; i < currentStageValues["numberOfBlocks"]; i++) {
            this.blocks.push(new Block(
                this.ctx, 
                currentStageValues["blockProperites"][i].x, 
                currentStageValues["blockProperites"][i].y,
                currentStageValues["blockProperites"][i].w,
                currentStageValues["blockProperites"][i].h));
        }
    }

    update() {
        this.updateEntities();
        if (this.projectileObject.objectLaunched) this.checkAndUpdateEntitiesCollision();
        this.renderEntities();
    }

    updateEntities() {
        this.projectileObject.update()
        for (let i = 0; i < this.pigs.length; i++) {
            this.pigs[i].update();
        }
        for (let i = 0; i < this.pigs.length; i++) {
            this.blocks[i].update();
        }
    }

    checkAndUpdateEntitiesCollision() {
        for (let i = 0; i < this.pigs.length; i++) {
            if (checkBirdOnPigCollision(this.projectileObject.currentProjectileObject, this.pigs[i])) {
                birdOnPigCollisionLogic(this.projectileObject.currentProjectileObject, this.pigs[i]);
                this.score += 3000;
            };
        }
        for (let i = 0; i < this.blocks.length; i++) {
            if (checkBirdOnBlockCollision(this.projectileObject.currentProjectileObject, this.blocks[i])) {
                birdOnBlockCollisionLogic(this.projectileObject.currentProjectileObject, this.blocks[i])
                this.score += 325;
            }
        }
    }

    renderEntities() {
        this.projectileObject.render()
        for (let i = 0; i < this.pigs.length; i++) {
            this.pigs[i].render();
        }
        for (let i = 0; i < this.pigs.length; i++) {
            this.blocks[i].render();
        }
        this.renderScore();
    }

    renderScore() { 
        this.ctx.textAlign = "right";
        this.ctx.textBaseline = "top";
        this.ctx.fillStyle = "WHITE";
        this.ctx.strokeStyle = "BLACK";
        this.ctx.font = 50 + "px Bangers";
        this.ctx.fillText(this.score, this.canvas.width - 30 / 2, 0)
        this.ctx.strokeText(this.score, this.canvas.width - 30 / 2, 0)
    }
}

export default StageLoader;