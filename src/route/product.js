const express = require("express");
const router = express.Router();
const productModel = require("../model/product");

router.post("/", async (req, res) => {
  const newWine = await productModel.create(req.body);
  res.send(newWine);
});

router.get("/", async (req, res) => {
  res.send(await productModel.find({ active: true }));
});

router.put("/", async (req, res) => {
  const { id, inventory } = req.body;
  try {
    const response = await productModel.findByIdAndUpdate(
      id,
      { inventory: inventory },
      { new: true }
    );
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
