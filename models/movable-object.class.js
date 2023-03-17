class MovableObject {
    x = 120;
    y = 240;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 135;
    }

    loadImage(path) {
        this.img = new Image(); //
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)';
            this.imageCache[path] = img;
        });
    }

    playAnimation(images) {  // Lauf animation
        let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6; =>0, Rest 0
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
        this.walking_sound.play();;

    }

    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = false;
    }



    jump() {
        this.speedY = 30;
    }
}