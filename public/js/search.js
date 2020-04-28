$(function () {
    var dialog, form;
    dialog = $("#dialog-form3").dialog({
        autoOpen: false,
        modal: true,
        close: function () { }
    });
    $(".btn-search").button().on('click', function () {
        dialog.dialog("open");
    });

    $("#dialog-form3").submit(function (e) {
        e.preventDefault();
        window.open(`${window.location.origin}/management/${$("#dialog-form3 input[name=incidntnum]").val()}`, '_self')
    })
})