export const ITEMS_PER_PAGE = 10;

export default function xhr({ method, url, responseType, contentType, body }) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    let result = {};

    request.responseType = responseType;

    request.open(method, url);
    request.setRequestHeader("Content-Type", contentType);
    request.send(body);

    request.onerror = () => reject("Can not send the request");

    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        result.data = request.response;
        result.headers = {};
        request
          .getAllResponseHeaders()
          .split("\r\n")
          .forEach((header) => {
            let [key, value] = header.split(": ");
            result.headers[key] = value;
          });
        resolve(result);
      } else {
        reject("Can not response results");
      }
    };
  });
}

export function checkPostsPerPage(userId = null) {
  let url = new URL(window.location.href);
  let limit = url.searchParams.get("limit") || ITEMS_PER_PAGE;

  let select = document.getElementById("posts-per-page");
  select.value = limit;

  select.onchange = function (e) {
    e.preventDefault();
    url.searchParams.set("limit", select.value);
    if (userId != null) url.searchParams.set("userId", userId);
    window.location.href = url;
  };
}

export function createPost(post, user, index) {
  let html = `
        <div class="col-12 post mb-5">
            <div class="row"> 
    `;
  if (index % 2 == 0) {
    html += postThumbnail(post) + postContent(post, user);
  } else {
    html += postContent(post, user) + postThumbnail(post);
  }
  html += `
            </div>
        </div>
    `;
  return html;
}

function postThumbnail(post) {
  return `
        <div class="col-md-6">
            <div class="item-image m-0 position-relative">
                <img src="${post.thumbnail}" alt="${post.title}" />
            </div>
        </div>
    `;
}

function postContent(post, user) {
  return `
        <div class="col-md-6 post-content">
          <div class="post-title text-uppercase">
            <h4><a href="post.html?id=${post.id}" target="_blank">${post.title}</a></h4>
          </div>
          <ul class="post-info">
            <li class="createdby mr-3">Written by <a href="postsbyuser.html?userId=${user.id}">${user.name}</a></li>
            <li class="published mr-3">Published: ${post.created}</li>
          </ul>
          <p>${post.description}</p>
        </div>
    `;
}

export function createSinglePostContent(post, user) {
  return `
    <div class="item-image pb-5">
        <img src="${post.details[0].cover}" alt="${post.title}" />
    </div>
    <div class="post-title text-uppercase">
        <h4>${post.title}</h4>
    </div>
    <ul class="post-info">
    <li class="createdby mr-3">Written by <a href="postsbyuser.html?userId=${user.id}">${user.name}</a></li>
        <li class="published mr-3">Published: ${post.created}</li>
    </ul>
    <p>${post.details[0].body}</p>
    `;
}

export function createPagination(total, current, link) {
  let html = `
        <li class="page-item ${current == 1 ? " disabled" : ""}">
            <a class="page-link"  href="${
              current != 1 ? link + 1 : ""
            }" title="First"><<</a>
        </li>
    `;
  if (current > 2) {
    html += `
    <li class="page-item">
        <a class="page-link"  href="${
          current != 1 ? link + (current - 1) : ""
        }" title="Previous"><</a>
    </li>
        `;
  }
  for (let i = 2; i < total; i++) {
    if (i > current - 3 && i < current + 3) {
      html += `
        <li class="page-item ${current == i ? " active" : ""}">
            <a class="page-link"  href="${
              current != i ? link + i : ""
            }" title="Page ${i}">${i}</a>
        </li>
          `;
    }
  }
  if (current < total - 1) {
    html += `
        <li class="page-item">
            <a class="page-link"  href="${
              current != 1 ? link + (current + 1) : ""
            }" title="Next">></a>
        </li>
            `;
  }
  html += `
        <li class="page-item ${current == total ? " disabled" : ""}">
            <a class="page-link"  href="${
              current != total ? link + total : ""
            }" title="Last">>></a>
        </li>
    `;
  return html;
}

document.forms.search.addEventListener("submit", function (e) {
  e.preventDefault();
  let value = document.forms.search.key.value.trim();
  value = value.replace(/  +/g, " ");

  let url = new URL(window.location.href);
  url = new URL(url.origin);
  url.pathname = "/search.html";
  url.searchParams.set("key", value);
  window.location.href = url.href;
});
