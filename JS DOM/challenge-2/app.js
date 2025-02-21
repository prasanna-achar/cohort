/**
 * Write your challenge solution here
 * 
 */
const redButton = document.getElementById("redButton");
const greenButton = document.getElementById("greenButton");
const blueButton = document.getElementById("blueButton");
const purpleButton = document.getElementById("purpleButton");
const resetButton = document.getElementById("resetButton");

function changeColor(color){
    document.querySelector('body').style.color = color;
}

redButton.addEventListener("click", () => {
    changeColor("red")
});

greenButton.addEventListener("click", () => {
    changeColor("green")
});

blueButton.addEventListener("click", () => {
    changeColor("blue")
});

purpleButton.addEventListener("click", () => {
    changeColor("purple")
});

resetButton.addEventListener("click", () => {
    changeColor("black")
});