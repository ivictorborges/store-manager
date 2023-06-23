const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/productsModel');
const connection = require('../../../src/models/connection');
const { productsList } = require('./mocks/productsModel.mock');

describe('Unit test on productsModel', function () {
  describe('products searched', function () {
    it('should search a list of products', async function () {
      sinon.stub(connection, 'execute').resolves([productsList]);
      const result = await productsModel.getProducts();
      expect(result).to.be.deep.equal(productsList);
    });

    it('should search a product by id', async function () {
      sinon.stub(connection, 'execute').resolves([[productsList[0]]]);
      const result = await productsModel.getProductById(1);
      expect(result).to.be.deep.equal(productsList[0]);
    });
  });
  describe('products posted', function () {
    it('should post a new product', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
      const result = await productsModel.postProduct({ name: 'New product' });
      expect(result).to.be.equal(4);
    });
  });
  describe('products updated', function () {
    it('should update a product', async function () {
      sinon.stub(connection, 'execute').resolves([{ changedRows: 1 }]);
      const result = await productsModel.putProduct(productsList[0]);
      expect(result).to.be.deep.equal(productsList[0]);
    });
  });
  describe('products deleted', function () {
    it('should delete a product', async function () {
      sinon.stub(connection, 'execute').resolves();
      const result = await productsModel.deleteProduct(1);
      expect(result).to.equal('Product 1 deleted successfully');
    });
  });
      
  afterEach(sinon.restore);
});