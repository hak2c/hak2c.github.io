import * as validate from "./validate.js";
import {
  getUsersList,
  setUsersList,
  setLoggedUser,
  redirectLink,
} from "./users.js";

let userList = getUsersList();
const form = document.getElementById("signup-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let flag = true;
  flag = validate.textInputValidation("name", flag);
  flag = validate.emailValidation("email", flag, userList); // Validate email
  flag = validate.passwordValidation("password", flag); // Validate password
  flag = validate.checkMatchPassword("password", "password2", flag);
  flag = validate.checkboxValidation("agree", flag);
  if (flag) {
    let user = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    setUsersList(user);
    setLoggedUser(document.getElementById("name").value);
    redirectLink("index.html");
  }
});
