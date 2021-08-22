let inputQuantIni = document.querySelector(".quantInimigos");
let inputDanoInimigos = document.querySelector(".danoInimigos");
let inputVelInimigos = document.querySelector(".velInimigos");
let inputVidaPlaneta = document.querySelector(".vidaPlaneta");
let inputVelJogador = document.querySelector(".velJogador");
let inputVelTiro = document.querySelector(".velTiro");
let saveButton = document.querySelector(".saveButton");


saveButton.addEventListener('click', (event) => {
    localStorage.setItem("quantidadeInimigos", inputQuantIni.value)
    localStorage.setItem("danoInimigos", inputDanoInimigos.value)
    localStorage.setItem("tempoGeracaoInimigos", inputVelInimigos.value)
    localStorage.setItem("vidaPlaneta", inputVidaPlaneta.value)
    localStorage.setItem("velocidadeJogador", inputVelJogador.value)
    localStorage.setItem("velocidadeTiro", inputVelTiro.value)
    console.log("cadastrado com exito");
});



