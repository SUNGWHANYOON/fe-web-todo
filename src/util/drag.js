const cardArr = document.querySelectorAll('.card');

const card1 = cardArr[0];
const card2 = cardArr[1];

card1.addEventListener('mousedown', (e) => {
  let shiftX = e.clientX - card1.getBoundingClientRect().left;
  let shiftY = e.clientY - card1.getBoundingClientRect().top;

  console.log('mousedown');
  card1.style.position = 'absolute';
  card1.style.zIndex = 1000;
  document.body.append(card1);

  function moveAt(pageX, pageY) {
    card1.style.left = pageX - shiftX + 'px';
    card1.style.top = pageY - shiftY + 'px';
  }
  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }
  document.addEventListener('mousemove', onMouseMove);

  card1.onmouseup = function () {
    document.removeEventListener('mousemove', onMouseMove);
    card1.onmouseup = null;
  };
});

card1.addEventListener('mousemove', (e) => {
  console.log('mousemove');
});
