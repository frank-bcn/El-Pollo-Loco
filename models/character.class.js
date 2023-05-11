class Character extends MovableObject {

  height = 280;
  y = 10;
  speed = 10;
  hp = 100;
  bottle = 0;
  coin = 0;
  longIdle = 0;

  offset = { top: 113, bottom: 15, left: 20, right: 20 };

  IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png'
  ];

  IMAGES_JUMPING = [
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png'
  ];

  IMAGES_DEAD = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png'
  ];

  IMAGES_HURT = [
    'img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png'
  ];

  IMAGES_Idle = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];


  IMAGES_Long_Idle = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  constructor() {
    super().loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_Idle);
    this.loadImages(this.IMAGES_Long_Idle);
    this.applyGravity();
    this.animate();
  }

  /**
  *animate()
  *This function handles the animation of the character by calling the keyboardAnimation() function at a certain interval.
  */
  animate() {
    stopSetInterval(() => {
      this.keyboardAnimation();
    }, 1000 / 40);


  /**
  *stopSetInterval()
  *This function stops the character's animation by clearing the interval for the characterAnimation() function.
  *The function is called at a set interval of 150 milliseconds.
  */
    stopSetInterval(() => {
      this.characterAnimation();
    }, 250);
  }

  /**
  *Updates the player's animation and movement based on keyboard input.
  *If the Right arrow key is pressed and the player is not at the end of the level, the player moves to the right.
  *If the Left arrow key is pressed and the player is not at the beginning of the level, the player moves to the left.
  *The camera is adjusted to follow the player's movement.
  *If the Up arrow key is pressed and the player is not currently above ground, the player jumps.
  *If the player is dead and the end animation has been played at least 10 times, the player's image is set to the final dead image.
  */
  keyboardAnimation() {
    if (this.world.keyboard.Right && this.x < this.world.level.level_end_x) {
      this.moveRight();
    }

    if (this.world.keyboard.Left && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
    }
    this.world.camera_x = -this.x + 100;

    if (this.world.keyboard.Up && !this.isAboveGround()) {
      this.jump();
    }

    if (world.endanimation >= 10 && this.isDead()) {
      this.loadImage(this.IMAGES_DEAD[6]);
    }
  }

  /** 
  *characterAnimation()
  *This function handles the character's animation by checking if the keyboard keys are pressed or not.
  *If no keys are pressed for a certain time, the character will play an idle animation.
  *If the character is dead, the death animation will play along with an audio file.
  *If the character is hurt, the hurt animation will play.
  *If the character is jumping, the jumping animation will play.
  *If the character is walking, the walking animation will play.
  */
  characterAnimation() {
    if (!this.world.keyboard.Right && !this.world.keyboard.Left && !this.world.keyboard.Space && !this.world.keyboard.Up) {
      if (this.longIdle > 100) {
        this.playAnimation(this.IMAGES_Long_Idle);
        audioFiles[11].play();
      } else {
        this.playAnimation(this.IMAGES_Idle);
        this.longIdle++;
      }
    } else {
      this.longIdle = 0;
    } 
     if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
      audioFiles[6].play();
    } else if (this.isHurt() && !this.isDead()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
    }
    if (this.world.keyboard.Right && !this.isAboveGround() || this.world.keyboard.Left && !this.isAboveGround()) {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }
}
