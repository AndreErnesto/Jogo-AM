let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//dar draw() do ground 

let floor = new Image();
floor.src = "images/floor.jpg";

function draw(){}

function loop()
    {
        ctx.drawImage(floor,0,0,608,608,0,0,608,608);
        draw();

    }

   // let game = setInterval(loop , 100);