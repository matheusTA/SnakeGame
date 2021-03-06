window.onload = function(){
 
    var stage = document.getElementById('stage');
    var context = stage.getContext("2d");
    document.addEventListener("keydown", keyPush);
    
    setInterval(game, 80);

    const velocidade = 1;
    var velocidadeX = 0;
    var velocidadeY = 0;
    var pontoX = 10;
    var pontoY = 15;
    var tamanhoTabuleiro = 20;
    var qntPecas = 20;
    var posicaoMacaX = 15; 
    var posicaoMacaY = 15;
    var rastro = [];
    var cauda = 5;

    function game(){
        pontoX += velocidadeX;
        pontoY += velocidadeY;

        if (pontoX < 0) {
            pontoX = qntPecas-1;
        }
        if (pontoX > qntPecas-1) {
            pontoX = 0;
        }
        if (pontoY < 0) {
            pontoY = qntPecas-1;
        }
        if (pontoY > qntPecas-1) {
            pontoY = 0;
        }

        context.fillStyle = "#000000"; //cor do tabuleiro
        context.fillRect(0,0, stage.width, stage.height);

        context.fillStyle = "#FF0000"; //cor da maçã
        context.fillRect(posicaoMacaX*tamanhoTabuleiro, posicaoMacaY*tamanhoTabuleiro, tamanhoTabuleiro,tamanhoTabuleiro);

        context.fillStyle = "#708090"; //cor da cobrinha
        for (var i = 0; i < rastro.length; i++) {
            context.fillRect(rastro[i].x*tamanhoTabuleiro, rastro[i].y*tamanhoTabuleiro, tamanhoTabuleiro-1,tamanhoTabuleiro-1);
            if (rastro[i].x == pontoX && rastro[i].y == pontoY)
            {
                velocidadeX = velocidadeY=0;
                cauda = 5;
            }
        }

        rastro.push({x:pontoX,y:pontoY })
        while (rastro.length > cauda) {
            rastro.shift();
        }
        
        if (posicaoMacaX == pontoX && posicaoMacaY == pontoY){
            cauda++;
            posicaoMacaX = Math.floor(Math.random()*qntPecas);
            posicaoMacaY = Math.floor(Math.random()*qntPecas);
        }   
        
    }

    function keyPush(event){
        switch (event.keyCode) {
            case 37: // Left
                velocidadeX = -velocidade;
                velocidadeY = 0;
                break;
            case 38: // up
                velocidadeX = 0;
                velocidadeY = -velocidade;
                break;
            case 39: // right
                velocidadeX = velocidade;
                velocidadeY = 0;
                break;
            case 40: // down
                velocidadeX = 0;
                velocidadeY = velocidade;
                break;         
            default:
                break;
        }
    }
}