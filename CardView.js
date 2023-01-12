import {columnElement,cardElement,columnArray,cardArray} from './dataStorage.js'

HTMLCollection.prototype.forEach = Array.prototype.forEach

let cardAddButtonFlag = false;
let putarea = document.getElementsByName('todo_thing');

function addCard(i){
    let input_item = cardArray.getcard()[i] // item_element
    let initialize_location = document.getElementsByClassName('cardLayout'); //list 배열
    let initialize_location_name = document.getElementsByClassName('list_name');
    let k;

    let current_item_id; //list 배열의 번호
    for(k = 0; k < initialize_location.length; k++){

        if(initialize_location_name[k].innerHTML == input_item.status){
            current_item_id = k;
        }
    }
    let node = document.createElement('div');

    let templates = document.getElementsByClassName('template_item')[0];
    let input_name = cardArray.getcard()[i].name;
    let input_tag = cardArray.getcard()[i].tag;
    let input_thing = document.importNode(templates.content,true);

    node.appendChild(input_thing);
    initialize_location[current_item_id].prepend(node);
    node.getElementsByClassName('item_name')[0].innerHTML = input_name;
    node.getElementsByClassName('item_tag')[0].innerHTML = input_tag;

    let eraseCardXButton = node.getElementsByClassName('button_x_card')[0];
    let currentCard = eraseCardXButton.parentNode.parentNode;
    let currentCardTag = currentCard.getElementsByClassName('item_tag')[0]

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

    initCardDelteModal(currentCard)

}

function make_button(i){
    let buttonContainer = document.createElement('div')
    buttonContainer.setAttribute('class','plus_todo')

    //input title, input context
    let inputtext1 = document.createElement('input');
    let inputtext2 = document.createElement('input');

    inputtext1.setAttribute('placeholder','제목을 입력하세요')
    inputtext2.setAttribute('placeholder','내용을 입력하세요')

    inputtext1.setAttribute('class','input_title')
    inputtext2.setAttribute('class','input_context')

    buttonContainer.appendChild(inputtext1)
    buttonContainer.appendChild(inputtext2)

    //input button1, input button2

    let childContainer = document.createElement('div');
    childContainer.setAttribute('class','plus_button_between');

    let button1 = document.createElement('button');
    let button2 = document.createElement('button');

    button1.innerHTML = '취소';
    button2.innerHTML = '등록';

    button1.setAttribute('class','plus_item_cancel');
    button2.setAttribute('class','plus_item_join');

    button1.setAttribute('id','plus_item_cancel');
    button2.setAttribute('id','plus_item_join');

    button1.addEventListener('click',(event)=>{
        buttonContainer.remove()
        cardAddButtonFlag = false;
    })
    button2.addEventListener('click',function(){makeCardDomEventListener(i,inputtext1,inputtext2,buttonContainer)})

    childContainer.appendChild(button1);
    childContainer.appendChild(button2);

    buttonContainer.appendChild(childContainer);

    return buttonContainer;
}

function makeCardDom(i){

    cardAddButtonFlag = !cardAddButtonFlag;

    let unit = make_button(i);

    if(cardAddButtonFlag){
        putarea[i].appendChild(unit);
    }
    else{
        unit = document.getElementsByClassName('plus_todo')[0];
        unit.remove();
    }
}

window.onload = function(){
    let item_plus = document.getElementsByClassName("button_plus");
    for(let i = 0; i < columnArray.arr.length;i++){
        item_plus[i].addEventListener('click',function(event){
            makeCardDom(i);
    });
    }

}

function makeCardDomEventListener(i,inputtext1,inputtext2,buttonContainer){
    const current_date = new Date()
    let nowColumnName = columnArray.getColumn()[i].name
    let makeCardDomObject = new cardElement(inputtext1.value,inputtext2.value,current_date,nowColumnName)
    cardArray.pushcard(makeCardDomObject);

    addCard(cardArray.getcard().length-1)
    cardAddButtonFlag = false;
    buttonContainer.remove();
}

function initCardDelteModal(currentCard){
    let cardModalInputLocation = currentCard;
    let cardModalTemplates = document.getElementsByClassName('card_delete_modal')[0];
    let cardInputModal = document.importNode(cardModalTemplates.content,true);
    cardModalInputLocation.appendChild(cardInputModal)

    let cardModalItself = currentCard.getElementsByClassName('card_modal_background')[0];
    cardModalItself.style.display = 'none';

    let cardDeleteButtonCancel = cardModalItself.getElementsByClassName('card_keep')[0];
    let cardDeleteButton = cardModalItself.getElementsByClassName('card_delete')[0]
    
    cardDeleteButton.addEventListener('click',function(){cardDeleteButtonEventListener(cardModalItself,currentCard)})
    cardDeleteButtonCancel.addEventListener('click',function(){cardDeleteButtonCancelEventListener(cardModalItself)})

}

function cardDeleteButtonEventListener(cardModalItself,currentCard){
    cardModalItself.style.display = "none";
    currentCard.remove();
}

function cardDeleteButtonCancelEventListener(cardModalItself){
    cardModalItself.style.display = "none";
}

export {addCard,makeCardDom,initCardDelteModal}
