'use strict'

var gBoard 
const MINE = 'MINE'
const MINE_IMG = '<img src="img/mine.png">'

function onInitGame() {
    document.querySelector('.restart')

    gBoard = buildBoard()
    renderBoard(gBoard)
}

function startTime() {
    const today = new Date();
    var seconds = today.getSeconds();
    seconds = checkTime(seconds);
    document.getElementById('txt').innerHTML = seconds;
    // setTimeout(startTime, 1000);
  }

  function checkTime(i) {
    if (i < 10) {i = "0" + "0" + i};  // add zero in front of numbers < 10
    return i
  }


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

function buildBoard() {
    const board = createMat(4, 4)

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            board[i][j] = { 
                minesAroundCount: 0, 
                isShown: false, 
                isMine: false, 
                isMarked: true 
            }
        }
    }
    
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const currCell = board[i][j]
            const className = `cell-${i}-${j}`
            var cellContent
            className += currCell.isShown ? visible : hidden
            if (currCell.isMine) cellContent = 

            strHTML += `<td class="${className}">${currCell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML

    addMine()
}

function renderMine(position, value) {
    const cellSelector = '.' + 'cell-$(position.i)-$(position.j)'
    const elCell = document.querySelector(cellSelector)
    elCell.innerHTML = value
}


function addMine() {
    var pos = getRandomEmptyCell()
    if(!pos) return
    gBoard[pos.i][pos.j] = MINE
    renderMine(pos, MINE)
}

function setMinesNegsCount(cellI, cellJ, mat) {
    var neighborsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue; // cells placed in the edges.
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= mat[i].length) continue; // Edges.
            if (i === cellI && j === cellJ) continue; //Skips the cell itself.
            if (mat[i][j].isMine) neighborsCount++
        }
    }
    return neighborsCount;
}
