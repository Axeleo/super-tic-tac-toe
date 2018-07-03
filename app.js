console.log('XOXOXOXOX')

// Declaring variables
var cols1 = document.querySelectorAll('.column1')
var cols2 = document.querySelectorAll('.column2')
var cols3 = document.querySelectorAll('.column3')
var row1 = document.querySelector('.row1')
var row2 = document.querySelector('.row2')
var row3 = document.querySelector('.row3')
var gameBoard = document.querySelector('.game-board')
var gameSquares = document.querySelectorAll('.game-square')
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
  // checks which players turn it is and places token
  if (playersTurn === 'red-player'){
    event.target.classList.add('red-player')
    playersTurn = 'blue-player'
    checkWin('red-player')
  } else if (playersTurn === 'blue-player'){
    event.target.classList.add('blue-player')
    playersTurn = 'red-player'
    checkWin('blue-player')
  }

}


// 2 Create a funciton to check for wins - add visual display
function checkWin(playerStr) {
  //checking rows
  if (row1.children[0].classList.contains(playerStr) && row1.children[1].classList.contains(playerStr) && row1.children[2].classList.contains(playerStr)){
    console.log(playerStr + ' Victory')
  }
  if (row2.children[0].classList.contains(playerStr) && row2.children[1].classList.contains(playerStr) && row2.children[2].classList.contains(playerStr)){
    console.log(playerStr + ' Victory')
  }
  if (row3.children[0].classList.contains(playerStr) && row3.children[1].classList.contains(playerStr) && row3.children[2].classList.contains(playerStr)){
    console.log(playerStr + ' Victory')
  }
  //checking cols
  if (row1.children[0].classList.contains(playerStr) && row2.children[0].classList.contains(playerStr) && row3.children[0].classList.contains(playerStr)) {
    console.log(playerStr + ' Victory')
  }
  if (row1.children[1].classList.contains(playerStr) && row2.children[1].classList.contains(playerStr) && row3.children[1].classList.contains(playerStr)) {
    console.log(playerStr + ' Victory')
  }
  if (row1.children[2].classList.contains(playerStr) && row2.children[2].classList.contains(playerStr) && row3.children[2].classList.contains(playerStr)) {
    console.log(playerStr + ' Victory')
  }
  // checking diagonals
  if (row1.children[0].classList.contains(playerStr) && row2.children[1].classList.contains(playerStr) && row3.children[2].classList.contains(playerStr)) {
    console.log(playerStr + ' Victory')
  }
  if (row1.children[2].classList.contains(playerStr) && row2.children[1].classList.contains(playerStr) && row3.children[0].classList.contains(playerStr)) {
    console.log(playerStr + ' Victory')
  }
}
// 3 Create event listeners
gameBoard.addEventListener('click', placeToken)

// 4 Create a reset feature
function removePlayerClass(object) {
  object.classList.remove('blue-player')
  object.classList.remove('red-player')
}
function resetBoard() {
  var row1 = document.querySelector('.row1')
  var row2 = document.querySelector('.row2')
  var row3 = document.querySelector('.row3')
  for (var i = 0; i < 3; i++){
    removePlayerClass(row1.children[i])
    removePlayerClass(row2.children[i])
    removePlayerClass(row3.children[i])
  }
 
}



// 5 Create a score board