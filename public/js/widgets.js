$(init);

function init()
{

	$( "#datepicker" ).datepicker({
	      changeMonth: true,
	      changeYear: true
	});

    $( "#gender" ).selectmenu();
    $( function() {
        $( "#accordion" ).accordion();
    });

      $(function() {
      $("#tabs").tabs();
      });

}
