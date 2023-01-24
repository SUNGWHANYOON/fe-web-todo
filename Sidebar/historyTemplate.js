import {logArray, logElement} from '../dataStorage.js'
import {fetchDelete, fetchPost, fetchPut} from '../utils/fetchUtils.js'


function getHistoryTemplate(logElement){ // Storage가 아님!
    switch(logElement.functionName){
        case "add" :
            return `<div>${logElement.functionName} ${logElement.cardName} ${logElement.logDate} ${logElement.cardFrom}</div>`
        case "delete" :
            return `<div>${logElement.functionName} ${logElement.cardName} ${logElement.logDate} ${logElement.cardFrom}</div>`
        case "update" :
            return `<div>${logElement.functionName} ${logElement.cardName} ${logElement.logDate} ${logElement.cardFrom}</div>`
            
    }
}

export {getHistoryTemplate}