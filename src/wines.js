const express = require("express");
const router = express.Router();

//Import the mongoose module
var mongoose = require("mongoose");

require("dotenv").config();

//Set up default mongoose connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Define schema
var Schema = mongoose.Schema;

var WineSchema = new Schema({}, { collection: "wines" });

// Compile model from schema
const Wines = mongoose.model("wines", WineSchema);

router.get("/", async (req, res) => {
  try {
    const response = await Wines.find();
    res.send(response);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
