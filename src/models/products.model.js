const connection = require('./connection');

const findAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products ORDER BY id',
  );
  return result;
};

const findProductById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return product;
};

module.exports = {
  findAllProducts,
  findProductById,
};