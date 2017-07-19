const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { Schema } = mongoose;

const schema = new Schema({
  habit: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  longestStreak: {
    type: Number,
  },
  currentStreak: {
    type: Number,
  },
  color: {
    type: String,
    trim: true,
  },
  notifications: {
    type: Boolean,
  },
  notificationInterval: {
    type: Number,
  },
}, {
  collection: 'habits',
});

const Habit = mongoose.model('Habit', schema);

module.exports = Habit;
