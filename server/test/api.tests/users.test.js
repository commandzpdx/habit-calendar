const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../libraries/app');
const database = require('../../libraries/database');

const assert = chai.assert;
let request;

chai.use(chaiHttp);

before(() => database.connect(process.env.MONGODB_URI_TEST));

before(() => {
  request = chai.request(app);
  return request;
});

after(() => database.connection.dropDatabase());
after(() => database.disconnect());
// after(() => server.close());

describe('user', () => {

  describe('user management', () => {

    it('signup requires not just password', () => {
      return request
        .post('/api/users')
        .send({ password: 'asdfasdf' })
        .then(
        () => { throw new Error('status should not be ok'); },
        (res) => {
          const responseErrors = JSON.parse(res.response.text);
          assert.equal(res.status, 400);
          assert.isOk(responseErrors.errors.email);
          assert.isOk(responseErrors.errors.firstName);
          assert.isOk(responseErrors.errors.lastName);
        },
      );
    });

    it('signup requires not just email', () => {
      return request
        .post('/api/users')
        .send({ email: 'email@email.com' })
        .then(
        () => { throw new Error('status should not be ok'); },
        (res) => {
          const responseErrors = JSON.parse(res.response.text);
          assert.equal(res.status, 400);
          assert.isOk(responseErrors.errors.password);
          assert.isOk(responseErrors.errors.firstName);
          assert.isOk(responseErrors.errors.lastName);
        },
      );
    });

  });

});
