const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesService = require('../../../src/services/salesService');
const salesController = require('../../../src/controllers/salesController');
const { sales, successful } = require('./mocks/salesController.mock');


describe('tests on salesController', function () {
  describe('sales posted', function () {
    it('should post a new sale', async function () {
      const res = {};
      const req = { body: sales };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'postSales').resolves(successful);
      await salesController.postSales(req, res);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(successful.message);
    });
  });
});