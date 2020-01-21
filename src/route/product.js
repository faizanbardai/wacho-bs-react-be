const express = require("express");
const router = express.Router();
const productModel = require("../model/product");

router.get("/", async (req, res) => {
  res.send(await productModel.find({}, "_id image title inventory qty"));
});

router.put("/", async (req, res) => {
  const { id, inventory } = req.body;
  try {
    const response = await productModel.findByIdAndUpdate(
      id,
      { inventory: inventory },
      { new: true, select: "_id image title inventory qty" }
    );
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
