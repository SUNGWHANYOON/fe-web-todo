let columnElement = function(name){
    this.name = name || "blank";
}
columnElement.prototype.getName = function(){
    return this.name;
}
columnElement.prototype.setName = function(name){
    this.name = name;
}
//column 정의, column 배열을 담고있고 각종 메소드가 있음.

let columnStorage = function(){
    this.arr = []
}

columnStorage.prototype.pushColumn = function(columnElement){
    this.arr.push(columnElement)
}
columnStorage.prototype.getColumn = function(){
    return this.arr;
}

columnStorage.prototype.deleteColumn = function(i){
    this.arr.splice(i,1);
}

columnStorage.prototype.fixColumn = function(i,columnElement){
    this.arr[i] = columnElement;
}

columnStorage.prototype.returnLength = function(){
    return this.arr.length;
}

columnStorage.prototype.returnIndexArr = function(){
    return Array.from(Array(this.arr.length).keys())
}

// cardElement 정의 card은 카드와 같다.

let cardElement = function(name,tag,date,status){
    this.name = name;
    this.tag= tag;
    this.date = date;
    this.status = status;
}

cardElement.prototype.getcard = function(){
    return [this.name,this.tag,this.date,this.status];
}

cardElement.prototype.setcard = function(name,tag,date,status){
    this.name = name;
    this.tag = tag;
    this.date = date;
    this.status = status;
}

// card의 정의, cardElement 배열을 담고 있고 메소드 정의가 되어있음.

let cardStorage = function(){
    this.arr = []
}

cardStorage.prototype.pushcard = function(cardElement){
    this.arr.push(cardElement)
}

cardStorage.prototype.deletecard = function(i){
    this.arr.splice(i,1);
}
cardStorage.prototype.fixcard = function(i,cardElement){
    this.arr[i] = cardElement;
}

cardStorage.prototype.getcard = function(){
    return this.arr;
}

cardStorage.prototype.returnLength = function(){
    return this.arr.length;
}

cardStorage.prototype.returnIndexArr = function(){
    return Array.from(Array(this.arr.length).keys())
}

// 로그 그 자체, 로그 배열을 이루는 기본요소, 로그 정보가 들어있다.

let logElement = function(functionNumber, cardName, logDate, cardFrom,cardTo){
    this.functionNumber = functionNumber;
    this.cardName = cardName;
    this.logDate = logDate;
    this.cardFrom = cardFrom;
    this.cardTo = cardTo;
}

logElement.prototype.getLog = function(){
    return [this.functionNumber,this.cardName,this.logDate,this.cardFrom,this.cardTo]
}

logElement.prototype.setLog = function(funtionNumber,cardName,logDate,cardFrom,cardTo){
    this.functonNumber = functionNumber;
    this.cardName = cardName;
    this.logDate = logDate;
    this.cardFrom = cardFrom;
    this.cardTo = cardTo;
}

//로그 정보를 담고있는 배열역할의 클래스

 let logStorage = function(){
    this.arr = []
 }

 logStorage.prototype.getLogArray = function(){
    return this.arr;
 }

 logStorage.prototype.pushLogArray = function(logElement){
    this.arr.push(logElement)
}

logStorage.prototype.fixLogArray = function(i,logElement){
    this.arr[i] = logElement
}

// 현재 시각
let columnArray = new columnStorage();
let cardArray = new cardStorage();
let logArray = new logStorage();

export {columnElement,cardElement,logElement,columnArray,cardArray,logArray}