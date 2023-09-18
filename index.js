'use strict';

let scores;

const playerScore = document.querySelector('.player-score');
const computerScore = document.querySelector('.computer-score');
const result = document.querySelector('.result');
const choicesBtn = document.querySelectorAll('.choice');
const resetBtn = document.querySelector('.reset');

function getComputerChoice() {
	const CHOICES = ['rock', 'paper', 'scissors'];
	const choice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
	return choice;
}

function updateScore(winner) {
	if (winner === 'none') {
		return;
	}
	scores[winner]++;
	playerScore.textContent = scores.player;
	computerScore.textContent = scores.computer;
}

function capitalize(str) {
	return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

function playRound(playerChoice, computerChoice) {
	const lcPlayerChoice = playerChoice.toLowerCase();
	if (lcPlayerChoice === computerChoice) {
		updateScore('none');
		result.textContent = "It's a tie!";
	} else if (
		(lcPlayerChoice === 'rock' && computerChoice === 'scissors') ||
		(lcPlayerChoice === 'paper' && computerChoice === 'rock') ||
		(lcPlayerChoice === 'scissors' && computerChoice === 'paper')
	) {
		updateScore('player');
		result.textContent = `You Win! ${capitalize(
			playerChoice,
		)} beats ${computerChoice}`;
	} else {
		updateScore('computer');
		result.textContent = `You Lose! ${capitalize(
			playerChoice,
		)} loses to ${computerChoice}`;
	}
}

function getGameResult(scores) {
	if (scores.player > scores.computer) {
		return '\nPlayer wins!';
	} else {
		return '\nComputer wins!';
	}
}

function disableNodes(nodes, bool = true) {
	nodes.forEach((node) => (node.disabled = bool));
}

function init() {
	scores = {
		player: 0,
		computer: 0,
	};
	playerScore.textContent = scores.player;
	computerScore.textContent = scores.computer;
	result.innerHTML = '&nbsp';
	disableNodes(choicesBtn, false);
}

choicesBtn.forEach((choiceBtn) => {
	choiceBtn.addEventListener('click', (e) => {
		const playerChoice = e.currentTarget.dataset.choice;
		const computerChoice = getComputerChoice();
		playRound(playerChoice, computerChoice);

		if (scores.player === 5 || scores.computer === 5) {
			const gameResult = getGameResult(scores);
			result.textContent = gameResult;
			disableNodes(choicesBtn);
		}
	});
});

resetBtn.addEventListener('click', init);

init();
