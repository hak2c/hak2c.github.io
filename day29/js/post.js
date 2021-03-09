import getJson, {
  loadOverlay,
  renderSinglePostContent,
  createCommentsList,
} from "./method.js";

const postContent = document.querySelector(".post-content");
const postComments = document.querySelector(".post-comments");
let breadcrumb = document.getElementById("breadcrumb-title");

let postUrl = new URL(window.location.href);
let postId = postUrl.searchParams.get("id");

postUrl = new URL("https://jsonplaceholder.typicode.com/posts/" + postId);
postUrl.searchParams.set("_expand", "user");
postUrl.searchParams.set("_embed", "comments");

getPostContent();

function getPostContent() {
  const spinner = loadOverlay();
  postContent.appendChild(spinner);

  let request = getJson({
    method: "GET",
    url: postUrl,
  });

  request.then((result) => {
    let post = result.posts;
    spinner.remove();
    breadcrumb.textContent = post.title;
    postContent.insertAdjacentHTML(
      "beforeend",
      renderSinglePostContent(post, post.user)
    );
    post.comments.forEach((comment) => {
      postComments.insertAdjacentHTML("beforeend", createCommentsList(comment));
    });
  });
}
