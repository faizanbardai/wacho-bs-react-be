const express = require("express");
const router = express.Router();
const purchaseModel = require("../model/purchase");

router.get("/", async (req, res) => {
  res.send(await purchaseModel.find({}));
});

router.post("/", async (req, res) => {
  const { orderID, products, totalAmount, captureDetail } = req.body;
  try {
    const response = await purchaseModel.create({
      orderID,
      products,
      totalAmount,
      captureDetail
    });
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});
module.exports = router;
