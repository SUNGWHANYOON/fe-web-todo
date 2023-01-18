import { HedaerTemplate } from '../util/template.js';

export default function Header({ $target, title }) {
  const $header = document.createElement('header');
  $target.appendChild($header);

  this.render = () => {
    $header.innerHTML = `
      ${HedaerTemplate(title)}
    `;
  };

  this.render();

  const notice_ul = document.querySelector('.notice');
  $header.addEventListener('click', (e) => {
    const menu_btn = e.target.closest('.menu');
    const close_btn = e.target.closest('.close');

    if (menu_btn || close_btn) {
      notice_ul.classList.toggle('hide');
    }
  });
}
