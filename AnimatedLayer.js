let putarea = document.getElementsByTagName('body')[0]

function initializeSidebar(){
    let node = document.createElement('div');
    let templates = document.getElementsByClassName('animated_layer')[0];
    let input_thing = document.importNode(templates.content,true);
    node.appendChild(input_thing)
    putarea.appendChild(node);

    addSidebar()
}

function addSidebar(){
    let icon = document.getElementsByClassName('hamburger')[0]
    let sidebar = document.getElementsByClassName("sidebarOff")[0];
    sidebar.style.display = "none";
    console.log(sidebar)

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