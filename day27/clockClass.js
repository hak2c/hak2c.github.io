export default class Clock {
  constructor(clock, record, start, stop, reset, records) {
    this.clock = clock;
    this.recordBtn = record;
    this.startBtn = start;
    this.stopBtn = stop;
    this.resetBtn = reset;
    this.records = records;

    this.running = false;

    this.minute = 0;
    this.second = 0;
    this.milisecond = 0;
    this.count = 0;

    this.init();
  }
  init() {
    this.mNode = document.createTextNode("00");
    this.sNode = document.createTextNode("00");
    this.miliNode = document.createTextNode("00");

    this.startBtn.onclick = () => this.start();
    this.recordBtn.onclick = () => this.record();
    this.stopBtn.onclick = () => this.stop();
    this.resetBtn.onclick = () => this.reset();

    this.active();
    this.render();
  }
  active() {
    if (this.running) {
      this.startBtn.disabled = true;
      this.recordBtn.disabled = false;
      this.stopBtn.disabled = false;
      this.resetBtn.disabled = false;
    } else {
      this.startBtn.disabled = false;
      this.recordBtn.disabled = true;
      this.stopBtn.disabled = true;
      this.resetBtn.disabled = true;
    }
  }
  render() {
    this.clock.appendChild(this.mNode);
    this.clock.append(":");
    this.clock.appendChild(this.sNode);
    this.clock.append(":");
    this.clock.appendChild(this.miliNode);
  }

  start() {
    if (!this.running) {
      this.timer = setInterval(() => {
        this.milisecond += 1;
        if (this.milisecond >= 100) {
          this.milisecond = 0;
          this.second++;
          if (this.second >= 60) {
            this.second = 0;
            this.minute++;
            this.mNode.textContent = String(this.minute).padStart(2, "0");
          }
          this.sNode.textContent = String(this.second).padStart(2, "0");
        }
        this.miliNode.textContent = String(this.milisecond).padStart(2, "0");
      }, 10);
      this.running = true;
      this.active();
    }
  }

  record() {
    if (this.running) {
      this.records.innerHTML += `<p class="record">#${++this.count} ${
        this.clock.textContent
      }</p>`;
    }
  }

  stop() {
    if (this.running) {
      clearInterval(this.timer);
      this.startBtn.disabled = false;
      this.running = false;
    }
  }

  reset() {
    this.timer && clearInterval(this.timer);
    this.minute = 0;
    this.second = 0;
    this.milisecond = 0;
    this.count = 0;
    this.running = false;
    this.records.innerHTML = "";

    this.mNode = document.createTextNode("00");
    this.sNode = document.createTextNode("00");
    this.miliNode = document.createTextNode("00");
    this.clock.innerHTML = "";

    this.active();
    this.render();
  }
}
