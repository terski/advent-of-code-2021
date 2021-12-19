import fs from 'fs';

const moves = fs.readFileSync('./day02.txt', 'utf8').split('\n');

const position = moves.reduce(
    (previous, current, index, array) => {
        const [direction, amount] = current.split(' ');
        switch (direction) {
            case 'forward':
                return { x: previous.x + Number(amount), y: previous.y };

            case 'down':
                return { x: previous.x, y: previous.y + Number(amount) };

            case 'up':
                return { x: previous.x, y: previous.y - Number(amount) };

            default:
                return previous;
        }
    },
    {
        x: 0,
        y: 0,
    }
);

console.log(position);
console.log(`answer: ${position.x * position.y}`);
