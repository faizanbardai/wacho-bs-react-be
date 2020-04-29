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

module.exports = router;
