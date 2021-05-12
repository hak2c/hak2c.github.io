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
  } else {
    fixedHeaderMobile();
  }
  $(window).resize(function () {
    if ($(window).width() >= 992) {
      fixedMainMenu();
    } else {
      $(".primary-menu").removeClass("fixed-header");
      fixedHeaderMobile();
    }
  });
  $(window).scroll(function () {
    if ($(window).width() >= 992) {
      fixedMainMenu();
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
      <img src="${collection.thumb}" alt="${collection.title}" />
      <h3 class="item-title position-absolute"><a href="collections.html?id=${collection.id}">${collection.title}</a></h3>
    </div>
  </div>`;

export let renderNewArrivalsProductHtml = (product) => {
  let color = "";
  if (typeof product.color != "undefined" && product.color.length > 0) {
    for (let i = 0; i < product.color.length; i++) {
      if (i == 0) color += getProductColorIcon(product.color[i], true);
      else color += getProductColorIcon(product.color[i]);
    }
  }
  return `
    <div class="product col-md-3 pb-5">
      <div class="product-content">
        <img
          src="${product.images[0]}"
          alt="${product.title}"
        />
        <div class="product-info text-center">
          <div class="product-title"><a href="/product.html?id=${product.id}">${product.title}</a></div>
          <div class="product-price">$${product.price}</div>
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
    <span class="color-item ${checkActive}">
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

export class Collections {
  constructor() {
    this.collectionId = 0;
    this.collection = {};
    this.products = [];

    this.init();
  }
  init() {
    this.getCollection()
      .then(() => {
        $(".collection-image img").attr("src", this.collection.images[0]);
        $(".collection-second-image img").attr(
          "src",
          this.collection.images[1]
        );
        $(".ot-breadcrumb .col-12").html(
          `<a href="index.html">Home</a> > ${this.collection.title}`
        );
        $(".page-title h3").text(this.collection.title);
        document.title = this.collection.title;
      })
      .then(() => {
        return this.getProductsOfCollection();
      })
      .then(() => {
        this.products.forEach((product) => {
          $(".products-list").append(this.renderPostHtml(product));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getCollection() {
    return new Promise((resolve) => {
      let url = new URL(window.location.href);
      this.collectionId = url.searchParams.get("id");
      fetch("/collections?id=" + this.collectionId).then((response) => {
        response.json().then((data) => {
          this.collection = data[0];
          resolve();
        });
      });
    });
  }
  getProductsOfCollection() {
    return new Promise((resolve) => {
      fetch("/products?collectionId=" + this.collectionId).then((response) => {
        response.json().then((data) => {
          this.products = data;
          resolve();
        });
      });
    });
  }
  renderPostHtml(product) {
    let color = "";
    if (typeof product.color != "undefined" && product.color.length > 0) {
      for (let i = 0; i < product.color.length; i++) {
        if (i == 0) color += this.getProductColorIcon(product.color[i], true);
        else color += this.getProductColorIcon(product.color[i]);
      }
    }
    return `
      <div class="product col-6 col-md-4 pb-5">
        <div class="product-content">
          <img
            src="${product.images[0]}"
            alt="${product.title}"
          />
          <div class="product-info text-center">
            <div class="product-title"><a href="/product.html?id=${product.id}">${product.title}</a></div>
            <div class="product-price">$${product.price}</div>
            <div
              class="product-color pt-3 text-center d-flex justify-content-center align-items-center"
            >
              ${color}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  getProductColorIcon(color, active = false) {
    let checkActive =
      active == true
        ? "active d-flex justify-content-center align-items-center"
        : "";
    return `
      <span class="color-item ${checkActive}">
        <span style="background-image: url(/${color.thumb});"></span>
      </span>
    `;
  }
}
