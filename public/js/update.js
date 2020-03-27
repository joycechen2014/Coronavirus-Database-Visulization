$(function () {
    var dialog, form;
    dialog = $("#dialog-form2").dialog({
        autoOpen: false,
        modal: true,
        close: function () { }
    });
    $(".btn-update").button().on('click', function () {
        dialog.dialog("open");
        var countryname = $(this).parents("tr").find("td").eq(0).text();
        var date = $(this).parents("tr").find("td").eq(1).text();
        var type = $(this).parents("tr").find("td").eq(2).text();
        var totalnum = $(this).parents("tr").find("td").eq(3).text();
        var newnum = $(this).parents("tr").find("td").eq(4).text();
        var id = $(this).parents("tr").find("td").eq(5).find('.btn-update').val();
        $("input[name=countryname]").val(countryname);
        $("input[name=date]").val(date);
        $("input[name=type]").val(type);
        $("input[name=totalnumber]").val(totalnum);
        $("input[name=newnumber]").val(newnum);
        $("input[name=id]").val(id);
    });
})