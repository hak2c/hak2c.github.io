import { STORAGE_KEY } from "./common.js";

let url = new URL(window.location.href);
let postId = url.searchParams.get("id");

let renderPostContentHtml = () => {
  fetch("/blogs?id=" + postId).then((response) => {
    response.json().then((data) => {
      let post = data[0];
      console.log(post);
      $(".ot-breadcrumb .col-12").html(
        `<a href="index.html">Home</a> > <a href="blogs.html">Blogs</a> > ${post.title}`
      );
      $(".page-title h3").text(post.title);
      document.title = post.title;
      $(".post-container").append(renderPostHtml(post));
    });
  });
};

let renderPostHtml = (post) =>
  ` <div class="post-image mb-4">
        <img
        class="w-100"
        src="${post.image}"
        alt="${post.title}"
        />
    </div>
    <div class="post-details mb-4 pb-4">
      ${post.content}
    </div>
    <p class="post-author">${post.author}</p>
    <p class="post-created">Post on ${post.created_at}</p>`;

renderPostContentHtml();
