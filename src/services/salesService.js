const salesModel = require('../models/salesModel');
const { saleProductsVerifier, saleVerifier } = require('./validations/sales.validation');

const postSales = async (sales) => {
  const result = await saleProductsVerifier(sales);
  if (result.type) return result;

  const id = await salesModel.postOnSaleProducts(sales);
  return { type: null, message: { id, itemsSold: sales } };
};

const getSales = async () => {
  const sales = await salesModel.getSales();
  return { type: null, message: sales };
};

const getSalesById = async (id) => {
  const result = await saleVerifier(id);
  if (result.type) return result;

  const sale = await salesModel.getSalesById(id);
  return { type: null, message: sale };
};

module.exports = {
  postSales,
  getSales,
  getSalesById,
};