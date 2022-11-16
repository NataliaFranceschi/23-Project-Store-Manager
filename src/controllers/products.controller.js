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

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  const { type, message } = await productsService.updateById(id, update);

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  console.log('teste');
  const { id } = req.params;
  const { type, message } = await productsService.deleteById(id);

  if (type) return res.status(type).json({ message });

  return res.status(204).end();
};

const search = async (req, res) => {
  const { q } = req.query;
  const { type, message } = await productsService.searchProducts(q);

  if (type) return res.status(type).json(message);

  return res.status(200).json(message);
};

module.exports = {
  product,
  listProducts,
  createNewProduct,
  updateProduct,
  deleteProduct,
  search,
};