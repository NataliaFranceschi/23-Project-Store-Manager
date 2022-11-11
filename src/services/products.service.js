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

module.exports = {
  findAllProducts,
  findProductById,
};
