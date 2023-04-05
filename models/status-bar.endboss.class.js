class StatusBar_Endboss extends DrawableObject {

    IMAGES_ENDBOSS = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ];

    percentage = 100;


    constructor() {
        super();
        this.loadImages(this.IMAGES_ENDBOSS);
        this.loadImage(this.IMAGE_ENDBOSS);
        this.setPercentage(100);
        this.x = 590;
        this.y = 0;
        this.height = 50;
        this.otherDirection = true;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_ENDBOSS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 3;
        } else if (this.percentage > 80) {
            return 2;
        } else if (this.percentage > 40) {
            return 1;
        } else {
            return 0;
        }
    }
}