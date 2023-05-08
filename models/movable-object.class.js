class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    lastHit = 0;

    offset = { top: 0, bottom: 0, left: 0, right: 0 };


    /**
    *applyGravity
    *This method applies gravity to the object, causing it to fall towards the ground. It is implemented using a setInterval method that repeatedly updates the object's position by decreasing its Y-coordinate at a rate determined by the object's speed and acceleration.
    */
    applyGravity() {
        stopSetInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
    *isAboveGround
    *This method checks if the current object is above the ground or not. If the object is an instance of ThrowableObject, it always returns true since throwable objects can be thrown above the ground level. For other objects, it checks if the y-coordinate of the object is less than 135, which is the ground level. It returns true if the object is above the ground and false otherwise.
    */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 135;
        }
    }

    /**
    *isColliding()
    *This method checks if two objects are colliding. It returns a boolean value indicating whether the current object collides with the object passed as a parameter. The collision detection algorithm takes into account the offset values of the objects, which define the amount of space between the object's boundary and its content.
    *The method returns true if the current object collides with the passed object, false otherwise.
    */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
    *hit()
    *Reduces the object's hit points (hp) by 5. If the hp falls below 0, it is set to 0.
    *Otherwise, the object's lastHit property is updated with the current timestamp.
    */
    hit() {
        this.hp -= 5;
        if (this.hp < 0) {
            this.hp = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
    *isHurt()
    *This method checks if the object has been hit recently. It calculates the time elapsed since the last hit and returns true if it has been less than one second, indicating that the object is still hurt and can't be hit again. Otherwise, it returns false, indicating that the object has recovered and can be hit again.
    */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
    *isDead()
    *This method checks whether the object is dead or not by checking its health points (hp).
    *If the hp is zero, it means the object is dead, and the method returns true.
    *If the hp is not zero, the object is alive, and the method returns false.
    */
    isDead() {
        return this.hp == 0;
    }

    /**
    *playAnimation(images)
    *This method plays an animation by displaying a series of images in sequence. The method expects an array of image paths as an argument. It uses the currentImage property to keep track of the current image being displayed and updates it to the next image in the sequence each time the method is called. The method also uses the imageCache property to store preloaded images for better performance. It sets the img property to the next image in the sequence each time the method is called, which allows the object to be redrawn with the new image in the next animation frame.
    */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
    *moveRight()
    *This method moves the object to the right by adding its current speed value to its x-coordinate.
    *It also sets the otherDirection property to false, indicating that the object is facing right.
    @returns {void}
    */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
    *The moveLeft() 
    *method moves the object to the left by updating its x position with the negative value of its speed property. The otherDirection property is set to false, indicating that the object is moving to the left. An optional audio playback feature is currently commented out.
    */
    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = false; 
    }

    /**
    jump()
    *This method sets the vertical speed of the object to a positive value, causing it to move upwards on the screen as if it were jumping. It also triggers an audio sound effect.
    */
    jump() {
        this.speedY = 30;
    }
}