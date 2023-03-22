/*class Eagle extends MovableObject {

    IMAGES_WALKING = [
        'img/eagle/Walk.png'
        
    ];


    constructor() {
        super().loadImage('img/eagle/Walk.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 300 + Math.random() * 500; // Zahl zwischen 300 und 700.
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate()
    }



    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 140);
    }
}*/
