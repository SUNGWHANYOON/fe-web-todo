
// async function fetchPost(storage,idx,bodyData){
//     const url = 'http://localhost:3000/'+storage+'/';
//     await fetch(url,{
//         method : "POST",
//         body : JSON.stringify(bodyData)
//     })
// }

async function fetchPost(storage,idx,bodyData){
    const url = 'http://localhost:3000/'+storage;
    await fetch(url,{
        method : "POST",
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(bodyData)
    })
}

async function fetchDelete(storage,idx) {
    const url = 'http://localhost:3000/'+storage+'/'+idx;
    await fetch(url,{
    method : "DELETE"

    })
}

async function fetchPut(storage,idx,bodyData){
    const url = 'http://localhost:3000/'+storage+'/'+idx;
    await fetch(url,{
    method : "PUT",
    body : bodyData
    })
}

async function getJSONData(storage){
    const url = 'http://localhost:3000/'+storage;
    const response = await fetch(url,{
        method : "GET",
        hearder : {
            
        }
    })

   const data = await response.json()
   return data;
}

export {fetchPost,fetchDelete,fetchPut,getJSONData}