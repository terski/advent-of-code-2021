import fs, { read } from 'fs';

const readings = fs.readFileSync('./day04.txt', 'utf8').split('\n');

// Read in a single board
const readBoard = (input) => {
    let board = new Array(5);
    for (let row = 0; row < 5; row++) {
        board[row] = new Array(5);
        const values = input[row].trim().split(/\ +/);

        for (let col = 0; col < 5; col++) {
            board[row][col] = { value: values[col], marked: false };
        }
    }
    return board;
};

// Create the boards
const createBoards = (input) => {
    const boards = new Array();
    for (let ii = 0; ii < input.length; ii += 6) {
        boards.push(readBoard(input.slice(ii, ii + 5)));
    }
    return boards;
};

const boards = createBoards(readings.slice(2));

// Play a single draw on a board and return the resulting score.
const playBoard = (board, draw) => {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (board[row][col].value === draw) {
                board[row][col].marked = true;

                // Check whether the board has a win
                if (
                    board[row].every((s) => s.marked) ||
                    board.every((s) => s[col].marked)
                ) {
                    const score = board.reduce(
                        // boardScore = sum of each row score
                        (boardScore, currentRow) => {
                            return (
                                boardScore +
                                currentRow.reduce((rowScore, slot) => {
                                    // rowScore = sum of unmarked slot values
                                    const slotScore = slot.marked
                                        ? 0
                                        : Number(slot.value);
                                    return rowScore + slotScore;
                                }, 0)
                            );
                        },
                        0
                    );
                    return score * Number(draw);
                }
            }
        }
    }
    return 0;
};

// Play a single draw on all boards until a winner is found.
const playBoards = (boards, draw) => {
    return boards.reduce((score, currentBoard, index, array) => {
        return score ? score : playBoard(currentBoard, draw);
    }, 0);
};

// Play draws until a winner is found (score > 0)
const score = readings[0]
    .split(',')
    .reduce((score, currentDraw, index, array) => {
        return score ? score : playBoards(boards, currentDraw);
    }, 0);

score; //?
