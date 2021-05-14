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

let checkScreenForFixedMenu = () => {
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
};

checkScreenForFixedMenu();

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
        <img
          src="${product.images[0]}"
          alt="${product.title}"
        />
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
  $("#slideout-mobile-navigation").show();
  $("#slideout-mobile-navigation .mobile-menu")
    .removeClass("animate__fadeOutLeft")
    .addClass("animate__fadeInLeft");
  $("body").addClass("stopScrolling");
});
$(".close-navigation .icon-close").on("click", function () {
  $("#slideout-mobile-navigation .mobile-menu")
    .removeClass("animate__fadeInLeft")
    .addClass("animate__fadeOutLeft");
  setTimeout(() => {
    $("#slideout-mobile-navigation").hide();
  }, 700);
  $("body").removeClass("stopScrolling");
});
$("#slideout-mobile-navigation").mousedown(function (e) {
  var clicked = $(e.target);
  if (
    clicked.is("#slideout-mobile-navigation .mobile-menu") ||
    clicked.parents().is("#slideout-mobile-navigation .mobile-menu")
  ) {
    return;
  } else {
    $("#slideout-mobile-navigation .mobile-menu")
      .removeClass("animate__fadeInLeft")
      .addClass("animate__fadeOutLeft");
    setTimeout(() => {
      $("#slideout-mobile-navigation").hide();
    }, 500);
    $("body").removeClass("stopScrolling");
  }
});

// End Toggle mobile menu
