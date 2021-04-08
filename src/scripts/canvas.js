class Canvas {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = window.innerWidth - 400;
        this.canvas.height = this.canvas.width / 2;
        this.ctx = this.canvas.getContext("2d");
        // this.coords = [50, 10, 150, 100];
        // this.animationDir = 1;
        // this.fillColor = `green`;
    }
    createCanvas() {
        document.body.append(this.canvas);
        this.canvas.classList.add("main-canvas")
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
//   drawSquare() {
//     this.ctx.fillStyle = this.fillColor;
//     this.ctx.fillRect(...this.coords);
//   }
//   updateSquare() {
//     this.coords = this.coords.map((coord) => (coord += 1 * this.animationDir));
//   }

//   clearSquare() {
//     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
//   }

//   reverseAnimation() {
//     this.animationDir *= -1;
//   }

//   setColor(color) {
//     this.fillColor = color;
//     document.body.style.backgroundColor = color;
//     document.body.style.filter = `brightness(150%)`;
//   }
}

export default Canvas;
