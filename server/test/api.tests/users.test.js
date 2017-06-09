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
  let testToken;

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

    it('signup requires not just first and last name', () => {
      return request
        .post('/api/users')
        .send({ firstName: 'first', lastName: 'last' })
        .then(
        () => { throw new Error('status should not be ok'); },
        (res) => {
          const responseErrors = JSON.parse(res.response.text);
          assert.equal(res.status, 400);
          assert.isOk(responseErrors.errors.password);
          assert.isOk(responseErrors.errors.email);
        },
      );
    });

    it('signup POSTs with email, password, first name, and last name, then returns a token', () => {
      return request
        .post('/api/users')
        .send({ firstName: 'first', lastName: 'last', email: 'email@email.com', password: 'asdfasdf' })
        .then(
        (res) => {
          const response = JSON.parse(res.text);
          testToken = response.token;

          assert.equal(res.status, 201);
          assert.isOk(response.name);
          assert.isOk(response.token);
        },
      );
    });

    it('user sign-in verifies the token', () => {
      return request
        .get('/api/user/token')
        .set('Authorization', `Bearer ${testToken}`)
        .then(
          (res) => {
            const response = JSON.parse(res.text);

            assert.equal(res.status, 200);
            assert.equal(response.message, 'The provided token is valid.');
          },
        );
    });

    it('recognizes a bad token', () => {
      const badToken = 'badTokenString';

      return request
        .get('/api/user/token')
        .set('Authorization', `Bearer ${badToken}`)
        .then(
          () => { throw new Error('Status should not be ok'); },
          (res) => {
            const response = JSON.parse(res.response.text);

            assert.equal(res.status, 401);
            assert.equal(response.message, 'Unauthorized');
          },
        );

    });

  });

});
