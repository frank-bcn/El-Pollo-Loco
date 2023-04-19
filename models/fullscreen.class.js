class FullIcon extends DrawableObject {
    x = 300;
    y = 10;
    height = 25;
    width = 25;


    constructor() {
        super();
        this.loadImage('img/full.png');
        this.id = "fullscreen";
    }

    onclick() {
        console.log("funktioniert");
      }
}