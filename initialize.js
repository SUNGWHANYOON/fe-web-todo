import {initialize_list} from './ColumnView.js'
import {initialize_item} from './CardView.js'
import {initialize_modal} from './AddColumnView.js'

import {columnElement,cardElement,columnArray,cardArray} from './dataStorage.js'


function main(){

    for(let i = 0; i < columnArray.returnLength(); i++){
        initialize_list(i)
    }
    for(let i = 0; i < cardArray.returnLength(); i++)
        initialize_item(i)
    
    initialize_modal();
}

main();