const productsModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');

const saleProductsVerifier = async (sales) => {
  const products = await productsModel.getProducts();
  const valid = sales.every((sale) => products
    .some((product) => product.id === sale.productId));
  if (!valid) {
    return { type: 'INVALID_VALUE', message: 'Product not found' };
  }
  return { type: null, message: '' };
};

const saleVerifier = async (id) => {
  const sales = await salesModel.getSales();
  const sale = sales.find(({ saleId }) => saleId === +id);
  if (!sale) return { type: 'INVALID_VALUE', message: 'Sale not found' };
  return { type: null, message: '' };
};

module.exports = {
  saleProductsVerifier,
  saleVerifier,
};