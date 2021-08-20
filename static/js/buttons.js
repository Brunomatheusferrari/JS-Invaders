let aboutModal = document.querySelector("#bgModalAbout");
let aboutButton = document.querySelector(".button3");
let closeButton = document.querySelector(".closeButton");

aboutButton.addEventListener('click', (event) => {
    aboutModal.style.display = "flex"
});

closeButton.addEventListener('click', (event) => {
    aboutModal.style.display = "none"
});