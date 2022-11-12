const productsModel = require('../models/productsModel');
const { productVerifier } = require('./validations/products.validation');

const getProducts = async () => {
  const products = await productsModel.findProducts();
  return { type: null, message: products };
};

const getProductById = async (id) => {
  const { type, message } = await productVerifier(id);
  if (type) return { type, message };

  const product = await productsModel.findProductById(id);
  return { type: null, message: product };
};

const postProduct = async (product) => {
  const id = await productsModel.insertProduct(product);
  return { type: null, message: { id, ...product } };
};

module.exports = {
  getProducts,
  getProductById,
  postProduct,
};