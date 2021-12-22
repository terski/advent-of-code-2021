import fs, { read } from 'fs';

const readings = fs.readFileSync('./day03.txt', 'utf8').split('\n');

const counts = readings.reduce((previous, current, index, array) => {
    const bits = current.split('');
    bits.forEach((v, i, a) => {
        if (previous.length === i) {
            previous.push(0);
        }

        previous[i] = previous[i] + Number(v);
    });

    return previous;
}, []);

const total = readings.length;

const gammaRate = parseInt(counts.map((value, index) => (value > total / 2 ? 1 : 0)).join(''), 2);
const epsilonRate = parseInt(counts.map((value, index) => (value < total / 2 ? 1 : 0)).join(''), 2);
const powerConsumption = gammaRate * epsilonRate;

console.log(powerConsumption);
