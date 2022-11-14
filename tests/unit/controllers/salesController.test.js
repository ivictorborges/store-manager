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
  describe('sales searched', function () {
    it('should search a list of sales', async function () {
      const res = {};
      const req = { body: {} };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'getSales').resolves(successful);
      await salesController.getSales(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(successful.message);
    });
    it('should search a sale by id', async function () {
      const res = {};
      const req = { params: { id: 1 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'getSalesById').resolves({ type: null, message: sales[0] });
      await salesController.getSalesById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(sales[0]);
    });
  });
  
  afterEach(sinon.restore);
});