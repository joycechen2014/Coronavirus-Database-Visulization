
$(function () {
    var dialog;
    dialog = $("#dialog-confirm").dialog({
        autoOpen: false,
        modal: true,
        close: function () { }
    });
    $(".btn-delete").button().on('click', function () {
        dialog.dialog("open");
        var id = $(this).parents("tr").find("td").eq(5).find('.btn-delete').val();
        $("input[name=id]").val(id);
    });
})

