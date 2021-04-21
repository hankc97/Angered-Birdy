import "./styles/index.scss";
import AngeredBirds from "./scripts/game";

document.querySelector("#canvas").addEventListener("click", init);
document.querySelector(".reset-highscore").addEventListener("click", resetLocalStorage);
document.querySelector(".restart-button").addEventListener("click", restartGame);

function init() {
    new AngeredBirds().start();
}

function restartGame() {
    document.location.href = "";
}

function resetLocalStorage() {
    window.localStorage.clear();
}

