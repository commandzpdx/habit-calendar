const chai = require('chai');

const assert = chai.assert;

const errorHandler = require('../../middlewares/handle-errors');
const User = require('../../models/user');

describe('handle-errors', () => {

  // Mock up the response object that's returned in handle-errors.js
  const resObj = {
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };

  it('recognizes missing password', () => {
    return new User({
      firstName: 'joe',
      lastName: 'test',
      email: 'email@email.com',
    })
      .save()
      .catch((err) => {
        errorHandler()(err, null, resObj);
        assert.equal(resObj.statusCode, 400);
        assert.equal(resObj.body.errors.password.message, 'Path `password` is required.');
      });
  });

  it('recognizes missing email', () => {
    return new User({
      firstName: 'joe',
      lastName: 'test',
      password: 'asdf',
    })
      .save()
      .catch((err) => {
        errorHandler()(err, null, resObj);
        assert.equal(resObj.statusCode, 400);
        assert.equal(resObj.body.errors.email.message, 'Path `email` is required.');
      });
  });

  it('recognizes missing name', () => {
    return new User({
      password: 'asdf',
      email: 'email@email.com',
    })
      .save()
      .catch((err) => {
        errorHandler()(err, null, resObj);
        assert.equal(resObj.statusCode, 400);
        assert.equal(resObj.body.errors.firstName.message, 'Path `firstName` is required.');
        assert.equal(resObj.body.errors.lastName.message, 'Path `lastName` is required.');
      });
  });
});
