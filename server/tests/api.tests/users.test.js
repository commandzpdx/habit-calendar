const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../libraries/app');

const assert = chai.assert;

chai.use(chaiHttp);

describe('user', () => {
  const testUser = {
    username: 'user',
    email: 'email@email.com',
    password: 'asdfasdf',
  };

  const request = chai.request(app);

  describe('user management', () => {

    const badRequest = (url, data, error) =>
      request
        .post(url)
        .send(data)
        .then(
        () => { throw new Error('status should not be ok'); },
        (res) => {
          assert.equal(res.status, 400);
          assert.equal(res.response.body.error, error);
        },
      );

    it('signup requires username', () => {
      badRequest('/signup', { password: 'asdfasdf' },
        'Username, email, and password must be provided');
    });

  });

});
