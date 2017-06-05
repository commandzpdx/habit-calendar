const chai = require('chai');
const chaiHttp = require('chai-http');

// const app = require('../../libraries/app');
const database = require('../../libraries/database');
const server = require('../../libraries/server');

const assert = chai.assert;
let request;

chai.use(chaiHttp);

before(() => database.connect(process.env.MONGODB_URI_TEST));

before(() => {
  request = chai.request(server);
  return request;
});

after(() => database.connection.dropDatabase());
after(() => database.disconnect());
// after(() => server.close());

describe('user', () => {
  // const testUser = {
  //   username: 'user',
  //   email: 'email@email.com',
  //   password: 'asdfasdf',
  // };


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

    it('signup requires username', () =>
      badRequest('/signup', { password: 'asdfasdf' },
        'Username, email, and password must be provided'),
    );

  });

});
