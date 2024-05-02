const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'mydatabase',
    password: 'password',
    port: 5432,
});

client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err));
