class Chicken_small extends MovableObject {
    y = 375;
    height = 40;
    width = 50;
    hp = 5;

    offset = {top: 0, bottom: 0, left: 0, right: 0};

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGE_DIE = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGE_DIE);

        this.x = 350 + Math.random() * 1000; // Zahl zwischen 300 und 700.
        this.speed = 0.5 + Math.random() * 0.25;
        this.animate();
    }

    /**
    * This function animates the character by moving it to the left and playing the walking animation. 
    * If the character is dead, it sets the offset, speed, and image to represent the death animation.
    * The animation interval is set to 140 milliseconds.
    */
    animate() {
       
        stopSetInterval(() => {
            if(this.isDead()) {
                this.offset = {top: 0, bottom: 0, left: 0, right: 0};
                this.speed = 0;
                this.loadImage(this.IMAGE_DIE);
            } 
            else {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALKING);
            }
        },140);
    }
}
