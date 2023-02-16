const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const User = require("../models/Users");
const UserEntry = require("../models/UserEntry");
const fetchuser = require("../middleware/fetchuser");

const router = express.Router();

//Get User Details of logerd in user  /api/auth/getuser
router.get("/start-backend/getuser", fetchuser, async (req, res) => {
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
