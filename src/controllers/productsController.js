const productsService = require('../services/productsService');
const mapType = require('../utils/mapType');

const getProducts = async (_req, res) => {
  const { message } = await productsService.getProducts();
  res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const productId = req.params.id;
  const { type, message } = await productsService.getProductById(productId);
  if (type) return res.status(mapType(type)).json({ message });
  res.status(200).json(message);
};

const postProduct = async (req, res) => {
  const product = req.body;
  const { message } = await productsService.postProduct(product);
  res.status(201).json(message);
};

const putProduct = async (req, res) => {
  const idParam = req.params;
  const product = req.body;
  const { type, message } = await productsService.putProduct({ ...idParam, ...product });
  if (type) return res.status(mapType(type)).json({ message });
  res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const id = +req.params.id;
  const { type, message } = await productsService.deleteProduct(id);
  if (type) return res.status(mapType(type)).json({ message });
  res.sendStatus(204);
};

module.exports = {
  getProducts,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
};