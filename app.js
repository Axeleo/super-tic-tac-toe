console.log('XOXOXOXOX')

// Declaring variables
var allGameBoards = document.querySelectorAll('.game-board')
var allGameSquares = document.querySelectorAll('.game-square')
var metaGameBoard = document.querySelector('.meta-game-board')
var bluePlayerWinDisplay = document.querySelector('.blue-win-count')
var yellowPlayerWinDisplay = document.querySelector('.yellow-win-count')
var winningCombinations = [[1, 2, 3], [4, 5,6], [7, 8, 9], [1, 4, 7], [2, 5, 8],[3, 6, 9], [1, 5, 9], [3, 5, 7]]

var bluePlayerNestArr = []
var yellowPlayerNestArr = []
var bluePlayerMetaArr = []
var yellowPlayerMetaArr = []
var bluePlayerWinCount = 0
var yellowPlayerWinCount = 0

var playersTurn = 'yellow-player'

// ------ Game logic

// 1 Create function to swap turns and place 'tokens'
// 
function placeToken(event) {
  if (event.target.classList.contains('game-square') === false) {
    console.log('not a game square')
    return
  } else if (event.target.classList.contains('yellow-player') === true || 
  event.target.classList.contains('blue-player') === true)  {
      return
  }
  

  var gameBoardIdentity = event.target.parentNode
  var gameBoardIndex = (Number(gameBoardIdentity.dataset.board) - 1)
  var gameBoardSelect = Number(event.target.dataset.cell)

  if (playersTurn === 'yellow-player'){
    event.target.classList.add('yellow-player')
    yellowPlayerNestArr[gameBoardIndex].push(gameBoardSelect)
    checkWin(gameBoardIndex, 'yellow-player', yellowPlayerNestArr, yellowPlayerMetaArr)
    relativeBoardSelect(gameBoardSelect)
    playersTurn = 'blue-player'
    console.log('class should be yellow')
  } else if (playersTurn === 'blue-player'){
    event.target.classList.add('blue-player')
    bluePlayerNestArr[gameBoardIndex].push(gameBoardSelect)
    checkWin(gameBoardIndex, 'blue-player', bluePlayerNestArr, bluePlayerMetaArr)
    relativeBoardSelect(gameBoardSelect)
    playersTurn = 'yellow-player'
    console.log('class should be blue')
  }
}

// 2 Create a funciton to check for wins - add visual display

// Each if statement checks the 8 possible win variations on the particular game board
function checkWin(gameBoardIndex, playerName, playerNestArr, playerMetaArr) {
  for (let index = 0; index < playerNestArr[gameBoardIndex].length; index++) {
    for (let winningIndex = 0; winningIndex < winningCombinations.length; winningIndex++) {    
      if (playerNestArr[gameBoardIndex].includes(winningCombinations[winningIndex][0]) 
      && playerNestArr[gameBoardIndex].includes(winningCombinations[winningIndex][1]) 
      && playerNestArr[gameBoardIndex].includes(winningCombinations[winningIndex][2])) {
        console.log(playerName + ' Victory on board ' + (gameBoardIndex + 1))
        bluePlayerNestArr[gameBoardIndex].push('finished')
        yellowPlayerNestArr[gameBoardIndex].push('finished')
        playerMetaArr.push(gameBoardIndex + 1)
        checkMetaWin(playerMetaArr, playerName)
        return
      }
    }
  }
}
function checkMetaWin(playerMetaArr, playerName) {
  for (let winningIndex = 0; winningIndex < winningCombinations.length; winningIndex++) {
    if (playerMetaArr.includes(winningCombinations[winningIndex][0]) 
    && playerMetaArr.includes(winningCombinations[winningIndex][1]) 
    && playerMetaArr.includes(winningCombinations[winningIndex][2])) {
      console.log(playerName + ' Grand Victory')
      if (playerName === 'blue-player'){
        bluePlayerWinCount += 1
        bluePlayerWinDisplay.textContent = bluePlayerWinCount
      } else {
        yellowPlayerWinCount +=1
        yellowPlayerWinDisplay.textContent = yellowPlayerWinCount
      }
    }
  }
}
// 3 Create a reset feature
function removePlayerClass(object) {
  object.classList.remove('blue-player')
  object.classList.remove('yellow-player')
  object.classList.remove('unfocus')
}
function removeHoverAnimationEffect(square) {
  square.classList.remove('shadow-pop-tr-blue')
  square.classList.remove('shadow-pop-tr-yellow')
  square.removeEventListener('mouseover', hoverAnimation)
}
function resetGameArray() {
  bluePlayerNestArr = []
  yellowPlayerNestArr = []
  allGameBoards.forEach(function () {
    bluePlayerNestArr.push([])
    yellowPlayerNestArr.push([])
  })
}
function resetBoard() {
allGameSquares.forEach(removePlayerClass)
resetGameArray()
  for (let index = 0; index < allGameSquares.length; index++) {
    allGameSquares[index].addEventListener('mouseover', hoverAnimation)
  }
}
// 4 Create event listeners
function initiateAllListeners() {
  for (let index = 0; index < allGameBoards.length; index++) {
    allGameBoards[index].addEventListener('click', placeToken)
  }
}
// 5 Relative board selector
function boardFocus(gameBoardSelect) {
  for (let index = 0; index < allGameBoards.length; index++) {
    allGameBoards[index].removeEventListener('click', placeToken)
    allGameBoards[index].classList.add('unfocus')
    for (let secondIndex = 0; secondIndex < allGameBoards[index].length; secondIndex++) {
      removeHoverAnimationEffect(allGameBoards[index].children[secondIndex])
      console.log(secondIndex)
    }
  }
  allGameBoards[gameBoardSelect - 1].addEventListener('click', placeToken)
  allGameBoards[gameBoardSelect - 1].classList.remove('unfocus')
  for (let thirdIndex = 0; thirdIndex < allGameBoards[gameBoardSelect - 1].length; thirdIndex++) {
    allGameBoards[index].children[thirdIndex].addEventListener('mouseover', hoverAnimation)
  }
}
function focusUnfinishedBoards() {
  for (let index = 0; index < allGameBoards.length; index++) {
    if (bluePlayerNestArr[index].includes('finished')){
      allGameBoards[index].removeEventListener('click', placeToken)
      allGameBoards[index].classList.add('unfocus')
      for (let secondIndex = 0; secondIndex < allGameBoards[index].length; secondIndex++) {
        removeHoverAnimationEffect(allGameBoards[index].children[secondIndex])
        console.log(allGameBoards[index].children[secondIndex])
      }
    } else {
      allGameBoards[index].addEventListener('click', placeToken)
      allGameBoards[index].classList.remove('unfocus')
      for (let index = 0; index < allGameBoards[index].length; index++) {
        allGameSquares[index].addEventListener('mouseover', hoverAnimation)
      }
    }
  }
}
function relativeBoardSelect(gameBoardSelect) {
  if (bluePlayerNestArr[gameBoardSelect - 1].includes('finished') === true){
    focusUnfinishedBoards()
  } else {
    boardFocus(gameBoardSelect)
  }
}
function hoverAnimation(event) {
  if (event.target.classList.contains('yellow') === true && event.target.classList.contains('blue') === true) {
    return
  } else if (playersTurn === 'blue-player'){
    event.target.classList.add('shadow-pop-tr-blue')
  } else if (playersTurn === 'yellow-player') {
    event.target.classList.add('shadow-pop-tr-yellow')
  }
}
for (let index = 0; index < allGameSquares.length; index++) {
  allGameSquares[index].addEventListener('mouseover', hoverAnimation)
}
// Call Functions 
initiateAllListeners()
resetGameArray()