/**
 * Handle Not Found (404) Middleware
 *
 * @return {Function}
 */
const handleNotFound = () => (req, res, next) => {  // eslint-disable-line
  return res
    .status(404)
    .json({
      message: `Cannot ${req.method} ${req.path}`,
    });
};

module.exports = handleNotFound;
