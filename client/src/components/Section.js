import { alterTodo, todos } from '../store/todos.js';
import { SectionTemplate } from '../util/template.js';
import TodoCard from './TodoCard.js';

export default function Section(
  $target,
  initialState,
  onDeleteSection,
  onAddtodo,
  onHandleModal,
  idx
) {
  const $section = document.createElement('section');
  $target.appendChild($section);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  // 하위 컴포넌트에게 넘겨줄 함수
  this.onAlterTodo = (id, { title, content }) => {
    alterTodo(parseInt(id), { title, content });

    this.setState(todos[idx]);
  };

  // 하위 컴포넌트에게 넘겨줄 함수
  this.onDeleteTodo = (id) => {
    console.log(id);
    onHandleModal('prompt', parseInt(id));
  };

  this.makeTodoCard = () => {
    const { id, todos } = this.state;

    const $article = $target.querySelector(`.article${id}`);

    todos.map(
      (todoData) =>
        new TodoCard($article, todoData, this.onAlterTodo, this.onDeleteTodo)
    );
  };

  this.onClickHandler = () => {
    $section.addEventListener('click', (e) => {
      e.preventDefault();
      let sectionId;
      const addTodoBtn = e.target.closest('.button-add');
      const deleteSectionBtn = e.target.closest('.button-delete');

      const $sectionHeader = e.target.closest('.top-box');
      if ($sectionHeader) sectionId = parseInt($sectionHeader.dataset.id);

      if (addTodoBtn) {
        onAddtodo(sectionId);
        return;
      }

      if (deleteSectionBtn) {
        onDeleteSection(sectionId);
        return;
      }
    });
  };

  this.render = () => {
    const { id, sectionName, todos } = this.state;

    $section.innerHTML = `
      ${SectionTemplate(id, sectionName, todos)}
    `;

    this.makeTodoCard();
    this.onClickHandler();
  };

  this.render();
}
