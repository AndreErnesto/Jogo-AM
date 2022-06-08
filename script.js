let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//criação do snake tendo em conta o tamanho da imagem

let square = 32;
let move;
let score = 0;

//dar draw() do ground 

let floor = new Image();
floor.src = "images/floor.jpg";

//dar draw() da comida

let food = new Image();
food.src = "images/food.png";

let gameOver = new Image();
gameOver.src = "images/gameover.png";


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

//event listener



document.addEventListener("keydown", function(event){
    //e.preventDefault();
    console.log(event);
    if(event.keyCode==65 && move!="right")
    {
        move="left";
    }
    else if(event.keyCode==87 && move!="down"){
        move="top";
    }
    else if(event.keyCode==68 && move!="left"){
        move="right";
    }
    else if(event.keyCode==83 && move!="top"){
        move="down";
    }
    console.log(move);
})
        
    /*switch(event){
        case "ArrowLeft":
            move:left;
        case "Arrow Up":
            move:"top";
        case ""
        
    }


    // switch (tecla) {
        //case "ArrowLeft":
)
*/

function draw(){

    for(let i=0; i<snake.length; i++){
        //fill estilo do snake
        ctx.fillStyle = (i == 0) ? "black":"yellow";
        ctx.fillRect(snake[i].x,snake[i].y,square,square);
        //criar estilo de stroke na snake
        ctx.strokeStyle ="#000000"
        ctx.strokeRect(snake[i].x,snake[i].y,square,square);
    }

    //ver a posição anterior da snake e mover

    let snakeX= snake[0].x;
    let snakeY= snake[0].y;
    
    if(move=="left")
    {
        snakeX-=square;
    }
    else if(move=="top")
    {
        snakeY-=square;
    }
    else if(move=="right")
    {
        snakeX+=square;
    }
    else if(move=="down")
    {
        snakeY+=square;
    }

    //Ciração de novo quadrado
    let newSquare = {
        x:snakeX,
        y:snakeY,
    }
    //detetar colisão com a comida
    if(snakeX==foodPos.x && snakeY==foodPos.y){
        
        foodPos.x = Math.floor(Math.random() * 17 + 1) * square;
        foodPos.y = Math.floor(Math.random() * 15 + 3) * square;
        //Incrementar score
        score++;
    }
    else
    {
        //cor criar fill
        snake.pop();
    }

    //Vai verificar se a colisão é verdadeira ou falsa
    function collision(head, array)
    {
        for(let i=0;i<array.length;i++)
        {
            if(newSquare.x ==array[i].x && newSquare.y ==array[i].y)
            {
                return true;
            }
        }
        return false;
    }
    //Criar colisões na paredes para acabar com o jogo
    if(snakeX<square || snakeX>square*17 || snakeY<square*3 || snakeY>square*17 ||collision(newSquare, snake))
    {
        clearInterval(game);
        ctx.drawImage(gameOver,0,0,512,371,canvas.width/2-100, canvas.height/2-100,200,200);

    }

    snake.unshift(newSquare);

    //Criação do número de score
    ctx.fillStyle="#ffffff";
    ctx.font="40px impact";
    //Posição do número
    ctx.fillText(score,square*2.5,square*1.7);


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