let slides = document.getElementsByClassName("slide"),
    slideIndex = 1,
    select = document.getElementById("select-menu");
select.value = window.location;
let showSlides = (slideIndex) => {
    if (slideIndex > slides.length) slideIndex = 1;
    if (slideIndex < 1) slideIndex = slides.length;
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    slides[slideIndex-1].classList.add("active");
}
let changeSlide = (n) => {
    slideIndex += n;
    if (slideIndex > slides.length) slideIndex = 1;
    if (slideIndex < 1) slideIndex = slides.length;
    showSlides(slideIndex);
}

function changeLink() {
    window.location = select.value;
}

showSlides(slideIndex);