import {
  addTodo,
  deleteSection,
  deleteTodo,
  alterTodo,
  todos,
  addSection,
} from '../store/todos.js';
import AddButton from './AddButton.js';
import Section from './Section.js';

export default function SectionList({ $target, initialState, onHandleModal }) {
  const $main = document.createElement('main');
  $target.appendChild($main);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.onAddSection = (title) => {
    addSection(title);
    this.setState(todos);
  };

  this.makeSection = (element) => {
    const $main = element;
    this.state.map((sectionData, idx) => {
      new Section(
        $main,
        sectionData,
        this.onDeleteSection,
        this.onAddTodo,
        idx
      );
    });
  };

  this.onDeleteSection = (sectionId) => {
    deleteSection(sectionId);
    this.setState(todos);
  };

  this.onAddTodo = (sectionId) => {
    addTodo(sectionId, {
      title: '',
      content: '',
      type: 'new',
    });
    this.setState(todos);
  };

  this.render = () => {
    $main.innerHTML = '';

    this.makeSection($main);
    //onHandleModal(this.setNewSectionTitle);
  };

  this.render();

  new AddButton({
    $target,
    onHandleModal,
  });
}
