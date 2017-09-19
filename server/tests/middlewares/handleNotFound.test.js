const { assert } = require('chai');

const errorController = require('../../controllers/error');

describe('Handle Not Found Middleware', () => {
  it('Should return a 404 reponse', () => {
    const req = {
      method: 'GET',
      path: '/',
    };

    const res = {
      json(body) {
        this.body = JSON.stringify(body);
      },
      status(code) {
        this.statusCode = code;

        return this;
      },
    };

    handleNotFound(req, res);

    assert.equal(res.statusCode, 404);
    assert.equal(res.body, JSON.stringify({
      message: `Cannot ${req.method} ${req.path}`,
    }));
  });
});
