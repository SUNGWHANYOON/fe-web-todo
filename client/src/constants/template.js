export const HeaderTemplate = (log, title) => {
  return `
      ${title}
      <span class="material-symbols-outlined menu">menu</span>
      <!-- 메뉴 클릭시 나오는 알림 창 -->
      <div class="notice hide">
        <span class="material-symbols-outlined close"> close </span>
        <div class="notice-cards">
        ${
          !log.length
            ? `<div class="notice_text">히스토리가 존재하지 않습니다</div>`
            : ""
        }
        ${log
          .map(
            ({ action, from, to, task }) => `
              <div class="card">
                <div class="emoji">😁</div>
                <div class="content">
                  <div class="middle-text">@euna</div>
                  <div class="big-text">
                    ${noticeText(action, from, to, task)} ${action}하였습니다.
                  </div>
                  <div class="small-text">1분 전</div>
                </div>
              </div>`
          )
          .join("")}
        </div>
      </div>
  `;
};

const noticeText = (action, from, to, task) => {
  switch (task) {
    case "section":
      if (action === "이동") return `${from}에서 ${to}로`;
      else return `${to}를`;
    case "todo":
      if (action === "수정") return `${from}에서 ${to}로`;
      else return `${to}를`;
  }
};

export const SectionTemplate = (id, sectionName, todos) => {
  return `
     <header class="top-box" data-id="${id}">
        <div class="title">
          <div class="text">${sectionName}</div>
          <div class="notice-circle">${todos.length}</div>
        </div>
        <div class="buttons">
          <span class="button-add material-symbols-outlined"> add </span>
          <span class="button-delete material-symbols-outlined"> close </span>
        </div>
    </header>
    <article class="article${id} droppable" data-id=${id}>
    </article>
  `;
};

export const TodoCardTemplate = (title, content) => {
  return `
    <div class="content">
      <textarea       
        disabled 
        placeholder="제목을 입력하세요"
        class="big-text"
        name="title"
        rows="1"
        >${title}</textarea>
      <textarea
        disabled 
        placeholder="내용을 입력하세요"
        class="middle-text"
        rows="1"
        name="content"
      >${content}</textarea>
      <div class="small-text">author by web</div>
      <div class="card-buttons hidden">
        <button class="cancel">취소</button>
        <button disabled class="enroll">등록</button>
      </div>
    </div>
    <div class="button">
      <span class="card-button-delete material-symbols-outlined">
        close
      </span>
      <span class="card-button-edit material-symbols-outlined">
        edit
      </span>
    </div>
  `;
};

export const ModalTemplate = (type) => {
  return `
    <div class="modal">
      ${
        type === "prompt"
          ? `
      <div>선택할 카드를 삭제할까요?</div>
      <div class="card-buttons">
        <button class="modal-cancel cancel">취소</button>
        <button class="modal-delete enroll-active ">삭제</button>
      </div>`
          : `
      <input type="text" name="text" placeholder="제목을 입력해주세요"/>
      <div class="card-buttons">
        <button class="modal-cancel cancel">취소</button>
        <button class="modal-delete enroll-active ">확인</button>
      </div>`
      }
    </div>
  `;
};
