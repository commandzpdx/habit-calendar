const jwt = require('../libraries/jsonWebToken');
const User = require('../models/user');

/**
 * Auth Controller
 */
const authController = {

  /**
   * User signin
   *
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   */
  signin(req, res, next) {
    // Copy the data from req.body
    const payload = Object.assign({}, req.body);

    // Remove user credentials from the request body
    delete req.body;

    return User
      .findOne({
        email: payload.email,
      })
      .populate('habits')
      .then((user) => {
        // User or email/password combination doesn't exist, return error
        if (!user || !user.comparePassword(payload.password)) {
          const newError = new Error('The provided email and/or password is invalid.');

          newError.code = 400;

          throw newError;
        }

        return user;
      })
      .then((user) => {
        // Join first and last name
        const name = `${user.firstName} ${user.lastName}`;

        // Create json web token
        return Promise.all([
          name,
          user.habits,
          jwt.sign({
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            name,
          }),
        ]);
      })
      .then(([name, habits, token]) => {
        return res
          .status(200)
          .json({
            name,
            token,
            habits,
          });
      })
      .catch(next);
  },

  /**
   * User token verification
   *
   * @param {Object} req
   * @param {Object} res
   */
  token(req, res) {
    return res
      .status(200)
      .json({
        message: 'The provided token is valid.',
      });
  },

};

module.exports = authController;
