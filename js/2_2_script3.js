document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("grid-trend");

  fetch("json/2_2_data3.json")
    .then((res) => {
      if (!res.ok) throw new Error("데이터 3 로드 실패");
      return res.json();
    })
    .then((data) => {
      container.innerHTML = data
        .map(
          (item) => `
          <a href="${item.link}" class="service-item">
            <div class="image-box">
              <img src="${item.image}" alt="${item.title}" onerror="this.src='https://placehold.co/240x180?text=Image'">
            </div>
            <span class="item-title">${item.title}</span>
          </a>
        `
        )
        .join("");
    })
    .catch((err) => console.error(err));
});