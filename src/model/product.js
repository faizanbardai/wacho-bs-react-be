var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema(
  {
    price: Number,
    qty: Number,
    inventory: Number,
    title: String,
    image: String,
    variety: String,
    color: String,
    aroma: String,
    taste: String,
    alcohol: String,
    description: String
  },
  { collection: "wines" }
);

const productModel = mongoose.model("wines", productSchema);

module.exports = productModel;
