import { logArray, logElement } from "../dataStorage.js";

function makeLog(action, cardName, logDate, cardFrom, cardTo) {
  const newLog = new logElement(action, cardName, logDate, cardFrom, cardTo);
  logArray.pushLogArray(newLog);
}

export { makeLog };
