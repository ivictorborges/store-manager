const express = require('express');
const productsController = require('../controllers/productsController');
const nameVerifier = require('../middlewares/middlewareNameVerifier');
const idVerifier = require('../middlewares/middlewareIdVerifier');

const router = express.Router();

router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductById);
router.post('/', nameVerifier, productsController.postProduct);
router.put('/:id', nameVerifier, idVerifier, productsController.putProduct);
router.delete('/:id', idVerifier, productsController.deleteProduct);

module.exports = router;