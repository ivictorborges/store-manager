const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const nameVerifier = require('../../../src/middlewares/middlewareNameVerifier');

const { expect } = chai;
chai.use(sinonChai);

describe('tests on nameVerifier middleware', function () {
  it('should return an error when "name" is not passed', function () {
    const res = {};
    const req = { body: {} };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    nameVerifier(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });
  
  it('should return an error when "name" has less than 5 characteres', function () {
    const res = {};
    const req = { body: { name: 'Name' } };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    nameVerifier(req, res);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });
  afterEach(sinon.restore);
});