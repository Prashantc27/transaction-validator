const express = require('express');
const customerController = require('../controllers/customerController');

const router = express.Router();

router.get('/customers/:customerId', customerController.getCustomer);

module.exports = router;
