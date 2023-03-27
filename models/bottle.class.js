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

        this.x = 200 + Math.random() * 1520;
        this.placeBottle();
    }

    placeBottle() {// generiert Flaschen auf einer zufälligen Position in zwei Umgebungen(Boden/Luft)
        let bottleground = Math.floor(Math.random() * 2);//Zuerst wird eine zufällige Zahl zwischen 0 und 1 erzeugt und gerundet.
        if (bottleground <= 0) { //Wenn die Variable kleiner oder gleich 0 ist, wird die Flasche auf dem Boden in einer der beiden Bodenbilder platziert.
          let i = Math.floor(Math.random() * 2);//Zufällige Auswahl eines der beiden Bodenbilder.
          this.y = 350;//positioniert die Flasche auf der vertikalen (Bodenhöhe).
          this.loadImage(this.IMAGES_GROUND[i]);
        } else { // Wenn bottleground größer als 0 ist, wird die Flasche in der Luft platziert.
          this.y = 310 - Math.random() * 250;
          this.loadImage(this.IMAGE_AIR);
        }
      }
}