const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/salesModel');
const salesService = require('../../../src/services/salesService');
const { sales } = require('./mocks/salesService.mock');

describe('Unit tests on salesService', function () {
  describe('sales posted', function () {
    it('should post a new sale', async function () {
      sinon.stub(salesModel, 'postOnSaleProducts').resolves(3);
      const response = await salesService.postSales(sales);
      expect(response.message).to.deep.equal({ id: 3, itemsSold: sales });
    });
  });
});