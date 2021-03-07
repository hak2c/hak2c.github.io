import getJson, {
  loadOverlay,
  getPostUser,
  renderSinglePostContent,
} from "./method.js";

const postContent = document.querySelector(".post-content");
const postComments = document.querySelector(".post-comments");
const breadcrumbText = document
  .querySelector(".ot-breadcrumb-heading")
  .getElementsByTagName("span")[0];

const loading = loadOverlay();
postContent.appendChild(loading);

let postUrl = new URL(window.location.href);
let postId =
  postUrl.searchParams.get("id") != null
    ? postUrl.searchParams.get("id")
    : null;

if (postId != null) {
  postUrl = "https://jsonplaceholder.typicode.com/posts/" + postId;
  let commentUrl = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;
  let userUrl = "https://jsonplaceholder.typicode.com/users";

  let request = Promise.all([
    getJson({
      method: "GET",
      url: postUrl,
    }),
    getJson({
      method: "GET",
      url: userUrl,
    }),
    getJson({
      method: "GET",
      url: commentUrl,
    }),
  ]);
  request.then((data) => {
    let [post, users, comments] = data;
    loading.remove();
    breadcrumbText.textContent = post.title;
    let user = getPostUser(users, post.userId);
    postContent.insertAdjacentHTML(
      "beforeend",
      renderSinglePostContent(post, user)
    );
  });
}
