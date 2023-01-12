export default class TodoCard {
  constructor($target, initialState, onSubmit, onDeleteTodo) {
    this.$target = $target;
    this.initialState = initialState;
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
    const $card = this.$target.querySelector(`.card${this.state.id}`);

    $card.querySelector('[name=title]').value = this.state.title;
    $card.querySelector('[name=content]').value = this.state.content;

    this.activeChangeHandler($card);
  }

  render() {
    const { id, title, content, type } = this.state;
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
    if (type === 'new') this.onToggleClassName($form);

    this.onhandleResizeHeight($form);
    this.onChangeHandler($form);
    this.onClickHandler($form, type);
    this.onHoverHandler($form);
  }

  onChangeHandler(element) {
    const $form = element;

    $form.addEventListener('keyup', (e) => {
      this.onhandleResizeHeight($form);
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

  onClickHandler(element, type) {
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
      } else if (firstClassName === 'card-button-edit') {
        this.onToggleClassName($form);
      } else if (firstClassName === 'card-button-delete') {
        this.onDelete(cardId);
      } else if (firstClassName === 'cancel') {
        if (type === 'new') this.onDelete(cardId);
        else {
          this.setState(this.initialState);
          this.onToggleClassName($form);
        }
      }
    });
  }

  onHoverHandler(element) {
    const $form = element;
    const cardDeleteBtn = $form.querySelector('.card-button-delete');

    cardDeleteBtn.addEventListener('mouseover', (e) => {
      e.preventDefault();
      const $card = e.target.closest('.card');
      $card.classList.add('card-deletable');
    });

    cardDeleteBtn.addEventListener('mouseout', (e) => {
      e.preventDefault();
      const $card = e.target.closest('.card');
      $card.classList.remove('card-deletable');
    });
  }

  activeChangeHandler(element) {
    const $card = element;
    const $enrollBtn = $card.querySelector('.enroll');

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
    $textareas.forEach((textarea) => (textarea.disabled = !textarea.disabled));
    $form.classList.toggle('form-active');
    $smallText.classList.toggle('hidden');
    $cardBtns.classList.toggle('hidden');
    $deleteBtn.classList.toggle('hidden');
    this.activeChangeHandler($form);
  }

  onhandleResizeHeight = (element) => {
    const $form = element;
    const contentTextarea = $form.querySelector('[name=content]');
    contentTextarea.style.height = 'auto';
    contentTextarea.style.height = contentTextarea.scrollHeight + 'px';
  };
}
