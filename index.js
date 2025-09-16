const choices = document.querySelectorAll('.choice');
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const nextBtn = document.getElementById('next-button');

let playerScore = parseInt(localStorage.getItem('playerScore')) || 0;
let computerScore = parseInt(localStorage.getItem('computerScore')) || 0;

playerScoreEl.textContent = playerScore;
computerScoreEl.textContent = computerScore;

const options = ['stone', 'paper', 'scissor'];

choices.forEach(btn => {
    btn.addEventListener('click', () => {
        const player = [...btn.classList].find(cls => options.includes(cls));
        const computer = options[Math.floor(Math.random() * options.length)];
        const result = getResult(player, computer);
        updateScores(result);
        showResult(player, computer, result);
        // Make Next button visible on any win, regardless of total scores
        if (result === 'win') {
            nextBtn.style.display = 'inline-block';
        }
    });
});

function getResult(p, c) {
    if (p === c) return 'draw';
    if ((p === 'stone' && c === 'scissor') || (p === 'paper' && c === 'stone') || (p === 'scissor' && c === 'paper')) return 'win';
    return 'lose';
}

function updateScores(result) {
    if (result === 'win') playerScore++;
    if (result === 'lose') computerScore++;
    localStorage.setItem('playerScore', playerScore);
    localStorage.setItem('computerScore', computerScore);
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
}

function showResult(player, computer, result) {
    document.querySelector('.triangle-wrapper').style.display = 'none';
    document.getElementById('result-section').style.display = 'flex';
    document.getElementById('player-picked').innerHTML = '';
    document.getElementById('computer-picked').innerHTML = '';

    function createGlowWrapper(src, isWinner) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('picked');
        if (isWinner) wrapper.classList.add('winner-glow');

        const img = document.createElement('img');
        img.src = src;
        img.classList.add('result-image');

        wrapper.appendChild(img);
        return wrapper;
    }

    document.getElementById('player-picked').innerHTML = '';
    document.getElementById('computer-picked').innerHTML = '';

    const playerWrapper = createGlowWrapper(`./assests/${player}.png`, result === 'win');
    const computerWrapper = createGlowWrapper(`./assests/${computer}.png`, result === 'lose');

    document.getElementById('player-picked').appendChild(playerWrapper);
    document.getElementById('computer-picked').appendChild(computerWrapper);


    const header = document.getElementById('result-header');
    header.textContent = result === 'win' ? 'YOU WIN' : result === 'lose' ? 'YOU LOSE' : "IT'S A DRAW";
}

function playAgain() {
    document.querySelector('.triangle-wrapper').style.display = 'flex';
    document.getElementById('result-section').style.display = 'none';
}

document.getElementById('rules-button').addEventListener('click', () => {
    const modal = document.getElementById('rules-modal');
    modal.style.display = modal.style.display === 'block' || modal.style.display === 'flex' ? 'none' : 'flex';
});

document.getElementById('close-rules')?.addEventListener('click', () => {
    document.getElementById('rules-modal').style.display = 'none';
});

window.addEventListener('DOMContentLoaded', () => {
    const hasSeen = localStorage.getItem('hasSeenRules');
    if (!hasSeen) {
        const modal = document.getElementById('rules-modal');
        if (modal) modal.style.display = 'flex';
        localStorage.setItem('hasSeenRules', 'true');
    }
});

nextBtn.addEventListener('click', () => {
    window.location.href = 'trophy.html';
});
