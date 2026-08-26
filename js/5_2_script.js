document.addEventListener("DOMContentLoaded", async () => {
  const track = document.getElementById("reviewTrack");

  try {
    const response = await fetch("json/5_2_data.json");
    if (!response.ok) throw new Error(`HTTP 에러 발생: ${response.status}`);
    const reviews = await response.json();

    // 개별 카드 템플릿 생성
    const createCardsHTML = (data) => {
      return data
        .map(
          (item) => `
        <div class="review-card">
          <div class="review-header">
            <img 
              class="review-profile-img" 
              src="${item.profileImg}" 
              alt="${item.name}" 
              onerror="this.onerror=null; this.src='https://placehold.co/48x48?text=${encodeURIComponent(item.name[0])}'"
            >
            <div>
              <div class="review-author-name">${item.name}</div>
              <div class="review-author-role">${item.role}</div>
            </div>
          </div>
          <div class="review-content">${item.content}</div>
        </div>
      `
        )
        .join("");
    };

    const cardsHtml = createCardsHTML(reviews);

    // 무한 롤링이 끊김 없이 반복되도록 2세트를 복제 주입
    track.innerHTML = `
      <div class="review-group">${cardsHtml}</div>
      <div class="review-group">${cardsHtml}</div>
    `;
  } catch (error) {
    console.error("리뷰 데이터 로드 실패:", error);
  }
});