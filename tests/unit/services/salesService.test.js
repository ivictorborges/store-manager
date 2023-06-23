const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/productsModel');
const salesModel = require('../../../src/models/salesModel');
const salesService = require('../../../src/services/salesService');
const { sales, sale, returnUpdated, itemsToUpdate, products, wrongSales } = require('./mocks/salesService.mock');

describe('Unit tests on salesService', function () {
  describe('sales posted', function () {
    it('should post a new sale', async function () {
      sinon.stub(salesModel, 'postOnSaleProducts').resolves(3);
      const response = await salesService.postSales(sales);
      expect(response.message).to.deep.equal({ id: 3, itemsSold: sales });
    });

    it('should returns an error with invalid id', async function () {
      sinon.stub(productsModel, 'getProducts').resolves(products);
      const response = await salesService.postSales(wrongSales);
      expect(response.message).to.deep.equal('Product not found');
    });
  });
  describe('sales searched', function () {
    it('should search a list of sales', async function () {
      sinon.stub(salesModel, 'getSales').resolves(sales);
      const response = await salesService.getSales();
      expect(response.message).to.deep.equal(sales);
    });

    it('should search a sale by id', async function () {
      sinon.stub(salesModel, 'getSalesById').resolves(sales[0]);
      const response = await salesService.getSalesById(1);
      expect(response.message).to.deep.equal(sales[0]);
    });

    it('should returns an error with invalid id', async function () {
      sinon.stub(salesModel, 'getSales').resolves(sales);
      const response = await salesService.getSalesById(50);
      expect(response.message).to.deep.equal('Sale not found');
    });
  });

  describe('sales deleted', function () {
    it('should delete a sale', async function () {
      sinon.stub(salesModel, 'deleteSales').resolves('Sale 1 successfully deleted');
      const response = await salesService.deleteSalesById(1);
      expect(response.message).to.deep.equal('Sale 1 successfully deleted');
    });

    it('should returns an error with invalid sale', async function () {
      sinon.stub(salesModel, 'getSales').resolves(sales);
      const response = await salesService.deleteSalesById(10);
      expect(response.message).to.deep.equal('Sale not found');
    });
  });

  describe('sales updated', function () {
    it('should update a sale', async function() {
      sinon.stub(salesModel, 'putSales').resolves('Sale 1 successfully updated');
      const response = await salesService.putSales(1, sale);
      expect(response.message).to.deep.equal(returnUpdated);
    });

    it('should returns an error with invalid sale', async function () {
      sinon.stub(salesModel, 'getSales').resolves(sales);
      const response = await salesService.putSales(10, itemsToUpdate);
      expect(response.message).to.deep.equal('Sale not found');
    });

    it('should returns an error with invalid product', async function () {
      sinon.stub(productsModel, 'getProducts').resolves(products);
      const response = await salesService.putSales(1, wrongSales);
      expect(response.message).to.deep.equal('Product not found');
    });
  });

  afterEach(sinon.restore);
});