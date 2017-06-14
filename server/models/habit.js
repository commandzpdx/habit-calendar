const mongoose = require('../libraries/mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  habit: {
    type: String,
    required: true,
  },
  category: {
    type: String,
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
  },
  notifications: {
    type: Boolean,
  },
  notificationInterval: {
    type: Number,
  },
  day: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Day',
    },
  ],
});

const Habit = mongoose.model('Habit', schema);
module.exports = Habit;
