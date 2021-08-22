var diryJ, dirxJ, jog, velJ, pjx, pjy;
var velT;
var tamTelaW, tamTelaH;
var jogo;
var frames;
var contInimigos, painelContInimigos, velI, tmpCriaInimigo;
var inimigosTotal;
var vidaPlaneta, barraPlaneta;
var telaWin = document.querySelector(".victoryScreenBg");
var telaLoose = document.querySelector(".looseScreenBg");
var numInvasores = document.querySelector(".numInvasores")

function teclaDw() {
    var tecla = event.keyCode;
    if (tecla == 38) {//cima
        diryJ = -1;
    } else if (tecla == 40) {//baixo
        diryJ = 1;
    }
    if (tecla == 37) {//esquerda
        dirxJ = -1;
    } else if (tecla == 39) {//direita
        dirxJ = 1;
    }
    if (tecla == 32) {//espaço//tiro
        //TIRO
        atira(pjx + 55, pjy + 90);
        atira(pjx + 135, pjy + 90);
    }
}

function teclaUp() {
    var tecla = event.keyCode;
    if ((tecla == 38) || (tecla == 40)) {//cima
        diryJ = 0;
    }
    if ((tecla == 37) || (tecla == 39)) {//esquerda
        dirxJ = 0;
    }
}

function criaInimigo() {
    if (jogo) {
        var y = 0;
        var x = Math.random() * tamTelaW;
        var inimigo = document.createElement("div");
        var att1 = document.createAttribute("class");
        var att2 = document.createAttribute("style");
        att1.value = "inimigo";
        att2.value = "top:" + y + "px;left:" + x + "px;";
        inimigo.setAttributeNode(att1);
        inimigo.setAttributeNode(att2);
        document.body.appendChild(inimigo);

        contInimigos--;

        numInvasores.innerHTML = contInimigos

    }
}

function controlaInimigo() {
    inimigosTotal = document.getElementsByClassName("inimigo");
    var tam = inimigosTotal.length;
    for (var i = 0; i < tam; i++) {
        if (inimigosTotal[i]) {
            var pi = inimigosTotal[i].offsetTop;
            pi += velI;
            inimigosTotal[i].style.top =  pi + "px";
            if (pi > tamTelaH) {
                vidaPlaneta-=localStorage.danoInimigos;
                inimigosTotal[i].remove();
            }
        }
    }
}

        function atira(x, y) {
            var t = document.createElement("div");
            var att1 = document.createAttribute("class");
            var att2 = document.createAttribute("style");
            // var att3 = document.createAttribute("src");
            att1.value = "tiroJog";
            att2.value = "top:" + y + "px;left:" + x + "px";
            t.setAttributeNode(att1);
            t.setAttributeNode(att2);
            document.body.appendChild(t);
        }

        function controleTiro() {
            var tiros = document.getElementsByClassName("tiroJog");
            var tam = tiros.length;
            for (var i = 0; i < tam; i++) {
                if (tiros[i]) {
                    var pt = tiros[i].offsetTop;
                    pt -= velT;
                    tiros[i].style.top = pt + "px";
                    colisaoTiroInimigo(tiros[i])
                    if (pt < 0) {
                        tiros[i].remove();
                    }
                }
            }
        }

        function colisaoTiroInimigo(tiro) {
            var tam = inimigosTotal.length;
            for(var i = 0; i < tam; i++) {
                if(inimigosTotal[i]) {
                    if(
                        (
                            (tiro.offsetTop <= (inimigosTotal[i].offsetTop+60))&& //Cima tiro com parte de baixo do inimigo
                            ((tiro.offsetTop+6) >= (inimigosTotal[i].offsetTop)) ///Baixo tiro com cima inimigo
                        )
                        &&
                        (
                            (tiro.offsetLeft <= (inimigosTotal[i].offsetLeft+60))&&
                            ((tiro.offsetLeft+6) >= (inimigosTotal[i].offsetLeft))
                        )
                    ){
                        inimigosTotal[i].remove();
                        tiro.remove();
                    }
                }
            }
        }

        function controlaJogador() {
            pjy += diryJ * velJ;
            pjx += dirxJ * velJ;
            jog.style.top = pjy + "px";
            jog.style.left = pjx + "px";
        }

        function gerenciaGame(){
            barraPlaneta.style.width = vidaPlaneta + "px";
            if(contInimigos <= 0) {
                jogo=false;
                clearInterval(tmpCriaInimigo);
                telaWin.style.display = "flex"
            }

            if(vidaPlaneta <= 0) {
                jogo=false;
                clearInterval(tmpCriaInimigo);
                telaLoose.style.display = "flex"
            }
        }

        function gameLoop() {
            if (jogo) {
                //FUNÇÕES DE CONTROLE
                controlaJogador();
                controleTiro();
                controlaInimigo();
            }
            gerenciaGame()
            frames = requestAnimationFrame(gameLoop);
        }

        function inicia() {
            jogo = true;

            //ini Tela
            tamTelaH = window.innerHeight;
            tamTelaW = window.innerWidth;

            //ini Jog
            dirxJ = diryJ = 0;
            pjx = tamTelaW / 2;
            pjy = tamTelaH / 2;
            velJ = localStorage.velocidadeJogador;
            velT = localStorage.velocidadeTiro;
            jog = document.querySelector(".nave");
            jog.style.top = pjy + "px";
            jog.style.left = pjx + "px";

            //Controle dos Inimigos
            clearInterval(tmpCriaInimigo);
            contInimigos = localStorage.quantidadeInimigos;
            velI = 5;
            tmpCriaInimigo = setInterval(criaInimigo, localStorage.tempoGeracaoInimigos);

            //Controles Planeta
            vidaPlaneta = localStorage.vidaPlaneta;
            barraPlaneta = document.querySelector(".vidaPlaneta");
            barraPlaneta.style.width = vidaPlaneta + "px";

            gameLoop();
        }

        window.addEventListener("load", inicia);
        document.addEventListener("keydown", teclaDw);
        document.addEventListener("keyup", teclaUp);

        console.log(localStorage.velocidadeInimigos)