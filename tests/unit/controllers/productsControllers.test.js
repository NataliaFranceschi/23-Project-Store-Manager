const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');
const {products, newProduct, product, id, updateProduct} = require('../mocks/productsMocks')

describe('Teste de unidade do productController', function () {
  it('Lista os produtos', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'findAllProducts')
      .resolves({ type: null, message: products });

    await productsController.listProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products);
  });

  it('Busca um produto pelo id', async function () {
    const res = {};
    const req = {
      params: { id },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'findProductById')
      .resolves({ type: null, message: products });

    await productsController.product(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products);
  });

  it('Busca um produto pelo id sem sucesso', async function () {
    const res = {};
    const req = {
      params: { id },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'findProductById')
      .resolves({ type: 404, message: 'Product not found' });

    await productsController.product(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Cadastra um novo produto com sucesso', async function () {
    const res = {};
    const req = {
      body: newProduct,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'insertProduct')
      .resolves({ type: null, message: product });

    await productsController.createNewProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(product);
  });

  it('Faz a atualização de um produto com sucesso pelo id', async function () {
    const req = { params: { id }, body: updateProduct };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'updateById').resolves({ type: null, message: {id, ...updateProduct} });

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ id, ...updateProduct });
  });

  it('Não consegue atualizar um produto usando um id inexistente', async function () {
    const req = { params: { id }, body: updateProduct };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'updateById').resolves({ type: 404, message: 'Product not found' });

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Deleta um produto com sucesso pelo id', async function () {
    const req = { params: { id } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.end = sinon.stub().returns();

    sinon.stub(productsService, 'deleteById').resolves({ type: null, message: '' });

    await productsController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(204);
  });

  it('Não consegue deletar nenhum produto usando um id inexistente', async function () {
    const req = { params: { id } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'deleteById').resolves({ type: 404, message: 'Product not found' });

    await productsController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Procura produtos utilizado uma palavra chave', async function () {
    const req = { query: "Martelo", };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'searchProducts').resolves({ type: 200, message: products[0] });

    await productsController.search(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products[0]);
  });

  afterEach(sinon.restore);
});
