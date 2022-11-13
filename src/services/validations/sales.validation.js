const productsModel = require('../../models/productsModel');

const salesProductsVerifier = async (sales) => {
  const products = await productsModel.findProducts();
  const valid = sales.every((sale) => products
    .some((product) => product.id === sale.productId));
  if (!valid) {
    return { type: 'INVALID_VALUE', message: 'Product not found' };
  }
  return { type: null, message: '' };
};

module.exports = {
  salesProductsVerifier,
};