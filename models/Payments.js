const mongoose = require("mongoose");

const { Schema } = mongoose;

const paymentSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  BANKNAME: {
    type: String,
  },
  BANKTXNID: {
    type: String,
  },
  CHECKSUMHASH: {
    type: String,
  },
  GATEWAYNAME: {
    type: String,
  },
  ORDERID: {
    type: String,
    unique: true,
  },
  PAYMENTMODE: {
    type: String,
  },
  STATUS: {
    type: String,
  },
  TXNAMOUNT: {
    type: String,
  },
  TXNDATE: {
    type: String,
  },
  TXNID: {
    type: String,
  },
});

module.exports = mongoose.model("payment", paymentSchema);
