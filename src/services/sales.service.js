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

const validateProductId = async (sales) => {
  const findProduct = await Promise.all(sales
    .map(async (saleInfo) => productsModel.findProductById(saleInfo.productId)));
  return findProduct.every((product) => typeof product === 'object');
};
  
const insertSale = async (sales) => {
  if (!await validateProductId(sales)) return { type: 404, message: 'Product not found' };
  
  const sale = await salesModel.insertSale();
  const id = sale.insertId;
  await Promise.all(sales
    .map(async (saleInfo) => salesModel.insertSaleInformation({ saleId: id, ...saleInfo })));
  return { type: null, message: { id, itemsSold: sales } };
}; 

const deleteById = async (id) => {
  const deleteProduct = await salesModel.deleteById(id);
  if (!deleteProduct.affectedRows) return { type: 404, message: 'Sale not found' };
  return { type: null, message: '' };
};

const updateById = async (id, update) => {
  if (!await validateProductId(update)) return { type: 404, message: 'Product not found' };
  
  const sales = await salesModel.findSaleById(id);
  if (!sales.length) return { type: 404, message: 'Sale not found' };

  await Promise.all(update
    .map(async (e) => salesModel.updateById(id, e)));
  return { type: null, message: { saleId: id, itemsUpdated: update } };
}; 

module.exports = {
  findAllSales,
  findSaleById,
  insertSale,
  deleteById,
  updateById,
};
