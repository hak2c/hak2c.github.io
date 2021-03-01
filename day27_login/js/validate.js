export function textInputValidation(selector, flag) {
  let input = document.getElementById(selector),
    inputContent = input.value;
  if (inputContent != "") {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    flag = false;
  }
  return flag;
}
export function emailValidation(selector, flag, userList) {
  let email = document.getElementById(selector),
    emailContent = email.value;
  if (
    emailContent.indexOf("@") > -1 &&
    emailContent.indexOf("@") < emailContent.length - 1
  ) {
    flag = checkValidUser(email, emailContent, userList, flag);
  } else {
    email.classList.add("is-valid");
    email.classList.remove("is-invalid");
    document.querySelector(".invalid-user").style.display = "none";
    flag = false;
  }
  return flag;
}

function checkValidUser(email, emailContent, userList, flag) {
  if (userList.length == 0) {
    email.classList.add("is-valid");
    email.classList.remove("is-invalid");
  } else {
    let arr = userList.filter((i) => i.email === emailContent);
    if (arr.length > 0) {
      email.classList.remove("is-valid");
      email.classList.add("is-invalid");
      document.querySelector(".invalid-user").style.display = "block";
      flag = false;
    } else {
      email.classList.add("is-valid");
      email.classList.remove("is-invalid");
      document.querySelector(".invalid-user").style.display = "none";
    }
  }
  return flag;
}

export function passwordValidation(selector, flag) {
  let password = document.getElementById(selector),
    passwordContent = password.value;
  if (passwordContent.length < 8) {
    password.classList.remove("is-valid");
    password.classList.add("is-invalid");
    flag = false;
  } else {
    password.classList.add("is-valid");
    password.classList.remove("is-invalid");
  }
  return flag;
}

export function checkMatchPassword(selector1, selector2, flag) {
  let password1 = document.getElementById(selector1),
    password2 = document.getElementById(selector2);
  if (password1.value === password2.value) {
    password2.classList.add("is-valid");
    password2.classList.remove("is-invalid");
  } else {
    password2.classList.remove("is-valid");
    password2.classList.add("is-invalid");
    flag = false;
  }
  return flag;
}

export function checkboxValidation(selector, flag) {
  let checkbox = document.getElementById(selector);
  if (checkbox.checked) {
    checkbox.classList.remove("is-invalid");
  } else {
    checkbox.classList.add("is-invalid");
    flag = false;
  }
  return flag;
}
