export default class Posts {
  constructor(method, url, posts) {
    this.method = method;
    this.url = url;
    this.posts = posts;

    this.data = [];
  }

  getData() {
    let xhr = new XMLHttpRequest();
    // xhr.setRequestHeader("Content-Type", "application/json");
    xhr.open(this.method, this.url);
    xhr.send();

    return new Promise((resolve, reject) => {
      xhr.onerror = () => "Something happen!";
      xhr.onload = () => {
        if (xhr.status == 200) {
          this.data = JSON.parse(xhr.response);
          resolve();
        } else {
          reject("Error: ", xhr.status, " ", xhr.statusText);
        }
      };
    });
  }

  createPost(post) {
    const div = document.createElement("div");
    div.id = "post-" + post.id;
    div.innerHTML = `
        <h4>${post.title}</h4>
        <p>${post.body}</p>`;
    div.classList.add("post");
    return div;
  }

  createPostList() {
    this.getData().then(() => {
      this.data.forEach((post) => {
        this.posts.append(this.createPost(post));
      });
    });
  }
}
