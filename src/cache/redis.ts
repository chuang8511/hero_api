import { createClient } from 'redis';

export const initializeCache = async () => {
    const client = createClient();

    client.on('error', err => console.log('Redis Client Error', err));

    client.connect();
    return client;
};