import { alterTodo } from '../util/api.js';
import { SectionTemplate } from '../constants/template.js';
import TodoCard from './TodoCard.js';
import { store } from '../store/index.js';

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
  this.onAlterTodo = async (id, { title, content }) => {
    const newSections = await alterTodo(parseInt(id), { title, content });
    this.setState(newSections[idx]);
  };

  // 하위 컴포넌트에게 넘겨줄 함수
  this.onDeleteTodo = (id) => {
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
        store.dispach({ type: 'DEL_SECTION', sectionId });
        //onDeleteSection(sectionId);
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
  };

  this.render();
  this.onClickHandler();
}
