/**
 * User Controller.
 *
 * @module server/controllers/user
 */

const { newError } = require('../libraries/error');
const jwt = require('../libraries/jsonWebToken');
const User = require('../models/User');

const signup = (req, res, next) => {
  const data = req.body;

  return User
    .find({ email: data.email })
    .count()
    .then((count) => {
      if (count > 0) {
        throw newError({
          code: 400,
          message: `${data.email} already has an account. Please signup with a different email.`,
          name: 'email already exists',
        });
      }

      return new User(data).save();
    })
    .then((user) => {
      return Promise.all([
        `${user.firstName} ${user.lastName}`,
        jwt.sign({
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        }),
      ]);
    })
    .then(([name, token]) => {
      return res
        .status(201)
        .json({
          name,
          token,
        });
    })
    .catch(next);
};

module.exports = {
  signup,
};
