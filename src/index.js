import "./styles/index.scss";
import AngeredBirds from "./scripts/game";

document.querySelector("#canvas").addEventListener("click", init);
document.querySelector(".reset-highscore").addEventListener("click", resetLocalStorage);

function init() {
    new AngeredBirds().start();
}

function resetLocalStorage() {
    window.localStorage.clear();
}

