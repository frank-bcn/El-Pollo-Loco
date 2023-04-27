class Chicken extends MovableObject {

    y = 350;
    height = 70;
    width = 60;
    hp = 5;
    offset = {top: 0, bottom: 0, left: 0, right: 0};

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGE_DIE = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGE_DIE);

        this.x = 300 + Math.random() * 700; // Zahl zwischen 300 und 700.
        this.speed = 1 + Math.random() * 0.25;
        this.animate();
    }


    checkdistance() {
        return (this.x - world.character.x);
    }
    
    animate() {
       
        stopSetInterval(() => {
            if(this.isDead()) {
                this.offset = {top: 0, bottom: 0, left: 0, right: 0};
                this.speed = 0;
                this.loadImage(this.IMAGE_DIE);
            } 
            else if(this.checkdistance() < -50) {
                this.moveRight();
                this.otherDirection = true;
                this.speed = 5;
            }
            else {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALKING);
            }
        },140);
    }
}