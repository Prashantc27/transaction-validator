const mysql = require('mysql2/promise');

const run = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Pra@@123',
        database: 'validator',
    });

    try {
        await connection.beginTransaction();

        await connection.query('UPDATE customers SET balance = balance - 100 WHERE customer_id = 1');
        await connection.query('UPDATE customers SET balance = balance + 100 WHERE customer_id = 2');

        await connection.commit();
        console.log('Transaction 1: Transfer successful');
    } catch (err) {
        await connection.rollback();
        console.error('Transaction 1: Error', err);
    } finally {
        connection.end();
    }
};

run();
