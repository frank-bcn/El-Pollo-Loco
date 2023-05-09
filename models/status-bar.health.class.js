class StatusBar_Health extends DrawableObject {

    IMAGES_health = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_health);
        this.setPercentage(100);
        this.x = 10;
        this.y = 30;
        this.height = 50;
    }

    /**
    *Set the percentage of the health and update the corresponding image.
    *@param {number} percentage - The percentage of the health.
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_health[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
    * Returns an index corresponding to the current health percentage of the object.
    * The returned index is used to determine the appropriate image from the `IMAGES_health` array.
    * @returns {number} The index of the appropriate image based on the current health percentage.
    */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}