export default class TodoCard {
  constructor($target, initialState, onSubmit, onDeleteTodo) {
    this.$target = $target;
    this.state = initialState;
    this.onSubmit = (id, { title, content }) => {
      onSubmit(id, { title, content });
    };
    this.onDelete = (id) => {
      onDeleteTodo(id);
    };

    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.$target.querySelector('[name=title]').value = this.state.title;
    this.$target.querySelector('[name=content]').value = this.state.content;

    this.activeChangeHandler();
  }

  render() {
    const { id, title, content } = this.state;
    this.$target.insertAdjacentHTML(
      'afterbegin',
      `
      <form class="card card${id}" data-id="${id}">
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
            name="content"
          >${content}</textarea>
          <div class="small-text">author by web</div>
          <div class="card-buttons hidden">
            <button class="cancel">취소</button>
            <button disabled class="enroll">등록</button>
          </div>
        </div>
        <div class="button">
          <span class="card-button-edit material-symbols-outlined">
            edit
          </span>
          <span class="card-button-delete material-symbols-outlined">
            close
          </span>
        </div>
      </form>
    `
    );

    const $form = document.querySelector(`.card${id}`);

    this.onChangeHandler($form);
    this.onClickHandler($form);
  }

  onChangeHandler(element) {
    const $form = element;
    $form.addEventListener('keyup', (e) => {
      const { target } = e;
      const name = target.getAttribute('name');

      if (this.state[name] !== undefined) {
        const nextState = {
          ...this.state,
          [name]: target.value,
        };
        this.setState(nextState);
      }
    });
  }

  onClickHandler(element) {
    const $form = element;
    $form.addEventListener('click', (e) => {
      e.preventDefault();
      const { className } = e.target;
      const firstClassName = className.split(' ')[0];

      const $card = e.target.closest(`.card`);
      if (!$card) return;

      const cardId = $card.dataset.id;
      if (firstClassName === 'enroll') {
        this.onSubmit(cardId, this.state);
        this.onToggleClassName($form);
      } else if (firstClassName === 'card-button-edit') {
        this.onToggleClassName($form);
      } else if (
        firstClassName === 'card-button-delete' ||
        firstClassName === 'cancel'
      ) {
        this.onDelete(cardId);
      }
    });
  }

  activeChangeHandler() {
    const $enrollBtn = document.querySelector('.enroll');

    if (this.state.title.length > 0) {
      $enrollBtn.classList.add('enroll-active');
      $enrollBtn.disabled = false;
    } else {
      $enrollBtn.classList.remove('enroll-active');
      $enrollBtn.disabled = true;
    }
  }

  onToggleClassName(element) {
    const $form = element;
    const $textareas = $form.querySelectorAll('textarea');
    const $smallText = $form.querySelector('.small-text');
    const $cardBtns = $form.querySelector('.card-buttons');
    const $deleteBtn = $form.querySelector('.button');

    console.log($deleteBtn);

    $textareas.forEach((textarea) => (textarea.disabled = !textarea.disabled));
    $form.classList.toggle('form-active');
    $smallText.classList.toggle('hidden');
    $cardBtns.classList.toggle('hidden');
    $deleteBtn.classList.toggle('hidden');
  }
}
