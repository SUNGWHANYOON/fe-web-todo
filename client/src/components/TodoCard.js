import { TodoCardTemplate } from '../util/template.js';

export default function TodoCard(
  $target,
  initialState,
  onSubmit,
  onDeleteTodo
) {
  const $card = document.createElement('form');
  const cardId = initialState.id;

  $card.classList.add(`card`, `card${cardId}`);
  $card.dataset.id = `${cardId}`;

  $target.insertAdjacentElement('afterbegin', $card);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    $card.querySelector('[name=title]').value = this.state.title;
    $card.querySelector('[name=content]').value = this.state.content;

    this.activeChangeHandler($card);
  };

  this.onClickHandler = (type) => {
    $card.addEventListener('click', (e) => {
      e.preventDefault();
      let cardId;

      const submitTodoBtn = e.target.closest('.enroll');
      const alterTodoBtn = e.target.closest('.card-button-edit');
      const deleteTodoBtn = e.target.closest('.card-button-delete');
      const cancelTodoBtn = e.target.closest('.cancel');

      const $cardForm = e.target.closest('.card');

      if ($cardForm) cardId = parseInt($cardForm.dataset.id);

      if (submitTodoBtn) {
        onSubmit(cardId, this.state);
        return;
      }

      if (alterTodoBtn) {
        this.onToggleClassName($card);
        return;
      }

      if (deleteTodoBtn) {
        onDeleteTodo(cardId);
        return;
      }

      if (cancelTodoBtn) {
        if (type === 'new') this.onDelete(cardId);
        else {
          this.setState(initialState);
          this.onToggleClassName($card);
        }
      }
    });
  };

  // 카드 height 조절 함수
  this.onhandleResizeHeight = () => {
    const contentTextarea = $card.querySelector('[name=content]');
    contentTextarea.style.height = 'auto';
    contentTextarea.style.height = contentTextarea.scrollHeight + 'px';
  };

  this.onChangeHandler = () => {
    $card.addEventListener('keyup', (e) => {
      this.onhandleResizeHeight();
      const { target } = e;
      const name = target.getAttribute('name');

      if (this.state[name] !== undefined) {
        const nextState = {
          ...this.state,
          [name]: target.value,
        };
        this.setState(nextState);
      }
    });
  };

  this.onHoverHandler = () => {
    const cardDeleteBtn = $card.querySelector('.card-button-delete');

    cardDeleteBtn.addEventListener('mouseover', (e) => {
      e.preventDefault();
      $card.classList.add('card-deletable');
    });

    cardDeleteBtn.addEventListener('mouseout', (e) => {
      e.preventDefault();
      $card.classList.remove('card-deletable');
    });
  };

  this.activeChangeHandler = (element) => {
    const $card = element;
    const $enrollBtn = $card.querySelector('.enroll');

    if (this.state.title.length > 0) {
      $enrollBtn.classList.add('enroll-active');
      $enrollBtn.disabled = false;
    } else {
      $enrollBtn.classList.remove('enroll-active');
      $enrollBtn.disabled = true;
    }
  };

  this.onToggleClassName = () => {
    const $textareas = $card.querySelectorAll('textarea');
    const $smallText = $card.querySelector('.small-text');
    const $cardBtns = $card.querySelector('.card-buttons');
    const $deleteBtn = $card.querySelector('.button');
    $textareas.forEach((textarea) => (textarea.disabled = !textarea.disabled));
    $card.classList.toggle('form-active');
    $smallText.classList.toggle('hidden');
    $cardBtns.classList.toggle('hidden');
    $deleteBtn.classList.toggle('hidden');
    this.activeChangeHandler($card);
  };

  this.render = () => {
    const { title, content, type } = this.state;
    $card.innerHTML = `
      ${TodoCardTemplate(title, content)}
    `;

    if (type === 'new') this.onToggleClassName();

    this.onhandleResizeHeight();
    this.onChangeHandler();
    this.onClickHandler(type);
    this.onHoverHandler();
    // this.onDragCard($form);
  };

  this.render();

  // onDragCard = (element) => {
  //   const $card = element;

  //   $card.onmousedown = function (event) {
  //     event.preventDefault();
  //     let shiftX = event.clientX - $card.getBoundingClientRect().left;
  //     let shiftY = event.clientY - $card.getBoundingClientRect().top;

  //     $card.style.position = 'absolute';
  //     $card.style.zIndex = 1000;
  //     document.body.append($card);

  //     moveAt(event.pageX, event.pageY);

  //     function moveAt(pageX, pageY) {
  //       $card.style.left = pageX - shiftX + 'px';
  //       $card.style.top = pageY - shiftY + 'px';
  //     }

  //     let currentDroppable = document.querySelector('article');
  //     let droppableBelow = document.querySelectorAll('.droppable')[1];

  //     function onMouseMove(event) {
  //       moveAt(event.pageX, event.pageY);
  //       $card.hidden = true;
  //       let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
  //       $card.hidden = false;

  //       if (!elemBelow) return;

  //       if (currentDroppable != droppableBelow) {
  //         if (currentDroppable) {
  //         }
  //         currentDroppable = droppableBelow;
  //         if (currentDroppable) {
  //           //enterDroppable(currentDroppable);
  //         }
  //       }
  //     }

  //     document.addEventListener('mousemove', onMouseMove);

  //     $card.onmouseup = function () {
  //       document.removeEventListener('mousemove', onMouseMove);
  //       droppableBelow.appendChild($card);
  //       $card.style.position = 'static';
  //       document.body.removeChild($card);
  //       $card.onmouseup = null;
  //     };
  //   };

  //   $card.ondragstart = function () {
  //     return false;
  //   };
  // };
}
