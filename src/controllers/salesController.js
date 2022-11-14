const salesService = require('../services/salesService');
const mapType = require('../utils/mapType');

const postSales = async (req, res) => {
  const sales = req.body;
  const { type, message } = await salesService.postSales(sales);
  if (type) return res.status(mapType(type)).json({ message });
  return res.status(201).json(message);
};

const getSales = async (_req, res) => {
  const { message } = await salesService.getSales();
  return res.status(200).json(message);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getSalesById(id);
  if (type) return res.status(mapType(type)).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  postSales,
  getSales,
  getSalesById,
};