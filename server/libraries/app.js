const express = require('express');
const morgan = require('morgan');

const api = require('../routes/api');

const app = express();

app.use(morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev'));
app.use('/api', api);

module.exports = app;
