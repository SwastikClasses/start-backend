const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const User = require("../models/Users");
const UserEntry = require("../models/UserEntry");
const fetchuser = require("../middleware/fetchuser");

const router = express.Router();

// const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET = "iNotebook";

//Creating a User  /api/auth/createuser
router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("phone", "Enter a valid phone").isLength({ min: 10 }),
    body("name", "Enter a valid name").exists(),
    body("user_class", "Enter a valid class").exists(),
    body("verification", "Enter a valid verification").exists(),
  ],
  async (req, res) => {
    success = true;
    console.log(req.body);
    const user_data = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      user_class: req.body.user_class,
      exam_year: req.body.exam_year,
      verification: req.body.verification,
      state: req.body.state,
      pincode: req.body.pincode,
    };

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      success = false;
      return res.json({ success, errors: errors.array() });
    }

    try {
      let user = await User.findOne({
        phone: req.body.phone,
      });
      console.log(user);
      if (user) {
        console.log("User already exist with this email");
        user = await User.findOneAndUpdate(
          user._id,
          { $set: user_data },
          { new: true }
        );
      } else {
        user = await User.create({
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          user_class: req.body.user_class,
          exam_year: req.body.exam_year,
          verification: req.body.verification,
        });
      }
      //Entry in UserEtry Collection

      let user_entry = await UserEntry.create({
        user: user._id,
        utm_campaign: req.body.utm_campaign ? req.body.utm_campaign : "",
        utm_medium: req.body.utm_medium ? req.body.utm_medium : "",
        utm_source: req.body.utm_source ? req.body.utm_source : "",
      });

      //   console.log(authToken);
      res.json({ success, user, user_entry });
    } catch (error) {
      console.log(error);
      res.status(500).send("Some Error Occured ");
    }
  }
);

//Get User Details of logerd in user  /api/auth/getuser
router.post("/getuser", fetchuser, async (req, res) => {
  const { userId } = req.user;

  try {
    success = true;
    const user = await User.findOne(userId).select("-password");
    return res.json({ success, user });
  } catch (error) {
    console.log(error);
    res.status(500).send("Some Error Occured ");
  }
});
module.exports = router;
