const express = require("express");

const User = require("../models/Users");
const ThinkExam = require("../models/ThinkExams");
const Easebuzz = require("../models/EaseBuzzPayments");
const RollNumber = require("../models/RollNumber");

const router = express.Router();

//Get User Details of logerd in user  /api/auth/getuser
router.post("/generateId", async (req, res) => {
  const { paymentId } = req.body;

  try {
    success = true;
    const payment = await Easebuzz.findOne({ _id: paymentId });
    let user = await User.findOne({ _id: payment.user });
    console.log(user);
    const test = payment.txnid.split("_").at(-1);
    let rollnumber = await RollNumber.findOne({ exam: test });
    const user_rollnumber = rollnumber.class[user.user_class];

    const userCred = await ThinkExam.findOne({
      RollNumber: user_rollnumber,
      exam: test,
    });
    if (user.rollnumber == "") {
      rollnumber.class[user.user_class] = String(parseInt(user_rollnumber) + 1);

      const updatrollNum = await RollNumber.findOneAndUpdate(
        { exam: test },
        rollnumber
      );
      user.rollnumber = userCred._id;
      console.log(user);
      const updateUser = await User.findOneAndUpdate(
        { _id: payment.user },
        user
      );
      // const userCred = await ThinkExam.findOne({ exam: test });
      console.log(userCred);
      return res.json({
        success,
        userCred,
        user,
      });
    } else {
      const userCred = await ThinkExam.findOne({
        _id: user.rollnumber,
        exam: test,
      });
      return res.json({
        success,
        userCred,
        user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Some Error Occured ");
  }
});

router.get("/", async (req, res) => {
    res.json({sucess: true})
});
module.exports = router;
