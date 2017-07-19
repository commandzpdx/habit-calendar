const jwt = require('../libraries/jsonWebToken');

/**
 * Ensure Auth Middleware
 *
 * @return {Function}
 */
const ensureAuth = () => (req, res, next) => {
  const authHeader = req.get('Authorization');
  const unauthorized = {
    code: 401,
    message: 'Unauthorized',
  };

  // No Authorization header or "Bearer" isn't in the header
  if (!authHeader || authHeader.substr(0, 6) !== 'Bearer') {
    return next(unauthorized);
  }

  // Token starts after the word Bearer and a space
  const token = authHeader.slice(7);

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

module.exports = ensureAuth;
