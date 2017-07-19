/**
 * Handle Not Found (404) Middleware
 *
 * @return {Function}
 */

// eslint-disable-next-line no-unused-vars
const handleNotFound = () => (req, res, next) => {
  return res
    .status(404)
    .json({
      message: `Cannot ${req.method} ${req.path}`,
    });
};

module.exports = handleNotFound;
