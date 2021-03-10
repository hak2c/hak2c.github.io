import xhr, {
  checkPostsPerPage,
  ITEMS_PER_PAGE,
  createPost,
  createPagination,
} from "./common.js";

checkPostsPerPage();

let postsContent = document.querySelector(".posts-list");
let pagination = document.querySelector(".pagination");

let url = new URL(document.location.href);
let limit = url.searchParams.get("limit") || ITEMS_PER_PAGE;
let page = Number(url.searchParams.get("page")) || 1;

xhr({
  method: "GET",
  url: `/posts?_limit=${limit}&_page=${page}&_expand=user`,
  responseType: "json",
  contentType: "application/json",
  body: null,
}).then((result) => {
  let { data, headers } = result;
  let total = Math.ceil(Number(headers["x-total-count"]) / limit);
  data.forEach((post, index) => {
    postsContent.insertAdjacentHTML(
      "beforeend",
      createPost(post, post.user, index)
    );
  });

  if (total > 1) {
    pagination.insertAdjacentHTML(
      "beforeend",
      createPagination(total, page, `?limit=${limit}&page=`)
    );
  }
});
