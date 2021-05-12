import {
  includeHTML,
  Collections,
  renderCollectionsListHtml,
} from "./common.js";
includeHTML();

let collection = new Collections();

// fetch("/test.html")
//   .then((res) => res.text())
//   .then((html) => console.log(JSON.stringify(html)));

let getListCollections = () => {
  fetch("/collections").then((response) => {
    response.json().then((data) => {
      data.forEach((collection) => {
        $(".list-collections .row").append(
          renderCollectionsListHtml(collection)
        );
      });
    });
  });
};

getListCollections();
/*  let getNewArrivalProducts = () => {
    fetch("/products?_limit=4&_sort=id&_order=desc").then((response) => {
      response.json().then((data) => {
        data.forEach((product) => {
          $(".new-arrivals .row").append(renderNewArrivalsProductHtml(product));
        });
      });
    });
  };
  
  let getRecentBlogPosts = () => {
    fetch("/blogs?_limit=2&sort=id&_order=desc").then((response) => {
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
  */
