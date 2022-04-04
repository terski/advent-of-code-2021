const testInput = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

const testResult = `start,A,b,A,c,A,end
start,A,b,A,end
start,A,b,end
start,A,c,A,b,A,end
start,A,c,A,b,end
start,A,c,A,end
start,A,end
start,b,A,c,A,end
start,b,A,end
start,b,end`;

const simpleInput = `start-A
start-B
A-c
B-c
B-end`;

const input = fs.readFileSync('./day12.txt', 'utf8');

/**
 * Build an edge array for all nodes in the graph
 */
const buildGraph = (input) => {
    const graph = [];
    input
        .split('\n')
        .filter(l => l.length)
        .map((l) => l.split('-'))
        .map((i) => {
            const from = i[0];
            const to = i[1];

            if (!graph[from]) {
                graph[from] = [to];
            } else {
                graph[from].push(to);
            }

            if (from !== 'start' && to !== 'end') {
                if (!graph[to]) {
                    graph[to] = [from];
                } else {
                    graph[to].push(from);
                }
            }
        });
    return graph;
};

const traverseGraph = (graph) => {
    const node = graph['start'];
    const path = ['start'];

    return pathsFrom(node, graph, path);
};

/**
 * Returns an array of all valid paths throught the graph for the given node
 */
const pathsFrom = (node, graph, path) => {
    const paths = [];
    node.forEach((next) => {
        if (next === 'end') {
            paths.push([...path, next]);
        } else {
            const isSmall = next === next.toLowerCase();
            const wasVisited = path.includes(next);
            if (!wasVisited || !isSmall) {
                pathsFrom(graph[next], graph, [...path, next]).forEach((p) =>
                    paths.push(p)
                );
            }
        }
    });
    return paths;
};

const stringify = (pathArray) => {
    return [...pathArray].sort().reduce((prev, current) => {
        return prev + '\n' + current.join('-');
    }, '');
};

const test = (actual, expected) => {
    if (stringify(actual) !== stringify(expected)) {
        console.error(
            `FAILED:\n actual:\n{$actual}\n\n expected:\n{$expected}`
        );
    } else {
        console.log(`SUCCESS`);
    }
};

const actual = traverseGraph(buildGraph(input));
actual //?
actual.length //?
