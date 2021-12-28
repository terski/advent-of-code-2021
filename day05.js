import fs from 'fs';

const test = [
    '0,9 -> 5,9',
    '8,0 -> 0,8',
    '9,4 -> 3,4',
    '2,2 -> 2,1',
    '7,0 -> 7,4',
    '6,4 -> 2,0',
    '0,9 -> 2,9',
    '3,4 -> 1,4',
    '0,0 -> 8,8',
    '5,5 -> 8,2',
];

const segments = fs
    .readFileSync('./day05.txt', 'utf8')
    .split('\n')
    .filter((i) => i.length)
    .map((i) => {
        const [x1, y1, x2, y2] = i
            .match(/([0-9]+)\,([0-9]+)\ -> ([0-9]+)\,([0-9]+)/)
            .slice(1, 5);
        return {
            x1: Number(x1),
            y1: Number(y1),
            x2: Number(x2),
            y2: Number(y2),
        };
    });

const result = segments.reduce(
    (previous, current, index, array) => {
        if (current.y1 === current.y2) {
            // Horizontal line
            const start = Math.min(current.x1, current.x2);
            const end = Math.max(current.x1, current.x2);

            while (previous.grid.length <= current.y1) {
                previous.grid.push([]);
            }
            while (previous.grid[current.y1].length <= end) {
                previous.grid[current.y1].push(0);
            }
            for (let x = start; x <= end; x++) {
                previous.grid[current.y1][x]++;
                if (previous.grid[current.y1][x] === 2) {
                    previous.score++;
                }
            }
        } else if (current.x1 === current.x2) {
            // Vertical line
            const start = Math.min(current.y1, current.y2);
            const end = Math.max(current.y1, current.y2);

            for (let y = start; y <= end; y++) {
                while (previous.grid.length <= y) {
                    previous.grid.push([]);
                }
                while (previous.grid[y].length <= current.x1) {
                    previous.grid[y].push(0);
                }
                previous.grid[y][current.x1]++;
                if (previous.grid[y][current.x1] === 2) {
                    previous.score++;
                }
            }
        }

        return previous;
    },
    { grid: [], score: 0 }
);

result; //?
