class Canvas {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = 1400;
        this.canvas.height = 750;
        this.ctx = this.canvas.getContext("2d");
        this.bindCanvasToDOM()
    }

    bindCanvasToDOM() {
        if (document.querySelector(".main-canvas") !== null) {
            this.clearCanvas();
            return;
        }
        document.body.append(this.canvas);
        this.canvas.classList.add("main-canvas")
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export default Canvas;
