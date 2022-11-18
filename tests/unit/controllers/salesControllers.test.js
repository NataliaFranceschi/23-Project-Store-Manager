const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');
const { sales, id, sale, newSales, updateSales } = require('../mocks/salesMocks')

describe('Teste de unidade do salesController', function () {
  it('Lista as vendas', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'findAllSales')
      .resolves({ type: null, message: sales });

    await salesController.listSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(sales);
  });

  it('Busca venda pelo id', async function () {
    const res = {};
    const req = {
      params: { id },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'findSaleById')
      .resolves({ type: null, message: sale });

    await salesController.sale(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(sale);
  });

  it('Busca uma venda pelo id sem sucesso', async function () {
    const res = {};
    const req = {
      params: { id },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'findSaleById')
      .resolves({ type: 404, message: 'Sale not found' });

    await salesController.sale(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('Erro ao cadastrar, productId inexistente', async function () {
    const res = {};
    const req = {
      body: newSales,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'insertSale')
      .resolves({ type: 404, message: 'Product not found' });

    await salesController.createNewSale(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Cadastra uma nova venda com sucesso', async function () {
    const res = {};
    const req = {
      body: newSales,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'insertSale')
      .resolves({ type: null, message: { ...id, itemsSold: newSales } });

    await salesController.createNewSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ ...id, itemsSold: newSales });
  });

  it('Faz a atualização das vendas com sucesso pelo id', async function () {
    const req = { params: { id }, body: updateSales };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'updateById').resolves({ type: null, message: { saleId: id, itemsUpdated: newSales } });

    await salesController.updateSale(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ saleId: id, itemsUpdated: newSales });
  });

  it('Não consegue atualizar um produto usando um saleid inexistente', async function () {
    const req = { params: { id }, body: updateSales };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'updateById').resolves({ type: 404, message: 'Sale not found' });

    await salesController.updateSale(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  })

  it('Não consegue atualizar um produto usando um productId inexistente', async function () {
    const req = { params: { id }, body: updateSales };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'updateById').resolves({ type: 404, message: 'Product not found' });

    await salesController.updateSale(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  })

  it('Deleta um produto com sucesso pelo id', async function () {
    const req = { params: { id } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.end = sinon.stub().returns();

    sinon.stub(salesService, 'deleteById').resolves({ type: null, message: '' });

    await salesController.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(204);
  });

  it('Não consegue deletar nenhuma venda usando um id inexistente', async function () {
    const req = { params: { id } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'deleteById').resolves({ type: 404, message: 'Sale not found' });

    await salesController.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  afterEach(sinon.restore);
});
