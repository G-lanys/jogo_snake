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
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}
/*criando eventos para os movimentos e para a cobrinha não sumir. */
document.addEventListener('keydown', update); /*o addEventListener vai pegar o keydown que é o evento de clique dos botões do teclado e vai chamar a update que é uma função*/

function update(event){
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo(){  
    /* quando chegar no fim do canvas "quandrado que define a tele do jogo",
    * aparece do outro lado (corrigido bug que deixava a cobra passeando fora do canvas com 15 e não 16)*/
    if(snake[0].x > 15 * box && direction =="right") snake[0].x = 0;
    if(snake[0].x < 0 * box && direction =="left") snake[0].x = 15 * box;
    if(snake[0].y > 15 * box && direction =="down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 15 * box;


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



