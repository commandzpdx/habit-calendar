const bcrypt = require('bcryptjs');
const mongoose = require('../libraries/mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    set(password) { return bcrypt.hashSync(password, 8); },
  },
});

schema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compareSync(password, this.hash);
};

const User = mongoose.model('User', schema);
module.exports = User;
