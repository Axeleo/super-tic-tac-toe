console.log('XOXOXOXOX')

// Declaring variables
var cols1 = document.querySelectorAll('.column1')
var cols2 = document.querySelectorAll('.column2')
var cols3 = document.querySelectorAll('.column3')

var row1 = document.querySelectorAll('.row1')
var row2 = document.querySelectorAll('.row2')
var row3 = document.querySelectorAll('.row3')

var allGameBoards = document.querySelectorAll('.game-board')
var gameSquares = document.querySelectorAll('.game-square')

var gameBoardsFirstRow = document.querySelector('.game-boards-first-row')
var gameBoardsSecondRow = document.querySelector('.game-boards-second-row')
var gameBoardsThirdRow = document.querySelector('.game-boards-third-row')

var gameBoardsFirstCol = document.querySelector('.game-boards-first-col')
var gameBoardsSecondCol = document.querySelector('.game-boards-second-col')
var gameBoardsThirdCol = document.querySelector('.game-boards-third-col')

var metaGameBoard = document.querySelector('.meta-game-board')

var playersTurn = 'red-player'

// ------ Game logic

// 1 Create function to swap turns and place 'tokens'
// 
function placeToken(event) {
  // make sure click is on game-square
  if (event.target.classList.contains('game-square') === false) {
    console.log('not a game square')
    return
  }
  // check square doesn't already have a token
  if (event.target.classList.contains('red') === true && event.target.classList.contains('blue') === true){
  return
  }
  // set game board identity
  gameBoardIdentity = event.target.parentNode.parentNode
  // checks which players turn it is and places token
  if (playersTurn === 'red-player'){
    event.target.classList.add('red-player')
    playersTurn = 'blue-player'
    checkWin(gameBoardIdentity, 'red-player')
  } else if (playersTurn === 'blue-player'){
    event.target.classList.add('blue-player')
    playersTurn = 'red-player'
    // !!! add gameboard identity
    checkWin(gameBoardIdentity, 'blue-player')
  }

}


// 2 Create a funciton to check for wins - add visual display

// Each if statement checks the 8 possible win variations on the particular game board
function checkWin(gameBoardIdentity, playerStr) {
  
  var firstRow = gameBoardIdentity.children[0]
  var secondRow = gameBoardIdentity.children[1]
  var thirdRow = gameBoardIdentity.children[2]
  // checking rows
  if (firstRow.children[0].classList.contains(playerStr) && firstRow.children[1].classList.contains(playerStr) && firstRow.children[2].classList.contains(playerStr)) {
    console.log(playerStr + ' Victory')
  }
  else if (secondRow.children[0].classList.contains(playerStr) && secondRow.children[1].classList.contains(playerStr) && secondRow.children[2].classList.contains(playerStr)) {
    console.log(playerStr + ' Victory')
  }
  else if (thirdRow.children[0].classList.contains(playerStr) && thirdRow.children[1].classList.contains(playerStr) && thirdRow.children[2].classList.contains(playerStr)) {
    console.log(playerStr + ' Victory')
  }
  // checking cols
  else if (gameBoardIdentity.children[0].children[0].classList.contains(playerStr) && secondRow.children[0].classList.contains(playerStr) && thirdRow.children[0].classList.contains(playerStr)) {
    console.log(playerStr + ' Victory')
  }
  else if (gameBoardIdentity.children[0].children[1].classList.contains(playerStr) && secondRow.children[1].classList.contains(playerStr) && thirdRow.children[1].classList.contains(playerStr)) {
    console.log(playerStr + ' Victory')
  }
  else if (gameBoardIdentity.children[0].children[2].classList.contains(playerStr) && secondRow.children[2].classList.contains(playerStr) && thirdRow.children[2].classList.contains(playerStr)) {
    console.log(playerStr + ' Victory')
  }
  // checking diagonals
  else if (gameBoardIdentity.children[0].children[0].classList.contains(playerStr) && secondRow.children[1].classList.contains(playerStr) && thirdRow.children[2].classList.contains(playerStr)) {
    console.log(playerStr + ' Victory')
  }
  else if (gameBoardIdentity.children[0].children[2].classList.contains(playerStr) && secondRow.children[1].classList.contains(playerStr) && thirdRow.children[0].classList.contains(playerStr)) {
    console.log(playerStr + ' Victory')
  }
}

// 3 Create a reset feature
function removePlayerClass(object) {
  object.classList.remove('blue-player')
  object.classList.remove('red-player')
}
function resetBoard() {
  // need to make a new search so that the classes update
  var row1 = document.querySelectorAll('.row1')
  var row2 = document.querySelectorAll('.row2')
  var row3 = document.querySelectorAll('.row3')
  // loop through each row and call removePlayerClass
  for (var i = 0; i < 3; i++){
    removePlayerClass(row1.children[i])
    removePlayerClass(row2.children[i])
    removePlayerClass(row3.children[i])
  }
}
// 4 Create event listeners
document.body.addEventListener('click', placeToken)




// 5 Create a score board

// 6 Relative board selector

function relativeBoardSelect(event) {
  // if a square is clicked transfer to relative board
  // move position
}
