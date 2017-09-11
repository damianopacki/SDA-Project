const memoryGame = {
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
            $('#gameBoard').css({'display': 'flex', 'justify-content': 'center', 'align-items': 'center', 'flex-wrap': 'wrap', 'margin-top': '20px'});
            $('.tile').css({'width': '240px', 'height': '220px'});    
            memoryGame.checkDeviceSize();       
        } 
        else if (memoryGame.difficulty === 'Medium') {
            memoryGame.gameArray = memoryGame.mediumArray;            
            memoryGame.createBoard(memoryGame.mediumArray);
            // $('#gameBoard').css({'position': 'absolute', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)'});
            $('#gameBoard').css({'display': 'flex', 'justify-content': 'center', 'align-items': 'center', 'flex-wrap': 'wrap', 'margin-top': '20px'});            
            $('.tile').css({'width': '160px', 'height': '160px', 'font-size': '42px'}); 
            memoryGame.checkDeviceSize();                   
        } 
        else {
            memoryGame.gameArray = memoryGame.hardArray;            
            memoryGame.createBoard(memoryGame.hardArray);
            $('#gameBoard').css({'display': 'flex', 'justify-content': 'center', 'align-items': 'center', 'flex-wrap': 'wrap', 'margin-top': '20px'});
            $('.tile').css({'width': '130px', 'height': '100px', 'font-size': '28px'});   
            memoryGame.checkDeviceSize();                   
        } 
    },
    shuffleTiles: function(array) {
        return array.sort(() => Math.random() - 0.5);
    },
    createBoard: function(array) {
        memoryGame.shuffleTiles(array);
        for (let i = 0; i < array.length; i++) {
            memoryGame.output += '<div class="tile" id="title'+i+'" onclick="memoryGame.revertTile(this, \''+ array[i] +'\')"></div>';   

            // 3D flipping card effect
            // memoryGame.output += '<div class="tile card flip" id="title'+i+'" onclick="memoryGame.revertTile(this, \''+ array[i] +'\')"><div class="back" id="back'+i+'"></div><div class="front" id="front'+i+'"></div></div>';  
        }
        $('#gameBoard').html(memoryGame.output); 
    },

    // function resposible for setting up responsive game board
    checkDeviceSize: function() {
        let deviceWidth = $(window).width();
        console.log('deviceSize: ', deviceWidth);
        if (deviceWidth <= 768 && memoryGame.difficulty === 'Easy') {
            $('.tile').css({'width': '140px', 'height': '125px'});
        }
        else if (deviceWidth <= 768 && memoryGame.difficulty === 'Medium') {
            $('.tile').css({'width': '80px', 'height': '70px'});
        }
        else if (deviceWidth <= 768) {
            $('.tile').css({'width': '10px', 'height': '10px'});      
        }
    },
    countScore: function() {
        if (memoryGame.memoryValues[0] === memoryGame.memoryValues[1]) {
            if (memoryGame.difficulty === 'Easy') memoryGame.score += 5; 
            else if (memoryGame.difficulty === 'Medium') memoryGame.score += 10;                                          
            else memoryGame.score += 20;
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
            } 
            else if (memoryGame.memoryValues.length === 1) {
                memoryGame.memoryValues.push(val);
                memoryGame.tileIds.push(tile.id);
                console.log('memoryGame.memoryValues', memoryGame.memoryValues);
                console.log('memoryGame.tileIds: ', memoryGame.tileIds);
                if (memoryGame.memoryValues[0] === memoryGame.memoryValues[1]) {     
                    let card1 = $(memoryGame.tileIds)[0];
                    let card2 = $(memoryGame.tileIds)[1];  
                    console.log('card1: ', card1);
                    console.log('card2: ', card2);         
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
                        let timeScore = sideMenu.timer.html().match(/\d/g);
                        timeScore = timeScore[1] + timeScore[2] + timeScore[3];                        
                        if (memoryGame.difficulty === 'Easy') memoryGame.score += (timeScore * 5);
                        else if (memoryGame.difficulty === 'Medium') memoryGame.score += (timeScore * 20);
                        else memoryGame.score += (timeScore * 50);
                        localStorage.setItem('highscore', memoryGame.score);
                        document.location.href = "file:///C:/Users/Damian/Documents/SDA-Project/win%20screen/index.html";
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
        const tile1 = document.getElementById(memoryGame.tileIds[0]);
        const tile2 = document.getElementById(memoryGame.tileIds[1]);
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
}

const sideMenu = {
    running: true,
    timer: $('#countdown'),
    score: 0,
    difficulty: localStorage.getItem('difficulty'),
    init: function() {
        // sideMenu.startTimer();
        sideMenu.displayDifficulty(); 
        sideMenu.countdown.start(180000);  
        $('#pause').on('click', sideMenu.pauseGame);
        $('#resume').on('click', sideMenu.resumeGame);
    },
    displayDifficulty: function() {
        $('#difficulty').html(sideMenu.difficulty);
    },
    countdown: function () {
        // Length ms 
        let timeout = 10000;
        // Interval ms
        let timeGap = 1000;   
        let currentTime = ( new Date() ).getTime();
        let endTime = ( new Date() ).getTime() + timeout; 
        let pauseButton = $('#pause');
        let resumeButton = $('#resume').hide();
        
        let updateTimer = function() {
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
            let time = new Date();
            time.setTime( endTime - currentTime );
            let Minutes = time.getMinutes();
            let Seconds = time.getSeconds();
            
            sideMenu.timer.html( 
                (Minutes < 10 ? '0' : '') + Minutes 
                + ':' 
                + (Seconds < 10 ? '0' : '') + Seconds );      
        };
        let pause = function() {
            sideMenu.running = false;
            pauseButton.hide();
            resumeButton.show();
        }; 
        let resume = function() {
            sideMenu.running = true;
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
