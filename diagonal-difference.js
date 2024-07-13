const matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];

function diagonalDifference(matrix) {
    const n = matrix.length;
    let diag1 = 0, diag2 = 0;

    for (let i = 0; i < n; i++) {
        diag1 += matrix[i][i];
        diag2 += matrix[i][n - i - 1];
    }

    return Math.abs(diag1 - diag2);
}

console.log(diagonalDifference(matrix))