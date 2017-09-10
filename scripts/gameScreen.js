const memoryGame = {
    easyArray: ['../imgs/1.png', '../imgs/1.png', '../imgs/2.png', '../imgs/2.png', '../imgs/3.png', '../imgs/3.png', '../imgs/4.png', '../imgs/4.png', '../imgs/5.png', '../imgs/5.png', '../imgs/6.png', '../imgs/6.png', '../imgs/7.png', '../imgs/7.png', '../imgs/8.png', '../imgs/8.png'],
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
            memoryGame.createBoard(memoryGame.easyArray);
            $('#gameBoard').css({'position': 'absolute', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)'});
            $('.tile').css({'width': '160px', 'height': '150px'});
        } 
        else if (memoryGame.difficulty === 'Medium') {
            memoryGame.createBoard(memoryGame.mediumArray);
            $('#gameBoard').css({'position': 'absolute', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)'});
            $('.tile').css({'width': '122px', 'height': '100px', 'font-size': '42px'});
        } 
        else {
            memoryGame.createBoard(memoryGame.hardArray);
            $('#gameBoard').css({'display': 'flex', 'justify-content': 'center', 'align-items': 'center', 'flex-wrap': 'wrap', 'margin-top': '20px'});
            $('.tile').css({'width': '130px', 'height': '100px', 'font-size': '28px'});            
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

            memoryGame.manageBoardRows(i);   
        }
        $('#gameBoard').html(memoryGame.output); 
    },
    manageBoardRows: function(index) {
        if (memoryGame.difficulty === 'Easy' &&  (index + 1) % 4 === 0) {
            memoryGame.output += '<div style="clear:both;"></div>'; 
        }
        else if (memoryGame.difficulty === 'Medium' && (index + 1) % 6 === 0) {
            memoryGame.output += '<div style="clear:both;"></div>';
        }
        // else if (memoryGame.difficulty === 'Hard' && (index + 1) % 11 === 0 ) {
        //     memoryGame.output += '<div style="clear:both;"></div>';                    
        // } 
    },
    countScore: function() {
        $('#scoreCounter').html(memoryGame.score);
    },
    revertTile: function(tile, val) {

        if ($('#pause').hasClass('pauseGame')) return;
        
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
                if (memoryGame.memoryValues[0] === memoryGame.memoryValues[1]) {
                    memoryGame.tilesReverted += 2;
                    memoryGame.score += 10;
                    // Clear both arrays
                    memoryGame.memoryValues = [];
                    memoryGame.tileIds = [];
                    // Check to see if the whole board is cleared
                    if (memoryGame.tilesReverted === memoryGame.easyArray.length) {
                        sideMenu.running = false;
                        let timeScore = sideMenu.timer.html().match(/\d/g);
                        timeScore = timeScore[1] + timeScore[2] + timeScore[3];                        
                        if (memoryGame.difficulty === 'Easy') memoryGame.score += (timeScore * 5);
                        else if (memoryGame.difficulty === 'Medium') memoryGame.score += (timeScore * 20);
                        else memoryGame.score += (timeScore * 50);
                        console.log(memoryGame.score);
                        localStorage.setItem('highscore', memoryGame.score);
                        document.location.href = "file:///C:/Users/Damian/Documents/SDA-Project/win%20screen/index.html";
                    }
                } else {
                    setTimeout(memoryGame.revertTileBack, 700);
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

memoryGame.init();
console.log(memoryGame.difficulty);


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
                console.log('timer: ', sideMenu.timer.html());       
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

sideMenu.init();
