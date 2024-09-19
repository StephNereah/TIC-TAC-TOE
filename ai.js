// The AI makes simple random moves when it's "O" and AI mode is enabled.
function makeAIMove() {
    let emptyCells = board.map((val, index) => val === '' ? index : null).filter(val => val !== null);

    // Simple AI logic: pick a random empty cell after a 2-second delay
    if (emptyCells.length > 0) {
        setTimeout(() => {
            let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            handleMove(randomIndex);
        }, 1000); // 1-second delay
    }
}