import {
  addTodo,
  deleteSection,
  deleteTodo,
  alterTodo,
  todos,
} from '../store/todos.js';
import { SectionTemplate } from '../util/template.js';
import Section from './Section.js';
import TodoCard from './TodoCard.js';

export default function SectionList({ $target, initialState, onHandleModal }) {
  const $main = document.createElement('main');
  $target.appendChild($main);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
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

  this.onHandleModal = (callback) => {
    onHandleModal(callback);
  };

  this.render = () => {
    $main.innerHTML = '';
    this.makeSection($main);
  };

  this.render();
}
