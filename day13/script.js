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

// 8. Viết hàm đếm số lần xuất hiện của chuỗi con trong chuỗi. VD “abca”, “a” => 2
let countSubString = (str1, str2) => str1.split(str2).length - 1;
countSubString('abcabcaaabfcbacbab', 'ab'); // 4

// 9. Viết hàm cắt chuỗi theo số từ chỉ định. VD “My name is Ba”, 2 => “My name”
let cutStringByWord = (str, n) => {
    let count = 0,
        result = "";
    for (let i = 0; i < str.length; i++) {
        if (str[i - 1] != " " && str[i] == " ") {
            count++;
            if (count == n) return result;
            else result += str[i];
        } else {
            result += str[i];
        }
    }
    return result;
}
cutStringByWord('My name is Ba', 2);

// 10. Viết hàm tạo chuỗi GUID ngẫu nhiên với độ dài 32 ký tự
let random = (a, b) => a + Math.floor(Math.random() * (b - a));
let createGuidCode = () => {
    let result = "";
    for (let i = 1; i <= 32; i++) {
        result += String.fromCodePoint(random(33, 126));
    }
    return result;
}
createGuidCode();

// 11. Viết hàm thay thế các ký tự trong chuỗi thành ký tự liền sau trong bảng mã Unicode.
let nextCode = (str) => {
    let newStr = "";
    for (let i = 0; i < str.length; i++) {
      newStr += String.fromCodePoint(str.charCodeAt(i) + 1);
    }
    return newStr;
};

// Viết hàm arr._concat(arr2) gộp các phần tử của mảng arr2 vào arr1
arr._concat = function (arr2) {
    let result = [];
    for (let i = 0; i < this.length; i++) {
      result[result.length] = this[i];
    }
    for (let i = 0; i < arr2.length; i++) {
      result[result.length] = arr2[i];
    }
    return result;
};

// Viết hàm arr._push(value) thêm giá trị vào cuối mảng
arr._push = function (value) {
    let result = this;
    result[result.length] = value;
    return result;
};
// arr._pop() xóa phần tử cuối mảng, đồng thời trả về giá trị của các phần tử bị xóa
arr._pop = function () {
    let result = this[this.length - 1];
    this.length--;
    return result;
};
// arr._indexOf() tìm và trả về index của phần tử, nếu ko có trả về -1
arr._indexOf = function (value) {
    for (let i = 0; i < this.length; i++) {
      if (this[i] == value) {
        return i;
      }
    }
    return -1;
};
// arr._reverse() đảo ngược
arr._reverse = function () {
    /*for (let i = 0; i < this.length / 2; i++) {
      temp = this[i];
      this[i] = this[this.length - 1 - i];
      this[this.length - 1 - i] = temp;
    }*/
    for(let i=0, j = this.length - 1; i < j; i++, j--) {
          let temp = this[i];
          this[i] = this[j];
          this[j] = temp;
    }
    return this;
};

// Viết hàm arr._sort(arr, callback) thực thi code giống như hàm sort()
let s = (a, b) => {
    if (a > b) return true;
    else return false;
}
arr = [12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213];
arr._sort = function (callback) {
    let swapp;
    do { // chạy code trước khi check điều kiện swapp là true
        // Set flag false
        swapp = false;
        // loop mảng this
        for (let i = 0; i < this.length - 1; i++) {
            // so sánh phần tử thứ i và i+1 trong mảng
            if (typeof callback == 'function') {
                if (callback(this[i], this[i + 1])) {
                    let temp = this[i];
                    this[i] = this[i + 1];
                    // Gán lại i và i+1
                    this[i + 1] = temp;
                    // Set flag là true, đánh dấu đã có tráo đổi trong mảng
                    swapp = true;
                }
            } else { 
                // Nếu không có hàm callback, mặc định sắp xếp lớn dần theo string
                if (`${this[i]}` > `${this[i + 1]}`) {
                    let temp = this[i];
                    this[i] = this[i + 1];
                    // Gán lại i và i+1
                    this[i + 1] = temp;
                    // Set flag là true, đánh dấu đã có tráo đổi trong mảng
                    swapp = true;
                }
            }
            
        }
    } while (swapp);
    return this;
}
arr._sort(s);

// arr._filter
arr = [
    {
        name: "Hà",
        age: 35
    },
    {
        name: "Thắng",
        age: 25
    },
    {
        name: "Tuấn",
        age: 23
    },
    {
        name: "Thảo",
        age: 22
    },
    {
        name: "Hưng",
        age: 27
    },
    {
        name: "Giang",
        age: 24
    },
    {
        name: "Tuấn Anh",
        age: 25
    },
]

let condition = (i) => {
    if (i.age > 25) return true;
    else return false;
}
let printName = (i) => {
    console.log(i.name);
}

// arr._forEach
arr._forEach = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if(typeof callback == 'function') callback(this[i]);
    }
}
arr._forEach(printName);

arr._filter = function (callback) {
    let result = [];
    for (let i = 0; i < this.length; i++) {
        if (typeof callback == 'function' && callback(this[i])) {
            result[result.length] = this[i];
        }
    }
    return result;
}
arr._filter(condition);