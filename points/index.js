const insertAfter = (string, insert, idx) => {
    return string.slice(0, idx + 1) + insert + string.slice(idx + 1);
}

const points = (string) => {
    const resArray = [];
    const delimiter = '.';

    const combinations = (stringLocal) => {
        resArray.push(stringLocal);

        const lastIndex = stringLocal.lastIndexOf(delimiter) + 1;

        for (let i = lastIndex; i < stringLocal.length - 1; i++) {
            combinations(insertAfter(stringLocal, delimiter, i));
        }
    };

    combinations(string);

    return resArray;
}

console.log(points('abc'));

console.log(points('abcdef'));
