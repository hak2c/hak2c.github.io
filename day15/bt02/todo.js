// Todolist
let todos = [
  { id: 1, title: "Coding", completed: false },
  { id: 2, title: "Xem bắn pháo hoa", completed: false },
  { id: 3, title: "Giao bài tập cho lớp FE12", completed: true },
  { id: 4, title: "Đòi nợ Thảo 10$", completed: false },
  { id: 5, title: "Dọn nhà", completed: true },
  // add more
];

// Từ todolist trên render ra trang HTML theo mẫu trong ảnh

function createCheckbox(id, title, checked = true) {
  let div = document.createElement("div");
  let input = document.createElement("input");
  input.type = "checkbox";
  input.name = id;
  input.id = id;
  if (checked) {
    input.disabled = true;
    input.checked = true;
  }
  input.addEventListener("click", handleCheckbox);
  div.append(input);
  let span = document.createElement("span");
  span.dataset.id = id;
  span.append(title);
  span.addEventListener("click", handleClickWork);
  div.append(span);
  return div;
}

function createTodoList() {
  complete.lastElementChild.innerHTML = "";
  doing.lastElementChild.innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].completed) {
      complete.lastElementChild.append(
        createCheckbox(todos[i].id, todos[i].title)
      );
    } else {
      doing.lastElementChild.append(
        createCheckbox(todos[i].id, todos[i].title, false)
      );
    }
  }
}

createTodoList();

add.addEventListener("click", handleClick);

listDoing = Array.from(doing.getElementsByTagName("input"));

function handleClick(e) {
  e.preventDefault();
  if (this.previousElementSibling.value != "") {
    todos.push({
      id: todos.length + 1,
      title: this.previousElementSibling.value,
      completed: false,
    });
    doing.lastElementChild.append(
      createCheckbox(todos.length, this.previousElementSibling.value, false)
    );
  } else {
    alert("You have not entered a job to do");
  }
}

function handleCheckbox(e) {
  e.preventDefault();
  todos.forEach((i) => {
    if (this.id == i.id) {
      i.completed = true;
    }
  });
  createTodoList();
}

function handleClickWork(e) {
  e.preventDefault();
  let work = todos.filter((i) => i.id == this.dataset.id)[0];
  let index = todos.indexOf(work);

  // Prompt
  let newTitle = prompt("Edit work", work.title);
  work.title = newTitle != "" && newTitle != null ? newTitle : work.title;
  todos[index] = work;
  createTodoList();
  //Popup
  // createPopup(work);
}

function createPopup(work) {
  let popup = document.createElement("div");
  popup.classList.add("popup");
  let html = `
    <div class="popup-content">
      <input type="text" value="${work.title}">
      <button type="submit">Submit</button>
    </div>
  `;
  popup.innerHTML = html;
  document.body.append(popup);
}
