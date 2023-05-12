class StatusBar_Endboss extends DrawableObject {
    
    IMAGES_ENDBOSS = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ];

    percentage = 700;


    constructor() {
        super();
        this.loadImages(this.IMAGES_ENDBOSS);
        this.setPercentage(700);
        this.x = 590;
        this.y = 0;
        this.height = 60;
        this.otherDirection = true;
        this.resolveImageIndex();
    }

    /** 
    *Sets the percentage of the Endboss's health and updates the image accordingly.
    *@param {number} percentage - The percentage of the Endboss's health, from 0 to 100.
    */
   setPercentage(percentage) {
        this.percentage = percentage;
        console.log(this.percentage);
        let path = this.IMAGES_ENDBOSS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
    *Determines the index of the image to display for the current percentage of the end boss's health.
    *If the end boss's health is 100%, index 5 is returned.
    *If the end boss's health is greater than 90%, index 4 is returned.
    *If the end boss's health is greater than 60%, index 3 is returned.
    *If the end boss's health is greater than 30%, index 2 is returned.
    *If the end boss's health is greater than 20%, index 1 is returned.
    *Otherwise, index 0 is returned.
    *@return {number} The index of the image to display.
    */
    resolveImageIndex() {
        
        if (this.percentage == 700) {
            return 5;
        } else if (this.percentage > 530) {
            return 4;
        } else if (this.percentage > 360) {
            return 3;
        } else if (this.percentage > 200) {
            return 2;
        } else if (this.percentage > 90) {
            return 1;
        } else {
            return 0;
        }
    }
}