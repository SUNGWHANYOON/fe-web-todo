import { initializeSidebar } from './AnimatedLayer.js';
import { addCard,initCardDeleteModal,insertCardDom } from './CardView.js'
import { initializeModal, initializeColumn,columnAddBlueButton } from './ColumnView.js'
import { columnElement,cardElement,columnArray,cardArray } from './dataStorage.js'
import { fetchDelete, getJSONData } from './fetchData.js';

function main(){
    initializeModal();


    getJSONData("column").then(data=>{
        
        for(let i = 0; i < data.length; i++)
        {
            let new_column = new columnElement(data[i].name)
            columnArray.pushColumn(new_column)
        }
        
        getJSONData("card").then(data=>{
            for(let j = 0; j < data.length; j++){
                let nowDate = new Date();
                let new_card = new cardElement(data[j].name,data[j].tag,nowDate,data[j].status)
                cardArray.pushcard(new_card)
            }

            cardArray.returnIndexArr().forEach(element =>{
                addCard(element)
            })
        })
        
        columnArray.returnIndexArr().forEach(element =>{
            initializeColumn(element)
        })


    
        initializeSidebar();
        columnAddBlueButton();
        columnPlusAndDelete();
    })



}

main();

function columnPlusAndDelete(){
    let columnPlus = document.getElementsByClassName("button_plus");
    let columnDelete = document.getElementsByClassName("button_x_column");

    columnArray.returnIndexArr().forEach(element =>{
        columnPlus[element].addEventListener('click',function(event){
            insertCardDom(element);
        });
        columnDelete[element].addEventListener('dblclick',function(event){
            deleteColumn(element)
        });
    })

}

function deleteColumn(idx){
    let columnLayer = document.getElementsByClassName("addCard_here")
    columnLayer[idx].style.display = "none"
}