const camelize = require('camelize');
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

module.exports = {
  findAllSales,
  findSaleById,
};