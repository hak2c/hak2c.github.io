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

export let renderCollectionsListHtml = (collection) =>
  `<div class="col-md-4 mb-5">
    <div class="item position-relative">
      <img src="${collection.thumb}" alt="${collection.title}" />
      <h3 class="item-title position-absolute">${collection.title}</h3>
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
