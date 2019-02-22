//permet de creer un dossier .env ou on stockera nos donnees key et autres
require("dotenv").config();
//creation server
const express = require("express");
const app = express();
//permet d 'utilsier des bodys
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));

//permet d'utiliser BD moongoDB
const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/leboncoin-server",
  {
    useNewUrlParser: true
  },
  function(err) {
    if (err) console.error("Could not connect to mongodb.");
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

/*
Toutes les méthodes HTTP (GET, POST, etc.) des pages non trouvées afficheront
une erreur 404
*/
app.all("*", function(req, res) {
  res.status(404).json({ error: "Not Found" });
});

/*
Le dernier middleware de la chaîne gérera les d'erreurs. Ce `error handler`
doit définir obligatoirement 4 paramètres `err, req, res, next`.
Définition d'un middleware : https://expressjs.com/en/guide/writing-middleware.html
*/
app.use(function(err, req, res, next) {
  if (res.statusCode === 200) res.status(400);
  console.error(err);

  // if (process.env.NODE_ENV === "production") err = "An error occurred";
  res.json({ error: err });
});
app.listen(process.env.PORT, function() {
  console.log(`leboncoin API running on port ${process.env.PORT}`);
  console.log(`Current environment is ${process.env.NODE_ENV}`);
});
