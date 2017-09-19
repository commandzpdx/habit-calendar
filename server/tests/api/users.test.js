const chai = require('chai');
const chaiHttp = require('chai-http');

const ENV = require('../../constants/env');
const app = require('../../libraries/app');
const database = require('../../libraries/database');

const { assert } = chai;
let request;

chai.use(chaiHttp);

before(() => database.connect(ENV.MONGODB_URI_TEST));

before(() => {
  request = chai.request(app);
  return request;
});

after(() => database.connection.dropDatabase());
after(() => database.disconnect());
// after(() => server.close());

describe('user', () => {
  const badToken = 'badTokenString';
  const testUser = {
    firstName: 'joe',
    lastName: 'tester',
    email: 'email@email.com',
    password: 'asdfasdf',
  };
  let testToken;

  describe('user management', () => {
    it('signup requires not just password', () => {
      return request
        .post('/api/users')
        .send({ password: testUser.password })
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
        .send({ email: testUser.password })
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
        .send({ firstName: testUser.firstName, lastName: testUser.lastName })
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
        .send({
          firstName: testUser.firstName,
          lastName: testUser.lastName,
          email: testUser.email,
          password: testUser.password,
        })
        .then((res) => {
          const response = JSON.parse(res.text);
          testToken = response.token;

          assert.equal(res.status, 201);
          assert.isOk(response.name);
          assert.isOk(response.token);
        });
    });

    it('user sign-in verifies the token', () => {
      return request
        .get('/api/user/token')
        .set('Authorization', `Bearer ${testToken}`)
        .then((res) => {
          const response = JSON.parse(res.text);

          assert.equal(res.status, 200);
          assert.equal(response.message, 'The provided token is valid.');
        });
    });

    it('recognizes a bad token', () => {
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

    it('signin is unsuccessful with bad password, email combo', () => {
      return request
        .post('/api/user/signin')
        .send({ email: 'badEmail@email.com', password: 'badPassword'})
        .then(
          () => { throw new Error('Status should not be ok'); },
          (res) => {
            const response = JSON.parse(res.response.text);

            assert.equal(res.status, 400);
            assert.equal(response.message, 'The provided email and/or password is invalid.');
          },
        );
    });

    it('signin is successful with signed up user', () => {
      return request
        .post('/api/user/signin')
        .set('content-type', 'application/json')
        .send({ email: testUser.email, password: testUser.password })
        .then((res) => {
          const response = JSON.parse(res.text);

          assert.equal(res.status, 200);
          assert.equal(response.name, `${testUser.firstName} ${testUser.lastName}`);
          assert.isOk(response.token);
        });
    });
  });
});
