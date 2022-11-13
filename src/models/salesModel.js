const connection = require('./connection');

const insertOnSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (default)',
    [],
  );
  return insertId;
};

const insertOnSaleProducts = async (sales, id = null) => {
  const saleId = id || await insertOnSale();
  const placeholders = sales.map((_) => '(?, ?, ?)').join(', ');
  const values = sales
    .reduce((prev, { productId, quantity }) => [...prev, saleId, productId, quantity], []);
  await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
      VALUES ${placeholders}`,
    values,
  );
  return saleId;
};

module.exports = {
  insertOnSaleProducts,
};