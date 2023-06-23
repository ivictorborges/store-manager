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

const deleteSalesById = async (id) => {
  const { type, message } = await saleVerifier(id);
  if (type) return { type, message };

  const saleRemoved = await salesModel.deleteSales(id);
  return { type: null, message: saleRemoved };
};

const putSales = async (id, salesData) => {
  const saleProductsResult = await saleProductsVerifier(salesData);
  const saleResult = await saleVerifier(id);

  if (saleResult.type) return saleResult;
  if (saleProductsResult.type) return saleProductsResult;

  const itemsUpdated = [];

  const updates = salesData.map(async (sale) => {
    const { productId, quantity } = sale;
    itemsUpdated.push({ productId, quantity });
    await salesModel.putSales(id, sale);
  });

  await Promise.all(updates);
  return { type: null, message: { saleId: id, itemsUpdated } };
};

module.exports = {
  postSales,
  getSales,
  getSalesById,
  deleteSalesById,
  putSales,
};