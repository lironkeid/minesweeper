'use strict'

var gBoard 
const MINE = 'MINE'
const MINE_IMG = '💣'
const FLAG_IMG = '🚩'
const boardPositions = [];

var gLevel = { 
    SIZE: 4, 
    MINES: 2 
}

var gGame = { 
    isOn: false, 
    shownCount: 0, 
    markedCount: 0, 
    secsPassed: 0 
}

function onInit(){
    gBoard = buildBoard(gLevel.SIZE)
    createMines();
    boardPositions.forEach((value) => { // for each position in the boardPosition array runt he following code
        console.log(value)
        setMinesNegsCount(value.i, value.j)
    })
    renderBoard(gBoard);
}

function buildBoard(SIZE) { //setting the board's size and build the array's structure
    const mat = []
    for (var i = 0; i < SIZE; i++) {
        const row = []
        for (var j = 0; j < SIZE; j++) {
            row.push({
                minesAroundCount: 0, 
                isShown: false, 
                isMine: false, 
                isMarked: false 
            })
            boardPositions.push({i,j});
        }
        mat.push(row)
    }
    return mat
}




function renderBoard(board) { // push the gBoard array into the DOM.
    const elBoard = document.querySelector('.board')
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < board[0].length; j++) {
            const currCell = board[i][j]
            var cellClass = getClassName({i:i, j:j})
            var cellContent
            // currCell.isShown ? cellClass += '': cellClass += " hidden" //hidden for debuging
            if (currCell.isMine) cellContent = MINE_IMG
            else if (currCell.minesAroundCount > 0) cellContent = currCell.minesAroundCount
            else cellContent = ''
            strHTML += `\t<td id="cellClass" class="cell ${cellClass}" onclick="cellClicked(${i},${j})" onclick="cellMarked(this)"><span>${cellContent}</span>`
        }
        strHTML += '</td\n'
        strHTML += '</tr>\n'
    }
    elBoard.innerHTML = strHTML
}

function createMines(){
    for( var i=0; i<gLevel.MINES; i++){
        var randIdx = getRandomInt(0, boardPositions.length-1);
        var randPos = boardPositions.splice(randIdx, 1);
        gBoard[randPos[0].i][randPos[0].j].isMine = true;
    }
}

function setMinesNegsCount(cellI, cellJ) {
    var neighborsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue; // cells placed in the edges.
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue; // Edges.
            if (i === cellI && j === cellJ) continue; //Skips the cell itself.
            if (gBoard[i][j].isMine) neighborsCount++
        }
    }
    gBoard[cellI][cellJ].minesAroundCount = neighborsCount;
}


// function onCellClicked(elCell, i, j) {
// var cellCoord = getCellCoord(elCell.id)
// var cellClicked = gBoard[cellCoord.i][cellCoord.j]

//  if(cellClicked===MINE) 'GAME OVER'
// }



// }
// function startTime() {
//     const today = new Date();
//     var seconds = today.getSeconds();
//     seconds = checkTime(seconds);
//     document.getElementById('txt').innerHTML = seconds;
//     // setTimeout(startTime, 1000);
//   }


//   function checkTime(i) {
//     if (i < 10) {i = "0" + "0" + i};  // add zero in front of numbers < 10
//     return i
//   }




