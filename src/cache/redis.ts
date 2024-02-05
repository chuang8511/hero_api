import { createClient } from 'redis';

export const initializeCache = async () => {
    

    let redisSocket = {};

    if (process.env.CACHE_HOST && process.env.CACHE_PORT) {
        redisSocket = {
            host: process.env.CACHE_HOST,
            port: process.env.CACHE_PORT,
        }
    }

    const client = createClient({ socket: redisSocket });

    client.on('error', err => console.log('Redis Client Error', err));

    client.connect();
    return client;
};