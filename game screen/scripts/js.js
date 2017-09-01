const easyArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let memoryValues = [];
let tileIds = [];
let tilesReverted = 0;


Array.prototype.shuffleTiles = function() {
    let i = this.length, j, temp;
    while(--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    } 
}

function newGameBoard(array) {
    let output = '';
    easyArray.shuffleTiles();
    for (let i = 0; i < easyArray.length; i++) {
        output += '<div id="title'+i+'" onclick="revertTile(this, \''+easyArray[i]+'\')"></div>';
    }
    
    document.getElementById('gameBoard').innerHTML = output;
}

window.onload = newGameBoard();

function revertTile(tile, val) {
    if (tile.innerHTML === "" && memoryValues.length < 2) {
        tile.style.background = '#FFF';
        tile.innerHTML = val;
        if (memoryValues.length === 0) {
            memoryValues.push(val);
            tileIds.push(tile.id);
        } 
        else if (memoryValues.length === 1) {
            memoryValues.push(val);
            tileIds.push(tile.id);
            if (memoryValues[0] === memoryValues[1]) {
                tilesReverted += 2;
                // Clear both arrays
                memoryValues = [];
                tileIds = [];
                // Check to see if the whole board is cleared
                if (tilesReverted === easyArray.length) {
                    alert('board cleared... generating new board');
                    document.getElementById('gameBoard').innerHTML = '';
                    newGameBoard();
                }
            } else {
                setTimeout(revertTileBack, 700);
            }
        }

    }
}

function revertTileBack() {
    // Flip the 2 tiles back over 
    const tile1 = document.getElementById(tileIds[0]);
    const tile2 = document.getElementById(tileIds[1]);
    tile1.style.background = 'yellow';
    tile1.innerHTML = "";
    tile2.style.background = 'yellow';
    tile2.innerHTML = "";
    // Clear both arrays
    memoryValues = [];
    tileIds = [];
}