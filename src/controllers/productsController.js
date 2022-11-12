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

module.exports = {
  getProducts,
  getProductById,
};