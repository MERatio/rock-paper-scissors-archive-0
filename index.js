// DOM Node References
const playerScoreDOM = document.querySelector('.player-score-dom');
const roundCurrentDOM = document.querySelector('.round-current-dom');
const roundLimitDOM = document.querySelector('.round-limit-dom');
const computerScoreDOM = document.querySelector('.computer-score-dom');
const resultText = document.querySelector('.result-text');
const choices = document.querySelectorAll('.choice');
const resetGame = document.querySelector('.reset-game');

// Global variables
let isGamePlaying = true;
let roundCurrent = 1;
let roundLimit;
let scores = {
  player: 0,
  computer: 0
};

// Game main function
function game(e) {
  if (!isGamePlaying) return;
  if (roundCurrent <= roundLimit) {
    const playerSelection = e.target.id;
    const computerSelection = computerPlay();

    addActiveState(playerSelection);

    // Get the round winner
    const roundWinner = getRoundWinner(playerSelection, computerSelection);

    // Display round winner and increment score
    displayRoundWinner(roundWinner, playerSelection, computerSelection);

    // Display the scores of both player and computer
    displayScore(scores.player, scores.computer);

    // If the player plays at the last round, display the winner and stop the game
    if (roundCurrent === roundLimit) {
      isGamePlaying = false;
      removeHoverState();
      setTimeout(() => {
        displayGameWinner(scores.player, scores.computer);
      }, 1500);
      return;
    }

    changeRound();

    return;
  }
}

// Get random choice between rock, paper, scissors
function computerPlay() {
  const choices = ['rock', 'paper', 'scissors'];
  return choices[Math.floor(Math.random() * choices.length)];
}

// Get round winner
function getRoundWinner(playerSelection, computerSelection) {
  // Determine round winner
  if (playerSelection === computerSelection) {
    return 'draw';
  } else if (playerSelection === 'rock') {
    if (computerSelection === 'paper') {
      return 'computer';
    } else {
      return 'player';
    }
  } else if (playerSelection === 'paper') {
    if (computerSelection === 'rock') {
      return 'player';
    } else {
      return 'computer';
    }
  } else if (playerSelection === 'scissors') {
    if (computerSelection === 'rock') {
      return 'computer';
    } else {
      return 'player';
    }
  }
}

// Display the round winner
function displayRoundWinner(winner, playerSelection, computerSelection) {
  if (winner === 'draw') {
    resultText.textContent = `Round draw! you picked ${playerSelection}, computer picked ${computerSelection}`;
    resultText.style.color = getHTMLPropertyValue('--color-green');
  } else if (winner === 'player') {
    scores.player++;
    resultText.textContent = `You win the round! you picked ${playerSelection}, computer picked ${computerSelection}`;
    resultText.style.color = getHTMLPropertyValue('--color-blue');
  } else {
    scores.computer++;
    resultText.textContent = `Computer won the round! you picked ${playerSelection}, computer picked ${computerSelection}`;
    resultText.style.color = getHTMLPropertyValue('--color-red');
  }
}

// Display the scores of both player and computer
function displayScore(playerScore, computerScore) {
  playerScoreDOM.textContent = playerScore;
  computerScoreDOM.textContent = computerScore;
}

function changeRound() {
  roundCurrent++;
  roundCurrentDOM.textContent = roundCurrent;
}

// Display the winner of the game
function displayGameWinner(playerScore, computerScore) {
  if (playerScore === computerScore) {
    resultText.textContent = 'The game resulted in a draw!';
    resultText.style.color = getHTMLPropertyValue('--color-green');
  } else if (playerScore > computerScore) {
    resultText.textContent = 'You win the game!';
    resultText.style.color = getHTMLPropertyValue('--color-blue');
  } else {
    resultText.textContent = 'Computer won the game';
    resultText.style.color = getHTMLPropertyValue('--color-red');
  }
}

function getHTMLPropertyValue(variable) {
  return window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(`${variable}`);
}

function removeHoverState() {
  choices.forEach(choice => choice.classList.remove('has-hover'));
}

function removeActiveState(e) {
  e.propertyName === 'transform' ? e.target.classList.remove('active') : null;
}

function addActiveState(playerSelection) {
  let choice = document.getElementById(playerSelection);
  choice.classList.add('active');
  choice.addEventListener('transitionend', removeActiveState);
}

// Initialization/Reset
function init() {
  isGamePlaying = true;
  roundCurrent = 1;
  do {
    roundLimit = +prompt('Input round limit, max = 99', 5) || 5;
  } while (roundLimit < 2 || roundLimit > 99);
  let scores = {
    player: 0,
    computer: 0
  };
  playerScoreDOM.textContent = 0;
  roundCurrentDOM.textContent = roundCurrent;
  roundLimitDOM.textContent = roundLimit;
  computerScoreDOM.textContent = 0;
  resultText.textContent = 'Select your choice';
  resultText.style.color = '#333';
  choices.forEach(choice => choice.classList.add('has-hover'));
}

init();

resetGame.addEventListener('click', init);

// Start game if the a choice is clicked
choices.forEach(choice => choice.addEventListener('click', game));
