import {columnElement,cardElement,columnArray,cardArray} from './dataStorage.js'
import {initialize_list} from './ColumnView.js'

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

        initialize_list(columnArray.returnLength()-1)

        let item_plus = document.getElementsByClassName("button_plus");
        
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

export {initialize_modal}