import Pig from "./pig";
import Block from "./block";
import Projectile from "./projectile";
import {stageKeys} from "./stages/stageKeys";
import {checkBirdOnPigCollision, checkBirdOnBlockCollision} from "./util/collisionDetectionUtil";
import {birdOnPigCollisionLogic, birdOnBlockCollisionLogic} from "./util/collisionLogicUtil";
import {checkBirdAndPigState} from "./util/stateLogic";

class StageLoader {
    constructor(ctx) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.score = 0;
        this.stageNumber = 1;
        this.startPosBird = [];
        this.projectileObject = {};
        this.pigs = [];
        this.blocks = [];
        this.clickedImage = new Image();
        this.clickedImage.src = "src/images/poof.png"
    }
    
    update() {
        this.updateEntities();
        if (this.projectileObject.objectLaunched) this.checkAndUpdateEntitiesCollision();
        this.renderEntities();
    }

    initializeEventListeners() {
        const mouse = {
            x: this.canvas.width/2,
            y: this.canvas.height/2,
        }

        this.canvas.addEventListener('mouseup', function(e){
            if ((this.projectileObject.launchedObjects.length === 0) || this.projectileObject.currentProjectileObject.state === "endState"){
                let canvasProperties = this.canvas.getBoundingClientRect();
                mouse.x = e.x - canvasProperties.left;
                mouse.y = e.y - canvasProperties.top;
                let deltaX = mouse.x - this.startPosBird[0];
                let deltaY = mouse.y - this.startPosBird[1];
                let thetaRadian = Math.atan2(deltaY, deltaX);
                let angleVal = -((Math.abs(thetaRadian * 180 / Math.PI) - 270) % 90);
                let magnitudeVal = (Math.abs(mouse.x - 130) / 2);
                console.log(mouse.x, mouse.y);
                this.projectileObject.kickOffLaunchDirection(angleVal , magnitudeVal);
            }
        }.bind(this))
    }

    initializeEntities() {
        const currentStageValues = stageKeys[this.stageNumber];
        this.loadStage(currentStageValues);
    }

    restartEntities() {
        this.score = 0;
        this.startPosBird = [];
        this.projectileObject.birdProperties.playerLives = this.startingLives;
        this.projectileObject = {};
        this.pigs = [];
        this.blocks = [];
    }

    loadStage(currentStageValues) {
        this.background = new Image();
        this.background.src = currentStageValues["backGroundImageKey"];
        this.projectileObject = new Projectile(this.ctx, currentStageValues["birdProperties"]);
        this.startingLives = currentStageValues["birdProperties"].playerLives;
        this.startPosBird = [currentStageValues["birdProperties"].x, currentStageValues["birdProperties"].y]
        this.currentLevelHighScoreKey = currentStageValues["currentLevelHighScoreKey"];

        let highScoreSaveKeyString = localStorage.getItem(this.currentLevelHighScoreKey);
        if (highScoreSaveKeyString === null){
            this.highScore = 0;
        } else {
            this.highScore = parseInt(highScoreSaveKeyString);
        }

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

    updateEntities() {
        this.projectileObject.update()
        for (let i = 0; i < this.pigs.length; i++) {
            this.pigs[i].update();
        }
        for (let i = 0; i < this.blocks.length; i++) {
            this.blocks[i].update();
        }
        if (this.projectileObject.currentProjectileObject) this.updatePigsLeft();
        this.updateHighScore();
    }

    updateHighScore() {
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem(this.currentLevelHighScoreKey, this.highScore);
        }
    }

    updatePigsLeft() {
        for (let i = 0; i < this.pigs.length; i++) {
            if (checkBirdAndPigState(this.projectileObject.currentProjectileObject.state, this.pigs[i].state)) {
                if (this.pigs[i].poofAnimationTimerBoolean()) {
                    this.pigs.splice(i, 1);
                }
            }
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
        this.renderBackground();
        this.projectileObject.render();
        this.projectileObject.renderIndictor();
        this.projectileObject.renderLives();
        for (let i = 0; i < this.pigs.length; i++) {
            this.pigs[i].render();
        }
        for (let i = 0; i < this.blocks.length; i++) {
            this.blocks[i].render();
        }
        this.renderScore();
        this.renderHighScore();
        this.renderStageNumber();
    }

    renderScore() { 
        this.ctx.textAlign = "right";
        this.ctx.textBaseline = "top";
        this.ctx.fillStyle = "WHITE";
        this.ctx.strokeStyle = "BLACK";
        this.ctx.font = 50 + "px Bangers";
        this.ctx.fillText(this.score, this.canvas.width - 30 / 2, 0)
        this.ctx.strokeText(this.score, this.canvas.width - 30 / 2, 0);

        this.ctx.textAlign = "right";
        this.ctx.textBaseline = "top";
        this.ctx.fillStyle = "WHITE";
        this.ctx.strokeStyle = "BLACK";
        this.ctx.font = 50 + "px Bangers";
        this.ctx.strokeText("Score:                      ", this.canvas.width - 30 / 2, 0);
    }

    renderHighScore() {
        this.ctx.textAlign = "right";
        this.ctx.textBaseline = "top";
        this.ctx.fillStyle = "WHITE";
        this.ctx.strokeStyle = "BLACK";
        this.ctx.font = 50 + "px Bangers";
        this.ctx.fillText(this.highScore, this.canvas.width - 30 / 2, 60);
        this.ctx.strokeText(this.highScore, this.canvas.width - 30 / 2, 60);

        this.ctx.textAlign = "right";
        this.ctx.textBaseline = "top";
        this.ctx.fillStyle = "WHITE";
        this.ctx.strokeStyle = "BLACK";
        this.ctx.font = 50 + "px Bangers";
        this.ctx.strokeText("Highscore:                      ", this.canvas.width - 30 / 2, 60);
    }

    renderStageNumber() {
        this.ctx.textAlign = "left";
        this.ctx.textBaseline = "top";
        this.ctx.fillStyle = "WHITE";
        this.ctx.strokeStyle = "BLACK";
        this.ctx.font = 30 + "px Bangers";
        this.ctx.fillText("Level " + this.stageNumber, 10, 10)
        this.ctx.strokeText("Level " + this.stageNumber,  10, 10);
    }

    renderBackground() {
        this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
    }

    checkStageWon() {
        return this.pigs.length === 0; 
    }

    checkStageLost() {
        return this.projectileObject.lostAllProjectileObjects()
    }

}

export default StageLoader;