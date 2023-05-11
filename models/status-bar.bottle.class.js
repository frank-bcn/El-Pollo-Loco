class StatusBar_Bottle extends DrawableObject {

    IMAGES_bottle = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_bottle);
        this.setPercentage(0);
        this.x = 10;
        this.y = 115;
        this.height = 60;
    }

    /** 
    *Sets the percentage of the bottle and updates the image accordingly.
    @param {number} percentage - The percentage of the bottle (0-100).
    @returns {void}
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_bottle[this.resolveImageIndex()];
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