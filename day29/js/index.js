import getJson, {
  loadOverlay,
  getPostUser,
  createPost,
  createPagination,
} from "./method.js";

const post_per_page = 10;
const total_page = 10;
const listPosts = document.querySelector(".posts-list");
const pagination = document.querySelector(".pagination");

const loading = loadOverlay();
listPosts.appendChild(loading);

let url = new URL(window.location.href);
let page =
  url.searchParams.get("page") != null ? url.searchParams.get("page") : 1;

let postsUrl = new URL("https://jsonplaceholder.typicode.com/posts");
// console.log(postsUrl.searchParams);
postsUrl.searchParams.set("_limit", post_per_page);
postsUrl.searchParams.set("_page", page);

let userUrl = "https://jsonplaceholder.typicode.com/users";

let request = Promise.all([
  getJson({
    method: "GET",
    url: postsUrl,
  }),
  getJson({
    method: "GET",
    url: userUrl,
  }),
]);

request.then((data) => {
  let [posts, users] = data;

  loading.remove();
  //   let total_page = Math.ceil(posts.length / post_per_page);
  pagination.insertAdjacentHTML(
    "beforeend",
    createPagination(total_page, page)
  );
  posts.forEach((post) => {
    let user = getPostUser(users, post.userId);

    listPosts.insertAdjacentHTML("beforeend", createPost(post, user));
  });
});
