console.log('XOXOXOXOX')

// Declaring variables
var allGameBoards = document.querySelectorAll('.game-board')
var allGameSquares = document.querySelectorAll('.game-square')
var metaGameBoard = document.querySelector('.meta-game-board')
var bluePlayerWinDisplay = document.querySelector('.blue-win-count')
var yellowPlayerWinDisplay = document.querySelector('.yellow-win-count')
var winningCombinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]]
var instructionButton = document.querySelector('.instructions-btn')
var instructions = document.querySelector('.instructions')
var newRoundButton = document.querySelector('.new-round-btn')
instructionsDisplay = 'hidden'
var soundButton = document.querySelector('#sound-btn')
var soundState = 'off'

var bluePlayerNestArr = []
var yellowPlayerNestArr = []
var bluePlayerMetaArr = []
var yellowPlayerMetaArr = []
var bluePlayerWinCount = 0
var yellowPlayerWinCount = 0
var playersTurn = 'yellow-player'

// AUDIO VARIABLES
var bluePlayerSound = new Audio ('sounds/player1FX.wav')
var yellowPlayerSound = new Audio ('sounds/player2FX.wav')
var winSound = new Audio ('sounds/winFX.wav')
var upgradeSound = new Audio ('sounds/coinFX.wav')
var soundTrack = new Audio('sounds/HotlineSoundTrack.wav')

// ------ Game logic
// PLACE TOKEN
function placeToken(event) {
  if (event.target.classList.contains('game-square') === false) {
    console.log('not a game square')
    return
  } else if (event.target.classList.contains('yellow-player') === true ||
    event.target.classList.contains('blue-player') === true) {
    return
  }
  var gameBoardIdentity = event.target.parentNode
  var gameBoardIndex = (Number(gameBoardIdentity.dataset.board) - 1)
  var gameBoardSelect = Number(event.target.dataset.cell)

  if (playersTurn === 'yellow-player') {
    event.target.classList.add('yellow-player')
    yellowPlayerNestArr[gameBoardIndex].push(gameBoardSelect)
    checkWin(gameBoardIndex, 'yellow-player', yellowPlayerNestArr, yellowPlayerMetaArr)
    relativeBoardSelect(gameBoardSelect)
    bluePlayerSound.play()
    playersTurn = 'blue-player'
  } else if (playersTurn === 'blue-player') {
    event.target.classList.add('blue-player')
    bluePlayerNestArr[gameBoardIndex].push(gameBoardSelect)
    checkWin(gameBoardIndex, 'blue-player', bluePlayerNestArr, bluePlayerMetaArr)
    relativeBoardSelect(gameBoardSelect)
    yellowPlayerSound.play()
    playersTurn = 'yellow-player'
  }
}
// CHECK WIN
function checkWin(gameBoardIndex, playerName, playerNestArr, playerMetaArr) {
  for (let index = 0; index < playerNestArr[gameBoardIndex].length; index++) {
    for (let winningIndex = 0; winningIndex < winningCombinations.length; winningIndex++) {
      if (playerNestArr[gameBoardIndex].includes(winningCombinations[winningIndex][0])
        && playerNestArr[gameBoardIndex].includes(winningCombinations[winningIndex][1])
        && playerNestArr[gameBoardIndex].includes(winningCombinations[winningIndex][2])) {
        bluePlayerNestArr[gameBoardIndex].push('finished')
        yellowPlayerNestArr[gameBoardIndex].push('finished')
        playerMetaArr.push(gameBoardIndex + 1)
        checkMetaWin(playerMetaArr, playerName, gameBoardIndex)
        upgradeSound.play()
        animationStart(gameBoardIndex, playerName)
        return
      }
    }
  }
}
function checkMetaWin(playerMetaArr, playerName, ) {
  for (let winningIndex = 0; winningIndex < winningCombinations.length; winningIndex++) {
    if (playerMetaArr.includes(winningCombinations[winningIndex][0])
      && playerMetaArr.includes(winningCombinations[winningIndex][1])
      && playerMetaArr.includes(winningCombinations[winningIndex][2])) {
      if (playerName === 'blue-player') {
        bluePlayerWinCount += 1
        bluePlayerWinDisplay.textContent = bluePlayerWinCount
        bluePlayerWinDisplay.classList.add('blue-text-gradient')
        winSound.play()
        for (let index = 0; index < metaGameBoard.length; index++) {
          animationStart([i], playerName)
        }
      } else {
        yellowPlayerWinCount += 1
        yellowPlayerWinDisplay.textContent = yellowPlayerWinCount
        yellowPlayerWinDisplay.classList.add('yellow-text-gradient')
        winSound.play()
        for (let index = 0; index < metaGameBoard.length; index++) {
          animationStart([i], playerName)
        }
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
function removeAllHoverAnimationClass() {
  for (let index = 0; index < allGameSquares.length; index++) {
    allGameSquares[index].classList.remove('shadow-pop-tr-blue')
    allGameSquares[index].classList.remove('shadow-pop-tr-yellow')
  }
}
function resetGameArray() {
  bluePlayerNestArr = []
  yellowPlayerNestArr = []
  allGameBoards.forEach(function (boards) {
    bluePlayerNestArr.push([])
    yellowPlayerNestArr.push([])
    boards.classList.remove('unfocus')
  })
  initiateAllListeners()
}
function resetBoards() {
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
    removeAllHoverAnimationClass()
  }
  allGameBoards[gameBoardSelect - 1].addEventListener('click', placeToken)
  allGameBoards[gameBoardSelect - 1].classList.remove('unfocus')
}
function focusUnfinishedBoards() {
  for (let index = 0; index < allGameBoards.length; index++) {
    if (bluePlayerNestArr[index].includes('finished')) {
      allGameBoards[index].removeEventListener('click', placeToken)
      allGameBoards[index].classList.add('unfocus')
      removeAllHoverAnimationClass()
    } else {
      allGameBoards[index].addEventListener('click', placeToken)
      allGameBoards[index].classList.remove('unfocus')
    }
  }
}
function relativeBoardSelect(gameBoardSelect) {
  if (bluePlayerNestArr[gameBoardSelect - 1].includes('finished') === true) {
    focusUnfinishedBoards()
  } else {
    boardFocus(gameBoardSelect)
  }
}
function hoverAnimation(event) {
  if (event.target.classList.contains('yellow') === true && event.target.classList.contains('blue') === true) {
    return
  } else if (playersTurn === 'blue-player') {
    event.target.classList.add('shadow-pop-tr-blue')
  } else if (playersTurn === 'yellow-player') {
    event.target.classList.add('shadow-pop-tr-yellow')
  }
}
function instructionsSwitch() {
  if (instructionsDisplay === 'showing'){
    metaGameBoard.classList.remove('hidden')
    instructions.classList.add('hidden')
    instructionsDisplay = 'hidden'
  } else if (instructionsDisplay === 'hidden'){
  metaGameBoard.classList.add('hidden')
  instructions.classList.remove('hidden')
  instructionsDisplay = 'showing'
  }
}
function soundSwitch() {
  if (soundState === 'off'){
    audioOn()
    soundState = 'on'
    soundButton.textContent = 'SOUND OFF'
  } else if (soundState === 'on'){
    audioOff()
    soundState = 'off'
    soundButton.textContent = 'SOUND ON'
  }
}
function audioOn() {
  soundTrack.play()
  soundTrack.loop = true
  bluePlayerSound.muted = false
  yellowPlayerSound.muted = false
  winSound.muted = false
  upgradeSound.muted = false
  soundTrack.muted = false
}
function audioOff() {
  soundTrack.pause()
  bluePlayerSound.muted = true
  yellowPlayerSound.muted = true
  winSound.muted = true
  upgradeSound.muted = true
  soundTrack.muted = true
}
// win animation 
// BUGS once three are going they share the same counter so they 'stall' each other out
function animationStart(gameBoardIndex, playerName) {
  animationInit = setInterval(function () {
    addAnimation(gameBoardIndex, playerName)
  }, 4000)
  animationTransition = setInterval(function () {
    removeAnimation(gameBoardIndex, playerName)
  }, 4000)
}
function removeAnimation(gameBoardIndex, playerName) {
  for (let index = 0; index < allGameBoards[gameBoardIndex].length; index++) {
    if (playerName === 'blue-player') {
      allGameBoards[gameBoardIndex].children[index].classList.remove('blue-win')
    } else if (playerName === 'yellow-player') {
      allGameBoards[gameBoardIndex].children[index].classList.remove('yellow-win')
    }
  }
}
function addAnimation(gameBoardIndex, playerName) {
  for (let index = 0; index < allGameBoards[gameBoardIndex].length; index++) {
    if (playerName === 'blue-player'){
      allGameBoards[gameBoardIndex].children[index].classList.add('blue-win')
    } else if (playerName === 'yellow-player'){
      allGameBoards[gameBoardIndex].children[index].classList.add('yellow-win')
    }
  }
}
// Call Functions 
initiateAllListeners()
audioOff()
resetGameArray()
soundButton.addEventListener('click', soundSwitch)
instructionButton.addEventListener('click', instructionsSwitch)
newRoundButton.addEventListener('click', resetBoards)
for (let index = 0; index < allGameSquares.length; index++) {
  allGameSquares[index].addEventListener('mouseover', hoverAnimation)
}
// var animationCounter = 0
// function removeAnimation(gameBoardIndex, playerName) {
//   if (playerName === 'blue-player'){
//     allGameBoards[gameBoardIndex].children[animationCounter].classList.remove('blue-win')
//   } else if (playerName === 'yellow-player'){
//     allGameBoards[gameBoardIndex].children[animationCounter].classList.remove('yellow-win')
//   }
//   if (animationCounter === 9){
//     animationCounter = 0
//   }
// }
// function addAnimation(gameBoardIndex, playerName) {
//   if (playerName === 'blue-player'){
//     allGameBoards[gameBoardIndex].children[animationCounter].classList.add('blue-win')
//     animationCounter += 1
//   } else if (playerName === 'yellow-player'){
//     allGameBoards[gameBoardIndex].children[animationCounter].classList.add('yellow-win')
//     animationCounter += 1
//   }
//   if (animationCounter === 9){
//     animationCounter = 0
//   }
// }