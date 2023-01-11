export default class AddButton {
  constructor($target) {
    this.$target = $target;
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
    const $modal = document.querySelector('.modal-background');
    const cancelBtn = document.querySelector('.modal-cancel');
    const deleteBtn = document.querySelector('.modal-delete');

    console.log($button);

    $button.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('dd');
      $modal.classList.add('block');
    });

    cancelBtn.addEventListener('click', (e) => {
      e.preventDefault();
      $modal.classList.remove('block');
    });
  }
}
