const express = require("express");
const router = express.Router();
const passport = require("passport");
const purchaseModel = require("../model/purchase");
const productModel = require("../model/product");

router.get("/", passport.authenticate("jwt"), async (req, res) => {
  res.send(
    await purchaseModel
      .find()
      .select(
        "products _id orderID totalAmount payer deliveryAddress transactionCode createdAt"
      )
      .sort({ createdAt: -1 })
  );
});

router.post("/", async (req, res) => {
  const {
    orderID,
    products,
    totalAmount,
    captureDetail,
    payer,
    deliveryAddress,
    transactionCode,
  } = req.body;
  try {
    //Updating purchase registry
    const response = await purchaseModel.create({
      orderID,
      products,
      totalAmount,
      captureDetail,
      payer,
      deliveryAddress,
      transactionCode,
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
