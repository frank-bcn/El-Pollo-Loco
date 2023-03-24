class Chicken extends MovableObject {

    y = 350;
    height = 70;
    width = 60;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGE_DIE = [
        'img/3_enemies_chicken/chicken_normal/2_dead'
    ];


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGE_DIE);

        this.x = 200 + Math.random() * 500; // Zahl zwischen 200 und 700.
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate()
    }



    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 150);
    }
}