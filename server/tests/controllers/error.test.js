/**
 * Error Controller Test.
 *
 * @module server/tests/controllers/error.test
 */

const { assert } = require('chai');

const errorController = require('../../controllers/error');
const User = require('../../models/User');

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

  it('recognizes non Mongoose validation errors', () => {

    const newError = new Error('teapot message');
    newError.code = 418;
    newError.errors = '418 is a teapot error';
    newError.name = 'not Mongoose validation error';

    errorHandler()(newError, null, resObj);
    assert.equal(resObj.statusCode, newError.code);
    assert.equal(resObj.body.message, newError.message);
    assert.equal(resObj.body.errors, newError.errors);
  });

  it('recognizes internal server errors', () => {

    const newError = new Error();

    errorHandler()(newError, null, resObj);
    assert.equal(resObj.statusCode, 500);
    assert.equal(resObj.body.message, 'internal server error');
  });

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
