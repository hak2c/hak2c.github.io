export const DEFAULT_SORT_VALUE = "featured";

export const STORAGE_KEY = "testament_quote";

export const CART_KEY = "testament_cart";

let includeHTML = () => {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
};
includeHTML();

export let checkProductsInCart = () => {
  let productsInCart = localStorage.getItem(CART_KEY);
  if (productsInCart == null || productsInCart == "") {
    localStorage.setItem(CART_KEY, "[]");
    productsInCart = "[]";
  }
  productsInCart = JSON.parse(productsInCart);
  $("span.cart .cart-count").text(productsInCart.length);
};

checkProductsInCart();

export let createSuccessAddedProductToCart = () => {
  $(".raq-popup-content").html("").append(`
    <div class="raq-message">Add product to cart successfully!</div>
    <div class="raq-action-button d-flex justify-content-center">
      <a class="raq-continue-shopping">Continue Shopping</a>
    </div>
  `);
  quotePopupOpenScripts();
};

/* QUOTE SCRIPTS */

$("body").append(
  `<div class="raq-overlay">
    <div class="raq-bg"></div>
    <div class="raq-popup">
      <span class="close-raq-popup"></span>
      <div class="raq-popup-content"></div>
    </div>
  </div>`
);

let checkExistQuoteList = () => {
  let productsList = localStorage.getItem(STORAGE_KEY);
  if (productsList == null || productsList == "") {
    localStorage.setItem(STORAGE_KEY, "[]");
    productsList = "[]";
  }
  productsList = JSON.parse(productsList);
  if ($(".view_quote").length > 0) $(".view_quote").remove();
  if (productsList.length > 0) {
    createViewQuoteButton();
  }
};

export let createViewQuoteButton = () => {
  $("body").append(
    `<div class="action-button"><a class="view_quote" href="javascript:void(0)">View quote</a></div>`
  );
  $(".view_quote").on("click", function () {
    getQuotePopupContent();
  });
};

checkExistQuoteList();

export let createSuccessAddedProductToQuote = () => {
  $(".raq-popup-content").html("").append(`
    <div class="raq-message">Add product to quote successfully!</div>
    <div class="raq-action-button d-flex justify-content-center">
      <a class="raq-continue-shopping">Continue Shopping</a>
      <a class="raq-dialog-view">View Quote</a>
    </div>
  `);
  quotePopupOpenScripts();
};

let quotePopupOpenScripts = () => {
  $(".raq-overlay").fadeIn("slow");
  $(".close-raq-popup, .raq-continue-shopping").on("click", function () {
    $(".raq-overlay").fadeOut("slow");
  });
  $(".raq-dialog-view").on("click", function () {
    getQuotePopupContent();
  });
};

let getQuotePopupContent = () => {
  $(".raq-popup-content").html(`
    <div class="raq-quote-list">
      <div class="raq-quote-list-content"></div>
    </div>
  `);
  $(".raq-overlay").fadeIn("slow");
  let productsList = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (productsList.length > 0) {
    genQuoteListViewForm(productsList);
  } else {
    emptyQuoteListContent();
  }
};

let genQuoteListViewForm = (products) => {
  let htmlSize = `<th class="text-center raq_product_size">Size</th>`,
    htmlColor = `<th class="text-center raq_product_color">Color</th>`,
    htmlQuantity = `<th class="text-center raq_product_qty">Quantity</th>`,
    htmlPrice = `<th class="text-center raq_product_price">Price</th>`;

  $(".raq-quote-list-content").html(
    `<form id='raq-quote-list-form' method='post' name='raq-quote-list-form'>
      <table class="table raq-table">
        <thead>
          <tr>
            <th class="raq_product_image"></th>
            <th>Product</th>` +
      htmlSize +
      htmlColor +
      htmlQuantity +
      htmlPrice +
      `</tr>
        </thead>
        <tbody></tbody>
      </table>
      <div class="raq-form">
        <div class="d-flex flex-wrap form-group-row">
          <div class="form-group">
            <label class="control-label">Name</label>
            <div class="raq-input">
              <input type="text" id="raq-form_name" name="raq-form_name" required class="form-control">
            </div>
          </div>
          <div class="form-group">
            <label class="control-label">Email</label>
            <div class="raq-input">
              <input type="email" pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$" id="raq-form_email" name="raq-form_email" required class="form-control">
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label">Message</label>
          <div class="raq-input">
            <textarea class="form-control" id="raq-form_message" name="raq-form_message" required></textarea>
          </div>
        </div>
        <div class="raq-action-button d-flex justify-content-center">
          <a class="raq-continue-shopping">Continue Shopping</a>
          <input type="submit" id="submitRAQForm" name="submitRAQForm" value="Send Message">
        </div>
      </div>
    </div>
`
  );
  products.forEach((product, index) => {
    $(".raq-table tbody").append(genProductInQuoteList(product, index));
  });
  $(".close-raq-popup, .raq-continue-shopping").on("click", function () {
    $(".raq-overlay").fadeOut("slow");
  });
  $("#raq-quote-list-form .raq_remove_product").on("click", function () {
    let tr = $(this).closest("tr");
    let id = tr.data("product-id"),
      size = tr.data("product-size"),
      color = tr.data("product-color");
    for (let i = 0; i < products.length; i++) {
      if (
        products[i].id == id &&
        products[i].size == size &&
        products[i].color == color
      ) {
        products.splice(i, 1);
      }
    }

    if (products.length == 0) {
      emptyQuoteListContent();
    } else {
      tr.fadeOut("slow");
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }
    checkExistQuoteList();
  });
  $(".qty-product-control-down,.qty-product-control-up").click(function () {
    let tr = $(this).closest("tr");
    let id = tr.data("product-id"),
      size = tr.data("product-size"),
      color = tr.data("product-color"),
      price = tr.data("product-price");
    let value = parseInt(tr.find(".quantity").val(), 10) || 0;
    if (value > 1 || $(this).is(".qty-product-control-up")) {
      tr.find(".quantity").val(
        $(this).is(".qty-product-control-down") ? value - 1 : value + 1
      );
    }
    let total = (parseInt(tr.find(".quantity").val(), 10) * price).toFixed(2);
    tr.find(".raq_product_price span").text("$" + total);
    for (let i = 0; i < products.length; i++) {
      if (
        products[i].id == id &&
        products[i].size == size &&
        products[i].color == color
      ) {
        products[i].qty = parseInt(tr.find(".quantity").val(), 10);
        products[i].total = total;
      }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  });

  const form = document.getElementById("raq-quote-list-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    $(".raq-popup-content").html("").append(`
      <div class="raq-message">Thank you for submitting a request a quote!</div>
      <div class="raq-action-button d-flex justify-content-center">
        <a class="raq-continue-shopping">Continue Shopping</a>
      </div>
    `);
    quotePopupOpenScripts();
    localStorage.setItem(STORAGE_KEY, "[]");
    checkExistQuoteList();
  });
};

let genProductInQuoteList = (product, idx) => {
  let htmlSize = `<td class="text-center">${product.size} </td>`,
    htmlColor = `<td class="text-center">${product.color} </td>`,
    htmlQuantity = `
            <td class="text-center raq_product_qty">
              <a class="qty-product-control qty-product-control-down" field="qty-product-${idx}">-</a>
              <input min="1" type="text" name="qty-product-${idx}" class="quantity" id="updates_${idx}" value="${product.qty}" pattern="[0-9]*">
              <a class="qty-product-control qty-product-control-up" field="qty-product-${idx}">+</a>
            </td>
        `,
    htmlPrice = `
            <td class="text-center raq_product_price">
                <span id="raq_product-${idx}-price">$${product.total}</span>
            </td>
        `,
    htmlRemove = `<p><a data-product-idx="${idx}" class="raq_remove_product" href="javascript:void(0)">Remove</a></p>`,
    image =
      product.image != ""
        ? ` <a href="/product.html?id=${product.id}" target="_blank">
                        <img src="${product.image}" alt="${product.title}">
                    </a>`
        : "";
  return `<tr class="raq_product_row" id="raq_product_row_${idx}" data-product-id="${product.id}" data-product-price="${product.price}" data-product-size="${product.size}" data-product-color="${product.color}">
      <td class="raq_product_image">
        ${image}
      </td>
      <td class="raq_product_title d-flex flex-column">
        <a href="/product.html?id=${product.id}" target="_blank">${product.title}</a>
        ${htmlRemove}
      </td>
      ${htmlSize}
      ${htmlColor}
      ${htmlQuantity}
      ${htmlPrice}
    </tr>`;
};

let emptyQuoteListContent = () => {
  $(".raq-popup-content").html("").append(`
        <div class="raq-message">Your quote is currently empty.</div>
        <div class="raq-action-button d-flex justify-content-center">
          <a class="raq-continue-shopping">Continue Shopping</a>
        </div>
      `);
  localStorage.setItem(STORAGE_KEY, "[]");
  $(".close-raq-popup, .raq-continue-shopping").on("click", function () {
    $(".raq-overlay").fadeOut("slow");
  });
};

/* END QUOTE SCRIPTS */

export let checkMainBannerImageHeight = () => {
  if ($(window).width() >= 1200) {
    $(".main-banner img").css("max-height", $(window).innerHeight() - 164);
  }
  $(window).resize(function () {
    if ($(window).width() >= 1200) {
      $(".main-banner img").css("max-height", $(window).innerHeight() - 164);
    } else {
      $(".main-banner img").css("max-height", "100%");
    }
  });
  $(window).scroll(function () {
    if ($(window).width() >= 1200) {
      $(".main-banner img").css("max-height", $(window).innerHeight() - 164);
    } else {
      $(".main-banner img").css("max-height", "100%");
    }
  });
};

export let getListCollections = (el, limit) => {
  fetch("/collections?_limit=" + limit).then((response) => {
    response.json().then((data) => {
      data.forEach((collection) => {
        $(el).append(renderCollectionsListHtml(collection));
      });
    });
  });
};

let renderCollectionsListHtml = (collection) =>
  `<div class="col-md-4 mb-5">
    <div class="item position-relative">
      <div class="item-overlay"></div>
      <img src="${collection.thumb}" alt="${collection.title}" />
      <h3 class="item-title position-absolute"><a href="collections.html?id=${collection.id}">${collection.title}</a></h3>
    </div>
  </div>`;

getListCollections(".list-collections .row", 3);

export let renderGridProductHtml = (product) => {
  let color = "";
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
  let soldOut = product.available
    ? ""
    : `<span class="sold-out-label">Sold out</span>`;
  if (typeof product.color != "undefined" && product.color.length > 0) {
    for (let i = 0; i < product.color.length; i++) {
      if (i == 0) color += getProductColorIcon(product.color[i], true);
      else color += getProductColorIcon(product.color[i]);
    }
  }
  return `
    <div class="product">
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

export let renderRecentPostHtml = (post) =>
  `<div class="col-md-6 blog-item">
    <img
      class="blog-image w-100"
      src="${post.image}"
      alt="${post.title}"
    />
    <div class="blog-info">
      <h3 class="blog-title">${post.title}</h3>
      <p class="blog-created mb-3">Posted on ${post.created_at}</p>
      <p class="introtext">${post.introtext}</p>
    </div>
  </div>`;

// Toggle mobile menu
$(".mobile-icon").on("click", function () {
  $("#slideout-mobile-navigation").fadeIn("slow");
  $("#slideout-mobile-navigation .slideout-mobile-content")
    .removeClass("animate__fadeOutLeft")
    .addClass("animate__fadeInLeft");
});
$(".close-navigation .icon-close").on("click", function () {
  $("#slideout-mobile-navigation .slideout-mobile-content")
    .removeClass("animate__fadeInLeft")
    .addClass("animate__fadeOutLeft");
  $("#slideout-mobile-navigation").fadeOut("slow");
});
$("#slideout-mobile-navigation").mousedown(function (e) {
  var clicked = $(e.target);
  if (
    clicked.is("#slideout-mobile-navigation .slideout-mobile-content") ||
    clicked.parents().is("#slideout-mobile-navigation .slideout-mobile-content")
  ) {
    return;
  } else {
    $("#slideout-mobile-navigation .slideout-mobile-content")
      .removeClass("animate__fadeInLeft")
      .addClass("animate__fadeOutLeft");
    $("#slideout-mobile-navigation").fadeOut("slow");
  }
});

$("#sub-menu-1").on("show.bs.collapse", function () {
  $(".mobile-menu .arrow img").attr("src", "images/icons/arrow-up-mobile.png");
});
$("#sub-menu-1").on("hide.bs.collapse", function () {
  $(".mobile-menu .arrow img").attr(
    "src",
    "images/icons/arrow-down-mobile.png"
  );
});
// End Toggle mobile menu

export let checkSortProductCondition = () => {
  let url = new URL(window.location.href);
  let condition = url.searchParams.get("sort") || DEFAULT_SORT_VALUE;

  let select = document.getElementById("sort-select");
  select.value = condition;

  select.onchange = function (e) {
    e.preventDefault();
    url.searchParams.set("sort", select.value);
    window.location.href = url;
  };
};
