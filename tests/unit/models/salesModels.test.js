const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/sales.model');
const connection = require('../../../src/models/connection');
const { sales, sale, newSale, id, updateSale } = require('../mocks/salesMocks');

describe('Testes de unidade do model de vendas', function () {
  afterEach(sinon.restore);

  it('Recupera a lista de vendas', async function () {
    sinon.stub(connection, 'execute').resolves([sales]);
    const result = await salesModel.findAllSales();
    expect(result).to.be.deep.equal(sales);
  });

  it('Recupera uma venda a partir do seu id', async function () {
    sinon.stub(connection, 'execute').resolves([sale]);
    const result = await salesModel.findSaleById(id)
    expect(result).to.be.deep.equal(sale);
  });

  it('Cadastra uma nova venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
    const resultInsert = await salesModel.insertSale();
    expect(resultInsert.insertId).to.equal(3);
  });

  it('Cadastra as informações da nova venda', async function () {
    sinon.stub(connection, 'execute').resolves();
    const result = await salesModel.insertSaleInformation({ saleId: 3, ...newSale });
    expect(result).to.equal(undefined);
  });

  it('Atualiza a venda pelo id', async function () {
    sinon.stub(connection, 'execute').resolves();

    const response = await salesModel.updateById(id, updateSale)
    expect(response).to.be.equal(undefined);
  });

  it('Deleta uma venda pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const response = await salesModel.deleteById(id)
    expect(response.affectedRows).to.be.equal(1);
  });

});
