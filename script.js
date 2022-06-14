let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let menuGameOver = document.getElementById("menuGameOver");
let pausa = document.getElementById("pause");

//criação do snake tendo em conta o tamanho da imagem

let square = 32;
let move;
let score = 0;
//variável de som com boolean para depois este parar em gameOver
let sound = true;
//let speed = 1;
let pause = false;
let gameOver = false;

//dar draw() do ground

let floor = new Image();
floor.src = "images/floor.jpg";

//dar draw() da comida

let food = new Image();
food.src = "images/food.png";

//Adição dos sons
let deadsound = new Audio();
deadsound.src = "./audio/dead.mp3";
let downsound = new Audio();
downsound.src = "./audio/down.mp3";
let upsound = new Audio();
upsound.src = "./audio/up.mp3";
let rightsound = new Audio();
rightsound.src = "./audio/right.mp3";
let leftsound = new Audio();
leftsound.src = "./audio/left.mp3";
let eatsound = new Audio();
eatsound.src = "./audio/eat.mp3";

//criação do array da snake
//Criação da posição do snake
let snake = [];

snake[0] = {
    x: 4 * 32,
    y: 7 * 32,
};

//Criação do object food no mapa num sitio Random pelo número de X e número de Y (o mais 1 e 3 serve para ignorar a border)

let foodPos = {
    x: Math.floor(Math.random() * 17 + 1) * square,
    y: Math.floor(Math.random() * 15 + 3) * square,
};

//event listener

document.addEventListener("keydown", function (event) {
    console.log(event);
    const tecla = event.key.toUpperCase();
    if (tecla == "A" && move != "right") {
        if (sound && move !== "left") {
            leftsound.play();
        }
        move = "left";
    } else if (tecla == "W" && move != "down") {
        if (sound && move !== "top") {
            upsound.play();
        }
        move = "top";
    } else if (tecla == "D" && move != "left") {
        if (sound && move !== "right") {
            rightsound.play();
        }
        move = "right";
    } else if (tecla == "S" && move != "top") {
        if (sound && move !== "down") {
            downsound.play();
        }
        move = "down";
    } else if (tecla == "ESCAPE" && gameOver == false) {
        pause = !pause;
        pausa.classList.toggle("show");
        sound = false;
    }
});

///Funções de draw
function drawScore() {
    ctx.fillStyle = "#ffffff";
    ctx.font = "40px impact";
    //Posição do número
    ctx.fillText(score, square * 2.5, square * 1.7);
}

function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        //fill estilo do snake
        ctx.fillStyle = i == 0 ? "black" : "red";
        if (i % 2 == 0) {
            ctx.fillStyle = "black";
        }
        ctx.fillRect(snake[i].x, snake[i].y, square, square);
        //criar estilo de stroke na snake
        ctx.strokeStyle = "#000000";
        ctx.strokeRect(snake[i].x, snake[i].y, square, square);
    }
}

function drawFood() {
    //draw da comida
    ctx.drawImage(
        food,
        0,
        0,
        square,
        square,
        foodPos.x,
        foodPos.y,
        square,
        square
    );
}

function draw() {
    //ver a posição anterior da snake e mover

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (move == "left") {
        snakeX -= square;
    } else if (move == "top") {
        snakeY -= square;
    } else if (move == "right") {
        snakeX += square;
    } else if (move == "down") {
        snakeY += square;
    }

    //Ciração de novo quadrado
    let newSquare = {
        x: snakeX,
        y: snakeY,
    };

    //detetar colisão com a comida
    if (snakeX == foodPos.x && snakeY == foodPos.y) {
        eatsound.play();
        foodPos.x = Math.floor(Math.random() * 17 + 1) * square;
        foodPos.y = Math.floor(Math.random() * 15 + 3) * square;
        //Incrementar score
        score++;
    } else {
        //remove um elemento do array e dá return neste
        snake.pop();
    }

    //Vai verificar se a colisão com a prórpia snake é verdadeira ou falsa
    function collision(newSquare, array) {
        for (let i = 0; i < array.length; i++) {
            if (newSquare.x == array[i].x && newSquare.y == array[i].y) {
                return true;
            }
        }
        return false;
    }

    //Restart no botão

    let btnRestart = document.getElementById("restart");
    btnRestart.addEventListener("click", function () {
        gameOver = false;
        score = 0;
        move = null;
        snake = [];
        snake[0] = {
            x: 4 * 32,
            y: 7 * 32,
        };
        menuGameOver.classList.toggle("hide");
    });

    //Criar colisões na paredes para acabar com o jogo
    if (
        snakeX < square ||
        snakeX > square * 17 ||
        snakeY < square * 3 ||
        snakeY > square * 17 ||
        collision(newSquare, snake)
    ) {
        gameOver = true;
        menuGameOver.classList.toggle("hide");
        deadsound.play();
        sound = false;
    }
    //Cria novo square e dá return do tamanho do array
    snake.unshift(newSquare);
}

//criação do loop da imagem
function loop() {
    ctx.drawImage(floor, 0, 0, 608, 608, 0, 0, 608, 608);
    if (!gameOver && !pause) {
        sound = true;
        draw();
    }
    drawScore();
    drawFood();
    drawSnake();
}

let game = setInterval(loop, 100);
