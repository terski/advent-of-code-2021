const testInput = `
11111
19991
19191
19991
11111`;

const testResult = `
45654
51115
61116
51115
45654`;

const largeTestInput = `
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

const largeTestResult = `
8807476555
5089087054
8597889608
8485769600
8700908800
6600088989
6800005943
0000007456
9000000876
8700006848`;

const input = fs.readFileSync('./day11.txt', 'utf8');

const toGrid = (input) => {
    return input
        .split('\n')
        .filter((l) => l.length)
        .map((l) =>
            l.split('').map((i) => {
                return { value: Number(i) };
            })
        );
};

const runStep = (grid) => {
    return reset(ripple(increment(grid)));
};

const increment = (grid) => {
    return grid.map((row) =>
        row.map((slot) => {
            return { value: slot.value + 1 };
        })
    );
};

const ripple = (grid) => {
    let flashed = false;
    do {
        flashed = false;
        grid.forEach((row, rowIndex) => {
            row.forEach((slot, columnIndex) => {
                if (slot.value > 9 && !slot.flashed) {
                    slot.flashed = true;
                    flash(rowIndex, columnIndex, grid);
                    flashed = true;
                }
            });
        });
    } while (flashed);
    return grid;
};

const flash = (row, col, grid) => {
    const rowStart = Math.max(row - 1, 0);
    const rowEnd = Math.min(row + 1, grid.length - 1);
    const colStart = Math.max(col - 1, 0);
    const colEnd = Math.min(col + 1, grid[row].length - 1);

    for (let currentRow = rowStart; currentRow <= rowEnd; currentRow++) {
        for (let currentCol = colStart; currentCol <= colEnd; currentCol++) {
            const slot = grid[currentRow][currentCol];
            slot.value++;
        }
    }
};

const reset = (grid) => {
    let flashes = 0;
    let completeIllumination = true;
    grid.forEach((row) => {
        row.forEach((slot) => {
            if (slot.value > 9) {
                slot.value = 0;
                flashes++;
            } else {
                completeIllumination = false;
            }
        });
    });
    return { grid, flashes, completeIllumination };
};

const log = (grid) => {
    console.log(
        grid.map((row) => row.map((slot) => slot.value).join('')).join('\n')
    );
};

const verify = (expectedGrid, actualGrid) => {
    let areEqual = true;

    expectedGrid.forEach((row, rowIndex) => {
        const expectedRow = row.map((slot) => slot.value).join('');
        const actualRow = actualGrid[rowIndex]
            .map((slot) => slot.value)
            .join('');
        if (actualRow !== expectedRow) {
            console.error(
                `Error at row ${rowIndex}: expected ${expectedRow}, got ${actualRow}`
            );
            areEqual = false;
        }
    });

    return areEqual;
};

let flashes = 0;
let flashCount = 0;
let stepCount = 300;
let grid = toGrid(input);

for (let step = 0; step < stepCount; step++) {
    let completeIllumination;

    ({ grid, flashes, completeIllumination } = runStep(grid));
    flashCount += flashes;

    if (completeIllumination) {
        console.log(`Complete illumination at step ${step + 1}`);
        break;
    }
}

// verify(toGrid(largeTestResult), grid);
log(grid);
flashCount;
G
