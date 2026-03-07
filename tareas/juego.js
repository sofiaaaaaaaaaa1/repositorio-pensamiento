const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let x = 200;
let y = 150;

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="cyan";
    ctx.fillRect(x,y,40,40);
}

document.addEventListener("keydown", function(e){

    if(e.key==="ArrowRight") x+=10;
    if(e.key==="ArrowLeft") x-=10;
    if(e.key==="ArrowUp") y-=10;
    if(e.key==="ArrowDown") y+=10;

    draw();
});

draw();