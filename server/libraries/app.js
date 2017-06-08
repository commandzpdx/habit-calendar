const express = require('express');
const morgan = require('morgan');

const users = require('../routes/users');
const errorHandler = require('../middlewares/handle-errors');

const app = express();

app.use(morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev'));
app.use('/api/users', users);

app.use(errorHandler());

module.exports = app;
