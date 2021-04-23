const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  count: {
    type: Number,
  },
  content: {
    type: String,
  },
});

module.exports = mongoose.model("Customer", customerSchema);
