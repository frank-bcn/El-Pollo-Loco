let canvas;
let world;
let keyboard = new Keyboard();

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
}

function startGameNow() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
}

function fullscreen() {
    document.getElementById('canvas').style = "width:100%;height:100vh";
    fullscreenIconExchange();
}

function closeFullscreen() {
    document.getElementById('canvas').style = "width:720px;height:480px";
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
    world.character.walking_sound.muted = false;
    world.character.walking_sound.play();

    world.character.jump_sound.muted = false;
    world.character.jump_sound.play();
    muteExchange();
}

function soundMute() {
    world.character.walking_sound.muted = true;
    world.character.walking_sound.pause();

    world.character.jump_sound.muted = true;
    world.character.jump_sound.pause();
    soundExchange();
}

function soundExchange() {
    document.getElementById('mute').classList.add('d-none');
    document.getElementById('speaker').classList.remove('d-none');
}

function muteExchange() {
    document.getElementById('speaker').classList.add('d-none');
    document.getElementById('mute').classList.remove('d-none');
}