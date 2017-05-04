const sinon = require('sinon');
const { expect } = require('chai');
const { retry, wait, backoff } = require('../src/index');

describe('index', () => {
  let sandbox = null;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('retry', () => {
    it('retries', async () => {
      const fail = sandbox.stub().rejects('ON NO');
      const runner = retry({ max: 3, delay: 0 });
      let error = null;
      try {
        await runner(fail);
      } catch (e) {
        error = e;
      }

      expect(error).to.not.equal(null);
      expect(fail.callCount).to.equal(3);
    });

    it('returns', async () => {
      const success = sandbox.stub().resolves('YAY');
      const runner = retry();
      const response = await runner(success);
      expect(response).to.equal('YAY');
      expect(success.callCount).to.equal(1);
    });
  });


  describe('backoff', () => {
    expect(backoff(100, 1, 2)).to.equal(100);
    expect(backoff(100, 2, 2)).to.equal(400);
  });


  describe('wait', async () => {
    await wait(1);
  });
});
