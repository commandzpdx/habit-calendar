const express = require('express');
const morgan = require('morgan');

const api = require('../routes/api');
const users = require('../routes/Users');

const app = express();

app.use(morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev'));
app.use('/api', api);
app.use('/api/users', users);

module.exports = app;
