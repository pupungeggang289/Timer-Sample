window.onload = main;
window.onerror = errorHandle;
window.oncontextmenu = rightClick;

var canvas;
var context;
var canvasRect;
var gameStartTime;
var gameTime;

var rect = [];

function main() {
    canvas = document.getElementById('game');
    context = canvas.getContext('2d');
    canvasRect = canvas.getBoundingClientRect();

    canvas.addEventListener('mouseup', mouseUp, false);

    gameStartTime = Date.now();

    loop();
}

function loop() {
    gameTime = Date.now() - gameStartTime;

    draw();

    requestAnimationFrame(loop);
}

function draw() {
    context.fillStyle = 'black';
    context.font = '36px Opensans';

    context.clearRect(0, 0, 1024, 576);
    context.fillText(`${gameTime}`, 16, 40);

    rectRemove();

    for (let i = 0; i < rect.length; i++) {
        context.fillRect(rect[i]['Position'][0] - 16, rect[i]['Position'][1] - 16, 32, 32);
    }
}

function rectCreate(x, y) {
    let tempRect = {'Position' : [x, y], 'CreateTime' : gameTime};

    rect.push(tempRect);
}

function rectRemove() {
    let i = 0;

    while (i < rect.length) {
        if (gameTime - rect[i]['CreateTime'] > 5000) {
            rect.splice(i, 1);
        } else {
            i++;
        }
    }
}

function mouseUp(event) {
    let x = event.clientX - canvasRect.left;
    let y = event.clientY - canvasRect.top;

    rectCreate(x, y); 
}

function errorHandle() {
    cancelAnimationFrame(loop);
}

function rightClick() {
    return false;
}
