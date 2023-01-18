export default function AddButton({ $target, onHandleModal }) {
  const $button = document.createElement('button');
  $button.className = 'plus-button';
  $target.appendChild($button);

  this.render = () => {
    $button.innerHTML = `
      <span class="material-symbols-outlined big-add"> add </span>
    `;
  };

  this.render();

  this.newSectionTitle = '';
  this.setNewSectionTitle = (title) => {
    newSectionTitle = title;
  };

  $button.addEventListener('click', (e) => {
    e.preventDefault();
    onHandleModal('input', null);
  });
}
