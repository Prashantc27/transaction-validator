const pool = require('../config/connection');

const recordTransaction = async (senderId, receiverId, amount) => {
    const query = 'INSERT INTO transactions (sender_id, receiver_id, amount) VALUES (?, ?, ?)';
    try {
        const [results] = await pool.query(query, [senderId, receiverId, amount]);
        return results;
    } catch (err) {
        console.error('Error recording the transaction:', err);
        throw err;
    }
};

module.exports = {
    recordTransaction,
};
