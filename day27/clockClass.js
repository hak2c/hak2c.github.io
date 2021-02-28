export default class Clock {
  constructor(selector, lapSelector, startButton) {
    this.el = document.querySelector(selector);
    this.lap = document.querySelector(lapSelector);
    this.startButton = document.querySelector(startButton);
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
    this.milisecond = 0;
    this.count = 0;
    this.render();
  }
  render() {
    this.el.innerHTML = `<span id="hour">${String(this.hour).padStart(
      2,
      "0"
    )}</span>:<span id="minute">${String(this.minute).padStart(
      2,
      "0"
    )}</span>:<span id="hour">${String(this.second).padStart(
      2,
      "0"
    )}</span>&nbsp;<span id="milisecond">${String(this.milisecond).padStart(
      2,
      "0"
    )}</span>`;
  }

  start() {
    this.startButton.setAttribute("disabled", true);
    this.timer = setInterval(() => {
      this.checkTime();
      this.render();
    }, 10);
  }

  stop() {
    this.count++;
    this.lap.innerHTML += `<p>Lap ${this.count}: ${String(this.hour).padStart(
      2,
      "0"
    )}:${String(this.minute).padStart(2, "0")}:${String(this.second).padStart(
      2,
      "0"
    )}:${String(this.milisecond).padStart(2, "0")}</p>`;
    this.startButton.removeAttribute("disabled");
    clearInterval(this.timer);
  }

  reset() {
    this.timer && clearInterval(this.timer);
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
    this.milisecond = 0;
    this.lap.textContent = "";
    this.count = 0;
    this.startButton.removeAttribute("disabled");
    this.render();
  }

  checkTime() {
    if (this.milisecond == 99) {
      this.milisecond = 0;
      if (this.second == 59) {
        this.second = 0;
        if (this.minute == 59) {
          this.minute = 0;
        } else {
          this.minute++;
        }
      } else {
        this.second++;
      }
    } else {
      this.milisecond++;
    }
  }
}
