/**
 * Error Controller.
 *
 * @namespace errorController
 */

const errorController = {

  /**
   * Error by error name.
   */

  errorByName(err, req, res, next) {
    if (err.name !== 'ValidationError') return next();

    return res
      .status(400)
      .json({
        message: 'Mongoose Validation Error',
        errors: err.errors,
      });
  },

  /**
   * Error by status code.
   */

  errorByCode(err, req, res, next) {
    if (!err.code) return next();

    return res
      .status(err.code)
      .json({
        message: err.message,
        errors: err.errors || [],
      });
  },

  /**
   * Interal server error.
   */

  internalServer(req, res) {
    return res
      .status(500)
      .json({
        message: 'Internal Server Error',
        errors: [],
      });
  },

  /**
   * 404 error.
   */

  // eslint-disable-next-line no-unused-vars
  notFound(req, res, next) {
    return res
      .status(404)
      .json({
        message: `Cannot ${req.method} ${req.path}`,
      });
  },

};

module.exports = errorController;
