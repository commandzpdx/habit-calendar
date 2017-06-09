const express = require('express');
const morgan = require('morgan');

const api = require('../routes/api');
const errorHandler = require('../middlewares/handle-errors');

const app = express();

app.use(morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev'));
app.use('/api', api);
app.use(errorHandler());

module.exports = app;
