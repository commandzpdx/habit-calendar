/**
 * Environment Constants.
 *
 * @module server/constants/env
 */

// Get environment variables and set default values.
const {
  HOST = '0.0.0.0',
  JWT_SECRET = 'sekrit',
  MONGODB_URI = 'mongodb://localhost:27017/didju',
  MONGODB_URI_TEST = 'mongodb://localhost:27017/didju-test',
  NODE_ENV: NODE = 'development',
  PORT = 8000,
  PORT_TEST = 8888,
} = process.env;

module.exports = {
  HOST,
  JWT_SECRET,
  MONGODB_URI,
  MONGODB_URI_TEST,
  NODE,
  PORT,
  PORT_TEST,
};
