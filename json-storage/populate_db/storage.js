const Chance = require('chance');
const axios = require('axios').default;

const chance = new Chance();

const randomPath = () => {
    const nestedLevel = chance.integer({ min: 1, max: 5 });
    const pathItems = [];

    for (let i = 1; i <= nestedLevel; i++) {
        const path = chance.string({ length: 5, alpha: true });
        pathItems.push(path);
    }

    const path = pathItems.join('/');

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

const log = async (promise) => {
    try {
        await promise;
    } catch (error) {
        console.error(error.config.url, error.code);
    }
}

const sleep = async (milliseconds) => {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}

(async () => {
    for (let i = 0; i < 200; i++) {
        const path = randomPath();
        const jsonData = randomJson();

        const promise = axios.post(`http://localhost:3100/${path}`, jsonData);

        log(promise);
        sleep(10);
    }
})();