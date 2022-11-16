const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../src/services/products.service');
const productsModel = require('../../../src/models/products.model');
const { products } = require('../mocks/mocks')

describe('Verificando service produto', function () {
  describe('listagem de produtos', function () {
    it('retorna a lista completa de produtos', async function () {
      sinon.stub(productsModel, 'findAllProducts').resolves(products);

      const result = await productsService.findAllProducts();

      expect(result.message).to.deep.equal(products);
    });
  });

  describe('busca de um produto', function () {
    it('retorna um erro caso o produto não existe', async function () {
      sinon.stub(productsModel, 'findProductById').resolves(undefined);

      const result = await productsService.findProductById(1);

      expect(result.type).to.equal(404);
      expect(result.message).to.equal('Product not found');
    });

    it('retorna o produto caso ID existente', async function () {
      sinon.stub(productsModel, 'findProductById').resolves(products[0]);

      const result = await productsService.findProductById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(products[0]);
    });
  });

   afterEach(function () {
    sinon.restore();
  });
});
