import fs from 'fs';

const testValues = [3, 4, 3, 1, 2];
const expectedResult = [
    6, 0, 6, 4, 5, 6, 0, 1, 1, 2, 6, 0, 1, 1, 1, 2, 2, 3, 3, 4, 6, 7, 8, 8, 8,
    8,
];

const values = fs
    .readFileSync('./day06.txt', 'utf8')
    .split(',')
    .map((i) => Number(i));

const spawn = (input, days) => {
    let fish = [...input];

    for (let ii = 0; ii < days; ii++) {
        let fishToAdd = 0;
        fish = fish.map((f) => {
            if (f === 0) {
                fishToAdd++;
                return 6;
            }
            return f - 1;
        });
        fish = fish.concat(new Array(fishToAdd).fill(8));
    }

    return fish;
};

const result = spawn(values, 80);
result.length //?
