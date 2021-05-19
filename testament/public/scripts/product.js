import { includeHTML, renderCollectionsListHtml } from "./common.js";
const DEFAULT_SIZE = null;
const DEFAULT_COLOR = null;

includeHTML();

let url = new URL(window.location.href);
let variant = {
  size: url.searchParams.get("size") || DEFAULT_SIZE,
  color: url.searchParams.get("color") || DEFAULT_COLOR,
};

let productId = url.searchParams.get("id");

let renderProductPageHtml = (productId, variant) => {
  fetch("/products?id=" + productId + "&_expand=collection").then(
    (response) => {
      response.json().then((data) => {
        let product = data[0];
        console.log(product.description);
        $(".ot-breadcrumb .col-12").html(
          `<a href="index.html">Home</a> > <a href="collection.html?id=${product.collection.id}">${product.collection.title}</a> > ${product.title}`
        );
        document.title = product.title;
        renderProductImagesSlide(product.images);
        renderProductInformation(product, variant);
      });
    }
  );
};

let renderProductImagesSlide = (images) => {
  let image = "";
  images.forEach((img) => {
    image += `<div class="img-item"><img src="${img}" /></div>`;
  });
  $(".product-images .main-image").append(image);
  $(".product-images .nav-image").append(image);
  let mainImgOps = {
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    asNavFor: ".nav-image",
  };
  let navImgOps = {
    slidesToShow: 5,
    slidesToScroll: 1,
    vertical: true,
    infinite: true,
    asNavFor: ".main-image",
    arrows: true,
    prevArrow: `<button type="button" class="slick-prev"><img src="images/icons/arrow-left.png" /></button>`,
    nextArrow: `<button type="button" class="slick-next"><img src="images/icons/arrow-right.png" /></button>`,
    dots: false,
    centerMode: false,
    focusOnSelect: true,
  };

  $(".product-images .main-image").slick(mainImgOps);
  $(".product-images .nav-image").slick(navImgOps);
};

let renderProductInformation = (product, variant) => {
  let price = getProductPrice(product),
    variantHtml = getProductVariant(product, variant),
    content = `
        <h1 class="product-content-section product-title">${product.title}</h1>
        ${price}
        <form class="product-content-section add-product-form" id="add-product">
            ${variantHtml}
        </form>
        <div class="product-content-section product-description"></div>
    `;
  $(".product-information .product-information-content").append(content);
  $(
    ".product-information .product-information-content .product-description"
  ).html(product.description);
};

let getProductPrice = (product) => {
  if (typeof product.compare_price != "undefined") {
    return `<div class="product-content-section product-price d-flex justify-content-start align-items-center">
                  <span class="price-item price-item--sale">$${product.price}</span>
                  <span class="price-item price-item--compare">$${product.compare_price}</span>
                  <span class="price-badge price-badge--sale">Sale</span>
                </div>`;
  } else {
    return `<div class="product-content-section product-price"><span class="price-item">$${product.price}</span></div>`;
  }
};

let getProductVariant = (product, variant) => {
  if (product.size.length == 0) {
    return `<div class="form-group">
                <label>Size:</label>One size
            </div>`;
  } else {
      
  }
};

renderProductPageHtml(productId, variant);

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
