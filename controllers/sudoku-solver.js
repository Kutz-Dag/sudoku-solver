class SudokuSolver {
  validate(puzzleString) {
    if (!puzzleString) {
      return { valid: false, error: 'Required field missing' };
    }
    if (puzzleString.length !== 81) {
      return { valid: false, error: 'Expected puzzle to be 81 characters long' };
    }
    if (/[^1-9.]/.test(puzzleString)) {
      return { valid: false, error: 'Invalid characters in puzzle' };
    }
    return { valid: true };
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const start = row * 9;
    const rowValues = puzzleString.slice(start, start + 9).split('');
    return !rowValues.includes(value);
  }

  checkColPlacement(puzzleString, row, column, value) {
    const colValues = [];
    for (let i = 0; i < 9; i++) {
      colValues.push(puzzleString[column + i * 9]);
    }
    return !colValues.includes(value);
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const regionRow = Math.floor(row / 3) * 3;
    const regionCol = Math.floor(column / 3) * 3;
    const regionValues = [];

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        regionValues.push(puzzleString[(regionRow + r) * 9 + (regionCol + c)]);
      }
    }
    return !regionValues.includes(value);
  }

  solve(puzzleString) {
    const validation = this.validate(puzzleString);
    if (!validation.valid) return { error: validation.error };

    const solveHelper = (puzzle) => {
      const emptyCellIndex = puzzle.indexOf('.');
      if (emptyCellIndex === -1) return puzzle;

      const row = Math.floor(emptyCellIndex / 9);
      const column = emptyCellIndex % 9;

      for (let num = 1; num <= 9; num++) {
        const value = num.toString();
        if (
          this.checkRowPlacement(puzzle, row, column, value) &&
          this.checkColPlacement(puzzle, row, column, value) &&
          this.checkRegionPlacement(puzzle, row, column, value)
        ) {
          const newPuzzle = puzzle.slice(0, emptyCellIndex) + value + puzzle.slice(emptyCellIndex + 1);
          const solvedPuzzle = solveHelper(newPuzzle);
          if (solvedPuzzle) return solvedPuzzle;
        }
      }
      return null;
    };

    const solution = solveHelper(puzzleString);
    if (!solution) return { error: 'Puzzle cannot be solved' };

    return solution;
  }
}

module.exports = SudokuSolver;


