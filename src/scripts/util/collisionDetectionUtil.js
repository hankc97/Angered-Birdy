export const checkBirdOnPigCollision = (pigs, score) => {
    if (pigs) {
        for (let i = 0; i < pigs.length; i++) {
            if (this._x + this.type._radius + pigs[i]._radius > pigs[i].x
                && this._x < pigs[i].x + this.type._radius + pigs[i]._radius
                && this._y + this.type._radius + pigs[i]._radius > pigs[i].y
                && this._y < pigs[i].y + this.type._radius + pigs[i]._radius) 
            {
                // pythagoream theorem to be more exact on collision
                let distance = Math.sqrt(
                      ((this._x - pigs[i].x) * (this._x - pigs[i].x))
                    + ((this._y - pigs[i].y) * (this._y - pigs[i].y))
                )

                if (distance < this.type._radius + pigs[i]._radius) {
                    this.birdOnPigCollisionLogic(pigs[i], score)
                }
            }
        }
    }
}

export const checkBirdOnBlockCollision = (blocks, score) => {
    if (blocks) {
        for (let i = 0; i < blocks.length; i++) {
            for (let j = 0; j < 4; j++){
                const circleCenter = [this._x, this._y];
                if (j + 1 === 4) {
                    if (this.checkBirdInterceptBlock(blocks[i].getPoint(j), blocks[i].getPoint(0), circleCenter, this.radius)) {
                        this.birdOnBlockCollisionLogic(blocks[i], score)
                    }
                } else {
                    if (this.checkBirdInterceptBlock(blocks[i].getPoint(j), blocks[i].getPoint(j + 1), circleCenter, this.radius)) {
                        this.birdOnBlockCollisionLogic(blocks[i], score)
                    }
                }
            }
        }
    }
}

export const checkBirdInterceptBlock = (pointA, pointB, circleCenter, radius) => {
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





