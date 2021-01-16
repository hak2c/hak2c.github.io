

function createToastedContent(rand) {
    let div = document.createElement("div");
    div.classList.add("toasted-content");
    div.id = "toasted-content-" + rand;
    div.innerHTML = `Ba nhìn cũng tàm tạm`;
    let btn = document.createElement("span");
    btn.innerHTML = "X";
    div.append(btn);
    btn.addEventListener("click", function () {
        document.getElementById("toasted-content-" + rand).remove();
    });
    return div;
}
function showToasted() {
    let rand = Math.floor(Math.random()*100);
    toasted.append(createToastedContent(rand));
    setTimeout(() => {
        document.getElementById("toasted-content-" + rand).remove();
    }, 2000);
}