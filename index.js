//permet de creer un dossier .env ou on stockera nos donnees key et autres
require("dotenv").config();
//creation server
const express = require("express");
const app = express();
//permet d 'utilsier des bodys
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//permet d'utiliser BD moongoDB
const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/leboncoin-server",
  {
    useNewUrlParser: true
  }
);

//donne acceecibilité aux autres sites pour recuperer des infos
const cors = require("cors");
app.use(cors());

// pour eviter que le header client affiche "express". vient combler des failles de securité
const helmet = require("helmet");
app.use(helmet());

//Compression coté serveur en zip des donnees avant de les envoyer
const compression = require("compression");
app.use(compression());

//Cloudinary
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

//import des routes Offers
const offerRoutes = require("./routes/Offer");
const userRoutes = require("./routes/User");

app.use("/offer", offerRoutes);
app.use("/user", userRoutes);

app.listen(process.env.PORT || 3000);
