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
    throwableObject = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkThrowableObjects();
            this.checkCollisions();
        }, 40);
    }

    checkThrowableObjects() {
        if (this.keyboard.Space) {
            let bottle = new ThrowableObject(this.character.x + 110, this.character.y + 120);
            this.throwableObject.push(bottle);
        }
    }

    checkCollisions() {
        this.checkCollisionsEnemy();
        this.checkCollisionsThrowable();
    }

    checkCollisionsEnemy() {
        this.level.enemies.forEach((enemy, y) => { //Schleife die durch das level enemies irretiert
            if (this.character.isColliding(enemy)) {   // prüft ob der character kontakt hat          
                if (this.character.speedY < 0 && this.character.isAboveGround()) { //überprüft ob der character in der luft ist oder ob er sich auf den boden befindet
                    this.level.enemies[y].hit(5); // gibt den gegner 10 schaden 
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
                if (bottle.isColliding(enemy)) { // kontakt Gegener
                    this.level.enemies[y].hit(5);// fügt ein Schaden von 5
                    this.throwableObject[i].hit(5);
                }
            });
        });
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);// fügt die Hintergrundbilder zur Welt.


        this.ctx.translate(-this.camera_x, 0);
        // fixed objects
        this.addToMap(this.statusBarHealth);// fügt die Statusbar Health in die Welt
        this.addToMap(this.statusBarCoin);// fügt die Statusbar Coin in die Welt
        this.addToMap(this.statusBarBottle);// fügt die Statusbar Bottle in die Welt

        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);// fügt den Character zur Welt.

        this.addObjectsToMap(this.level.clouds);// fügt die Wolken zur Welt. 

        this.addObjectsToMap(this.level.enemies);// fügt die Hühner zur Welt.

        this.addObjectsToMap(this.level.bottle);// fügt die Flaschen zur Welt.
       
        this.addObjectsToMap(this.throwableObject);// fügt die Flaschen zur Welt.   

        this.ctx.translate(-this.camera_x, 0);



        // draw wird immer wieder aufgerufen.
        let self = this;//let self = this; definiert eine lokale Variable namens self, die auf das this-Objekt verweist, das normalerweise das Objekt ist, in dem die Funktion aufgerufen wird.
        requestAnimationFrame(function () {//ruft eine Browser-API auf, um eine Animation zu starten. Das function () {...} wird als Rückruf-Funktion an die requestAnimationFrame-Funktion übergeben und wird ausgeführt, wenn die Animation bereit ist, ein neues Frame zu rendern.
            self.draw();
        });
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
        mo.drawFrame(this.ctx);
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
}