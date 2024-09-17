const sentence = "Saya sangat senang mengerjakan soal algoritma"

const reverseAlphabet = (str) => {
    const letters = str.replace(/[0-9]/g, '');
    const numbers = str.replace(/[a-zA-Z]/g, '');

    const reversedLetters = letters.split('').reverse().join('');

    return reversedLetters + numbers;
}

const longestChar = (str) => {
    const words = str.split(' ');
    let longestWord = '';
    words.forEach(word => {
        if (word.length > longestWord.length) {
            longestWord = word;
        }
    });
    return `${longestWord} (${longestWord.length})`;
}

const countOccurrences = (input, query) => {
    return query.map(q => input.filter(item => item === q).length);
}

const diagonalDifference = (matrix) => {
    let primaryDiagonal = 0;
    let secondaryDiagonal = 0;
    const N = matrix.length;

    for (let i = 0; i < N; i++) {
        primaryDiagonal += matrix[i][i];
        secondaryDiagonal += matrix[i][N - 1 - i];
    }

    return Math.abs(primaryDiagonal - secondaryDiagonal);
}

const matrix = [
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9]
];


console.log(diagonalDifference(matrix));


const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];


console.log(countOccurrences(INPUT, QUERY));
console.log(reverseAlphabet("NEGIE1"))
console.log(longestChar(sentence))