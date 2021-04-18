// import "./styles/index.scss";
import Canvas from "./canvas";
import StageLoader from "./stageLoader";

class AngeredBirds {
    constructor() {
        this.animating = true;
    }

    start() {
        this.canvas = new Canvas()
        this.canvas.bindCanvasToDOM();
        this.initializeEntities();
        const animation = () => {
            this.canvas.clearCanvas();
            if (this.animating) {
                this.stageLoader.update();
                window.requestAnimationFrame(animation);
            }
        }
        window.requestAnimationFrame(animation);
    }

    initializeEntities() {
        this.stageLoader = new StageLoader(this.canvas.ctx);
        this.stageLoader.initializeEntities();
        this.stageLoader.initializeEventListeners();
    }

    gameOver() {
        // restart Game, after certain birdy shots
        // drop eventListeners and reattach DOM canvas node
    }
}

export default AngeredBirds;