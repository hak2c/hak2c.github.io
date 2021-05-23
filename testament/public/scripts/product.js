import { includeHTML, renderCollectionsListHtml } from "./common.js";
const DEFAULT_SIZE = null;
const DEFAULT_COLOR = null;

includeHTML();

let url = new URL(window.location.href);
let variant = {
  size: url.searchParams.get("_size") || DEFAULT_SIZE,
  color: url.searchParams.get("_color") || DEFAULT_COLOR,
};
let productId = url.searchParams.get("id");

let renderProductPageHtml = (productId, variant) => {
  fetch("/products?id=" + productId + "&_expand=collection").then(
    (response) => {
      response.json().then((data) => {
        let product = data[0];
        $(".ot-breadcrumb .col-12").html(
          `<a href="index.html">Home</a> > <a href="collections.html?id=${product.collection.id}">${product.collection.title}</a> > ${product.title}`
        );
        document.title = product.title;
        renderProductImagesSlide(product.images);
        renderProductInformation(product, variant);
      });
    }
  );
};

let renderProductImagesSlide = (images) => {
  let navImg = "",
    mainImg = "";
  images.forEach((img) => {
    navImg += `<div class="img-item" style="background-image: url('${img}')"></div>`;
    mainImg += `<div class="img-item"><img src="${img}" /></div>`;
  });
  $(".product-images .main-image").append(mainImg);
  $(".product-images .nav-image").append(navImg);
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

  $("input[type=radio][name=size-variant]").change(function () {
    let url = new URL(window.location.href);
    url.searchParams.set("_size", $(this).val());
    window.location.href = url;
  });
  $("input[type=radio][name=color-variant]").change(function () {
    let url = new URL(window.location.href);
    url.searchParams.set("_color", $(this).val());
    window.location.href = url;
  });
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
    return `<div class="form-group variant-label">
                <label>Size:</label>One size
            </div>`;
  } else {
    return (
      renderSizeSelect(product, variant) + renderColorSelect(product, variant)
    );
  }
};

let renderSizeSelect = (product, variant) => {
  let sizeHtml = "",
    sizeLabel = "";

  sizeHtml = `<div class="size-select d-flex align-items-center">`;
  let sizeFirstChecked = false;
  if (variant.size == null) {
    if (product.size[0].available) {
      sizeLabel = `
            <div class="form-group variant-label">
                <label>Size:</label><span>${product.size[0].name}<span>
            </div>
            `;
      sizeFirstChecked = true;
      sizeHtml += `
            <div class="form-group">
                <input checked type="radio" name="size-variant" value="${product.size[0].name}" id="size${product.size[0].name}" />
                <label class="" for="size${product.size[0].name}">${product.size[0].name}</label>
            </div>
          `;
    } else {
      sizeHtml += `
            <div class="form-group">
                <input type="radio" name="size-variant" value="${product.size[0].name}" id="size${product.size[0].name}" />
                <label class="crossed" for="size${product.size[0].name}">${product.size[0].name}</label>
            </div>
        `;
    }
    for (let i = 1; i < product.size.length; i++) {
      let soldOut = product.size[i].available ? "" : `crossed`;
      if (!sizeFirstChecked) {
        if (product.size[i].available) {
          sizeLabel = `
                <div class="form-group variant-label">
                    <label>Size:</label><span>${product.size[i].name}<span>
                </div>
                `;
          sizeFirstChecked = true;
          sizeHtml += `
                <div class="form-group">
                    <input checked type="radio" name="size-variant" value="${product.size[i].name}" id="size${product.size[i].name}" />
                    <label class="" for="size${product.size[i].name}">${product.size[i].name}</label>
                </div>
              `;
        } else {
          sizeHtml += `
                <div class="form-group">
                    <input type="radio" name="size-variant" value="${product.size[i].name}" id="size${product.size[i].name}" />
                    <label class="crossed" for="size${product.size[i].name}">${product.size[i].name}</label>
                </div>
            `;
        }
      } else {
        sizeHtml += `
            <div class="form-group">
                <input type="radio" name="size-variant" value="${product.size[i].name}" id="size${product.size[i].name}" />
                <label class="${soldOut}" for="size${product.size[i].name}">${product.size[i].name}</label>
            </div>
          `;
      }
    }
  } else {
    for (let i = 0; i < product.size.length; i++) {
      let soldOut = product.size[i].available ? "" : `crossed`,
        checked = "";
      if (product.size[i].name === variant.size) {
        sizeLabel = `
                <div class="form-group variant-label">
                    <label>Size:</label><span>${product.size[i].name}<span>
                </div>
                `;
        checked = "checked";
      }
      sizeHtml += `
            <div class="form-group">
                <input ${checked} type="radio" name="size-variant" value="${product.size[i].name}" id="size${product.size[i].name}" />
                <label class="${soldOut}" for="size${product.size[i].name}">${product.size[i].name}</label>
            </div>
        `;
    }
  }
  sizeHtml += "</div>";
  return sizeLabel + sizeHtml;
};

let renderColorSelect = (product, variant) => {
  let colorHtml = "",
    colorLabel = "";

  colorHtml = `<div class="color-select d-flex align-items-center">`;
  let colorFirstChecked = false;
  if (variant.color == null) {
    if (product.color[0].available) {
      colorLabel = `
              <div class="form-group variant-label">
                  <label>Color:</label><span>${product.color[0].name}<span>
              </div>
              `;
      colorFirstChecked = true;
      colorHtml += `
              <div class="form-group">
                  <input checked type="radio" name="color-variant" value="${product.color[0].name}" id="color${product.color[0].name}" />
                  <label class="d-flex justify-content-center align-items-center" for="color${product.color[0].name}"><span style="background-image: url(/${product.color[0].thumb});"></span></label>
              </div>
            `;
    } else {
      colorHtml += `
              <div class="form-group">
                  <input type="radio" name="color-variant" value="${product.color[0].name}" id="color${product.color[0].name}" />
                  <label class="crossed d-flex justify-content-center align-items-center" for="color${product.color[0].name}"><span style="background-image: url(/${product.color[0].thumb});"></span></label>
              </div>
          `;
    }
    for (let i = 1; i < product.color.length; i++) {
      let soldOut = product.color[i].available ? "" : `crossed`;
      if (!colorFirstChecked) {
        if (product.color[i].available) {
          colorLabel = `
                  <div class="form-group variant-label">
                      <label>Color:</label><span>${product.color[i].name}<span>
                  </div>
                  `;
          colorFirstChecked = true;
          colorHtml += `
                  <div class="form-group">
                      <input checked type="radio" name="color-variant" value="${product.color[i].name}" id="color${product.color[i].name}" />
                      <label class="d-flex justify-content-center align-items-center" for="color${product.color[i].name}"><span style="background-image: url(/${product.color[i].thumb});"></span></label>
                  </div>
                `;
        } else {
          colorHtml += `
                  <div class="form-group">
                      <input type="radio" name="color-variant" value="${product.color[i].name}" id="color${product.color[i].name}" />
                      <label class="crossed d-flex justify-content-center align-items-center" for="color${product.color[i].name}"><span style="background-image: url(/${product.color[i].thumb});"></span></label>
                  </div>
              `;
        }
      } else {
        colorHtml += `
              <div class="form-group">
                  <input type="radio" name="color-variant" value="${product.color[i].name}" id="color${product.color[i].name}" />
                  <label class="${soldOut} d-flex justify-content-center align-items-center" for="color${product.color[i].name}"><span style="background-image: url(/${product.color[i].thumb});"></span></label>
              </div>
            `;
      }
    }
  } else {
    for (let i = 0; i < product.color.length; i++) {
      let soldOut = product.color[i].available ? "" : `crossed`,
        checked = "";
      if (product.color[i].name === variant.color) {
        colorLabel = `
                  <div class="form-group variant-label">
                      <label>Color:</label><span>${product.color[i].name}<span>
                  </div>
                  `;
        checked = "checked";
      }
      colorHtml += `
              <div class="form-group">
                  <input ${checked} type="radio" name="color-variant" value="${product.color[i].name}" id="color${product.color[i].name}" />
                  <label class="${soldOut} d-flex justify-content-center align-items-center" for="color${product.color[i].name}"><span style="background-image: url(/${product.color[i].thumb});"></span></label>
              </div>
          `;
    }
  }
  colorHtml += "</div>";
  return colorLabel + colorHtml;
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
