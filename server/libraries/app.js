const express = require('express');
const morgan = require('morgan');

const api = require('../routes/api');
const web = require('../routes/web');

const app = express();
const { NODE_ENV } = process.env;

// Logger
app.use(morgan(NODE_ENV === 'production' ? 'common' : 'dev'));

// API routes
app.use('/api', api);

if (NODE_ENV === 'production') {
  // Serve static files
  app.use(express.static('public'));

  // Web routes
  app.use(web);
}

module.exports = app;
