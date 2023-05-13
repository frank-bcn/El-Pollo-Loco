class ThrowableObject extends MovableObject {
    height = 60;
    width = 50;
    speedY = 0;
    hp = 10;



    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    offset = { top: 15, bottom: 10, left: 5, right: 5 }

    constructor(x, y) {
        super().loadImage(this.IMAGES_ROTATION[0]);
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.throw();
    }

    /**
    * throw()
    * Perform the throw action.
    */
    throw() {
        this.speedY = 20;
        this.applyGravity();
        
        if (!this.isThrown) {
            if (world.character.otherDirection) {
                this.speedX = -20;
            } else {
                this.speedX = 20;
            }
            
            this.isThrown = true;
        }
        
        const intervalId = setInterval(() => {
            if (!this.isDead()) {
                this.x += this.speedX;
            }
            this.y -= 10;
            this.playAnimation(this.IMAGES_ROTATION);
            
            if (this.isDead() || this.y >= 370 || world.checkCollisionsThrowable()) {
                this.splash();
                clearInterval(intervalId);
            }
        }, 50);
    }
    

    /**
    * splash()
    * Stops the object's vertical motion, plays a splash animation, and sets the object's height 
    * and width to 0 after a delay of 100 milliseconds.
    */
    splash() {
        this.speedY = 0;
        this.playAnimation(this.IMAGES_SPLASH);
        setTimeout(() => {
            this.height = 0;
            this.width = 0;
        }, 100);
    }
}



