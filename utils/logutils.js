import { logArray, logElement } from "../dataStorage.js";

function insertHistory(){
    const sidebarMain = document.getElementById("sidebar_main");
    logArray.getLogArray().forEach((element) => {
  //    sidebarMain.insertAdjacentHTML(getHistoryTemplate(element));
    });
}
function makeLog(action, cardName, logDate, cardFrom, cardTo) {
  const newLog = new logElement(action, cardName, logDate, cardFrom, cardTo);
  logArray.pushLogArray(newLog);
  insertHistory(logArray.getLogArray().at(-1));
}


export { makeLog,insertHistory };
