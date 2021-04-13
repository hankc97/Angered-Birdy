import "./styles/index.scss";
import Canvas from "./scripts/canvas";
import Projectile from "./scripts/projectile";
import StageLoader from "./scripts/stageLoader";

const currentStateObj = {
  currentExample: null,
  currentEventListeners: [],
};

let x, y;
let deltaX, deltaY;
const centerX = 134;
const centerY = 271;

document.querySelector("#canvas").addEventListener("click", startCanvas);

function startCanvas() {
    unregisterEventListeners();
    const canvas = new Canvas();
    canvas.createCanvas();
    const canvasObj = canvas.canvas;
    let canvasPosition = canvasObj.getBoundingClientRect()
    const projectile = new Projectile(canvas.ctx)

    const mouse = {
      x: canvas.width/2,
      y: canvas.height/2,
      click: false,
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
      console.log(Math.abs(mouse.x - 130))
      let thetaRadian = Math.atan2(deltaY, deltaX);
      let degrees = -((Math.abs(thetaRadian * 180 / Math.PI) - 270) % 90);
      // console.log(degrees)
      projectile.launch(degrees , Math.abs(mouse.x - 130))
    })

    const stageLoader = new StageLoader()

    let animating = true;

    const animation = () => {
        canvas.clearCanvas();
        if (animating) {
            
            let img = new Image();
            img.src = "src/images/pixil-layer-Background.png";
            canvas.ctx.drawImage(img,90,350);
            stageLoader.animate(canvas.ctx)
            projectile.animate(canvas.ctx, stageLoader.pigs, stageLoader.blocks)
            // document.querySelector("#launch-button").addEventListener("click", projectile.launch)

            window.requestAnimationFrame(animation);
        }
    };

    window.requestAnimationFrame(animation);

    //   window.addEventListener("keydown", handleKeyDown);
    //   currentStateObj.currentEventListeners.push([
    //     "window",
    //     "keydown",
    //     handleKeyDown,
    //   ]);

    //   window.addEventListener("mousedown", handleMouseDown);
    //   currentStateObj.currentEventListeners.push([
    //     "window",
    //     "mousedown",
    //     handleMouseDown,
    //   ]);

    //   function handleKeyDown(event) {
    //     if (event.which === 32) {
    //       event.preventDefault();
    //       squares.forEach((sq) => sq.reverseAnimation());
    //       canvas.setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    //     }
    //   }

    //   function handleMouseDown(event) {
    //     event.preventDefault();
    //     squares.push(
    //       new Square(
    //         canvas.ctx,
    //         canvas.coords.map((co) => co + 25),
    //         canvas.fillColor
    //       )
    //     );
        // animating = !animating;
    //   }
}


function unregisterEventListeners() {
  while (currentStateObj.currentEventListeners.length) {
    let [
      selector,
      event,
      handler,
    ] = currentStateObj.currentEventListeners.pop();
    if (selector === "window") {
      window.removeEventListener(event, handler);
      console.log(handler);
    } else {
      document.querySelector(selector).removeEventListener(event, handler);
    }
  }
}

function clearDemo() {
  if (currentStateObj.currentExample === "CANVASDEMO")
    document.body.removeChild(document.querySelector("canvas"));
  if (currentStateObj.currentExample === "DOMDEMO") {
    [...document.querySelectorAll(".card")].forEach((elem) =>
      document.body.removeChild(elem)
    );
  }
}
