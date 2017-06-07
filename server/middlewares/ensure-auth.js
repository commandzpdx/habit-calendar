const jwt = require('../libraries/json-web-token');

const ensureAuth = () => (req, res, next) => {
  // Token starts after the word Bearer and a space.
  const token = req.get('Authorization').slice(7);

  return jwt
    .verify(token)
    .then((payload) => {
      // Payload will be available in the req object.
      req.user = payload;

      next();
    })
    .catch(() => {
      // Token is invalid, set response to 401.
      next({
        code: 401,
        message: 'Unauthorized',
      });
    });
};

module.exports = ensureAuth;
