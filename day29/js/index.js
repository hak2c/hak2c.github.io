import getJson, {
  loadOverlay,
  getPostUser,
  createPost,
  createPagination,
  getTotalPage
} from "./method.js";

const listPosts = document.querySelector(".posts-list");
const pagination = document.querySelector(".pagination");
let postsUrl = new URL("https://jsonplaceholder.typicode.com/posts");
let userUrl = "https://jsonplaceholder.typicode.com/users";
let url = new URL(window.location.href);
let page = url.searchParams.get("page") != null ? url.searchParams.get("page") : 1;
const post_per_page = 10;


async function getListPosts() {
  const loading = loadOverlay();
  listPosts.appendChild(loading);
  let total_page = await getTotalPage("GET", postsUrl, post_per_page);
  if (total_page != null && total_page > 0) {
    pagination.insertAdjacentHTML(
      "beforeend",
      createPagination(total_page, page)
    );
    loading.remove();
    
    postsUrl.searchParams.set("_limit", post_per_page);
    postsUrl.searchParams.set("_page", page);

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
      posts.forEach((post) => {
        let user = getPostUser(users, post.userId);
    
        listPosts.insertAdjacentHTML("beforeend", createPost(post, user));
      });
    });
  } else {
    loading.remove();
    listPosts.textContent = "No post."
  }
}

getListPosts();