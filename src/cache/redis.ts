import { createClient } from 'redis';

export const initializeCache = async () => {
    
    let redisSocket = {};

    if (process.env.NODE_ENV === "development") {
        redisSocket = {
            host: 'redis',
            port: 6379,
        }
    }

    const client = createClient({ socket: redisSocket });

    client.on('error', err => console.log('Redis Client Error', err));

    client.connect();
    return client;
};