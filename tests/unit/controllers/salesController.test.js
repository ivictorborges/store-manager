const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesService = require('../../../src/services/salesService');
const salesController = require('../../../src/controllers/salesController');
const { sales,
  successful, deletedSuccessful, itemsToUpdate, updatedSucessful, fail } = require('./mocks/salesController.mock');


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

    it('should returns an error with invalid id', async function () {
      const res = {};
      const req = { body: sales };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'postSales').resolves(fail);
      await salesController.postSales(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
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

    it('should returns an error with invalid id', async function () {
      const res = {};
      const req = { params: { id: 50 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'getSalesById').resolves(
        { type: 'INVALID_VALUE', message: 'Sale not found' }
      );
      await salesController.getSalesById(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });
  describe('sales deleted', function () {
    it('should delete a sale', async function () {
      const res = {};
      const req = { params: { id: 1 } };
      res.sendStatus = sinon.stub().returns();
      sinon.stub(salesService, 'deleteSalesById').resolves(deletedSuccessful);
      await salesController.deleteSalesById(req, res);
      expect(res.sendStatus).to.have.been.calledWith(204);
    });

    it('should returns an error with invalid id', async function () {
      const res = {};
      const req = { params: { id: 50 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'deleteSalesById').resolves(
        { type: 'INVALID_VALUE', message: 'Sale not found' }
      );
      await salesController.deleteSalesById(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });
  describe('sales updated', function () {
    it('should update a sale', async function () {
      const res = {};
      const req = { params: { id: 1 }, body: itemsToUpdate };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'putSales').resolves(updatedSucessful);
      await salesController.putSales(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(updatedSucessful.message);
    });

    it('should returns an error with invalid id', async function () {
      const res = {};
      const req = { params: { id: 50 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'putSales').resolves(
        { type: 'INVALID_VALUE', message: 'Sale not found' }
      );
      await salesController.putSales(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });

  afterEach(sinon.restore);
});