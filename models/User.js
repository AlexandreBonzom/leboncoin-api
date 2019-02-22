const mongoose = require("mongoose");

const User = mongoose.model("User", {
  account: {
    username: String,
    phone: String,
    email: String
  },
  token: String,
  salt: String,
  hash: String
});

module.exports = User;
