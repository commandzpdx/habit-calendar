/**
 * Auth Middlewares.
 *
 * @module server/middlewares/auth
 */

const jwt = require('../libraries/jsonWebToken');

// Check if JSON web token is valid or not.
const ensureAuth = () => (req, res, next) => {
  const [bearer, token] = req
    .get('Authorization')
    .split(' ');
  const unauthorized = {
    code: 401,
    message: 'Unauthorized',
  };

  // No Authorization header or "Bearer" isn't in the header
  if (bearer !== 'Bearer' || !token) {
    return next(unauthorized);
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
      next(unauthorized);
    });
};

module.exports = {
  ensureAuth,
};
