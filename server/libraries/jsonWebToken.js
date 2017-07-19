const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config/constants');

// JSON Web Token Library
const jsonWebToken = {

  /**
   * Create a token
   *
   * @param {Object} payload
   * @return {Promise}
   */
  sign(payload) {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, JWT_SECRET, null, (error, token) => (
        error
        ? reject(error)
        : resolve(token)
      ));
    });
  },

  /**
   * Verify a token
   *
   * @param {String} token
   * @return {Promise}
   */
  verify(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, { complete: true }, (error, payload) => (
        error
        ? reject(error)
        : resolve(payload)
      ));
    });
  },

};

module.exports = jsonWebToken;
