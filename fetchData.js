// body part

// body part
function fetchPost(name,tag,status){
    fetch('localhost:4000/memo/',{
    method : "POST",
    body : JSON.stringify({
        "name" : name,
        "tag" : tag,
        "status" : status
    })
    })
}

function fetchDelete(idx) {
    url = 'localhost:4000/memo/' + idx;
    fetch(url,{
    method : "DELETE"
    })
}

function fetchPut(idx,name,tag,status){
    url = 'localhost:4000/memo/' + idx;
    fetch(url,{
    method : "PUT",
    body : JSON.stringify({
        "name" : name,
        "tag" : tag,
        "status" : status
    })
    })
}

//function getJSONdata