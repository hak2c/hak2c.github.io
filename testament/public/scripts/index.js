import {
  includeHTML,
  renderCollectionsListHtml,
  renderNewArrivalsProductHtml,
} from "./common.js";
includeHTML();

getListCollections();
getNewArrivalProducts();

// fetch("/test.html")
//   .then((res) => res.text())
//   .then((html) => console.log(JSON.stringify(html)));

function getListCollections() {
  fetch("/collections").then(function (response) {
    response.json().then((data) => {
      data.forEach((collection) => {
        $(".top-collections .row").append(
          renderCollectionsListHtml(collection)
        );
      });
    });
  });
}

function getNewArrivalProducts() {
  fetch("/products?_limit=4&_sort=id&_order=desc").then(function (response) {
    response.json().then((data) => {
      data.forEach((product) => {
        $(".new-arrivals .row").append(renderNewArrivalsProductHtml(product));
      });
    });
  });
}
