document.addEventListener('DOMContentLoaded', () => {
  // 두 번째 JSON 파일(data2.json)을 불러옵니다[cite: 3].
  fetch('json/2_1_data2.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('두 번째 데이터 네트워크 응답에 문제가 있습니다.');
      }
      return response.json();
    })
    .then(data => {
      renderSection2(data);
    })
    .catch(error => {
      console.error('데이터2 로딩 에러:', error);
    });
});

function renderSection2(marketData) {
  // 'app-2' 도화지를 타겟으로 잡습니다[cite: 3].
  const appDiv = document.getElementById('app-2');
  let htmlContent = '';

  marketData.forEach(section => {
    const tagsHtml = section.tags.map(tag => `
      <div class="tag-btn">
        <span>${tag}</span>
        <span class="plus">+</span>
      </div>
    `).join('');

    const itemsHtml = section.items.map(item => `
      <div class="item-card">
        <img src="${item.thumbnail}" alt="${item.title}" class="item-thumbnail">
        ${item.isPrime ? '<span class="badge-prime">prime</span>' : ''}
        <h3 class="item-title">${item.title}</h3>
        <div class="item-rating">
          <span class="star-icon">★</span>
          <span class="rating-score">${item.rating}</span>
          <span class="rating-count">(${item.reviewCount})</span>
        </div>
        <div class="item-price">${item.price}<span>원~</span></div>
        <div class="item-provider">
          <img src="${item.providerImg}" alt="${item.providerName}" class="provider-img">
          <span class="provider-name">${item.providerName}</span>
        </div>
      </div>
    `).join('');

    htmlContent += `
      <section class="category-section">
        <h2 class="section-title">${section.title}</h2>
        <div class="section-content">
          <div class="tags-container">
            ${tagsHtml}
          </div>
          <div class="item-grid">
            ${itemsHtml}
          </div>
        </div>
      </section>
    `;
  });

  // 완성된 내용을 app-2에 렌더링합니다[cite: 3].
  appDiv.innerHTML = htmlContent;
}