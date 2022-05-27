const Chance = require('chance');

const chance = new Chance();

const randomPath = () => {
    const nestedLevel = chance.integer({ min: 1, max: 5 });
    const pathItems = [];

    for (let i = 1; i <= nestedLevel; i++) {
        const path = chance.string({ length: 5, alpha: true });
        pathItems.push(path);
    }

    const path = `/${pathItems.join('/')}`;

    return path;
};

const randomJson = () => {
    const data = {
        [chance.string()]: chance.string(),
        [chance.string()]: chance.integer(),
        [chance.string()]: {
            [chance.string()]: chance.string(),
            [chance.string()]: chance.integer(),
        }
    };

    return data;
};


module.exports = {
    randomJson,
    randomPath,
};
