const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Pra@@123',
    database: 'validator',
    waitForConnections: true,
    connectionLimit: 10,
});

module.exports = pool;
