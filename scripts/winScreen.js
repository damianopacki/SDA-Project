let result = localStorage.getItem('result');
$('#finalScore').html(result);

let first = localStorage.getItem('1st');  
let second = localStorage.getItem('2nd');  
let third = localStorage.getItem('3rd');  
let fourth = localStorage.getItem('4th');  
let fifth = localStorage.getItem('5th'); 

let firstName = localStorage.getItem('1name');
let secondName = localStorage.getItem('2name');
let thirdName = localStorage.getItem('3name');
let fourthName = localStorage.getItem('4name');
let fifthName = localStorage.getItem('5name');

$('#1st').html('1. ' + firstName + ' - ' + first);
$('#2nd').html('2. ' + secondName + ' - ' + second);
$('#3rd').html('3. ' + thirdName + ' - ' + third);
$('#4th').html('4. ' + fourthName + ' - ' + fourth);
$('#5th').html('5. ' + fifthName + ' - ' + fifth);