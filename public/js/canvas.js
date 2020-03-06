window.onload = function() {
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");
  context.font = "bold 16px Arial";
  context.fillStyle = "red";
  context.fillText("PRAY FOR WUHAN!", 25, 45);
};

// Drag Me
$(init);
function init() {
  $("#topPay").draggable();
}
