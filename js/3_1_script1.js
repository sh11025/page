document.addEventListener("DOMContentLoaded", async () => {
  const sliderTrack = document.getElementById("sliderTrack");

  try {
    const response = await fetch("json/3_1_data1.json");
    if (!response.ok) throw new Error(`HTTP 에러 발생: ${response.status}`);
    const items = await response.json();

    const generateGroupHTML = (data) => {
      return data
        .map(
          (item) => `
          <a href="${item.link}" class="service-item-card">
            <!-- 썸네일 이미지 (직각) -->
            <div class="card-thumbnail">
              <img src="${item.image}" alt="${item.title}" onerror="this.onerror=null; this.src='https://placehold.co/220x165?text=Image+${item.id}'">
            </div>

            <!-- 본문 정보 -->
            <div class="card-info">
              <!-- 제목 -->
              <div class="card-title">${item.title}</div>
              
              <!-- 평점 & 리뷰 -->
              <div class="card-rating-wrap">
                <span class="star-icon">★</span>
                <span class="rating-score">${item.rating}</span>
                <span class="review-count">(${item.reviews})</span>
              </div>

              <!-- 가격 -->
              <div class="card-price-wrap">${item.price}</div>

              <!-- 하단 원형 아이콘 + 이름 (구분선 없음) -->
              <div class="card-author-wrap">
                <img class="author-avatar" src="${item.authorImg}" alt="${item.authorName}" onerror="this.onerror=null; this.src='https://placehold.co/22x22?text=U'">
                <span class="author-name">${item.authorName}</span>
              </div>
            </div>
          </a>
        `
        )
        .join("");
    };

    const groupHTML = generateGroupHTML(items);

    // 무한 롤링 트랙에 2벌 배치
    sliderTrack.innerHTML = `
      <div class="slider-group">${groupHTML}</div>
      <div class="slider-group">${groupHTML}</div>
    `;
  } catch (error) {
    console.error("데이터 로드 실패:", error);
  }
});