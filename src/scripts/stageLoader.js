import Pig from "./pig";
import Block from "./block";

class StageLoader {
    constructor( numberOfPigs = 2, pigsLocationArray = [[200, 600], [500, 600]], numberofBlocks = 2, blockLocationArray = [[900, 700], [900, 400]]) {
        this.numberOfPigs = numberOfPigs;
        this.pigsLocationArray = pigsLocationArray;
        this.pigs = [];

        this.numberofBlocks = numberofBlocks;
        this.blockLocationArray = blockLocationArray;
        this.blocks = [];
    }

    drawPigs(ctx) {
        if (this.pigs.length === 0) {
            for (let i = 0; i < this.pigsLocationArray.length; i++) {
                this.pigs.push(new Pig(ctx, this.pigsLocationArray[i][0], this.pigsLocationArray[i][1]))
            }
        }
    }

    drawBlocks(ctx) {
        if (this.blocks.length === 0){
            for (let i = 0; i < this.blockLocationArray.length; i++) {
                this.blocks.push(new Block(ctx, this.blockLocationArray[i][0], this.blockLocationArray[i][1]))
            }
        }
    }

    animate(ctx) {
        this.drawPigs(ctx);
        for (let i = 0; i < this.pigs.length; i++) {
            this.pigs[i].animate(ctx);
        }
        
        this.drawBlocks(ctx);
        for (let i = 0; i < this.blocks.length; i++) {
            this.blocks[i].animate(ctx);
        }
    }
}

export default StageLoader;