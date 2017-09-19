/**
 * Day Model.
 *
 * @module server/models/Day
 */

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { Schema } = mongoose;
const { Types } = Schema;

const schema = new Schema({
  circleFilled: {
    type: Boolean,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  weekday: {
    type: String,
    trim: true,
  },
  dayCircle: {
    type: Types.ObjectId,
    ref: 'DayCircle',
    required: true,
  },
  habit: {
    type: Types.ObjectId,
    ref: 'Habit',
    // required: true,
  },
}, {
  collection: 'days',
});

const Day = mongoose.model('Day', schema);

module.exports = Day;
