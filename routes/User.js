const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Offer = require("../models/Offer");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

//CRUD
//create
router.post("/sign_up", async (req, res) => {
  try {
    const user = await User.findOne({ "account.email": req.body.email });
    if (!user) {
      const newSalt = uid2(16);
      const newToken = uid2(16);
      const newUser = new User({
        account: {
          email: req.body.email,
          username: req.body.username
        },
        token: newToken,
        salt: newSalt,
        hash: SHA256(req.body.password + newSalt).toString(encBase64)
      });

      await newUser.save();
      return res.json(newUser.account, newUser.token, newUser._id);
    } else {
      return res.status(401).json({ message: "email already existing" });
    }
  } catch (error) {
    return res.status(401).json(error.message);
  }
});

//log_in
router.post("/log_in", async (req, res) => {
  try {
    const user = await User.findOne({ "account.email": req.body.email });
    if (user) {
      if (
        user.hash === SHA256(req.body.password + user.salt).toString(encBase64)
      ) {
        const response = {
          _id: user.id,
          token: user.token,
          account: { username: user.account.username }
        };

        res.json(response);
      } else {
        res.status(400).json({ message: "wrong password" });
      }
    } else {
      res.json({
        message: "email is not existing. Verify it or create an account"
      });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

//read => get all the offer from one user
router.get("/my_offers", async (req, res) => {
  const newToken = req.headers.authorization.replace("Bearer ", "");

  try {
    const offers = await Offer.find().populate({
      path: "creator",
      match: {
        token: newToken
      }
    });

    res.json(offers);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
