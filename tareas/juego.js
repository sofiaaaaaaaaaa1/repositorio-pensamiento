const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;

let snake;
let direction;
let food;

let gameInterval;
let gameOver = false;

// CONTROLES
document.addEventListener("keydown", changeDirection);

function changeDirection(event){
    if(event.key === "ArrowLeft" && direction !== "RIGHT") direction="LEFT";
    if(event.key === "ArrowUp" && direction !== "DOWN") direction="UP";
    if(event.key === "ArrowRight" && direction !== "LEFT") direction="RIGHT";
    if(event.key === "ArrowDown" && direction !== "UP") direction="DOWN";
}

// INICIAR JUEGO (con botón)
function iniciarJuego(){

    clearInterval(gameInterval); // evita duplicados

    snake = [{x:200,y:200}];
    direction = "RIGHT";
    gameOver = false;

    food = {
        x: Math.floor(Math.random()*20)*box,
        y: Math.floor(Math.random()*20)*box
    };

    gameInterval = setInterval(draw,120);
}

// DIBUJAR
function draw(){

    if(gameOver) return;

    ctx.clearRect(0,0,400,400);

    // snake
    for(let i=0;i<snake.length;i++){
        ctx.fillStyle = i===0 ? "lime" : "green";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
    }

    // comida
    ctx.fillStyle="red";
    ctx.fillRect(food.x,food.y,box,box);

    let headX = snake[0].x;
    let headY = snake[0].y;

    if(direction==="LEFT") headX-=box;
    if(direction==="RIGHT") headX+=box;
    if(direction==="UP") headY-=box;
    if(direction==="DOWN") headY+=box;

    // colisión paredes
    if(headX < 0 || headX >= 400 || headY < 0 || headY >= 400){
        terminarJuego();
        return;
    }

    // colisión cuerpo
    for(let i=1;i<snake.length;i++){
        if(headX === snake[i].x && headY === snake[i].y){
            terminarJuego();
            return;
        }
    }

    // comida
    if(headX===food.x && headY===food.y){
        food={
            x: Math.floor(Math.random()*20)*box,
            y: Math.floor(Math.random()*20)*box
        };
    }else{
        snake.pop();
    }

    let newHead={x:headX,y:headY};
    snake.unshift(newHead);
}

// TERMINAR JUEGO
function terminarJuego(){
    clearInterval(gameInterval);
    gameOver = true;

    alert("Perdiste 😢");
}

// PANTALLA INICIAL
ctx.fillStyle = "white";
ctx.font = "20px Arial";
ctx.fillText("Presiona 'Empezar'", 110, 200);