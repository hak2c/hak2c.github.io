let storageKey = "otbamboo";
export function checkLoggedUser() {
  let loggedUser = localStorage.getItem(storageKey + "-logged");
  if (loggedUser == null) {
    localStorage.setItem(storageKey + "-logged", "");
    loggedUser = "";
  }
  return loggedUser;
}

export function getUsersList() {
  let userList = localStorage.getItem(storageKey + "-users");
  if (userList == null || userList == "") {
    userList = "[]";
    localStorage.setItem(storageKey + "-users", "[]");
  }
  return JSON.parse(userList);
}

export function setUsersList(user) {
  let userList = getUsersList();
  userList.push(user);
  localStorage.setItem(storageKey + "-users", JSON.stringify(userList));
}

export function setLoggedUser(name) {
  localStorage.setItem(storageKey + "-logged", name);
}

export function checkRegisteredEmail(selector, flag, userList) {
  let email = document.getElementById(selector),
    emailContent = email.value;
  if (emailContent != "") {
    let arr = userList.filter((i) => i.email === emailContent);
    if (arr.length == 0) {
      email.classList.remove("is-valid");
      email.classList.add("is-invalid");
      document.querySelector(".invalid-user").style.display = "block";
      flag = false;
    } else {
      email.classList.add("is-valid");
      email.classList.remove("is-invalid");
      document.querySelector(".invalid-user").style.display = "none";
    }
  } else {
    email.classList.remove("is-valid");
    email.classList.add("is-invalid");
    document.querySelector(".invalid-user").style.display = "none";
    flag = false;
  }
  return flag;
}

export function checkRegisteredPassword(selector1, selector2, flag, userList) {
  let email = document.getElementById(selector1),
    emailContent = email.value,
    password = document.getElementById(selector2),
    passwordContent = password.value;
  if (passwordContent != "") {
    let arr = userList.filter(
      (i) => i.email === emailContent && i.password === passwordContent
    );
    if (arr.length == 0) {
      password.classList.remove("is-valid");
      password.classList.add("is-invalid");
      document.querySelector(".invalid-password").style.display = "block";
      flag = false;
    } else {
      password.classList.add("is-valid");
      password.classList.remove("is-invalid");
      document.querySelector(".invalid-password").style.display = "none";
    }
  } else {
    password.classList.remove("is-valid");
    password.classList.add("is-invalid");
    document.querySelector(".invalid-password").style.display = "none";
    flag = false;
  }
  return flag;
}

export function redirectLink(pageName) {
  let url = document.location.pathname.split("/");
  url[url.length - 1] = pageName;
  window.location = document.location.origin + url.join("/");
}
