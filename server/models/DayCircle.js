/**
 * Day Circle Model.
 *
 * @module server/models/DayCircle
 */

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { Schema } = mongoose;
const { Types } = Schema;

const schema = new Schema({
  pathD: {
    type: String,
    trim: true,
    required: true,
  },
  textContent: {
    type: Number,
    required: true,
  },
  textTransform: {
    type: String,
    trim: true,
    required: true,
  },
  month: {
    type: Types.ObjectId,
    ref: 'MonthCircle',
  },
}, {
  collection: 'dayCircles',
});

schema.statics.findDays = function findDays() {
  return this.aggregate([
    // Join any existing day from days collection into dayCircle.
    {
      $lookup: {
        from: 'days',
        localField: '_id',
        foreignField: 'dayCircle',
        as: 'day',
      },
    },
    // Re-organize day circle properties.
    {
      $project: {
        month: true,
        dayCircles: {
          dayId: {
            $ifNull: [
              {
                $arrayElemAt: ['$day._id', 0],
              },
              '',
            ],
          },
          _id: '$_id',
          pathD: '$pathD',
          textContent: '$textContent',
          textTransform: '$textTransform',
          circleFilled: {
            $ifNull: [
              {
                $arrayElemAt: ['$day.circleFilled', 0],
              },
              false,
            ],
          },
          year: {
            $arrayElemAt: ['$day.year', 0],
          },
          weekday: {
            $arrayElemAt: ['$day.weekday', 0],
          },
        },
      },
    },
    // Group days by month.
    {
      $group: {
        _id: '$month',
        dayCircles: {
          $push: '$dayCircles',
        },
      },
    },
    // Populate month.
    {
      $lookup: {
        from: 'monthCircles',
        localField: '_id',
        foreignField: '_id',
        as: 'month',
      },
    },
    // Re-organize month properties.
    {
      $project: {
        month: {
          $arrayElemAt: ['$month.month', 0],
        },
        monthPathClassName: {
          $arrayElemAt: ['$month.monthPathClassName', 0],
        },
        monthTextClassName: {
          $arrayElemAt: ['$month.monthTextClassName', 0],
        },
        dayPathClassName: {
          $arrayElemAt: ['$month.dayPathClassName', 0],
        },
        dayTextClassName: {
          $arrayElemAt: ['$month.dayTextClassName', 0],
        },
        monthCircle: {
          $arrayElemAt: ['$month.monthCircle', 0],
        },
        dayCircles: true,
      },
    },
  ]);
};

const DayCircle = mongoose.model('DayCircle', schema);

module.exports = DayCircle;
