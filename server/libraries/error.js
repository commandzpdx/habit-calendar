/**
 * Error Library.
 *
 * @module server/libraries/error
 */

const newError = ({ code, message, name }) => {
  // Create new error with message.
  const error = new Error(message || '');

  // Set name of error.
  if (name) error.name = name;

  // Set status code.
  if (code) error.code = code;

  return error;
};

module.exports = {
  newError,
};
