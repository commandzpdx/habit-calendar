const assert = require('chai').assert;

const User = require('../../models/user');

describe.only('user model', () =>{
  it('example with all required fields', () => {
    return new User({
      firstName: 'a',
      lastName: 's',
      email: 'd@email.com',
      password: 'f',
    }).validate();
  });

});
