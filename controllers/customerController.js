const customerModel = require('../models/customerModel');

const getCustomer = async (req, res) => {
    const customerId = req.params.customerId;

    try {
        const customer = await customerModel.getCustomer(customerId);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        return res.status(200).json(customer);
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateBalance = async (req, res) => {
    const customerId = req.params.customerId;
    const newBalance = req.body.newBalance;

    try {
        const result = await customerModel.updateBalance(customerId, newBalance);
        if (result === 'Customer not found') {
            return res.status(404).json({ error: 'Customer not found' });
        }
        return res.status(200).json({ message: 'Balance updated successfully' });
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getCustomer,
    updateBalance,
};
