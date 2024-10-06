//This is a Free 404 error page Please consider supporting the developer https://customersupport.click/2QL77N
const canvas = document.getElementById('flappyBird');
const context = canvas.getContext('2d');


function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const gap = Math.floor(canvas.height / 4);
const pipeWidth = Math.floor(canvas.width / 15);
const pipeHeight = Math.floor(canvas.height / 3);
let birdRadius = Math.floor(canvas.height / 25);
let bX = Math.floor(canvas.width / 5);
let bY = canvas.height / 2;
const gravity = 2;
let score = 0;
const flapHeight = Math.floor(canvas.height / 20);
const newPipePosition = Math.floor(canvas.width / 2);


let pipes = [];
pipes[0] = { x: canvas.width, y: 0 };


document.addEventListener("keydown", moveUp);
function moveUp() {
    bY -= flapHeight;
}


function drawBird() {
    context.beginPath();
    context.arc(bX + birdRadius, bY + birdRadius, birdRadius, 0, Math.PI * 2);
    context.fillStyle = "#FF6B6B";
    context.fill();
    context.closePath();
}


function drawPipes() {
    for (let i = 0; i < pipes.length; i++) {
        context.fillStyle = "#4CAF50";
        context.fillRect(pipes[i].x, pipes[i].y, pipeWidth, pipeHeight);
        context.fillRect(pipes[i].x, pipes[i].y + pipeHeight + gap, pipeWidth, canvas.height);

        pipes[i].x -= 3;

        if (pipes[i].x === newPipePosition) {
            pipes.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeHeight) - pipeHeight
            });
        }


        if (
            (bX + birdRadius > pipes[i].x && bX - birdRadius < pipes[i].x + pipeWidth &&
                (bY < pipes[i].y + pipeHeight || bY + birdRadius > pipes[i].y + pipeHeight + gap)) ||
            bY + birdRadius > canvas.height || bY + birdRadius < 0
        ) {
            location.reload();
        }


        if (pipes[i].x + pipeWidth < bX && !pipes[i].passed) {
            score++;
            pipes[i].passed = true;
        }
    }
}


function drawGround() {
    context.fillStyle = "#8B4513";
    context.fillRect(0, canvas.height - 40, canvas.width, 40);
}


function drawScore() {
    context.fillStyle = "#000";
    context.font = "20px Verdana";
    context.fillText("Score : " + score, 10, canvas.height - 20);
}


function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawPipes();
    drawGround();
    drawBird();
    drawScore();

    bY += gravity;

    requestAnimationFrame(draw);
}

draw();
