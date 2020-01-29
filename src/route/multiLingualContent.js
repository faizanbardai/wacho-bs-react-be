const express = require("express");
const router = express.Router();
const multiLingualContent = require("../model/multiLingualContent");

router.get("/", async (req, res) => {
  if(!req.query.lang) req.query.lang = "en"
  res.send(await multiLingualContent.findOne({lang: req.query.lang}, "content"))
});

module.exports = router;