// Game variables
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let aiMode = false; // AI Mode flag
let scores = { X: 0, O: 0, draws: 0 };

// Winning combinations
const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to check for a winner
function checkWinner() {
    for (let combo of winCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    if (!board.includes('')) return 'draw';
    return null;
}

// Handle game result (display modal)
function handleGameOver(result) {
    const modal = document.getElementById('game-result-modal');
    const message = document.getElementById('modal-message');
    if (result === 'draw') {
        message.textContent = "It's a Draw!";
        scores.draws++;
    } else {
        message.textContent = `Player ${result} Wins!`;
        scores[result]++;
    }
    updateScoreDisplay();
    modal.style.display = 'block';
    gameOver = true;
}

// Update score display
function updateScoreDisplay() {
    const scoreDisplay = document.getElementById('score-display');
    scoreDisplay.textContent = `Player X: ${scores.X} | Player O: ${scores.O} | Draws: ${scores.draws}`;
}

// Restart the game
function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    document.getElementById('game-result-modal').style.display = 'none';
}

// Switch between AI and local multiplayer mode
document.getElementById('toggle-mode-button').addEventListener('click', () => {
    aiMode = !aiMode;
    document.getElementById('toggle-mode-button').textContent = aiMode ? 'Switch to Multiplayer Mode' : 'Switch to AI Mode';
    resetBoard(); // Reset board when switching modes
});

// Handle player move
function handleMove(index) {
    if (!gameOver && board[index] === '') {
        board[index] = currentPlayer;
        document.querySelector(`[data-index='${index}']`).textContent = currentPlayer;
        
        const winner = checkWinner();
        if (winner) {
            handleGameOver(winner);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            
            if (aiMode && currentPlayer === 'O') {
                makeAIMove();
            }
        }
    }
}

// Event listeners for each cell
document.querySelectorAll('.cell').forEach((cell, index) => {
    cell.addEventListener('click', () => handleMove(index));
});

// Restart button event listener
document.getElementById('restart-button').addEventListener('click', resetBoard);

// Close modal event listener
document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('game-result-modal').style.display = 'none';
});

// Quit button event listener (redirect to home)
document.getElementById('quit-button').addEventListener('click', () => {
    window.location.href = 'index.html';
});