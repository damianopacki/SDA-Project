const memoryGame = {

    easyArray: ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'],
    mediumArray: ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L', 'Ł', 'Ł', 'M', 'M', 'N', 'N', 'Ń', 'Ń', 'O', 'O', 'Ó', 'Ó'],
    hardArray: ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L', 'Ł', 'Ł', 'M', 'M', 'N', 'N', 'Ń', 'Ń', 'O', 'O', 'Ó', 'Ó', 'P', 'P','A-hard', 'A-hard', 'B-hard', 'B-hard', 'C-hard', 'C-hard', 'D-hard', 'D-hard', 'E-hard', 'E-hard', 'F-hard', 'F-hard', 'G-hard', 'G-hard', 'H-hard', 'H-hard', 'A-1', 'A-1', 'B-1', 'B-1', 'C-1', 'C-1', 'D-1', 'D-1', 'E-1', 'E-1', 'V-1', 'V-1'],
    memoryValues: [],
    tileIds: [],
    tilesReverted: 0,
    output: '',
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
            $('.tile').css({'width': '120px', 'height': '105px', 'font-size': '42px'});
        } 
        else {
            memoryGame.createBoard(memoryGame.hardArray);
            $('.tile').css({'width': '100px', 'height': '100px', 'font-size': '28px'});            
        }   
    },
    shuffleTiles: function(array) {
        return array.sort(() => Math.random() - 0.5);
    },
    createBoard: function(array) {
        memoryGame.shuffleTiles(array);
        for (let i = 0; i < array.length; i++) {
            memoryGame.output += '<div class="tile" id="title'+i+'" onclick="memoryGame.revertTile(this, \''+ array[i] +'\')"></div>';   
            memoryGame.manageBoardRows(i);      
        }
        $('#gameBoard').html(memoryGame.output);   
    },
    manageBoardRows: function(index) {
        console.log('test');
        if (memoryGame.difficulty === 'Easy' &&  (index + 1) % 4 === 0) {
            memoryGame.output += '<div style="clear:both;"></div>'; 
        }
        else if (memoryGame.difficulty === 'Medium' && (index + 1) % 6 === 0) {
            memoryGame.output += '<div style="clear:both;"></div>';
        }
        else if (memoryGame.difficulty === 'Hard' && (index + 1) % 11 === 0 ) {
            memoryGame.output += '<div style="clear:both;"></div>';                    
        } 
    },
    revertTile: function(tile, val) {

        if ($('#pause').hasClass('pauseGame')) return;
        
        if (tile.innerHTML === "" && memoryGame.memoryValues.length < 2) {
            tile.style.background = '#FFF';
            tile.innerHTML = val;
            if (memoryGame.memoryValues.length === 0) {
                memoryGame.memoryValues.push(val);
                memoryGame.tileIds.push(tile.id);
            } 
            else if (memoryGame.memoryValues.length === 1) {
                memoryGame.memoryValues.push(val);
                memoryGame.tileIds.push(tile.id);
                if (memoryGame.memoryValues[0] === memoryGame.memoryValues[1]) {
                    memoryGame.tilesReverted += 2;
                    // Clear both arrays
                    memoryGame.memoryValues = [];
                    memoryGame.tileIds = [];
                    // Check to see if the whole board is cleared
                    if (memoryGame.tilesReverted === memoryGame.easyArray.length) {
                        alert('board cleared... generating new board');
                        $('#gameBoard').html('');
                        memoryGame.createBoard(memoryGame.easyArray);
                    }
                } else {
                    setTimeout(memoryGame.revertTileBack, 700);
                }
            }
        }

    }, 
    revertTileBack: function() {
        // Flip the 2 tiles back over 
        const tile1 = document.getElementById(memoryGame.tileIds[0]);
        const tile2 = document.getElementById(memoryGame.tileIds[1]);
        $(tile1).css({'background-color': '#120D0D', 'background-image': 'url(../imgs/question.png)', 'background-position': 'center', 'background-repeat': 'no-repeat', 'background-size': 'contain'});
        tile1.innerHTML = "";
        $(tile2).css({'background-color': '#120D0D', 'background-image': 'url(../imgs/question.png)', 'background-position': 'center', 'background-repeat': 'no-repeat', 'background-size': 'contain'});
        tile2.innerHTML = "";
        // Clear both arrays
        memoryGame.memoryValues = [];
        memoryGame.tileIds = [];
    },
}

memoryGame.init();
console.log(memoryGame.difficulty);