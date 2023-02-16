const mongoose = require("mongoose");

const { Schema } = mongoose;

var RollNumber = mongoose.Schema({
  class: { type: Object },
  exam: { type: String },
});

var rollnumbers = mongoose.model("rollnumbers", RollNumber);

module.exports = rollnumbers;
