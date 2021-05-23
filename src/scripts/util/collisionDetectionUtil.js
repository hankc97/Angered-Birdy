// ball collision detection from https://burakkanber.com/blog/modeling-physics-javascript-gravity-and-drag/
// block https://codereview.stackexchange.com/questions/192477/circle-line-segment-collisions
export const checkBirdOnPigCollision = (currentProjectileObject, pig) => {
    if (currentProjectileObject.x + currentProjectileObject.radius + pig.radius > pig.x
        && currentProjectileObject.x < pig.x + currentProjectileObject.radius + pig.radius
        && currentProjectileObject.y + currentProjectileObject.radius + pig.radius > pig.y
        && currentProjectileObject.y < pig.y + currentProjectileObject.radius + pig.radius) 
    {
        // pythagoream theorem to be more exact on collision
        let distance = Math.sqrt(
                ((currentProjectileObject.x - pig.x) * (currentProjectileObject.x - pig.x))
            + ((currentProjectileObject.y - pig.y) * (currentProjectileObject.y - pig.y))
        )
        return distance < currentProjectileObject.radius + pig.radius; 
    }
}

export const checkBirdOnBlockCollision = (currentProjectileObject, block) => {
    for (let j = 0; j < 4; j++){
        const circleCenter = [currentProjectileObject.x, currentProjectileObject.y];
        if (j + 1 === 4) {
            if (checkBirdInterceptBlock(block.getPoint(j), block.getPoint(0), circleCenter, currentProjectileObject.radius)) {
                return true;
            }
        } else {
            if (checkBirdInterceptBlock(block.getPoint(j), block.getPoint(j + 1), circleCenter, currentProjectileObject.radius)) {
                return true;
            }
        }
    }
}

const checkBirdInterceptBlock = (pointA, pointB, circleCenter, radius) => {
    let dist;
    const vel1X = pointB.pos.x - pointA.pos.x;
    const vel1Y = pointB.pos.y - pointA.pos.y;
    const vel2X = circleCenter[0] - pointA.pos.x;
    const vel2Y = circleCenter[1] - pointA.pos.y;
    const unit = (vel2X * vel1X + vel2Y * vel1Y) / (vel1Y * vel1Y + vel1X * vel1X);
    if (unit >= 0 && unit <= 1){
        dist = (pointA.pos.x  + vel1X * unit - circleCenter[0]) ** 2 + (pointA.pos.y + vel1Y * unit - circleCenter[1]) ** 2;
    } else {
        dist = unit < 0 ? 
            (pointA.pos.x - circleCenter[0]) ** 2 + (pointA.pos.y - circleCenter[1]) ** 2 :
            (pointB.pos.x - circleCenter[0]) ** 2 + (pointB.pos.y - circleCenter[1]) ** 2;
    }
    return dist < radius * radius;
}





