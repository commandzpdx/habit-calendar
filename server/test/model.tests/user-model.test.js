const assert = require('chai').assert;

const User = require('../../models/user');

describe('user model', () =>{
  it('example with all required fields', () => {
    return new User({
      firstName: 'a',
      lastName: 's',
      email: 'd@email.com',
      password: 'f',
    }).validate();
  });

  it('requires firstName', () => {
    return new User({
      lastName: 's',
      email: 'd@email.com',
      password: 'f',
    }).validate()
    .then(
      () => { throw new Error('validation should not pass'); },
      err => assert.isNotNull(err),
    );
  });

  it('requires lastName', () => {
    return new User({
      firstName: 'a',
      email: 'd@email.com',
      password: 'f',
    }).validate()
    .then(
      () => { throw new Error('validation should not pass'); },
      err => assert.isNotNull(err),
    );
  });

  it('requires an email', () => {
    return new User({
      firstName: 'a',
      lastName: 's',
      password: 'f',
    }).validate()
    .then(
      () => { throw new Error('validation should not pass'); },
      err => assert.isNotNull(err),
    );
  });

  it('sets hash from password and correctly compares it', () => {
    const data = {
      username: 'username',
      password: 'password',
    };

    const user = new User(data);

    assert.notEqual(user.password, data.password);
    assert.isTrue(user.comparePassword('password'));
    assert.isFalse(user.comparePassword('notpassword'));
  });

});
