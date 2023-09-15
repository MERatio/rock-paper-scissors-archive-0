'use strict';

function getComputerChoice() {
	const choices = ['rock', 'paper', 'scissors'];
	const choice = choices[Math.floor(Math.random() * choices.length)];
	return choice;
}

function playRound(playerSelection, computerSelection) {
	const lcPlayerSelection = playerSelection.toLowerCase();
	if (lcPlayerSelection === computerSelection) {
		return "It's a tie!";
	}
	switch (lcPlayerSelection) {
		case 'rock':
			if (computerSelection === 'paper') {
				return 'You Lose! Rock loses to paper';
			} else {
				return 'You Win! Rock beats scissors';
			}
			break;
		case 'paper':
			if (computerSelection === 'rock') {
				return 'You Win! Paper beats rock';
			} else {
				return 'You Lose! Paper loses to scissors';
			}
			break;
		case 'scissors':
			if (computerSelection === 'rock') {
				return 'You Lose! Scissors loses to rock';
			} else {
				return 'You Win! Scissors beats paper';
			}
	}
}

const playerSelection = 'rock';
const computerSelection = getComputerChoice();
console.log(`${playerSelection}, ${computerSelection}`);
console.log(playRound(playerSelection, computerSelection));
