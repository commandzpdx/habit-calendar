const express = require('express');
const morgan = require('morgan');

const users = require('./routes/Users');

const app = express();

app.use(morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev'));
app.use('/', users);

module.exports = app;
