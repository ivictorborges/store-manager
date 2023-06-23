const connection = require('./connection');

const postOnSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (default)',
    [],
  );
  return insertId;
};

const postOnSaleProducts = async (sales, id = null) => {
  const saleId = id || await postOnSale();
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

const getSales = async () => {
  const [sales] = await connection.execute(
    `SELECT salesp.sale_id AS saleId, salesp.product_id AS productId, salesp.quantity, sales.date
      FROM StoreManager.sales_products AS salesp
      INNER JOIN StoreManager.sales AS sales
      ON sales.id = salesp.sale_id
      ORDER BY saleId, productId`,
  );
  return sales;
};

const getSalesById = async (id) => {
  const [sales] = await connection.execute(
    `SELECT
      sales.date,
      salesp.product_id AS productId,
      salesp.quantity
      FROM StoreManager.sales_products AS salesp
      INNER JOIN StoreManager.sales AS sales
      ON sales.id = salesp.sale_id
      AND sales.id = ?
      ORDER BY sales.id, salesp.product_id`,
    [id],
  );
  return sales;
};

const deleteSales = async (id) => {
  await connection.execute('DELETE FROM StoreManager.sales WHERE id = ?', [id]);
  return `Sale ${id} successfully deleted`;
};

const putSales = async (id, sale) => {
  const { productId, quantity } = sale;
  await connection.execute(
  `UPDATE StoreManager.sales_products
  SET quantity = ?
  WHERE sale_id = ? AND product_id = ?`, [quantity, id, productId],
  );
  return `Sale ${id} successfully updated`;
};

module.exports = {
  postOnSaleProducts,
  getSales,
  getSalesById,
  deleteSales,
  putSales,
};