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

schema.statics.findMonthCircles = function findMonthCircles() {
  return this.aggregate([
    {
      $lookup: {
        from: 'dayCircle',
        localField: '_id',
        foreignField: 'month',
        as: 'dayCircles',
      },
    },
    // {
    //   $unwind: '$dayCircles',
    // },
    // {
    //   $lookup: {
    //     from: 'days',
    //     localfield: '$dayCircles._id',
    //     foreignField: 'dayCircle',
    //     as: 'day',
    //   },
    // },
    // {
    //   $unwind: '$day',
    // },
    // {
    //   $project: {
    //     dayCircles: '$dayCircles',
    //   },
    // },
    // {
    //   $out: 'results',
    // },
  ]);
};

const MonthCircle = mongoose.model('MonthCircle', schema);

module.exports = MonthCircle;
