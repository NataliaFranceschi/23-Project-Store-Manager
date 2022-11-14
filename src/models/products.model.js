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
  await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );
};

const productInserted = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products ORDER BY id DESC LIMIT 1',
  );
  return result;
};

const updateById = async (id, { name }) => {
  const [result] = await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [name, id],
  );
  return result;
};

module.exports = {
  findAllProducts,
  findProductById,
  insertProduct,
  productInserted,
  updateById,
};