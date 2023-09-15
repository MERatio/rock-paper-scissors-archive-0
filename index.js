'use strict';

const dom = {
	gameMessage: document.querySelector('#game-message'),
	choices: document.querySelectorAll('button[data-choice]'),
	playerScore: document.querySelector('#player-score'),
	computerScore: document.querySelector('#computer-score'),
	reset: document.querySelector('#reset'),
};

let scores = {
	player: 0,
	computer: 0,
};

function capitalize(str) {
	const firstChar = str.substring(0, 1).toUpperCase();
	const remainingChars = str.substring(1).toLowerCase();
	return firstChar + remainingChars;
}

function printGameMessage(gameMessage) {
	dom.gameMessage.textContent = gameMessage;
}

function disableNodeList(nodeList) {
	nodeList.forEach((node) => node.setAttribute('disabled', ''));
}

function getRoundEndMessage(playerChoice, computerChoice, roundWinner) {
	if (roundWinner === 'none') {
		return `It's a tie!`;
	} else if (roundWinner === 'player') {
		return `You Win! ${capitalize(playerChoice)} beats ${capitalize(
			computerChoice
		)}`;
	} else {
		return `You Lose! ${capitalize(computerChoice)} beats ${capitalize(
			playerChoice
		)}`;
	}
}

function getRoundWinner(playerChoice, computerChoice) {
	let roundWinner;

	if (playerChoice === computerChoice) {
		roundWinner = 'none';
	} else if (playerChoice === 'rock') {
		if (computerChoice === 'paper') {
			roundWinner = 'computer';
		} else {
			roundWinner = 'player';
		}
	} else if (playerChoice === 'paper') {
		if (computerChoice === 'rock') {
			roundWinner = 'player';
		} else {
			roundWinner = 'computer';
		}
	} else if (playerChoice === 'scissors') {
		if (computerChoice === 'rock') {
			roundWinner = 'computer';
		} else {
			roundWinner = 'player';
		}
	}

	return roundWinner;
}

function getGameWinnerMessage(gameWinner) {
	if (gameWinner === 'player') {
		return 'Game Over! You win!';
	} else if (gameWinner === 'computer') {
		return 'Game over You lose!';
	}
}

function getGameWinner(scores) {
	if (scores.player >= 5) {
		return 'player';
	} else if (scores.computer >= 5) {
		return 'computer';
	} else {
		return 'none';
	}
}

function getComputerChoice() {
	const choices = ['rock', 'paper', 'scissors'];
	const random = Math.floor(Math.random() * choices.length);
	const choice = choices[random];
	return choice;
}

function updateScore(roundWinner) {
	if (roundWinner === 'player') {
		dom.playerScore.textContent = ++scores.player;
	} else if (roundWinner === 'computer') {
		dom.computerScore.textContent = ++scores.computer;
	}
}

function playRound(playerChoice, computerChoice) {
	const roundWinner = getRoundWinner(
		playerChoice.toLowerCase(),
		computerChoice
	);
	const roundEndMessage = getRoundEndMessage(
		playerChoice,
		computerChoice,
		roundWinner
	);
	printGameMessage(roundEndMessage);
	if (roundWinner !== 'none') updateScore(roundWinner);
}

function handleChoiceClick(event) {
	const playerChoice = event.target.dataset.choice;
	const computerChoice = getComputerChoice();
	playRound(playerChoice, computerChoice);

	const gameWinner = getGameWinner(scores);
	if (gameWinner !== 'none') {
		const gameWinnerMessage = getGameWinnerMessage(gameWinner);
		printGameMessage(gameWinnerMessage);
		disableNodeList(dom.choices);
	}
}

function handleResetClick() {
	scores = {
		player: 0,
		computer: 0,
	};
	dom.gameMessage.textContent = '';
	dom.choices.forEach((choice) => choice.removeAttribute('disabled'));
	dom.playerScore.textContent = 0;
	dom.computerScore.textContent = 0;
}

dom.choices.forEach((domChoice) =>
	domChoice.addEventListener('click', handleChoiceClick)
);

dom.reset.addEventListener('click', handleResetClick);
