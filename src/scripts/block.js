class Block {
    constructor(ctx, x, y, w = 40, h = 100) {
        this._ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.r = 0.1;
        this.dx = 0;
        this.dy = 0;
        this.dr = 0;
        this.INSET = 10;
        this.PI = Math.PI;
        this.PI90 = Math.PI / 2;
        this.PI2 = Math.PI * 2;
        this.WALL_NORMS = [ Math.PI / 2, Math.PI, -(Math.PI / 2), 0]
        this._ground = this._ctx.canvas.height - 105;
        this.mass = this.getMass()
    }

    animate(ctx) {
        ctx.save()
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.updateBlock();
        this.drawBlock(ctx);
        ctx.restore()

        for(let i = 0; i < 4; i++){
            var p = this.getPoint(i);
            // only do one collision per frame or we will end up adding energy
            if(p.pos.x < this.INSET){
                this.x += (this.INSET) - p.pos.x;
                this.doCollision(p,3)
            }
            else if( p.pos.x > ctx.canvas.width-this.INSET){
                this.x += (ctx.canvas.width - this.INSET) - p.pos.x;
                this.doCollision(p,1)
            }
            else if(p.pos.y < this.INSET){
                this.y += (this.INSET) - p.pos.y;
                this.doCollision(p,0)
            }
            else if( p.pos.y > ctx.canvas.height - this.INSET){
                this.y += (ctx.canvas.height - this.INSET) - p.pos.y;
                this.doCollision(p,2)
            }
        }
    }

    getMass() {
        return ( this.w * this.h * this.h) / 1000;
    }

    drawBlock(ctx) {
        ctx.setTransform(1,0,0,1,this.x,this.y);
        ctx.rotate(this.r);
        ctx.fillStyle = "Blue";
        ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h)
        ctx.strokeRect(-this.w/2, -this.h/2, this.w, this.h)
    }

    updateBlock() {
        this.x += this.dx;
        this.y += this.dy;
        this.dy += 0.061;
        this.r += this.dr;

        // if (this.y >= this._ground) {
        //     this.y = this._ground 
        // }
    }

    getPoint(which) {
        var dx, dy, x, y, xx, yy, velocityA, velocityT, velocity;

        dx = Math.cos(this.r);
        dy = Math.sin(this.r);

        switch (which) {
            case 0:
                x = -this.w / 2;
                y = -this.h / 2;
                break;
            case 1:
                x = this.w / 2;
                y = -this.h / 2;
                break;
            case 2:
                x = this.w / 2;
                y = this.h / 2;
                break;
            case 3:
                x = -this.w / 2;
                y = this.h / 2;
                break;
            case 4:
                x = this.x;
                y = this.y;
        }

        var xx , yy;
        xx = x * dx + y * -dy;
        yy = x * dy + y * dx;

        var details = this.asPolar(this.vector(xx, yy));

        xx += this.x;
        yy += this.y;

        velocityA = this.polar(details.mag * this.dr, details.dir + this.PI90);
        velocityT = this.vectorAdd(velocity = this.vector(this.dx, this.dy), velocityA);

        return {
            velocity: velocity,
            velocityT: velocityT,
            velocityA : velocityA,
            pos: this.vector(xx, yy),
            radius: details.mag
        }
    }

    polar(mag = 1, dir = 0) {
        return this.validatePolar({dir: dir, mag: mag})
    }

    vector(x = 1, y = 0) {
        return { x: x, y: y};
    }

    validatePolar(vec) {
        if (this.isPolar(vec)) {
            if(vec.mag < 0){
                vec.mag = -vec.mag;
                vec.dir += this.PI;
            }
        }
        return vec;
    }

    polarToCart(pVec, retV = {x: 0, y: 0}){
        retV.x = Math.cos(pVec.dir) * pVec.mag;
        retV.y = Math.sin(pVec.dir) * pVec.mag;
        return retV
    }

    asPolar(vec) {
        if (this.isCart(vec)) {
            return this.cartToPolar(vec)
        }
        if (vec.mag < 0) {
            vec.mag = -vec.mag;
            vec.dir += this.PI;
        }
        return { dir: vec.dir, mag: vec.mag};
    }

    isCart(vec) { if(vec.x !== undefined && vec.y !== undefined) { return true; } return false; }
    isPolar(vec) { if(vec.mag !== undefined && vec.dir !== undefined) { return true; } return false; }
    asCart(vec) {
        if (this.isPolar(vec)) {return this.polarToCart(vec)}
        return {x: vec.x, y: vec.y}
    }
    cartToPolar(vec, retV = {dir: 0, mag: 0}) {
        retV.dir = Math.atan2(vec.y, vec.x);
        retV.mag = Math.hypot(vec.x, vec.y);
        return retV;
    }

    vectorAdd(vec1, vec2) {
        var v1 = this.asCart(vec1);
        var v2 = this.asCart(vec2);
        return this.vector(v1.x + v2.x, v1.y + v2.y)
    }

    applyForce(force, loc) {
        this.validatePolar(force);
        var l = this.asCart(loc);
        var toCenter = this.asPolar(this.vector(this.x - l.x, this.y - l.y));
        var pheta = toCenter.dir - force.dir;
        var Fv = Math.cos(pheta) * force.mag;
        var Fa = Math.sin(pheta) * force.mag;
        var accel = this.asPolar(toCenter);
        accel.mag = Fv / this.mass; 
        var deltaV = this.asCart(accel); 
        this.dx += deltaV.x 
        this.dy += deltaV.y
        var accelA = Fa / (toCenter.mag  * this.mass); 
        this.dr += accelA;
    }

    vectorComponentsForDir(vec, dir) {
        var v = this.asPolar(vec); 
        var pheta = v.dir - dir;
        var Fv = Math.cos(pheta) * v.mag;
        var Fa = Math.sin(pheta) * v.mag;

        var d1 = dir;
        var d2 = dir + this.PI90;    
        if(Fv < 0){
            d1 += this.PI;
            Fv = -Fv;
        }

        if(Fa < 0){
            d2 += this.PI;
            Fa = -Fa;
        }
        return {
            along : this.polar(Fv,d1),
            tangent : this.polar(Fa,d2)
        };
    }

    doCollision(pointDetails, wallIndex) {
        var vv = this.asPolar(pointDetails.velocity); 
        var va = this.asPolar(pointDetails.velocityA); 
        var vvc = this.vectorComponentsForDir(vv, this.WALL_NORMS[wallIndex]);
        var vac = this.vectorComponentsForDir(va, this.WALL_NORMS[wallIndex]);

        vvc.along.mag *= 1.18; 
        vac.along.mag *= 1.18; 

        vvc.along.mag *= this.mass;
        vac.along.mag *= this.mass;

        vvc.along.dir += this.PI;
        vac.along.dir += this.PI;

        vvc.tangent.mag *= 0.18;  
        vac.tangent.mag *= 0.18;
        vvc.tangent.mag *= this.mass  
        vac.tangent.mag *= this.mass
        vvc.tangent.dir += this.PI; 
        vac.tangent.dir += this.PI;

        this.applyForce(vvc.along, pointDetails.pos)    
        this.applyForce(vvc.tangent, pointDetails.pos)    
        this.applyForce(vac.along, pointDetails.pos)    
        this.applyForce(vac.tangent, pointDetails.pos)    
    }
}

export default Block