import { addTodo, deleteSection, deleteTodo, todos } from '../store/todos.js';
import TodoCard from './TodoCard.js';

export default class SectionList {
  constructor({ $target, initialState }) {
    this.$target = $target;
    this.state = initialState;

    this.init();
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  init() {
    const $main = document.createElement('main');
    this.$target.appendChild($main);

    this.onClickHandler();
  }

  render() {
    const $main = document.querySelector('main');

    $main.innerHTML = `
      ${this.state
        .map(
          ({ id, sectionName, todos }) => `
          <section class="section" >
            <header class="top-box" data-id="${id}">
              <div class="title">
                <div class="text">${sectionName}</div>
                <div class="notice-circle">0</div>
              </div>
              <div class="buttons">
                <span class="button-add material-symbols-outlined"> add </span>
                <span class="button-delete material-symbols-outlined"> close </span>
              </div>
            </header>
            <article class="left${id}">
            </article>
          </section>
      `
        )
        .join('')}
    `;

    this.state.forEach(({ id, todos }) => {
      const $article = document.querySelector(`.left${id}`);
      this.renderTodoList($article, todos, this.onAlterTodo, this.onDeleteTodo);
    });
  }

  onHandleClassName(type) {
    return type === 'card' ? 'hidden' : '';
  }

  renderTodoList($article, todos) {
    console.log(this);
    todos.forEach(
      (todo) =>
        new TodoCard(
          $article,
          todo,
          this.onAlterTodo,
          this.onDeleteTodo.bind(this)
        )
    );
    // return `${todos
    //   .map(
    //     ({ id, title, content, type }) => `
    //     <form class="card" data-id="${id}">
    //       <div class="content">
    //         <textarea
    //           placeholder="제목을 입력하세요"
    //           class="big-text"
    //           rows="1"
    //           disabled="${type === 'card'}">
    //           ${title}
    //         </textarea>
    //         <input
    //         placeholder="내용을 입력하세요"
    //         class="middle-text"
    //         value="${content}"
    //         disabled="${type === 'card'}"
    //         >
    //         <div class="small-text ${
    //           type === 'card' ? '' : 'hidden'
    //         }">author by web</div>
    //       </div>
    //       <div class="card-buttons ${type === 'card' ? 'hidden' : ''}">
    //         <button class="cancel cancel-disabled">취소</button>
    //         <button disabled class="enroll enroll-disabled">등록</button>
    //       </div>
    //       <div class="button ${type === 'card' ? '' : 'hidden'}" >
    //         <span class="card-button-delete material-symbols-outlined">
    //           close
    //         </span>
    //       </div>
    //     </form>
    // `
    //   )
    //   .join('')}`;
  }

  onClickHandler() {
    this.$target.addEventListener('click', (e) => {
      e.preventDefault();
      const { className } = e.target;
      const firstClassName = className.split(' ')[0];

      const $section = e.target.closest(`.top-box`);
      if (!$section) return;

      const sectionId = $section.dataset.id;

      switch (firstClassName) {
        case 'button-add':
          addTodo(parseInt(sectionId), {
            title: '',
            content: '',
            type: 'form',
          });
          break;
        case 'button-delete':
          deleteSection(parseInt(sectionId));
          break;
      }

      this.setState(todos);
    });
  }

  onAlterTodo(id, { title, content }) {
    alterTodo(id, { title, content });
    this.setState(todos);
  }

  onDeleteTodo(id) {
    deleteTodo(id);
    this.setState(todos);
  }
}
