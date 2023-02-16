const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  verification: {
    type: String,
    required: true,
  },
  
  test_date: {
    type: String,
    required: true,
  },
  user_class: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    default: "JEE",
  },
  exam_year: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  gender: {
    type: String,
  },
  state: {
    type: String,
  },
  pincode: {
    type: String,
  },
  rollnumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "rollnumber",
    default: "",
  },
});

module.exports = mongoose.model("user", userSchema);
