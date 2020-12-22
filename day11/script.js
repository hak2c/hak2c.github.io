

// 2. Kiểm tra cạnh tam giác
let isTriangle = (a, b, c) => (a + b > c && a + c > b && b + c > a) ? true : false;
function isTriangle(a, b, c) {
    if (a + b > c && a + c > b && b + c > a) {
        return true;
    } else {
        return false;
    }
}

// 4. Viết hàm nearest(a, b) 

// 8. Viết hàm countEven(number) trả về số chữ số chẵn của number
let countEven = (number) => {
    let str = String(number),
        count = 0;
    for (let i = 0; i < str.length; i++) {
        if (+str[i] % 2 == 0) {
            count++;
        }
    }
    return count;
}
function countEven(number) {
    let str = String(number),
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