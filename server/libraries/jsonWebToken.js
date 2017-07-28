const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config/constants');

/**
 * Create a token.
 */
const sign = payload => new Promise((resolve, reject) => {
  jwt.sign(payload, JWT_SECRET, null, (error, token) => (
    error
    ? reject(error)
    : resolve(token)
  ));
});

/**
 * Verify a token.
 */
const verify = token => new Promise((resolve, reject) => {
  jwt.verify(token, JWT_SECRET, { complete: true }, (error, payload) => (
    error
    ? reject(error)
    : resolve(payload)
  ));
});

module.exports = {
  sign,
  verify,
};
