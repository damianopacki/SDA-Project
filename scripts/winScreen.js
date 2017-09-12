var result = localStorage.getItem('result');
var scoresArray = JSON.parse(localStorage.getItem('highscores')) || [];
$('#finalScore').html(result);

scoresArray[0] ? $('#1st').html('1. ' + scoresArray[0].name + ' - ' + scoresArray[0].score) : $('#1st').html('---');
scoresArray[1] ? $('#2nd').html('2. ' + scoresArray[1].name + ' - ' + scoresArray[1].score) : $('#2nd').html('---');
scoresArray[2] ? $('#3rd').html('3. ' + scoresArray[2].name + ' - ' + scoresArray[2].score) : $('#3rd').html('---');
scoresArray[3] ? $('#4th').html('4. ' + scoresArray[3].name + ' - ' + scoresArray[3].score) : $('#4th').html('---');
scoresArray[4] ? $('#5th').html('5. ' + scoresArray[4].name + ' - ' + scoresArray[4].score) : $('#5th').html('---');