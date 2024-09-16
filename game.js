// Game variables
let currentPlayer = 'X';  // Player X starts
let gameBoard = ['', '', '', '', '', '', '', '', ''];  // Empty board stores state of each cell
let gameActive = true;

// Winning combinations
const winningCombinations = [
    [0, 1, 2],  // First row
    [3, 4, 5],  // Second row
    [6, 7, 8],  // Third row
    [0, 3, 6],  // First column
    [1, 4, 7],  // Second column
    [2, 5, 8],  // Third column
    [0, 4, 8],  // Diagonal from top-left to bottom-right
    [2, 4, 6]   // Diagonal from top-right to bottom-left
];

// Select all cells
const cells = document.querySelectorAll('.cell');

// Add click event to each cell
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Handle click on a cell
function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    // If cell is already occupied or the game is over, do nothing
    if (gameBoard[cellIndex] !== '' || !gameActive) {
        return;
    }

    // Update cell and board state
    gameBoard[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    // Check if the current move wins the game
    checkForWinner();

    // If the game is still active, switch player
    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Check for a win or draw
function checkForWinner() {
    let roundWon = false;

    // Check all winning combinations
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];

        // Check if all 3 cells in a winning combination are the same (and not empty)
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            highlightWinner([a, b, c]);  // Highlight the winning combination
            break;
        }
    }

    if (roundWon) {
        gameActive = false;  // Stop the game
        setTimeout(() => alert(`${currentPlayer} has won!`), 100);  // Alert the winner
        return;  // Do not reset the board automatically
    }

    // Check for a draw
    if (!gameBoard.includes('')) {
        gameActive = false;  // Stop the game
        setTimeout(() => alert('It\'s a draw!'), 100);  // Alert the draw
    }
}

// Highlight the winning cells
function highlightWinner(winningCells) {
    winningCells.forEach(index => {
        cells[index].classList.add('highlight');  // Add the highlight class to the winning cells
    });
}

// Reset the game board for a new game
function resetBoard() {
    // Clear the game board state and cell contents
    gameBoard = ['', '', '', '', '', '', '', '', ''];  // Clear board state
    cells.forEach(cell => {
        cell.textContent = '';  // Clear cell content
        cell.classList.remove('highlight'); // Remove any highlight from previous win
    });

    currentPlayer = 'X';  // Reset to Player X
    gameActive = true;  // Reactivate the game
}

// Function to go back to the landing page
function quitGame() {
    window.location.href = 'index.html'; // Path to my landing page
}

// Event listeners for buttons
document.getElementById('restart-button').addEventListener('click', resetBoard);
document.getElementById('quit-button').addEventListener('click', quitGame);
