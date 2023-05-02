class DrawableObject {
    height = 150;
    width = 100;
    x = 120;
    y = 240;
    img;
    imageCache = {};
    currentImage = 0;


    /**
    *loadImage(path)
    *This method loads an image file from the specified path and stores it in the instance variable "img". It creates a new Image object and sets its src property to the path argument.
    */
    loadImage(path) {
        this.img = new Image(); //
        this.img.src = path;
    }

    /**
    *draw
    *This method is responsible for drawing an image onto the canvas using the given context object.
    *It utilizes the Canvas API method "drawImage()" to draw the image at the specified x and y coordinates, with the given width and height.
    @param {CanvasRenderingContext2D} ctx - The 2D rendering context used to draw on the canvas.
    */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch(e) {
        }
    }

    /**
    *loadImages
    *This method takes an array of image paths and loads each image into the cache. The images are stored in an object called imageCache with the path as the key and the image object as the value. Each image object is created using the Image() constructor and has its src property set to the corresponding path from the array. The method also sets the style property of the image object to "transform: scaleX(-1)", which flips the image horizontally.
    @param {Array} arr - An array of image paths to load into the cache.
    */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)';
            this.imageCache[path] = img;
        });
    }
}