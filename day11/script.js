// 1. Viết hàm random(a,b) trả về ngẫu nhiên trong khoảng a-b
function random(a, b) {
    return a + Math.floor(Math.random() * (b - a));
}
let random = (a,b) => a + Math.floor(Math.random() * (b - a));

// 2. Kiểm tra cạnh tam giác
let isTriangle = (a, b, c) => (a + b > c && a + c > b && b + c > a) ? true : false;
function isTriangle(a, b, c) {
    if (a + b > c && a + c > b && b + c > a) {
        return true;
    } else {
        return false;
    }
}

// 4. Viết hàm nearest(a, b) kiểm tra và trả về số gần 100 nhất:
let nearest = (a, b) => (a > 100 && b > 100) ? false :
    (a > 100 && b < 100) ? b :
        (b > 100 && a < 100) ? a :
            (100 - a > 100 - b) ? b : a;
function nearest(a, b) {
    if (a > 100 && b > 100) {
        return false;
    } else if (a > 100 && b < 100) {
        return b;
    } else if (b > 100 && a < 100) {
        return a;
    } else if (100 - a > 100 - b) {
        return b;
    } else {
        return a;
    }
}

// 5. Viết hàm sequense(a,b,c) kiểm tra a,b,c có phải tăng dần đều hay giảm dần đều hay không
let sequense = (a, b, c) => (a > b && b > c) ? "Dãy giảm dần đều" :
    (a < b && b < c) ? "Dãy tăng dần đều" : "Không thuộc 2 dãy trên";
function sequense(a, b, c) {
    if (a > b && b > c) {
        return "Dãy giảm dần đều";
    } else if (a < b && b < c) {
        return "Dãy tăng dần đều";
    } else {
        return "Không thuộc 2 dãy trên";
    }
}

// 6. Viết hàm countDecimal(number) trả về số chữ số trong phần thập phần
let countDecimal = (number) => ((number + "").split(".")[1]).length;
function countDecimal(number) {
    let decimal = (number + "").split(".")[1];
    return decimal.length;
} 

// 7. Viết hàm isAscending(number) kiểm tra dãy số của number có phải dãy tăng dần hay không
let isAscending = (number) => {
    let str = number + "";
    for (let i = 0; i < str.length - 1; i++) {
        if (+str[i] > +str[i + 1]) {
            return false;
        }
    }
    return true;
}
function isAscending(params) {
    let str = number + "";
    for (let i = 0; i < str.length - 1; i++) {
        if (+str[i] > +str[i + 1]) {
            return false;
        }
    }
    return true;
}

// 8. Viết hàm countEven(number) trả về số chữ số chẵn của number
let countEven = (number) => {
    let str = number + "",
        count = 0;
    for (let i = 0; i < str.length; i++) {
        if (+str[i] % 2 == 0) {
            count++;
        }
    }
    return count;
}
function countEven(number) {
    let str = number + "",
        count = 0;
    for (let i = 0; i < str.length; i++) {
        if (+str[i] % 2 == 0) {
            count++;
        }
    }
    return count;
}

// 9. Viết hàm find(number)
let find = (number) => {
    let sum = 0,
        n = 0;
    for (let i = 0; i <= number; i++) {
        if (sum <= number) {
            sum += i;
            n = i;
        } else {
            return n - 1;
        }
    }
    return n;
}
function find(number) {
    let sum = 0,
        n = 0;
    for (let i = 0; i <= number; i++) {
        if (sum <= number) {
            sum += i;
            n = i;
        } else {
            return n - 1;
        }
    }
    return n;
}

// 10. Viết hàm sum(value1, unit1, value2, unit2)
let sum = (value1, unit1, value2, unit2) => {
    if (unit1 == "km") {
        if (unit2 == "km") {
            return value1 + value2;
        } else if (unit2 == "m") {
            return value1 + value2*(10 ** -3);
        } else if (unit2 == "cm") {
            return value1 + value2*(10 ** -5);
        } else if (unit2 == "dm") {
            return value1 + value2*(10 ** -4);
        } else if (unit2 == "mm") {
            return value1 + value2*(10 ** -6);
        }
    } else if (unit1 == "m") {
        if (unit2 == "km") {
            return value1 + value2*1000;
        } else if (unit2 == "m") {
            return value1 + value2;
        } else if (unit2 == "cm") {
            return value1 + value2/100;
        } else if (unit2 == "dm") {
            return value1 + value2/10;
        } else if (unit2 == "mm") {
            return value1 + value2*(10 ** -3);
        }
    } else if (unit1 == "cm") {
        if (unit2 == "km") {
            return value1 + value2*(10 ** 5);
        } else if (unit2 == "m") {
            return value1 + value2*100;
        } else if (unit2 == "cm") {
            return value1 + value2;
        } else if (unit2 == "dm") {
            return value1 + value2*10;
        } else if (unit2 == "mm") {
            return value1 + value2/10;
        }
    } else if (unit1 == "dm") {
        if (unit2 == "km") {
            return value1 + value2*(10 ** 4);
        } else if (unit2 == "m") {
            return value1 + value2*10;
        } else if (unit2 == "cm") {
            return value1 + value2/10;
        } else if (unit2 == "dm") {
            return value1 + value2;
        } else if (unit2 == "mm") {
            return value1 + value2/100;
        }
    } else if (unit1 == "mm") {
        if (unit2 == "km") {
            return value1 + value2*(10 ** 6);
        } else if (unit2 == "m") {
            return value1 + value2*(10 ** 3);
        } else if (unit2 == "cm") {
            return value1 + value2*10;
        } else if (unit2 == "dm") {
            return value1 + value2*100;
        } else if (unit2 == "mm") {
            return value1 + value2;
        }
    }
    return false;
}
function sum(value1, unit1, value2, unit2) {
    if (unit1 == "km") {
        if (unit2 == "km") {
            return value1 + value2;
        } else if (unit2 == "m") {
            return value1 + value2*(10 ** -3);
        } else if (unit2 == "cm") {
            return value1 + value2*(10 ** -5);
        } else if (unit2 == "dm") {
            return value1 + value2*(10 ** -4);
        } else if (unit2 == "mm") {
            return value1 + value2*(10 ** -6);
        }
    } else if (unit1 == "m") {
        if (unit2 == "km") {
            return value1 + value2*1000;
        } else if (unit2 == "m") {
            return value1 + value2;
        } else if (unit2 == "cm") {
            return value1 + value2/100;
        } else if (unit2 == "dm") {
            return value1 + value2/10;
        } else if (unit2 == "mm") {
            return value1 + value2*(10 ** -3);
        }
    } else if (unit1 == "cm") {
        if (unit2 == "km") {
            return value1 + value2*(10 ** 5);
        } else if (unit2 == "m") {
            return value1 + value2*100;
        } else if (unit2 == "cm") {
            return value1 + value2;
        } else if (unit2 == "dm") {
            return value1 + value2*10;
        } else if (unit2 == "mm") {
            return value1 + value2/10;
        }
    } else if (unit1 == "dm") {
        if (unit2 == "km") {
            return value1 + value2*(10 ** 4);
        } else if (unit2 == "m") {
            return value1 + value2*10;
        } else if (unit2 == "cm") {
            return value1 + value2/10;
        } else if (unit2 == "dm") {
            return value1 + value2;
        } else if (unit2 == "mm") {
            return value1 + value2/100;
        }
    } else if (unit1 == "mm") {
        if (unit2 == "km") {
            return value1 + value2*(10 ** 6);
        } else if (unit2 == "m") {
            return value1 + value2*(10 ** 3);
        } else if (unit2 == "cm") {
            return value1 + value2*10;
        } else if (unit2 == "dm") {
            return value1 + value2*100;
        } else if (unit2 == "mm") {
            return value1 + value2;
        }
    }
    return false;
}