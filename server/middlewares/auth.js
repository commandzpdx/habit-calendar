/**
 * Auth Middlewares.
 *
 * @module server/middlewares/auth
 */

const jwt = require('../libraries/jsonWebToken');

// Check if JSON web token is valid or not.
const ensureAuth = () => (req, res, next) => {
  const authorization = req.get('Authorization') || '';
  const [bearer, token] = authorization.split(' ');

  const newError = new Error('Unauthorized');
  newError.code = 401;

  // No Authorization header or "Bearer" isn't in the header
  if (bearer !== 'Bearer' || !token) {
    throw newError;
  }

  return jwt
    .verify(token)
    .then((payload) => {
      // Payload will be available in the req object
      req.user = payload;

      next();
    })
    .catch(() => {
      // Token is invalid, set response to 401
      throw newError;
    });
};

module.exports = {
  ensureAuth,
};
