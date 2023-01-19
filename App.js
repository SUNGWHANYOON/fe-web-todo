import { initializeSidebar } from "./AnimatedLayer.js";
import { addCard, initCardDeleteModal, insertCardDom } from "./CardView.js";
import {
  initializeModal,
  initializeColumn,
  columnAddBlueButton,
} from "./ColumnView.js";
import {
  columnElement,
  cardElement,
  columnArray,
  cardArray,
} from "./dataStorage.js";
import { fetchDelete, getJSONData } from "./utils/fetchUtils.js";
import { makeLog } from "./utils/logutils.js";

function main() {
  initializeModal();
  loadingData();
}
main();

function loadingData() {
  getJSONData("column").then((data) => {
    data.forEach((_, index) => {
      const new_column = new columnElement(data[index].name, data[index].id);
      columnArray.pushColumn(new_column);
    });

    getJSONData("card").then((data) => {
      data.forEach((_, index) => {
        const nowDate = new Date();
        const new_card = new cardElement(
          data[index].name,
          data[index].tag,
          nowDate,
          data[index].status,
          data[index].id
        );
        cardArray.pushcard(new_card);
      });

      cardArray.getcard().forEach((element) => {
        addCard(element);
      });
    });

    columnArray.getColumn().forEach((element,index) => {
      initializeColumn(index);
    });

    initializeSidebar();
    columnAddBlueButton();
    columnPlusAndDelete();
  });
}

function columnPlusAndDelete() {
  let columnPlus = document.getElementsByClassName("button_plus");
  let columnDelete = document.getElementsByClassName("button_x_column");

  columnArray.getColumn().forEach((element, index) => {
    columnPlus[index].addEventListener("click", function (event) {
      insertCardDom(index);
    });
    columnDelete[index].addEventListener("dblclick", function (event) {
      deleteColumn(index);
    });
  });

  //여기 새로 생긴거 X EventListener 등록해야함.
}

function deleteColumn(idx) {
  let columnLayer = document.getElementsByClassName("addCard_here");

  const cardsInDeleteColumn =
    columnLayer[idx].getElementsByClassName("item_name");
  cardsInDeleteColumn.forEach((data) => {
    fetchDelete("card", cardArray.returnStorageIdByName(data.innerHTML));
  });
  columnLayer[idx].style.display = "none";
  fetchDelete("column", columnArray.getColumn()[idx].storageId);
}
