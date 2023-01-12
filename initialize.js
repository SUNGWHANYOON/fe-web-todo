import { addSidebar } from './AnimatedLayer.js';
import {addCard,initCardDelteModal} from './CardView.js'
import {initialize_modal, initialize_list} from './ColumnView.js'
import {columnElement,cardElement,columnArray,cardArray} from './dataStorage.js'


function main(){
    initialize_modal();

    for(let i = 0; i < columnArray.returnLength(); i++){
        initialize_list(i)
    }
    for(let i = 0; i < cardArray.returnLength(); i++){
        addCard(i)
    }
    
    addSidebar();
}

main();