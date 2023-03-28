class Coin extends MovableObject {
    width = 100;
    height = 100;

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    offset = { top: 100, bottom: 100, left: 100, right: 100 };


    constructor() {
        super().loadImage('img/8_coin/coin_2.png');
        this.loadImages(this.IMAGES_COIN);
        this.y = 310 - Math.random() * 250;
        this.x = 200 + Math.random() * 1520;

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 1000);
    }
}