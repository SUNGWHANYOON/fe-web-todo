import { HedaerTemplate } from '../constants/template.js';

export default function Header({ $target, initialState, title }) {
  const $header = document.createElement('header');
  $target.appendChild($header);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const onClickhandler = () => {
    const notice_ul = document.querySelector('.notice');
    $header.addEventListener('click', (e) => {
      const menu_btn = e.target.closest('.menu');
      const close_btn = e.target.closest('.close');

      if (menu_btn || close_btn) {
        notice_ul.classList.toggle('hide');
      }
    });
  };

  this.render = () => {
    $header.innerHTML = `
      ${HedaerTemplate(this.state, title)}
    `;

    onClickhandler();
  };

  this.render();
}
