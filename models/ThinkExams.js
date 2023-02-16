const mongoose = require("mongoose");

const { Schema } = mongoose;

var ThinkExam = mongoose.Schema({
  Email: { type: String, unique: true },
  Password: { type: String },
  Exam: { type: String },
  RollNumber: { type: String },
});

var thinkExam = mongoose.model("thinkexams", ThinkExam);

module.exports = thinkExam;
