async function getPosts() {
  try {
    const response = await fetch("/api/posts");
    const posts = await response.json();

    const container = document.getElementById("posts-container");

    container.innerHTML = posts
      .map(
        (post) => `
          <div class="post">
            <h1>${post?.title}</h1>
            <p>${post?.body}</p>
            <span class="post__author">By ${post?.author || "Unknown"}</span>
          </div>
        `
      )
      .join("");
  } catch (err) {
    console.error(err);
  }
}

getPosts();