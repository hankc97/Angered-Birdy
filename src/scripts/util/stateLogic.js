export const checkBirdAndPigState = (currentProjectileObjectState, pigState) => {
    if (currentProjectileObjectState === "endState" && pigState === "dead") return true;
}
