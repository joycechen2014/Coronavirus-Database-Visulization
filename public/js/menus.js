window.onload = init;

function init() {
  var allLinks = document.getElementsByTagName("a");
  for(let i = 0; i < allLinks.length; i++){
    if(allLinks[i].className === "main_menu"){
      allLinks[i].onmouseover = toggleMenu;
      allLinks[i].onclick = clickHandler;
    }
  }

  function clickHandler(event) {
    event.preventDefault();
  }

  function toggleMenu() {
    const menu_name = this.innerHTML;
    console.log(menu_name);
    // const thisMenuName = "menu_"+menu_name.toLowerCase();
    const thisMenuName = menu_name.indexOf("<")>=0? "menu_avatar" : "menu_"+menu_name.toLowerCase();
    console.log(thisMenuName);
    const menuParent = document.getElementById(thisMenuName).parentNode;
    const thisMenuStyle = document.getElementById(thisMenuName).style;

    thisMenuStyle.display = "block";

    menuParent.onmouseout = function () {
      thisMenuStyle.display = "none";
    };

    menuParent.onmouseover = function () {
      thisMenuStyle.display = "block";
    };
  }
}
