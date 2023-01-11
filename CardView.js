import {columnElement,cardElement,columnArray,cardArray} from './dataStorage.js'

function initialize_item(i){
    let input_item = cardArray.getcard()[i] // item_element
    let initialize_location = document.getElementsByClassName('initialize_item_here'); //list 배열
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
    initialize_location[current_item_id].appendChild(node);
    node.getElementsByClassName('item_name')[0].innerHTML = input_name;
    node.getElementsByClassName('item_tag')[0].innerHTML = input_tag;
}

export {initialize_item}