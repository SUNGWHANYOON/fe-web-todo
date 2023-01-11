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

// 현재 시각

let now_date = new Date()

// 실제 칼럼 추가부분

let column_unit1 = new columnElement("해야할 일")
let column_unit2 = new columnElement("하고있는 일")
let column_unit3 = new columnElement("완료한 일")

let columnArray = new columnStorage()
columnArray.pushColumn(column_unit1)
columnArray.pushColumn(column_unit2)
columnArray.pushColumn(column_unit3)

// 실제 카드 추가부분

let card_unit3 = new cardElement("HTML/CSS 공부하기","input 태그 실습",now_date,"하고있는 일")
let card_unit2 = new cardElement("블로그에 포스팅할 것","GitHub 공부내용",now_date,"하고있는 일")
let card_unit1 = new cardElement("Github공부하기","add,commit,push",now_date,"해야할 일")

let cardArray = new cardStorage()
cardArray.pushcard(card_unit1)
cardArray.pushcard(card_unit2)
cardArray.pushcard(card_unit3)

export {columnElement,cardElement,columnArray,cardArray}