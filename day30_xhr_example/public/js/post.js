import xhr, { createSinglePostContent, createCommentsList } from "./common.js";

let postContent = document.querySelector(".post-content");
let commentsContent = document.querySelector(".post-comments");
let breadcrumb = document.getElementById("breadcrumb-title");

let url = new URL(window.location.href);
let postId = url.searchParams.get("id");

xhr({
  method: "GET",
  url: `/posts/${postId}?_embed=details&_embed=comments&_expand=user`,
  responseType: "json",
  contentType: "application/json",
  body: null,
}).then((result) => {
  let data = result.data;
  let comments = data.comments;
  breadcrumb.innerHTML = data.title;
  postContent.insertAdjacentHTML(
    "beforeend",
    createSinglePostContent(data, data.user)
  );
  commentsContent.innerHTML = `<h4 class="text-uppercase">Comments</h4>`;
  comments.forEach((comment) => {
    commentsContent.insertAdjacentHTML(
      "beforeend",
      createCommentsList(comment)
    );
  });
});
