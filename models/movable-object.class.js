class MovableObject {
    x = 120;
    y = 270;
    img;
    height = 150;
    width = 100;
    imageCache = {};


    loadImage(path) {
        this.img = new Image(); //
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = path;
        });
    }

    moveRight() {
            console.log('moving right');

        }

    moveLeft() {

        }
}