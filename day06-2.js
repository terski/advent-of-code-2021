import fs from 'fs';

const testValues = '3,4,3,1,2';
const testDays = 18;
const expectedResult = '6,0,6,4,5,6,0,1,1,2,6,0,1,1,1,2,2,3,3,4,6,7,8,8,8,8';

const values = fs.readFileSync('./day06.txt', 'utf8');

const initialize = (input) =>
    input.split(',').reduce((population, current) => {
        population[Number(current)]++;
        return population;
    }, new Array(9).fill(0));

const increment = (input) => {
    const fish = [...input];
    fish.push(fish.shift());
    fish[6] += fish[8];
    return fish;
};

const sum = (input) => input.reduce((sum, value) => sum + value);

// Test
let testPopulation = initialize(testValues);
for (let day = 0; day < testDays; day++) {
    testPopulation = increment(testPopulation);
}
const itWorked = sum(testPopulation) === sum(initialize(expectedResult));
itWorked; //?

// Calculation
const start = performance.now();
let population = initialize(values);
for (let day = 0; day < 256; day++) {
    population = increment(population);
}
const end = performance.now();
const duration = end - start; // about 0.5ms
duration; //?

const result = sum(population);
result; //?
