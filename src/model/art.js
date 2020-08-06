var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var artSchema = new Schema(
  {
    src: String,
    thumbnail: String,
    thumbnailWidth: Number,
    thumbnailHeight: Number,
    caption: String,
    tags: [],
    price: Number,
    active: { type: Boolean, default: true },
  },
  { timestamps: true, collection: "art" }
);

const productModel = mongoose.model("art", artSchema);

module.exports = productModel;
