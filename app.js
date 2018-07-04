console.log('XOXOXOXOX')

// Declaring variables

var allGameBoards = document.querySelectorAll('.game-board')
var allGameSquares = document.querySelectorAll('.game-square')
var metaGameBoard = document.querySelector('.meta-game-board')
var winningCombinations = [[1, 2, 3], [4, 5,6], [7, 8, 9], [1, 4, 7], [2, 5, 8],[3, 6, 9], [1, 4, 9], [3, 4, 6]]

var bluePlayerNestArr = []
var redPlayerNestArr = []

allGameBoards.forEach(function () {
  bluePlayerNestArr.push([])
  redPlayerNestArr.push([])
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
  var gameBoardIndex = (Number(gameBoardIdentity.dataset.board) - 1)
  var gameBoardSelect = Number(event.target.dataset.cell)

  if (playersTurn === 'red-player'){
    event.target.classList.add('red-player')
    redPlayerNestArr[gameBoardIndex].push(Number(event.target.dataset.cell))
    checkWin(gameBoardIndex, 'red-player', redPlayerNestArr)
    playersTurn = 'blue-player'
  } else if (playersTurn === 'blue-player'){
    event.target.classList.add('blue-player')
    bluePlayerNestArr[gameBoardIndex].push(Number(event.target.dataset.cell))
    checkWin(gameBoardIndex, 'blue-player', bluePlayerNestArr)
    playersTurn = 'red-player'
  }
}

// 2 Create a funciton to check for wins - add visual display

// Each if statement checks the 8 possible win variations on the particular game board
function checkWin(gameBoardIndex, playerName, playerNestArr) {
  for (let index = 0; index < playerNestArr[gameBoardIndex].length; index++) {
    for (let winningIndex = 0; winningIndex < winningCombinations.length; winningIndex++) {    
      if (playerNestArr[gameBoardIndex].includes(winningCombinations[winningIndex][0]) && playerNestArr[gameBoardIndex].includes(winningCombinations[winningIndex][1]) && playerNestArr[gameBoardIndex].includes(winningCombinations[winningIndex][2])) {
        console.log(playerName + ' Victory')
        return
      }
    }
  }
}

// 3 Create a reset feature
function removePlayerClass(object) {
  object.classList.remove('blue-player')
  object.classList.remove('red-player')
}
function resetGameArray() {
  bluePlayerNestArr = []
  redPlayerNestArr = []
  allGameBoards.forEach(function () {
    bluePlayerNestArr.push([])
    redPlayerNestArr.push([])
  })
}
function resetBoard() {
allGameSquares.forEach(removePlayerClass)
resetGameArray()
}
// 4 Create event listeners
function initiateAllListeners() {
  for (let index = 0; index < allGameBoards.length; index++) {
    allGameBoards[index].addEventListener('click', placeToken)
  }
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
  boardFocus(gameBoardSelect)
  // if a square is clicked transfer to relative board
}

initiateAllListeners()