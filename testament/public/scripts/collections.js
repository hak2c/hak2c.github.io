import {
  includeHTML,
  DEFAULT_SORT_VALUE,
  renderCollectionsListHtml,
  checkSortProductCondition,
} from "./common.js";
includeHTML();

checkSortProductCondition();

let url = new URL(window.location.href);
let sortCondition = url.searchParams.get("sort") || DEFAULT_SORT_VALUE,
  condition = "";
switch (sortCondition) {
  case "title-ascending":
    condition = "&_sort=title&_order=asc";
    break;
  case "title-descending":
    condition = "&_sort=title&_order=desc";
    break;
  case "price-ascending":
    condition = "&_sort=title&_order=asc";
    break;
  case "price-descending":
    condition = "&_sort=title&_order=desc";
    break;
  default:
    condition = "";
    break;
}

let collectionId = url.searchParams.get("id");

let renderCollectionPageHtml = (collectionId, condition) => {
  fetch("/collections?id=" + collectionId).then((response) => {
    response.json().then((data) => {
      let collection = data[0];
      $(".collection-image img").attr("src", collection.images[0]);
      $(".collection-second-image img").attr("src", collection.images[1]);
      $(".ot-breadcrumb .col-12").html(
        `<a href="index.html">Home</a> > ${collection.title}`
      );
      $(".page-title h3").text(collection.title);
      document.title = collection.title;
      getProductHtml(collectionId, condition);
    });
  });
};

let getProductHtml = (collectionId, condition) => {
  fetch("/products?collectionId=" + collectionId + condition).then(
    (response) => {
      response.json().then((products) => {
        products.forEach((product) => {
          $(".products-list").append(renderProductHtml(product));
        });
      });
    }
  );
};

let renderProductHtml = (product) => {
  let color = "";
  let soldOut = product.available
    ? ""
    : `<span class="icn sold-out-icn">Sold out</span>`;
  let price = "",
    sale = "";
  if (typeof product.compare_price != "undefined") {
    price = `<div class="product-price">
              <span class="price-item price-item--sale">$${product.price}</span>
              <span class="price-item price-item--compare">$${product.compare_price}</span>
            </div>`;
    sale = `<span class="icn sale-icn">Sale</span>`;
  } else {
    price = `<div class="product-price"><span class="price-item">$${product.price}</span></div>`;
  }
  if (typeof product.color != "undefined" && product.color.length > 0) {
    for (let i = 0; i < product.color.length; i++) {
      if (i == 0) color += getProductColorIcon(product.color[i], true);
      else color += getProductColorIcon(product.color[i]);
    }
  }
  return `
      <div class="product col-6 col-md-4 pb-5">
        <div class="product-content">
          ${soldOut}
          ${sale}
          <a href="/product.html?id=${product.id}">
            <img
                src="${product.images[0]}"
                alt="${product.title}"
            />
            </a>
          <div class="product-info text-center">
            <div class="product-title"><a href="/product.html?id=${product.id}">${product.title}</a></div>
            ${price}
            <div
              class="product-color pt-3 text-center d-flex justify-content-center align-items-center"
            >
              ${color}
            </div>
          </div>
        </div>
      </div>
    `;
};

let getProductColorIcon = (color, active = false) => {
  let checkActive =
    active == true
      ? "active d-flex justify-content-center align-items-center"
      : "";
  return `
      <span class="color-icn ${checkActive}">
        <span style="background-image: url(/${color.thumb});"></span>
      </span>
    `;
};

renderCollectionPageHtml(collectionId, condition);

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
