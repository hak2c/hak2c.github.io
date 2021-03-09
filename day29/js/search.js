import getJson, {
  ITEMS_PER_PAGE,
  loadOverlay,
  checkPostsPerPage,
  checkSearchInput,
  createPost,
  createPagination,
} from "./method.js";

const listPosts = document.querySelector(".posts-list");
const pagination = document.querySelector(".pagination");
let url = new URL(window.location.href);
let userId = url.searchParams.get("id");
let page = url.searchParams.get("page") || 1;
let textSearch = url.searchParams.get("s");
let posts_per_page = url.searchParams.get("limit") || ITEMS_PER_PAGE;

checkPostsPerPage();
checkSearchInput();

url = new URL("https://jsonplaceholder.typicode.com/posts/");
if (userId != null) url.searchParams.set("userId", userId);
url.searchParams.set("_expand", "user");
url.searchParams.set("_limit", posts_per_page);
url.searchParams.set("_page", page);
url.searchParams.set("q", textSearch); // Search full text

getListPosts();

function getListPosts() {
  const spinner = loadOverlay();
  listPosts.appendChild(spinner);

  let request = getJson({
    method: "GET",
    url: url,
  });

  request.then((data) => {
    let { posts, headers } = data;
    let total_page = Math.ceil(
      Number(headers["x-total-count"]) / posts_per_page
    );
    spinner.remove();
    if (total_page > 0) {
      posts.forEach((post) => {
        listPosts.insertAdjacentHTML("beforeend", createPost(post, post.user));
      });
      pagination.appendChild(
        createPagination(
          total_page,
          page,
          `?id=${userId}&limit=${posts_per_page}&page=`
        )
      );
    } else {
      listPosts.textContent = "No posts found.";
    }
  });
}
