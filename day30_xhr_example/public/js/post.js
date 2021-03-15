import xhr, { createSinglePostContent } from "./common.js";

let postContent = document.querySelector(".post-content");
let commentsContent = document.querySelector(".post-comments");
let breadcrumb = document.getElementById("breadcrumb-title");

let url = new URL(window.location.href);
let postId = Number(url.searchParams.get("id"));

xhr({
  method: "GET",
  url: `/posts/${postId}?_embed=details&_embed=comments&_expand=user`,
  responseType: "json",
  contentType: "application/json",
  body: null,
}).then((result) => {
  breadcrumb.innerHTML = result.data.title;
  postContent.insertAdjacentHTML(
    "beforeend",
    createSinglePostContent(result.data, result.data.user)
  );
  commentsContent.innerHTML = `
    <h2 class="text-uppercase font-weight-bold">Comments</h2>
    <hr />`;
  result.data.comments.forEach((comment) => {
    commentsContent.insertAdjacentHTML(
      "beforeend",
      createCommentsList(comment)
    );
  });
});

const form = document.getElementById("comment-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let name = document.getElementById("name").value.trim();
  let content = document.getElementById("message").value.trim();
  if (name != "" && content != "") {
    xhr({
      method: "POST",
      url: `/comments`,
      responseType: "json",
      contentType: "application/json",
      body: JSON.stringify({ name, content, postId }),
    }).then((result) => {
      commentsContent.insertAdjacentHTML(
        "beforeend",
        createCommentsList(result.data)
      );
      document.getElementById("name").value = "";
      document.getElementById("message").value = "";
    });
  }
});

function createCommentsList(comment) {
  return `
    <div class="comment">
        <h4 class="comment-name">${comment.name}</h4>
        <p class="comment-body">${comment.content}</p>
    </div>
  `;
}
