const express = require("express");
const router = express.Router();
const productModel = require("../model/product");

router.get("/", async (req, res) => {
  res.send(await productModel.find());
});

router.put("/", async (req, res) => {
  const { id, qty } = req.body;
  try {
    const response = await productModel.findByIdAndUpdate(
      id,
      { inventory: qty },
      { new: true }
    );
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
