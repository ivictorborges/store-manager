const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/salesModel');
const connection = require('../../../src/models/connection');
const { sales } = require('./mocks/salesModel.mock');

describe('Unit tests on salesModel', function () {
  describe('sales posted', function () {
    it('should post a new sale', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 2 }]);
      const result = await salesModel.insertOnSaleProducts(sales);
      expect(result).to.equal(2);
    });
  });
});