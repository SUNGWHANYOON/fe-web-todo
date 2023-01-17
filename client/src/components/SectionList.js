import {
  addTodo,
  deleteSection,
  deleteTodo,
  alterTodo,
  todos,
} from '../store/todos.js';
import Modal from './Modal.js';
import TodoCard from './TodoCard.js';

export default class SectionList {
  constructor({ $target, initialState, onHandleModal }) {
    this.$target = $target;
    this.state = initialState;
    this.onHandleModal = (callback) => {
      onHandleModal(callback);
    };

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
                <div class="notice-circle">${todos.length}</div>
              </div>
              <div class="buttons">
                <span class="button-add material-symbols-outlined"> add </span>
                <span class="button-delete material-symbols-outlined"> close </span>
              </div>
            </header>
            <article class="left${id} droppable">
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

    this.onClickHandler();
  }

  renderTodoList($article, todos) {
    todos.forEach(
      (todo) =>
        new TodoCard(
          $article,
          todo,
          this.onAlterTodo.bind(this),
          this.onDeleteTodo.bind(this)
        )
    );
  }

  onClickHandler() {
    const $sectionHeaderArr = this.$target.querySelectorAll('.top-box');

    $sectionHeaderArr.forEach(($sectionHeader) => {
      $sectionHeader.addEventListener('click', (e) => {
        const $a = e.target.closest('.section');
        e.preventDefault();
        const { className } = e.target;
        const firstClassName = className.split(' ')[0];
        const sectionId = $sectionHeader.dataset.id;

        switch (firstClassName) {
          case 'button-add':
            addTodo(parseInt(sectionId), {
              title: '',
              content: '',
              type: 'new',
            });
            break;
          case 'button-delete':
            deleteSection(parseInt(sectionId));
            break;
        }
        this.setState(todos);
      });
    });
  }

  onAlterTodo(id, { title, content }) {
    alterTodo(parseInt(id), { title, content });
    this.setState(todos);
  }

  onDeleteTodo(id) {
    this.onHandleModal(() => {
      deleteTodo(parseInt(id));
      this.setState(todos);
    });
  }
}
