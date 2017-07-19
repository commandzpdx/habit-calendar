const {
  JWT_SECRET = 'sekrit',
  MONGODB_URI = 'mongodb://localhost:27017/didju',
  MONGODB_URI_TEST = 'mongodb://localhost:27017/didju-test',
  NODE_ENV = 'development',
  PORT = 8000,
  PORT_TEST = 8888,
} = process.env;

const constants = {
  JWT_SECRET,
  MONGODB_URI,
  MONGODB_URI_TEST,
  NODE_ENV,
  PORT,
  PORT_TEST,
};

module.exports = constants;
