const express = require("express");
const router = express.Router();
const Wines = require('../schema/wines')

router.get("/", async (req, res) => {
  try {
    const response = await Wines.find();
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
