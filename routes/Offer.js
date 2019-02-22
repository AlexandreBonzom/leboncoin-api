const express = require("express");
const router = express.Router();
const Offer = require("../models/Offer");
const User = require("../models/User");
const uid2 = require("uid2");

//Cloudinary
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
//CRUD

//upload
const upLoadPicture = (req, user) => {
  let arrayPictures = [];
  const files = [...req.body.files];

  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const name = uid2(16);
      console.log(files[i]);
      cloudinary.v2.uploader.upload(
        files[i],
        { public_id: `leboncoin/${user._id}/${name}` },
        function(error, result) {
          console.log(result);
          if (error) return res.status(500).json({ error });
          arrayPictures.push(result);
        }
      );
    }
  }

  req.pictures = arrayPictures;
  console.log(req.pictures);
  return arrayPictures;
};

//Create
router.post("/publish", async (req, res) => {
  const newToken = req.headers.authorization.replace("Bearer ", "");
  console.log(newToken);
  try {
    const user = await User.findOne({ token: newToken }, "account");

    if (user) {
      const arrayPictures = upLoadPicture(req, user);
      console.log("arraypicture2" + arrayPictures);
      const newOffer = new Offer({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        creator: user,
        pictures: arrayPictures
      });
      console.log("newOffer" + newOffer);
      await newOffer.save();
      console.log("afterNewOffer");
      res.json(newOffer);
    } else {
      res.json({ message: "you need to log in first" });
    }
  } catch (error) {
    res.json(error.message);
  }
});
//Read
router.get("/with-count", async (req, res) => {
  try {
    const filter = {};

    if (req.query.title) {
      filter.title = { $regex: req.query.title, $options: "i" };
    }
    if (req.query.priceMin) {
      filter.price = {};
      filter.price.$gte = req.query.priceMin;
    }
    if (req.query.priceMax) {
      filter.price = {};
      filter.price.$lte = req.query.priceMax;
    }
    let offers = Offer.find(filter);
    if (req.query.skip) {
      offers = offers.skip(Number(req.query.skip));
    }
    if (req.query.limit) {
      offers = offers.limit(Number(req.query.limit));
    }

    if (req.query.sort === "price-desc") {
      offers.sort({ price: -1 });
    } else if (req.query.sort === "price-asc") {
      offers.sort({ price: 1 });
    } else if (req.query.sort === "date-desc") {
      offers.sort({ created: -1 });
    } else if (req.query.sort === "date-asc") {
      offers.sort({ created: 1 });
    }

    const result = await offers.populate("creator", "account");
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

//Update

//delete

module.exports = router;
