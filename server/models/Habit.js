/**
 * Habit Model.
 *
 * @module server/models/Habit
 */

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { Schema } = mongoose;
const { Types } = Schema;

const schema = new Schema({
  habit: {
    type: Types.String,
    trim: true,
  },
  category: {
    type: Types.String,
    trim: true,
    required: true,
  },
  startDate: {
    type: Types.Date,
    default: Date.now,
    required: true,
  },
  longestStreak: {
    type: Types.Number,
  },
  currentStreak: {
    type: Types.Number,
  },
  color: {
    type: Types.String,
    trim: true,
  },
  notifications: {
    type: Types.Boolean,
  },
  notificationInterval: {
    type: Types.Number,
  },
}, {
  collection: 'habits',
});

const Habit = mongoose.model('Habit', schema);

module.exports = Habit;
