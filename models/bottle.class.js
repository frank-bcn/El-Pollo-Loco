class Bottle extends MovableObject {
    width = 80;
    height = 80;

    IMAGES_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    IMAGE_AIR = [
        'img/6_salsa_bottle/salsa_bottle.png'
    ];

    offset = { top: 0, bottom: 0, left: 0, right: 0 };


    constructor() {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_GROUND);
        this.loadImage(this.IMAGE_AIR);

        this.x = 200 + Math.random() * 1320;
        this.placeBottle();
    }

  /**
  * placeBottle()
  * Places a bottle on a random position in either the ground or the air environment.
  * If the bottle is placed on the ground, it is positioned on one of the two ground images.
  * If the bottle is placed in the air, it is positioned at a random vertical height.
  */
    placeBottle() {
        let bottleground = Math.floor(Math.random() * 2);
        if (bottleground <= 0) {  
          let i = Math.floor(Math.random() * 2);
          this.y = 350;
          this.loadImage(this.IMAGES_GROUND[i]);
        } else { 
          this.y = 310 - Math.random() * 250;
          this.loadImage(this.IMAGE_AIR);
        }
      }
}