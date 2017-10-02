/**
 * Auth Controller.
 *
 * @module server/controllers/auth
 */

const { newError } = require('../libraries/error')
const jwt = require('../libraries/jsonWebToken');
const User = require('../models/User');

const signin = (req, res, next) => {
  // Copy the data from req.body
  const payload = Object.assign({}, req.body);

  // Remove user credentials from the request body
  delete req.body;

  return User
    .findOne({ email: payload.email })
    .populate('habits')
    .then((user) => {
      // User or email/password combination doesn't exist, return error
      if (!user || !user.comparePassword(payload.password)) {
        throw newError({
          code: 400,
          message: 'The provided email and/or password is invalid.',
        });
      }

      return user;
    })
    .then((user) => {
      // Join first and last name.
      const name = `${user.firstName} ${user.lastName}`;

      // Create JWT.
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
};

const token = (req, res) => res
  .status(200)
  .json({ message: 'The provided token is valid.' });

module.exports = {
  signin,
  token,
};
