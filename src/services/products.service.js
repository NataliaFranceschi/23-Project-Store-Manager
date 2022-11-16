const productsModel = require('../models/products.model');

const findAllProducts = async () => {
  const products = await productsModel.findAllProducts();
  return { type: null, message: products };
};

const findProductById = async (productId) => {
  const product = await productsModel.findProductById(productId);
  if (!product) return { type: 404, message: 'Product not found' };
  return { type: null, message: product };
};

const insertProduct = async (product) => {
  const insert = await productsModel.insertProduct(product);
  const newProduct = await productsModel.findProductById(insert.insertId);

  return { type: null, message: newProduct };
};

const updateById = async (id, update) => {
  await productsModel.updateById(id, update);
  const product = await productsModel.findProductById(id);
  if (!product) return { type: 404, message: 'Product not found' };
  return { type: null, message: product };
  // findProductById(id);
};

const deleteById = async (id) => {
  const deleteProduct = await productsModel.deleteById(id);
  if (!deleteProduct.affectedRows) return { type: 404, message: 'Product not found' };
  return { type: null, message: '' };
};

module.exports = {
  findAllProducts,
  findProductById,
  insertProduct,
  updateById,
  deleteById,
};
