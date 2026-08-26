document.addEventListener("DOMContentLoaded", async () => {
  const bannerSection = document.getElementById("enterpriseBanner");

  try {
    const response = await fetch("json/6_4_data.json");
    if (!response.ok) throw new Error(`HTTP 에러 발생: ${response.status}`);
    const data = await response.json();

    const featureItemsHtml = data.features
      .map(
        (text) => `
        <li class="feature-item">
          <svg class="check-icon" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.2 14.6l-4.2-4.2 1.41-1.41 2.79 2.79 6.79-6.79 1.41 1.41-8.2 8.2z"/>
          </svg>
          <span>${text}</span>
        </li>
      `
      )
      .join("");

    bannerSection.innerHTML = `
      <div class="banner-container">
        <div class="banner-content">
          <h2 class="banner-title">${data.title}</h2>
          <ul class="feature-list">
            ${featureItemsHtml}
          </ul>
          <a href="${data.btnLink}" class="btn-enterprise">${data.btnText}</a>
        </div>
      </div>
      <div class="banner-building-wrap">
        <img 
          src="${data.buildingImg}" 
          alt="빌딩 일러스트" 
          onerror="this.onerror=null; this.src='image/building.jpg';"
        >
      </div>
    `;
  } catch (error) {
    console.error("배너 데이터 로드 실패:", error);
  }
});