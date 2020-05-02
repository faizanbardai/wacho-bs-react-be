const express = require("express");
const router = express.Router();
const passport = require("passport");
const productModel = require("../model/product");

router.post("/", passport.authenticate("jwt"), async (req, res) => {
  const newWine = await productModel.create(req.body);
  res.send(newWine);
});

router.get("/", async (req, res) => {
  res.send(
    await productModel.find(req.query.active == 1 ? { active: true } : null)
  );
});

router.put("/", passport.authenticate("jwt"), async (req, res) => {
  const { _id } = req.body;

  try {
    const response = await productModel.findByIdAndUpdate(
      _id,
      { ...req.body },
      {
        new: true,
      }
    );
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

router.put("/active", passport.authenticate("jwt"), async (req, res) => {
  const { _id } = req.body;
  try {
    const product = await productModel.findById(_id);
    await productModel.findByIdAndUpdate(_id, {
      active: product.active ? false : true,
    });
    res.json("Product status changed.");
  } catch (error) {
    res.json(error);
  }
});

router.delete("/", passport.authenticate("jwt"), async (req, res) => {
  const { _id } = req.body;
  try {
    const productDeleted = await productModel.findByIdAndDelete(_id);
    productDeleted ? res.json("Deleted!") : res.status(404).json();
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
