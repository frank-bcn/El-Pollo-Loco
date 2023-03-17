class Chicken_small extends MovableObject  {
    y = 375;
    height = 40;
    width = 50;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 300 + Math.random() * 500; // Zahl zwischen 300 und 700.
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate()
    }



    animate() {
        this.moveLeft();

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 140);
    }
}
