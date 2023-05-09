class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;


    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 2500; // Zahl zwischen 200 und 700.
        this.animate();
    }

    /**
    *The animate() method updates the position of the character by moving it to the left at a consistent rate of 60 frames per second.
    *It achieves this by calling the moveLeft() method of the character object within a setInterval() function, which repeats the function call at the specified interval of 1000ms / 60 frames per second.
    */
    animate() {
        stopSetInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }   
}