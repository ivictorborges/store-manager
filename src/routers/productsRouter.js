const express = require('express');
const productsController = require('../controllers/productsController');
const nameVerifier = require('../middlewares/middlewareNameVerifier');

const router = express.Router();

router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductById);
router.post('/', nameVerifier, productsController.postProduct);

module.exports = router;