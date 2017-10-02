/**
 * Error Controller.
 *
 * @module server/controllers/error
 */

// Interal server error.
// eslint-disable-next-line no-unused-vars
const internalServer = (err, req, res, next) => res
  .status(500)
  .json({
    message: 'Internal Server Error',
    errors: [],
  });

// Error by error name.
const name = (err, req, res, next) => {
  if (err.name !== 'ValidationError') return next(err);

  return res
    .status(400)
    .json({
      message: 'Mongoose Validation Error',
      errors: err.errors,
    });
};

// 404 error.
// eslint-disable-next-line no-unused-vars
const notFound = (req, res, next) => res
  .status(404)
  .json({ message: `Cannot ${req.method} ${req.path}` });

// Error by status code.
const status = (err, req, res, next) => {
  if (!err.code) return next(err);

  return res
    .status(err.code)
    .json({
      message: err.message,
      errors: err.errors || [],
    });
};

module.exports = {
  internalServer,
  name,
  notFound,
  status,
};
