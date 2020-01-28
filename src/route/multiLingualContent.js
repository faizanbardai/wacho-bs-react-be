const express = require("express");
const router = express.Router();
const multiLingualContent = require("../model/multiLingualContent");

router.get("/", async (req, res) => {
  res.send(await multiLingualContent.find({lang: req.query.lang}));
});

module.exports = router;