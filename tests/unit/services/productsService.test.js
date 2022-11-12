const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/productsModel');
const productsService = require('../../../src/services/productsService');
const { productList, filteredProducts } = require('./mocks/productsService.mock');

describe('Unit tests on productsService', function () {
  describe('products searched', function () {
    it('should search a list of products', async function () {
      sinon.stub(productsModel, 'findProducts').resolves(productList);
      const response = await productsService.getProducts();
      expect(response.message).to.deep.equal(productList);
    });

    it('should search a product by id', async function () {
      sinon.stub(productsModel, 'findProductById').resolves(productList[0]);
      const response = await productsService.getProductById(1);
      expect(response.message).to.deep.equal(filteredProducts[0]);
    });
  });

  afterEach(sinon.restore);
});