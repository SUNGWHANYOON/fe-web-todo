import {
  columnElement,
  cardElement,
  columnArray,
  cardArray,
  logArray,
} from "./dataStorage.js";
import { innerCircleCount } from "./utils/utils.js";
import {
  fetchPost,
  fetchDelete,
  fetchPut,
  getJSONData,
} from "./utils/fetchUtils.js";
import { makeLog } from "./utils/logutils.js";

HTMLCollection.prototype.forEach = Array.prototype.forEach;

let cardAddButtonFlag = false;
let cardPlusButtonInsertPlace = document.getElementsByName("todo_thing");

//카드 추가의 메인!
function addCard(element) {
  let inputCardArray = element; // card_element

  //card는 ul리스트의 한 단위이고, currentCard는 ul 안의 div이다.

  let currentCardIdx = cardArray.findIdxByName(element.name); //list 배열의 번호
  let card = makeCardElement(currentCardIdx, inputCardArray);
  let eraseCardXButton = card.getElementsByClassName("button_x_card")[0];
  let currentCard = eraseCardXButton.parentNode.parentNode.parentNode;
  let currentCardTag = currentCard.getElementsByClassName("item_tag")[0];
  let fixCardButton = card.getElementsByClassName("card_fix")[0];

  fixCardButtonEventHandler(fixCardButton, currentCard);
  eraseCardXButtonHoverAndEventHandler(
    eraseCardXButton,
    currentCard,
    currentCardTag
  );
  initCardDeleteModal(currentCard, currentCardIdx);
  innerCircleCount(getColumnIdxbyCardIdx(currentCardIdx));
}

function makeCardElement(currentCardIdx, inputCardArray) {
  let initialize_location = document.getElementsByClassName("cardLayout"); //list 배열
  let card = document.createElement("div");
  let templates = document.getElementsByClassName("template_item")[0];
  let input_name = inputCardArray.name;
  let input_tag = inputCardArray.tag;
  let input_thing = document.importNode(templates.content, true);

  card.appendChild(input_thing);
  
  let currentColumnIdx = getColumnIdxbyCardIdx(currentCardIdx)
  initialize_location[currentColumnIdx].prepend(card);
  card.getElementsByClassName("item_name")[0].innerHTML = input_name;
  card.getElementsByClassName("item_tag")[0].innerHTML = input_tag;

  return card;
}

function insertCardElementText(insertTitleholderText, insertSetClassText) {
  let inputText = document.createElement("input");
  inputText.setAttribute("placeholder", insertTitleholderText);
  inputText.setAttribute("class", insertSetClassText);

  return inputText;
}

function insertCardElementButton(
  insertTitleholderButton,
  insertSetClassButton
) {
  let inputButton = document.createElement("button");
  inputButton.innerHTML = insertTitleholderButton;
  inputButton.setAttribute("class", insertSetClassButton);

  return inputButton;
}

function insertCardElement(cardArrIdx) {
  let buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("class", "plus_todo");

  //input title, input context

  let inputtext1 = insertCardElementText("제목을 입력하세요", "input_title");
  let inputtext2 = insertCardElementText("내용을 입력하세요", "input_context");

  buttonContainer.appendChild(inputtext1);
  buttonContainer.appendChild(inputtext2);

  //input button1, input button2

  let childContainer = document.createElement("div");
  childContainer.setAttribute("class", "plus_button_between");

  let button1 = insertCardElementButton("취소", "plus_item_cancel");
  let button2 = insertCardElementButton("등록", "plus_item_join");

  //set button1, button2 eventhandler

  button1.addEventListener("click", function () {
    insertCardDomEventListenerCancel(buttonContainer, cardAddButtonFlag);
  });
  button2.addEventListener("click", function () {
    insertCardDomEventListener(
      cardArrIdx,
      inputtext1,
      inputtext2,
      buttonContainer
    );
  });

  childContainer.appendChild(button1);
  childContainer.appendChild(button2);

  buttonContainer.appendChild(childContainer);

  return buttonContainer;
}

function insertCardDom(currentColumnIdx) {
  cardAddButtonFlag = !cardAddButtonFlag;

  let unit = insertCardElement(currentColumnIdx);

  if (cardAddButtonFlag) {
    // function(currentColumnName => return index)
    cardPlusButtonInsertPlace[currentColumnIdx].appendChild(unit);
  } else {
    [unit] = document.getElementsByClassName("plus_todo");
    if (unit) unit.remove();
  }
}

function initCardDeleteModal(currentCard, current_item_id) {
  let cardModalInputLocation = currentCard;
  let [cardModalTemplates] =
    document.getElementsByClassName("card_delete_modal");
  let cardInputModal = document.importNode(cardModalTemplates.content, true);
  cardModalInputLocation.appendChild(cardInputModal);

  let cardModalItself = currentCard.getElementsByClassName(
    "card_modal_background"
  )[0];
  cardModalItself.style.display = "none";

  let cardDeleteButtonCancel =
    cardModalItself.getElementsByClassName("card_keep")[0];
  let cardDeleteButton =
    cardModalItself.getElementsByClassName("card_delete")[0];

  cardDeleteButton.addEventListener("click", function () {
    cardDeleteButtonEventListener(
      cardModalItself,
      currentCard,
      current_item_id
    );
  });
  cardDeleteButtonCancel.addEventListener("click", function () {
    cardDeleteButtonCancelEventListener(cardModalItself);
  });
}

function insertCardDomEventListenerCancel(buttonContainer, cardAddButtonFlag) {
  buttonContainer.remove();
  cardAddButtonFlag = false;
}

function cardDeleteButtonEventListener(
  cardModalItself,
  currentCard,
  current_item_status
) {
  cardModalItself.style.display = "none";
  let name = currentCard.getElementsByClassName("item_name")[0].innerHTML;

  cardArray.getcard().forEach((element,index) => {
    if (name == element.name) {
      makeLog("Delete",element.name,element.date,element.storage,"")
      fetchDelete("card", element.storageId);
      cardArray.deletecard(index);
      return;
    }
  });
  //innerCircleCount(getColumnIdxbyCardIdx(idx));
  currentCard.remove();
}

function cardDeleteButtonCancelEventListener(cardModalItself) {
  cardModalItself.style.display = "none";
}


function insertCardDomEventListener(
    
  cardIdx,
  inputtext1,
  inputtext2,
  buttonContainer
) {
    const current_date = new Date();

    let [columnIdx] = buttonContainer.parentNode.getElementsByClassName('list_name')
  if (inputtext1.value !== "") {
    makeLog("Add",inputtext1.value,current_date,columnIdx.innerHTML)
    fetchPost("card", {
      name: inputtext1.value,
      tag: inputtext2.value,
      status: columnIdx.innerHTML
    }).then(function () {
      getJSONData("card").then((data) => {
        data.forEach((element, index) => {
          if (index == data.length - 1) {
            let insertCardDomObject = new cardElement(
              element.name,
              element.tag,
              current_date,
              element.status,
              element.id
            );
            cardArray.pushcard(insertCardDomObject);
            addCard(insertCardDomObject);
          }
        });
      });
    });
  }
  cardAddButtonFlag = false;
  buttonContainer.remove();
}

function eraseCardXButtonHoverAndEventHandler(
  eraseCardXButton,
  currentCard,
  currentCardTag
) {
  eraseCardXButton.addEventListener("mouseover", (event) => {
    currentCard.setAttribute("class", "card_hover");
    currentCardTag.setAttribute("class", "card_tag_hover");
  });
  eraseCardXButton.addEventListener("mouseout", (event) => {
    currentCard.setAttribute("class", "card_nothover");
    currentCardTag.setAttribute("class", "card_tag_nothover");
  });
  eraseCardXButton.addEventListener("click", (event) => {
    currentCard.getElementsByClassName(
      "card_modal_background"
    )[0].style.display = "";
  });
}

function fixCardButtonEventHandler(fixCardButton, currentCard) {
  fixCardButton.addEventListener("click", (event) => {
    const fixCardNode = FixCardElement(currentCard);
    currentCard.parentNode.appendChild(fixCardNode);
    currentCard.style.display = "none";
  });
}

function FixCardElement(currentCard) {
  let buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("class", "plus_todo");

  //input title, input context
  let inputtext1 = insertCardElementText(
    currentCard.getElementsByClassName("item_name")[0].innerHTML,
    "input_title"
  );
  let inputtext2 = insertCardElementText(
    currentCard.getElementsByClassName("card_tag_nothover")[0].innerHTML,
    "input_context"
  );

  buttonContainer.appendChild(inputtext1);
  buttonContainer.appendChild(inputtext2);

  //input button1, input button2

  let childContainer = document.createElement("div");
  childContainer.setAttribute("class", "plus_button_between");

  let button1 = insertCardElementButton("취소", "plus_item_cancel");
  let button2 = insertCardElementButton("수정", "plus_item_join");
  //set button1, button2 eventhandler

  button1.addEventListener("click", function () {
    fixCardDomEventListenerCancel(buttonContainer, currentCard);
  });

  button2.addEventListener("click", function () {
    fixCardDomEventListener(buttonContainer, currentCard);
  });

  childContainer.appendChild(button1);
  childContainer.appendChild(button2);

  buttonContainer.appendChild(childContainer);

  return buttonContainer;
}

//수정버튼 -> 취소버튼
function fixCardDomEventListenerCancel(buttonContainer, currentCard) {
  currentCard.style.display = "";
  buttonContainer.remove();
}

//수정버튼 -> 하늘색 수정버튼
function fixCardDomEventListener(buttonContainer, currentCard) {
  let fixCardTitle = buttonContainer.getElementsByClassName("input_title")[0];
  let fixCardTag = buttonContainer.getElementsByClassName("input_context")[0];
  let beforeCardName =
    currentCard.getElementsByClassName("item_name")[0].innerHTML;
  if (fixCardTitle.value && fixCardTag.value) {
    let beforeCardIdx = cardArray.findIdxByName(beforeCardName);
    let beforeCardStatus = cardArray.getcard()[beforeCardIdx].status;

    let bodyData = {
      name: fixCardTitle.value,
      tag: fixCardTag.value,
      status: beforeCardStatus,
    };
    let nowDate = new Date();
    const newStorage = cardArray.getcard()[beforeCardIdx];
    cardArray.fixcard(
      beforeCardStatus,
      new cardElement(
        fixCardTitle.value,
        fixCardTag.value,
        nowDate,
        beforeCardStatus,
        newStorage.storageId
      )
    );
    makeLog("update",newStorage.name,newStorage.date,newStorage.status,"")
    fetchPut("card", newStorage.storageId, bodyData);

    currentCard.getElementsByClassName("item_name")[0].innerHTML =
      fixCardTitle.value;
    currentCard.getElementsByClassName("item_tag")[0].value = fixCardTag.value;
  }

  buttonContainer.remove();
  currentCard.style.display = "";
}

function getColumnIdxbyCardIdx(cardIdx) {
  let colIdx = 0;
  columnArray.getColumn().forEach((element, index) => {
    if (element.name == cardArray.getcard()[cardIdx].status){
        colIdx = index;
    }
  });

  return colIdx;
}
export { addCard, insertCardDom, initCardDeleteModal ,getColumnIdxbyCardIdx};

