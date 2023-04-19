class GameOver extends DrawableObject {
    x = 0;
    y = 0;
    width = 720;
    height = 480;
  
    Game_Over = [
      'img/game over.png'
  ];
    constructor() {
      super();
      this.loadImage(this.Game_Over);
    }
  }