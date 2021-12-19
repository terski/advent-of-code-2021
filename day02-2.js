import fs from 'fs';

const moves = fs
    .readFileSync('./day02.txt', 'utf8')
    .split('\n')
    .map((s) => {
        const [direction, amount] = s.split(' ');
        return { direction, amount: Number(amount) };
    });

const position = moves.reduce(
    (previous, { direction, amount }, index, array) => {
        switch (direction) {
            case 'forward':
                return {
                    x: previous.x + amount,
                    y: previous.y + amount * previous.aim,
                    aim: previous.aim,
                };

            case 'down':
                return {
                    x: previous.x,
                    y: previous.y,
                    aim: previous.aim + amount,
                };

            case 'up':
                return {
                    x: previous.x,
                    y: previous.y,
                    aim: previous.aim - amount,
                };

            default:
                return previous;
        }
    },
    {
        x: 0,
        y: 0,
        aim: 0,
    }
);

console.log(position);
console.log(`answer: ${position.x * position.y}`);
