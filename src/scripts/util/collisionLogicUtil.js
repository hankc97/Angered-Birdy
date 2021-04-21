export const birdOnPigCollisionLogic = (currentProjectileObject, pig) => {
    pig.state = "dead";
    let newVelX1 = (currentProjectileObject.velX * (currentProjectileObject.mass - pig.mass) + ( 2 * pig.mass * pig.velX)) / (currentProjectileObject.mass + pig.mass);
    let newVelY1 = (currentProjectileObject.velY * (currentProjectileObject.mass - pig.mass) + ( 2 * pig.mass * pig.velY)) / (currentProjectileObject.mass + pig.mass);
    let newVelX2 = (pig.velX * (pig.mass - currentProjectileObject.mass) + (2 * currentProjectileObject.mass * currentProjectileObject.velX)) / (currentProjectileObject.mass + pig.mass);
    let newVelY2 = (pig.velY * (pig.mass - currentProjectileObject.mass) + (2 * currentProjectileObject.mass * currentProjectileObject.velY)) / (currentProjectileObject.mass + pig.mass);
    
    currentProjectileObject.velX = -currentProjectileObject.velX;
    currentProjectileObject.velY = -currentProjectileObject.velY;
    pig.velX = newVelX2;
    pig.velY = newVelY2;

    currentProjectileObject.x = currentProjectileObject.x + newVelX1;
    currentProjectileObject.y = currentProjectileObject.y + newVelY1;
    pig.x = pig.x + newVelX2;
    pig.y = pig.y + newVelY2;
}

export const birdOnBlockCollisionLogic = (currentProjectileObject, block) => {
    currentProjectileObject.velX = -currentProjectileObject.velX;
    currentProjectileObject.velY = -currentProjectileObject.velY;
    let force = block.asPolar(block.vector(10, 10));
    force.mag *= block.mass * 0.1;
    block.applyForce(force, block.vector(currentProjectileObject.x, currentProjectileObject.y));
}


