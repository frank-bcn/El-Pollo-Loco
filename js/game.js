let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}




window.addEventListener("keydown", (event) => {
    if(event.keyCode == 39) {
        keyboard.Right = true;
    }

    if(event.keyCode == 37) {
        keyboard.Left = true;
    }

    if(event.keyCode == 38) {
        keyboard.Up = true;
    }

    if(event.keyCode == 40) {
        keyboard.Down = true;
    }

    if(event.keyCode == 32) {
        keyboard.Space = true;
    }
});

window.addEventListener("keyup", (event) => {
    if(event.keyCode == 39) {
        keyboard.Right = false;
    }

    if(event.keyCode == 37) {
        keyboard.Left = false;
    }

    if(event.keyCode == 38) {
        keyboard.Up = false;
    }

    if(event.keyCode == 40) {
        keyboard.Down = false;
    }

    if(event.keyCode == 32) {
        keyboard.Space = false;
    }
});


async function startGame() {
    await setTimeout(startGameNow, 100);
    document.getElementById('startscreen').classList.add('d-none');
}

function startGameNow() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    gameOver();
  }

  function fullscreen() {
    document.getElementById('canvas').style = "width:100%;height:100%";
    fullscreenIconExchange();
  }

  function closeFullscreen() {
    document.getElementById('canvas').style = "width:100%,aspect-ratio:3/2";
    closeFullscreenIconExchange();
  }

  function fullscreenIconExchange() {
    document.getElementById('fullscreen-icon').classList.add('d-none');
    document.getElementById('nofullscreen-icon').classList.remove('d-none');
}

function closeFullscreenIconExchange() {
    document.getElementById('fullscreen-icon').classList.remove('d-none');
    document.getElementById('nofullscreen-icon').classList.add('d-none');
}