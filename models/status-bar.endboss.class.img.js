class StatusBar_Img_Endboss extends DrawableObject {


    IMAGE_ENDBOSS = [
        'img/icon_health_endboss.png'
    ];


    constructor() {
        super();
        this.loadImage(this.IMAGE_ENDBOSS);
        this.x = 660;
        this.y = 8;
        this.height = 50;
        this.width = 50;
        
    }
}