export default class Modal {
  constructor($target, type, onClick) {
    this.$target = $target;
    this.type = type;
    this.onClick = () => {
      onClick();
    };
    this.render();
  }

  render() {
    const $background = document.createElement('div');
    $background.classList.add('modal-background');

    this.$target.appendChild($background);

    $background.innerHTML = `
        <div class="modal">
          ${
            this.type === 'prompt'
              ? `
          <div>선택할 카드를 삭제할까요?</div>
          <div class="card-buttons">
            <button class="modal-cancel cancel">취소</button>
            <button class="modal-delete enroll-active ">삭제</button>
          </div>`
              : `
          <input type="text" placeholder="제목을 입력해주세요"/>
          <div class="card-buttons">
            <button class="modal-cancel cancel">취소</button>
            <button class="modal-delete enroll-active ">확인</button>
          </div>`
          }
        </div>
    
    `;

    const $cancelBtn = document.querySelector('.modal-cancel');
    const $deleteBtn = document.querySelector('.modal-delete');

    $cancelBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.onHandleDisplay();
    });

    $deleteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.onClick();
      this.onHandleDisplay();
    });
  }

  onHandleDisplay() {
    const $modal = document.querySelector('.modal-background');
    $modal.classList.toggle('block');
  }

  onRemoveEventListener() {
    const $cancelBtn = document.querySelector('.modal-cancel');
    const $deleteBtn = document.querySelector('.modal-delete');
    $cancelBtn.removeEventListener('click');
  }

  setOnClick(callback) {
    this.onHandleDisplay();
    this.onClick = callback;
  }
}
