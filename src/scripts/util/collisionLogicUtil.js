export const birdOnPigCollisionLogic = (pig, score) => {
    score += this.birdOnPigCollisionPoints;
    const mass1 = this.type._radius;
    const mass2 = pig._radius;
    if (pig.velX === 0) pig.velX = 9;

    this.velX = -this.velX;
    this.velY = -this.velY;
    pig.velX = -pig.velX;
    pig.velY = -pig.velY;

    this._x += this.velX;
    this._y += this.velY;
    pig.x += pig.velX;
    pig.y += pig.velY;
}

export const birdOnBlockCollisionLogic = (block, score) => {
    score += this.birdOnBlockCollisionPoints;
    this.velX = -this.velX;
    this.velY = -this.velY;

    this._x += this.velX;
    this._y += this.velY;
}

