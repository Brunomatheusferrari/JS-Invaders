var diryJ, dirxJ, jog, velJ, pjx, pjy;
var velT;
var tamTelaW, tamTelaH;
var jogo;
var frames;

function teclaDw() {
    var tecla = event.keyCode;
    if(tecla == 38){//cima
        diryJ = -1;
    }else if(tecla == 40){//baixo
        diryJ = 1;
    }
    if(tecla == 37){//esquerda
        dirxJ = -1;
    }else if(tecla == 39){//direita
        dirxJ = 1;
    }
    if(tecla == 32){//espaço//tiro
        //TIRO
        atira(pjx + 55, pjy + 90);
        atira(pjx + 135, pjy + 90);
    }
}

function teclaUp() {
    var tecla = event.keyCode;
    if((tecla == 38)||(tecla == 40)){//cima
        diryJ = 0;
    }
    if((tecla == 37)||(tecla == 39)){//esquerda
        dirxJ = 0;
    }
}

function atira(x,y) {
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

function controleTiro(){
    var tiros = document.getElementsByClassName("tiroJog");
    var tam = tiros.length;
    for(var i = 0; i < tam; i++){
        if(tiros[i]){
            var pt = tiros[i].offsetTop;
            pt -= velT;
            tiros[i].style.top = pt + "px";

            if(pt < 0) {
                tiros[i].remove();
            }
        }
    }
}

function controlaJogador(){
    pjy += diryJ*velJ;
    pjx += dirxJ*velJ;
    jog.style.top = pjy + "px";
    jog.style.left = pjx + "px";
}

function gameLoop(){
    if(jogo) {
        //FUNÇÕES DE CONTROLE
        controlaJogador();
        controleTiro()
    }
    frames = requestAnimationFrame(gameLoop);
}

function inicia(){
    jogo = true;

    //ini Tela
    tamTelaH = window.innerHeight;
    tamTelaW = window.innerWidth;

    //ini Jog
    dirxJ = diryJ = 0;
    pjx = tamTelaW/2;
    pjy = tamTelaH/2;
    velJ = 15;
    velT = 10;
    jog = document.querySelector(".nave");
    jog.style.top = pjy + "px";
    jog.style.left = pjx + "px";

    gameLoop();
}

window.addEventListener("load", inicia);
document.addEventListener("keydown", teclaDw);
document.addEventListener("keyup", teclaUp);
