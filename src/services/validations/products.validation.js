const productsModel = require('../../models/productsModel');

module.exports.productVerifier = async (id) => {
  const products = await productsModel.getProducts();
  const findProductById = products.find((product) => product.id === +id);
  if (!findProductById) return { type: 'INVALID_VALUE', message: 'Product not found' };
  return { type: null, message: '' };
};
