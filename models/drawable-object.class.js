class DrawableObject {
    height = 150;
    width = 100;
    x = 120;
    y = 240;
    img;
    imageCache = {};
    currentImage = 0;


    loadImage(path) {
        this.img = new Image(); //
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)//ctx.drawImage ist eine Canvas-API-Methode, die ein Bild auf dem Canvas zeichnet. Die Methode erwartet vier Parameter:
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)';
            this.imageCache[path] = img;
        });
    }
}