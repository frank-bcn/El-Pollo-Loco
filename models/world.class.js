class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBar_Health();
    statusBarCoin = new StatusBar_Coin();
    statusBarBottle = new StatusBar_Bottle();
    statusBarEndboss = new StatusBar_Endboss();
    statusBarEndbossImg = new StatusBar_Img_Endboss();
    winGame = new WinGame();
    gameOver = new GameOver();
    fullScreen = new FullIcon();
    nofullScreen = new NoFullIcon();
    arrowLeft = new ArrowLeft();
    walkLeft = new WalkLeft();
    arrowRight = new ArrowRight();
    walkRight = new WalkRight();
    arrowJump = new ArrowJump();
    walkJump = new WalkJump();
    arrowThrow = new ArrowTrowable();
    walkThrow = new WalkTrowable();
    sound = new SoundIcon();
    soundMute = new SoundMuteIcon();
    throwableObject = [];
    fullscreen = false;
    soundIsMute = false;
    endanimation = 0;
    bottleHit = false;
    counter = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.curserClickFull();
        this.curserClickSound();
    }

    /**
    *setWorld
    *This function sets the "world" property of the "character" object to the current instance of the class/object that contains the "setWorld" method. The purpose of this method is to establish a connection between the "character" object and the overall system or environment it is a part of. Once this connection is established, the "character" object can access and interact with other components of the system as needed.
    */
    setWorld() {
        this.character.world = this;
    }

    /**
    *run
    *This method runs the main game loop. It sets up two intervals, one for checking throwable objects every 150 milliseconds, and another for checking collisions and game end conditions every 60 milliseconds. The "checkThrowableObjects" method is called during the first interval, while the "checkCollisions" and "checkGameEnd" methods are called during the second interval. By setting up these intervals, the game is able to continuously update and respond to player input in real time.
    */
    run() {
        stopSetInterval(() => {
            this.checkThrowableObjects();
        }, 150);

        stopSetInterval(() => {
            this.checkCollisions();
            this.checkGameEnd();
        }, 60);
    }

    /**
    *checkThrowableObjects
    *This method checks if the player has any bottles left and if the Space key is pressed. If both conditions are true, it creates a new "ThrowableObject" instance and adds it to the "throwableObject" array. The method also decrements the player's bottle count, updates the bottle percentage in the status bar, and updates the status bar display. By doing this, the method enables the player to throw bottles by pressing the Space key, and ensures that the game state is updated accordingly.
    */
    checkThrowableObjects() {
        if (this.character.bottle > 0 && this.keyboard.Space && !this.isThrowing && !this.character.otherDirection) {
            this.isThrowing = true;
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 150);
            this.throwableObject.push(bottle);
            this.character.bottle--;
            this.statusBarBottle.setPercentage(this.character.bottle);
            setTimeout(() => {
                this.isThrowing = false;
            }, 200);
        }
    }

    /**
    *checkCollisions
    *This method checks for collisions between various objects in the game. It calls several other methods to handle specific types of collisions, including collisions between the player and enemies, between the player and throwable objects, between the player and bottles, and between the player and coins. By calling these methods, the "checkCollisions" method is able to detect and respond to a variety of different collisions that can occur in the game, which helps to ensure that the game state remains accurate and up-to-date.
    */
    checkCollisions() {
        this.checkCollisionsEnemy();
        this.checkCollisionsThrowable();
        this.checkCollisionsBottle();
        this.checkCollisionsCoin();
    }

    /**
    *checkCollisionsEnemy
    *This method checks for collisions between the player character and enemy objects in the game. It iterates through the "enemies" array in the current level and checks if the player is colliding with each enemy using the "isColliding" method. If a collision is detected, the method checks if the player is in the air or on the ground using the "isAboveGround" method, and if the player is in the air, the enemy takes damage. Otherwise, if the enemy is not already dead, the player takes damage instead. The method updates the health percentage in the status bar to reflect any changes in the player's health. By detecting and responding to collisions with enemies, this method helps to ensure that the game remains challenging and engaging for the player.
    */
    checkCollisionsEnemy() {
        this.level.enemies.forEach((enemy, y) => {
            if (!this.level.enemies[y].isDead() && this.character.isColliding(enemy)) {
                if (this.character.speedY < 0 && this.character.isAboveGround()) {
                    this.level.enemies[y].hit(5);
                    audioFiles[8].play();
                } else {
                    this.character.hit(5);
                    audioFiles[9].play();
                    this.statusBarHealth.setPercentage(this.character.hp)
                }
            }
        });
    }

    /**
    *checkCollisionsThrowable
    *This method checks for collisions between throwable objects (bottles) and enemy objects in the game. It first iterates through the "throwableObject" array to check if there are any bottles available to throw. For each bottle, it then iterates through the "enemies" array in the current level to check if the bottle is colliding with any enemies. If a collision is detected with the end boss, the method removes the bottle from the "throwableObject" array and inflicts damage to the end boss. If a collision is detected with a regular enemy, the method removes the bottle from the "throwableObject" array and inflicts damage to the enemy. The method updates the health percentage in the status bar to reflect any changes in the health of the end boss. By detecting and responding to collisions between bottles and enemies, this method enables the player to use bottles as a weapon and adds an element of strategy to the gameplay.
    */
    checkCollisionsThrowable() {
        let collisionDetected = false;
        this.throwableObject.forEach((bottle, i) => {
            this.level.enemies.forEach((enemy, y) => {
                if (bottle.isColliding(world.level.enemies[0])) {
                    collisionDetected = true;
                    this.level.enemies[0].hit();
                    this.statusBarEndboss.setPercentage(world.level.enemies[0].hp);
                    audioFiles[7].play();
                } else if (bottle.isColliding(enemy)) {
                    collisionDetected = true;
                    this.level.enemies[y].hit();
                    audioFiles[8].play();
                }
            });
        });
        return collisionDetected;
    }
    
    

    /**
    *checkCollisionsBottle
    *This method checks for collisions between the player character and the bottles in the game world. It iterates through the "bottle" array in the current level to check if the player character is colliding with any of the bottles. If a collision is detected, the method increments the number of bottles the character has and updates the bottle percentage in the status bar to reflect the increase. It then removes the bottle from the "bottle" array in the current level to signify that it has been picked up. By detecting and responding to collisions between the player character and bottles, this method enables the player to collect bottles as a resource to use for throwing at enemies.
    */
    checkCollisionsBottle() {
        this.level.bottle.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                audioFiles[4].play();
                this.character.bottle++;
                this.statusBarBottle.setPercentage(this.character.bottle);
                this.level.bottle.splice(this.level.bottle.indexOf(bottle), 1);
            }
        });
    }

    /**
    *checkCollisionsCoin
    *This method checks for collisions between the player character and the coins in the game world. It iterates through the "coin" array in the current level to check if the player character is colliding with any of the coins. If a collision is detected, the method increments the number of coins the character has and updates the coin percentage in the status bar to reflect the increase. It then removes the coin from the "coin" array in the current level to signify that it has been collected. By detecting and responding to collisions between the player character and coins, this method enables the player to collect coins as a resource to use for purchasing items or upgrades in the game.
    */
    checkCollisionsCoin() {
        this.level.coin.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                audioFiles[5].play();
                this.character.coin++;
                this.statusBarCoin.setPercentage(this.character.coin);
                this.level.coin.splice(this.level.coin.indexOf(coin), 1);
            }
        });
    }

    /**
    *draw
    *This method is responsible for rendering the game world onto the HTML canvas element. It first clears the canvas by calling the "clearRect" method of the canvas context. It then translates the canvas context to the position of the camera in the game world, allowing the player to view different parts of the game world as they move around. The method then adds the background objects in the current level to the game world using the "addObjectsToMap" method. The canvas context is then translated back to its original position before calling the "drawFunctions" method to draw all of the game objects onto the canvas. Finally, the method clears the fullscreen button and sets a callback function for the next animation frame using the "requestAnimationFrame" method. By rendering the game world and updating it continuously, this method creates a smooth and immersive gaming experience for the player.
    */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.drawFunctions();
        this.clearFullscreenButton();
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
    *clearFullscreenButton
    *This method checks if the game is being played on a mobile device and if the play indicator flag is true. If both conditions are met, the method clears the canvas in the top left corner of the game screen to remove the "fullscreen" button. This is because on mobile devices, the game is played in fullscreen mode by default and the button is not needed. By removing the button, this method helps to optimize the game for mobile devices and improve the player's experience.
    */
    clearFullscreenButton() {
        if (checkmobile && playIndikator)
            world.ctx.clearRect(13, 10, 25, 25);
    }

    /**
    *checkGameEnd
    *This method checks if the end animation has played for the required duration. If the end animation has played for 150 frames, the method stops the game by calling the "stopGame" function. This method is used to determine when the game has ended and to trigger the appropriate actions, such as displaying the end screen or returning to the main menu.
    */
    checkGameEnd() {
        if (this.endanimation >= 150) {
            stopGame();
        }
    }

    /**
    *drawWinGameScreen
    *This method is responsible for drawing the win game screen if the player has defeated all enemies in the level. It checks if the enemy has been defeated by checking if the enemy's hp is equal to zero. If the enemy has been defeated, the method increments the "endanimation" counter to indicate that the end screen animation should be played. Once the "endanimation" counter exceeds a certain value (150 in this case), the method adds the win game screen to the game map and sets the cursor to a pointer. It then listens for a click event on the canvas, which triggers the "restart" function to restart the game. By providing a win game screen and allowing the player to restart the game after winning, this method adds an important element of player motivation and satisfaction to the game.
    */
    drawWinGameScreen() {
        if (this.level.enemies[0].hp == 0) {
            this.endanimation++;
            if (this.endanimation > 150) {
                const canvas = document.getElementById('canvas');
                this.addToMap(this.winGame);
                audioFiles[12].play();
            }
            if (this.endanimation > 300) {
                canvas.style.cursor = 'pointer';
                canvas.addEventListener('click', restart);
                /*audioFiles[12].pause();*/
            }
        }
    }

    /**
    *drawGameOverScreen
    *This method checks if the player character has zero hit points (hp) and triggers the game over screen if so. It increments the endanimation counter to track how long the game over screen has been displayed. If the endanimation counter exceeds 150, the method adds the game over image to the map and sets the cursor to a pointer to indicate to the player that they can click to restart the game. It also adds a click event listener to the canvas element to restart the game if clicked.
    */
    drawGameOverScreen() {
        if (this.character.hp == 0) {
            this.endanimation++;
            if (this.endanimation > 150) {
                const canvas = document.getElementById('canvas');
                this.addToMap(this.gameOver);
                audioFiles[10].play();
            }
            if (this.endanimation > 340) {
                /*audioFiles[10].pause();*/
                canvas.addEventListener('click', restart);
                canvas.style.cursor = 'pointer';
            }
        }
    }

    /**
    *drawfullscreen
    *This method checks if the game is currently in fullscreen mode and adds the appropriate image to the map. If the game is in fullscreen mode, the "nofullScreen" image is added, which displays an icon for exiting fullscreen mode. If the game is not in fullscreen mode, the "fullScreen" image is added, which displays an icon for entering fullscreen mode. This method allows the player to easily switch between fullscreen and windowed mode in the game interface.
    */
    drawfullscreen() {
        if (this.fullscreen) {
            this.addToMap(this.nofullScreen);
        } else {
            this.addToMap(this.fullScreen);
        }
    }

    /**
    *drawsound
    *This method adds either the "sound" or "soundMute" image to the game map depending on whether the sound is currently muted or not. If the "soundIsMute" flag is set to true, the "soundMute" image is added, indicating that the sound is currently muted. If the flag is false, the "sound" image is added, indicating that the sound is currently enabled. This function is used to provide visual feedback to the player about the current sound state in the game.
    */
    drawsound() {
        if (this.soundIsMute) {
            this.addToMap(this.soundMute);
        } else {
            this.addToMap(this.sound);
        }
    }

    /**
    *drawFunctions
    *This method is responsible for calling several other methods to draw various elements onto the canvas. These methods include drawfullscreen(), drawsound(), drawArrowsImg(), drawLevelItems(), drawStatusBars(), drawGameOverScreen(), and drawWinGameScreen(). By calling these methods, drawFunctions handles the rendering of important elements like the fullscreen button, sound button, arrow icons, status bars, and game over/win game screens. This allows for a cohesive and visually appealing game interface that enhances the player's experience.
    */
    drawFunctions() {
        this.drawfullscreen();
        this.drawsound();
        this.drawArrowsImg();
        this.drawLevelItems();
        this.drawStatusBars();
        this.drawGameOverScreen();
        this.drawWinGameScreen();
    }


    /**
    *drawStatusBars
    *This method adds the different status bars to the game world. It adds the health, coin, bottle, endboss, and endboss image status bars to the map. These status bars allow the player to see how much health they have, how many coins and bottles they have collected, and the health of the end boss. By displaying this information to the player, this method helps them to make strategic decisions and navigate the game more effectively.
    */
    drawStatusBars() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarEndboss);
        this.addToMap(this.statusBarEndbossImg);
    }


    /**
    *drawArrowsImg
    *This method adds the different arrow images to the game world. It adds the left, right, jump, and throw arrow images to the map. Additionally, it adds the corresponding walking animation images for each arrow (left, right, jump, and throw) to the map. By displaying these images to the player, this method helps them to understand which actions are available to their character and how to perform them. This, in turn, enhances the player's experience and enjoyment of the game.
    */
    drawArrowsImg() {
        this.addToMap(this.arrowLeft);
        this.addToMap(this.walkLeft);
        this.addToMap(this.arrowRight);
        this.addToMap(this.walkRight);
        this.addToMap(this.arrowJump);
        this.addToMap(this.walkJump);
        this.addToMap(this.arrowThrow);
        this.addToMap(this.walkThrow);
    }

    /**
    *drawLevelItems
    *This method adds the different level items to the game world. It first translates the canvas context to the position of the camera in the x-direction. Then, it adds the clouds, enemies, bottles, coins, and throwable objects to the map using the addObjectsToMap method. It also adds the character to the map using the addToMap method. Finally, it translates the canvas context back to its original position. This method is crucial for displaying all the elements of the level in the correct positions relative to each other and the player character.
    */
    drawLevelItems() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.level.bottle);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
    *addObjectsToMap
    *This method adds objects to the game world by iterating through an array of objects and calling the addToMap method for each object. By using this method, multiple objects can be added to the game world at once. It is used in the drawLevelItems method to add clouds, enemies, bottles, coins, and throwable objects to the map. The method takes an array of objects as a parameter and iterates through it using the forEach function. For each object, the method calls the addToMap function to add the object to the map. This function is essential for efficiently adding multiple objects to the game world.
    */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);

        });
    }

    /**
    *addToMap
    *This method adds a game object to the map. If the game object has a boolean property 'otherDirection' set to true, it first flips the image using the flipImage method. Then, it calls the object's draw method to draw the image on the canvas context. After that, if the object had been flipped, it flips the image back using the flipImageBack method. The method takes the following parameters:
    *mo.img: the image object to be drawn on the canvas
    *mo.x: the x-position of the image on the canvas
    *mo.y: the y-position of the image on the canvas
    *mo.width: the width of the image on the canvas
    *mo.height: the height of the image on the canvas
    *This method is important for displaying all the game objects on the canvas context in their correct positions and orientations.
    */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
    *flipImage
    *This method flips the given image horizontally using the canvas context. It first saves the current context, then translates it to the right end of the image. Next, it scales the context by -1 in the x-direction to flip the image horizontally. Finally, it adjusts the x-coordinate of the image to ensure that it remains in the correct position after the flip. This method is important for creating mirrored versions of images, such as when an object needs to face in the opposite direction.
    */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
    *flipImageBack
    *This method flips an image back to its original orientation after being flipped horizontally. It first sets the x-coordinate of the image to its negative value to undo the previous flipping operation. Then, it restores the previously saved canvas context, which includes the original orientation of the canvas. This method is used in conjunction with the flipImage method to flip images horizontally in the game, and then restore them to their original orientation afterwards.
    */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
    *curserClickFull
    *This method adds an event listener to the canvas element that listens for mouse movement. When the mouse moves, the setCursor method is called to set the cursor's position. This method is used to detect when the user clicks on the canvas and is used to interact with the game environment.
    */
    curserClickFull() {
        this.canvas.addEventListener('mousemove', (event) => {
            this.setCursor(event);
        });
    }

    /**
    *setCursor
    *This method is called when the mouse moves over the canvas element. It calculates the x and y coordinates of the mouse cursor relative to the canvas using event.clientX and event.clientY properties. Then, it checks if the cursor is within a certain distance from the fullscreen button, which is located at either targetX1 or targetX2 on the x-axis and targetY on the y-axis. If the cursor is close enough, it changes the cursor style to "pointer" and adds a click event handler for the fullscreen button using the addFullscreenClickHandler method. If not, it sets the cursor style back to "default" and removes any click event handlers using the removeFullscreenClickHandler method. This method is important for providing user interactivity with the fullscreen button.
    */
    setCursor(event) {
        let x = event.clientX - this.canvas.offsetLeft;
        let y = event.clientY - this.canvas.offsetTop;
        let [targetX1, targetX2, targetY] = this.checkFullscreen();
        let distance = 15;
        if ((Math.abs(x - targetX1) <= distance && Math.abs(y - targetY) <= distance) || (Math.abs(x - targetX2) <= distance && Math.abs(y - targetY) <= distance)) {
            this.canvas.style.cursor = "pointer";
            this.addFullscreenClickHandler(targetX1, targetY, distance);
        } else {
            this.canvas.style.cursor = "default";
            this.removeFullscreenClickHandler();
        }
    }

    /**
    *addFullscreenClickHandler
    *This method adds a click event listener to the canvas element that checks if the click is within a certain distance from the specified target coordinates. If the click is within the distance, it toggles the fullscreen mode of the game using the fullscreen() and closeFullscreen() functions. This method is called by the setCursor() method when the mouse cursor is near the edge of the canvas, indicating the possibility of toggling fullscreen mode.
    @param {number} targetX1 - The x-coordinate of the first target point.
    @param {number} targetY - The y-coordinate of the target point.
    @param {number} distance - The maximum distance between the click and the target point for it to register as a valid click.
    */
    addFullscreenClickHandler(targetX1, targetY, distance) {
        this.canvas.addEventListener('click', (event) => {
            if (Math.abs(event.clientX - this.canvas.offsetLeft - targetX1) <= distance && Math.abs(event.clientY - this.canvas.offsetTop - targetY) <= distance) {
                if (this.fullscreen) {
                    closeFullscreen();
                } else {
                    fullscreen();
                }
            }
        });
    }

    /**
    *removeFullscreenClickHandler
    *This method removes the click event listener that was added by the addFullscreenClickHandler method. It removes the event listener from the canvas element using the removeEventListener method, passing in the 'click' event and the function reference to remove. This function is important to prevent multiple event listeners from being added to the canvas element, which can lead to unexpected behavior in the application.
    */
    removeFullscreenClickHandler() {
        this.canvas.removeEventListener('click', this.addFullscreenClickHandler);
    }

    /**
    *checkFullscreen
    *This method returns an array containing the target X and Y coordinates for the fullscreen button based on whether or not the game is currently in fullscreen mode. If the game is in fullscreen mode, the coordinates are set to (44, 130, 40), and if it is not, they are set to (26, 62, 20). These values are used by other methods to determine if the cursor is hovering over the fullscreen button.
    */
    checkFullscreen() {
        let targetX1, targetX2, targetY;
        if (this.fullscreen) {
            targetX1 = 44;
            targetX2 = 130;
            targetY = 40;
        } else {
            targetX1 = 26;
            targetX2 = 62;
            targetY = 20;
        }
        return [targetX1, targetX2, targetY];
    }

    /**
    *curserClickSound
    *This method adds an event listener to the canvas that listens for mousemove events. It calls the handleSoundMousemove method, which sets the cursor to a specific icon based on the mouse position and whether or not the sound is muted. This method is used to indicate to the user that they can toggle the sound on or off by clicking on the icon.
    */
    curserClickSound() {
        this.canvas.addEventListener('mousemove', this.handleSoundMousemove);
    }

    /**
    * This method adds an event listener to the canvas that listens for mousemove events. 
    * It calls the handleSoundMousemove method, which sets the cursor to a specific icon 
    * based on the mouse position and whether or not the sound is muted. This method is 
    * used to indicate to the user that they can toggle the sound on or off by clicking 
    * on the icon.
    */
    handleSoundMousemove = (event) => {
        let x = event.clientX - this.canvas.offsetLeft;
        let y = event.clientY - this.canvas.offsetTop;
        let [targetX2, targetY] = this.getTargetCoords();
        let distance = 15;

        if ((Math.abs(x - targetX2) <= distance && Math.abs(y - targetY) <= distance)) {
            this.canvas.addEventListener('click', this.toggleSound);
        } else {
            this.canvas.removeEventListener('click', this.toggleSound);
        }
    }

    /**
    *getTargetCoords
    *This method returns an array containing the target coordinates for the cursor sound icon based on whether or not the canvas is in fullscreen mode. If the canvas is in fullscreen mode, the target coordinates will be [130, 40], otherwise they will be [62, 20]. The returned array is in the format [targetX2, targetY].
    */
    getTargetCoords = () => {
        let targetX2, targetY;
        if (this.fullscreen) {
            targetX2 = 130;
            targetY = 40;
        } else {
            targetX2 = 62;
            targetY = 20;
        }
        return [targetX2, targetY];
    }

    /**
    *toggleSound
    *This method is called when the user clicks on the sound icon. It calculates the mouse position and compares it with the target position of the sound icon to determine if the click was inside the icon. If it was, it toggles the sound on or off by calling either the sound() or soundMute() function, depending on the current state of the sound.
    */
    toggleSound = (event) => {
        let { clientX, clientY } = event;
        let x = clientX - this.canvas.offsetLeft;
        let y = clientY - this.canvas.offsetTop;
        let targetCoords = this.fullscreen ? { x: 130, y: 40 } : { x: 62, y: 20 };
        let distance = 15;
        let isTarget = Math.abs(x - targetCoords.x) <= distance && Math.abs(y - targetCoords.y) <= distance;

        if (isTarget) {
            this.soundIsMute ? sound() : soundMute();
        }
    }
}