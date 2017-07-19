const handleErrors = () => (err, req, res, next) => { // eslint-disable-line
  let code;
  let body;

  switch (err.name) {
    case 'ValidationError':
      code = 400;
      body = {
        message: 'Mongoose Validation Error',
        errors: err.errors,
      };
      break;

    default:
      if (err.code) {
        code = err.code;
        body = {
          message: err.message,
          errors: err.errors || [],
        };
      } else {
        code = 500;
        body = {
          message: 'internal server error',
        };
      }
  }

  return res.status(code).json(body);
};

module.exports = handleErrors;
