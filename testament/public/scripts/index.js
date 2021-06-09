import {
  checkMainBannerImageHeight,
  getListCollections,
  renderGridProductHtml,
  renderRecentPostHtml,
} from "./common.js";
// checkMainBannerImageHeight();

// fetch("/test.html")
//   .then((res) => res.text())
//   .then((html) => console.log(JSON.stringify(html)));

let getNewArrivalProducts = () => {
  fetch("/products?_limit=8&_sort=id&_order=desc&available=true").then(
    (response) => {
      response.json().then((data) => {
        data.forEach((product) => {
          $(".new-arrivals .list-arrivals").append(
            renderGridProductHtml(product)
          );
        });
        let slickOpts = {
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: false,
          dots: false,
          infinite: true,
          arrows: true,
          prevArrow: `<button type="button" class="slick-prev"><img src="images/icons/arrow-left.png" /></button>`,
          nextArrow: `<button type="button" class="slick-next"><img src="images/icons/arrow-right.png" /></button>`,
          responsive: [
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
          ],
        };
        $(".new-arrivals .list-arrivals").slick(slickOpts);
      });
    }
  );
};

let getRecentBlogPosts = () => {
  fetch("/blogs?_limit=2&sort=id&_order=desc").then((response) => {
    response.json().then((data) => {
      data.forEach((post) => {
        $(".latest-blogs .row").append(renderRecentPostHtml(post));
      });
    });
  });
};

getListCollections(".top-collections .row", 3);
getNewArrivalProducts();
getRecentBlogPosts();
