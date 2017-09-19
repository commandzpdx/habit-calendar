/**
 * Month Circle Model.
 *
 * @module server/models/MonthCircle
 */

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { Schema } = mongoose;

const schema = new Schema({
  month: {
    type: String,
    trim: true,
    required: true,
  },
  monthPathClassName: {
    type: String,
    trim: true,
    required: true,
  },
  monthTextClassName: {
    type: String,
    trim: true,
    required: true,
  },
  dayPathClassName: {
    type: String,
    trim: true,
    required: true,
  },
  dayTextClassName: {
    type: String,
    trim: true,
    required: true,
  },
  monthCircle: {
    pathD: {
      type: String,
      trim: true,
      required: true,
    },
    textContent: {
      type: String,
      trim: true,
      required: true,
    },
    textTransform: {
      type: String,
      trim: true,
      required: true,
    },
  },
}, {
  collection: 'monthCircles',
});

const MonthCircle = mongoose.model('MonthCircle', schema);

module.exports = MonthCircle;
