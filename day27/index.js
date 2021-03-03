import Clock from "./clockClass.js";

let clock = document.getElementById("clock");
let record = document.getElementById("buttonRecord");
let start = document.getElementById("buttonStart");
let stop = document.getElementById("buttonStop");
let reset = document.getElementById("buttonReset");
let records = document.getElementById("records");

new Clock(clock, record, start, stop, reset, records);

/*let clock = new Clock(
  ".clock",
  ".record-list",
  "#buttonStart",
  "#buttonStop",
  "#buttonReset"
);

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
*/