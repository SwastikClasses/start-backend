const mongoose = require("mongoose");

const { Schema } = mongoose;

const easebuzzPaymentSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name_on_card: {
    type: "String",
  },
  bank_ref_num: {
    type: "String",
  },
  udf3: {
    type: "String",
  },
  hash: {
    type: "String",
  },
  firstname: {
    type: "String",
  },
  net_amount_debit: {
    type: "String",
  },
  payment_source: {
    type: "String",
  },
  surl: {
    type: "String",
  },
  error_Message: {
    type: "String",
  },
  issuing_bank: {
    type: "String",
  },
  cardCategory: {
    type: "String",
  },
  phone: {
    type: "String",
  },
  easepayid: {
    type: "String",
  },
  cardnum: {
    type: "String",
  },
  key: {
    type: "String",
  },
  udf8: {
    type: "String",
  },
  unmappedstatus: {
    type: "String",
  },
  PG_TYPE: {
    type: "String",
  },
  addedon: {
    type: "Date",
  },
  cash_back_percentage: {
    type: "String",
  },
  status: {
    type: "String",
  },
  card_type: {
    type: "String",
  },
  merchant_logo: {
    type: "String",
  },
  udf6: {
    type: "String",
  },
  udf10: {
    type: "String",
  },
  upi_va: {
    type: "String",
  },
  txnid: {
    type: "String",
  },
  productinfo: {
    type: "String",
  },
  bank_name: {
    type: "String",
  },
  furl: {
    type: "String",
  },
  udf1: {
    type: "String",
  },
  amount: {
    type: "String",
  },
  udf2: {
    type: "String",
  },
  udf5: {
    type: "String",
  },
  mode: {
    type: "String",
  },
  udf7: {
    type: "String",
  },
  error: {
    type: "String",
  },
  udf9: {
    type: "String",
  },
  bankcode: {
    type: "String",
  },
  deduction_percentage: {
    type: "String",
  },
  email: {
    type: "String",
  },
  udf4: {
    type: "String",
  },
});

module.exports = mongoose.model("easebuzzpayment", easebuzzPaymentSchema);
