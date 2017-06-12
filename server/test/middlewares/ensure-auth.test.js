const { assert } = require('chai');
const jwt = require('../../libraries/json-web-token');
const ensureAuth = require('../../middlewares/ensure-auth')();

describe('Ensure Auth Middleware', () => {

  const payload = {
    _id: '1a2b3c',
  };

  const req = {
    get(header) {
      return this.headers[header];
    },
  };

  let token;

  before(() => {
    return jwt
      .sign(payload)
      .then((newToken) => {
        token = newToken;
      });
  });

  it('Should not set req.user property when token is invalid', () => {
    req.headers = {
      Authorization: 'Bearer invalid.token',
    };

    return ensureAuth(req, null, (err) => {
      assert.notProperty(req, 'user');
      assert.propertyVal(err, 'code', 401);
      assert.propertyVal(err, 'message', 'Unauthorized');
    });
  });

  it('Should set req.user property when token is valid', () => {
    req.headers = {
      Authorization: `Bearer ${token}`,
    };

    return ensureAuth(req, null, () => {
      assert.property(req, 'user');
      assert.propertyVal(req.user, '_id', '1a2b3c');
    });
  });

});
