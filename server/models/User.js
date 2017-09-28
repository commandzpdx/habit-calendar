/**
 * User Model.
 *
 * @module server/models/User
 */

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { Schema } = mongoose;
const { Types } = Schema;

const schema = new Schema({
  firstName: {
    type: Types.String,
    trim: true,
    required: true,
  },
  lastName: {
    type: Types.String,
    trim: true,
    required: true,
  },
  email: {
    type: Types.String,
    lowercase: true,
    trim: true,
    required: true,
  },
  password: {
    type: Types.String,
    trim: true,
    required: true,
    set(password) { return bcrypt.hashSync(password, 8); },
  },
  habits: [
    {
      type: Types.ObjectId,
      ref: 'Habit',
    },
  ],
}, {
  collection: 'users',
});

schema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', schema);

module.exports = User;
