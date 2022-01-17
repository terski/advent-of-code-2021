const testInput = `
2199943210
3987894921
9856789892
8767896789
9899965678`;

const input = fs.readFileSync('./day09.txt', 'utf8');

const isLowPoint = (row, col, seaFloor) => {
    const height = seaFloor[row][col];
    if (col < seaFloor[row].length - 1 && height >= seaFloor[row][col + 1]) {
        return false; // Not lower than right
    }
    if (col > 0 && height >= seaFloor[row][col - 1]) {
        return false; // Not lower than left
    }
    if (row < seaFloor.length - 1 && height >= seaFloor[row + 1][col]) {
        return false; // Not lower than below
    }
    if (row > 0 && height >= seaFloor[row - 1][col]) {
        return false; // Not lower than above
    }
    return true;
};

const mapBasinRow = (row, basinMap) => {
    for (let col = 0; col < basinMap[row].length; col++) {
        if (basinMap[row][col].height === 9) {
            continue;
        }
        if (row > 0 && basinMap[row - 1][col].inBasin) {
            basinMap[row][col].inBasin = true;
        } else if (
            row < basinMap.length - 1 &&
            basinMap[row + 1][col].inBasin
        ) {
            basinMap[row][col].inBasin = true;
        }

        if (basinMap[row][col].inBasin) {
            for (
                let currentCol = col + 1;
                currentCol <= basinMap[row].length - 1;
                currentCol++
            ) {
                if (basinMap[row][currentCol].height < 9) {
                    basinMap[row][currentCol].inBasin = true;
                } else {
                    break;
                }
            }

            for (let currentCol = col - 1; currentCol >= 0; currentCol--) {
                if (basinMap[row][currentCol].height < 9) {
                    basinMap[row][currentCol].inBasin = true;
                } else {
                    break;
                }
            }
        }
    }
};

const basinSize = (row, col, seaFloor) => {
    const basinMap = seaFloor.map((r) =>
        r.map((h) => {
            return { height: h, inBasin: false };
        })
    );

    basinMap[row][col].inBasin = true;

    for (
        let currentCol = col + 1;
        currentCol <= basinMap[row].length - 1;
        currentCol++
    ) {
        if (basinMap[row][currentCol].height < 9) {
            basinMap[row][currentCol].inBasin = true;
        } else {
            break;
        }
    }

    for (let currentCol = col - 1; currentCol >= 0; currentCol--) {
        if (basinMap[row][currentCol].height < 9) {
            basinMap[row][currentCol].inBasin = true;
        } else {
            break;
        }
    }

    for (let currentRow = row - 1; currentRow >= 0; currentRow--) {
        mapBasinRow(currentRow, basinMap);
    }

    for (let currentRow = row + 1; currentRow < basinMap.length; currentRow++) {
        mapBasinRow(currentRow, basinMap);
    }

    const basinSize = basinMap.reduce(
        (size, row) => size + row.filter((pos) => pos.inBasin).length,
        0
    );
    return basinSize;
};

const productOfBasinSizes = (input) => {
    const basinSizes = [];
    const seaFloor = input
        .split('\n')
        .filter((row) => row.length)
        .map((row) => {
            return row.split('').map((height) => Number(height));
        });

    for (let row = 0; row < seaFloor.length; row++) {
        for (let col = 0; col < seaFloor[row].length; col++) {
            if (isLowPoint(row, col, seaFloor)) {
                basinSizes.push(basinSize(row, col, seaFloor));
            }
        }
    }

    return basinSizes
        .map((s) => Number(s))
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((product, size) => product * size, 1);
};

const expect = (description, condiditon) => {
    if (condiditon) {
        console.log(`PASS: ${description}`);
    } else {
        console.error(`FAIL: ${description}`);
    }
};

expect(
    'to correctly calculate the product of three largest basin sizes',
    productOfBasinSizes(testInput) === 1134
);

productOfBasinSizes(input); //?
