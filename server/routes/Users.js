const express = require('express');

const Router = express.Router;
const Users = Router();

Users

  .get('/', (req, res) => {
    res.send('helloooo world');
  });

module.exports = Users;
