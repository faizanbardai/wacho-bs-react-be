var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var purchaseSchema = new Schema(
  {
    orderID: String,
    products: [],
    totalAmount: Number,
    payer: String,
    deliveryAddress: Object,
    captureDetail: Schema.Types.Mixed,
    transactionCode: String,
  },
  { timestamps: true, collection: "purchases" }
);

const purchaseModel = mongoose.model("purchases", purchaseSchema);

module.exports = purchaseModel;
