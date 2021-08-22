let aboutModal = document.querySelector("#bgModalAbout");
let aboutButton = document.querySelector(".button3");
let closeButton = document.querySelector(".closeButton");
let configModal = document.querySelector(".bgModalConfig");
let closeButtonConfig = document.querySelector(".closeButtonConfig");
let buttonConfig = document.querySelector(".button2")

aboutButton.addEventListener('click', (event) => {
    aboutModal.style.display = "flex"
});

closeButton.addEventListener('click', (event) => {
    aboutModal.style.display = "none"
});

buttonConfig.addEventListener('click', (event) => {
    configModal.style.display = "flex"
});

closeButtonConfig.addEventListener('click', (event) => {
    configModal.style.display = "none"
})