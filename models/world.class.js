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
    turnMobile = new TurnMobile();


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

    setWorld() {
        this.character.world = this;
    }

    run() {
        stopSetInterval(() => {
            this.checkThrowableObjects();
        }, 150);

        stopSetInterval(() => {
            this.checkCollisions();
            this.checkGameEnd();
        }, 60);
    }

    checkThrowableObjects() {
        if (this.character.bottle > 0 && this.keyboard.Space) {
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 150);
            this.throwableObject.push(bottle);
            this.character.bottle--;
            this.statusBarBottle.setPercentage(this.character.bottle);// Aktualisiert die StatusBar.
        }
    }

    checkCollisions() {
        this.checkCollisionsEnemy();
        this.checkCollisionsThrowable();
        this.checkCollisionsBottle();
        this.checkCollisionsCoin();
    }

    checkCollisionsEnemy() {
        this.level.enemies.forEach((enemy, y) => { //Schleife die durch das level enemies irretiert
            if (this.character.isColliding(enemy)) {   // prüft ob der character kontakt hat          
                if (this.character.speedY < 0 && this.character.isAboveGround()) { //überprüft ob der character in der luft ist oder ob er sich auf den boden befindet
                    this.level.enemies[y].hit(5); // gibt den gegner 5 schaden    
                } else if (!this.level.enemies[y].isDead()) {// ab hier bekommt der character 5 schaden 
                    this.character.hit(5);
                    this.statusBarHealth.setPercentage(this.character.hp)
                }
            }
        });
    }

    checkCollisionsThrowable() {
        this.throwableObject.forEach((bottle, i) => {// prüft ob Flaschen vorhanden sind.
            this.level.enemies.forEach((enemy, y) => {//püft ob es ein Kontact zwischen Flasche und Gegner gibt
                if (bottle.isColliding(world.level.enemies[0])) { // kontakt endboss
                    this.throwableObject.splice(bottle);
                    this.level.enemies[0].hit();// fügt ein Schaden von 5
                    this.statusBarEndboss.setPercentage(world.level.enemies[0].hp)

                } else if (bottle.isColliding(enemy)) { // kontakt Gegener
                    this.throwableObject.splice(bottle);
                    this.level.enemies[y].hit();// fügt ein Schaden von 5
                }
            });
        });
    }

    checkCollisionsBottle() {
        this.level.bottle.forEach((bottle) => {// eine Schleife die durch alle Flaschen in der Welt irritiert.
            if (this.character.isColliding(bottle)) {// prüft ob es einen Kontakt zwischen Character und Flasche gibt.
                this.character.bottle++;
                this.statusBarBottle.setPercentage(this.character.bottle);// füllt die Statusbar auf.
                this.level.bottle.splice(this.level.bottle.indexOf(bottle), 1)//Entfernt die Flaschen aus der Welt.
            }
        });
    }

    checkCollisionsCoin() {
        this.level.coin.forEach((coin) => {// eine Schleife die durch alle Coins in der Welt irritiert.
            if (this.character.isColliding(coin)) {// prüft ob des einen kontakt zwischen Character und Coin gibt.
                this.character.coin++;
                this.statusBarCoin.setPercentage(this.character.coin);//füllt die StatusBar auf.
                this.level.coin.splice(this.level.coin.indexOf(coin), 1)// Entfernt die Coins aus der Welt.
            }
        });
    }
    // draw wird immer wieder aufgerufen.
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);// fügt die Hintergrundbilder zur Welt.
        this.ctx.translate(-this.camera_x, 0);
        this.drawFunctions();
        let self = this;//let self = this; definiert eine lokale Variable namens self, die auf das this-Objekt verweist, das normalerweise das Objekt ist, in dem die Funktion aufgerufen wird.
        requestAnimationFrame(function () {//ruft eine Browser-API auf, um eine Animation zu starten. Das function () {...} wird als Rückruf-Funktion an die requestAnimationFrame-Funktion übergeben und wird ausgeführt, wenn die Animation bereit ist, ein neues Frame zu rendern.
            self.draw();
        });
    }

    checkGameEnd() {
        if (this.endanimation >= 150) {
            stopGame();
        }
    }

    // spielt das Win Bild ein
    drawWinGameScreen() {
        if (this.level.enemies[0].hp == 0) {
            this.endanimation++;
            if (this.endanimation > 150) {
                const canvas = document.getElementById('canvas');
                canvas.style.cursor = 'pointer';
                this.addToMap(this.winGame);
                canvas.addEventListener('click', restart);
            }
        }
    }
    // spielt das GameOver Bild ein
    drawGameOverScreen() {
        if (this.character.hp == 0) {
            this.endanimation++;
            if (this.endanimation > 150) {
                const canvas = document.getElementById('canvas');
                canvas.style.cursor = 'pointer';
                this.addToMap(this.gameOver);
                canvas.addEventListener('click', restart);
            }
        }
    }

    drawfullscreen() {
        if (this.fullscreen) {
            this.addToMap(this.nofullScreen);

        } else {
            this.addToMap(this.fullScreen);
        }
    }

    drawsound() {
        if (this.soundIsMute) {
            this.addToMap(this.soundMute);
        } else {
            this.addToMap(this.sound);
        }
    }

    drawFunctions() {
        this.drawfullscreen();
        this.drawsound();
        this.drawArrowsImg();
        this.drawLevelItems();
        this.drawStatusBars();
        this.drawGameOverScreen();
        this.drawWinGameScreen();
    }

    drawStatusBars() {
        /*this.addToMap(this.startButton);*/
        this.addToMap(this.statusBarHealth);// fügt die Statusbar Health in die Welt
        this.addToMap(this.statusBarCoin);// fügt die Statusbar Coin in die Welt
        this.addToMap(this.statusBarBottle);// fügt die Statusbar Bottle in die Welt
        this.addToMap(this.statusBarEndboss);// fügt die StatusBar Endboss in die Welt
        this.addToMap(this.statusBarEndbossImg);//fügt ein Img Endboss Bild ein
    }

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

    drawLevelItems() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.clouds);// fügt die Wolken zur Welt. 
        this.addObjectsToMap(this.level.enemies);// fügt die Hühner zur Welt.
        this.addObjectsToMap(this.level.bottle);// fügt die Flaschen zur Welt.
        this.addObjectsToMap(this.level.coin);// fügt die Coins zur Welt.
        this.addObjectsToMap(this.throwableObject);// fügt die Flaschen zur Welt.
        this.addToMap(this.character);// fügt den Character zur Welt.
        this.ctx.translate(-this.camera_x, 0);
    }

    // Die Funktion iteriert über jedes Objekt im Array (forEach-Schleife) und fügt es der Karte (Map) hinzu, indem es die Methode addToMap(o) aufruft.
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);

        });
    }

    //Eine Methode, die auf das Canavas-Element zeichnet.
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
        //mo.img: das Bildobjekt, das auf dem Canvas gezeichnet werden soll
        // mo.x: die x-Position des Bildes auf dem Canvas
        // mo.y: die y-Position des Bildes auf dem Canvas
        //mo.width: die Breite des Bildes auf dem Canvas
        //mo.height: die Höhe des Bildes auf dem Canvas
    }

    flipImage(mo) {
        this.ctx.save();// speichert den aktuellen contex.
        this.ctx.translate(mo.width, 0);//drehen das bild einmal.
        this.ctx.scale(-1, 1);// hier wird das Bild verschoben um die breite des elements.
        mo.x = mo.x * -1;// hier spiegeln wir die x coordinate
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    curserClickFull() {
        this.canvas.addEventListener('mousemove', (event) => {
            this.setCursor(event);
        });
    }

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

    removeFullscreenClickHandler() {
        this.canvas.removeEventListener('click', this.addFullscreenClickHandler);
    }

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

    curserClickSound() {
        this.canvas.addEventListener('mousemove', this.handleSoundMousemove);
    }

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

    /*mobile() {
        if ((!this.playIndikator) && (window.innerWidth > window.innerHeight)) {
            this.addToMap(this.turnMobile);
            console.log('Mobile');
        }
    }*/
}