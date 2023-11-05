const transactionModel = require('../models/transactionModel');
const customerModel = require('../models/customerModel');

const recordTransaction = async (req, res) => {
    try {
        const { senderId, receiverId, amount } = req.body;

        const sender = await customerModel.getCustomer(senderId);
        const receiver = await customerModel.getCustomer(receiverId);

        if (!sender) {
            return res.status(404).json({ error: 'Sender not found' });
        }

        if (!receiver) {
            return res.status(404).json({ error: 'Receiver not found' });
        }

        const amountCents = amount * 100;

        const senderNewBalanceCents = sender.balance * 100 - amountCents;
        const receiverNewBalanceCents = receiver.balance * 100 + amountCents;

        const senderNewBalance = senderNewBalanceCents / 100;
        const receiverNewBalance = receiverNewBalanceCents / 100;

        await customerModel.updateBalance(senderId, senderNewBalance);
        await customerModel.updateBalance(receiverId, receiverNewBalance);

        await transactionModel.recordTransaction(senderId, receiverId, amount);

        return res.status(201).json({ message: 'Transaction recorded successfully' });
    } catch (err) {
        console.error('Error in recordTransaction:', err);

        if (err.code === 'ER_CHECK_CONSTRAINT_VIOLATED' && err.sqlMessage) {
            const match = err.sqlMessage.match(/Check constraint '([^']+)'/);
            if (match) {
                const checkConstraintName = match[1];
                return res.status(400).json({ error: `Check constraint '${checkConstraintName}' is violated.` });
            }
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    recordTransaction,
};
