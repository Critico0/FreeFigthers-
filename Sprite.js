class Sprite {
    constructor({position , imagesrc, scale = 1, frameMax = 1, offset = {x:0,y:0}})
    {
        this.position = position;
        this.height = 150;
        this.width = 50;
        this.image = new Image();
        this.image.src = imagesrc;
        this.scale = scale;
        this.frameMax = frameMax;
        this.framesCurrent = 0;
        this.frameElapsed = 0;
        this.frameHold = 1;
        this.offset = offset
    }

    draw(){
        ctx.drawImage(
            this.image, 
            this.framesCurrent * (this.image.width / this.frameMax),
            0,
            this.image.width / this.frameMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.frameMax) * this.scale,
            this.image.height * this.scale
            );
    }

    animeteFrames(){
        
        this.frameElapsed ++

        if(this.frameElapsed % this.frameHold === 0){
            if(this.framesCurrent < this.frameMax -1){
                this.framesCurrent ++
            }else{
                this.framesCurrent = 0
            }
        }
    }

    update(){
        this.draw();

    }
}