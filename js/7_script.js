document.addEventListener("DOMContentLoaded", async () => {
  const footer = document.getElementById("siteFooter");

  try {
    const res = await fetch("json/7_data.json");
    if (!res.ok) throw new Error(`HTTP 에러 발생: ${res.status}`);
    const data = await res.json();

    // 1. 메뉴 그리드 HTML
    const navGridHtml = data.menus
      .map(
        (group) => `
        <div class="nav-column">
          <h4 class="nav-title">${group.title}</h4>
          <ul class="nav-list">
            ${group.links
              .map((link) => `<li><a href="${link.url}" class="nav-link">${link.name}</a></li>`)
              .join("")}
          </ul>
        </div>
      `
      )
      .join("");

    // 2. 이용약관 HTML
    const termsHtml = data.terms
      .map((term) => `<a href="${term.url}" class="term-link ${term.bold ? "bold" : ""}">${term.name}</a>`)
      .join("");

    // 3. 앱 스토어 배지 HTML
    const appsHtml = data.apps
      .map(
        (app) => `
        <a href="${app.url}" class="app-btn" target="_blank">
          <img src="${app.img}" alt="${app.name}" onerror="this.style.display='none'">
        </a>
      `
      )
      .join("");

    // 4. SNS 아이콘 HTML
    const snsHtml = data.sns
      .map(
        (sns) => `
        <a href="${sns.url}" class="sns-btn" target="_blank">
          <img src="${sns.img}" alt="${sns.name}" onerror="this.style.display='none'">
        </a>
      `
      )
      .join("");

    footer.innerHTML = `
      <div class="footer-container">
        
        <!-- 상단 고객센터 및 네비게이션 -->
        <div class="footer-top">
          <div class="footer-cs-area">
            <div class="cs-btn-wrap">
              <a href="#" class="btn-cs">${data.cs.btnHelp}</a>
              <a href="#" class="btn-cs">${data.cs.btnSeller}</a>
            </div>
            <div class="cs-info">
              <p>${data.cs.hours}</p>
              <p class="notice-bold">${data.cs.notice1}</p>
              <p class="notice-bold">${data.cs.notice2}</p>
            </div>
          </div>

          <div class="footer-nav-grid">
            ${navGridHtml}
          </div>
        </div>

        <!-- 약관 링크 -->
        <div class="footer-terms">
          ${termsHtml}
        </div>

        <!-- 브랜드 로고, 인증, 앱/SNS 다운로드 -->
        <div class="footer-mid">
          <div class="brand-cert-wrap">
            <img class="footer-logo" src="${data.brand.logo}" alt="kmong" onerror="this.src='https://placehold.co/100x24?text=kmong'">
            <div class="cert-badges">
              <img src="${data.brand.isms}" alt="ISMS 인증" onerror="this.style.display='none'">
              <img src="${data.brand.iso}" alt="ISO 인증" onerror="this.style.display='none'">
            </div>
          </div>

          <div class="apps-sns-wrap">
            <div class="app-badges">${appsHtml}</div>
            <div class="sns-icons">${snsHtml}</div>
          </div>
        </div>

        <!-- 하단 사업자 정보 및 카피라이트 -->
        <div class="footer-bottom">
          <p class="company-info">${data.company.businessInfo}</p>
          <p class="copyright">${data.company.copyright}</p>
        </div>

      </div>
    `;
  } catch (error) {
    console.error("푸터 데이터 로드 실패:", error);
  }
});