class StatusBar_Img_Endboss extends DrawableObject {


    IMAGE_ENDBOSS = [
        'img/7_statusbars/2_statusbar_endboss/endboss.orange.png'
    ];


    constructor() {
        super();
        this.loadImage(this.IMAGE_ENDBOSS);
        this.x = 670;
        this.y = 15;
        this.height = 34.5;
        this.width = 40;
        
    }
}