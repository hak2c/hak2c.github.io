import Posts from "./posts.js";

// let listPosts = getData("GET", "https://jsonplaceholder.typicode.com/posts");
let postsContent = document.querySelector(".posts");

let listPosts = new Posts(
  "GET",
  "https://jsonplaceholder.typicode.com/posts",
  postsContent
);

listPosts.createPostList();
