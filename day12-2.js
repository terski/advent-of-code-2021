const testInput = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

const testResult = `start,A,b,A,b,A,c,A,end
start,A,b,A,b,A,end
start,A,b,A,b,end
start,A,b,A,c,A,b,A,end
start,A,b,A,c,A,b,end
start,A,b,A,c,A,c,A,end
start,A,b,A,c,A,end
start,A,b,A,end
start,A,b,d,b,A,c,A,end
start,A,b,d,b,A,end
start,A,b,d,b,end
start,A,b,end
start,A,c,A,b,A,b,A,end
start,A,c,A,b,A,b,end
start,A,c,A,b,A,c,A,end
start,A,c,A,b,A,end
start,A,c,A,b,d,b,A,end
start,A,c,A,b,d,b,end
start,A,c,A,b,end
start,A,c,A,c,A,b,A,end
start,A,c,A,c,A,b,end
start,A,c,A,c,A,end
start,A,c,A,end
start,A,end
start,b,A,b,A,c,A,end
start,b,A,b,A,end
start,b,A,b,end
start,b,A,c,A,b,A,end
start,b,A,c,A,b,end
start,b,A,c,A,c,A,end
start,b,A,c,A,end
start,b,A,end
start,b,d,b,A,c,A,end
start,b,d,b,A,end
start,b,d,b,end
start,b,end`;

const largeTestInput = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`;

const input = fs.readFileSync('./day12.txt', 'utf8');

/**
 * Build an edge array for all nodes in the graph
 */
const buildGraph = (input) => {
    const graph = [];
    input
        .split('\n')
        .filter((l) => l.length)
        .map((l) => l.split('-'))
        .map((i) => {
            const from = i[0];
            const to = i[1];

            if (from !== 'end') {
                if (!graph[from]) {
                    graph[from] = [to];
                } else {
                    graph[from].push(to);
                }
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
const pathsFrom = (node, graph, path, visitedTwice) => {
    const paths = [];
    node.forEach((next) => {
        if (next === 'end') {
            paths.push([...path, next]);
        } else if (next !== 'start') {
            const isSmall = next === next.toLowerCase();
            const wasVisited = path.includes(next);
            if (!wasVisited || !isSmall) {
                pathsFrom(
                    graph[next],
                    graph,
                    [...path, next],
                    visitedTwice
                ).forEach((p) => paths.push(p));
            } else if (!visitedTwice) {
                // We can visit a small cave if it has not been visited or no other
                // small cave was visited twice
                pathsFrom(graph[next], graph, [...path, next], true).forEach(
                    (p) => paths.push(p)
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
    if (actual.length === expected.length) {
        return `SUCCESS: ${actual.length} paths found`;
    }
    return `FAILED: expected ${expected.length} paths, found ${actual.length}`;
};

const actual = traverseGraph(buildGraph(testInput));
const expected = testResult.split('\n').filter((l) => l.length);
test(actual, expected); //?

const result = traverseGraph(buildGraph(input));
result.length; //?
