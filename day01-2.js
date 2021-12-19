import fs from 'fs';

const values = fs
    .readFileSync('./day01.txt', 'utf8')
    .split('\n')
    .map((s) => Number(s));

const sums = values.map((value, index, array) => {
    if (index < 2) {
        return 0;
    }
    return array[index] + array[index - 1] + array[index - 2];
});

const filteredSums = sums.filter((value, index) => index > 1);

const increases = filteredSums.reduce((previous, current, index, array) => {
    if (index === 0) {
        return 0;
    }

    if (array[index] > array[index - 1]) {
        return previous + 1;
    }

    return previous;
}, 0);

console.log(increases);
