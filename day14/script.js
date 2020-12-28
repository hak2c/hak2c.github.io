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
    result[j] = str.slice(i, i + len);
  }
  return result;
};
cutStringToArray("Hello", 2);

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
