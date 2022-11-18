const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../src/services/sales.service');
const salesModel = require('../../../src/models/sales.model');
const productsModel = require('../../../src/models/products.model');
const { sales, sale, newSales, id, updateSales} = require('../mocks/salesMocks')
const { product } = require('../mocks/productsMocks')

describe('Verificando service produto', function () {
  it('Retorna a lista completa de vendas', async function () {
    sinon.stub(salesModel, 'findAllSales').resolves(sales);

    const result = await salesService.findAllSales();

    expect(result.message).to.deep.equal(sales);
  });

  it('Retorna um erro caso a venda não exista', async function () {
    sinon.stub(salesModel, 'findSaleById').resolves([]);

    const result = await salesService.findSaleById(id);

    expect(result.type).to.equal(404);
    expect(result.message).to.equal('Sale not found');
  });

  it('Retorna a venda caso ID exista', async function () {
    sinon.stub(salesModel, 'findSaleById').resolves(sale);

    const result = await salesService.findSaleById(1);

    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(sale);
  });

 it('Retorna a venda inserida com o ID', async function () {
    sinon.stub(productsModel, 'findProductById').resolves(product);
    sinon.stub(salesModel, 'insertSale').resolves({ insertId: 3 });
    sinon.stub(salesModel, 'insertSaleInformation').resolves();

    const result = await salesService.insertSale(newSales);

    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal({ id: 3, itemsSold: newSales });
 });
  
  it('Retorna erro caso o productId seja inexistente', async function () {
    sinon.stub(productsModel, 'findProductById').resolves(undefined);

    const result = await salesService.insertSale(newSales);

    expect(result.type).to.equal(404);
    expect(result.message).to.deep.equal('Product not found');
  });

  it('Retorna a venda atualizada', async function () {
    sinon.stub(productsModel, 'findProductById').resolves(product);
    sinon.stub(salesModel, 'findSaleById').resolves(sale);
    sinon.stub(salesModel, 'updateById').resolves();

    const result = await salesService.updateById(id, updateSales);

    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal({ saleId: id, itemsUpdated: updateSales });
  });

  it('Não atualiza venda, productId inexistente', async function () {
    sinon.stub(productsModel, 'findProductById').resolves(undefined);
    sinon.stub(salesModel, 'findSaleById').resolves(false);

    const result = await salesService.updateById(id, updateSales);

    expect(result.type).to.equal(404);
    expect(result.message).to.deep.equal("Product not found");
  });

  it('Não atualiza venda, salesId inexistente', async function () {
    sinon.stub(productsModel, 'findProductById').resolves(product);

    const result = await salesService.updateById(id, updateSales);

    expect(result.type).to.equal(404);
    expect(result.message).to.deep.equal("Sale not found");
  });

  it('Retorna nada caso a veda seja deletada com sucesso', async function () {
    sinon.stub(salesModel, 'deleteById').resolves({ affectedRows: 1 });

    const result = await salesService.deleteById(id);

    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal('');
  });

  it('Retorna erro caso o id não seja encontrado e nenhum produto for deletado', async function () {
    sinon.stub(salesModel, 'deleteById').resolves({ affectedRows: 0 });

    const result = await salesService.deleteById(id);

    expect(result.type).to.equal(404);
    expect(result.message).to.deep.equal('Sale not found');
  });

  afterEach(function () {
    sinon.restore();
  });
});
