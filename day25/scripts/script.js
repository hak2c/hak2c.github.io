function checkIntoView() {
  $(".ot-effect").each(function () {
    let docViewTop = $(window).scrollTop(),
      docViewBottom = docViewTop + $(window).height(),
      elemTop = $(this).offset().top,
      elemBottom = elemTop + $(this).height();
    if (
      (elemTop <= docViewBottom - 80 && elemBottom >= docViewTop + 80) ||
      (elemTop > docViewTop && elemBottom < docViewBottom)
    ) {
      $(this).addClass("ot-scroll-appear").removeClass("ot-scroll-disappear");
    } else {
      $(this).addClass("ot-scroll-disappear").removeClass("ot-scroll-appear");
    }
  });
}
checkIntoView();
$(window).scroll(function () {
  checkIntoView();
});

// INTELLIGENT
let tooltipsImages = [
  {
    img: "images/intelligent/image_1-2.jpg",
    name: "Mattis metus 1",
    title: "Control to your site, all age open-source and free to use as yo",
    top: "13%",
    left: "25%",
  },
  {
    img: "images/intelligent/image_2-1.jpg",
    name: "Mattis metus 2",
    title: "Control to your site, all age open-source and free to use as yo",
    top: "7%",
    left: "67%",
  },
  {
    img: "images/intelligent/image_3-1.jpg",
    name: "Mattis metus 3",
    title: "Control to your site, all age open-source and free to use as yo",
    top: "63%",
    left: "15%",
  },
  {
    img: "images/intelligent/image4.jpg",
    name: "Mattis metus 4",
    title: "Control to your site, all age open-source and free to use as yo",
    top: "55%",
    left: "50%",
  },
];
function intelligentTooltip() {
  let moreinfo = document.querySelector(".ot_moreinfo");
  for (let i = 0; i < tooltipsImages.length; i++) {
    moreinfo.append(
      createImageInfor(i, tooltipsImages[i].top, tooltipsImages[i].left)
    );
    $(`#ot_icon_${i}`).tooltipster({
      content: $(
        `<img src="${tooltipsImages[i]["img"]}" /><div class="ot_info"><h4 class="ot_infoname">${tooltipsImages[i]["name"]}</h4><p>${tooltipsImages[i]["title"]}</p></div>`
      ),
      // setting a same value to minWidth and maxWidth will result in a fixed width
      minWidth: 120,
      maxWidth: 220,
      position: "top-left",
    });
    $(`#ot_icon_${i}`).hover(function () {
      $(".ot_icon").css("z-index", "1");
      $(this).css("z-index", "10");
    });
  }
}

function createImageInfor(key, top, left) {
  let div = document.createElement("div");
  div.classList.add("ot_icon");
  div.classList.add("position-absolute");
  div.id = `ot_icon_${key}`;
  div.style.top = top;
  div.style.left = left;
  let img = document.createElement("img");
  img.src = "images/icon-plus.png";
  div.append(img);
  return div;
}

intelligentTooltip();
