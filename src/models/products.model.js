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

const insertProduct = async ({ name }) => {
  const [result] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );
  return result;
};

const updateById = async (id, { name }) => {
  await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [name, id],
  );
};

const deleteById = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [id],
  );
  return result;
};

const searchProducts = async (q) => {
  const [result] = await connection.execute(
  `SELECT * FROM products WHERE name LIKE "%${q}%"`,
  );
  return result;
};

module.exports = {
  findAllProducts,
  findProductById,
  insertProduct,
  updateById,
  deleteById,
  searchProducts,
};