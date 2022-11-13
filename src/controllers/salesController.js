const salesService = require('../services/salesService');
const mapType = require('../utils/mapType');

const postSales = async (req, res) => {
  const sales = req.body;
  const { type, message } = await salesService.postSales(sales);
  if (type) return res.status(mapType(type)).json({ message });
  return res.status(201).json(message);
};

module.exports = {
  postSales,
};