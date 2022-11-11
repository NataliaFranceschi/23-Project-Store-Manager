const express = require('express');
const productsController = require('../controllers/products.controller');
const validateName = require('../middlewares/validateName');

const router = express.Router();

router.get(
  '/',
  productsController.listProducts,
);

router.get(
  '/:id',
  productsController.product,
);

router.post(
  '/',
  validateName,
  productsController.createNewProduct,
);

module.exports = router;
