document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("stepGrid");

  try {
    const response = await fetch("json/4_2_data.json");
    if (!response.ok) throw new Error(`HTTP 에러 발생: ${response.status}`);
    const data = await response.json();

    container.innerHTML = data
      .map(
        (item) => `
        <div class="step-item">
          <div class="step-img-box">
            <img 
              src="${item.image}" 
              alt="${item.title}" 
              onerror="this.onerror=null; this.src='https://placehold.co/180x180?text=Step+${item.id}'"
            >
          </div>
          <h3 class="step-title">${item.title}</h3>
          <p class="step-desc">${item.description}</p>
        </div>
      `
      )
      .join("");
  } catch (error) {
    console.error("데이터 로드 실패:", error);
  }
});