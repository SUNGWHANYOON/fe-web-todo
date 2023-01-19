import { ModalTemplate } from '../constants/template.js';
import { addSection, deleteTodo, fetchSections } from '../util/api.js';

export default function Modal({ $target, setAppState }) {
  const $background = document.createElement('div');
  $background.classList.add('modal-background');

  $target.appendChild($background);

  this.state = {
    type: null,
    title: '',
    cardId: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
  };

  this.onChangeHandler = () => {
    $background.addEventListener('keyup', (e) => {
      const title = e.target.value;
      const nextState = {
        ...this.state,
        title,
      };
      this.setState(nextState);
    });
  };

  this.onClickHandler = () => {
    const $cancelBtn = $background.querySelector('.modal-cancel');
    const $deleteBtn = $background.querySelector('.modal-delete');

    $cancelBtn.addEventListener('click', (e) => {
      e.preventDefault();
      $background.classList.toggle('block');
    });

    $deleteBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const { type, title, cardId } = this.state;
      let newSections = await fetchSections();

      switch (type) {
        case 'input':
          newSections = await addSection(title);
          break;
        case 'prompt':
          newSections = await deleteTodo(cardId);
          break;
      }

      setAppState(newSections);
      $background.classList.toggle('block');
    });
  };

  // type: input / prompt
  this.render = () => {
    const { type } = this.state;

    if (type) {
      $background.innerHTML = `
        ${ModalTemplate(type)}
      `;
      this.onClickHandler();
    }

    if (type === 'input') this.onChangeHandler();
  };

  this.render();

  // 다른 컴포넌트가 사용하는 함수
  this.onHandleDisplay = (type, cardId) => {
    this.setState({ ...this.state, type, cardId });
    this.render();
    $background.classList.toggle('block');
  };
}
