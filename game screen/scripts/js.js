const memoryGame = {

    easyArray: ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'],
    mediumArray: ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L', 'Ł', 'Ł', 'M', 'M', 'N', 'N', 'Ń', 'Ń', 'O', 'O', 'Ó', 'Ó', 'P', 'P'],
    hardArray: ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L', 'Ł', 'Ł', 'M', 'M', 'N', 'N', 'Ń', 'Ń', 'O', 'O', 'Ó', 'Ó', 'P', 'P','A-hard', 'A-hard', 'B-hard', 'B-hard', 'C-hard', 'C-hard', 'D-hard', 'D-hard', 'E-hard', 'E-hard', 'F-hard', 'F-hard', 'G-hard', 'G-hard', 'H-hard', 'H-hard', 'A-1', 'A-1', 'B-1', 'B-1', 'C-1', 'C-1', 'D-1', 'D-1', 'E-1', 'E-1', 'F-1', 'F-1', 'G-1', 'G-1'],
    memoryValues: [],
    tileIds: [],
    tilesReverted: 0,
    difficulty: localStorage.getItem('difficulty'),
    

    init: function() {
        if (memoryGame.difficulty === 'Easy') memoryGame.newGameBoard(memoryGame.easyArray);
        else if (memoryGame.difficulty === 'Medium') memoryGame.newGameBoard(memoryGame.mediumArray);
        // else (memoryGame.difficulty === 'Medium') memoryGame.newGameBoard(memoryGame.mediumArray);   
    },

    shuffleTiles: function(array) {
        return array.sort(() => Math.random() - 0.5);
    },
    newGameBoard: function(array) {
        let output = '';
        console.log(memoryGame.easyArray);
        memoryGame.shuffleTiles(array);
        for (let i = 0; i < array.length; i++) {
            output += '<div id="title'+i+'" onclick="memoryGame.revertTile(this, \''+ array[i] +'\')"></div>';
        }
        console.log(output);
        console.log(array);
        
        $('#gameBoard').html(output);
    },
    revertTile: function(tile, val) {
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
                        memoryGame.newGameBoard(memoryGame.easyArray);
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
        tile1.style.background = 'yellow';
        tile1.innerHTML = "";
        tile2.style.background = 'yellow';
        tile2.innerHTML = "";
        // Clear both arrays
        memoryGame.memoryValues = [];
        memoryGame.tileIds = [];
    },
}

memoryGame.init();
console.log(memoryGame.difficulty);