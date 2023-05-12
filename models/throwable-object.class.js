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
    * Sets the object's vertical speed to 20 and applies gravity, then starts a loop that 
    * updates the object's position and animation every 40 milliseconds until it reaches 
     * a certain height, dies, or collides with another object.
     */
    throw() {
        this.speedY = 20;
        this.applyGravity();
        const intervalId = setInterval(() => {
            if (this.y < 340 && !this.isDead()) {
                this.x += 20;
                this.y -= 10; 
                this.playAnimation(this.IMAGES_ROTATION);
            }
            if (this.isDead() || this.y >= 350 || world.checkCollisionsThrowable()) {
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

/*world.throwableObject.splice(bottle, 1);*/