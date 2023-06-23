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
      sinon.stub(productsModel, 'getProductById').resolves(productList[0]);
      const response = await productsService.getProductById(1);
      expect(response.message).to.be.deep.equal(productList[0]);
    });

    it('should returns an error with invalid id', async function () {
      sinon.stub(productsModel, 'getProducts').resolves(productList);
      const response = await productsService.getProductById(50);
      expect(response.message).to.deep.equal('Product not found');
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
        const response = await productsService.putProduct(productList[0]);
        expect(response.message).to.be.deep.equal(productList[0]);
      });

      it('should returns an error with invalid id', async function () {
        sinon.stub(productsModel, 'getProducts').resolves(productList);
        const response = await productsService.putProduct({ productId: 50, quantity: 1 });
        expect(response.message).to.deep.equal('Product not found');
      });
  });
  describe('products deleted', function () {
    it('should delete a product', async function () {
      sinon.stub(productsModel, 'deleteProduct').resolves('Product 1 deleted successfully');
      const response = await productsService.deleteProduct(1);
      expect(response.message).to.equal('Product 1 deleted successfully');
    });
  
    it('should returns an error with invalid id', async function () {
      sinon.stub(productsModel, 'getProducts').resolves(productList);
      const response = await productsService.deleteProduct(50);
      expect(response.message).to.deep.equal('Product not found');
    });
  })
  afterEach(sinon.restore);
});