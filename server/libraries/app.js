const express = require('express');
const morgan = require('morgan');

const { NODE_ENV } = require('../config/constants');
const { publicDir } = require('../config/paths');
const apiRoutes = require('../routes/api');
const webRoutes = require('../routes/web');

// Create express app.
const app = express();

// Logger for HTTP requests.
app.use(morgan(NODE_ENV === 'production' ? 'common' : 'dev'));

// Serve static files.
if (NODE_ENV === 'production') app.use(express.static(publicDir));

// API routes.
app.use('/api', apiRoutes);

// Web page routes.
if (NODE_ENV === 'production') app.use('/', webRoutes);

module.exports = app;
