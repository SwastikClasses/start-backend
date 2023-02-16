const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserEntrySchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  utm_source: {
    type: String,
    required: true,
  },
  utm_source: {
    type: String,
    default: "",
  },
  utm_campaign: {
    type: String,
    default: "",
  },
  utm_medium: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("UserEntry", UserEntrySchema);
