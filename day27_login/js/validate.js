

const form = document.getElementById("login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");

export function emailValidation() {
  let emailCOntent = email.value;
  if (
    emailCOntent.indexOf("@") > -1 &&
    emailCOntent.indexOf("@") < emailCOntent.length - 1
  ) {
    return true;
  }
  return false;
}

export function emailValid() {
  email.classList.add("is-valid");
  email.classList.remove("is-invalid");
}
export function emailInvalid() {
  email.classList.remove("is-valid");
  email.classList.add("is-invalid");
}

export function passwordValidation() {
  let passwordContent = password.value;
  if (passwordContent.length < 8) {
    return false;
  }
  return true;
}

export function passwordValid() {
  password.classList.add("is-valid");
  password.classList.remove("is-invalid");
}
export function passwordInvalid() {
  password.classList.remove("is-valid");
  password.classList.add("is-invalid");
}
