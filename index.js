// Global variables
let currentRound = 0;
const roundLimit = 5;

const scores = {
  player: 0,
  computer: 0
};

// Game main function
function game() {
  // Play another round
  if (currentRound < roundLimit) {
    const playerSelection = getPlayerInput();
    const computerSelection = computerPlay();

    // If the player cancel the prompt
    if (playerSelection === null) {
      // If there is a 1 or more games played disply the winner
      if (currentRound > 0) {
        console.log(getGameWinner(scores.player, scores.computer));
        return;
      } else {
        return;
      }
    }

    // Get the round winner
    const roundWinner = getRoundWinner(playerSelection, computerSelection);

    // Display/log round winner and increment score
    console.log(
      displayRoundWinner(roundWinner, playerSelection, computerSelection)
    );

    // Display/log the scores of both player and computer
    console.log(getRoundScores(scores.player, scores.computer));
    currentRound++;
    game();
    return;
  }
  // Display/log the winner of the game
  else {
    console.log(getGameWinner(scores.player, scores.computer));
  }
}

// Get an option for rock, paper, or scissors for do while
function getOption(prop) {
  const options = {
    rock: 'rock',
    paper: 'paper',
    scissors: 'scissors'
  };

  const option = options[prop.toLowerCase()];

  return option ? option : null;
}

// Get player input using prompt
function getPlayerInput() {
  let prop;
  // Prompt until player gives correct input or the player hit cancel
  do {
    prop = prompt('Pick between rock, paper or scissors', '');
    if (prop === null) return null;
  } while (!getOption(prop));

  return getOption(prop);
}

// Get random option between rock, paper, scissors
function computerPlay() {
  const options = ['rock', 'paper', 'scissors'];
  return options[Math.floor(Math.random() * options.length)];
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
    return `Round draw! you picked ${playerSelection}, computer picked ${computerSelection}`;
  } else if (winner === 'player') {
    scores.player++;
    return `You win the round! you picked ${playerSelection}, computer picked ${computerSelection}`;
  } else {
    scores.computer++;
    return `Computer won the round! you picked ${playerSelection}, computer picked ${computerSelection}`;
  }
}

// Get the scores of both player and computer
function getRoundScores(playerScore, computerScore) {
  return `Player Score: ${playerScore}, Computer Score: ${computerScore}`;
}

// Get the winner of the game
function getGameWinner(playerScore, computerScore) {
  let winner;
  if (playerScore === computerScore) {
    winner = 'The game resulted in a draw!';
  } else if (playerScore > computerScore) {
    winner = 'You win the game!';
  } else {
    winner = 'Computer won the game';
  }

  return winner;
}

// Play the game
game();
