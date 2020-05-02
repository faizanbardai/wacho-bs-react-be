var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema(
  {
    price: Number,
    qty: { type: Number, default: 0 },
    inventory: Number,
    title: String,
    image: String,
    description: String,
    // variety: String,
    // color: String,
    // aroma: String,
    // taste: String,
    // New entries
    active: { type: Boolean, default: false },
    jahrgang: Number,
    winzer: String,
    herkunft: String,
    region: String,
    rebsorten: String,
    alkoholgehalt: String,
  },
  { collection: "wines" }
);

const productModel = mongoose.model("wines", productSchema);

module.exports = productModel;
