fetch("articles.json")
  .then(res => res.json())
  .then(articles => {
    const list = document.getElementById("article-list");

    articles.forEach(a => {
      const li = document.createElement("li");
      const link = document.createElement("a");

      link.href = `article.html?id=${a.id}`;
      link.textContent = a.title;

      li.appendChild(link);
      list.appendChild(li);
    });
  });
