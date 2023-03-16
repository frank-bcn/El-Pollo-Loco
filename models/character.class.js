class Character extends MovableObject {

    height = 280;
    y = 145;
    speed = 10;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    world;

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);

        this.animate();
    }

    animate() {

        setInterval(() => {
            if (this.world.keyboard.Right) {
                this.x += this.speed;
                this.otherDirection = false;
            }

            if (this.world.keyboard.Left) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x;

           /* if (this.world.keyboard.Up) {
                this.x += this.speed;
            }

            if (this.world.keyboard.Down) {
                this.x += this.speed;
            }

            if (this.world.keyboard.Space) {
                this.x += this.speed;
            }*/
        }, 1000 / 60);


        setInterval(() => {

            if (this.world.keyboard.Right || this.world.keyboard.Left) {

                // Lauf animation
                let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6; =>0, Rest 0
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 50);
    }


    jump() {

    }
}