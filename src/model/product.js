var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema(
  {
    price: Number,
    qty: Number,
    inventory: Number,
    title: String,
    image: String,
    imageThumbnail: String,
    variety: String,
    color: String,
    aroma: String,
    taste: String,
    alcohol: String,
    description: String,
    // New entries
    active: Boolean,
    jahrgang: Number,
    winzer: String,
    herkunft: String,
    region: String,
    rebsorten: String,
  },
  { collection: "wines" }
);

const productModel = mongoose.model("wines", productSchema);

module.exports = productModel;
