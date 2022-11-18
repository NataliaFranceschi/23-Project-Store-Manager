const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/products.model');
const connection = require('../../../src/models/connection');
const { products, newProduct, updateProduct, id } = require('../mocks/productsMocks');

describe('Testes de unidade do model de produtos', function () {
  afterEach(sinon.restore);

  it('Recupera a lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([products]);
    const result = await productsModel.findAllProducts();
    expect(result).to.be.deep.equal(products);
  });

  it('Recupera um produto a partir do seu id', async function () {
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    const result = await productsModel.findProductById(id);
    expect(result).to.be.deep.equal(products[0]);
  });

  it('Cadastra uma produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    const result = await productsModel.insertProduct(newProduct);
    expect(result.insertId).to.equal(4);
  });

  it('Atualiza o produto pelo id', async function () {
    sinon.stub(connection, 'execute').resolves();

    const response = await productsModel.updateById(id, updateProduct)
    expect(response).to.be.equal(undefined);
  });

  it('Deleta um produto pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const response = await productsModel.deleteById(id)
    expect(response.affectedRows).to.be.equal(1);
  });

  it('Procura um produto', async function () {
    sinon.stub(connection, 'execute').resolves([products[0]]);

    const response = await productsModel.searchProducts("Martelo")
    expect(response).to.be.equal(products[0]);
  });
});
