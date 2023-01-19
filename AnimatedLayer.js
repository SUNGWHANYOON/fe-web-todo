let body = document.getElementsByTagName('body')[0]

function initializeSidebar(){
    let sidebarUnit = document.createElement('div');
    let templates = document.getElementsByClassName('animated_layer')[0];
    let input_thing = document.importNode(templates.content,true);
    sidebarUnit.appendChild(input_thing)
    body.appendChild(sidebarUnit);

    //사이드 바 안에 X버튼
    const sidebarXButton = sidebarUnit.getElementsByClassName('button_x_card')[0]
    sidebarXButtonHandler(sidebarXButton)

    //햄버거 버튼
    addSidebar()
}

//사이드바  X버튼 설정
function sidebarXButtonHandler(sidebarXButton){
    sidebarXButton.addEventListener('click',(event)=>{
        sidebarXButton.parentNode.parentNode.style.display = "none";
    })
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