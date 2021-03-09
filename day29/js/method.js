export const ITEMS_PER_PAGE = 10;
export default function (options) {
  const { method, url } = options;
  let result = {};

  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open(method, url);
    xhr.send();
    xhr.onload = () => {
      if (xhr.status == 200) {
        result.posts = xhr.response;
        result.headers = xhr
          .getAllResponseHeaders()
          .split("\r\n")
          .reduce((obj, item) => {
            let [key, value] = item.split(": ");
            obj[key] = value;
            return obj;
          }, {});
        resolve(result);
      } else {
        reject(xhr.status + ":" + xhr.statusText);
      }
    };
    xhr.onerror = () => reject("Something happen!");
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
          <li class="createdby">Written by <a href="postsbyuser.html?id=${user.id}">${user.name}</a></li>
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

export function createPagination(total, current, link) {
  let frag = document.createDocumentFragment();
  if (total > 1) {
    for (let i = 1; i <= total; i++) {
      if (i == 1 || i == total || (i > current - 2 && i < current + 2)) {
        let li = document.createElement("li");
        li.classList.add("page-item");
        let a = document.createElement("a");
        a.classList.add("page-link");

        if (i != current) {
          a.href = link + i;
        } else {
          if (i == 1 || i == total) li.classList.add("disabled");
          else li.classList.add("active");
        }
        a.textContent = i == 1 ? "First" : i == total ? "Last" : i;

        li.appendChild(a);
        frag.appendChild(li);
      }
    }
  }
  return frag;
}

export function loadOverlay() {
  let div = document.createElement("div");
  div.id = "spinner";
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
