var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var artSchema = new Schema(
  {
    src: String,
    thumbnail: String,
    thumbnailWidth: Number,
    thumbnailHeight: Number,
    caption: String,
    tags: Object,
    price: Number,
  },
  { collection: "art" }
);

const productModel = mongoose.model("wines", productSchema);

module.exports = productModel;
