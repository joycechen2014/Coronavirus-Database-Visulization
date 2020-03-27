
    $(function () {
        var dialog, form;
        dialog = $("#dialog-form1").dialog({
            autoOpen: false,
            modal: true,
            close: function () { }
        });
        $(".btn-add").button().on('click', function () {
            dialog.dialog("open");
        });
    })
