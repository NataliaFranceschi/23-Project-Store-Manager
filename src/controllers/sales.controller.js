const salesService = require('../services/sales.service');

const listSales = async (_req, res) => {
  const { message } = await salesService.findAllSales();
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

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteById(id);

  if (type) return res.status(type).json({ message });

  return res.status(204).end();
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  const { type, message } = await salesService.updateById(id, update);

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  listSales,
  sale,
  createNewSale,
  deleteSale,
  updateSale,
};
