/*trazenddo o canvas para o javascript*/
let canvas = document.getElementById("snake");

/*trabalhando em 2d mostranddo o campo do jogo */
let context = canvas.getContext("2d");

/*Definindo o tamnaho do campo do jogo */
let box = 32;

/*array da cobrinha*/
let snake = [];

/*Definindo o tamanho dentro da cobrinha */
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
/*jogo inicia parado, só começa a movimentar quando o jogador pressiona uma seta de direção*/
let direction = "right";//direção da cobrinha

/*criação do array para a comida*/
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box, /* Math.floor retira a parte flutuante(zero) do Math.random que retorna sempre um num aleatorio ate um.*/
    y: Math.floor(Math.random() * 15 + 1) * box
}

let score = 0 //pontos
/*função para criar o backgroud(quadrado) do jogo */
function criarBG(){
    context.fillStyle = "MediumPurple";//cor do backgroud
    context.fillRect(0, 0, 16 * box, 16 * box);// desenhando as dimenssões do jogo 
}
 
/* Função para criar a cobra*/
function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "purple";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

/* criando a comida para a cobrinha pegar */
function drawFood(){
    context.fillStyle = "red"; /**cor da comida */
    context.fillRect(food.x, food.y, box, box);
    context.strokeStyle = 'lightgreen';
    context.strokeRect(food.x, food.y, box, box)
}

/*criando eventos para os movimentos e para a cobrinha não sumir. */
document.addEventListener('keydown', update); 
/**
   * o addEventListener vai pegar o keydown que é o evento de clique dos botões 
   * do teclado e vai chamar a update que é uma função 
   * */
function update(event){
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo(){  
    /**
     *  quando chegar no fim do canvas "quandrado que define a tele do jogo",
     *  aparece do outro lado (corrigido bug que deixava a cobra passeando fora do canvas com 15 e não 16)
     * */ 
    if (snake[0].x > 15 * box && direction == "right" || snake[0].x > 15 * box && direction == "up" || snake[0].x > 15 * box && direction == "down") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left" || snake[0].x < 0 && direction == "up" || snake[0].x < 0 && direction == "down") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down" || snake[0].y > 15 * box && direction == "right" || snake[0].y > 15 * box && direction == "left") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up" || snake[0].y < 0 && direction == "right" || snake[0].y < 0 && direction == "left") snake[0].y = 16 * box;

    /*se a posição 0 (cabeça) se chocar com o corpo, para o jogo*/
    for (i = 1; i < snake.length; i++){ /*.length e o tamanho do array*/
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("GAME OVER :( !!! Seu recorde foi de " + score + "frutas");
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    /* setar ponto de partida da cobrinha */
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    /*cooerdenadas da cobrinha*/
    if(direction =="right") snakeX+= box;
    if(direction =="left") snakeX -= box;
    if(direction =="up") snakeY -= box;
    if(direction =="down") snakeY += box;

    /*para trocar a comida de lugar caso a cobrinha pssa por cima da comuda e para o crescimento da cobrinha*/
    if(snakeX != food.x || snakeY != food.y){
        /**
         * caso a posição da cobra seja diferente da comida,
         * ela continua em movimento (removendo um item do array).
         */
        snake.pop();/* add função pop para retiar o ultimo elemento do arry*/
    } else {
        /*caso contrário, não remove o item do array (aumenta de tamanho) e a comida muda para outra posição aleatória.*/
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    /*inserindo a nova cabeça da cobrinha com o unshifit*/
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);//acrescentando mais uma cabeça
}
/* resetar a pagina para iniciar o jogo novamente*/
let reset = document.querySelector('button')
    reset.addEventListener('click', ()=>{
      location.reload()
    })


let jogo = setInterval(iniciarJogo, 200); // velocidade da cobrinha

