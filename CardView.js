import {columnElement,cardElement,columnArray,cardArray} from './dataStorage.js'
import {innerCircleCount} from './utils/utils.js'
import {fetchPost,fetchDelete,fetchPut,getJSONData} from './fetchData.js'


HTMLCollection.prototype.forEach = Array.prototype.forEach

let cardAddButtonFlag = false;
let putarea = document.getElementsByName('todo_thing');

function makeCardElement(i,current_item_id){
    let initialize_location = document.getElementsByClassName('cardLayout'); //list 배열
    let card = document.createElement('div');
    let templates = document.getElementsByClassName('template_item')[0];
    let input_name = cardArray.getcard()[i].name;
    let input_tag = cardArray.getcard()[i].tag;
    let input_thing = document.importNode(templates.content,true);

    card.appendChild(input_thing);
    initialize_location[current_item_id].prepend(card);
    card.getElementsByClassName('item_name')[0].innerHTML = input_name;
    card.getElementsByClassName('item_tag')[0].innerHTML = input_tag;

    return card;
}

function addCard(i){
    let input_item = cardArray.getcard()[i] // item_element

    let current_item_id = input_item.status; //list 배열의 번호

    let card = makeCardElement(i,current_item_id)

    let eraseCardXButton = card.getElementsByClassName('button_x_card')[0];
    let currentCard = eraseCardXButton.parentNode.parentNode.parentNode;
    let currentCardTag = currentCard.getElementsByClassName('item_tag')[0];
    let fixCardButton = card.getElementsByClassName('card_fix')[0];

    fixCardButtonEventHandler(fixCardButton,currentCard)
    eraseCardXButtonHoverAndEventHandler(eraseCardXButton,currentCard,currentCardTag)
    initCardDeleteModal(currentCard,current_item_id)
    innerCircleCount(current_item_id)

}

function insertCardElementText(insertTitleholderText,insertSetClassText){
    let inputText = document.createElement('input');
    inputText.setAttribute('placeholder',insertTitleholderText)
    inputText.setAttribute('class',insertSetClassText)

    return inputText
}

function insertCardElementButton(insertTitleholderButton,insertSetClassButton){
    let inputButton = document.createElement('button');
    inputButton.innerHTML = insertTitleholderButton;
    inputButton.setAttribute('class',insertSetClassButton);

    return inputButton
}

function insertCardElement(i){
    let buttonContainer = document.createElement('div')
    buttonContainer.setAttribute('class','plus_todo')

    //input title, input context

    let inputtext1 = insertCardElementText('제목을 입력하세요','input_title')
    let inputtext2 = insertCardElementText('내용을 입력하세요','input_context')

    buttonContainer.appendChild(inputtext1)
    buttonContainer.appendChild(inputtext2)

    //input button1, input button2

    let childContainer = document.createElement('div');
    childContainer.setAttribute('class','plus_button_between');

    let button1 = insertCardElementButton('취소','plus_item_cancel')
    let button2 = insertCardElementButton('등록','plus_item_join')

    //set button1, button2 eventhandler

    button1.addEventListener('click',function(){insertCardDomEventListenerCancel(buttonContainer,cardAddButtonFlag)})

    button2.addEventListener('click',function(){insertCardDomEventListener(i,inputtext1,inputtext2,buttonContainer)})

    childContainer.appendChild(button1);
    childContainer.appendChild(button2);

    buttonContainer.appendChild(childContainer);

    return buttonContainer;
}

function insertCardDom(i){

    cardAddButtonFlag = !cardAddButtonFlag;

    let unit = insertCardElement(i);

    if(cardAddButtonFlag){
        putarea[i].appendChild(unit);
    }
    else{
        unit = document.getElementsByClassName('plus_todo')[0];
        if(unit)
            unit.remove();
    }
}

function initCardDeleteModal(currentCard,current_item_id){
    let cardModalInputLocation = currentCard;
    let cardModalTemplates = document.getElementsByClassName('card_delete_modal')[0];
    let cardInputModal = document.importNode(cardModalTemplates.content,true);
    cardModalInputLocation.appendChild(cardInputModal)

    let cardModalItself = currentCard.getElementsByClassName('card_modal_background')[0];
    cardModalItself.style.display = 'none';

    let cardDeleteButtonCancel = cardModalItself.getElementsByClassName('card_keep')[0];
    let cardDeleteButton = cardModalItself.getElementsByClassName('card_delete')[0]
    
    cardDeleteButton.addEventListener('click',function(){cardDeleteButtonEventListener(cardModalItself,currentCard,current_item_id)})
    cardDeleteButtonCancel.addEventListener('click',function(){cardDeleteButtonCancelEventListener(cardModalItself)})

}

function insertCardDomEventListenerCancel(buttonContainer,cardAddButtonFlag){
    buttonContainer.remove()
    cardAddButtonFlag = false;

}

function cardDeleteButtonEventListener(cardModalItself,currentCard,current_item_status){
    cardModalItself.style.display = "none";
    let name = currentCard.getElementsByClassName('item_name')[0].innerHTML;

    let idx= -1;
    cardArray.getcard().forEach(element=>{
        idx++;
        if(name == element.name)
            {
                
                fetchDelete("card",element.storageId)
                cardArray.deletecard(idx)
                return;
            }
    })
    innerCircleCount(current_item_status)
    currentCard.remove();
}

function cardDeleteButtonCancelEventListener(cardModalItself){
    cardModalItself.style.display = "none";
}

function insertCardDomEventListener(i,inputtext1,inputtext2,buttonContainer){
    if(inputtext1.value !== ""){
        fetchPost("card",{
            "name" : inputtext1.value,
            "tag" : inputtext2.value,
            "status" : i
        })

        getJSONData("card").then(data=>{

            data.forEach((element,index)=>{
                if(index == data.length-1){
                    const current_date = new Date()
                    let insertCardDomObject = new cardElement(element.name,element.tag,current_date,element.status,element.id)
                    cardArray.pushcard(insertCardDomObject);
                    addCard(cardArray.getcard().length-1)
                }
            })
        })

    }
    cardAddButtonFlag = false;
    buttonContainer.remove();
}

function eraseCardXButtonHoverAndEventHandler(eraseCardXButton,currentCard,currentCardTag){
    eraseCardXButton.addEventListener('mouseover',(event)=>{
        currentCard.setAttribute('style','background-color:pink; border:solid; border-color:red')
        currentCardTag.setAttribute('style','background-color:pink')
    })
    eraseCardXButton.addEventListener('mouseout',(event)=>{
        currentCard.setAttribute('style','border:"none"')
        currentCardTag.setAttribute('style','background-color:white')

    })
    eraseCardXButton.addEventListener('click',(event)=>{
        currentCard.getElementsByClassName('card_modal_background')[0].style.display = '';
    })
}

function fixCardButtonEventHandler(fixCardButton,currentCard){
    fixCardButton.addEventListener('click',(event)=>{
        const fixCardNode = FixCardElement(0,currentCard);
        currentCard.parentNode.appendChild(fixCardNode);
        currentCard.style.display = "none";
    })

}


function FixCardElement(i,currentCard){
    let buttonContainer = document.createElement('div')
    buttonContainer.setAttribute('class','plus_todo')

    //input title, input context
    let inputtext1 = insertCardElementText(currentCard.getElementsByClassName("item_name")[0].innerHTML,'input_title')
    let inputtext2 = insertCardElementText(currentCard.getElementsByClassName("item_tag")[0].value,'input_context')

    buttonContainer.appendChild(inputtext1)
    buttonContainer.appendChild(inputtext2)

    //input button1, input button2

    let childContainer = document.createElement('div');
    childContainer.setAttribute('class','plus_button_between');

    let button1 = insertCardElementButton('취소','plus_item_cancel')
    let button2 = insertCardElementButton('수정','plus_item_join')
    //set button1, button2 eventhandler

    button1.addEventListener('click',function(){fixCardDomEventListenerCancel(buttonContainer,currentCard)})

    button2.addEventListener('click',function(){fixCardDomEventListener(buttonContainer,currentCard)})

    childContainer.appendChild(button1);
    childContainer.appendChild(button2);

    buttonContainer.appendChild(childContainer);

    return buttonContainer;
}

//수정버튼 -> 취소버튼
function fixCardDomEventListenerCancel(buttonContainer,currentCard){
    currentCard.style.display = "";
    buttonContainer.remove()

}

//수정버튼 -> 하늘색 수정버튼
function fixCardDomEventListener(buttonContainer,currentCard){

    let fixCardTitle = buttonContainer.getElementsByClassName("input_title")[0]
    let fixCardTag = buttonContainer.getElementsByClassName('input_context')[0]

    let beforeCardName = currentCard.getElementsByClassName("item_name")[0].innerHTML;
    let beforeCardTag = currentCard.getElementsByClassName("item_tag")[0].value;
    if(fixCardTitle.value && fixCardTag.value){
        let beforeCardIdx = cardArray.findIdxByName(beforeCardName)
        let beforeCardStatus = cardArray.getcard()[beforeCardIdx].status
        
        let bodyData = {
            "name" : fixCardTitle.value,
            "tag" : fixCardTag.value,
            "status" : beforeCardStatus
        }
        let nowDate = new Date()
        const newStorageId = cardArray.getcard()[beforeCardIdx].storageId
        cardArray.fixcard(beforeCardStatus,new cardElement(fixCardTitle.value,fixCardTag.value,nowDate,beforeCardStatus,newStorageId))
        fetchPut("card",newStorageId,bodyData)

        currentCard.getElementsByClassName("item_name")[0].innerHTML = fixCardTitle.value
        currentCard.getElementsByClassName("item_tag")[0].value = fixCardTag.value

    }

    buttonContainer.remove()
    currentCard.style.display = ""

}

export {addCard,insertCardDom,initCardDeleteModal}
