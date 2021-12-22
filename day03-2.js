import fs from 'fs';

const readings = fs
    .readFileSync('./day03.txt', 'utf8')
    .split('\n')
    .filter((l) => l.length);

const mode = (values, bitIndex, tieValue) => {
    const count = values.reduce((previous, current, index, array) => {
        return previous + Number(current[bitIndex]);
    }, 0);

    const half = values.length / 2;

    if (count > half) {
        return 1;
    } else if (count < half) {
        return 0;
    }
    return tieValue;
};

const findRating = (values, mostCommon) => {
    return Array.from(values[0]).reduce((previous, current, index, array) => {
        if (previous.length === 1) {
            return previous;
        }

        const modeValue = mode(previous, index, 1).toString();
        return mostCommon
            ? previous.filter((v) => v[index] === modeValue)
            : previous.filter((v) => v[index] !== modeValue);
    }, values);
};

const mostCommon = true;
const oxygenGeneratorRating = Number.parseInt(
    findRating(readings, mostCommon),
    2
);
const CO2ScrubberRating = Number.parseInt(findRating(readings, !mostCommon), 2);
const lifeSupportRating = oxygenGeneratorRating * CO2ScrubberRating;

console.log(lifeSupportRating);
