import "./styles/index.scss";
import Canvas from "./scripts/canvas";
import Projectile from "./scripts/projectile";
import StageLoader from "./scripts/stageLoader";

const currentStateObj = {
  currentExample: null,
  currentEventListeners: [],
};

document.querySelector("#canvas").addEventListener("click", startCanvas);

function startCanvas() {
    unregisterEventListeners();
    const canvas = new Canvas();
    canvas.createCanvas();
    const projectile = new Projectile(canvas.ctx)
    const stageLoader = new StageLoader()

    let animating = true;

    const animation = () => {
        canvas.clearCanvas();
        if (animating) {
            stageLoader.animate(canvas.ctx)
            projectile.animate(canvas.ctx, stageLoader.pigs)
            document.querySelector("#launch-button").addEventListener("click", projectile.launch)
            
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
