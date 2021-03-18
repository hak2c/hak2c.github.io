import xhr, {
  renderJobDetail,
  checkJobsStatusFilter,
  STATUS_OF_JOBS,
} from "./common.js";

let doing = document.getElementById("doing-list");
let completed = document.getElementById("completed-list");
let jobsList = [];
let url = new URL(document.location.href);
let status = url.searchParams.get("status") || STATUS_OF_JOBS;

checkJobsStatusFilter();

getTodoList();

document.getElementById("add-job").addEventListener("submit", function (e) {
  e.preventDefault();
  let title = document.getElementById("job-title").value.trim();
  let status = false;
  let created = new Date().toLocaleString("vi");
  xhr({
    method: "POST",
    url: "/todos",
    responseType: "json",
    contentType: "application/json",
    body: JSON.stringify({ title, status, created }),
  }).then((job) => {
    doing.insertAdjacentHTML("beforeend", renderJobDetail(job));
    singJobActions();
  });
});

function getTodoList() {
  xhr({
    method: "GET",
    url: `/todos${
      status == "true"
        ? "?status=true"
        : status == "false"
        ? "?status=false"
        : ""
    }`,
    responseType: "json",
    contentType: "application/json",
    body: null,
  }).then((data) => {
    jobsList = data;
    jobsList.forEach((job) => {
      if (job.status)
        completed.insertAdjacentHTML("beforeend", renderJobDetail(job));
      else doing.insertAdjacentHTML("beforeend", renderJobDetail(job));
    });
    singJobActions();
  });
}

function singJobActions() {
  Array.from(document.getElementsByClassName("job-details")).forEach(
    (button) => {
      let id = button.id;
      let status = button.dataset.status;
      let title = document.getElementById(`title-${id}`).value;
      let created = button.dataset.created;
      status = status == "true" ? true : false;
      statusCheckbox(id, status, title, created);
      editJobTitle(id, status, created);
      deleteJob(id);
    }
  );
}

function statusCheckbox(id, status, title, created) {
  document
    .getElementById(`status-${id}`)
    .addEventListener("click", function (e) {
      e.preventDefault();
      let newStatus = status == true ? false : true;
      xhr({
        method: "PUT",
        url: `/todos/${id}`,
        responseType: "json",
        contentType: "application/json",
        body: JSON.stringify({ title, status: newStatus, created }),
      }).then((job) => {
        resetJobsList();
        singJobActions();
      });
    });
}

function editJobTitle(id, status, created) {
  document.getElementById(`edit-${id}`).addEventListener("click", function (e) {
    e.preventDefault();
    let newTitle = document.getElementById(`title-${id}`).value;
    xhr({
      method: "PUT",
      url: `/todos/${id}`,
      responseType: "json",
      contentType: "application/json",
      body: JSON.stringify({ title: newTitle, status, created }),
    }).then((job) => {
      resetJobsList();
      singJobActions();
    });
  });
}

function deleteJob(id) {
  document
    .getElementById(`delete-${id}`)
    .addEventListener("click", function (e) {
      e.preventDefault();
      xhr({
        method: "DELETE",
        url: `/todos/${id}`,
        responseType: "json",
        contentType: "application/json",
        body: null,
      }).then((data) => {
        resetJobsList();
        singJobActions();
      });
    });
}

function resetJobsList() {
  doing.textContent = "";
  completed.textContent = "";
  getTodoList();
}
