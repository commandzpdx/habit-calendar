const bodyParser = require('body-parser').json;
const express = require('express');

const User = require('../models/user');

const Router = express.Router;
const Users = Router();

function hasEmailAndPassword(req, res, next) {
  const signee = req.body;

  if (!signee.email || !signee.password) {
    return next({
      code: 400,
      error: 'Email and password must be provided',
    });
  }
  next();
}

Users
  .get('/', (req, res) => {
    res.send('helloooo world');
  })

  .post('/signup', bodyParser, hasEmailAndPassword, (req, res, next) => {
    let data = req.body;
    let userObj = {};

    User.find({ email: data.email }).count()
      .then((count) => {
        if (count > 0) {
          throw new Error({
            code: 400,
            error: `The email you have entered, ${data.email}, already has an account. Please signup with a different email.`,
          });
        }
        return new User(data).save();
      })
      .then((user) => {
        userObj = user;
      })
      .then((userObject) => {
        res.send({ userObject });
      })
      .catch(next);
  })

  ; // end Users routes

module.exports = Users;
