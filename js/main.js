// 抑止系
document.addEventListener("contextmenu", e => e.preventDefault());
["copy", "cut", "paste"].forEach(e =>
  document.addEventListener(e, ev => ev.preventDefault())
);

// 合言葉
const pass = prompt("合言葉を入れてぺん");
if (pass !== "suzume") {
  document.body.innerHTML = "入れないぺん";
  throw new Error("blocked");
}

// ボタン
document.getElementById("backBtn")?.addEventListener("click", () => {
  location.href = "index.html";
});

document.getElementById("fsBtn")?.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// URL取得
const params = new URLSearchParams(location.search);
const articleId = params.get("id");

// 透かし
function addWatermark(slide) {
  const wm = document.createElement("div");
  wm.className = "watermark";
  wm.textContent = "© Suzume / 無断転載禁止";
  slide.appendChild(wm);
}

// 記事読み込み
fetch("articles.json")
  .then(res => res.json())
  .then(articles => {
    const article = articles.find(a => a.id === articleId);
    if (!article) {
      document.body.innerHTML = "記事が見つからないぺん";
      return;
    }

    document.getElementById("article-title").textContent = article.title;
    const container = document.getElementById("carousels");

    article.categories.forEach(catName => {
      const h3 = document.createElement("h3");
      h3.textContent = catName;
      h3.className = "category-title";
      container.appendChild(h3);

      const swiper = document.createElement("div");
      swiper.className = "swiper";

      const wrapper = document.createElement("div");
      wrapper.className = "swiper-wrapper";
      swiper.appendChild(wrapper);

      const pagination = document.createElement("div");
      pagination.className = "swiper-pagination";
      swiper.appendChild(pagination);

      const prev = document.createElement("div");
      prev.className = "swiper-button-prev";
      const next = document.createElement("div");
      next.className = "swiper-button-next";
      swiper.appendChild(prev);
      swiper.appendChild(next);

      container.appendChild(swiper);

      for (let i = 1; i <= 20; i++) {
        const img = new Image();
        img.src = `images/${articleId}/${catName}/${i}.png`;
        img.onload = () => {
          const slide = document.createElement("div");
          slide.className = "swiper-slide";
          slide.appendChild(img);
          addWatermark(slide);
          wrapper.appendChild(slide);
        };
      }

      setTimeout(() => {
        new Swiper(swiper, {
          loop: false,
          pagination: { el: pagination, clickable: true },
          navigation: {
            nextEl: next,
            prevEl: prev
          }
        });
      }, 300);
    });
  });
