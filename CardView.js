import {columnElement,cardElement,columnArray,cardArray} from './dataStorage.js'

function initialize_item(i){
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

}
let cardAddButtonFlag = false;
let putarea = document.getElementsByName('todo_thing');

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
        cardAddButtonFlag = false;
        putarea.removeChild(buttonContainer);
    })
    button2.addEventListener('click',(event)=>{

        const current_date = new Date()
        let nowColumnName = columnArray.getColumn()[i].name
        let addCardObject = new cardElement(inputtext1.value,inputtext2.value,current_date,nowColumnName)
        cardArray.pushcard(addCardObject);

        initialize_item(cardArray.getcard().length-1)
        cardAddButtonFlag = false;
        putarea[i].removeChild(buttonContainer);
    })

    childContainer.appendChild(button1);
    childContainer.appendChild(button2);

    buttonContainer.appendChild(childContainer);

    return buttonContainer;
}

function AddCard(i){

    cardAddButtonFlag = !cardAddButtonFlag;

    let unit = make_button(i);

    if(cardAddButtonFlag){
        putarea[i].appendChild(unit);
    }
    else{
        unit = document.getElementsByClassName('plus_todo')[0];
        putarea[i].removeChild(unit);
    }
}

window.onload = function(){
    let item_plus = document.getElementsByClassName("button_plus");
    for(let i = 0; i < columnArray.arr.length;i++){
        item_plus[i].addEventListener('click',function(event){
            AddCard(i);
    });
    }

}

export {initialize_item,AddCard}
