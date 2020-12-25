// 1. Viết hàm chuyển đổi một chuỗi thành dạng capitalize. VD: “hello world” => “Hello World”
let changeCapitalize = (str) => {
    let result = str[0].toUpperCase();
    for (let i = 1; i < str.length; i++) {
        if (str[i - 1] == " ") result += str[i].toUpperCase();
        else result += str[i];
    }
    return result;
}
changeCapitalize("hello world");

// 2. Viết hàm chuyển đổi một chuỗi thành dạng paramaterize. VD “Hello World” => “hello-world”
let changeParamaterize = (str) => {
    let result = str[0].toLowerCase();
    for (let i = 1; i < str.length; i++) {
        if (str[i] == " ") {
            result += "-";
        } else if (str[i - 1] == " " || str[i - 1] == "-") {
            result += str[i].toLowerCase();
        } else {
            result += str[i];
        }
    }
    return result;
}
changeParamaterize("Hello World");

// 3.Viết hàm loại bỏ khoảng trắng ở đầu, cuối, và rút gọn khoảng trắng ở giữa các từ trong chuỗi. VD: “Hello     world   !   ” => “Hello world !”
let removeSpaceKey = (str) => {
    str = str.trim();
    let result = "";
    for (let i = 0; i < str.length; i++) {
        if (str[i - 1] == " ") {
            if (str[i] != " ") {
                result += str[i];
            }
        } else {
            result += str[i];
        }
    }
    return result;
}
removeSpaceKey('Hello     world   !   ');

// 4. Viết hàm đảo ngược chữ thường thành chữ hoa, và ngược lại. VD “aBcD” => “AbCd”
let daoNguoc = (str) => {
    let result = "";
    for (let i = 0; i < str.length; i++) {
        if (str[i] == str[i].toUpperCase()) result += str[i].toLowerCase();
        else result += str[i].toUpperCase();
    }
    return result;
}
daoNguoc('aBcD');

// 5. Viết hàm lặp chuỗi n lần. VD “Hehe”, 3 => “HeheHeheHehe”
let repeatString = (str, n) => {
    let result = "";
    for (i = 1; i <= n; i++){
        result += str;
    }
    return result;
}
repeatString('Hehe', 3);

// 6. Viết hàm chèn một chuỗi con vào chuỗi tại index chỉ định. VD “ac”, “b”, 1 => “abc”
let insertToString = (str1, str2, index) => {
    let result = "";
    for (let i = 0; i < str1.length; i++) {
        if (i == index) {
            result += str2;
        }
        result += str1[i];
    }
    return result;
}
insertToString('abde', 'c', 2);

// 7. Viết hàm rút gọn chuỗi nếu chuỗi dài hơn giá trị chỉ định. VD “abcdef”, 2 => “ab…”;
let shortString = (str, n) => {
    if (str.length <= n) return str;
    let result = "";
    for (let i = 0; i < n; i++) {
        result += str[i];
    }
    return result + "...";
}
shortString('abcdef', 2);