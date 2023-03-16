class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud()
    ];
    backgroundObjects = [ // fügt die Backgroundbilder ein. Reihenfolgen beachten, das das letzte bild als erstes erstellt wird!
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0,),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
    ];
    canvas;
    ctx;
    keyboard;


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
        this.addObjectsToMap(this.backgroundObjects);// fügt die Hintergrundbilder zur Welt.
        this.addObjectsToMap(this.clouds);// fügt die Wolken zur Welt. 
        this.addToMap(this.character);// fügt den Character zur Welt.
        this.addObjectsToMap(this.enemies);// fügt die Hühner zur Welt.



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
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height)//ctx.drawImage ist eine Canvas-API-Methode, die ein Bild auf dem Canvas zeichnet. Die Methode erwartet vier Parameter:
        //mo.img: das Bildobjekt, das auf dem Canvas gezeichnet werden soll
        // mo.x: die x-Position des Bildes auf dem Canvas
        // mo.y: die y-Position des Bildes auf dem Canvas
        //mo.width: die Breite des Bildes auf dem Canvas
        //mo.height: die Höhe des Bildes auf dem Canvas
    }
}