export default class AddButton {
  constructor({ $target, onHandleModal }) {
    this.$target = $target;
    this.onHandleModal = () => {
      onHandleModal();
    };
    this.render();
  }

  render() {
    const $div = document.createElement('div');
    $div.className = 'plus-button';
    this.$target.appendChild($div);
    $div.innerHTML = `
      <span class="material-symbols-outlined big-add"> add </span>
    `;

    this.onClickHandler();
  }

  onClickHandler() {
    const $button = this.$target.querySelector('.plus-button');

    $button.addEventListener('click', (e) => {
      e.preventDefault();
      this.onHandleModal(() => {});
    });
  }
}
