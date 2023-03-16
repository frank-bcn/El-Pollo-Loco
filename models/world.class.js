class World {
    character = new Character();
    enemies = level1.enemies;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }




    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.backgroundObjects);// fügt die Hintergrundbilder zur Welt.

        this.addObjectsToMap(this.clouds);// fügt die Wolken zur Welt. 

        this.addToMap(this.character);// fügt den Character zur Welt.

        this.addObjectsToMap(this.enemies);// fügt die Hühner zur Welt.

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
            this.ctx.save();// speichert den aktuellen contex.
            this.ctx.translate(mo.width, 0);//drehen das bild einmal.
            this.ctx.scale(-1, 1);// hier wird das Bild verschoben um die breite des elements.
            mo.x = mo.x * -1;// hier spiegeln wir die x coordinate
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height)//ctx.drawImage ist eine Canvas-API-Methode, die ein Bild auf dem Canvas zeichnet. Die Methode erwartet vier Parameter:
        if (mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
        //mo.img: das Bildobjekt, das auf dem Canvas gezeichnet werden soll
        // mo.x: die x-Position des Bildes auf dem Canvas
        // mo.y: die y-Position des Bildes auf dem Canvas
        //mo.width: die Breite des Bildes auf dem Canvas
        //mo.height: die Höhe des Bildes auf dem Canvas
    }
}