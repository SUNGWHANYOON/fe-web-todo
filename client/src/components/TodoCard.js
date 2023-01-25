import { TodoCardTemplate } from '../constants/template.js';
import { store } from '../store/index.js';
import { getClosest } from '../util/dom.js';

export default function TodoCard(
  $target,
  initialState,
  onSubmit,
  onDeleteTodo
) {
  const $card = document.createElement('form');
  $target.insertAdjacentElement('afterbegin', $card);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    $card.querySelector('[name=title]').value = this.state.title;
    $card.querySelector('[name=content]').value = this.state.content;

    this.activeChangeHandler();
  };

  this.onClickHandler = (type) => {
    $card.addEventListener('click', (e) => {
      e.preventDefault();
      const { target } = e;
      let cardId;

      const submitTodoBtn = getClosest(target, '.enroll');
      const alterTodoBtn = getClosest(target, '.card-button-edit');
      const deleteTodoBtn = getClosest(target, '.card-button-delete');
      const cancelTodoBtn = getClosest(target, '.cancel');

      const $cardForm = getClosest(target, '.card');

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
        if (type === 'new') onDeleteTodo(cardId);
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

  this.activeChangeHandler = () => {
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
    this.activeChangeHandler();
  };

  this.onDragCard = (element) => {
    const $card = element;
    let $currentColunm = $target;
    const DELAY = 500;
    let timer = null;
    let isPressed = false;

    $card.addEventListener('mousedown', (e) => {
      isPressed = true;
      timer = setTimeout(() => {
        holding();
      }, DELAY);

      function holding() {
        if (timer) {
          clearTimeout(timer);
        }

        if (isPressed) {
          let shiftX = e.clientX - $card.getBoundingClientRect().left;
          let shiftY = e.clientY - $card.getBoundingClientRect().top;

          const $newCard = $card.cloneNode(true);
          $card.classList.add('card-dragged');

          $newCard.classList.add('card-dragging');
          $newCard.style.position = 'absolute';
          $newCard.style.zIndex = 1000;

          document.body.append($newCard);
          moveAt(e.pageX, e.pageY);

          function moveAt(pageX, pageY) {
            $newCard.style.left = pageX - shiftX + 'px';
            $newCard.style.top = pageY - shiftY + 'px';
          }

          let $droppableBelow = null;
          let $droppableCard = null;

          function onMouseMove(e) {
            moveAt(e.pageX, e.pageY);
            $newCard.style.display = 'none';
            let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
            $newCard.style.display = 'flex';
            if (!elemBelow) return;
            $droppableBelow = elemBelow.closest('.droppable');
            $droppableCard = elemBelow.closest('form');
          }

          function onMouseUp(e) {
            console.log('마우스 업!');
            const fromId = $card.dataset.id;
            let sectionId = null;
            let cardId = null;

            if ($droppableCard && $droppableBelow) {
              cardId = $droppableCard.dataset.id;
              sectionId = $droppableBelow.dataset.id;
              if(cardId === $newCard.dataset.id){
                document.body.removeChild($newCard);
                $card.classList.remove("card-dragged");
              }
              else{
                store.dispach({
                  type: 'MOV_TODO',
                  fromId: fromId,
                  toId: cardId,
                  sectionId,
                });
                document.body.removeChild($newCard);
                $currentColunm.removeChild($card);
              }
            } else if ($droppableBelow) {
              sectionId = $droppableBelow.dataset.id;
              store.dispach({
                type: 'MOV_TODO',
                fromId: fromId,
                toId: null,
                sectionId,
              });
              document.body.removeChild($newCard);
              $currentColunm.removeChild($card);
            } else {
              document.body.removeChild($newCard);
              $card.classList.remove('card-dragged');
            }

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
          }

          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);

          // 기본 드래그 api 해제
          $newCard.ondragstart = function () {
            return false;
          };
        }
      }

      document.addEventListener('mouseup', () => {
        isPressed = false;
        document.removeEventListener('mouseup', () => {
          isPressed = false;
        });
      });
    });
  };

  this.render = () => {
    const { id, title, content, type } = this.state;

    $card.classList.add(`card`, `card${id}`);
    $card.dataset.id = `${id}`;

    $card.innerHTML = `
      ${TodoCardTemplate(title, content)}
    `;

    if (type === 'new') this.onToggleClassName();

    this.onhandleResizeHeight();
    this.onDragCard($card);
    this.onChangeHandler();
    this.onClickHandler(type);
    this.onHoverHandler();
  };

  this.render();
}
