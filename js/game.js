let canvas;
let world;
let keyboard = new Keyboard();

let audioFiles = [
    walking_sound = new Audio('audio/run.mp3'),
    jump_sound = new Audio('audio/jump.mp3'),
    hit_enemies_sound = new Audio('audio/chicken.mp3'),
    broken_glas_sound = new Audio('audio/glas.mp3'),
    trow_sound = new Audio('audio/throw.mp3'),
  ];

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

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


async function startGame() {
    await setTimeout(startGameNow, 100);
    document.getElementById('startscreen').classList.add('d-none');
    document.getElementById('panal').classList.remove('d-none');
    document.getElementById('discription').style.marginTop = "0";
}

function startGameNow() {
    canvas = document.getElementById('canvas');
    document.getElementById('canvas').classList.remove('d-none');
    world = new World(canvas, keyboard);
}

function fullscreen() {
    var canvasFull = document.getElementById('canvasFull');
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
    var canvas = document.getElementById('canvas');
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

function gameOver() {
    document.getElementById('gameOver').classList.remove('d-none');
    document.getElementById('startscreen').classList.add('d-none');
    document.getElementById('panal').classList.add('d-none');
    document.getElementById('discription').classList.add('d-none');
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('canvasFull').classList.add('d-none');
}

