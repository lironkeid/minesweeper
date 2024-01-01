'use strict'


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  function getRandomEmptyCell() {
    const emptyCells = []
    for (var i=0; i < gBoard.length; i++){
        for(var j = 0; j < gBoard[i].length; j++){
            const cell = gBoard[i][j].isMine
            if(cell === 'EMPTY') emptyCells.push({i,j})
        }
    }

    if(!emptyCells.length) return null

    const randIdx = getRandomInt(0, emptyCells.length)
    return emptyCells[randIdx]
}

function getClassName(location) {
    return 'cell-' + location.i + '-' + location.j;
}