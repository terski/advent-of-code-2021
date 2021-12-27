import fs, { read } from 'fs';

const readings = fs.readFileSync('./day04.txt', 'utf8').split('\n');

// Read in a single board
const readBoard = (input) => {
    return input.slice(0, 5).map((row) => {
        return row
            .trim()
            .split(/\ +/)
            .map((value) => {
                return { value, marked: false };
            });
    });
};

// Create the boards
const createBoards = (input) => {
    const boards = new Array();
    for (let ii = 0; ii < input.length; ii += 6) {
        boards.push({ rows: readBoard(input.slice(ii, ii + 5)), score: 0 });
    }
    return boards;
};

const boards = createBoards(readings.slice(2));

// Play a single draw on a board and return true if the draw produces a win.
const playBoard = (board, draw) => {
    for (let row = 0; row < board.rows.length; row++) {
        for (let col = 0; col < board.rows[row].length; col++) {
            if (board.rows[row][col].value === draw) {
                board.rows[row][col].marked = true;

                // Check whether the board has a win
                if (
                    board.rows[row].every((s) => s.marked) ||
                    board.rows.every((s) => s[col].marked)
                ) {
                    board.score =
                        board.rows.reduce(
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
                        ) * Number(draw);

                    return board.score;
                }
            }
        }
    }
    return 0;
};

// Play a single draw on all boards, returning a list of winning boards.
const playBoards = (boards, draw) => {
    return boards.reduce((winners, currentBoard, index, array) => {
        if (playBoard(currentBoard, draw)) {
            return [...winners, currentBoard];
        }
        return winners;
    }, []);
};

// Play all draws
const results = readings[0].split(',').reduce(
    (previous, currentDraw, index, array) => {
        if (!previous.remainingBoards.length) {
            return previous;
        }

        const currentWinners = playBoards(
            previous.remainingBoards,
            currentDraw
        );

        return {
            winners: [...previous.winners, ...currentWinners],
            remainingBoards: previous.remainingBoards.filter(
                (b) => !currentWinners.includes(b)
            ),
        };
    },
    { winners: [], remainingBoards: boards }
);

const score = results.winners.length
    ? results.winners[results.winners.length - 1].score
    : 0;
score; //?
