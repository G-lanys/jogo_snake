let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";


function criarBG(){
    context.fillStyle = "lightblack";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x,snake[i].y, box, box);
    }
}

function iniciarJogo(){    
    criarBG();
    criarCobrinha();

    /* setar ponto de partida da cobrinha */
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    /*cooerdenadas ca cobrinha*/
    if(direction =="right") snakeX+= box;
    if(direction =="left") snakeX -= box;
    if(direction =="up") snakeY -= box;
    if(direction =="down") snakeY += box;

    /* add função pop para retiar i ultimo elemento do arry*/
    snake.pop();

    /*inserindo a nova cabeça da cobrinha com o unshifit*/
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);

}

let jogo = setInterval(iniciarJogo, 100);



