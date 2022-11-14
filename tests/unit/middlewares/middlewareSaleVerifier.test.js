const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const saleVerifier = require('../../../src/middlewares/middlewareSaleVerifier');

const { expect } = chai;
chai.use(sinonChai);

describe('tests on saleVerifier middleware', function () {
  it('should return an error when "productId" is not passed', async function () {
    const res = {};
    const req = { body: [{ quantity: 2 }] };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await saleVerifier(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
  });
  it('should return an error when "quantity" is not passed', async function () {
    const res = {};
    const req = { body: [{ productId: 2 }] };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await saleVerifier(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });
  it('should return an error when "quantity" is not passed', async function () {
    const res = {};
    const req = { body: [{ productId: 1, quantity: 0 }] };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await saleVerifier(req, res);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });
  afterEach(sinon.restore);
});