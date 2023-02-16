const mongoose = require("mongoose");

const { Schema } = mongoose;

var CouponCode = mongoose.Schema({
  code: { type: String, require: true, unique: true },
  amount: { type: Number, required: true },
  isActive: { type: Boolean, require: true, default: true },
});

var Discounts = mongoose.model("CouponCode", CouponCode);

module.exports = Discounts;
