/* BÀI TẬP MẢNG PAGE 1 */

// 1. Cho một mảng số, viết hàm tính trung bình cộng tất cả phần tử trong mảng
let trungBinhCong = (arr) => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
};

// 2. Cho một mảng số, viết hàm tìm index của một số trong mảng
let findIndex = (arr, n) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == n) return i;
  }
  return -1;
};

// 3. Viết hàm sao chép một mảng số
let copyArr = (arr) => arr.map((i) => i);

// 4. Cho một mảng số, viết hàm tìm giá trị lớn nhất trong mảng
let findMaximum = (arr) => {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (max < arr[i]) max = arr[i];
  }
  return max;
};

// 5. Viết hàm đổi chỗ vị trí 2 phần tử trong mảng
let swapItem = (arr, idx1, idx2) => {
  let temp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp;
  return arr;
};

// 6. Cho một mảng số, viết hàm tìm số lớn thứ 3 trong mảng
let arr = [1, 44, 6, 43, 2, 8, 3, 8, 3];
let findMax = (arr, number) => {
  //   let count = 0;
  //   arr = arr.sort((a, b) => a - b);
  //   for (let i = 1; i < arr.length; i++) {
  //     if (arr[i - 1] < arr[i]) count++;
  //     if (count == number - 1) return arr[i];
  //   }
  //   return arr[number - 1];
};
findMax(arr, 3);
arr.map((i) => arr.filter((x) => x == i).length).sort((a, b) => b - a)[0];

// 7. Viết hàm chuyển đổi một chuỗi thành dạng capitalize. VD “hello world” => “Hello World”
let changeCapitalize = (str) => {
  let result = str[0].toUpperCase();
  for (let i = 1; i < str.length; i++) {
    if (str[i - 1] == " ") result += str[i].toUpperCase();
    else result += str[i];
  }
  return result;
};
changeCapitalize("hello world");

// 8. Viết hàm tìm số lần xuất hiện lớn nhất của một phần tử trong mảng
let arr = [1, 2, 3, 2, 5, 6, 3, 5, 7, 3, 5, 3, 8];
let countExist = (arr, n) => {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (n == arr[i]) count++;
  }
  return count;
};
let findMaxExist = (arr) => {
  let max = countExist(arr, arr[0]),
    item = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (max < countExist(arr, arr[i])) {
      max = countExist(arr, arr[i]);
      item = arr[i];
    }
  }
  return item;
};
findMaxExist(arr);

// 9. Viết hàm cắt chuỗi thành một mảng có độ dài chỉ định. VD “Hello”, 2 => [“He”, “ll”, “o”]
let cutStringToArray = (str, len) => {
  let result = [];
  for (let i = 0, j = 0; i < str.length; i += len, j++) {
    console.log(i + " " + j);
    result[j] = str.slice(i, i + len);
  }
  return result;
};
cutStringToArray("Hello", 2);

// 10. Viết hàm tách chuỗi thành một mảng các chuỗi con. VD “dog” => [“d”, “do”, “dog”, “og”, “g”]
let str = "dog";
let cutStringToArray = (str) => {
  let res = [];
  for (let i = 0; i < str.length; i++) {
    for (let j = i; j < str.length; j++) {
      res.push(str.slice(i, j+1));
    }
  }
  return res;
}
cutStringToArray(str);

// 11. Cho một mảng số, viết hàm loại bỏ số trùng lặp trong mảng. VD [1,2,2,3] => [1,2,3]
let arr = [1, 2, 2, 3];
let removeDuplicate = (arr) => {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (result.indexOf(arr[i]) === -1) result.push(arr[i]);
  }
  return result;
}
arr = removeDuplicate(arr);

// 12. Mảng lưu số Fibonacci từ 0->n
let fibonacci = (num) => {
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
let createFibonacciArray = (n) => {
  let result = [];
  for (let i = 0; i < n; i++) {
    result.push(fibonacci(i));
  }
  return result;
}
createFibonacciArray(8);

// 13. Viết hàm trả về một mảng các số trùng nhau trong 2 mảng. VD [1,2,3], [2,3,4] => [2,3]
let arr1 = [1, 2, 3];
let arr2 = [2, 3, 4];
let findSimilar = (arr1, arr2) => {
  let result = [];
  for (let i = 0; i < arr1.length; i++) {
    if (arr2.indexOf(arr1[i]) != -1 && result.indexOf(arr1[i]) == -1)
      result.push(arr1[i]);
  }
  for (let i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) != -1 && result.indexOf(arr2[i]) == -1)
      result.push(arr2[i]);
  }
  return result;
};
findSimilar(arr1, arr2);

// 14. Viết hàm trả về một mảng các số không trùng nhau trong 2 mảng. VD [1,2,3], [2,3,4] => [1,4]
let arr1 = [1, 2, 3];
let arr2 = [2, 3, 4];
let findDefference = (arr1, arr2) => {
  let result = [];
  for (let i = 0; i < arr1.length; i++) {
    if (arr2.indexOf(arr1[i]) == -1) result.push(arr1[i]);
  }
  for (let i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) result.push(arr2[i]);
  }
  return result;
};
findDefference(arr1, arr2);

// 15. Viết hàm loại bỏ các giá trị “false” khỏi mảng. VD [null, 1, 0, NaN, “”] => [1]
let filterArray = (arr) => arr.filter((i) => !!i);
filterArray([null, 1, 0, NaN, '']);

/* BÀI TẬP MẢNG PAGE 2 */
// 1. Viết hàm sắp xếp một mảng số nguyên
let s = (a, b) => {
  if (a > b) return true;
  else return false;
};
arr = [12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213];
arr._sort = function (callback) {
  let swapp;
  do {
    swapp = false;
    for (let i = 0; i < this.length - 1; i++) {
      if (typeof callback == "function") {
        if (callback(this[i], this[i + 1])) {
          let temp = this[i];
          this[i] = this[i + 1];
          this[i + 1] = temp;
          swapp = true;
        }
      } else {
        // Nếu không có hàm callback, mặc định sắp xếp lớn dần theo string
        if (`${this[i]}` > `${this[i + 1]}`) {
          let temp = this[i];
          this[i] = this[i + 1];
          this[i + 1] = temp;
          swapp = true;
        }
      }
    }
  } while (swapp);
  return this;
};
arr._sort(s); // sắp xếp theo number
arr._sort(); // sắp xếp string

// 3. Cho một mảng object user [{name: “Ba”, age: 28}, {name: “Bon”, age: 3}, …] Viết hàm sắp xếp mảng user tăng dần theo age
let sortByAge = (arr) => arr.sort((a, b) => a.age - b.age);

// 4. Tương tự, viết hàm sắp xếp mảng user theo name.length
let sortByNameLength = (arr) => arr.sort((a, b) => a.name.length - b.name.length);

// 5. Viết hàm sắp xếp mảng user theo name
let user = [
  {
    name: "hà phạm",
    age: 35,
  },
  {
    name: "thắng",
    age: 25,
  },
  {
    name: "tuấn",
    age: 23,
  },
  {
    name: "thảo",
    age: 19,
  },
  {
    name: "hưng",
    age: 27,
  },
  {
    name: "giang",
    age: 24,
  },
  {
    name: "tuấn anh",
    age: 25,
  },
];
user.sort((a,b) => {
  if (a.name.toLowerCase() < b.name.toLowerCase()) {return -1;}
  if (a.name.toLowerCase() > b.name.toLowerCase()) {return 1;}
  return 0;
});

// 6. Cho một mảng số, và một số n, tìm trong mảng vị trí 2 phần tử có tổng bằng n, kết quả trả về là một mảng lưu vị trí 2 phần tử, hoặc mảng rỗng nếu không tìm thấy
let findSum = (arr, n) => {
  let result = [];
  for (let i = 0; i <= arr.length - 1; i++) {
    for (let j = i+1; j < arr.length; j++){
      if (arr[i] + arr[j] == n) result.push(`${i} ${j}`);
    }
  }
  return result;
}
let arr = [1, 2, 3, 2, 5, 6, 3, 5, 7, 3, 5, 3, 8];
findSum(arr, 5);

// 7. Viết hàm lấy một phần tử ngẫu nhiên trong mảng
let arr = [1, 2, 3, 2, 5, 6, 3, 5, 7, 3, 5, 3, 8];
let randomItem = (arr) => arr[Math.floor(Math.random() * (arr.length - 1))];
randomItem(arr);

// 8. Viết hàm sắp xếp mảng với vị trí ngẫu nhiên (xáo trộn mảng)
let arr = [1, 2, 3, 4];
let shuffleArray = (arr) => {
  let currentIndex = arr.length,
    temp,
    randomIndex;
  while (0 != currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temp = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
  return arr;
}
shuffleArray(arr);

// 8, 9. Viết hàm biến một một mảng nhiều chiều thành mảng 1 chiều.
let arr = [[1, 2, 3], [2, 3, 4], [5, 6, 7]];
let multiDimensions = (arr) => {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      for (let j = 0; j < arr[i].length; j++) {
        result.push(arr[i][j]);
      }
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
multiDimensions(arr);

/* BÀI TẬP MẢNG PAGE 3 */

// 1. Viết hàm biến đổi các phần tử của mảng số nguyên thành bình phương của chính nó
let squareArray = (arr) => arr.map((i) => i * i);
squareArray([1, 2, 3, 4]);

// 2. Viết hàm biến đổi các phần tử của mảng chuỗi thành dạng uppercase()
let uppercaseArray = (arr) => arr.map((i) => i.toUpperCase());
uppercaseArray(['abc', 'def']);

// 3. Viết hàm lọc ra các phần tử có kiểu “number” trong một mảng hỗn hợp
let filterNumber = (arr) => arr.filter((i) => typeof i == 'number');
filterNumber(['a', 1, 2, 'b']);

// 4->8
let arr = [
  {
    name: "hà phạm",
    age: 35,
  },
  {
    name: "thắng",
    age: 25,
  },
  {
    name: "tuấn",
    age: 23,
  },
  {
    name: "thảo",
    age: 19,
  },
  {
    name: "hưng",
    age: 27,
  },
  {
    name: "giang",
    age: 24,
  },
  {
    name: "tuấn anh",
    age: 25,
  },
];

// 5. Viết hàm lọc ra các object với age > 20
let filterByAge = (arr) => arr.filter((i) => i.age > 20);
filterByAge(arr);

// 6. Viết hàm chuyển đổi name của object thành dạng capitalize => sai
let capitalizeName = (arr) => arr.map((i) => {
  let split = i.name.split(" ");
  let result = "";
  console.log(split);
  for (let j = 0; j < split.length; j++) {
    if(split[i] != " ") result += split[j][0].toUpperCase() + split[i].slice(1) + " ";
  }
  i.name = result;
  return i;
})
capitalizeName(arr);

// 7. Viết hàm chuyển đổi name của object thành dạng viết tắt. VD “Ba Nguyen” => “Ba N.”
let shortName = (arr) => arr.map((i) => {
  let idx = i.name.indexOf(" "),
    newName = i.name[0].toUpperCase();
  if (idx != -1) {
    newName += i.name.slice(1, idx + 1) + i.name[idx + 1].toUpperCase() + ".";
  } else {
    newName += i.name.slice(1, i.name.length);
  }
  i.name = newName;
  return i;
});
shortName(arr);
// 8. Viết hàm để chuyển mảng object thành một mảng chỉ chứa name
let onlyName = (arr) => arr.map((i) => i.name);
onlyName(arr);


/* BÀI TẬP DATE TIME */

// 7. Viết hàm kiểm tra một ngày có phải cuối tuần không
let day = "2021-02-28";
let checkWeekend = (day) => {
  let date = new Date(day);
  if (date.getDay() == 0 || date.getDay() == 6) return true;
  else return false;
}
checkWeekend(day); // true
checkWeekend("2021-02-25"); // false

// 8. Viết 

// 11. Viết hàm trả về chuỗi ngày tháng hiện tại có dạng "10:01:30 CN 20/01/2020"
let changeFormatToday = () => {
  let today = new Date(),
    dayOfWeek;
    switch (today.getDay()) {
      case 0:
        dayOfWeek = "CN";
        break;
      case 1:
        dayOfWeek = "T2";
        break;
      case 2:
        dayOfWeek = "T3";
        break;
      case 3:
        dayOfWeek = "T4";
        break;
      case 4:
        dayOfWeek = "T5";
        break;
      case 5:
        dayOfWeek = "T6";
        break;
      case 6:
        dayOfWeek = "T7";
        break;
      default:
        dayOfWeek = "CN";
        break;
    }
  return `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()} ${dayOfWeek} ${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
}
changeFormatToday();

// 13. Viết hàm trả về ngày sau ngày hiện tại n ngày
let returnNumberDay = (n) => {
  let today = new Date(),
    day = new Date();
  day.setDate(new Date().getDate() + n);
  return day;
}
returnNumberDay(35); 

// 14. Viết hàm trả về số giờ chênh lệch giữa 2 ngày
let day1 = "2021-02-28",
  day2 = "2020-12-18";
let diffDay = (day1, day2) => {
  day1 = new Date(day1);
  day2 = new Date(day2);
  let diff = Math.abs(day1.getTime() - day2.getTime());
  return parseInt(diff/(1000*3600));
}
diffDay(day1, day2); // 1728 giờ ~ 72 ngày

// 15. Viết hàm trả về ngày đầu tuần
let getFirstDayOfWeek = () => {
  let today = new Date(),
    monday = new Date();
  switch (today.getDay()) {
    case 0:
      monday.setDate(today.getDate() - 6);
      break;
    case 1:
      monday.setDate(today.getDate());
      break;
    case 2:
      monday.setDate(today.getDate() - 1);
      break;
    case 3:
      monday.setDate(today.getDate() - 2);
      break;
    case 4:
      monday.setDate(today.getDate() - 3);
      break;
    case 5:
      monday.setDate(today.getDate() - 4);
      break;
    case 6:
      monday.setDate(today.getDate() - 5);
      break;
    default:
      monday.setDate(today.getDate());
      break;
  }
  return monday;
}
getFirstDayOfWeek();