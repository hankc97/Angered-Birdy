class Canvas {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = window.innerWidth - 400;
        this.canvas.height = this.canvas.width / 2;
        this.ctx = this.canvas.getContext("2d");
    }
    createCanvas() {
        document.body.append(this.canvas);
        this.canvas.classList.add("main-canvas")
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export default Canvas;
