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
let key = url.searchParams.get("key");
let page = Number(url.searchParams.get("page")) || 1;

checkPostsPerPage();

xhr({
  method: "GET",
  url: `/posts?title_like=${key}&_limit=${limit}&_page=${page}&_expand=user`,
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
      createPagination(
        total,
        page,
        `?title_like=${key}&_expand=user&_limit=${limit}&_page=`
      )
    );
  }
});
