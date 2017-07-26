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
  },
  habit: {
    type: Types.ObjectId,
    ref: 'Habit',
  },
}, {
  collection: 'days',
});

const Day = mongoose.model('Day', schema);

module.exports = Day;
