const salesModel = require('../models/salesModel');
const { salesProductsVerifier } = require('./validations/sales.validation');

const postSales = async (sales) => {
  const result = await salesProductsVerifier(sales);
  if (result.type) return result;

  const id = await salesModel.insertOnSaleProducts(sales);
  return { type: null, message: { id, itemsSold: sales } };
};

module.exports = {
  postSales,
};