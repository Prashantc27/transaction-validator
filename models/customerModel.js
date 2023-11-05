const pool = require('../config/connection');

const getCustomer = async (customerId) => {
    const query = 'SELECT * FROM customers WHERE customer_id = ?';
    try {
        const [rows] = await pool.query(query, [customerId]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    } catch (err) {
        console.error('Error getting customer details:', err);
        throw err;
    }
};

const updateBalance = async (customerId, newBalance) => {
    const query = 'UPDATE customers SET balance = ? WHERE customer_id = ?';
    try {
        const [results] = await pool.query(query, [newBalance, customerId]);
        if (results.affectedRows === 0) {
            return 'Customer not found';
        }
        return null;
    } catch (err) {
        console.error('Error updating customer balance:', err);
        throw err;
    }
};

module.exports = {
    getCustomer,
    updateBalance,
};
