import fs from 'fs';

const testPattern = `
be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;

const pattern = fs.readFileSync('./day08.txt', 'utf8');

const normalize = (input) => {
    return input.split('').sort().join('');
};

const matches = (s1, s2) => {
    let count = 0;
    for (let ii in s1) {
        count += s2.includes(s1[ii]) ? 1 : 0;
    }
    return count;
};

const buildPatternMap = (signalPatterns) => {
    const map = new Map();
    map.set(1, signalPatterns.filter((p) => p.length === 2)[0]);
    map.set(7, signalPatterns.filter((p) => p.length === 3)[0]);
    map.set(4, signalPatterns.filter((p) => p.length === 4)[0]);
    map.set(8, signalPatterns.filter((p) => p.length === 7)[0]);

    signalPatterns.forEach((pattern) => {
        switch (pattern.length) {
            case 6:
                if (matches(pattern, map.get(1)) === 1) {
                    map.set(6, pattern);
                } else if (matches(pattern, map.get(4)) === 3) {
                    map.set(0, pattern);
                } else {
                    map.set(9, pattern);
                }
                break;
            case 5:
                if (matches(pattern, map.get(1)) === 2) {
                    map.set(3, pattern);
                } else if (matches(pattern, map.get(4)) === 2) {
                    map.set(2, pattern);
                } else {
                    map.set(5, pattern);
                }
                break;
        }
    });
    return new Map(Array.from(map, (i) => i.reverse()));
};

const outputValue = (line) => {
    const signalPatterns = line.split(' | ')[0].split(' ').map(normalize);
    const patternMap = buildPatternMap(signalPatterns);
    const output = line
        .split(' | ')[1]
        .split(' ')
        .map(normalize)
        .map((i) => patternMap.get(i))
        .join('');
    return Number(output);
};

const sumOfOutputValues = (pattern) => {
    return pattern
        .split('\n')
        .filter((l) => l.length)
        .reduce((sum, line) => {
            const value = Number(outputValue(line));
            return sum + value;
        }, 0);
};

sumOfOutputValues(testPattern); //?
sumOfOutputValues(pattern); //?
