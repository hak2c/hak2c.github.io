import { DEFAULT_SORT_VALUE } from "./common.js";

let url = new URL(window.location.href);
let key = url.searchParams.get("key");

let renderSearchResultsHtml = () => {
  fetch(`/products?title_like=${key}&_sort=id&_order=desc`).then((response) => {
    response.json().then((data) => {
      if (data.length > 0) {
        data.forEach((product) => {
          $(".search-results").append(renderProductHtml(product));
        });
      } else {
        $(".search-results").html(`
                <div class="col-12 text-center">
                    <p>Your search for "${key}" did not have any result</p>
                </div>
                <div class="col-lg-4 col-md-6 mt-5 mx-auto">
                    <form
                        name="search"
                        action="search.html"
                        class="search-form form-inline"
                    >
                        <div class="form-group" style="width: 100%">
                            <input
                                class="form-control"
                                id="search"
                                type="text"
                                placeholder="Search"
                                name="key"
                                style="width: 100%"
                            />
                        </div>
                    </form>
                </div>
            `);
      }
    });
  });
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
        <div class="product col-6 col-md-3 pb-5">
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

renderSearchResultsHtml();
