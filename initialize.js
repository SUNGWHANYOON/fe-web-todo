import { initializeSidebar } from './AnimatedLayer.js';
import { addCard,initCardDeleteModal,insertCardDom } from './CardView.js'
import { initializeModal, initializeColumn,columnAddBlueButton } from './ColumnView.js'
import { columnElement,cardElement,columnArray,cardArray } from './dataStorage.js'
import { fetchDelete, getJSONData } from './fetchData.js';

function main(){
    initializeModal();


    getJSONData("column").then(data=>{
        data.forEach((element,index)=>{
            const new_column = new columnElement(data[index].name,data[index].id)
            columnArray.pushColumn(new_column)
        })
        
        getJSONData("card").then(data=>{
            data.forEach((element,index)=>{
                const nowDate = new Date();
                const new_card = new cardElement(data[index].name,data[index].tag,nowDate,data[index].status,data[index].id)
                cardArray.pushcard(new_card)
            })

            cardArray.getcard().forEach((element,index)=>{
                addCard(index)
            })
        })
        
        columnArray.getColumn().forEach((element,index) =>{
            initializeColumn(index)
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

    //여기 새로 생긴거 X EventListener 등록해야함.

}

function deleteColumn(idx){
    let columnLayer = document.getElementsByClassName("addCard_here")
    columnLayer[idx].style.display = "none"
    fetchDelete("column",columnArray.getColumn()[idx].storageId)
}