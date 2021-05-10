import {
  includeHTML,
  renderCollectionsListHtml,
  renderNewArrivalsProductHtml,
  renderRecentPostHtml,
} from "./common.js";
includeHTML();

// fetch("/test.html")
//   .then((res) => res.text())
//   .then((html) => console.log(JSON.stringify(html)));

let getListCollections = () => {
  fetch("/collections").then(function (response) {
    response.json().then((data) => {
      data.forEach((collection) => {
        $(".top-collections .row").append(
          renderCollectionsListHtml(collection)
        );
      });
    });
  });
};

let getNewArrivalProducts = () => {
  fetch("/products?_limit=4&_sort=id&_order=desc").then(function (response) {
    response.json().then((data) => {
      data.forEach((product) => {
        $(".new-arrivals .row").append(renderNewArrivalsProductHtml(product));
      });
    });
  });
};

let getRecentBlogPosts = () => {
  fetch("/blogs?_limit=2&sort=id&_order=desc").then(function (response) {
    response.json().then((data) => {
      data.forEach((post) => {
        $(".latest-blogs .row").append(renderRecentPostHtml(post));
      });
    });
  });
};

getListCollections();
getNewArrivalProducts();
getRecentBlogPosts();
