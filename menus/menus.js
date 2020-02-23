window.onload = init;

function init() {
  const allLinks = document.getElementById("a");
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
    const startName = this.href.lastIndexOf("/") + 1;
    const stopName = this.href.lastIndexOf(".");
    const thisMenuName = this.href.substring(startName, stopName);
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
