let sideMenu = {
    init: function() {
        sideMenu.startTimer();
        sideMenu.displayDifficulty();       
    },

    difficulty: localStorage.getItem('difficulty'),
    timer: $('#timer').html(03 + ':' + 00),

    displayDifficulty: function() {
        $('#difficulty').html(sideMenu.difficulty);
    },
    startTimer: function() {
        let presentTime = sideMenu.timer.html();
        let timeArray = presentTime.split(/[:]+/);
        let minutes = timeArray[0];
        let seconds = sideMenu.checkSecond((timeArray[1] - 1));
        if (seconds === 59) {minutes = minutes - 1}
        $('#timer').html(minutes + ":" + seconds);
        let countdown = setTimeout(sideMenu.startTimer, 1000);
        sideMenu.pauseTimer(countdown);
    },
    checkSecond: function(sec) {
        if (sec < 10 && sec >= 0) {sec = "0" + sec};
        if (sec < 0) {sec = "59"};
        return sec;
    },
    pauseTimer: function(timer) {
        $('#pauseButton').click(function() {
            clearTimeout(timer);
            $(this).text('Resume');
        });
    },
}

sideMenu.init();
