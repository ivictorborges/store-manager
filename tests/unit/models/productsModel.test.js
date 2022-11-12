const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/productsModel');
const connection = require('../../../src/models/connection');
const { productsList } = require('./mocks/productsModel.mock');

describe('Unit test on productsModel', function () {
  describe('products searched', function () {
    it('should search a list of products', async function () {
      sinon.stub(connection, 'execute').resolves([productsList]);
      const result = await productsModel.findProducts();
      expect(result).to.be.deep.equal(productsList);
    });

    it('should search a product by id', async function () {
      sinon.stub(connection, 'execute').resolves([[productsList[0]]]);
      const result = await productsModel.findProductById(1);
      expect(result).to.be.deep.equal(productsList[0]);
    });
    
  });

  afterEach(sinon.restore);
});