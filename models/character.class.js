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
    walking_sound = new Audio('audio/run.mp3')

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);

        this.animate();
    }

    animate() {

        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.Right&& this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.walking_sound.play();
            }

            if (this.world.keyboard.Left && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.walking_sound.play();
            }
            this.world.camera_x = -this.x + 100;

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

            }
        }, 50);
    }


    jump() {

    }
}