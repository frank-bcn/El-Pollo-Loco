class StatusBar_Coin extends DrawableObject {


IMAGES_COIN = [
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
];


percentage = 0;

constructor() {
    super();
    this.loadImages(this.IMAGES_COIN);
    this.setPercentage(0);
    this.x = 10;
    this.y = 75;
    this.height = 50;
}

/** 
*Sets the percentage of the coin and updates the image accordingly.
@param {number} percentage - The percentage of the coin (0-100).
@returns {void}
*/
setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_COIN[this.resolveImageIndex()];
    this.img = this.imageCache[path];
}

/**
* Returns the image index based on the percentage value.
* @returns {number} The index of the image to be used.
*/
resolveImageIndex() {
    if (this.percentage >= 5) {
        return 5;
    } else if (this.percentage == 4) {
        return 4;
    } else if (this.percentage == 3) {
        return 3;
    } else if (this.percentage == 2) {
        return 2;
    } else if (this.percentage == 1) {
        return 1;
    } else {
        return 0;
    }
}
}