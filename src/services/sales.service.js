const salesModel = require('../models/sales.model');
const productsModel = require('../models/products.model');

const findAllSales = async () => {
  const sales = await salesModel.findAllSales();
  return { type: null, message: sales };
};

const findSaleById = async (saleId) => {
  const sale = await salesModel.findSaleById(saleId);
  if (!sale.length) return { type: 404, message: 'Sale not found' };
  return { type: null, message: sale };
};

const insertSale = async (sales) => {
  const findProduct = await Promise.all(sales
    .map(async (saleInfo) => productsModel.findProductById(saleInfo.productId)));
  const hasProduct = await findProduct.every((product) => typeof product === 'object');
  if (!hasProduct) return { type: 404, message: 'Product not found' }; 

  const sale = await salesModel.insertSale();
  const id = sale.insertId;
  await Promise.all(sales
    .map(async (saleInfo) => salesModel.insertSaleInformation({ saleId: id, ...saleInfo })));
  return { type: null, message: { id, itemsSold: sales } };
}; 

const deleteById = async (id) => {
  const deleteProduct = await salesModel.deleteById(id);
  if (!deleteProduct.affectedRows) return { type: 404, message: 'Sale not found' };
  return { type: null, message: ' ' };
};

module.exports = {
  findAllSales,
  findSaleById,
  insertSale,
  deleteById,
};
