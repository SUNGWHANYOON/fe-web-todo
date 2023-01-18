import { ModalTemplate } from '../util/template.js';

export default function Modal({ $target, callback }) {
  const $background = document.createElement('div');
  $background.classList.add('modal-background');

  $target.appendChild($background);

  this.state = {
    type: '',
    inputData: { title: '', isConfirm: false },
  };

  this.setState = (nextState) => {
    this.state = nextState;
  };

  this.onChangeHandler = () => {
    $background.addEventListener('keyup', (e) => {
      const title = e.target.value;

      const nextState = {
        ...this.state,
        inputData: { ...this.state.inputData, title: title },
      };
      console.log(this.state);
      this.setState(nextState);
    });
  };

  this.onHandleDisplay = (type) => {
    const $modal = document.querySelector('.modal-background');
    $modal.classList.toggle('block');
  };

  this.render = () => {
    $background.innerHTML = `
      ${ModalTemplate(this.state.type)}
    `;
    this.onChangeHandler();
  };

  this.render();

  const $cancelBtn = document.querySelector('.modal-cancel');
  const $deleteBtn = document.querySelector('.modal-delete');

  $cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    this.onHandleDisplay();
  });

  $deleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    callback(this.state.inputData.title);
    this.onHandleDisplay();
  });
}
