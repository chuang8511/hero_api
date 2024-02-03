import { createClient } from 'redis';

export const initializeCache = async () => {
    const client = createClient({
        // container setting
        // socket: { 
        //     host: 'redis',
        //     port: 6379,
        // }
    });

    client.on('error', err => console.log('Redis Client Error', err));

    client.connect();
    return client;
};