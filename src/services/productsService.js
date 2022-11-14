const productsModel = require('../models/productsModel');
const { productVerifier } = require('./validations/products.validation');

const getProducts = async () => {
  const products = await productsModel.getProducts();
  return { type: null, message: products };
};

const getProductById = async (id) => {
  const { type, message } = await productVerifier(id);
  if (type) return { type, message };

  const product = await productsModel.getProductById(id);
  return { type: null, message: product };
};

const postProduct = async (product) => {
  const id = await productsModel.postProduct(product);
  return { type: null, message: { id, ...product } };
};

const putProduct = async (product) => {
  const { type, message } = await productVerifier(product.id);
  if (type) return { type, message };

  const result = await productsModel.putProduct(product);
  return { type: null, message: result };
};

const deleteProduct = async (id) => {
  const { type, message } = await productVerifier(id);
  if (type) return { type, message };

  const result = await productsModel.deleteProduct(id);
  return { type: null, message: result };
};

module.exports = {
  getProducts,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
};