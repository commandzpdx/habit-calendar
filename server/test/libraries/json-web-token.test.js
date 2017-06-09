const { assert } = require('chai');
const jwt = require('../../libraries/json-web-token');

const payload = {
  _id: '1a2b3c',
};

let token;

describe('JSON Web Token Library', () => {

  it('Should fail signing token because no payload provided', () => {
    return jwt
      .sign()
      .catch((err) => {
        assert.equal(err.name, 'Error');
        assert.equal(err.message, 'payload is required');
      });
  });

  it('Should pass signing token and returns a new token', () => {
    return jwt
      .sign(payload)
      .then((newToken) => {
        token = newToken;

        assert.isString(newToken);
      });
  });

  it('Should fail token verification because no token provided.', () => {
    return jwt
      .verify()
      .catch((err) => {
        assert.equal(err.name, 'JsonWebTokenError');
        assert.equal(err.message, 'jwt must be provided');
      });
  });

  it('Should fail token verification because token is invalid', () => {
    return jwt
      .verify('inva1idT0ken')
      .catch((err) => {
        assert.equal(err.name, 'JsonWebTokenError');
        assert.equal(err.message, 'jwt malformed');
      });
  });

  it('Should pass token verfication and return the decoded payload', () => {
    return jwt
      .verify(token)
      .then((decodedPayload) => {
        assert.equal(decodedPayload._id, payload._id);
      });
  });

});
