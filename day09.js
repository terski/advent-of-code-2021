const testInput = `
2199943210
3987894921
9856789892
8767896789
9899965678`;

const input = fs.readFileSync('./day09.txt', 'utf8');

const sumOfRiskLevels = (input) => {
    const lowPoints = input
        .split('\n')
        .filter((row) => row.length)
        .reduce((points, row, rowIndex, seaFloor) => {
            const rowLowPoints = row
                .split('')
                .reduce((rowPoints, height, columnIndex, currentRow) => {
                    if (
                        columnIndex < currentRow.length - 1 &&
                        height >= currentRow[columnIndex + 1]
                    ) {
                        return rowPoints; // Not lower than right
                    }
                    if (
                        columnIndex > 0 &&
                        height >= currentRow[columnIndex - 1]
                    ) {
                        return rowPoints; // Not lower than left
                    }
                    if (
                        rowIndex < seaFloor.length - 1 &&
                        height >= seaFloor[rowIndex + 1][columnIndex]
                    ) {
                        return rowPoints; // Not lower than below
                    }
                    if (
                        rowIndex > 0 &&
                        height >= seaFloor[rowIndex - 1][columnIndex]
                    ) {
                        return rowPoints; // Not lower than above
                    }
                    return [...rowPoints, height];
                }, []);
            return [...points, ...rowLowPoints];
        }, []);

    return lowPoints.map((p) => Number(p) + 1).reduce((sum, p) => sum + p, 0);
};

const expect = (description, condiditon) => {
    if (condiditon) {
        console.log(`PASS: ${description}`);
    } else {
        console.error(`FAIL: ${description}`);
    }
};

expect('sum of test risk levels to be 15', sumOfRiskLevels(testInput) === 15);

sumOfRiskLevels(input); //?
