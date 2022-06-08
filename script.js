let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//criação do snake tendo em conta o tamanho da imagem

let square = 32;

//dar draw() do ground 

let floor = new Image();
floor.src = "images/floor.jpg";

//dar draw() da comida

let food = new Image();
food.src = "images/food.png";


//criação do array da snake
//Criação das propriedades do snake
let snake = [];

snake[0] = {
 x: 4*32,
 y: 7*32
}

//Criação do object food no mapa num sitio Random pelo número de X e número de Y (o mais 1 e 3 serve para ignorar a border)

let foodPos =
{
    x: Math.floor(Math.random() * 17 + 1) * square,
    y: Math.floor(Math.random() * 15 + 3) * square,
}

function draw(){

    for(let i=0; i<snake.length; i++){
        //fill estilo do snake
        ctx.fillStyle = (i == 0) ? "black":"red";
        ctx.fillRect(snake[i].x,snake[i].y,square,square);
    }
    //draw da comida
    ctx.drawImage(food,0,0,square,square,foodPos.x,foodPos.y,square,square);

}

//criação do loop da imagem
function loop()
    {
        ctx.drawImage(floor,0,0,608,608,0,0,608,608);
        draw();

    }
   let game = setInterval(loop , 100);