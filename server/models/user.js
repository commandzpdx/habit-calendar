const bcrypt = require('bcryptjs');
const mongoose = require('../libraries/mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    set(password) { return bcrypt.hashSync(password, 8); },
  },
  habits: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Habit',
    },
  ],
});

schema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', schema);
module.exports = User;
