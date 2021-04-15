import "./styles/index.scss";
import Canvas from "./scripts/canvas";
import Projectile from "./scripts/projectile";
import StageLoader from "./scripts/stageLoader";

// const currentStateObj = {
//   currentExample: null,
//   currentEventListeners: [],
// };

let deltaX, deltaY;
const centerX = 104.70;
const centerY = 455;
let score = 0;

document.querySelector("#canvas").addEventListener("click", startCanvas);

function startCanvas() {
    // unregisterEventListeners();
    const canvas = new Canvas();
    canvas.createCanvas();
    const canvasObj = canvas.canvas;
    let canvasPosition = canvasObj.getBoundingClientRect()
    const projectile = new Projectile(canvas.ctx, score);

    const mouse = {
        x: canvas.width/2,
        y: canvas.height/2,
    }
    
    canvasObj.addEventListener('mousedown', function(e) {
        mouse.x = e.x - canvasPosition.left;
        mouse.y = e.y - canvasPosition.top;

    })

    canvasObj.addEventListener('mouseup', function(e){
        mouse.x = e.x - canvasPosition.left;
        mouse.y = e.y - canvasPosition.top;

        deltaX = mouse.x - centerX;
        deltaY = mouse.y - centerY;
        let thetaRadian = Math.atan2(deltaY, deltaX);
        let degrees = -((Math.abs(thetaRadian * 180 / Math.PI) - 270) % 90);
        projectile.launch(degrees , (Math.abs(mouse.x - 130) / 2))
    })

    const stageLoader = new StageLoader()

    let animating = true;

    const animation = () => {
        canvas.clearCanvas();
        if (animating) {
            let img = new Image();
            img.src = "src/images/pixil-layer-Background.png";
            canvas.ctx.drawImage(img,90,570);
            stageLoader.animate(canvas.ctx)
            projectile.animate(canvas.ctx, stageLoader.pigs, stageLoader.blocks)
            drawScore(canvas.ctx, score);
            
            window.requestAnimationFrame(animation);
        }
    };

    window.requestAnimationFrame(animation);
}

function drawScore(ctx, score) { 
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    ctx.fillStyle = "WHITE";
    ctx.font = 50 + "px dejavu sans mono";
    ctx.fillText(score, ctx.canvas.width - 50 / 2, 0)
}

// function unregisterEventListeners() {
//   while (currentStateObj.currentEventListeners.length) {
//     let [
//       selector,
//       event,
//       handler,
//     ] = currentStateObj.currentEventListeners.pop();
//     if (selector === "window") {
//       window.removeEventListener(event, handler);
//       console.log(handler);
//     } else {
//       document.querySelector(selector).removeEventListener(event, handler);
//     }
//   }
// }

// function clearDemo() {
//   if (currentStateObj.currentExample === "CANVASDEMO")
//     document.body.removeChild(document.querySelector("canvas"));
//   if (currentStateObj.currentExample === "DOMDEMO") {
//     [...document.querySelectorAll(".card")].forEach((elem) =>
//       document.body.removeChild(elem)
//     );
//   }
// }
