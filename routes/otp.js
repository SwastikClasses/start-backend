const axios = require("axios");
var express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.send("Congrats its working");
});

router.post("/", async function (req, res, next) {
  const { phone_number, otp_6, authKey } = req.query;
  let sendJSON = {};
  if (authKey === "Swastik_AuthKey") {
    sendJSON.message = await sendMsg(phone_number, otp_6);
    sendJSON.status = 200;
  } else {
    sendJSON.message = "Wrong Auth Key";
    sendJSON.status = 401;
  }
  res.send(sendJSON);
});

async function sendMsg(phone, otp) {
  try {
    var config = {
      method: "get",
      url: `https://sms.k7marketinghub.com/app/smsapi/index.php?key=55FD4FD640C633&campaign=10188&routeid=100996&type=text&contacts=${phone}&senderid=SWSCLA&msg=Dear Students/Parents, Your Swastik Phone Verification Code is ${otp}. Regards Swastik Classes&template_id=1207162158265240739`,
      headers: {
        Cookie:
          "referer=https%3A%2F%2Fsms.k7marketinghub.com%2Fapp%2Fsmsapi%2Findex.php%3Fkey%3D55FD4FD640C633%26campaign%3D10188%26routeid%3D100996%26type%3Dtext%26contacts%3D7982454237%26senderid%3DSWSCLA%26msg%3DDear%2520Students%2FParents%2C%2520Your%2520Swastik%2520Phone%2520Verification%2520Code%2520is%2520789789.%2520Regards%2520Swastik%2520Classes%26template_id%3D1207162158265240739",
      },
    };

    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      return error;
    }
  } catch (error) {
    return error;
  }
}

module.exports = router;
