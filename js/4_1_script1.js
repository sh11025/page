document.addEventListener("DOMContentLoaded", async () => {
  const stage = document.getElementById("expertStage");
  const targetSection = document.getElementById("targetSection");

  try {
    const response = await fetch("json/4_1_data1.json");
    if (!response.ok) {
      throw new Error(`HTTP 에러: ${response.status} (json 경로를 확인하세요)`);
    }
    const cardDataList = await response.json();

    // 1. 카드 렌더링
    stage.innerHTML = cardDataList
      .map((item) => {
        const tagsHtml = item.tags
          .map((tag) => `<span class="expert-tag">${tag}</span>`)
          .join("");

        return `
        <div class="expert-card" style="
          width: ${item.width}px;
          top: ${item.top};
          left: ${item.left};
          animation-delay: ${item.delay};
        ">
          <img 
            class="expert-img" 
            src="${item.image}" 
            alt="${item.name}" 
            style="width: ${item.imgSize}px; height: ${item.imgSize}px;"
            onerror="this.onerror=null; this.src='https://placehold.co/${item.imgSize}x${item.imgSize}?text=${encodeURIComponent(item.name[0])}'"
          >
          <div class="expert-name">${item.name}</div>
          <div class="expert-tags">${tagsHtml}</div>
        </div>
      `;
      })
      .join("");

    const cards = stage.querySelectorAll(".expert-card");

    // 2. Intersection Observer (화면 하단에서 50px 전에 미리 감지)
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cards.forEach((card) => card.classList.add("show"));
            observerInstance.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -50px 0px",
        threshold: 0.1
      }
    );

    if (targetSection) {
      observer.observe(targetSection);
    }

  } catch (error) {
    console.error("데이터 로드 실패:", error);
  }
});