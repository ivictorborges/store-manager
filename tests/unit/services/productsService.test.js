const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/productsModel');
const productsService = require('../../../src/services/productsService');
const { productList } = require('./mocks/productsService.mock');

describe('Unit tests on productsService', function () {
  describe('products searched', function () {
    it('should search a list of products', async function () {
      sinon.stub(productsModel, 'getProducts').resolves(productList);
      const response = await productsService.getProducts();
      expect(response.message).to.be.deep.equal(productList);
    });

    it('should search a product by id', async function () {
      sinon.stub(productsService, 'getProductById').resolves({ type: null, message: productList[0] });
      const response = await productsService.getProductById(1);
      expect(response.message).to.be.deep.equal(productList[0]);
    });
  });
  describe('products posted', function () {
      it('should post a new product', async function () {
        sinon.stub(productsModel, 'postProduct').resolves(4);
        const response = await productsService.postProduct({ name: 'New product' });
        expect(response.message).to.be.deep.equal({ id: 4, name: 'New product' });
      });
  });
  describe('products putted', function () {
      it('should put a product', async function () {
        sinon.stub(productsModel, 'putProduct').resolves(productList[0]);
        const result = await productsModel.putProduct(productList[0]);
        expect(result).to.be.deep.equal(productList[0]);
      });
  });
  
  afterEach(sinon.restore);
});