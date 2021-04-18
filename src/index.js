import "./styles/index.scss";
import AngeredBirds from "./scripts/game";

document.querySelector("#canvas").addEventListener("click", init);
function init() {
    new AngeredBirds().start();
}

