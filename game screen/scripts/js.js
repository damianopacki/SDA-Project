// const easyArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
// let memoryValues = [];
// let tileIds = [];
// let tilesReverted = 0;

// function shuffleTiles (array) {
//     return array.sort(() => Math.random() - 0.5);
//   }

// function newGameBoard(array) {
//     let output = '';
//     console.log(easyArray);
//     shuffleTiles(easyArray);
//     for (let i = 0; i < easyArray.length; i++) {
//         output += '<div id="title'+i+'" onclick="revertTile(this, \''+easyArray[i]+'\')"></div>';
//     }
//     console.log(easyArray);
    
    
//     document.getElementById('gameBoard').innerHTML = output;
// }

// window.onload = newGameBoard();

// function revertTile(tile, val) {
//     if (tile.innerHTML === "" && memoryValues.length < 2) {
//         tile.style.background = '#FFF';
//         tile.innerHTML = val;
//         if (memoryValues.length === 0) {
//             memoryValues.push(val);
//             tileIds.push(tile.id);
//         } 
//         else if (memoryValues.length === 1) {
//             memoryValues.push(val);
//             tileIds.push(tile.id);
//             if (memoryValues[0] === memoryValues[1]) {
//                 tilesReverted += 2;
//                 // Clear both arrays
//                 memoryValues = [];
//                 tileIds = [];
//                 // Check to see if the whole board is cleared
//                 if (tilesReverted === easyArray.length) {
//                     alert('board cleared... generating new board');
//                     document.getElementById('gameBoard').innerHTML = '';
//                     newGameBoard();
//                 }
//             } else {
//                 setTimeout(revertTileBack, 700);
//             }
//         }

//     }
// }

// function revertTileBack() {
//     // Flip the 2 tiles back over 
//     const tile1 = document.getElementById(tileIds[0]);
//     const tile2 = document.getElementById(tileIds[1]);
//     tile1.style.background = 'yellow';
//     tile1.innerHTML = "";
//     tile2.style.background = 'yellow';
//     tile2.innerHTML = "";
//     // Clear both arrays
//     memoryValues = [];
//     tileIds = [];
// }




const memoryGame = {

    easyArray: ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'],
    memoryValues: [],
    tileIds: [],
    tilesReverted: 0,

    init: function() {
        memoryGame.newGameBoard(memoryGame.easyArray);
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
