const express = require('express');
const productsController = require('../controllers/products.controller');
const validateName = require('../middlewares/validateName');

const router = express.Router();

router.get(
  '/search',
  productsController.search,
);

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

router.put(
  '/:id',
  validateName,
  productsController.updateProduct,
);

router.delete(
  '/:id',
  productsController.deleteProduct,
);

module.exports = router;
