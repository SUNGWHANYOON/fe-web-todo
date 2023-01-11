import {initialize_list} from './initialize_list.js'
import {initialize_item} from './initialize_item.js'
import {initialize_modal} from './plus_list.js'

import {list_element,item_element,lists,items} from './data.js'


function main(){
    let i = 0;

    for(i = 0; i < lists.ReturnLength(); i++){

        initialize_list(i)
    }
    for(i = 0; i < items.ReturnLength(); i++)
        initialize_item(i)
    
    initialize_modal();
}

main();