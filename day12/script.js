// Viết hàm tạo Weapon với các thuộc tính name, damage, ...
function Weapon(name, damage) {
    this.name = name;
    this.damage = damage
}

let sung = new Weapon("Súng", 500);
let dao = new Weapon("Dao", 100);
let bua = new Weapon("Búa", 80);

// Viết hàm tạo Player với các thuộc tính name, level, weapon, weapon object khởi tạo từ Weapon. Player có các methods: attack() tính và in ra màn hình lượng sát thương gây ra = weapon.damage * level,changeWeapon() thay đổi weapon của Player

function Player(name, level, weapon){
    this.name = name;
    this.level = level;
    this.weapon = weapon;
    this.attack = function() {
        console.log("Sát thương gây ra: " + this.weapon.damage * this.level);
    };
    this.changeWeapon = function(otherWeapon) {
        this.weapon = otherWeapon;
    }
}

// Tạo một vài đối tượng từ Player và Weapon, gọi phương thức attack() trên các đối tượng đó
let ha = new Player('Hà', 10, sung);
ha.attack();
ha.changeWeapon(bua);
ha.attack();
let tuanAnh = new Player("Tuấn Anh", 20, dao);
ha.tuanAnh();

// Tạo một object calculator, có các thuộc tính a, b là 2 số, và các phương thức:
function Calculator() {
    this.get = function() {
        let a = +prompt('Nhập vào số a'),
        b = +prompt('Nhập vào số b');
        this.a = a;
        this.b = b;
    };
    this.add = function() {
        console.log(`a + b = ${this.a + this.b}`);
    };
    this.sub = function() {
        console.log(`a - b = ${this.a - this.b}`);
    };
    this.div = function() {
        console.log(`a / b = ${this.a / this.b}`);
    };
    this.mul = function() {
        console.log(`a * b = ${this.a * this.b}`);
    };
}

let cal = new Calculator();
cal.get();
cal.add();
