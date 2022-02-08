const testInput = `[({(<(())[]>[[{[]{<()<>>
    [(()[<>])]({[<{<<[]>>(
    {([(<{}[<>[]}>{[]{[(<()>
    (((({<>}<{<{<>}{[]{[]{}
    [[<[([]))<([[{}[[()]]]
    [{[{({}]{}}([{[{{{}}([]
    {<[[]]>}<{[{[{[]{()[[[]
    [<(<(<(<{}))><([]([]()
    <{([([[(<>()){}]>(<<{{
    <{([{{}}[<[[[<>{}]]]>[]]`;

const input = fs.readFileSync('./day10.txt', 'utf8');

const syntaxErrorScore = (input) => {
    const scoreMap = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137,
    };
    return input.split('').reduce(
        ({ score, expectedCloses }, v) => {
            if (score) return { score, expectedCloses };

            switch (v) {
                case '[':
                    expectedCloses.push(']');
                    break;
                case '{':
                    expectedCloses.push('}');
                    break;
                case '<':
                    expectedCloses.push('>');
                    break;
                case '(':
                    expectedCloses.push(')');
                    break;

                default:
                    const closer = expectedCloses.pop();
                    if (v !== closer) {
                        return { score: scoreMap[v], expectedCloses };
                    }
                    break;
            }
            return { score, expectedCloses };
        },
        { score: 0, expectedCloses: [] }
    );
};

const completionScore = (input) => {
    const closerScores = {
        ')': 1,
        ']': 2,
        '}': 3,
        '>': 4,
    };

    return input.reduce((score, closer) => {
        return score * 5 + closerScores[closer];
    }, 0);
};

const completionScores = (input) => {
    return input
        .split('\n')
        .filter((l) => l.length)
        .map((l) => l.trim())
        .map((l) => syntaxErrorScore(l))
        .filter((l) => l.score === 0)
        .map((l) => l.expectedCloses.reverse())
        .map((l) => completionScore(l))
        .sort((a, b) => a - b);
};

const autocompleteScore = (input) => {
    const scores = completionScores(input);
    return scores[Math.round(scores.length / 2) - 1];
};

autocompleteScore(testInput); //?
autocompleteScore(input); //?
