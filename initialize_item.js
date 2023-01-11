import {list_element,item_element,lists,items} from './data.js'

function initialize_item(i){
    let input_item = items.getItem()[i] // item_element
    let initialize_location = document.getElementsByClassName('initialize_item_here'); //list 배열
    let initialize_location_name = document.getElementsByClassName('list_name');
    let k;

    let current_item_id; //list 배열의 번호
    for(k = 0; k < initialize_location.length; k++){
        if(initialize_location_name[k].innerHTML == input_item.getItem()[3]){
            current_item_id = k;
        }
    }
    let node = document.createElement('div');

    let templates = document.getElementsByClassName('template-item')[0];
    var input_name = items.getItem()[i].name;
    var input_tag = items.getItem()[i].tag;
    let input_thing = document.importNode(templates.content,true);

    node.appendChild(input_thing);
    initialize_location[current_item_id].appendChild(node);
    document.getElementsByClassName('item_name')[i].innerHTML = input_name;

    document.getElementsByClassName('item_tag')[i].innerHTML = input_tag;


}

export {initialize_item}