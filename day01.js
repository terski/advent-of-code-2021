import fs from 'fs';

const data = fs
    .readFileSync('./day01.txt', 'utf8')
    .split('\n')
    .map((s) => Number(s));

const increases = data.reduce((previous, current, index, array) => {
    if (index === 0) {
        return 0;
    }

    if (array[index] > array[index - 1]) {
        return previous + 1;
    }

    return previous;
}, 0);

console.log(increases);
