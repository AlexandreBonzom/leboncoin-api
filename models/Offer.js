const mongoose = require("mongoose");

const Offer = mongoose.model("Offer", {
  title: String,
  description: String,
  price: Number,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  created: {
    type: Date,
    default: () => {
      const date = new Date();
      return date.toUTCString();
    }
  },
  pictures: {
    type: Array,
    default: []
  }
});

module.exports = Offer;
