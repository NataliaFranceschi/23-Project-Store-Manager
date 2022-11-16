const salesService = require('../services/sales.service');

const listProducts = async (_req, res) => {
  const { type, message } = await salesService.findAllSales();

  if (type) return res.status(type).json(message);

  return res.status(200).json(message);
};

const sale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findSaleById(id);

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const createNewSale = async (req, res) => {
  const newSale = req.body;
  const { type, message } = await salesService.insertSale(newSale);

  if (type) return res.status(type).json({ message });

  return res.status(201).json(message);
}; 

module.exports = {
  listProducts,
  sale,
  createNewSale,
};
