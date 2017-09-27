/**
 * Auth Middleware.
 *
 * @module server/middlewares/auth
 */

const { newError } = require('../libraries/error');
const jwt = require('../libraries/jsonWebToken');

// Check if JSON web token is valid or not.
const ensureAuth = () => (req, res, next) => {
  const authorization = req.get('Authorization') || '';
  const [bearer, token] = authorization.split(' ');

  const error = newError({
    code: 401,
    message: 'Unauthorized',
  });

  // No Authorization header or "Bearer" isn't in the header
  if (bearer !== 'Bearer' || !token) throw error;

  return jwt
    .verify(token)
    .then((payload) => {
      // Payload will be available in the req object
      req.user = payload;

      next();
    })
    // Token is invalid, set response to 401
    .catch(() => { throw error; });
};

module.exports = {
  ensureAuth,
};
