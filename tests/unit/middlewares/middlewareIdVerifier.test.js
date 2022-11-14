const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const idVerifier = require('../../../src/middlewares/middlewareIdVerifier');

const { expect } = chai;
chai.use(sinonChai);

describe('tests on idVerifier middleware', function () {
  it('should return an error when "productId" is not passed', async function () {
    const res = {};
    const req = { params: -1 };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await idVerifier(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"id" is required' });
  });
});