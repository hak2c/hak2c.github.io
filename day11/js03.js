// TÍnh giai thừa của n
let giaithua = (n) => (n == 0 || n == 1 ? 1 : giaithua(n - 1) * n);

let gt = function (n) {
  return n == 0 || n == 1 ? 1 : n * gt(n - 1);
};

// Kiểm tra a có phải lũy thừa của b hay ko
let luythua = (a, b) => {
  if (a == b) {
    return true;
  } else if (a == 1 || b == 1) {
    return false;
  } else {
    if (a < b) {
      let temp = a;
      a = b;
      b = a;
    }
    while (a < b) {
      a /= b;
    }
    return a == 1 ? true : false;
  }
};

// Số nguyên tố
let isPrime = (n) => {
  if (n < 2) {
    return false;
  } else {
    for (let i = 2; i <= n / 2; i++) {
      if (n % i == 0) {
        return false;
      }
    }
    return true;
  }
};

// Check số perfect
let isPerfect = (n) => {
    
}
