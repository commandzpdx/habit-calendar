const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev'));
app.get('/', (req, res) => { res.send('hello world'); });

module.exports = app;
