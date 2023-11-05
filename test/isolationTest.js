const assert = require('assert');
const mysql = require('mysql2/promise');

describe('Database Testing', function () {
    let connection;

    before(async function () {
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Pra@@123',
            database: 'validator',
        });
    });

    after(async function () {
        connection.end();
    });

    describe('Isolation Testing', function () {

        it('should run two transactions concurrently without interference', async function () {
            const [result1, result2] = await Promise.all([
                connection.query('START TRANSACTION'),
                connection.query('START TRANSACTION'),
            ]);

            const [update1, update2] = await Promise.all([
                connection.query('UPDATE customers SET balance = balance + 10 WHERE customer_id = 1'),
                connection.query('UPDATE customers SET balance = balance + 10 WHERE customer_id = 2'),
            ]);

            await Promise.all([connection.query('COMMIT'), connection.query('COMMIT')]);

            assert.strictEqual(update1[0].affectedRows, 1);
            assert.strictEqual(update2[0].affectedRows, 1);
        });

    });

    //deadlock
    describe('Deadlock Testing', function () {

        it('should handle a deadlock situation gracefully', async function () {

            const [result1, result2] = await Promise.all([
                connection.query('START TRANSACTION'),
                connection.query('START TRANSACTION'),
            ]);

            const [update1, update2] = await Promise.all([
                connection.query('UPDATE customers SET balance = balance + 10 WHERE customer_id = 1'),
                connection.query('UPDATE customers SET balance = balance + 10 WHERE customer_id = 2'),
            ]);

            const [update3, update4] = await Promise.all([
                connection.query('UPDATE customers SET balance = balance + 10 WHERE customer_id = 2'),
                connection.query('UPDATE customers SET balance = balance + 10 WHERE customer_id = 1'),
            ]);

            await Promise.all([connection.query('COMMIT'), connection.query('COMMIT')]);

            assert.strictEqual(update1[0].affectedRows + update4[0].affectedRows, 2);
        });

    });

    //read-write
    describe('Read-Write Conflict Testing', function () {

        it('should handle read-write conflicts gracefully', async function () {

            const [result1, result2] = await Promise.all([
                connection.query('START TRANSACTION'),
                connection.query('START TRANSACTION'),
            ]);

            const [read1] = await connection.query('SELECT balance FROM customers WHERE customer_id = 1');

            const initialBalance = parseFloat(read1[0].balance);

            const [update2] = await connection.query('UPDATE customers SET balance = balance + 1 WHERE customer_id = 1');

            await Promise.all([connection.query('COMMIT'), connection.query('COMMIT')]);

            const [updatedRead] = await connection.query('SELECT balance FROM customers WHERE customer_id = 1');
            const updatedBalance = parseFloat(updatedRead[0].balance);
            assert.notStrictEqual(initialBalance, updatedBalance);
        });

    });
});
