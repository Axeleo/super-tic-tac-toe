console.log('XOXOXOXOX')

// Declaring variables
var allGameBoards = document.querySelectorAll('.game-board')
var allGameSquares = document.querySelectorAll('.game-square')
var metaGameBoard = document.querySelector('.meta-game-board')
var winningCombinations = [[1, 2, 3], [4, 5,6], [7, 8, 9], [1, 4, 7], [2, 5, 8],[3, 6, 9], [1, 5, 9], [3, 5, 7]]

var bluePlayerNestArr = []
var redPlayerNestArr = []
var bluePlayerMetaArr = []
var redPlayerMetaArr = []
var playerBlueWinCount
var playerRedWinCount

var playersTurn = 'red-player'

// ------ Game logic

// 1 Create function to swap turns and place 'tokens'
// 
function placeToken(event) {
  if (event.target.classList.contains('game-square') === false) {
    console.log('not a game square')
    return
  } else if (event.target.classList.contains('red') === true && event.target.classList.contains('blue') === true)  {
       return
  }
  

  var gameBoardIdentity = event.target.parentNode
  var gameBoardIndex = (Number(gameBoardIdentity.dataset.board) - 1)
  var gameBoardSelect = Number(event.target.dataset.cell)

  if (playersTurn === 'red-player'){
    event.target.classList.add('red-player')
    redPlayerNestArr[gameBoardIndex].push(gameBoardSelect)
    checkWin(gameBoardIndex, 'red-player', redPlayerNestArr, redPlayerMetaArr)
    relativeBoardSelect(gameBoardIndex, gameBoardSelect)
    playersTurn = 'blue-player'
  } else if (playersTurn === 'blue-player'){
    event.target.classList.add('blue-player')
    bluePlayerNestArr[gameBoardIndex].push(gameBoardSelect)
    checkWin(gameBoardIndex, 'blue-player', bluePlayerNestArr, bluePlayerMetaArr)
    relativeBoardSelect(gameBoardIndex, gameBoardSelect)
    playersTurn = 'red-player'
  }
}

// 2 Create a funciton to check for wins - add visual display

// Each if statement checks the 8 possible win variations on the particular game board
function checkWin(gameBoardIndex, playerName, playerNestArr, playerMetaArr) {
  for (let index = 0; index < playerNestArr[gameBoardIndex].length; index++) {
    for (let winningIndex = 0; winningIndex < winningCombinations.length; winningIndex++) {    
      if (playerNestArr[gameBoardIndex].includes(winningCombinations[winningIndex][0]) && playerNestArr[gameBoardIndex].includes(winningCombinations[winningIndex][1]) && playerNestArr[gameBoardIndex].includes(winningCombinations[winningIndex][2])) {
        console.log(playerName + ' Victory on board ' + (gameBoardIndex + 1))
        bluePlayerNestArr[gameBoardIndex].push('finished')
        redPlayerNestArr[gameBoardIndex].push('finished')
        playerMetaArr.push(gameBoardIndex + 1)
        checkMetaWin(playerMetaArr, playerName)
        return
      }
    }
  }
}
function checkMetaWin(playerMetaArr, playerName) {
  for (let winningIndex = 0; winningIndex < winningCombinations.length; winningIndex++) {
    if (playerMetaArr.includes(winningCombinations[winningIndex][0]) && playerMetaArr.includes(winningCombinations[winningIndex][1]) && playerMetaArr.includes(winningCombinations[winningIndex][2])) {
      console.log(playerName + ' Grand Victory')
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
function focusUnfinishedBoards() {
  for (let index = 0; index < allGameBoards.length; index++) {
    if (bluePlayerNestArr[index].includes('finished')){
      allGameBoards[index].removeEventListener('click', placeToken)
    } else {
      allGameBoards[index].addEventListener('click', placeToken)
    }
  }
}
function relativeBoardSelect(gameBoardIndex, gameBoardSelect) {
  if (bluePlayerNestArr[gameBoardIndex].includes('finished') === true){
    focusUnfinishedBoards()
  } else {
    boardFocus(gameBoardSelect)
  }
}
// Call Functions 
initiateAllListeners()
resetGameArray()