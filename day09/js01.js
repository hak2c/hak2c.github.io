// Viết chương trình cho phép nhập vào chiều dài, chiều rộng của hình chữ nhật, tính và in ra chu vi, diện tích của hình chữ nhật

let w = +prompt('Nhập chiều rộng:'),
    h = +prompt('Nhập chiều cao:');
console.log(`Chu vi hình chữ nhật: ${2*(w + h)}`);
console.log(`Diện tích hình chữ nhật: ${w * h}`);

// Viết chương trình cho phép nhập vào bán kính hình tròn, tính và in ra chu vi, diện tích của hình tròn

let r = +prompt('Nhập bán kính hình tròn:');
const PI = 3.14;
console.log(`Chu vi hình tròn: ${2*r*PI}`);
console.log(`Diện tích hình tròn: ${(r ** 2) * PI}`);

// Viết chương trình cho phép nhập vào hệ số a, b của phương trình bậc nhất ax + b = 0, tính và in ra nghiệm của phương trình
let a = +prompt('Nhập hệ số a của phương trình ax + b = 0'),
    b = +prompt('Nhập hệ số b của phương trình ax + b = 0');
if (a == 0) {
    console.log('Phương trình vô nghiệm');
} else {
    console.log(`Nghiệm của phương trình là: ${-b / a}`);
}

// Viết chương trình cho phép nhập vào một số là đơn vị cm, tính và in ra giá trị tương ứng ở các đơn vị mm, m, km
let cm = +prompt('Nhập giá trị cm:');
console.log(`Đổi ra mm: ${cm * 10}`);
console.log(`Đổi ra m: ${cm / 100}`);
console.log(`Đổi ra km: ${cm * (10 ** -5)}`);

// Viết chương trình cho phép nhập vào một số là nhiệt độ có đơn vị Celsius, in ra nhiệt độ ở đơn vị Fahrenheit và Kevin tương ứng
let temp = +prompt('Nhập vào nhiệt độ theo độ Celsius:');

console.log(`Đổi ra độ Fahrenheit: ${temp / 0.55 + 32}F`);
console.log(`Đổi ra độ Kevin: ${temp - 273.15}K`);

// Viết chương trình cho phép nhập một số phút tính từ 0h, tính và in ra giờ/phút tương ứng
let minutes = +prompt('Nhập vào số phút:'),
    hours = Math.floor(minutes / 60);
minutes %= 60;
console.log(`Bây giờ là ${hours} giờ ${minutes} phút`);

// 1. Viết chương trình cho phép nhập ba số, kiểm tra và in ra số lớn nhất
let a = +prompt('Nhập số a'),
    b = +prompt('Nhập số b'),
    c = +prompt('Nhập số c'),
    max = a;
max = max < b ? b : max;
max = max < c ? c : max;
console.log(`Số lớn nhất trong 3 số đã nhập là: ${max}`);


// 2. VCT cho phép nhập một số, kiểm tra và in ra số đó có chia hết cho 5 và 11 hay không
let numberCheck = +prompt('Nhập vào số để kiểm tra chia hết 5 và 11 hay không');
if ((numberCheck % 5 == 0) && (numberCheck % 11 == 0)) {
    console.log(`${numberCheck} chia hết 5 và 11`);
} else {
    console.log(`${numberCheck} không chia hết 5 và 11`);
}
// 3. VCT cho phép nhập một năm, kiểm tra và in ra năm đó có phải năm nhuận hay không
let yearCheck = +prompt('Nhập vào năm để kiểm tra có phải năm nhuận hay không');
if (yearCheck % 4 == 0) {
    console.log(`${yearCheck} là năm nhuận`);
} else {
    console.log(`${yearCheck} là năm nhuận`);
}
// 4. VCT cho phép nhập một ký tự, kiểm tra và in ra ký tự đó có thuộc bảng ký tự alphabe (a-zA-Z) hay không
let char = prompt('Nhập một ký tự để kiểm tra');
if (char.match(/[a-zA-Z]/)) {
    console.log(`${char} là chữ cái trong bảng alphabet`);
} else {
    console.log(`${char} không phải là chữ cái trong bảng alphabet`);
}
// 5. VCT cho phép nhập một ký tự, kiểm tra và in ra ký tự đó là nguyên hay phụ âm (tiếng Anh)
let char = prompt('Nhập một ký tự để kiểm tra');
if (char.match(/[a-zA-Z]/)) {
    let lower = char.toLowerCase();
    if (lower == 'a' || lower == 'e' || lower == 'o' || lower == 'u' || lower == 'i') {
        console.log(`${char} là nguyên âm`);
    } else {
        console.log(`${char} là phụ âm`);
    }
} else {
    console.log(`${char} không phải là chữ cái trong bảng alphabet`);
}

// 6. VCT cho phép nhập một ký tự, kiểm tra và in ra ký tự đó là chữ thường hay chữ in hoa
let char = prompt('Nhập một ký tự để kiểm tra');
if (!isNaN(+char)) {
    console.log(`${char} là số`);
} else if (char == char.toUpperCase()) {
    console.log(`${char} là chữ in hoa`);
} else if (char == char.toLowerCase()) {
    console.log(`${char} là chữ in thường`);
} else {
    console.log('Sai dữ liệu nhập vào');
}
// 7. VCT cho phép nhập ba hệ số a, b, c, của phương trình bậc 2 ax2 + bx + c = 0, tính và in ra nghiệm phương trình
let a = +prompt('Nhập hệ số a của phương trình'),
    b = +prompt('Nhập hệ số b của phương trình'),
    c = +prompt('Nhập hệ số c của phương trình'),
    delta = b ** 2 - 4 * a * c;
if (delta < 0) {
    console.log('Phương trình vô nghiệm');
} else if (delta == 0) {
    console.log(`Phương trình có nghiệm kép x1 = x2 = ${-b(2*a)}`);
} else {
    console.log('Phương trình có 2 nghiệm:');
    console.log(`x1 = ${(-b + Math.sqrt(delta)) / (2 * a)}`);
    console.log(`x1 = ${(-b - Math.sqrt(delta)) / (2*a)}`);
}
// 8. VCT quy đổi điểm hệ số 10, sang điểm hệ chữ cho sinh viên, với điểm =< 10 là A, < 8.5 là B, < 7.0 là C, < 5.5 là D, < 4.0 là F
let diemThi = +prompt('Nhập điểm của sinh viên:');
if (diemThi < 4) {
    console.log(`Điểm của sinh viên là F`);
} else if (diemThi < 5.5) {
    console.log(`Điểm của sinh viên là D`);
} else if (diemThi < 7) {
    console.log(`Điểm của sinh viên là C`);
} else if (diemThi < 8.5) {
    console.log(`Điểm của sinh viên là B`);
} else if (diemThi <= 10) {
    console.log(`Điểm của sinh viên là A`);
} else {
    console.log(`Nhập sai dữ liệu`);
}