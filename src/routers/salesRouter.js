const express = require('express');
const saleVerifier = require('../middlewares/middlewareSaleVerifier');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.post('/', saleVerifier, salesController.postSales);
router.get('/', salesController.getSales);
router.get('/:id', salesController.getSalesById);

module.exports = router;
