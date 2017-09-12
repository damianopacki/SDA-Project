var memoryGame = {
    gameArray: [],
    easyArray: ['../imgs/1.png', '../imgs/1.png', '../imgs/2.png', '../imgs/2.png', '../imgs/3.png', '../imgs/3.png', '../imgs/4.png', '../imgs/4.png', '../imgs/5.png', '../imgs/5.png', '../imgs/6.png', '../imgs/6.png', '../imgs/7.png', '../imgs/7.png', '../imgs/8.png', '../imgs/8.png', '../imgs/9.png', '../imgs/9.png'],
    mediumArray: ['../imgs/1.png', '../imgs/1.png', '../imgs/2.png', '../imgs/2.png', '../imgs/3.png', '../imgs/3.png', '../imgs/4.png', '../imgs/4.png', '../imgs/5.png', '../imgs/5.png', '../imgs/6.png', '../imgs/6.png', '../imgs/7.png', '../imgs/7.png', '../imgs/8.png', '../imgs/8.png', '../imgs/9.png', '../imgs/9.png', '../imgs/10.png', '../imgs/10.png', '../imgs/11.png', '../imgs/11.png', '../imgs/12.png', '../imgs/12.png', '../imgs/13.png', '../imgs/13.png', '../imgs/14.png', '../imgs/14.png', '../imgs/15.png', '../imgs/15.png', '../imgs/16.png', '../imgs/16.png', '../imgs/17.png', '../imgs/17.png', '../imgs/18.png', '../imgs/18.png'],
    hardArray: ['../imgs/1.png', '../imgs/1.png', '../imgs/2.png', '../imgs/2.png', '../imgs/3.png', '../imgs/3.png', '../imgs/4.png', '../imgs/4.png', '../imgs/5.png', '../imgs/5.png', '../imgs/6.png', '../imgs/6.png', '../imgs/7.png', '../imgs/7.png', '../imgs/8.png', '../imgs/8.png', '../imgs/9.png', '../imgs/9.png', '../imgs/10.png', '../imgs/10.png', '../imgs/11.png', '../imgs/11.png', '../imgs/12.png', '../imgs/12.png', '../imgs/13.png', '../imgs/13.png', '../imgs/14.png', '../imgs/14.png', '../imgs/15.png', '../imgs/15.png', '../imgs/16.png', '../imgs/16.png', '../imgs/17.png', '../imgs/17.png', '../imgs/18.png', '../imgs/18.png', '../imgs/19.png', '../imgs/19.png', '../imgs/20.png', '../imgs/20.png', '../imgs/21.png', '../imgs/21.png', '../imgs/22.png', '../imgs/22.png', '../imgs/23.png', '../imgs/23.png', '../imgs/24.png', '../imgs/24.png', '../imgs/25.png', '../imgs/25.png', '../imgs/26.png', '../imgs/26.png', '../imgs/27.png', '../imgs/27.png', '../imgs/28.png', '../imgs/28.png', '../imgs/29.png', '../imgs/29.png', '../imgs/30.png', '../imgs/30.png', '../imgs/31.png', '../imgs/31.png', '../imgs/32.png', '../imgs/32.png','../imgs/33.png', '../imgs/33.png'],
    memoryValues: [],
    tileIds: [],
    tilesReverted: 0,
    output: '',
    timeLeft: $('#countdown'),
    score: 0,
    difficulty: localStorage.getItem('difficulty'),

    init: function() {
        if (memoryGame.difficulty === 'Easy') {
            memoryGame.gameArray = memoryGame.easyArray;
            memoryGame.createBoard(memoryGame.easyArray);
            $('#gameBoard').css({'display': 'flex', 'display': '-webkit-flex', 'justify-content': 'center', '-webkit-justify-content': 'center', 'align-items': 'center', '-webkit-align-items': 'center', 'flex-wrap': 'wrap', 'margin-top': '20px'});
            $('.tile').css({'width': '220px', 'height': '210px'});    
            memoryGame.checkDeviceSize();       
        } 
        else if (memoryGame.difficulty === 'Medium') {
            memoryGame.gameArray = memoryGame.mediumArray;            
            memoryGame.createBoard(memoryGame.mediumArray);
            $('#gameBoard').css({'display': 'flex', 'display': '-webkit-flex', 'justify-content': 'center', '-webkit-justify-content': 'center', 'align-items': 'center', '-webkit-align-items': 'center', 'flex-wrap': 'wrap', 'margin-top': '20px'});            
            $('.tile').css({'width': '160px', 'height': '150px', 'font-size': '42px'}); 
            memoryGame.checkDeviceSize();                   
        } 
        else {
            memoryGame.gameArray = memoryGame.hardArray;            
            memoryGame.createBoard(memoryGame.hardArray);
            $('#gameBoard').css({'display': 'flex','display': '-webkit-flex', 'justify-content': 'center', '-webkit-justify-content': 'center', 'align-items': 'center', '-webkit-align-items': 'center', 'flex-wrap': 'wrap', 'margin-top': '20px'});
            $('.tile').css({'width': '130px', 'height': '100px', 'font-size': '28px'});   
            memoryGame.checkDeviceSize();                   
        } 
    },
    shuffleTiles: function(array) {
        // return array.sort(() => Math.random() - 0.5);
        var i = array.length, j, temp;
        while(--i > 0) {
            j = Math.floor(Math.random() * (i + 1));
            temp = array[j];
            array[j] = array[i];
            array[i] = temp;
        } 
    },
    createBoard: function(array) {
        memoryGame.shuffleTiles(array);
        for (var i = 0; i < array.length; i++) {
            memoryGame.output += '<div class="tile" id="title'+i+'" onclick="memoryGame.revertTile(this, \''+ array[i] +'\')"></div>';   

            // 3D flipping card effect
            // memoryGame.output += '<div class="tile card flip" id="title'+i+'" onclick="memoryGame.revertTile(this, \''+ array[i] +'\')"><div class="back" id="back'+i+'"></div><div class="front" id="front'+i+'"></div></div>';  
        }
        $('#gameBoard').html(memoryGame.output); 
    },

    // function resposible for setting up responsive game board
    checkDeviceSize: function() {
        var deviceWidth = $(window).width();
        console.log('deviceSize: ', deviceWidth);
        if (deviceWidth <= 768 && memoryGame.difficulty === 'Easy') $('.tile').css({'width': '60px', 'height': '40px'});
        else if (deviceWidth <= 768 && memoryGame.difficulty === 'Medium') $('.tile').css({'width': '110px', 'height': '100px'});
        else if (deviceWidth <= 768) $('.tile').css({'width': '10px', 'height': '10px'});        
        else if (deviceWidth >= 768 && deviceWidth <= 1024 && memoryGame.difficulty === 'Easy') $('.tile').css({'width': '180px', 'height': '160px'});    
    },
    countScore: function() {
        if (memoryGame.memoryValues[0] === memoryGame.memoryValues[1]) {
            if (memoryGame.difficulty === 'Easy') memoryGame.score += 5; 
            else if (memoryGame.difficulty === 'Medium') memoryGame.score += 7;                                          
            else memoryGame.score += 10;
        }
        $('#scoreCounter').html(memoryGame.score);
    },
    revertTile: function(tile, val) {
        if ($('#pause').hasClass('pauseGame')) return;
        if ($(tile).hasClass('reverted')) return;

        if ($(tile).html() === "" && memoryGame.memoryValues.length < 2) {
            $(tile).css({
                'background-color': '#fff',
                'background-image': 'url("'+ val + '")',
                'background-position': 'center', 
                'background-repeat': 'no-repeat', 
                'background-size': 'contain',
            });
            if (memoryGame.memoryValues.length === 0) {
                memoryGame.memoryValues.push(val);
                memoryGame.tileIds.push(tile.id);
                var firstCard = $(memoryGame.tileIds)[0];
                $('#' + firstCard).addClass('reverted');
            } 
            else if (memoryGame.memoryValues.length === 1) {
                var firstCard = $(memoryGame.tileIds)[0];            
                $('#' + firstCard).removeClass('reverted');                                                    
                memoryGame.memoryValues.push(val);
                memoryGame.tileIds.push(tile.id);
                if (memoryGame.memoryValues[0] === memoryGame.memoryValues[1]) {     
                    var card1 = $(memoryGame.tileIds)[0];
                    var card2 = $(memoryGame.tileIds)[1];         
                    $('#' + card1).addClass('reverted');
                    $('#'+ card2).addClass('reverted');                                                  
                    memoryGame.tilesReverted += 2;
                    // Clear both arrays
                    memoryGame.memoryValues = [];
                    memoryGame.tileIds = [];
                    // Check to see if the whole board is cleared
                    if (memoryGame.tilesReverted === memoryGame.gameArray.length) {
                        sideMenu.running = false;
                        // setting up score system
                        var name = prompt('please enter your name');
                        var timeScore = sideMenu.timer.html().match(/\d/g);
                        timeScore = timeScore[1] + timeScore[2] + timeScore[3];                        
                        if (memoryGame.difficulty === 'Easy') memoryGame.score += (timeScore * 5);
                        else if (memoryGame.difficulty === 'Medium') memoryGame.score += (timeScore * 7);
                        else memoryGame.score += (timeScore * 10);
                        localStorage.setItem('result', memoryGame.score);
                        memoryGame.createScoreboard(name);
                        document.location.href = "../win screen/index.html";
                    }
                } else {
                    $(tile).removeClass('reverted');
                    setTimeout(memoryGame.revertTileBack, 500);
                }
            }
        }
        memoryGame.countScore();
    }, 
    revertTileBack: function() {
        // Flip the 2 tiles back over 
        var tile1 = document.getElementById(memoryGame.tileIds[0]);
        var tile2 = document.getElementById(memoryGame.tileIds[1]);
        $(tile1).css({
            'background-color': '#0093FF', 
            'background-image': 'url(../imgs/question.png)', 
            'background-position': 'center', 
            'background-repeat': 'no-repeat', 
            'background-size': 'contain'
        });
        $(tile1).html('');
        $(tile2).css({
            'background-color': '#0093FF', 
            'background-image': 'url(../imgs/question.png)', 
            'background-position': 'center', 
            'background-repeat': 'no-repeat', 
            'background-size': 'contain'
        });
        $(tile2).html('');
        // Clear both arrays
        memoryGame.memoryValues = [];
        memoryGame.tileIds = [];
    },
    createScoreboard: function(name) {
        var result = localStorage.getItem('result');
        scoresArray = JSON.parse(localStorage.getItem('highscores')) || [];
        scoresArray.push({name: name, score: result});
        scoresArray.sort(function(a, b) {
            return parseFloat(b.score) - parseFloat(a.score);
        });
        localStorage.setItem('highscores', JSON.stringify(scoresArray));         
    }
}

var sideMenu = {
    running: true,
    timer: $('#countdown'),
    score: 0,
    difficulty: localStorage.getItem('difficulty'),
    init: function() {
        // sideMenu.startTimer();
        sideMenu.displayDifficulty(); 
        if (memoryGame.difficulty === 'Easy') sideMenu.countdown.start(180000);
        else if (memoryGame.difficulty === 'Medium') sideMenu.countdown.start(240000);
        else if (memoryGame.difficulty === 'Hard') sideMenu.countdown.start(300000);        
        
        $('#pause').on('click', sideMenu.pauseGame);
        $('#resume').on('click', sideMenu.resumeGame);
    },
    displayDifficulty: function() {
        $('#difficulty').html(sideMenu.difficulty);
    },
    countdown: function () {
        // Length ms 
        var timeout = 10000;
        // Interval ms
        var timeGap = 1000;   
        var currentTime = ( new Date() ).getTime();
        var endTime = ( new Date() ).getTime() + timeout; 
        var pauseButton = $('#pause');
        var resumeButton = $('#resume').hide();
        
        var updateTimer = function() {
            // Run till timeout
            if (currentTime + timeGap < endTime) {
                setTimeout( updateTimer, timeGap );
            }
            // countdown if sideMenu.running
            if (sideMenu.running) {
                currentTime += timeGap;
                if (currentTime >= endTime) {
                    sideMenu.timer.css('color','red');
                    document.location.href = "file:///C:/Users/Damian/Documents/SDA-Project/lose%20screen/index.html";
                }
            }
            // Update Gui
            var time = new Date();
            time.setTime( endTime - currentTime );
            var Minutes = time.getMinutes();
            var Seconds = time.getSeconds();
            
            sideMenu.timer.html( 
                (Minutes < 10 ? '0' : '') + Minutes 
                + ':' 
                + (Seconds < 10 ? '0' : '') + Seconds );      
        };
        var pause = function() {
            sideMenu.running = false;
            pauseButton.hide();
            resumeButton.show();
        }; 
        var resume = function() {
            sideMenu.running = true;
            pauseButton.show();
            resumeButton.hide();
        };
        var start = function(timeout) {
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
    }(),
    pauseGame: function() {
        sideMenu.countdown.pause()
        $('#pause').addClass('pauseGame');
    },
    resumeGame: function() {
        sideMenu.countdown.resume();
        $('#pause').removeClass('pauseGame');
    },

}

memoryGame.init();
console.log(memoryGame.difficulty);
sideMenu.init();
