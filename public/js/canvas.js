window.onload = function() {
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");
  context.font = "bold 16px Arial";
  context.fillStyle = "red";
  context.fillText("PRAY FOR WUHAN!", 25, 45);
};


$(init);
function init() {
  $("#topPay").draggable();
  $(".wrap1").droppable();

  $(".wrap1").bind("drop", highlightTarget);
  $(".wrap1").bind("dropout", reset);
}

function highlightTarget(event, ui) {
  $(".wrap1").addClass("dropChange");
}

function reset(event, ui) {
  $(".wrap1").removeClass("dropChange");
}
