export default class Modal {
  constructor($target, type) {
    this.$target = $target;
    this.type = type;

    this.render();
  }

  render() {
    const $background = document.createElement('div');
    $background.classList.add('modal-background');

    this.$target.appendChild($background);
    if (this.type === 'prompt') {
      $background.innerHTML = `
        <div class="modal">
          <div>선택할 카드를 삭제할까요?</div>
          <div class="card-buttons">
            <button class="modal-cancel cancel">취소</button>
            <button class="modal-delete enroll">삭제</button>
          </div>
        </div>
      `;
    } else if (this.type === 'form') {
      $background.innerHTML = `
        <div class="modal">
          <input type="text" placeholder="제목을 입력해주세요"/>
          <div class="card-buttons">
            <button class="modal-cancel cancel">취소</button>
            <button class="modal-delete enroll">확인</button>
          </div>
        </div>
      `;
    }
  }
}
