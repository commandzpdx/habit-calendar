const User = require('../models/user');

const userController = {
  signup(req, res, next) {
    const data = req.body;

    return User.find({ email: data.email }).count()
      .then((count) => {
        if (count > 0) {
          const badEmail = new Error(
            `${data.email} already has an account. Please signup with a different email.`,
          );
          badEmail.name = 'email already exists';
          badEmail.code = 400;
          throw badEmail;
        }
        return new User(data).save();
      })
      .then((user) => {
        return res.json({ user });
      })
      .catch(next);
  },

};

module.exports = userController;
