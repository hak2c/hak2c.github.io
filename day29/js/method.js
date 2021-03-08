export default function (options) {
  const { method, url } = options;

  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open(method, url);
    xhr.send();
    xhr.onload = () => {
      if (xhr.status == 200) {
        resolve(xhr.response);
      } else {
        reject(xhr.status + ":" + xhr.statusText);
      }
    };
    xhr.onerror = () => reject("Something happen!");
  });
}

export function getTotalPage(method, url, limit) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open(method, url);
    xhr.send();
    xhr.onload = () => {
      if (xhr.status == 200) {
        resolve(Math.ceil(xhr.response.length / limit));
      } else {
        reject(null);
      }
    };
    xhr.onerror = () => reject(null);
  });
}

export function createPost(post, user) {
  return `
    <div class="post">
      <div class="post-content">
        <div class="post-title text-uppercase">
          <h4><a href="post.html?id=${post.id}" target="_blank">${post.title}</a></h4>
        </div>
        <ul class="post-info">
          <li class="createdby">Written by ${user.name}</li>
        </ul>
        <p>${post.body}</p>
      </div>
    </div>
  `;
}

export function renderSinglePostContent(post, user) {
  return `
  <div class="post-title text-uppercase">
      <h4>${post.title}</h4>
    </div>
    <ul class="post-info">
      <li class="createdby">Written by ${user.name}</li>
    </ul>
    <p>${post.body}</p>
  `;
}

export function createCommentsList(comment) {
  return `
        <div class="comment">
            <h4 class="comment-name">${comment.name}</h4>
            <p class="comment-email">${comment.email}</p>
            <p class="comment-body">${comment.body}</p>
        </div>
      `;
}

export function createPagination(total, current) {
  let html = "";
  for (let i = 1; i <= total; i++) {
    let active = i == current ? " active" : "";
    html += `<li class="page-item${active}"><a class="page-link" href="index.html?page=${i}">${i}</a></li>`;
  }
  return html;
}

export function loadOverlay() {
  let div = document.createElement("div");
  div.className = "loading";
  return div;
}

export function getPostUser(users, id) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      return users[i];
    }
  }
  return null;
}
