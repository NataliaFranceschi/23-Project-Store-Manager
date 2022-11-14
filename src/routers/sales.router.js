const express = require('express');
const salesController = require('../controllers/sales.controller');

const router = express.Router();

router.get(
  '/',
  salesController.listProducts,
);

router.get(
  '/:id',
  salesController.sale,
);

/* router.post(
  '/',
  validateName,
  productsController.createNewProduct,
); */

module.exports = router;
