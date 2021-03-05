function request(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.open(method, url);
  xhr.send();

  return new Promise((resolve, reject) => {
    xhr.onerror = () => "Something happen!";
    xhr.onload = () => {
      if (xhr.status == 200) {
        let data = JSON.parse(xhr.response);
        resolve(data);
      } else {
        reject("Error: ", xhr.status, " ", xhr.statusText);
      }
    };
  });
}

// normal
//request("GET", "https://jsonplaceholder.typicode.com/users", createUserList);

// Promise
request("GET", "https://jsonplaceholder.typicode.com/users").then((data) =>
  createUserList(data)
);
// "https://jsonplaceholder.typicode.com/users"
function createUser(user) {
  const div = document.createElement("div");
  div.innerHTML = `
        <h4>${user.name}</h4>
        <p>${user.email}</p>`;
  div.classList.add("user");
  return div;
}

function createUserList(users) {
  const res = document.getElementById("response");

  users.forEach((user) => {
    res.append(createUser(user));
  });
}
