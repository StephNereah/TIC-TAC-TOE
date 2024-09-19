// The AI makes simple random moves when it's "O" and AI mode is enabled.
function makeAIMove() {
    let emptyCells = board.map((val, index) => val === '' ? index : null).filter(val => val !== null);

    // Simple AI logic: pick a random empty cell
    if (emptyCells.length > 0) {
        let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        handleMove(randomIndex);
    }
}
