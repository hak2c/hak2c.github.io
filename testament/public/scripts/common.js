export const DEFAULT_SORT_VALUE = "featured";

export const STORAGE_KEY = "testament_quote";

export let includeHTML = () => {
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
    // if ($(".omgrfq-popup").length == 0) {
    //   $(".omgrfq-overlay").css("display", "block");
    //   omgrfq_getAddToQuotePopup(productList);
    // }
  });
};

checkExistQuoteList();

$("body").append(
  `<div class="">
  
  </div>`
);

/*let checkScreenForFixedMenu = () => {
  if ($(window).width() >= 992) {
    fixedMainMenu();
    $("header").removeClass("fixed-header");
  } else {
    fixedHeaderMobile();
  }
  $(window).resize(function () {
    if ($(window).width() >= 992) {
      fixedMainMenu();
      $("header").removeClass("fixed-header");
      $("#slideout-mobile-navigation").hide();
    } else {
      $(".primary-menu").removeClass("fixed-header");
      fixedHeaderMobile();
    }
  });
  $(window).scroll(function () {
    if ($(window).width() >= 992) {
      fixedMainMenu();
      $("header").removeClass("fixed-header");
    } else {
      $(".primary-menu").removeClass("fixed-header");
      fixedHeaderMobile();
    }
  });
};

let fixedMainMenu = () => {
  let chktop = 0;
  chktop = $(".logo").offset().top + $(".logo").outerHeight();
  if ($(window).scrollTop() > chktop) {
    $(".primary-menu").addClass("fixed-header");
  } else {
    $(".primary-menu").removeClass("fixed-header");
  }
};

let fixedHeaderMobile = () => {
  if ($(window).scrollTop() > 0) {
    $("header").addClass("fixed-header");
  } else {
    $("header").removeClass("fixed-header");
  }
};*/

// checkScreenForFixedMenu();

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

export let renderCollectionsListHtml = (collection) =>
  `<div class="col-md-4 mb-5">
    <div class="item position-relative">
      <div class="item-overlay"></div>
      <img src="${collection.thumb}" alt="${collection.title}" />
      <h3 class="item-title position-absolute"><a href="collections.html?id=${collection.id}">${collection.title}</a></h3>
    </div>
  </div>`;

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
