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
  }

  render() {
    const { id, title, content, type } = this.state;
    this.$target.insertAdjacentHTML(
      'afterbegin',
      `
      <form class="card ${type === 'form' && 'form-active'}" data-id="${id}">
        <div class="content">
          <textarea             
            placeholder="제목을 입력하세요"
            class="big-text"
            rows="1"
            >${title}</textarea>
          <textarea
            placeholder="내용을 입력하세요"
            class="middle-text"
          >${content}</textarea>
          <div class="small-text ${
            type === 'card' ? '' : 'hidden'
          }">author by web</div>
          <div class="card-buttons ${type === 'card' ? 'hidden' : ''}">
          <button class="cancel cancel-disabled">취소</button>
          <button class="enroll enroll-disabled">등록</button>
        </div>
        </div>
        <div class="button ${type === 'card' ? '' : 'hidden'}" >
          <span class="card-button-delete material-symbols-outlined">
            close
          </span>
        </div>
      </form>
    `
    );

    this.onChangeHandler();
    this.onClickHandler();
  }

  onChangeHandler() {
    this.$target.addEventListener('keyup', (e) => {
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

  onClickHandler() {
    this.$target.addEventListener('click', (e) => {
      e.preventDefault();
      const { className } = e.target;
      const firstClassName = className.split(' ')[0];

      const $card = e.target.closest(`.card`);

      if (!$card) return;

      const cardId = e.target.closest(`.card`).dataset.id;
      if (firstClassName === 'enroll') {
        this.onSubmit(cardId, this.state);
      } else if (
        firstClassName === 'card-button-delete' ||
        firstClassName === 'cancel'
      ) {
        this.onDelete(cardId);
      }
    });
  }
}
