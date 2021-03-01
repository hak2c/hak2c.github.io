import * as validate from "./validate.js";
import {
  getUsersList,
  checkRegisteredEmail,
  setLoggedUser,
  checkRegisteredPassword,
  redirectLink,
} from "./users.js";

let userList = getUsersList();
const form = document.getElementById("login-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let flag = true;
  flag = checkRegisteredEmail("email", flag, userList); // Check registered email
  flag = checkRegisteredPassword("email", "password", flag, userList); // Check registered password
  flag = validate.checkboxValidation("agree", flag);
  if (flag) {
    let arr = userList.filter(
      (i) =>
        i.email === document.getElementById("email").value &&
        i.password === document.getElementById("password").value
    );
    setLoggedUser(arr[0].name);
    redirectLink("index.html");
  }
});
