// 외부 파일(JSON) 로드 실패 시에도 바로 동작하는 Fallback 데이터
const DEFAULT_DATA = {
  gnb: {
    links: [
      { name: "엔터프라이즈", tag: "기업용", link: "#" },
      { name: "전문가 등록", tag: null, link: "#" },
      { name: "로그인", tag: null, link: "#" },
      { name: "회원가입", isButton: true, link: "#" }
    ]
  },
  banners: [
    { "id": 1, "img": "image/Banner_01.jpg", "link": "#" },
    { "id": 2, "img": "image/Banner_02.png", "link": "#" },
    { "id": 3, "img": "image/Banner_03.jpg", "link": "#" },
    { "id": 4, "img": "image/Banner_04.gif", "link": "#" },
    { "id": 5, "img": "image/Banner_05.jpg", "link": "#" },
    { "id": 6, "img": "image/Banner_06.png", "link": "#" },
    { "id": 7, "img": "image/Banner_07.gif", "link": "#" }
  ],
  categories: [
    { name: "오픈마켓", badge: "업종별", badgeType: "outline", img: "image/icon_01.png", link: "#" },
    { name: "F&B", badge: "업종별", badgeType: "outline", img: "image/icon_02.png", link: "#" },
    { name: "디자인", badge: "", img: "image/icon_03.svg", link: "#" },
    { name: "IT·프로그래밍", badge: "", img: "image/icon_04.svg", link: "#" },
    { name: "영상·사진·음향", badge: "", img: "image/icon_05.svg", link: "#" },
    { name: "마케팅", badge: "", img: "image/icon_06.svg", link: "#" },
    { name: "전자책", badge: "", img: "image/icon_07.svg", link: "#" },
    { name: "세무·법무·노무", badge: "", img: "image/icon_08.svg", link: "#" },
    { name: "AI 서비스", badge: "Best", badgeType: "fill", img: "image/icon_09.svg", link: "#" },
    { name: "전체보기", badge: "", img: "image/imgi_196_default.svg", link: "#" },
    { name: "번역·통역", badge: "", img: "image/icon_10.svg", link: "#" },
    { name: "주문제작", badge: "", img: "image/icon_11.svg", link: "#" },
    { name: "취업·입시", badge: "", img: "image/icon_12.svg", link: "#" },
    { name: "투잡·노하우", badge: "", img: "image/icon_13.svg", link: "#" },
    { name: "직무역량 레슨", badge: "", img: "image/icon_14.svg", link: "#" },
    { name: "운세", badge: "", img: "image/icon_15.svg", link: "#" },
    { name: "심리상담", badge: "", img: "image/icon_16.svg", link: "#" },
    { name: "취미 레슨", badge: "", img: "image/icon_17.svg", link: "#" },
    { name: "생활서비스", badge: "", img: "image/icon_18.svg", link: "#" }
  ]
};

document.addEventListener('DOMContentLoaded', async () => {
  let appData = DEFAULT_DATA;

  try {
    const res = await fetch('json/1_data.json').catch(() => fetch('data.json'));
    if (res && res.ok) {
      const jsonData = await res.json();
      appData = { ...DEFAULT_DATA, ...jsonData };
    }
  } catch (e) {
    console.log('기본 데이터로 렌더링을 진행합니다.');
  }

  // 1. 헤더 메뉴 렌더링
  renderHeader(appData.gnb);

  // 2. 우측 통이미지 배너 렌더링 및 롤링 시작
  renderBanners(appData.banners);
  initStackSlider(appData.banners.length);

  // 3. 카테고리 렌더링 호출 추가
  renderCategories(appData.categories);
}); // DOMContentLoaded 닫는 괄호 추가

// 하단 카테고리 렌더링 (전체보기 토글 지원)
function renderCategories(categories) {
  const grid = document.getElementById('categoryGrid');
  const extraGrid = document.getElementById('categoryGridExtra');
  if (!grid || !categories) return;

  const allViewIndex = categories.findIndex(cat => cat.name === '전체보기');
  const mainCategories = allViewIndex === -1 ? categories : categories.slice(0, allViewIndex + 1);
  const extraCategories = allViewIndex === -1 ? [] : categories.slice(allViewIndex + 1);

  grid.innerHTML = mainCategories
    .map(cat => renderCatItem(cat, cat.name === '전체보기'))
    .join('');

  if (extraGrid) {
    extraGrid.innerHTML = extraCategories.map(cat => renderCatItem(cat, false)).join('');
  }

  const toggleBtn = grid.querySelector('.js-toggle-all');
  if (toggleBtn && extraGrid) {
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      extraGrid.classList.toggle('show');
    });
  }
}

// 카테고리 아이템 1개 HTML 생성
function renderCatItem(cat, isToggle) {
  let badgeHTML = '';
  if (cat.badge) {
    const badgeClass = cat.badgeType === 'fill' ? 'badge-fill' : 'badge-outline';
    badgeHTML = `<span class="${badgeClass}">${cat.badge}</span>`;
  }

  return `
    <a href="${isToggle ? '#' : (cat.link || '#')}" class="cat-item${isToggle ? ' js-toggle-all' : ''}">
      <div class="cat-badge-wrap">
        ${badgeHTML}
      </div>
      <div class="cat-img-box">
        <img src="${cat.img}" alt="${cat.name}" onerror="this.src='https://placehold.co/44x44?text=${encodeURIComponent(cat.name)}'">
      </div>
      <span class="cat-name">${cat.name}</span>
    </a>
  `;
}

// GNB 렌더링
function renderHeader(gnb) {
  const nav = document.getElementById('headerNav');
  if (!nav || !gnb || !gnb.links) return;

  nav.innerHTML = gnb.links.map(item => {
    if (item.isButton) {
      return `<a href="${item.link}" class="btn-signup">${item.name}</a>`;
    }
    return `
      <a href="${item.link}" class="nav-link">
        ${item.name}
        ${item.tag ? `<span class="nav-badge-blue">${item.tag}</span>` : ''}
      </a>
    `;
  }).join('');
}

// 배너 렌더링
function renderBanners(banners) {
  const sliderWrap = document.getElementById('heroSliderWrap');
  const indicator = document.getElementById('bannerIndicator');
  if (!sliderWrap || !banners) return;

  sliderWrap.querySelectorAll('.hero-banner-card').forEach(c => c.remove());

  banners.forEach((banner, index) => {
    const card = document.createElement('a');
    card.href = banner.link || '#';
    card.className = 'hero-banner-card';
    card.dataset.index = index;

    card.innerHTML = `
      <img src="${banner.img}" alt="배너 ${banner.id}" onerror="this.src='https://placehold.co/350x280?text=Banner+${banner.id}'">
    `;

    if (indicator) {
      sliderWrap.insertBefore(card, indicator);
    } else {
      sliderWrap.appendChild(card);
    }
  });

  if (indicator) {
    indicator.innerText = `1 / ${banners.length} >`;
  }
}

// 3D 스택 슬라이더 애니메이션
function initStackSlider(totalCount) {
  if (totalCount <= 1) return;

  const cards = document.querySelectorAll('.hero-banner-card');
  const indicator = document.getElementById('bannerIndicator');
  let currentIndex = 0;

  function updateStack() {
    cards.forEach((card, index) => {
      card.classList.remove('active', 'next', 'queue', 'leave');

      if (index === currentIndex) {
        card.classList.add('active');
      } else if (index === (currentIndex + 1) % totalCount) {
        card.classList.add('next');
      } else if (index === (currentIndex - 1 + totalCount) % totalCount) {
        card.classList.add('leave');
      } else {
        card.classList.add('queue');
      }
    });

    if (indicator) {
      indicator.innerText = `${currentIndex + 1} / ${totalCount} >`;
    }
  }

  updateStack();

  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalCount;
    updateStack();
  }, 3000);
}