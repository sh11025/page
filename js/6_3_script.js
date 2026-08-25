document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("tipsGrid");

  try {
    const response = await fetch("json/6_3_data.json");
    if (!response.ok) throw new Error(`HTTP 에러 발생: ${response.status}`);
    const tipList = await response.json();

    container.innerHTML = tipList
      .map(
        (item) => `
        <div class="tip-card">
          <div class="tip-banner">
            <img 
              src="${item.image}" 
              alt="${item.title}" 
              onerror="this.onerror=null; this.src='https://placehold.co/380x275?text=${encodeURIComponent(item.title)}'"
            >
          </div>
          <h3 class="tip-title">${item.title}</h3>
          <p class="tip-desc">${item.description}</p>
          <a href="${item.btnLink}" class="tip-btn">${item.btnText}</a>
        </div>
      `
      )
      .join("");
  } catch (error) {
    console.error("데이터 로드 실패:", error);
  }
});