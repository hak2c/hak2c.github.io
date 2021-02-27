import * as validate from "./validate.js";

// Get users' information from local storage
let storageKey = "otbamboo",
  logged = false,
  loggedUser = localStorage.getItem(storageKey + "-logged"),
  userList = localStorage.getItem(storageKey + "-users");
if (loggedUser == null) {
  localStorage.setItem(storageKey + "-logged", "");
  loggedUser = false;
}

logged = loggedUser == "" ? false : true;

if (userList == null || userList == "") {
  userList = "[]";
  localStorage.setItem(storageKey + "-users", "[]");
}
var users = JSON.parse(userList);

const form = document.getElementById("login-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let flag = true;
  if (validate.emailValidation()) {
    validate.emailValid();
  } else {
    validate.emailInvalid();
    flag = false;
  }
  if (validate.passwordValidation()) {
    validate.passwordValid();
  } else {
    validate.passwordInvalid();
    flag = false;
  }
});
