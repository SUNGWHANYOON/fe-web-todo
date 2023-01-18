import {columnElement,cardElement,columnArray,cardArray} from '../dataStorage.js'

function innerCircleCount(currentColumnIndex){
    let i = currentColumnIndex
    let count = 0;

    cardArray.getcard().forEach((element,index) =>{
        if(element.status == i)
        {
            count++;
        }
    })

    document.getElementsByClassName('circle')[i].innerHTML = count;
}

export {innerCircleCount}