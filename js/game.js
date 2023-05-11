let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let ctx;
let playIndikator = false;
let checkmobile = false;

let audioFiles = [
    music_sound = new Audio('audio/music.mp3'),
    walking_sound = new Audio('audio/walking.mp3'),
    jump_sound = new Audio('audio/jump.mp3'),
    trow_sound = new Audio('audio/throw.mp3'),
    bottle_sound = new Audio('audio/bottles.mp3'),
    coin_sound = new Audio('audio/collect-coins.mp3'),
    dying_sound = new Audio('audio/dying.mp3'),
    hit_endboss = new Audio('audio/hit_endboss.mp3'),
    hit_enemies_sound = new Audio('audio/hitChicken.mp3'),
    hurt_sound = new Audio('audio/hurt.mp3'),
    loose_sound = new Audio('audio/loose.mp3'),
    snooring_sound = new Audio('audio/snoring.mp3'),
    win_sound = new Audio('audio/win.mp3')
];


window.addEventListener("keydown", (event) => {
    if (event.keyCode == 39) {
        keyboard.Right = true;
        audioFiles[1].play(); 
    }

    if (event.keyCode == 37) {
        keyboard.Left = true;
        audioFiles[1].play(); 
    }

    if (event.keyCode == 38) {
        keyboard.Up = true;
    }

    if (event.keyCode == 40) {
        keyboard.Down = true;
    }

    if (event.keyCode == 32) {
        keyboard.Space = true;
        audioFiles[3].play();
    }
});

window.addEventListener("keyup", (event) => {
    if (event.keyCode == 39) {
        keyboard.Right = false;
        audioFiles[1].pause(); 
    }

    if (event.keyCode == 37) {
        keyboard.Left = false;
        audioFiles[1].pause(); 
    }

    if (event.keyCode == 38) {
        keyboard.Up = false;
    }

    if (event.keyCode == 40) {
        keyboard.Down = false;
    }

    if (event.keyCode == 32) {
        keyboard.Space = false;
        audioFiles[3].play();
    }
});

/**
*startScreen()
*This function sets up the start screen of the game. It gets the canvas element and adds a click event listener to it.
*When the canvas is clicked, it checks if the click was within a certain area, and if it was, it starts the game.
*It also adds a mousemove event listener to change the cursor when the mouse is hovering over the clickable area.
*Finally, it calls the viewportMobile() function every 10 milliseconds to adjust the game viewport on mobile devices.
*/
function startScreen() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const buttonRadius = 40;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let scale = 1;
    let animationId;

    function animate() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        const scaledRadius = buttonRadius * scale;

        context.fillStyle = 'black';
        context.beginPath();
        context.arc(centerX, centerY, scaledRadius, 0, 2 * Math.PI);
        context.fill();
        const fontSize = 24;
        context.font = `${fontSize}px Arial`;
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText('Play', centerX, centerY);
        scale += 0.01;
        if (scale >= 1.2) {
            scale = 1;
        }

        animationId = requestAnimationFrame(animate);
    }

    const clickHandler = function (event) {
        cancelAnimationFrame(animationId);
        const x = event.offsetX;
        const y = event.offsetY;
        const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        if (distance <= buttonRadius) {
            startGame();
            canvas.removeEventListener('click', clickHandler);
        }
    };

    canvas.addEventListener('mousemove', function (event) {
        const x = event.offsetX;
        const y = event.offsetY;
        const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        if (distance <= buttonRadius) {
            canvas.style.cursor = 'pointer';
        } else {
            canvas.style.cursor = 'default';
        }
    });

    animate();

    canvas.addEventListener('click', clickHandler);
}

/**
*startGame()
*This function is called when the user clicks on the start button and starts the game. It initializes the level, sets up the canvas and keyboard controls, creates a new world object, and sets the play indicator to true. It also plays the background music and sets its volume to 0.1.
*/
function startGame() {
    intervalIds = [];
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    playIndikator = true;
    sound();
    audioFiles[0].loop = true; // Setzen Sie die loop-Eigenschaft auf true
    audioFiles[0].play();
}

/**
*fullscreen()
*This function sets the canvas element to occupy the full screen by modifying the width and height properties of the canvas element.
*Additionally, it sets the fullscreen property of the world object to true.
*/
function fullscreen() {
    document.getElementById('canvasFull').style = "width:100%;height:100%";
    document.getElementById('canvas').style = "width:100%;height:100%";
    world.fullscreen = true;
}

/**
*closeFullscreen()
*This function is called when the user wants to exit the full-screen mode. It checks the current window width and adjusts the size of the canvas accordingly. If the width is less than 720px, the canvas is set to 100% width. Otherwise, the canvas is set to a fixed size of 720px x 480px. The full-screen flag of the world object is set to false.
*/
function closeFullscreen() {
    if (window.innerWidth < 720) {
        document.getElementById('canvasFull').style = "width:100%";
        document.getElementById('canvas').style = "width:100%";
    } else {
        document.getElementById('canvasFull').style = "width:720px;height:480px";
        document.getElementById('canvas').style = "width:720px;height:480px";
    }
    world.fullscreen = false;
}

/**
*soundMute()
*This function mutes all audio files in the game by setting their "muted" property to true.
*It also sets the "soundIsMute" property of the world object to true to indicate that the sound is muted.
*/
function soundMute() {
    audioFiles.forEach((e => e.muted = true));
    world.soundIsMute = true;
}

/** 
*sound()
*This function unmutes all the audio files used in the game and sets their volume to 0.1, which represents a low volume. It also sets the soundIsMute property of the world object to false, indicating that the sound is enabled.
*/
function sound() {
    audioFiles.forEach((e => {
        e.muted = false;
        e.volume = 0.5;
    }))
    world.soundIsMute = false;
}

/**
*stopSetInterval()
*Sets an interval for a given function to run at a given time interval and adds its ID to an array of interval IDs.
@param {Function} fn - The function to be executed at the given time interval.
@param {number} time - The time interval at which the function should be executed.
*/
function stopSetInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

/**
* stopGame()
* Stops all intervals that are currently running and clears the intervalIds array.
*/
function stopGame() {
    intervalIds.forEach(clearInterval);
    intervalIds = [];  
    audioFiles[0].pause();
}

/**
* restart()
* Resets the game to its initial state for a new playthrough.
* Removes the click event listener and sets the cursor style to 'default'.
* Initializes the game level, creates a new world, and resets the end animation.
*/
function restart() {
    canvas.getContext("2d").clearRect(0, 0, 720, 480);
    canvas.style.cursor = 'default';
    canvas.removeEventListener('click', restart);
    world.character.hp = 100;
    world.level.enemies[0].hp = 200;
    endanimation = 0;
    
    const isMuted = world.soundIsMute;
    
    if (isMuted) {
        soundMute();
    } else {
        sound();
    }
    
    startGame();
    
    if (isMuted) {
        soundMute();
    }
}


/**
* viewportMovil()
* Checks if the device is a mobile device and initiates the necessary mobile functions
* like enabling touch controls and changing the game canvas to fit the screen size.
*/
function viewportMobile() {
    requestAnimationFrame(() => {
        const isMobile = /Mobil/.test(navigator.userAgent);
        if (isMobile) {
            yesMobil();
            mobileTouch();
            checkmobile = true;
        }
    })
}

/**
*yesMobil()
*Checks if the window width is greater than the height. If true, calls the formatLandscape() function, otherwise calls the formatPortrait() function.
*/
function yesMobil() {
    if (window.innerWidth > window.innerHeight) {
        formatLandscape();
    } else {
        formatPortrait();
    }
}

/**
*formatLandscape()
*Sets the styles for the full-screen canvas and the regular canvas to fit a landscape viewport.
*Removes the 'd-none' class from the regular canvas to display it.
*/
function formatLandscape() {
    document.getElementById('canvasFull').style = "width:100%;height:100vh";
    document.getElementById('canvas').style = "width:100%;height:100vh";
    document.getElementById('canvas').classList.remove('d-none');
}

/**
*formatPortrait()
*Changes the formatting of the game canvas and adds a background image to the body for portrait mode.
*The canvas is hidden and its parent element is set to full width and height.
*A new image is loaded and set as the background for the body with a size of 80%.
*/
function formatPortrait() {
    let body = document.querySelector('body');
    let newImg = new Image();
    newImg.onload = function () {
        body.style.backgroundImage = "url('img/turn-device.png')";
        body.style.backgroundSize = "80%";
    };
    newImg.src = "img/turn-device.png";
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('canvasFull').style = "width:100%;height:100vh";
    document.getElementById('canvas').style = "width:100%;height:100vh";
}

/**
*mobileTouch()
*Listens for touch events on the canvas element and maps them to keyboard inputs for mobile devices.
*/
function mobileTouch() {
    const distance = 15;
    const canvas = document.getElementById('canvas');
    canvas.addEventListener("touchstart", (event) => {
        if (event.touches.length === 1) {
            const touch = event.touches[0];
            /*console.log(`x: ${touch.clientX}, y: ${touch.clientY}`);*/
            if ((touch.clientX >= (64 - distance) && touch.clientX <= (64 + distance) && touch.clientY >= (352 - distance) && touch.clientY <= (352 + distance))) {
                keyboard.Left = true;
            } else if ((touch.clientX >= (215 - distance) && touch.clientX <= (215 + distance) && touch.clientY >= (352 - distance) && touch.clientY <= (352 + distance))) {
                keyboard.Right = true;
            } else if ((touch.clientX >= (359 - distance) && touch.clientX <= (359 + distance) && touch.clientY >= (352 - distance) && touch.clientY <= (352 + distance))) {
                keyboard.Up = true;
            } else if ((touch.clientX >= (479 - distance) && touch.clientX <= (479 + distance) && touch.clientY >= (352 - distance) && touch.clientY <= (352 + distance))) {
                keyboard.Space = true;
            }
        }
    });
    mobileTouchEnd(canvas);
}

/**
*mobileTouchEnd()
*Adds a touch end event listener to the canvas that sets all keyboard values to false when a touch ends.
@param {HTMLElement} canvas - The canvas element to which the touch end event listener is added.
*/
function mobileTouchEnd(canvas) {
    canvas.addEventListener("touchend", (touchEndEvent) => {
        keyboard.Left = false;
        keyboard.Right = false;
        keyboard.Up = false;
        keyboard.Space = false;
    });
}




