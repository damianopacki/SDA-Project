$('#difficulties').change(function(){
    localStorage.setItem('difficulty', $(this).val());
    console.log($(this).val());
  });

$('#difficulties').val(localStorage.getItem('difficulty'));
