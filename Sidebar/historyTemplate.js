import {logArray, logElement} from '../dataStorage.js'

function getHistoryTemplate(logElement){ // Storage가 아님!
    switch(logElement.getLog().functionName){
        case "add" :
            return `<div>${logElement.functionName} ${logElement.cardName} ${logElement.logDate} ${logElement.cardFrom}</div>`
    }
}

export {getHistoryTemplate}