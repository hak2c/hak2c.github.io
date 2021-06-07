import {
  STORAGE_KEY,
  includeHTML,
  createViewQuoteButton,
  renderCollectionsListHtml,
  createSuccessAddedProductToQuote,
} from "./common.js";

includeHTML();

let url = new URL(window.location.href);
let productId = url.searchParams.get("id");

let renderProductPageHtml = (productId) => {
  fetch("/products?id=" + productId + "&_expand=collection").then(
    (response) => {
      response.json().then((data) => {
        let product = data[0];
        $(".ot-breadcrumb .col-12").html(
          `<a href="index.html">Home</a> > <a href="collections.html?id=${product.collection.id}">${product.collection.title}</a> > ${product.title}`
        );
        document.title = product.title;
        renderProductImagesSlide(product.images);
        renderProductInformation(product);
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

let renderProductInformation = (product) => {
  let price = getProductPrice(product),
    variantHtml = getProductVariant(product),
    content = `
        <h1 class="product-content-section product-title">${product.title}</h1>
        ${price}
        <form class="product-content-section add-product-form" id="add-product">
            ${variantHtml}
            <div class="form-group variant-label">
                  <label>Quantity</label>
            </div>
            <div class="qty-selection">
                <a class="quantity-control quantity-control-down" field="quantity">-</a>
                <input min="1" type="text" name="quantity" class="quantity" value="1">
                <a class="quantity-control quantity-control-up" field="quantity">+</a>
            </div>
            <div class="adđ-to-cart mt-4">
                <input id="addToCart" type="submit" name="button" class="AddtoCart" value="Add To Cart">
            </div>
            <p class="mt-4 text-center text-uppercase bold">Or</p>
            <div class="mt-4">
              <a class="addQuoteButton d-block">Request a Quote</a>
            </div>
        </form>
        <div class="product-content-section product-description">${product.description}</div>
    `;
  $(".product-information .product-information-content").append(content);

  $(".quantity-control-down,.quantity-control-up").click(function () {
    let value = parseInt($(".quantity").val(), 10) || 0;
    if (value > 0 || $(this).is(".quantity-control-up")) {
      $(".quantity").val(
        $(this).is(".quantity-control-down") ? value - 1 : value + 1
      );
    }
  });

  $("input[name=size-variant]").change(function () {
    $(".size-label span").text($(this).val());
  });
  $("input[name=color-variant]").change(function () {
    $(".color-label span").text($(this).val());
  });
  // Add quote button click
  $(".addQuoteButton").on("click", function () {
    let addedProduct = {
      id: productId,
      image: product.images[0],
      title: product.title,
      size: $("input[name=size-variant]:checked").val() || "",
      color: $("input[name=color-variant]:checked").val() || "",
      qty: Number($("input[name=quantity]").val()),
      price: product.price,
      total: (Number($("input[name=quantity]").val()) * product.price).toFixed(
        2
      ),
    };
    let productsList = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (productsList.length == 0) {
      productsList.push(addedProduct);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(productsList));
      createViewQuoteButton();
    } else {
      let exist = false;
      for (let i = 0; i < productsList.length; i++) {
        if (
          productsList[i].id == addedProduct.id &&
          productsList[i].size == addedProduct.size &&
          productsList[i].color == addedProduct.color
        ) {
          exist = true;
          productsList[i].qty += addedProduct.qty;
        }
      }
      if (!exist) productsList.push(addedProduct);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(productsList));
    }
    createSuccessAddedProductToQuote();
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

let getProductVariant = (product) => {
  if (product.size.length == 0) {
    return `<div class="form-group variant-label">
                <label>Size:</label>One size
            </div>`;
  } else {
    return (
      renderSizeSelect(product) +
      (typeof product.color != "undefined" ? renderColorSelect(product) : "")
    );
  }
};

let renderSizeSelect = (product) => {
  let sizeHtml = "",
    sizeLabel = "";

  sizeHtml = `<div class="size-select d-flex align-items-center">`;
  let sizeFirstChecked = false;
  if (product.size[0].available) {
    sizeLabel = `
            <div class="form-group variant-label size-label">
                <label>Size:</label><span>${product.size[0].name}</span>
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
                <div class="form-group variant-label size-label">
                    <label>Size:</label><span>${product.size[i].name}</span>
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
  sizeHtml += "</div>";
  return sizeLabel + sizeHtml;
};

let renderColorSelect = (product) => {
  let colorHtml = "",
    colorLabel = "";

  colorHtml = `<div class="color-select d-flex align-items-center">`;
  let colorFirstChecked = false;

  if (product.color[0].available) {
    colorLabel = `
              <div class="form-group variant-label color-label">
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
                  <div class="form-group variant-label color-label">
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

  colorHtml += "</div>";
  return colorLabel + colorHtml;
};

renderProductPageHtml(productId);

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
