// VCT tính và in bảng cửu chương, sử dụng vòng lặp for lồng nhau
function bangCuuChuong() {
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      console.log(`${i} x ${j} = ${i * j}`);
    }
  }
}
bangCuuChuong();

// VCT in ra màn hình nếu số chia hết cho 3 thì in “Fizz”, chia hết cho 5 thì in “Buzz”, chia hết cho cả 3 và 5 thì in “FizzBuzz”, không chiahết cho cả 3 và 5 thì in “BizzFuzz”. Số trong khoảng 0 -> 100
function fizzBuzz(num) {
  if (num % 15 == 0) {
    return "FizzBuzz";
  } else if (num % 3 == 0) {
    return "Fizz";
  } else if (num % 5 == 0) {
    return "Buzz";
  } else {
    return "BizzFuzz";
  }
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
function printBoiChung() {
  let result = "";
  for (let i = 0; i <= 1000; i++) {
    if (i % 15 == 0) {
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
    return false;
  } else if (num == 2) {
    return true;
  } else if (num % 2 == 0) {
    return false;
  } else {
    result = true;
    for (let i = 3; i < Math.sqrt(num); i += 2) {
      // chỉ check số lẻ
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
  // if (checkNumber(a) && checkNumber(b)) { hàm checkNumber
  if (a > b) {
    let temp = a;
    a = b;
    b = temp;
  }
  for (let i = a; i <= b; i++) {
    if (checkSoNguyenTo(i)) {
      result += `${i} `;
    }
  }
  // }
  console.log(result);
}
printSoNguyenTo(0, 1000);

// Viết hàm printPrime(n) in ra các số nguyên tố trong khoảng từ 0 > n, mặc định n = 100
function printPrime(n = 100) {
  let result = "";
  for (let i = 0; i <= n; i++) {
    if (checkSoNguyenTo(i)) {
      result += `${i} `;
    }
  }
  console.log(result);
}
printPrime();

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
      console.log(`${i} x ${j} = ${i * j}`);
    }
  }
}
bangCuuChuongNguoc();

// VCT in ra chữ số đầu và cuối của một số. VD 12345 -> 15

/* Cách dài dòng tách function
function demSoChuSo(num) {
    let dem = 0;
    while (num >= 10) {
        num /= 10;
        dem++;
    }
    return dem + 1;
}
function laySoDauTien(num) {
    let soChuSo = demSoChuSo(num);
    if (num == 1) {
        return num;
    } else {
        let phanDu = num % (10 ** (soChuSo-1));
        return ((num - phanDu) / (10 ** (soChuSo-1)));
    }
}*/
function printDigit(num) {
  let firstDigit = num,
    lastDigit = num % 10,
    result = "";
  if (num < 10) {
    result = `${lastDigit}`;
  } else {
    while (firstDigit >= 10) {
      firstDigit = (firstDigit - (firstDigit % 10)) / 10;
    }
    result = `${firstDigit}${lastDigit}`;
  }
  console.log(result);
}
printDigit(15444);

// Viết chương trình in dãy số Fibonacci
function fibonacci(num) {
  var a = 1,
    b = 0,
    temp;
  while (num > 0) {
    temp = a;
    a = a + b;
    b = temp;
    num--;
  }
  return b;
}
function printFibonacci() {
  let num = +prompt("Nhập số phần tử trong dãy Fibonacci cần in:"),
    result = "";
  for (let i = 0; i < num; i++) {
    result += `${fibonacci(i)} `;
  }
  document.write(result);
}
printFibonacci();

// Viết chương trình tìm bội chung nhỏ nhất, ước chung lớn nhất của 2 số
function uocChungLonNhat(a, b) {
  if (a == 0) return b;
  while (a != b) {
    if (a > b) a -= b;
    else b -= a;
  }
  return a;
}
function printUCLNvaBCNN() {
  let a = +prompt("Nhập số a"),
    b = +prompt("Nhập số b");
  // if (checkNumber(a) && checkNumber(b)) { hàm checkNumber
  console.log(
    `Ước chung lớn nhất của ${a} và ${b} là: ${uocChungLonNhat(a, b)}`
  );
  console.log(
    `Bội chung nhỏ nhất của ${a} và ${b} là: ${(a * b) / uocChungLonNhat(a, b)}`
  );
  // }
}
printUCLNvaBCNN();
// Viết hàm convertTemperature(temp, from, to) chuyển đổi và in ra nhiệt độ từ Celsius sang Farenheit hoặc Kevin, mặc định sẽ chuyển từ Celsius sang Kevin
function convertTemperature(temp, from = "C", to = "K") {
  let result = temp;
  if (from == "C") {
    result = to == "K" ? temp - 273.15 : to == "F" ? temp / 0.55 + 32 : temp;
  } else if (from == "F") {
    result =
      to == "C"
        ? (temp - 32) * 0.55
        : to == "K"
        ? (temp - 32) * 0.55 - 273.15
        : temp;
  } else if (from == "K") {
    result =
      to == "C" ? temp + 273.15 : to == "F" ? temp + 273.15 / 0.55 + 32 : temp;
  }
  return result;
}
console.log(convertTemperature(25));

// Viết chương trình in ra các pattern sau:
/*
 *
 **
 ***
 ****
 *****
 */
function patternTwo(n) {
  for (let i = 1; i <= n; i++) {
    let str = "";
    for (let j = 1; j <= n; j++) {
      if (j < n + 1 - i) {
        str += "  ";
      } else {
        str += "* ";
      }
    }

    console.log(str);
  }
}

// Số đối xứng

/* Đảo ngược số và so sánh với param */
function palindromeOption1(num) {
  let temp = num,
    soDaoNguoc = "";
  while (temp >= 10) {
    soDaoNguoc += `${temp % 10}`;
    temp = (temp - (temp % 10)) / 10;
  }
  soDaoNguoc += `${temp}`;
  if (num == +soDaoNguoc) {
    document.write(`${num} là số đối xứng`);
  } else {
    document.write(`${num} không phải là số đối xứng`);
  }
}

/* Chuyển sang string và duyệt for */
function palindromeOption2(num) {
  let str = String(num),
    result = true;
  if (str.length == 1) {
    result = false;
  } else {
    for (let i = 0; i <= str.length / 2; i++) {
      if (str[i] != str[str.length - i - 1]) {
        result = false;
        break;
      }
    }
  }

  if (result) {
    document.write(`${num} là số đối xứng`);
  } else {
    document.write(`${num} không phải là số đối xứng`);
  }
}

// Check số Amstrong
function amstrong(num) {
  let soChuSo = 0,
    temp = num,
    sum = 0,
    str = String(num);
  while (temp >= 10) {
    soChuSo++;
    temp = (temp - (temp % 10)) / 10;
  }
  soChuSo++;
  for (let i = 0; i < str.length; i++) {
    sum += (+str[i]) ** soChuSo;
  }
  if (sum == num) {
    console.log(`${num} là số Amstrong`);
  } else {
    console.log(`${num} không phải là số Amstrong`);
  }
}

// Check số Perfect
function checkPerfect(num) {
  let sum = 0;
  for (let i = 1; i < num; i++) {
    if (num % i == 0) {
      sum += i;
    }
  }
  if (sum == num) {
    console.log(`${num} là số perfect`);
  } else {
    console.log(`${num} không phải là số perfect`);
  }
}

// Function check số nguyên dương
function checkNumber(a) {
  if (!isNaN(a) && a != null && a > 0) {
    return true;
  } else {
    return false;
  }
}
