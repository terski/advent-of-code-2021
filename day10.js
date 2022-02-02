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

const scoreMap = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
};

const syntaxErrorScore = (input) => {
    const expectedClose = [];
    return input.split('').reduce((score, v) => {
        if (score) return score;

        switch (v) {
            case '[':
                expectedClose.push(']');
                break;
            case '{':
                expectedClose.push('}');
                break;
            case '<':
                expectedClose.push('>');
                break;
            case '(':
                expectedClose.push(')');
                break;

            default:
                const closer = expectedClose.pop();
                if (v !== closer) {
                    return scoreMap[v];
                }
                break;
        }
        return 0;
    }, 0);
};

const errorScore = (input) => {
    return input
        .split('\n')
        .filter((l) => l.length)
        .reduce((sum, line) => {
            return sum + syntaxErrorScore(line);
        }, 0);
};

errorScore(testInput); //?
errorScore(input); //?
