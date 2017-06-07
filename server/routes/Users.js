const bodyParser = require('body-parser').json;
const express = require('express');

const User = require('../models/user');

const Router = express.Router;
const Users = Router();

function hasEmailAndPassword(req, res, next) {

  if (!req.body.email || !req.body.password) {
    return next({
      code: 400,
      error: 'Email and password must be provided',
    });
  }
  return next();
}

Users
  .get('/', (req, res) => {
    res.send('helloooo world');
  })

  .post('/signup', bodyParser, hasEmailAndPassword, (req, res, next) => {
    const data = req.body;

    User.find({ email: data.email }).count()
      .then((count) => {
        if (count > 0) {
          const badEmail = new Error(
            `The email you have entered, ${data.email}, already has an account. Please signup with a different email.`,
          );
          badEmail.code = 400;
          throw badEmail;
        }
        return new User(data).save();
      })
      .then((user) => {
        res.json({ user });
      })
      .catch(next);
  })

  ; // end Users routes

module.exports = Users;
