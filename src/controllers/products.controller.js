const productsService = require('../services/products.service');

const listProducts = async (_req, res) => {
  const { type, message } = await productsService.findAllProducts();

  if (type) return res.status(type).json(message);

  return res.status(200).json(message);
};

const product = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findProductById(id);

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const createNewProduct = async (req, res) => {
  const newProduct = req.body;
  const { type, message } = await productsService.insertProduct(newProduct);

  if (type) return res.status(type).json({ message });

  return res.status(201).json(message);
};

module.exports = {
  product,
  listProducts,
  createNewProduct,
};
