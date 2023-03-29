class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 60;
  speed = 5;
  hp = 15;
  firstHit = false;

  IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png'
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
    this.loadImage(this.IMAGES_DEAD);
    this.x = 1000;
    this.animate();
  }


  checkCollisionEndboss() {
    return (world.level.enemies[0].x - world.character.x)
  }

  animate() {

    setInterval(() => {
      if (this.hp < 15) this.firstHit = true;

      if (this.firstHit) {
        this.playAnimation(this.IMAGES_HURT);
        setTimeout(() => {
          setInterval(() => {
            if (this.checkCollisionEndboss() < 100) {
              this.playAnimation(this.IMAGES_ATTACK);
              this.moveLeft();
              this.speed = 15;
              this.otherDirection = false;
            } else {
              this.playAnimation(this.IMAGES_WALKING);
              this.moveLeft();
              this.speed = 10;
            }
            if (this.checkCollisionEndboss() < - 100) {
              this.moveRight();
              this.speed = 5;
              this.otherDirection = true;
            } else {
              this.playAnimation(this.IMAGES_WALKING);
              this.speed = 5;
              
            }

          }, 200);
        }, 1500);
      } 

    }, 150);
  }
}