const express = require("express");

const PaytmChecksum = require("../utilities/PaytmChecksum");
// const PaytmChecksum = require("paytmchecksum");
const Payment = require("../models/Payments");

const router = express.Router();

router.post("/callback", (req, res) => {
  try {
    console.log(req.body);
  } catch (error) {
    console.log(error);
  }

  // var body = {
  //   mid: req.body.MID,
  //   orderId: req.body.ORDERID,
  // };
  // body = JSON.stringify(body);

  // console.log(body);

  // /* checksum that we need to verify */
  // var paytmChecksum = req.body.CHECKSUMHASH;
  // delete req.body.CHECKSUMHASH;
  // console.log(paytmChecksum);

  // var isVerifySignature = PaytmChecksum.verifySignature(
  //   req.body,
  //   "#F#Ch&gMDfa39z_9",
  //   paytmChecksum
  // );
  // if (isVerifySignature) {
  //   console.log("Checksum Matched");
  // } else {
  //   console.log("Checksum Mismatched");
  // }

  // var isVerifySignature = PaytmChecksum.verifySignature(
  //   req.body,
  //   process.env.PAYTM_MERCHANT_KEY,
  //   paytmChecksum
  // );
  // console.log(isVerifySignature);
  // if (isVerifySignature) {
  //   var paytmParams = {};
  //   paytmParams["MID"] = req.body.MID;
  //   paytmParams["ORDERID"] = req.body.ORDERID;

  //   /*
  //    * Generate checksum by parameters we have
  //    * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
  //    */
  //   PaytmChecksum.generateSignature(paytmParams, "#F#Ch&gMDfa39z_9").then(
  //     function (checksum) {
  //       paytmParams["CHECKSUMHASH"] = checksum;

  //       var post_data = JSON.stringify(paytmParams);

  //       var options = {
  //         /* for Staging */
  //         hostname: "securegw-stage.paytm.in",

  //         /* for Production */
  //         // hostname: 'securegw.paytm.in',

  //         port: 443,
  //         path: "/order/status",
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Content-Length": post_data.length,
  //         },
  //       };

  //       var response = "";
  //       var post_req = https.request(options, function (post_res) {
  //         post_res.on("data", function (chunk) {
  //           response += chunk;
  //         });

  //         post_res.on("end", function () {
  //           let result = JSON.parse(response);
  //           console.log(result);
  //           if (result.STATUS === "TXN_SUCCESS") {
  //             //store in db
  //             // db.collection("payments")
  //             //   .doc("mPDd5z0pNiInbSIIotfj")
  //             //   .update({
  //             //     paymentHistory:
  //             //       firebase.firestore.FieldValue.arrayUnion(result),
  //             //   })
  //             //   .then(() => console.log("Update success"))
  //             //   .catch(() => console.log("Unable to update"));
  //             console.log("Update success");
  //             return { success: 200 };
  //           }

  //           res.redirect(`http://localhost:3000/thankyou/${result.STATUS}`);
  //         });
  //       });

  //       post_req.write(post_data);
  //       post_req.end();
  //     }
  //   );
  // } else {
  //   console.log("Checksum Mismatched");
  // }
});

router.post("/savedata", async (req, res) => {
  console.log(req.body);
  let {
    user,
    BANKNAME,
    BANKTXNID,
    CHECKSUMHASH,
    CURRENCY,
    GATEWAYNAME,
    MID,
    ORDERID,
    PAYMENTMODE,
    RESPCODE,
    RESPMSG,
    STATUS,
    TXNAMOUNT,
    TXNDATE,
    TXNID,
  } = req.body;
  let success = true;
  try {
    let payment_data = await Payment.create({
      user,
      BANKNAME,
      BANKTXNID,
      CHECKSUMHASH,
      GATEWAYNAME,
      ORDERID,
      PAYMENTMODE,
      STATUS,
      TXNAMOUNT,
      TXNDATE,
      TXNID,
    });
    console.log(payment_data);
    return res.json({ success, payment_data });
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
module.exports = router;
