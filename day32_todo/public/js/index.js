const STATUS_OF_JOBS = "all";
const SORT_JOB_DATE = "desc";

let doing = document.getElementById("doing-list");
let completed = document.getElementById("completed-list");
let jobsList = document.getElementById("todo-list");
let url = new URL(document.location.href);
let status = url.searchParams.get("status") || STATUS_OF_JOBS;
let dateSort = url.searchParams.get("sort") || SORT_JOB_DATE;

checkJobsStatusFilter();
checkJobsDateFilter();

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
    // doing.insertAdjacentHTML("beforeend", renderJobDetail(job));
    jobsList.insertAdjacentHTML("beforeend", renderJobDetail(job));
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
    // jobsList = data;
    /*data.forEach((a) => {
      console.log(Date.now(a.created));
      console.log(a.created);
    });

    /*if (dateSort == "desc") {
      data
        .sort((a, b) => Date.now(b.created) - Date.now(a.created))
        .forEach((job) => {
          jobsList.insertAdjacentHTML("beforeend", renderJobDetail(job));
        });
    } else {
      data
        .sort((a, b) => Date.now(a.created) - Date.now(b.created))
        .forEach((job) => {
          jobsList.insertAdjacentHTML("beforeend", renderJobDetail(job));
        });
    }*/
    if (dateSort == "desc") {
      data.sort().forEach((job) => {
        jobsList.insertAdjacentHTML("beforeend", renderJobDetail(job));
      });
    } else {
      data
        .sort()
        .reverse()
        .forEach((job) => {
          jobsList.insertAdjacentHTML("beforeend", renderJobDetail(job));
        });
    }
    /*data.forEach((job) => {
      if (job.status)
        completed.insertAdjacentHTML("beforeend", renderJobDetail(job));
      else doing.insertAdjacentHTML("beforeend", renderJobDetail(job));
      jobsList.insertAdjacentHTML("beforeend", renderJobDetail(job));
    });*/
  });
}

function statusCheckbox(el) {
  let id = el.dataset.id;
  let job = el.closest(".job-details");
  let title = document.getElementById("title-" + id).value;
  let newStatus = el.checked == true ? true : false;
  let created = job.dataset.created;
  xhr({
    method: "PUT",
    url: `/todos/${id}`,
    responseType: "json",
    contentType: "application/json",
    body: JSON.stringify({ title, status: newStatus, created }),
  }).then((job) => {
    el.checked = newStatus;
  });
}

function editJobTitle(el) {
  let id = el.dataset.id;
  let job = el.closest(".job-details");
  let title = document.getElementById("title-" + id).value;
  let status = document.getElementById("status-" + id).checked;
  let created = job.dataset.created;
  xhr({
    method: "PUT",
    url: `/todos/${id}`,
    responseType: "json",
    contentType: "application/json",
    body: JSON.stringify({ title, status, created }),
  }).then((job) => {});
}

function deleteJob(el, id) {
  let job = el.closest(".job-details");
  xhr({
    method: "DELETE",
    url: `/todos/${id}`,
    responseType: "json",
    contentType: "application/json",
    body: null,
  }).then((data) => {
    job.remove();
  });
}

function xhr({ method, url, responseType, contentType, body }) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.responseType = responseType;
    request.open(method, url);
    request.setRequestHeader("Content-Type", contentType);
    request.send(body);

    request.onerror = () => reject("Can not send the request");

    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        resolve(request.response);
      } else {
        reject("Can not response results");
      }
    };
  });
}

function checkJobsStatusFilter() {
  let url = new URL(window.location.href);
  let status = url.searchParams.get("status") || STATUS_OF_JOBS;

  let filter = document.getElementById("filter-jobs-status");
  filter.value = status;

  filter.onchange = function (e) {
    e.preventDefault();
    url.searchParams.set("status", filter.value);
    window.location.href = url;
  };
}

function checkJobsDateFilter() {
  let url = new URL(window.location.href);
  let sort = url.searchParams.get("sort") || SORT_JOB_DATE;

  let filter = document.getElementById("filter-jobs-date");
  filter.value = sort;

  filter.onchange = function (e) {
    e.preventDefault();
    url.searchParams.set("sort", filter.value);
    window.location.href = url;
  };
}

function renderJobDetail(job) {
  return `
    <div class="job-details d-flex align-items center" data-created="${
      job.created
    }">
        <div class="input-group mb-3">
            <div class="input-group-text">
                <input
                    class="form-check-input mt-0"
                    type="checkbox"
                    data-id="${job.id}"
                    id="status-${job.id}"
                    ${job.status == true ? "checked" : ""}
                    onchange="statusCheckbox(this)"
                />
            </div>
            <input type="text" id="title-${
              job.id
            }" class="form-control" value="${job.title}" />
            <button class="btn btn-outline-secondary edit" onclick="editJobTitle(this)" data-id="${
              job.id
            }">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pen"
                viewBox="0 0 16 16"
                >
                <path
                    d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
                />
                </svg>
            </button>
            <button class="btn btn-outline-danger delete" onclick="deleteJob(this,${
              job.id
            })">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash"
                viewBox="0 0 16 16"
                >
                <path
                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                />
                <path
                    fill-rule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
                </svg>
            </button>
            </div>
        </div>    
    `;
}
