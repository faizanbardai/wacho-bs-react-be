var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var purchaseSchema = new Schema(
  {
    orderID: String,
    products: [],
    totalAmount: Number,
    captureDetail: Schema.Types.Mixed
  },
  { timestamps: true, collection: "purchases" }
);

const purchaseModel = mongoose.model("purchases", purchaseSchema);

module.exports = purchaseModel;
