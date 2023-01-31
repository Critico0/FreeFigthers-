class Figther extends Sprite {
    constructor({
        position ,
        velocity, 
        imagesrc, 
        scale = 1, 
        frameMax = 1, 
        offset ={x:0,y:0}, 
        sprites,
        attackbox={offset:{}, width:undefined, height: undefined}
    })
    {
    super({position ,imagesrc , scale , frameMax, offset })

        this.velocity = velocity;
        this.height = 150;
        this.width = 50;
        this.lastKey;
        this.attackbox={
            position: {
                x : this.position.x,
                y : this.position.y
            },
            offset: attackbox.offset,
            width: attackbox.width,
            height: attackbox.height
        };
        this.attacking= false
        this.health = 100;
        this.framesCurrent = 0;
        this.frameElapsed = 0;
        this.frameHold = 5;
        this.sprites = sprites

        for(const sprite in this.sprites){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imagesrc
        }
    }


    applyGravity(){
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y >= canvas.height - 35){
            this.velocity.y = 0
            this.position.y = 391.19
        }
        else{
            this.velocity.y += gravity
        }
    }

    attack(){
        this.swichSprites('attack1')
        this.attacking = true
        setTimeout(()=>{
            this.attacking = false
        },100)
    }

    swichSprites(sprite){
        if(this.image === this.sprites.attack1.image &&
            this.framesCurrent < this.sprites.attack1.frameMax -1
            ) return

        switch(sprite){
            case 'idle':
                if(this.image !== this.sprites.idle.image){
                this.image = this.sprites.idle.image
                this.frameMax = this.sprites.idle.frameMax
                this.framesCurrent = 0
                }
            break;
            case 'run':
                if(this.image !== this.sprites.run.image){
                this.image = this.sprites.run.image
                this.frameMax = this.sprites.run.frameMax
                this.framesCurrent = 0
                }
            break;
            case 'runleft':
                if(this.image !== this.sprites.runleft.image){
                this.image = this.sprites.runleft.image
                this.frameMax = this.sprites.runleft.frameMax
                this.framesCurrent = 0
                }
            break;
            case 'jump':
                if(this.image !== this.sprites.jump.image){
                this.image = this.sprites.jump.image
                this.frameMax = this.sprites.jump.frameMax
                this.framesCurrent = 0
                }
            break;
            case 'fall':
                if(this.image !== this.sprites.fall.image){
                this.image = this.sprites.fall.image
                this.frameMax = this.sprites.fall.frameMax
                this.framesCurrent = 0
                }
            break;
            case 'attack1':
                if(this.image !== this.sprites.attack1.image){
                this.image = this.sprites.attack1.image
                this.frameMax = this.sprites.attack1.frameMax
                this.framesCurrent = 0
                }
            break;
        }
    }


    update(){
        this.draw();
        this.position.x += this.velocity.x
        this.applyGravity();
        this.animeteFrames();
        
        this.attackbox.position.x = this.position.x + this.attackbox.offset.x
        this.attackbox.position.y = this.position.y + this.attackbox.offset.y
        
        //ctx.fillRect(this.attackbox.position.x,this.attackbox.position.y,this.attackbox.width,this.attackbox.height)
    
    }
}
