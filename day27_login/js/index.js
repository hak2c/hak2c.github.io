import { checkLoggedUser, setLoggedUser, redirectLink } from "./users.js";

// Get users' information from local storage
let loggedUser = checkLoggedUser(),
  logged = loggedUser == "" ? false : true,
  greeting = document.querySelector(".greeting");
if (logged) {
  greeting.innerHTML = `<p>Welcome back ${loggedUser}</p>
    <p><button id="logoutButton">Log out</button></p>`;
  document
    .getElementById("logoutButton")
    .addEventListener("click", function (e) {
      e.preventDefault();
      setLoggedUser("");
      location.reload();
    });
} else {
  greeting.innerHTML = `<p>You are not logged in</p>
    <p><button id="loginButton">Log in</button>&nbsp;or&nbsp;<button id="signupButton">Sign up</button></p>`;
  document
    .getElementById("loginButton")
    .addEventListener("click", function (e) {
      e.preventDefault();
      redirectLink("login.html");
    });
  document
    .getElementById("signupButton")
    .addEventListener("click", function (e) {
      e.preventDefault();
      redirectLink("signup.html");
    });
}
