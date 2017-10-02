/**
 * Month Circle Model.
 *
 * @module server/models/MonthCircle
 */

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { Schema } = mongoose;
const { Types } = Schema;

const schema = new Schema({
  month: {
    type: Types.String,
    trim: true,
    required: true,
  },
  monthPathClassName: {
    type: Types.String,
    trim: true,
    required: true,
  },
  monthTextClassName: {
    type: Types.String,
    trim: true,
    required: true,
  },
  dayPathClassName: {
    type: Types.String,
    trim: true,
    required: true,
  },
  dayTextClassName: {
    type: Types.String,
    trim: true,
    required: true,
  },
  monthCircle: {
    pathD: {
      type: Types.String,
      trim: true,
      required: true,
    },
    textContent: {
      type: Types.String,
      trim: true,
      required: true,
    },
    textTransform: {
      type: Types.String,
      trim: true,
      required: true,
    },
  },
}, {
  collection: 'monthCircles',
});

const MonthCircle = mongoose.model('MonthCircle', schema);

module.exports = MonthCircle;
