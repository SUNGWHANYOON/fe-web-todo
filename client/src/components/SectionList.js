import { addTodo, deleteSection } from '../util/api.js';
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

  this.makeSection = (element) => {
    const $main = element;
    this.state.map((sectionData, idx) => {
      new Section(
        $main,
        sectionData,
        this.onDeleteSection,
        this.onAddTodo,
        onHandleModal,
        idx
      );
    });
  };

  this.onDeleteSection = async (sectionId) => {
    const newSections = await deleteSection(sectionId);
    this.setState(newSections);
  };

  this.onAddTodo = async (sectionId) => {
    const newSections = await addTodo(sectionId, {
      title: '',
      content: '',
      type: 'new',
    });
    this.setState(newSections);
  };

  this.render = () => {
    $main.innerHTML = '';
    this.makeSection($main);
  };

  this.render();

  new AddButton({
    $target,
    onHandleModal,
  });
}
