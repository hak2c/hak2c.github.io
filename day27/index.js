import Clock from "./clockClass.js";

let clock = new Clock(".clock", ".lap-list", "#buttonStart", "#buttonStop", "#buttonReset");

document.getElementById("buttonStart").addEventListener("click", function (e) {
  e.preventDefault();
  clock.start();
});
document.getElementById("buttonStop").addEventListener("click", function (e) {
  e.preventDefault();
  clock.stop();
});
document.getElementById("buttonReset").addEventListener("click", function (e) {
  e.preventDefault();
  clock.reset();
});
