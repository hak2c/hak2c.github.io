// VCT tính và in bảng cửu chương, sử dụng vòng lặp for lồng nhau
function bangCuuChuong() {
    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
            console.log(`${i} x ${j} = ${i*j}`);
        }
    }
}
bangCuuChuong();

// VCT in ra màn hình nếu số chia hết cho 3 thì in “Fizz”, chia hết cho 5 thì in “Buzz”, chia hết cho cả 3 và 5 thì in “FizzBuzz”, không chiahết cho cả 3 và 5 thì in “BizzFuzz”. Số trong khoảng 0 -> 100
function fizzBuzz(num) {
    let result = "";
    if (num % 15 == 0) {
        result = "FizzBuzz";
    } else if (num % 3 == 0) {
        result = "Fizz";
    } else if (num % 5 == 0) {
        result = "Buzz";
    } else {
        result = "BizzFuzz";
    }
    return result;
}
function printFizzBuzz() {
    let result = "";
    for (let i = 0; i <= 100; i++) {
        result += `${fizzBuzz(i)} `;
    }
    console.log(result);
}
printFizzBuzz();

// VCT tính và in ra tổng bội chung của 3 và 5 trong khoảng 0 -> 1000
function checkBoiChung(num) {
    if (num % 15 == 0) {
        return true;
    } else {
        return false;
    }
}
function printBoiChung() {
    let result = "";
    for (let i = 0; i <= 1000; i++) {
        if (checkBoiChung(i)) {
            result += `${i} `;
        }
    }
    console.log(result);
}
printBoiChung();

//  VCT kiểm tra và in ra một số có phải số nguyên tố hay không
function checkSoNguyenTo(num) {
    let result = false;
    if (num < 2) {
        result = false;
    } else if (num == 2) {
        result = true;
    } else if (num % 2 == 0) {
        result = false;
    } else {
        result = true;
        for (let i = 3; i < num - 1; i += 2) { // chỉ check số lẻ
            if (num % i == 0) {
                result = false;
                break;
            }
        }
    }
    return result;
}

// VCT kiểm tra và in ra các số nguyên tố trong khoảng 0 -> 1000
function printSoNguyenTo(a, b) {
    let result = "";
    if (a < b) {
        for (let i = a; i <= b; i++) {
            if (checkSoNguyenTo(i)) {
                result += `${i} `;
            }
        }
    }
    
    console.log(result);
}
printSoNguyenTo(0, 1000);

// VCT nhập vào 2 số a, b kiểm tra và in ra các số nguyên tố trong khoảng a -> b
function timSoNguyenToTrongKhoang() {
    let a = +prompt("Nhập số a"),
        b = +prompt("Nhập số b");
        printSoNguyenTo(a, b);
}
timSoNguyenToTrongKhoang();

// VCT in ra bảng cửu chương ngược (từ 10 -> 1)
function bangCuuChuongNguoc() {
    for (let i = 10; i >= 1; i--) {
        for (let j = 1; j <= 10; j++) {
            console.log(`${i} x ${j} = ${i*j}`);
        }
    }
}
bangCuuChuongNguoc();

// Viết chương trình in dãy số Fibonacci
function fibonacci(num) {
    return num == 0 ? 0
        : num == 1 ? 1
            : fibonacci(num - 1) + fibonacci(num - 2);
}
console.log(fibonacci(100));

// Viết chương trình tìm bội chung nhỏ nhất, ước chung lớn nhất của 2 số