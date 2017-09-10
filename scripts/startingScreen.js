$('select').change(function(){
    localStorage.setItem('difficulty', $(this).val());
    console.log($(this).val());
  });

$('select').val(localStorage.getItem('difficulty'));


