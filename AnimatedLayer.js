let putarea = document.getElementsByTagName('body')[0]

function initializeSidebar(){
    let sidebarUnit = document.createElement('div');
    let templates = document.getElementsByClassName('animated_layer')[0];
    let input_thing = document.importNode(templates.content,true);
    sidebarUnit.appendChild(input_thing)
    putarea.appendChild(sidebarUnit);

    addSidebar()
}

function addSidebar(){
    let icon = document.getElementsByClassName('hamburger')[0]
    let sidebar = document.getElementsByClassName("sidebarOff")[0];
    sidebar.style.display = "none";

    icon.addEventListener('click',(event)=>{
        sidebar.className = "sidebarOn";
        sidebar.style.display = "";

    })
    icon.addEventListener('dblclick',(event)=>{
        sidebar.className = "sidebarOff";
        sidebar.style.display = "none";

    })
}

export { initializeSidebar }