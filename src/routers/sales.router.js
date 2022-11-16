const express = require('express');
const salesController = require('../controllers/sales.controller');
const validateProductId = require('../middlewares/validateProductId');
const validateQuantity = require('../middlewares/validateQuantity');

const router = express.Router();

router.get(
  '/',
  salesController.listProducts,
);

router.get(
  '/:id',
  salesController.sale,
);

router.post(
  '/',
  validateProductId,
  validateQuantity,
  salesController.createNewSale,
); 

router.delete(
  '/:id',
  salesController.deleteSale,
);

module.exports = router;
