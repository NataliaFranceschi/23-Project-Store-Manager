const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../src/services/products.service');
const productsModel = require('../../../src/models/products.model');
const { products, product, newProduct, updateProduct, id } = require('../mocks/productsMocks')

describe('Verificando service produto', function () {
  it('Retorna a lista completa de produtos', async function () {
    sinon.stub(productsModel, 'findAllProducts').resolves(products);

    const result = await productsService.findAllProducts();

    expect(result.message).to.deep.equal(products);
  });

  it('Retorna um erro caso o produto não existe', async function () {
    sinon.stub(productsModel, 'findProductById').resolves(undefined);

    const result = await productsService.findProductById(id);

    expect(result.type).to.equal(404);
    expect(result.message).to.equal('Product not found');
  });

  it('Retorna o produto caso ID exista', async function () {
    sinon.stub(productsModel, 'findProductById').resolves(products[0]);

    const result = await productsService.findProductById(id);

    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(products[0]);
  });

  it('Retorna o produto inserido com o ID', async function () {
    sinon.stub(productsModel, 'insertProduct').resolves([{ insertId: 4 }]);
    sinon.stub(productsModel, 'findProductById').resolves(product);

    const result = await productsService.insertProduct(newProduct);

    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(product);
  });

  it('Retorna o produto atualizado', async function () {
    sinon.stub(productsModel, 'updateById').resolves(undefined);
    sinon.stub(productsModel, 'findProductById').resolves({ id, ...updateProduct });

    const result = await productsService.updateById(id, updateProduct);

    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal({id, ...updateProduct});
  });

  it('Retorna erro caso não tenha nenhum produto com o mesmo id para ser atualizado', async function () {
    sinon.stub(productsModel, 'updateById').resolves(undefined);
    sinon.stub(productsModel, 'findProductById').resolves(undefined);

    const result = await productsService.updateById(id, updateProduct);

    expect(result.type).to.equal(404);
    expect(result.message).to.deep.equal('Product not found');
  });

  it('Retorna nada caso o produto seja deletado com sucesso', async function () {
    sinon.stub(productsModel, 'deleteById').resolves({ affectedRows: 1 });

    const result = await productsService.deleteById(id);
    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal('');
  });

  it('Retorna erro caso o id não seja encontrado e nenhum produto for deletado', async function () {
    sinon.stub(productsModel, 'deleteById').resolves({ affectedRows: 0 });

    const result = await productsService.deleteById(id);

    expect(result.type).to.equal(404);
    expect(result.message).to.deep.equal('Product not found');
  });

  it('Retorna produtos com a palavra-chave', async function () {
    sinon.stub(productsModel, 'findAllProducts').resolves(products);
    sinon.stub(productsModel, 'searchProducts').resolves(product[0]);

    const result = await productsService.searchProducts("Martelo");

    expect(result.message).to.deep.equal(product[0]);
  });

   afterEach(function () {
    sinon.restore();
  });
});
