function addSidebar(){
    let icon = document.getElementById('icon');
    icon.addEventListener('onclick',function(event){
        console.log(event.target)
    })
}

export { addSidebar }