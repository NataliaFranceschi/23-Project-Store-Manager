const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

const findAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id, sp.product_id, sp.quantity, s.date
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id
    ORDER BY sp.sale_id ASC, sp.product_id ASC`,
  );
  return camelize(result);
};

const findSaleById = async (saleId) => {
  const [sale] = await connection.execute(
    `SELECT sp.product_id, sp.quantity, s.date
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id
    WHERE sp.sale_id = ?
    ORDER BY sp.sale_id ASC, sp.product_id ASC`,
    [saleId],
  );
  return camelize(sale);
};

const insertSale = async () => {
  const [result] = await connection.execute(
    'INSERT INTO sales (id) values (NULL)',
  );
  return result;
};

const insertSaleInformation = async (sale) => {
  const columns = Object.keys(snakeize(sale))
    .map((key) => `${key}`)
    .join(', ');

  const placeholders = Object.keys(sale)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO sales_products (${columns}) VALUE (${placeholders})`,
    [...Object.values(sale)],
  );

  return insertId;
};

module.exports = {
  findAllSales,
  findSaleById,
  insertSale,
  insertSaleInformation,
};