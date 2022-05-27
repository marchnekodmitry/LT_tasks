const fs = require('fs');
const path = require('path');

const { randomPath, randomJson } = require('./common');

const getPathArray = (string) => {
    return string.slice(1).split('/');
}

for (let i = 0; i < 1000; i++) {
    const pathData = randomPath();
    const jsonData = randomJson();

    const pathToStorage = path.resolve(__dirname, '..', 'data', ...getPathArray(pathData));

    fs.mkdirSync(pathToStorage, { recursive: true });
    fs.writeFileSync(path.resolve(pathToStorage, 'storage.json'), JSON.stringify(jsonData));
}
