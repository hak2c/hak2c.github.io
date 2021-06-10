import { DEFAULT_SORT_VALUE } from "./common.js";
let renderPostsList = () => {
  fetch("/blogs").then((response) => {
    response.json().then((data) => {
      data.forEach((post) => {
        console.log(post);
        $(".blogs-list").append(renderPostHtml(post));
      });
    });
  });
};

let renderPostHtml = (post) =>
  `<div class="col-md-4 blog-item">
    <img
      class="blog-image w-100"
      src="${post.image}"
      alt="${post.title}"
    />
    <div class="blog-info mt-5">
      <h3 class="blog-title"><a href="post.html?id=${post.id}">${post.title}</a></h3>
      <p class="introtext mb-4">${post.introtext}</p>
      <ul class="item-tags">
        <li><a href="#">${post.tag}</a></li>
      </ul>
    </div>
  </div>`;
renderPostsList();
