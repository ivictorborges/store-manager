const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsService = require('../../../src/services/productsService');
const productsController = require('../../../src/controllers/productsController');
const {
  successfulList,
  successfulId,
  productPosted,
} = require('./mocks/productsController.mock');

describe('Unit tests on productsController', function () {
  describe('products searched', function () {
    it('should search a list of products', async function () {
      const res = {};
      const req = { body: {} };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getProducts').resolves(successfulList);
      await productsController.getProducts(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(successfulList.message);
    });

    it('should search a product by id', async function () {
      const res = {};
      const req = { params: { id: 1 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getProductById').resolves(successfulId);
      await productsController.getProductById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(successfulId.message);
    });
  describe('products posted', function () {
    it('should post a new product', async function () {
      const res = {};
      const req = { body: { name: 'New product' } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'postProduct').resolves(productPosted);
      await productsController.postProduct(req, res);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(productPosted.message);
    });
});
  });
});