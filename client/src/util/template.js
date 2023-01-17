export const HedaerTemplate = (title) => {
  return `
      ${title}
      <span class="material-symbols-outlined menu">menu</span>
      <!-- 메뉴 클릭시 나오는 알림 창 -->
      <div class="notice hide">
        <span class="material-symbols-outlined close"> close </span>
        <div class="notice-cards">
          <div class="card">
            <div class="emoji">🥰</div>
            <div class="content">
              <div class="middle-text">@sam</div>
              <div class="big-text">
                HTML/CSS공부하기를 해야할 일에서 하고 있는 일로 이동하였습니다.
              </div>
              <div class="small-text">1분 전</div>
            </div>
          </div>
          <div class="card">
            <div class="emoji">🥰</div>
            <div class="content">
              <div class="middle-text">@sam</div>
              <div class="big-text">
                HTML/CSS공부하기를 해야할 일에서 하고 있는 일로 이동하였습니다.
              </div>
              <div class="small-text">1분 전</div>
            </div>
          </div>
        </div>
      </div>
  `;
};
