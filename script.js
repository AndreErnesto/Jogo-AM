let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//criação do snake tendo em conta o tamanho da imagem

let square = 32;

//dar draw() do ground 

let floor = new Image();
floor.src = "images/floor.jpg";


//criação do array da snake
//Criação das propriedades do snake
let snake = [];


snake[0] = {
 x: 4*32,
 y: 7*32
}

function draw(){

    for(let i=0; i<snake.length; i++){
        //fill estilo do snake
        ctx.fillStyle = (i == 0) ? "black":"red";
        ctx.fillRect(snake[i].x,snake[i].y,square,square);
    }

}

//criação do loop da imagem
function loop()
    {
        ctx.drawImage(floor,0,0,608,608,0,0,608,608);
        draw();

    }

   let game = setInterval(loop , 100);