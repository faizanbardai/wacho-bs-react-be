const express = require("express");
const router = express.Router();
const winesSchema = require("../schema/winesSchema");

router.get("/", async (req, res) => {
  try {
    const response = await winesSchema.find();
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = router;
