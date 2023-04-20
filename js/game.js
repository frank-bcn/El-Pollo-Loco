let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];

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


function startGame() {

    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    document.getElementById('panal').classList.remove('d-none');
    document.getElementById('discription').style.marginTop = "0";
    document.getElementById('btnStart').style.display = 'none';
}



function fullscreen() {
    let canvasFull = document.getElementById('canvasFull');
    if (canvasFull.requestFullscreen) {
        canvasFull.requestFullscreen();
    } else if (canvasFull.webkitRequestFullscreen) {
        canvasFull.webkitRequestFullscreen();
    } else if (canvasFull.msRequestFullscreen) {
        canvasFull.msRequestFullscreen();
    }
    canvas.style = "width:100%;height:100%";
    fullscreenIconExchange();
}

function closeFullscreen() {
    let canvas = document.getElementById('canvas');
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    canvas.style = "width:720px;height:480px";
    closeFullscreenIconExchange();
}

function fullscreenIconExchange() {
    document.getElementById('fullscreen').classList.add('d-none');
    document.getElementById('nofullscreen').classList.remove('d-none');
}

function closeFullscreenIconExchange() {
    document.getElementById('fullscreen').classList.remove('d-none');
    document.getElementById('nofullscreen').classList.add('d-none');
}

function sound() {
    muteExchange();
}

function soundMute() {
    soundExchange();
}

function soundExchange() {
    document.getElementById('mute').classList.add('d-none');
    document.getElementById('speaker').classList.remove('d-none');
    audioFiles.forEach((e => e.muted = false));
    audioFiles.volume = 0;
}

function muteExchange() {
    document.getElementById('speaker').classList.add('d-none');
    document.getElementById('mute').classList.remove('d-none');
    audioFiles.forEach((e => e.muted = true));
}
