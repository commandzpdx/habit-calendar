const chai = require('chai');

const assert = chai.assert;

const errorHandler = require('../../middlewares/handle-errors');
const User = require('../../models/user');

describe('handle-errors', () => {

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
        console.log('err is ', err);
        errorHandler()(err, null, resObj);
        assert.equal(resObj.statusCode, 400);
        assert.equal(resObj.body.errors.password.message, 'Path `password` is required.');
      });
  });

});
