class ThrowableObject extends MovableObject {
    height = 60;
    width = 50;
    speedY = 0;
    hp = 20;


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

    throw() {
        this.speedY = 20; // Geschwindigkeit vertikal
        this.applyGravity();
        stopSetInterval(() => {
            audioFiles[5].pause();
            if (this.y < 340 && !this.isDead()) {// wenn die Flasche unterhalb der oberen Grenze befindet(340) wird die Rotation Bilder aufgerufen.
                this.x += 20;
                this.playAnimation(this.IMAGES_ROTATION);
                audioFiles[5].play();
                audioFiles[5].volume = 0.2;
            }
            if (this.isDead() || this.y >= 370) {// wenn die Flasche tot ist oder die obere Grenze erreicht hat, wird die Splash Bilder aufgerufen. 
                this.splash();
                audioFiles[4].play();
                audioFiles[4].volume = 0.2;
            }
        }, 40);
    }

    splash() {
        this.speedY = 0;
        this.playAnimation(this.IMAGES_SPLASH);
        setTimeout(() => {
            this.height = 0;
            this.width = 0;
        }, 100);
    }
}