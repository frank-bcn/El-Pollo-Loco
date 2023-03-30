class StatusBar_Endboss extends DrawableObject {

    IMAGES_ENDBOSS = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ];

    percentage = 0;


    constructor() {
        super();
        this.loadImages(this.IMAGES_EndBoss);
        this.x = 570;
        this.y = 0;
        this.height = 50;
        this.setPercentage(0);
        this.otherDirection = true;
    }
}