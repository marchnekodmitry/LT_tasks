import { AxiosError } from 'axios';
import { instance } from './instance';

const endpoints = [
    "https://jsonbase.com/lambdajson_type1/793",
    "https://jsonbase.com/lambdajson_type1/955",
    "https://jsonbase.com/lambdajson_type1/231",
    "https://jsonbase.com/lambdajson_type1/931",
    "https://jsonbase.com/lambdajson_type1/93",
    "https://jsonbase.com/lambdajson_type2/342",
    "https://jsonbase.com/lambdajson_type2/770",
    "https://jsonbase.com/lambdajson_type2/491",
    "https://jsonbase.com/lambdajson_type2/281",
    "https://jsonbase.com/lambdajson_type2/718",
    "https://jsonbase.com/lambdajson_type3/310",
    "https://jsonbase.com/lambdajson_type3/806",
    "https://jsonbase.com/lambdajson_type3/469",
    "https://jsonbase.com/lambdajson_type3/258",
    "https://jsonbase.com/lambdajson_type3/516",
    "https://jsonbase.com/lambdajson_type4/79",
    "https://jsonbase.com/lambdajson_type4/706",
    "https://jsonbase.com/lambdajson_type4/521",
    "https://jsonbase.com/lambdajson_type4/350",
    "https://jsonbase.com/lambdajson_type4/64",
];

const fetchData = async (url: string) => {
    try {
        const response = await instance.get<Object>(url);

        return response.data;
    } catch (e) {
        const error = e as AxiosError;

        console.error(`Request to ${error.config.url} failed`);
    }
};

const fetchRequests = async (urls: Array<string>) => {
    const requests = urls.map(fetchData);

    const results = await Promise.all(requests);

    return results.filter(Boolean) as Array<Object>;
};

const lookup = (object: Record<string, any>): boolean | null => {
    const keys = Object.keys(object);

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        if (key === 'isDone') {
            return object[key];
        }

        if (typeof object[key] === 'object') {
            const res = lookup(object[key]);

            if (typeof res === 'boolean') {
                return res;
            }
        }
    }

    return null;
};

const main = async () => {
    const objects = await fetchRequests(endpoints);

    const results = objects.map(lookup);

    console.log(
        'True: %d\nFalse: %d',
        results.filter((v) => v === true).length,
        results.filter((v) => v === false).length,
    );
};

main();
