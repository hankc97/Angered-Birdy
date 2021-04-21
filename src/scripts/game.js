// import "./styles/index.scss";
import Canvas from "./canvas";
import StageLoader from "./stageLoader";

class AngeredBirds {
    constructor() {
        this.start = this.start.bind(this);
    }

    start() {
        const that = this;
        this.animating = true;
        this.canvas = new Canvas();
        this.canvas.bindCanvasToDOM();
        this.initializeEntities();
        this.animation = () => {
            this.canvas.clearCanvas();
            if (this.animating) {
                this.stageLoader.update();
                this.interval = window.requestAnimationFrame(this.animation);
                if (that.stageLoader.checkStageLost()) {
                    that.gameOver();
                }
            }
        }
        window.requestAnimationFrame(this.animation);
    }

    initializeEntities() {
        this.stageLoader = new StageLoader(this.canvas.ctx);
        this.stageLoader.initializeEntities();
        this.stageLoader.initializeEventListeners();
    }

    winLevel() {
        // increase stageLoader.stageNumber += 1;
    }

    gameOver() {
        this.stageLoader.restartEntities();
        this.stageLoader.initializeEntities();
    }
}

export default AngeredBirds;