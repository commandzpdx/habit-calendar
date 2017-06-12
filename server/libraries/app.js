const express = require('express');
const morgan = require('morgan');

const api = require('../routes/api');
const web = require('../routes/web');

const app = express();
const { NODE_ENV } = process.env;

// Logger
app.use(morgan(NODE_ENV === 'production' ? 'common' : 'dev'));

// Serve static files
if (NODE_ENV === 'production') {
  app.use(express.static('public'));
}

// API routes
app.use('/api', api);

// Web routes
if (NODE_ENV === 'production') {
  app.use(web);
}

module.exports = app;
