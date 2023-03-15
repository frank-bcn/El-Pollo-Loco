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
    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0, )
    ];
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }




    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addToMap(this.character);// fügt den Character zur Welt.
        this.addObjectsToMap(this.clouds);// fügt die Wolken zur Welt. 
        this.addObjectsToMap(this.enemies);// fügt die Hühner zur Welt.
        this.addObjectsToMap(this.backgroundObjects);// fügt die Hintergrundbilder zur Welt.


        // draw wird immer wieder aufgerufen.
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);

        });

    }
    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height)
    }
}