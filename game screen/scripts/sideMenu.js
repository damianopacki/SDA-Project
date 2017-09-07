let sideMenu = {
    init: function() {
        // sideMenu.startTimer();
        sideMenu.displayDifficulty(); 
        sideMenu.countdown.start(5000);  
        sideMenu.pauseGame();
        sideMenu.resumeGame(); 
    },

    difficulty: localStorage.getItem('difficulty'),
    // timer: $('#timer').html(00 + ':' + 05),

    displayDifficulty: function() {
        $('#difficulty').html(sideMenu.difficulty);
    },

    countdown: function ($) {
        // Length ms 
        let timeout = 10000;
        // Interval ms
        let timeGap = 1000;   
        let currentTime = ( new Date() ).getTime();
        let endTime = ( new Date() ).getTime() + timeout; 
        let timer = $('#countdown');
        let pauseButton = $('#pause');
        let resumeButton = $('#resume').hide();
        let running = true;
        let updateTimer = function() {
            // Run till timeout
            if (currentTime + timeGap < endTime) {
                setTimeout( updateTimer, timeGap );
            }
            // countdown if running
            if (running) {
                currentTime += timeGap;
                if (currentTime >= endTime) {
                    timer.css('color','red');
                    swal('Game over',
                     'Good Luck next time!');
                }
            }
            // Update Gui
            let time = new Date();
            time.setTime( endTime - currentTime );
            let Minutes = time.getMinutes();
            let Seconds = time.getSeconds();
            
            timer.html( 
                (Minutes < 10 ? '0' : '') + Minutes 
                + ':' 
                + (Seconds < 10 ? '0' : '') + Seconds );
        };
        let pause = function() {
            running = false;
            pauseButton.hide();
            resumeButton.show();
        }; 
        let resume = function() {
            running = true;
            pauseButton.show();
            resumeButton.hide();
        };
        let start = function(timeout) {
            timeout = timeout;
            currentTime = ( new Date() ).getTime();
            endTime = ( new Date() ).getTime() + timeout;
            updateTimer();
        }
        return {
            pause: pause,
            resume: resume,
            start: start
        };
    }(jQuery),
    pauseGame: function() {
        $('#pause').on('click', sideMenu.countdown.pause);
    },
    resumeGame: function() {
        $('#resume').on('click', sideMenu.countdown.resume);
    }

}

sideMenu.init();
