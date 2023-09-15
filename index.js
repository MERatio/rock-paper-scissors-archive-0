'use strict';

const CHOICES = ['rock', 'paper', 'scissors'];

const scores = {
	player: 0,
	computer: 0,
};

function getPlayerChoice() {
	let playerChoice;

	do {
		playerChoice = prompt('Rock, paper, or scissors?');
		if (playerChoice === null) {
			return null;
		}
	} while (!CHOICES.includes(playerChoice.toLowerCase()));

	return playerChoice;
}

function getComputerChoice() {
	const choice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
	return choice;
}

function updateScore(winner) {
	if (winner === 'none') {
		return;
	}
	scores[winner]++;
}

function playRound(playerSelection, computerSelection) {
	const lcPlayerSelection = playerSelection.toLowerCase();
	if (lcPlayerSelection === computerSelection) {
		updateScore('none');
		return "It's a tie!";
	}
	switch (lcPlayerSelection) {
		case 'rock':
			if (computerSelection === 'paper') {
				updateScore('computer');
				return 'You Lose! Rock loses to paper';
			} else {
				updateScore('player');
				return 'You Win! Rock beats scissors';
			}
			break;
		case 'paper':
			if (computerSelection === 'rock') {
				updateScore('player');
				return 'You Win! Paper beats rock';
			} else {
				updateScore('computer');
				return 'You Lose! Paper loses to scissors';
			}
			break;
		case 'scissors':
			if (computerSelection === 'rock') {
				updateScore('computer');
				return 'You Lose! Scissors loses to rock';
			} else {
				updateScore('player');
				return 'You Win! Scissors beats paper';
			}
	}
}

function getGameResult(scores) {
	let result = '--------------------------------------------------';
	result += `\nFinal scores: player: ${scores.player} - computer: ${scores.computer}`;
	if (scores.player > scores.computer) {
		result += '\nPlayer wins!';
	} else if (scores.computer > scores.player) {
		result += '\nComputer wins!';
	} else {
		result += '\nNo one wins!';
	}
	return result;
}

function game() {
	for (let i = 0; i < 5; i++) {
		const playerSelection = getPlayerChoice();
		if (playerSelection === null) {
			return;
		}
		const computerSelection = getComputerChoice();
		console.log(playRound(playerSelection, computerSelection));
	}

	const gameResult = getGameResult(scores);
	console.log(gameResult);
}

game();
