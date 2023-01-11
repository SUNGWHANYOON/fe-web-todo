//list_elemnt 정의, list는 칼럼과 같다. list의 각 요소

var list_element = function(name){
    this.name = name || "blank";
}

list_element.prototype.getName = function(){
    return this.name;
}
list_element.prototype.setName = function(name){
    this.name = name;
}

//list 정의, list 배열을 담고있고 각종 메소드가 있음.

var list = function(){
    this.arr = []
}

list.prototype.pushData = function(list_element){
    this.arr.push(list_element)
}
list.prototype.getData = function(){
    return this.arr;
}

list.prototype.deleteData = function(i){
    this.arr.splice(i,1);
}

list.prototype.fixData = function(i,list_element){
    this.arr[i] = list_element;
}

list.prototype.ReturnLength = function(){
    return this.arr.length;
}

// item_element 정의 item은 카드와 같다.

var item_element = function(name,tag,date,status){
    this.name = name;
    this.tag= tag;
    this.date = date;
    this.status = status;
}

item_element.prototype.getItem = function(){
    return [this.name,this.tag,this.date,this.status];
}

item_element.prototype.setItem = function(name,tag,date,status){
    this.name = name;
    this.tag = tag;
    this.date = date;
    this.status = status;
}

// item의 정의, item_element 배열을 담고 있고 메소드 정의가 되어있음.

var item = function(){
    this.arr = []
}

item.prototype.pushItem = function(item_element){
    this.arr.splice(0,0,item_element)
}

item.prototype.deleteItem = function(i){
    this.arr.splice(i,1);
}
item.prototype.fixItem = function(i,item_element){
    this.arr[i] = item_element;
}

item.prototype.getItem = function(){
    return this.arr;
}

item.prototype.ReturnLength = function(){
    return this.arr.length;
}

// 현재 시각

var now_date = new Date()

// 실제 칼럼 추가부분

var list_unit1 = new list_element("하고있는 일")
var list_unit2 = new list_element("해야할 일")
var list_unit3 = new list_element("완료한 일")

var lists = new list()
lists.pushData(list_unit1)
lists.pushData(list_unit2)
lists.pushData(list_unit3)

console.log(lists.getData())
// 실제 카드 추가부분


var item_unit3 = new item_element("HTML/CSS 공부하기","input 태그 실습",now_date,"하고있는 일")
var item_unit2 = new item_element("블로그에 포스팅할 것","GitHub 공부내용",now_date,"하고있는 일")
var item_unit1 = new item_element("Github공부하기","add,commit,push",now_date,"해야할 일")

var items = new item()
items.pushItem(item_unit1)
items.pushItem(item_unit2)
items.pushItem(item_unit3)

console.log(items.getItem())

export {list_element,item_element,lists,items}