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
    hit_enemies_sound = new Audio('audio/hitChicken.mp3'),
    broken_glas_sound = new Audio('audio/glas.mp3'),
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
    }

    if (event.keyCode == 37) {
        keyboard.Left = true;
    }

    if (event.keyCode == 38) {
        keyboard.Up = true;
    }

    if (event.keyCode == 40) {
        keyboard.Down = true;
    }

    if (event.keyCode == 32) {
        keyboard.Space = true;
    }
});

window.addEventListener("keyup", (event) => {
    if (event.keyCode == 39) {
        keyboard.Right = false;
    }

    if (event.keyCode == 37) {
        keyboard.Left = false;
    }

    if (event.keyCode == 38) {
        keyboard.Up = false;
    }

    if (event.keyCode == 40) {
        keyboard.Down = false;
    }

    if (event.keyCode == 32) {
        keyboard.Space = false;
    }
});

function startScreen() {
    const canvas = document.getElementById('canvas');
    const clickHandler = function (event) {
        const x = event.offsetX - canvas.width / 2;
        const y = event.offsetY - canvas.height / 2;
        if (Math.abs(x) <= 50 && Math.abs(y) <= 50) {
            startGame();
            canvas.removeEventListener('click', clickHandler);
        }
    };
    canvas.addEventListener('mousemove', function (event) {
        const x = event.offsetX - canvas.width / 2;
        const y = event.offsetY - canvas.height / 2;
        if (Math.abs(x) <= 50 && Math.abs(y) <= 50) {
            canvas.style.cursor = 'pointer';
        } else {
            canvas.style.cursor = 'default';
        }
    });
    stopSetInterval(() => {
        viewportMobile();
    }, 10);

    canvas.addEventListener('click', clickHandler);
}

function startGame() {
    intervalIds = [];
    initLevel();
    /*audioFiles[0].play();
    audioFiles[0].volume = 0.1;*/
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    playIndikator = true;
}

function fullscreen() {
    document.getElementById('canvasFull').style = "width:100%;height:100%";
    document.getElementById('canvas').style = "width:100%;height:100%";
    world.fullscreen = true;
}

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

function soundMute() {
    audioFiles.forEach((e => e.muted = true));
    world.soundIsMute = true;
}

function sound() {
    audioFiles.forEach((e => {
        e.muted = false;
        e.volume = 0.1;
    }))
    world.soundIsMute = false;
}

function stopSetInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

function stopGame() {
    intervalIds.forEach(clearInterval);
    intervalIds = [];
}

function restart() {
    initLevel();
    world = new World(canvas, keyboard);
    ctx = canvas.getContext('2d');
    canvas = document.getElementById('canvas');
    endanimation = 0;
    /*audioFiles[0].play();
    audioFiles[0].volume = 0.1;*/
}

function viewportMobile() {
    requestAnimationFrame(() => {
        const isMobile = /Mobil/.test(navigator.userAgent);
        if (isMobile) {
            yesMobil();
            checkmobile = true;
        }
    })
}

function yesMobil() {
    if (window.innerWidth > window.innerHeight) {
        formatLandscape();
    } else {
        formatPortrait();
    }
}

function formatLandscape() {
    document.getElementById('canvasFull').style = "width:100%;height:100vh";
    document.getElementById('canvas').style = "width:100%;height:100vh";
    document.getElementById('canvas').classList.remove('d-none');
}

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