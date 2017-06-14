const mongoose = require('../libraries/mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  pathD: {
    type: String,
    required: true,
  },
  textContent: {
    type: Number,
    required: true,
  },
  textTransform: {
    type: String,
    required: true,
  },
  month: {
    type: Schema.Types.ObjectId,
    ref: 'Month'
  },
}); 