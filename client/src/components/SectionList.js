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
    this.state.map((sectionData) => {
      new Section($main, sectionData, onHandleModal);
    });
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
