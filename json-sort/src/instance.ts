import axios, { AxiosError } from 'axios';

export const instance = axios.create();

const retriesCount = 3;

instance.interceptors.response.use(undefined, async (error: AxiosError) => {
    const retries = (error.config as any).__retries || 0;

    (error.config as any).__retries = retries + 1;

    if (retries <= retriesCount) {
        return instance.request(error.config);
    }

    throw error;
});
