// 웹페이지가 완전히 로드되고 준비되면 내부 코드를 실행합니다[cite: 3].
document.addEventListener('DOMContentLoaded', () => {
  
  // fetch 함수를 이용해 json 폴더 안에 있는 data1.json 파일을 서버로부터 가져옵니다[cite: 3].
  fetch('json/2_1_data1.json')
    .then(response => {
      // 서버 응답에 문제가 있으면 에러를 발생시킵니다[cite: 3].
      if (!response.ok) {
        throw new Error('첫 번째 데이터 네트워크 응답에 문제가 있습니다.');
      }
      // 가져온 파일을 자바스크립트가 다루기 좋은 객체 형태(JSON)로 변환합니다[cite: 3].
      return response.json();
    })
    .then(data => {
      // 변환이 완료된 데이터(data)를 화면에 그려주는 함수(renderSection1)로 전달합니다[cite: 3].
      renderSection1(data);
    })
    .catch(error => {
      // 데이터를 불러오지 못했을 때 에러 메시지를 콘솔에 띄웁니다[cite: 3].
      console.error('데이터1 로딩 에러:', error);
    });
});

// 데이터를 받아와 HTML 태그를 조립하고 화면에 렌더링하는 함수입니다[cite: 3].
function renderSection1(marketData) {
  // HTML 문서에서 id가 'app-1'인 요소를 찾아 도화지(변수)로 지정합니다[cite: 3].
  const appDiv = document.getElementById('app-1');
  let htmlContent = '';

  // JSON 데이터 배열을 하나씩 순회(돌면서)하며 HTML 코드를 만들어냅니다[cite: 3].
  marketData.forEach(section => {
    
    // 1. 태그 버튼들의 HTML을 반복문(map)으로 생성합니다[cite: 3].
    const tagsHtml = section.tags.map(tag => `
      <div class="tag-btn">
        <span>${tag}</span>
        <span class="plus">+</span>
      </div>
    `).join(''); // 만든 버튼들을 하나의 긴 문자열로 합칩니다.

    // 2. 상품 카드들의 HTML을 반복문(map)으로 생성합니다[cite: 3].
    const itemsHtml = section.items.map(item => `
      <div class="item-card">
        <img src="${item.thumbnail}" alt="${item.title}" class="item-thumbnail">
        <!-- isPrime이 참(true)일 때만 prime 뱃지 코드를 넣고, 아니면 빈 문자열('')을 넣습니다 -->
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
    `).join(''); // 만든 카드들을 하나의 긴 문자열로 합칩니다.

    // 3. 위에서 만든 태그와 상품 목록을 전체 카테고리 구조 안에 조합합니다[cite: 3].
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

  // 완성된 HTML 코드를 'app-1' 영역 안쪽에 채워 넣습니다[cite: 3].
  appDiv.innerHTML = htmlContent;
}