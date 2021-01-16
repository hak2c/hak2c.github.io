// 1. Đếm xem có tất cả bao nhiêu từ trong 2 đoạn văn có độ dài lớn hơn 8


// 2. Style cho các từ có độ dài lớn hơn 8 trong p1
let p1 = document.querySelector(".p1");
p1.innerHTML = p1.textContent.split(" ").map(i => i.length > 8 ? `<span class="color">${i}</span>` : i).join(" ");

// 3. Thay thế các từ có độ nhỏ hơn 8 trong p2 thành "Anh Ba đẹp trai 🤣". Lưu ý thay thế đúng không thì 0đ!!!

p2.innerHTML = p2.textContent.split(" ").map(i=> i.length < 8 ? "Anh Ba đẹp trai 🤣" : i).join(" ");

// 4. Thêm src, alt, href cho ảnh, link
let image = document.body.getElementsByTagName("img")[0];
image.src = "https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh-4-480x600.jpg";
image.alt = "Gái xinh";

let link = document.body.getElementsByTagName("a")[0];
link.href = "https://www.dungplus.com/hinh-nen-girl-xinh.html";
link.textContent = "Top 50 Hình Nền Girl Xinh – Ảnh Nền Gái Xinh Hot Trên Mạng Xã Hội";

// 5. Thêm background cho các ô ngẫu nhiên trong bảng (mỗi hàng 1 ô, style bằng .style.backgroundColor), và thay đổi nội dung trong các ô đó thành "😍 Mr. Ba đẹp trai"

let table = document.body.getElementsByTagName("table")[0];    
for (let i = 0; i < table.rows.length; i++) {
    let j = Math.floor(Math.random() * table.rows.length);
    table.rows[i].cells[j].style.backgroundColor = "red";
    table.rows[i].cells[j].innerHTML = "😍 Mr. Ba đẹp trai";
}
