import fs from 'fs';

const testValues = '16,1,2,0,4,2,7,1,2,14'.split(',').map((i) => Number(i));

const values = fs
    .readFileSync('./day07.txt', 'utf8')
    .split(',')
    .map((i) => Number(i));

const fuelCost = (input, position) => {
    return input.reduce((cost, current) => {
        const delta = Math.abs(current - position);
        return cost + (delta / 2) * (1 + delta);
    }, 0);
};

const optimize = (input) => {
    const min = Math.min(...input);
    const max = Math.max(...input);
    let optimalCost, optimalPosition;

    for (let ii = min; ii <= max; ii++) {
        const cost = fuelCost(input, ii);
        if (ii === min || cost < optimalCost) {
            optimalCost = cost;
            optimalPosition = ii;
        }
    }

    return { optimalCost, optimalPosition };
};

optimize(testValues); //?
optimize(values); //?
