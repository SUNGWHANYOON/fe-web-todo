import {columnElement,cardElement,columnArray,cardArray} from '../dataStorage.js'

function innerCircleCount(currentColumnIndex){
    let i = currentColumnIndex
    let count = 0;
    for(let j = 0; j < cardArray.returnLength(); j++){
        if(cardArray.getcard()[j].status == i)
        {
            count++;
        }
    }
    document.getElementsByClassName('circle')[i].innerHTML = count;
}

export {innerCircleCount}