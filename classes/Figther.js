class Figther extends Sprite {
    constructor({
        position ,
        doubleHit,
        velocity, 
        imagesrc, 
        scale = 1, 
        frameMax = 1, 
        hitFrame,
        offset ={x:0,y:0}, 
        sprites,
        attackbox={offset:{}, width:undefined, height: undefined},
        lastDirection
    })
    {
    super({position ,imagesrc , scale , frameMax, offset })

        this.velocity = velocity;
        this.height = 150;
        this.width = 50;
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
        this.sprites = sprites;
        this.dead = false;
        this.doubleHit = doubleHit;
        this.hitFrame = hitFrame;
        this.lastDirection = lastDirection;

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
        if(this.lastDirection === 'right'){
        if(this.doubleHit ){
            this.swichSprites('attack2')
            setTimeout(()=>{
                this.doubleHit = false
            },1000)
        }else{
            this.swichSprites('attack1')
        }
    }
        if(this.lastDirection === 'left'){
            if(this.doubleHit){
                this.swichSprites('attack2left')
                setTimeout(()=>{
                    this.doubleHit = false
                },1000)
            }else{
                this.swichSprites('attack1left')
            }
    }
        this.attacking = true
    
}

    takeHit(){
        if(this.lastDirection === 'left'){
            this.swichSprites('takehitleft')
        }else{
            this.swichSprites('takehit')
        }
        this.health -= 20
    }

    swichSprites(sprite){
        if(this.image === this.sprites.attack1.image &&
            this.framesCurrent < this.sprites.attack1.frameMax -1
            ) return
            if(this.image === this.sprites.attack1left.image &&
                this.framesCurrent < this.sprites.attack1left.frameMax -1
                ) return
            if(this.image === this.sprites.attack2.image &&
                this.framesCurrent < this.sprites.attack2.frameMax -1
                ) return
                if(this.image === this.sprites.attack2left.image &&
                    this.framesCurrent < this.sprites.attack2left.frameMax -1
                    ) return
        if(this.image === this.sprites.takehit.image &&
            this.framesCurrent < this.sprites.takehit.frameMax -1
            ) return
            if(this.image === this.sprites.takehitleft.image &&
                this.framesCurrent < this.sprites.takehitleft.frameMax -1
                ) return
        if(this.image === this.sprites.death.image){
            (this.framesCurrent < this.sprites.death.frameMax -1)
            this.dead = true
             return}
             if(this.image === this.sprites.deathleft.image){
                (this.framesCurrent < this.sprites.deathleft.frameMax -1)
                this.dead = true
                 return}

        switch(sprite){
            case 'idle':
                if(this.image !== this.sprites.idle.image){
                this.image = this.sprites.idle.image
                this.frameMax = this.sprites.idle.frameMax
                this.framesCurrent = 0
                }
            break;
            case 'idleleft':
                if(this.image !== this.sprites.idleleft.image){
                this.image = this.sprites.idleleft.image
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
            case 'jumpleft':
                if(this.image !== this.sprites.jumpleft.image){
                this.image = this.sprites.jumpleft.image
                this.frameMax = this.sprites.jumpleft.frameMax
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
            case 'fallleft':
                if(this.image !== this.sprites.fallleft.image){
                this.image = this.sprites.fallleft.image
                this.frameMax = this.sprites.fallleft.frameMax
                this.framesCurrent = 0
                }
            break;
            case 'attack1':
                if(this.image !== this.sprites.attack1.image){
                this.image = this.sprites.attack1.image
                this.frameMax = this.sprites.attack1.frameMax
                this.hitFrame = this.sprites.attack1.hitFrame
                this.framesCurrent = 0
                }
            break;
            case 'attack1left':
                if(this.image !== this.sprites.attack1left.image){
                this.image = this.sprites.attack1left.image
                this.frameMax = this.sprites.attack1left.frameMax
                this.hitFrame = this.sprites.attack1left.hitFrame
                this.framesCurrent = 0
                }
            break;
            case 'attack2':
                if(this.image !== this.sprites.attack2.image){
                this.image = this.sprites.attack2.image
                this.frameMax = this.sprites.attack2.frameMax
                this.hitFrame = this.sprites.attack2.hitFrame
                this.framesCurrent = 0
                }
            break;
            case 'attack2left':
                if(this.image !== this.sprites.attack2left.image){
                this.image = this.sprites.attack2left.image
                this.frameMax = this.sprites.attack2left.frameMax
                this.hitFrame = this.sprites.attack2left.hitFrame
                this.framesCurrent = 0
                }
            break;
            case 'takehit':
                if(this.image !== this.sprites.takehit.image){
                this.image = this.sprites.takehit.image
                this.frameMax = this.sprites.takehit.frameMax
                this.framesCurrent = 0
                }
            break;
            case 'takehitleft':
                if(this.image !== this.sprites.takehitleft.image){
                this.image = this.sprites.takehitleft.image
                this.frameMax = this.sprites.takehitleft.frameMax
                this.framesCurrent = 0
                }
            break;
            case 'death':
                if(this.image !== this.sprites.death.image){
                this.image = this.sprites.death.image
                this.frameMax = this.sprites.death.frameMax
                this.framesCurrent = 0
                }
            break;
            case 'deathleft':
                if(this.image !== this.sprites.deathleft.image){
                this.image = this.sprites.deathleft.image
                this.frameMax = this.sprites.deathleft.frameMax
                this.framesCurrent = 0
                }
            break;
        }
    }


    update(){
        this.draw();
        this.position.x += this.velocity.x
        this.applyGravity();
        if(!this.dead){
            this.animeteFrames();
        }
        this.attackbox.position.x = this.position.x + this.attackbox.offset.x
        this.attackbox.position.y = this.position.y + this.attackbox.offset.y
        
        ctx.fillRect(this.attackbox.position.x,this.attackbox.position.y,this.attackbox.width,this.attackbox.height)
    
    }
}
