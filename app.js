console.log('XOXOXOXOX')

// Declaring variables

var allGameBoards = document.querySelectorAll('.game-board')
var allGameSquares = document.querySelectorAll('.game-square')
var metaGameBoard = document.querySelector('.meta-game-board')
var winningCombinations = [['1', '2', '3'], ['4', '5','6'], ['7', '8', '9'], ['1', '4', '7'], ['2', '5', '8'],['3', '6', '9'], ['1', '4', '9'], ['3', '4', '6']]

var gameBoardsNestArray = []

allGameBoards.forEach(function () {
  gameBoardsNestArray.push([])
})

var playersTurn = 'red-player'

// ------ Game logic

// 1 Create function to swap turns and place 'tokens'
// 
function placeToken(event) {
  if (event.target.classList.contains('game-square') === false) {
    console.log('not a game square')
    return
  }

  if (event.target.classList.contains('red') === true && event.target.classList.contains('blue') === true){
  return
  }

  var gameBoardIdentity = event.target.parentNode
  var gameBoardIndex = (gameBoardIdentity.dataset.board - 1)
  gameBoardsNestArray[gameBoardIndex].push(event.target.dataset.cell)


  if (playersTurn === 'red-player'){
    event.target.classList.add('red-player')
    event.target.dataset.cell = 'red-player'
    playersTurn = 'blue-player'
    checkWin(gameBoardIndex, 'red-player')
  } else if (playersTurn === 'blue-player'){
    event.target.classList.add('blue-player')
    event.target.dataset.cell = 'blue-player'
    playersTurn = 'red-player'
    checkWin(gameBoardIndex, 'blue-player')
  }
}

// 2 Create a funciton to check for wins - add visual display

// Each if statement checks the 8 possible win variations on the particular game board
function checkWin(gameBoardIndex, playerName) {
  for (let index = 0; index < gameBoardsNestArray[gameBoardIndex].length; index++) {
    for (let winningIndex = 0; winningIndex < winningCombinations.length; winningIndex++) {    
      if (gameBoardsNestArray[gameBoardIndex].includes(winningCombinations[winningIndex][0]) && gameBoardsNestArray[gameBoardIndex].includes(winningCombinations[winningIndex][1]) && gameBoardsNestArray[gameBoardIndex].includes(winningCombinations[winningIndex][2])) {
        console.log(playerName + ' Victory')
        return
       }
    }
    
}
// find game board

// check against winning combinations
}

// 3 Create a reset feature
function removePlayerClass(object) {
  object.classList.remove('blue-player')
  object.classList.remove('red-player')
}
function resetGameArray() {
  gameBoardsNestArray = []
  allGameBoards.forEach(function () {
    gameBoardsNestArray.push([])
  })
}
function resetBoard() {
allGameSquares.forEach(removePlayerClass)

}
// 4 Create event listeners

for (let index = 0; index < allGameBoards.length; index++) {
  allGameBoards[index].addEventListener('click', placeToken)
}




// 5 Create a score board

// 6 Relative board selector
function boardFocus(gameBoardSelect) {
  for (let index = 0; index < allGameBoards.length; index++) {
    allGameBoards[index].removeEventListener('click', placeToken)
  }
  allGameBoards[gameBoardSelect - 1].addEventListener('click', placeToken)
}

function relativeBoardSelect(gameBoardSelect) {

  // if a square is clicked transfer to relative board
  gameBoardSelect
  // move position
}
