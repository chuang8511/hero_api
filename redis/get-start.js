

const { createClient } = require('redis');

async function main() {

    const client = createClient();

    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();    
    await client.set('key', 'value');
    const value = await client.get('key');
    
    console.log("This is the first test")
    console.log(value)

    await client.hSet('user-session:123', {
        name: 'John',
        surname: 'Smith',
        company: 'Redis',
        age: 29
    })
    
    let userSession = await client.hGetAll('user-session:123');
    console.log(JSON.stringify(userSession));

    client.quit()
}
main();

