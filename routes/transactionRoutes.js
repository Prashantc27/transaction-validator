const express = require('express');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

router.post('/transactions', transactionController.recordTransaction);

module.exports = router;
