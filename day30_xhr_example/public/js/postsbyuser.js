import xhr, {
  checkPostsPerPage,
  ITEMS_PER_PAGE,
  createPost,
  createPagination,
} from "./common.js";

checkPostsPerPage();

let postsContent = document.querySelector(".posts-list");
let pagination = document.querySelector(".pagination");
let breadcrumb = document.getElementById("breadcrumb-title");

let url = new URL(document.location.href);
let limit = url.searchParams.get("limit") || ITEMS_PER_PAGE;
let userId = url.searchParams.get("userId");
let page = Number(url.searchParams.get("page")) || 1;

checkPostsPerPage(userId);

xhr({
  method: "GET",
  url: `/users/${userId}?_embed=posts&_limit=${limit}&_page=${page}`,
  responseType: "json",
  contentType: "application/json",
  body: null,
}).then((result) => {
  let { data, headers } = result;
  let total = Math.ceil(Number(headers["x-total-count"]) / limit);
  breadcrumb.innerHTML = `Posts by: ${data.name}`;
  document.title = `Posts by: ${data.name}`;
  let posts = data.posts;
  posts.forEach((post, index) => {
    postsContent.insertAdjacentHTML("beforeend", createPost(post, data, index));
  });
  if (total > 1) {
    pagination.insertAdjacentHTML(
      "beforeend",
      createPagination(total, page, `?_embed=posts&_limit=${limit}&_page=`)
    );
  }
});
