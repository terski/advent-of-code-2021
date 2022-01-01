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

const uniqueOutputValues = (line) => {
    return line
        .split(' | ')[1]
        .split(' ')
        .reduce((count, outputValue) => {
            if ([2, 3, 4, 7].includes(outputValue.length)) {
                return count + 1;
            }
            return count;
        }, 0);
};

const count = (pattern) => {
    return pattern
        .split('\n')
        .filter((l) => l.length)
        .reduce((count, line) => {
            return count + uniqueOutputValues(line);
        }, 0);
};

count(testPattern); //?
count(pattern); //?
