// Viết hàm tạo Weapon với các thuộc tính name, damage, ...
function Weapon(name, damage) {
  this.name = name;
  this.damage = damage;
}

let sung = new Weapon("Súng", 500);
let dao = new Weapon("Dao", 100);
let bua = new Weapon("Búa", 80);

// Viết hàm tạo Player với các thuộc tính name, level, weapon, weapon object khởi tạo từ Weapon. Player có các methods: attack() tính và in ra màn hình lượng sát thương gây ra = weapon.damage * level,changeWeapon() thay đổi weapon của Player

function Player(name, level, weapon) {
  this.name = name;
  this.level = level;
  this.weapon = weapon;
  this.attack = function () {
    console.log("Sát thương gây ra: " + this.weapon.damage * this.level);
    return this;
  };
  this.changeWeapon = function (otherWeapon) {
    this.weapon = otherWeapon;
    return this;
  };
}

// Tạo một vài đối tượng từ Player và Weapon, gọi phương thức attack() trên các đối tượng đó
let ha = new Player("Hà", 10, sung);
ha.attack();
ha.attack().changeWeapon(bua).attack();
ha.attack();
let tuanAnh = new Player("Tuấn Anh", 20, dao);
tuanAnh.attack();

// Tạo một object calculator, có các thuộc tính a, b là 2 số, và các phương thức:
function Calculator() {
  a: Number;
  b: Number;
  this.get = function (a, b) {
    this.a = a;
    this.b = b;
    return this;
  };
  this.add = function () {
    console.log(`a + b = ${this.a + this.b}`);
    return this;
  };
  this.sub = function () {
    console.log(`a - b = ${this.a - this.b}`);
    return this;
  };
  this.div = function () {
    console.log(`a / b = ${this.a / this.b}`);
    return this;
  };
  this.mul = function () {
    console.log(`a * b = ${this.a * this.b}`);
    return this;
  };
}

let cal = new Calculator();
cal.get();
cal.add();

// Viết hàm tạo Counter, có thuộc tính count, và các phương thức
function Counter(count = 0) {
  this.count = count;
  this.up = function () {
    console.log("Count = " + this.count++);
    return this;
  };
  this.down = function () {
    console.log("Count = " + this.count--);
    return this;
  };
  this.get = function () {
    console.log(this.count);
    return this;
  };
}
let count = new Counter();
count.up();
count.get();

// Viết hàm tạo Girl có các thuộc tính và phương thức tùy ý
function Girl(name, age, className, hasBoyfriend) {
  this.name = name;
  this.age = age;
  this.className = className;
  this.hasBoyfriend = hasBoyfriend;
}
let motAiDo = new Girl("Một ai đó", 17, "A2", true);

// Viết hàm tạo Boy có các thuộc tính và phương thức tùy ý
function Boy(name, age, className, hasGirlfriend, isHandsome) {
  this.name = name;
  this.age = age;
  this.className = className;
  this.hasGirlfriend = hasGirlfriend;
  this.isHandsome = isHandsome;
}
let themMotAiDo = new Boy("Thêm một ai đó", 17, "A2", false, true);
