const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/salesModel');
const connection = require('../../../src/models/connection');
const { sales } = require('./mocks/salesModel.mock');

describe('Unit tests on salesModel', function () {
  describe('sales posted', function () {
    it('should post a new sale', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 2 }]);
      const result = await salesModel.postOnSaleProducts(sales);
      expect(result).to.be.equal(2);
    });
  });
  describe('sales searched', function () {
    it('should search a list of sales', async function () {
      sinon.stub(connection, 'execute').resolves([sales]);
      const result = await salesModel.getSales();
      expect(result).to.be.equal(sales);
    });
      
    it('should search a sale by id', async function () {
      sinon.stub(connection, 'execute').resolves([sales]);
      const result = await salesModel.getSalesById(1);
      expect(result).to.be.equal(sales);
    });
  });
  
  afterEach(sinon.restore);
});