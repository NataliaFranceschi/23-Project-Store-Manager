const salesModel = require('../models/sales.model');

const findAllSales = async () => {
  const sales = await salesModel.findAllSales();
  return { type: null, message: sales };
};

const findSaleById = async (saleId) => {
  const sale = await salesModel.findSaleById(saleId);
  if (!sale.length) return { type: 404, message: 'Sale not found' };
  return { type: null, message: sale };
};

/* const insertProduct = async (product) => {
  await productsModel.insertProduct(product);
  const newProduct = await productsModel.productInserted();

  return { type: null, message: newProduct[0] };
}; */

module.exports = {
  findAllSales,
  findSaleById,
};
