const { NODE_ENV } = process.env;

const express = require('express');
const morgan = require('morgan');

const apiRoutes = require('../routes/api');
const webRoutes = require('../routes/web');

// Create express app.
const app = express();

// Logger for HTTP requests.
app.use(morgan(NODE_ENV === 'production' ? 'common' : 'dev'));

// Serve static files.
if (NODE_ENV === 'production') app.use(express.static('public'));

// API routes.
app.use('/api', apiRoutes);

// Web page routes.
if (NODE_ENV === 'production') app.use('/', webRoutes);

module.exports = app;
