class Coin extends MovableObject {
    width = 100;
    height = 100;

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    offset = { top: 0, bottom: 0, left: 0, right: 0 };


    constructor() {
        super().loadImage('img/8_coin/coin_2.png');
        this.loadImages(this.IMAGES_COIN);
        this.y = 310 - Math.random() * 250;
        this.x = 200 + Math.random() * 1520;

        this.animate();
    }

    /**
    *This method is responsible for animating the coin sprite. It repeatedly plays the coin animation
    *at an interval of 500 milliseconds.
    */
    animate() {
        stopSetInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 500);
    }
}