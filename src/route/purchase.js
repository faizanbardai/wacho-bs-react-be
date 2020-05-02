const express = require("express");
const router = express.Router();
const purchaseModel = require("../model/purchase");
const productModel = require("../model/product");

router.get("/", async (req, res) => {
  res.send(await purchaseModel.find().sort({ createdAt: -1 }));
});

router.post("/", async (req, res) => {
  const { orderID, products, totalAmount, captureDetail } = req.body;
  try {
    //Updating purchase registry
    const response = await purchaseModel.create({
      orderID,
      products,
      totalAmount,
      captureDetail,
    });
    //Updating products inventory
    products.forEach(async (product) => {
      await productModel.findByIdAndUpdate(product._id, {
        $inc: { inventory: -1 * parseInt(product.qty) },
      });
    });
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});
module.exports = router;
