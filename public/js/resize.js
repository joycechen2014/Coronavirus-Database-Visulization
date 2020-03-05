$(init);

function init()
{
    $("#resizeMe").resizable();

    $("h1.resize").addClass("ui-widget")
            .addClass("ui-widget-content")
            .addClass("ui-corner-all");
}