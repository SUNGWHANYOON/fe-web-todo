import {columnElement,cardElement,columnArray,cardArray} from './dataStorage.js'
import {addCard, makeCardDom} from './CardView.js'
import {innerCircleCount} from './utils/utils.js'

function initialize_list(i){

    let initialize_location = document.getElementById('main');

    let node = document.createElement('div');
    let templates = document.getElementsByClassName('template_list')[0];
    let input_name = columnArray.getColumn()[i].name;
    let input_thing = document.importNode(templates.content,true);
    node.appendChild(input_thing);
    node.setAttribute('class',"addCard_here");

    let cardLayout = document.createElement('div');
    cardLayout.setAttribute('class','cardLayout');
    node.appendChild(cardLayout);

    let columnNameLocation = node.getElementsByClassName('list_name')[0]
    changeColumnNameEventHandler(columnNameLocation,i,input_name)
    initialize_location.appendChild(node);

    document.getElementsByClassName('list_name')[i].innerHTML = input_name;

    innerCircleCount(i)

}


function initialize_modal(){
    let modal_input_location = document.getElementById('main');
    let modal_templates = document.getElementsByClassName('todo_plus_modal')[0];
    let input_modal = document.importNode(modal_templates.content,true);
    modal_input_location.appendChild(input_modal)

    let modal_itself = document.getElementById('modal');
    modal_itself.style.display = "none"

}

//우측 하단 + 이벤트리스너
const button = document.getElementById('plus_list');
button.addEventListener('click',(event) =>{
    document.getElementById('modal').style.display = ""
    onload_function()

});

function addColumn(){
        let plus_item_name = document.getElementById('item_plus_name').value

        columnArray.pushColumn(new columnElement(plus_item_name))

        let input_card_index = columnArray.returnLength()-1;
        initialize_list(input_card_index)
        let item_plus = document.getElementsByClassName("button_plus")[input_card_index];
        item_plus.addEventListener('click',function(event){
                makeCardDom(input_card_index);
        });
        document.getElementById('modal').style.display = "none"
    }
    


function onload_function(){
    let modal_close = document.getElementById('modal_close');
    modal_close.addEventListener('click',(event)=>{
        document.getElementById('modal').style.display = "none"
    })

    let modal_plus = document.getElementById('modal_plus');
    
    modal_plus.addEventListener('click',addColumn)
}

function changeColumnNameEventHandler(columnNameLocation,i,input_name){
    columnNameLocation.addEventListener('dblclick',function(event){
        if(columnNameLocation.value != input_name){
            columnArray.arr[i].setName(columnNameLocation.value)
        }
    })
}

export {initialize_modal, initialize_list}