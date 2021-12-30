import fs from 'fs';

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

const start = performance.now();
const result = spawn(values, 80);
const end = performance.now();
const duration = end - start; // about 220ms
duration; //?

result.length; //?
