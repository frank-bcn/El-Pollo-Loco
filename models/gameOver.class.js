class GameOver extends MovableObject {
    x = 0;
    y = 0;
    width = 720;
    height = 480;
  
  
    constructor() {
      super();
      this.loadImage("img/game over.png");
    }
  }