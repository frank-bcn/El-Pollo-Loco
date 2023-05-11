class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 60;
  speed = 5;
  hp = 300;
  firstHit = false;

  offset = { top: 0, bottom: 0, left: 0, right: 0 };

  IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png',
  ];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];


  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];


  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];


  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 1650;
    this.animate();
  }

  /**
  * Checks the collision of the end boss with the character
  * and returns the difference of their x-coordinates.
  *
  * @returns {number} The difference between the x-coordinate of the end boss and the character.
  */
  checkCollisionEndboss() {
    return (this.x - world.character.x);
  }

  /**
  *This method defines the animation logic for a character in a game. It uses setInterval to update the character's state and animations.
  *If the character is dead, it plays the dead animation.
  *If the character is hurt, it plays the hurt animation.
  *If the character is close to the end boss (within 200 pixels), it plays the attack animation, moves the character to the left, and sets the speed to 50.
  *If the character is within 400 pixels of the end boss, it plays the alert animation and sets the speed to 0.
  *If the character is farther than 400 pixels from the end boss, it plays the walking animation, moves the character to the left, and sets the speed to 5.
  * The setInterval is set to 200 milliseconds.
  */
  animate() {
    stopSetInterval(() => {
        if (this.isDead()) {
          this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt()) {
          this.playAnimation(this.IMAGES_HURT);
        } else {
           if (this.checkCollisionEndboss() < 350) {
            this.playAnimation(this.IMAGES_ATTACK);
            this.moveLeft();
            this.speed = 50;
           }else if (this.checkCollisionEndboss() < 400) {
            this.playAnimation(this.IMAGES_ALERT);
            this.speed = 0;
          }
           else if (this.checkCollisionEndboss() < 1000) {
            this.playAnimation(this.IMAGES_WALKING);
            this.moveLeft();
            this.speed = 5;
          }
        }
    }, 200);
  }
}