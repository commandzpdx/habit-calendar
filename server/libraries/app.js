/**
 * App Library.
 *
 * @module server/libraries/app
 */

const express = require('express');
const morgan = require('morgan');

const apiRoutes = require('../routes/api');
const webRoutes = require('../routes/web');
const ENV = require('../constants/env');
const PATHS = require('../constants/paths');

// Create express app.
const app = express();

// Logger for HTTP requests.
app.use(morgan(ENV.NODE === 'production' ? 'common' : 'dev'));

// Serve static files.
if (ENV.NODE === 'production') app.use(express.static(PATHS.PUBLIC));

// API routes.
app.use('/api', apiRoutes);

// Web page routes.
if (ENV.NODE === 'production') app.use('/', webRoutes);

module.exports = app;
