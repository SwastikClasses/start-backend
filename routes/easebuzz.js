const express = require("express");
var sha512 = require("js-sha512");

var bodyParser = require("body-parser");
// const PaytmChecksum = require("paytmchecksum");
const easebuzzPayment = require("../models/EaseBuzzPayments");

const router = express.Router();
router.use(bodyParser());

const config = {
  key: "2PBP7IABZ2",
  salt: "DAH88E3UWQ",
  env: "test",
  enable_iframe: "0",
};

router.get("/", function (req, res) {
  res.json({ success: true });
});

router.post("/savedata", async (req, res) => {
  function checkReverseHash(response) {
    var hashstring =
      config.salt +
      "|" +
      response.status +
      "|" +
      response.udf10 +
      "|" +
      response.udf9 +
      "|" +
      response.udf8 +
      "|" +
      response.udf7 +
      "|" +
      response.udf6 +
      "|" +
      response.udf5 +
      "|" +
      response.udf4 +
      "|" +
      response.udf3 +
      "|" +
      response.udf2 +
      "|" +
      response.udf1 +
      "|" +
      response.email +
      "|" +
      response.firstname +
      "|" +
      response.productinfo +
      "|" +
      response.amount +
      "|" +
      response.txnid +
      "|" +
      response.key;
    hash_key = sha512.sha512(hashstring);
    if (hash_key == req.body.hash) return true;
    else return false;
  }
  console.log(req.body);
  if (!checkReverseHash(req.body)) {
    res.send("false, check the hash value ");
    return;
  }

  const data_push = req.body;
  data_push.user = data_push.udf1;
  let success = true;
  console.log(data_push);
  try {
    let payment_data = await easebuzzPayment.create(req.body);
    // console.log(payment_data);
    res.redirect(`https://start.swastikclasses.com/thankyou/${payment_data._id}`);
    return;
    // res.json({ success, payment_data });
  } catch (error) {
    success = false;
    console.log(error);
    return res.json({ success, error });
  }

  // try {
  //   success = true;
  //   const user = await User.findOne(userId).select("-password");
  //   return res.json({ success, user });
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).send("Some Error Occured ");
  // }
});

//response
router.post("/response", function (req, res) {
  function checkReverseHash(response) {
    var hashstring =
      config.salt +
      "|" +
      response.status +
      "|" +
      response.udf10 +
      "|" +
      response.udf9 +
      "|" +
      response.udf8 +
      "|" +
      response.udf7 +
      "|" +
      response.udf6 +
      "|" +
      response.udf5 +
      "|" +
      response.udf4 +
      "|" +
      response.udf3 +
      "|" +
      response.udf2 +
      "|" +
      response.udf1 +
      "|" +
      response.email +
      "|" +
      response.firstname +
      "|" +
      response.productinfo +
      "|" +
      response.amount +
      "|" +
      response.txnid +
      "|" +
      response.key;
    hash_key = sha512.sha512(hashstring);
    if (hash_key == req.body.hash) return true;
    else return false;
  }
  console.log(req.body);
  if (checkReverseHash(req.body)) {
    res.send(req.body);
  }
  res.send("false, check the hash value ");
});

router.get("/initiate_payment", function (req, res) {
  // data = req.body;
  // console.log(data, config);

  const { amount, name, email, phone, udf1 } = req.query;

  const item = "START";
  let orderId = "Order_" + new Date().getTime() + "_" + item;
  let data = {
    txnid: orderId,
    amount: amount,
    name: name,
    email: email,
    phone: phone,
    productinfo: item,
    surl: "https://api.swastikclasses.com/start-backend/easebuzz/savedata",
    furl: "https://api.swastikclasses.com/start-backend/easebuzz/savedata",
    udf1: udf1,
    udf2: "",
    udf3: "",
    udf4: "",
    udf5: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    sub_merchant_id: "",
    unique_id: "",
    split_payments: "",
    customer_authentication_id: "",
    udf6: "",
    udf7: "",
    udf8: "",
    udf9: "",
    udf10: "",
  };
  console.log(data);
  var initiate_payment = require("../Easebuzz/initiate_payment");
  initiate_payment.initiate_payment(data, config, res);
});

module.exports = router;
